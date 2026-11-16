<?php

declare(strict_types=1);

/*
 * SOLUSI REFERENSI soal 09-03.
 *   BAGIAN 1 → app/Providers/AppServiceProvider.php   (isi boot())
 *   BAGIAN 2 → app/Http/Controllers/Api/TokenController.php
 *   BAGIAN 3 → routes/api.php + potongan ProductController + test
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/* ======================================================================
 * BAGIAN 1 — isi AppServiceProvider::boot()
 * ====================================================================== */
function daftarkanRateLimiter(): void
{
    // Limiter umum untuk endpoint baca.
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });

    // Limiter ketat untuk tukar password jadi token.
    // Kunci email+IP: satu penyerang tidak bisa menghabiskan jatah
    // pemilik akun asli yang login dari IP lain.
    RateLimiter::for('login-api', function (Request $request) {
        $email = Str::lower((string) $request->input('email'));

        return Limit::perMinute(5)
            ->by($email . '|' . $request->ip())
            ->response(function (Request $request, array $headers) {
                // $headers berisi Retry-After dan X-RateLimit-*; ikutkan.
                return response()->json(
                    ['message' => 'Terlalu banyak percobaan. Coba lagi nanti.'],
                    429,
                    $headers,
                );
            });
    });

    // Route tulis selalu di belakang auth:sanctum, jadi user pasti ada.
    // Fallback IP hanya jaga-jaga kalau urutan middleware salah.
    RateLimiter::for('tulis-produk', function (Request $request) {
        return Limit::perMinute(10)->by('tulis|' . ($request->user()?->id ?: $request->ip()));
    });
}

/* ======================================================================
 * BAGIAN 2 — TokenController
 * ====================================================================== */
final class TokenController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string'],
            'device_name' => ['required', 'string', 'max:100'],
        ]);

        $user = User::query()->where('email', $data['email'])->first();

        // Satu pesan untuk dua kasus: cegah user enumeration.
        if ($user === null || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'Email atau password salah.',
            ]);
        }

        // Hak token sesempit mungkin.
        $token = $user->createToken($data['device_name'], ['produk:tulis']);

        return response()->json(['token' => $token->plainTextToken], 201);
    }

    public function destroy(Request $request): Response
    {
        // Hanya token yang dipakai request ini; perangkat lain tetap login.
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}

/* ======================================================================
 * BAGIAN 3 — routes/api.php
 * ======================================================================

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TokenController;
use Illuminate\Support\Facades\Route;

Route::post('/token', [TokenController::class, 'store'])
    ->middleware('throttle:login-api');

Route::middleware('throttle:api')->group(function (): void {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
});

Route::middleware('auth:sanctum')->group(function (): void {
    Route::delete('/token', [TokenController::class, 'destroy']);

    Route::middleware('throttle:tulis-produk')->group(function (): void {
        Route::post('/products', [ProductController::class, 'store']);
        Route::match(['put', 'patch'], '/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    });
});

 * ----------------------------------------------------------------------
 * ProductController::store (pola sama untuk update/destroy)
 * ----------------------------------------------------------------------

public function store(StoreProductRequest $request): JsonResponse
{
    // 1) Token dibuat untuk keperluan menulis produk?
    abort_unless($request->user()->tokenCan('produk:tulis'), 403, 'Token tidak punya izin menulis produk.');

    // 2) User-nya memang boleh membuat produk?
    Gate::authorize('create', Product::class);

    $product = Product::create($request->validated());

    return (new ProductResource($product))->response()->setStatusCode(201);
}

 * Catatan: user yang login lewat session (bukan token) dianggap punya
 * semua ability oleh Sanctum, jadi tokenCan() tetap true untuk mereka.

 * ----------------------------------------------------------------------
 * tests/Feature/TokenApiTest.php (Pest)
 * ----------------------------------------------------------------------

use App\Models\Product;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('login benar menghasilkan token', function () {
    User::factory()->create(['email' => 'admin@toko.test', 'password' => 'password-latihan']);

    $this->postJson('/api/token', [
        'email' => 'admin@toko.test',
        'password' => 'password-latihan',
        'device_name' => 'kasir-1',
    ])->assertCreated()->assertJsonStructure(['token']);
});

test('login salah pesannya generik', function () {
    User::factory()->create(['email' => 'admin@toko.test']);

    $salahPassword = $this->postJson('/api/token', [
        'email' => 'admin@toko.test', 'password' => 'x', 'device_name' => 'a',
    ])->assertUnprocessable()->json('errors.email.0');

    $emailTidakAda = $this->postJson('/api/token', [
        'email' => 'hantu@toko.test', 'password' => 'x', 'device_name' => 'a',
    ])->assertUnprocessable()->json('errors.email.0');

    expect($salahPassword)->toBe($emailTidakAda);
});

test('percobaan ke-6 kena 429', function () {
    foreach (range(1, 5) as $i) {
        $this->postJson('/api/token', ['email' => 'a@toko.test', 'password' => 'x', 'device_name' => 'a']);
    }

    $this->postJson('/api/token', ['email' => 'a@toko.test', 'password' => 'x', 'device_name' => 'a'])
        ->assertStatus(429)
        ->assertHeader('Retry-After');
});

test('token tanpa ability ditolak 403', function () {
    // Pakai DELETE supaya tidak tertahan validasi Form Request (422) duluan.
    $product = Product::factory()->create();
    Sanctum::actingAs(User::factory()->create(['role' => 'admin']), ['produk:baca']);

    $this->deleteJson("/api/products/{$product->id}")->assertForbidden();
});
*/

<?php

declare(strict_types=1);

// Solusi referensi. Dua class dalam satu file hanya supaya mudah dibaca;
// di project, pisahkan ke app/Http/Controllers dan app/Policies.

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

final class PenjualProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Query lewat relasi -> otomatis WHERE user_id = id user login.
        $products = $request->user()->products()->latest()->get();

        return response()->json(['data' => $products]);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        // Policy dicek SEBELUM validasi dan update.
        Gate::authorize('update', $product);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:120'],
            'price' => ['sometimes', 'required', 'integer', 'min:0'],
            'stock' => ['sometimes', 'required', 'integer', 'min:0'],
        ]);

        $product->update($data);

        return response()->json(['data' => $product]);
    }

    public function destroy(Product $product): JsonResponse
    {
        Gate::authorize('delete', $product);

        $product->delete();

        return response()->json(null, 204);
    }
}

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

final class ProductPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        // true  = langsung izinkan
        // null  = belum memutuskan, lanjut ke method aksi
        // false = langsung tolak (jangan dipakai di sini, nanti pemilik ikut ditolak)
        return $user->role === 'admin' ? true : null;
    }

    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, Product $product): Response
    {
        // 404 menyembunyikan fakta bahwa produk itu ada (tidak membantu penyerang
        // memetakan id). 403 lebih jujur. Untuk produk yang memang publik,
        // 403 juga wajar — yang penting KONSISTEN.
        return $user->id === $product->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function delete(User $user, Product $product): Response
    {
        return $this->update($user, $product);
    }
}

/*
--- Migration: tambah pemilik produk ---
php artisan make:migration add_user_id_to_products_table

Schema::table('products', function (Blueprint $table) {
    $table->foreignId('user_id')->nullable()->after('id')->constrained()->cascadeOnDelete();
});

--- Model ---
// User.php
public function products(): HasMany { return $this->hasMany(Product::class); }
// Product.php
public function user(): BelongsTo { return $this->belongsTo(User::class); }
// Catatan: JANGAN masukkan user_id ke $fillable kalau diisi dari input.
// Isi dari server: $request->user()->products()->create($data).

--- routes/api.php ---
Route::middleware('auth:sanctum')->prefix('penjual')->group(function () {
    Route::get('/products', [PenjualProductController::class, 'index']);
    Route::patch('/products/{product}', [PenjualProductController::class, 'update']);
    Route::delete('/products/{product}', [PenjualProductController::class, 'destroy']);
});
// Alternatif: ->can('update', 'product') di route, lalu hapus Gate::authorize di controller.

--- AppServiceProvider::boot() ---
Gate::define('lihat-laporan-penjualan', fn (User $user) => $user->role === 'admin');
// Pakai: Gate::authorize('lihat-laporan-penjualan');

--- tests/Feature/PenjualProductAccessTest.php (Pest) ---
use App\Models\Product;
use App\Models\User;

beforeEach(function () {
    $this->pemilik = User::factory()->create(['role' => 'penjual']);
    $this->lain = User::factory()->create(['role' => 'penjual']);
    $this->admin = User::factory()->create(['role' => 'admin']);
    $this->produk = Product::factory()->for($this->pemilik)->create();
});

test('guest ditolak 401', function () {
    $this->patchJson("/api/penjual/products/{$this->produk->id}", ['price' => 1])
        ->assertUnauthorized();
});

test('pemilik boleh update', function () {
    $this->actingAs($this->pemilik)
        ->patchJson("/api/penjual/products/{$this->produk->id}", ['price' => 1])
        ->assertOk();
});

test('bukan pemilik dapat 404 dan data tidak berubah', function () {
    $hargaAwal = $this->produk->price;

    $this->actingAs($this->lain)
        ->patchJson("/api/penjual/products/{$this->produk->id}", ['price' => 1])
        ->assertNotFound();

    expect($this->produk->fresh()->price)->toBe($hargaAwal);
});

test('bukan pemilik tidak bisa hapus', function () {
    $this->actingAs($this->lain)
        ->deleteJson("/api/penjual/products/{$this->produk->id}")
        ->assertNotFound();

    $this->assertModelExists($this->produk);
});

test('admin boleh hapus', function () {
    $this->actingAs($this->admin)
        ->deleteJson("/api/penjual/products/{$this->produk->id}")
        ->assertNoContent();
});

test('index hanya produk sendiri', function () {
    Product::factory()->for($this->lain)->create();

    $this->actingAs($this->pemilik)
        ->getJson('/api/penjual/products')
        ->assertOk()
        ->assertJsonCount(1, 'data');
});
*/

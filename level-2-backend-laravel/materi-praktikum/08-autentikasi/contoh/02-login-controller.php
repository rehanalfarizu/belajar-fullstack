<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

final class SesiController extends Controller
{
    private const MAKS_PERCOBAAN = 5;

    public function create(): View
    {
        return view('auth.login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Lowercase supaya "Budi@x.com" dan "budi@x.com" berbagi jatah yang sama.
        $kunci = Str::transliterate(Str::lower($credentials['email']) . '|' . $request->ip());

        if (RateLimiter::tooManyAttempts($kunci, self::MAKS_PERCOBAAN)) {
            $detik = RateLimiter::availableIn($kunci);

            // Status 429 supaya client tahu ini pembatasan, bukan salah input.
            throw ValidationException::withMessages([
                'email' => "Terlalu banyak percobaan. Coba lagi dalam {$detik} detik.",
            ])->status(429);
        }

        if (! Auth::attempt($credentials, $request->boolean('ingat'))) {
            RateLimiter::hit($kunci, 60); // jatah dihitung per 60 detik

            // Pesan sama untuk email tidak terdaftar maupun password salah
            // supaya penyerang tidak bisa menebak email mana yang terdaftar.
            throw ValidationException::withMessages([
                'email' => 'Email atau password salah.',
            ]);
        }

        RateLimiter::clear($kunci);

        // Ganti session id setelah login -> mencegah session fixation.
        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        // Hapus data session lama dan buat id baru.
        $request->session()->invalidate();

        // Token CSRF lama jangan dipakai lagi.
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

/*
--- app/Http/Controllers/Auth/RegisterController.php ---

final class RegisterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Model User bawaan punya cast 'password' => 'hashed',
        // jadi password otomatis di-hash saat disimpan.
        // Memanggil Hash::make() di sini juga aman: cast 'hashed' tidak
        // meng-hash ulang nilai yang sudah berupa hash.
        $user = User::create($data);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect('/dashboard');
    }
}

--- routes/web.php ---

Route::middleware('guest')->group(function () {
    Route::get('/login', [SesiController::class, 'create'])->name('login');
    Route::post('/login', [SesiController::class, 'store']);
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::post('/logout', [SesiController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::get('/dashboard', fn () => view('dashboard'))->middleware('auth');

--- Cek di tinker ---

>>> $u = App\Models\User::first();
>>> $u->password                                   // "$2y$12$..." (bcrypt), bukan teks asli
>>> Illuminate\Support\Facades\Hash::check('rahasia123', $u->password)   // true
>>> Illuminate\Support\Facades\Hash::needsRehash($u->password)           // false

--- Test (Pest) ---

test('login gagal pakai pesan umum', function () {
    User::factory()->create(['email' => 'a@toko.test', 'password' => 'benar12345']);

    $this->post('/login', ['email' => 'a@toko.test', 'password' => 'salah'])
        ->assertSessionHasErrors(['email' => 'Email atau password salah.']);

    $this->post('/login', ['email' => 'tidakada@toko.test', 'password' => 'salah'])
        ->assertSessionHasErrors(['email' => 'Email atau password salah.']);

    $this->assertGuest();
});

test('percobaan ke-6 dibatasi', function () {
    User::factory()->create(['email' => 'a@toko.test']);

    foreach (range(1, 5) as $_) {
        $this->post('/login', ['email' => 'a@toko.test', 'password' => 'salah']);
    }

    $this->postJson('/login', ['email' => 'a@toko.test', 'password' => 'salah'])
        ->assertStatus(429);
});

test('login berhasil lalu logout', function () {
    $user = User::factory()->create(['password' => 'benar12345']);

    $this->post('/login', ['email' => $user->email, 'password' => 'benar12345'])
        ->assertRedirect('/dashboard');
    $this->assertAuthenticatedAs($user);

    $this->post('/logout')->assertRedirect('/');
    $this->assertGuest();
});
*/

<?php

declare(strict_types=1);

/*
| Solusi referensi Soal 03-03 — Middleware Jam Buka Toko.
| Lokasi: app/Http/Middleware/PastikanTokoBuka.php
*/

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class PastikanTokoBuka
{
    /** Method HTTP yang mengubah data. */
    private const METODE_TULIS = ['POST', 'PUT', 'PATCH', 'DELETE'];

    public function handle(Request $request, Closure $next): Response
    {
        $buka = $this->tokoSedangBuka();
        $status = $buka ? 'buka' : 'tutup';

        // SEBELUM: tolak operasi tulis saat toko tutup.
        if (! $buka && in_array($request->method(), self::METODE_TULIS, true)) {
            return response()
                ->json(['message' => 'Toko sedang tutup'], 503)
                ->header('X-Toko-Status', $status);
        }

        // Teruskan ke lapisan berikutnya (middleware lain / controller).
        $response = $next($request);

        // SESUDAH: tempel header ke response yang sudah jadi.
        $response->headers->set('X-Toko-Status', $status);

        return $response;
    }

    private function tokoSedangBuka(): bool
    {
        $jamSekarang = (int) now(config('toko.zona_waktu', 'Asia/Jakarta'))->format('G');
        $jamBuka = (int) config('toko.jam_buka', 8);
        $jamTutup = (int) config('toko.jam_tutup', 21);

        // Jam tutup eksklusif: 21:00 tepat sudah tutup.
        return $jamSekarang >= $jamBuka && $jamSekarang < $jamTutup;
    }
}

/*
--- bootstrap/app.php ---

use App\Http\Middleware\PastikanTokoBuka;
use Illuminate\Foundation\Configuration\Middleware;

->withMiddleware(function (Middleware $middleware): void {
    $middleware->alias([
        'toko.buka' => PastikanTokoBuka::class,
    ]);
})

--- routes/web.php ---

Route::prefix('katalog')->name('katalog.')->middleware('toko.buka')->group(function () {
    // ... route katalog dari Soal 02 ...
    Route::post('/pesan', fn () => response()->json(['message' => 'Pesanan diterima'], 201))
        ->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class)
        ->name('pesan');
});

Catatan: withoutMiddleware(PreventRequestForgery) HANYA supaya latihan bisa
dites dengan curl tanpa token CSRF. Untuk form sungguhan jangan dimatikan.
Di Laravel 12 nama class-nya ValidateCsrfToken.

--- tests/Feature/PastikanTokoBukaTest.php (Pest) ---

use Illuminate\Support\Carbon;

function jakarta(int $jam, int $menit = 0): Carbon
{
    return Carbon::create(2026, 1, 5, $jam, $menit, 0, 'Asia/Jakarta');
}

test('POST saat buka berhasil', function () {
    $this->travelTo(jakarta(10));

    $this->postJson('/katalog/pesan')
        ->assertCreated()
        ->assertHeader('X-Toko-Status', 'buka');
});

test('POST saat tutup ditolak 503', function () {
    $this->travelTo(jakarta(22));

    $this->postJson('/katalog/pesan')
        ->assertStatus(503)
        ->assertJson(['message' => 'Toko sedang tutup'])
        ->assertHeader('X-Toko-Status', 'tutup');
});

test('GET saat tutup tetap boleh', function () {
    $this->travelTo(jakarta(22));

    $this->getJson('/katalog')
        ->assertOk()
        ->assertHeader('X-Toko-Status', 'tutup');
});

test('jam 21:00 tepat sudah tutup', function () {
    $this->travelTo(jakarta(21));

    $this->postJson('/katalog/pesan')->assertStatus(503);
});
*/

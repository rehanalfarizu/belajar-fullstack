<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Starter Soal 03-03 — Middleware Jam Buka Toko
|--------------------------------------------------------------------------
| Buat file dengan perintah:
|   php artisan make:middleware PastikanTokoBuka
| lalu ganti isinya dengan starter ini:
|   toko-latihan/app/Http/Middleware/PastikanTokoBuka.php
|
| Middleware ini BELUM kamu daftarkan. Itu bagian dari tugas
| (lihat TODO paling bawah).
*/

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class PastikanTokoBuka
{
    public function handle(Request $request, Closure $next): Response
    {
        // TODO(human): BAGIAN "SEBELUM" (sebelum request sampai controller)
        //   - Cek apakah toko sedang buka (pakai method tokoSedangBuka()).
        //   - Kalau TUTUP dan request-nya mengubah data
        //     (POST, PUT, PATCH, DELETE) → hentikan di sini.
        //     Balas JSON {"message": "Toko sedang tutup"} status 503.
        //   - GET tetap boleh lewat walaupun toko tutup.

        // TODO(human): teruskan request ke lapisan berikutnya.

        // TODO(human): BAGIAN "SESUDAH" (response sudah jadi)
        //   - Tambahkan header X-Toko-Status: "buka" atau "tutup"
        //     ke SEMUA response, termasuk response 503 di atas.

        throw new \LogicException('TODO: implementasikan handle()');
    }

    private function tokoSedangBuka(): bool
    {
        // TODO(human): ambil jam sekarang di zona waktu Asia/Jakarta.
        // TODO(human): baca jam buka dan jam tutup dari config
        //   (misal config('toko.jam_buka') dengan nilai default 8 dan 21).
        // TODO(human): buka kalau jam >= jam_buka DAN jam < jam_tutup.
        //   Pikirkan: jam 21:00 tepat itu buka atau tutup?
        throw new \LogicException('TODO: implementasikan tokoSedangBuka()');
    }
}

// TODO(human): daftarkan alias "toko.buka" di toko-latihan/bootstrap/app.php
//   di dalam ->withMiddleware(function (Middleware $middleware) { ... }).

// TODO(human): pasang middleware itu ke route group katalog dari Soal 02.

// TODO(human): tulis tests/Feature/PastikanTokoBukaTest.php.
//   Pakai "time travel" supaya test tidak tergantung jam laptop kamu.
//   Minimal 4 kasus: POST jam 10, POST jam 22, GET jam 22, POST jam 21:00 tepat.

<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — tambahan di routes/web.php
 */

use Illuminate\Support\Facades\Route;

Route::get('/tentang-toko', function () {
    // Hanya data publik. Tidak ada APP_KEY, DB_PASSWORD, atau path server.
    return response()->json([
        'nama' => config('toko.nama'),
        'kontak_email' => config('toko.kontak_email'),
        'maks_item_keranjang' => config('toko.maks_item_keranjang'),
    ]);
})->name('toko.tentang');

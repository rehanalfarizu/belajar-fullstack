<?php

declare(strict_types=1);

/**
 * Soal 02 — Route GET /tentang-toko
 * Salin ISI file ini (tanpa baris <?php dan declare) ke bagian bawah:
 * toko-latihan/routes/web.php
 */

use Illuminate\Support\Facades\Route;

Route::get('/tentang-toko', function () {
    // TODO(human): kembalikan JSON berisi nama, kontak_email, dan maks_item_keranjang.
    // TODO(human): ambil nilainya dengan config('toko.xxx'), JANGAN pakai env().
    // TODO(human): pastikan tidak ada APP_KEY, password database, atau secret lain di response.
    throw new \LogicException('TODO: implementasikan route /tentang-toko');
});

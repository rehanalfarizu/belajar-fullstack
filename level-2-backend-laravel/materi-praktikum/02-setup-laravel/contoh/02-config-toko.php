<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — config/toko.php
 */

return [
    'nama' => env('TOKO_NAMA', 'Toko Latihan'),

    // Tanpa default: kalau lupa diisi, nilainya null dan bisa dideteksi toko:cek-env.
    'kontak_email' => env('TOKO_KONTAK_EMAIL'),

    // Isi .env selalu teks, jadi di-cast ke int di sini, satu kali saja.
    'maks_item_keranjang' => (int) env('TOKO_MAKS_ITEM_KERANJANG', 20),
];

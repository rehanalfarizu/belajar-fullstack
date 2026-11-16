<?php

declare(strict_types=1);

/**
 * Soal 02 — Config dan .env
 * Salin file ini ke: toko-latihan/config/toko.php
 *
 * Aturan emas: env() HANYA boleh dipanggil di dalam folder config/.
 * Di tempat lain (route, controller, view), baca nilainya lewat config('toko.xxx').
 */

return [
    // TODO(human): 'nama' dibaca dari env TOKO_NAMA, dengan default 'Toko Latihan'.

    // TODO(human): 'kontak_email' dibaca dari env TOKO_KONTAK_EMAIL, TANPA default
    //              (kalau belum diisi, nilainya null).

    // TODO(human): 'maks_item_keranjang' dibaca dari env TOKO_MAKS_ITEM_KERANJANG,
    //              default 20, dan HARUS bertipe int (ingat: semua isi .env itu teks).
];

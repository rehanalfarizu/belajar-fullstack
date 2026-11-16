<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Starter Soal 03-02 — Route Group dan Named Route
|--------------------------------------------------------------------------
| Salin ISI file ini ke bagian BAWAH toko-latihan/routes/web.php
| (jangan hapus route bawaan yang sudah ada di sana).
|
| Data produk masih array biasa supaya kamu fokus ke routing dulu.
| Nanti di topik 05–06 data ini diganti database.
*/

use Illuminate\Support\Facades\Route;

// Data sementara. Key = slug produk.
$katalogProduk = [
    'keyboard-mekanik' => ['nama' => 'Keyboard Mekanik', 'harga' => 350000, 'kategori_id' => 1],
    'mouse-wireless' => ['nama' => 'Mouse Wireless', 'harga' => 175000, 'kategori_id' => 1],
    'buku-tulis-a5' => ['nama' => 'Buku Tulis A5', 'harga' => 12000, 'kategori_id' => 2],
];

$katalogKategori = [
    1 => 'Elektronik',
    2 => 'Alat Tulis',
];

// TODO(human): bungkus semua route katalog di dalam SATU group dengan:
//   - prefix URL  "katalog"
//   - prefix nama "katalog."
// Petunjuk: lihat bagian "Route Groups" di dokumentasi routing.

// TODO(human): GET /katalog
//   - nama route: katalog.index
//   - return JSON berisi daftar produk.
//   - setiap produk punya field "url" yang DIBUAT dengan helper route(),
//     bukan string yang kamu ketik manual.
Route::get('/katalog-todo-index', function () use ($katalogProduk) {
    throw new \LogicException('TODO: implementasikan route katalog.index');
});

// TODO(human): GET /katalog/produk/{slug}
//   - nama route: katalog.produk.show
//   - slug hanya boleh huruf kecil, angka, dan tanda minus.
//     Slug "Keyboard_Mekanik" harus ditolak oleh ROUTER (404), bukan oleh kode kamu.
//   - slug valid tapi tidak ada di data → 404 JSON.

// TODO(human): GET /katalog/kategori/{id}
//   - nama route: katalog.kategori.show
//   - id hanya angka (pakai constraint, bukan if manual).
//   - return nama kategori + daftar produk di kategori itu.

// TODO(human): URL lama /produk harus pindah PERMANEN (301) ke /katalog.
//   Tidak perlu closure. Cari method redirect khusus di dokumentasi.

// TODO(human): fallback route.
//   URL yang tidak dikenal → JSON {"message": "Halaman tidak ditemukan."} status 404.
//   Ingat: fallback harus jadi route PALING TERAKHIR di file.

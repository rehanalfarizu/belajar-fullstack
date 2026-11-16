# TUGAS — Routing dan Controller

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. `ProductController` dengan endpoint list, detail, dan create (Soal 01)
2. Route katalog yang rapi dalam satu group, punya nama, constraint, redirect, dan fallback (Soal 02)
3. Middleware `PastikanTokoBuka` yang menolak operasi tulis di luar jam buka, lengkap dengan test (Soal 03)

---

## Daftar Soal dan File

| Soal | Starter di repo ini | Salin ke `toko-latihan/` | Estimasi |
|---|---|---|---|
| [01 — Product Controller](soal/01-product-controller.md) | `code/01-product-controller.php` | `app/Http/Controllers/ProductController.php` | 60 menit |
| [02 — Route Group dan Nama](soal/02-route-group-dan-nama.md) | `code/02-routes-katalog.php` | tempel di **bawah** `routes/web.php` | 60–90 menit |
| [03 — Middleware Jam Buka](soal/03-middleware-jam-buka.md) | `code/03-middleware-jam-buka.php` | `app/Http/Middleware/PastikanTokoBuka.php` | 90–120 menit |

---

## Cara Menjalankan

Jujur dulu: **semua starter di topik ini tidak bisa dijalankan sendirian**
dengan `php file.php`. Mereka butuh Laravel. Kamu harus punya proyek
`toko-latihan` (lihat bagian "Menyiapkan Proyek Latihan" di
[README praktikum](../README.md)).

```bash
cd ~/latihan-laravel/toko-latihan
php artisan serve            # server di http://127.0.0.1:8000
```

Buka terminal kedua untuk `curl` dan `php artisan test`.

Untuk Soal 01, daftarkan route-nya sendiri di `routes/web.php`
(`Route::get('/products', ...)` dan seterusnya). Untuk mengirim POST dengan
curl ke `routes/web.php` kamu akan kena CSRF (`419`). Uji POST lewat feature
test saja. Itu cara yang dipakai di dunia kerja juga.

---

## Bagian A: Product Controller (Soal 01)

### Langkah

1. Baca `soal/01-product-controller.md`.
2. Buat controller: `php artisan make:controller ProductController`, lalu ganti isinya dengan starter.
3. Daftarkan 3 route di `routes/web.php`.
4. Isi bagian `TODO`.
5. Buat test: `php artisan make:test ProductControllerTest`.

### Verifikasi

- [ ] `GET /products` → `200`
- [ ] `GET /products/1` → `200`, `GET /products/99` → `404`
- [ ] Test POST tanpa `name` → `422`, dengan data lengkap → `201`

---

## Bagian B: Route Group dan Nama (Soal 02)

### Langkah

1. Baca `soal/02-route-group-dan-nama.md` sampai habis, terutama tabel Syarat.
2. Tempel isi `code/02-routes-katalog.php` di bagian bawah `routes/web.php`.
   Baris `use Illuminate\Support\Facades\Route;` jangan dobel.
3. Hapus route sementara `/katalog-todo-index` setelah kamu membuat route aslinya.
4. Kerjakan TODO satu per satu. Setelah **setiap** TODO, jalankan `php artisan route:list --name=katalog`.
5. Tulis test di `tests/Feature/KatalogRouteTest.php`.

### Verifikasi

- [ ] `route:list --name=katalog` menampilkan tepat 3 route
- [ ] Slug `Keyboard_Mekanik` dan kategori `abc` → `404`
- [ ] `/produk` → `301` ke `/katalog`
- [ ] URL ngawur + `Accept: application/json` → JSON 404

---

## Bagian C: Middleware Jam Buka (Soal 03)

### Langkah

1. Baca `soal/03-middleware-jam-buka.md`.
2. `php artisan make:middleware PastikanTokoBuka`, lalu ganti isinya dengan starter.
3. Isi `tokoSedangBuka()` dulu. Uji cepat di `php artisan tinker` dengan memanggil logika jamnya secara manual.
4. Isi `handle()`: bagian sebelum, `$next`, bagian sesudah.
5. Daftarkan alias `toko.buka` di `bootstrap/app.php`.
6. Pasang ke group katalog, tambah route `POST /katalog/pesan` sederhana.
7. Tulis 4 test dengan time travel.

### Verifikasi

- [ ] `route:list -v --name=katalog` memperlihatkan middleware kamu
- [ ] 4 test lulus, kapan pun dijalankan
- [ ] Header `X-Toko-Status` ada di response `200` **dan** `503`

---

## Petunjuk Kalau Macet

Buka petunjuk secara berurutan. Coba dulu 15 menit sebelum naik ke petunjuk berikutnya.

### Soal 02

1. **Petunjuk 1 (arah berpikir):** Semua route katalog punya awalan URL dan awalan nama yang sama. Bagian mana dari route yang bisa "diwariskan" ke banyak route sekaligus?
2. **Petunjuk 2 (fitur):** Cari di dokumentasi routing: "Route Prefixes", "Route Name Prefixes", "Regular Expression Constraints", "Redirect Routes", "Fallback Routes". Ada helper constraint khusus angka.
3. **Petunjuk 3 (langkah):** prefix → name → group berisi 3 route → di luar group: redirect permanen → paling bawah: fallback. Di route index, loop data, dan setiap item panggil helper URL dengan nama route lengkap (prefix nama + nama route).

### Soal 03

1. **Petunjuk 1 (arah berpikir):** Ada dua keputusan terpisah: "toko buka atau tidak?" dan "request ini mengubah data atau tidak?". Request ditolak hanya kalau **dua-duanya** mengarah ke "tolak".
2. **Petunjuk 2 (fitur):** `now()` menerima argumen zona waktu. `$request->method()` memberi method HTTP. `$response->headers->set()` menambah header. Di test, cari `travelTo` di halaman Mocking.
3. **Petunjuk 3 (langkah):** hitung status buka → kalau tutup dan method termasuk daftar method tulis, buat response JSON 503 dan tempel header, lalu return → selain itu panggil `$next` → tempel header ke response hasilnya → return.

### Error yang sering muncul

- **`Target class [toko.buka] does not exist`** → alias belum didaftarkan, atau salah ketik nama.
- **`419 Page Expired`** saat curl POST → itu CSRF, bukan bug middleware kamu. Uji POST lewat test.
- **Test lulus siang, gagal malam** → kamu belum memakai time travel, atau zona waktunya beda.

---

## Cara Mengecek Hasil Sendiri

```bash
# 1. Sintaks
php -l app/Http/Controllers/ProductController.php
php -l app/Http/Middleware/PastikanTokoBuka.php
php -l routes/web.php
php -l bootstrap/app.php

# 2. Daftar route + middleware
php artisan route:list --name=katalog
php artisan route:list -v --name=katalog

# 3. Test otomatis
php artisan test

# 4. Uji manual (server jalan di terminal lain)
curl -i http://127.0.0.1:8000/products                        # 200
curl -i http://127.0.0.1:8000/products/99                     # 404
curl -i http://127.0.0.1:8000/katalog                         # 200 + X-Toko-Status
curl -i http://127.0.0.1:8000/katalog/produk/Keyboard_Mekanik # 404
curl -i http://127.0.0.1:8000/katalog/kategori/abc            # 404
curl -i http://127.0.0.1:8000/produk                          # 301, Location: /katalog
curl -i -H "Accept: application/json" http://127.0.0.1:8000/ngawur   # 404 JSON
```

Kalau semua status code sesuai komentar di kanan, kamu sudah di jalur yang benar.

---

## File yang Perlu Diisi

```text
toko-latihan/
├── app/Http/Controllers/ProductController.php   ← Soal 01
├── app/Http/Middleware/PastikanTokoBuka.php     ← Soal 03
├── bootstrap/app.php                            ← Soal 03 (alias)
├── routes/web.php                               ← Soal 01, 02, 03
└── tests/Feature/
    ├── ProductControllerTest.php                ← Soal 01
    ├── KatalogRouteTest.php                     ← Soal 02
    └── PastikanTokoBukaTest.php                 ← Soal 03
```

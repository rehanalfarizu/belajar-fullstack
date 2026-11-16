# TUGAS — Form Request & Validasi

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. `StoreProductRequest` dan `UpdateProductRequest` yang dipakai controller produk
2. Bukti tertulis bahwa validasi HTML bisa dibobol, plus perbaikannya di server
3. Form Blade yang menampilkan error per field dan mengisi ulang nilai lama
4. Feature test yang mengunci semua aturan validasi

---

## Daftar Soal dan File

| Soal | Starter di repo ini | Salin ke (di `toko-latihan/`) | Estimasi |
|---|---|---|---|
| [01 — StoreProductRequest](soal/01-store-product-request.md) | `code/01-store-product-request.php` | `app/Http/Requests/StoreProductRequest.php` | 45–60 menit |
| [02 — UpdateProductRequest](soal/02-update-product-request.md) | `code/02-update-product-request.php` | `app/Http/Requests/UpdateProductRequest.php` | 60–90 menit |
| [03 — Validasi Server Wajib](soal/03-validasi-server-wajib.md) | `code/03-store-controller-tanpa-validasi.php` | `app/Http/Controllers/LatihanProductController.php` | 90–120 menit |

---

## Cara Menjalankan (Jujur Saja)

File di folder `code/` **tidak bisa dijalankan sendirian** dengan `php nama-file.php`.
Mereka adalah potongan class Laravel. Kamu harus menaruhnya di dalam project Laravel.

1. Siapkan project `toko-latihan` di luar repo ini (lihat [Materi Praktikum README](../README.md)):

   ```bash
   cd ~ && mkdir -p latihan-laravel && cd latihan-laravel
   composer create-project laravel/laravel toko-latihan
   cd toko-latihan
   ```

2. Pastikan topik 05 dan 06 sudah jalan: tabel `products` dan `categories`, model
   `Product` dan `Category` dengan `$fillable`.
3. Untuk uji pakai curl di route `/api/...`, aktifkan routing API sekali saja:

   ```bash
   php artisan install:api
   ```

4. Jalankan server di terminal terpisah:

   ```bash
   php artisan serve
   ```

5. Salin starter ke lokasi tujuan di tabel, lalu **ketik ulang** bagian TODO.

---

## Bagian A: StoreProductRequest (Soal 01)

### Langkah

1. `php artisan make:request StoreProductRequest`
2. Bandingkan dengan starter `code/01-store-product-request.php`, isi `rules()` dan `messages()`
3. Pakai di `ProductController@store` dengan type-hint `StoreProductRequest $request`
4. Simpan dengan `Product::create($request->validated())`

### Verifikasi

- [ ] Payload valid menghasilkan `201`
- [ ] Slug duplikat menghasilkan `422`
- [ ] Field tambahan `is_admin` tidak tersimpan

---

## Bagian B: UpdateProductRequest (Soal 02)

### Langkah

1. `php artisan make:request UpdateProductRequest`
2. Salin isi TODO dari `code/02-update-product-request.php`
3. Daftarkan route `PATCH /products/{product}` di `routes/api.php` dengan middleware `auth:sanctum`
   (atau di `routes/web.php` dengan middleware `auth` kalau kamu memakai form)
4. Isi `authorize()`, `prepareForValidation()`, `rules()`, `after()`, `attributes()`
5. Tulis `tests/Feature/UpdateProductTest.php`

### Verifikasi

- [ ] PATCH hanya `price` berhasil dan field lain tidak berubah
- [ ] Slug milik sendiri boleh, slug milik produk lain `422`
- [ ] `"350.000"` tersimpan sebagai `350000`
- [ ] Stok 0 + aktif ditolak `422` di field `is_active`

---

## Bagian C: Validasi Server Wajib (Soal 03)

### Langkah

1. Salin `code/03-store-controller-tanpa-validasi.php` ke `app/Http/Controllers/LatihanProductController.php`
2. Salin form dari soal 03 ke `resources/views/latihan/products/create.blade.php`
3. Tambahkan route:
   - `routes/web.php`: `GET /latihan/products/create` (nama `latihan.products.create`) dan `POST /latihan/products` (nama `latihan.products.store`)
   - `routes/api.php`: `POST /latihan/products` → otomatis jadi `/api/latihan/products`
4. **Bobol dulu**: buka form, hapus `min` dan `required` lewat DevTools, kirim harga `-50000`. Lalu kirim lewat curl. Catat di `catatan-07.md`
5. Baru perbaiki: tambahkan validasi server
6. Tambahkan `@error` dan `old()` di form
7. Tulis `tests/Feature/LatihanProductValidationTest.php`

### Verifikasi

- [ ] Sebelum perbaikan: harga negatif tersimpan (bukti ada di catatan)
- [ ] Sesudah perbaikan: curl yang sama dapat `422`
- [ ] Form web menampilkan error dan nilai lama terisi lagi
- [ ] 5 test lulus

---

## Petunjuk Kalau Macet

Buka petunjuk **satu per satu**. Coba lagi sendiri setelah setiap petunjuk.

### Soal 02

- **Petunjuk 1 (arah berpikir):** Tanyakan pada dirimu, "kalau field ini tidak dikirim, apakah itu salah?" Untuk PATCH jawabannya tidak. Lalu "kalau dikirim kosong?" Jawabannya salah.
- **Petunjuk 2 (nama fitur):** Cari di dokumentasi validasi: "Validating When Present", "Forcing a Unique Rule to Ignore a Given ID", "Preparing Input for Validation", "Performing Additional Validation".
- **Petunjuk 3 (pseudo-langkah):** di `after()`: (1) kalau sudah ada error di stok/aktif, berhenti; (2) tentukan stok akhir = input kalau ada, kalau tidak ambil dari produk di route; (3) sama untuk status aktif; (4) kalau aktif dan stok nol, tambahkan error ke field status.

### Soal 03

- **Petunjuk 1 (arah berpikir):** Siapa yang mengontrol browser? Kalau jawabannya "pengguna", apa pun di browser bisa diubah.
- **Petunjuk 2 (nama fitur):** Kena `419` saat curl? Baca soal tentang CSRF dan pakai route di `routes/api.php`. Untuk menampilkan error: cari directive `@error` dan helper `old()`.
- **Petunjuk 3 (pseudo-langkah):** (1) simpan hasil validasi ke variabel; (2) kirim variabel itu ke `create`, bukan input mentah; (3) di test, siapkan satu kategori, lalu kirim payload yang diubah satu field per test.

---

## Cara Mengecek Hasil Sendiri

```bash
# 1. Sintaks PHP
php -l app/Http/Requests/StoreProductRequest.php
php -l app/Http/Requests/UpdateProductRequest.php
php -l app/Http/Controllers/LatihanProductController.php

# 2. Route terdaftar
php artisan route:list --path=products
php artisan route:list --path=latihan

# 3. Buat satu kategori untuk uji manual
php artisan tinker
>>> App\Models\Category::create(['name' => 'Aksesoris'])

# 4. Harus 422 (harga negatif)
curl -i -X POST http://127.0.0.1:8000/api/latihan/products \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"name":"Mouse","slug":"mouse","price":-1,"stock":1,"category_id":1}'

# 5. Harus 201 (valid)
curl -i -X POST http://127.0.0.1:8000/api/latihan/products \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"name":"Mouse","slug":"mouse","price":175000,"stock":3,"category_id":1}'

# 6. Harus 419 (route web tanpa token CSRF) — ini bukan bukti validasi aman!
curl -i -X POST http://127.0.0.1:8000/latihan/products \
  -H "Accept: application/json" -d 'name=x&price=-1'

# 7. Semua test
php artisan test
```

Status yang diharapkan:

| Kasus | Status |
|---|---|
| Valid via API | `201` |
| Input salah via API (`Accept: application/json`) | `422` |
| Input salah via form web | `302` kembali ke form + error |
| Route web tanpa token CSRF | `419` |
| Edit produk tanpa login (API) | `401` |
| Edit produk oleh user biasa | `403` |

---

## File yang Perlu Diisi

```text
toko-latihan/
├── app/Http/Requests/StoreProductRequest.php       ← Soal 01
├── app/Http/Requests/UpdateProductRequest.php      ← Soal 02
├── app/Http/Controllers/LatihanProductController.php ← Soal 03
├── resources/views/latihan/products/create.blade.php ← Soal 03
├── tests/Feature/UpdateProductTest.php             ← Soal 02
├── tests/Feature/LatihanProductValidationTest.php   ← Soal 03
└── catatan-07.md                                   ← bukti bobol + refleksi
```

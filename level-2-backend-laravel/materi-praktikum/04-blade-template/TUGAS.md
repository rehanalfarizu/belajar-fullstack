# TUGAS — Blade Template

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Halaman daftar produk dengan layout, `@forelse`, dan flash message (Soal 01)
2. Komponen `<x-product-card>` yang dipakai ulang + layout dengan `@yield` dan `@stack` (Soal 02)
3. Halaman detail produk yang tahan XSS di konteks HTML, URL, dan JavaScript, plus form dengan CSRF (Soal 03)
4. Pengalaman **menyerang lalu menambal** aplikasimu sendiri

---

## Daftar Soal dan File

| Soal | Starter di repo ini | Salin ke `toko-latihan/` | Estimasi |
|---|---|---|---|
| [01 — Product List](soal/01-products-view.md) | `code/01-products.blade.php` | `resources/views/products/index.blade.php` | 60 menit |
| [02 — Layout dan Komponen](soal/02-layout-dan-component.md) | `code/02-product-card.blade.php` | `resources/views/components/product-card.blade.php` | 60–90 menit |
| [03 — XSS dan Escape](soal/03-xss-dan-escape.md) | `code/03-detail-produk-aman.blade.php` (**sengaja rentan**) | `resources/views/products/show.blade.php` | 120 menit |

---

## Cara Menjalankan

Jujur dulu: file `.blade.php` **tidak bisa** dijalankan dengan `php file.php`
dan `php -l` tidak memeriksa sintaks Blade. Blade hanya bisa dicek lewat
Laravel. Kamu butuh proyek `toko-latihan` (lihat "Menyiapkan Proyek Latihan"
di [README praktikum](../README.md)).

### Prasyarat data

View butuh data `$products` / `$product` dari controller. Ada dua jalur:

- **Jalur lengkap (disarankan untuk Soal 03):** kerjakan dulu
  [05 Soal 01 (migration products)](../05-database-migration/soal/01-products-migration.md) dan
  [06 Soal 01 (model Product)](../06-eloquent-orm/soal/01-product-model.md), lalu buat
  `ProductController` dengan `index`, `show`, `update` dan
  `Route::resource('products', ProductController::class)->only(['index', 'show', 'update']);`.
- **Jalur cepat (cukup untuk Soal 01–02):** buat route closure yang mengirim
  data palsu, misalnya array berisi object dengan `(object) ['id' => 1, 'name' => ..., 'price' => ..., 'stock' => ..., 'is_active' => true]`.
  Ingat: `route('products.show', $product)` butuh route bernama `products.show`.

Tujuan topik ini adalah **view**, jadi jangan habiskan waktu berlama-lama di
controller. Isi controller cukup ambil data lalu `return view(...)`.

```bash
cd ~/latihan-laravel/toko-latihan
php artisan serve            # http://127.0.0.1:8000
```

---

## Bagian A: Product List (Soal 01)

### Langkah

1. Baca `soal/01-products-view.md`.
2. Buat `resources/views/layouts/app.blade.php` minimal (`<html lang="id">`, `@yield('title')`, `@yield('content')`).
3. Salin starter ke `resources/views/products/index.blade.php`, isi TODO.
4. Kirim `$products` dari controller atau route closure.

### Verifikasi

- [ ] Data kosong → tampil "Belum ada produk."
- [ ] Satu dan banyak produk tampil benar
- [ ] Flash message muncul setelah redirect dengan `->with('success', '...')`

---

## Bagian B: Layout dan Komponen (Soal 02)

### Langkah

1. Baca `soal/02-layout-dan-component.md`.
2. Salin starter ke `resources/views/components/product-card.blade.php`.
3. Isi `@props` dulu, lalu pembungkus `<article>`, lalu nama dan harga.
4. Tambahkan badge stok, lalu slot aksi.
5. Rapikan layout: tambahkan `@stack` sebelum `</body>`.
6. Ganti isi loop di halaman daftar produk jadi `<x-product-card ...>`.

### Verifikasi

- [ ] `php artisan view:cache` sukses
- [ ] Badge benar untuk stok 0, 3, 10
- [ ] `class="sorot"` dari pemanggil tergabung dengan `product-card`
- [ ] Tanpa slot → tidak ada `<div>` aksi kosong

---

## Bagian C: XSS dan Escape (Soal 03)

> ⚠️ Starter Soal 03 **sengaja rentan**. Pakai hanya di localhost, jangan
> di-deploy, dan jangan pernah mencoba payload ke aplikasi orang lain.

### Langkah

1. Baca `soal/03-xss-dan-escape.md` dan [modul 06 — XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md).
2. Salin starter **apa adanya** ke `resources/views/products/show.blade.php`.
3. **Serang dulu.** Isi data produk dengan payload lewat `php artisan tinker`, buka halamannya, catat setiap popup di `catatan-xss.md`.
4. Tandai setiap lubang dengan komentar `{{-- RENTAN #n: ... --}}`.
5. Tambal satu per satu. Setelah setiap tambalan, refresh browser dan cek View Page Source.
6. Tulis `tests/Feature/ProductShowXssTest.php`.

### Verifikasi

- [ ] Tidak ada popup untuk payload apa pun
- [ ] Link `javascript:` tidak dirender
- [ ] Baris baru di deskripsi tetap tampil
- [ ] Form punya `@csrf` dan `@method('PUT')`
- [ ] Test XSS hijau

---

## Petunjuk Kalau Macet

Buka petunjuk secara berurutan. Coba dulu 15 menit sebelum naik ke petunjuk berikutnya.

### Soal 02

1. **Petunjuk 1 (arah berpikir):** Komponen menerima tiga jenis "kiriman": data (props), atribut HTML (class dll), dan potongan HTML (slot). Pisahkan dulu mana yang termasuk jenis apa.
2. **Petunjuk 2 (fitur):** Di dokumentasi Blade cari "Data Properties / Attributes", "Default / Merged Attributes", dan "Slots". Untuk format Rupiah, cari fungsi PHP `number_format` dan argumen pemisah ribuannya.
3. **Petunjuk 3 (langkah):** `@props` dengan default → `<article>` + merge class → nama → harga → `@if` tampilkanStok berisi rantai `@if/@elseif/@else` stok → cek slot tidak kosong → render slot.

### Soal 03

1. **Petunjuk 1 (arah berpikir):** Untuk setiap data, tanya dua hal: "Data ini dari siapa?" dan "Data ini mendarat di konteks apa: isi HTML, atribut URL, atau JavaScript?" Konteks yang beda butuh perlakuan beda.
2. **Petunjuk 2 (fitur):** Cari `e()` (helper escape), `nl2br` (PHP), `parse_url` dengan `PHP_URL_SCHEME` (PHP), `Js::from` (Blade "Rendering JSON"), `@csrf` dan `@method` (Blade "Forms").
3. **Petunjuk 3 (langkah):** ganti semua `{!! !!}` jadi `{{ }}` dulu → untuk deskripsi: escape lalu ubah baris baru, baru cetak tanpa escape ulang → untuk website: hitung skema di `@php` atau di controller, render link hanya kalau skema masuk allowlist → untuk script: ganti kutip manual dengan encoder JSON → form: tambah dua directive dan pakai named route.

### Error yang sering muncul

- **`Undefined variable $product`** → controller belum mengirim data ke view.
- **`Route [products.show] not defined`** → route belum diberi nama (resource route otomatis memberi nama).
- **`419 Page Expired`** saat submit form → `@csrf` belum ada. Bagus, berarti proteksinya bekerja.
- **`<br />` tampil sebagai teks** → urutan `e()` dan `nl2br()` terbalik.

---

## Cara Mengecek Hasil Sendiri

```bash
# 1. Blade dikompilasi tanpa error (php -l tidak bisa cek Blade)
php artisan view:clear
php artisan view:cache

# 2. Sintaks PHP controller/route
php -l app/Http/Controllers/ProductController.php
php -l routes/web.php
php artisan route:list --name=products

# 3. Test otomatis
php artisan test

# 4. Uji manual (server jalan di terminal lain)
curl -s http://127.0.0.1:8000/products | grep -c "product-card"
curl -s "http://127.0.0.1:8000/products/1?q=%3Cscript%3Ealert(1)%3C/script%3E" | grep -n "&lt;script&gt;"
curl -s http://127.0.0.1:8000/products/1 | grep -n "javascript:"    # harus kosong
curl -s http://127.0.0.1:8000/products/1 | grep -n "_token"         # harus ada (dari @csrf)
```

Untuk XSS, cek juga di browser: buka DevTools (F12) → tab Console. Tidak
boleh ada `alert` atau error dari script yang tidak kamu tulis.

---

## File yang Perlu Diisi

```text
toko-latihan/
├── resources/views/
│   ├── layouts/app.blade.php               ← Soal 01, 02
│   ├── components/product-card.blade.php   ← Soal 02
│   └── products/
│       ├── index.blade.php                 ← Soal 01, 02
│       └── show.blade.php                  ← Soal 03
├── tests/Feature/ProductShowXssTest.php    ← Soal 03
└── catatan-xss.md                          ← Soal 03 (bukti serangan & tambalan)
```

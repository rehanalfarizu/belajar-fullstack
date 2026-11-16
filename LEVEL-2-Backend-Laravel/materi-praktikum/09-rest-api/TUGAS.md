# TUGAS — 09 REST API

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. API `/api/products` lengkap (baca publik, tulis butuh login) dengan pagination dan status code yang benar
2. JSON produk yang **tidak membocorkan** harga modal, catatan internal, dan id admin
3. Endpoint token Sanctum + rate limit yang terbukti menolak brute force dengan `429`
4. Feature test untuk jalur sukses dan jalur gagal

---

## Daftar Soal dan File

| Soal | Starter | Salin ke (di `toko-latihan`) | Estimasi |
|---|---|---|---|
| [01 — REST API Products](soal/01-product-api.md) | `code/01-product-api.php` | `routes/api.php` | 120 menit |
| [02 — API Resource Tanpa Bocor](soal/02-api-resource-tanpa-bocor.md) | `code/02-product-resource.php` | `app/Http/Resources/ProductResource.php` | 90 menit |
| [03 — Rate Limit dan Token](soal/03-rate-limit-dan-token.md) | `code/03-rate-limiter-api.php` | dipecah ke 3 file (lihat Bagian C) | 120 menit |

---

## Cara Menjalankan (Jujur Dulu)

File di folder `code/` **tidak bisa dijalankan sendirian** dengan `php file.php`.
Semuanya adalah potongan class/route Laravel. Kamu harus menyalinnya ke project
latihan `toko-latihan` yang dibuat di luar repo ini. Cara membuatnya ada di
[README praktikum](../README.md) bagian "Menyiapkan Proyek Latihan toko-latihan".

Yang bisa kamu lakukan langsung di repo ini hanya cek sintaks:

```bash
php -l LEVEL-2-Backend-Laravel/materi-praktikum/09-rest-api/code/02-product-resource.php
```

Persiapan khusus topik ini (sekali saja, di folder `toko-latihan`):

```bash
php artisan install:api          # pasang Sanctum + buat routes/api.php
php artisan migrate
php artisan serve                # API jalan di http://127.0.0.1:8000
```

Kamu butuh model `Product` dan `Category` dari topik 05–06, serta policy dari
topik 08. Kalau belum, kerjakan dulu.

---

## Bagian A: REST API Products (Soal 01)

### Langkah

1. Buat controller: `php artisan make:controller Api/ProductController --api --model=Product`
2. Salin `code/01-product-api.php` ke `routes/api.php` (gabungkan dengan isi yang sudah ada)
3. Lengkapi semua `TODO` di route
4. Isi method controller satu per satu: `index` dulu, tes, baru `show`, dan seterusnya
5. Tulis feature test untuk `201`, `204`, `404`, `422`

### Verifikasi

- [ ] `php artisan route:list --path=api` menampilkan 6 route products
- [ ] `GET /api/products` punya key `data`, `links`, `meta`
- [ ] Create → `201`, delete → `204`, id tidak ada → `404`

---

## Bagian B: API Resource Tanpa Bocor (Soal 02)

### Langkah

1. **Lihat masalahnya dulu.** Buat migration kolom `harga_modal`, `catatan_internal`, `user_id`. Isi data. Sementara buat `show()` yang `return $product;` lalu curl. Catat kolom yang bocor di `CATATAN-09.md`
2. Salin `code/02-product-resource.php` ke `app/Http/Resources/ProductResource.php`
3. Buat `CategoryResource` dengan `php artisan make:resource CategoryResource`
4. Kerjakan `TODO(human)` di resource, model (`$hidden`), controller, dan `bootstrap/app.php`
5. Tulis test guest vs admin

### File yang perlu diedit

`app/Http/Resources/ProductResource.php` — cari bagian `TODO(human)`

### Verifikasi

- [ ] Guest tidak melihat `harga_modal`
- [ ] Tidak ada user yang melihat `catatan_internal` dan `user_id`
- [ ] `category` hanya muncul di `index` (yang memakai `with`)
- [ ] 404 API berbentuk `{"message": "Data tidak ditemukan.", "kode": "TIDAK_DITEMUKAN"}`

---

## Bagian C: Rate Limit dan Token (Soal 03)

### Langkah

1. Pastikan `User` memakai trait `HasApiTokens`
2. Buka `code/03-rate-limiter-api.php`. File ini berisi 3 bagian:
   - **BAGIAN 1** → isi fungsi disalin ke `app/Providers/AppServiceProvider.php` method `boot()`
   - **BAGIAN 2** → class disalin ke `app/Http/Controllers/Api/TokenController.php`
   - **BAGIAN 3** → komentar route disalin ke `routes/api.php`
3. Kerjakan limiter dulu, tes dengan loop curl, baru endpoint token
4. Tambahkan cek ability + policy di `ProductController`
5. Tulis feature test

### Verifikasi

- [ ] Percobaan login ke-6 dalam semenit → `429` dengan header `Retry-After`
- [ ] Pesan login salah sama persis untuk "email tidak ada" dan "password salah"
- [ ] Token tanpa ability `produk:tulis` → `403`
- [ ] Token yang sudah dicabut → `401`

---

## Petunjuk Kalau Macet

Buka petunjuk **berurutan**. Jangan langsung loncat ke petunjuk 3.

### Soal 02 — Resource

1. **Petunjuk 1 (arah berpikir):** Tulis dulu di kertas JSON yang kamu inginkan
   untuk guest dan untuk admin. Bedanya di mana? Itulah satu-satunya bagian yang
   butuh kondisi.
2. **Petunjuk 2 (fitur):** Cari di dokumentasi Eloquent API Resources bagian
   "Conditional Attributes" dan "Conditional Relationships". Untuk tanggal, cari
   method Carbon yang namanya mengandung `Iso8601`.
3. **Petunjuk 3 (pseudo-langkah):**
   - return array berisi field publik satu per satu
   - untuk label harga: panggil helper dengan angka harga
   - untuk kategori: bungkus resource kategori di sekitar "relasi kalau sudah dimuat"
   - untuk harga modal: "kalau user (dari guard yang bisa membaca token) boleh update resource ini, maka harga modal"
   - di `bootstrap/app.php`: daftarkan render untuk exception 404, cek apakah path diawali `api/`

### Soal 03 — Rate limit dan token

1. **Petunjuk 1 (arah berpikir):** Rate limiter itu cuma "kunci" + "jatah". Tulis
   untuk tiap limiter: kuncinya apa, jatahnya berapa per berapa lama.
2. **Petunjuk 2 (fitur):** Dokumentasi Routing bagian "Rate Limiting" (lihat
   `->by()` dan `->response()`). Dokumentasi Sanctum bagian "Issuing API Tokens",
   "Token Abilities", dan "Revoking Tokens".
3. **Petunjuk 3 (pseudo-langkah):**
   - validasi input → cari user by email
   - kalau user kosong ATAU hash tidak cocok → lempar error validasi dengan satu pesan
   - buat token dengan nama perangkat + daftar ability berisi satu item
   - balas JSON berisi teks token, status 201
   - revoke: ambil token yang sedang dipakai dari user request, hapus

### Error umum

- **`Rate limiter [api] is not defined`** → kamu belum mendaftarkan limiter `api` di `boot()`
- **Dapat `302` bukan `422`** → lupa header `Accept: application/json`
- **`Call to undefined method createToken()`** → trait `HasApiTokens` belum dipasang di `User`
- **Hitungan limit tidak reset** → `php artisan cache:clear`

---

## Cara Mengecek Hasil Sendiri

Semua perintah dijalankan di folder `toko-latihan`, server menyala di
`http://127.0.0.1:8000`.

```bash
# 1. Sintaks
php -l app/Http/Resources/ProductResource.php
php -l app/Http/Controllers/Api/TokenController.php
php -l app/Providers/AppServiceProvider.php

# 2. Route dan middleware
php artisan route:list --path=api -v

# 3. Siapkan admin untuk tes (sekali saja)
php artisan tinker --execute="App\Models\User::factory()->create(['email' => 'admin@toko.test', 'password' => 'password-latihan', 'role' => 'admin']);"

# 4. Kebocoran: harus 0
curl -s http://127.0.0.1:8000/api/products -H "Accept: application/json" | grep -c harga_modal

# 5. 404 konsisten (harus 404 + kode TIDAK_DITEMUKAN)
curl -i http://127.0.0.1:8000/api/products/99999 -H "Accept: application/json"

# 6. Brute force: harus 422 x5 lalu 429
for i in 1 2 3 4 5 6 7; do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://127.0.0.1:8000/api/token \
    -H "Accept: application/json" -H "Content-Type: application/json" \
    -d '{"email":"admin@toko.test","password":"salah","device_name":"x"}'
done

# 7. Header rate limit di request normal
curl -s -i http://127.0.0.1:8000/api/products -H "Accept: application/json" | grep -i x-ratelimit

# 8. Semua test
php artisan test
```

Ringkasan status yang diharapkan:

| Aksi | Status |
|---|---|
| GET daftar produk | `200` |
| GET produk tidak ada | `404` |
| POST token benar | `201` |
| POST token salah | `422` |
| POST token ke-6 dalam semenit | `429` |
| POST produk tanpa token | `401` |
| POST produk, token tanpa ability | `403` |
| DELETE token | `204` |

---

## File yang Perlu Diisi

```text
toko-latihan/
├── routes/api.php                                   ← soal 01 + 03
├── app/Http/Controllers/Api/ProductController.php   ← soal 01 + 03
├── app/Http/Controllers/Api/TokenController.php     ← soal 03
├── app/Http/Resources/ProductResource.php           ← soal 02
├── app/Http/Resources/CategoryResource.php          ← soal 02
├── app/Providers/AppServiceProvider.php             ← soal 03
├── bootstrap/app.php                                ← soal 02
├── tests/Feature/...                                ← semua soal
└── CATATAN-09.md                                    ← catatan + refleksi
```

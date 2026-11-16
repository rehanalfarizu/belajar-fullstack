# TUGAS — Autentikasi & Otorisasi

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. `ProductPolicy` yang membedakan admin, penjual pemilik, dan user lain
2. Login, logout, dan register buatan sendiri dengan password ter-hash dan batas percobaan
3. Bukti tertulis celah IDOR sebelum diperbaiki, lalu perbaikannya
4. Feature test yang mengunci aturan akses untuk setiap jenis aktor

---

## Daftar Soal dan File

| Soal | Starter di repo ini | Salin ke (di `toko-latihan/`) | Estimasi |
|---|---|---|---|
| [01 — Authentication dan Authorization](soal/01-auth-authorization.md) | `code/01-product-policy.php` | `app/Policies/ProductPolicy.php` | 60–90 menit |
| [02 — Login Manual dan Hash](soal/02-login-manual-dan-hash.md) | `code/02-login-controller.php` | `app/Http/Controllers/Auth/SesiController.php` (+ buat `RegisterController.php` sendiri) | 90–120 menit |
| [03 — IDOR dan Policy Kepemilikan](soal/03-idor-dan-policy-kepemilikan.md) | `code/03-product-ownership-policy.php` | dipecah: `app/Http/Controllers/PenjualProductController.php` dan `app/Policies/ProductPolicy.php` (gabung dengan soal 01) | 120–150 menit |

---

## Cara Menjalankan (Jujur Saja)

File di `code/` adalah potongan class Laravel. Mereka **tidak bisa** dijalankan
dengan `php nama-file.php`. Taruh di project `toko-latihan` (lihat
[Materi Praktikum README](../README.md)).

Persiapan sekali saja:

```bash
cd ~/latihan-laravel/toko-latihan

# 1. Kolom role di tabel users (kalau belum ada dari soal 01)
php artisan make:migration add_role_to_users_table
#    isi: $table->string('role')->default('pembeli');

# 2. Routing API + Sanctum (untuk soal 03 dan uji curl)
php artisan install:api

# 3. Model User perlu trait HasApiTokens untuk createToken() (cek pesan dari install:api)

php artisan migrate
php artisan serve
```

Soal 03 juga butuh kolom `products.user_id` — langkahnya ada di Bagian C.

---

## Bagian A: Policy Berbasis Role (Soal 01)

### Langkah

1. `php artisan make:policy ProductPolicy --model=Product`
2. Isi aturan dari starter `code/01-product-policy.php`
3. Lindungi route create/update/delete dengan middleware `auth`
4. Di controller, panggil `Gate::authorize('create', Product::class)` dan sejenisnya

### Verifikasi

- [ ] Guest → `401` (API) atau redirect `302` ke login (web)
- [ ] User biasa → `403`
- [ ] Admin → berhasil

---

## Bagian B: Login Manual (Soal 02)

### Langkah

1. Buat folder `app/Http/Controllers/Auth/`, salin starter jadi `SesiController.php`
2. Buat `RegisterController.php` sendiri sesuai catatan di bawah starter
3. Buat view `resources/views/auth/login.blade.php` (form POST, `@csrf`, email, password, checkbox `ingat`)
4. Buat view `resources/views/dashboard.blade.php` sederhana dengan tombol logout (form POST + `@csrf`)
5. Daftarkan route `login` (GET/POST, middleware `guest`), `logout` (POST, middleware `auth`), `dashboard` (GET, middleware `auth`)
6. Isi TODO di `store()` dan `destroy()`
7. Tulis `tests/Feature/SesiTest.php`

### Verifikasi

- [ ] Password di database diawali `$2y$`
- [ ] Pesan gagal sama untuk email salah dan password salah
- [ ] Percobaan ke-6 dalam semenit → `429`
- [ ] Cookie session berubah nilainya setelah login
- [ ] `/dashboard` tanpa login → `302` ke `/login`

---

## Bagian C: IDOR (Soal 03)

### Langkah

1. Tambah kolom pemilik:

   ```bash
   php artisan make:migration add_user_id_to_products_table
   php artisan migrate
   ```

   (isi migration: foreign key `user_id` ke `users` — kamu sudah belajar ini di topik 05)
2. Tambah relasi `User::products()` dan `Product::user()`
3. Salin controller dari starter (masih rentan), daftarkan route di `routes/api.php` dengan prefix `penjual` dan middleware `auth:sanctum`
4. **Reproduksi bug**: buat user A, B, admin di tinker; buat produk milik A; pakai token B untuk PATCH produk A. Catat hasilnya
5. Baru perbaiki: policy `before`, `update`, `delete`; pasang di controller atau route; perbaiki `index`
6. Tambah Gate `lihat-laporan-penjualan` di `app/Providers/AppServiceProvider.php`
7. Tulis `tests/Feature/PenjualProductAccessTest.php` untuk seluruh matriks

### Verifikasi

- [ ] Sebelum perbaikan: B berhasil mengubah produk A (bukti di catatan)
- [ ] Sesudah: B dapat `403`/`404`, A dapat `200`, admin dapat `200`/`204`, guest `401`
- [ ] `GET /api/penjual/products` hanya menampilkan milik sendiri
- [ ] Semua test matriks hijau

---

## Petunjuk Kalau Macet

Buka petunjuk **satu per satu**. Coba lagi sendiri setelah setiap petunjuk.

### Soal 02

- **Petunjuk 1 (arah berpikir):** Tulis dulu urutan kejadian login di kertas: cek bentuk input → cek sudah kebanyakan coba? → cocokkan password → kalau gagal apa, kalau berhasil apa. Baru terjemahkan ke kode.
- **Petunjuk 2 (nama fitur):** Di dokumentasi Authentication cari "Manually Authenticating Users", "Remembering Users", "Logging Out". Di Rate Limiting cari `tooManyAttempts`, `hit`, `availableIn`, `clear`. Untuk melempar error dengan status lain, cek method `status()` pada `ValidationException`.
- **Petunjuk 3 (pseudo-langkah):** (1) validasi → simpan kredensial; (2) kunci = email kecil + IP; (3) kalau kebanyakan → error berisi detik tunggu, status 429; (4) kalau `attempt` gagal → tambah hitungan, error umum; (5) kalau berhasil → hapus hitungan, ganti session id, redirect intended.

### Soal 03

- **Petunjuk 1 (arah berpikir):** Di setiap aksi yang menyentuh satu produk, tanyakan: "server sudah memastikan produk ini milik user yang login?" Kalau jawabannya "tidak ada baris kode yang mengecek itu", di situlah celahnya.
- **Petunjuk 2 (nama fitur):** Dokumentasi Authorization: "Policy Filters" untuk `before`, "Policy Responses" untuk `denyAsNotFound`, "Via the Gate Facade" dan "Via Middleware" untuk cara memasang. Untuk daftar milik sendiri: relasi `hasMany` di dokumentasi Eloquent Relationships.
- **Petunjuk 3 (pseudo-langkah):** (1) ganti parameter `int $id` jadi model; (2) panggil pengecekan policy di baris pertama method; (3) di policy, bandingkan id user dengan kolom pemilik; (4) `before` hanya mengurus admin, sisanya `null`; (5) di test, siapkan tiga user + satu produk di `beforeEach`, satu test per sel matriks.

---

## Cara Mengecek Hasil Sendiri

```bash
# 1. Sintaks PHP
php -l app/Policies/ProductPolicy.php
php -l app/Http/Controllers/Auth/SesiController.php
php -l app/Http/Controllers/PenjualProductController.php

# 2. Route dan middleware-nya
php artisan route:list --path=login -v
php artisan route:list --path=penjual -v

# 3. Hash password dan policy di tinker
php artisan tinker
>>> App\Models\User::first()->password                 // harus "$2y$..."
>>> $b = App\Models\User::where('email', 'b@toko.test')->first()
>>> $b->can('update', App\Models\Product::first())     // false kalau bukan milik B
>>> $b->createToken('uji')->plainTextToken             // token untuk curl, lokal saja

# 4. Halaman terlindungi tanpa login → 302 ke /login
curl -i http://127.0.0.1:8000/dashboard

# 5. API tanpa token → 401
curl -i -X PATCH http://127.0.0.1:8000/api/penjual/products/1 \
  -H "Accept: application/json" -H "Content-Type: application/json" -d '{"price":1}'

# 6. Token user B ke produk milik A → 403/404 setelah diperbaiki
curl -i -X PATCH http://127.0.0.1:8000/api/penjual/products/1 \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_USER_B" -d '{"price":1}'

# 7. Semua test
php artisan test
```

Status yang diharapkan:

| Kasus | Status |
|---|---|
| Halaman web terlindungi tanpa login | `302` ke `/login` |
| API terlindungi tanpa token | `401` |
| Login gagal (form) | `302` kembali + error |
| Login gagal ke-6 dalam semenit (JSON) | `429` |
| Login benar | `302` ke `/dashboard` |
| User biasa membuat produk | `403` |
| Bukan pemilik mengubah produk | `403` atau `404` (sesuai keputusanmu) |
| Pemilik / admin mengubah produk | `200` |
| Pemilik / admin menghapus produk | `204` |

---

## File yang Perlu Diisi

```text
toko-latihan/
├── app/Policies/ProductPolicy.php                     ← Soal 01 + 03
├── app/Http/Controllers/Auth/SesiController.php       ← Soal 02
├── app/Http/Controllers/Auth/RegisterController.php   ← Soal 02
├── app/Http/Controllers/PenjualProductController.php  ← Soal 03
├── app/Providers/AppServiceProvider.php               ← Gate (Soal 03)
├── resources/views/auth/login.blade.php               ← Soal 02
├── resources/views/dashboard.blade.php                ← Soal 02
├── database/migrations/..._add_role_to_users_table.php
├── database/migrations/..._add_user_id_to_products_table.php
├── tests/Feature/SesiTest.php                         ← Soal 02
├── tests/Feature/PenjualProductAccessTest.php         ← Soal 03
└── catatan-08.md                                      ← bukti IDOR + refleksi
```

# TUGAS — Eloquent ORM

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Model `Product` dan `Category` dengan relasi, casts, dan scope (Soal 01)
2. Controller produk yang kebal mass assignment + test yang membuktikannya (Soal 02)
3. Endpoint `/produk-cari` yang aman dari SQL injection dan bebas N+1, dengan angka query sebelum/sesudah (Soal 03)

---

## Daftar Soal dan File

| Soal | Starter di repo ini | Salin ke (di `toko-latihan/`) | Estimasi |
|---|---|---|---|
| [01 — Eloquent Product dan Category](soal/01-product-model.md) | `code/01-product-model.php` | `app/Models/Product.php` | 60 menit |
| [02 — Mass Assignment](soal/02-mass-assignment.md) | `code/02-mass-assignment-aman.php` | `app/Http/Controllers/ProductController.php` | 75 menit |
| [03 — Scope Pencarian dan N+1](soal/03-scope-pencarian-dan-n-plus-1.md) | `code/03-scope-search-aman.php` | bagian atas → `app/Models/Product.php`; komentar FILE 2 → `app/Http/Controllers/KatalogController.php` | 120 menit |

---

## Cara Menjalankan (Jujur Saja)

Semua starter di topik ini adalah class Laravel. Tidak ada yang bisa dijalankan
dengan `php nama-file.php`. Kamu butuh proyek `toko-latihan`:

1. Siapkan proyeknya dulu. Caranya ada di [README praktikum](../README.md).
2. Pastikan migration dari [topik 05](../05-database-migration/TUGAS.md) sudah jalan (tabel `products` dan `categories`).
3. Salin starter ke lokasi di tabel. Starter Soal 02 dan 03 sama-sama menyentuh `app/Models/Product.php`: **gabungkan**, jangan saling timpa.
4. `app/Http/Controllers/ProductController.php` sudah ada dari topik 03 (versi data statis dengan `index`, `show`, `store`). **Gabungkan, jangan timpa**: pertahankan method yang masih kamu pakai, lalu ganti `store` lama dengan versi Soal 02 dan tambahkan `update`. Route `POST /products` dari topik 03 pakai ulang, jangan didaftarkan dua kali.
5. Belum ada sistem login (itu topik 08). Untuk Soal 02, buktikan lewat **feature test** dengan `actingAs()`.

Perintah yang akan sering kamu pakai:

```bash
php artisan make:model Category -f          # model + factory
php artisan make:factory ProductFactory     # lalu di Product.php tambahkan `use HasFactory;` (trait) supaya Product::factory() jalan
php artisan make:test ProductMassAssignmentTest
php artisan tinker
php artisan serve                            # http://127.0.0.1:8000
```

---

## Bagian A: Model dan Relasi (Soal 01)

### Langkah

1. Salin `code/01-product-model.php` ke `app/Models/Product.php`
2. Buat model `Category` dengan relasi `products()`
3. Isi `$fillable`, casts, relasi, dan scope `active()` / `inStock()`
4. Buat factory dan seeder

### Verifikasi

- [ ] `Product::first()->category` mengembalikan object `Category`
- [ ] `Category::first()->products` mengembalikan koleksi
- [ ] `Product::active()->inStock()->count()` jalan tanpa error

---

## Bagian B: Mass Assignment (Soal 02)

### Langkah

1. Buat migration baru: `php artisan make:migration add_owner_and_featured_to_products_table`
   Isinya: `user_id` (foreign key ke `users`, nullable supaya data lama aman) dan `is_featured` (boolean, default false). Jangan lupa `down()`.
2. Ubah sementara model `Product` jadi `$guarded = []`
3. Salin starter controller, daftarkan route `POST /products` dan `PUT /products/{product}` di `routes/web.php`
4. Tulis feature test yang mengirim `is_featured` dan `user_id` palsu. Jalankan. Lihat datanya tersimpan (ini buktinya)
5. Perbaiki model, controller, dan `AppServiceProvider`
6. Ubah test supaya mengharapkan perilaku aman. Jalankan lagi sampai lulus

### Verifikasi

- [ ] Ada bukti serangan berhasil (sebelum) dan gagal (sesudah)
- [ ] `$fillable` tidak memuat `user_id` dan `is_featured`
- [ ] Tidak ada `$request->all()` di controller
- [ ] Update produk milik orang lain → `403`
- [ ] Di tinker, `Product::create([... 'is_featured' => true])` melempar exception di lokal

---

## Bagian C: Scope Aman dan N+1 (Soal 03)

### Langkah

1. Siapkan data: minimal 3 kategori, 50 produk, lewat factory + seeder
2. Salin scope dari starter ke model, dan controller dari komentar FILE 2
3. Daftarkan `Route::get('/produk-cari', [KatalogController::class, 'index']);`
4. **Ukur dulu**: hitung query endpoint versi lama di tinker (`DB::enableQueryLog()`)
5. **Serang dulu**: `Product::search("x' OR '1'='1")->count()`
6. Perbaiki scope `search`, isi `priceBetween`
7. Perbaiki controller: eager loading, `select`, validasi `min`/`max`, pagination
8. Aktifkan `preventLazyLoading` lalu jalankan versi lama sekali lagi untuk melihat exception-nya
9. Ukur lagi. Isi tabel angka di catatanmu

### Verifikasi

- [ ] Payload serangan → `0` hasil setelah diperbaiki
- [ ] Jumlah query tetap kecil walaupun produk ditambah dari 50 ke 200
- [ ] `/produk-cari?min=abc` dengan `Accept: application/json` → `422`
- [ ] Response punya `data`, `current_page`, `per_page`

---

## Petunjuk Kalau Macet

Buka satu per satu. Coba dulu setelah tiap petunjuk.

### Soal 02

1. **Petunjuk 1 (arah berpikir):** Tanyakan untuk setiap kolom: "siapa yang berhak menentukan nilai ini, user atau server?" Kolom milik server tidak boleh lewat `create($input)`.
2. **Petunjuk 2 (nama fitur):** Dokumentasi Eloquent bagian *Mass Assignment* dan *Configuring Eloquent Strictness*. Dokumentasi Relationships bagian *The Create Method* (membuat model lewat relasi `hasMany`). Validasi: `$request->validate([...])` mengembalikan **hanya** field yang ada di rules.
3. **Petunjuk 3 (pseudo-langkah):** model: ganti guarded jadi fillable (tanpa kolom milik server). controller store: validasi → buat produk lewat relasi user yang login. controller update: cek pemilik sama dengan user login, kalau tidak 403 → validasi → update. provider: aktifkan pengaman "jangan buang diam-diam" kecuali production.

### Soal 03

1. **Petunjuk 1 (arah berpikir):** Hitung dulu, baru perbaiki. Kalau angka query sama dengan jumlah produk + 1, kamu sudah menemukan N+1. Untuk scope, tulis SQL yang terbentuk dengan payload di kertas.
2. **Petunjuk 2 (nama fitur):** `with()` (eager loading, termasuk sintaks `relasi:kolom1,kolom2`), `select()`, `paginate()`, `when()` (Conditional Clauses), `Model::preventLazyLoading()`, `DB::enableQueryLog()` / `DB::getQueryLog()`.
3. **Petunjuk 3 (pseudo-langkah):** search: kalau kosong kembalikan query apa adanya, kalau ada pakai `where` like dengan nilai binding. priceBetween: tolak min > max, lalu dua kondisi opsional. controller: validasi q/min/max → mulai query → pilih kolom (termasuk FK) → eager load kategori (kolom secukupnya) → scope search → scope harga → urutkan → paginate 20.

### Masalah umum

- **`Add [is_featured] to fillable property to allow mass assignment`**: ini bukan bug, ini pengamanmu bekerja. Cari siapa yang masih mengirim field itu ke `create()`.
- **`Attempted to lazy load [category] on model [App\Models\Product]`**: `preventLazyLoading` menangkap N+1. Tambahkan eager loading.
- **Kategori jadi `null` semua setelah pakai `select`**: kolom foreign key tidak ikut di-select.
- **`Call to a member function products() on null`**: `$request->user()` null karena belum login. Di test, pakai `actingAs()`.

---

## Cara Mengecek Hasil Sendiri

Dari folder `toko-latihan`:

```bash
# Sintaks
php -l app/Models/Product.php
php -l app/Http/Controllers/ProductController.php
php -l app/Http/Controllers/KatalogController.php

# Route terdaftar
php artisan route:list --path=products
php artisan route:list --path=produk-cari

# Test otomatis
php artisan test --filter=MassAssignment
php artisan test

# Data dan query
php artisan migrate:fresh --seed     # HANYA lokal
php artisan tinker
```

Di tinker:

```php
App\Models\Product::search("x' OR '1'='1")->count();   // 0
DB::enableQueryLog();
App\Models\Product::with('category')->limit(50)->get()->each(fn ($p) => $p->category?->name);
count(DB::getQueryLog());                               // 2
```

Lewat HTTP (`php artisan serve` jalan di terminal lain):

```bash
curl -s -o /dev/null -w "%{http_code}\n" -H "Accept: application/json" "http://127.0.0.1:8000/produk-cari"           # 200
curl -s -o /dev/null -w "%{http_code}\n" -H "Accept: application/json" "http://127.0.0.1:8000/produk-cari?min=abc"   # 422
curl -s -H "Accept: application/json" "http://127.0.0.1:8000/produk-cari?q=a&min=100000&max=500000" | head -c 300
```

Untuk `POST /products` lewat curl kamu butuh session login + token CSRF. Itu baru
nyaman setelah topik 08, jadi untuk sekarang andalkan feature test.

---

## File yang Perlu Diisi

```text
toko-latihan/
├── app/Models/Product.php                         ← Soal 01, 02, 03
├── app/Models/Category.php                        ← Soal 01
├── app/Models/User.php                            ← Soal 02 (relasi products)
├── app/Http/Controllers/ProductController.php     ← Soal 02
├── app/Http/Controllers/KatalogController.php     ← Soal 03
├── app/Providers/AppServiceProvider.php           ← Soal 02, 03
├── database/migrations/..._add_owner_and_featured_to_products_table.php ← Soal 02
├── database/factories/ProductFactory.php          ← Soal 01, 03
├── database/factories/CategoryFactory.php         ← Soal 01, 03
├── tests/Feature/ProductMassAssignmentTest.php    ← Soal 02
└── catatan-eloquent.md                            ← bukti & angka query
```

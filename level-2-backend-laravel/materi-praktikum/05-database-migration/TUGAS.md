# TUGAS — Database dan Migration

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Tabel `products` yang rapi (Soal 01)
2. Tabel `categories` + foreign key `products.category_id` + seeder yang aman diulang (Soal 02)
3. Service pencarian produk yang sudah kamu serang sendiri lalu kamu amankan (Soal 03)
4. Catatan yang membuktikan kamu paham **kenapa**, bukan cuma **bagaimana**

---

## Daftar Soal dan File

| Soal | Starter di repo ini | Salin ke (di `toko-latihan/`) | Estimasi |
|---|---|---|---|
| [01 — Migration Products](soal/01-products-migration.md) | `code/01-create-products-table.php` | `database/migrations/2026_01_01_000001_create_products_table.php` | 45 menit |
| [02 — Categories dan Foreign Key](soal/02-categories-dan-foreign-key.md) | `code/02-create-categories-and-link-products.php` | `database/migrations/2026_01_01_000002_create_categories_and_link_products.php` | 60 menit |
| [03 — Query Builder dan SQL Injection](soal/03-query-builder-dan-sql-injection.md) | `code/03-cari-produk-query-builder.php` | `app/Services/PencarianProduk.php` | 90 menit |

---

## Cara Menjalankan (Jujur Saja)

File di folder `code/` **tidak bisa** dijalankan langsung dengan `php nama-file.php`.
Semuanya butuh Laravel (class `Schema`, `DB`, dan lainnya). Jadi:

1. Siapkan proyek `toko-latihan` di luar repo ini. Caranya ada di [README praktikum](../README.md).
2. Salin starter ke lokasi di tabel di atas. Nama file migration boleh kamu ganti tanggalnya, tapi **urutannya** harus: products dulu, baru categories.
3. Kerjakan di `toko-latihan`, bukan di repo ini. Repo ini cuma tempat soal.
4. Default proyek baru pakai SQLite (`database/database.sqlite`). Itu cukup untuk semua soal di sini.

Kalau di proyekmu sudah ada migration products dari latihan sebelumnya, tidak perlu
dibuat ulang. Pastikan saja kolomnya sesuai Soal 01.

---

## Bagian A: Migration Products (Soal 01)

### Langkah

1. Salin `code/01-create-products-table.php` ke `database/migrations/`
2. Isi semua `TODO`
3. Jalankan `php artisan migrate`
4. Cek bentuk tabel dengan `php artisan db:table products`

### Verifikasi

- [ ] `php artisan migrate:status` menunjukkan migration products `Ran`
- [ ] `php artisan migrate:rollback` lalu `php artisan migrate` jalan tanpa error
- [ ] `slug` tercatat sebagai unique index

---

## Bagian B: Categories dan Foreign Key (Soal 02)

### Langkah

1. Salin starter ke `database/migrations/` dengan tanggal lebih baru dari products
2. Isi kolom `categories`
3. Tambahkan `category_id` di `products` dan pilih perilaku `on delete`
4. Tulis `down()` dengan urutan terbalik
5. Buat seeder: `php artisan make:seeder CategorySeeder`
6. Uji siklus rollback 2 kali

### Verifikasi

- [ ] `php artisan db:table products` menampilkan foreign key `category_id`
- [ ] Siklus `migrate:rollback --step=1` → `migrate` sukses 2 kali berturut-turut
- [ ] `php artisan db:seed --class=CategorySeeder` sukses 2 kali berturut-turut
- [ ] Alasan pilihan `on delete` tertulis di komentar migration

---

## Bagian C: Query Builder dan SQL Injection (Soal 03)

### Langkah

1. Isi minimal 3 produk lewat tinker
2. Salin starter ke `app/Services/PencarianProduk.php`
3. **Serang dulu**: cari payload yang bikin error, yang membocorkan semua produk, dan yang menyusup lewat `$urutkan`
4. Catat semua payload dan hasilnya
5. Perbaiki: binding untuk nilai, allowlist untuk nama kolom dan arah
6. Jalankan ulang semua payload, catat hasil barunya

### Verifikasi

- [ ] Ada catatan "sebelum" dan "sesudah" untuk minimal 3 payload
- [ ] Tidak ada `$variabel` di dalam string SQL
- [ ] `cari('x', 'password', 'asc')` tidak mengurutkan berdasarkan kolom password

---

## Petunjuk Kalau Macet

Baca petunjuk satu per satu. Coba dulu setelah tiap petunjuk sebelum membuka yang berikutnya.

### Soal 02

1. **Petunjuk 1 (arah berpikir):** Kerjakan `up()` dalam dua langkah terpisah: tabel baru dulu, lalu ubah tabel lama. Untuk `down()`, tanya dirimu: "kalau aku menghapus tabel categories sekarang, apakah masih ada yang menunjuk ke sana?"
2. **Petunjuk 2 (nama fitur):** Cari di dokumentasi migration: `foreignId`, `constrained`, `nullOnDelete` / `restrictOnDelete` / `cascadeOnDelete`, dan `dropConstrainedForeignId`. Untuk seeder, cari `updateOrInsert` (Query Builder) atau `updateOrCreate` (Eloquent).
3. **Petunjuk 3 (pseudo-langkah):** up: buat categories → di products tambah kolom (nullable, setelah id, FK ke categories, perilaku hapus). down: di products hapus FK+kolom → hapus categories. Seeder: untuk tiap kategori, "cari berdasarkan slug, kalau ada perbarui, kalau tidak ada buat".

### Soal 03

1. **Petunjuk 1 (arah berpikir):** Tulis dulu SQL lengkap yang terbentuk kalau `$kata` berisi tanda petik. Tulis di kertas. Di mana string-nya tertutup? Apa yang tersisa setelahnya?
2. **Petunjuk 2 (nama fitur):** Dokumentasi Query Builder: `where('kolom', 'like', ...)`, `orderBy`, dan bagian *Raw Expressions* tentang array binding. Untuk allowlist, cari fungsi PHP `in_array` dengan parameter ketiga `true`.
3. **Petunjuk 3 (pseudo-langkah):** cek `$urutkan` ada di daftar → cek `$arah` ada di daftar → bangun query dari `DB::table` → `select` kolom yang dibutuhkan → `where` nama like (nilai digabung `%` di PHP, bukan di SQL) → `orderBy` dengan variabel yang sudah lolos cek → `get`.

### Masalah umum

- **`SQLSTATE[HY000]: General error: 1 no such table: categories`**: urutan nama file migration salah, atau migration belum dijalankan.
- **Rollback error soal foreign key**: `down()` menghapus tabel induk sebelum FK di tabel anak dilepas.
- **`Class "App\Services\PencarianProduk" not found`**: cek namespace dan nama file, lalu jalankan `composer dump-autoload`.

---

## Cara Mengecek Hasil Sendiri

Jalankan dari folder `toko-latihan`:

```bash
# Sintaks
php -l database/migrations/2026_01_01_000002_create_categories_and_link_products.php
php -l app/Services/PencarianProduk.php

# Status dan bentuk database
php artisan migrate:status
php artisan db:show
php artisan db:table products
php artisan db:table categories

# Rollback bisa diulang
php artisan migrate:rollback --step=1 && php artisan migrate
php artisan migrate:rollback --step=1 && php artisan migrate

# Seeder idempotent
php artisan db:seed --class=CategorySeeder && php artisan db:seed --class=CategorySeeder

# Uji pencarian
php artisan tinker
```

Di tinker:

```php
$s = app(App\Services\PencarianProduk::class);
$s->cari('Key', 'name', 'asc');   // harus hanya produk yang cocok
$s->cari("'", 'name', 'asc');     // harus koleksi kosong, bukan QueryException
```

Kalau kamu ingin menguji lewat HTTP, buat route sementara
`GET /cari?q=...&sort=...&dir=...` yang memanggil service ini, lalu:

```bash
curl -i "http://127.0.0.1:8000/cari?q=Key&sort=price&dir=desc"       # 200
curl -i "http://127.0.0.1:8000/cari?q=x&sort=password&dir=asc"       # 422 atau urutan default, sesuai keputusanmu
```

---

## File yang Perlu Diisi

```text
toko-latihan/
├── database/migrations/
│   ├── 2026_01_01_000001_create_products_table.php            ← Soal 01
│   └── 2026_01_01_000002_create_categories_and_link_products.php ← Soal 02
├── database/seeders/CategorySeeder.php                         ← Soal 02
├── app/Services/PencarianProduk.php                            ← Soal 03
└── catatan-sql-injection.md                                    ← Soal 03
```

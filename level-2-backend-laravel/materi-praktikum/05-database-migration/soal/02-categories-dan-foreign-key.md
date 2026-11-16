# SOAL 02 — Categories dan Foreign Key

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat tabel baru dan mengubah tabel lama dalam satu migration
- Menambahkan foreign key dan memilih perilaku `on delete` dengan alasan bisnis
- Menulis `down()` yang benar-benar membalik `up()`, sampai rollback bisa diulang
- Membuat seeder yang aman dijalankan lebih dari sekali

**Topik:** `Schema::create`, `Schema::table`, `foreignId`, `constrained`, `on delete`, `down()`, seeder

**Referensi utama:**

- [Laravel Docs: Migrations — Foreign Key Constraints](https://laravel.com/docs/13.x/migrations#foreign-key-constraints)
- [Laravel Docs: Migrations — Dropping Columns](https://laravel.com/docs/13.x/migrations#dropping-columns)
- [Laravel Docs: Seeding](https://laravel.com/docs/13.x/seeding)

**Difficulty:** Menengah • **Estimasi:** 60 menit

---

## Briefing

Toko kampus kamu sudah punya tabel `products` dari Soal 01. Sekarang pemilik toko
mau produk dikelompokkan: Elektronik, Alat Tulis, Makanan. Produk lama yang sudah
ada di database belum punya kategori, dan itu tidak boleh bikin migration gagal.

Satu lagi: admin kadang menghapus kategori. Kamu harus memutuskan apa yang terjadi
pada produk di kategori itu. Ini keputusan bisnis, bukan cuma keputusan teknis.

---

## Deskripsi

Lengkapi `code/02-create-categories-and-link-products.php` jadi satu migration yang
membuat tabel `categories` dan menyambungkan `products.category_id` ke sana. Lalu buat
`CategorySeeder` yang mengisi minimal 3 kategori.

---

## Syarat (Acceptance Criteria)

### Tabel `categories`

- [ ] Ada kolom `id`, `name` (maks 80 karakter), `slug` (maks 100 karakter), dan timestamps
- [ ] `slug` punya unique index
- [ ] `name` tidak boleh null

### Kolom `products.category_id`

- [ ] Kolom `category_id` ada di tabel `products`
- [ ] Kolom boleh null (produk lama tetap valid)
- [ ] Ada foreign key ke `categories.id`
- [ ] Perilaku saat kategori dihapus dipilih secara sadar (restrict / cascade / set null) dan alasannya tertulis di komentar

### `down()` dan Rollback

- [ ] `down()` menghapus foreign key **sebelum** menghapus kolom
- [ ] `down()` menghapus tabel `categories` setelah kolom `category_id` hilang
- [ ] Siklus `migrate` → `migrate:rollback --step=1` → `migrate` bisa diulang **2 kali** tanpa error

### Seeder

- [ ] Ada `database/seeders/CategorySeeder.php` dengan minimal 3 kategori
- [ ] `php artisan db:seed --class=CategorySeeder` bisa dijalankan 2 kali berturut-turut tanpa error duplikat

---

## Expected Output

Setelah `php artisan migrate`:

```text
INFO  Running migrations.

2026_01_01_000002_create_categories_and_link_products ........ DONE
```

Setelah `php artisan db:table products` (potongan):

```text
category_id  integer, nullable ........................
...
Foreign Keys
category_id references id on categories ....... (perilaku on delete-mu)
```

Bentuk persisnya beda sedikit antara SQLite, MySQL, dan PostgreSQL. Yang penting:
kolomnya ada, nullable, dan foreign key-nya tercatat.

---

## Panduan Teknis

### Kenapa Foreign Key?

Bayangkan rak toko dengan label. Foreign key itu seperti aturan "produk cuma boleh
ditaruh di rak yang labelnya benar-benar ada". Tanpa aturan ini, database mau saja
menyimpan `category_id = 999` padahal kategori 999 tidak pernah ada.

### Tiga Pilihan Saat Induk Dihapus

| Pilihan | Yang terjadi pada produk | Cocok kalau... |
|---|---|---|
| restrict | Hapus kategori **ditolak** selama masih ada produk | Admin harus memindahkan produk dulu |
| cascade | Produk **ikut terhapus** | Anak tidak ada artinya tanpa induk (misal item di keranjang) |
| set null | `category_id` jadi null, produk tetap ada | Anak tetap berguna tanpa induk |

Pertanyaan yang perlu kamu jawab: kalau kategori "Makanan" dihapus, apakah stok mi
instan di gudang juga ikut lenyap dari sistem? Kalau jawabanmu "jangan dong", kamu
sudah tahu mana yang tidak dipilih.

### Contoh Pola (Domain Berbeda)

Ini contoh untuk tabel `comments` yang menempel ke `posts`. **Bukan** jawaban soalmu:

```php
// Contoh: komentar ikut hilang saat post dihapus
Schema::table('comments', function (Blueprint $table) {
    $table->foreignId('post_id')->constrained()->cascadeOnDelete();
});
```

Pikirkan: apa yang harus kamu ubah supaya kolomnya boleh kosong? Dan method apa
yang dipakai untuk perilaku "set null"? Cari di bagian *Foreign Key Constraints*.

### `down()` Harus Kebalikan `up()`

Kalau `up()` memasang: (1) tabel categories, lalu (2) kolom + FK di products, maka
`down()` membongkar dengan urutan terbalik: (2) dulu, baru (1). Kalau kamu menghapus
`categories` duluan, database akan protes karena masih ada FK yang menunjuk ke sana.

### Seeder yang Idempotent

Idempotent artinya "dijalankan 1 kali atau 10 kali, hasilnya sama". Insert biasa
tidak idempotent: kali kedua akan bentrok dengan unique `slug`. Cari method Query
Builder atau Eloquent yang "update kalau sudah ada, insert kalau belum".

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l database/migrations/2026_01_01_000002_create_categories_and_link_products.php
php artisan migrate
php artisan migrate:status
php artisan db:table products
php artisan db:table categories

# siklus rollback, ulangi 2x
php artisan migrate:rollback --step=1
php artisan migrate
php artisan migrate:rollback --step=1
php artisan migrate

# seeder 2x
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=CategorySeeder
```

Uji perilaku hapus di `php artisan tinker`:

```php
DB::table('categories')->count();
// buat 1 produk dengan category_id kategori pertama, lalu hapus kategorinya
// dan lihat apa yang terjadi pada produk itu
```

---

## Cara Submit

1. Pastikan semua perintah di atas jalan tanpa error
2. Tulis di catatanmu: perilaku `on delete` yang kamu pilih + alasan 2–3 kalimat
3. Tulis output `php artisan db:table products` (bagian foreign key)
4. Commit di repo latihanmu sendiri dengan pesan jelas

---

## Catatan Penting

- ⚠️ **Jangan edit migration yang sudah dijalankan di database orang lain** (teman tim, server). Buat migration baru.
- ⚠️ **SQLite**: `after('id')` diabaikan. Itu normal, bukan error.
- 💡 Nama file migration menentukan urutan. File categories harus jalan **setelah** products.
- 📚 Lanjut baca bagian foreign key di [teori 05](../../../materi-teori/05-database-migration/README.md).

---

## Refleksi

1. Kenapa `category_id` dibuat nullable, padahal idealnya setiap produk punya kategori?
2. Kapan `cascade` justru pilihan yang benar? Beri satu contoh di toko.
3. Apa bedanya rollback di laptopmu dengan rollback di server production yang sudah berisi data pelanggan?

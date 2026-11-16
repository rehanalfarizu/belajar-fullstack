# Tutorial — Product Catalog dengan Laravel

Tutorial ini menggabungkan routing, controller, Blade, migration, Eloquent,
validation, authorization, API, dan testing dalam satu aplikasi kecil.

## 1. Buat Project

```bash
laravel new product-catalog
cd product-catalog
npm install
npm run build
composer run dev
```

Pilih SQLite agar setup awal sederhana.

## 2. Buat Model dan Migration

```bash
php artisan make:model Product -mf
php artisan make:controller ProductController --resource
php artisan make:request StoreProductRequest
php artisan make:resource ProductResource
```

Schema minimum:

- `name`: string, wajib.
- `description`: text, nullable.
- `price`: unsigned big integer; simpan rupiah sebagai integer.
- `stock`: unsigned integer.
- `is_active`: boolean.

Jalankan:

```bash
php artisan migrate
```

## 3. Bangun Use Case Secara Vertikal

Kerjakan satu alur sampai selesai sebelum menambah alur lain:

1. `GET /products` menampilkan list.
2. `GET /products/create` menampilkan form.
3. `POST /products` memvalidasi dan menyimpan.
4. `GET /products/{product}` menampilkan detail.
5. Edit dan delete.

Untuk setiap alur, telusuri:

```text
route → middleware → controller → request → model → response → test
```

## 4. Tambahkan API

Gunakan route `/api/products`, API Resource, pagination, filtering, dan sorting
berbasis allowlist. Jangan meneruskan nama kolom sort mentah dari user.

## 5. Tambahkan Authentication

Gunakan starter kit/session untuk halaman Blade atau Sanctum cookie auth untuk
SPA first-party. Tambahkan policy:

- Guest boleh melihat produk aktif.
- User login boleh membuat pesanan.
- Admin boleh membuat, mengubah, dan menghapus produk.

## 6. Tambahkan Test

Minimal:

- Guest dapat melihat produk aktif.
- Produk nonaktif tidak tampil.
- Input invalid menghasilkan `422`.
- User biasa mendapat `403` saat membuat produk.
- Admin berhasil membuat produk.
- Response API sesuai kontrak.

Jalankan:

```bash
php artisan test
```

## 7. Definition of Done

- Tidak ada query di Blade.
- Tidak ada secret di repository.
- Semua write tervalidasi dan terotorisasi.
- N+1 query telah diperiksa.
- Happy path dan failure path memiliki test.
- `APP_DEBUG=false` pada production.
- Deployment dapat di-rollback.

Setelah tutorial selesai, ulangi dari nol dengan domain berbeda seperti booking
lapangan, perpustakaan, atau inventory.

---

# Panduan Bertahap: Mini Proyek "Katalog Toko"

Bagian di atas adalah gambaran besar. Bagian ini adalah **jalur kerja**
langkah demi langkah. Setiap langkah punya tujuan, kerjaan untukmu, dan cara
membuktikan bahwa langkah itu selesai. **Tidak ada kode jadi di sini.** Kalau
buntu, kembali ke teori dan soal topik yang sesuai.

Prasyarat: PHP 8.3+, Composer, dan project `toko-latihan`
([cara membuatnya](../materi-praktikum/README.md)). Lebih nyaman kalau soal 01
tiap topik sudah kamu kerjakan.

## Langkah 0 — Pondasi

Topik: [02 Setup Laravel](../materi-praktikum/02-setup-laravel/README.md)

- [ ] TODO(human): pastikan `php artisan serve` jalan dan `GET /health` mengembalikan JSON.
- [ ] TODO(human): pastikan `.env` ada di `.gitignore` dan `.env.example` bersih.
- Bukti: `php artisan test` hijau.

## Langkah 1 — Data

Topik: [05 Migration](../materi-praktikum/05-database-migration/README.md) dan
[06 Eloquent](../materi-praktikum/06-eloquent-orm/README.md)

- [ ] TODO(human): rancang tabel `categories` dan `products` di kertas dulu. Tentukan kolom, tipe, index, dan foreign key.
- [ ] TODO(human): tulis migration, model, relasi, factory, dan seeder.
- [ ] TODO(human): pastikan `$fillable` tidak memuat kolom yang hanya boleh diisi server.
- Bukti: `php artisan migrate:fresh --seed` jalan, lalu `Product::with('category')->count()` di tinker.

## Langkah 2 — Halaman Daftar Produk

Topik: [03 Routing](../materi-praktikum/03-routing-controller/README.md) dan
[04 Blade](../materi-praktikum/04-blade-template/README.md)

- [ ] TODO(human): route + controller untuk daftar dan detail produk (detail pakai slug).
- [ ] TODO(human): layout Blade dan komponen kartu produk.
- [ ] TODO(human): semua output memakai `{{ }}`. Coba simpan nama produk `<b>tebal</b>` dan lihat hasilnya.
- Bukti: query count halaman daftar tidak naik saat produk bertambah (cek N+1).

## Langkah 3 — Tambah dan Ubah Produk

Topik: [07 Form dan Validasi](../materi-praktikum/07-form-validasi/README.md)

- [ ] TODO(human): Form Request untuk store dan update.
- [ ] TODO(human): tampilkan error per field dan pertahankan input lama.
- Bukti: kirim payload tidak valid lewat `curl`, hasilnya `422` dengan pesan jelas.

## Langkah 4 — Login dan Hak Akses

Topik: [08 Autentikasi](../materi-praktikum/08-autentikasi/README.md)

- [ ] TODO(human): login dan logout, dengan pesan error yang sama untuk email salah dan password salah.
- [ ] TODO(human): `ProductPolicy` dengan aturan pemilik dan admin.
- [ ] TODO(human): feature test matriks: guest, pemilik, bukan pemilik, admin.
- Bukti: user B yang mencoba mengubah produk user A mendapat `403` atau `404`.

## Langkah 5 — API

Topik: [09 REST API](../materi-praktikum/09-rest-api/README.md)

- [ ] TODO(human): `php artisan install:api`, lalu `/api/products` dengan API Resource dan pagination.
- [ ] TODO(human): pastikan kolom internal tidak ikut keluar.
- [ ] TODO(human): rate limit untuk login API dan endpoint tulis.
- Bukti: `curl -i` berulang kali menghasilkan `429` dengan header `Retry-After`.

## Langkah 6 — Deploy (Latihan)

Topik: [10 Deploy](../materi-praktikum/10-deploy-hosting/README.md)

- [ ] TODO(human): jalankan skrip pemeriksa rahasia dan konfigurasi pada project ini.
- [ ] TODO(human): tulis `deploy.sh` dan jalankan dengan `DRY_RUN=1`.
- [ ] TODO(human): tulis rencana rollback satu paragraf di `CATATAN.md`.
- Bukti: `APP_DEBUG=true` membuat deploy ditolak.

## Langkah 7 — Audit Sendiri

- [ ] TODO(human): kerjakan [Modul Keamanan 08 — Proyek Akhir Audit](../../modul-keamanan-web/08-proyek-akhir-audit/README.md) pada `toko-latihan`.
- [ ] TODO(human): tulis 5 temuan terbesar dan bukti perbaikannya.

## Cara Menilai Diri Sendiri

| Pertanyaan | Ya / Belum |
|---|---|
| Aku bisa menjelaskan alur request dari route sampai response tanpa melihat catatan | |
| Aku bisa menunjukkan bukti (test atau `curl`) untuk setiap aturan keamanan | |
| Aku tahu siapa yang boleh melakukan setiap aksi, dan itu dicek di server | |
| Aku bisa mengulang proyek ini dengan domain lain (booking lapangan, perpustakaan) | |

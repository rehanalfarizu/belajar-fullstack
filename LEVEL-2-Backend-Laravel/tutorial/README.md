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

# 06 — Eloquent ORM

## Ini Apa?

Eloquent adalah ORM bawaan Laravel. ORM (Object-Relational Mapper) mengubah satu
baris tabel jadi satu **object PHP**. Jadi kamu menulis `$product->price`, bukan
`$row['price']`, dan `Product::where('is_active', true)->get()`, bukan SQL mentah.

Di topik ini kamu belajar tiga hal yang sering bikin masalah di proyek nyata:

- **Relasi** antar model (produk punya kategori, produk punya penjual)
- **Mass assignment**: field apa yang boleh diisi dari input user
- **Performa dan keamanan query**: scope, N+1, dan `whereRaw`

## Analogi

Eloquent itu seperti **pelayan restoran yang hafal menu**. Kamu cukup bilang
"satu nasi goreng, pedas" (`Product::active()->get()`), dan dia yang menerjemahkan ke
bahasa dapur (SQL). Enak. Tapi pelayan yang terlalu penurut juga berbahaya: kalau
pelanggan bilang "sekalian catat saya sebagai pemilik restoran", pelayan harus tahu
itu **bukan** pesanan yang sah. Itulah gunanya `$fillable`.

## Kenapa Penting Buat Kerja?

- Hampir semua proyek Laravel di kantor pakai Eloquent. Kamu akan membacanya setiap hari.
- Mass assignment dan N+1 adalah dua temuan code review paling umum di proyek Laravel.
- Developer yang bisa **mengukur** jumlah query (bukan menebak) cepat dipercaya untuk memegang fitur yang lalu lintasnya besar.

## Daftar Soal

| # | Soal | Level |
|---|---|---|
| 01 | [Eloquent Product dan Category](soal/01-product-model.md) | Pemula |
| 02 | [Mass Assignment: Jangan Percaya `$request->all()`](soal/02-mass-assignment.md) | Menengah |
| 03 | [Scope Pencarian Aman dan Masalah N+1](soal/03-scope-pencarian-dan-n-plus-1.md) | Lanjut |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Cek pemahamanmu di [CHECKLIST.md](CHECKLIST.md).

## Bacaan

- Teori: [materi-teori/06-eloquent-orm](../../materi-teori/06-eloquent-orm/README.md)
- Keamanan: [Modul 02 — Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md), [Modul 03 — SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md), [Modul 05 — Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)
- Cara menyiapkan proyek latihan: [materi-praktikum/README.md](../README.md)

## Glosarium

| Istilah | Arti singkat |
|---|---|
| ORM | Penerjemah antara object di kode dan baris di database |
| Model | Class yang mewakili satu tabel (`Product` ↔ `products`) |
| Mass assignment | Mengisi banyak kolom sekaligus dari array (`create`, `update`, `fill`) |
| `$fillable` | Daftar kolom yang **boleh** diisi massal (allowlist) |
| `$guarded` | Daftar kolom yang **dilarang** diisi massal (blocklist) |
| Cast | Aturan konversi tipe kolom (misal `0/1` jadi `true/false`) |
| Relasi | Hubungan antar model: `hasMany`, `belongsTo`, `belongsToMany` |
| Eager loading | Memuat relasi di awal dengan sedikit query (`with()`) |
| Lazy loading | Memuat relasi saat diakses, satu query per akses |
| N+1 | 1 query daftar + N query relasi, satu per item |
| Local scope | Method model yang menyimpan kondisi query supaya bisa dipakai ulang |
| Factory | Pembuat data palsu untuk test dan seeder |
| Pagination | Membagi hasil query jadi halaman-halaman |

# 03 — Routing dan Controller

## Apa Ini?

**Routing** menentukan: request dengan method X ke URL Y diurus oleh siapa.
**Controller** adalah "siapa" itu: class yang menerima request lalu
memutuskan response apa yang dikirim balik.

```text
GET /katalog/produk/keyboard-mekanik
        │
        ▼
  routes/web.php  ──►  middleware  ──►  controller / closure  ──►  response
```

## Analogi: Resepsionis Kantor

Bayangkan kantor besar. Tamu datang dan bilang, "Saya mau **ambil**
(GET) **paket** (URL /paket)." Resepsionis (router) melihat daftar dan
mengarahkan tamu ke meja yang tepat (controller). Sebelum sampai meja, tamu
lewat satpam (middleware) yang mengecek kartu tamu atau jam kunjungan.

Kalau tamu minta sesuatu yang tidak ada di daftar, resepsionis bilang
"tidak ada di sini" (404).

## Kenapa Penting untuk Kerja?

- Hari pertama di kantor, hal pertama yang kamu cari saat ada bug adalah
  **route-nya**: `php artisan route:list`. Dari situ kamu tahu controller
  mana yang harus dibuka.
- URL adalah **kontrak** dengan frontend, aplikasi mobile, dan Google.
  Mengubahnya sembarangan membuat link rusak. Named route dan redirect
  membantu kamu mengubah URL tanpa merusak yang lain.
- Middleware adalah tempat aturan yang berlaku ke banyak route: login,
  rate limit, jam operasional, bahasa. Tanpa middleware, aturan yang sama
  di-copy ke puluhan controller dan pasti ada yang lupa.

## Daftar Soal

| # | Soal | Level | Fokus |
|---|---|---|---|
| 01 | [Routing dan Product Controller](soal/01-product-controller.md) | Pemula | Controller, status 201/404/422 |
| 02 | [Route Group, Named Route, dan Constraint](soal/02-route-group-dan-nama.md) | Menengah | Group, `route()`, constraint, redirect, fallback |
| 03 | [Middleware Jam Buka Toko](soal/03-middleware-jam-buka.md) | Lanjut | Middleware sebelum/sesudah, alias, test waktu |

Cara mengerjakan ada di [TUGAS.md](TUGAS.md). Ukur pemahamanmu di
[CHECKLIST.md](CHECKLIST.md). Solusi referensi ada di folder `contoh/`,
buka hanya setelah jawabanmu sendiri jalan.

## Baca Dulu

- Teori lengkap: [materi-teori/03-routing-controller](../../materi-teori/03-routing-controller/README.md)
- Setup proyek latihan: [materi-praktikum/README.md](../README.md)

## Glosarium

| Istilah | Arti singkat |
|---|---|
| Route | Aturan "method + URL → siapa yang mengurus" |
| HTTP method | Jenis aksi: `GET` (ambil), `POST` (buat), `PUT/PATCH` (ubah), `DELETE` (hapus) |
| Controller | Class yang berisi method untuk mengurus request |
| Closure route | Route yang langsung diurus fungsi anonim, tanpa controller |
| Route parameter | Bagian URL yang berubah-ubah, misal `{slug}` |
| Constraint | Aturan bentuk parameter, misal "harus angka" |
| Named route | Route yang punya nama, dipanggil dengan `route('nama')` |
| Route group | Kumpulan route yang berbagi prefix, nama, atau middleware |
| Middleware | Lapisan yang memeriksa/mengubah request sebelum dan sesudah controller |
| Fallback route | Route penangkap URL yang tidak cocok dengan route mana pun |
| Route model binding | Laravel otomatis mengubah `{product}` jadi object `Product` dari database |

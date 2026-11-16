# 04 — Blade Template

## Apa Ini?

**Blade** adalah mesin template Laravel. Kamu menulis HTML biasa plus
sedikit sintaks khusus (`{{ }}`, `@if`, `@foreach`, `<x-komponen>`). Laravel
mengubahnya jadi PHP biasa, lalu hasilnya dikirim ke browser sebagai HTML.

```text
controller: return view('products.index', ['products' => $products]);
                 │
                 ▼
resources/views/products/index.blade.php  ──►  HTML  ──►  browser
```

## Analogi: Formulir Fotokopian

Blade itu seperti **formulir kosong yang difotokopi**. Bentuk formulirnya
(layout, kolom, judul) sama untuk semua orang. Yang beda cuma isiannya
(nama produk, harga). Layout = formulir induk. Komponen = kotak isian yang
dipakai berulang. Escape `{{ }}` = petugas yang memastikan isian tidak bisa
"mencoret" formulir di luar kotaknya.

## Kenapa Penting untuk Kerja?

- Banyak aplikasi Laravel di perusahaan Indonesia (admin panel, sistem
  internal, website instansi) masih full Blade. Kamu pasti akan menyentuhnya.
- Komponen yang rapi menghemat waktu tim: ubah satu file, semua halaman ikut.
- **XSS** termasuk celah paling sering ditemukan di audit keamanan. Developer
  yang paham kapan `{{ }}` aman dan kapan tidak, jauh lebih dipercaya.

## Daftar Soal

| # | Soal | Level | Fokus |
|---|---|---|---|
| 01 | [Blade Product List](soal/01-products-view.md) | Pemula | `@extends`, `@forelse`, flash message |
| 02 | [Layout dan Komponen `<x-product-card>`](soal/02-layout-dan-component.md) | Menengah | `@props`, `$attributes`, slot, `@stack` |
| 03 | [XSS, Escape, dan Form Aman di Blade](soal/03-xss-dan-escape.md) | Lanjut | `{{ }}` vs `{!! !!}`, konteks URL/JS, `@csrf` |

Cara mengerjakan ada di [TUGAS.md](TUGAS.md). Ukur pemahamanmu di
[CHECKLIST.md](CHECKLIST.md). Solusi referensi ada di folder `contoh/`,
buka hanya setelah jawabanmu sendiri jalan.

## Baca Dulu

- Teori lengkap: [materi-teori/04-blade-template](../../materi-teori/04-blade-template/README.md)
- Setup proyek latihan: [materi-praktikum/README.md](../README.md)
- Keamanan terkait: [modul-keamanan-web/06 — XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md)

## Glosarium

| Istilah | Arti singkat |
|---|---|
| View | File tampilan di `resources/views`, berakhiran `.blade.php` |
| Directive | Perintah Blade yang diawali `@`, misal `@if`, `@foreach`, `@csrf` |
| Escape | Mengubah karakter khusus HTML (`<`, `>`, `"`, `'`, `&`) jadi entity supaya tampil sebagai teks |
| `{{ }}` | Cetak data **dengan** escape |
| `{!! !!}` | Cetak data **tanpa** escape (berbahaya untuk data user) |
| Layout | Kerangka halaman bersama (head, header, footer) |
| `@yield` / `@section` | Tempat kosong di layout / isian dari halaman anak |
| `@stack` / `@push` | Tempat yang bisa diisi berkali-kali dari banyak bagian |
| Komponen | Potongan tampilan yang bisa dipakai ulang, dipanggil dengan `<x-nama>` |
| Props | Data yang dikirim ke komponen |
| Slot | Potongan HTML dari pemanggil yang ditaruh di dalam komponen |
| XSS | Cross-Site Scripting: penyerang menyisipkan script yang jalan di browser korban |
| CSRF | Cross-Site Request Forgery: situs lain memalsukan request atas nama user yang sedang login |

# SOAL 02 — Layout dan Komponen `<x-product-card>`

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat **anonymous component** Blade dengan props wajib dan props opsional.
- Menggabungkan atribut dari pemanggil dengan `$attributes->merge()`.
- Memakai slot untuk bagian yang isinya ditentukan pemanggil.
- Menyusun layout dengan `@yield` dan `@stack` supaya halaman lain tinggal "mengisi".

**Topik:** `@props`, `$attributes->merge()`, `$slot`, `@if/@elseif/@else`, `@extends`, `@section`, `@yield`, `@stack`, `@push`

**Referensi utama:**

- [Laravel Docs: Blade — Components](https://laravel.com/docs/13.x/blade#components)
- [Laravel Docs: Blade — Anonymous Components](https://laravel.com/docs/13.x/blade#anonymous-components)
- [Laravel Docs: Blade — Building Layouts](https://laravel.com/docs/13.x/blade#building-layouts)
- [Laravel Docs: Blade — Stacks](https://laravel.com/docs/13.x/blade#stacks)

**Difficulty:** Menengah • **Estimasi:** 60–90 menit

---

## Briefing

Kartu produk muncul di tiga tempat: halaman daftar produk, halaman
"produk terlaris", dan halaman keranjang. Sekarang kodenya di-copy-paste
tiga kali. Kemarin ada typo di harga, dan kamu harus memperbaikinya di tiga
file. Waktunya kartu produk dijadikan **satu komponen**.

---

## Deskripsi

Lengkapi `code/02-product-card.blade.php` menjadi
`resources/views/components/product-card.blade.php`, buat (atau rapikan)
`resources/views/layouts/app.blade.php`, lalu pakai komponen itu di halaman
daftar produk dari Soal 01.

---

## Syarat (Acceptance Criteria)

### Komponen `product-card`

- [ ] File ada di `resources/views/components/product-card.blade.php`
- [ ] Baris pertama logika komponen adalah `@props` dengan `product` (wajib) dan `tampilkanStok` (default `true`)
- [ ] Elemen pembungkus `<article>` memakai `$attributes->merge(...)` dengan class bawaan `product-card`
- [ ] Dipanggil dengan `class="sorot"` → HTML hasilnya punya `class="product-card sorot"` (dua-duanya ada)
- [ ] Harga tampil format `Rp 350.000` (titik sebagai pemisah ribuan)
- [ ] Badge stok: stok `0` → `Habis`, stok `1–4` → `Menipis`, stok `>= 5` → `Tersedia`
- [ ] Dipanggil dengan `:tampilkan-stok="false"` → tidak ada badge sama sekali
- [ ] Isi di antara tag pembuka dan penutup komponen tampil di area aksi; kalau kosong, tidak ada `<div>` aksi kosong
- [ ] Tidak ada `{!! !!}` di komponen

### Layout

- [ ] `resources/views/layouts/app.blade.php` punya `<html lang="id">`, `@yield('title', ...)` dengan nilai default, dan `@yield('content')`
- [ ] Layout punya minimal satu `@stack(...)` (misal `scripts`) sebelum `</body>`
- [ ] Halaman daftar produk memakai `@extends('layouts.app')` dan memanggil `<x-product-card>` di dalam `@forelse`

---

## Expected Output

> ℹ️ Ini gambaran **struktur HTML** yang dihasilkan, bukan tampilan pixel.
> Tanpa CSS, kartu akan tersusun vertikal biasa.

Untuk produk stok 3, dipanggil dengan `class="sorot"` dan isi slot link:

```html
<article class="product-card sorot">
    <h3>Mouse Wireless</h3>
    <p>Rp 175.000</p>
    <span class="badge ...">Menipis ...</span>
    <div class="...">
        <a href="http://127.0.0.1:8000/products/2">Lihat detail</a>
    </div>
</article>
```

Untuk produk yang dipanggil dengan `:tampilkan-stok="false"` dan tanpa slot:

```html
<article class="product-card">
    <h3>Keyboard Mekanik</h3>
    <p>Rp 350.000</p>
</article>
```

---

## Panduan Teknis

### Komponen = Cetakan Kue

Komponen itu seperti **cetakan kue**. Bentuknya sekali dibuat. Setiap kali
dipakai, kamu cuma ganti isiannya (props) dan toppingnya (slot).

- **Props** = data yang dibutuhkan komponen (misal produknya).
- **Attributes** = atribut HTML tambahan dari pemanggil (class, id, `data-*`).
- **Slot** = potongan HTML dari pemanggil, ditaruh di tempat yang kamu tentukan.

Contoh di domain LAIN (kartu pengumuman), bukan jawaban soal:

```blade
{{-- resources/views/components/pengumuman.blade.php --}}
@props(['judul', 'penting' => false])

<aside {{ $attributes->merge(['class' => 'pengumuman']) }}>
    <strong>{{ $judul }}</strong>
    @if ($penting)
        <span>PENTING</span>
    @endif
    {{ $slot }}
</aside>
```

```blade
{{-- Pemakaian --}}
<x-pengumuman judul="Libur Lebaran" :penting="true" class="kuning">
    Toko tutup tanggal 30–31.
</x-pengumuman>
```

Perhatikan dua hal:

- `judul="..."` mengirim **string**. `:penting="true"` (pakai titik dua)
  mengirim **ekspresi PHP**. Untuk object produk, kamu butuh yang mana?
- Nama prop `camelCase` di `@props` dipanggil dengan `kebab-case` di tag
  (`tampilkanStok` ↔ `tampilkan-stok`).

### Kapan Slot Dianggap Kosong?

`$slot` adalah object, bukan string biasa. Cari di dokumentasi method untuk
mengecek apakah slot berisi sesuatu.

### Layout: `@yield` vs `@stack`

- `@yield('x')` = **satu kursi**. Halaman anak mengisinya dengan `@section('x')`.
- `@stack('x')` = **satu meja panjang**. Banyak bagian bisa menaruh barang
  dengan `@push('x')`, dan semuanya ditampilkan berurutan.

Laravel juga punya gaya layout berbasis komponen (`<x-layout>` dengan
`{{ $slot }}`). Dua gaya sama-sama benar. Di soal ini pakai `@extends`
supaya cocok dengan Soal 01. Tulis di Refleksi apa bedanya menurutmu.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php artisan view:clear
php artisan view:cache      # gagal kalau ada directive yang tidak ditutup
php artisan serve
curl -s http://127.0.0.1:8000/products | grep -n "product-card"
```

- [ ] Buat 3 produk di `php artisan tinker` dengan stok `0`, `3`, dan `10`, lalu cek ketiga badge muncul benar
- [ ] Buka halaman di browser → **View Page Source** (Ctrl+U) → class `product-card sorot` tergabung, bukan tertimpa
- [ ] Panggil komponen tanpa slot → tidak ada `<div>` aksi kosong di source
- [ ] Ubah format harga di komponen → berubah di **semua** halaman sekaligus

---

## Cara Submit

1. File final: `resources/views/components/product-card.blade.php`, `resources/views/layouts/app.blade.php`, `resources/views/products/index.blade.php`.
2. `php artisan view:cache` sukses tanpa error.
3. (Bonus) Feature test: `$this->get('/products')->assertSee('Habis')` untuk produk stok 0.
4. Jawab Refleksi di `catatan-blade.md`.

---

## Catatan Penting

- ⚠️ **Lupa titik dua** (`product="$product"`) membuat prop berisi string `"$product"`, bukan object. Errornya biasanya "Attempt to read property on string".
- ⚠️ **`$attributes` tanpa `merge`** akan menimpa class bawaan.
- 💡 Komponen tidak boleh query database. Data dikirim dari controller lewat props.
- 📚 Baca [teori Blade](../../../materi-teori/04-blade-template/README.md) bagian komponen.

---

## Refleksi

1. Kenapa props yang sudah dideklarasikan di `@props` tidak ikut muncul di `$attributes`?
2. Apa bedanya slot dan prop? Kapan kamu pilih masing-masing?
3. Layout gaya `@extends` vs layout gaya komponen: mana yang lebih mudah dibaca menurutmu, dan kenapa?
4. Kalau komponen ini dipakai 50 kali di satu halaman, di mana kamu harus memastikan tidak terjadi query N+1?

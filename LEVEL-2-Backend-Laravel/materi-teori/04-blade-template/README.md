# MATERI TEORI 04 — Blade Template dan Keamanan Output

> Target: **Laravel 13** (rilis Maret 2026) dengan **PHP 8.3+**. Semua yang
> dibahas di sini juga jalan di Laravel 12.

Praktikum topik ini: [materi-praktikum/04-blade-template](../../materi-praktikum/04-blade-template/README.md)

---

## 1. Apa Itu Blade?

Blade adalah **template engine** Laravel. File-nya ada di `resources/views`
dan berakhiran `.blade.php`.

```text
controller
   │  return view('promo.index', ['promo' => $promo]);
   ▼
resources/views/promo/index.blade.php
   │  (dikompilasi sekali jadi PHP biasa, disimpan di storage/framework/views)
   ▼
HTML ──► browser
```

Blade **bukan** bahasa baru. Ia cuma "gula" di atas PHP. Contoh:

```blade
<p>Halo, {{ $nama }}</p>
```

dikompilasi kira-kira jadi:

```php
<p>Halo, <?php echo e($nama); ?></p>
```

Fungsi `e()` itu yang membuat Blade aman secara default. Kita bahas di
bagian 3.

**Analogi:** Blade itu **cetakan undangan pernikahan**. Desainnya sekali
dibuat. Mesin cetak hanya mengganti nama tamu di setiap lembar.

**Kenapa penting untuk kerja:** banyak sistem internal, admin panel, dan
website instansi di Indonesia full Blade. Membaca dan merapikan Blade
adalah tugas harian developer Laravel.

---

## 2. Mengirim Data dari Controller ke View

```php
// Controller
return view('promo.index', [
    'judul' => 'Promo Akhir Bulan',
    'items' => $items,
]);

// Atau
return view('promo.index', compact('judul', 'items'));
```

Nama view memakai titik sebagai pemisah folder:
`'promo.index'` → `resources/views/promo/index.blade.php`.

**Aturan:** view hanya **menampilkan**. Ambil data di controller, kirim ke
view. Jangan menulis `Product::all()` di dalam Blade. Alasannya: query
tersembunyi di view susah dilacak, gampang memicu N+1, dan tidak bisa dites
terpisah.

---

## 3. Menampilkan Data: `{{ }}` vs `{!! !!}`

### `{{ }}` — dengan escape (default yang aman)

`{{ $x }}` menjalankan `htmlspecialchars` lewat helper `e()`. Karakter
berbahaya diubah jadi **entity**:

| Karakter | Jadi |
|---|---|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `"` | `&quot;` |
| `'` | `&#039;` |
| `&` | `&amp;` |

Jadi kalau `$x` berisi `<script>alert(1)</script>`, browser menampilkan
teks itu apa adanya, bukan menjalankannya.

### `{!! !!}` — tanpa escape (hati-hati)

`{!! $x !!}` mencetak isi **mentah**. Kalau `$x` berasal dari user, kamu
baru saja memberi user kemampuan menyisipkan HTML dan JavaScript ke halaman
orang lain. Inilah **XSS (Cross-Site Scripting)**.

**Analogi:** `{{ }}` itu **kirim barang dalam kotak tertutup**. Isinya
sampai utuh tapi tidak bisa keluar sendiri. `{!! !!}` itu **kirim hewan
tanpa kandang**. Kalau hewannya jinak (HTML yang kamu tulis sendiri atau
sudah disanitasi), aman. Kalau tidak tahu asalnya, jangan.

### Kapan `{!! !!}` boleh?

- HTML yang **kamu sendiri** hasilkan dan isinya sudah di-escape. Contoh
  pola yang benar untuk teks multi-baris: escape dulu, baru ubah baris baru:

  ```blade
  {!! nl2br(e($catatan)) !!}
  ```

- HTML rich text dari user yang **sudah disanitasi di server** dengan
  library HTML purifier berbasis allowlist tag. `strip_tags()` atau regex
  buatan sendiri **tidak** cukup.

Selain dua kasus itu: pakai `{{ }}`.

---

## 4. XSS Itu Soal Konteks

Escape HTML melindungi **isi tag**. Tapi data bisa mendarat di tempat lain:

### Konteks atribut URL

```blade
<a href="{{ $link }}">Kunjungi</a>
```

Kalau `$link` = `javascript:alert(document.cookie)`, tidak ada `<` atau
`"` yang perlu di-escape. Link tetap berbahaya. Solusinya: pastikan skema
URL hanya `http`/`https`, baik saat validasi input (`'url:http,https'`)
maupun sebelum dirender.

### Konteks JavaScript

```blade
{{-- BERBAHAYA: tanda kutip di data bisa menutup string --}}
<script>const kota = '{!! $kota !!}';</script>

{{-- AMAN: Laravel meng-encode sebagai JSON yang aman di dalam <script> --}}
<script>const kota = {{ Js::from($kota) }};</script>
```

`Js::from()` menghasilkan JSON dengan karakter `<`, `>`, `'`, `&` di-encode,
jadi `</script>` di dalam data tidak bisa menutup tag script.

### Ringkasan konteks

| Data mendarat di | Contoh | Pakai |
|---|---|---|
| Isi tag | `<p>...</p>` | `{{ }}` |
| Atribut biasa | `title="..."` | `{{ }}` (selalu dalam tanda kutip) |
| Atribut URL | `href`, `src` | cek skema + `{{ }}` |
| Dalam `<script>` | `const x = ...` | `Js::from()` / `@json` |
| Dalam CSS | `style="..."` | hindari data user sama sekali |

**Kenapa penting untuk kerja:** XSS konsisten masuk daftar celah paling
sering di laporan bug bounty dan audit. Satu XSS di halaman admin bisa
dipakai mencuri session admin.

Pelajari lebih dalam: [modul-keamanan-web/06 — XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md)

---

## 5. Directive Dasar

### Kondisi

```blade
@if ($nilai >= 85)
    <p>Sangat baik</p>
@elseif ($nilai >= 60)
    <p>Lulus</p>
@else
    <p>Belum lulus</p>
@endif

@unless ($aktif)
    <p>Akun nonaktif</p>
@endunless

@isset($catatan)
    <p>{{ $catatan }}</p>
@endisset

@empty($daftar)
    <p>Daftar kosong</p>
@endempty
```

### Perulangan

```blade
@foreach ($kota as $item)
    <li>{{ $loop->iteration }}. {{ $item }}</li>
@endforeach

@forelse ($pesanan as $p)
    <li>{{ $p->kode }}</li>
@empty
    <li>Belum ada pesanan.</li>
@endforelse
```

`@forelse` = `@foreach` + empty state. Hampir selalu lebih baik daripada
`@if (count(...))` lalu `@foreach`.

Variabel `$loop` tersedia di dalam loop:

| Properti | Isi |
|---|---|
| `$loop->index` | Mulai 0 |
| `$loop->iteration` | Mulai 1 |
| `$loop->first` / `$loop->last` | `true` di item pertama/terakhir |
| `$loop->count` | Jumlah item |
| `$loop->even` / `$loop->odd` | Genap/ganjil (untuk zebra row) |

### Autentikasi dan otorisasi

```blade
@auth
    <p>Halo, {{ auth()->user()->name }}</p>
@endauth

@guest
    <a href="{{ route('login') }}">Masuk</a>
@endguest

@can('update', $artikel)
    <a href="{{ route('artikel.edit', $artikel) }}">Ubah</a>
@endcan
```

**Penting:** `@can` hanya **menyembunyikan tombol**. Itu bukan keamanan.
Server tetap harus menolak lewat policy di controller (topik 08). Orang
bisa mengirim request langsung tanpa melihat tombolmu.

### Komentar

```blade
{{-- Komentar Blade: TIDAK ikut ke HTML --}}
<!-- Komentar HTML: ikut terkirim, terlihat di View Page Source -->
```

Jangan menaruh info sensitif di komentar HTML.

---

## 6. Layout Gaya `@extends`

**Analogi:** layout itu **bingkai foto**. Bingkainya sama, fotonya beda di
setiap halaman.

```blade
{{-- resources/views/layouts/utama.blade.php --}}
<!DOCTYPE html>
<html lang="id">
<head>
    <title>@yield('title', 'Situs Saya')</title>
    @stack('styles')
</head>
<body>
    @include('partials.navbar')

    @yield('content')

    @stack('scripts')
</body>
</html>
```

```blade
{{-- resources/views/kontak.blade.php --}}
@extends('layouts.utama')

@section('title', 'Kontak')

@section('content')
    <h1>Hubungi Kami</h1>
@endsection

@push('scripts')
    <script src="/js/peta.js"></script>
@endpush
```

| Directive | Di mana | Fungsi |
|---|---|---|
| `@yield('x', 'default')` | layout | "kursi kosong" satu isian |
| `@section('x') ... @endsection` | halaman anak | mengisi kursi |
| `@stack('x')` | layout | "meja panjang", bisa diisi berkali-kali |
| `@push('x') ... @endpush` | mana saja | menaruh barang di meja |
| `@include('partials.y')` | mana saja | menyisipkan file view lain |

---

## 7. Komponen

Komponen = potongan tampilan yang dipakai ulang, dipanggil seperti tag HTML
dengan awalan `x-`.

### Anonymous component (cukup satu file Blade)

```blade
{{-- resources/views/components/tombol.blade.php --}}
@props(['jenis' => 'utama'])

<button {{ $attributes->merge(['class' => 'btn btn-' . $jenis]) }}>
    {{ $slot }}
</button>
```

```blade
<x-tombol jenis="bahaya" type="submit" class="lebar">Hapus</x-tombol>
{{-- hasil: <button class="btn btn-bahaya lebar" type="submit">Hapus</button> --}}
```

Tiga jenis "kiriman" ke komponen:

| Jenis | Contoh di pemanggil | Dibaca di komponen |
|---|---|---|
| Props | `jenis="bahaya"`, `:data="$obj"` | variabel `$jenis`, `$data` (dideklarasikan di `@props`) |
| Attributes | `type="submit" class="lebar"` | `$attributes` (semua yang **bukan** props) |
| Slot | isi di antara tag | `$slot`, atau slot bernama `<x-slot:judul>` → `$judul` |

Aturan kecil yang sering bikin bingung:

- `jenis="bahaya"` mengirim **string**. `:jenis="$variabel"` (titik dua)
  mengirim **ekspresi PHP**. Object harus pakai titik dua.
- Prop `camelCase` (`tampilkanHarga`) dipanggil `kebab-case`
  (`tampilkan-harga`).
- `$attributes->merge()` **menggabungkan** class. Tanpa merge, class bawaan
  tertimpa.
- `$slot->isNotEmpty()` untuk mengecek apakah pemanggil mengirim isi.

### Class component

Kalau komponen butuh logika PHP (format data, ambil config), buat class:

```bash
php artisan make:component AlertBox
# app/View/Components/AlertBox.php + resources/views/components/alert-box.blade.php
```

Untuk latihan, anonymous component sudah cukup.

### Layout gaya komponen

Selain `@extends`, Laravel juga mendukung layout sebagai komponen:

```blade
{{-- resources/views/components/layout.blade.php --}}
<html lang="id">
<body>{{ $slot }}</body>
</html>

{{-- pemakaian --}}
<x-layout>
    <h1>Halo</h1>
</x-layout>
```

Starter kit Laravel modern banyak memakai gaya ini. Dua gaya sama-sama
benar. Pilih satu dan konsisten dalam satu project.

**Analogi komponen:** **cetakan kue**. Props = rasa adonan, slot = topping,
attributes = hiasan tambahan dari pemesan.

**Kenapa penting:** di tim, komponen adalah "kosakata bersama". Desain
tombol berubah? Ubah satu file, seluruh aplikasi ikut.

---

## 8. Form di Blade

```blade
<form method="POST" action="{{ route('ulasan.update', $ulasan) }}">
    @csrf
    @method('PATCH')

    <label for="isi">Ulasan</label>
    <textarea id="isi" name="isi">{{ old('isi', $ulasan->isi) }}</textarea>

    @error('isi')
        <p role="alert">{{ $message }}</p>
    @enderror

    <button type="submit">Simpan</button>
</form>
```

| Bagian | Fungsi |
|---|---|
| `@csrf` | Hidden input `_token` untuk proteksi CSRF |
| `@method('PATCH')` | Hidden input `_method`, karena form HTML cuma kenal GET/POST |
| `old('isi', default)` | Isi ulang input setelah validasi gagal |
| `@error('isi')` | Tampilkan pesan error validasi untuk field itu |

### CSRF singkat

CSRF terjadi saat situs jahat membuat browser korban (yang sedang login di
tokomu) mengirim form ke tokomu. Laravel 13 memeriksanya lewat middleware
`PreventRequestForgery`: pertama cek header `Sec-Fetch-Site` (asal request),
kalau tidak bisa dipastikan, cek token `_token`. Di Laravel 12 namanya
`ValidateCsrfToken` dan hanya memakai token. Form tanpa `@csrf` akan dapat
status `419 Page Expired`.

**XSS mengalahkan CSRF.** Kalau penyerang bisa menjalankan script di
halamanmu, script itu bisa membaca token CSRF dan mengirim form sendiri.
Jadi dua proteksi ini saling melengkapi, bukan saling menggantikan.

---

## 9. Asset dengan Vite

```blade
<head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
```

Jalankan `npm install` lalu `npm run dev` saat development, `npm run build`
saat deploy. Kalau muncul error "Vite manifest not found", artinya kamu
belum menjalankan salah satu perintah itu.

---

## 10. Kesalahan Umum

| Kesalahan | Akibat | Perbaikan |
|---|---|---|
| `{!! $input_user !!}` | XSS | `{{ }}` |
| `nl2br($teks)` tanpa `e()` | XSS lewat deskripsi | `{!! nl2br(e($teks)) !!}` |
| `e(nl2br($teks))` | `<br />` tampil sebagai teks | escape dulu, baru `nl2br` |
| `href="{{ $url_user }}"` tanpa cek skema | `javascript:` XSS | allowlist `http/https` |
| String data user di dalam `<script>` | XSS konteks JS | `Js::from()` |
| Query Eloquent di Blade | N+1, susah dites | ambil data di controller |
| `@can` dianggap keamanan | Akses ilegal lewat request langsung | policy di server |
| Lupa `@csrf` lalu mematikan CSRF | Form bisa dipalsukan | tambahkan `@csrf` |
| `:product="$product"` tanpa titik dua | Prop berisi string `"$product"` | pakai `:` untuk ekspresi |
| `$attributes` tanpa `merge` | Class bawaan hilang | `$attributes->merge([...])` |
| Info sensitif di komentar `<!-- -->` | Bocor di View Page Source | pakai `{{-- --}}` atau hapus |

---

## 11. Cara Mengecek Blade

`php -l` **tidak** memahami sintaks Blade. Cek lewat Laravel:

```bash
php artisan view:clear     # hapus hasil kompilasi lama
php artisan view:cache     # kompilasi semua view; error = ada directive rusak
```

Di browser, biasakan membuka **View Page Source** (Ctrl+U) untuk melihat
HTML asli yang dikirim server, bukan tampilan yang sudah dirender.

---

## 12. Latihan Berpikir (Tanpa Kode)

1. Data apa saja di toko online yang berasal dari user? (Petunjuk: lebih banyak dari yang kamu kira, termasuk query string dan nama file upload.)
2. Kamu butuh deskripsi produk dengan **bold** dan **list**. Langkah apa yang harus ada di server sebelum boleh pakai `{!! !!}`?
3. Kenapa `@can` di view tidak cukup untuk keamanan, tapi tetap berguna?
4. Komponen kartu produk dipakai 100 kali di satu halaman. Di mana kamu memastikan relasi `category` tidak di-query 100 kali?

---

## Glosarium

| Istilah | Arti |
|---|---|
| Template engine | Alat yang menggabungkan cetakan tampilan dengan data |
| Kompilasi view | Proses Blade diubah jadi PHP dan disimpan di cache |
| Directive | Perintah Blade berawalan `@` |
| Escape | Mengubah karakter khusus jadi entity supaya tampil sebagai teks |
| Entity HTML | Kode pengganti karakter, misal `&lt;` untuk `<` |
| XSS | Penyisipan script yang dijalankan di browser korban |
| Reflected XSS | XSS dari input request langsung (misal `?q=`) |
| Stored XSS | XSS yang tersimpan di database lalu tampil ke banyak orang |
| Sanitasi | Membersihkan HTML dengan allowlist tag/atribut |
| CSRF | Pemalsuan request dari situs lain atas nama user |
| Layout | Kerangka halaman bersama |
| Komponen | Potongan tampilan yang dipakai ulang (`<x-nama>`) |
| Props | Data yang dideklarasikan komponen |
| Attributes bag | `$attributes`: atribut HTML yang bukan props |
| Slot | Konten dari pemanggil yang disisipkan ke komponen |
| Stack | Tempat di layout yang bisa diisi berkali-kali (`@push`) |
| Vite | Bundler asset CSS/JS yang dipakai Laravel |

---

## Referensi Resmi

- [Laravel 13: Blade Templates](https://laravel.com/docs/13.x/blade)
- [Laravel 13: Views](https://laravel.com/docs/13.x/views)
- [Laravel 13: CSRF Protection](https://laravel.com/docs/13.x/csrf)
- [Laravel 13: Asset Bundling (Vite)](https://laravel.com/docs/13.x/vite)
- [OWASP: XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [PHP: htmlspecialchars](https://www.php.net/manual/en/function.htmlspecialchars.php)

Lanjut ke praktikum: [04 — Blade Template](../../materi-praktikum/04-blade-template/README.md)

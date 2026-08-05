# Materi Praktikum — Backend dengan Laravel

> **10 modul praktikum** yang disusun berurutan. Setiap modul membangun
> di atas modul sebelumnya. Ikuti dari 01 → 10.

---

## Cara Pakai

```
1. BACA    soal/01-nama-soal.md      → Pahami apa yang diminta
2. BUKA    code/01-nama-soal.php     → Lihat template kode awal (ada TODO)
3. KETIK   dari 0 di VS Code         → Jangan copy-paste!
4. JALANKAN dengan php artisan / php → Lihat output di browser / terminal
5. COBA    ubah-ubah kode-nya        → Experimen sendiri
```

- Setiap soal punya **README** (di folder `soal/`) yang menjelaskan
  **Tujuan, Briefing, Cara Kerja per-bagian, Verifikasi, Catatan Pemula**
- Setiap soal punya **template kode awal** (di folder `code/`) dengan
  komentar `TODO(human)` yang menunjukkan bagian yang perlu kamu isi
- Soal diakhiri dengan **Tabel Ringkasan** + **Verifikasi Akhir** yang
  bisa kamu pakai self-check

---

## Daftar Latihan

### PEMULA (Soal 01–03)

| #   | Judul                     | Topik yang Dipelajari                            |
| --- | ------------------------- | ----------------------------------------------- |
| 01  | Variabel & Tipe Data PHP  | `$var`, `string`, `int`, `array`, `echo`, `var_dump` |
| 02  | Setup Project Laravel     | `composer create-project`, `php artisan serve`  |
| 03  | Routing & Controller      | `routes/web.php`, `Route::get()`, return `view()`|

### MENENGAH (Soal 04–07)

| #   | Judul                     | Topik yang Dipelajari                            |
| --- | ------------------------- | ----------------------------------------------- |
| 04  | Blade Template            | `@if`, `@foreach`, layout inheritance          |
| 05  | Migration & Schema        | `php artisan make:migration`, schema builder   |
| 06  | Eloquent ORM              | Model, `::all()`, `::find()`, relasi `hasMany`  |
| 07  | Form Request & Validasi   | `validate()`, error message, old input          |

### LANJUT (Soal 08–10)

| #   | Judul                     | Topik yang Dipelajari                            |
| --- | ------------------------- | ----------------------------------------------- |
| 08  | Autentikasi Breeze        | Register, login, logout, middleware `auth`      |
| 09  | REST API + Sanctum        | `routes/api.php`, Resource Controller, token   |
| 10  | Deploy Shared Hosting     | Upload via FTP, set `.env` production           |

---

## Persiapan: Install Tool yang Dibutuhkan

```
belajar-laravel/
├── php --version           # PHP 8.5 untuk Laravel 13
├── composer --version      # Composer 2+
├── laravel --version       # Laravel installer (global)
└── mysql --version         # atau MariaDB via XAMPP/Laragon
```

Download:
- **PHP** — sudah include di XAMPP/Laragon/Herd
- **Composer** — https://getcomposer.org/
- **Laravel Installer** — `composer global require laravel/installer`

---

## Tips Penting

```
1. KETIK dari 0 — jangan copy-paste. Menulis melatih muscle memory coding.
2. PAHAM logika dulu — baca materi-teori sebelum membuka template.
3. Gunakan `php artisan tinker` — REPL untuk uji kode PHP cepat.
4. Cek error di terminal — Laravel kasih error message yang jelas.
5. RUBAH nilainya — jangan hanya salin persis, coba ubah dan lihat bedanya.
6. BREAK it — kalau stuck, pecah jadi bagian kecil, uji satu per satu.
7. EROR adalah guru — baca pesan error dari Laravel dengan seksama.
8. Baca dokumentasi resmi — https://laravel.com/docs (ada versi Indo).
```

---

## Struktur Template Kode

Setiap file template memiliki format seperti ini:

```php
<?php
// ========== TODO 1: Deklarasi Variabel ==========
// Tambahkan variabel $nama dengan nilai "Laravel"
```

Artinya:
- `<?php` — tag pembuka PHP
- Comment `// ...` menunjukkan instruksi
- Kata `TODO` menunjukkan bagian yang HARUS kamu isi
- Teks setelah `TODO` menunjukkan apa yang harus dilakukan
- Hapus komentar tersebut setelah kamu menulis kode yang diminta

---

**Target: 10/10 soal dikerjakan dari 0 → fondasi Laravel SOLID!**

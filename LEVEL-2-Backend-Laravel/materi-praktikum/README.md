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
├── php --version           # PHP 8.3+ (Laravel 13 dan 12)
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

---

## Menyiapkan Proyek Latihan toko-latihan

Hampir semua starter di folder `code/` adalah **potongan** class, route, atau
migration Laravel. Potongan itu tidak bisa dijalankan sendirian. Kamu perlu satu
project Laravel latihan, dibuat **di luar repo ini** supaya repo tetap bersih.

```bash
cd ~
mkdir -p latihan-laravel && cd latihan-laravel
composer create-project laravel/laravel toko-latihan
cd toko-latihan
php artisan serve        # http://127.0.0.1:8000
```

Project baru memakai SQLite, jadi tidak perlu install database. Satu project
dipakai untuk semua topik 02–10, sehingga hasil topik sebelumnya terbawa ke
topik berikutnya.

Alur kerja tiap soal:

1. Baca `soal/NN-*.md`.
2. Salin starter dari `code/` ke lokasi yang tertulis di `TUGAS.md` topik itu.
3. Isi bagian `TODO(human)` dengan ketikanmu sendiri.
4. Cek hasilnya dengan perintah di bagian "Cara Mengecek Hasil Sendiri".
5. Baru setelah punya jawaban yang jalan, bandingkan dengan `contoh/`.

Pengecualian: topik 01 (PHP biasa, jalankan dengan `php file.php`) dan sebagian
topik 10 (script pemeriksa) tidak butuh Laravel.

Yang bisa dicek langsung dari repo ini tanpa Laravel hanyalah sintaks:

```bash
php -l LEVEL-2-Backend-Laravel/materi-praktikum/01-php-dasar/code/02-keranjang-belanja.php
```

Untuk topik 09 jalankan sekali `php artisan install:api` di `toko-latihan`.

---

## Indeks Semua Topik dan Soal

Setiap topik punya `README.md` (konsep singkat dan glosarium), `TUGAS.md`
(langkah kerja dan petunjuk bertingkat), dan `CHECKLIST.md` (cek pemahaman).
Teori lengkap ada di [materi-teori](../materi-teori/README.md).

| Topik | Teori | Soal 01 | Soal 02 | Soal 03 | Keamanan |
|---|---|---|---|---|---|
| [01 PHP Dasar](01-php-dasar/README.md) | [teori](../materi-teori/01-php-dasar/README.md) | [Rekap Nilai](01-php-dasar/soal/01-katalog-nilai.md) | [Keranjang Belanja](01-php-dasar/soal/02-keranjang-belanja.md) | [Class Produk](01-php-dasar/soal/03-class-produk.md) | — |
| [02 Setup Laravel](02-setup-laravel/README.md) | [teori](../materi-teori/02-setup-laravel/README.md) | [Health Check](02-setup-laravel/soal/01-health-check.md) | [Config dan Env](02-setup-laravel/soal/02-config-dan-env.md) | [Command Cek Env](02-setup-laravel/soal/03-artisan-command-cek-env.md) | [07 Konfigurasi Aman](../../modul-keamanan-web/07-konfigurasi-aman/README.md) |
| [03 Routing dan Controller](03-routing-controller/README.md) | [teori](../materi-teori/03-routing-controller/README.md) | [Product Controller](03-routing-controller/soal/01-product-controller.md) | [Route Group dan Nama](03-routing-controller/soal/02-route-group-dan-nama.md) | [Middleware Jam Buka](03-routing-controller/soal/03-middleware-jam-buka.md) | — |
| [04 Blade Template](04-blade-template/README.md) | [teori](../materi-teori/04-blade-template/README.md) | [Products View](04-blade-template/soal/01-products-view.md) | [Layout dan Komponen](04-blade-template/soal/02-layout-dan-component.md) | [XSS dan Escape](04-blade-template/soal/03-xss-dan-escape.md) | [06 XSS dan CSRF](../../modul-keamanan-web/06-xss-dan-csrf/README.md) |
| [05 Database Migration](05-database-migration/README.md) | [teori](../materi-teori/05-database-migration/README.md) | [Products Migration](05-database-migration/soal/01-products-migration.md) | [Categories dan Foreign Key](05-database-migration/soal/02-categories-dan-foreign-key.md) | [Query Builder dan SQL Injection](05-database-migration/soal/03-query-builder-dan-sql-injection.md) | [03 SQL Injection](../../modul-keamanan-web/03-sql-injection/README.md) |
| [06 Eloquent ORM](06-eloquent-orm/README.md) | [teori](../materi-teori/06-eloquent-orm/README.md) | [Product Model](06-eloquent-orm/soal/01-product-model.md) | [Mass Assignment](06-eloquent-orm/soal/02-mass-assignment.md) | [Scope dan N+1](06-eloquent-orm/soal/03-scope-pencarian-dan-n-plus-1.md) | [02 Validasi](../../modul-keamanan-web/02-validasi-input/README.md), [03 SQL Injection](../../modul-keamanan-web/03-sql-injection/README.md) |
| [07 Form dan Validasi](07-form-validasi/README.md) | [teori](../materi-teori/07-form-validasi/README.md) | [Store Request](07-form-validasi/soal/01-store-product-request.md) | [Update Request](07-form-validasi/soal/02-update-product-request.md) | [Validasi Server Wajib](07-form-validasi/soal/03-validasi-server-wajib.md) | [02 Validasi Input](../../modul-keamanan-web/02-validasi-input/README.md) |
| [08 Autentikasi](08-autentikasi/README.md) | [teori](../materi-teori/08-autentikasi/README.md) | [Auth dan Policy](08-autentikasi/soal/01-auth-authorization.md) | [Login Manual dan Hash](08-autentikasi/soal/02-login-manual-dan-hash.md) | [IDOR dan Policy](08-autentikasi/soal/03-idor-dan-policy-kepemilikan.md) | [04 Autentikasi](../../modul-keamanan-web/04-autentikasi-dan-password/README.md), [05 Otorisasi](../../modul-keamanan-web/05-otorisasi-dan-akses/README.md) |
| [09 REST API](09-rest-api/README.md) | [teori](../materi-teori/09-rest-api/README.md) | [Product API](09-rest-api/soal/01-product-api.md) | [API Resource Tanpa Bocor](09-rest-api/soal/02-api-resource-tanpa-bocor.md) | [Rate Limit dan Token](09-rest-api/soal/03-rate-limit-dan-token.md) | [05 Otorisasi](../../modul-keamanan-web/05-otorisasi-dan-akses/README.md), [04 Autentikasi](../../modul-keamanan-web/04-autentikasi-dan-password/README.md) |
| [10 Deploy dan Hosting](10-deploy-hosting/README.md) | [teori](../materi-teori/10-deploy-hosting/README.md) | [Production Readiness](10-deploy-hosting/soal/01-production-readiness.md) | [Env dan Rahasia](10-deploy-hosting/soal/02-env-dan-rahasia.md) | [APP_DEBUG dan Deploy Script](10-deploy-hosting/soal/03-app-debug-dan-deploy-script.md) | [07 Konfigurasi Aman](../../modul-keamanan-web/07-konfigurasi-aman/README.md) |

Tingkat kesulitan naik di tiap topik: soal 01 dasar, soal 02 menengah, soal 03
lanjut. Catatan: tabel "Daftar Latihan" di atas adalah ringkasan awal. Kalau ada
perbedaan, indeks ini yang terbaru. Setelah semua topik, lanjut ke
[tutorial end-to-end](../tutorial/README.md).

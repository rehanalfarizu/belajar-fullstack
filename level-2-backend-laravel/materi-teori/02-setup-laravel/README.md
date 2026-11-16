# MATERI TEORI 02 — Setup Laravel

> Target: **Laravel 13** (rilis Maret 2026) dengan **PHP 8.3+**. Semua yang dibahas di
> sini juga berlaku untuk Laravel 12. Kalau ada perbedaan, akan disebut.

Praktikumnya ada di [materi-praktikum/02-setup-laravel](../../materi-praktikum/02-setup-laravel/README.md).

---

## 1. Laravel Itu Apa, Singkatnya?

Laravel adalah kumpulan kode PHP siap pakai untuk membuat aplikasi web: routing,
database, validasi, login, antrean, test, dan banyak lagi.

**Analogi:** Laravel itu dapur restoran yang sudah lengkap. Kompor, kulkas, rak bumbu,
SOP kebersihan sudah ada. Kamu tinggal memasak menu (fitur) milikmu. Tapi kamu tetap
harus tahu letak semua alat itu, kalau tidak kamu akan kebingungan sendiri.

---

## 2. Yang Perlu Disiapkan

| Alat | Untuk apa | Cek |
| --- | --- | --- |
| PHP 8.3+ | Menjalankan Laravel | `php --version` |
| Composer 2 | Mengunduh Laravel dan library | `composer --version` |
| Node.js LTS + npm | Build CSS/JS (Vite). Opsional untuk API murni | `node --version` |
| Database | SQLite (bawaan, cukup untuk belajar), MySQL/PostgreSQL nanti | – |
| Git | Version control | `git --version` |

Laravel 13 butuh minimal PHP 8.3. PHP 8.4 dan 8.5 juga didukung.

---

## 3. Tiga Cara Membuat Project

Semua cara menghasilkan project yang sama. Pilih yang paling cocok dengan laptopmu.

### Cara A: Composer langsung (paling universal)

```bash
composer create-project laravel/laravel nama-project
cd nama-project
php artisan serve
```

Cara ini yang dipakai di semua TUGAS di track ini, karena hanya butuh PHP + Composer.

### Cara B: Laravel installer

```bash
composer global require laravel/installer
laravel new nama-project
```

Installer akan bertanya beberapa hal (starter kit, framework test, database). Bagus
kalau kamu sudah tahu mau pilih apa. Pastikan folder global Composer ada di `PATH`
supaya perintah `laravel` dikenali.

### Cara C: Laravel Herd (macOS/Windows)

[Herd](https://herd.laravel.com/) menginstal PHP, Composer, dan installer Laravel
sekaligus, plus web server lokal. Project di folder Herd otomatis bisa dibuka di
`http://nama-project.test`.

**Kenapa tetap belajar Cara A?** Server production tidak memakai Herd. Kamu perlu paham
bahwa Laravel cuma butuh PHP + Composer + web server. Herd hanya mempermudah di laptop.

---

## 4. Peta Folder Project

**Analogi:** Denah rumah. Kamu tidak perlu hafal letak setiap paku, tapi harus tahu
kamar mana untuk apa.

```text
nama-project/
├── app/                 ← KODEMU: controller, model, command, policy, service
│   ├── Console/Commands ← Artisan command buatanmu
│   ├── Http/Controllers ← controller
│   ├── Models           ← model Eloquent
│   └── Providers        ← AppServiceProvider (tempat setup global)
├── bootstrap/app.php    ← merakit aplikasi: routing, middleware, exception
├── config/              ← file konfigurasi (membaca .env)
├── database/            ← migration, seeder, factory, file SQLite
├── public/              ← SATU-SATUNYA folder yang boleh diakses browser
│   └── index.php        ← pintu masuk semua request
├── resources/views      ← template Blade
├── routes/              ← web.php, console.php (api.php setelah install:api)
├── storage/             ← log, cache, file upload
│   └── logs/laravel.log ← catatan error
├── tests/               ← Feature dan Unit test
├── vendor/              ← library dari Composer (JANGAN diedit, JANGAN di-commit)
├── .env                 ← nilai rahasia/khusus mesin (JANGAN di-commit)
├── .env.example         ← contoh .env (di-commit)
├── artisan              ← program CLI Laravel
└── composer.json        ← daftar dependency dan aturan autoload
```

Sejak Laravel 11, struktur dibuat lebih ramping: tidak ada lagi `app/Http/Kernel.php`
atau `app/Console/Kernel.php`. Pengaturan middleware dan routing pindah ke
`bootstrap/app.php`. Tutorial lama di internet sering masih menyebut file-file itu.

**Kenapa penting buat kerja:** Saat code review, reviewer akan bertanya "kenapa logika
ini ada di route file, bukan di controller/service?". Tahu letak yang benar membuat
kodemu mudah dicari orang lain.

---

## 5. Perjalanan Satu Request (Request Lifecycle)

**Analogi:** Paket yang dikirim ke kantor. Masuk lewat satpam (index.php), dicatat
resepsionis (bootstrap), diperiksa petugas keamanan (middleware), diantar ke meja yang
tepat (route → controller), lalu balasannya dikirim balik lewat jalur yang sama.

```text
Browser / curl
   │  GET /tentang-toko
   ▼
public/index.php            ← satu-satunya pintu masuk
   │  memuat vendor/autoload.php (Composer)
   ▼
bootstrap/app.php           ← membuat Application, daftar route & middleware
   │
   ▼
HTTP Kernel                 ← menjalankan middleware global
   │  (cek maintenance mode, trim string, dsb.)
   ▼
Router                      ← cocokkan method + URL dengan routes/web.php
   │  menjalankan middleware grup "web" (session, cookie, CSRF)
   ▼
Closure / Controller        ← KODEMU jalan di sini
   │
   ▼
Response (HTML / JSON / redirect)
   │  kembali melewati middleware (bisa menambah header)
   ▼
Browser
```

Konsekuensi penting:

- Web server harus diarahkan ke folder `public/`. Kalau diarahkan ke root project,
  orang bisa mencoba membuka `/.env` dari browser.
- Middleware jalan **sebelum** kodemu. Itu sebabnya autentikasi dan CSRF dipasang
  sebagai middleware.

---

## 6. `.env` dan Folder `config/`

### `.env`

File teks berisi pasangan `KUNCI=nilai`:

```dotenv
APP_NAME="Toko Latihan"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
DB_CONNECTION=sqlite
```

**Analogi:** `.env` itu catatan PIN di dompetmu. Setiap orang punya catatan berbeda.
Catatan itu tidak pernah ditempel di mading (Git).

`.env.example` adalah **formulir kosong** dengan nama kolom yang sama. Itu yang
di-commit, supaya anggota tim tahu apa saja yang perlu diisi.

### `config/`

File di `config/` adalah PHP biasa yang membaca `.env` dan memberi nilai default.
Contoh potongan gaya `config/app.php`:

```php
return [
    'name' => env('APP_NAME', 'Laravel'),
    'debug' => (bool) env('APP_DEBUG', false),
];
```

Di kode lain, baca dengan `config()`:

```php
config('app.name');                 // "Toko Latihan"
config('app.debug');                // true / false
config('services.contoh.timeout', 5); // nilai default kalau kunci tidak ada
```

Formatnya: `nama-file.kunci.sub-kunci`.

### Aturan emas: `env()` hanya di folder `config/`

Di production kita menjalankan:

```bash
php artisan config:cache
```

Laravel menggabungkan semua file config jadi satu file cache. Setelah itu **`.env` tidak
dibaca lagi**, dan `env()` di luar folder `config/` mengembalikan `null`.

```text
TANPA cache:  controller → env('X')    → baca .env → "nilai"
DENGAN cache: controller → env('X')    → null           ← bug yang cuma muncul di server
              controller → config('…') → "nilai"        ← aman di mana saja
```

Jadi: `.env` → dibaca **hanya** oleh `config/*.php` → kodemu membaca `config()`.

```bash
php artisan config:show session   # lihat isi satu file config (hati-hati: app dan database berisi secret)
php artisan config:clear      # hapus cache, kembali membaca .env
```

**Kenapa penting buat kerja:** Bug "di laptop jalan, di server null" sangat sering
terjadi gara-gara `env()` dipanggil di controller. Senior akan langsung menandainya saat
review.

---

## 7. `APP_KEY`

`APP_KEY` adalah kunci enkripsi aplikasi. Laravel memakainya untuk mengenkripsi cookie,
session terenkripsi, dan data yang kamu enkripsi dengan `Crypt`.

```bash
php artisan key:generate   # mengisi APP_KEY di .env (otomatis saat create-project)
```

**Analogi:** Kunci gembok gudang. Kalau kunci bocor, orang bisa membuka gudang. Kalau
kunci diganti tiba-tiba, semua gembok lama tidak bisa dibuka lagi (user ter-logout,
data terenkripsi lama tidak terbaca).

Aturan:

- Setiap environment (laptop, staging, production) punya `APP_KEY` sendiri.
- Jangan pernah mencetak `APP_KEY` di log, response, atau output command.
- Jangan generate ulang di production tanpa rencana. Laravel punya fitur
  `APP_PREVIOUS_KEYS` untuk rotasi kunci secara bertahap.

---

## 8. Artisan: Perintah yang Paling Sering Dipakai

**Analogi:** Artisan itu asisten pribadi di dapur. Kamu tinggal bilang "siapkan
talenan", dia yang mengambilkan.

| Perintah | Kegunaan |
| --- | --- |
| `php artisan serve` | Server development di `http://127.0.0.1:8000` |
| `php artisan about` | Ringkasan versi, environment, driver, cache |
| `php artisan route:list` | Semua route terdaftar (filter: `--path=produk`) |
| `php artisan tinker` | REPL dengan aplikasi Laravel sudah termuat |
| `php artisan make:controller X` | Buat controller |
| `php artisan make:model X -m` | Buat model + migration |
| `php artisan make:command X` | Buat Artisan command |
| `php artisan make:test XTest` | Buat feature test |
| `php artisan migrate` | Jalankan migration |
| `php artisan test` | Jalankan semua test |
| `php artisan config:show nama` | Lihat isi config |
| `php artisan list` | Semua perintah yang ada |
| `php artisan help nama:perintah` | Bantuan satu perintah |

### Tinker

```bash
php artisan tinker
> config('app.env')
= "local"
> now()->addDays(3)->toDateString()
= "2026-11-19"
> exit
```

Tinker bagus untuk mencoba satu baris kode sebelum ditulis ke file.

### `composer run dev`

Project baru Laravel punya script `dev` di `composer.json` yang menjalankan beberapa
proses sekaligus (server, queue, log viewer, Vite). Kalau kamu belum butuh frontend,
`php artisan serve` saja sudah cukup.

---

## 9. Composer dan `composer.json`

```json
{
  "require": {
    "php": "^8.3",
    "laravel/framework": "^13.0"
  },
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  }
}
```

- `require`: library yang dibutuhkan saat aplikasi jalan.
- `require-dev`: library khusus development (test, debugging).
- `autoload.psr-4`: `App\Models\Product` → `app/Models/Product.php`.
- `composer.lock`: versi **persis** yang terpasang. **Di-commit**, supaya semua orang
  memasang versi yang sama.

```bash
composer install         # pasang sesuai composer.lock (pakai ini setelah clone)
composer require x/y     # tambah library baru
composer update          # naikkan versi (hati-hati, bisa membawa perubahan besar)
composer dump-autoload   # buat ulang peta autoload
```

---

## 10. Log dan Debug

Saat error, Laravel mencatat di `storage/logs/laravel.log`.

```bash
tail -n 50 storage/logs/laravel.log
```

Dengan `APP_DEBUG=true`, error tampil lengkap di browser: stack trace, potongan kode,
bahkan nilai environment. Sangat membantu di laptop, **sangat berbahaya** di production.

**Analogi:** `APP_DEBUG=true` seperti membuka pintu dapur lebar-lebar supaya kamu mudah
mondar-mandir. Di rumah sendiri boleh. Di restoran yang buka untuk umum, pelanggan jadi
bisa melihat isi kulkas dan resep rahasia.

Aturan production: `APP_ENV=production`, `APP_DEBUG=false`. Ini dibahas lagi di topik 10
dan di [Modul Keamanan 07 — Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## 11. Test Pertama

Laravel sudah menyiapkan folder `tests/` dan PHPUnit (atau Pest kalau kamu memilihnya
lewat installer). Contoh feature test untuk halaman utama, gaya PHPUnit:

```php
namespace Tests\Feature;

use Tests\TestCase;

final class HalamanUtamaTest extends TestCase
{
    public function test_halaman_utama_bisa_dibuka(): void
    {
        $this->get('/')->assertOk();
    }
}
```

```bash
php artisan test
php artisan test --filter=HalamanUtamaTest
```

**Kenapa penting buat kerja:** Banyak perusahaan menolak pull request tanpa test. Biasakan
dari topik pertama.

---

## 12. Gaya Baru di Laravel 13 (Sekadar Tahu)

Laravel 13 menambah banyak **PHP attribute** sebagai alternatif properti. Contoh di
dokumentasi Laravel 13:

```php
#[Fillable(['name', 'price'])]
final class Product extends Model {}
```

Cara lama `protected $fillable = [...]` dan scope bernama `scopeActive()` **tetap
didukung** dan masih sangat banyak dipakai di codebase perusahaan. Di track ini kita
memakai cara lama di kode latihan supaya jalan di Laravel 12 dan 13, dan menyebut gaya
attribute di materi terkait.

---

## 13. Kesalahan Umum

| Kesalahan | Gejala | Perbaikan |
| --- | --- | --- |
| Commit `.env` | Secret bocor ke GitHub | Pastikan `.gitignore`; kalau bocor, ganti semua secret |
| `env()` di controller | Jalan di laptop, `null` di server | Pindahkan ke `config/`, baca dengan `config()` |
| Lupa `config:clear` | Ubah `.env` tapi tidak berefek | `php artisan config:clear` |
| Web root ke folder project | `/.env` bisa dicoba dibuka | Arahkan ke `public/` |
| Edit file di `vendor/` | Hilang saat `composer install` | Jangan pernah edit `vendor/` |
| Tidak commit `composer.lock` | Versi library beda tiap orang | Commit `composer.lock` |
| `APP_DEBUG=true` di production | Stack trace dan env terlihat publik | `APP_DEBUG=false` |
| Mengikuti tutorial Laravel 8–10 | Mencari `app/Http/Kernel.php` yang tidak ada | Cek versi tutorial; lihat `bootstrap/app.php` |

---

## 14. Glosarium

| Istilah | Arti |
| --- | --- |
| Framework | Kerangka kode siap pakai dengan aturan main sendiri |
| Composer | Package manager dan autoloader PHP |
| Packagist | "Toko" library PHP tempat Composer mengunduh |
| Artisan | CLI bawaan Laravel |
| Herd | Aplikasi lingkungan PHP/Laravel siap pakai untuk macOS/Windows |
| Request lifecycle | Urutan langkah sejak request masuk sampai response keluar |
| Middleware | Lapisan pemeriksa yang dilewati request sebelum/sesudah kodemu |
| `.env` | File variabel environment per mesin, tidak di-commit |
| Config cache | File gabungan semua config; membuat `.env` tidak dibaca lagi |
| `APP_KEY` | Kunci enkripsi aplikasi |
| Web root | Folder yang dibuka web server untuk publik (`public/`) |
| Tinker | REPL Laravel |
| Exit code | Angka hasil program di terminal, `0` = sukses |

---

## 15. Uji Pemahaman (Tanpa Melihat Catatan)

1. Sebutkan urutan file/komponen yang dilewati request dari browser sampai ke route.
2. Kenapa `env('TOKO_NAMA')` di controller bisa jadi `null` di server tapi tidak di laptop?
3. Apa yang terjadi pada user yang sedang login kalau `APP_KEY` diganti?
4. File mana yang di-commit: `.env`, `.env.example`, `composer.lock`, `vendor/`?
5. Kamu membuat class `App\Services\HitungOngkir`. Di path mana file-nya harus disimpan?

---

## Referensi Resmi

- [Laravel 13: Installation](https://laravel.com/docs/13.x/installation)
- [Laravel 13: Configuration](https://laravel.com/docs/13.x/configuration)
- [Laravel 13: Directory Structure](https://laravel.com/docs/13.x/structure)
- [Laravel 13: Request Lifecycle](https://laravel.com/docs/13.x/lifecycle)
- [Laravel 13: Artisan Console](https://laravel.com/docs/13.x/artisan)
- [Laravel 13: Release Notes](https://laravel.com/docs/13.x/releases)
- [Composer: Basic Usage](https://getcomposer.org/doc/01-basic-usage.md)

Sebelumnya: [Materi Teori 01 — PHP Dasar](../01-php-dasar/README.md).

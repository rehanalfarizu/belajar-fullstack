# Software — Track Laravel

## Kebutuhan

- PHP 8.3 atau lebih baru (Laravel 13 mendukung PHP 8.3 sampai 8.5; Laravel 12 mendukung 8.2 sampai 8.5).
- Composer 2.
- Laravel installer.
- Node.js LTS dan npm untuk asset frontend.
- SQLite untuk awal belajar; PostgreSQL untuk latihan production-like.
- Git dan editor dengan dukungan PHP/Laravel.

## Verifikasi

```bash
php --version
composer --version
node --version
npm --version
git --version
```

Install Laravel installer:

```bash
composer global require laravel/installer
laravel --version
```

## Prinsip Environment

- Gunakan version manager bila mengerjakan beberapa project dengan versi PHP
  berbeda.
- Jangan commit `.env`.
- Commit `.env.example` tanpa secret.
- Jangan mengandalkan XAMPP sebagai satu-satunya cara memahami PHP; pahami juga
  `php`, `composer`, web server, database, dan process secara terpisah.

Panduan instalasi resmi selalu menjadi sumber utama:
[Laravel Installation](https://laravel.com/docs/13.x/installation).

---

## Pilihan Cara Install

Pilih **satu** jalur. Jangan campur-campur.

| Jalur | Cocok untuk | Catatan |
|---|---|---|
| **Laravel Herd** (macOS/Windows) | Paling cepat, tanpa konfigurasi | Sudah termasuk PHP, Composer, web server lokal |
| **PHP + Composer manual** | Ingin paham tiap komponen | `brew install php composer` (macOS), paket `php-cli` (Linux) |
| **Laravel installer** | Terbiasa dengan `laravel new` | `composer global require laravel/installer` |
| **Laragon / XAMPP** | Windows, sudah terbiasa | Pastikan versi PHP-nya 8.3+ |

Jalur paling sederhana dan dipakai di seluruh praktikum ini hanya butuh PHP dan
Composer:

```bash
cd ~
mkdir -p latihan-laravel && cd latihan-laravel
composer create-project laravel/laravel toko-latihan
cd toko-latihan
php artisan serve
```

Buka `http://127.0.0.1:8000`. Kalau halaman sambutan Laravel muncul, setup berhasil.

## Ekstensi PHP yang Dibutuhkan

Cek dengan `php -m`. Laravel membutuhkan antara lain `ctype`, `curl`, `dom`,
`fileinfo`, `filter`, `hash`, `mbstring`, `openssl`, `pcre`, `pdo`, `session`,
`tokenizer`, dan `xml`. Kalau ada yang kurang, `composer create-project` akan
memberi tahu nama ekstensinya.

## Database

| Database | Kapan dipakai | Cek |
|---|---|---|
| **SQLite** | Default Laravel. Cukup untuk seluruh praktikum | `php -m \| grep -i sqlite` |
| **MySQL / MariaDB** | Hosting murah dan banyak lowongan memakainya | `mysql --version` |
| **PostgreSQL** | Latihan yang mirip production modern | `psql --version` |

Mulai dengan SQLite. Pindah ke MySQL atau PostgreSQL cukup mengubah `DB_*` di
`.env` lalu `php artisan migrate`. Itu bukti bahwa migration membuat kodemu
tidak terikat satu database.

## Alat Bantu

- **Editor:** VS Code dengan ekstensi PHP Intelephense, atau PhpStorm.
- **Klien HTTP:** `curl` (dipakai di semua `TUGAS.md`), atau Postman/Bruno.
- **Pint:** `./vendor/bin/pint` merapikan gaya kode. Sudah terpasang di project baru.
- **Tinker:** `php artisan tinker` untuk mencoba kode PHP dan query secara interaktif.

## Masalah yang Sering Muncul

| Gejala | Penyebab umum | Cara cek |
|---|---|---|
| `php: command not found` | PHP belum ada di PATH | Buka terminal baru, `which php` |
| `Your PHP version does not satisfy...` | PHP terlalu lama | `php --version`, update PHP |
| `could not find driver` | Ekstensi `pdo_sqlite` / `pdo_mysql` belum aktif | `php -m` |
| `No application encryption key has been specified` | `APP_KEY` kosong | `php artisan key:generate` |
| Port 8000 terpakai | Ada server lain | `php artisan serve --port=8001` |

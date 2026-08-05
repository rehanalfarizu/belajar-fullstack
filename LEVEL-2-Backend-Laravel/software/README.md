# Software — Track Laravel

## Kebutuhan

- PHP 8.5 untuk mengikuti Laravel 13.
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

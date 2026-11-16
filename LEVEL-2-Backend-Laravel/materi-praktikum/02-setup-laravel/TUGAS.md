# TUGAS — 02 Setup Laravel

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Project `toko-latihan` yang jalan di `http://127.0.0.1:8000`.
2. Endpoint `GET /health` dan `GET /tentang-toko` yang aman (tidak bocor secret).
3. File `config/toko.php` dan variabel `TOKO_*` di `.env` / `.env.example`.
4. Command `php artisan toko:cek-env` dengan exit code yang benar.
5. Feature test hijau untuk semuanya.

---

## Daftar Soal dan File

| Soal | File awal (starter) | Disalin ke mana di `toko-latihan`? | Estimasi |
| --- | --- | --- | --- |
| [01 — Health Check](soal/01-health-check.md) | `code/01-health-check.php` | isi route → `routes/web.php`; test → `tests/Feature/HealthCheckTest.php` | 45 menit |
| [02 — Config dan .env](soal/02-config-dan-env.md) | `code/02-config-toko.php` | `config/toko.php` | 60 menit |
| | `code/02-route-tentang-toko.php` | isi route → bagian bawah `routes/web.php` | |
| | `code/02-tentang-toko-test.php` | `tests/Feature/TentangTokoTest.php` | |
| [03 — Artisan Command](soal/03-artisan-command-cek-env.md) | `code/03-cek-env-command.php` | `app/Console/Commands/CekEnvCommand.php` | 90 menit |
| | `code/03-cek-env-command-test.php` | `tests/Feature/CekEnvCommandTest.php` | |

---

## Cara Menjalankan

Starter di topik ini **bukan** file yang bisa dijalankan sendiri dengan `php file.php`.
Mereka potongan kode Laravel, jadi harus ditaruh di dalam project Laravel.

### 1. Siapkan project (sekali saja)

Ikuti bagian "Menyiapkan Proyek Latihan" di [README praktikum](../README.md). Ringkasnya:

```bash
php --version        # minimal 8.3
composer --version   # Composer 2
cd ~ && mkdir -p latihan-laravel && cd latihan-laravel
composer create-project laravel/laravel toko-latihan
cd toko-latihan
php artisan serve    # buka http://127.0.0.1:8000
```

Project dibuat **di luar repo ini** supaya folder `vendor/` dan `.env` milikmu tidak
ikut ke repo belajar. Database default-nya SQLite, jadi tidak perlu install MySQL dulu.

### 2. Cara menyalin starter

- File yang isinya **class lengkap** (`CekEnvCommand`, file test) → salin utuh ke path tujuan.
- File yang isinya **potongan route** → salin baris route-nya saja ke `routes/web.php`.
  Jangan ikut menyalin `<?php` dan `declare(...)` kedua kalinya, karena `routes/web.php`
  sudah punya.
- File config → salin utuh jadi `config/toko.php`.

Tip: buka dua jendela editor. Kiri soal, kanan `toko-latihan`. Ketik ulang, jangan
copy-paste isi TODO yang sudah kamu isi dari tempat lain.

---

## Bagian A: Setup dan Health Check (Soal 01)

### Langkah

1. Buat project seperti di atas.
2. Jalankan `php artisan about`. Catat versi Laravel, versi PHP, dan driver database.
3. Cek `.env` diabaikan Git: `git init && git check-ignore .env` harus mencetak `.env`.
4. Kerjakan [soal 01](soal/01-health-check.md).

### Verifikasi

- [ ] `php artisan about` menampilkan Laravel 13.x (atau 12.x) dan PHP 8.3+
- [ ] `curl -i http://127.0.0.1:8000/health` → `200` dan JSON `status: ok`
- [ ] `php artisan test` hijau

---

## Bagian B: Config dan `.env` (Soal 02)

### Langkah

1. Baca [soal 02](soal/02-config-dan-env.md) sampai habis.
2. Salin `code/02-config-toko.php` → `config/toko.php`, isi TODO.
3. Tambahkan `TOKO_NAMA`, `TOKO_KONTAK_EMAIL`, `TOKO_MAKS_ITEM_KERANJANG` ke `.env` (nilai milikmu) dan `.env.example` (placeholder).
4. Tambahkan route `/tentang-toko` dari `code/02-route-tentang-toko.php`.
5. Buat test dengan `php artisan make:test TentangTokoTest`, ganti isinya dengan starter, isi TODO.
6. Lakukan eksperimen `config:cache` yang ada di soal.

### Verifikasi

- [ ] `php artisan config:show toko` menampilkan 3 kunci
- [ ] `curl -i http://127.0.0.1:8000/tentang-toko` → `200`, `maks_item_keranjang` berupa angka
- [ ] Response tidak mengandung kata `base64:` (format umum `APP_KEY`)
- [ ] Sudah melihat sendiri `env()` jadi null setelah `config:cache`, lalu `config:clear`

---

## Bagian C: Artisan Command (Soal 03)

### Langkah

1. Baca [soal 03](soal/03-artisan-command-cek-env.md).
2. Jalankan `php artisan make:command CekEnvCommand` (membuat folder dan file), lalu ganti isinya dengan starter.
3. Isi `$signature` dulu. Cek dengan `php artisan list toko`.
4. Isi `handle()` sedikit demi sedikit: tabel dulu, exit code, lalu opsi `--ketat`.
5. Salin starter test, isi TODO, jalankan.

### Verifikasi

- [ ] `php artisan toko:cek-env; echo $?` → `0` saat semua terisi
- [ ] Mengosongkan `TOKO_KONTAK_EMAIL` → status `KOSONG` dan exit code `1`
- [ ] `php artisan toko:cek-env | grep -c "base64:"` → `0`
- [ ] `php artisan test --filter=CekEnvCommandTest` hijau

---

## Petunjuk Kalau Macet

Buka satu per satu. Coba dulu 10–15 menit sebelum membuka petunjuk berikutnya.

### Soal 02 — config

1. **Petunjuk 1 (arah berpikir):** File config itu PHP biasa yang `return` array. Pikirkan: nilai mana yang dibaca dari `.env`, nilai default-nya apa, dan tipe akhirnya apa.
2. **Petunjuk 2 (fitur yang dicari):** Baca bagian "Environment Configuration" dan "Accessing Configuration Values" di dokumentasi Configuration. Lihat juga contoh file `config/app.php` milik Laravel sendiri, itu contoh terbaik.
3. **Petunjuk 3 (langkah tanpa kode):** Untuk tiap kunci: panggil helper pembaca env dengan nama variabel dan default (kalau ada) → kalau perlu angka, ubah tipenya di tempat yang sama → di route, baca dengan helper config memakai nama file + titik + nama kunci.

### Soal 03 — command

1. **Petunjuk 1 (arah berpikir):** Pisahkan tiga tugas: (a) tentukan status tiap kunci, (b) tampilkan, (c) putuskan exit code. Hitung jumlah masalah sambil jalan.
2. **Petunjuk 2 (fitur yang dicari):** Dokumentasi Artisan: "Defining Input Expectations" (opsi), "Writing Output" (tabel, error). Dokumentasi Helpers: `blank`. Dokumentasi Console Tests: `assertExitCode`, `expectsOutputToContain`, `doesntExpectOutputToContain`.
3. **Petunjuk 3 (langkah tanpa kode):** Siapkan array baris kosong dan penghitung 0 → loop peta WAJIB → baca nilai config → kosong? tambah penghitung → simpan baris (nama, kunci, status) → kalau opsi ketat aktif dan production dan debug true, tambah baris bahaya + penghitung → tampilkan tabel → penghitung > 0? pesan error + gagal : pesan sukses + sukses.

### Error umum

- **`Command "toko:cek-env" is not defined.`** → cek namespace `App\Console\Commands` dan nama file sama dengan nama class.
- **Perubahan `.env` tidak terbaca** → `php artisan config:clear`.
- **`Target class [...] does not exist`** → nama class/namespace salah ketik, atau perlu `composer dump-autoload`.
- **Error 500 tanpa penjelasan** → buka `storage/logs/laravel.log`, baca dari bawah.

---

## Cara Mengecek Hasil Sendiri

Jalankan dari folder `~/latihan-laravel/toko-latihan`:

```bash
# 1. Sintaks
php -l config/toko.php
php -l routes/web.php
php -l app/Console/Commands/CekEnvCommand.php

# 2. Route dan config terdaftar
php artisan route:list --path=health
php artisan route:list --path=tentang-toko
php artisan config:show toko
php artisan list toko

# 3. Jalankan server (terminal 1)
php artisan serve

# 4. Uji endpoint (terminal 2)
curl -i http://127.0.0.1:8000/health          # 200
curl -i http://127.0.0.1:8000/tentang-toko    # 200, tanpa secret
curl -i http://127.0.0.1:8000/tidak-ada       # 404

# 5. Command
php artisan toko:cek-env; echo "exit: $?"
APP_ENV=production APP_DEBUG=true php artisan toko:cek-env --ketat; echo "exit: $?"   # harus 1

# 6. Semua test
php artisan test
```

Catatan untuk langkah 5 baris kedua: variabel yang ditulis sebelum perintah hanya
berlaku untuk perintah itu. Kalau config sedang di-cache, hasilnya bisa beda. Jalankan
`php artisan config:clear` dulu.

---

## File yang Perlu Diisi

```text
~/latihan-laravel/toko-latihan/
├── .env                                     ← tambah TOKO_* (nilai milikmu)
├── .env.example                             ← tambah TOKO_* (placeholder)
├── config/toko.php                          ← dari code/02-config-toko.php
├── routes/web.php                           ← tambah /health dan /tentang-toko
├── app/Console/Commands/CekEnvCommand.php   ← dari code/03-cek-env-command.php
└── tests/Feature/
    ├── HealthCheckTest.php
    ├── TentangTokoTest.php                  ← dari code/02-tentang-toko-test.php
    └── CekEnvCommandTest.php                ← dari code/03-cek-env-command-test.php
```

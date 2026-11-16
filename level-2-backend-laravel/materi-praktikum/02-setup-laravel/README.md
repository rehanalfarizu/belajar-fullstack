# 02 — Setup Laravel

## Apa Ini?

Di topik ini kamu membuat project Laravel pertama (`toko-latihan`) dan belajar
"isi perutnya": folder apa saja yang penting, bagaimana request masuk sampai ke route,
dan bagaimana aplikasi membaca konfigurasi dari `.env`.

Project `toko-latihan` ini akan kamu pakai terus sampai topik 10. Jadi setup-nya
dikerjakan dengan teliti sekali saja.

## Analogi

Setup Laravel itu seperti pindah ke kos baru. Sebelum menata barang (fitur), kamu perlu
tahu letak saklar listrik (config), kunci kamar (`APP_KEY`), dan buku catatan pribadi
yang tidak boleh dilihat teman kos (`.env`). Kalau dari awal sudah tahu letaknya,
kamu tidak panik saat lampu mati.

## Kenapa Penting Buat Kerja?

- Hari pertama kerja hampir selalu dimulai dengan "clone repo, setup `.env`, jalankan project".
- Banyak insiden production berasal dari konfigurasi: `APP_DEBUG=true`, `.env` ter-commit, variabel lupa diisi.
- Command kecil seperti `toko:cek-env` adalah contoh nyata "otomatisasi supaya manusia tidak lupa".

## Daftar Soal

| # | Soal | Fokus | Difficulty |
| --- | --- | --- | --- |
| 01 | [Setup Laravel dan Health Check](soal/01-health-check.md) | create project, route JSON, test pertama | Pemula |
| 02 | [Config Toko dan File `.env`](soal/02-config-dan-env.md) | `config/`, `env()` vs `config()`, `config:cache` | Menengah |
| 03 | [Artisan Command `toko:cek-env`](soal/03-artisan-command-cek-env.md) | command, opsi, exit code, tidak bocor secret | Lanjut |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Ukur pemahamanmu di [CHECKLIST.md](CHECKLIST.md).

## Baca Dulu

- [Materi teori 02 — Setup Laravel](../../materi-teori/02-setup-laravel/README.md)
- [Cara pakai praktikum dan menyiapkan proyek latihan](../README.md)
- [Modul Keamanan 07 — Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md)

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| Composer | Package manager PHP. Mengunduh Laravel dan library lain ke folder `vendor/`. |
| Artisan | Program CLI bawaan Laravel (`php artisan ...`). |
| `.env` | File berisi nilai rahasia/khusus mesin. Tidak di-commit. |
| `.env.example` | Contoh `.env` dengan placeholder. Di-commit. |
| Config | File PHP di `config/` yang membaca `.env` dan memberi nilai default. |
| `APP_KEY` | Kunci enkripsi aplikasi (cookie, session terenkripsi). Rahasia. |
| Config cache | Semua config digabung jadi satu file cepat; `.env` tidak dibaca lagi. |
| Route | Aturan "URL ini + method ini → jalankan kode ini". |
| Feature test | Test yang mengirim request palsu ke aplikasi dan memeriksa response. |
| Exit code | Angka hasil program di terminal. `0` = sukses. |

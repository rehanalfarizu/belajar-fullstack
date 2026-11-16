# 01 — PHP Dasar

## Apa Ini?

Sebelum masuk Laravel, kamu perlu nyaman dengan PHP-nya dulu. Laravel itu "cuma" kode
PHP yang ditulis rapi. Kalau kamu bingung dengan array, function, exception, atau class,
nanti kamu akan bingung juga saat membaca controller dan model.

Semua soal di topik ini **PHP murni**. Tidak perlu Laravel, tidak perlu database. Cukup
terminal dan perintah `php`.

## Analogi

Belajar PHP dasar sebelum Laravel itu seperti belajar pegang pisau sebelum kerja di
dapur restoran. Dapur restoran (Laravel) sudah punya alat lengkap. Tapi kalau kamu
belum bisa memotong bawang dengan benar, alat secanggih apa pun tidak membantu.

## Kenapa Penting Buat Kerja?

- Saat interview backend PHP, soal live coding biasanya PHP murni: olah array, hitung, validasi.
- Bug di aplikasi Laravel sering ternyata bug PHP biasa: tipe data salah, `null` tidak dicek, array tidak diurutkan dengan benar.
- Kode yang dipecah jadi fungsi kecil dan class yang menjaga datanya sendiri jauh lebih gampang dirawat tim.

## Daftar Soal

| # | Soal | Fokus | Difficulty |
| --- | --- | --- | --- |
| 01 | [Rekap Nilai](soal/01-katalog-nilai.md) | array, function, sorting, exception | Pemula |
| 02 | [Keranjang Belanja](soal/02-keranjang-belanja.md) | fungsi murni, `array_map`, `array_reduce`, `match`, uang integer | Menengah |
| 03 | [Class Produk, Enum, dan Katalog](soal/03-class-produk.md) | OOP, constructor promotion, `readonly`, `enum`, `interface` | Lanjut |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Ukur pemahamanmu di [CHECKLIST.md](CHECKLIST.md).

## Baca Dulu

- [Materi teori 01 — PHP Dasar](../../materi-teori/01-php-dasar/README.md)
- [Cara pakai praktikum dan proyek latihan](../README.md)

## Glosarium

| Istilah | Arti singkat |
| --- | --- |
| `strict_types` | Mode yang membuat PHP menolak tipe yang tidak cocok, bukan mengubahnya diam-diam. |
| Associative array | Array dengan kunci teks, misal `['nama' => 'Mouse']`. |
| List | Array dengan kunci angka berurutan mulai 0. |
| Fungsi murni | Fungsi yang outputnya hanya tergantung input dan tidak mengubah apa pun di luar. |
| Exception | Sinyal "ada yang salah, berhenti di sini" yang bisa ditangkap dengan `try/catch`. |
| Class | Cetakan untuk membuat object. |
| Object | Satu "benda" hasil cetakan class, punya data (properti) dan perilaku (method). |
| `readonly` | Properti yang hanya bisa diisi sekali, saat object dibuat. |
| Enum | Tipe dengan pilihan nilai yang sudah pasti. |
| Interface | Kontrak: daftar method yang wajib dimiliki class yang memakainya. |

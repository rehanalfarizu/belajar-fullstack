# Contoh Solusi — 02 Setup Laravel

Ini solusi referensi. Jangan dibuka sebelum punya jawaban sendiri yang jalan.

Solusi di sini bukan satu-satunya jawaban benar. Kalau test-mu hijau dan kamu bisa
menjelaskan setiap baris, jawabanmu sah walau penulisannya beda.

## Daftar File

| File | Tujuan di `toko-latihan` | Untuk soal |
| --- | --- | --- |
| `01-health-check.php` | `routes/web.php` + test di komentar | [Soal 01 — Health Check](../soal/01-health-check.md) |
| `02-config-toko.php` | `config/toko.php` | [Soal 02 — Config dan .env](../soal/02-config-dan-env.md) |
| `02-route-tentang-toko.php` | tambahan `routes/web.php` | Soal 02 |
| `02-tentang-toko-test.php` | `tests/Feature/TentangTokoTest.php` | Soal 02 |
| `02-env.example` | baris tambahan untuk `.env.example` | Soal 02 |
| `03-cek-env-command.php` | `app/Console/Commands/CekEnvCommand.php` | [Soal 03 — Artisan Command](../soal/03-artisan-command-cek-env.md) |
| `03-cek-env-command-test.php` | `tests/Feature/CekEnvCommandTest.php` | Soal 03 |

`02-env.example` sengaja tidak diberi nama `.env.example` supaya tidak tertukar dengan
file milik repo ini. Isinya hanya placeholder, bukan secret asli.

## Cara Membandingkan

1. Jalankan test milikmu dan pastikan hijau.
2. Baca solusi, cari satu perbedaan, tulis alasan kenapa penulis memilih cara itu.
3. Tutup file ini, perbaiki kodemu dari ingatan. Jangan copy-paste.

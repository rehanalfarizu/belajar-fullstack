# TUGAS — 10 Deploy dan Hosting

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Script PHP pemeriksa konfigurasi dan script pemeriksa rahasia di repo
2. `.env.example` bersih dan `.gitignore` yang benar di `toko-latihan`
3. Halaman error 500 buatan sendiri dan bukti bahwa debug mati tidak membocorkan apa pun
4. `deploy.sh` yang lolos `DRY_RUN` dan menolak konfigurasi berbahaya

---

## Daftar Soal dan File

| Soal | Starter | Dikerjakan di | Estimasi |
|---|---|---|---|
| [01 — Production Readiness](soal/01-production-readiness.md) | `code/01-production-check.php` | langsung di folder `code/` (PHP biasa) | 60 menit |
| [02 — `.env` dan Rahasia](soal/02-env-dan-rahasia.md) | `code/02-cek-rahasia-repo.php` | langsung di folder `code/`; target periksa: `toko-latihan` | 90 menit |
| [03 — `APP_DEBUG` dan Script Deploy](soal/03-app-debug-dan-deploy-script.md) | `code/03-deploy.sh` | salin ke `toko-latihan/deploy.sh` | 120 menit |

---

## Cara Menjalankan (Jujur Dulu)

Topik ini berbeda dari 03–09:

- Soal 01 dan 02 adalah **PHP biasa**. Jalankan dengan `php file.php`, tanpa Laravel.
- Soal 03 adalah **script bash** plus eksperimen kecil di project Laravel. Kamu
  butuh `toko-latihan`. Cara membuatnya ada di
  [README praktikum](../README.md) bagian "Menyiapkan Proyek Latihan toko-latihan".
- Kamu **tidak** perlu server sungguhan. Semua deploy dilatih dengan `DRY_RUN=1`.

```bash
php -l level-2-backend-laravel/materi-praktikum/10-deploy-hosting/code/02-cek-rahasia-repo.php
bash -n level-2-backend-laravel/materi-praktikum/10-deploy-hosting/code/03-deploy.sh
```

---

## Bagian A: Production Readiness (Soal 01)

### Langkah

1. Baca soal, lalu buka `code/01-production-check.php`
2. Lengkapi dua `TODO` di fungsi `periksaProduction()`
3. Jalankan dengan berbagai kombinasi environment variable
4. Tulis rencana deployment (9 poin di soal) di `toko-latihan/CATATAN-10.md`

### Verifikasi

- [ ] `APP_DEBUG=true` → exit `1`
- [ ] `APP_KEY` kosong → exit `1`
- [ ] Semua benar → exit `0`
- [ ] Output tidak mencetak nilai `APP_KEY`

---

## Bagian B: `.env` dan Rahasia (Soal 02)

### Langkah

1. Buka `code/02-cek-rahasia-repo.php`
2. Kerjakan pemeriksaan satu per satu: pemakaian → `.env` terlacak → `.gitignore` → `.env.example`
3. Buat repo "rusak" palsu di folder sementara untuk menguji (perintahnya ada di soal)
4. Rapikan `.env.example` di `toko-latihan` sampai lulus

### Verifikasi

- [ ] Tanpa argumen → exit `2`
- [ ] Repo rusak → exit `1`, 3 masalah, tanpa nilai rahasia di output
- [ ] `toko-latihan` → exit `0`

---

## Bagian C: `APP_DEBUG` dan Script Deploy (Soal 03)

### Langkah

1. **Eksperimen dulu.** Tambah route `/coba-error` yang melempar exception. Lihat halamannya dengan `APP_DEBUG=true`, catat isinya
2. Ubah ke `false`, jalankan `php artisan config:clear`, lihat lagi
3. Buat `resources/views/errors/500.blade.php`
4. Salin `code/03-deploy.sh` ke `toko-latihan/deploy.sh`, `chmod +x`
5. Isi setiap `TODO(human)` dari atas ke bawah. Jalankan `bash -n` tiap selesai satu bagian
6. Uji dengan `DRY_RUN=1`, termasuk skenario `APP_DEBUG=true`
7. Hapus route `/coba-error`

### Verifikasi

- [ ] Halaman 500 tidak menampilkan pesan exception
- [ ] `laravel.log` berisi detail error
- [ ] `DRY_RUN=1 ./deploy.sh` mencetak seluruh langkah berurutan
- [ ] `APP_DEBUG=true` membuat script berhenti sebelum langkah artisan apa pun

---

## Petunjuk Kalau Macet

### Petunjuk 1 — arah berpikir

- Script pemeriksa itu seperti satpam: tugasnya **menolak**, bukan memperbaiki.
- Untuk setiap syarat, tanya: "Apa satu hal yang membuktikan syarat ini dilanggar?"
- Untuk `deploy.sh`: bayangkan kamu mengetik 8 perintah manual. Mana yang tidak boleh jalan kalau perintah sebelumnya gagal?

### Petunjuk 2 — fitur dan dokumentasi

- PHP: `exec()`, `escapeshellarg()`, `file()`, `str_starts_with()`, `preg_match()`, `exit()`, `fwrite(STDERR, ...)`
- Git: `git ls-files`, `git rm --cached`
- Bash: `set -euo pipefail`, `trap ... EXIT`, `[[ -f file ]]`, `grep -Eq`, `${VAR:-default}`
- Artisan: `down --retry`, `migrate --force`, `optimize`, `queue:restart`, `up`
- Dokumentasi: [Laravel Deployment](https://laravel.com/docs/13.x/deployment)

### Petunjuk 3 — pseudo-langkah

- Soal 02: ambil daftar file terlacak → buang `.env.example` → sisanya yang namanya cocok pola `.env` adalah masalah → kumpulkan semua masalah di array → di akhir, kalau array tidak kosong, cetak dan exit `1`.
- Soal 02 masking: simpan hanya **nama variabel** dan `strlen(nilai)`, jangan simpan nilainya ke pesan.
- Soal 03 penjaga: baca `.env` baris per baris, cari baris `APP_DEBUG`, normalkan nilainya (huruf kecil, tanpa kutip), bandingkan.
- Soal 03 `trap`: buat satu penanda "sedang maintenance"; fungsi trap hanya bertindak kalau penanda menyala dan status keluar bukan 0.

---

## Cara Mengecek Hasil Sendiri

```bash
# Sintaks
php -l code/01-production-check.php
php -l code/02-cek-rahasia-repo.php
bash -n ~/latihan-laravel/toko-latihan/deploy.sh

# Soal 01
APP_ENV=production APP_DEBUG=false APP_KEY=palsu php code/01-production-check.php; echo "exit=$?"   # 0
APP_ENV=production APP_DEBUG=true  APP_KEY=palsu php code/01-production-check.php; echo "exit=$?"   # 1

# Soal 02 (lihat soal untuk membuat /tmp/toko-rusak)
php code/02-cek-rahasia-repo.php; echo "exit=$?"                       # 2
php code/02-cek-rahasia-repo.php ~/latihan-laravel/toko-latihan; echo "exit=$?"   # 0

# Soal 03
cd ~/latihan-laravel/toko-latihan
DRY_RUN=1 ./deploy.sh; echo "exit=$?"                                  # 0
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/coba-error   # 500 (saat php artisan serve jalan)
tail -n 5 storage/logs/laravel.log
```

Jalankan perintah dari folder `10-deploy-hosting/` untuk path `code/...` di atas.

# SOAL 03 — `APP_DEBUG` dan Script Deploy

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuktikan sendiri apa yang bocor kalau `APP_DEBUG=true` di production
- Membuat halaman error 500 sendiri yang tidak membocorkan apa pun
- Menulis script deploy `bash` yang berhenti saat error dan tidak meninggalkan situs di mode maintenance
- Menambahkan penjaga supaya deploy ditolak kalau konfigurasi berbahaya
- Menjalankan script dalam mode `DRY_RUN` sebelum menyentuh server sungguhan

**Topik:** `APP_DEBUG`, `errors/500.blade.php`, `storage/logs`, `set -euo pipefail`, `trap`, `php artisan down/up`, `optimize`

**Referensi utama:**

- [Laravel: Error Handling](https://laravel.com/docs/13.x/errors)
- [Laravel: Deployment](https://laravel.com/docs/13.x/deployment)
- [Laravel: Maintenance Mode](https://laravel.com/docs/13.x/configuration#maintenance-mode)
- [GNU Bash: The Set Builtin](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

**Difficulty:** Lanjut • **Estimasi:** 120 menit

---

## Briefing

Toko kamu akan naik ke server. Dua hal sering bikin malu di hari pertama.
Pertama, ada error kecil, lalu pengunjung melihat halaman penuh kode, path
server, dan nilai konfigurasi. Kedua, deploy dilakukan manual lewat 8 perintah
yang urutannya sering salah atau terlewat satu.

Tugasmu: lihat sendiri bahayanya, lalu otomatiskan deploy dengan script yang
menolak jalan kalau konfigurasinya berbahaya.

---

## Deskripsi

Bagian A: eksperimen `APP_DEBUG` dengan route sementara, dan buat halaman error
500 sendiri. Bagian B: lengkapi `code/03-deploy.sh` sampai bisa dijalankan
dengan `DRY_RUN=1` dari awal sampai akhir.

---

## Syarat (Acceptance Criteria)

### Bagian A — Eksperimen `APP_DEBUG`

- [ ] Ada route sementara `/coba-error` yang melempar exception (hapus setelah eksperimen)
- [ ] Dengan `APP_DEBUG=true`, kamu mencatat di `toko-latihan/CATATAN-10.md` minimal 3 jenis informasi yang terlihat di halaman error
- [ ] Dengan `APP_DEBUG=false` (setelah `php artisan config:clear`), halaman hanya menampilkan pesan umum
- [ ] Ada `resources/views/errors/500.blade.php` buatanmu sendiri
- [ ] Halaman 500 tidak menampilkan pesan exception, path file, atau nama class
- [ ] Detail error tetap tercatat di `storage/logs/laravel.log`
- [ ] Route `/coba-error` sudah dihapus di akhir

### Bagian B — `deploy.sh`

- [ ] Memakai strict mode bash (berhenti saat error, tolak variabel kosong, pipa gagal dianggap gagal)
- [ ] Menolak jalan (exit `1`) kalau `.env` tidak ada
- [ ] Menolak jalan kalau `APP_DEBUG` bernilai true
- [ ] Menolak jalan kalau `APP_KEY` kosong, tanpa mencetak nilainya
- [ ] Urutan langkah: maintenance on → ambil kode → dependency → migrate → cache → restart queue → maintenance off
- [ ] `composer install` tanpa paket dev dan dengan autoloader teroptimasi
- [ ] `migrate` memakai flag yang diperlukan non-interaktif di production
- [ ] Kalau salah satu langkah gagal setelah maintenance on, aplikasi otomatis dinaikkan lagi
- [ ] `DRY_RUN=1` hanya mencetak perintah, tidak menjalankan apa pun
- [ ] `bash -n deploy.sh` tidak menghasilkan error

---

## Expected Output

Mode `DRY_RUN` pada `.env` yang sehat:

```text
$ DRY_RUN=1 ./deploy.sh
Penjaga lulus. Mulai deploy di /Users/kamu/latihan-laravel/toko-latihan (DRY_RUN=1)
+ php artisan down --retry=60
+ git pull --ff-only
+ composer install --no-dev --optimize-autoloader --no-interaction
...
+ php artisan up
Deploy selesai.
```

Pada `.env` dengan `APP_DEBUG=true`:

```text
$ DRY_RUN=1 ./deploy.sh
DEPLOY DIBATALKAN: APP_DEBUG masih true. Ubah jadi false sebelum deploy.
$ echo $?
1
```

Halaman error dengan debug mati:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/coba-error
# 500
```

---

## Panduan Teknis

### Kenapa `APP_DEBUG=true` berbahaya?

**Analogi:** debug mode itu seperti **montir yang membuka kap mobil di tengah
jalan** dan membiarkan semua orang melihat mesinnya. Untuk montir (kamu) itu
berguna. Untuk orang lewat (pengunjung dan penyerang) itu informasi gratis.

Halaman error debug bisa menampilkan potongan kode sumber, path folder server,
query SQL beserta nilainya, dan sebagian konfigurasi. Itu cukup untuk membantu
penyerang memetakan aplikasimu.

### Halaman error sendiri

Laravel mencari view `resources/views/errors/{status}.blade.php` saat
`APP_DEBUG=false`. Kalau ada `errors/404.blade.php`, itu dipakai untuk 404.
Aturan yang sama berlaku untuk `500`, `503`, dan seterusnya. Contoh lain (bukan
jawaban): halaman 404 yang ramah.

```blade
{{-- resources/views/errors/404.blade.php --}}
<h1>Halaman tidak ditemukan</h1>
<p>Coba kembali ke <a href="{{ url('/') }}">beranda</a>.</p>
```

### Strict mode bash

Tanpa strict mode, bash **terus jalan** setelah perintah gagal. Deploy yang
gagal di tengah tapi tetap lanjut `migrate` adalah resep bencana. Cari tahu arti
masing-masing opsi di dokumentasi Bash yang ditautkan di atas.

### `trap` untuk bersih-bersih

`trap` mendaftarkan fungsi yang dijalankan saat script berhenti, apa pun
sebabnya. Contoh lain (bukan jawaban): menghapus file sementara.

```bash
bersihkan() { rm -f "$FILE_SEMENTARA"; }
trap bersihkan EXIT
```

### Mode `DRY_RUN`

Bungkus semua perintah di satu fungsi. Fungsi itu mencetak perintah, dan hanya
menjalankannya kalau `DRY_RUN` bukan `1`. Dengan begitu kamu bisa menguji alur
script tanpa risiko.

### Satu perintah `optimize`

Laravel punya satu perintah yang menyimpan cache config, route, view, dan event
sekaligus. Ingat jebakannya: setelah cache config aktif, `.env` tidak dibaca
lagi. Baca bagian "Config Cache dan Jebakan `env()`" di
[teori 10](../../../materi-teori/10-deploy-hosting/README.md).

---

## Verifikasi Hasil (Wajib Dicek)

```bash
cd ~/latihan-laravel/toko-latihan

# Sintaks
bash -n deploy.sh

# .env sehat → alur lengkap tercetak
DRY_RUN=1 ./deploy.sh; echo "exit=$?"

# APP_DEBUG=true → harus ditolak (pakai salinan .env, jangan merusak aslinya)
cp .env .env.cadangan
sed -i.bak 's/^APP_DEBUG=.*/APP_DEBUG=true/' .env
DRY_RUN=1 ./deploy.sh; echo "exit=$?"
mv .env.cadangan .env && rm -f .env.bak

# Cek log tetap menyimpan detail error
tail -n 5 storage/logs/laravel.log
```

- [ ] Kasus `.env` sehat menghasilkan `exit=0` dan semua langkah tercetak berurutan
- [ ] Kasus `APP_DEBUG=true` menghasilkan `exit=1` sebelum ada perintah `artisan` tercetak
- [ ] `.env` aslimu kembali seperti semula (cek `grep APP_DEBUG .env`)
- [ ] `laravel.log` berisi detail exception dari `/coba-error`

---

## Cara Submit

1. Salin `code/03-deploy.sh` ke root `toko-latihan` sebagai `deploy.sh`, lalu lengkapi
2. Buat `resources/views/errors/500.blade.php`
3. Jalankan semua perintah "Verifikasi Hasil"
4. Catat hasil eksperimen dan jawaban Refleksi di `toko-latihan/CATATAN-10.md`
5. Pastikan route `/coba-error` sudah dihapus

---

## Catatan Penting

- ⚠️ **Jangan jalankan `deploy.sh` tanpa `DRY_RUN=1` di laptopmu** kecuali kamu paham `git pull` dan `migrate --force` akan benar-benar berjalan.
- ⚠️ **Jangan pernah `migrate:fresh` di production.** Perintah itu menghapus semua tabel.
- 💡 Nilai `--secret` untuk maintenance mode itu rahasia juga. Jangan dicetak ke log CI.
- 📚 Baca [Modul Keamanan 07 — Konfigurasi Aman](../../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Refleksi

1. Kenapa halaman 500 buatanmu aman, padahal detail error tetap ada di `laravel.log`? Siapa yang boleh membaca log itu?
2. Apa yang terjadi kalau `deploy.sh` tidak memakai `trap` dan `composer install` gagal setelah maintenance mode menyala?
3. Kenapa penjaga `APP_DEBUG` ada di script, padahal kamu sudah ingat mengubahnya?
4. Langkah mana di script ini yang tidak bisa di-rollback hanya dengan `git checkout`? Apa rencanamu?

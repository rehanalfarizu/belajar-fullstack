# SOAL 02 — `.env` dan Rahasia yang Tidak Boleh Ikut ke Repo

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Menjelaskan beda `.env` dan `.env.example`, dan isi yang pantas untuk masing-masing
- Menulis script PHP CLI yang memeriksa apakah rahasia ikut ter-commit
- Menjalankan perintah shell dari PHP dengan aman (`escapeshellarg`)
- Menyamarkan nilai rahasia di output dan log
- Menyusun langkah darurat yang benar saat `.env` terlanjur bocor

**Topik:** `.env`, `.env.example`, `.gitignore`, `git ls-files`, `exec`, `escapeshellarg`, exit code

**Referensi utama:**

- [Laravel: Configuration — Environment Configuration](https://laravel.com/docs/13.x/configuration#environment-configuration)
- [PHP: `escapeshellarg`](https://www.php.net/manual/en/function.escapeshellarg.php)
- [PHP: `exec`](https://www.php.net/manual/en/function.exec.php)
- [Git: `git ls-files`](https://git-scm.com/docs/git-ls-files)

**Difficulty:** Menengah • **Estimasi:** 90 menit

---

## Briefing

Teman satu tim baru saja push project toko ke GitHub publik. Dua hari kemudian
tagihan email marketing membengkak: ada orang memakai SMTP password toko untuk
kirim spam. Ternyata file `.env` ikut ter-commit.

Supaya tidak terulang, kamu diminta membuat **script pemeriksa** yang bisa
dijalankan sebelum push (atau di CI). Script ini harus berteriak kalau ada
tanda-tanda rahasia ikut masuk repo, **tanpa** ikut mencetak rahasianya.

---

## Deskripsi

Lengkapi `code/02-cek-rahasia-repo.php` (script PHP biasa, bukan file Laravel).
Script menerima path project, lalu memeriksa 3 hal: file `.env` yang dilacak Git,
isi `.gitignore`, dan isi `.env.example`. Hasilnya exit code `0` (aman) atau `1`
(ada masalah).

Setelah itu, rapikan `.env.example` milik `toko-latihan` sampai lolos pemeriksaan.

---

## Syarat (Acceptance Criteria)

### Pemakaian

- [ ] `php 02-cek-rahasia-repo.php` tanpa argumen → pesan pemakaian ke STDERR, exit code `2`
- [ ] Argumen berupa folder yang bukan repo Git → dilaporkan sebagai masalah, exit code `1`

### Pemeriksaan 1 — File `.env` yang dilacak Git

- [ ] Memakai `git ls-files` pada folder target
- [ ] Path dari argumen di-escape dengan `escapeshellarg()` sebelum masuk perintah shell
- [ ] `.env`, `.env.production`, `config/.env.backup` → dilaporkan
- [ ] `.env.example` → **tidak** dilaporkan

### Pemeriksaan 2 — `.gitignore`

- [ ] Gagal kalau `.gitignore` tidak ada
- [ ] Gagal kalau tidak ada baris `.env`, `/.env`, `.env*`, atau `/.env*`

### Pemeriksaan 3 — `.env.example`

- [ ] Gagal kalau `.env.example` tidak ada
- [ ] Gagal kalau `APP_KEY` berisi nilai
- [ ] Gagal kalau ada nilai berawalan `base64:` dengan panjang lebih dari 20
- [ ] Gagal kalau ada nilai mengandung `sk_live_`
- [ ] Gagal kalau variabel berakhiran `PASSWORD`, `SECRET`, `TOKEN`, atau `_KEY` berisi nilai yang bukan placeholder
- [ ] Nilai `null`, kosong, `${APP_NAME}`, dan `<isi-di-server>` dianggap placeholder (aman)

### Kerahasiaan Output

- [ ] Output **tidak pernah** berisi nilai rahasia. Hanya nama variabel dan panjang nilai, misal `[disamarkan, 44 karakter]`

### `toko-latihan`

- [ ] `.env.example` di `toko-latihan` lolos pemeriksaan
- [ ] `.env.example` berisi variabel buatan sendiri `TOKO_NAMA` dan `TOKO_PAYMENT_SECRET` (kosong)

---

## Expected Output

Repo bermasalah:

```text
$ php 02-cek-rahasia-repo.php ~/latihan-laravel/toko-rusak
GAGAL — ditemukan 3 masalah:
 - File .env ikut dilacak Git. Ganti semua rahasianya, lalu git rm --cached.
 - .gitignore tidak mengabaikan .env
 - .env.example → STRIPE_SECRET: mirip API key live [disamarkan, 17 karakter]
$ echo $?
1
```

Repo aman:

```text
$ php 02-cek-rahasia-repo.php ~/latihan-laravel/toko-latihan
LULUS — tidak ada rahasia yang terlihat ikut ke repo.
$ echo $?
0
```

---

## Panduan Teknis

### `.env` vs `.env.example`

**Analogi:** `.env.example` itu **formulir kosong** pendaftaran rekening bank.
Semua orang boleh lihat kolom apa saja yang harus diisi. `.env` itu formulir
yang **sudah diisi** nomor rekening dan PIN. Yang kedua tidak pernah difotokopi.

### Menjalankan perintah shell dengan aman

Path dari user itu input. Input yang masuk ke perintah shell bisa jadi
**command injection** kalau tidak di-escape. Contoh lain (bukan jawaban): script
yang menghitung baris sebuah file.

```php
$file = $argv[1];
// SALAH: kalau $file = "a.txt; rm -rf ~", perintah kedua ikut jalan.
// exec("wc -l $file", $out);

// BENAR: argumen dibungkus jadi satu string aman.
exec('wc -l ' . escapeshellarg($file), $out, $kode);
```

`exec()` mengisi array baris output dan exit code. Exit code `0` berarti sukses.

### Exit code itu bahasa antar-program

CI (GitHub Actions, GitLab CI) dan git hook hanya melihat exit code. `0` = lanjut,
selain `0` = berhenti. Karena itu script pemeriksa **harus** keluar dengan kode
yang benar, bukan sekadar mencetak "GAGAL".

### Kalau `.env` sudah terlanjur ter-commit

Urutan yang benar:

1. **Ganti (rotate) semua rahasia** di file itu: password DB, password SMTP,
   API key, `APP_KEY`. Anggap semuanya sudah dibaca orang.
2. `git rm --cached .env` (menghapus dari Git, file lokal tetap ada).
3. Pastikan `.env` ada di `.gitignore`, lalu commit.
4. Riwayat Git masih menyimpan versi lama. Menghapusnya dari riwayat butuh alat
   khusus (misal `git filter-repo`) dan semua anggota tim harus clone ulang.
   Ini tidak bisa menggantikan langkah 1.

---

## Verifikasi Hasil (Wajib Dicek)

```bash
cd LEVEL-2-Backend-Laravel/materi-praktikum/10-deploy-hosting/code
php -l 02-cek-rahasia-repo.php

# 1. Tanpa argumen → exit 2
php 02-cek-rahasia-repo.php; echo "exit=$?"

# 2. Bikin repo "rusak" untuk latihan (data palsu, di folder sementara)
mkdir -p /tmp/toko-rusak && cd /tmp/toko-rusak && git init -q
printf 'DB_PASSWORD=rahasia-palsu\n' > .env
printf 'APP_KEY=\nSTRIPE_SECRET=sk_live_palsu12345\n' > .env.example
git add .env .env.example
cd -
php 02-cek-rahasia-repo.php /tmp/toko-rusak; echo "exit=$?"
# harus exit=1 dan TIDAK mencetak "rahasia-palsu" atau "sk_live_palsu12345"

# 3. Project latihanmu
php 02-cek-rahasia-repo.php ~/latihan-laravel/toko-latihan; echo "exit=$?"
```

- [ ] Kasus 1 menghasilkan `exit=2`
- [ ] Kasus 2 menghasilkan `exit=1` dengan 3 masalah
- [ ] Output kasus 2 tidak mengandung teks `rahasia-palsu` maupun `sk_live_palsu12345` (cek: tambahkan `2>&1 | grep -c palsu`, hasilnya harus `0`)
- [ ] Kasus 3 menghasilkan `exit=0`

---

## Cara Submit

1. Lengkapi `code/02-cek-rahasia-repo.php` langsung di folder `code/` (tidak perlu disalin ke Laravel)
2. Rapikan `.env.example` di `toko-latihan`
3. Jalankan semua perintah "Verifikasi Hasil"
4. Tulis jawaban Refleksi di `toko-latihan/CATATAN-10.md`
5. Hapus folder latihan `/tmp/toko-rusak` setelah selesai

---

## Catatan Penting

- ⚠️ **Jangan pakai rahasia asli** untuk latihan. Semua contoh nilai harus palsu.
- ⚠️ **Jangan tulis nilai rahasia ke output**, walau "cuma untuk debug".
  Output CI sering bisa dibaca banyak orang.
- 💡 Script seperti ini bisa dipasang sebagai git hook `pre-commit` supaya jalan
  otomatis. Coba setelah semua syarat lulus.
- 📚 Baca [Modul Keamanan 07 — Konfigurasi Aman](../../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Refleksi

1. Kenapa langkah **pertama** saat `.env` bocor adalah mengganti rahasia, bukan
   menghapus file dari Git?
2. Script ini hanya memeriksa pola tertentu. Sebutkan satu cara rahasia bisa
   tetap bocor tanpa terdeteksi script ini.
3. Apa bahayanya kalau path dari argumen langsung ditempel ke perintah shell
   tanpa `escapeshellarg()`?
4. Siapa saja di timmu yang seharusnya tahu nilai `.env` production?

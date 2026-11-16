# MATERI TEORI 10 — Deploy dan Hosting Laravel

> Target: Laravel 13 (rilis Maret 2026) dan PHP 8.3+. Semua yang dibahas di
> sini juga jalan di Laravel 12.

Aplikasi yang hanya jalan di laptopmu belum berguna untuk orang lain. **Deploy**
adalah proses memindahkan aplikasi ke server supaya bisa diakses publik, dengan
aman dan bisa diulang.

Praktikumnya ada di [materi-praktikum/10-deploy-hosting](../../materi-praktikum/10-deploy-hosting/README.md).

---

## 1. Kenapa Deploy Itu Skill Tersendiri?

**Analogi:** memasak di dapur rumah vs membuka warung. Di rumah, kalau nasinya
gosong, cuma kamu yang makan. Di warung, ada pelanggan, ada izin, ada kebersihan,
ada stok cadangan, ada rencana kalau kompor mati.

Laptop = dapur rumah. Server production = warung.

### Kenapa penting buat kerja?

- Junior yang bisa deploy sendiri **jauh lebih dipercaya** daripada yang hanya
  bisa `php artisan serve`.
- Banyak insiden kebocoran data terjadi bukan karena kode jelek, tapi karena
  **konfigurasi** salah: `APP_DEBUG=true`, `.env` ikut ter-upload, folder project
  bisa dibuka publik.
- Di perusahaan kecil di Indonesia, developer backend sering merangkap "orang
  server".

---

## 2. Tiga Lingkungan: Local, Staging, Production

| Lingkungan | Dipakai oleh | Data | `APP_DEBUG` |
|---|---|---|---|
| **local** | Kamu sendiri | Data palsu | `true` boleh |
| **staging** | Tim + tester | Mirip asli, tapi bukan data asli pelanggan | `false` (latihan production) |
| **production** | Pelanggan sungguhan | Data asli | **wajib `false`** |

**Analogi:** gladi bersih sebelum pentas. Staging adalah gladi bersih: panggung,
lampu, dan kostum sama, tapi penontonnya belum ada.

---

## 3. `.env`: Konfigurasi yang Berbeda di Tiap Tempat

File `.env` berisi nilai yang **beda per lingkungan** dan nilai **rahasia**:

```dotenv
APP_NAME="Toko Latihan"
APP_ENV=production
APP_KEY=           # diisi oleh php artisan key:generate, JANGAN dibagikan
APP_DEBUG=false
APP_URL=https://toko.contoh.id

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=toko
DB_USERNAME=toko_app
DB_PASSWORD=       # rahasia
```

Aturannya:

- `.env` **tidak pernah** masuk Git. Laravel sudah menaruhnya di `.gitignore`.
- `.env.example` **masuk** Git, isinya nama-nama variabel + nilai contoh/kosong.
  Ini "daftar belanja" untuk orang yang baru clone project.

**Analogi:** `.env.example` itu formulir kosong. `.env` itu formulir yang sudah
diisi nomor rekening dan PIN. Formulir kosong boleh difotokopi untuk semua orang;
yang sudah terisi disimpan sendiri.

### Kalau `.env` terlanjur ter-commit

Urutannya penting:

1. **Ganti semua rahasia dulu** (password database, `APP_KEY`, API key pihak
   ketiga). Anggap semua yang pernah ada di file itu sudah bocor.
2. Baru keluarkan dari Git: `git rm --cached .env`, pastikan `.env` ada di
   `.gitignore`, commit.
3. Riwayat Git masih menyimpan file lama. Menghapus dari riwayat butuh alat
   khusus dan koordinasi tim. Karena itu langkah 1 yang paling penting.

---

## 4. Empat Variabel Wajib

### `APP_ENV`

Nama lingkungan. Kodemu bisa bertanya `app()->isProduction()`.

### `APP_DEBUG`

Kalau `true`, error ditampilkan lengkap di browser: stack trace, potongan kode,
path folder server, kadang nilai variabel environment. Sangat membantu saat
belajar, **sangat berbahaya** di production.

**Analogi:** `APP_DEBUG=true` di production itu seperti warung yang menempel
resep rahasia, nomor supplier, dan kombinasi brankas di dinding setiap kali ada
piring pecah.

Dengan `APP_DEBUG=false`, pengunjung hanya melihat halaman "500 Server Error"
yang sopan. Detail error tetap tercatat di `storage/logs/laravel.log` untuk
developer.

### `APP_KEY`

Kunci enkripsi untuk cookie, session terenkripsi, dan `Crypt::encrypt()`. Kalau
bocor, penyerang bisa memalsukan data terenkripsi. Kalau diganti sembarangan,
semua session user akan logout dan data terenkripsi lama tidak bisa dibuka.

```bash
php artisan key:generate   # sekali per lingkungan
```

### `APP_URL`

Alamat publik aplikasi. Dipakai untuk membuat URL di email, link storage, dan
perintah CLI.

---

## 5. Config Cache dan Jebakan `env()`

Di production kamu menjalankan:

```bash
php artisan optimize
```

Perintah ini meng-cache config, route, event, dan view supaya lebih cepat. Ada
jebakan penting:

> Setelah config di-cache, file `.env` **tidak dibaca lagi**. Fungsi `env()`
> akan mengembalikan `null` di luar folder `config/`.

Makanya aturan Laravel: **`env()` hanya dipanggil di file `config/*.php`**. Kode
aplikasi selalu memakai `config()`.

```php
// config/toko.php
return [
    'nama_toko' => env('TOKO_NAMA', 'Toko Latihan'),
];

// di controller / service
$nama = config('toko.nama_toko');   // benar
$nama = env('TOKO_NAMA');           // salah: bisa null setelah optimize
```

Kalau mengubah `.env` di server, jalankan lagi `php artisan optimize` (atau
`php artisan config:clear` lalu cache ulang).

---

## 6. Web Root Harus `public/`

Struktur Laravel:

```text
toko/
├── app/
├── bootstrap/
├── config/
├── public/        ← HANYA folder ini yang boleh dilihat internet
│   └── index.php
├── storage/
├── vendor/
└── .env           ← rahasia
```

Web server (Nginx/Apache) harus diarahkan ke `toko/public`, bukan ke `toko/`.
Kalau salah, orang bisa mencoba membuka `https://toko.contoh.id/.env` atau
`/storage/logs/laravel.log`.

**Analogi:** pintu depan warung harus menghadap ruang makan, bukan gudang.

---

## 7. Pilihan Hosting

### Shared hosting (cPanel)

Murah, banyak di Indonesia. Tantangannya:

- Folder publik biasanya bernama `public_html` dan tidak bisa diganti.
- Solusi umum: taruh project di luar `public_html` (misal `~/toko`), lalu
  arahkan domain/subdomain ke `~/toko/public`, atau buat symlink `public_html` →
  `~/toko/public` kalau hosting mengizinkan.
- **Jangan** memindahkan seluruh project ke dalam `public_html` lalu mengakali
  `index.php`. Itu membuat `.env` bisa terjangkau.
- Cek versi PHP di panel. Laravel 13 butuh PHP 8.3+.
- Akses SSH sering terbatas; queue worker dan scheduler bisa susah.

### VPS (Nginx + PHP-FPM)

Kamu sewa server Linux kosong, lalu pasang sendiri Nginx, PHP-FPM, database,
dan Composer. Paling fleksibel, paling banyak tanggung jawab (update keamanan OS,
firewall, backup).

### Platform terkelola

Laravel Cloud, Laravel Forge, Ploi, dan sejenisnya membantu membuat server,
konfigurasi Nginx, SSL, dan deploy otomatis. Kamu tetap harus paham isinya supaya
bisa debug saat ada masalah.

### Docker / Sail

Laravel Sail menjalankan aplikasi di container untuk development. Untuk
production, container butuh image dan orkestrasi sendiri. Bagus untuk konsistensi,
tapi tambah satu lapisan belajar.

---

## 8. Izin Folder dan `storage:link`

Laravel perlu **menulis** ke dua folder:

- `storage/` (log, cache, session, upload)
- `bootstrap/cache/` (cache config/route)

User web server (misal `www-data`) harus punya izin tulis ke dua folder itu,
**dan hanya** dua folder itu. Jangan `chmod -R 777` seluruh project.

File upload publik disimpan di `storage/app/public`. Supaya bisa diakses lewat
URL, buat symlink:

```bash
php artisan storage:link   # membuat public/storage → storage/app/public
```

---

## 9. Queue Worker dan Scheduler

### Queue worker

Job yang lambat (kirim email, resize gambar) dijalankan di belakang layar oleh
proses `php artisan queue:work`. Proses ini harus **terus hidup**, jadi diawasi
oleh Supervisor atau systemd.

Masalahnya: worker memuat kode ke memori. Setelah deploy kode baru, worker lama
masih memakai kode lama. Karena itu setiap deploy menjalankan:

```bash
php artisan queue:restart
```

**Analogi:** kurir yang sudah berangkat membawa daftar alamat lama. `queue:restart`
menyuruh kurir pulang dulu setelah paket yang sedang dibawa selesai, lalu ambil
daftar baru.

### Scheduler

Tugas terjadwal (misal hapus keranjang kadaluarsa tiap malam) didefinisikan di
`routes/console.php`. Di server cukup satu cron:

```cron
* * * * * cd /var/www/toko && php artisan schedule:run >> /dev/null 2>&1
```

---

## 10. HTTPS dan Trusted Proxy

- Production **wajib HTTPS**. Tanpa itu, cookie session dan password bisa dicuri
  di Wi-Fi publik. Let's Encrypt menyediakan sertifikat gratis.
- Kalau aplikasi di belakang load balancer / Cloudflare, Laravel perlu tahu proxy
  mana yang dipercaya supaya `$request->ip()` dan deteksi HTTPS benar. Ini diatur
  lewat `trustProxies` di `bootstrap/app.php`. Rate limit berbasis IP jadi kacau
  kalau ini salah (semua request terlihat dari IP proxy).

---

## 11. Log dan Health Check

### Log

- Lokasi default: `storage/logs/laravel.log`.
- Jangan pernah me-log password, token, atau nomor kartu.
- Di production, pertimbangkan `LOG_CHANNEL=daily` supaya file tidak membengkak.

### Health check

Sejak Laravel 11, app baru sudah punya route **`/up`**. Route ini mengembalikan
`200` kalau aplikasi bisa boot. Layanan monitoring (UptimeRobot, load balancer)
memanggil URL ini tiap menit.

Health check yang baik: cepat, tidak butuh login, dan **tidak membocorkan**
versi, secret, atau detail infrastruktur.

---

## 12. Backup

Aturan sederhana **3-2-1**: 3 salinan data, di 2 media berbeda, 1 di lokasi lain.

Yang perlu di-backup:

- Database (dump terjadwal).
- File upload user (`storage/app`).
- `.env` production (simpan di password manager / secret manager, **bukan** di
  Git).

Backup yang belum pernah dicoba di-restore **belum terbukti** backup. Latih
restore minimal sekali.

---

## 13. Zero-Downtime dan Rollback

Deploy paling sederhana:

```text
php artisan down → git pull → composer install → migrate → optimize → php artisan up
```

Selama proses itu, situs menampilkan halaman maintenance (`503`). Untuk toko
kecil, beberapa detik down biasanya diterima.

Cara lebih maju (zero-downtime): setiap release di folder baru
(`releases/2026-11-16-0800`), lalu symlink `current` dipindah ke folder baru
setelah semua siap. Rollback = pindahkan symlink kembali ke release lama.

Hal yang membuat rollback susah: **migration yang merusak data** (hapus kolom,
ganti nama kolom). Biasakan migration yang bisa hidup berdampingan dengan kode
lama (tambah kolom dulu, hapus kolom di release berikutnya).

Opsi `php artisan down --secret="kata-rahasia"` membuat URL rahasia supaya kamu
bisa mengecek situs saat maintenance. Jangan pakai kata rahasia yang mudah
ditebak.

---

## 14. Checklist Sebelum Deploy

- [ ] `APP_ENV=production`, `APP_DEBUG=false`, `APP_KEY` terisi, `APP_URL` benar
- [ ] `.env` tidak ada di Git; `.env.example` hanya berisi placeholder
- [ ] Web root menunjuk ke `public/`
- [ ] `composer install --no-dev --optimize-autoloader`
- [ ] Asset frontend sudah di-build (`npm ci && npm run build`)
- [ ] `php artisan migrate --force` sudah dicoba di staging
- [ ] `php artisan optimize` dijalankan setelah `.env` final
- [ ] `queue:restart` setelah kode baru
- [ ] Cron scheduler terpasang
- [ ] HTTPS aktif
- [ ] `/up` dipantau
- [ ] Backup database terjadwal dan pernah dites restore
- [ ] Ada rencana rollback tertulis

---

## 15. Kesalahan Umum

1. **`APP_DEBUG=true` di production** karena "lupa ganti setelah debug".
2. **`.env` ter-upload** lewat FTP atau ter-commit ke GitHub publik.
3. **Web root ke folder project**, bukan `public/`.
4. **Memakai `env()` di controller**, lalu nilai jadi `null` setelah `optimize`.
5. **`chmod -R 777`** seluruh folder karena error permission.
6. **Lupa `queue:restart`**, worker menjalankan kode lama berjam-jam.
7. **`migrate:fresh` di production.** Semua data hilang.
8. **Mengganti `APP_KEY` tanpa sadar** saat deploy ulang, semua user ter-logout.
9. **Tidak ada backup**, atau backup tidak pernah dites.
10. **Deploy manual tanpa catatan**, sehingga tidak ada yang tahu cara rollback.

---

## 16. Glosarium

| Istilah | Arti singkat |
|---|---|
| **Deploy** | Memasang versi aplikasi di server |
| **Environment** | Lingkungan: local, staging, production |
| **Secret** | Nilai rahasia: password DB, API key, `APP_KEY` |
| **Web root / document root** | Folder yang dibuka web server untuk publik |
| **PHP-FPM** | Proses yang menjalankan PHP untuk Nginx |
| **Maintenance mode** | Mode `php artisan down`, pengunjung melihat 503 |
| **Config cache** | Config digabung jadi satu file cepat; `.env` tidak dibaca lagi |
| **Queue worker** | Proses yang mengerjakan job di belakang layar |
| **Scheduler** | Penjadwal tugas berkala via cron |
| **Health check** | URL untuk mengecek aplikasi hidup |
| **Rollback** | Kembali ke versi sebelumnya saat deploy bermasalah |
| **Zero-downtime** | Deploy tanpa situs mati |
| **Trusted proxy** | Proxy/load balancer yang header-nya dipercaya |

---

## 17. Cek Pemahaman (Jawab Tanpa Lihat Catatan)

1. Sebutkan 3 informasi yang bisa bocor kalau `APP_DEBUG=true` di production.
2. Kenapa `env('X')` di controller bisa menghasilkan `null` di production?
3. Apa langkah **pertama** kalau `.env` ternyata ter-commit ke repo publik?
4. Kenapa web root harus `public/`? Apa yang bisa dibuka orang kalau salah?
5. Kenapa perlu `queue:restart` setiap deploy?
6. Kenapa migration "hapus kolom" membuat rollback lebih sulit?

---

## Referensi Resmi

- [Laravel — Deployment](https://laravel.com/docs/13.x/deployment)
- [Laravel — Configuration](https://laravel.com/docs/13.x/configuration)
- [Laravel — Errors & Logging](https://laravel.com/docs/13.x/errors)
- [Laravel — Queues (Supervisor)](https://laravel.com/docs/13.x/queues#supervisor-configuration)
- [Laravel — Task Scheduling](https://laravel.com/docs/13.x/scheduling)
- [Laravel — Requests (Trusted Proxies)](https://laravel.com/docs/13.x/requests#configuring-trusted-proxies)

Baca juga [Modul Keamanan 07 — Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

Lanjut ke praktikum: [10-deploy-hosting](../../materi-praktikum/10-deploy-hosting/README.md).

# LEVEL 2 — Backend dengan Laravel (Track Alternatif)

> **Track alternatif** untuk backend development menggunakan **PHP + Laravel**.
> Jika di track utama kita pakai **JavaScript + Node.js + Express**, di sini kita
> pakai **PHP + Laravel**. Pilih salah satu — keduanya menghasilkan output
> fungsional yang sama.

---

## Tujuan Level Ini

Setelah menyelesaikan level ini, kamu akan mampu:

- Memahami **logika framework backend** (bukan cuma sintaks PHP)
- Membangun **REST API** dengan Laravel (routing, controller, middleware)
- Mengelola **database** pakai **Eloquent ORM** + **migration**
- Mengimplementasikan **autentikasi** (login, register, session/JWT)
- Deploy aplikasi Laravel ke **shared hosting** atau **VPS**

---

## Apa Itu Laravel?

**Laravel** adalah framework backend berbasis bahasa **PHP** yang mengikuti
pola **MVC (Model–View–Controller)**. Ibarat **"kayu siap pakai" untuk bikin
rumah** — semua pondasi, alat dasar, dan best practice sudah disediakan.
Kamu tinggal rakit sesuai desain.

### Analogi Sederhana

Bayangkan backend itu **dapur restoran**:

1. **Bahasa (resep koki).** Node/Express pakai **JavaScript** — bahasa yang
   sama dengan browser, jadi frontend & backend satu bahasa. Laravel pakai
   **PHP** — bahasa yang sudah matang 25+ tahun di dunia web (WordPress,
   Wikipedia, Facebook awal).
2. **Framework (layout dapur).** Express adalah framework **minimalis** —
   kamu susun sendiri strukturnya. Laravel adalah framework **konvensi**
   yang sudah menyediakan MVC lengkap — kamu tinggal ikut aturannya.
3. **Request dari pelanggan (pesanan masuk).** Express pakai object `req`
   yang berisi semua info request (header, body, parameter). Laravel pakai
   `Request` object dengan method-method rapi (`$request->input('nama')`).
4. **Response ke pelanggan (makanan diantar balik).** Express pakai `res`
   (`res.json({...})`, `res.send('...')`). Laravel pakai `Response` atau
   helper `response()->json([...])` yang bisa return JSON, view, redirect.
5. **Database (gudang bahan).** Node bebas — bisa pakai MongoDB, MySQL,
   PostgreSQL, apa saja. Laravel **default ke MySQL/PostgreSQL** (relasional),
   karena Eloquent ORM memang dirancang untuk database relasional.
6. **Query ke database (ambil bahan dari gudang).** Node pakai Mongoose
   (kalau MongoDB) atau raw SQL/library tambahan. Laravel punya **Eloquent
   ORM** built-in: `User::where('active', true)->get()` — readable, tanpa
   nulis SQL string.
7. **Validasi pesanan (cek pesanan valid?).** Node pakai middleware manual
   atau library Joi/Yup. Laravel punya `validate()` built-in yang
   auto-generate error response: `$request->validate(['email' => 'required|email'])`.
8. **Autentikasi koki (seragam & ID card).** Node pakai Passport, JWT, atau
   library terpisah. Laravel punya **Sanctum, Breeze, Jetstream** —
   install 1 package, langsung dapat login, register, password reset, dll.

---

## Kenapa Laravel Ada? (Logikanya)

PHP adalah bahasa **server-side** tertua dan paling banyak dipakai di web (WordPress,
Wikipedia, Facebook awal). Masalahnya: tanpa framework, kode PHP mentah itu
**sangat mudah berantakan** (campur HTML, logika, query SQL di satu file).

**Laravel** muncul untuk:
- **Memberi struktur baku** (MVC) — setiap developer tahu di mana cari kode
- **Menghilangkan boilerplate** — login, validasi, migration, semuanya 1 command
- **Best practice default** — keamanan (CSRF, XSS, SQL injection) sudah built-in
- **Ekosistem besar** — Sanctum (API auth), Horizon (queue), Forge (deploy), Nova (admin)

Ibarat: **belajar masak dari nol** (PHP mentah) vs **masak di dapur sekolah
yang sudah tertata** (Laravel). Hasilnya bisa sama enaknya, tapi di Laravel kamu
belajar best practice lebih cepat.

---

## Kapan Pakai Laravel?

Pakai Laravel kalau:

- **Sudah paham HTML/CSS/JS** (LEVEL 1 selesai) — Laravel fokus di backend
- **Suka struktur yang jelas** — MVC, folder `/app/Http/Controllers`, `/app/Models`
- **Butuh fitur cepat** — login + admin panel + API dalam hitungan jam
- **Target deployment shared hosting** (Hostinger, Niagahoster) — PHP murah & universal
- **Tim akrab dengan PHP** — banyak perusahaan pakai PHP, lowongannya banyak

## Kapan JANGAN Pakai Laravel?

- **Belum pernah coding sama sekali** → mulai dari LEVEL 1 dulu
- **Butuh real-time / WebSocket intensif** (chat, game) → pertimbangkan Node + Socket.io
- **Aplikasi super high-performance** (trading, IoT) → Go atau Rust lebih cocok
- **Frontend-only** → ini backend, bukan untuk UI

---

## Bedanya dengan Node.js + Express (Track Utama)

1. **Bahasa.** Node pakai JavaScript (frontend & backend satu bahasa).
   Laravel pakai PHP — bahasa server-side yang sudah matang 25+ tahun.
2. **Tahun lahir.** Node muncul 2009, Express 2010. Laravel rilis 2011.
   Keduanya sudah terbukti di production besar.
3. **Paradigma.** Node/Express **minimalis** — kamu pilih sendiri library
   untuk ORM, auth, validation. Laravel **konvensi lebih kaku** — banyak
   default & best practice sudah built-in, tinggal pakai.
4. **Package manager.** Node pakai `npm` atau `yarn` (install dari registry
   npmjs.com). Laravel pakai `composer` (install dari packagist.org).
5. **ORM default.** Node **tidak ada ORM default** — kamu pilih Mongoose
   (MongoDB), Sequelize (SQL), Prisma, TypeORM, dll. Laravel punya
   **Eloquent** built-in: sintaks `User::find(1)` bukan `SELECT * FROM users WHERE id = 1`.
6. **Autentikasi.** Node butuh library terpisah (Passport untuk OAuth,
   jsonwebtoken untuk JWT). Laravel punya **Sanctum, Breeze, Jetstream**
   built-in — install 1 package, langsung dapat login, register, reset password.
7. **Struktur folder.** Node **bebas** — kamu tentukan sendiri folder
   `/controllers`, `/models`, dst. Laravel **wajib MVC** dengan struktur
   folder yang sudah disediakan (`app/Http/Controllers`, `app/Models`,
   `routes/web.php`). Ini kelebihan sekaligus kekurangan—disiplin, tetapi kaku.
8. **CLI (Command Line Interface).** Node **tidak wajib** pakai CLI (bisa
   manual bikin file). Laravel punya `php artisan` yang **sangat powerful**:
   `php artisan make:model Post -m` sekaligus bikin model + migration.
9. **Learning curve.** Node **lebih landai di awal** (bikin server Hello
   World 5 baris), tapi banyak pilihan library bisa overwhelming. Laravel
   **lebih terjal di awal** (banyak konsep: routing, middleware, service
   container, artisan), tapi setelah paham, **sangat cepat produktif**.
10. **Performance.** Node **sangat cepat** karena async non-blocking
    (1 process handle ribuan koneksi). Laravel **cukup cepat** dengan
    sync tradisional, tapi untuk traffic sangat tinggi perlu tuning.
11. **Hosting murah.** Node perlu **VPS** (DigitalOcean, Vultr, AWS) mulai
    Rp 50rb/bulan. Laravel bisa di **shared hosting PHP** (Hostinger,
    Niagahoster) mulai Rp 10rb/bulan — jauh lebih murah untuk skala kecil.
12. **Lowongan di Indonesia.** Node **banyak** di startup tech (Gojek,
    Tokopedia, Bukalapak). Laravel **sangat banyak** di agency, e-commerce,
    perusahaan konvensional, dan WordPress customization.
13. **Komunitas.** Node **besar**, JavaScript familiar karena semua web
    developer pernah pakai. Laravel **besar**, PHP sudah matang 25+ tahun,
    banyak tutorial & forum Indo.

### Ringkasan 1 Kalimat

> **Node/Express** = "kamu rakit mobil dari komponen, bebas modif, JavaScript
> di mana-mana."
>
> **Laravel** = "kamu dapat mobil rakitan pabrik, tinggal pakai, semua fitur
> umum sudah menjadi standar."

---

## Peta Belajar Level Ini

Materi inti tersedia di [materi teori](materi-teori/README.md), latihan ada di
[materi praktikum](materi-praktikum/README.md), dan integrasi end-to-end ada di
[tutorial Product Catalog](tutorial/README.md).

Sesudah modul inti, pelajari
[Laravel Performance & Security](materi-teori/02-performance-security.md) lalu
kerjakan [Self Problem Solving](SELF_PROBLEM_SOLVING.md).

Level ini terdiri dari **10 modul** yang disusun berurutan. Setiap modul
membangun di atas modul sebelumnya, jadi kerjakan dari 01 → 10.

**Modul 01 — PHP Dasar untuk Laravel.** Sintaks PHP modern, variabel, fungsi,
dasar OOP (class, property, method) yang akan dipakai sepanjang Laravel.
PHP bukan sekadar "tag `<?php ?>` di HTML" — bahasanya sudah matang 25+
tahun dan punya fitur setara JavaScript modern (arrow function, namespace,
trait, dsb).

**Modul 02 — Setup Laravel & `php artisan`.** Instalasi Laravel via Composer,
mengenal struktur folder (`app/`, `routes/`, `resources/`, `database/`),
dan perintah `php artisan` — CLI sakti yang bisa bikin model, controller,
migration, seeder dalam hitungan detik.

**Modul 03 — Routing & Controller.** Cara Laravel memetakan URL ke aksi:
route `GET /` → method `index()` di controller. Kamu akan belajar return
`view()` (HTML) dan `json()` (data mentah untuk API).

**Modul 04 — Blade Template Engine.** Blade adalah "PHP yang lebih cantik" —
`@if`, `@foreach`, layout inheritance (master template + child view). Ini
pengganti murni `<?php echo $nama; ?>` di HTML.

**Modul 05 — Database & Migration.** Konfigurasi koneksi database di `.env`,
migration (version control untuk schema database, seperti Git untuk tabel),
dan schema builder (cara deklaratif bikin tabel).

**Modul 06 — Eloquent ORM.** Model = representasi 1 tabel di kode. Relasi
antar model (`hasMany`, `belongsTo`, `belongsToMany`) bikin query JOIN jadi
sekali tulis. Tanpa ORM, kamu tulis SQL string panjang; dengan ORM, kamu
pakai method PHP yang readable.

**Modul 07 — Form & Validasi.** `Form Request` class untuk validasi input:
`required`, `email`, `unique:users`, `min:8`. Validasi jalan di server
sebelum data masuk database — pertahanan pertama dari input berbahaya.

**Modul 08 — Autentikasi (Breeze / Sanctum).** Register, login, logout, dan
session management. Laravel Breeze = starter kit lengkap (form, view, route).
Middleware `auth` melindungi route agar hanya bisa diakses user login.

**Modul 09 — REST API.** Kalau frontend (Vue/React) butuh data, backend
kasih API. Route API (`routes/api.php`), Resource Controller, dan Sanctum
token untuk autentikasi header-based. Output = JSON, bukan HTML.

**Modul 10 — Deploy ke Shared Hosting / VPS.** Upload project via FTP ke
Hostinger/Niagahoster, set `.env` production, optimasi (`php artisan optimize`).
Bonus: alternatif deploy ke VPS (DigitalOcean) dengan Nginx + PHP-FPM.

---

## Prasyarat

Sebelum mulai level ini, pastikan kamu sudah:

- [ ] Selesai **LEVEL 1** (HTML, CSS, JavaScript dasar)
- [ ] Paham konsep **HTTP request/response** (METHOD, URL, header, body)
- [ ] Paham konsep **database relasional** (tabel, kolom, primary key, foreign key) — pengantar ada di LEVEL 2 Node
- [ ] XAMPP / Laragon / Herd terinstall (untuk local development)
- [ ] Composer terinstall (package manager PHP)

---

## Instalasi

```bash
# 1. Install Composer (package manager PHP)
# Download dari https://getcomposer.org/

# 2. Cek instalasi
composer --version

# 3. Install Laravel via installer
composer global require laravel/installer

# 4. Buat project baru
laravel new nama-project
cd nama-project

# 5. Install asset dan jalankan proses development
npm install && npm run build
composer run dev
# Buka URL yang dicetak di terminal
```

---

## Perbandingan dengan Track Utama

1. **Baru mulai, mau fundamental kuat, JavaScript everywhere.** →
   Pilih **Node/Express**. Kamu cuma perlu belajar satu bahasa (JavaScript)
   untuk frontend & backend. Track ini sudah kamu mulai di LEVEL 2.
2. **Suka struktur MVC yang jelas, mau cepat bikin fitur.** → Pilih
   **Laravel**. Login, admin panel, REST API bisa jadi dalam hitungan jam,
   bukan hari. Cocok untuk yang suka "rules & konvensi".
3. **Ingin deploy murah (shared hosting Rp 10rb/bulan).** → Pilih
   **Laravel**. Shared hosting PHP murah & universal di mana-mana. Node
   butuh VPS yang lebih mahal.
4. **Ingin frontend + backend satu bahasa (TypeScript end-to-end).** →
   Pilih **Node/Express**. Kamu bisa tulis frontend (Next.js) dan backend
   (Express) dalam TypeScript yang sama.
5. **Sudah kerja di agency PHP / WordPress.** → Pilih **Laravel**.
   Pengalaman PHP kamu langsung applicable, tinggal belajar framework.
6. **Mau jadi fullstack JS (React/Next.js).** → Pilih **Node/Express**.
   Track ini lebih sinergis: Express + React/Next.js = satu ekosistem JavaScript.

Kamu **tidak harus pilih dua-duanya**. Satu track dulu sampai selesai, baru
eksplor track lain kalau butuh.

---

## Catatan untuk Pemula

- **PHP ≠ JavaScript** — sintaks mirip (kedua bahasa C-family) tapi cara kerja
  beda. PHP jalan di server, hasilnya HTML dikirim ke browser.
- **Composer = npm** untuk PHP. Package di-install ke folder `vendor/`.
- **`php artisan` = CLI powerful** — bikin model, migration, controller, seeder
  semua dengan 1 command.
- **Folder `app/Http/Controllers/`** = tempat logika aplikasi kamu.
- **Folder `routes/web.php` & `routes/api.php`** = daftar URL yang bisa diakses.
- **Folder `database/migrations/`** = versi database, seperti Git untuk schema.
- **`.env` file** = konfigurasi environment (database, app key, mail) — JANGAN
  commit ke Git.

---

## Sumber Belajar

- **Dokumentasi resmi**: [laravel.com/docs](https://laravel.com/docs) (sangat lengkap, ada versi Indo)
- **Laracasts**: [laracasts.com](https://laracasts.com) — video tutorial premium, ada beberapa gratis
- **Laravel Daily** (YouTube): tips singkat harian
- **StackOverflow**: tag `laravel` sangat aktif
- **Komunitas Indo**: grup Telegram "Laravel Indonesia", Facebook "PHP Indonesia"

---

**Target: 10 modul selesai → bisa bikin REST API + admin panel + deploy!**

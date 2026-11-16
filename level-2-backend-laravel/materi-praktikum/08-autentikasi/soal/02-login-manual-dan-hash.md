# SOAL 02 — Login Manual, Hash Password, dan Batas Percobaan

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat alur login dan logout sendiri tanpa starter kit, supaya paham isi "kotak hitamnya"
- Menjelaskan kenapa password disimpan sebagai **hash**, bukan teks asli
- Membuat ulang session id setelah login untuk mencegah session fixation
- Membatasi percobaan login (rate limit) agar tebak-tebakan password jadi lambat
- Menulis pesan error yang tidak membocorkan email mana yang terdaftar

**Topik:** `Auth::attempt()`, `session()->regenerate()`, `RateLimiter`, `Hash`, cast `hashed`, middleware `guest`/`auth`

**Referensi utama:**

- [Laravel 13: Manually Authenticating Users](https://laravel.com/docs/13.x/authentication#authenticating-users)
- [Laravel 13: Logging Out](https://laravel.com/docs/13.x/authentication#logging-out)
- [Laravel 13: Hashing](https://laravel.com/docs/13.x/hashing)
- [Laravel 13: Rate Limiting](https://laravel.com/docs/13.x/rate-limiting)
- [Modul Keamanan 04 — Autentikasi dan Password](../../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)

**Difficulty:** Menengah • **Estimasi:** 90–120 menit

---

## Briefing

Toko butuh halaman login untuk admin dan penjual. Sebenarnya Laravel punya
**starter kit** (React, Vue, atau Livewire) yang langsung jadi. Tapi kalau kamu cuma
klik install, kamu tidak tahu apa yang terjadi di dalamnya — dan saat ada bug di
kantor, kamu bingung harus cari di mana.

Jadi di soal ini kamu menulis sendiri versi kecilnya: login, logout, dan register,
lengkap dengan pengaman yang biasanya disembunyikan starter kit.

---

## Deskripsi

Lengkapi `SesiController` dari starter `code/02-login-controller.php`, buat
`RegisterController`, view login sederhana, route, dan feature test.

---

## Syarat (Acceptance Criteria)

### Register

- [ ] Validasi: `name` wajib, `email` wajib + format email + unik, `password` minimal 8 + `confirmed`
- [ ] Kolom `password` di database berisi hash (diawali `$2y$`), **bukan** teks asli
- [ ] Tidak ada `Log::`, `dd()`, atau `dump()` yang mencetak password
- [ ] Setelah register, user langsung login dan diarahkan ke `/dashboard`

### Login

- [ ] Email dan password divalidasi (wajib, email berformat benar)
- [ ] Login berhasil → redirect ke `/dashboard` (atau halaman yang tadinya ingin dibuka)
- [ ] Session id **berubah** setelah login berhasil
- [ ] Login gagal → pesan **sama persis** "Email atau password salah." untuk email tidak terdaftar maupun password salah
- [ ] Checkbox "ingat saya" mengaktifkan remember me

### Batas percobaan

- [ ] Setelah 5 percobaan gagal dalam 1 menit untuk email + IP yang sama, percobaan ke-6 ditolak `429`
- [ ] Pesan batas menyebut berapa detik harus menunggu
- [ ] Login berhasil mereset hitungan

### Logout dan proteksi route

- [ ] Logout lewat `POST` (bukan `GET`) dengan `@csrf`
- [ ] Logout membuang session lama dan token CSRF lama
- [ ] `/dashboard` tanpa login → redirect `302` ke `/login`
- [ ] `/login` saat sudah login → redirect menjauh dari halaman login (middleware `guest`)

### Test

- [ ] Minimal 4 test: login berhasil, pesan gagal sama untuk dua kasus, batas percobaan `429`, logout

---

## Expected Output

```text
POST /login  (password salah)            → 302 kembali, error "Email atau password salah."
POST /login  (email tidak terdaftar)     → 302 kembali, error "Email atau password salah."
POST /login  ×6 gagal (Accept: JSON)     → 429 {"errors":{"email":["Terlalu banyak percobaan. Coba lagi dalam 53 detik."]}}
POST /login  (benar)                     → 302 ke /dashboard
GET  /dashboard  (belum login)           → 302 ke /login
```

Di tinker:

```text
>>> App\Models\User::first()->password
= "$2y$12$Qx...."      ← hash bcrypt, bukan "rahasia123"
```

---

## Panduan Teknis

### Hash itu apa?

**Analogi:** blender. Pisang masuk, jadi jus. Dari jus kamu tidak bisa mengembalikan
pisang. Tapi kalau kamu blender pisang yang sama dengan cara yang sama, kamu bisa
membandingkan hasilnya.

Password di-hash satu arah. Saat login, Laravel meng-hash password yang diketik lalu
membandingkan dengan hash di database. Kalau database bocor, penyerang tidak langsung
dapat password asli.

Kenapa bukan `md5()` atau `sha1()`? Keduanya **terlalu cepat**. Komputer bisa mencoba
miliaran tebakan per detik. Bcrypt dan Argon2 sengaja dibuat lambat dan memakai salt.

```php
// Ilustrasi di tinker, bukan jawaban soal
$hash = Hash::make('kopi-susu-123');
Hash::check('kopi-susu-123', $hash);   // true
Hash::check('teh-manis', $hash);       // false
```

Model `User` bawaan Laravel punya cast `'password' => 'hashed'`. Buka
`app/Models/User.php` dan cari sendiri — itu menentukan apakah kamu perlu
memanggil `Hash::make()` atau tidak.

### Session fixation

**Analogi:** kamu menginap di hotel. Resepsionis memberi kartu kamar. Kalau kartu yang
sama dipakai sejak kamu masih tamu biasa sampai jadi tamu VIP, orang yang sempat
menyalin kartu itu ikut jadi VIP. Solusinya: **ganti kartu** saat status naik.

Setelah login berhasil, buat session id baru. Cari method `regenerate()` di
dokumentasi session.

### Kenapa pesan error harus sama?

Kalau pesannya "Email tidak terdaftar" vs "Password salah", penyerang bisa mengecek
email mana yang punya akun di tokomu (user enumeration). Pesan umum menutup celah itu.

### Rate limiter (contoh domain lain)

```php
// Ilustrasi: batasi kirim OTP 3 kali per 10 menit per nomor HP
$kunci = 'otp|' . $nomorHp;

if (RateLimiter::tooManyAttempts($kunci, 3)) {
    $detik = RateLimiter::availableIn($kunci);
    // tolak dengan pesan tunggu $detik detik
}

RateLimiter::hit($kunci, 600);
```

Untuk login, pikirkan sendiri: kunci dibuat dari apa, berapa kali, berapa detik, dan
kapan hitungan dihapus.

---

## Verifikasi Hasil

```bash
php -l app/Http/Controllers/Auth/SesiController.php
php -l app/Http/Controllers/Auth/RegisterController.php
php artisan route:list --path=login
php artisan route:list --path=logout

# Buat user untuk uji
php artisan tinker
>>> App\Models\User::create(['name' => 'Budi', 'email' => 'budi@toko.test', 'password' => 'rahasia123'])
>>> App\Models\User::where('email', 'budi@toko.test')->value('password')

php artisan test --filter=Sesi
```

Cek session id berubah: buka DevTools → Application → Cookies, catat nilai cookie
session sebelum login dan sesudah login.

---

## Cara Submit

1. `SesiController`, `RegisterController`, view `auth/login.blade.php`, route
2. `tests/Feature/SesiTest.php` hijau
3. Di `catatan-08.md`: hash user dari tinker, nilai cookie session sebelum/sesudah login (boleh dipotong), dan jawaban Refleksi

---

## Catatan Penting

- ⚠️ **Jangan pernah simpan, log, atau kirim password asli** — termasuk di pesan error dan `dd()` saat debugging.
- ⚠️ **Logout harus `POST`.** Logout lewat `GET` bisa dipicu dari `<img src="/logout">` di situs lain.
- 💡 Di Laravel 13 middleware CSRF bernama `PreventRequestForgery`. `@csrf` di form tetap wajib.
- 💡 Setelah paham, di proyek nyata boleh pakai starter kit. Kamu sekarang tahu apa yang ia lakukan.
- 📚 [Modul Keamanan 04 — Autentikasi dan Password](../../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)

---

## Refleksi

1. Kalau database bocor, apa bedanya password disimpan polos, dengan `md5`, dan dengan bcrypt?
2. Kenapa kunci rate limit memakai email **dan** IP? Apa kelemahannya kalau hanya IP? Kalau hanya email?
3. Apa yang terjadi pada session lama kalau logout hanya memanggil `Auth::logout()`?

# Latihan 4: Authentication dan Authorization

## Tujuan Praktikum

Mahasiswa diharapkan dapat mengimplementasikan sistem autentikasi dan otorisasi yang aman di aplikasi Express.js, termasuk hashing password, penggunaan JSON Web Token (JWT), dan pembuatan middleware proteksi route.

## Apa yang Akan Dipelajari

Pada praktikum ini, mahasiswa akan mengerjakan empat topik utama:

1. **Password Hashing** -- Menggunakan library `bcrypt` untuk melakukan hash password sebelum disimpan ke database. Memahami konsep salt, rainbow table attack, dan mengapa password tidak boleh disimpan dalam bentuk plaintext.
2. **JSON Web Token (JWT)** -- Menghasilkan JWT untuk menandai sesi pengguna
   setelah login berhasil. Untuk browser fullstack, utamakan cookie `HttpOnly`;
   jangan menyimpan token autentikasi di `localStorage`.
3. **Login dan Register API** -- Membangun endpoint register (daftar) dan login (masuk) yang lengkap. Memvalidasi input, mengecek apakah email sudah terdaftar, serta mengembalikan token JWT setelah autentikasi berhasil.
4. **Auth Middleware** -- Membuat middleware proteksi yang memverifikasi token JWT di setiap request ke route yang membutuhkan akses terproteksi. Memahami cara mengakses data user dari token yang sudah diverifikasi.

## Struktur Direktori

```
04-latihan-auth/
├── soal/
│   ├── 01-password-hashing.md
│   ├── 02-jwt-dan-token.md
│   ├── 03-login-dan-register-api.md
│   └── 04-auth-middleware.md
├── code/
│   ├── 01-password-hash.js
│   ├── 02-jwt-dan-token.js
│   ├── 03-login-register.js
│   └── 04-auth-middleware.js
└── README.md
```

## Cara Menjalankan

1. Masuk ke direktori latihan:

   ```bash
   cd LEVEL-2-Backend-Node-Express/materi-praktikum/04-latihan-auth
   ```

2. Inisialisasi proyek dan instal dependensi:

   ```bash
   npm init -y
   npm install express bcryptjs jsonwebtoken
   ```

3. Jalankan server:

   ```bash
   node code/01-password-hash.js         # untuk menguji hashing
   node code/02-jwt-dan-token.js         # untuk menguji JWT
   node code/04-auth-middleware.js       # server lengkap dengan proteksi route
   ```

4. Server utama akan berjalan di `http://localhost:3000`.

5. Uji endpoint dengan curl atau Postman:

   ```bash
   # Register
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"rahasia123"}'

   # Login
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"rahasia123"}'

   # Access protected route (ganti <token> dengan token dari login)
   curl -H "Authorization: Bearer <token>" http://localhost:3000/protected
   ```

## Catatan Penting

- Jangan pernah menyimpan password dalam bentuk plaintext. Selalu gunakan `bcrypt`.
- Rahasiakan secret key JWT dan jangan commit ke version control (gunakan `.env`).
- Contoh bearer token cocok untuk memahami API client non-browser. Pada aplikasi
  browser, gunakan cookie `HttpOnly`, `Secure` di production, `SameSite` yang
  sesuai, dan mitigasi CSRF.
- Authorization tetap wajib diperiksa server; menyembunyikan route di frontend
  bukan kontrol keamanan.

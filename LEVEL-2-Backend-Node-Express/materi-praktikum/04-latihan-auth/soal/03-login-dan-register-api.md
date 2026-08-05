# Soal 03: Login dan Register API

## Deskripsi Singkat

Soal ini menguji kemampuan membangun endpoint register dan login yang lengkap dan aman. Termasuk validasi input, pengecekan email duplikat, hashing password sebelum simpan, dan pengembalian JWT setelah login berhasil.

## Persyaratan

- [ ] Endpoint POST `/register` yang menerima { name, email, password }
- [ ] Validasi: name minimal 3 karakter, email format valid, password minimal 6 karakter
- [ ] Pengecekan email sudah terdaftar (jika ada, return 409 Conflict)
- [ ] Password di-hash dengan bcryptjs sebelum disimpan ke array (in-memory storage)
- [ ] Endpoint POST `/login` yang menerima { email, password }, memverifikasi, dan mengembalikan JWT
- [ ] Semua error handler menggunakan centralized error handler

## Hint

Gunakan array di memory sebagai storage: `const users = []`. Di register: hash password, cek `users.find(u => u.email === email)`, push ke array. Di login: `users.find(u => u.email === email)`, `bcrypt.compare()`, lalu `jwt.sign()`. Jangan lupa import dan gunakan `express.json()` middleware.

## Expected Output

```
POST /register
Input valid: { "name": "Budi", "email": "budi@email.com", "password": "rahasia123" }
-> 201: { "message": "Registrasi berhasil", "userId": 1 }

POST /register (email duplikat)
-> 409: { "error": "Conflict", "message": "Email sudah terdaftar" }

POST /login
Input valid: { "email": "budi@email.com", "password": "rahasia123" }
-> 200: { "message": "Login berhasil", "token": "eyJhbG..." }
```
# Soal 02: JWT dan Token

## Deskripsi Singkat

Soal ini menguji kemampuan membuat dan memverifikasi JSON Web Token (JWT) menggunakan library `jsonwebtoken`. Mahasiswa akan memahami struktur JWT (header, payload, signature) dan cara menyimpannya.

## Persyaratan

- [ ] Menginstal dan mengimpor `jsonwebtoken`
- [ ] Membuat JWT dengan payload berisi `userId`, `email`, dan `role`
- [ ] Menggunakan secret key yangaman (minimal 32 karakter)
- [ ] Menambahkan masa berlaku token (exp: 24 jam)
- [ ] Memverifikasi token yang valid dan token yang sudah dimanipulasi
- [ ] Menampilkan payload dari token yang berhasil diverifikasi

## Hint

Import: `const jwt = require('jsonwebtoken')`. Sign: `const token = jwt.sign(payload, secret, { expiresIn: '24h' })`. Verify: `const decoded = jwt.verify(token, secret)`. Jika token invalid/tampered, `jwt.verify` akan throw error yang bisa ditangkap dengan try-catch.

## Expected Output

```
Token berhasil dibuat:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Payload dari token yang valid:
{ userId: 1, email: "user@email.com", role: "admin", iat: ..., exp: ... }

Token yang dimanipulasi -> Error: "invalid signature"
```
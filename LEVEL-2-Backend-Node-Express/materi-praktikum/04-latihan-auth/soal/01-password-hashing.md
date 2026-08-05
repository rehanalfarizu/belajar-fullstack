# Soal 01: Password Hashing

## Deskripsi Singkat

Soal ini menguji kemampuan menggunakan library `bcryptjs` untuk melakukan hash password sebelum disimpan ke database, serta memverifikasi password yang masuk/login terhadap hash yang tersimpan.

## Persyaratan

- [ ] Menginstal dan mengimpor `bcryptjs`
- [ ] Melakukan hash terhadap 3 password plaintext menggunakan `bcrypt.hash()`
- [ ] Menggunakan salt rounds sebesar 10
- [ ] Memverifikasi password yang benar dan salah menggunakan `bcrypt.compare()`
- [ ] Menampilkan hasil perbandingan (match/tdk match) ke console

## Hint

Import: `const bcrypt = require('bcryptjs')`. Hash: `const hash = await bcrypt.hash(password, 10)`. Compare: `const isMatch = await bcrypt.compare(password, hash)`. bcrypt adalah library async, gunakan `async/await`. Salt rounds menentukan tingkat keamanan -- semakin tinggi semakin lambat (10 adalah standar yang umum).

## Expected Output

```
Password asli: "rahasia123"
Hash: $2a$10$Kl2Skx... (16 karakter salt + hash)
Hash berhasil dibuat.

Verifikasi:
"rahasia123" vs hash -> true (PASSWORD COCOK)
"rahasia999" vs hash -> false (PASSWORD TIDAK COCOK)
```
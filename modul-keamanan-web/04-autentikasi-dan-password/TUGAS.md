# TUGAS — Autentikasi dan Password

## Hasil Akhir

1. Sistem registrasi dengan password hashing
2. Sistem login yang aman
3. Session management dengan HttpOnly cookie

---

## Bagian A: Password Hashing dengan bcrypt

> Catatan: lab ini memakai `bcryptjs` (versi JavaScript murni dari bcrypt).
> Paket `bcrypt` asli butuh dikompilasi dan sering gagal di Node 24. Cara pakainya hampir sama.

### Langkah

1. Masuk ke folder `kerjakan-di-sini/`, jalankan `npm install`
2. Buka `kerjakan-di-sini/01-hash-password.js`
3. Implementasi fungsi:
   - `hashPassword(plainPassword)` — Hash password saat registrasi
   - `verifyPassword(plainPassword, hashedPassword)` — Verifikasi saat login

### File yang diedit

`kerjakan-di-sini/01-hash-password.js` (cek hasilnya dengan `node 01-hash-password.js`)

### Verifikasi
- [ ] Hash berbeda setiap kali meski password sama (karena random salt)
- [ ] `verifyPassword` return true untuk password yang benar
- [ ] `verifyPassword` return false untuk password yang salah

---

## Bagian B: Sistem Registrasi & Login

### Langkah

1. Buka `kerjakan-di-sini/02-auth-server.js` (server jalan di `http://127.0.0.1:3040`)
2. Implementasi endpoint:
   - `POST /register` — Hash password sebelum simpan
   - `POST /login` — Verify password, set session cookie
   - `GET /profile` — Cek session, return user data
   - `POST /logout` — Hapus session

### Verifikasi
- [ ] Register menyimpan hash, bukan plain password
- [ ] Login berhasil dengan password benar
- [ ] Login gagal dengan password salah
- [ ] Profile hanya bisa diakses setelah login
- [ ] Logout menghapus session

---

## Bagian C: Rate Limiting

### Langkah

1. Di `02-auth-server.js`, tambahkan rate limiting untuk `/login`
2. Batasi: 5 percobaan per IP per menit

### Verifikasi
- [ ] Request ke-6 dalam 1 menit ditolak (status 429)
- [ ] Setelah 1 menit, bisa coba lagi

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── 01-hash-password.js    ← Implementasi hashing
├── 02-auth-server.js      ← Sistem auth lengkap
├── package.json           ← Dependency (bcryptjs, express, dll)
└── catatan.md             ← Catatan belajar
```

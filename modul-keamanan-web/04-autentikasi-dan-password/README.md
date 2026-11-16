# 04 — Autentikasi dan Password

## Apa yang Dipelajari

Autentikasi adalah proses memverifikasi **siapa** pengguna. Password adalah metode 
autentikasi paling umum, tapi banyak developer menyimpannya dengan cara yang salah.

---

## ❌ Kesalahan Fatal: Simpan Password Plain Text

```javascript
// ❌ JANGAN PERNAH LAKUKAN INI!
const users = {
  admin: 'password123',
  user1: 'rahasia456'
};
```

Kalau database bocor, semua password langsung bisa dibaca.

---

## ✅ Cara Benar: Password Hashing

### Apa itu Hashing?

Hashing adalah proses mengubah password menjadi string acak yang tidak bisa 
dikembalikan ke bentuk asli.

```
password123 → $2b$10$X4r.4kZ.../...panjang...
```

**Tidak ada cara** mengubah hash kembali menjadi "password123".

### Library yang Direkomendasikan

- **bcrypt** — Standar industri, include salt otomatis
- **Argon2** — Lebih modern, winner Password Hashing Competition

### Contoh dengan bcrypt

Di lab ini kita pakai `bcryptjs`, versi bcrypt yang ditulis murni dengan JavaScript.
Paket `bcrypt` yang asli harus dikompilasi dulu dan sering gagal di Node 24.
Cara pakai keduanya hampir sama.

```javascript
const bcrypt = require('bcryptjs');

// Hash password (saat registrasi)
const saltRounds = 10;
const hashedPassword = await bcrypt.hash('password123', saltRounds);
// Hasilnya: $2b$10$randomsalt...randomhash...

// Verifikasi password (saat login)
const isMatch = await bcrypt.compare('password123', hashedPassword);
// true jika cocok, false jika tidak
```

---

## Session vs Token (JWT)

### Session-based Authentication

```
1. User login → Server buat session → Simpan session ID di cookie
2. User request → Browser kirim cookie → Server cek session
3. Logout → Server hapus session
```

**Kelebihan:**
- Server bisa invalidate session kapan saja
- Lebih mudah untuk revoke akses

**Kekurangan:**
- Perlu storage di server (Redis, database)
- Scaling lebih kompleks

### Token-based (JWT)

```
1. User login → Server generate JWT → Kirim ke client
2. User request → Client kirim JWT di header → Server verify signature
3. Logout → Client hapus token (server tidak tahu)
```

**Kelebihan:**
- Stateless, tidak perlu storage server
- Bagus untuk microservices

**Kekurangan:**
- Tidak bisa di-revoke sampai expire
- Token harus disimpan dengan hati-hati

---

## ⚠️ Jangan Simpan Token di localStorage!

```javascript
// ❌ RENTAN XSS
localStorage.setItem('token', jwt);
// Kalau ada XSS, attacker bisa ambil token

// ✅ Untuk web: gunakan HttpOnly cookie
res.cookie('token', jwt, {
  httpOnly: true,  // JavaScript tidak bisa akses
  secure: true,    // Hanya HTTPS
  sameSite: 'strict'
});
```

---

## Istilah Penting

| Istilah | Arti |
|---------|------|
| **Hash** | Fungsi satu arah, tidak bisa di-reverse |
| **Salt** | Random string ditambahkan ke password sebelum hash |
| **bcrypt** | Library hashing yang include salt otomatis |
| **JWT** | JSON Web Token, token yang bisa diverifikasi tanpa database |
| **Session** | Data sisi server yang identifikasi user |
| **HttpOnly cookie** | Cookie yang tidak bisa diakses JavaScript |
| **Refresh token** | Token untuk mendapat access token baru |

---

## Best Practices

1. **Selalu hash password** — Tidak ada alasan menyimpan plain text
2. **Gunakan bcrypt atau Argon2** — Jangan MD5 atau SHA1 (terlalu cepat)
3. **Salt sudah include di bcrypt** — Tidak perlu generate sendiri
4. **Untuk web: HttpOnly cookie** — Bukan localStorage
5. **Implementasi rate limiting** — Cegah brute force
6. **Password requirement yang masuk akal** — Minimal 8 karakter, tanpa aturan aneh

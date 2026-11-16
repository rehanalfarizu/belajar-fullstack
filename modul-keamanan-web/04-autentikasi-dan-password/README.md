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

// Contoh: PIN loker penitipan barang (BUKAN password akun di lab)
const putaran = 10; // makin besar, makin lambat (dan makin sulit ditebak)

// Simpan: ubah PIN polos jadi hash
const hashPin = await bcrypt.hash('4821', putaran);
// Hasilnya mirip: $2b$10$randomsalt...randomhash...

// Cek: bandingkan PIN yang diketik dengan hash tersimpan
const cocok = await bcrypt.compare('4821', hashPin);
// true jika cocok, false jika tidak
```

Pertanyaan pemandu untuk lab:
- Kenapa hash dari PIN yang sama bisa berbeda tiap kali dibuat? Di mana "salt" tersimpan?
- Kenapa memverifikasi dengan `hash(ulang) === hashTersimpan` itu salah?

---

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
```

Untuk web, simpan token di **cookie** yang diatur supaya (1) tidak bisa dibaca
JavaScript, (2) hanya dikirim lewat HTTPS, dan (3) tidak ikut terkirim dari
situs lain. Cari di dokumentasi `express-session` (bagian *cookie*): opsi apa
yang mewakili masing-masing tiga hal itu? Isi sendiri di lab.

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

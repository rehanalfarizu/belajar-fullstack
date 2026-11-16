# 02 — Validasi Input

## Apa yang Dipelajari

Input validation adalah **garis pertahanan pertama** dalam keamanan aplikasi. Setiap 
data yang masuk dari luar (user, API, file) harus dianggap "bersalah sampai terbukti 
bersih".

---

## Analogi: Satpam Gedung

Bayangkan aplikasimu adalah gedung perkantoran:

- **Validasi client-side** = Satpam di lobby yang cek ID card
  - Cepat, langsung kasih feedback
  - TAPI bisa dilewati kalau punya cara (pakai pintu belakang)

- **Validasi server-side** = Satpam di lift yang cek ulang
  - Lebih lambat (perlu ke server)
  - TAPI tidak bisa di-bypass

**Kesimpulan:** Kamu butuh DUA-DUANYA. Client untuk UX, server untuk keamanan.

---

## Kenapa Validasi Client Saja TIDAK Cukup

User bisa bypass validasi client dengan:
1. **DevTools** — Edit HTML, hapus `required`, ubah `type="email"` jadi `type="text"`
2. **Postman/curl** — Kirim request langsung ke API tanpa lewat form
3. **Browser extension** — Intercept dan modifikasi request

Demo: Buka DevTools di form manapun, hapus atribut `required`, submit form kosong.

---

## Jenis Validasi

### 1. Validasi Tipe Data
```javascript
// ❌ Buruk - langsung pakai
const age = req.body.age;

// ✅ Baik - cek tipe dulu
const age = parseInt(req.body.age, 10);
if (isNaN(age)) {
  return res.status(400).json({ error: 'Age must be a number' });
}
```

### 2. Validasi Range/Batas
```javascript
// Cek batas nilai
if (age < 0 || age > 150) {
  return res.status(400).json({ error: 'Age must be between 0 and 150' });
}

// Cek panjang string
if (username.length < 3 || username.length > 50) {
  return res.status(400).json({ error: 'Username must be 3-50 characters' });
}
```

### 3. Validasi Format
```javascript
// Email dengan regex sederhana
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}

// Atau pakai library (lebih baik)
const validator = require('validator');
if (!validator.isEmail(email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}
```

### 4. Validasi Whitelist vs Blacklist
```javascript
// ❌ Blacklist - mencoba blokir yang buruk (selalu bisa dilewati)
const badChars = ['<', '>', '"', "'"];
if (badChars.some(char => input.includes(char))) {
  return res.status(400).json({ error: 'Invalid characters' });
}

// ✅ Whitelist - hanya izinkan yang baik (lebih aman)
const allowedChars = /^[a-zA-Z0-9_-]+$/;
if (!allowedChars.test(username)) {
  return res.status(400).json({ error: 'Username can only contain letters, numbers, underscore, dash' });
}
```

---

## Library Validasi yang Direkomendasikan

### JavaScript/Node.js
- **Zod** — Modern, TypeScript-first, runtime validation
- **Yup** — Populer, bagus untuk form
- **Joi** — Mature, banyak fitur
- **validator.js** — Utility functions

### PHP/Laravel
- **Laravel Validation** — Built-in, sangat lengkap

### Contoh dengan Zod
```javascript
const { z } = require('zod');

const UserSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  password: z.string().min(8),
});

// Validasi
try {
  const validData = UserSchema.parse(req.body);
  // Data sudah bersih, lanjut proses
} catch (error) {
  return res.status(400).json({ errors: error.errors });
}
```

---

## Istilah Penting

| Istilah | Arti |
|---------|------|
| **Sanitization** | Membersihkan input (hapus/escape karakter berbahaya) |
| **Validation** | Memeriksa apakah input sesuai aturan |
| **Whitelist** | Daftar yang BOLEH (lebih aman) |
| **Blacklist** | Daftar yang TIDAK BOLEH (mudah dilewati) |
| **Type coercion** | Konversi tipe data otomatis (bisa berbahaya) |

---

## Prinsip Validasi

1. **Validate early, fail fast** — Cek di awal, tolak segera kalau salah
2. **Whitelist over blacklist** — Izinkan yang baik, bukan blokir yang buruk
3. **Validate at every boundary** — Client, server, database
4. **Never trust client** — Selalu validasi ulang di server
5. **Use established libraries** — Jangan bikin regex sendiri untuk email

---

## Selanjutnya

Setelah memahami validasi input, kamu akan belajar tentang **SQL Injection** — 
salah satu serangan paling umum yang terjadi karena kurang validasi.

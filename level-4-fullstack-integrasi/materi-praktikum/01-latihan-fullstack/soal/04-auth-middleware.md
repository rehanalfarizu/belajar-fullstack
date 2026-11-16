# SOAL 04 — Auth Middleware (JWT)

## Tujuan
Mengimplementasikan authentication middleware di Express untuk melindungi route, memahami cara verify JWT token, dan membuat endpoint-endpoint yang terproteksi.

---

## Briefing
Anda diminta membuat sistem middleware auth yang akan digunakan di seluruh aplikasi Express. Middleware ini akan memverifikasi JWT token dari header Authorization dan attach user info ke request object.

---

## Teori Singkat

**JWT Structure:**
```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIn0.abc123signature
```

**Auth Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Middleware Pattern:**
```javascript
function authMiddleware(req, res, next) {
  // 1. Ambil token dari header
  // 2. Verify token
  // 3. Jika valid → next()
  // 4. Jika invalid → 401/403
}
```

---

## Studi Kasus

 Anda memiliki data user dan endpoint yang perlu diproteksi:

```javascript
// Data user (simulasi)
const users = [
  { id: 1, email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, email: "user@example.com", password: "user123", role: "user" }
];

// Endpoint yang perlu diproteksi:
// GET    /api/protected/profile     → data profil user
// DELETE /api/protected/account     → hapus akun user
// GET    /api/admin/dashboard       → admin only

// Endpoint publik:
// POST   /api/auth/login
// POST   /api/auth/register
```

---

## Tugas

### Soal 4A — Analisis Middleware
Jawab pertanyaan berikut:

```bash
# 1. Apa perbedaan antara authentication dan authorization?
# Jawaban:

# 2. Kapan kita perlu menggunakan middleware vs memeriksa auth di dalam route handler?
# Jawaban:

# 3. Apa yang terjadi jika seseorang mem-bypass frontend auth dan langsung kirim request ke API?
#    Bagaimana middleware membantu?
# Jawaban:

# 4. Mengapa penting untuk tidak menaruh secret JWT di repository/public code?
# Jawaban:
```

### Soal 4B — Implementasi Middleware
Lihat file `code/04-auth-middleware.js`. Lengkapi bagian `TODO`:

```javascript
// TODO 1: authMiddleware function
// - Ambil header Authorization
// - Pastikan format "Bearer <token>"
// - Extract token
// - Verify token dengan jwt.verify(secret)
// - Attach req.user = decoded payload
// - next() jika valid
// - res.status(401) jika token tidak ada
// - res.status(403) jika token invalid/expired

// TODO 2: requireAdmin middleware
// - Cek req.user.role === 'admin'
// - Jika bukan admin → res.status(403) "Hanya admin yang boleh akses"
// - Jika admin → next()

// TODO 3: Lengkapi endpoint yang ada
// - app.get('/api/protected/profile', authMiddleware, ...)
//   Return: { user: req.user }
// - app.delete('/api/protected/account', authMiddleware, ...)
//   Return: { message: "Akun berhasil dihapus" }
// - app.get('/api/admin/dashboard', authMiddleware, requireAdmin, ...)
//   Return: { message: "Welcome to admin dashboard" }
```

### Soal 4C — Error Handling
Jelaskan apa yang terjadi di setiap skenario berikut, dan bagaimana middleware menanganinya:

```bash
# Skenario 1: Request tanpa header Authorization
# Bagaimana middleware merespons? HTTP status apa?
# Jawaban:

# Skenario 2: Token expired (expired_at sudah lewat)
# Bagaimana middleware merespons?
# Jawaban:

# Skenario 3: Token di-modify secara manual (signature tidak match)
# Bagaimana jwt.verify menanganinya?
# Jawaban:

# Skenario 4: User biasa mencoba akses /api/admin/dashboard
# Middleware apa yang akan blokir?
# Jawaban:
```

---

## Bonus Challenge

Implementasikan **token expiration** yang berbeda untuk refresh token vs access token:
- Access token: expires dalam 15 menit
- Refresh token: expires dalam 7 hari

Demonstrasikan bagaimana client bisa menggunakan refresh token untuk mendapatkan access token baru.

---

## Kriteria Penilaian
- [ ] Middleware authMiddleware berfungsi dengan benar
- [ ] Middleware requireAdmin membatasi akses berdasarkan role
- [ ] Semua route terproteksi dengan benar
- [ ] Error response menggunakan HTTP status codes yang tepat (401 vs 403)
- [ ] Token expiration ditangani dengan baik
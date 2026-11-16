# SOAL 02 — JWT Middleware & Protected Routes

## Tujuan
Memahami auth middleware pattern dan cara protect routes dengan JWT.

---

## Briefing
Buat auth middleware yang verifikasi token dan protect endpoint tertentu.

---

## Syarat (Checklist)

### Auth Middleware
- [ ] `authMiddleware(req, res, next)` function
- [ ] Ambil token dari header: `Authorization: Bearer <token>`
- [ ] Verify token dengan `jwt.verify(token, secret)`
- [ ] Attach user info ke `req.user`
- [ ] Return 401 kalau token tidak ada
- [ ] Return 403 kalau token invalid

### Protected Routes
- [ ] `GET /api/profile` — hanya bisa diakses dengan token valid
- [ ] `GET /api/settings` — hanya untuk user yang login
- [ ] `POST /api/data` — create resource dengan user info dari token

### Public Routes
- [ ] `GET /api/public` — bisa diakses tanpa token
- [ ] `GET /api/health` — health check endpoint

---

## Contoh Code

Contoh jawaban sengaja tidak ditaruh di sini. Tulis sendiri dulu berdasarkan checklist di atas. Setelah punyamu jalan, bandingkan dengan [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).

---

## Cara Submit
1. Buat `server.js` dengan semua route di atas
2. Test dengan curl:
   - Tanpa token → 401
   - Token invalid → 403
   - Token valid → 200 + data
3. COBA expired token test
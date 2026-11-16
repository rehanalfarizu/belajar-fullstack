# SOAL 01 — Register & Login dengan bcrypt & JWT

## Tujuan
Memahami cara hash password, generate JWT token, dan auth flow lengkap.

---

## Briefing
Buat auth system dengan register, login, dan JWT token generation.

---

## Syarat (Checklist)

### Setup
- [ ] `npm install express bcryptjs jsonwebtoken cors dotenv`
- [ ] Buat `.env` dengan `JWT_SECRET`, `PORT`

### User Model (simple)
```javascript
const users = []; // array untuk simulasi (nantinya pakai DB)
```

### Register Endpoint
- [ ] `POST /api/auth/register`
- [ ] Validasi: nama, email, password (min 8 char)
- [ ] Check email sudah ada
- [ ] Hash password dengan `bcrypt.hash(password, 10)`
- [ ] Simpan user dengan password hash
- [ ] Return success (tanpa password)

### Login Endpoint
- [ ] `POST /api/auth/login`
- [ ] Validasi email + password
- [ ] Compare hash dengan `bcrypt.compare()`
- [ ] Generate JWT: `jwt.sign({ id, email }, secret, { expiresIn: "7d" })`
- [ ] Return token

### Protected Route
- [ ] Middleware untuk verify JWT
- [ ] `GET /api/auth/me` — return current user

---

## Contoh Code

Contoh jawaban sengaja tidak ditaruh di sini. Tulis sendiri dulu berdasarkan checklist di atas. Setelah punyamu jalan, bandingkan dengan [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).

---

## Cara Submit
1. Simpan sebagai `server.js`
2. Install dependencies
3. Buat `.env` dengan `JWT_SECRET` minimal 32 karakter acak dan `PORT=3000`
4. Test: curl register, curl login, curl /me dengan token

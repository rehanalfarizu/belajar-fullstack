# Materi Tutorial — LEVEL 4: Fullstack Integration

Folder ini berisi **panduan langkah demi langkah** untuk mengintegrasikan frontend dan backend, deployment ke production, dan security. Tutorial di sini berbeda dari materi-teori — fokusnya bukan penjelasan konsep, tapi **praktik langsung** di mana kamu akan membuat aplikasi yang bisa diakses online.

---

## Isi Folder

Tutorial yang tersedia di folder ini:

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-rest-api-integration.md` | Fullstack App | Connect React ke Express API |
| 01 | `01-cors-cookies.md` | CORS & Cookies | Konfigurasi CORS, cookie-based auth |
| 02 | `02-deployment-railway.md` | Deploy Backend | Railway, environment variables |
| 02 | `02-deployment-vercel.md` | Deploy Frontend | Vercel, build settings |
| 03 | `03-auth-fullstack.md` | Auth Fullstack | JWT di cookies, refresh token |
| 03 | `03-protected-routes.md` | Protected Routes | Route guarding di frontend & backend |
| 04 | `04-security-owasp.md` | Security Checklist | OWASP Top 10, secure headers |
| 04 | `04-rate-limiting.md` | Rate Limiting | express-rate-limit, brute force protection |

---

## Cara Pakai

1. **BACA** tutorial yang kamu mau kerjakan dari awal sampai akhir
2. **PASTIKAN** frontend dan backend sudah selesai dan berjalan lokal
3. **KETIK** kode dari 0 — jangan copy-paste, ketik sendiri
4. **DEPLOY** aplikasi ke platform yang dipilih
5. **TEST** aplikasi yang sudah di-deploy di internet
6. **SIMPAN** semua project di GitHub

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial01: REST API Integration
         → Hasil: Frontend yang terhubung ke backend API

STEP 2 → Tutorial02: Deployment
         → Hasil: Aplikasi fullstack yang bisa diakses online

STEP 3 → Tutorial03: Auth Fullstack
         → Hasil: Login/register yang работает di production

STEP 4 → Tutorial04: Security
         → Hasil: API yang aman dan terlindungi

STEP 5 → Push semua project ke GitHub
         → Bangun portfolio fullstack pertamamu
```

---

## Project yang Akan Kamu Bangun

### Fullstack Todo App
```
fullstack-todo/
├── frontend/               → React + Vite
│   ├── src/
│   │   ├── api/           → Axios instance
│   │   ├── context/       → Auth context
│   │   ├── pages/         → Login, Register, Dashboard
│   │   └── components/    → TodoList, TodoForm
│   └── vercel.json
├── backend/               → Express + PostgreSQL
│   ├── src/
│   │   ├── routes/        → auth, todos routes
│   │   ├── controllers/   → Business logic
│   │   ├── middleware/    → auth, rateLimit
│   │   └── models/        → Sequelize models
│   └── railway.json
└── docker-compose.yml      → Local development
```

### Checklist Feature Fullstack Todo App
```
□ Register dan login dengan JWT
□ Cookie-based authentication
□ Refresh token mechanism
□ Protected routes di frontend
□ CRUD todo dengan autentikasi
□ Frontend deploy di Vercel
□ Backend deploy di Railway
□ Database PostgreSQL di cloud
□ Environment variables terkonfigurasi
□ CORS dikonfigurasi dengan benar
□ Rate limiting aktif
□ Security headers (helmet.js)
```

---

## Tips

```
1. Pastikan backend running dengan baik sebelum deploy
2. Environment variables di Railway/Vercel berbeda dari lokal
3. CORS di backend harus mengizinkan domain Vercel
4. Cookie dengan httpOnly=true untuk security
5. Rate limiting di semua endpoint auth
6. Monitor aplikasi yang sudah di-deploy
7. Commit setiap selesai satu fitur, bukan di akhir semua
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan

# 03 — Latihan Deployment (Vercel, Railway, Environment Variables)

## Tujuan
Mendeploy aplikasi fullstack ke layanan cloud: frontend ke Vercel, backend ke Railway/Render, mengkonfigurasi environment variables, dan menghubungkan keduanya.

---

## Struktur Folder

```
03-latihan-deployment/
├── soal/
│   ├── 01-vercel-deploy.md
│   ├── 02-railway-render-deploy.md
│   ├── 03-database-production.md
│   └── 04-environment-vars.md
├── code/
│   ├── 01-vercel-deploy.js        (vercel.json config)
│   ├── 02-railway-render-deploy.js (Railway/Render config)
│   ├── 03-database-production.js   (PostgreSQL/SQLite prod setup)
│   └── 04-environment-vars.js      (dotenv + Vercel env vars)
└── README.md
```

---

## Daftar Latihan

| # | Judul | File Soal | File Code |
|---|-------|-----------|-----------|
| 01 | Deploy Frontend ke Vercel | `01-vercel-deploy.md` | `01-vercel-deploy.js` |
| 02 | Deploy Backend ke Railway/Render | `02-railway-render-deploy.md` | `02-railway-render-deploy.js` |
| 03 | Database di Production | `03-database-production.md` | `03-database-production.js` |
| 04 | Environment Variables | `04-environment-vars.md` | `04-environment-vars.js` |

---

## Prasyarat
- Akun **Vercel** (free) — https://vercel.com
- Akun **Railway** atau **Render** (free tier)
- Akun **GitHub** (repo sudah di-push)
- Repository sudah bersih (tidak ada `.env` di git)

---

## Alur Pengerjaan

1. **Vercel Deploy** — Buat project baru di vercel.com, import repo GitHub, deploy.
2. **Railway/Render Deploy** — Buat project baru, set environment variables, deploy.
3. **Update CORS** — Tambahkan URL production ke whitelist CORS backend.
4. **Update API Base URL** — Ganti `localhost:3001` ke URL production backend.
5. **Test** — Buka URL Vercel, coba register/login.

---

## Environment Variables yang Dibutuhkan

| Nama | Keterangan |
|------|------------|
| `DATABASE_URL` | Connection string PostgreSQL/SQLite |
| `JWT_SECRET` | Secret key untuk JWT (harus kuat & unik) |
| `FRONTEND_URL` | URL deployment frontend (untuk CORS) |
| `NODE_ENV` | `production` |

---

## Tips
- **Jangan** push `.env` ke GitHub — gunakan `.env.example` sebagai template.
- Di Vercel, environment variables disetting di dashboard: Settings → Environment Variables.
- Untuk Railway, bisa upload langsung atau dari GitHub repo.
- CORS error adalah masalah paling umum saat deployment — pastikan whitelist benar.

---

**Setelah selesai: lanjut ke [04-latihan-security](../04-latihan-security/)**

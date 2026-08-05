# Tutorial — LEVEL 4: Fullstack Integration

Folder ini berisi **panduan langkah demi langkah** untuk mengintegrasikan frontend dan backend, deployment, dan security. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-deploy-frontend-vercel.md` | Deploy ke Vercel | CI/CD, custom domain |
| 02 | `02-deploy-backend-railway.md` | Deploy ke Railway | Node.js production, logs |
| 03 | `03-database-production.md` | Setup Database Production | PostgreSQL di cloud |
| 04 | `04-environment-vars.md` | Environment Variables | .env, secrets management |
| 05 | `05-security-best-practices.md` | Security Checklist | HTTPS, CORS, rate limiting |

---

## Cara Pakai

1. **BACA** tutorial dari awal sampai akhir
2. **Pastikan** backend sudah selesai dan running dengan baik
3. **Gunakan** GitHub repo untuk deployment otomatis
4. **TEST** aplikasi yang sudah di-deploy
5. **MONITOR** menggunakan logs dan error tracking

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial 01: Deploy Frontend ke Vercel
         → Hasil: Website React yang bisa diakses online

STEP 2 → Tutorial 02: Deploy Backend ke Railway
         → Hasil: API yang bisa diakses online

STEP 3 → Tutorial 03: Setup Database Production
         → Hasil: Database yang terhubung ke API production

STEP 4 → Tutorial 04: Environment Variables
         → Hasil: API yang pakai secrets dengan aman

STEP 5 → Tutorial 05: Security Best Practices
         → Hasil: API yang aman dan terlindungi
```

---

## Struktur Project Fullstack

```
fullstack-app/
├── frontend/               → React app
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── backend/               → Express API
│   ├── src/
│   ├── package.json
│   └── .env → Tidak di-commit!
└── docker-compose.yml     → Untuk local development
```

---

## Checklist Deployment

```
□ Repository di GitHub untuk frontend dan backend
□ Vercel CLI terinstall dan terkoneksi ke GitHub
□ Railway/Render terkoneksi ke GitHub repo
□ Environment variables disetup dengan benar
□ Database production terkoneksi ke API
□ HTTPS aktif di domain kustom
□ CORS dikonfigurasi dengan benar
□ Rate limiting diaktifkan
□ Error monitoring aktif (Sentry atau alternatif)
□ CI/CD pipeline berjalan otomatis
□ Domain kustom disetup
```

---

## Tips

```
1. Selalu pakai .env untuk secrets — jangan pernah hardcode
2. Pastikan CORS hanya mengizinkan domain yang benar
3. Rate limiting untuk mencegah serangan brute force
4. Monitor logs di Railway/Render untuk debug
5. Setup error tracking dengan Sentry
6. CI/CD otomatis jalan setiap push ke main branch
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan

# Tutorial — LEVEL 4: Fullstack Integration

Folder ini berisi **panduan langkah demi langkah** untuk mengintegrasikan frontend dan backend, deployment, dan security. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01a | [01-fullstack-blog-app.md](01-fullstack-blog-app.md) | Blog app (React + API) | Service API, Context, halaman Home |
| 01b | [01-membuat-fullstack-app-pertama.md](01-membuat-fullstack-app-pertama.md) | React + Express + PostgreSQL | Backend, database, frontend, test |
| 02 | [02-auth-dan-deployment.md](02-auth-dan-deployment.md) | Auth aman + deployment | Cookie HttpOnly, CSRF, deploy ke Railway |

Dua tutorial bernomor 01 adalah jalur berbeda: 01a lebih ringkas (fokus
frontend), 01b membangun lengkap dengan database. Pilih salah satu, lalu lanjut
ke 02.

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
STEP 1 → Tutorial 01a atau 01b: bangun aplikasi fullstack pertama
STEP 2 → Tutorial 02: auth aman + deployment
STEP 3 → Panduan software/01: deploy ke Vercel dan Render
STEP 4 → Latihan di materi-praktikum/03-latihan-deployment dan 04-latihan-security
```

---

## Struktur Project Fullstack

```
fullstack-app/
├── frontend/               → React app
│   ├── src/
│   ├── package.json
│   └── vercel.json            → opsional; format terkini memakai "rewrites"
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

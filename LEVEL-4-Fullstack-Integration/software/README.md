# Software — LEVEL 4: Fullstack Integration

Folder ini berisi panduan install dan setup software untuk belajar fullstack
integration dan deployment.

---

## Daftar Panduan

| # | File | Isi | Keterangan |
|---|------|-----|------------|
| 01 | [01-vercel-render-deploy.md](01-vercel-render-deploy.md) | Vercel + Render | Deploy frontend dan backend |
| 02 | [02-postgresql-dan-mongodb-install.md](02-postgresql-dan-mongodb-install.md) | PostgreSQL + MongoDB | Install database lokal dan perintah dasar |

Panduan untuk Railway, database production, environment variables, dan security
tools belum punya file software sendiri. Untuk itu pakai latihan di
[03-latihan-deployment](../materi-praktikum/03-latihan-deployment/TUGAS.md) dan
[04-latihan-security](../materi-praktikum/04-latihan-security/TUGAS.md).

---

## Cara Pakai

1. Ikuti instruksi di tiap file dengan teliti.
2. Cek versi setelah install untuk memastikan berhasil.
3. Setup akun di platform deployment yang dipilih.
4. Dokumentasi platform sering berubah. Cocokkan langkah dengan dokumentasi
   resmi (contoh format `vercel.json` sudah berubah dari `builds`/`routes` ke
   `rewrites`).

---

## Verifikasi Install

```bash
node --version
npm --version
psql --version     # setelah PostgreSQL terpasang
```

---

**Lanjut ke:** [tutorial/](../tutorial/)

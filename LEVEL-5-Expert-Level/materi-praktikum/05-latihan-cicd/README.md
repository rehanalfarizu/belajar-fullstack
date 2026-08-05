# 05 — Latihan CI/CD

> Membangun pipeline continuous integration dan continuous deployment dengan GitHub Actions.

---

## Tujuan Pembelajaran

Setelah menyelesaikan semua soal di modul ini, mahasiswa diharapkan mampu:

1. Menulis **workflow file** YAML untuk GitHub Actions
2. Mengkonfigurasi pipeline **CI** yang menjalankan test secara otomatis pada setiap push/PR
3. Mengkonfigurasi pipeline **CD** yang men-deploy aplikasi ke cloud secara otomatis
4. Menggunakan **secrets dan environment** untuk konfigurasi yang aman
5. Memahami strategi **branching** dan bagaimanaCI/CD policies bekerja dalam tim

---

## Struktur Soal

| # | File Soal | Topik |
|---|-----------|------|
| 01 | `soal/01-github-actions-basics.md` | Dasar-dasar GitHub Actions workflow |
| 02 | `soal/02-deploy-pipeline.md` | Continuous deployment pipeline |

---

## Struktur Kode Template

| # | File Template | Deskripsi |
|---|---------------|-----------|
| 01 | `code/01-ci-workflow.yml` | CI workflow untuk React + Node.js app |
| 02 | `code/02-deploy-workflow.yml` | CD workflow dengan deployment automation |

---

## Tools yang Dibutuhkan

- Akun **GitHub** (free tier sudah cukup)
- **Git** configured dengan SSH key
- Akun cloud untuk deployment (pilihan: Vercel, Railway, Render, Fly.io)
- Docker (untuk deployment container)

---

## Prasyarat

- Penguasaan **Git** fundamental (branching, remote, PR workflow)
- Penguasaan Docker (LEVEL-5, modul 03)
- Pemahaman dasar tentang environment variables dan secrets management
- Pemahaman tentang SDLC (Software Development Lifecycle)

---

## Pipeline Stages

```
Push / PR
 │
   ▼
┌──────────────┐
│   Checkout   │ ── git clone, setup Node.js
└──────┬───────┘
 ▼
┌──────────────┐
│   Install │ ── npm ci / pip install
└──────┬───────┘
       ▼
┌──────────────┐
│    Build     │ ── npm run build
└──────┬───────┘
       ▼
┌──────────────┐
│    Test      │ ── npm test / playwright
└──────┬───────┘
       ▼
┌──────────────┐
│ Lint       │ ── eslint, prettier check
└──────┬───────┘
       ▼
  [PASS?]
 │     │
 YES NO ──▶ Notify (Slack/GitHub)
   │
   ▼
┌──────────────┐
│  Deploy      │ ── ke staging / production
└──────────────┘
```

---

## Langkah Pengerjaan

1. **Baca** `materi-teori/05-ci-cd/` untuk konsep CI/CD fundamentals
2. **Kerjakan** soal 01 untuk membangun pipeline CI yang solid
3. **Lanjut** ke soal 02 untuk menambahkan stage deployment otomatis
4. **Verifikasi** dengan membuka Pull Request dan mengamati workflow run
5. **Dokumentasikan** hasil deployment URL di README

---

**Estimasi Waktu:** 4–6 jam

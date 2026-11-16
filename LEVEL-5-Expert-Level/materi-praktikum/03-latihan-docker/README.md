# 03 — Latihan Docker

> Containerisasi aplikasi Fullstack dengan Docker dan Docker Compose.

---

## Tujuan Pembelajaran

Setelah menyelesaikan semua soal di modul ini, mahasiswa diharapkan mampu:

1. Menulis **Dockerfile** yang production-ready untuk aplikasi Node.js dan React
2. Menggunakan **multi-stage build** untuk menghasilkan image yang kecil dan aman
3. Mengkonfigurasi **Docker Compose** untuk arsitektur multi-container
4. Mengimplementasikan **hot-reload** dan volume mounting untuk development
5. Memahami perbedaan strategi volume mounting di environment development vs production

---

## Struktur Soal

| # | File Soal | Topik |
|---|-----------|------|
| 01 | `soal/01-dockerfile-basics.md` | Dasar-dasar Dockerfile |
| 02 | `soal/02-multi-stage-build.md` | Multi-stage build untuk frontend |
| 03 | `soal/03-volume-networking.md` | Volume, networking, dan environment variables |
| 04 | `soal/04-docker-compose.md` | Orchestrasi multi-container dengan Docker Compose |

---

## Struktur Kode Template

| # | File Template | Deskripsi |
|---|---------------|-----------|
| 01 | `code/01-Dockerfile` | Kerangka Dockerfile Node.js (isi sendiri) |
| 02 | `code/02-Dockerfile` | Kerangka multi-stage build React + Nginx |
| 03 | `code/03-dockerignore` | Kerangka .dockerignore (ganti nama jadi `.dockerignore`) |
| 04 | `code/04-docker-compose.yml` | Kerangka Docker Compose untuk fullstack app (TODO) |
| - | `code/nginx.conf` | Kerangka konfigurasi Nginx untuk SPA (TODO) |

---

## Tools yang Dibutuhkan

- **Docker Desktop** (versi terbaru) (atau Docker Engine + Docker Compose v2)
- **Node.js** 24 LTS (untuk development lokal)
- **Git Bash / WSL2** (untuk Windows users)

---

## Prasyarat

- Penguasaan command line dasar (terminal, file system)
- Pemahaman dasar tentang HTTP server dan konsep client-server
- Familiar dengan `package.json` dan `npm install`

---

## Arsitektur Aplikasi yang Digunakan

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   React App   │────▶│  Nginx Proxy │────▶│  Node.js API │
│ (Port 3000)  │     │  (Port 80)   │     │  (Port 5000) │
└──────────────┘     └──────────────┘     └──────────────┘
                                                   │
                                             ┌──────────────┐
                                             │  PostgreSQL  │
                                             │  (Port 5432) │
                                             └──────────────┘
```

---

## Langkah Pengerjaan

1. **Baca** `../../materi-teori/03-docker-containerization/` untuk dasar containerization
2. **Kerjakan** soal 01 sebagai fondasi (Dockerfile dasar)
3. **Lanjut** ke soal 02–03 untuk meningkatkan efisiensi image
4. **Selesaikan** soal 04 untuk orchestrasi penuh dengan Docker Compose
5. **Verifikasi** setiap perubahan dengan `docker build` dan `docker compose`

---

**Estimasi Waktu:** 6–8 jam

Kunci jawaban: [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka setelah mencoba sendiri.

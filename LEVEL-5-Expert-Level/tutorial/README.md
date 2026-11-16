# Tutorial — LEVEL 5: Expert Level

Folder ini berisi **panduan langkah demi langkah** untuk topik-topik expert — Docker, CI/CD, dan WebSocket. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-docker-containerisasi.md` | Dockerize app fullstack | Dockerfile, multi-stage build, Compose |
| 01b | `01-docker-dan-ci-cd.md` | Docker ringkas + CI/CD | Dockerfile dasar, Compose, GitHub Actions |
| 02 | `02-websocket-real-time-chat.md` | Chat real-time | Socket.IO server dan klien React |

Dua file bernomor `01` itu tidak kembar: yang pertama mendalami Docker, yang
kedua merangkum Docker lalu masuk ke CI/CD. Untuk topik testing dan Lighthouse
belum ada tutorial; pakai
[software/02-testing-dan-ci-cd.md](../software/02-testing-dan-ci-cd.md) dan soal
di [materi-praktikum](../materi-praktikum/).

---

## Cara Pakai

1. **BACA** tutorial dari awal sampai akhir
2. **PASTIKAN** project sudah berjalan dengan baik sebelumnya
3. **KETIK** kode dari 0 — jangan copy-paste
4. **JALANKAN** hasilnya dan lihat apakah sesuai
5. **SIMPAN** semua di GitHub dengan CI/CD pipeline

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial 01: Docker (pilih 01-docker-containerisasi.md)
         → Hasil: aplikasi fullstack dalam Docker container

STEP 2 → Tutorial 01b: Docker dan CI/CD
         → Hasil: GitHub Actions yang menjalankan build dan test

STEP 3 → Tutorial 02: WebSocket real-time chat
         → Hasil: chat real-time dengan Socket.IO
```

---

## Struktur Project Expert

```
expert-app/
├── frontend/
│   ├── src/
│   ├── tests/
│   │   ├── unit/
│   │   ├── component/
│   │   └── e2e/
│   ├── Dockerfile
│   └── docker-compose.yml
├── backend/
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
└── docker-compose.yml      → Orchestrate semua services
```

---

## Checklist Kemampuan Expert

```
□ Buat Dockerfile untuk frontend dan backend
□ Setup docker-compose untuk development
□ Tulis unit test dengan Jest
□ Tulis component test dengan React Testing Library
□ Tulis E2E test dengan Playwright
□ Setup GitHub Actions CI/CD pipeline
□ Otomatis run test setiap push
□ Otomatis deploy setiap merge ke main
□ Audit performance dengan Lighthouse
□ Optimasi bundle size dan loading time
□ Implementasi WebSocket untuk real-time features
□ Monitoring aplikasi di production
```

---

## Tips

```
1. Test harus cepat — target < 5 menit untuk semua test
2. Coverage bukan segalanya — fokus pada user flows
3. Docker multi-stage build untuk production image kecil
4. Lighthouse score 90+ untuk Core Web Vitals
5. CI/CD harus fail-fast kalau ada test yang gagal
6. Monitoring di production lebih penting dari optimization
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan

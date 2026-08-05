# Tutorial — LEVEL 5: Expert Level

Folder ini berisi **panduan langkah demi langkah** untuk topik-topik expert — performance optimization, testing, Docker, WebSocket, dan CI/CD. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-docker-containerize.md` | Dockerize App | Dockerfile, docker-compose, multi-stage build |
| 02 | `02-unit-testing-jest.md` | Unit Testing | Jest, mock, coverage |
| 03 | `03-react-testing.md` | Component Testing | React Testing Library, user interactions |
| 04 | `04-e2e-testing-playwright.md` | E2E Testing | Playwright, assertions, CI integration |
| 05 | `05-github-actions-cicd.md` | CI/CD Pipeline | GitHub Actions, automate testing& deploy |
| 06 | `06-lighthouse-optimization.md` | Performance | Lighthouse, Core Web Vitals, bundle optimization |

---

## Cara Pakai

1. **BACA** tutorial dari awal sampai akhir
2. **PASTIKAN** project sudah berjalan dengan baik sebelumnya
3. **KETIK** kode dari 0 — jangan copy-paste
4. **JALANKAN** test dan lihat hasilnya
5. **OPTIMASI** berdasarkan hasil audit
6. **SIMPAN** semua di GitHub dengan CI/CD pipeline

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial 01: Docker Containerize
         → Hasil: Aplikasi fullstack dalam Docker container

STEP 2 → Tutorial 02: Unit Testing
         → Hasil: Unit test untuk semua fungsi kritis

STEP 3 → Tutorial 03: Component Testing
         → Hasil: Component test untuk React components

STEP 4 → Tutorial 04: E2E Testing
         → Hasil: End-to-end test untuk user flows

STEP 5 → Tutorial 05: CI/CD Pipeline
         → Hasil: GitHub Actions yang otomatis test dan deploy

STEP 6 → Tutorial 06: Performance Optimization
         → Hasil: Aplikasi dengan Lighthouse score 90+
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

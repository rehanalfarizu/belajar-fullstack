# Materi Tutorial — LEVEL 5: Expert Level

Folder ini berisi **panduan langkah demi langkah** untuk topik-topik expert — performance optimization, testing, containerization, WebSocket, dan CI/CD. Tutorial di sini berbeda dari materi-teori — fokusnya bukan penjelasan konsep, tapi **praktik langsung** di mana kamu akan membuat sesuatu yang production-ready.

---

## Isi Folder

Tutorial yang tersedia di folder ini:

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-portal-dan-refs.md` | Portal Modal | React Portal, forwardRef, useImperativeHandle |
| 01 | `01-error-boundary.md` | Error Boundary | ErrorBoundary component, error recovery |
| 02 | `02-docker-fullstack.md` | Docker Fullstack | Multi-container app, docker-compose |
| 02 | `02-code-splitting.md` | Code Splitting | React.lazy, Suspense, dynamic import |
| 03 | `03-testing-strategy.md` | Testing Strategy | Unit, integration, E2E pyramid |
| 03 | `03-jest-unit-testing.md` | Jest Unit Test | Mock, spy, coverage report |
| 04 | `04-playwright-e2e.md` | Playwright E2E | Browser automation, CI integration |
| 04 | `04-websocket-real-time.md` | Real-time App | Socket.io, rooms, broadcasting |
| 05 | `05-github-actions-cicd.md` | CI/CD Pipeline | GitHub Actions, matrix build, deployment |
| 05 | `05-lighthouse-performa.md` | Lighthouse Audit | Core Web Vitals, bundle analysis |

---

## Cara Pakai

1. **BACA** tutorial yang kamu mau kerjakan dari awal sampai akhir
2. **PASTIKAN** project sudah berjalan dengan baik sebelumnya
3. **KETIK** kode dari 0 — jangan copy-paste, ketik sendiri
4. **JALANKAN** dan lihat hasilnya
5. **OPTIMASI** berdasarkan hasil audit
6. **SIMPAN** semua di GitHub dengan CI/CD pipeline

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial01: Advanced React Patterns
         → Hasil: Component yang robust dengan error handling

STEP 2 → Tutorial02: Docker& Performance
         → Hasil: App di container + loading yang cepat

STEP 3 → Tutorial03: Testing Strategy
         → Hasil: Test coverage yang baik

STEP 4 → Tutorial04: E2E & Real-time
         → Hasil: App dengan real-time collaboration

STEP 5 → Tutorial05: CI/CD & Monitoring
         → Hasil: Pipeline otomatis + monitoring production

STEP 6 → Final Project
         → Bangun portfolio fullstack yang production-ready
```

---

## Project yang Akan Kamu Bangun

### Real-time Chat App
```
chat-app/
├── frontend/               → React + Socket.io client
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatRoom.jsx
│   │   │   ├── MessageList.jsx
│   │   │   └── ChatInput.jsx
│   │   └── hooks/
│   │       └── useSocket.js
│   └── Dockerfile
├── backend/               → Express + Socket.io
│   ├── src/
│   │   ├── index.js        → Server + Socket.io
│   │   └── handlers/       → Event handlers
│   └── Dockerfile
├── docker-compose.yml      → Orchestrate frontend + backend
└── .github/
    └── workflows/
        └── ci.yml         → CI pipeline
```

### Checklist Feature Chat App
```
□ Real-time messaging dengan Socket.io
□ Room-based chat (bisa masuk room tertentu)
□ Typing indicator
□ Online/offline status
□ Message persistence ke database
□ Docker containerization
□ Unit test untuk server handlers
□ E2E test untuk send message flow
□ CI/CD pipeline dengan GitHub Actions
□ Lighthouse performance score 90+
```

---

## Tips

```
1. Mulai dari fitur paling sederhana, baru tambahkan kompleksitas
2. Test harus cepat — target < 5 menit untuk semua test
3. Docker multi-stage build untuk production image kecil
4. Lighthouse score 90+ untuk Core Web Vitals
5. CI/CD harus fail-fast kalau ada test yang gagal
6. Monitoring di production lebih penting dari optimization
7. WebSocket butuh special handling untuk reconnection
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan

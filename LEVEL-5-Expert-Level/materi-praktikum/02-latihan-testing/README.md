# 02 — Latihan Testing

> Pengujian otomatis dengan Jest, React Testing Library, dan Playwright.

---

## Tujuan Pembelajaran

Setelah menyelesaikan semua soal di modul ini, mahasiswa diharapkan mampu:

1. MenjConfigurer **Jest** untuk proyek React/Vite dengan benar
2. Menulis **unit test** untuk pure functions dan Redux slices
3. Menulis **integration test** untuk komponen React dengan React Testing Library
4. Melakukan **end-to-end testing** dengan Playwright
5. Mengintegrasikan pipeline testing ke dalam **CI/CD** (LEVEL-5 modul 05)

---

## Struktur Soal

| # | File Soal | Topik |
|---|-----------|------|
| 01 | `soal/01-unit-testing.md` | Setup Jest dan penulisan unit test |
| 02 | `soal/02-react-testing.md` | Testing komponen React |
| 03 | `soal/03-integration-testing.md` | Integration testing aplikasi |
| 04 | `soal/04-end-to-end-testing.md` | E2E testing dengan Playwright |

---

## Struktur Kode Template

| # | File Template | Deskripsi |
|---|---------------|-----------|
| 01 | `code/01-math.test.js` | Unit test untuk pure functions |
| 02 | `code/02-slice.test.js` | Unit test untuk Redux slice |
| 03 | `code/03-button.test.jsx` | React Testing Library untuk komponen |
| 04 | `code/04-playwright.spec.js` | E2E test dengan Playwright |

---

## Tools yang Dibutuhkan

- **Node.js** 24 LTS
- **Jest** v29+
- **@testing-library/react**
- **@testing-library/jest-dom**
- **Playwright** v1.40+

---

## Prasyarat

- Penguasaan React (LEVEL-3)
- Penguasaan Redux Toolkit (LEVEL-5, modul 02 — Redux)
- Pemahaman dasar tentang konsep testing: arrange-act-assert

---

## Konvensi Penulisan Test

Gunakan pola **AAA (Arrange-Act-Assert)**:

```js
// Arrange: setup kondisi awal
// Act: eksekusi fungsi/komponen yang diuji
// Assert: verifikasi hasil sesuai ekspektasi
```

Dokumentasikan setiap test case dengan format:
- **Given**: kondisi awal
- **When**: aksi yang dilakukan
- **Then**: hasil yang diharapkan

---

## Langkah Pengerjaan

1. **Baca** `materi-teori/03-testing/` untuk dasar teori
2. **Kerjakan** soal01–03 secara berurutan (unit → integration)
3. **Kerjakan** soal 04 sebagai penutup (E2E)
4. **Jalankan** `npm test` dan pastikan semua test pass

---

**Estimasi Waktu:** 8–10 jam

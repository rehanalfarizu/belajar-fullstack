# 01 — Latihan Performa Web

> Analisis dan optimasi performa aplikasi React modern.

---

## Tujuan Pembelajaran

Setelah menyelesaikan semua soal di modul ini, mahasiswa diharapkan mampu:

1. Menggunakan **Lighthouse** untuk mengaudit performa aplikasi web secara sistematis
2. Menganalisis **Core Web Vitals** (LCP, FID/INP, CLS) dan mengidentifikasi bottleneck
3. Mengkonfigurasi **Vite** untuk strategi chunking dan tree-shaking yang optimal
4. Mengimplementasikan **lazy loading** dan **code splitting** untuk mengurangi bundle size
5. Mengoptimasi **asset gambar** dengan format modern dan teknik loading yang tepat

---

## Struktur Soal

| # | File Soal | Topik |
|---|-----------|------|
| 01 | `soal/01-lighthouse-audit.md` | Audit performa dengan Lighthouse |
| 02 | `soal/02-core-web-vitals.md` | Analisis Core Web Vitals |
| 03 | `soal/03-bundle-optimization.md` | Strategi optimasi bundle |
| 04 | `soal/04-bundle-optimization.md` | Optimasi asset gambar |

---

## Struktur Kode Template

| # | File Template | Deskripsi |
|---|---------------|-----------|
| 01 | `code/01-vite-config.js` | Konfigurasi Vite dengan chunking strategy |
| 02 | `code/02-code-splitting.jsx` | Implementasi lazy loading |
| 03 | `code/03-image-component.jsx` | Komponen gambar dengan lazy loading |
| 04 | `code/04-image-optimization.jsx` | Optimasi format dan ukuran gambar |

---

## Tools yang Dibutuhkan

- **Node.js** 24 LTS
- **Vite** v5+
- **Google Chrome** (untuk Lighthouse)
- **@lhci/cli** atau ekstensi Lighthouse di Chrome DevTools

---

## Prasyarat

- Penguasaan React fundamental (LEVEL-3)
- Pemahaman dasar tentang browser rendering pipeline
- Familiar dengan npm/yarn/pnpm

---

## Langkah Pengerjaan

1. **Baca** materi teori terkait di `../../materi-teori/`
2. **Kerjakan** soal secara berurutan
3. **Jalankan** audit Lighthouse sebelum dan sesudah optimasi
4. **Dokumentasikan** hasil perbaikan di setiap soal

---

**Estimasi Waktu:** 6–8 jam

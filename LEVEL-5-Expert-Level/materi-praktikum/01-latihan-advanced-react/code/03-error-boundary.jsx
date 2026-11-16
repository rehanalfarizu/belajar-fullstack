// ============================================================
// SOAL 03 — Error Boundary (kerangka)
// ============================================================
// Tulis komponennya sendiri di proyek latihanmu, mengikuti daftar Syarat
// di soal/03-error-boundary.md. File ini hanya kerangka dan petunjuk.
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

import React from "react";

// TODO(human): Class component ErrorBoundary.
//   - Gunakan static getDerivedStateFromError untuk mengubah state.
//   - Gunakan componentDidCatch untuk melaporkan error (console dulu).
//   - Render UI cadangan (fallback) dengan tombol "Coba lagi" yang mereset state.
//   Pertanyaan: kenapa error boundary harus class component? Error apa saja
//   yang TIDAK ditangkap (event handler, async, SSR)?

// TODO(human): Komponen yang sengaja error saat render, dan satu yang error
//   di event handler. Buktikan bedanya: mana yang ditangkap boundary?

// TODO(human): Pasang boundary di beberapa tingkat (seluruh app vs per widget).
//   Selesai kalau: satu widget rusak tidak menjatuhkan halaman lain, dan
//   tombol "Coba lagi" memulihkannya.

export default function App() {
  return <p>Belum dibuat</p>;
}

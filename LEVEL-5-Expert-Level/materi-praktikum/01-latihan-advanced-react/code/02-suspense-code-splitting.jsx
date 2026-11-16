// ============================================================
// SOAL 02 — Suspense dan Code Splitting (kerangka)
// ============================================================
// Tulis komponennya sendiri di proyek latihanmu, mengikuti daftar Syarat
// di soal/02-suspense-code-splitting.md. File ini hanya kerangka dan petunjuk.
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

import React from "react";

// TODO(human): Halaman (Home, About, Dashboard) dimuat malas dengan React.lazy.
//   Petunjuk: lazy menerima fungsi yang mengembalikan import() dinamis, dan
//   modulnya harus punya default export.

// TODO(human): Komponen Loading sebagai fallback Suspense.

// TODO(human): Pasang Suspense di sekitar rute. Putuskan sendiri: satu
//   boundary untuk semua rute, atau satu per rute? Apa bedanya bagi user
//   saat berpindah halaman?

// TODO(human): Preload. Muat halaman lebih awal saat user hover/focus pada
//   tautan menu, supaya klik terasa instan.
//   Petunjuk: import() yang dipanggil lebih awal sudah menaruh modul di cache.

// TODO(human): Buktikan dengan DevTools tab Network: file JS tiap halaman
//   baru diunduh saat dibutuhkan.
//   Selesai kalau: build menghasilkan chunk terpisah per halaman
//   (lihat output `vite build`).

export default function App() {
  return <p>Belum dibuat</p>;
}

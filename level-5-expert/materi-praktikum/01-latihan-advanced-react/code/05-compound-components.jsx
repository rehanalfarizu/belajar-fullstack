// ============================================================
// SOAL 05 — Compound Components (Tabs) (kerangka)
// ============================================================
// Tulis komponennya sendiri di proyek latihanmu, mengikuti daftar Syarat
// di soal/05-compound-components.md. File ini hanya kerangka dan petunjuk.
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

import React from "react";

// TODO(human): Tulis dulu CARA PAKAI di App (JSX): <Tabs>, <TabList>, <Tab>,
//   <TabPanel>. Rancang API dari sisi pengguna komponen, baru implementasinya.

// TODO(human): TabsContext berisi tab terpilih dan fungsi untuk memilihnya.
//   Buat hook kecil untuk membaca context, dan lempar error yang jelas kalau
//   dipakai di luar <Tabs>.

// TODO(human): Tabs (provider), TabList, Tab, TabPanel.
//   - Tab menandai dirinya terpilih dan bisa diklik.
//   - TabPanel hanya tampil saat tab-nya terpilih.
//   - Aksesibilitas: role tablist/tab/tabpanel, aria-selected, navigasi
//     panah kiri/kanan.
//   Pertanyaan: apa untungnya compound components dibanding satu komponen
//   dengan prop `tabs={[...]}`? Apa risikonya ("implicit coupling")?

// Selesai kalau: urutan dan jumlah tab bisa diubah hanya lewat JSX, tanpa
//   menyentuh kode Tabs, dan keyboard bisa dipakai.

export default function App() {
  return <p>Belum dibuat</p>;
}

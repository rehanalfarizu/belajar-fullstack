// ============================================================
// SOAL 01 — Portal dan Modal (kerangka)
// ============================================================
// Tulis komponennya sendiri di proyek latihanmu, mengikuti daftar Syarat
// di soal/01-portal-modal.md. File ini hanya kerangka dan petunjuk.
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

import React from "react";

// TODO(human): Komponen Modal({ isOpen, onClose, title, children }).
//   - Render ke document.body lewat portal (cari createPortal di react.dev).
//   - Klik backdrop menutup modal, tapi klik DI DALAM isi modal tidak.
//     Petunjuk: bagaimana event "naik" (bubble) lewat pohon React, termasuk
//     lewat portal?
//   - Tombol Escape menutup modal. Ingat membersihkan event listener.
//   - Fokus berpindah ke dalam modal saat terbuka dan kembali ke pemicu saat
//     tertutup (focus trap dan restore).
//   - Aksesibilitas: role="dialog", aria-modal, aria-labelledby ke judul.
//   Selesai kalau: modal tetap tampil benar di dalam parent ber-overflow
//   hidden, Tab tidak keluar dari modal, dan Escape berfungsi.

// TODO(human): Satu use case lain dengan portal (Toast atau Tooltip).
//   Pertanyaan: kenapa portal diperlukan untuk dropdown di dalam parent yang
//   bisa di-scroll?

export default function App() {
  // TODO(human): Demo: tombol pembuka modal dan satu Toast.
  return <p>Belum dibuat</p>;
}

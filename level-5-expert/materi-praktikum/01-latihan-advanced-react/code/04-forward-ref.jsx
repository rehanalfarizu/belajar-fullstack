// ============================================================
// SOAL 04 — Ref sebagai prop (React 19) dan forwardRef (legacy) (kerangka)
// ============================================================
// Tulis komponennya sendiri di proyek latihanmu, mengikuti daftar Syarat
// di soal/04-forward-ref.md. File ini hanya kerangka dan petunjuk.
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

import React from "react";

// TODO(human): TextInput gaya React 19: menerima `ref` sebagai prop biasa
//   dan meneruskannya ke elemen <input>.

// TODO(human): Gunakan useImperativeHandle agar parent hanya bisa memanggil
//   `focus()` dan `clear()`, bukan mengakses seluruh DOM node.
//   Pertanyaan: kenapa mengekspos API sempit lebih aman daripada DOM penuh?

// TODO(human): TextInputLegacy dengan React.forwardRef (gaya React 18).
//   Jelaskan di komentar kenapa pola ini dulu diperlukan.

// TODO(human): Demo: auto-focus input saat mount, dan tombol yang memanggil
//   clear() lalu focus().
//   Selesai kalau: parent tidak bisa (dan tidak perlu) menyentuh DOM node
//   selain lewat focus() dan clear().

export default function App() {
  return <p>Belum dibuat</p>;
}

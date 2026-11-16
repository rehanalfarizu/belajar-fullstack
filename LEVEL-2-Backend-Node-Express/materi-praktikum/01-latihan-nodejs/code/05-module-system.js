// ============================================================
// SOAL 05 — MODULE SYSTEM
// ============================================================
// Soal: soal/05-module-system.md
//
// File ini adalah lembar kerja dan catatanmu. Modul-modulnya kamu
// buat sendiri sebagai file terpisah di folder 05-modules/ (di samping
// salinan starter ini, di folder latihan-saya/ milikmu):
//
//   05-modules/
//   ├── math.js       (add, subtract, divide)
//   ├── utils.js      (capitalize)
//   └── index.js      (require math dan utils, lalu cetak hasilnya)
//
// ============================================================
// TODO(human): CommonJS — math.js
// ============================================================
// Buat math.js dengan fungsi add, subtract, divide, lalu export.
// Coba dua gaya export: module.exports = { ... } dan module.exports.nama = ...
// Selesai kalau: require("./math") dari index.js mengembalikan ketiga fungsi.
//
// ============================================================
// TODO(human): CommonJS — utils.js dan index.js
// ============================================================
// utils.js: fungsi capitalize("andi") -> "Andi".
// index.js: require kedua modul (satu pakai destructuring, satu pakai objek utuh).
// Harapan output:
//   math.add(5, 3)         -> 8
//   math.divide(10, 2)     -> 5
//   utils.capitalize("andi") -> "Andi"
// Selesai kalau: `node index.js` dari folder 05-modules/ mencetak tiga baris di atas.
//
// ============================================================
// TODO(human): Circular dependency
// ============================================================
// Buat a.js dan b.js yang saling require di baris paling atas, lalu jalankan.
// Amati: nilai apa yang sampai ke salah satu modul, dan kenapa?
// Tulis penjelasannya dengan kata-katamu sendiri di komentar di bawah,
// lalu cari cara memperbaikinya tanpa menghapus salah satu require.
// Petunjuk: kapan tepatnya require() dijalankan, dan kapan module.exports terisi?
//
// ============================================================
// TODO(human): ES Modules
// ============================================================
// Buat math.mjs (export const add + export default) dan index.mjs (import).
// Jalankan: node index.mjs
// Selesai kalau: kamu bisa menjelaskan beda `import { add }` dan `import math`.
//
// ============================================================
// CATATAN SAYA
// ============================================================
// (tulis penjelasan circular dependency di sini)

console.log("=== Module System ===");
console.log("Kerjakan TODO(human) di atas, lalu jalankan index.js dari 05-modules/.");

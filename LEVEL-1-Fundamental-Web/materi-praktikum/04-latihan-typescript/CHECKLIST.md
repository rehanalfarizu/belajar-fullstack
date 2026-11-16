# CHECKLIST — Latihan TypeScript

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda `interface`, `type`, dan union type (`"draft" | "published"`)
- [ ] Aku paham beda `unknown` dan `any`, dan kenapa `unknown` lebih aman
- [ ] Aku paham apa itu narrowing dan type guard (`value is Product`)
- [ ] Aku paham `Result<T>` sebagai cara mengembalikan sukses/gagal tanpa `throw`
- [ ] Aku bisa menjelaskan generic (`<T>`) dengan contoh sendiri
- [ ] Aku paham fungsi `assertNever` dan kenapa `tsc` protes kalau ada `case` yang terlewat
- [ ] Aku paham bahwa tipe TypeScript **hilang saat program jalan**. Data dari luar (JSON, form, API) tetap harus dicek di runtime.

---

## Kemampuan Praktis

- [ ] Aku bisa menulis type guard yang memvalidasi object dari `unknown` tanpa `any`
- [ ] Aku bisa menulis parser yang melaporkan indeks item yang invalid
- [ ] Aku bisa menulis fungsi generic yang tidak memutasi input (`readonly T[]`)
- [ ] Aku bisa menjalankan `tsc --strict --noEmit` dan memperbaiki error dari pesannya
- [ ] Aku bisa menulis test dengan `node:test` untuk 6 kasus wajib dan semuanya lulus
- [ ] Aku bisa menjelaskan keputusanku soal harga nol dan nama kosong, beserta di layer mana aturan itu ditaruh

---

## Kebiasaan Baik

- [ ] Aku menjalankan `tsc` setelah setiap fungsi, bukan di akhir saja
- [ ] Aku membaca tooltip tipe di editor sebelum menebak-nebak
- [ ] Aku tidak pernah memakai `any` atau `as` untuk "membungkam" error
- [ ] Aku memvalidasi data dari luar di batas sistem (saat data masuk), bukan di tengah-tengah logika

Poin "tipe hilang saat runtime" adalah alasan validasi server tetap wajib. Baca
[Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md); bagian Zod di sana mirip
dengan `isProduct` yang kamu tulis.

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan Node.js](../../../LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/README.md).
Belum mengerjakan refactor kasir? Kerjakan dulu
[Latihan Kode Rapi](../../../LEVEL-0-Software-Engineering/materi-praktikum/02-latihan-kode-rapi/README.md).

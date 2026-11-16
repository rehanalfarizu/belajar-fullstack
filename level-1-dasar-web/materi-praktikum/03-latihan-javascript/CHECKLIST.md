# CHECKLIST — Latihan JavaScript

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku paham beda `let` dan `const`, dan tipe data primitif (number, string, boolean, undefined, null)
- [ ] Aku bisa menjelaskan kenapa `"5" + 3` hasilnya `"53"` dan cara mencegahnya
- [ ] Aku paham kenapa urutan pengecekan di FizzBuzz penting
- [ ] Aku tahu method array mana yang mengubah array asli (`push`, `sort`, `splice`) dan mana yang tidak (`map`, `filter`)
- [ ] Aku bisa menjelaskan destructuring, spread, optional chaining (`?.`), dan nullish coalescing (`??`)
- [ ] Aku paham fungsi bisa dikirim sebagai argumen (callback) dan apa itu closure
- [ ] Aku paham beda kode sync dan async, dan kenapa `await` hanya bisa di dalam fungsi `async`
- [ ] Aku bisa menjelaskan `class`, `constructor`, `extends`, `super`, dan `static`
- [ ] Aku paham beda `throw`, `try/catch/finally`, dan kenapa custom error class berguna

---

## Kemampuan Praktis

- [ ] Aku bisa mengubah input string jadi number dan menolak input yang bukan angka (`isNaN`)
- [ ] Aku bisa menulis percabangan dan loop tanpa melihat contoh
- [ ] Aku bisa memakai `map`, `filter`, `find`, `reduce`, `some`, `every` untuk mengolah data
- [ ] Aku bisa membuat program CLI interaktif dengan `readline` yang tidak crash saat input salah
- [ ] Aku bisa menulis `myMap` atau `myFilter` versi sendiri
- [ ] Aku bisa mengambil data dari API dengan `fetch` dan menangani error jaringan
- [ ] Aku bisa membuat class dengan inheritance dan meng-override method parent
- [ ] Aku bisa membedakan tipe error dengan `instanceof` dan menampilkan pesan yang berbeda
- [ ] Aku bisa memakai `console.log` atau debugger untuk menemukan baris yang salah

---

## Kebiasaan Baik

- [ ] Aku menulis pseudocode dulu sebelum kode
- [ ] Aku menebak output sebelum menjalankan program
- [ ] Aku selalu mencoba input aneh (kosong, huruf, negatif, nol) setelah program jalan
- [ ] Aku memakai `===`, bukan `==`
- [ ] Aku tidak pernah mempercayai input dari user. Semua input dicek dulu sebelum dipakai.
- [ ] Kalau nanti menampilkan input user di halaman web, aku memakai `textContent`, bukan `innerHTML`

Dua poin terakhir adalah awal dari keamanan web. Lanjutannya ada di
[Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md) dan
[XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan TypeScript](../04-latihan-typescript/README.md). Setelah itu, kerjakan juga soal refactor di
[Latihan Kode Rapi](../../../level-0-dasar-engineering/materi-praktikum/02-latihan-kode-rapi/README.md)
(jadwalnya Minggu 7, setelah semua latihan JavaScript selesai).

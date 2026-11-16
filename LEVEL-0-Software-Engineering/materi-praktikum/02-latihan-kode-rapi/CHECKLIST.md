# CHECKLIST — Latihan Kode Rapi

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan arti refactor: mengubah struktur tanpa mengubah perilaku
- [ ] Aku paham kenapa output harus dibuktikan identik (`diff`), bukan cuma "kelihatannya sama"
- [ ] Aku paham apa itu angka ajaib dan kenapa konstanta bernama lebih baik
- [ ] Aku paham prinsip satu fungsi satu tugas
- [ ] Aku paham kenapa hitungan dipisah dari tampilan (`console.log`), dan apa untungnya untuk testing
- [ ] Aku bisa menjelaskan kenapa urutan "diskon member dulu, baru cek promo" mengubah hasil
- [ ] Aku paham apa itu guard clause dan kapan membuat kode lebih mudah dibaca

---

## Kemampuan Praktis

- [ ] Aku bisa menemukan aturan bisnis yang tersembunyi di kode berantakan
- [ ] Aku bisa mengganti nama variabel dan properti jadi nama yang menjelaskan isinya
- [ ] Aku bisa mengganti `var` jadi `const`/`let` dan `==` jadi `===` tanpa mengubah hasil
- [ ] Aku bisa memecah kode panjang jadi fungsi kecil dengan parameter dan `return` yang jelas
- [ ] Aku bisa memakai `diff` untuk membuktikan perilaku tidak berubah
- [ ] Aku bisa menulis test dengan `node:test`, termasuk test nilai batas
- [ ] Aku bisa memakai `git diff` dan commit kecil untuk menemukan langkah yang merusak

---

## Kebiasaan Baik

- [ ] Aku menyimpan output asli sebelum mulai mengubah kode
- [ ] Aku commit setiap kali satu langkah refactor lolos `diff`
- [ ] Aku tidak menambah fitur baru saat sedang refactor
- [ ] Aku memformat kode dengan Prettier sebelum commit
- [ ] Aku menulis test untuk nilai batas (tepat di angka ambang), bukan cuma angka "aman"

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke jalur backend
(Minggu 8): [Latihan Node.js](../../../LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/README.md).

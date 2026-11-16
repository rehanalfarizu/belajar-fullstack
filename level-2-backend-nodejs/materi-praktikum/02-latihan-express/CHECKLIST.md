# CHECKLIST — Latihan Express

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan alur request di Express: masuk, lewat middleware berurutan, sampai ke handler
- [ ] Aku paham fungsi `next()` dan apa yang terjadi kalau lupa dipanggil
- [ ] Aku paham beda `req.params`, `req.query`, dan `req.body`
- [ ] Aku paham kenapa `express.json()` dibutuhkan untuk membaca body JSON
- [ ] Aku paham kenapa error handler punya 4 parameter dan harus dipasang paling akhir
- [ ] Aku bisa menjelaskan konvensi REST: method mana untuk apa, dan arti status `200`, `201`, `204`, `400`, `404`

---

## Kemampuan Praktis

- [ ] Aku bisa membuat server Express dari file kosong
- [ ] Aku bisa membuat middleware logger, cek header, dan cek token, lalu memasangnya hanya di route tertentu
- [ ] Aku bisa memvalidasi body (field wajib, format email, angka positif) dan membalas `400` dengan pesan jelas
- [ ] Aku bisa membuat custom error class dan membedakannya di error handler dengan `instanceof`
- [ ] Aku bisa membuat CRUD lengkap untuk satu resource dengan status code yang tepat
- [ ] Aku bisa menguji semua endpoint dengan `curl -i` dan membaca status code-nya

---

## Kebiasaan Baik

- [ ] Aku menulis kontrak endpoint (method, path, status, body) sebelum menulis kode
- [ ] Aku selalu `return` setelah mengirim respons error
- [ ] Aku menguji kasus gagal, bukan cuma kasus sukses
- [ ] Aku memvalidasi semua input di server, walaupun nanti frontend juga memvalidasi
- [ ] Pesan error ke client tidak menampilkan stack trace atau detail internal; detailnya cukup di log server

Dua poin terakhir dibahas lebih dalam di [Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md)
dan [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan Database](../03-latihan-database/README.md).

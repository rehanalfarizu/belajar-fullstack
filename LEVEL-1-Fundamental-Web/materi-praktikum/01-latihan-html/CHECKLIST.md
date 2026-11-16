# CHECKLIST — Latihan HTML

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan kerangka dokumen HTML (DOCTYPE, `html lang`, `head`, `body`) dan fungsi tiap bagian
- [ ] Aku paham kenapa cuma boleh ada satu `<h1>` dan heading tidak boleh loncat level
- [ ] Aku bisa menjelaskan beda `<article>` dan `<section>` dengan contoh sendiri
- [ ] Aku paham kapan tabel boleh dipakai (data tabular) dan kapan tidak (layout)
- [ ] Aku paham kenapa `<label>` harus terhubung ke `<input>` lewat `for` dan `id`
- [ ] Aku bisa menjelaskan beda block element dan inline element, dan kenapa browser menumpuknya berbeda
- [ ] Aku tahu beda SEO dan aksesibilitas (A11y), dan contoh tag untuk masing-masing
- [ ] Aku paham kenapa validasi HTML5 di browser **tidak cukup** dan server tetap harus memvalidasi

---

## Kemampuan Praktis

- [ ] Aku bisa menulis halaman HTML lengkap dari file kosong
- [ ] Aku bisa membuat tabel dengan `thead`, `tbody`, `tfoot`, `colspan`, dan `rowspan` yang hitungannya benar
- [ ] Aku bisa membuat form dengan berbagai `type` input, `fieldset`/`legend`, `select`, `textarea`, radio, dan checkbox
- [ ] Aku bisa memakai atribut validasi (`required`, `minlength`, `min`, `max`, `pattern`) dan mengujinya sendiri
- [ ] Aku bisa menyisipkan gambar dengan `alt` yang bermakna, video, audio, dan `iframe`
- [ ] Aku bisa membuat anchor link internal (`href="#id"`) dan link email/telepon
- [ ] Aku bisa menambahkan meta tag SEO, Open Graph, dan skip link
- [ ] Aku bisa menjalankan `npx html-validate` dan memperbaiki error yang muncul sendiri

---

## Kebiasaan Baik

- [ ] Aku menulis outline di kertas/jurnal sebelum mengetik kode
- [ ] Aku cek tab Elements di DevTools saat tampilan aneh, bukan menebak-nebak
- [ ] Aku menguji halaman dengan keyboard saja (`Tab`, `Enter`)
- [ ] Aku memakai `target="_blank"` selalu bersama `rel="noopener noreferrer"`
- [ ] Form yang berisi password memakai `method="post"`, bukan `get` (password tidak boleh muncul di URL)
- [ ] Aku baru membuka `contoh/` setelah versiku lolos validator

Mau tahu kenapa validasi browser bisa dibobol dalam 10 detik? Baca modul
[Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan CSS](../02-latihan-css/README.md).

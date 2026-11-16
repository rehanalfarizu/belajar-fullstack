# Self Problem Solving — Level 1 Web

Timebox awal 60 menit per kasus. Boleh memakai MDN/dokumentasi resmi, tetapi belum
boleh membuka `contoh/` atau meminta solusi. Simpan screenshot/trace/test sebagai
bukti.

## 1. HTML tanpa mouse

Diberikan halaman form dengan `<div>` klik, placeholder tanpa label, heading
melompat, dan error hanya berwarna merah. Perbaiki agar dapat dipakai keyboard dan
screen-reader.

Acceptance: semantic element, label, focus visible, error terhubung, urutan tab,
dan submit memakai mekanisme form.

## 2. CSS overflow

Card grid terlihat baik pada desktop tetapi overflow di viewport 320 px dan ketika
font diperbesar 200%. Temukan declaration penyebab dengan DevTools, bukan menambah
`overflow: hidden`.

## 3. Event listener ganda

Setiap kali modal dibuka, satu klik tombol menjalankan handler semakin banyak.
Buat reproduction, temukan lifecycle pemasangan listener, perbaiki, dan buktikan
listener tidak bocor.

## 4. Async race

Search `a`, lalu cepat `ab`. Response `a` datang terakhir dan menimpa hasil `ab`.
Perbaiki dengan cancellation atau request identity. Uji urutan response terbalik.

## 5. Data tidak valid

Parse response `unknown` menjadi daftar produk tanpa `any`. Tangani root bukan
array, item invalid, nilai kosong, dan status tidak dikenal. Jelaskan boundary
runtime versus TypeScript.

## 6. XSS DOM

Aplikasi komentar memakai `innerHTML`. Buat payload dummy aman di lab lokal yang
membuktikan markup dieksekusi/dirender, lalu ganti dengan sink aman. Jangan menguji
website pihak lain.

Acceptance: input tampil sebagai teks, markup yang memang diizinkan mempunyai
sanitizer allowlist dan negative tests.

## 7. URL tidak aman

Fitur “kunjungi website” menerima URL arbitrary. Tolak protocol selain HTTP/HTTPS,
uji URL relatif, encoded input, whitespace, dan `javascript:`. Jangan membuat
validator dengan `startsWith("http")`.

## 8. Performance budget

Halaman portfolio memiliki hero 6 MB, tiga font, dan script third-party.
Rekam baseline Network/Lighthouse, tetapkan budget, optimalkan, lalu ukur ulang.

Acceptance: visual tidak rusak, LCP/CLS membaik, hero tidak lazy-loaded, dimensi
image tersedia, dan bukti sebelum/sesudah disimpan.

## 9. Main-thread block

Filter 200.000 item membuat input macet. Profile long task, perbaiki algoritma
atau scheduling/worker sesuai bukti, lalu ukur INP-like interaction latency.

## 10. Capstone

Buat expense tracker vanilla + TypeScript dengan semantic form, persistence data
non-sensitif, import JSON tervalidasi, accessible table, responsive layout, unit
test logika, performance budget, dan security review.

## Batas lulus

Minimal 8/10 kasus, semua acceptance criteria dapat diulang, tidak ada nilai 0
pada correctness, accessibility, performance, atau security.

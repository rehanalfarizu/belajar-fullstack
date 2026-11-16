# CHECKLIST — Latihan CSS

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan 4 lapis box model dan beda `content-box` vs `border-box`
- [ ] Aku paham specificity: kenapa aturan class bisa kalah dari ID, dan kenapa lebih baik pakai class
- [ ] Aku bisa menjelaskan beda descendant (spasi), child (`>`), dan adjacent sibling (`+`) selector
- [ ] Aku paham main axis vs cross axis di Flexbox
- [ ] Aku bisa menjelaskan kapan pilih Grid dan kapan pilih Flexbox
- [ ] Aku paham pendekatan mobile-first dan fungsi viewport meta tag
- [ ] Aku bisa menjelaskan 5 nilai `position` dan kenapa `z-index` 9999 tidak selalu di paling atas (stacking context)
- [ ] Aku tahu property mana yang aman di-animate (`transform`, `opacity`) dan kenapa

---

## Kemampuan Praktis

- [ ] Aku bisa menulis CSS reset sendiri dan menengahkan elemen secara horizontal dan vertikal
- [ ] Aku bisa membuat navbar horizontal dan baris card yang wrap dengan Flexbox
- [ ] Aku bisa membuat page layout (header, sidebar, main, footer) dengan `grid-template-areas`
- [ ] Aku bisa membuat grid responsif dengan `repeat(auto-fill, minmax(...))`
- [ ] Aku bisa membuat halaman yang tetap rapi dari lebar 320px sampai 1440px
- [ ] Aku bisa styling form dengan state `:focus`, `:disabled`, error, dan success
- [ ] Aku bisa membuat dropdown dan badge dengan `relative` + `absolute`, serta navbar `fixed`/`sticky`
- [ ] Aku bisa membuat transisi hover dan animasi `@keyframes` sederhana
- [ ] Aku bisa memakai tab Computed dan overlay flex/grid di DevTools untuk debugging

---

## Kebiasaan Baik

- [ ] Aku menggambar sketsa kotak di kertas sebelum menulis CSS
- [ ] Aku menulis sedikit lalu langsung cek di browser, bukan menulis banyak lalu bingung
- [ ] Aku memakai unit `rem` untuk ukuran font supaya bisa di-zoom pengguna
- [ ] Aku tidak menghapus outline fokus tanpa menggantinya dengan penanda fokus lain (pengguna keyboard butuh itu)
- [ ] Aku paham `display: none` cuma menyembunyikan tampilan; datanya tetap ada di source dan bisa dibaca siapa pun lewat DevTools. Jadi data rahasia tidak boleh "disembunyikan" pakai CSS.

Kenapa poin terakhir penting? Baca [Kenapa Keamanan Penting?](../../../modul-keamanan-web/01-kenapa-keamanan-penting/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan JavaScript](../03-latihan-javascript/README.md).

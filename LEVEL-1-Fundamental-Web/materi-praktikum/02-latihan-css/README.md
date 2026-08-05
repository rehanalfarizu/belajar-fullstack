# Materi Praktikum 02 -- Latihan CSS

## Tujuan Pembelajaran

Setelah menguasai struktur HTML di modul sebelumnya, sekarang kamu akan belajar **CSS (Cascading Style Sheets)** -- bahasa untuk menghias dan memposisikan elemen-elemen HTML. CSS membuat halaman web menjadi indah dan responsif.

Pada modul ini kamu akan menguasai:

- CSS selector dari yang paling dasar sampai advanced.
- Box model: margin, border, padding, content.
- Flexbox dan Grid untuk membuat layout modern.
- Media queries untuk desain responsif.
- Animasi dan transisi untuk interaksi halus.

---

## Cara Pakai

Lima langkah kerja:

1. **BACA** `soal/01-nama-soal.md` untuk pahami apa yang diminta.
2. **BUKA** `code/01-nama-soal.html` — template HTML + CSS sudah tersedia.
3. **KETIK** CSS dari 0 di bagian `<style>`.
4. **BUKA** di browser untuk lihat hasilnya.
5. **UBAH** nilai CSS-nya untuk eksperimen.

Catatan penting: setiap template sudah berisi **struktur HTML lengkap** dan **comment CSS yang perlu diisi**. Styles ditulis di dalam blok `<style>` di dalam `<head>` — tidak perlu file terpisah. **Ketik semua CSS dari 0**; bagian yang perlu diisi ditandai dengan komentar `/* tulis di sini */`.

---

## Reset CSS (Wajib di Awal)

Hampir semua project CSS modern memulai dengan reset ini:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

Tiga alasan reset ini penting:

1. `box-sizing: border-box` membuat `width` sudah termasuk `padding` dan `border` — jauh lebih intuitif.
2. `margin: 0` menghapus jarak bawaan browser.
3. `padding: 0` memastikan konsistensi antar elemen.

---

## Daftar Latihan

### PEMULA (Soal 01–04)

Empat soal untuk fondasi CSS:

1. **Layout Dasar** — element selector, class, ID, box model, centering.
2. **Selector & Box Model** — descendant, child, attribute, pseudo-class, box model visual.
3. **Flexbox Dasar** — `display: flex`, `justify-content`, `align-items`, `gap`, `flex-wrap`.
4. **Card Component** — Flexbox card, `box-shadow`, `border-radius`, `transition`.

### MENENGAH (Soal 05–07)

Tiga soal untuk layout dan desain:

5. **Grid System** — `display: grid`, `grid-template-columns`, `grid-area`, `span`.
6. **Responsive Design** — `@media`, `flex-wrap`, `min-width`, mobile-first thinking.
7. **Typography & Warna** — `font-size`, `line-height`, `color`, `gradient`, `text-align`.

### LANJUT (Soal 08–10)

Tiga soal untuk interaksi dan navigasi:

8. **Form Styling** — input styling, `:focus`, `:hover`, `::placeholder`, button states.
9. **Animasi & Transisi** — `transition`, `@keyframes`, `transform`, `opacity`.
10. **Position & Navbar** — `fixed`, `sticky`, `relative`, `absolute`, `z-index`.

---

## Tips Penting CSS

Tujuh tips yang langsung terasa dampaknya:

1. Selalu mulai dengan reset: `* { box-sizing: border-box; margin: 0; padding: 0; }`.
2. `display: flex` + `justify-content: center` + `align-items: center` = centering sempurna.
3. `display: grid` + `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))` = responsive grid.
4. `transition` di element yang ingin di-animate, bukan di `:hover`-nya.
5. `z-index` hanya bekerja kalau element punya `position` (relative, absolute, fixed, atau sticky).
6. Mobile-first: tulis CSS untuk mobile dulu, lalu `@media (min-width: 768px)` untuk tablet atau desktop.
7. `!important` adalah last resort — hindari jika bisa.

---

## Urutan Pengerjaan CSS per Soal

Tujuh langkah berurutan untuk setiap soal:

1. **Reset CSS** — selalu mulai di sini.
2. **Base styles** — body, container, typography.
3. **Layout** — flex atau grid.
4. **Component styles** — card, button, input.
5. **States** — `:hover`, `:focus`, `:active`.
6. **Animations** — `transition`, `@keyframes`.
7. **Responsive** — `@media` queries.

---

## Struktur Template Kode

```css
/* ========== TODO 1: HEADER ========== */
/* Tambahkan style untuk header:
   - background biru/ungu/gradient
   - padding 20px
   - text-align center
   - color putih
*/
.header {
  /* tulis di sini */
}
```

Tiga hal yang perlu dipahami dari template:

- Comment menjelaskan apa yang HARUS kamu tulis.
- Properti CSS di dalam block `/* tulis di sini */` adalah bagian yang KOSONG dan perlu kamu isi.
- Di luar block tersebut, ada style yang sudah ditulis untukmu sebagai referensi.

---

## Referensi Cepat Properti CSS

Delapan properti yang paling sering dipakai:

1. `margin` — jarak luar antar elemen.
2. `padding` — jarak dalam antara border dan konten.
3. `border` — garis tepi elemen.
4. `display: flex` — layout satu dimensi (baris atau kolom).
5. `display: grid` — layout dua dimensi (baris dan kolom).
6. `position: fixed` — elemen tetap di posisi layar.
7. `transition` — animasi halus saat property berubah.
8. `@media` — styling berbeda untuk ukuran layar berbeda.

---

**Target: 10/10 soal dikerjakan dari 0 → fondasi CSS SOLID!**

Setelah selesai, lanjut ke Materi Praktikum 03 (JavaScript) untuk menambahkan interaktivitas pada halaman web.

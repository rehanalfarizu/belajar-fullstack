<!-- markdownlint-disable MD024 MD028 -->

# SOAL 01 — Layout Dasar (Selector & Box Model)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menulis **CSS reset** yang benar (`box-sizing`, `margin`, `padding`, font-family)
- Menggunakan **5 jenis selector** dasar: element, class, ID, descendant, group
- Memahami **box model** 4 lapis (content, padding, border, margin) dan cara kerjanya
- Menerapkan **centering** horizontal dengan `margin: 0 auto` dan vertikal dengan `text-align`
- Mengatur **warna** (color, background, border) untuk memberikan hierarki visual
- Membedakan kapan pakai `class` vs `ID` (best practice: pakai class)

**Topik:** CSS reset, selector, box model, centering, color/background

**Referensi utama:**

- [MDN: CSS Selectors](https://developer.mozilla.org/id/docs/Web/CSS/CSS_Selectors)
- [MDN: Box Model](https://developer.mozilla.org/id/docs/Learn/CSS/Building_blocks/The_box_model)
- [MDN: Centering in CSS](https://developer.mozilla.org/id/docs/Learn/CSS/Building_blocks/Advanced_styling_effects)

**Difficulty:** Pemula • **Estimasi:** 30-45 menit

---

## Briefing

Bayangkan kamu diminta membuat **halaman biodata** untuk portfolio pertamamu. HTML-nya sudah jadi dari soal-soal HTML sebelumnya (judul, paragraf, list hobi, dll). Sekarang kamu perlu **memberikan styling** — tanpa styling, halaman terlihat "telanjang" (semua teks hitam, rapat ke kiri, tanpa jarak).

Yang akan kamu bangun bukan hanya "halaman yang ada warnanya", tapi halaman dengan:

- **Typografi yang konsisten** (font yang sama di seluruh halaman)
- **Card yang rapi** (padding di dalam, margin di luar, border tipis)
- **Layout terpusat** (tidak nempel ke pinggir layar)
- **Hierarki visual** (header berbeda warna dari body)

Setelah selesai, kamu akan paham **kenapa setiap baris CSS itu ada** — bukan hanya "tulis kode, lihat hasilnya".

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya (kenapa property ini ada, kapan dipakai)
2. **Lihat Yang Terjadi di Browser** — bayangkan output sebelum nulis
3. **Ketik dari 0** di `code/01-layout-dasar.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir dan mengetik**, bukan menyalin. Ini skill paling penting untuk programmer.

---

## Bagian A: Cara Menyisipkan CSS (Internal `<style>`)

### Penjelasan

CSS bisa disisipkan ke HTML dengan 3 cara:

- **Inline** → `<h1 style="color: red;">`. Jangan dipakai (sulit di-maintain).
- **Internal** → `<style>` di dalam `<head>`. Untuk latihan & halaman kecil (1 file).
- **External** → `<link rel="stylesheet" href="style.css">`. Untuk project nyata (multi-file).

Untuk latihan ini kita pakai **internal `<style>`** — cukup 1 file HTML, tidak perlu file CSS terpisah.

### Pola Kode

```html
<head>
  <meta charset="UTF-8">
  <title>Biodata Diri</title>
  <style>
    /* CSS ditulis di sini */
    body {
      font-family: sans-serif;
    }
  </style>
</head>
```

### Kapan Pakai

- **Internal**: untuk latihan, demo, halaman yang berdiri sendiri (1 file)
- **External**: untuk project nyata dengan banyak halaman (akan dipakai di LEVEL-2)

### Verifikasi

- [ ] Tag `<style>` ada di dalam `<head>`, **bukan** di dalam `<body>`
- [ ] Style dibungkus kurung kurawal `{ ... }`
- [ ] Tiap property diakhiri `;` (titik koma)

---

## Bagian B: CSS Reset (Wajib di Awal)

### Penjelasan

**CSS reset** = kode pendek yang "menghapus" default styling browser. Tanpa reset, tiap browser punya default berbeda (margin default untuk `<p>` di Chrome ≠ Firefox). Reset membuat **semua browser mulai dari kondisi yang sama**.

3 property reset yang paling penting:

- `box-sizing: border-box` — lebar element = `width` yang kamu tulis (termasuk padding + border)
- `margin: 0` — hapus margin default browser
- `padding: 0` — hapus padding default browser

**Kenapa `border-box` wajib?** Tanpa `border-box`, kalau kamu tulis `width: 200px; padding: 20px;` maka lebar total jadi 240px (200 + 20×2). Dengan `border-box`, lebarnya tetap 200px (padding "menyusup" ke dalam).

### Wajib Ada di Kode Kamu

- Selector `*` (universal) untuk `box-sizing`
- `body` untuk `font-family`
- `box-sizing: border-box` di `*` (dan `*:before`, `*:after` untuk konsistensi)

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk reset di dalam `<style>`
2. Ketik selector `* { ... }`
3. Tambah property `box-sizing`, `margin`, `padding` di dalamnya
4. Di bawahnya, tulis `body { font-family: ...; }`
5. Save, buka di browser — amati perubahan kecil (jarak antar elemen jadi konsisten)

### Verifikasi

- [ ] `* { box-sizing: border-box; margin: 0; padding: 0; }` ada di paling atas CSS
- [ ] `body` punya `font-family` (misal: `system-ui, sans-serif`)
- [ ] Inspect Element: klik elemen apapun → tab "Computed" → `box-sizing: border-box`

---

## Bagian C: 5 Jenis Selector Dasar

### Penjelasan

Selector = **pola untuk memilih element HTML** yang akan di-style. Ada banyak jenis, tapi 5 ini paling sering dipakai:

- **Element** → `h1 { }` memilih semua tag `<h1>`
- **Class** → `.card { }` memilih semua element dengan `class="card"`
- **ID** → `#header { }` memilih element dengan `id="header"` (harus unik)
- **Descendant** → `.card p { }` memilih semua `<p>` di dalam `.card` (kapan saja)
- **Group** → `h1, h2, h3 { }` memilih semua `<h1>`, `<h2>`, dan `<h3>`

**Aturan class vs ID:**

- **Class (`.nama`)**: boleh dipakai berkali-kali di 1 halaman. Pakai ini untuk styling.
- **ID (`#nama`)**: harus unik di 1 halaman. Pakai ini untuk JavaScript atau anchor link.

### Wajib Ada di Kode Kamu

- **Element selector**: `h1 { }` dan `p { }` (styling default untuk heading & paragraf)
- **Class selector**: `.card { }` dan `.title { }` (styling untuk komponen)
- **ID selector**: `#header { }` dan `#main { }` (hanya untuk element unik)
- **Descendant selector**: `.card p { }` (styling paragraf DI DALAM card)
- **Group selector**: `h1, h2, h3 { }` (styling yang sama untuk ketiganya)

### Cara Mengetik dari 0

1. Tulis tiap selector satu per satu
2. Untuk tiap selector, isi dengan property yang masuk akal (misal `h1 { color: navy; }`)
3. Inspect Element (F12) → lihat di tab "Styles" panel mana yang aktif
4. **Coba specificity**: tulis `h1 { color: red; }` lalu `.title { color: blue; }` di element yang sama — yang menang adalah yang **lebih spesifik** (class > element)

### Yang Terjadi di Browser

- **Tanpa class/ID**: hanya selector element yang bekerja → semua `<h1>` di seluruh halaman kena style yang sama
- **Dengan class**: element dengan `class="card"` kena style `.card` → bisa beda per element
- **Specificity**: kalau ada 2 rule untuk element yang sama, yang **lebih spesifik** yang menang. Urutan: `ID > Class > Element`

### Verifikasi

- [ ] 5 jenis selector ada di CSS kamu
- [ ] Tidak ada 2 element dengan `id` yang sama (ID harus unik)
- [ ] Inspect Element: tab "Styles" menunjukkan rule mana yang aktif (dicoret = kalah specificity)

---

## Bagian D: Box Model (4 Lapis)

### Penjelasan

Setiap element HTML adalah **kotak (box)** dengan 4 lapis (dari dalam ke luar):

```
┌─── margin (jarak LUAR) ───┐
│ ┌─ border (garis tepi) ─┐ │
│ │ ┌─ padding (jarak   ─┐ │ │
│ │ │   DALAM)           │ │ │
│ │ │ ┌─ content ──────┐ │ │ │
│ │ │ │  teks/gambar   │ │ │ │
│ │ │ └────────────────┘ │ │ │
│ │ └────────────────────┘ │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

- **Content**: isi element (teks, gambar, dll)
- **Padding**: jarak antara content dan border
- **Border**: garis tepi element
- **Margin**: jarak antara border element dan element lain

### Wajib Ada di Kode Kamu

- `padding` di `.card` (16px atau 20px) — agar teks tidak nempel ke border
- `margin` antar `.card` (16px) — agar card tidak nempel satu sama lain
- `border` di `.card` (1px solid #ddd) — garis tipis sebagai pemisah
- `border-radius` (8px) — sudut membulat, lebih modern
- `width` dan `max-width` di container — agar bisa di-center

### Cara Mengetik dari 0

1. Pilih satu class `.card`
2. Tambah property `padding`, `margin`, `border`, `border-radius`
3. Inspect Element (F12) → tab "Computed" → lihat visualisasi box model di panel kanan
4. **Coba ubah nilai**: ganti `padding: 20px` jadi `padding: 40px` — amati perubahan di Inspect Element

### Yang Terjadi di Browser (Inspect Element)

- Inspect Element → panel kanan "Computed" → scroll ke bawah
- Ada visualisasi 4 lapis: content (biru), padding (hijau), border (kuning), margin (oranye)
- Klik "Box Model" di DevTools Chrome untuk lihat detail ukuran tiap lapis

### Verifikasi

- [ ] `.card` punya `padding`, `margin`, `border`, `border-radius`
- [ ] Inspect Element: visualisasi box model muncul
- [ ] Container punya `width` DAN `max-width` (bukan salah satu)

---

## Bagian E: Centering (Horizontal & Teks)

### Penjelasan

Ada 2 jenis centering yang **sering ketuker**:

1. **Centering element horizontal** → pakai `margin: 0 auto` (bekerja kalau element punya `width` atau `max-width`)
2. **Centering teks horizontal** → pakai `text-align: center` (bekerja untuk inline content: teks, link, gambar)

**Kenapa `margin: 0 auto` butuh `width`?** Browser butuh tahu "lebar element" untuk bagi rata sisa ruang di kiri-kanan. Tanpa `width`, element `block` akan full-width → tidak ada sisa ruang untuk dibagi.

### Wajib Ada di Kode Kamu

- Container di-center horizontal: `margin: 0 auto;`
- Container punya `max-width: 800px` (atau nilai lain yang masuk akal)
- Teks di-center di header: `text-align: center;`

### Cara Mengetik dari 0

1. Di selector container, tambah `max-width` dan `margin: 0 auto`
2. Di selector header atau title, tambah `text-align: center`
3. **Coba tanpa max-width**: hapus `max-width` lalu refresh — container jadi tidak center (karena full-width)

### Yang Terjadi di Browser

- Container: posisinya **di tengah layar** (kiri-kanan seimbang), dengan lebar maksimal 800px
- Header text: teksnya **di tengah container**, rata kiri-kanan

### Kapan Jangan

- **Jangan** pakai `text-align: center` untuk centering element `<div>` (itu tugas `margin: auto`)
- **Jangan** pakai `margin: 0 auto` untuk centering vertikal (itu tugas Flexbox/Grid)

### Verifikasi

- [ ] Container di-center horizontal di browser
- [ ] Resize browser jadi kecil → container tetap center, tidak nempel kiri
- [ ] `text-align: center` hanya untuk teks, bukan untuk element block

---

## Bagian F: Color & Background

### Penjelasan

CSS punya banyak cara untuk memberi warna:

- **Color names**: `red`, `blue`, `navy` (terbatas, 140 nama)
- **Hex**: `#ff0000` (merah), `#3b82f6` (biru Tailwind) — **paling sering dipakai**
- **RGB**: `rgb(255, 0, 0)` — versi desimal dari hex
- **HSL**: `hsl(0, 100%, 50%)` — versi hue-saturation-lightness (untuk variasi warna sistematis)

Untuk latihan ini kita pakai **hex** (paling umum di dunia web).

### Wajib Ada di Kode Kamu

- `background` color di `#header` (misal: `#1e293b` — abu gelap)
- `color` di teks header (misal: `white`)
- `color` di body text (misal: `#1e293b` — hampir hitam, tidak 100% hitam)
- `background` di `.card` (misal: `white`)
- `border` color (sudah ada di Bagian D, biasanya `#ddd`)

### Cara Mengetik dari 0

1. Pilih warna utama (header) dan warna teks yang kontras
2. Tulis di property `background` dan `color`
3. Inspect Element: klik element → tab "Styles" → klik kotak warna di sebelah value → coba ganti warna
4. **Ubah-ubah warna** untuk eksplorasi — tidak ada yang "salah", yang penting kontras cukup

### Yang Terjadi di Browser

- Header: background gelap, teks putih (kontras tinggi → mudah dibaca)
- Card: background putih (kontras dengan background halaman yang abu terang)
- Border: garis tipis abu-abu (pemisah halus, tidak dominan)

### Kontras & Aksesibilitas

- **Kontras tinggi** (teks gelap di background terang, atau sebaliknya) → mudah dibaca
- **Kontras rendah** (teks abu di background putih) → sulit dibaca, jangan dipakai untuk body text
- Tools: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Verifikasi

- [ ] Header punya `background` dan `color` yang kontras
- [ ] Body text punya `color` (default hitam browser diganti ke abu gelap `#1e293b` lebih nyaman)
- [ ] Card punya `background: white` (atau transparan + body yang abu)

---

## Ringkasan: Kapan Pakai Property Apa

**Reset & base:**

- `* { box-sizing: border-box; }` — wajib di awal setiap project
- `body { font-family: ...; }` — font global

**Selector (5 dasar):**

- `h1 { }` → element selector
- `.card { }` → class selector (pakai ini untuk styling)
- `#header { }` → ID selector (unik, untuk JS/anchor)
- `.card p { }` → descendant selector
- `h1, h2, h3 { }` → group selector

**Box model (4 lapis, dari dalam):**

- `width` / `max-width` → lebar content
- `padding` → jarak dalam (content ↔ border)
- `border` → garis tepi
- `border-radius` → sudut membulat
- `margin` → jarak luar (antar element)

**Centering:**

- `margin: 0 auto` → center element horizontal (perlu `width`/`max-width`)
- `text-align: center` → center teks/link horizontal

**Warna:**

- `color` → warna teks
- `background` → warna background
- `border-color` atau `border: 1px solid #...` → warna border

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 02, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/), paste source code
- [ ] **CSS reset ada** di paling atas — `* { box-sizing: border-box; ... }`
- [ ] **5 jenis selector** ada (element, class, ID, descendant, group)
- [ ] **Box model lengkap** — card punya padding, margin, border, border-radius
- [ ] **Container di-center** — lihat di browser, container ada di tengah layar
- [ ] **Kontras warna cukup** — teks di header putih di background gelap, atau sebaliknya
- [ ] **Browser menampilkan**:
  - Container terpusat dengan max-width
  - Header dengan background gelap, teks putih/terang, teks center
  - 2 card (atau lebih) berdampingan (atau tersusun rapi) dengan border, padding, border-radius
  - Jarak antar card (margin) terlihat jelas

---

## Cara Submit

1. Buka `code/01-layout-dasar.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri (jangan copy-paste dari contoh)
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. Verifikasi dengan checklist di atas
6. Kalau PASS, lanjut ke `soal/02-selector-dan-box-model.md`

---

## Catatan untuk Pemula

> **`box-sizing: border-box` WAJIB di semua project.** Kalau tidak, width tidak sesuai ekspektasi — misal kamu tulis `width: 200px` tapi lebarnya jadi 240px karena ada padding. Set di `*` agar konsisten di seluruh project.
>
> **`margin: 0 auto` hanya bekerja kalau element punya `width` atau `max-width`.** Tanpa itu, element `block` akan full-width — tidak ada sisa ruang untuk dibagi rata. Ini kesalahan #1 pemula saat mau center element.
>
> **Class vs ID: pakai class, jangan ID (untuk styling).** ID boleh dipakai untuk JavaScript atau anchor link (`#header` di URL). Tapi untuk styling, class lebih fleksibel — bisa dipakai berkali-kali, dan specificity-nya cukup.
>
> **CSS case-insensitive untuk property, tapi case-sensitive untuk value font-family.** Misal `color: RED;` valid, tapi `font-family: "Times New Roman";` HARUS pakai tanda kutip dan case yang tepat.
>
> **Warna hex `#fff` dan `#ffffff` sama.** Bentuk singkat (3 digit) untuk warna yang tiap digitnya kembar: `#fff` = `#ffffff` = putih, `#000` = `#000000` = hitam, `#f00` = `#ff0000` = merah.
>
> **Urutan property di CSS tidak penting.** Mau `color` dulu lalu `background`, atau sebaliknya — hasilnya sama. Tapi best practice: tulis berurutan dari "dalam" ke "luar" (content → padding → border → margin) untuk kerapihan.

<!-- markdownlint-enable MD024 MD028 -->

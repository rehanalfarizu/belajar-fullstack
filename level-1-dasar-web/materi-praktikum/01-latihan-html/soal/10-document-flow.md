<!-- markdownlint-disable MD024 MD028 -->

# SOAL 10 — Document Flow: Block vs Inline Elements

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membedakan **block elements** dan **inline elements** — dan kenapa browser menumpuknya berbeda
- Memahami **default flow** browser tanpa CSS
- Mengenali tag-tag block (`<div>`, `<p>`, `<h1>`, `<ul>`, dll) dan inline (`<span>`, `<a>`, `<strong>`, `<em>`, `<mark>`)
- Memahami konsep **box model** secara konseptual (margin, border, padding, content) — detail di LEVEL 2
- Membangun halaman e-commerce sederhana **murni HTML** tanpa CSS, dan paham kenapa layout terlihat "berantakan"
- Melihat demonstrasi visual: block elements **tumpuk vertikal**, inline elements **sebaris**

**Topik:** Block vs inline elements, default document flow, `<div>`, `<span>`, `<br>`, konsep box model (teori)

**Referensi utama:**

- [MDN: Block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
- [MDN: Inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)
- [MDN: Box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [MDN: Normal flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow)

**Difficulty:** Lanjut • **Estimasi:** 60-90 menit

---

### Overview Singkat Setiap Tag/Atribut/Konsep (Baca Dulu Sebelum Mulai)

**Document Flow** — *Cara browser menyusun elemen HTML secara default (tanpa CSS).* Ini fondasi penting untuk memahami Flexbox, Grid, dan Position nanti. Semua dimulai dari sini.

**Block element** — *Elemen yang MEMULAI BARIS BARU dan mengambil lebar penuh container.* Ibarat **kotak-kotak yang ditumpuk vertikal**. Tiap block punya baris sendiri.

**Inline element** — *Elemen yang SEBARIS dengan elemen lain, hanya sepanjang isinya.* Ibarat **kata-kata dalam kalimat** — mengalir dalam baris yang sama, tidak memulai baris baru.

**`<div>`** — *Block element generik.* Tidak punya makna semantic. Pakai sebagai **wadah** kalau tidak ada tag semantic yang cocok. Tag ini "wajib" untuk pemula paham, tapi **minimalkan** penggunaannya di production.

**`<span>`** — *Inline element generik.* Tidak punya makna semantic. Pakai untuk **membungkus** sebagian teks inline yang mau di-style atau dimanipulasi.

**`<br>`** — *Line break.* Baris baru di tengah teks (bukan paragraf baru). Pakai **jarang** — biasanya ganti `<p>` atau layout CSS.

**Box model** — *Cara browser menghitung ukuran & jarak element.* Terdiri dari: content (isi), padding (jarak dalam), border (garis tepi), margin (jarak luar). Detail teknis di LEVEL 2 CSS — di sini cukup paham konsep.

**Normal flow** — *Default flow: block di-stack vertikal, inline di-flow horizontal dalam block.* Browser pakai ini sebelum kita override dengan CSS.

**`<address>`** — *Sudah dibahas.* Pakai untuk info kontak di footer.

**`<mark>`** — *Highlight teks.* Background kuning default (seperti stabilo). Bukan untuk styling — untuk **makna** "perhatian, ini penting".

**`<hr>`** — *Sudah dibahas.* Garis horizontal sebagai pemisah.

---

## Briefing

Bayangkan kamu akan membangun **halaman e-commerce sederhana**. Halaman punya: header (logo, search, cart), hero banner promo, daftar produk (4 produk), sidebar filter & keranjang, footer.

Yang menarik: kita bangun **TANPA CSS sama sekali** — murni HTML. Hasilnya **akan terlihat "berantakan"** (semua vertikal, tidak ada posisi kiri-kanan, tidak ada warna, tidak ada alignment). **Itu bukan salah HTML** — itu default flow browser. Tujuannya: **pahami MENGAPA** browser meletakkan elemen di posisi tertentu, agar nanti saat belajar CSS, kamu paham **apa yang sedang di-override**.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Lihat Yang Terjadi di Browser** — bayangkan output visual
3. **Ketik dari 0** di `code/10-document-flow.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate + Judul

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TokoOnline — Demo Document Flow</title>
</head>
<body>
  <!-- header + main + aside + section demo + footer -->
</body>
</html>
```

### Verifikasi

- [ ] Boilerplate standar

---

## Bagian B: Block vs Inline — KONSEP PENTING

### Penjelasan Mendalam (WAJIB DIPAHAMI!)

**Block elements** (contoh: `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`, `<li>`, `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`, `<table>`, `<blockquote>`, `<hr>`):
- Memulai **baris baru**
- Mengambil **lebar penuh** container (default)
- Bisa berisi block lain ATAU inline

**Inline elements** (contoh: `<span>`, `<a>`, `<strong>`, `<em>`, `<b>`, `<i>`, `<mark>`, `<img>`, `<br>`, `<code>`, `<small>`, `<sub>`, `<sup>`):
- **Sebaris** dengan elemen lain
- Lebarnya **sesuai konten** (tidak full-width)
- **Hanya boleh berisi inline lain** (tidak boleh block di dalam inline)

### Analogi Sederhana

Bayangkan **kalimat di koran**:
- **Paragraf** (block) = paragraf baru di baris baru
- **Teks dalam paragraf** (inline) = kata/frasa yang mengalir dalam paragraf yang sama
- **Heading** (block) = judul artikel di baris sendiri
- **Link dalam paragraf** (inline) = link yang disisipkan di tengah teks

### Yang Terjadi di Browser

```html
<div>Block 1</div>
<div>Block 2</div>
```
**Output:**
```
[Block 1 di baris 1, lebar penuh]
[Block 2 di baris 2, lebar penuh]
```

```html
<span>Inline 1</span>
<span>Inline 2</span>
```
**Output:**
```
Inline 1 Inline 2 (sebaris, lebar sesuai konten)
```

```html
<p>Ini <strong>block</strong> dengan <em>inline</em> di dalamnya.</p>
```
**Output:**
```
Ini block dengan inline di dalamnya.
(Block paragraf, tapi "block" dan "inline" di dalamnya tetap inline)
```

### Kapan Pakai Block

- Wadah utama (header, main, section, footer)
- Paragraf, heading, list
- Konten yang **memerlukan baris baru** (pemisah visual natural)

### Kapan Pakai Inline

- Di **dalam** block: untuk emphasize, link, mark
- Untuk styling sebagian teks (warna, font)
- Untuk konten yang **mengalir** dalam baris

### Kapan Jangan

- **Block di dalam inline** = INVALID (misal: `<span><div>X</div></span>` — beberapa browser akan refactor struktur)
- **`<div>` untuk segalanya** = anti-pattern. Pakai semantic tag dulu (`<section>`, `<article>`, `<nav>`)

### Verifikasi (Sebelum Lanjut)

Sebelum lanjut ke bagian selanjutnya, **pastikan kamu paham**:
- [ ] Block = baris baru, lebar penuh
- [ ] Inline = sebaris, lebar sesuai konten
- [ ] Block boleh berisi block + inline
- [ ] Inline hanya boleh berisi inline (tidak boleh block di dalam inline)

---

## Bagian C: Demo Block Elements dengan `<div>`

### Penjelasan

`<div>` = block element **generik** (tanpa makna semantic). Untuk demo, kita pakai `<div>` dengan border agar kelihatan **jelas batas-batasnya**.

### Pola Kode

```html
<section>
  <h2>Demo: Block Elements</h2>
  <p>Block elements mulai di baris baru dan mengambil lebar penuh:</p>

  <div style="border: 2px solid red; padding: 10px; margin: 5px;">Block 1 — otomatis di baris baru</div>
  <div style="border: 2px solid red; padding: 10px; margin: 5px;">Block 2 — mulai di bawah Block 1</div>
  <div style="border: 2px solid red; padding: 10px; margin: 5px;">Block 3 — juga di baris baru</div>
</section>
```

**Penjelasan `style="..."`:**
- `border: 2px solid red` — garis tepi merah 2px (supaya kelihatan)
- `padding: 10px` — jarak dalam 10px
- `margin: 5px` — jarak luar 5px
- Kita pakai **inline style** untuk contoh ini. Di LEVEL 2 akan belajar pisah ke file CSS.

### Yang Terjadi di Browser

- 3 `<div>` tampil **vertikal** (atas ke bawah)
- Tiap div punya border merah
- **Lebar tiap div = full width** container (default)

### Verifikasi

- [ ] 3 `<div>` dengan border terlihat
- [ ] Tiap `<div>` di baris baru
- [ ] Lebar `<div>` = full width (mulai dari kiri ke kanan container)

---

## Bagian D: Demo Inline Elements dengan `<span>`

### Penjelasan

`<span>` = inline element **generik**. Untuk demo, kita kasih border agar kelihatan **batas-batasnya**.

### Pola Kode

```html
<section>
  <h2>Demo: Inline Elements</h2>
  <p>Inline elements sebaris dan hanya sepanjang isinya:</p>

  <p>
    <span style="border: 2px solid blue; padding: 5px;">Inline 1</span>
    <span style="border: 2px solid blue; padding: 5px;">Inline 2</span>
    <span style="border: 2px solid blue; padding: 5px;">Inline 3</span>
  </p>
</section>
```

### Yang Terjadi di Browser

- 3 `<span>` tampil **sebaris** (horizontal, dalam 1 baris)
- Tiap span punya border biru
- **Lebar span = sesuai konten** (tidak full width)

### Verifikasi

- [ ] 3 `<span>` dengan border terlihat
- [ ] Tiap `<span>` sebaris (tidak mulai baris baru)
- [ ] Lebar `<span>` = sesuai konten

---

## Bagian E: Demo Mixed Content dalam `<p>`

### Penjelasan

Di dalam `<p>` (block), kita bisa pakai **berbagai inline** untuk formatting. Tiap inline punya **makna berbeda** (bukan cuma styling).

### Pola Kode

```html
<section>
  <h2>Demo: Mixed Content dalam Paragraf</h2>

  <p>
    Ini teks biasa dalam paragraf.
    <strong>Teks bold (penting)</strong> dan
    <em>teks miring (penekanan)</em> dan
    <a href="#">hyperlink</a> dan
    <mark>highlight (perhatian)</mark> dan
    <code>code tag</code> semuanya
    <small>sebaris dalam paragraf yang sama</small>.
  </p>
</section>
```

### Yang Terjadi di Browser

- Tiap inline punya **render default** berbeda:
  - `<strong>` = **bold**
  - `<em>` = *italic*
  - `<a>` = biru + underline
  - `<mark>` = **background kuning** (seperti stabilo)
  - `<code>` = monospace font + background abu
  - `<small>` = font lebih kecil
- Semuanya **sebaris** dalam paragraf

### Verifikasi

- [ ] Semua inline elements tampil di **satu paragraf**
- [ ] Tiap inline punya render berbeda (bold, italic, dll)
- [ ] Tidak ada yang mulai baris baru

---

## Bagian F: Header E-Commerce (Block Layout)

### Penjelasan

Header adalah **block container** di paling atas. Isinya: logo (`<span>` inline), search (`<input>` inline), cart link (`<a>` inline). Karena di dalam header, semuanya mengalir **horizontal** (tapi header itu sendiri block, mulai baris baru).

### Pola Kode

```html
<header style="border: 2px solid green; padding: 10px; margin: 5px;">
  <h1>TokoOnline</h1>

  <form>
    <input type="search" placeholder="Cari produk..." name="q">
    <button type="submit">Cari</button>
  </form>

  <a href="#">Cart (0)</a>
</header>
```

### Yang Terjadi di Browser (Tanpa CSS Layout)

- Header (block) di baris sendiri
- Isi header (h1, form, a) **bertumpuk vertikal** — karena tanpa CSS, block + form + a tidak otomatis horizontal
- Untuk layout horizontal, butuh CSS Flexbox (akan dipelajari LEVEL 2)

### Verifikasi

- [ ] `<header>` di awal body
- [ ] `<h1>` di dalam header
- [ ] Search `<form>` + `<input type="search">` di header
- [ ] Cart link `<a>` di header

---

## Bagian G: Hero / Banner Section (Block)

### Penjelasan

Section untuk **promo/iklan besar**. Block container dengan heading, paragraf, dan CTA.

### Pola Kode

```html
<section style="border: 2px solid orange; padding: 20px; margin: 5px;">
  <h2>Promo Akhir Bulan!</h2>
  <p>Diskon hingga 50% untuk semua produk elektronik. Buruan checkout sebelum kehabisan.</p>
  <a href="#products">Lihat Produk</a>
</section>
```

### Verifikasi

- [ ] `<section>` dengan heading, paragraf, CTA link
- [ ] CTA link `href="#products"` (anchor ke main content section)

---

## Bagian H: Product Listing dengan `<article>` (Block)

### Penjelasan

Tiap produk = **1 `<article>`** (block). Di dalam article, ada `<img>`, `<h3>`, `<p>`, `<button>`, `<mark>`. Semuanya block → bertumpuk vertikal.

### Pola Kode

```html
<main id="products">
  <h2>Produk Unggulan</h2>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=1"
         alt="Laptop untuk kerja dan gaming"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Laptop Pro 14"</h3>
    <p>Harga: <strong>Rp 15.000.000</strong></p>
    <p>Laptop ringan dengan performa tinggi, cocok untuk profesional.</p>
    <mark>Sale</mark>
    <button>Beli Sekarang</button>
  </article>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=2"
         alt="Headphone wireless dengan noise cancelling"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Headphone Wireless</h3>
    <p>Harga: <strong>Rp 2.500.000</strong></p>
    <p>Headphone bluetooth dengan active noise cancelling.</p>
    <mark>New</mark>
    <button>Beli Sekarang</button>
  </article>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=3"
         alt="Smartphone flagship dengan kamera 108MP"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Smartphone Flagship</h3>
    <p>Harga: <strong>Rp 12.000.000</strong></p>
    <p>Smartphone dengan kamera 108MP dan baterai tahan seharian.</p>
    <button>Beli Sekarang</button>
  </article>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=4"
         alt="Smartwatch dengan fitur kesehatan lengkap"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Smartwatch Sport</h3>
    <p>Harga: <strong>Rp 4.500.000</strong></p>
    <p>Smartwatch dengan heart rate monitor dan GPS.</p>
    <mark>Sale</mark>
    <button>Beli Sekarang</button>
  </article>
</main>
```

### Yang Terjadi di Browser

- 4 `<article>` tampil **vertikal** (bertumpuk ke bawah)
- Tiap article = "card" sendiri dengan border
- Isi tiap article (img, h3, p, button) juga vertikal
- **Layout "card" yang rapi** butuh CSS Grid (akan dipelajari LEVEL 2)

### Verifikasi

- [ ] Minimal 4 `<article>` untuk produk
- [ ] Tiap article punya `<img>` dengan `alt`
- [ ] Tiap article punya `<h3>` nama produk
- [ ] Tiap article punya `<p>` harga (dengan `<strong>`)
- [ ] Tiap article punya `<button>` atau `<a>` "Beli"
- [ ] Minimal 1 `<mark>` untuk badge (Sale/New)

---

## Bagian I: Aside — Filter & Keranjang (Block di dalam Block)

### Penjelasan

`<aside>` = block. Di dalamnya: filter kategori (`<input type="checkbox">` + `<label>`), keranjang (`<ul>` + `<li>`), total, link checkout.

### Pola Kode

```html
<aside style="border: 2px solid teal; padding: 10px; margin: 5px;">
  <h3>Filter Kategori</h3>
  <ul>
    <li>
      <label>
        <input type="checkbox" name="kategori" value="elektronik">
        Elektronik
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" name="kategori" value="fashion">
        Fashion
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" name="kategori" value="makanan">
        Makanan
      </label>
    </li>
  </ul>

  <h3>Keranjang Belanja</h3>
  <ul>
    <li>Laptop Pro 14" - Rp 15.000.000</li>
    <li>Headphone Wireless - Rp 2.500.000</li>
  </ul>
  <p>Total: <strong>Rp 17.500.000</strong></p>
  <a href="#">Checkout</a>
</aside>
```

### Catatan tentang `<label>` Membungkus `<input>`

Cara ini **valid HTML** dan sering dipakai untuk checkbox/radio. Label membungkus input → klik label = klik input. Alternatif lain: pisahkan dengan `for`/`id` (sudah dibahas di soal 04).

### Verifikasi

- [ ] `<aside>` setelah main (atau di luar main, terserah)
- [ ] Filter pakai checkbox + label
- [ ] Keranjang pakai list + total
- [ ] Link checkout `<a>`

---

## Bagian J: Footer (Block)

### Penjelasan

Footer = block di akhir. 3 "kolom" info, tapi **tanpa CSS** semuanya vertikal (akan dipisah di LEVEL 2).

### Pola Kode

```html
<footer style="border: 2px solid brown; padding: 10px; margin: 5px;">
  <h3>Tentang Kami</h3>
  <p>TokoOnline adalah marketplace terpercaya untuk produk elektronik, fashion, dan makanan.</p>

  <h3>Link Cepat</h3>
  <ul>
    <li><a href="#">Beranda</a></li>
    <li><a href="#">Produk</a></li>
    <li><a href="#">Bantuan</a></li>
  </ul>

  <h3>Kontak</h3>
  <address>
    Jl. Contoh Alamat No. 123<br>
    Yogyakarta, Indonesia 55281
  </address>

  <p>&copy; 2026 TokoOnline. All rights reserved.</p>
</footer>
```

### Verifikasi

- [ ] `<footer>` di akhir body
- [ ] 3 sub-section: Tentang, Link Cepat, Kontak
- [ ] `<address>` untuk alamat
- [ ] `&copy;` untuk copyright

---

## Bagian K: Konsep Box Model (PENJELASAN TEORI, TANPA IMPLEMENTASI)

### Penjelasan (Sangat Penting untuk LEVEL 2)

**Box model** = cara browser "membungkus" tiap element dalam 4 layer konsentris:

```
┌─── margin (jarak LUAR element, transparan) ───┐
│  ┌── border (garis tepi) ──┐                   │
│  │  ┌─ padding ─┐          │                   │
│  │  │  CONTENT  │          │                   │
│  │  └───────────┘          │                   │
│  └─────────────────────────┘                   │
└────────────────────────────────────────────────┘
```

- **Content** — isi element (teks, gambar, dll)
- **Padding** — jarak antara content dan border (di DALAM border)
- **Border** — garis tepi element
- **Margin** — jarak antara element dan element lain (di LUAR border)

### Default Browser Styles

- `<body>` punya margin default 8px (sehingga tidak nempel ke pinggir window)
- Tiap element block punya margin atas/bawah default (misal `<h1>` margin-bottom)
- Tiap element punya padding default = 0 (kecuali beberapa seperti `<button>`)

### Yang Terjadi di Browser

- Padding **memperbesar area klik** (misal: button jadi lebih enak diklik)
- Border **memperjelas batas** element
- Margin **memisahkan** element dari element lain
- Total lebar element = `width + padding + border + margin` (detail di LEVEL 2)

### Tabel Box Model

| Layer | Fungsi | Di Dalam/ Luar |
|---|---|---|
| Content | Isi element | - |
| Padding | Jarak content ke border | Dalam border |
| Border | Garis tepi | - |
| Margin | Jarak element ke element lain | Luar border |

### Kapan Pakai (Konsep, Detail di LEVEL 2)

- `padding` = area "naik" untuk content (jangan terlalu sempit)
- `border` = pemisah visual
- `margin` = jarak antar element (jangan terlalu jauh atau terlalu dekat)

### Kapan Jangan

- Jangan pakai `<div>` kosong cuma untuk "spacing" (bisa pakai margin/padding langsung)
- Jangan `margin: 100px` asal-asalan (layout jadi kacau)

### Verifikasi

- [ ] Pahami 4 layer: content, padding, border, margin
- [ ] Pahami bahwa layout "berantakan" tanpa CSS = karena default flow
- [ ] Pahami bahwa CSS akan digunakan untuk **override** default flow

---

## Bagian L: Demo Akhir — Refleksi

### Pertanyaan untuk Dijawab Sendiri

Setelah seluruh halaman jadi, jawab pertanyaan ini (tulis di komentar HTML sebagai refleksi):

1. **Kenapa 4 produk tampil vertikal, bukan horizontal 4 kolom?**
   → Karena `<article>` adalah block. Default flow = block di-stack vertikal. Untuk 4 kolom horizontal butuh CSS Grid/Flexbox.

2. **Kenapa logo, search, cart di header tampil vertikal?**
   → Karena tanpa CSS, child elements (h1, form, a) semua block. Untuk horizontal butuh CSS Flexbox (`display: flex`).

3. **Kenapa `<span>` sebaris tapi `<div>` di baris baru?**
   → Karena `<span>` adalah inline, `<div>` adalah block. Definisi masing-masing tag.

4. **Kenapa tanpa CSS halaman "berantakan"?**
   → Karena default flow = block vertikal, inline horizontal. Untuk layout modern butuh CSS positioning.

5. **Apa bedanya padding dan margin?**
   → Padding = jarak dalam (content ke border). Margin = jarak luar (border ke element lain).

6. **Tag mana yang tepat untuk "wadah" konten?**
   → Semantic dulu (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`). `<div>` HANYA kalau tidak ada tag semantic yang cocok.

---

## Tabel Ringkasan

| Kategori | Tag | Display | Default Behavior |
|---|---|---|---|
| Block generik | `<div>` | block | Baris baru, full width |
| Inline generik | `<span>` | inline | Sebaris, sesuai konten |
| Paragraf | `<p>` | block | Baris baru, full width |
| Heading | `<h1>`-`<h6>` | block | Baris baru, font besar |
| List | `<ul>`, `<ol>`, `<li>` | block | Baris baru, full width |
| Sectioning | `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` | block | Baris baru, full width |
| Inline text | `<strong>`, `<em>`, `<b>`, `<i>` | inline | Sebaris |
| Inline khusus | `<a>`, `<mark>`, `<code>`, `<small>` | inline | Sebaris |
| Line break | `<br>` | inline | Baris baru di tengah teks |
| Horizontal rule | `<hr>` | block | Garis horizontal, baris baru |

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **Demo block: 3 `<div>` vertikal** (border merah kelihatan)
- [ ] **Demo inline: 3 `<span>` sebaris** (border biru kelihatan)
- [ ] **Demo mixed: paragraf dengan strong, em, a, mark, code, small** (semua sebaris)
- [ ] **4 `<article>` produk** tampil vertikal
- [ ] **`<aside>` di luar main** (atau di dalam, terserah — yang penting dipisah)
- [ ] **Footer di akhir body** dengan copyright
- [ ] **Inspect Element (F12)**: tiap block punya computed display = "block", tiap inline punya "inline"
- [ ] **Halaman TANPA CSS** — layout terlihat "berantakan" (vertikal) → **itu normal**
- [ ] **Pahami**: layout horizontal akan dipelajari di LEVEL 2 (CSS Flexbox/Grid)

---

## Cara Submit

1. Buka `code/10-document-flow.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save, buka di browser
4. **BUKA DevTools (F12) → Elements** — inspect tiap element, lihat computed `display: block` atau `display: inline`
5. **BUKA DevTools → Computed** — lihat box model tiap element
6. **Refleksi**: jawab 6 pertanyaan di Bagian L di komentar HTML
7. Verifikasi dengan checklist di atas
8. Kalau PASS, **selesai LEVEL 1!** Lanjut ke LEVEL 2 (CSS) untuk styling.

---

## Catatan Penting

> **Layout "berantakan" tanpa CSS ITU NORMAL.** Default flow browser = block vertikal, inline horizontal. Untuk layout modern (kartu horizontal, sidebar, grid) butuh CSS. LEVEL 1 fokus ke **struktur & semantic**, LEVEL 2 fokus ke **tampilan**.
>
> **`<div>` dan `<span>` adalah "escape hatch".** Pakai tag semantic dulu (`<header>`, `<section>`, `<article>`, `<aside>`, `<nav>`, `<footer>`, `<main>`). `<div>` hanya untuk wadah generik yang **tidak punya makna semantic**.
>
> **Box model = fondasi CSS.** Detail teknis di LEVEL 2, tapi konsep (content + padding + border + margin) sudah harus dipahami sekarang. Ibarat **4 lapis karton**: content = isinya, padding = busa pelindung dalam, border = kardus pembungkus, margin = ruang kosong antar kardus.
>
> **Block di dalam inline = INVALID.** Misal: `<span><div>X</div></span>` akan direfactor oleh browser (biasanya `<div>` "escape" keluar). Selalu cek: kalau butuh block di dalam sesuatu, parent-nya juga harus block.
>
> **Normal flow = "auto-pilot" browser.** CSS Positioning, Flexbox, Grid = "manual override". Mulai dari normal flow dulu, pelajari kapan perlu override.
>
> **Selesai LEVEL 1 = fondasi HTML solid.** Kamu sudah paham semantic HTML, form, table, multimedia, navigasi, SEO, A11y, dan document flow. Saatnya belajar **styling** dengan CSS di LEVEL 2.

<!-- markdownlint-enable MD024 MD028 -->

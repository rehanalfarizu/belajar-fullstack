<!-- markdownlint-disable MD024 MD028 -->

# SOAL 06 — Layout Artikel dengan Semantic HTML (2 Kolom)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menggunakan **semantic layout tags** dengan tepat: `<main>`, `<aside>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`
- Memahami bahwa setiap tag semantic punya **MAKNA**, bukan sekadar styling
- Memahami kenapa **TANPA CSS** pun, browser bisa menampilkan hierarki konten dengan benar lewat tag semantic
- Mengatur layout **2 kolom** (artikel + sidebar) **murni HTML** — tanpa CSS dulu
- Memahami bahwa `<main>` **hanya boleh SATU per halaman**

**Topik:** `<main>`, `<aside>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`, layout

**Referensi utama:**

- [MDN: Semantic HTML](https://developer.mozilla.org/id/docs/Glossary/Semantics)
- [MDN: `<main>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/main)
- [MDN: `<aside>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/aside)
- [MDN: `<article>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/article)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

### Overview Singkat Setiap Tag/Atribut (Baca Dulu Sebelum Mulai)

**`<main>`** — *Konten UTAMA halaman.* Ibarat **"inti berita"** di koran. Hanya boleh **SATU** per halaman. Elemen di luar main = elemen pendukung (header, aside, footer).

**`<article>`** — *Unit konten independen yang bisa berdiri sendiri.* Ibarat **satu artikel koran** — bisa dilepas, dipindah ke halaman lain, di-share, **masuk akal sendiri**. Contoh: post blog, berita, komentar, kartu produk.

**`<section>`** — *Pengelompokan tematik dalam dokumen.* Ibarat **"bab"** di buku. Selalu punya `<h1>`–`<h6>` pertama sebagai judul. Bukan untuk layout, tapi untuk **makna**.

**`<aside>`** — *Konten PENDUKUNG yang terkait tidak langsung.* Ibarat **sidebar** di koran: "artikel terkait", "tentang penulis", "iklan". Bisa dihilangkan **tanpa mengubah arti** artikel utama.

**`<header>`** — *Header untuk ARTIKEL/BAGIAN.* Bisa dipakai di page-level (header halaman) atau **di dalam** `<article>` (header artikel: judul, penulis, tanggal).

**`<footer>`** — *Footer untuk ARTIKEL/BAGIAN.* Sama seperti `<header>`, bisa di page-level atau di dalam `<article>` (footer artikel: tag, share links).

**`<nav>`** — *Blok navigasi.* Ibarat **menu restoran** — link ke section/halaman lain. Pakai `<ul>` + `<li>` + `<a>` di dalamnya.

**`aria-label` (atribut)** — *Label untuk screen reader.* Misal `<nav aria-label="Navigasi Utama">` — kalau ada banyak `<nav>` di halaman, aria-label bedakan satu sama lain.

---

## Briefing

Bayangkan kamu membuat **blog teknologi** yang menampilkan artikel panjang tentang programming. Artikel itu punya **header** (judul, penulis, tanggal), **beberapa section** (pendahuluan, pembahasan, penutup), dan **footer** (tag, share). Di samping artikel, ada **sidebar** dengan info penulis, artikel terkait, dan kategori.

Yang akan kamu bangun: **layout 2 kolom** (artikel di kiri, sidebar di kanan) **TANPA CSS** — murni HTML semantic. Browser modern akan otomatis menampilkan `<aside>` terpisah dari `<article>` lewat outline algoritma. Styling untuk posisi kolom dilakukan di LEVEL 2 (CSS).

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Baca Kapan Pakai & Kapan Jangan** — supaya tidak salah pilih
3. **Lihat Yang Terjadi di Browser** — bayangkan output
4. **Ketik dari 0** di `code/06-layout-artikel.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate + Judul Halaman

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Teknologi — Layout Artikel</title>
  <meta name="description" content="Contoh layout artikel blog 2 kolom dengan semantic HTML.">
</head>
<body>
  <!-- header + main + footer -->
</body>
</html>
```

### Verifikasi

- [ ] Boilerplate standar
- [ ] `<title>` deskriptif

---

## Bagian B: Page-Level `<header>` + `<nav>`

### Penjelasan

`<header>` di level halaman = **kepala website** (logo, tagline, navigasi utama). `<nav>` di dalamnya = **menu navigasi**.

**Bedanya `<header>` di page-level vs di dalam `<article>`:**
- Page-level: berisi **nama website, logo, menu utama**
- Article-level: berisi **judul artikel, penulis, tanggal** (lihat Bagian D)

### Pola Kode

```html
<header>
  <h1>TechBlog</h1>
  <p>Artikel tentang web development dan teknologi</p>
  <nav aria-label="Navigasi Utama">
    <ul>
      <li><a href="#">Beranda</a></li>
      <li><a href="#">Artikel</a></li>
      <li><a href="#">Tentang</a></li>
      <li><a href="#">Kontak</a></li>
    </ul>
  </nav>
</header>
```

### Yang Terjadi di Browser

- `<h1>` (di page-level header) tampil besar
- `<nav>` bisa horizontal atau vertikal (tergantung CSS, tanpa CSS = vertikal default)
- `aria-label="Navigasi Utama"` penting supaya screen reader bedakan nav ini dengan nav lain (kalau ada)

### Verifikasi

- [ ] `<header>` di awal body (sebelum `<main>`)
- [ ] `<nav aria-label="...">` (wajib aria-label supaya jelas)
- [ ] Nav pakai `<ul>` + `<li>` + `<a>` (best practice, bukan `<div>`)
- [ ] `<h1>` cuma ada **satu** di page-level header (jumlah total `<h1>` di halaman = 1)

---

## Bagian C: `<main>` sebagai Wadah Konten Utama

### Penjelasan

`<main>` = **konten UTAMA** halaman. Hanya boleh **SATU** per halaman. Semua konten yang **penting** ada di dalam main. Yang di luar main = **pendukung** (header, footer, sidebar global).

**Analogi:** Bayangkan **halaman koran**. `<main>` = artikel utama di halaman depan. Header = nama koran + tanggal. Footer = info redaksi. Sidebar = iklan / "artikel terkait".

### Kapan Pakai

- Wadah untuk **konten utama halaman** (artikel, listing produk, dll)

### Kapan Jangan

- **Jangan** lebih dari satu `<main>` per halaman
- **Jangan** masukkan nav, header page-level, atau footer di dalam `<main>` — itu di luar

### Pola Kode

```html
<main>
  <!-- article + aside -->
</main>
```

### Yang Terjadi di Browser

- `<main>` **tidak punya visual default** (transparan)
- Screen reader: "Main content" saat masuk area main
- Browser **auto-detect** main untuk skip link, "reader mode", dll

### Verifikasi

- [ ] Tepat **satu `<main>`** di seluruh halaman
- [ ] `<main>` ada **setelah** `<header>`, **sebelum** `<footer>`

---

## Bagian D: `<article>` — Unit Konten Independen

### Penjelasan

`<article>` = **unit konten yang BISA BERDIRI SENDIRI**. Bayangkan: kalau kamu copy-paste bagian ini ke halaman lain, **masuk akal sendiri**? Kalau ya, pakai `<article>`.

**Contoh yang BENAR pakai `<article>`:**
- Postingan blog
- Artikel berita
- Komentar
- Kartu produk
- Post forum

**Contoh yang SALAH pakai `<article>`:**
- Hanya untuk styling (pakai `<div>`)
- Untuk section generik (pakai `<section>`)

### Pola Kode — Article dengan Header, Section, Footer

```html
<article>
  <header>
    <h2>Judul Artikel</h2>
    <p>Oleh: <strong>Nama Penulis</strong> | <time datetime="2026-05-15">15 Mei 2026</time></p>
  </header>

  <section>
    <h3>Pendahuluan</h3>
    <p>Lead paragraph yang lebih besar...</p>
  </section>

  <section>
    <h3>Pembahasan</h3>
    <p>Isi pembahasan...</p>
  </section>

  <section>
    <h3>Penutup</h3>
    <p>Kesimpulan...</p>
  </section>

  <footer>
    <p>Tag: <a href="#">#web</a> <a href="#">#html</a></p>
  </footer>
</article>
```

### Yang Terjadi di Browser

- `<header>` di dalam `<article>` = **header khusus untuk artikel ini** (judul, penulis, tanggal)
- `<section>` membagi artikel jadi **bab** (Pendahuluan, Pembahasan, Penutup)
- `<footer>` di dalam `<article>` = **footer khusus artikel** (tag, share links)
- Heading hierarchy: `<h1>` di page-header → `<h2>` di article-header → `<h3>` di section

### Verifikasi

- [ ] `<article>` punya `<header>` sendiri (judul, penulis, tanggal)
- [ ] `<article>` punya minimal 2 `<section>` (Pendahuluan + Pembahasan/Penutup)
- [ ] `<article>` punya `<footer>` sendiri (tag, share)
- [ ] Heading hierarchy logis: `h1 (page) → h2 (article) → h3 (section)` (JANGAN loncat level)

---

## Bagian E: Elemen-elemen Pendukung di dalam `<article>`

### Penjelasan

Di dalam section, kita bisa pakai elemen lain untuk konten yang kaya:

- `<blockquote>` — kutipan panjang
- `<cite>` — sumber kutipan
- `<figure>` + `<img>` + `<figcaption>` — gambar dengan caption
- `<ol>` / `<ul>` — list
- `<strong>` — penting
- `<em>` — penekanan

(Semua sudah dibahas di soal 01–02.)

### Pola Kode

```html
<section>
  <h3>Pembahasan</h3>
  <p>Isi pembahasan...</p>

  <blockquote>
    <p>"Konten adalah raja. Pastikan artikelmu memberikan nilai tambah."</p>
    <cite>— John Doe, Pakar Konten Digital</cite>
  </blockquote>

  <figure>
    <img src="https://picsum.photos/800/400"
         alt="Ilustrasi pembahasan artikel"
         width="800" height="400"
         style="max-width: 100%;">
    <figcaption>Gambar 1: Ilustrasi konsep layout</figcaption>
  </figure>

  <ol>
    <li>Langkah pertama dalam membuat layout...</li>
    <li>Langkah kedua...</li>
    <li>Langkah ketiga...</li>
  </ol>
</section>
```

### Verifikasi

- [ ] Minimal 1 `<blockquote>` dengan `<cite>`
- [ ] Minimal 1 `<figure>` dengan `<img>` + `<figcaption>`
- [ ] Minimal 1 `<ol>` atau `<ul>`
- [ ] Pakai `<strong>` dan `<em>` untuk penekanan

---

## Bagian F: `<aside>` untuk Sidebar

### Penjelasan

`<aside>` = **konten PENDUKUNG**. Bisa dihilangkan **tanpa mengubah** makna halaman utama.

**Analogi:** Bayangkan **sidebar kanan di YouTube** — "Video Terkait", "Komentar". Hilangpun video utamanya tetap utuh.

### Kapan Pakai

- Sidebar di halaman (artikel terkait, kategori, info penulis)
- Catatan kaki yang menjauh dari konten utama
- Pull quote / kutipan besar terpisah dari alur baca

### Kapan Jangan

- Untuk konten yang **penting** — pakai `<section>` atau `<article>` di dalam main
- Untuk layout **hanya** tanpa makna — pakai `<div>`

### Pola Kode

```html
<aside>
  <h3>Tentang Penulis</h3>
  <img src="https://i.pravatar.cc/100?img=1"
       alt="Foto penulis Budi Santoso"
       width="100" height="100">
  <p>Budi Santoso adalah web developer dengan 5 tahun pengalaman...</p>

  <h3>Artikel Terkait</h3>
  <ul>
    <li><a href="#">Cara Membuat Layout Responsif</a></li>
    <li><a href="#">Memahami Semantic HTML</a></li>
    <li><a href="#">Tips SEO untuk Pemula</a></li>
  </ul>

  <h3>Kategori</h3>
  <p>
    <a href="#">#web</a>
    <a href="#">#html</a>
    <a href="#">#css</a>
  </p>
</aside>
```

### Yang Terjadi di Browser

- `<aside>` **tidak punya visual** tanpa CSS
- Screen reader: "Complementary content" (ARIA default untuk aside)
- Bisa dipindahkan ke kolom kanan/footer oleh CSS nanti (LEVEL 2)

### Verifikasi

- [ ] `<aside>` di dalam `<main>`, **setelah** `<article>` (atau di luar main, terserah konteks)
- [ ] Minimal 3 sub-section di aside (Tentang Penulis, Artikel Terkait, Kategori)
- [ ] Masing-masing sub-section punya `<h3>` (heading hierarchy benar)

---

## Bagian G: Layout 2 Kolom TANPA CSS (Konsep Saja)

### Penjelasan (PENTING — Pemahaman Konseptual)

**Tanpa CSS**, browser akan menampilkan `<article>` dan `<aside>` **bertumpuk vertikal** (atas-bawah), bukan kiri-kanan. Layout 2 kolom butuh CSS (akan dipelajari di LEVEL 2).

**TAPI** — kalau kamu inspect element dan baca struktur HTML, **SEMANTIC SUDAH BENAR**:
- `<article>` di kiri (secara logika)
- `<aside>` di kanan (secara logika)
- Screen reader, search engine, browser "reader mode" akan membedakan keduanya dengan benar

**Yang penting di LEVEL 1**: struktur semantic benar, bukan posisi visual.

### Verifikasi (Structural)

- [ ] Buka Inspect Element (F12)
- [ ] Lihat struktur: `body > main > [article, aside]` (sibling)
- [ ] Lihat heading hierarchy: `h1 → h2 → h3` (tanpa skip)
- [ ] HTML Validator PASS
- [ ] Layout visual akan "berantakan" (vertikal) — **itu normal**

---

## Bagian H: Page-Level `<footer>`

### Penjelasan

`<footer>` di level halaman = **kaki website** (copyright, link, kontak). **Beda** dengan `<footer>` di dalam `<article>` (footer khusus artikel).

### Pola Kode

```html
<footer>
  <p>&copy; 2026 TechBlog. All rights reserved.</p>
  <p>
    <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">GitHub</a> |
    <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
    <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer">Twitter</a>
  </p>
  <p><a href="#">↑ Kembali ke Atas</a></p>
</footer>
```

### Verifikasi

- [ ] `<footer>` di akhir body (setelah `</main>`)
- [ ] Copyright pakai `&copy;`
- [ ] Link eksternal pakai `target="_blank" rel="noopener noreferrer"`

---

## Tabel Ringkasan

| Kebutuhan | Tag | Catatan |
|---|---|---|
| Wadah konten utama | `<main>` | Hanya 1 per halaman |
| Unit konten independen | `<article>` | Bisa berdiri sendiri |
| Pengelompokan tematik | `<section>` | Selalu ada heading pertama |
| Konten pendukung | `<aside>` | Bisa hilang tanpa ubah makna |
| Header page-level | `<header>` | Di awal body |
| Header article | `<header>` | Di dalam article |
| Footer page-level | `<footer>` | Di akhir body |
| Footer article | `<footer>` | Di dalam article |
| Menu navigasi | `<nav>` | Selalu `<ul>` + `<li>` di dalam |

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **Hanya SATU `<main>`** di seluruh halaman (Ctrl+F)
- [ ] **Hanya SATU `<h1>`** di seluruh halaman (di page-level header)
- [ ] **Heading hierarchy logis**: `h1 → h2 → h3` (tidak loncat level)
- [ ] **`<article>` di dalam `<main>`**
- [ ] **`<aside>` di dalam `<main>`** (sebagai sibling article)
- [ ] **`<nav aria-label="...">`** (ada label)
- [ ] **`<header>` di awal body, `<footer>` di akhir body**
- [ ] **Inspect Element: struktur = `body > header + main + footer`**
- [ ] **Inspect Element: di dalam main = `article + aside`**

---

## Cara Submit

1. Buka `code/06-layout-artikel.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save, buka di browser
4. **BUKA DevTools (F12) → Elements** — lihat struktur HTML
5. **BUKA [validator.w3.org](https://validator.w3.org/)** — paste source, harus PASS
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/07-navigasi-dropdown.md`

---

## Catatan Penting

> **Layout 2 kolom butuh CSS.** Tanpa CSS, `<article>` dan `<aside>` akan tampil **vertikal** (atas-bawah). Itu bukan salah HTML — itu tampilan default browser. Untuk posisi kiri-kanan, kita akan belajar CSS Flexbox/Grid di LEVEL 2.
>
> **`<main>` HANYA SATU per halaman.** Kalau kamu merasa perlu `<main>` kedua, itu tanda kamu harus refactor. Konten utama tetap satu — yang lain = `<aside>`, `<section>`, atau `<article>` di dalam main.
>
> **Semantic HTML bukan soal tampilan, tapi soal MAKNA.** Pakai tag yang menggambarkan ISI konten. Tag yang salah = screen reader bingung, SEO turun, struktur tidak jelas.
>
> **`<header>` dan `<footer>` bisa nested.** Page-level: di body. Article-level: di dalam `<article>`. Keduanya valid, dan **tidak konflik** karena konteksnya berbeda.

<!-- markdownlint-enable MD024 MD028 -->

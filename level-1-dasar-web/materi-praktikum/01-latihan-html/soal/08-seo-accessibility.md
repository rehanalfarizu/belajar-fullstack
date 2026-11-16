<!-- markdownlint-disable MD024 MD028 -->

# SOAL 08 — SEO Meta Tags & Accessibility (A11y)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Memahami bedanya **SEO** (Search Engine Optimization) dan **A11y** (Accessibility)
- Menambahkan **meta tags SEO** di `<head>`: title, description, keywords, author, robots
- Menambahkan **Open Graph** untuk share ke media sosial
- Menambahkan **Twitter Card** untuk share ke Twitter
- Memahami **accessibility**: heading hierarchy, alt text, ARIA labels, skip link
- Membangun **skip-to-content link** untuk navigasi keyboard
- Memvalidasi halaman dengan **W3C Validator**

**Topik:** `<meta>`, `<link>`, Open Graph (`og:*`), Twitter Card, `aria-label`, `aria-describedby`, skip link, heading hierarchy

**Referensi utama:**

- [MDN: Meta tags untuk SEO](https://developer.mozilla.org/id/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
- [MDN: `<meta>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/meta)
- [OGP (Open Graph Protocol)](https://ogp.me/)
- [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

### Overview Singkat Setiap Tag/Atribut (Baca Dulu Sebelum Mulai)

**SEO (Search Engine Optimization)** — *Cara agar halaman muncul di atas hasil Google.* Search engine (Google, Bing) baca HTML kita dan menentukan "apakah halaman ini relevan dengan query user?". Meta tags + struktur heading = signal SEO utama.

**A11y (Accessibility)** — *Cara agar halaman bisa diakses SEMUA orang, termasuk penyandang disabilitas.* Tunanetra pakai screen reader, tuna netra parsial pakai zoom, tuna motor pakai keyboard only. A11y = HTML yang ramah untuk mereka.

**`<meta>`** — *Metadata tentang halaman (di `<head>`).* Tidak terlihat di browser, dipakai search engine, browser, dan platform lain. **Void element** (tidak butuh tutup).

**`<meta name="...">`** — *Meta untuk info standar.* `name="description"`, `keywords`, `author`, `robots`, `viewport`, dll.

**`<meta property="...">`** — *Meta untuk Open Graph.* Format: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.

**`<link>`** — *Hubungkan halaman ke resource eksternal.* Bisa `rel="stylesheet"` (CSS), `rel="icon"` (favicon), `rel="canonical"` (URL asli halaman).

**`viewport` meta** — *Atur area tampilan di HP.* `width=device-width, initial-scale=1.0` = lebar mengikuti device, zoom default 1x. **WAJIB** untuk responsive design.

**`charset="UTF-8"`** — *Encoding karakter.* Pakai UTF-8 supaya huruf Indonesia (é, ñ, ü, dst) tampil benar. **Wajib** di awal `<head>`.

**Open Graph (OG)** — *Metadata untuk share ke Facebook, LinkedIn, WhatsApp.* Saat link di-share, OG menentukan judul, deskripsi, dan gambar thumbnail yang muncul.

**Twitter Card** — *Metadata untuk share ke Twitter.* Mirip OG, format sendiri. Tanpa Twitter Card, share ke Twitter tampil polos.

**`canonical` link** — *URL resmi halaman.* Kalau ada banyak URL untuk konten sama (misal: `?utm_source=...`), `canonical` kasih tahu search engine URL mana yang utama. Menghindari duplikat content.

**`aria-label`** — *Label untuk screen reader.* (Sudah dibahas di soal 06.) Penting untuk `<nav>`, `<button>` icon-only, dll.

**`aria-describedby`** — *Hubungkan input ke hint/help text.* Misal: input password + `<small id="hint">Minimal 8 karakter</small>` + `aria-describedby="hint"`.

**Skip link** — *Link pertama di body, tersembunyi, muncul saat di-focus.* Loncat langsung ke `<main id="main-content">` tanpa harus Tab melewati nav.

**Heading hierarchy** — *Urutan heading logis (h1 → h2 → h3).* Jangan loncat (h1 → h3). Hanya satu `<h1>` per halaman. Search engine & screen reader pakai ini untuk memahami struktur.

---

## Briefing

Bayangkan kamu membuat **landing page company profile**. Halaman ini harus:
1. **Muncul di Google** dengan judul & deskripsi menarik (SEO)
2. **Tampak bagus** saat di-share ke Facebook/LinkedIn/WhatsApp (Open Graph)
3. **Bisa diakses** oleh tunanetra, tuna motor, dan orang dengan keterbatasan lain (A11y)

Tanpa SEO & A11y, **bahkan konten terbaik pun** tidak akan ditemukan, dan **banyak user tidak akan bisa mengakses** halamanmu.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Baca Kapan Pakai & Kapan Jangan** — supaya tidak salah pilih
3. **Lihat Yang Terjadi di Browser** — bayangkan output
4. **Ketik dari 0** di `code/08-seo-accessibility.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate Dasar (Review)

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Halaman (max 60 karakter)</title>
</head>
<body>
  <!-- skip link + header + main + footer -->
</body>
</html>
```

### Verifikasi

- [ ] Baris pertama `<!DOCTYPE html>`
- [ ] `<html lang="id">` (lang wajib untuk SEO & A11y)
- [ ] `<meta charset="UTF-8">` di awal `<head>`
- [ ] `<meta name="viewport">` (wajib untuk responsive)
- [ ] `<title>` max 60 karakter, deskriptif (ada keyword utama)

---

## Bagian B: Meta Tags SEO Standar

### Penjelasan

SEO meta tags di `<head>` = **kartu nama halaman** ke search engine. Tanpa ini, Google tidak tahu halamanmu tentang apa, dan tidak akan ditampilkan dengan benar di hasil pencarian.

### Tag Wajib

| Tag | Fungsi | Panjang Ideal |
|---|---|---|
| `<title>` | Judul yang muncul di tab browser & hasil Google | 50-60 karakter |
| `<meta name="description">` | Deskripsi di bawah judul di Google | 150-160 karakter |
| `<meta name="viewport">` | Area tampilan di HP | `width=device-width, initial-scale=1.0` |
| `<meta charset="UTF-8">` | Encoding karakter | UTF-8 |

### Tag Opsional (Tapi Bagus)

| Tag | Fungsi |
|---|---|
| `<meta name="keywords">` | Kata kunci (tidak terlalu penting untuk Google modern, tapi bagus) |
| `<meta name="author">` | Penulis halaman |
| `<meta name="robots" content="index, follow">` | Izin search engine index & follow link |

### Pola Kode

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Belajar Web Development dari Nol | Tutorial Gratis 2026</title>
  <meta name="description" content="Tutorial web development dari dasar. Belajar HTML, CSS, JavaScript, dan Node.js gratis untuk pemula dengan contoh praktis.">
  <meta name="keywords" content="web development, html, css, javascript, react, nodejs, tutorial">
  <meta name="author" content="Nama Penulis">
  <meta name="robots" content="index, follow">
</head>
```

### Kapan Pakai

- **Selalu** untuk halaman publik (company, blog, produk, portofolio)
- `<title>` + `<meta name="description">` = **WAJIB** untuk SEO
- `viewport` = **WAJIB** untuk responsive

### Kapan Jangan

- Jangan **klikbait** di description (Google akan turunkan ranking)
- Jangan **keyword stuffing** ("belajar html, belajar css, belajar js, belajar react, belajar node...") — Google hukum
- Jangan `<title>` kosong atau duplikat di banyak halaman

### Yang Terjadi di Search Engine

Google hasil pencarian:
```
Judul Halaman (dari <title>)
URL halaman (dari canonical/og:url)
Deskripsi menarik (dari <meta description>)
```

### Verifikasi

- [ ] `<title>` 50-60 karakter, deskriptif, ada keyword
- [ ] `<meta name="description">` 150-160 karakter, menarik, tidak duplicate
- [ ] `<meta name="viewport">` ada
- [ ] `<meta name="author">` dan `<meta name="robots">` ada

---

## Bagian C: Open Graph (Share ke Sosial Media)

### Penjelasan

Saat link website di-share ke **Facebook, LinkedIn, WhatsApp**, Open Graph (OG) menentukan **judul, deskripsi, dan gambar thumbnail** yang muncul. Tanpa OG, share tampak polos — hanya link + URL.

### Tag Wajib OG

| Tag | Fungsi |
|---|---|
| `og:title` | Judul saat di-share |
| `og:description` | Deskripsi saat di-share |
| `og:image` | URL gambar thumbnail (idealnya 1200×630 px) |
| `og:url` | URL halaman (canonical) |
| `og:type` | Tipe: `website`, `article`, `product`, dll |
| `og:site_name` | Nama website |

### Pola Kode

```html
<!-- Open Graph -->
<meta property="og:title" content="Belajar Web Development dari Nol">
<meta property="og:description" content="Tutorial web development gratis untuk pemula. Dari HTML dasar sampai deploy aplikasi.">
<meta property="og:image" content="https://situsku.com/og-image.jpg">
<meta property="og:url" content="https://situsku.com/belajar-web-dev">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SitusKu">
```

### Kapan Pakai

- Halaman publik yang mungkin di-share (artikel, produk, company profile)
- **WAJIB** untuk blog & company profile

### Kapan Jangan

- Untuk halaman **admin/private** (tidak perlu di-share)
- Pakai gambar yang **tidak ada** atau broken — share jadi jelek

### Yang Terjadi di Sosial Media

Saat share `https://situsku.com/artikel` ke WhatsApp:
```
[Thumbnail gambar dari og:image]
Judul (dari og:title)
Deskripsi (dari og:description)
situsku.com
```

### Verifikasi

- [ ] `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` ada
- [ ] `og:image` URL valid (cek dengan [OG Debugger](https://developers.facebook.com/tools/debug/))
- [ ] `og:image` ukuran ideal 1200×630 px

---

## Bagian D: Twitter Card

### Penjelasan

Mirip Open Graph, tapi untuk **Twitter/X**. Tanpa Twitter Card, share ke Twitter tampil polos (cuma URL + judul tab). Pakai `summary_large_image` untuk gambar besar.

### Pola Kode

```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Belajar Web Development dari Nol">
<meta name="twitter:description" content="Tutorial web development gratis untuk pemula.">
<meta name="twitter:image" content="https://situsku.com/twitter-image.jpg">
```

### Kapan Pakai

- Halaman yang di-share ke Twitter (artikel, announcement)
- Untuk **personal branding** di Twitter

### Kapan Jangan

- Kalau target audience **tidak ada di Twitter** (misal: hanya LinkedIn)
- Tanpa `twitter:card` = share polos (tidak apa-apa, tapi tidak menarik)

### Verifikasi

- [ ] `twitter:card` (default: `summary` atau `summary_large_image`)
- [ ] `twitter:title`, `twitter:description`, `twitter:image`

---

## Bagian E: Canonical Link & Favicon

### Penjelasan

`canonical` = **URL resmi** halaman. `favicon` = **icon kecil** di tab browser.

### Pola Kode

```html
<link rel="canonical" href="https://situsku.com/belajar-web-dev">
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

### Kapan Pakai Canonical

- Punya **banyak URL untuk konten sama** (misal: `?utm_source=...`, `?ref=...`)
- Konten hasil **syndication** (dipublish di banyak domain)

### Kapan Pakai Favicon

- **Selalu** untuk branding. Tanpa favicon, tab browser tampil icon default (biasanya kertas putih).

### Verifikasi

- [ ] `rel="canonical"` ada
- [ ] `rel="icon"` ada (atau direncanakan)

---

## Bagian F: Skip-to-Content Link

### Penjelasan

Skip link = **link pertama** di body, **tersembunyi** (off-screen), **muncul saat di-focus** (keyboard navigation). Memungkinkan user keyboard / screen reader **langsung loncat** ke konten utama, **tanpa harus Tab melewati nav** yang panjang.

**Analogi:** Bayangkan **lift di mall** — kalau kamu di lantai 1, kamu tidak harus jalan melewati semua toko di lantai 1 untuk sampai ke lantai 2. Skip link = "langsung ke konten" lift.

### Pola Kode

```html
<body>
  <!-- Skip link: pertama di body, tersembunyi sampai fokus -->
  <a href="#main-content" class="skip-link">Langsung ke Konten Utama</a>

  <header>
    <nav>...</nav>
  </header>

  <main id="main-content">
    <!-- konten -->
  </main>
</body>
```

**CSS untuk hide/show:**
```html
<!-- Pakai inline style untuk contoh ini, di LEVEL 2 akan dipisah ke file CSS -->
<style>
  .skip-link {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  .skip-link:focus {
    top: 10px;
    left: 10px;
    background: #000;
    color: #fff;
    padding: 10px;
    z-index: 100;
  }
</style>
```

**Atau pakai JavaScript sederhana (alternatif):**
```html
<a href="#main-content"
   style="position:absolute; top:-999px; left:-999px;"
   onfocus="this.style.top='10px'; this.style.left='10px';"
   onblur="this.style.top='-999px'; this.style.left='-999px';">
  Langsung ke Konten Utama
</a>
```

### Kapan Pakai

- **Selalu** untuk halaman dengan navigasi panjang
- **Wajib** untuk A11y (WCAG 2.4.1 Bypass Blocks)

### Kapan Jangan

- Untuk halaman **tanpa nav** (skip link jadi tidak berguna)

### Yang Terjadi di Browser

- Visual: link **tersembunyi** (off-screen)
- Tab pertama → link muncul di pojok kiri atas
- Enter → scroll ke `<main id="main-content">`
- Shift+Tab dari konten → kembali ke skip link

### Verifikasi

- [ ] Skip link adalah **element pertama** di body
- [ ] Skip link `href="#main-content"`
- [ ] Ada `<main id="main-content">` di halaman
- [ ] Test: tekan Tab sekali → skip link muncul → Enter → loncat ke main

---

## Bagian G: Heading Hierarchy

### Penjelasan

Heading hierarchy = **urutan heading logis** (h1 → h2 → h3). Search engine dan screen reader pakai ini untuk **memahami struktur** halaman.

**Aturan:**
- Hanya **SATU `<h1>`** per halaman
- Jangan loncat level: `h1 → h2 → h3` (BAGUS), `h1 → h3` (BURUK)
- Heading harus **menggambarkan isi section** (bukan cuma styling)

### Kapan Pakai Level Apa

| Level | Untuk |
|---|---|
| `<h1>` | Judul utama halaman / nama website (1 per halaman) |
| `<h2>` | Sub-bab / section utama |
| `<h3>` | Sub-sub-bab di dalam `<h2>` |
| `<h4>`-`<h6>` | Level lebih dalam (jarang dipakai) |

### Pola Kode — BENAR

```html
<h1>Nama Website</h1>           <!-- 1 per halaman -->
  <h2>Section 1</h2>            <!-- sub-bab -->
    <h3>Sub-section 1.1</h3>    <!-- sub-sub-bab -->
  <h2>Section 2</h2>
    <h3>Sub-section 2.1</h3>
```

### Pola Kode — SALAH

```html
<!-- SALAH: h1 ke h3, skip h2 -->
<h1>Judul</h1>
<h3>Sub-judul</h3>  <!-- ❌ skip h2 -->

<!-- SALAH: banyak h1 -->
<h1>Judul 1</h1>
<h1>Judul 2</h1>  <!-- ❌ lebih dari 1 h1 -->

<!-- SALAH: h1 untuk styling -->
<h3>Selamat Datang</h3>  <!-- ❌ harusnya h1 -->
```

### Verifikasi

- [ ] Hanya **1 `<h1>`** (Ctrl+F di VS Code)
- [ ] Heading logis: `h1 → h2 → h3` (tidak loncat)
- [ ] Heading **menggambarkan** konten section (bukan "Teks Besar" atau "Bagian Penting")

---

## Bagian H: Accessibility (A11y) — `aria-label`, `aria-describedby`, Semantic HTML

### Penjelasan

A11y adalah **bukan tambahan** — itu **bagian wajib** dari HTML. Tanpa A11y, **jutaan user** dengan disabilitas tidak bisa mengakses web kita.

### Checklist A11y Wajib

| Item | Implementasi |
|---|---|
| `<html lang="id">` | Bahasa halaman (untuk screen reader voice) |
| Heading hierarchy | `h1 → h2 → h3` (tidak loncat, 1 h1) |
| `<img alt="...">` | Setiap gambar punya alt deskriptif |
| `<a>` deskriptif | Bukan "klik di sini" / "read more" |
| `<label for="id">` | Setiap input punya label |
| `<nav aria-label="...">` | Nav punya label (kalau > 1 nav) |
| `<button>` | Untuk aksi, `<a>` untuk navigasi |
| Skip link | Untuk halaman dengan nav panjang |
| `aria-describedby` | Hint/help text untuk input |
| `<main>`, `<aside>`, `<header>`, `<footer>` | Pakai semantic, bukan `<div>` |

### Pola Kode

```html
<!-- Nav dengan aria-label (kalau > 1 nav) -->
<nav aria-label="Navigasi Utama">
  <ul>
    <li><a href="#tentang">Tentang</a></li>
    <li><a href="#kontak">Kontak</a></li>
  </ul>
</nav>

<!-- Input dengan label + aria-describedby -->
<label for="email">Email</label>
<input type="email" id="email" name="email"
       placeholder="nama@email.com"
       aria-describedby="email-hint" required>
<small id="email-hint">Kami tidak akan spam email kamu.</small>

<!-- Link deskriptif, BUKAN "klik di sini" -->
<a href="#artikel-lengkap">Baca artikel lengkap tentang CSS Grid</a>
<!-- ❌ BUKAN: <a href="#">klik di sini</a> -->
```

### Kapan Pakai

- **Selalu** untuk semua halaman publik

### Kapan Jangan

- Jangan `aria-label` berlebihan (misal: `<button aria-label="Klik tombol">Klik</button>` — tombol sudah jelas)
- Jangan skip semantic HTML demi ARIA (pakai `<button>` dulu, baru `aria-label` kalau perlu)

### Verifikasi

- [ ] Cek dengan [WAVE](https://wave.webaim.org/) atau [Axe DevTools](https://www.deque.com/axe/devtools/)
- [ ] **Test dengan keyboard only**: pakai Tab, Arrow, Enter. Semua aksi harus bisa dilakukan tanpa mouse
- [ ] **Test dengan screen reader** (VoiceOver di Mac, NVDA di Windows)

---

## Tabel Ringkasan

| Tujuan | Tag/Atribut | Wajib? |
|---|---|---|
| SEO judul | `<title>` | Wajib |
| SEO deskripsi | `<meta name="description">` | Wajib |
| Mobile | `<meta name="viewport">` | Wajib |
| Encoding | `<meta charset="UTF-8">` | Wajib |
| Share ke sosmed | `<meta property="og:*">` | Sangat disarankan |
| Share ke Twitter | `<meta name="twitter:*">` | Opsional |
| URL resmi | `<link rel="canonical">` | Penting untuk SEO |
| Tab icon | `<link rel="icon">` | Disarankan |
| Skip link | `<a href="#main-content">` (pertama di body) | Wajib untuk A11y |
| Bahasa | `lang="id"` di `<html>` | Wajib untuk A11y |
| Nav label | `aria-label` di `<nav>` | Kalau > 1 nav |
| Hint input | `aria-describedby` | Untuk form kompleks |
| Deskripsi gambar | `alt="..."` di `<img>` | Wajib untuk gambar informatif |

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **1 `<h1>` saja** di seluruh halaman
- [ ] **Heading hierarchy logis** (tidak loncat level)
- [ ] **Semua `<img>` punya `alt` deskriptif**
- [ ] **Skip link adalah element pertama di body**
- [ ] **`<main id="main-content">` ada**
- [ ] **`<nav aria-label="...">` (kalau > 1 nav)**
- [ ] **OG tags lengkap** (title, description, image, url, type, site_name)
- [ ] **Twitter Card lengkap**
- [ ] **Test keyboard**: Tab → skip link → Enter → loncat ke main
- [ ] **Test OG**: paste URL di [Facebook OG Debugger](https://developers.facebook.com/tools/debug/)

---

## Cara Submit

1. Buka `code/08-seo-accessibility.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save, buka di browser
4. **Test di [W3C Validator](https://validator.w3.org/)** — paste source code, harus PASS
5. **Test di [Facebook OG Debugger](https://developers.facebook.com/tools/debug/)** — paste URL halaman, lihat preview OG
6. **Test keyboard navigation** — tekan Tab, harus bisa navigasi tanpa mouse
7. Verifikasi dengan checklist di atas
8. Kalau PASS, lanjut ke `soal/09-form-lanjutan.md`

---

## Catatan Penting

> **SEO dan A11y bukan "tambahan opsional".** Itu **bagian wajib** dari HTML modern. Tanpa SEO, halamanmu tidak ditemukan. Tanpa A11y, banyak user tidak bisa akses.
>
> **Title 50-60 karakter, description 150-160 karakter.** Lebih dari itu akan terpotong di hasil Google. Tools untuk cek: [SERP Preview](https://serpsim.com/).
>
> **OG image ideal 1200×630 px.** Ukuran lain akan di-crop atau tampil jelek. Gambar harus accessible (ada teks yang bisa dibaca).
>
> **Skip link HARUS jadi element pertama di body.** Posisi ini penting — keyboard user harus langsung menemukan opsi "loncat" sebelum menabrak navigasi panjang.
>
> **`alt=""` (kosong) untuk gambar dekoratif HANYA** (icon, pattern). Untuk gambar informatif, **HARUS** deskriptif. Salah satu yang paling sering di-salah-ini pemula.
>
> **A11y bukan cuma untuk tunanetra.** A11y juga bantu: tuna motor (keyboard only), tuna rungu (caption video), tuna netra parsial (zoom 200%), user dengan koneksi lambat (text-only reader mode). Manfaatnya untuk **semua orang**.

<!-- markdownlint-enable MD024 MD028 -->

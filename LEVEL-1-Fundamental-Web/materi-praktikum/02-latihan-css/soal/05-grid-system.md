<!-- markdownlint-disable MD024 MD028 -->

# SOAL 05 — CSS Grid System

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **konsep CSS Grid**: container (parent), item (children), 2 dimensi
- Membedakan **Grid vs Flexbox** (kapan pakai yang mana)
- Menggunakan **container properties**: `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `gap`
- Menggunakan **item properties**: `grid-column`, `grid-row`, `grid-area`
- Membuat **page layout** dengan header + sidebar + main + footer
- Membuat **responsive grid** dengan `repeat(auto-fill, minmax(...))` tanpa media query
- Membuat **pricing table** dengan highlight di tengah

**Topik:** CSS Grid, grid template, grid areas, responsive grid, pricing layout

**Referensi utama:**

- [MDN: CSS Grid Layout](https://developer.mozilla.org/id/docs/Web/CSS/CSS_grid_layout)
- [CSS-Tricks: A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Grid Garden (game untuk belajar)](https://cssgridgarden.com/)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Di soal 03 kamu belajar **Flexbox** untuk layout 1 dimensi (baris ATAU kolom). Sekarang kamu akan belajar **CSS Grid** untuk layout **2 dimensi** (baris DAN kolom sekaligus).

**Analogi:** Bayangkan **lemari buku** dengan rak horizontal dan sekat vertikal — Flexbox = 1 baris buku, Grid = seluruh lemari dengan baris & kolom.

Yang akan kamu bangun adalah **3 layout Grid** dalam 1 halaman:

1. **Page layout** — header + sidebar + main + footer (full page)
2. **Product gallery** — gambar responsif yang otomatis wrap
3. **Pricing table** — 3 kolom dengan paket tengah "recommended"

Setelah selesai, kamu akan paham **kenapa Grid lebih powerful** dari Flexbox untuk layout halaman, dan kapan harus pakai yang mana.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Lihat Yang Terjadi di Browser** — bayangkan output
3. **Ketik dari 0** di `code/05-grid-system.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah jumlah kolom, ubah area, lihat perubahannya

---

## Bagian A: Konsep Dasar Grid (Container vs Item)

### Penjelasan

Sama seperti Flexbox, Grid juga punya **2 peran**:

- **Container** → element dengan `display: grid`. Ini "wadah besar" yang mengatur anak-anaknya.
- **Item** → element di dalam container. Bisa "ditempatkan" di kolom/baris tertentu.

**Bedanya dengan Flexbox:**

- **Flexbox** = 1 dimensi. Item diatur dalam **satu arah** (horizontal ATAU vertikal).
- **Grid** = 2 dimensi. Item diatur dalam **2 arah sekaligus** (horizontal DAN vertikal).

**Analogi:** Bayangkan **papan catur**:
- Container = papan catur
- Item = bidak catur
- Grid = baris + kolom (2D)

### Pola Kode Minimal

```html
<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

```css
.grid-container {
  display: grid; /* ← ini yang mengaktifkan Grid */
  grid-template-columns: 1fr 1fr; /* 2 kolom sama lebar */
  gap: 16px; /* jarak antar item */
}

.item {
  background: lightblue;
  padding: 20px;
  text-align: center;
}
```

### Yang Terjadi di Browser

- 4 item otomatis tersusun dalam **2 kolom × 2 baris**
- `1fr 1fr` artinya 2 kolom dengan lebar **sama rata** (`fr` = fraction, unit khusus Grid)
- `gap: 16px` memberi jarak antar item

### Wajib Ada di Kode Kamu

- Container dengan `display: grid`
- Minimal 4 item di dalamnya
- Minimal 2 kolom (`grid-template-columns`)

### Verifikasi

- [ ] `display: grid` di container
- [ ] Item tersusun dalam **2 dimensi** (kolom DAN baris), bukan cuma sebaris
- [ ] `gap` memberi jarak antar item

---

## Bagian B: `grid-template-columns` & `grid-template-rows`

### Penjelasan

**`grid-template-columns`** mendefinisikan **jumlah & lebar kolom**. **`grid-template-rows`** mendefinisikan **jumlah & tinggi baris**.

**Cara menulis nilai kolom:**

- **`100px 200px`** → kolom 1 = 100px, kolom 2 = 200px (fixed)
- **`1fr 1fr`** → 2 kolom sama rata (`fr` = fraction, fleksibel)
- **`1fr 2fr 1fr`** → 3 kolom, tengah 2x lebih lebar
- **`repeat(3, 1fr)`** → 3 kolom sama rata (sama dengan `1fr 1fr 1fr`)
- **`repeat(auto-fill, minmax(200px, 1fr))`** → kolom responsif tanpa media query
- **`100px 1fr 100px`** → kolom 1 dan 3 fixed, tengah fleksibel (sidebar + main + sidebar)

### Wajib Ada di Kode Kamu

- Container dengan `grid-template-columns: 250px 1fr` (sidebar + main)
- Container dengan `grid-template-rows: 60px 1fr 50px` (header + content + footer)
- Minimal 4 item yang tersusun sesuai template

### Pola Kode

```html
<div class="grid-container">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="main">Main Content</div>
  <div class="footer">Footer</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: 250px 1fr; /* sidebar 250px, main sisanya */
  grid-template-rows: 60px 1fr 50px; /* header 60px, main 1fr, footer 50px */
  min-height: 100vh; /* penuh tinggi layar */
  gap: 0; /* tidak ada gap (layout penuh) */
}
```

### Yang Terjadi di Browser

- Layout halaman dengan **sidebar 250px** di kiri, **main fleksibel** di kanan
- Header setinggi **60px**, footer **50px**, main isi sisanya (`1fr`)
- `min-height: 100vh` membuat layout setinggi viewport

### Kapan Pakai `1fr` vs Fixed

- **`1fr`** → ambil sisa ruang yang tersedia (bagian yang "menyesuaikan")
- **`fixed (px/rem)`** → ukuran tetap (sidebar, navbar, footer biasanya fixed)
- **Pola umum**: `grid-template-columns: [fixed] 1fr [fixed]` — fixed di kiri/kanan, fleksibel di tengah

### Verifikasi

- [ ] Container punya `display: grid` + `grid-template-columns` + `grid-template-rows`
- [ ] Layout halaman jelas: header atas, sidebar kiri, main kanan, footer bawah
- [ ] Resize browser: main mengecil/membesar, header/footer/sidebar tetap fixed

---

## Bagian C: `grid-template-areas` (Named Regions)

### Penjelasan

**`grid-template-areas`** memungkinkan kamu **menamai region** layout, lalu **menempatkan item** di region dengan `grid-area: nama`.

**Ini cara paling readable** untuk layout Grid — kamu bisa "melihat" struktur layout di kode CSS.

### Wajib Ada di Kode Kamu

- Container dengan `grid-template-areas` untuk layout: header + sidebar + main + footer
- Tiap child punya `grid-area: nama-region`
- Minimal 4 region: header, sidebar, main, footer

### Pola Kode

```css
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header  header"   /* baris 1: header full-width */
    "sidebar main"     /* baris 2: sidebar 250px, main 1fr */
    "footer  footer";  /* baris 3: footer full-width */
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

### Yang Terjadi di Browser

- **Header** di atas (full-width karena "header header" di baris 1)
- **Sidebar** di kiri (250px), **main** di kanan (1fr)
- **Footer** di bawah (full-width)
- **Struktur layout terlihat jelas** di kode CSS

### Cara Baca `grid-template-areas`

Setiap baris string = 1 baris di grid. Tiap kata = 1 kolom. Nama yang **sama** di posisi berbeda artinya **item yang sama** (untuk merge region).

```
"header  header"   ← kolom 1 = "header", kolom 2 = "header" (merge)
"sidebar main"     ← kolom 1 = "sidebar", kolom 2 = "main"
"footer  footer"   ← merge full-width
```

### Kapan Pakai

- **Page layout** yang kompleks — gampang dibaca
- **Dashboard** dengan banyak region (chart, sidebar, header, dll)
- **Layout yang perlu responsif** — bisa diubah di media query

### Verifikasi

- [ ] `grid-template-areas` menulis layout dalam string multi-baris
- [ ] Tiap child punya `grid-area` sesuai nama di template
- [ ] Inspect Element: di tab "Layout" panel Chrome, kamu bisa lihat area masing-masing

---

## Bagian D: Responsive Grid dengan `auto-fill` & `minmax`

### Penjelasan

Salah satu **fitur paling powerful** Grid: **grid responsif TANPA media query** dengan `repeat(auto-fill, minmax(MIN, MAX))`.

**Cara baca:** "Buat sebanyak mungkin kolom, minimal MIN, maksimal MAX".

### Contoh Penggunaan

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

**Yang terjadi:**

- Layar lebar (1200px): 6 kolom (200px × 6 = 1200px, semua muat)
- Layar sedang (800px): 4 kolom (200px × 4 = 800px, muat)
- Layar sempit (400px): 2 kolom (200px × 2 = 400px, muat)
- **Tanpa media query!** Browser otomatis hitung jumlah kolom

### Wajib Ada di Kode Kamu

- Gallery dengan `display: grid`
- `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`
- Minimal 6-8 item
- `gap: 16px`

### Pola Kode

```html
<div class="gallery">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <!-- dst minimal 6 item -->
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

.item {
  aspect-ratio: 1; /* kotak (1:1) */
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}
```

### Yang Terjadi di Browser

- **Resize browser**: jumlah kolom otomatis berubah
- **Tidak perlu media query** untuk responsive
- Semua item ukuran sama (karena `1fr`)

### Kapan Pakai

- **Photo gallery** / **product gallery** — item banyak, ukuran tidak pasti
- **Card listing** yang responsif
- **Dashboard widget** yang flow bebas
- Hampir semua kasus yang butuh **item sama besar + responsif**

### Kapan Jangan

- **Jangan** pakai untuk layout yang butuh **jumlah kolom tetap** (misal 3 kolom selalu, tidak lebih tidak kurang) — pakai `repeat(3, 1fr)`

### Verifikasi

- [ ] Minimal 6 item di gallery
- [ ] Resize browser: kolom otomatis bertambah/berkurang
- [ ] Tidak ada media query untuk responsive
- [ ] Inspect Element: jumlah `grid-template-columns` berubah sesuai lebar

---

## Bagian E: Pricing Table dengan `grid-column: span N`

### Penjelasan

Pricing table adalah pola umum: **3 paket** (Basic, Pro, Enterprise) dengan **paket tengah "recommended"** (lebih besar atau highlighted).

**`grid-column: span N`** artinya: "item ini ambil N kolom". Dipakai untuk **merge beberapa kolom jadi 1 sel** (mirip `colspan` di tabel HTML).

### Wajib Ada di Kode Kamu

- Container dengan 3 pricing card
- `grid-template-columns: 1fr 1fr 1fr` atau `repeat(3, 1fr)`
- Card tengah punya **styling berbeda** (misal `transform: scale(1.05)` atau `border: 2px solid accent`)
- Badge "Recommended" atau "Best Value" di card tengah

### Pola Kode

```html
<div class="pricing-table">
  <div class="pricing-card">
    <h3>Basic</h3>
    <p class="price">Rp 0</p>
    <ul>
      <li>1 project</li>
      <li>Community support</li>
    </ul>
    <button>Pilih</button>
  </div>
  
  <div class="pricing-card recommended">
    <span class="badge">Best Value</span>
    <h3>Pro</h3>
    <p class="price">Rp 99.000</p>
    <ul>
      <li>10 projects</li>
      <li>Priority support</li>
      <li>Custom domain</li>
    </ul>
    <button>Pilih</button>
  </div>
  
  <div class="pricing-card">
    <h3>Enterprise</h3>
    <p class="price">Rp 999.000</p>
    <ul>
      <li>Unlimited projects</li>
      <li>24/7 support</li>
    </ul>
    <button>Pilih</button>
  </div>
</div>
```

```css
.pricing-table {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 kolom sama rata */
  gap: 24px;
  padding: 32px;
  align-items: center; /* card tengan bisa lebih besar, tetap center */
}

.pricing-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pricing-card.recommended {
  border-color: #3b82f6;
  border-width: 2px;
  transform: scale(1.05); /* sedikit lebih besar */
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
  z-index: 1;
}

.pricing-card .badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b82f6;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.pricing-card h3 {
  margin-bottom: 16px;
}

.pricing-card .price {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1e293b;
}

.pricing-card ul {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.pricing-card li {
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
  color: #64748b;
}

.pricing-card button {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.pricing-card.recommended button {
  background: #1e40af;
}
```

### Yang Terjadi di Browser

- 3 card berjajar **sama lebar** (`repeat(3, 1fr)`)
- Card **tengah** lebih besar (`scale(1.05)`), ada **border biru** lebih tebal, **shadow** lebih dalam
- Badge "Best Value" di atas card tengah
- Tombol berbeda warna di card recommended

### Kapan Pakai `grid-column: span N`

Misal kamu punya **4 item** tapi mau item ke-2 ambil **2 kolom**:

```css
.item-special {
  grid-column: span 2; /* ambil 2 kolom */
}
```

**Kasus pakai:**

- Item **double-width** (banner, featured image)
- Item **khusus** yang lebih besar dari yang lain
- Layout **mosaik** / **pinterest-style**

### Verifikasi

- [ ] 3 card sama lebar
- [ ] Card tengah punya styling berbeda (border, scale, shadow)
- [ ] Badge "Best Value" atau "Recommended" di card tengah
- [ ] Tombol full-width di tiap card

---

## Bagian F: Responsive dengan Media Query

### Penjelasan

Walau Grid sudah punya `auto-fill` yang responsif, ada kasus di mana **jumlah kolom harus berubah drastis** (misal 3 kolom di desktop → 1 kolom di mobile). Pakai **media query**.

**Aturan mobile-first:** tulis CSS untuk **mobile dulu** (1 kolom), lalu tambah `@media (min-width: ...)` untuk **layar lebih besar**.

### Wajib Ada di Kode Kamu

- Gallery dengan `grid-template-columns: 1fr` di default (mobile)
- `@media (min-width: 640px)` → 2 kolom
- `@media (min-width: 1024px)` → 4 kolom

### Pola Kode

```css
.gallery {
  display: grid;
  grid-template-columns: 1fr; /* mobile: 1 kolom */
  gap: 16px;
  padding: 16px;
}

/* Tablet: 2 kolom */
@media (min-width: 640px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 4 kolom */
@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Yang Terjadi di Browser

- **Mobile** (<640px): 1 kolom, card full-width
- **Tablet** (640-1024px): 2 kolom
- **Desktop** (>1024px): 4 kolom
- **Resize browser**: layout berubah di breakpoint yang ditentukan

### Kapan Pakai Media Query

- Saat layout **harus berubah drastis** di ukuran tertentu (misal sidebar pindah ke bawah di mobile)
- Saat jumlah kolom **pasti** berbeda (misal selalu 4 di desktop, 2 di tablet, 1 di mobile)
- Saat perlu **layout alternatif** untuk mobile (bukan hanya "lebih sedikit kolom")

### Kapan Jangan

- **Jangan** pakai media query kalau cukup `auto-fill` + `minmax` saja (lebih simple)

### Verifikasi

- [ ] Default (mobile): 1 kolom
- [ ] Tablet (640-1024px): 2 kolom
- [ ] Desktop (>1024px): 4 kolom
- [ ] Resize browser: layout berubah sesuai breakpoint

---

## Ringkasan: Grid Properties

**Container properties:**

- `display: grid` → **wajib** untuk mengaktifkan Grid
- `grid-template-columns` → definisi kolom: `1fr 1fr`, `repeat(3, 1fr)`, `repeat(auto-fill, minmax(200px, 1fr))`
- `grid-template-rows` → definisi baris
- `grid-template-areas` → named regions (paling readable)
- `gap` → jarak antar item
- `align-items`, `justify-items` → posisi item dalam sel-nya

**Item properties:**

- `grid-column: span N` → ambil N kolom
- `grid-row: span N` → ambil N baris
- `grid-area: nama` → tempatkan di area yang dinamai
- `grid-column-start` / `grid-column-end` → posisi exact (advanced)

**Pattern umum:**

- **Page layout** → `grid-template-areas` untuk header/sidebar/main/footer
- **Responsive gallery** → `repeat(auto-fill, minmax(200px, 1fr))` (no media query)
- **Pricing table** → `repeat(3, 1fr)` + `grid-column: span 2` untuk item special
- **Responsive columns** → mobile-first dengan media query di breakpoint tertentu

**Kapan Pakai Grid vs Flexbox:**

- **Grid** → layout 2 dimensi (baris DAN kolom), page layout, gallery, complex dashboard
- **Flexbox** → layout 1 dimensi (baris ATAU kolom), navbar, card row sederhana, centering
- **Bisa dikombinasikan** → Grid untuk page layout, Flexbox untuk komponen di dalamnya

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 06, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **3 layout** sudah dibuat: page layout, gallery, pricing
- [ ] **Page layout**: header + sidebar + main + footer, dengan `grid-template-areas`
- [ ] **Gallery**: responsif tanpa media query (atau dengan), minimal 6 item
- [ ] **Pricing table**: 3 kolom sama rata, card tengah "recommended"
- [ ] **Badge absolute** di card tengah pricing (jika ada)
- [ ] **Responsive**: layout berubah saat resize browser
- [ ] **Browser menampilkan**:
  - Page layout penuh viewport dengan area yang jelas
  - Gallery: kolom otomatis bertambah/berkurang saat resize
  - Pricing: 3 card sama lebar, tengah lebih besar / highlighted

---

## Cara Submit

1. Buka `code/05-grid-system.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Eksperimen**:
   - Ubah `grid-template-columns: 1fr 1fr` jadi `1fr 2fr 1fr` — lihat perbedaannya
   - Coba `repeat(auto-fill, minmax(200px, 1fr))` vs `repeat(3, 1fr)` — bedanya apa
   - Tambah `grid-column: span 2` di salah satu item
   - Resize browser — lihat responsifitas
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/06-responsive-design.md`

---

## Catatan untuk Pemula

> **`repeat(auto-fill, minmax(MIN, MAX))` = responsive tanpa media query.** Ini fitur paling powerful Grid. Browser otomatis hitung jumlah kolom berdasarkan lebar container dan ukuran MIN. Sangat cocok untuk gallery.
>
> **`grid-template-areas` = cara paling readable untuk named layout.** Kalau layout kamu punya region yang jelas (header, sidebar, main, footer), pakai areas. Lebih mudah di-maintain daripada `grid-column-start: 1` / `grid-column-end: 2` manual.
>
> **Grid lebih powerful dari Flexbox untuk layout 2 dimensi.** Tapi bukan berarti selalu lebih baik. Untuk layout 1D (navbar, button row, simple card row), Flexbox lebih simple. Kombinasi: Grid untuk page layout, Flexbox untuk komponen di dalamnya.
>
> **`fr` adalah unit khusus Grid.** `1fr` = 1 fraction = bagian dari sisa ruang. Berbeda dengan `px` (fixed) atau `%` (persentase parent). `fr` lebih fleksibel karena otomatis menyesuaikan.
>
> **`grid-column: span N` = `colspan` di tabel HTML.** Keduanya untuk merge sel/kolom. Bedanya: di Grid, `span` lebih sederhana (cukup sebutkan jumlah), di HTML harus sebutkan start & end position.
>
> **Mobile-first: tulis CSS mobile dulu, lalu tambahkan media query untuk layar lebih besar.** Ini best practice. Default style = mobile. `@media (min-width: ...)` = enhancement untuk tablet/desktop. Lebih clean daripada max-width (yang override).
>
> **`aspect-ratio: 1` untuk kotak/lingkaran.** Property modern (Chrome 88+, Firefox 89+). Set rasio tinggi:lebar. `aspect-ratio: 1` = kotak, `aspect-ratio: 16/9` = widescreen. Berguna untuk gallery / video container.

<!-- markdownlint-enable MD024 MD028 -->

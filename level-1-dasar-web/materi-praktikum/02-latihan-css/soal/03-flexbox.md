<!-- markdownlint-disable MD024 MD028 -->

# SOAL 03 — Flexbox Dasar

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **konsep Flexbox**: container (parent) vs item (children), main axis vs cross axis
- Menggunakan **container properties**: `display: flex`, `justify-content`, `align-items`, `flex-wrap`, `gap`
- Menggunakan **item properties**: `flex: 1`, `min-width`, `flex-grow`, `align-self`
- Membuat **layout navbar horizontal** dengan `space-between`
- Melakukan **centering sempurna** (vertikal + horizontal) dengan `justify-content: center` + `align-items: center`
- Membuat **responsive card row** dengan `flex-wrap: wrap`

**Topik:** Flexbox container, Flexbox item, centering, responsive layout

**Referensi utama:**

- [MDN: Flexbox](https://developer.mozilla.org/id/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy (game untuk belajar)](https://flexboxfroggy.com/)

**Difficulty:** Pemula • **Estimasi:** 45-60 menit

---

## Briefing

Di soal 01 dan 02 kamu sudah bisa styling individual element dan pakai box model. Sekarang pertanyaannya: **bagaimana menyusun banyak element jadi layout yang rapi?**

Sebelumnya pakai `display: block` (default) — semua element di baris baru, tidak bisa "berdampingan" dengan mudah. Flexbox memecahkan ini: cukup set `display: flex` di **container**, dan **item di dalamnya otomatis tersusun** sesuai aturan yang kamu mau.

Yang akan kamu bangun adalah **4 layout berbeda** dalam 1 halaman:

1. **Navbar** — logo di kiri, menu di kanan
2. **Card row** — card berjajar, turun ke baris baru kalau tidak muat
3. **Centering** — content tepat di tengah layar (vertikal + horizontal)
4. **Card icon + text** — icon di kiri, text di kanan

Setelah selesai, kamu akan paham **kenapa Flexbox jadi default** untuk layout 1 dimensi (horizontal ATAU vertikal).

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya (main axis vs cross axis, container vs item)
2. **Lihat Yang Terjadi di Browser** — bayangkan output sebelum nulis
3. **Ketik dari 0** di `code/03-flexbox.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah `justify-content` dari `flex-start` ke `center` ke `space-between`, lihat perbedaannya

---

## Bagian A: Konsep Dasar Flexbox (Container vs Item)

### Penjelasan

Flexbox punya **2 peran**:

- **Container** (parent) → element yang punya `display: flex`. Ini "kotak besar" yang mengatur anak-anaknya.
- **Item** (children) → element **langsung** di dalam container. Ini yang diatur posisinya.

**2 axis (sumbu):**

- **Main axis** → arah utama layout. Default: horizontal (kiri → kanan).
- **Cross axis** → arah tegak lurus main axis. Kalau main horizontal, cross vertikal (atas → bawah).

**Analogi:** Bayangkan **rak buku horizontal**:
- Container = rak-nya
- Item = buku-buku di rak
- Main axis = arah buku berjajar (kiri-kanan)
- Cross axis = tinggi buku (atas-bawah)

### Pola Kode Minimal

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex; /* ← ini yang "mengaktifkan" Flexbox */
}

.item {
  padding: 20px;
  background: lightblue;
}
```

### Yang Terjadi di Browser

- 3 item `<div>` otomatis **berdampingan horizontal** (bukan di baris baru seperti default `block`)
- Lebar item = **sebesar kontennya** (kalau tidak di-set `flex: 1`)

### Wajib Ada di Kode Kamu

- Minimal 1 container dengan `display: flex`
- Minimal 3 item di dalamnya
- Komentar di CSS yang menjelaskan "ini container, ini item"

### Verifikasi

- [ ] `display: flex` di container
- [ ] Item di dalam container **berdampingan** (bukan di baris baru)
- [ ] Inspect Element: container punya display: flex, item punya display: block (atau flex-item)

---

## Bagian B: Navbar Horizontal dengan `justify-content: space-between`

### Penjelasan

**`justify-content`** mengatur posisi item di **main axis** (default: horizontal). Value yang sering dipakai:

- **`flex-start`** → item di kiri (default)
- **`flex-end`** → item di kanan
- **`center`** → item di tengah
- **`space-between`** → item pertama di kiri, item terakhir di kanan, sisanya bagi rata
- **`space-around`** → ada ruang di kiri-kanan tiap item

**Analogi `space-between`:** Bayangkan 3 orang berbaris, yang pertama di garis start, yang terakhir di garis finish, yang tengah pas di tengah.

### Wajib Ada di Kode Kamu

- `<nav>` dengan `display: flex` dan `justify-content: space-between`
- Logo di kiri, menu links di kanan
- `align-items: center` (supaya logo dan menu rata tengah secara vertikal)
- Background gelap, teks putih

### Pola Kode

```html
<nav class="navbar">
  <div class="logo">MyBrand</div>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #1e293b;
  color: white;
}

.menu {
  display: flex;
  gap: 16px;
  list-style: none;
}

.menu a {
  color: white;
  text-decoration: none;
}
```

### Yang Terjadi di Browser

- Logo "MyBrand" di **kiri**, menu "Home/About/Contact" di **kanan**
- Semua elemen **rata tengah vertikal** (logo & menu sejajar)
- Ada jarak (`gap: 16px`) antar menu item

### Kapan Pakai

- **Navbar**: logo kiri, menu kanan
- **Header dengan 2 grup**: judul kiri, action kanan
- **Card dengan icon kiri, tombol kanan**

### Kapan Jangan

- **Jangan** pakai `space-between` untuk **2 item** yang posisinya seharusnya di tengah — pakai `center`

### Verifikasi

- [ ] Logo di kiri, menu di kanan (pakai `space-between`)
- [ ] Semua element rata vertikal (pakai `align-items: center`)
- [ ] Menu links saling terpisah dengan `gap` (bukan margin)

---

## Bagian C: Centering Sempurna (Vertikal + Horizontal)

### Penjelasan

Salah satu **paling sulit** di CSS tradisional (perlu banyak trick), tapi **paling mudah** di Flexbox:

- `justify-content: center` → center di **main axis** (horizontal, by default)
- `align-items: center` → center di **cross axis** (vertikal, by default)
- Kombinasikan keduanya + set `height: 100vh` → center **sempurna di tengah layar**

### Wajib Ada di Kode Kamu

- Container dengan `height: 100vh` (full viewport height)
- `display: flex` + `justify-content: center` + `align-items: center`
- Minimal 1 element di dalamnya (akan ke-center)

### Pola Kode

```html
<div class="fullscreen">
  <div class="box">
    <h1>Aku di Tengah Layar!</h1>
    <p>Persis di tengah vertikal & horizontal</p>
  </div>
</div>
```

```css
.fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* penuh setinggi layar */
  background: #f0f0f0;
}

.box {
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}
```

### Yang Terjadi di Browser

- `.box` **persis di tengah** layar — vertikal (atas-bawah) dan horizontal (kiri-kanan)
- Resize browser: `.box` tetap di tengah (karena `100vh` responsive)
- Tampilan "hero section" atau "loading screen" klasik

### Kapan Pakai

- **Hero section** di landing page
- **Login/Register form** yang center di layar
- **Loading screen** atau **empty state**
- **Modal dialog** (tinggal tambah `position: fixed`)

### Verifikasi

- [ ] Element **persis di tengah** layar (vertikal + horizontal)
- [ ] Resize browser: element tetap di tengah
- [ ] `100vh` membuat container setinggi viewport

---

## Bagian D: `align-items` (Cross Axis)

### Penjelasan

**`align-items`** mengatur posisi item di **cross axis** (default: vertikal). Value yang sering dipakai:

- **`stretch`** → item memenuhi seluruh cross axis (default, kalau tidak ada `height`)
- **`flex-start`** → item di atas (kalau main horizontal)
- **`flex-end`** → item di bawah
- **`center`** → item di tengah cross axis

**Analogi:** Kalau `justify-content` ngatur "kiri-tengah-kanan" (horizontal), `align-items` ngatur "atas-tengah-bawah" (vertikal).

### Wajib Ada di Kode Kamu

- Container dengan `display: flex`
- Minimal 3 item dengan `height` berbeda
- Demonstrasi `align-items: center` (semua item rata tengah, tidak stretch)

### Pola Kode

```html
<div class="row">
  <div class="item small">Kecil</div>
  <div class="item medium">Sedang</div>
  <div class="item large">Besar</div>
</div>
```

```css
.row {
  display: flex;
  align-items: center; /* semua item rata tengah vertikal */
  gap: 16px;
  padding: 16px;
  background: #f0f0f0;
}

.small  { height: 40px; }
.medium { height: 60px; }
.large  { height: 80px; }
```

### Yang Terjadi di Browser

- 3 item dengan tinggi **berbeda-beda** (40, 60, 80px)
- Semua item **rata tengah vertikal** (bukan stretch memenuhi container, bukan nempel atas)
- Garis tengah item sejajar satu sama lain

### Kapan Pakai

- **Card row** dengan tinggi konten beda — supaya **baseline** rata
- **Icon + text**: icon di kiri, text di kanan, **vertikal center** (supaya tidak "naik turun")

### Verifikasi

- [ ] Item dengan tinggi berbeda tapi **baseline rata tengah**
- [ ] Bukan `flex-start` (nempel atas) atau `stretch` (penuhi container)
- [ ] Inspect Element: align-items aktif

---

## Bagian E: Responsive Card Row dengan `flex-wrap`

### Penjelasan

Secara default, Flexbox **membuat item sebaris** (tidak ada baris baru). Tapi kalau item terlalu banyak, container akan **overflow** (melebar ke kanan, ada scroll horizontal).

**`flex-wrap: wrap`** → izinkan item turun ke **baris baru** kalau tidak muat. Ini **kunci responsive** Flexbox.

**Kasus pakai:** Card gallery, product list, tag cloud — yang jumlah itemnya banyak dan tidak pasti.

### Wajib Ada di Kode Kamu

- Container dengan `display: flex; flex-wrap: wrap; gap: 16px`
- Minimal 4-6 card di dalamnya
- Tiap card punya `flex: 1` dan `min-width: 250px` (supaya minimal 250px sebelum turun)

### Pola Kode

```html
<div class="card-container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>
```

```css
.card-container {
  display: flex;
  flex-wrap: wrap; /* ←izinkan turun baris */
  gap: 16px;
  padding: 16px;
}

.card {
  flex: 1; /* isi ruang tersisa */
  min-width: 250px; /* jangan lebih kecil dari 250px */
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

### Yang Terjadi di Browser

- **Layar lebar** (>800px): 3-4 card per baris
- **Layar sedang** (500-800px): 2 card per baris
- **Layar sempit** (<500px): 1 card per baris (penuh)
- **Tanpa** media query! `flex-wrap` + `min-width` sudah cukup

### Kapan Pakai

- **Card gallery** atau **product list** — itemnya dinamis
- **Tag cloud** atau **chip list**
- **Photo gallery** (foto dengan aspect ratio)
- **Grid sederhana** (tanpa perlu Grid)

### Kapan Jangan

- **Jangan** pakai `flex-wrap` untuk layout 2 dimensi yang kompleks — itu tugas **CSS Grid** (soal 05)

### Verifikasi

- [ ] Minimal 4 card di container
- [ ] Resize browser: card turun ke baris baru saat tidak muat
- [ ] Tidak ada scroll horizontal (semua muat dalam viewport)
- [ ] `min-width` membuat card tidak terlalu kecil

---

## Bagian F: `flex: 1` dan Item Properties

### Penjelasan

**`flex`** adalah **shorthand** untuk 3 property:

- **`flex-grow: 1`** → item **tumbuh** untuk mengisi sisa ruang
- **`flex-shrink: 1`** → item **menyusut** saat tidak muat
- **`flex-basis: 0%`** → ukuran **awal** item (0 = dihitung dari sisa ruang)

**`flex: 1`** = ketiga nilai di atas. Artinya: "isi ruang yang tersedia, rata".

**Kasus pakai:**

- 3 card dengan `flex: 1` → **lebar sama rata**, isi penuh container
- 2 card dengan `flex: 1` + 1 card dengan `flex: 2` → yang terakhir **2x lebih lebar**

### Wajib Ada di Kode Kamu

- Container dengan 3 card
- Card 1: `flex: 1` (lebar normal)
- Card 2: `flex: 2` (2x lebih lebar)
- Card 3: `flex: 1` (lebar normal)

### Pola Kode

```html
<div class="container">
  <div class="card flex-1">1x</div>
  <div class="card flex-2">2x lebih lebar</div>
  <div class="card flex-1">1x</div>
</div>
```

```css
.container {
  display: flex;
  gap: 16px;
}

.card {
  background: lightblue;
  padding: 20px;
  text-align: center;
}

.flex-1 { flex: 1; }
.flex-2 { flex: 2; }
```

### Yang Terjadi di Browser

- 3 card dengan rasio lebar 1 : 2 : 1
- Card tengah 2x lebih lebar dari card kiri/kanan
- Semua card tetap dalam 1 baris (tidak wrap)

### Kapan Pakai

- **Card dengan ukuran berbeda** dalam 1 baris
- **Sidebar + main content** (sidebar `flex: 1`, main `flex: 3`)
- **Equal-width columns** (`flex: 1` di semua)

### Verifikasi

- [ ] Card dengan `flex: 1` dan `flex: 2` punya lebar berbeda
- [ ] Semua card dalam 1 baris
- [ ] Resize browser: rasio tetap (1:2:1)

---

## Bagian G: `gap` vs `margin` di Flex

### Penjelasan

**`gap`** = jarak antar item Flexbox. Lebih baik dari `margin` karena:

- Hanya berlaku **antar item** (bukan antara item dan tepi container)
- Tidak menyebabkan **margin collapse** yang sering membingungkan
- Lebih **intuitif**: "ada jarak 16px antar item"

**Kasus pakai:**

- Menu dengan item yang terpisah → `gap: 16px`
- Card row dengan jarak → `gap: 16px`
- Form dengan field terpisah → `gap: 12px`

### Wajib Ada di Kode Kamu

- Bandingkan: container dengan `gap` vs container dengan `margin` antar item
- Tunjukkan perbedaan (gap tidak ada di tepi, margin ada)

### Pola Kode

```css
/* Cara modern (RECOMMENDED) */
.menu-with-gap {
  display: flex;
  gap: 16px; /* jarak antar item, tanpa margin tepi */
}

/* Cara lama (kurang ideal) */
.menu-with-margin > * + * {
  margin-left: 16px; /* jarak antar sibling, tapi repot */
}
```

### Yang Terjadi di Browser

- **`gap`**: jarak 16px antar item, **tanpa** jarak di tepi container
- **`margin`**: jarak 16px antar item, **tapi** ada effort lebih dan sering buggy

### Kapan Pakai

- **Selalu** untuk Flexbox / Grid. `gap` adalah best practice modern.

### Kapan Jangan

- **Jangan** pakai `margin` di antara flex item — pakai `gap`

### Verifikasi

- [ ] Pakai `gap` di minimal 1 container
- [ ] Tidak ada `margin` antar flex item
- [ ] Inspect Element: gap terlihat di Computed styles

---

## Ringkasan: Flexbox Properties

**Container properties:**

- `display: flex` → **wajib** untuk mengaktifkan Flexbox
- `justify-content` → posisi di main axis (default horizontal): `flex-start`, `center`, `flex-end`, `space-between`
- `align-items` → posisi di cross axis (default vertikal): `stretch`, `flex-start`, `center`, `flex-end`
- `flex-wrap` → `nowrap` (default) atau `wrap` (turun baris)
- `gap` → jarak antar item (bukan margin)

**Item properties:**

- `flex: 1` → isi ruang tersisa (shorthand untuk grow/shrink/basis)
- `flex: 2` → 2x lebih lebar dari `flex: 1`
- `min-width` → batas minimum sebelum wrap
- `align-self` → override `align-items` untuk 1 item tertentu

**Pattern umum:**

- **Navbar horizontal** → `display: flex; justify-content: space-between; align-items: center`
- **Centering sempurna** → `display: flex; justify-content: center; align-items: center; height: 100vh`
- **Responsive cards** → `display: flex; flex-wrap: wrap; gap: 16px` + `flex: 1; min-width: 250px` di item

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 04, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **4 layout** sudah dibuat: navbar, card row, centering, icon+text
- [ ] **Container punya `display: flex`** (bukan block atau inline)
- [ ] **Nav bar**: logo kiri, menu kanan (space-between)
- [ ] **Centering**: element persis di tengah layar (vertikal + horizontal)
- [ ] **Card row**: minimal 4 card, responsive (turun baris saat sempit)
- [ ] **Icon + text card**: icon di kiri, text di kanan, align-items center
- [ ] **Hover effect** (bonus): card ada transform/shadow saat hover
- [ ] **Browser menampilkan**:
  - Navbar dengan logo kiri dan menu kanan
  - Centering box persis di tengah layar
  - Card row dengan gap antar card
  - Card dengan icon di kiri, text rata tengah vertikal

---

## Cara Submit

1. Buka `code/03-flexbox.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Eksperimen**:
   - Ubah `justify-content` dari `flex-start` ke `center` ke `space-between` — lihat perbedaannya
   - Ubah `flex-wrap` ke `nowrap` — lihat apa yang terjadi
   - Coba `flex: 2` di satu card dan `flex: 1` di card lain
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/04-card-component.md`

---

## Catatan untuk Pemula

> **`flex-wrap: wrap` adalah kunci responsive flex layout.** Tanpa `wrap`, item Flexbox akan **maksa sebaris** dan container akan melebar (ada scroll horizontal). Dengan `wrap`, item otomatis turun ke baris baru.
>
> **`flex: 1` = `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`.** Ini shorthand yang sangat sering dipakai. Artinya: "isi ruang yang tersedia, rata dengan sibling lain". Untuk equal-width columns, pakai `flex: 1` di semua.
>
> **`gap` lebih baik dari `margin` untuk spasi antar flex items.** `gap` hanya berlaku antar item (bukan di tepi container), tidak ada margin collapse, dan lebih intuitif. Best practice: pakai `gap` di Flexbox & Grid.
>
> **`align-items: center` untuk centering dalam item.** Sering bingung: `justify-content` untuk main axis (horizontal default), `align-items` untuk cross axis (vertikal default). Untuk centering 2D sempurna, butuh keduanya.
>
> **Item Flexbox = anak LANGSUNG dari container.** Kalau ada element yang dibungkus div lain di dalam container, div wrapper itu yang jadi flex item, bukan isinya.
>
> **Flexbox 1 dimensi, Grid 2 dimensi.** Flexbox untuk layout 1D (baris ATAU kolom). Kalau kamu butuh layout 2D (baris DAN kolom), pakai **CSS Grid** (soal 05).

<!-- markdownlint-enable MD024 MD028 -->

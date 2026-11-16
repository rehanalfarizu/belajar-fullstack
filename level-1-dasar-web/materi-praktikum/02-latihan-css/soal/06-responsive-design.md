<!-- markdownlint-disable MD024 MD028 -->

# SOAL 06 — Responsive Design

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **apa itu responsive design** dan kenapa penting
- Menerapkan **mobile-first** approach (default = mobile)
- Menggunakan **media query** dengan `@media (min-width: ...)` dan `@media (max-width: ...)`
- Mengetahui **breakpoint umum** (sm, md, lg, xl)
- Membuat **navbar responsif** (menu hamburger di mobile, menu penuh di desktop)
- Membuat **grid card responsif** (1/2/3 kolom sesuai layar)
- Menggunakan **viewport meta tag** untuk render mobile yang benar
- Menggunakan **`rem` vs `px`** untuk typography responsif

**Topik:** responsive design, mobile-first, media query, breakpoint, viewport meta, hamburger menu, responsive typography

**Referensi utama:**

- [MDN: Media Queries](https://developer.mozilla.org/id/docs/Web/CSS/Media_Queries/Using_media_queries)
- [MDN: Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)
- [MDN: @media rule](https://developer.mozilla.org/id/docs/Web/CSS/@media)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Di soal 05 kamu belajar Grid yang bisa responsif dengan `auto-fill`. Tapi untuk **perubahan layout drastis** (misal sidebar pindah ke bawah di mobile), kita butuh **media query**.

Yang akan kamu bangun adalah **1 halaman dashboard** yang **tampilannya berubah total** di mobile, tablet, dan desktop:

- **Mobile** (<640px): 1 kolom, navbar hamburger, semua ditumpuk vertikal
- **Tablet** (640-1024px): 2 kolom, navbar menampilkan menu
- **Desktop** (>1024px): 3+ kolom, navbar penuh, header sticky

Setelah selesai, kamu akan paham **mobile-first approach** dan cara pakai **media query** dengan benar.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Lihat Yang Terjadi di Browser** — bayangkan output di tiap ukuran layar
3. **Ketik dari 0** di `code/06-responsive-design.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Test resize** — kecilkan browser, lihat perubahannya

---

## Bagian A: Mobile-First Approach

### Penjelasan

Ada 2 pendekatan responsive design:

1. **Desktop-first** → tulis CSS untuk desktop dulu, lalu tambahkan media query untuk layar kecil (`max-width`)
2. **Mobile-first** → tulis CSS untuk mobile dulu, lalu tambahkan media query untuk layar besar (`min-width`)

**Best practice: mobile-first.** Kenapa?

- Mayoritas traffic web saat ini dari mobile (60%+)
- Lebih mudah "menambah" kompleksitas dari mobile ke desktop, daripada "mengurangi" dari desktop ke mobile
- Performance: CSS mobile-first lebih ringan di mobile (yang butuh ringan)
- Sesuai prinsip **progressive enhancement**

**Cara baca mobile-first:**

- Default CSS (tanpa media query) = style untuk **mobile**
- `@media (min-width: 640px)` = "tambahan" untuk layar ≥640px (tablet ke atas)

### Wajib Ada di Kode Kamu

- Default CSS yang **mobile-friendly** (1 kolom, font readable, sentuh target cukup besar)
- Tidak ada `@media (max-width: ...)` (itu desktop-first, bukan mobile-first)
- Pakai `@media (min-width: ...)` untuk enhancement

### Pola Kode

```css
/* DEFAULT = MOBILE */
.card {
  width: 100%;        /* penuh di mobile */
  padding: 16px;
  font-size: 14px;
}

/* TABLET */
@media (min-width: 640px) {
  .card {
    width: calc(50% - 8px); /* 2 kolom */
    font-size: 16px;
  }
}

/* DESKTOP */
@media (min-width: 1024px) {
  .card {
    width: calc(33.33% - 12px); /* 3 kolom */
    font-size: 18px;
  }
}
```

### Yang Terjadi di Browser

- **Mobile**: 1 card per baris
- **Tablet**: 2 card per baris
- **Desktop**: 3 card per baris
- Font membesar sesuai layar

### Perbandingan Mobile-First vs Desktop-First

| Pendekatan | Default | Media Query | CSS Load |
|---|---|---|---|
| Mobile-first | Mobile | `min-width: 640px` (tambah) | Mobile load ringan |
| Desktop-first | Desktop | `max-width: 640px` (override) | Mobile load semua |

### Verifikasi

- [ ] Default CSS (di luar media query) untuk **mobile** (1 kolom, font kecil)
- [ ] Pakai `@media (min-width: ...)` (bukan `max-width`)
- [ ] Tidak ada override (semua "tambah" saja)

---

## Bagian B: Viewport Meta Tag

### Penjelasan

Tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` adalah **WAJIB** untuk responsive design. Tanpa ini, browser HP akan **zoom out** halaman web supaya muat di layar kecil.

**Sebelum viewport meta:**

- HP menampilkan halaman **sama seperti desktop** (di-zoom out)
- Teks terlalu kecil untuk dibaca
- User harus pinch-to-zoom untuk baca

**Dengan viewport meta:**

- HP menampilkan halaman **sesuai lebar device** (default 1:1)
- Responsive CSS bekerja dengan benar
- Media query berdasarkan lebar device

### Wajib Ada di Kode Kamu

- Tag viewport di dalam `<head>`
- `content="width=device-width, initial-scale=1.0"`

### Pola Kode

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Dashboard</title>
</head>
```

### Yang Terjadi di Browser (di HP)

- **Tanpa viewport meta**: halaman zoom out, teks sangat kecil
- **Dengan viewport meta**: halaman render sesuai device, responsive CSS aktif

### Verifikasi

- [ ] Tag viewport ada di `<head>`
- [ ] `width=device-width` (bukan `width=1024` atau fixed number)
- [ ] `initial-scale=1.0`

---

## Bagian C: Breakpoint Standar

### Penjelasan

**Breakpoint** adalah **lebar layar** tertentu di mana layout berubah. **Tidak ada standar universal**, tapi yang umum dipakai:

| Breakpoint | Lebar | Disebut |
|---|---|---|
| Default | <640px | Mobile |
| `sm` | 640px | Small tablet (portrait) |
| `md` | 768px | Tablet (landscape) |
| `lg` | 1024px | Laptop, desktop kecil |
| `xl` | 1280px | Desktop besar |
| `2xl` | 1536px | Layar sangat besar |

**Framework Tailwind** menggunakan breakpoint di atas. Kita akan **mengikuti konvensi yang sama** agar konsisten.

### Wajib Ada di Kode Kamu

- 3 media query: `640px` (sm), `1024px` (lg), `1280px` (xl)
- Styling berbeda di tiap breakpoint

### Pola Kode

```css
/* Default: mobile (<640px) */
.container { padding: 16px; }

/* sm: tablet ke atas (≥640px) */
@media (min-width: 640px) {
  .container { padding: 24px; }
}

/* lg: laptop ke atas (≥1024px) */
@media (min-width: 1024px) {
  .container { padding: 32px; }
}

/* xl: desktop besar (≥1280px) */
@media (min-width: 1280px) {
  .container { padding: 48px; max-width: 1200px; margin: 0 auto; }
}
```

### Verifikasi

- [ ] Pakai breakpoint yang umum (640, 768, 1024, 1280)
- [ ] Tidak ada breakpoint "random" (misal 700px, 950px) kecuali ada kebutuhan spesifik
- [ ] Konsisten dengan framework convention

---

## Bagian D: Responsive Card Grid (1 → 2 → 3 kolom)

### Penjelasan

Pattern paling umum responsive: **card grid** yang berubah jumlah kolom sesuai lebar layar.

**Mobile**: 1 kolom (card full-width)
**Tablet**: 2 kolom (card 50% lebar)
**Desktop**: 3 kolom (card 33% lebar)

### Wajib Ada di Kode Kamu

- Container dengan `display: flex; flex-wrap: wrap; gap: 16px`
- Default mobile: `flex-direction: column` (1 kolom)
- `min-width: 640px`: `flex-direction: row` (2 kolom)
- `min-width: 1024px`: 3 kolom dengan `width: calc(33.33% - 12px)`
- Minimal 4-6 card

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
  flex-direction: column; /* mobile: 1 kolom */
  gap: 16px;
  padding: 16px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* mobile: full-width */
}

/* Tablet: 2 kolom */
@media (min-width: 640px) {
  .card-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card {
    width: calc(50% - 8px); /* 50% - setengah gap */
  }
}

/* Desktop: 3 kolom */
@media (min-width: 1024px) {
  .card {
    width: calc(33.33% - 12px); /* 33% - sebagian gap */
  }
}
```

### Yang Terjadi di Browser

- **Mobile** (<640px): card tersusun **vertikal**, 1 per baris
- **Tablet** (640-1024px): 2 card per baris
- **Desktop** (>1024px): 3 card per baris
- **Resize browser** → layout berubah halus

### Rumus `calc(N% - gap)`

Untuk 3 kolom dengan gap 16px:

- Total gap horizontal = 16px × 2 (antar 3 card) = 32px
- Sisa untuk card = 100% - 32px = 68%
- Per card = 68% / 3 = 22.67%
- Tapi kita pakai `calc(33.33% - 12px)` (lebih mudah diingat)

**Rumus praktis:** `calc(N% - (gap * (N-1) / N))`

- N=2, gap=16: `calc(50% - 8px)`
- N=3, gap=16: `calc(33.33% - 11px)` (dibulatkan ke 12px)
- N=4, gap=16: `calc(25% - 12px)`

### Verifikasi

- [ ] Default: card 1 per baris (vertikal)
- [ ] Tablet: 2 card per baris
- [ ] Desktop: 3 card per baris
- [ ] Resize browser: layout berubah di breakpoint yang tepat

---

## Bagian E: Responsive Navbar (Hamburger Menu)

### Penjelasan

**Hamburger menu** = icon 3 garis horizontal yang saat diklik menampilkan menu. Ini pola standar di mobile karena ruang terbatas.

Di latihan ini kita **tidak pakai JavaScript** (nanti di level JavaScript). Kita pakai **pure CSS trick**: **`checkbox hack`** atau `:hover` sederhana. Atau cukup tampilkan icon hamburger sebagai **placeholder** (visual saja, belum interaktif).

### Wajib Ada di Kode Kamu

- Navbar dengan logo di kiri dan menu di kanan
- **Mobile**: icon hamburger (☰) ditampilkan, menu disembunyikan
- **Tablet ke atas**: menu links ditampilkan, hamburger disembunyikan
- (Bonus) Pakai Flexbox untuk alignment

### Pola Kode

```html
<nav class="navbar">
  <div class="logo">MyApp</div>
  <button class="hamburger" aria-label="Menu">☰</button>
  <ul class="nav-menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #1e293b;
  color: white;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-menu {
  display: none; /* mobile: sembunyikan */
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 24px;
}

.nav-menu a {
  color: white;
  text-decoration: none;
}

.hamburger {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: block; /* mobile: tampilkan */
}

/* Tablet ke atas: tampilkan menu, sembunyikan hamburger */
@media (min-width: 640px) {
  .nav-menu {
    display: flex;
  }
  .hamburger {
    display: none;
  }
}
```

### Yang Terjadi di Browser

- **Mobile**: logo + icon "☰" (hamburger). Menu **tersembunyi**
- **Tablet/Desktop**: logo + menu links (Home, About, dll). Hamburger **tersembunyi**
- **Catatan**: icon hamburger **belum bisa diklik** untuk buka menu (butuh JS di level berikutnya)

### Alternatif: Tampilkan Menu di Bawah di Mobile

Kalau mau menu tetap terlihat di mobile (tanpa hamburger), pakai layout vertikal:

```css
@media (max-width: 639px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
}
```

### Verifikasi

- [ ] Mobile: hamburger ☰ terlihat, menu tersembunyi
- [ ] Tablet/Desktop: menu links terlihat, hamburger tersembunyi
- [ ] Logo tetap di kiri, menu di kanan (atau vertikal di mobile)

---

## Bagian F: Sticky Header di Desktop

### Penjelasan

**Sticky header** = navbar yang **tetap di atas** saat user scroll ke bawah. Berguna untuk navigasi supaya tidak hilang.

`position: sticky` butuh `top: 0` (atau `bottom: 0`/`left: 0`/`right: 0`) untuk bekerja. Berbeda dengan `position: fixed` (selalu nempel viewport), `sticky` = "menempel saat scroll mencapai titik `top`".

### Wajib Ada di Kode Kamu

- Navbar dengan `position: sticky; top: 0` (di desktop)
- Background solid + shadow
- `z-index` agar di atas konten lain
- **Hanya di desktop** (mobile boleh non-sticky untuk hemat ruang)

### Pola Kode

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #1e293b;
  color: white;
  position: relative; /* mobile default */
  z-index: 100;
}

@media (min-width: 1024px) {
  .navbar {
    position: sticky;
    top: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
```

### Yang Terjadi di Browser

- **Mobile**: navbar scroll bareng halaman
- **Desktop**: navbar **menempel di atas** saat scroll
- Tambahkan **banyak konten** (paragraf panjang) untuk lihat efek sticky saat scroll

### Bedanya Sticky vs Fixed

- **Sticky** → "menempel" saat scroll mencapai titik tertentu. Elemen masih **mengambil ruang** di layout normal.
- **Fixed** → selalu nempel di viewport, **keluar dari flow** (perlu padding-top di body agar konten tidak tertutup).

### Verifikasi

- [ ] Mobile: navbar scroll biasa
- [ ] Desktop: navbar tetap di atas saat scroll ke bawah
- [ ] `position: sticky` + `top: 0` (atau `top: 80px` jika ada offset)
- [ ] `z-index` agar di atas konten lain

---

## Bagian G: Responsive Image

### Penjelasan

Gambar sering jadi masalah responsive: gambar dengan width fixed akan **melebihi container** di mobile, atau **terlalu kecil** di desktop.

**Solusi dasar:**

- `max-width: 100%` → gambar tidak pernah lebih besar dari parent-nya
- `height: auto` → proporsi tetap terjaga
- `display: block` → hilangkan gap bawah default img

**Solusi modern (object-fit):**

- `object-fit: cover` → crop gambar untuk memenuhi container, tidak distorsi
- `aspect-ratio: 16/9` → set rasio fixed

### Wajib Ada di Kode Kamu

- `<img>` dengan `max-width: 100%; height: auto`
- Container dengan `overflow: hidden` + `object-fit: cover` (untuk gallery)

### Pola Kode

```html
<div class="card">
  <img src="https://picsum.photos/400/300" alt="Gambar" class="responsive-img">
  <h3>Judul</h3>
</div>
```

```css
/* Semua gambar dalam card: tidak pernah lebih besar dari card */
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

/* Gallery image: selalu isi container, di-crop */
.gallery-img {
  width: 100%;
  height: 200px; /* fixed height */
  object-fit: cover; /* crop, jangan distorsi */
  border-radius: 8px;
}
```

### Yang Terjadi di Browser

- **Tanpa max-width**: gambar 400px di mobile (300px) akan **overflow** (keluar container)
- **Dengan max-width: 100%**: gambar mengecil proporsional
- **object-fit: cover**: gambar 16:9 di-crop jadi 4:3 (atau sebaliknya), tidak ada space kosong

### Verifikasi

- [ ] Semua `<img>` punya `max-width: 100%` dan `height: auto`
- [ ] Gallery image: `width: 100%` + `height: fixed` + `object-fit: cover`
- [ ] Resize browser: gambar mengecil/membesar dengan container, tidak overflow

---

## Bagian H: Responsive Typography

### Penjelasan

Font size juga perlu responsif. Teks yang terlalu kecil di desktop membuat user zoom in, teks yang terlalu besar di mobile membuat scroll horizontal.

**Pendekatan:**

- Pakai **`rem`** (relatif terhadap root font-size, default 16px)
- Pakai **clamp** untuk fluid typography (modern approach)
- Tambah **media query** untuk font size lebih besar di desktop

### Wajib Ada di Kode Kamu

- Body font-size: 14px (mobile) → 16px (tablet) → 18px (desktop)
- Heading: `1.5rem` (mobile) → `2rem` (desktop)
- Line-height yang nyaman di mobile (1.6)

### Pola Kode

```css
/* Default: mobile */
body {
  font-size: 14px;
  line-height: 1.6;
  color: #1e293b;
}

h1 { font-size: 1.75rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.25rem; }

/* Tablet */
@media (min-width: 640px) {
  body { font-size: 15px; }
  h1 { font-size: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  body { font-size: 16px; }
  h1 { font-size: 2.5rem; }
}
```

### Alternatif: Fluid Typography dengan `clamp()`

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  /* minimum 1.5rem, ideal 4vw, maximum 2.5rem */
}
```

**Cara baca `clamp(MIN, IDEAL, MAX)`:**

- `MIN` = ukuran terkecil (mobile)
- `IDEAL` = ukuran ideal, biasanya `vw` (1vw = 1% lebar viewport)
- `MAX` = ukuran terbesar (desktop)

Browser otomatis pilih nilai di antara MIN dan MAX yang paling mendekati IDEAL.

### Kapan Pakai Media Query vs Clamp

- **Media query** → lebih "langkah" (1.5rem di mobile, 2rem di tablet, dst), kontrol eksplisit
- **Clamp** → lebih halus (transisi gradual), browser interpolasi, lebih modern
- **Bisa dikombinasikan** → clamp untuk base size, media query untuk major changes

### Verifikasi

- [ ] Default: font mobile-friendly (14-15px)
- [ ] Heading membesar di desktop
- [ ] Line-height ≥ 1.5 untuk readability

---

## Ringkasan: Media Query Cheat Sheet

**Sintaks dasar:**

```css
@media (min-width: 640px) { /* layar ≥640px */ }
@media (max-width: 639px) { /* layar <640px (jarang dipakai, mobile-first lebih baik) */ }
@media (min-width: 640px) and (max-width: 1023px) { /* tablet saja */ }
```

**Breakpoint umum (mobile-first):**

| Breakpoint | Ukuran | Target |
|---|---|---|
| Default | <640px | Mobile |
| `sm` | ≥640px | Tablet portrait |
| `md` | ≥768px | Tablet landscape |
| `lg` | ≥1024px | Laptop, desktop |
| `xl` | ≥1280px | Desktop besar |

**Pattern responsive:**

- **Card grid** → 1 kolom (mobile) → 2 kolom (tablet) → 3 kolom (desktop)
- **Navbar** → hamburger (mobile) → menu links (desktop)
- **Typography** → 14-15px (mobile) → 16px (desktop)
- **Image** → `max-width: 100%; height: auto`
- **Sticky header** → hanya di desktop (hemat ruang mobile)
- **Sidebar** → di atas (mobile) → di samping (desktop)

**Viewport meta (WAJIB):**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Aturan emas:**

1. Selalu tulis viewport meta
2. Mobile-first: default = mobile, tambahkan `@media (min-width: ...)`
3. Pakai `rem` atau `%` (bukan `px` fixed) untuk width/font
4. Test dengan resize browser (jangan cuma test di 1 ukuran)

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 07, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **Viewport meta tag** ada di `<head>`
- [ ] **Mobile-first** (default CSS untuk mobile, `min-width` di media query)
- [ ] **3 layout** sudah dibuat atau diuji: 1 kolom (mobile), 2 kolom (tablet), 3+ kolom (desktop)
- [ ] **Navbar** dengan hamburger di mobile, menu di desktop
- [ ] **Card grid** responsif
- [ ] **Test resize browser**:
  - Kecilkan ke 375px (mobile) → layout 1 kolom
  - Perbesar ke 768px (tablet) → layout 2 kolom
  - Perbesar ke 1280px (desktop) → layout 3+ kolom
- [ ] **Gambar tidak overflow** (`max-width: 100%`)
- [ ] **Typography readable** di semua ukuran

---

## Cara Submit

1. Buka `code/06-responsive-design.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Test resize**:
   - Kecilkan browser ke ~375px (mobile) → lihat layout 1 kolom
   - Perbesar ke ~768px (tablet) → lihat 2 kolom
   - Perbesar ke ~1280px (desktop) → lihat 3+ kolom
6. **Buka di HP asli** (kalau bisa) — lihat responsifitas di dunia nyata
7. Verifikasi dengan checklist di atas
8. Kalau PASS, lanjut ke `soal/07-typography-dan-warna.md`

---

## Catatan untuk Pemula

> **Viewport meta tag WAJIB.** Tanpa `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, responsive design **tidak bekerja** di HP. Browser akan zoom out supaya muat, dan media query kamu tidak aktif. Ini bug paling umum di web responsive.
>
> **Mobile-first = default style untuk mobile.** Bukan "tidak perlu mikirin desktop". Kamu tetap perlu mikirin desktop, tapi tambahkan styling-nya via `@media (min-width: ...)` — bukan override dari desktop ke mobile.
>
> **Breakpoint umum: 640px, 768px, 1024px, 1280px.** Ini konvensi yang dipakai Tailwind, Bootstrap, Material UI. Konsisten dengan framework membuat kolaborasi lebih mudah. Jangan pakai breakpoint random (misal 700px, 950px) kecuali ada kebutuhan spesifik.
>
> **`rem` lebih baik dari `px` untuk responsive typography.** `1rem = 16px` (default browser). `1.5rem` artinya 1.5 × 16 = 24px. Saat user ubah font-size di browser, semua `rem` ikut menyesuaikan. Lebih accessible.
>
> **`object-fit: cover` untuk gallery/image yang harus terisi penuh.** Tanpa `object-fit`, gambar akan distorsi (gepeng/tinggi). Dengan `cover`, gambar di-crop proporsional. Tapi kadang `object-fit: contain` (gambar utuh, ada space kosong) lebih cocok untuk logo.
>
> **`calc(N% - gap)` untuk grid yang bukan dari CSS Grid.** Cara menghitung lebar item di Flexbox. Untuk 3 kolom dengan gap 16px: `width: calc(33.33% - 11px)` (dibulatkan 12px untuk kemudahan). Ini workaround sebelum ada `gap` di Flexbox (sekarang sudah ada).
>
> **Test di dunia nyata, bukan cuma resize browser.** Buka file di HP asli (kirim ke HP via WiFi, atau pakai DevTools mobile view). Beberapa bug responsive hanya muncul di device asli (touch target, font rendering, scroll behavior).

<!-- markdownlint-enable MD024 MD028 -->

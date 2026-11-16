# Solusi — JANGAN DIBUKA DULU

Buka SETELAH punyamu jalan atau benar-benar buntu. Tulis dulu versimu sendiri, catat apa yang sudah kamu coba, baru bandingkan di sini. Membaca solusi sebelum mencoba tidak melatih apa-apa.

Tiap bagian diberi judul sesuai nama soal dan bagiannya, jadi gampang dicari dari penunjuk di file soal.

## 02 Selector & Box Model (Lanjutan) — Bagian B: Child Selector (`>`) vs Descendant

```css
/* Semua li di dalam .menu, termasuk yang bersarang */
.menu li {
  border-bottom: 1px solid #ddd;
}

/* Hanya li LANGSUNG anak .menu, bukan yang di dalam ul bersarang */
.menu > li {
  font-size: 18px;
  font-weight: bold;
}
```


## 02 Selector & Box Model (Lanjutan) — Bagian E: Pseudo-Class untuk State & Posisi

```css
button:hover {
  background: darkblue;
}

li:first-child {
  font-weight: bold;
  color: navy;
}

li:last-child {
  border-bottom: none; /* hilangkan border di item terakhir */
}

tr:nth-child(even) {
  background: #f0f0f0;
}
```


## 02 Selector & Box Model (Lanjutan) — Bagian F: `box-sizing: content-box` vs `border-box` (Visualisasi)

```css
.box-content {
  width: 200px;
  padding: 20px;
  border: 5px solid red;
  background: lightyellow;
  box-sizing: content-box; /* default — tidak perlu ditulis */
}

.box-border {
  width: 200px;
  padding: 20px;
  border: 5px solid blue;
  background: lightgreen;
  box-sizing: border-box; /* HARUS ditulis manual */
}
```


## 02 Selector & Box Model (Lanjutan) — Bagian G: Visualisasi 4 Lapis Box Model dengan Warna

```css
.box-demo {
  width: 200px;
  height: 100px;

  /* Content area (background) */
  background: lightblue;

  /* Padding (jarak dalam) */
  padding: 20px;
  /* Padding area = background yang melebar sampai padding */
  /* Trik: background-color menutupi content + padding */

  /* Border (garis tepi) */
  border: 5px solid orange;

  /* Margin (jarak luar) */
  margin: 30px;
  /* Margin area = transparan (tidak ada warna, hanya ruang) */
}
```


## 03 Flexbox Dasar — Bagian B: Navbar Horizontal dengan `justify-content: space-between`

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


## 03 Flexbox Dasar — Bagian C: Centering Sempurna (Vertikal + Horizontal)

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


## 03 Flexbox Dasar — Bagian D: `align-items` (Cross Axis)

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


## 03 Flexbox Dasar — Bagian E: Responsive Card Row dengan `flex-wrap`

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


## 03 Flexbox Dasar — Bagian F: `flex: 1` dan Item Properties

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


## 04 Card Component — Bagian A: Anatomi Card & Base Style

```html
<div class="card">
  <h3>Judul Card</h3>
  <p>Ini konten di dalam card. Padding membuat teks tidak nempel ke tepi.</p>
</div>
```

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* bayangan halus */
  max-width: 320px; /* batas lebar */
}
```


## 04 Card Component — Bagian B: Layout Container dengan Flexbox

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: #f0f0f0; /* background halaman agar card terlihat */
}

.card {
  flex: 1;
  min-width: 250px;
  /* base style dari Bagian A */
}
```


## 04 Card Component — Bagian C: Profile Card (Avatar Circle)

```css
.profile-card {
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;  /* ← ini yang bikin bulat */
  object-fit: cover;
  margin: 0 auto 16px; /* center horizontal */
  display: block;
}

.name {
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.role {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.bio {
  color: #475569;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-links a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.9rem;
}
```


## 04 Card Component — Bagian D: Product Card dengan Badge Absolute

```css
.product-card {
  position: relative; /* anchor untuk badge */
}

.product-image {
  position: relative; /* anchor untuk badge */
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 1; /* di atas gambar */
}

.product-info h3 {
  margin-bottom: 8px;
}

.price {
  margin-bottom: 12px;
}

.original {
  color: #94a3b8;
  text-decoration: line-through; /* coret harga asli */
  margin-right: 8px;
}

.discount {
  color: #ef4444;
  font-weight: bold;
  font-size: 1.1rem;
}

.btn-beli {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-beli:hover {
  background: #2563eb;
}
```


## 04 Card Component — Bagian E: Stat Card dengan Gradient

```css
.stat-card {
  background: linear-gradient(135deg, #667eea, #764ba2); /* biru ke ungu */
  color: white;
  text-align: center;
  padding: 32px 24px;
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9; /* sedikit transparan */
  text-transform: uppercase;
  letter-spacing: 1px;
}
```


## 04 Card Component — Bagian F: Feature Card dengan Hover Scale

```css
.feature-card {
  text-align: center;
  padding: 32px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* ↑ transition di element ASAL, bukan di :hover */
}

.feature-card:hover {
  transform: translateY(-8px); /* card terangkat */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  /* shadow lebih dalam */
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  background: #eff6ff;
  border-radius: 50%; /* icon circle */
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card h3 {
  margin-bottom: 12px;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  font-size: 0.9rem;
}
```


## 05 CSS Grid System — Bagian A: Konsep Dasar Grid (Container vs Item)

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


## 05 CSS Grid System — Bagian C: `grid-template-areas` (Named Regions)

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


## 05 CSS Grid System — Bagian D: Responsive Grid dengan `auto-fill` & `minmax`

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


## 05 CSS Grid System — Bagian E: Pricing Table dengan `grid-column: span N`

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


## 05 CSS Grid System — Bagian F: Responsive dengan Media Query

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


## 06 Responsive Design — Bagian A: Mobile-First Approach

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


## 06 Responsive Design — Bagian C: Breakpoint Standar

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


## 06 Responsive Design — Bagian D: Responsive Card Grid (1 → 2 → 3 kolom)

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


## 06 Responsive Design — Bagian E: Responsive Navbar (Hamburger Menu)

### Blok 1

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

### Blok 2

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


## 06 Responsive Design — Bagian F: Sticky Header di Desktop

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


## 06 Responsive Design — Bagian G: Responsive Image

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


## 06 Responsive Design — Bagian H: Responsive Typography

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


## 07 Typography dan Warna — Bagian B: Font Size, Weight, dan Heading Hierarchy

```css
/* Body baseline */
body {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;
  color: #475569;
}

/* Heading hierarchy: makin ke dalam, makin kecil */
h1 {
  font-size: 2.5rem;     /* 40px */
  font-weight: 800;      /* extra bold untuk hero */
  line-height: 1.2;
  color: #1e293b;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 2rem;       /* 32px */
  font-weight: 700;
  line-height: 1.3;
  color: #334155;
  margin-bottom: 16px;
}

h3 {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;
  color: #475569;
  margin-bottom: 12px;
}

h4 {
  font-size: 1.125rem;   /* 18px */
  font-weight: 600;
  color: #64748b;
}

p {
  font-size: 1rem;       /* 16px */
  line-height: 1.7;
  color: #475569;
  margin-bottom: 16px;
}

small {
  font-size: 0.875rem;   /* 14px */
  color: #94a3b8;
}
```


## 07 Typography dan Warna — Bagian C: Line Height dan Paragraph Spacing

```css
/* Lead: paragraf pembuka yang lebih besar */
.lead {
  font-size: 1.25rem;   /* 20px */
  line-height: 1.6;
  color: #475569;
}

/* Spacing antar paragraf */
p + p {
  margin-top: 12px;
}

/* Line height utilities */
.tight   { line-height: 1.2; }  /* untuk heading/display */
.normal  { line-height: 1.6; }  /* default body */
.relaxed { line-height: 1.8; }  /* untuk artikel panjang */
.loose   { line-height: 2.0; }  /* untuk dokumen formal */
```


## 07 Typography dan Warna — Bagian D: Text Alignment dan Text Transform

```css
/* Text alignment utilities */
.text-center  { text-align: center; }
.text-right   { text-align: right; }
.text-justify { text-align: justify; }

/* Uppercase + letter-spacing untuk badge/label */
.text-uppercase {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
}

/* Bonus: text dengan gradient background */
.text-gradient {
  background-image: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```


## 07 Typography dan Warna — Bagian E: Color System (Palette)

```css
/* Background color utilities */
.bg-primary   { background: #3b82f6; color: white; }
.bg-secondary { background: #8b5cf6; color: white; }
.bg-success   { background: #10b981; color: white; }
.bg-warning   { background: #f59e0b; color: white; }
.bg-danger    { background: #ef4444; color: white; }
.bg-dark      { background: #1e293b; color: white; }
.bg-light     { background: #f1f5f9; color: #1e293b; }

/* Text color utilities */
.text-primary   { color: #3b82f6; }
.text-secondary { color: #8b5cf6; }
.text-success   { color: #10b981; }
.text-warning   { color: #f59e0b; }
.text-danger    { color: #ef4444; }
.text-dark      { color: #1e293b; }
.text-muted     { color: #94a3b8; }

/* Badge base */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Badge variants (background + text color yang harmonis) */
.badge-primary {
  background: #dbeafe;   /* primary muda */
  color: #1e40af;        /* primary tua */
}
.badge-success {
  background: #dcfce7;
  color: #166534;
}
.badge-warning {
  background: #fef3c7;
  color: #92400e;
}
.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}
```


## 07 Typography dan Warna — Bagian F: Link Styles (Default, Hover, Visited)

```css
a {
  color: #3b82f6;            /* primary */
  text-decoration: none;     /* hilangkan underline default */
  transition: color 0.2s;    /* transisi halus saat hover */
}

a:hover {
  color: #1d4ed8;            /* primary lebih gelap */
  text-decoration: underline;/* underline muncul saat hover */
}

a:visited {
  color: #7c3aed;            /* ungu untuk link yang sudah dikunjungi */
}
```


## 07 Typography dan Warna — Bagian G: Divider, HR, dan Gradient Backgrounds

```css
/* Standard divider */
hr {
  border: none;
  border-top: 2px solid #e2e8f0;  /* garis tipis abu-abu */
  margin: 32px 0;                  /* jarak atas-bawah */
}

/* Gradient divider — lebih menarik */
.hr-gradient {
  border: none;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  border-radius: 2px;
  margin: 40px 0;
}

/* Hero gradient — untuk section atas/judul besar */
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

/* Card gradient — untuk highlight card */
.card-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
}

/* Section warm — zona kuning/amber */
.section-warm {
  background: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%);
  padding: 48px 0;
}
```


## 07 Typography dan Warna — Bagian H: Text Overflow dan Truncation

```css
/* Single-line truncation: potong jadi 1 baris + "..." */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line clamp: potong jadi N baris + "..." */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```


## 08 Form Styling — Bagian B: Label & Hint Text

```css
.form-group label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-hint {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 4px;
}
```


## 08 Form Styling — Bagian C: Text & Email Input (Default State)

```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  color: #1e293b;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}
```


## 08 Form Styling — Bagian D: Input States (Focus, Error, Success)

```css
/* Focus: border biru + glow */
.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Error: background merah muda */
.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

/* Success: border hijau + background hijau muda (sudah ada) */
.form-input.success {
  border-color: #10b981;
  background: #f0fdf4;
}
```


## 08 Form Styling — Bagian F: Select Styling (Custom Arrow)

```css
.form-select {
  /* property lain sudah ada */
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
```


## 08 Form Styling — Bagian G: Custom Checkbox & Radio

### Blok 1

```css
.custom-checkbox,
.custom-radio {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #374151;
}

.custom-checkbox input,
.custom-radio input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
```

### Blok 2

```css
.custom-checkbox input:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "";
  width: 6px;
  height: 10px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(-1px, -1px);
  display: block;
}
```

### Blok 3

```css
.custom-radio input:checked + .radiomark {
  border-color: #3b82f6;
}

.custom-radio input:checked + .radiomark::after {
  content: "";
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  display: block;
}
```


## 08 Form Styling — Bagian H: Button Primary (Default, Hover, Active, Focus)

```css
.btn {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  background: #1d4ed8;
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}
```


## 08 Form Styling — Bagian I: Button Secondary, Ghost, & Full Width

```css
.btn-ghost {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-ghost:hover {
  background: #eff6ff;
  transform: translateY(-2px);
}
```


## 09 Animasi & Transisi — Bagian A: Transition Dasar (Hover State)

```css
/* Button */
.btn {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  /* transition HARUS di element asal */
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Card */
.card {
  background: var(--color-surface);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```


## 09 Animasi & Transisi — Bagian B: Timing Function (Kurva Gerakan)

```css
.timing-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
}

.timing-box {
  width: 100px;
  height: 50px;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  /* durasi sama untuk semua, agar fair comparison */
  transition: transform 0.6s;
}

.timing-box:hover {
  transform: translateX(300px);
}
```


## 09 Animasi & Transisi — Bagian C: @keyframes (Animasi Multi-Step)

```css
/* Fade in: opacity 0 ke 1 */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Slide in: dari kiri */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideInLeft 0.6s ease-out forwards;
}

/* Bounce: vertical bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}

/* Spin: rotate 360deg */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: spin 0.8s linear infinite;
}

/* Pulse: scale + opacity */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.05); opacity: 0.8; }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Shake: horizontal shake */
@keyframes shake {
  0%, 100%       { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80%      { transform: translateX(8px); }
}

.shake {
  animation: shake 0.6s ease-in-out;
}

/* Color cycle: background berubah */
@keyframes colorCycle {
  0%   { background: #ef4444; }
  33%  { background: #f59e0b; }
  66%  { background: #22c55e; }
  100% { background: #ef4444; }
}

.color-cycle {
  animation: colorCycle 3s linear infinite;
}
```


## 09 Animasi & Transisi — Bagian D: Loading Spinner (Praktis)

### Blok 1

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Blok 2

```css
.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40%           { transform: scale(1); opacity: 1; }
}
```

### Blok 3

```css
.progress {
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  width: 30%;
  height: 100%;
  background: var(--color-primary);
  border-radius: 2px;
  animation: progress 1.5s ease-in-out infinite;
}

@keyframes progress {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
```


## 09 Animasi & Transisi — Bagian E: Hover Animations (Lift, Press, Zoom, Rotate)

```css
/* Card lift */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Button press */
.btn-press {
  transition: transform 0.1s ease;
}

.btn-press:active {
  transform: scale(0.97);
}

/* Image zoom (butuh wrapper) */
.image-zoom {
  overflow: hidden;
  border-radius: 8px;
}

.image-zoom img {
  transition: transform 0.4s ease-out;
  display: block;
  width: 100%;
}

.image-zoom:hover img {
  transform: scale(1.05);
}

/* Icon rotate */
.icon-rotate {
  display: inline-block;
  transition: transform 0.3s ease;
}

.icon-rotate:hover {
  transform: rotate(15deg);
}

/* Background slide (gradient slide) */
.bg-slide {
  background: linear-gradient(90deg, var(--color-primary) 50%, var(--color-primary-dark) 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  color: white;
  transition: background-position 0.4s ease;
}

.bg-slide:hover {
  background-position: 0 0;
}
```


## 09 Animasi & Transisi — Bagian F: Stagger Animation (Item Satu Per Satu)

### Blok 1

```css
.list-item {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

.list-item:nth-child(1) { animation-delay: 0.0s; }
.list-item:nth-child(2) { animation-delay: 0.1s; }
.list-item:nth-child(3) { animation-delay: 0.2s; }
.list-item:nth-child(4) { animation-delay: 0.3s; }
.list-item:nth-child(5) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Blok 2

```css
.stagger-list li {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  /* delay = i * 0.1s */
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```


## 09 Animasi & Transisi — Bagian G: Page Load Animation

```css
.hero {
  opacity: 0;
  animation: fadeInDown 0.8s ease-out 0.2s forwards;
}

.section-anim {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(0.5s + var(--i) * 0.15s);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```


## 10 CSS Position & Navbar — Bagian B: Fixed Navbar

```css
.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1e293b;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar-fixed .logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  flex-shrink: 0; /* jangan menyusut saat menu panjang */
}

.navbar-fixed .nav-links {
  display: flex;
  gap: 8px;
}

.navbar-fixed .nav-links a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  /* transition HARUS di element asal, bukan di :hover */
  transition: background 0.2s, color 0.2s;
}

.navbar-fixed .nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.navbar-fixed .nav-links a.active {
  background: #3b82f6;
  color: white;
}

.navbar-fixed .hamburger {
  display: none; /* tampilkan di mobile dengan media query */
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
```


## 10 CSS Position & Navbar — Bagian C: Sticky Header (dalam Section)

```css
.sticky-header {
  position: sticky;
  top: 64px; /* = tinggi navbar fixed */
  z-index: 100;
  background: #3b82f6;
  color: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sticky-header h2 {
  color: white;
  font-size: 1.25rem;
  margin: 0;
}
```


## 10 CSS Position & Navbar — Bagian D: Dropdown Menu (Absolute dalam Relative)

```css
.dropdown-container {
  position: relative;
  display: inline-block;
  margin: 40px;
}

.dropdown-trigger {
  background: #1e293b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.dropdown-trigger:hover { background: #334155; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 180px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 999;

  /* default: tersembunyi */
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition: opacity 0.2s, transform 0.2s;
}

/* Tampilkan saat container di-hover */
.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 12px 20px;
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.dropdown-menu a:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.dropdown-menu a:first-child { border-radius: 12px 12px 0 0; }
.dropdown-menu a:last-child  { border-radius: 0 0 12px 12px; }

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 4px 0;
}

.dropdown-badge {
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  float: right;
  margin-top: 2px;
}
```


## 10 CSS Position & Navbar — Bagian E: Card dengan Absolute Badge & Overlays

```css
.card-relative {
  position: relative;          /* anchor untuk badge & overlay */
  background: white;
  border-radius: 16px;
  overflow: hidden;            /* gambar tidak bocor keluar */
  max-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-relative img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.card-relative-body { padding: 20px; }
.card-relative-body h3 { margin-bottom: 8px; color: #1e293b; }
.card-relative-body p  { color: #64748b; font-size: 0.875rem; }

/* Badge pojok kanan atas */
.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-badge.new      { background: #10b981; }
.card-badge.hot      { background: #f59e0b; }
.card-badge.trending { background: #8b5cf6; }

/* Category tag pojok kiri bawah */
.card-category {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
}

/* Price overlay gradient di bawah gambar */
.card-price-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 24px 16px 12px;
  color: white;
}

.card-price-overlay .price     { font-size: 1.25rem; font-weight: bold; }
.card-price-overlay .original  { text-decoration: line-through; opacity: 0.7; font-size: 0.875rem; margin-left: 8px; }
```


## 10 CSS Position & Navbar — Bagian F: Float Label Input

```css
.float-label-group {
  position: relative;   /* anchor untuk label */
  margin: 40px;
  max-width: 320px;
}

.float-label-input {
  width: 100%;
  padding: 16px 16px 8px;  /* ruang di atas untuk label */
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.float-label-input:focus { border-color: #3b82f6; }

.float-label-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1rem;
  pointer-events: none;
  transition: top 0.2s, font-size 0.2s, color 0.2s;
}

/* Label naik ke atas saat input focus ATAU sudah berisi value */
.float-label-input:focus + .float-label-label,
.float-label-input:not(:placeholder-shown) + .float-label-label {
  top: 8px;
  transform: translateY(0);
  font-size: 0.7rem;
  color: #3b82f6;
}
```


## 10 CSS Position & Navbar — Bagian G: Back-to-Top Button (Fixed + Hover)

### Blok 1

```css
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  z-index: 999;

  /* Di demo ini, selalu terlihat */
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s, transform 0.3s, background 0.2s;
}

.back-to-top:hover {
  background: #2563eb;
  transform: translateY(-4px);
}
```

### Blok 2

```css
.back-to-top {
  /* default: hidden & turun sedikit */
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```


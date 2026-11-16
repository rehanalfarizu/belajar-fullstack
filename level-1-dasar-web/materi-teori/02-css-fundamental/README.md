# 📘 MATERI TEORI 02 — CSS Fundamental

## 1. Apa itu CSS?

CSS = **Cascading Style Sheets**. Bahasa untuk **styling** dan **layout** halaman web.

```
HTML = Struktur (kerangka)
CSS  = Tampilan (desain + layout)
JS   = Perilaku (interaksi)
```

---

## 2. Cara Memasang CSS

### Cara 1: External CSS (Paling Direkomendasikan)

```html
<!-- Di dalam <head> -->
<link rel="stylesheet" href="style.css">
```

```css
/* style.css */
h1 {
  color: blue;
}
```

### Cara 2: Internal CSS

```html
<style>
  h1 {
    color: blue;
  }
</style>
```

### Cara 3: Inline CSS (Tidak Direkomendasikan)

```html
<h1 style="color: blue;">Judul</h1>
```

---

## 3. CSS Syntax

```css
/* selector { property: value; } */

h1 {
  color: red;
  font-size: 24px;
  text-align: center;
}
```

---

## 4. CSS Selector (Cara Memilih Elemen)

### Basic Selectors:

```css
/* Element selector — semua <p> */
p { color: blue; }

/* ID selector — elemen dengan id="header" */
#header { background: gray; }

/* Class selector — elemen dengan class="card" */
.card { border: 1px solid black; }

/* Universal selector — SEMUA elemen */
* { margin: 0; padding: 0; }
```

### Combinator Selectors:

```css
/* Descendant — semua <li> di dalam <ul> */
ul li { list-style: none; }

/* Child — <li> langsung di bawah <ul> */
ul > li { color: red; }

/* Adjacent sibling — <p> langsung setelah <h1> */
h1 + p { font-size: 18px; }

/* Group selector — banyak elemen */
h1, h2, h3 { font-family: sans-serif; }
```

### Attribute Selectors:

```css
/* Elemen dengan atribut type="text" */
input[type="text"] { border: 1px solid gray; }

/* Elemen dengan class dimulai "btn-" */
[class^="btn-"] { padding: 10px; }

/* Elemen dengan class berakhir "-primary" */
[class$="-primary"] { background: blue; }

/* Elemen dengan class mengandung "primary" */
[class*="primary"] { background: blue; }
```

### Pseudo-classes:

```css
/* Hover — saat mouse di atas */
button:hover { background: blue; }

/* Active — saat ditekan */
button:active { transform: scale(0.95); }

/* Focus — saat difokuskan */
input:focus { border-color: blue; outline: none; }

/* First/last child */
li:first-child { font-weight: bold; }
li:last-child { border: none; }

/* Nth child */
tr:nth-child(even) { background: #f0f0f0; }
```

---

## 5. Box Model (Konsep Penting!)

Setiap elemen HTML diperlakukan sebagai **box** (kotak) dengan 4 lapisan:

```
┌─────────────────────────────┐
│          MARGIN             │  ← luar (jarak antar elemen)
│  ┌───────────────────────┐  │
│  │       BORDER          │  │  ← garis tepi
│  │  ┌─────────────────┐  │  │
│  │  │     PADDING     │  │  │  ← dalam (jarak konten ke border)
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  ← isi elemen (text, gambar, dll)
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

```css
.box {
  /* Reset default */
  box-sizing: border-box; /* WAJIB! */

  /* Margin — jarak keluar */
  margin: 20px;

  /* Border — garis tepi */
  border: 1px solid #333;
  border-radius: 8px;

  /* Padding — jarak dalam */
  padding: 16px;

  /* Width — lebar konten */
  width: 300px;
}
```

### box-sizing: border-box (WAJIB hafal!)

Tanpa ini, `width` tidak include padding & border → layout berantakan.

```css
/* TARUH DI AWAL SEMUA CSS */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

---

## 6. Display Property

```css
/* Block — lebar penuh, mulai baris baru */
div, p, h1, section {
  display: block;
}

/* Inline — sebaris, tidak bisa atur width/height */
span, a, strong, em {
  display: inline;
}

/* Inline-block — sebaris TAPI bisa atur width/height */
button, input {
  display: inline-block;
}

/* None — sembunyikan elemen */
.hidden {
  display: none;
}

/* Flex — layout fleksibel (paling sering dipakai) */
.container {
  display: flex;
}

/* Grid — layout grid 2 dimensi */
.grid-container {
  display: grid;
}
```

---

## 7. Flexbox (Layout 1 Dimensi)

### Container Properties:

```css
.container {
  display: flex;

  /* Arah */
  flex-direction: row;          /* default: kiri ke kanan */
  flex-direction: column;       /* atas ke bawah */
  flex-direction: row-reverse; /* kanan ke kiri */

  /* Wrap — pindah ke baris baru kalau tidak muat */
  flex-wrap: wrap;

  /* Justify — alignment utama (horizontal) */
  justify-content: flex-start;   /* kiri */
  justify-content: flex-end;     /* kanan */
  justify-content: center;       /* tengah */
  justify-content: space-between; /* rata, spasi merata */
  justify-content: space-around; /* spasi sama di sekeliling */
  justify-content: space-evenly; /* spasi merata persis */

  /* Align — alignment silang (vertical) */
  align-items: stretch;          /* default: stretch */
  align-items: flex-start;       /* atas */
  align-items: flex-end;         /* bawah */
  align-items: center;           /* tengah */
  align-items: baseline;         /* baseline teks */

  /* Gap — spasi antar item */
  gap: 16px;
}
```

### Item Properties:

```css
.item {
  /* Grow — perbesar untuk mengisi ruang kosong */
  flex-grow: 1;

  /* Shrink — perkecil kalau ruang kurang */
  flex-shrink: 0;

  /* Basis — ukuran dasar */
  flex-basis: 200px;

  /* Singkat: flex: grow shrink basis */
  flex: 1;

  /* Align sendiri (override container) */
  align-self: center;

  /* Order — urutan */
  order: 2;
}
```

### Contoh Layout Horizontal Card:

```css
.card-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 250px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

### Contoh Layout Centering:

```css
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

---

## 8. CSS Grid (Layout 2 Dimensi)

```css
.grid-container {
  display: grid;

  /* Columns — definiisikan kolom */
  grid-template-columns: 1fr 1fr 1fr;     /* 3 kolom sama */
  grid-template-columns: 200px 1fr 1fr;    /* 200px + 2 kolom sisa */
  grid-template-columns: repeat(3, 1fr);   /* 3 kolom sama */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* responsive */

  /* Rows */
  grid-template-rows: 100px auto 100px;

  /* Gap */
  gap: 20px;

  /* Padding area */
  padding: 20px;
}
```

### Grid Item:

```css
.item {
  /* Span — gabung kolom/baris */
  grid-column: span 2;    /* gabung 2 kolom */
  grid-row: span 2;       /* gabung 2 baris */

  /* Posisi spesifik */
  grid-column: 1 / 3;      /* dari kolom 1 ke 3 */
  grid-row: 1 / 2;
}
```

### Contoh Layout Halaman:

```css
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}

header  { grid-area: header; }
aside   { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }
```

---

## 9. Typography

```css
.text {
  /* Font */
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;          /* 100-900, bold = 700 */

  /* Text */
  color: #333;
  text-align: center;
  line-height: 1.6;          /* 1.6x dari font-size */
  letter-spacing: 0.5px;
  text-transform: uppercase;   /* uppercase / lowercase / capitalize */
  text-decoration: underline;  /* underline / none / line-through */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;    /* "..." kalau kepanjangan */
}
```

---

## 10. Colors & Background

```css
.color-examples {
  /* Nama warna */
  color: red;
  background-color: blue;

  /* Hex */
  color: #ff0000;
  background: #0000ff;

  /* RGB */
  color: rgb(255, 0, 0);
  background: rgba(0, 0, 255, 0.5); /* alpha = transparan */

  /* HSL (lebih natural) */
  color: hsl(0, 100%, 50%);

  /* Gradient */
  background: linear-gradient(90deg, red, blue);
  background: radial-gradient(circle, red, yellow);
}

/* Background image */
.hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

---

## 11. Position (Posisi Elemen)

```css
.position-examples {
  position: static;     /* default — tidak bisa atur top/left */
  position: relative;   /* relatif dari posisi normal */
  position: absolute;   /* relatif dari parent yang relative/absolute */
  position: fixed;      /* relatif dari viewport (tetap di tempat saat scroll) */
  position: sticky;     /* sticky sampai threshold */

  /* Offset */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Z-index — layering */
  z-index: 10;
}
```

### Contoh Fixed Header:

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

---

## 12. Responsive Design (CSS Media Queries)

```css
/* Mobile first → desktop */
/* Atau Desktop first → mobile */

@media (max-width: 768px) {
  /* Tablet & mobile */
  .container {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}

@media (max-width: 480px) {
  /* Mobile saja */
  .title {
    font-size: 20px;
  }
}
```

### Tips Responsive:

```css
/* Relative units — lebih fleksibel dari px */
.container {
  width: 80%;          /* 80% dari parent */
  max-width: 1200px;   /* maksimal 1200px */
  margin: 0 auto;      /* tengah */
}

/* rem — based pada font-size root */
h1 { font-size: 2rem; }  /* 2x font-size <html> */
p  { font-size: 1rem; }  /* 1x font-size <html> */

/* vw/vh — viewport */
.hero {
  height: 100vh;        /* 100% tinggi viewport */
  width: 100vw;         /* 100% lebar viewport */
}
```

---

## 13. CSS Transitions & Animations

### Transitions (perubahan halus):

```css
.button {
  transition: background 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background: blue;
  transform: scale(1.05);
}

/* transition: property duration timing-function */
transition: all 0.3s ease-in-out;
transition: color 0.2s linear;
transition: opacity 0.3s ease;
```

### Animations (lebih kontrol):

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.box {
  animation: slideIn 0.5s ease forwards;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.pulse {
  animation: pulse 2s infinite;
}
```

---

## 14. Shadow

```css
.shadow-examples {
  /* Text shadow */
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);

  /* Box shadow */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);

  /* Multiple shadows */
  box-shadow:
    0 2px 4px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.1);
}
```

---

## 15. CSS Variables (Custom Properties)

```css
/* Definisikan */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --spacing: 16px;
  --border-radius: 8px;
}

/* Pakai */
.button {
  background: var(--primary-color);
  padding: var(--spacing);
  border-radius: var(--border-radius);
}
```

---

## Ringkasan

```
CSS Fundamental
├── Selector       → element, id, class, combinator, pseudo
├── Box Model      → content, padding, border, margin (box-sizing: border-box)
├── Display        → block, inline, inline-block, flex, grid, none
├── Flexbox        → justify-content, align-items, flex, gap
├── Grid           → grid-template, grid-area, span, gap
├── Typography     → font-size, line-height, text-align, etc
├── Responsive     → media queries, rem, %, vw/vh
├── Animation      → transition, @keyframes, animation
└── Variables      → :root { --name: value }
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/02-latihan-css/`
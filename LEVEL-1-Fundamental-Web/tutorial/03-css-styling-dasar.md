# Tutorial 03 — CSS Styling Dasar

## Tujuan
Memahami cara menambahkan CSS ke HTML, menggunakan selector, dan mengubah tampilan halaman.

---

## Teori Singkat

**CSS** = Cascading Style Sheets
- Mengontrol **tampilan** dan **layout** halaman web
- Dipasang di dalam `<style>` atau file terpisah `.css`

```
HTML = Struktur (kerangka rumah)
CSS  = Desain  (cat, lantai, tirai)
JS   = Perilaku (listrik, air, AC)
```

---

## 3 Cara Memasang CSS

### Cara 1: Inline CSS (Tidak direkomendasikan)
```html
<h1 style="color: blue;">Judul</h1>
```

### Cara 2: Internal CSS (Dalam file yang sama)
```html
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>
```

### Cara 3: External CSS (Paling baik)
```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

```css
/* style.css */
h1 { color: blue; }
```

---

## Syntax CSS

```css
/* selector { property: value; } */

h1 {
  color: red;
  font-size: 24px;
  text-align: center;
}

p {
  color: #333;
  line-height: 1.6;
}
```

---

## CSS Selector (Cara Memilih Elemen)

```css
/* Element selector — semua <p> */
p { color: blue; }

/* ID selector — elemen dengan id="header" */
#header { background: gray; }

/* Class selector — elemen dengan class="card" */
.card { border: 1px solid black; }

/* Universal — semua elemen */
* { margin: 0; padding: 0; }

/* Descendant — <li> di dalam <ul> */
ul li { list-style: none; }
```

---

## Box Model (Konsep Penting!)

Setiap elemen adalah **kotak** dengan 4 lapisan:

```
┌─────────────────────────┐
│          MARGIN          │  ← luar (jarak antar kotak)
│  ┌─────────────────────┐  │
│  │       BORDER        │  │  ← garis tepi
│  │  ┌───────────────┐  │  │
│  │  │    PADDING    │  │  │  ← jarak dalam
│  │  │  ┌─────────┐  │  │  │
│  │  │  │ CONTENT │  │  │  │  ← teks/gambar
│  │  │  └─────────┘  │  │  │
│  │  └───────────────┘  │  │
│  └─────────────────────┘  │
└─────────────────────────┘
```

### Properti Penting:

```css
.box {
  box-sizing: border-box; /* WAJIB — include padding & border */

  margin: 20px;            /* jarak luar */
  border: 1px solid #333;  /* garis tepi */
  padding: 16px;           /* jarak dalam */
  width: 300px;           /* lebar konten */
}
```

---

## Langkah 1: Buat File CSS

Di folder `belajar-web/level-1/`, buat file `style.css`:

```css
/* Reset default */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f5f5f5;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.card {
  background: white;
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

---

## Langkah 2: Hubungkan ke HTML

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Belajar CSS</title>
  <!-- Tambahkan ini: -->
  <link rel="stylesheet" href="style.css">
</head>
```

---

## Langkah 3: Ubah Warna & Font

```css
/* Warna teks */
h1 { color: #2c3e50; }

/* Background */
body { background: #ecf0f1; }

/* Font family */
p { font-family: 'Arial', sans-serif; }

/* Font size & weight */
h2 { font-size: 20px; font-weight: bold; }
```

---

## Flexbox (Layout 1 Dimensi)

```css
.container {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;      /* vertical */
  gap: 16px;
}
```

### Contoh Card Layout:
```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1;
  min-width: 250px;
  padding: 20px;
  background: white;
  border-radius: 8px;
}
```

---

## Responsive Design (Media Queries)

```css
/* Desktop → Mobile */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}
```

---

## Mini-Challenge

Buat halaman `profile.html` dengan styling CSS:

- [ ] Buat file `style.css` terpisah
- [ ] Reset default dengan `* { box-sizing: border-box; margin: 0; padding: 0; }`
- [ ] Buat card profile dengan shadow dan border-radius
- [ ] Gunakan flexbox untuk center card di halaman
- [ ] Responsive: di mobile card full-width
- [ ] Gunakan minimal 3 warna berbeda

---

## Ringkasan

```
CSS Fundamental:
├── 3 cara pasang CSS  → inline, internal, external (external paling baik)
├── Selector          → element, id (#), class (.)
├── Box Model         → margin, border, padding, content
├── box-sizing        → border-box WAJIB
├── Flexbox           → display: flex, justify-content, align-items, gap
└── Responsive        → @media (max-width: 768px) {...}
```

---

**Lanjut ke:** [04-javascript-interaktif.md](./04-javascript-interaktif.md)
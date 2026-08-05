# TUTORIAL 02 — CSS: Memberi Warna dan Gaya pada Website

## Tujuan
Kamu akan belajar cara memberi tampilan (warna, ukuran, layout) pada elemen HTML menggunakan CSS.

---

## Apa yang Akan Dibuat

Halaman web dengan:
- Background warna
- Heading dengan warna dan ukuran
- Card/boks dengan border dan shadow
- Layout flexbox sederhana

---

## Langkah 1: Struktur HTML

Buat file `index.html`:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Belajar CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>Blog Teknologi</h1>
    <p>Selamat datang di blog pembelajaran web</p>
  </header>

  <main>
    <h2>Artikel Terbaru</h2>

    <div class="card">
      <h3>Belajar HTML</h3>
      <p>HTML adalah bahasa untuk membuat struktur halaman web.</p>
      <button>Baca Selengkapnya</button>
    </div>

    <div class="card">
      <h3>Belajar CSS</h3>
      <p>CSS digunakan untuk mengatur tampilan dan desain halaman web.</p>
      <button>Baca Selengkapnya</button>
    </div>

    <div class="card">
      <h3>Belajar JavaScript</h3>
      <p>JavaScript adalah bahasa pemrograman untuk membuat halaman web interaktif.</p>
      <button>Baca Selengkapnya</button>
    </div>
  </main>

</body>
</html>
```

---

## Langkah 2: Buat File CSS

Buat file `style.css` di folder yang sama:

```css
/* Reset default browser */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Body */
body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

/* Header */
header {
  background-color: #3b82f6;
  color: white;
  padding: 40px 20px;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Main content */
main {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #1e293b;
}

/* Card container (Flexbox) */
.card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Card */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  flex: 1;
  min-width: 220px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card h3 {
  color: #3b82f6;
  margin-bottom: 12px;
}

.card p {
  margin-bottom: 16px;
  color: #64748b;
}

/* Button */
button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #2563eb;
}
```

---

## Langkah 3: Hubungkan HTML dan CSS

Pastikan kamu sudah punya baris ini di `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

Struktur folder:
```
website-css/
├── index.html
└── style.css
```

---

## Langkah 4: Buka di Browser

Double click `index.html` dan lihat hasilnya!

---

## Penjelasan Konsep Utama

### 1. Selector
```css
/* Tag selector */
body { }

/* Class selector */
.card { }

/* ID selector */
#header { }
```

### 2. Box Model
```
margin (luar)
  border
    padding (dalam)
      content
```

### 3. Flexbox
```css
.container {
  display: flex;       /* Aktifkan flexbox */
  gap: 20px;          /* Jarak antar item */
  flex-wrap: wrap;    /* Wrap ke baris baru */
}
```

### 4. Box-sizing
```css
* {
  box-sizing: border-box; /* WAJIB! */
}
```
Tanpa ini, `width` tidak termasuk padding & border.

### 5. Transition
```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
```
Ini yang bikin efek hover jadi halus.

---

## Tantangan Modifikasi

Coba ubah:

1. **Warna**: Ganti `#3b82f6` (biru) dengan warna lain (cari kode warna di https://coolors.co)
2. **Ukuran card**: Ubah `min-width: 220px` jadi `300px`
3. **Tambah card**: Salin blok `.card` HTML dan CSS, masukkan kartu baru
4. **Border radius**: Ubah `12px` jadi `20px` pada `.card`
5. **Font**: Ganti `font-family` dengan font Google (tambah di `<head>` HTML)

---

## Ringkasan

```
CSS Steps:
1. Tulis CSS di file .css
2. Hubungkan dengan <link> di <head>
3. Gunakan selector untuk pilih elemen
4. Atur property: color, font, margin, padding, dll
5. Flexbox untuk layout
6. Refresh browser untuk lihat perubahan
```

**Next: Belajar JavaScript untuk interaktivitas →**
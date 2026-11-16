# TUTORIAL 01 — Membuat Website Pertama dari0

## Tujuan
Kamu akan membuat website HTML pertama tanpa copy-paste. Semua diketik dari 0 agar muscle memory coding terbentuk.

---

## Langkah 1: Persiapan

### a. Buat Folder Project

```bash
mkdir -p ~/Documents/website-pertama
cd ~/Documents/website-pertama
```

### b. Buka VS Code

```bash
code ~/Documents/website-pertama
```

### c. Buat File HTML Baru

Di VS Code, tekan `Cmd + N` untuk file baru, lalu `Cmd + S` untuk save sebagai `index.html`.

---

## Langkah 2: Struktur Dasar HTML

Ketik dari0 (tidak boleh copy-paste!):

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Saya</title>
</head>
<body>

 <!-- Konten akan ditambahkan di sini -->

</body>
</html>
```

**Kenapa setiap bagian harus ada?**

| Bagian | Penjelasan |
|--------|-----------|
| `<!DOCTYPE html>` | Memberitahu browser ini HTML5 |
| `<html lang="id">` | Bahasa dokumen Indonesia |
| `<meta charset="UTF-8">` | Karakter encoding (huruf Indonesia) |
| `<meta name="viewport">` | Responsive di mobile |
| `<title>` | Judul di tab browser |

---

## Langkah 3: Tambah Konten

### a. Header

```html
<header>
  <h1>Selamat Datang di Website Saya</h1>
  <p>Website portfolio sederhana karya saya</p>
</header>
```

### b. Navigasi

```html
<nav>
  <a href="#about">Tentang</a>
  <a href="#projects">Project</a>
  <a href="#contact">Kontak</a>
</nav>
```

### c. Section Tentang

```html
<section id="about">
  <h2>Tentang Saya</h2>
  <p>
    Halo! Nama saya [Nama Kamu]. Saya seorang mahasiswa
    Computer Science yang passionate dalam membangun
    website dan aplikasi web.
  </p>
</section>
```

### d. Section Project

```html
<section id="projects">
  <h2>Project Saya</h2>
  <ul>
    <li><strong>Website Portfolio</strong> — Website personal dengan HTML& CSS</li>
    <li><strong>Todo App</strong> — Aplikasi manajemen tugas dengan JavaScript</li>
    <li><strong>Blog API</strong> — REST API dengan Node.js & Express</li>
  </ul>
</section>
```

### e. Section Kontak

```html
<section id="contact">
  <h2>Hubungi Saya</h2>
  <p>Email: email@kamu.com</p>
  <p>GitHub: github.com/username-kamu</p>
</section>
```

### f. Footer

```html
<footer>
  <p>&copy; 2026 Built with love by [Nama Kamu]</p>
</footer>
```

---

## Langkah 4: Simpan dan Lihat di Browser

1. Tekan `Cmd + S` untuk save
2. Double-click file `index.html` di Finder
3. Browser akan membuka website kamu

---

## Langkah 5: Tambahkan CSS Styling

Buat file baru `style.css`:

```css
/* Reset default */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Body */
body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
header {
  text-align: center;
  padding: 40px 0;
  border-bottom: 2px solid #eee;
}

header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

header p {
  color: #666;
  font-size: 1.1rem;
}

/* Nav */
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
}

nav a {
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

/* Section */
section {
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}

section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

/* Footer */
footer {
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: 0.9rem;
}
```

Hubungkan CSS ke HTML dengan menambahkan ini di dalam `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

---

## Hasil Akhir

Struktur folder:
```
website-pertama/
├── index.html
└── style.css
```

Buka `index.html` di browser dan lihat hasilnya!

---

## Latihan Tambahan

1. **Tambah gambar**: Gunakan `<img src="foto.jpg" alt="Foto saya">`
2. **Tambah link sosial media**: Gunakan `<a href="https://github.com/...">`
3. **Ubah warna**: Ganti kode warna di CSS
4. **Tambah hover effect**: Tambahkan `transition` di CSS

---

## Ringkasan

```
Website Pertama:
1. Buat folder project
2. Buat file index.html
3. Ketik struktur HTML dasar
4. Tambah konten (header, nav, section, footer)
5. Buat file style.css
6. Hubungkan CSS dengan<link>
7. Buka di browser
```
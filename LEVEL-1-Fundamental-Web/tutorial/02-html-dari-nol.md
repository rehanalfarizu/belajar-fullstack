# Tutorial 02 — HTML dari Nol

## Tujuan
Memahami struktur dokumen HTML, menulis tag-tag dasar, dan membuka hasilnya di browser.

---

## Teori Singkat

**HTML** = HyperText Markup Language
- **BUKAN** bahasa pemrograman
- Bahasa **markup** (penanda) untuk struktur halaman web
- Browser membaca HTML → menampilkan konten

### Anatomi Elemen HTML:

```html
<tag pembuka> konten    </tag penutup>
   <p>       Halo dunia!     </p>
   atribut    konten dalam      penutup
```

---

## Langkah1: Buat File HTML Pertama

1. Buka VSCode
2. Buat file baru: `Cmd + N`
3. Simpan sebagai: `index.html` di folder `belajar-web/level-1/`
4. Ketik kode berikut:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>

  <h1>Selamat Datang!</h1>
  <p>Ini adalah halaman web pertama saya.</p>

</body>
</html>
```

5. Simpan: `Cmd + S`

---

## Langkah 2: Buka di Browser

**Cara 1 — Double Click:**
Klik file `index.html` di Finder.

**Cara 2 — Live Server (Direkomendasikan):**
1. Klik kanan di file `index.html`
2. Pilih **"Open with Live Server"**
3. Browser otomatis terbuka di `http://localhost:5500`

---

## Langkah 3: Pahami Setiap Baris

| Baris | Penjelasan |
|-------|-----------|
| `<!DOCTYPE html>` | Deklarasi HTML5 — WAJIB di baris pertama |
| `<html lang="id">` | Elemen root, `lang` = bahasa dokumen |
| `<head>` | Data meta (tidak tampil ke user) |
| `<meta charset="UTF-8">` | Set karakter encoding |
| `<meta name="viewport">` | Responsive di mobile |
| `<title>` | Judul di tab browser |
| `<body>` | Konten yang TAMPIL ke user |
| `<h1>` | Heading utama |
| `<p>` | Paragraf |

---

## Langkah 4: Ubah dan Lihat Bedanya

### Tambahkan heading lain:
```html
<h2>Sub Judul</h2>
<h3>Sub Sub Judul</h3>
```

### Tambahkan paragraf:
```html
<p>Paragraf pertama saya.</p>
<p>Paragraf kedua dengan<strong>teks tebal</strong>.</p>
```

### Tambahkan list:
```html
<ul>
  <li>Item pertama</li>
  <li>Item kedua</li>
</ul>

<ol>
  <li>Langkah pertama</li>
  <li>Langkah kedua</li>
</ol>
```

### Tambahkan gambar:
```html
<img src="https://picsum.photos/300/200" alt="Gambar contoh">
```

---

## Inspeksi dengan Chrome DevTools

1. Buka halaman di Chrome
2. Klik kanan → **Inspect** (atau tekan `Cmd + Option + I`)
3. Klik ikon **pointer** di kiri atas
4. Klik elemen di halaman
5. Lihat struktur HTML di panel **Elements**

---

## Mini-Challenge

Buat halaman `tentang-saya.html` yang berisi:
- [ ] Judul halaman: "Tentang Saya"
- [ ] Heading `<h1>` dengan nama kamu
- [ ] Heading `<h2>` dengan "Pendidikan"
- [ ] Paragraf perkenalan diri (minimal 2 kalimat)
- [ ] List unordered dengan3 hobi
- [ ] List ordered dengan 3 skill
- [ ] Gambar dari internet

---

## Ringkasan

```
Struktur HTML wajib:
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul</title>
</head>
<body>
  <!-- konten di sini -->
</body>
</html>
```

---

**Lanjut ke:** [03-css-styling-dasar.md](./03-css-styling-dasar.md)

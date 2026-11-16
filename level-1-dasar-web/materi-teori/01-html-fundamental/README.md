# 📘 MATERI TEORI 01 — HTML Fundamental

## 1. Apa itu HTML?

HTML = **HyperText Markup Language**. Bahasa untuk **struktur** halaman web.

```
HTML = Struktur / Kerangka  (seperti tulang belakang)
CSS  = Tampilan / Desain      (seperti kulit dan baju)
JS   = Perilaku / Interaksi   (seperti otot dan saraf)
```

HTML **BUKAN** bahasa pemrograman — ini bahasa **markup** (penanda).

---

## 2. Anatomi Elemen HTML

```html
<tag pembuka>    konten     </tag penutup>
   <p>       Halo dunia!     </p>
   atribut    konten dalam      penutup
```

### Contoh dengan atribut:

```html
<a href="https://google.com" target="_blank" id="link-utama">
  Klik di sini
</a>
```

Enam komponen pembentuk elemen:

1. `<a>` — tag pembuka.
2. `href="..."` — atribut (link tujuan).
3. `target="_blank"` — buka di tab baru.
4. `Klik di sini` — konten atau teks.
5. `</a>` — tag penutup.
6. `id="link-utama"` — ID unik untuk elemen ini.

---

## 3. Struktur Dasar HTML (Wajib Hafal!)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Halaman</title>
</head>
<body>

  <!-- Konten yang TAMPIL ke pengguna -->
  <h1>Selamat Datang</h1>
  <p>Paragraf pertama saya.</p>

</body>
</html>
```

Empat bagian wajib:

1. `<!DOCTYPE html>` — deklarasi HTML5, **WAJIB** di baris pertama.
2. `<html lang="id">` — elemen root, `lang` menunjukkan bahasa dokumen.
3. `<head>` — data META, tidak tampil ke pengguna.
4. `<body>` — konten utama, **TAMPAK** ke pengguna.

---

## 4. Heading & Text Elements

```html
<h1>Judul Utama — HANYA 1 per halaman</h1>
<h2>Sub Judul</h2>
<h3>Sub Sub Judul</h3>
<h4>H4 — untuk sub-section</h4>
<h5>H5</h5>
<h6>H6 — paling kecil</h6>

<p>Ini paragraf. Browser otomatis kasih spasi antar paragraf.</p>

<hr>  <!-- Garis pemisah horizontal -->

<blockquote>
  "Kutipan dari seseorang yang inspiratif"
</blockquote>

<pre>
Teks ini muncul APA ADANYA.
  Termasuk spasi dan line break.
</pre>
```

---

## 5. Text Formatting (Inline)

```html
<p>
  <strong>Teks tebal penting</strong> dan
  <em>miring / emphasized</em>.
</p>

<p>H<sub>2</sub>O (subscript) | E = mc<sup>2</sup> (superscript)</p>

<p>
  <mark>disorot/higlight</mark> |
  <small>kecil</small> |
  <del>dihapus</del> |
  <ins>dimasukkan</ins>
</p>

<code>console.log("inline code");</code>

<a href="https://tokopedia.com">Tokopedia</a>
```

---

## 6. List (Daftar)

### Unordered List (tanpa nomor)

```html
<ul>
  <li>Mie Instan</li>
  <li>Roti
    <ul>
      <li>Roti tawar</li>
      <li>Roti gandum</li>
    </ul>
  </li>
  <li>Telur</li>
</ul>
```

### Ordered List (dengan nomor)

```html
<ol>
  <li>Nyalakan komputer</li>
  <li>Buka VS Code</li>
  <li>Buat file index.html</li>
</ol>
```

---

## 7. Gambar (Image)

```html
<!-- Format dasar -->
<img src="photo.jpg" alt="Deskripsi foto">

<!-- Dengan ukuran -->
<img src="logo.png" alt="Logo"
     width="100" height="100">

<!-- Dari internet -->
<img src="https://picsum.photos/200" alt="Gambar acak">
```

Dua atribut penting gambar:

1. `src` (wajib) — lokasi atau URL gambar.
2. `alt` (wajib) — deskripsi untuk screen reader dan SEO.

---

## 8. Tabel (Table)

```html
<table border="1">
  <thead>
    <tr>
      <th>Nama</th>
      <th>Jurusan</th>
      <th>Angkatan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Andi Wijaya</td>
      <td>Informatika</td>
      <td>2023</td>
    </tr>
    <tr>
      <td>Siti Rahayu</td>
      <td>Sistem Informasi</td>
      <td>2024</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total: 2 mahasiswa</td>
    </tr>
  </tfoot>
</table>
```

Empat hal yang perlu diperhatikan:

1. `<thead>` — baris header.
2. `<tbody>` — isi data.
3. `colspan="3"` — gabung 3 kolom jadi 1.
4. `rowspan="2"` — gabung 2 baris jadi 1.

---

## 9. Form (Formulir) — Part 1

```html
<form action="/submit" method="POST">

  <!-- Input teks -->
  <label for="nama">Nama Lengkap:</label>
  <input type="text" id="nama" name="nama"
         placeholder="Masukkan nama" required>

  <!-- Input email -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email"
         placeholder="email@domain.com">

  <!-- Input password -->
  <label for="password">Password:</label>
  <input type="password" id="password" name="password"
         minlength="8">

  <!-- Textarea -->
  <label for="pesan">Pesan:</label>
  <textarea id="pesan" name="pesan"
            rows="4" placeholder="Tulis pesan..."></textarea>

  <!-- Select / Dropdown -->
  <label for="jurusan">Jurusan:</label>
  <select id="jurusan" name="jurusan">
    <option value="">-- Pilih --</option>
    <option value="informatika">Informatika</option>
    <option value="si">Sistem Informasi</option>
  </select>

  <!-- Checkbox (bisa pilih banyak) -->
  <input type="checkbox" id="coding" name="hobi" value="coding">
  <label for="coding">Coding</label>

  <!-- Radio (hanya pilih 1) -->
  <input type="radio" id="laki" name="gender" value="laki">
  <label for="laki">Laki-laki</label>
  <input type="radio" id="perempuan" name="gender" value="perempuan">
  <label for="perempuan">Perempuan</label>

  <!-- Tombol -->
  <button type="submit">Kirim Data</button>
  <button type="reset">Reset</button>

</form>
```

Enam atribut form yang wajib dipahami:

1. `action` — URL tujuan data form.
2. `method` — `GET` (baca) atau `POST` (kirim).
3. `name` — key saat data dikirim ke server.
4. `id` — untuk hubungkan dengan `<label>`.
5. `required` — field wajib diisi.
6. `placeholder` — teks bantuan di dalam input.

---

## 10. Semantic HTML (HTML5)

Gunakan tag yang **jelas maksudnya**, bukan `<div>` semua.

```html
<!-- HEADER: Bagian atas / navigasi -->
<header>
  <nav>
    <a href="/">Beranda</a>
    <a href="/about">Tentang</a>
  </nav>
</header>

<!-- MAIN: Konten utama -->
<main>
  <article>
    <h1>Judul Artikel</h1>
    <section>
      <h2>Pendahuluan</h2>
      <p>Isi pendahuluan...</p>
    </section>
  </article>

  <!-- ASIDE: Konten tambahan (sidebar) -->
  <aside>
    <h3>Artikel Terkait</h3>
    <ul>
      <li><a href="#">Tutorial CSS</a></li>
    </ul>
  </aside>
</main>

<!-- FOOTER: Bagian bawah -->
<footer>
  <p>&copy; 2026 Belajar Fullstack</p>
</footer>
```

Tiga alasan semantic HTML penting:

1. **Accessibility** — screen reader lebih mudah membaca.
2. **SEO** — Googlebot lebih paham struktur konten.
3. **Maintainability** — kode lebih bersih dan jelas.

---

## 11. Semantic Tags yang Wajib Diketahui

Sepuluh tag semantic esensial:

1. `<header>` — header halaman atau section.
2. `<nav>` — navigasi.
3. `<main>` — konten utama (hanya 1 per halaman).
4. `<article>` — konten mandiri (artikel, post).
5. `<section>` — bagian dalam article.
6. `<aside>` — sidebar atau konten tambahan.
7. `<footer>` — footer halaman atau section.
8. `<figure>` — gambar dengan caption.
9. `<figcaption>` — caption gambar.
10. `<time>` — waktu atau tanggal.

---

## 12. Block vs Inline Elements

### Block Elements (mulai baris baru)

`<address>`, `<article>`, `<aside>`, `<blockquote>`, `<div>`, `<dl>`, `<dt>`, `<dd>`, `<fieldset>`, `<figure>`, `<footer>`, `<form>`, `<h1>`–`<h6>`, `<header>`, `<hr>`, `<li>`, `<main>`, `<nav>`, `<ol>`, `<p>`, `<pre>`, `<section>`, `<table>`, `<ul>`, `<video>`.

### Inline Elements (sebaris)

`<a>`, `<abbr>`, `<b>`, `<br>`, `<button>`, `<cite>`, `<code>`, `<em>`, `<i>`, `<img>`, `<input>`, `<kbd>`, `<label>`, `<mark>`, `<progress>`, `<q>`, `<select>`, `<small>`, `<span>`, `<strong>`, `<sub>`, `<sup>`, `<textarea>`, `<time>`, `<var>`.

---

## 13. Entity HTML (Karakter Khusus)

Sembilan entity yang sering dipakai:

1. `&amp;` → `&` (ampersand).
2. `&lt;` → `<` (less than).
3. `&gt;` → `>` (greater than).
4. `&quot;` → `"` (kutip ganda).
5. `&nbsp;` → spasi non-breaking.
6. `&copy;` → `©`.
7. `&mdash;` → `—`.
8. `&ndash;` → `–`.
9. `&bull;` → `•`.

---

## 14. Meta Tags untuk SEO & Social Media

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>Judul | Nama Website</title>
  <meta name="description" content="Deskripsi max 160 karakter">
  <meta name="author" content="Nama Anda">
  <meta name="robots" content="index, follow">

  <!-- Open Graph (sosmed) -->
  <meta property="og:title" content="Judul saat di-share">
  <meta property="og:description" content="Deskripsi saat di-share">
  <meta property="og:image" content="https://gambar.com/thumb.jpg">
  <meta property="og:type" content="website">
</head>
```

---

## 15. Cara Kerja Browser (Rendering Pipeline)

Tujuh tahap pipeline:

1. **FETCH** — ambil HTML dari server.
2. **PARSE** — parser HTML membentuk DOM Tree.
3. **CSS PARSE** — parser CSS membentuk CSSOM Tree.
4. **BUILD** — DOM + CSSOM digabung jadi Render Tree.
5. **LAYOUT** — hitung ukuran dan posisi tiap elemen.
6. **PAINT** — gambar piksel ke layar.
7. **COMPOSITE** — gabung layer-layer GPU.

---

## Ringkasan

HTML adalah struktur website. Delapan poin ringkasan:

1. `<!DOCTYPE html>` — deklarasi HTML5.
2. `<head>` — meta info.
3. `<body>` — konten yang terlihat.
4. Tags semantik: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
5. Multimedia: `<img>`, `<video>`, `<audio>`, `<iframe>`.
6. Form: `<form>`, `<input>`, `<select>`, `<textarea>`, `<button>`.
7. Atribut global: `id`, `class`, `style`, `title`, `data-*`.
8. Block vs Inline elements menentukan document flow.

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/01-latihan-html/`

# Materi Praktikum 01 -- Latihan HTML

## Tujuan Pembelajaran

Pada modul ini, kamu akan membangun pemahaman yang kuat tentang **HTML (HyperText Markup Language)**, yaitu bahasa dasar untuk membuat struktur halaman web. HTML bukan bahasa pemrograman -- ini adalah **markup language** yang memberitahu browser apa arti setiap bagian konten.

Setelah menyelesaikan 10 soal latiha ini, kamu akan mampu:
- Menulis struktur dokumen HTML yang valid dan semantik
- Menggunakan tag-tag HTML dengan tepat sesuai artinya
- Membuat formulir interaktif, tabel, dan media embedded
- Memahami SEO dasar dan aksesibilitas web

---

## Cara Pakai

```
1. BACA    soal/01-nama-soal.md   → Pahami apa yang diminta
2. BUKA    code/01-nama-soal.html → Lihat template kode awal
3. KETIK   dari 0 di VS Code      → Jangan copy-paste!
4. BUKA    di browser             → Lihat hasilnya
5. COBA    ubah-ubah kode-nya     → Experimen sendiri
```

- Setiap soal punya **README** (di folder `soal/`) yang menjelaskan persyaratan
- Setiap soal punya **template kode awal** (di folder `code/`) dengan komentar `TODO` yang menunjukkan bagian yang perlu kamu isi
- Semua file adalah **file statis HTML** -- cukup double-click untuk membuka di browser

---

## Daftar Latihan

### PEMULA (Soal 01--04)

| # | Judul | Topik yang Dipelajari |
|---|-------|----------------------|
| 01 | Form Biodata Diri | `<h1>`-`<h6>`, `<p>`, `<ul>`, `<ol>`, `<hr>` |
| 02 | Artikel Blog | `<article>`, `<section>`, `<header>`, `<footer>`, `<figure>`, `<figcaption>` |
| 03 | Tabel Jadwal | `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `colspan`, `rowspan` |
| 04 | Form Pendaftaran | `<form>`, `<input>`, `<label>`, `<select>`, `<textarea>`, `<fieldset>` |

### MENENGAH (Soal 05--07)

| # | Judul | Topik yang Dipelajari |
|---|-------|----------------------|
| 05 | Halaman Portfolio | `<img>`, `<iframe>`, `<audio>`, multimedia embedding |
| 06 | Layout Artikel | Semantic HTML lengkap: `<main>`, `<aside>`, `<nav>` |
| 07 | Navigasi & Dropdown | `<nav>`, anchor links, relative URL, href |

### LANJUT (Soal 08--10)

| # | Judul | Topik yang Dipelajari |
|---|-------|----------------------|
| 08 | SEO & Accessibility | Meta tags, `alt`, `aria-label`, heading hierarchy |
| 09 | Form Lanjutan | Input types, `required`, `pattern`, validation |
| 10 | Document Flow | Block vs inline, `<div>`, `<span>`, box model konsep |

---

## Persiapan: Buat Folder Kerja

Buat folder khusus untuk menyimpan semua file praktikum:

```
belajar-web/
├── 01-form-diri.html
├── 02-artikel-blog.html
├── 03-tabel-jadwal.html
├── 04-form-pendaftaran.html
├── 05-halaman-portfolio.html
├── 06-layout-artikel.html
├── 07-navigasi-dropdown.html
├── 08-seo-accessibility.html
├── 09-form-lanjutan.html
└── 10-document-flow.html
```

---

## Tips Penting

```
1. KETIK dari 0 — jangan copy-paste. Menulis melatih muscle memory coding.
2. PAHAM logika dulu — baca materi-teori sebelum membuka template.
3. Lihat browser developer tools (F12) — inspect element untuk debug.
4. RUBAH nilainya — jangan hanya salin persis, coba ubah dan lihat bedanya.
5. BREAK it — kalau stuck, pecah jadi bagian kecil, uji satu per satu.
6. EROR adalah guru — baca pesan error dari browser dengan seksama.
7. Validasi HTML di https://validator.w3.org — memastikan struktur benar.
```

---

## Struktur Template Kode

Setiap file template memiliki format seperti ini:

```html
<!-- ========== TODO 1: Judul Utama ========== -->
<!-- Tambahkan <h1> dengan teks "Biodata Diri" -->
```

Artinya:
- Comment `<!-- ... -->` menunjukkan instruksi
- Kata `TODO` menunjukkan bagian yang HARUS kamu isi
- Teks setelah `TODO` menunjukkan apa yang harus dilakukan
- Hapus komentar tersebut setelah kamu menulis kode yang diminta

---

**Target: 10/10 soal dikerjakan dari 0 -> fondasi HTML SOLID!**

Setelah selesai, lanjut ke Materi Praktikum 02 (CSS) untuk menambahkan tampilan pada struktur HTML yang sudah kamu buat.
<!-- markdownlint-disable MD024 MD028 -->

# SOAL 01 — Biodata Diri

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat dokumen HTML lengkap (DOCTYPE, head, body)
- Menggunakan heading (`<h1>` sampai `<h6>`) untuk hierarki judul
- Membuat paragraf dengan `<p>`
- Membuat list tidak berurut (`<ul>` + `<li>`)
- Membuat list berurut (`<ol>` + `<li>`)

**Difficulty:** Pemula • **Estimasi:** 20-30 menit

---

## Briefing

Kamu akan membuat halaman biodata diri pertamamu. Bayangkan kamu membuat **kartu
nama digital** yang menampilkan informasi tentang dirimu.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami apa itu tag dan kenapa dipakai
2. **Ketik dari 0** — buka `code/01-form-diri.html`, cari `TODO(human)`, lalu ketik
   sendiri (JANGAN copy-paste dari contoh mana pun)
3. **Verifikasi** — cek hasilmu dengan panduan verifikasi

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir dan
mengetik**, bukan menyalin. Ini skill paling penting untuk programmer.

---

## Bagian A: Tag HTML Dasar

### Penjelasan

Tiap file HTML punya kerangka dasar. Komponennya:

- `<!DOCTYPE html>` — baris pertama, deklarasi "ini HTML5"
- `<html lang="id">` — root element, `lang="id"` = bahasa Indonesia
- `<head>` — info halaman (tidak muncul di layar): judul, encoding
- `<body>` — konten yang muncul di layar

### Wajib Ada di Kode Kamu

- `<!DOCTYPE html>` di baris pertama
- `<html lang="id">` membuka dokumen
- `<head>` dengan `<meta charset="UTF-8">` dan `<title>`
- `<body>` untuk semua konten
- `</html>` menutup di baris terakhir

### Cara Mengetik dari 0

1. Buka `code/01-form-diri.html` di VS Code
2. Lihat kerangka yang sudah disediakan
3. **Jangan tambah atau hapus** kerangka — cukup isi yang ditandai `TODO(human)`

### Verifikasi

- [ ] File double-click bisa dibuka di browser
- [ ] Tab browser menampilkan judul (yang akan kamu isi di Bagian B)
- [ ] Inspect Element (F12) menunjukkan struktur: html > head + body

---

## Bagian B: Judul Utama (`<h1>`)

### Penjelasan

`<h1>` adalah **heading level 1** — judul paling penting di halaman. Cuma boleh
ada **satu `<h1>`** per halaman (standar SEO & aksesibilitas).

Ada 6 level heading dari `<h1>` (paling besar) sampai `<h6>` (paling kecil).
Bayangkan seperti outline buku: `<h1>` = judul bab, `<h2>` = sub-bab.

### Wajib Ada di Kode Kamu

- Tag pembuka `<h1>` dan tag penutup `</h1>`
- Konten: judul halaman (contoh: "Biodata Diri")
- Penutup harus ditulis **setelah** konten, bukan di awal

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk judul di `code/01-form-diri.html`
2. Ketik tag pembuka
3. Tulis judul di antara
4. Ketik tag penutup
5. Save, buka di browser, lihat hasilnya

### Verifikasi

- [ ] Judul besar muncul di **paling atas** halaman
- [ ] Inspect Element: tag `<h1>` **hanya ada satu** di file
- [ ] Ukuran teks lebih besar dari teks lain (otomatis oleh browser)

---

## Bagian C: Paragraf Perkenalan (`<p>`)

### Penjelasan

`<p>` adalah tag untuk paragraf. Browser otomatis menambahkan **jarak atas dan
bawah** untuk memisahkan paragraf dari elemen lain.

### Wajib Ada di Kode Kamu

- Minimal 1 tag `<p>` dengan tag penutup
- Konten: perkenalan dirimu (minimal 2 kalimat)
- Di bawah `<h1>`, di atas section lain

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk paragraf perkenalan
2. Tulis **2 kalimat** tentang dirimu (nama, kuliah, hobi, atau apa saja)
3. Ingat: buka dengan `<p>`, tutup dengan `</p>` — konten di tengah

### Verifikasi

- [ ] Paragraf muncul di **bawah judul**
- [ ] Ada jarak (margin) sebelum dan sesudah paragraf
- [ ] Kalau panjang, teks **otomatis pindah baris** saat lebar layar habis

---

## Bagian D: Garis Pemisah (`<hr>`)

### Penjelasan

`<hr>` adalah **horizontal rule** — garis horizontal sebagai pemisah antar
section. Berbeda dari tag lain, `<hr>` **tidak punya isi dan tidak butuh
penutup** (disebut **void element**).

### Wajib Ada di Kode Kamu

- Tag `<hr>` (tanpa penutup)
- Ditempatkan di antara section yang berbeda konteks

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk garis pemisah
2. Ketik `<hr>` di posisi yang tepat (antara paragraf perkenalan dan section data diri)
3. Save dan lihat di browser

### Verifikasi

- [ ] Garis horizontal tipis muncul di halaman
- [ ] Posisinya memisahkan paragraf perkenalan dari section di bawahnya

---

## Bagian E: Sub-Judul Section (`<h2>`)

### Penjelasan

`<h2>` adalah sub-judul di bawah `<h1>`. Dipakai untuk section baru dalam
halaman yang sama. Hierarki heading yang benar: `h1` lalu `h2`, **jangan
loncat level**.

### Wajib Ada di Kode Kamu

- Minimal 2 tag `<h2>` untuk sub-section
- Contoh: "Data Pribadi" dan "Hobi"

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk sub-judul section
2. Tulis `<h2>` dengan nama section
3. Ulangi untuk section lain yang kamu butuhkan

### Verifikasi

- [ ] Ukuran teks lebih kecil dari `<h1>` tapi lebih besar dari `<p>`
- [ ] Ada jarak (margin) sebelum dan sesudah heading

---

## Bagian F: List Tidak Berurut (`<ul>` + `<li>`)

### Penjelasan

`<ul>` = **Unordered List** = list dengan bullet point (•). Dipakai untuk hal
yang **tidak punya urutan penting** (hobi, belanjaan, fitur, dst).

`<li>` = **List Item** = satu item di dalam list. Wajib di dalam `<ul>` atau
`<ol>`.

### Wajib Ada di Kode Kamu

- Minimal 1 `<ul>` dengan minimal 3 `<li>` di dalamnya
- Tiap `<li>` punya tag penutup
- Konten tiap `<li>` jelas dan singkat

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk list hobi atau data diri
2. **Pikirkan dulu** apa yang mau dimasukkan
3. Ketik `<ul>`, lalu `<li>...</li>` untuk tiap item
4. Tutup dengan `</ul>`

### Verifikasi

- [ ] Browser otomatis menampilkan **bullet •** di depan tiap item
- [ ] Tiap item di baris baru
- [ ] Indentasi: `<li>` di-indent dari `<ul>` (visual saja, tapi baik untuk kerapihan)

---

## Bagian G: List Berurut (`<ol>` + `<li>`)

### Penjelasan

`<ol>` = **Ordered List** = list dengan **nomor urut** (1, 2, 3, ...). Dipakai
untuk hal yang **urutannya penting** (langkah-langkah, ranking, urutan waktu).

### Wajib Ada di Kode Kamu

- Minimal 1 `<ol>` dengan minimal 4 `<li>` (untuk langkah registrasi email)
- Tiap langkah jelas dan berurutan

### Cara Mengetik dari 0

1. Cari `TODO(human)` untuk langkah registrasi
2. Tulis **4 langkah** yang masuk akal (misal: buka website → klik daftar → isi
   form → verifikasi)
3. Pakai `<ol>` bukan `<ul>`

### Verifikasi

- [ ] Browser otomatis menampilkan **nomor 1, 2, 3, 4** (bukan bullet)
- [ ] Urutan langkah terlihat logis

---

## Bagian H: Footer dengan `<small>`

### Penjelasan

`<small>` membuat teks **lebih kecil** dari teks biasa. Dipakai untuk info
tambahan yang kurang penting: copyright, catatan kaki, disclaimer.

`<small>` adalah **semantic tag** — artinya "konten ini kurang penting secara
hukum/teknis", bukan cuma styling.

### Wajib Ada di Kode Kamu

- Minimal 1 `<small>` dengan tag penutup
- Berisi info: "Terakhir diupdate" + tahun

### Verifikasi

- [ ] Teks lebih kecil dari teks biasa
- [ ] Positif: tidak terlalu kecil sampai tidak terbaca

---

## Tabel Ringkasan: Kapan Pakai Tag Apa

| Kebutuhan                         | Tag               |
| --------------------------------- | ----------------- |
| Judul utama halaman               | `<h1>`            |
| Sub-judul section                 | `<h2>`            |
| Sub-sub-judul                     | `<h3>`            |
| Paragraf teks                     | `<p>`             |
| List tidak berurut (hobi, fitur)  | `<ul>` + `<li>`   |
| List berurut (langkah, ranking)   | `<ol>` + `<li>`   |
| Garis pemisah                     | `<hr>`            |
| Teks kecil (footer, copyright)    | `<small>`         |

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 02, cek semua ini:

- [ ] File bisa dibuka di browser tanpa error
- [ ] **W3C Validator PASS** — buka [validator.w3.org](https://validator.w3.org/),
      paste source code, harus "Document checking completed. No errors or warnings"
- [ ] **Hanya ada SATU `<h1>`** — cek dengan Ctrl+F di VS Code
- [ ] **Semua tag punya penutup** — tidak ada `<h1>` tanpa `</h1>`, dst
- [ ] **Browser menampilkan**:
      - Judul besar di atas
      - Paragraf perkenalan
      - Garis horizontal
      - Section data diri dengan bullet
      - Section hobi dengan bullet
      - Section registrasi dengan NOMOR (bukan bullet)
      - Footer kecil di bawah

---

## Cara Submit

1. Buka `code/01-form-diri.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. Verifikasi dengan checklist di atas
6. Kalau PASS, lanjut ke `soal/02-artikel-blog.md`

---

## Catatan untuk Pemula

> **Spasi dan baris kosong di kode TIDAK mempengaruhi tampilan di browser.** Yang penting **tag pembuka, tag penutup, dan posisi (di dalam / di luar)**.
> **Indentasi (spasi di awal baris) bukan cuma biar rapi** — itu menunjukkan hierarki. Biasakan dari awal: tag di dalam tag di-indent lebih dalam.
> **HTML case-insensitive** (huruf besar/kecil sama), tapi standarnya pakai huruf kecil. Biasakan dari awal: tulis `<h1>` bukan `<H1>`.
> **Kalau ada yang tidak jalan**: klik kanan di browser → "Inspect Element" → lihat struktur. Biasanya ada tag lupa tutup atau salah ketik.

<!-- markdownlint-enable MD024 MD028 -->

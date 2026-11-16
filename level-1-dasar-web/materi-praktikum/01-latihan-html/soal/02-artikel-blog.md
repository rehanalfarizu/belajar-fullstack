<!-- markdownlint-disable MD024 MD028 -->

# SOAL 02 — Artikel Blog dengan Semantic HTML

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **arti (semantic)** dari tag-tag kontainer: `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`
- Membedakan **kapan pakai `<article>` vs `<section>`** (dua tag yang sering keliru)
- Menggunakan `<figure>` + `<figcaption>` untuk gambar + caption yang saling terikat
- Menulis kutipan dengan `<blockquote>` (bukan cuma `"..."` biasa)
- Memformat teks inline: `<strong>`, `<em>`, `<mark>`
- Menandai tanggal dengan `<time datetime="...">` agar mesin pencari paham

**Topik:** `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<figure>`, `<figcaption>`, `<blockquote>`, `<time>`, `<strong>`, `<em>`, `<mark>`

### Overview Singkat Setiap Tag (Baca Dulu Sebelum Mulai)

Sebelum masuk ke bagian A–I di bawah, pahami dulu logika singkat tiap tag. Nanti di bagian A–I kita bahas lebih dalam dengan contoh kode.

**`<header>`** — *Kontainer pembuka sebuah halaman atau section.* Ibarat **cover depan buku**: berisi judul, tagline, logo, atau navigasi. Bukan sekadar "kotak di atas" — `<header>` punya makna "ini bagian pengantar".

**`<main>`** — *Wadah untuk konten utama halaman, hanya satu per halaman.* Ibarat **isi buku** (bukan cover, bukan daftar isi, bukan halaman belakang). Kalau kamu hapus `<main>`, halaman masih ada, tapi screen reader tidak punya "pintasan" untuk loncat ke konten.

**`<article>`** — *Konten mandiri yang masuk akal berdiri sendiri.* Ibarat **artikel koran** — bisa dicabut, ditempel di tempat lain (majalah, RSS, website lain), tetap utuh. Tes: "kalau saya pindahin, masih masuk akal?" → ya = `<article>`.

**`<section>`** — *Pengelompokan tematik yang butuh konteks halaman.* Ibarat **bab dalam buku** — butuh buku itu untuk masuk akal. HTML5 spec: `<section>` wajib punya heading (`<h2>`, `<h3>`, dll).

**`<footer>`** — *Kontainer penutup halaman atau section.* Ibarat **halaman belakang buku**: copyright, info kontak, tahun, link ke sosmed. Lawan dari `<header>` (sama-sama kontainer, beda posisi logis).

**`<figure>`** — *Unit konten mandiri yang bisa dipindahkan (gambar, ilustrasi, kode, diagram).* Ibarat **gambar di buku teks** — selalu punya nomor (Gambar 1.1) dan keterangan.

**`<figcaption>`** — *Caption untuk figure.* Penjelasan singkat tentang isi figure. **Harus** di dalam `<figure>` — milik figure itu.

**`<blockquote>`** — *Blok kutipan dari sumber lain.* Ibarat tanda kutip panjang di buku: teks ini **bukan pendapat penulis**, tapi kutipan orang lain. Browser auto-indent. Tambahkan `<cite>` untuk menyebut sumber.

**`<time>`** — *Tandai teks yang berisi waktu/tanggal.* Atribut `datetime` (format ISO 8601: `YYYY-MM-DD`) memberi **format standar** untuk mesin, walau teksnya untuk manusia bisa "15 Juni 2026".

**`<strong>`** — *Teks penting / urgensi tinggi.* Ibarat **huruf tebal merah** di buku: "INI PENTING, PERHATIKAN". Screen reader membacakan lebih keras. Bedanya dengan `<b>`: `<b>` cuma visual, `<strong>` punya makna.

**`<em>`** — *Teks dengan penekanan / intonasi.* Ibarat **kata yang digarisbawahi saat guru membaca**: "Saya *sangat* menyarankan...". Screen reader membacakan dengan penekanan. Bedanya dengan `<i>`: `<i>` cuma visual, `<em>` punya makna.

**`<mark>`** — *Teks yang disorot / di-highlight untuk referensi.* Ibarat **stabilo kuning** di buku: "bagian ini yang sedang kita bicarakan". Sering dipakai untuk highlight hasil pencarian.

**Referensi utama:**

- [MDN: `<article>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/article)
- [MDN: `<section>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/section)
- [MDN: `<figure>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/figure)
- [MDN: Semantic HTML (pengantar)](https://developer.mozilla.org/id/docs/Glossary/Semantics)

**Difficulty:** Pemula • **Estimasi:** 45-60 menit

---

## Briefing

Bayangkan kamu seorang penulis yang diminta mengisi **blog teknologi** kampus. Blog itu punya satu artikel utama yang membahas topik pilihanmu. Kamu tidak boleh asal tulis paragraf panjang — artikel blog yang **bagus** punya struktur yang jelas: **header** pembuka, **beberapa section** dengan sub-judul, **gambar** pendukung, **kutipan** dari sumber, dan **footer** penutup.

Yang akan kamu bangun bukan hanya "halaman yang kelihatan OK di browser", tapi halaman yang **punya makna** — bisa dibaca dengan benar oleh screen reader (untuk tunanetra), dipahami dengan benar oleh Google, dan gampang dipotong-potong untuk di-share ke media sosial.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya (mengapa tag ini ada, bukan hanya "untuk apa")
2. **Baca Kapan Pakai & Kapan Jangan** — supaya kamu tidak salah pilih tag
3. **Lihat Yang Terjadi di Browser** — bayangkan output sebelum nulis
4. **Ketik dari 0** di `code/02-artikel-blog.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate HTML + Meta SEO

### Penjelasan

Sebelum nulis konten, kita butuh **kerangka** (boilerplate). Yang perlu kamu pahami:

- `<!DOCTYPE html>` — baris pertama, **wajib**. Tanpa ini, browser masuk "quirks mode" (aturan lama, tampilan bisa kacau).
- `<html lang="id">` — `lang="id"` = bahasa Indonesia. Screen reader **membaca pengucapan** sesuai bahasa; tanpa `lang`, pembacaan bisa kacau.
- `<meta charset="UTF-8">` — encoding karakter. Tanpa ini, huruf "é", "ñ", "中文" bisa jadi karakter aneh.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — supaya halaman responsive di HP. **Tanpa ini, halaman di HP zoom out kelewat kecil.**
- `<title>` — judul tab browser + judul di hasil Google. Maksimal ±60 karakter.
- `<meta name="description">` — deskripsi yang muncul di bawah judul Google. Maksimal ±160 karakter.

### Kapan Pakai

- **Selalu** untuk setiap file HTML. Boilerplate bukan opsional.

### Kapan Jangan

- Jangan pakai `<meta name="keywords">` — Google sudah **mengabaikannya** sejak 2009. Tidak bantu SEO, malah bikin kode kotor.
- Jangan tulis `<title>` lebih dari 60 karakter — akan terpotong di Google.

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Halaman — Maks 60 Karakter</title>
  <meta name="description" content="Deskripsi yang menarik, maks 160 karakter.">
</head>
<body>
  <!-- konten di sini -->
</body>
</html>
```

### Yang Terjadi di Browser

- Tab browser menampilkan teks di dalam `<title>`.
- Inspect Element (F12) → tab "Elements" → struktur pohon: `html` > `head` (info) + `body` (konten).
- Buka halaman di HP → tampil proporsional, tidak zoom out.
- Copy URL, paste di WhatsApp → preview pakai `<title>` + `<meta description>`.

### Verifikasi

- [ ] Baris pertama adalah `<!DOCTYPE html>`
- [ ] `<html lang="id">` (bukan `lang="en"`, bukan tanpa `lang`)
- [ ] `<meta charset="UTF-8">` ada di dalam `<head>`
- [ ] `<meta name="viewport" ...>` ada
- [ ] `<title>` ≤ 60 karakter
- [ ] `<meta name="description">` ≤ 160 karakter

---

## Bagian B: `<header>` Halaman + `<h1>` Judul Utama

### Penjelasan

`<header>` adalah **kontainer pembuka** untuk sebuah halaman atau section. Posisinya **biasanya di atas** (tapi tidak wajib — header yang dimaksud di sini adalah **makna**, bukan lokasi visual).

`<h1>` adalah **heading level 1** — judul paling penting di halaman. Cuma boleh ada **satu `<h1>` per halaman** (standar SEO & aksesibilitas). Bayangkan seperti **judul buku**: cuma satu.

### Kapan Pakai

- `<header>` di atas `<main>` untuk header halaman (logo, judul, tagline)
- `<h1>` untuk judul utama halaman
- `<p>` di dalam `<header>` biasanya untuk tagline / deskripsi singkat

### Kapan Jangan

- Jangan pakai `<header>` untuk **layout atas-bawah saja** (misal cuma untuk background warna). Pakai `<div>` dengan class CSS.
- Jangan pakai lebih dari 1 `<h1>` per halaman. Sub-bagian pakai `<h2>` / `<h3>`.
- Jangan skip level: `<h1>` → `<h3>` tanpa `<h2>` membuat screen reader bingung.

### Pola Kode

```html
<body>
  <header>
    <h1>Belajar HTML5 untuk Pemula</h1>
    <p>Panduan step-by-step dari nol sampai bisa bikin web sendiri</p>
  </header>
  <!-- sisa halaman -->
</body>
```

### Yang Terjadi di Browser (TANPA CSS)

- `<header>` tampil **persis sama** dengan `<div>` — semua block, mulai baris baru.
- `<h1>` otomatis **paling besar** (default 2em / 32px), ada margin atas-bawah.
- `<p>` tampil dengan margin default, line-height normal.

**Yang TIDAK terjadi (ini yang sering bikin bingung pemula):**
- `<header>` **tidak otomatis** punya background, padding, atau style khusus. Itu semua dari CSS nanti.
- Perbedaan `<header>` vs `<div>` hanya **untuk mesin & screen reader**, bukan visual.

### Verifikasi

- [ ] Tepat **satu** `<h1>` di seluruh halaman
- [ ] `<h1>` ada di dalam `<header>` halaman (yang di dalam `<body>`, bukan di dalam `<head>`)
- [ ] Tag `<header>` ditutup (`</header>`)
- [ ] Inspect Element: lihat outline heading, harus mulai dari H1 → H2 → H3 (tidak loncat)

---

## Bagian C: `<main>` sebagai Wadah Konten Utama

### Penjelasan

`<main>` adalah **wadah untuk konten UTAMA** halaman. Cuma boleh ada **satu `<main>` per halaman** — ini bukan untuk sidebar, header, footer, atau nav. Kalau dihilangkan `<main>`, konten halaman masih ada, tapi **screen reader tidak punya "tombol" untuk loncat ke konten**.

### Kapan Pakai

- Tepat **satu** `<main>` per halaman, membungkus **konten unik halaman itu** (artikel, dashboard, daftar produk, dll).

### Kapan Jangan

- Jangan lebih dari satu `<main>`.
- Jangan masukkan `<header>`, `<nav>`, `<aside>`, atau `<footer>` ke dalam `<main>` — itu konten **pendukung**, bukan utama.
- Jangan pakai `<main>` di dalam `<article>` / `<section>` / `<aside>` — ini wadah halaman, bukan nested.

### Pola Kode

```html
<body>
  <header>...</header>

  <main>
    <!-- artikel, section, dll -->
  </main>

  <footer>...</footer>
</body>
```

### Yang Terjadi di Browser

- Tampilan **sama** dengan `<div>` — tidak ada visual khusus.
- Tapi screen reader bisa **langsung skip ke konten** (pintasan keyboard: skip-to-content).
- Browser secara otomatis **meng-hidden** `<main>` di "reader mode" Safari/Firefox.

### Verifikasi

- [ ] Tepat **satu** `<main>` di seluruh file
- [ ] `<main>` di antara `<header>` dan `<footer>` (atau setidaknya, bukan di dalam keduanya)
- [ ] `<main>` TIDAK membungkus `<header>`, `<nav>`, `<aside>`, atau `<footer>`

---

## Bagian D: `<article>` vs `<section>` (BAGIAN PALING PENTING)

### Penjelasan

`<article>` dan `<section>` terlihat mirip (keduanya kontainer), tapi **maknanya beda**. Ini sumber kebingungan nomor 1 pemula.

**Analogi:**

| Tag | Analogi | Tes |
|---|---|---|
| `<article>` | **Artikel koran** — bisa dicabut, ditempel di tempat lain, **masuk akal sendiri** | "Kalau saya pindahin ke website lain / RSS feed / print, apakah masih masuk akal?" → YA = `<article>` |
| `<section>` | **Bab dalam buku** — butuh konteks buku untuk masuk akal | "Apakah ini grouping tematik yang butuh konteks halaman?" → YA = `<section>` |

**Contoh konkret:**

```html
<!-- INI <article>: satu artikel utuh, berdiri sendiri -->
<article>
  <h2>5 Tips Belajar Coding untuk Pemula</h2>
  <p>...</p>
</article>

<!-- INI <section>: pengelompokan tema dalam halaman "Tentang Saya" -->
<section>
  <h2>Hobi</h2>
  <p>Saya suka coding dan membaca.</p>
</section>
```

### Kapan Pakai `<article>`

- Postingan blog
- Berita / artikel jurnal
- Komentar pengguna (bisa berdiri sendiri)
- Kartu produk (product card di e-commerce)
- Post forum / tweet

### Kapan Pakai `<section>`

- Pengelompokan tematik dalam halaman (About → Pendidikan, About → Pengalaman)
- Chapter / sub-bagian dalam satu dokumen panjang
- Tab panel (secara visual)

### Kapan Jangan

- **Jangan pakai `<article>`** untuk grouping biasa. Kalau tidak bisa "berdiri sendiri", pakai `<section>` atau `<div>`.
- **Jangan pakai `<section>`** cuma sebagai "wadah styling" tanpa ada sub-judul. HTML5 spec: `<section>` harus ada heading.
- **Jangan nested** `<article>` di dalam `<article>` kecuali artikel komentar (yang secara konseptual berdiri sendiri).
- Kalau ragu, pakai `<div>` — itu **netral**, tidak klaim makna apa-apa.

### Pola Kode

```html
<main>
  <article>
    <h2>Judul Artikel</h2>
    <p>Pendahuluan...</p>

    <section>
      <h3>Sub-Bagian 1</h3>
      <p>Isi sub-bagian...</p>
    </section>

    <section>
      <h3>Sub-Bagian 2</h3>
      <p>Isi sub-bagian...</p>
    </section>
  </article>
</main>
```

### Yang Terjadi di Browser (TANPA CSS)

- Tampilan **identik** dengan `<div>`. Lagi-lagi, semua visual kembali ke CSS.
- Perbedaan **hanya untuk mesin**:
  - Google: "Oh, ini artikel, saya akan index judulnya"
  - Screen reader: "Ini artikel independen, bisa dilompati atau tidak"
  - RSS reader: "Saya bisa ambil isi `<article>` untuk feed"

### Verifikasi

- [ ] Artikel blog kamu dibungkus **satu** `<article>`
- [ ] Tiap sub-bagian besar (Pendahuluan, Pembahasan, Penutup) dibungkus `<section>` dengan `<h2>` sendiri
- [ ] `<article>` ada di dalam `<main>`, bukan di `<aside>`
- [ ] Tes "berdiri sendiri": kalau bagian itu dicabut dan ditempel di tempat lain, **masuk akal** tanpa konteks halaman

---

## Bagian E: `<figure>` + `<figcaption>` untuk Gambar + Caption

### Penjelasan

`<figure>` = **unit konten mandiri** yang bisa dipindahkan (gambar, ilustrasi, kode, diagram, foto). `<figcaption>` = **caption** untuk figure itu — menjelaskan apa isinya.

**Analogi:** Bayangkan **buku teks**. Setiap gambar punya **nomor** (Gambar 1.1, Gambar 1.2) dan **keterangan** di bawahnya. Itulah `<figure>` + `<figcaption>`.

### Kapan Pakai

- Gambar, ilustrasi, diagram, foto
- Cuplikan kode (snippet) yang mau dilabeli
- Tabel kecil yang berdiri sendiri (misal: data penjualan 1 bulan)

### Kapan Jangan

- Jangan pakai `<figure>` untuk **icon dekoratif** (misal: icon search di navbar) → cukup `<img>` saja, atau bahkan CSS background.
- Jangan masukkan `<figcaption>` di luar `<figure>` — caption harus **milik** figure itu.
- Jangan lupa `alt` di `<img>` di dalam `<figure>`. Alt = deskripsi untuk tunanetra & SEO.

### Pola Kode

```html
<figure>
  <img src="gambar.jpg" alt="Deskripsi gambar untuk tunanetra">
  <figcaption>Keterangan singkat tentang gambar (Gambar 1.1: ...)</figcaption>
</figure>
```

### Yang Terjadi di Browser

- `<figure>` tampil **block** (mulai baris baru), dengan **margin default**.
- `<figcaption>` tampil **di bawah** gambar (default styling browser).
- Screen reader membacakan: "Figure. Ilustrasi menulis blog. Keterangan: ..."

### Verifikasi

- [ ] Setiap `<img>` di dalam `<figure>` punya `alt` (tidak boleh `alt=""` kecuali benar-benar dekoratif)
- [ ] `<figcaption>` **di dalam** `<figure>`, bukan di luar
- [ ] Caption menjelaskan **isi/konteks** gambar, bukan cuma "Gambar 1" (yang tidak informatif)

---

## Bagian F: `<blockquote>` untuk Kutipan

### Penjelasan

`<blockquote>` = **blok kutipan** — teks yang dikutip dari sumber lain. Browser menambah **indentasi** dan sering **margin** untuk membedakan dari teks biasa.

`<cite>` (opsional) = **sumber kutipan** (buku, website, orang). Bisa juga pakai atribut `cite="URL"` di `<blockquote>`.

### Bedanya dengan `"..."` Biasa

- `"..."` di dalam `<p>` = teks biasa dengan tanda kutip. Tidak ada makna.
- `<blockquote>` = "ini **kutipan**" — secara semantic berbeda, screen reader bisa membacakan dengan intonasi berbeda.

### Kapan Pakai

- Kutipan panjang dari buku, artikel, pembicara
- Testimoni (kadang, tapi bisa juga `<p>` biasa)
- Puisi atau lirik yang mau ditonjolkan

### Kapan Jangan

- Jangan pakai `<blockquote>` untuk **indentasi visual saja**. Itu tugas CSS (`margin-left`).
- Jangan lupa menutup dengan `</blockquote>`.

### Pola Kode

```html
<!-- Kutipan pendek -->
<blockquote>
  <p>Konten adalah raja.</p>
</blockquote>

<!-- Kutipan dengan sumber -->
<blockquote cite="https://bill-gates.com/quotes">
  <p>Konten adalah raja.</p>
  <cite>— Bill Gates</cite>
</blockquote>
```

### Yang Terjadi di Browser

- Tampilan default: **indentasi kiri-kanan** (margin 40px), teks dengan font sedikit berbeda di beberapa browser.
- Inspect Element: `cite` attribute muncul di tooltip kalau di-hover (tergantung browser).

### Verifikasi

- [ ] Kutipan dibungkus `<blockquote>`, bukan cuma `"..."` di dalam `<p>`
- [ ] (Bonus) Pakai `<cite>` atau atribut `cite="URL"` untuk menunjukkan sumber

---

## Bagian G: Text Formatting Inline (`<strong>`, `<em>`, `<mark>`)

### Penjelasan

Tiga tag **inline** (tidak membuat baris baru) untuk memformat teks dengan **makna**:

| Tag | Makna | Visual Default | Bedanya dengan |
|---|---|---|---|
| `<strong>` | **Penting / urgensi tinggi** | Tebal | `<b>` = tebal saja (visual, tanpa makna) |
| `<em>` | **Penekanan / intonasi** (stress) | Miring | `<i>` = miring saja (visual, tanpa makna) |
| `<mark>` | **Highlight / sorotan** (referensi) | Background kuning | `<span style="background">` = visual saja |

**Poin kunci:** `<strong>` dan `<em>` punya **makna**, bukan cuma tampilan. Screen reader bisa:
- `<strong>` → membacakan dengan intonasi **lebih keras**
- `<em>` → membacakan dengan **penekanan**
- `<mark>` → membacakan dengan **"disorot"**

### Kapan Pakai `<strong>`

- Peringatan, disclaimer, informasi kritis
- "PENTING: ..." di tengah paragraf

### Kapan Pakai `<em>`

- Istilah yang didefinisikan
- Penekanan emosional: "Saya **sangat** menyarankan..."

### Kapan Pakai `<mark>`

- Highlight teks hasil pencarian
- Bagian yang sedang dibahas / fokus pembaca

### Kapan Jangan

- Jangan pakai `<b>` / `<i>` kecuali untuk **kategori, nama produk, kata asing** yang tidak butuh penekanan semantic.
- Jangan pakai `<strong>` untuk **semua yang mau ditebalkan**. Itu tugas CSS `font-weight`.

### Pola Kode

```html
<p>
  <strong>Penting:</strong> Selalu backup data sebelum
  <em>mengubah</em> konfigurasi. File yang
  <mark>terpengaruh</mark> akan langsung ter-update.
</p>
```

### Verifikasi

- [ ] `<strong>` untuk hal **penting**, bukan sekadar menebalkan
- [ ] `<em>` untuk **penekanan**, bukan sekadar memiringkan
- [ ] `<mark>` untuk **sorotan** yang punya makna, bukan sekadar highlight

---

## Bagian H: `<time datetime="...">` untuk Tanggal

### Penjelasan

`<time>` menandai **teks yang merepresentasikan waktu/tanggal**. Atribut `datetime` berisi **format ISO 8601** (`YYYY-MM-DD` atau `YYYY-MM-DDTHH:MM`) yang bisa dibaca mesin.

### Kenapa Perlu `datetime`?

Teks "15 Januari 2026" bisa ditulis 1000 cara berbeda: "Jan 15, 2026", "15/01/26", "15 Januari 2026". Mesin tidak bisa menebak format yang konsisten. Atribut `datetime` memberi **format standar** yang dipahami semua mesin.

### Kapan Pakai

- Tanggal publish artikel
- Jadwal acara
- Waktu kedaluwarsa

### Kapan Jangan

- Jangan pakai `<time>` untuk **teks yang tidak benar-benar waktu** (misal "di zaman dulu", "kapan-kapan").
- Jangan tulis `<time>` tanpa `datetime` (kecuali teksnya sudah ISO 8601: `<time>2026-06-01</time>`).

### Pola Kode

```html
<article>
  <h2>Judul</h2>
  <p>Dipublikasikan: <time datetime="2026-06-01">1 Juni 2026</time></p>
  <p>Update terakhir: <time datetime="2026-06-15T10:30">15 Juni 2026, 10:30</time></p>
</article>
```

### Yang Terjadi di Browser

- Tampilan **sama** dengan teks biasa. Tag ini untuk **mesin**, bukan manusia.
- Google bisa memfilter / sortir artikel berdasarkan `datetime` → muncul di "News" dengan tanggal akurat.
- RSS reader tahu kapan artikel di-publish.

### Verifikasi

- [ ] Tiap `<time>` punya atribut `datetime` dengan format ISO 8601
- [ ] Tanggal publish dan (opsional) update terisi

---

## Bagian I: `<footer>` Halaman Penutup

### Penjelasan

`<footer>` = **kontainer penutup** untuk halaman atau section. Mirip `<header>`, tapi di bawah. Isinya: copyright, link kontak, info tambahan.

### Kapan Pakai

- Footer halaman (di akhir `<body>`): copyright, tahun, kontak, link sosmed
- Footer artikel (di dalam `<article>`): tag, share links, info penulis

### Kapan Jangan

- Jangan pakai `<footer>` untuk **section utama** — itu tugas `<main>` / `<article>` / `<section>`.

### Pola Kode

```html
<body>
  <header>...</header>
  <main>...</main>

  <footer>
    <p>&copy; 2026 Nama Kamu. Semua hak dilindungi.</p>
    <p>Kontak: <a href="mailto:email@example.com">email@example.com</a></p>
  </footer>
</body>
```

### Verifikasi

- [ ] `<footer>` ada di akhir `<body>` (sebelum `</body>`)
- [ ] Copyright menggunakan entitas `&copy;` (bukan karakter © langsung, supaya aman di semua encoding)
- [ ] Kontak berupa `<a href="mailto:...">` (klik langsung buka email client)

---

## Tabel Ringkasan: Kapan Pakai Tag Apa

| Kebutuhan | Tag yang Tepat | Catatan |
|---|---|---|
| Wadah halaman pembuka | `<header>` | Di awal `<body>` |
| Konten utama halaman | `<main>` | Tepat satu per halaman |
| Konten mandiri (artikel, post, produk) | `<article>` | Tes "berdiri sendiri" |
| Sub-bagian tematik | `<section>` | Wajib ada heading |
| Gambar + caption | `<figure>` + `<figcaption>` | `alt` wajib di `<img>` |
| Kutipan panjang | `<blockquote>` | Tambahkan `<cite>` |
| Teks penting | `<strong>` | Bukan `<b>` |
| Teks dengan penekanan | `<em>` | Bukan `<i>` |
| Highlight / sorotan | `<mark>` | Untuk referensi |
| Tanggal | `<time datetime="...">` | Format ISO 8601 |
| Wadah halaman penutup | `<footer>` | Copyright, kontak |

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 03, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/), paste source code
- [ ] **Hanya ada SATU `<h1>`** — Ctrl+F "h1" di VS Code
- [ ] **Hanya ada SATU `<main>`** — Ctrl+F "main"
- [ ] **Heading hierarchy logis** — Inspect Element → "Outline" / "Headings"
- [ ] **Semua `<img>` punya `alt`** — tidak ada `alt=""` (kecuali dekoratif)
- [ ] **`<time>` punya `datetime`** dalam format ISO 8601
- [ ] **Browser menampilkan**:
  - Header dengan judul besar + tagline
  - Artikel dengan minimal 2 section (Pendahuluan, Penutup, dst)
  - Gambar dengan caption di bawahnya
  - Kutipan dengan indentasi berbeda
  - Footer dengan copyright + kontak

---

## Cara Submit

1. Buka `code/02-artikel-blog.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri (jangan copy-paste dari contoh)
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. Verifikasi dengan checklist di atas
6. Kalau PASS, lanjut ke `soal/03-tabel-jadwal.md`

---

## Catatan Penting

> **Semantic HTML bukan tentang tampilan, tapi tentang MAKNA.** Browser tanpa CSS akan menampilkan `<article>` persis sama dengan `<div>`. Tapi perbedaannya besar untuk: (1) screen reader, (2) Google, (3) RSS reader, (4) "reader mode" di browser.
>
> **Tag yang salah tidak langsung error.** Browser akan menampilkan apa pun — tapi mesin akan salah paham. Misal: pakai `<div>` untuk artikel → Google tidak tahu itu artikel → tidak muncul di Google News.
>
> **Kalau ragu, tanya: "Apa yang INI representasikan?"** Bukan "Apa yang ini terlihat seperti?". `<div>` = wadah netral. `<section>` = bab tematik. `<article>` = konten mandiri.
>
> **Indentasi (spasi di awal baris) bukan cuma biar rapi** — itu menunjukkan hierarki. Biasakan dari awal: tag di dalam tag di-indent lebih dalam.
>
> **HTML case-insensitive** (huruf besar/kecil sama), tapi standarnya pakai huruf kecil. Biasakan dari awal: tulis `<article>` bukan `<ARTICLE>`.

<!-- markdownlint-enable MD024 MD028 -->

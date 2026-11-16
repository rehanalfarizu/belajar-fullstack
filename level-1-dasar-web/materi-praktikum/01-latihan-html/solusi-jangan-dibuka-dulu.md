# Solusi — JANGAN DIBUKA DULU

Buka SETELAH punyamu jalan atau benar-benar buntu. Tulis dulu versimu sendiri, catat apa yang sudah kamu coba, baru bandingkan di sini. Membaca solusi sebelum mencoba tidak melatih apa-apa.

Tiap bagian diberi judul sesuai nama soal dan bagiannya, jadi gampang dicari dari penunjuk di file soal.

## 02 Artikel Blog dengan Semantic HTML — Bagian D: `<article>` vs `<section>` (BAGIAN PALING PENTING)

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


## 02 Artikel Blog dengan Semantic HTML — Bagian F: `<blockquote>` untuk Kutipan

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


## 03 Tabel Jadwal dengan HTML Table Semantik — Bagian B: `<table>` sebagai Wadah + `<thead>` untuk Header

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
      <th>Ruang</th>
      <th>Dosen</th>
    </tr>
  </thead>
</table>
```


## 03 Tabel Jadwal dengan HTML Table Semantik — Bagian C: `<tbody>` + `<tr>` + `<td>` untuk Data

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Senin</td>
      <td>08:00</td>
      <td>Algoritma</td>
    </tr>
    <tr>
      <td>Selasa</td>
      <td>10:00</td>
      <td>Basis Data</td>
    </tr>
    <!-- Tambah baris lain di sini -->
  </tbody>
</table>
```


## 03 Tabel Jadwal dengan HTML Table Semantik — Bagian D: `colspan` untuk Merge Kolom Horizontal

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
      <th>Ruang</th>
      <th>Dosen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Senin</td>
      <td>08:00</td>
      <td>Algoritma</td>
      <td>301</td>
      <td>Dr. Andi</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <!-- 1 sel ini mencakup 5 kolom -->
      <td colspan="5">Total: 1 mata kuliah (contoh minimal)</td>
    </tr>
  </tfoot>
</table>
```


## 03 Tabel Jadwal dengan HTML Table Semantik — Bagian E: `rowspan` untuk Merge Baris Vertikal

```html
<table>
  <thead>
    <tr>
      <th>Hari</th>
      <th>Jam</th>
      <th>Mata Kuliah</th>
      <th>Ruang</th>
    </tr>
  </thead>
  <tbody>
    <!-- Baris 1-2: Praktikum (rowspan=2) -->
    <tr>
      <td rowspan="2">Senin</td>
      <td>08:00</td>
      <td>Praktikum Algoritma</td>
      <td>Lab 1</td>
    </tr>
    <tr>
      <!-- Kolom "Hari" sudah di-cover rowspan di atas -->
      <td>10:00</td>
      <td>Praktikum Basis Data</td>
      <td>Lab 2</td>
    </tr>
  </tbody>
</table>
```


## 03 Tabel Jadwal dengan HTML Table Semantik — Bagian F: `<tfoot>` untuk Rekapitulasi

```html
<table>
  <thead>...</thead>
  <tbody>
    <!-- baris-baris data -->
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">Total: 10 mata kuliah, 18 SKS</td>
    </tr>
  </tfoot>
</table>
```


## 04 Form Pendaftaran dengan Input Standar — Bagian C: `<fieldset>` + `<legend>` untuk Mengelompokkan Field

```html
<form action="#" method="POST">
  <fieldset>
    <legend>Data Pribadi</legend>
    <!-- field nama, email, dll -->
  </fieldset>

  <fieldset>
    <legend>Informasi Tambahan</legend>
    <!-- field alamat, foto, dll -->
  </fieldset>
</form>
```


## 04 Form Pendaftaran dengan Input Standar — Bagian E: Input Types Standar

```html
<label for="nama">Nama Lengkap:</label>
<input type="text" id="nama" name="nama" required minlength="3">

<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="nama@email.com">

<label for="password">Password:</label>
<input type="password" id="password" name="password" minlength="8">

<label for="umur">Umur:</label>
<input type="number" id="umur" name="umur" min="17" max="65">

<label for="tgl_lahir">Tanggal Lahir:</label>
<input type="date" id="tgl_lahir" name="tgl_lahir">

<label for="telepon">Nomor Telepon:</label>
<input type="tel" id="telepon" name="telepon" placeholder="08xxxxxxxxxx">

<label for="website">Website/Portfolio:</label>
<input type="url" id="website" name="website" placeholder="https://...">

<label for="foto">Upload Foto:</label>
<input type="file" id="foto" name="foto" accept="image/*">

<label for="form_id">Form ID (tersembunyi):</label>
<input type="hidden" id="form_id" name="form_id" value="workshop-2026">
```


## 04 Form Pendaftaran dengan Input Standar — Bagian H: `radio` vs `checkbox` — Pilih 1 vs Pilih Banyak

```html
<!-- RADIO: pilih 1 dari 3 -->
<p>Jenis Kelamin:</p>
<input type="radio" id="jk_l" name="jenis_kelamin" value="L" required>
<label for="jk_l">Laki-laki</label>
<input type="radio" id="jk_p" name="jenis_kelamin" value="P">
<label for="jk_p">Perempuan</label>

<!-- CHECKBOX: pilih banyak dari 4 -->
<p>Hobi:</p>
<input type="checkbox" id="hobi_coding" name="hobi[]" value="coding">
<label for="hobi_coding">Coding</label>
<input type="checkbox" id="hobi_gaming" name="hobi[]" value="gaming">
<label for="hobi_gaming">Gaming</label>
<input type="checkbox" id="hobi_membaca" name="hobi[]" value="membaca">
<label for="hobi_membaca">Membaca</label>
<input type="checkbox" id="hobi_olahraga" name="hobi[]" value="olahraga">
<label for="hobi_olahraga">Olahraga</label>
```


## 05 Halaman Portfolio dengan Multimedia — Bagian B: `<header>` + `<nav>` dengan Anchor Links

```html
<header>
  <h1>Nama Kamu</h1>
  <p>Web Developer & Designer</p>
  <nav aria-label="Navigasi Portfolio">
    <a href="#tentang">Tentang</a>
    <a href="#proyek">Proyek</a>
    <a href="#video">Video</a>
    <a href="#audio">Audio</a>
    <a href="#kontak">Kontak</a>
  </nav>
</header>
```


## 05 Halaman Portfolio dengan Multimedia — Bagian D: Galeri `<figure>` + `<figcaption>` + `loading="lazy"`

```html
<section id="proyek">
  <h2>Proyek Saya</h2>

  <figure>
    <img src="https://picsum.photos/400/300?random=1"
         alt="Tampilan depan aplikasi e-commerce"
         width="400" height="300"
         loading="lazy"
         style="max-width: 100%;">
    <figcaption>Proyek 1: Aplikasi E-Commerce</figcaption>
  </figure>

  <figure>
    <img src="https://picsum.photos/400/300?random=2"
         alt="Desain UI aplikasi mobile kesehatan"
         width="400" height="300"
         loading="lazy"
         style="max-width: 100%;">
    <figcaption>Proyek 2: Aplikasi Mobile Kesehatan</figcaption>
  </figure>

  <figure>
    <img src="https://picsum.photos/400/300?random=3"
         alt="Dashboard sistem manajemen konten"
         width="400" height="300"
         loading="lazy"
         style="max-width: 100%;">
    <figcaption>Proyek 3: Sistem Manajemen Konten</figcaption>
  </figure>
</section>
```


## 05 Halaman Portfolio dengan Multimedia — Bagian E: Responsive Image dengan `srcset`

```html
<img
  src="gambar-medium.jpg"
  srcset="gambar-kecil.jpg 480w,
          gambar-medium.jpg 1024w,
          gambar-besar.jpg 1920w"
  sizes="(max-width: 600px) 480px,
         (max-width: 1200px) 1024px,
         1920px"
  alt="Foto pemandangan gunung"
  width="1920" height="1080">
```


## 05 Halaman Portfolio dengan Multimedia — Contoh Kode Lengkap dengan Penjelasan (Referensi)

```html
<!--
  ============================================================================
  CONTOH KODE JADI — Halaman Portfolio Multimedia
  ============================================================================
  File ini bukan untuk di-copy ke code/. Tujuannya: referensi baca.

  Setiap baris kode di bawah punya comment (<!-- ... -->) yang menjelaskan
  KEPUTUSAN TEKNIS: kenapa tag ini, kenapa atribut ini, trade-off-nya apa.
  Baca comment-nya, bukan cuma kodenya.

  Format comment:
  - KEPUTUSAN: ...     → kenapa pilihan ini diambil
  - PERHATIAN: ...     → jebakan / hal yang sering keliru
  - TRADE-OFF: ...     → ada alternatif, ini kelebihan & kekurangan
  ============================================================================
-->

<!DOCTYPE html>
<!-- KEPUTUSAN: <!DOCTYPE html> WAJIB baris pertama. Tanpa ini, browser
     masuk "quirks mode" (render pakai aturan IE lama) — styling bisa kacau. -->
<html lang="id">
<!-- KEPUTUSAN: lang="id" = bahasa Indonesia. Screen reader pakai ini
     untuk pilih suara & pelafalan yang sesuai. Wajib untuk aksesibilitas. -->
<head>
  <meta charset="UTF-8">
  <!-- PERHATIAN: charset HARUS di 102 karakter pertama, idealnya baris
       pertama <head>. Tanpa UTF-8, karakter seperti "é", "ñ", dan "ç" bisa
       tampil jadi karakter aneh (mojibake). -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- KEPUTUSAN: viewport meta = fondasi RESPONSIVE design.
       width=device-width = lebar halaman = lebar layar device (bukan 980px default)
       initial-scale=1.0 = zoom 100% saat pertama load.
       TANPA ini, halaman di HP akan di-zoom out 3x dan user harus pinch-zoom. -->

  <title>Portfolio — Muhammad Raihan Alfarizi | Web Developer</title>
  <!-- TRADE-OFF title:
       - Terlalu panjang (>60 char) → kepotong di Google search result
       - Terlalu pendek ("Portfolio") → tidak deskriptif
       Yang ideal: Nama + Profesi, max ~50-60 karakter. -->

  <meta name="description" content="Portfolio Muhammad Raihan Alfarizi, web developer. Proyek e-commerce, aplikasi mobile, dan sistem CMS.">
  <!-- KEPUTUSAN: description muncul di bawah judul di Google search.
       Max ~160 karakter. Wajib ada untuk SEO. -->

  <style>
    /* CSS minimal — fokus ke HTML dulu, CSS di LEVEL 2 */
    body { font-family: -apple-system, sans-serif; max-width: 1100px; margin: 0 auto; padding: 1.5rem; line-height: 1.6; }
    nav a { margin-right: 1rem; }
    figure { margin-bottom: 1.5rem; }
    img { max-width: 100%; height: auto; }  /* Responsive: gambar tidak overflow */
    iframe, video, audio { max-width: 100%; }
  </style>
</head>
<body>

  <!-- ============================================================================
       HEADER + NAVIGASI
       ============================================================================ -->
  <header>
    <!-- KEPUTUSAN: <header> di sini = header HALAMAN (bukan header artikel).
         Wadah untuk: judul situs + tagline + navigasi utama. -->

    <h1>Muhammad Raihan Alfarizi</h1>
    <p>Web Developer & Computer Science Student</p>
    <!-- PERHATIAN: Hanya SATU <h1> per halaman. Ini judul UTAMA.
         <h2>/<h3> di bawah = sub-bagian, BUKAN judul baru halaman. -->

    <nav aria-label="Navigasi utama portfolio">
      <!-- KEPUTUSAN: aria-label="..." = label untuk screen reader.
           Karena <nav> bisa lebih dari satu (misal: nav utama + nav footer),
           aria-label bedain: "Navigasi utama" vs "Navigasi footer". -->

      <a href="#tentang">Tentang</a>
      <a href="#proyek">Proyek</a>
      <a href="#video">Video</a>
      <a href="#audio">Audio</a>
      <a href="#kontak">Kontak</a>
      <!-- KEPUTUSAN: href="#id-section" = ANCHOR LINK, loncat ke section
           dengan id yang cocok. Tidak perlu JavaScript. -->
    </nav>
  </header>

  <main>
    <!-- KEPUTUSAN: <main> = konten UTAMA halaman. Hanya SATU per halaman.
         Bedanya dengan <body>: body = semua, main = yang utama saja. -->

    <!-- ============================================================================
         SECTION TENTANG + FOTO PROFIL
         ============================================================================ -->
    <section id="tentang">
      <h2>Tentang Saya</h2>
      <!-- PERHATIAN: id="tentang" HARUS cocok dengan href="#tentang" di nav.
           Salah ketik satu huruf = link tidak jalan (tidak loncat ke mana-mana). -->

      <img
        src="https://i.pravatar.cc/300?img=12"
        alt="Foto profil Muhammad Raihan Alfarizi, seorang web developer"
        width="300"
        height="300"
        loading="eager">
      <!-- KEPUTUSAN tiap atribut <img>:
           - src: URL gambar (https://i.pravatar.cc = avatar acaran untuk testing)
           - alt: HARUS DESKRIPTIF — sebutkan SIAPA + APA. "Foto profil X, seorang Y"
           - width/height: 300x300 = ukuran ASLI. Browser pakai ini untuk
             reservasi tempat SEBELUM gambar load = tidak ada layout shift.
           - loading="eager": DEFAULT, tapi ditulis eksplisit untuk foto PROFIL
             (yang di atas fold, harus langsung muncul, BUKAN lazy).
        -->

      <p>Saya adalah mahasiswa Computer Science semester 5 dengan passion di web development. Saya berpengalaman membangun aplikasi web menggunakan HTML, CSS, dan JavaScript.</p>
      <!-- KEPUTUSAN: paragraf bio. <p> otomatis punya margin atas/bawah dari browser. -->
    </section>

    <!-- ============================================================================
         GALERI PROYEK
         ============================================================================ -->
    <section id="proyek">
      <h2>Proyek Saya</h2>

      <figure>
        <img
          src="https://picsum.photos/400/300?random=1"
          alt="Tampilan depan aplikasi e-commerce dengan katalog produk"
          width="400"
          height="300"
          loading="lazy">
        <!-- KEPUTUSAN: loading="lazy" untuk gambar di BAWAH fold.
             Foto profil di atas = eager (langsung load).
             Gambar proyek di sini = lazy (load saat scroll mendekat).
             Hasil: halaman load 2-3x lebih cepat. -->

        <figcaption>Proyek 1: Aplikasi E-Commerce</figcaption>
        <!-- KEPUTUSAN: <figcaption> HARUS di dalam <figure>, bukan di luar.
             Wadah figure = gambar + caption yang "satu paket". -->
      </figure>

      <figure>
        <img
          src="https://picsum.photos/400/300?random=2"
          alt="Desain UI aplikasi mobile kesehatan dengan dashboard"
          width="400"
          height="300"
          loading="lazy">

        <figcaption>Proyek 2: Aplikasi Mobile Kesehatan</figcaption>
      </figure>

      <figure>
        <img
          src="https://picsum.photos/400/300?random=3"
          alt="Dashboard admin untuk sistem manajemen konten"
          width="400"
          height="300"
          loading="lazy">

        <figcaption>Proyek 3: Sistem Manajemen Konten</figcaption>
      </figure>

      <figure>
        <!-- CONTOH srcset untuk responsive image.
             Browser pilih otomatis: kecil (480w), sedang (800w), atau besar (1200w)
             berdasarkan ukuran layar + devicePixelRatio. -->
        <img
          src="https://picsum.photos/800/600?random=4"
          srcset="https://picsum.photos/480/360?random=4 480w,
                  https://picsum.photos/800/600?random=4 800w,
                  https://picsum.photos/1200/900?random=4 1200w"
          sizes="(max-width: 600px) 480px,
                 (max-width: 1200px) 800px,
                 1200px"
          alt="Hero image website travel dengan responsive sizing"
          width="1200"
          height="900"
          loading="lazy">
        <!-- PENJELASAN srcset + sizes:
             - srcset: daftar gambar + lebarnya. Browser download yang paling cocok.
             - sizes: "pada layout selebar ini, gambar akan tampil selebar ini"
             - TRADE-OFF: srcset butuh 3+ ukuran gambar = 3x storage di server.
               Untuk produksi, generate pakai tools (misal ImageMagick, sharp.js). -->

        <figcaption>Proyek 4: Website Travel (Responsive Image Demo)</figcaption>
      </figure>
    </section>

    <!-- ============================================================================
         VIDEO — YOUTUBE EMBED + VIDEO LOKAL
         ============================================================================ -->
    <section id="video">
      <h2>Video</h2>

      <h3>Presentasi Portfolio (YouTube)</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video presentasi portfolio Muhammad Raihan Alfarizi"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      <!-- KEPUTUSAN tiap atribut <iframe>:
           - src: HARUS URL /embed/, BUKAN /watch?v=
             Watch URL: https://www.youtube.com/watch?v=VIDEO_ID  → TIDAK jalan di iframe
             Embed URL: https://www.youtube.com/embed/VIDEO_ID   → jalan
           - title: WAJIB untuk a11y. Screen reader membacakan title ke tunanetra.
             Tanpa title = screen reader skip = user tidak tahu itu video apa.
           - allow="...": izin browser untuk fitur (autoplay, fullscreen, dll)
           - allowfullscreen: tombol fullscreen muncul di player YouTube
        -->

      <h3>Demo Project (Video Lokal)</h3>
      <video controls width="640" height="360">
        <!-- KEPUTUSAN: controls WAJIB. Tanpa controls, user tidak bisa play/pause
             (kecuali autoplay + muted, tapi ini UX buruk). -->

        <source src="demo-project.mp4" type="video/mp4">
        <source src="demo-project.webm" type="video/webm">
        <!-- KEPUTUSAN: 2 format untuk kompatibilitas.
             MP4 (H.264) = universal, semua browser support
             WebM = open source, lebih kecil, tapi Firefox/Edge only
             Browser akan coba MP4 dulu, fallback ke WebM. -->

        Browser Anda tidak mendukung tag video.
        <!-- Fallback text — muncul kalau browser tidak support video.
             Jarang terjadi di 2026, tapi best practice. -->
      </video>
    </section>

    <!-- ============================================================================
         AUDIO — PODCAST
         ============================================================================ -->
    <section id="audio">
      <h2>Audio</h2>

      <h3>Podcast: Perjalanan Belajar Web Development</h3>
      <audio controls>
        <!-- KEPUTUSAN: <audio> = pemutar audio tanpa visual.
             Mirip <video> tapi tanpa width/height (player biasanya compact). -->

        <source src="podcast.mp3" type="audio/mpeg">
        <source src="podcast.ogg" type="audio/ogg">
        <!-- KEPUTUSAN: MP3 paling universal, OGG untuk Firefox lawas. -->

        Browser tidak mendukung audio.
      </audio>
      <!-- PERHATIAN: Audio dengan autoplay = BAD UX. Selalu pakai controls
           atau set autoplay + muted + playsinline (untuk video di iOS). -->
    </section>

    <!-- ============================================================================
         KONTAK
         ============================================================================ -->
    <section id="kontak">
      <h2>Kontak</h2>
      <p>Email: <a href="mailto:muhammadraihanalfarizi@gmail.com">muhammadraihanalfarizi@gmail.com</a></p>
      <!-- KEPUTUSAN: mailto: = buka email client user (Outlook, Gmail, dst)
           dengan field "To" sudah terisi. -->

      <p>
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <!-- KEPUTUSAN: target="_blank" = buka di TAB BARU.
             rel="noopener noreferrer" = WAJIB untuk keamanan.
             Tanpa "noopener": halaman baru bisa akses window.opener (security hole).
             Tanpa "noreferrer": referrer header terkirim (privacy concern). -->

        <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Muhammad Raihan Alfarizi. Dibuat untuk latihan HTML.</p>
    <!-- KEPUTUSAN: &copy; = simbol © (entity HTML).
         Alternatif: tulis langsung © — tapi &copy; lebih aman untuk encoding lama. -->
  </footer>

</body>
</html>
```


## 06 Layout Artikel dengan Semantic HTML (2 Kolom) — Bagian B: Page-Level `<header>` + `<nav>`

```html
<header>
  <h1>TechBlog</h1>
  <p>Artikel tentang web development dan teknologi</p>
  <nav aria-label="Navigasi Utama">
    <ul>
      <li><a href="#">Beranda</a></li>
      <li><a href="#">Artikel</a></li>
      <li><a href="#">Tentang</a></li>
      <li><a href="#">Kontak</a></li>
    </ul>
  </nav>
</header>
```


## 06 Layout Artikel dengan Semantic HTML (2 Kolom) — Bagian D: `<article>` — Unit Konten Independen

```html
<article>
  <header>
    <h2>Judul Artikel</h2>
    <p>Oleh: <strong>Nama Penulis</strong> | <time datetime="2026-05-15">15 Mei 2026</time></p>
  </header>

  <section>
    <h3>Pendahuluan</h3>
    <p>Lead paragraph yang lebih besar...</p>
  </section>

  <section>
    <h3>Pembahasan</h3>
    <p>Isi pembahasan...</p>
  </section>

  <section>
    <h3>Penutup</h3>
    <p>Kesimpulan...</p>
  </section>

  <footer>
    <p>Tag: <a href="#">#web</a> <a href="#">#html</a></p>
  </footer>
</article>
```


## 06 Layout Artikel dengan Semantic HTML (2 Kolom) — Bagian E: Elemen-elemen Pendukung di dalam `<article>`

```html
<section>
  <h3>Pembahasan</h3>
  <p>Isi pembahasan...</p>

  <blockquote>
    <p>"Konten adalah raja. Pastikan artikelmu memberikan nilai tambah."</p>
    <cite>— John Doe, Pakar Konten Digital</cite>
  </blockquote>

  <figure>
    <img src="https://picsum.photos/800/400"
         alt="Ilustrasi pembahasan artikel"
         width="800" height="400"
         style="max-width: 100%;">
    <figcaption>Gambar 1: Ilustrasi konsep layout</figcaption>
  </figure>

  <ol>
    <li>Langkah pertama dalam membuat layout...</li>
    <li>Langkah kedua...</li>
    <li>Langkah ketiga...</li>
  </ol>
</section>
```


## 06 Layout Artikel dengan Semantic HTML (2 Kolom) — Bagian F: `<aside>` untuk Sidebar

```html
<aside>
  <h3>Tentang Penulis</h3>
  <img src="https://i.pravatar.cc/100?img=1"
       alt="Foto penulis Budi Santoso"
       width="100" height="100">
  <p>Budi Santoso adalah web developer dengan 5 tahun pengalaman...</p>

  <h3>Artikel Terkait</h3>
  <ul>
    <li><a href="#">Cara Membuat Layout Responsif</a></li>
    <li><a href="#">Memahami Semantic HTML</a></li>
    <li><a href="#">Tips SEO untuk Pemula</a></li>
  </ul>

  <h3>Kategori</h3>
  <p>
    <a href="#">#web</a>
    <a href="#">#html</a>
    <a href="#">#css</a>
  </p>
</aside>
```


## 07 Navigasi & Beragam Jenis Link — Bagian B: `<nav>` dengan Anchor Links ke Section

```html
<nav aria-label="Navigasi Utama">
  <ul>
    <li><a href="#hero">Beranda</a></li>
    <li><a href="#tentang">Tentang</a></li>
    <li><a href="#layanan">Layanan</a></li>
    <li><a href="#galeri">Galeri</a></li>
    <li><a href="#kontak">Kontak</a></li>
  </ul>
</nav>
```


## 07 Navigasi & Beragam Jenis Link — Bagian C: Section dengan `id` sebagai Target Anchor

```html
<section id="hero">
  <h1>Selamat Datang di Portfolio Saya</h1>
  <p>Web developer & designer yang passionate dalam membuat produk digital.</p>
  <a href="#kontak">Hubungi Saya</a>
</section>

<section id="tentang">
  <h2>Tentang Saya</h2>
  <!-- ... -->
</section>

<section id="layanan">
  <h2>Layanan</h2>
  <!-- ... -->
</section>

<section id="galeri">
  <h2>Galeri</h2>
  <!-- ... -->
</section>

<section id="kontak">
  <h2>Hubungi Saya</h2>
  <!-- ... -->
</section>
```


## 07 Navigasi & Beragam Jenis Link — Bagian E: `<dl>`, `<dt>`, `<dd>` untuk Info Terstruktur

```html
<section id="tentang">
  <h2>Tentang Saya</h2>

  <dl>
    <dt>Nama</dt>
    <dd>Budi Santoso</dd>

    <dt>Lokasi</dt>
    <dd>Yogyakarta, Indonesia</dd>

    <dt>Spesialisasi</dt>
    <dd>Web Development & UI/UX Design</dd>

    <dt>Pengalaman</dt>
    <dd>5 tahun di industri teknologi</dd>
  </dl>
</section>
```


## 07 Navigasi & Beragam Jenis Link — Bagian J: `<address>` untuk Info Kontak

```html
<section id="kontak">
  <h2>Hubungi Saya</h2>

  <address>
    <strong>Kantor:</strong><br>
    Jl. Contoh Alamat No. 123<br>
    Yogyakarta, Indonesia 55281
  </address>

  <p>Email: <a href="mailto:halo@nama.com">halo@nama.com</a></p>
  <p>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812-3456-7890</a></p>
  <p>Telepon: <a href="tel:+6281234567890">+62 812-3456-7890</a></p>
</section>
```


## 08 SEO Meta Tags & Accessibility (A11y) — Bagian B: Meta Tags SEO Standar

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Belajar Web Development dari Nol | Tutorial Gratis 2026</title>
  <meta name="description" content="Tutorial web development dari dasar. Belajar HTML, CSS, JavaScript, dan Node.js gratis untuk pemula dengan contoh praktis.">
  <meta name="keywords" content="web development, html, css, javascript, react, nodejs, tutorial">
  <meta name="author" content="Nama Penulis">
  <meta name="robots" content="index, follow">
</head>
```


## 08 SEO Meta Tags & Accessibility (A11y) — Bagian F: Skip-to-Content Link

### Blok 1

```html
<body>
  <!-- Skip link: pertama di body, tersembunyi sampai fokus -->
  <a href="#main-content" class="skip-link">Langsung ke Konten Utama</a>

  <header>
    <nav>...</nav>
  </header>

  <main id="main-content">
    <!-- konten -->
  </main>
</body>
```

### Blok 2

```html
<!-- Pakai inline style untuk contoh ini, di LEVEL 2 akan dipisah ke file CSS -->
<style>
  .skip-link {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  .skip-link:focus {
    top: 10px;
    left: 10px;
    background: #000;
    color: #fff;
    padding: 10px;
    z-index: 100;
  }
</style>
```


## 08 SEO Meta Tags & Accessibility (A11y) — Bagian H: Accessibility (A11y) — `aria-label`, `aria-describedby`, Semantic HTML

```html
<!-- Nav dengan aria-label (kalau > 1 nav) -->
<nav aria-label="Navigasi Utama">
  <ul>
    <li><a href="#tentang">Tentang</a></li>
    <li><a href="#kontak">Kontak</a></li>
  </ul>
</nav>

<!-- Input dengan label + aria-describedby -->
<label for="email">Email</label>
<input type="email" id="email" name="email"
       placeholder="nama@email.com"
       aria-describedby="email-hint" required>
<small id="email-hint">Kami tidak akan spam email kamu.</small>

<!-- Link deskriptif, BUKAN "klik di sini" -->
<a href="#artikel-lengkap">Baca artikel lengkap tentang CSS Grid</a>
<!-- ❌ BUKAN: <a href="#">klik di sini</a> -->
```


## 09 Form Lanjutan: HTML5 Input Types & Validasi Browser — Bagian E: Validation Attributes

```html
<!-- required -->
<input type="text" name="nama" required>

<!-- minlength (untuk text) -->
<input type="password" name="password" minlength="8">

<!-- min/max (untuk number) -->
<input type="number" name="usia" min="1" max="100" step="1">

<!-- min/max (untuk date) -->
<input type="date" name="tanggal_event" min="2026-01-01" max="2026-12-31">

<!-- pattern (regex) -->
<input type="tel" name="telepon" pattern="08[0-9]{8,11}" title="Nomor HP Indonesia">

<!-- min/max (untuk time) -->
<input type="time" name="jam_kerja" min="08:00" max="17:00">
```


## 10 Document Flow: Block vs Inline Elements — Bagian D: Demo Inline Elements dengan `<span>`

```html
<section>
  <h2>Demo: Inline Elements</h2>
  <p>Inline elements sebaris dan hanya sepanjang isinya:</p>

  <p>
    <span style="border: 2px solid blue; padding: 5px;">Inline 1</span>
    <span style="border: 2px solid blue; padding: 5px;">Inline 2</span>
    <span style="border: 2px solid blue; padding: 5px;">Inline 3</span>
  </p>
</section>
```


## 10 Document Flow: Block vs Inline Elements — Bagian E: Demo Mixed Content dalam `<p>`

```html
<section>
  <h2>Demo: Mixed Content dalam Paragraf</h2>

  <p>
    Ini teks biasa dalam paragraf.
    <strong>Teks bold (penting)</strong> dan
    <em>teks miring (penekanan)</em> dan
    <a href="#">hyperlink</a> dan
    <mark>highlight (perhatian)</mark> dan
    <code>code tag</code> semuanya
    <small>sebaris dalam paragraf yang sama</small>.
  </p>
</section>
```


## 10 Document Flow: Block vs Inline Elements — Bagian F: Header E-Commerce (Block Layout)

```html
<header style="border: 2px solid green; padding: 10px; margin: 5px;">
  <h1>TokoOnline</h1>

  <form>
    <input type="search" placeholder="Cari produk..." name="q">
    <button type="submit">Cari</button>
  </form>

  <a href="#">Cart (0)</a>
</header>
```


## 10 Document Flow: Block vs Inline Elements — Bagian H: Product Listing dengan `<article>` (Block)

```html
<main id="products">
  <h2>Produk Unggulan</h2>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=1"
         alt="Laptop untuk kerja dan gaming"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Laptop Pro 14"</h3>
    <p>Harga: <strong>Rp 15.000.000</strong></p>
    <p>Laptop ringan dengan performa tinggi, cocok untuk profesional.</p>
    <mark>Sale</mark>
    <button>Beli Sekarang</button>
  </article>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=2"
         alt="Headphone wireless dengan noise cancelling"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Headphone Wireless</h3>
    <p>Harga: <strong>Rp 2.500.000</strong></p>
    <p>Headphone bluetooth dengan active noise cancelling.</p>
    <mark>New</mark>
    <button>Beli Sekarang</button>
  </article>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=3"
         alt="Smartphone flagship dengan kamera 108MP"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Smartphone Flagship</h3>
    <p>Harga: <strong>Rp 12.000.000</strong></p>
    <p>Smartphone dengan kamera 108MP dan baterai tahan seharian.</p>
    <button>Beli Sekarang</button>
  </article>

  <article style="border: 2px solid purple; padding: 10px; margin: 5px;">
    <img src="https://picsum.photos/300/200?random=4"
         alt="Smartwatch dengan fitur kesehatan lengkap"
         width="300" height="200"
         style="max-width: 100%;">
    <h3>Smartwatch Sport</h3>
    <p>Harga: <strong>Rp 4.500.000</strong></p>
    <p>Smartwatch dengan heart rate monitor dan GPS.</p>
    <mark>Sale</mark>
    <button>Beli Sekarang</button>
  </article>
</main>
```


## 10 Document Flow: Block vs Inline Elements — Bagian I: Aside — Filter & Keranjang (Block di dalam Block)

```html
<aside style="border: 2px solid teal; padding: 10px; margin: 5px;">
  <h3>Filter Kategori</h3>
  <ul>
    <li>
      <label>
        <input type="checkbox" name="kategori" value="elektronik">
        Elektronik
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" name="kategori" value="fashion">
        Fashion
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox" name="kategori" value="makanan">
        Makanan
      </label>
    </li>
  </ul>

  <h3>Keranjang Belanja</h3>
  <ul>
    <li>Laptop Pro 14" - Rp 15.000.000</li>
    <li>Headphone Wireless - Rp 2.500.000</li>
  </ul>
  <p>Total: <strong>Rp 17.500.000</strong></p>
  <a href="#">Checkout</a>
</aside>
```


## 10 Document Flow: Block vs Inline Elements — Bagian J: Footer (Block)

```html
<footer style="border: 2px solid brown; padding: 10px; margin: 5px;">
  <h3>Tentang Kami</h3>
  <p>TokoOnline adalah marketplace terpercaya untuk produk elektronik, fashion, dan makanan.</p>

  <h3>Link Cepat</h3>
  <ul>
    <li><a href="#">Beranda</a></li>
    <li><a href="#">Produk</a></li>
    <li><a href="#">Bantuan</a></li>
  </ul>

  <h3>Kontak</h3>
  <address>
    Jl. Contoh Alamat No. 123<br>
    Yogyakarta, Indonesia 55281
  </address>

  <p>&copy; 2026 TokoOnline. All rights reserved.</p>
</footer>
```


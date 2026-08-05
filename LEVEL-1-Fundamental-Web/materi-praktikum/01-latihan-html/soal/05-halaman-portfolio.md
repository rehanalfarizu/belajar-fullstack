<!-- markdownlint-disable MD024 MD028 -->

# SOAL 05 — Halaman Portfolio dengan Multimedia

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menyisipkan **gambar** dengan `<img>` + `alt` + `loading="lazy"` + `srcset`
- Embed **video YouTube** dengan `<iframe>`
- Memutar **video lokal** dengan `<video>` + `<source>`
- Memutar **audio/musik** dengan `<audio>` + `<source>`
- Memahami **responsive image**: `srcset` untuk gambar yang menyesuaikan ukuran layar
- Membuat **galeri** dengan `<figure>` + `<figcaption>`

**Topik:** `<img>`, `<video>`, `<audio>`, `<iframe>`, `<figure>`, `<picture>`, `srcset`, `loading="lazy"`

**Referensi utama:**

- [MDN: `<img>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/img)
- [MDN: `<video>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/video)
- [MDN: `<audio>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/audio)
- [MDN: `<iframe>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/iframe)
- [MDN: Responsive images](https://developer.mozilla.org/id/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

### Overview Singkat Setiap Tag/Atribut (Baca Dulu Sebelum Mulai)

**`<img>`** — *Sisipkan gambar.* Ibarat **menggantung foto di dinding** — gambar statis, tidak bisa interaktif. Wajib `src` (URL gambar) + `alt` (deskripsi untuk tunanetra & SEO).

**`src` (atribut `<img>`)** — *URL gambar.* Bisa path relatif (`gambar/foto.jpg`) atau absolut (`https://i.pravatar.cc/300`).

**`alt` (atribut `<img>`)** — *Deskripsi gambar.* Wajib untuk aksesibilitas & SEO. Dituliskan ke tunanetra oleh screen reader. Kosongkan (`alt=""`) HANYA untuk gambar dekoratif (hiasan yang tidak ada info).

**`width` & `height` (atribut)** — *Ukuran gambar asli (pixel).* Browser pakai ini untuk **mencegah layout shift** saat gambar loading. CSS `max-width: 100%` untuk responsif.

**`loading="lazy"`** — *Tunda loading gambar sampai mendekati viewport.* Gambar di bawah fold (yang tidak langsung kelihatan) tidak di-load dulu — hemat bandwidth, halaman lebih cepat.

**`srcset` (atribut)** — *Daftar gambar dengan ukuran berbeda.* Browser pilih yang paling sesuai dengan ukuran layar user. `<img srcset="kecil.jpg 480w, besar.jpg 1024w">` = "kalau layar 480px, pakai kecil.jpg; kalau 1024px, pakai besar.jpg".

**`<figure>` + `<figcaption>`** — *Gambar + caption yang terikat.* (Sudah dibahas di soal 02) Bedanya di sini: dipakai untuk **galeri** (banyak figure berurutan).

**`<video>`** — *Putar video lokal.* Ibarat **VCD player** di web. Wadah, sumber video pakai `<source>` di dalam. Pakai `controls` untuk munculkan play/pause/volume.

**`<source>` (untuk `<video>`/`<audio>`)** — *Satu sumber file media.* Browser pilih yang didukung. Misal: MP4 + WebM + Ogg — browser pilih yang bisa diputar.

**`<audio>`** — *Putar audio/musik.* Mirip `<video>` tapi tanpa visual. Sama-sama butuh `controls` + `<source>`.

**`<iframe>`** — *Sisipkan halaman web lain ke halaman kita.* Ibarat **"lubang intip"** ke website lain. Paling sering dipakai untuk embed YouTube, Google Maps, dll.

**`title` (atribut `<iframe>`)** — *Judul untuk aksesibilitas.* Wajib untuk screen reader — user tunanetra tahu iframe itu apa isinya.

**`frameborder`, `allowfullscreen`** — *Atribut `<iframe>` lawas.* `frameborder="0"` (tanpa border), `allowfullscreen` (boleh fullscreen).

---

## Briefing

Bayangkan kamu seorang **freelance web developer** yang mau membuat **halaman portfolio** untuk menampilkan karya ke calon klien. Portfolio itu tidak hanya menampilkan **teks** — tapi juga **gambar** proyek, **video presentasi** portfolio di YouTube, dan **podcast** tentang teknologi. Semua multimedia itu harus bisa dibuka di browser tanpa software tambahan.

Yang akan kamu bangun: **halaman portfolio single-page** dengan navigasi, foto profil, galeri proyek (dengan optimasi loading), video presentasi, audio podcast, dan kontak.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Baca Kapan Pakai & Kapan Jangan** — supaya tidak salah pilih
3. **Lihat Yang Terjadi di Browser** — bayangkan output
4. **Ketik dari 0** di `code/05-halaman-portfolio.html`, cari `TODO(human)`, isi sendiri
5. **Verifikasi** dengan checklist per bagian

---

## Bagian A: Boilerplate + Judul Halaman

### Pola Kode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio — Nama Kamu</title>
  <meta name="description content="Portfolio pribadi dengan karya, video, dan podcast.">
</head>
<body>
  <!-- header + nav + section multimedia -->
</body>
</html>
```

### Verifikasi

- [ ] Boilerplate standar
- [ ] `<title>` dan `<meta description>` deskriptif

---

## Bagian B: `<header>` + `<nav>` dengan Anchor Links

### Penjelasan

`<header>` berisi **judul, tagline, dan navigasi** ke section di halaman. Navigasi pakai `<a href="#id-section">` untuk loncat ke section.

### Pola Kode

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

### Verifikasi

- [ ] `<header>` membungkus judul + tagline + nav
- [ ] `<nav aria-label="...">` (aria-label untuk screen reader)
- [ ] Tiap link ke section ada `id` di section tujuan

---

## Bagian C: `<img>` — Foto Profil + `alt` + Ukuran

### Penjelasan

`<img>` adalah **void element** (tidak butuh penutup). Wajib:
- `src` — URL/path gambar
- `alt` — deskripsi untuk tunanetra & SEO
- `width` + `height` — ukuran asli (cegah layout shift)

**Tentang `alt`:**
- **Deskriptif**: "Foto Budi Santoso, founder Startup X"
- **Dekoratif**: `alt=""` (kosong, artinya "abaikan" untuk screen reader)
- **Buruk**: `alt="gambar"`, `alt="foto1"`, `alt=""` untuk gambar informatif

### Kapan Pakai

- Setiap gambar yang punya **makna/informasi** → `alt` deskriptif
- Setiap gambar sebagai **konten utama** halaman

### Kapan Jangan

- Jangan `alt="image"` atau `alt="photo"` — itu **tidak informatif**
- Jangan lupa `alt` untuk gambar informatif (screen reader akan skip)
- Jangan `<img>` tanpa `src` — tidak ada yang ditampilkan

### Pola Kode

```html
<!-- Foto profil -->
<section id="tentang">
  <h2>Tentang Saya</h2>
  <img src="https://i.pravatar.cc/300?img=1"
       alt="Foto profil Budi Santoso, seorang web developer"
       width="300" height="300"
       style="max-width: 100%;">
  <p>Saya adalah web developer dengan 5 tahun pengalaman...</p>
</section>
```

### Yang Terjadi di Browser

- Gambar langsung tampil di tempat `<img>` berada
- `width` + `height` di HTML untuk **mencegah layout shift** (tempat gambar sudah dipesan sebelum gambar selesai load)
- `style="max-width: 100%"` agar gambar **tidak overflow** di HP (responsive)

### Verifikasi

- [ ] `<img>` punya `src` yang valid (URL/path benar)
- [ ] `<img>` punya `alt` **deskriptif** (bukan cuma "gambar" atau "foto")
- [ ] `<img>` punya `width` & `height` (mencegah layout shift)
- [ ] Gambar dekoratif (icon, pattern) pakai `alt=""` (opsional)

---

## Bagian D: Galeri `<figure>` + `<figcaption>` + `loading="lazy"`

### Penjelasan

`<figure>` untuk **unit gambar + caption**. `loading="lazy"` untuk **gambar di bawah fold** (yang tidak langsung kelihatan saat halaman dibuka).

**Kenapa `loading="lazy"` penting?**
- Tanpa `lazy`: browser load **semua** gambar sekaligus, padahal user belum scroll ke bawah
- Dengan `lazy`: browser load gambar **saat mendekati viewport** (saat user scroll ke dekat)
- Hasil: **halaman lebih cepat**, hemat bandwidth user

### Kapan Pakai `loading="lazy"`

- Gambar di **bawah fold** (galeri, footer)
- Gambar yang **banyak** di satu halaman
- Gambar yang **tidak langsung dibutuhkan** saat user buka halaman

### Kapan Jangan

- **Jangan** lazy-load **gambar pertama/utama** (foto profil, hero image) — itu harus langsung muncul
- **Jangan** lazy-load gambar di atas fold — malah bikin user lihat blank space

### Pola Kode

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

### Yang Terjadi di Browser

- Gambar **di atas** langsung muncul
- Gambar **di bawah** muncul saat user scroll mendekat (DevTools → Network → lihat gambar di-load bertahap)
- DevTools → Elements → lihat `loading="lazy"` di atribut img

### Verifikasi

- [ ] Minimal 3 `<figure>` untuk galeri
- [ ] Tiap `<img>` punya `alt` deskriptif
- [ ] Tiap `<img>` punya `width` + `height`
- [ ] Gambar di bawah fold punya `loading="lazy"`
- [ ] Tiap figure punya `<figcaption>` (caption)

---

## Bagian E: Responsive Image dengan `srcset`

### Penjelasan

`srcset` = **daftar gambar dengan ukuran berbeda**. Browser pilih yang paling sesuai dengan ukuran layar user, supaya tidak download gambar 2000px untuk layar 400px (hemat bandwidth).

**Analogi:** Bayangkan **restoran yang punya porsi S/M/L**. Tidak semua orang butuh porsi L. `srcset` = "pilih porsi yang sesuai dengan kondisi user".

### Pola Kode

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

**Penjelasan:**
- `src` = fallback kalau browser tidak support `srcset`
- `srcset` = daftar gambar + lebarnya (`480w` = lebar 480px)
- `sizes` = "pada ukuran layar berapa, gunakan gambar selebar ini"
- Browser pilih otomatis

### Kapan Pakai

- Gambar yang **muncul di ukuran layar berbeda** (HP kecil vs desktop besar)
- Gambar yang **detail halus** (foto, ilustrasi) — supaya tetap tajam di layar besar
- Galeri, hero image, banner

### Kapan Jangan

- Untuk **icon kecil** (pakai SVG atau icon font, lebih efisien)
- Untuk **gambar yang harus pixel-perfect** (misal chart, diagram) — biasanya cukup 1 ukuran

### Verifikasi

- [ ] Minimal 1 `<img>` dengan `srcset`
- [ ] `srcset` punya minimal 2 ukuran gambar
- [ ] `sizes` sesuai dengan layout
- [ ] `alt` tetap deskriptif

---

## Bagian F: `<video>` + `<source>` untuk Video Lokal

### Penjelasan

`<video>` memutar video yang **disimpan di server sendiri** (bukan YouTube). Butuh:
- `controls` — munculkan play/pause/volume
- `<source>` di dalam — minimal 1 file, idealnya beberapa format (browser pilih yang didukung)

### Kapan Pakai

- Video presentasi, tutorial, demo yang disimpan sendiri
- Konten eksklusif yang tidak ada di YouTube

### Kapan Jangan

- Untuk embed YouTube → pakai `<iframe>` (lihat Bagian G)
- Untuk video besar tanpa `controls` → user tidak bisa pause

### Pola Kode

```html
<video controls width="640" height="360">
  <source src="intro.mp4" type="video/mp4">
  <source src="intro.webm" type="video/webm">
  <!-- Fallback kalau browser tidak support video -->
  Browser tidak mendukung tag video.
</video>
```

**Penjelasan:**
- Browser akan coba putar `intro.mp4`. Kalau tidak support, coba `intro.webm`. Kalau dua-duanya tidak support, tampilkan teks "Browser tidak mendukung".
- Selalu sediakan **2-3 format** untuk kompatibilitas (MP4 paling universal, WebM untuk open source, Ogg untuk Firefox lawas).

### Yang Terjadi di Browser

- Video player muncul dengan kontrol play/pause/volume
- Klik play → video mulai
- Tanpa `controls` → video **tidak bisa di-interaksi** (kecuali autoplay + muted)

### Verifikasi

- [ ] `<video>` punya `controls`
- [ ] `<video>` punya minimal 1 `<source>` dengan `type` yang benar
- [ ] Ada fallback text (untuk browser lama)

---

## Bagian G: `<iframe>` untuk Embed YouTube

### Penjelasan

`<iframe>` = **"jendela" ke website lain**. Paling sering dipakai untuk embed YouTube, Google Maps, Vimeo, dll.

### Cara Mendapatkan URL Embed YouTube

1. Buka video YouTube
2. Klik "Share" di bawah video
3. Klik "Embed"
4. Copy URL dari atribut `src` di kode `<iframe>` yang diberikan
5. URL biasanya berbentuk: `https://www.youtube.com/embed/VIDEO_ID`

### Pola Kode

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Video presentasi portfolio saya"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

**Atribut penting:**
- `src` — URL embed (bukan URL video biasa)
- `width` / `height` — ukuran iframe
- `title` — **wajib** untuk aksesibilitas (screen reader membacakan title)
- `allowfullscreen` — boleh fullscreen

### Kapan Pakai

- Embed YouTube/Vimeo
- Embed Google Maps
- Embed konten orang lain yang memang boleh di-embed

### Kapan Jangan

- Untuk embed website lain **tanpa izin** (beberapa situs melarang iframe)
- Untuk embed YouTube **langsung** (pakai URL watch?v=, bukan embed/) — tidak akan play

### Yang Terjadi di Browser

- YouTube player muncul lengkap dengan play button
- Klik play → video YouTube mulai (data streaming dari YouTube, bukan dari server kita)
- Klik fullscreen → video memenuhi layar

### Verifikasi

- [ ] `<iframe>` punya `src` yang valid (URL embed, bukan URL watch)
- [ ] `<iframe>` punya `title` (wajib untuk a11y)
- [ ] `width` & `height` disetel (default 300×150 terlalu kecil)
- [ ] Ada `allowfullscreen` (opsional tapi UX lebih baik)

---

## Bagian H: `<audio>` + `<source>` untuk Audio/Musik

### Penjelasan

`<audio>` = **pemutar audio** di web. Mirip `<video>` tapi tanpa visual. Pakai untuk podcast, musik, voice note, dll.

### Pola Kode

```html
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  Browser tidak mendukung audio.
</audio>
```

### Yang Terjadi di Browser

- Audio player muncul (biasanya compact, dengan play/pause/volume)
- Tergantung browser, bisa ada **progress bar** dan **download button**

### Verifikasi

- [ ] `<audio>` punya `controls`
- [ ] `<audio>` punya minimal 1 `<source>` dengan `type` yang benar
- [ ] Ada fallback text

---

## Bagian I: Footer dengan Kontak

### Pola Kode

```html
<footer>
  <p>&copy; 2026 Nama Kamu</p>
  <p>Hubungi saya: <a href="mailto:email@domain.com">email@domain.com</a></p>
  <p>
    <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">GitHub</a> |
    <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </p>
</footer>
```

### Verifikasi

- [ ] `<footer>` di akhir body
- [ ] Copyright pakai `&copy;`
- [ ] Email pakai `<a href="mailto:...">`
- [ ] Link eksternal pakai `target="_blank" rel="noopener noreferrer"`

---

## Tabel Ringkasan

| Kebutuhan | Tag/Atribut | Catatan |
|---|---|---|
| Gambar | `<img src alt>` | alt wajib deskriptif |
| Ukuran gambar | `width`, `height` | Cegah layout shift |
| Lazy loading | `loading="lazy"` | Untuk gambar di bawah fold |
| Responsive image | `srcset`, `sizes` | Browser pilih sesuai layar |
| Video lokal | `<video controls>` + `<source>` | 2-3 format ideal |
| Audio | `<audio controls>` + `<source>` | Mirip video |
| Embed YouTube | `<iframe>` | URL embed, bukan watch |
| Galeri | `<figure>` + `<figcaption>` | Tiap gambar + caption |

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **Semua `<img>` punya `alt`** — tidak ada `alt=""` kecuali dekoratif
- [ ] **Tidak ada `alt="gambar"` / `alt="foto"`** — harus deskriptif
- [ ] **Gambar di bawah fold punya `loading="lazy"`**
- [ ] **Video lokal & audio punya `controls`**
- [ ] **`<iframe>` punya `title`**
- [ ] **YouTube URL embed** (bukan watch URL)
- [ ] **Inspect Element (F12) → Network** → lihat gambar di-load bertahap (lazy)
- [ ] **Cek DevTools → toggle device toolbar** → lihat responsive image (`srcset`) ganti sesuai lebar

---

## Contoh Kode Lengkap dengan Penjelasan (Referensi)

> **Tujuan section ini**: Memberikan kamu **kode jadi utuh** yang setiap barisnya punya **comment inline** menjelaskan **kenapa** keputusan itu diambil. Baca comment-nya — itu yang paling valuable.
>
> **Cara pakai**:
> 1. **Jangan copy-paste** kode ini ke `code/05-halaman-portfolio.html` — itu pelanggaran aturan "ketik dari 0"
> 2. **Baca** sebagai referensi: pahami kenapa setiap tag/atribut dipilih
> 3. Setelah paham, **tutup file ini** dan ketik versi kamu sendiri dari memori
> 4. Bandingkan dengan versi kamu di akhir — apa yang sama, apa yang beda?

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

### Apa yang Bisa Dipelajari dari Comment di Atas?

| Tag/Atribut | Keputusan Kunci yang Dipelajari |
|---|---|
| `<!DOCTYPE html>` | Baris pertama WAJIB, agar tidak masuk quirks mode |
| `lang="id"` | Penting untuk screen reader pilih pelafalan |
| `meta viewport` | Fondasi responsive — tanpa ini, HP zoom out 3x |
| `<img alt>` | HARUS deskriptif (siapa + apa), bukan "gambar" |
| `<img width/height>` | Cegah layout shift, BUKAN cuma untuk styling |
| `loading="eager"` vs `"lazy"` | Eager = hero (langsung), Lazy = di bawah fold |
| `srcset` + `sizes` | Browser pilih gambar sesuai layar (hemat bandwidth) |
| `<iframe src>` | HARUS URL `/embed/`, BUKAN `/watch?v=` |
| `<iframe title>` | WAJIB untuk a11y, screen reader skip tanpa ini |
| `<video controls>` | Tanpa controls = user tidak bisa play |
| `<source type>` | Browser pilih format yang didukung (MP4 → WebM fallback) |
| `target="_blank" rel="noopener noreferrer"` | Keamanan, bukan opsional |

---



1. Buka `code/05-halaman-portfolio.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save, buka di browser
4. Test: scroll ke bawah → lihat gambar lazy-load di DevTools Network
5. Test: resize browser → lihat gambar responsif (`srcset`)
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/06-layout-artikel.md`

---

## Catatan Penting

> **`alt` adalah WAJIB** untuk gambar informatif. Tidak ada `alt` = screen reader skip = tunanetra tidak tahu itu gambar apa. SEO juga ikut turun.
>
> **`width` + `height` di `<img>`** bukan opsional. Tanpa itu, layout akan **loncat** saat gambar selesai load. CSS `width: 100%` boleh, tapi HTML `width`/`height` tetap wajib untuk reservasi tempat.
>
> **`loading="lazy"` untuk gambar di BAWAH fold.** Gambar pertama/hero JANGAN lazy, harus langsung muncul. User tidak mau lihat blank space di atas.
>
> **Embed YouTube pakai URL `/embed/`, bukan `/watch?v=`.** URL `/watch?v=ID` cuma untuk ditonton di YouTube, tidak akan play di iframe.
>
> **`<iframe>` selalu butuh `title`** untuk aksesibilitas. Tanpa title, screen reader skip dan user tidak tahu itu video YouTube atau apa.

<!-- markdownlint-enable MD024 MD028 -->

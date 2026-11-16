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
  <meta name="description" content="Portfolio pribadi dengan karya, video, dan podcast.">
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

> **Tulis versimu dulu.** Belum ketemu? Coba dari penjelasan dan "Wajib Ada di Kode Kamu" di atas. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Halaman Portfolio dengan Multimedia — Bagian B: `<header>` + `<nav>` dengan Anchor Links".
>
> Pertanyaan pemandu: elemen semantik mana yang paling pas untuk tiap bagian, dan atribut apa yang wajib ada? Cek di MDN, lalu bandingkan dengan hasil Inspect Element di browser.

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

> **Tulis versimu dulu.** Belum ketemu? Coba dari penjelasan dan "Wajib Ada di Kode Kamu" di atas. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Halaman Portfolio dengan Multimedia — Bagian D: Galeri `<figure>` + `<figcaption>` + `loading="lazy"`".
>
> Pertanyaan pemandu: elemen semantik mana yang paling pas untuk tiap bagian, dan atribut apa yang wajib ada? Cek di MDN, lalu bandingkan dengan hasil Inspect Element di browser.

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

> **Tulis versimu dulu.** Belum ketemu? Coba dari penjelasan dan "Wajib Ada di Kode Kamu" di atas. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Halaman Portfolio dengan Multimedia — Bagian E: Responsive Image dengan `srcset`".
>
> Pertanyaan pemandu: elemen semantik mana yang paling pas untuk tiap bagian, dan atribut apa yang wajib ada? Cek di MDN, lalu bandingkan dengan hasil Inspect Element di browser.

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

> **Tujuan section ini**: Halaman portfolio jadi lengkap dengan **comment inline** yang menjelaskan **kenapa** tiap keputusan diambil, dan itu ada di file solusi. Jangan dibuka dulu.
>
> **Cara pakai**:
> 1. Kerjakan dulu `code/05-halaman-portfolio.html` dengan versimu sendiri sampai checklist di atas centang semua
> 2. Kalau benar-benar buntu, buka [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "05 Halaman Portfolio dengan Multimedia — Contoh Kode Lengkap dengan Penjelasan (Referensi)"
> 3. **Jangan copy-paste** ke `code/`; baca comment-nya, tutup file, lalu ketik ulang dari memori
> 4. Bandingkan dengan versimu: apa yang sama, apa yang beda?
>
> Pertanyaan pemandu sebelum buka: untuk tiap elemen di halamanmu, kenapa tag dan atribut itu yang kamu pilih, bukan yang lain?

### Apa yang Bisa Dipelajari dari Comment di Solusi?

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

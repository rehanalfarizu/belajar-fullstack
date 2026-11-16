<!-- markdownlint-disable MD024 MD028 -->

# SOAL 07 — Navigasi & Beragam Jenis Link

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat **navigasi utama** dengan `<nav>` + `<ul>` + `<a>`
- Menggunakan **anchor link** (`href="#id"`) untuk navigasi internal halaman
- Membuat **section dengan `id`** sebagai target anchor
- Membedakan **berbagai jenis link**: anchor internal, eksternal, email, telepon, WhatsApp
- Memahami pentingnya `target="_blank" rel="noopener noreferrer"` untuk keamanan
- Menggunakan `<address>` untuk info kontak

**Topik:** `<nav>`, `<a>`, `href="#id"`, `mailto:`, `tel:`, `https://wa.me/`, `target="_blank"`, `rel="noopener noreferrer"`

**Referensi utama:**

- [MDN: `<a>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/a)
- [MDN: Fragment identifiers (anchor links)](https://developer.mozilla.org/id/docs/Web/HTML/Element/a#linking_to_an_element_on_the_same_page)
- [MDN: Link types (`rel`)](https://developer.mozilla.org/id/docs/Web/HTML/Link_types)
- [MDN: `<address>`](https://developer.mozilla.org/id/docs/Web/HTML/Element/address)

**Difficulty:** Menengah • **Estimasi:** 45-60 menit

---

### Overview Singkat Setiap Tag/Atribut (Baca Dulu Sebelum Mulai)

**`<a>`** — *Anchor / hyperlink.* Ibarat **"pintu"** di web — klik, buka halaman lain atau loncat ke section. Wajib `href` (tujuan). Konten `<a>` boleh teks atau gambar.

**`href` (atribut)** — *URL tujuan link.* Bisa:
- **Path relatif**: `tentang.html`, `/artikel/halo`
- **URL absolut**: `https://google.com`
- **Anchor internal**: `#hero`, `#about` (loncat ke element dengan `id` yang cocok)
- **Email**: `mailto:nama@email.com` (buka email client)
- **Telepon**: `tel:+6281234567890` (langsung dial di HP)
- **WhatsApp**: `https://wa.me/6281234567890` (buka chat WA)
- **Placeholder**: `#` (link yang belum jadi, jangan dipakai di production)

**`target` (atribut)** — *Di mana link dibuka.* `_self` (default, tab sama) atau `_blank` (tab baru). Pakai `_blank` untuk **link eksternal** (supaya user tidak kehilangan halaman kita).

**`rel` (atribut)** — *Hubungan link ke tujuan.* Paling penting: `noopener` dan `noreferrer` (keamanan, wajib saat `target="_blank"`).

**`noopener` (rel)** — *Cegah halaman baru akses `window.opener`.* Tanpa noopener, tab baru bisa pakai JavaScript untuk **redirect halaman asal** (security risk).

**`noreferrer` (rel)** — *Jangan kirim referrer info.* Tambahan privasi: halaman tujuan tidak tahu user datang dari mana.

**`<nav>`** — *Blok navigasi.* (Sudah dibahas di soal 06.) Wadah untuk menu.

**`<address>`** — *Info kontak.* Tag semantic untuk **alamat fisik, email, telepon** penulis/organisasi. Default styling: italic.

**`id` (atribut)** — *Identifier unik untuk element.* Dipakai untuk **anchor target** (link `#id` loncat ke element dengan `id` itu).

---

## Briefing

Bayangkan kamu membuat **landing page single-page** untuk **portofolio pribadi**. Pengunjung harus bisa: (1) **navigasi smooth** ke tiap section dari menu atas, (2) **kontak langsung** lewat email/telepon/WhatsApp dengan sekali klik, (3) **buka GitHub/LinkedIn kamu** di tab baru tanpa kehilangan halaman portfolio.

Yang akan kamu bangun: navigasi lengkap di atas + 5 section (Hero, About, Services, Gallery, Contact) + link khusus untuk kontak.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Baca Kapan Pakai & Kapan Jangan** — supaya tidak salah pilih
3. **Lihat Yang Terjadi di Browser** — bayangkan output
4. **Ketik dari 0** di `code/07-navigasi-dropdown.html`, cari `TODO(human)`, isi sendiri
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
  <title>Portfolio Landing Page</title>
  <meta name="description" content="Landing page portfolio dengan navigasi anchor.">
</head>
<body>
  <!-- nav + sections + footer -->
</body>
</html>
```

### Verifikasi

- [ ] Boilerplate standar
- [ ] `<title>` deskriptif

---

## Bagian B: `<nav>` dengan Anchor Links ke Section

### Penjelasan

`<nav>` = **menu navigasi** di atas halaman. Isinya `<ul>` + `<li>` + `<a>`. `href` ke anchor `#id-section` (loncat ke element dengan `id` cocok).

**Analogi:** Bayangkan **daftar isi** di awal buku. Klik "Bab 1" → loncat ke halaman bab 1. `<nav>` di web = daftar isi interaktif.

### Kapan Pakai

- Menu utama website (horizontal di atas)
- Daftar isi halaman panjang (Daftar Isi = nav)
- Pagination / breadcrumb

### Kapan Jangan

- Untuk **satu link** saja (pakai `<a>` di tempatnya)
- Untuk **footer link** yang panjang (pakai `<ul>` biasa, tidak perlu `<nav>`)

### Pola Kode

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

### Yang Terjadi di Browser

- Klik link → browser scroll ke element dengan `id` cocok
- Browser modern **smooth-scroll** otomatis
- URL berubah jadi `halaman.html#hero` (bisa di-share, **deep link**)
- Refresh halaman dengan `#id` di URL → browser auto-scroll ke element itu

### Verifikasi

- [ ] `<nav aria-label="...">` (aria-label bedakan nav dari nav lain)
- [ ] Tiap link `href="#..."` cocok dengan `id` di section tujuan
- [ ] Pakai `<ul>` + `<li>` + `<a>` (bukan `<div>` atau `<button>`)
- [ ] Minimal 4 link internal

---

## Bagian C: Section dengan `id` sebagai Target Anchor

### Penjelasan

Tiap section yang dituju link harus punya `id` **unik**. `id` adalah **identifier global** di halaman — tidak boleh duplikat.

### Kapan Pakai

- Target untuk anchor link
- Target untuk skip link (akan dibahas di soal 08)
- Identifier untuk JS atau CSS nanti

### Kapan Jangan

- Jangan duplikat `id` di halaman
- Jangan `id` dengan **spasi** (pakai `-` atau `_`)
- Jangan `id` yang **diawali angka** (browser lama error)

### Pola Kode

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

### Yang Terjadi di Browser

- Klik link "Tentang" di nav → scroll ke `<section id="tentang">`
- Tiap `<section>` punya `<h1>`/`<h2>` pertama sebagai judul
- `id` **tidak kelihatan** di visual — cuma penanda

### Verifikasi

- [ ] Tiap section punya `id` unik
- [ ] `id` cocok dengan `href="#..."` di nav
- [ ] Tidak ada `id` duplikat
- [ ] `id` tidak ada spasi (pakai `-` atau `_`)

---

## Bagian D: Hero Section dengan CTA

### Penjelasan

Hero section = **bagian pertama** yang dilihat user. Berisi judul besar, tagline, dan **CTA (Call-to-Action)** — biasanya tombol/link yang menggiring user ke action.

### Pola Kode

```html
<section id="hero">
  <h1>Jasa Web Development Profesional</h1>
  <p>Saya membuat website modern, cepat, dan responsif untuk bisnis Anda.</p>
  <a href="#kontak" role="button">Hubungi Saya</a>
</section>
```

### Verifikasi

- [ ] Section `id="hero"` jadi target nav
- [ ] `<h1>` besar
- [ ] CTA link (`<a>`) mengarah ke section kontak
- [ ] Tagline `<p>` jelas dan menarik

---

## Bagian E: `<dl>`, `<dt>`, `<dd>` untuk Info Terstruktur

### Penjelasan

`<dl>` = **description list** (daftar definisi). `<dt>` = **term/istilah** (kunci). `<dd>` = **definisi/nilai** (penjelasan).

**Analogi:** Bayangkan **kamus mini**: "HTML: bahasa markup", "CSS: bahasa styling", "JS: bahasa pemrograman". `<dl>` = daftar, `<dt>` = kata, `<dd>` = artinya.

### Kapan Pakai

- Info terstruktur berpasangan (Nama: Budi, Lokasi: Yogya, Profesi: Developer)
- FAQ (Pertanyaan: ..., Jawaban: ...)
- Metadata

### Kapan Jangan

- Untuk **data tabel** yang kompleks (pakai `<table>`)
- Untuk **list biasa** (pakai `<ul>`/`<ol>`)

### Pola Kode

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

### Verifikasi

- [ ] `<dl>` berisi beberapa `<dt>` + `<dd>`
- [ ] Tiap `<dt>` punya `<dd>` pasangannya
- [ ] Default styling: `<dt>` **bold** (atau sesuai browser), `<dd>` **margin-left**

---

## Bagian F: Link Eksternal dengan `target="_blank" rel="noopener noreferrer"`

### Penjelasan

Saat link ke **website lain** (GitHub, LinkedIn, Twitter), buka di **tab baru** supaya user tidak kehilangan halaman kita. Tapi `target="_blank"` tanpa `rel` = **security risk**. Wajib tambahkan `rel="noopener noreferrer"`.

### Kapan Pakai

- Link ke **website lain** (external)
- Link ke **media sosial** (GitHub, LinkedIn, Twitter, Instagram)
- Link ke **artikel referensi** (di tab baru, biar user bisa baca kedua)

### Kapan Jangan

- Untuk **link internal** (jangan pakai `_blank` — user bingung dengan banyak tab)
- Untuk **anchor link** (`#id`)

### Kapan `noopener` Wajib

- **SELALU** saat `target="_blank"`. Tanpa noopener, halaman baru bisa pakai `window.opener` untuk redirect halaman kita. **Security issue.**

### Kapan `noreferrer` Wajib

- Saat tidak ingin halaman tujuan **tahu referrer** (user datang dari mana). Default aman: pakai `noreferrer`.

### Pola Kode

```html
<a href="https://github.com/username"
   target="_blank"
   rel="noopener noreferrer">
   GitHub
</a>
```

**Penulisan singkat yang ekuivalen (HTML5):**
```html
<a href="https://github.com/username" target="_blank" rel="noopener noreferrer">GitHub</a>
```

### Yang Terjadi di Browser

- Klik → buka di **tab baru**
- `noopener` mencegah tab baru akses `window.opener`
- `noreferrer` tidak kirim referrer header
- Browser tampilkan icon "open in new tab" (di samping link) — UX indicator

### Verifikasi

- [ ] Link eksternal punya `target="_blank"`
- [ ] Link eksternal punya `rel="noopener noreferrer"` (WAJIB)
- [ ] Tidak duplikat `rel` (tulis `noopener noreferrer` sekali, dipisah spasi)

---

## Bagian G: Link Email — `mailto:`

### Penjelasan

`mailto:` adalah **scheme** URL yang memicu **email client** (Gmail, Outlook, Mail) untuk membuka jendela "kirim email baru" dengan tujuan sudah terisi.

### Pola Kode

```html
<a href="mailto:nama@email.com">Kirim Email</a>

<!-- Dengan subject otomatis -->
<a href="mailto:nama@email.com?subject=Halo%20dari%20website">Kirim Email</a>
```

### Yang Terjadi di Browser

- Klik → buka email client default user
- Kalau belum setting email client → tidak terjadi apa-apa (atau muncul error)
- Tergantung OS: di HP langsung buka app email, di desktop buka Outlook/Thunderbird/Gmail web

### Kapan Pakai

- Link "Hubungi via email" di halaman kontak
- Link "Email saya" di footer

### Kapan Jangan

- Untuk **form kontak** (pakai `<form>` dengan input type="email")
- Kalau tidak yakin user punya email client (terutama di HP)

### Verifikasi

- [ ] Minimal 1 `<a href="mailto:...">`
- [ ] Email valid di href
- [ ] Tidak lupa `:` setelah `mailto`

---

## Bagian H: Link Telepon — `tel:`

### Penjelasan

`tel:` adalah **scheme** URL yang memicu **dialer** (aplikasi telepon) untuk langsung menghubungi nomor.

### Pola Kode

```html
<a href="tel:+6281234567890">+62 812-3456-7890</a>
```

**Format internasional:** `+[kode negara][nomor]` (tanpa spasi/strip di href).

### Yang Terjadi di Browser

- Di HP: langsung buka dialer dengan nomor terisi
- Di desktop: buka Skype/FaceTime/Google Voice (kalau terinstall), atau tidak terjadi apa-apa
- Format harus `+` + kode negara, supaya bisa dihubungi dari mana saja

### Kapan Pakai

- Link "Hubungi via telepon" di halaman kontak
- Header bisnis lokal (warung, klinik, dll)

### Kapan Jangan

- Untuk **nomor yang tidak boleh dipanggil** otomatis (misal 112, 911 — Emergency)
- Untuk **nomor faks** (pakai `fax:` — deprecated, lebih baik pakai teks)

### Verifikasi

- [ ] Minimal 1 `<a href="tel:...">`
- [ ] Pakai format `+` + kode negara
- [ ] Tampilan teks boleh pakai spasi/strip (untuk readability), tapi href tetap tanpa spasi

---

## Bagian I: Link WhatsApp — `https://wa.me/`

### Penjelasan

`https://wa.me/6281234567890` adalah URL WhatsApp resmi untuk **langsung buka chat** dengan nomor tertentu. Tidak perlu install WhatsApp Business API.

### Pola Kode

```html
<a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
  Chat via WhatsApp
</a>

<!-- Dengan pesan otomatis -->
<a href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20jasa%20Anda"
   target="_blank" rel="noopener noreferrer">
  Chat via WhatsApp
</a>
```

### Yang Terjadi di Browser

- Klik → buka **app WhatsApp** (di HP) atau **WhatsApp Web** (di desktop)
- Chat baru dengan nomor terisi
- Pakai `?text=...` → pesan otomatis terisi

### Kapan Pakai

- Link "Chat WhatsApp" di halaman kontak (paling umum di Indonesia)
- Link WhatsApp di social media section

### Kapan Jangan

- Untuk **grup WhatsApp** (pakai link invite grup, beda format)
- Untuk **broadcast** (pakai WhatsApp Business)

### Verifikasi

- [ ] Minimal 1 `<a href="https://wa.me/...">`
- [ ] Pakai kode negara tanpa `+` (contoh: `62812...`, bukan `+62812...`)
- [ ] Pakai `target="_blank" rel="noopener noreferrer"` (external link)

---

## Bagian J: `<address>` untuk Info Kontak

### Penjelasan

`<address>` = tag semantic untuk **info kontak**: alamat fisik, email, telepon, nama organisasi. Default styling: **italic** (di kebanyakan browser).

### Kapan Pakai

- Alamat fisik di footer/kontak
- Info kontak penulis artikel
- Info kontak perusahaan

### Kapan Jangan

- Untuk **alamat IP** (pakai `<code>`)
- Untuk **link navigasi** ke halaman lain (pakai `<a>`)

### Pola Kode

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

### Verifikasi

- [ ] `<address>` untuk **alamat fisik** saja
- [ ] Email/telepon/WhatsApp pakai `<a>` di luar `<address>` (atau di dalam, tergantung style)
- [ ] Default styling italic (bisa di-override dengan CSS nanti)

---

## Bagian K: Link "Kembali ke Atas"

### Penjelasan

`<a href="#">` = link ke **top of page** (anchor kosong = top). Untuk link "Kembali ke Atas" / "Back to Top".

### Pola Kode

```html
<a href="#">↑ Kembali ke Atas</a>
```

### Kapan Pakai

- Footer halaman panjang (UX enhancement)
- Sidebar dengan banyak section

### Kapan Jangan

- Untuk **link yang belum jadi** (jangan pakai `href="#"` untuk placeholder — itu beda dengan "back to top"). Placeholder yang benar: `<a>` tanpa `href`, atau `href="javascript:void(0)"` (tapi itu anti-pattern)

### Verifikasi

- [ ] Link "Kembali ke Atas" di footer
- [ ] Pakai `href="#"` (kosong = top of page)

---

## Tabel Ringkasan

| Jenis Link | `href` Contoh | Hasil Klik |
|---|---|---|
| Anchor internal | `#hero` | Scroll ke element `id="hero"` |
| Path relatif | `tentang.html` | Buka file `tentang.html` |
| URL absolut | `https://google.com` | Buka Google (tab sama) |
| External di tab baru | `https://github.com` + `target="_blank"` | Buka GitHub (tab baru) |
| Email | `mailto:nama@email.com` | Buka email client |
| Telepon | `tel:+6281234567890` | Buka dialer (HP) |
| WhatsApp | `https://wa.me/6281234567890` | Buka chat WA |
| Kembali ke atas | `#` | Scroll ke top |
| Definisi list | `<dl>`, `<dt>`, `<dd>` | Pasangan term-definition |

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] **W3C Validator PASS** — [validator.w3.org](https://validator.w3.org/)
- [ ] **Klik tiap link navigasi** → scroll ke section yang dituju
- [ ] **URL berubah** jadi `#id-section` setelah klik
- [ ] **Refresh halaman** dengan `#id` di URL → scroll otomatis ke element itu
- [ ] **Klik link GitHub** → buka di tab baru, halaman asal tidak hilang
- [ ] **Klik `mailto:`** → email client terbuka (atau coba di HP)
- [ ] **Klik `tel:`** → dialer terbuka (di HP)
- [ ] **Klik `wa.me`** → WhatsApp terbuka
- [ ] **Inspect Element: tiap `target="_blank"` punya `rel="noopener noreferrer"`**
- [ ] **Inspect Element: id unik, tidak ada duplikat**

---

## Cara Submit

1. Buka `code/07-navigasi-dropdown.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save, buka di browser
4. **Test tiap link navigasi** (klik, lihat URL, scroll)
5. **Test di HP** (kalau bisa) — `tel:` dan `wa.me` paling kerasa di HP
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/08-seo-accessibility.md`

---

## Catatan Penting

> **`target="_blank"` WAJIB `rel="noopener noreferrer"`.** Ini bukan best practice, ini **keamanan wajib**. Tanpa noopener, halaman baru bisa pakai JavaScript untuk `window.opener.location = "phishing.com"` dan mengarahkan user ke situs palsu.
>
> **Format telepon di `href` SELALU pakai `+kode_negara` (tanpa spasi).** Teks yang ditampilkan boleh pakai spasi/strip, tapi href harus clean. Misal: `href="tel:+62812..."` tapi teks "+62 812-..."
>
> **`wa.me` tanpa `+` di kode negara.** Format: `https://wa.me/62812...` (langsung nomor), bukan `https://wa.me/+62812...`
>
> **Anchor link (`#id`) hanya berfungsi kalau ada element dengan `id` cocok di halaman.** Kalau `<a href="#hero">` tapi tidak ada `<section id="hero">`, klik link tidak akan scroll kemana-mana. Cek satu per satu.
>
> **`<a>` tanpa `href`** = link "mati" (tidak bisa diklik, tidak ada style default). Kalau mau placeholder, lebih baik tulis di TODO comment.

<!-- markdownlint-enable MD024 MD028 -->

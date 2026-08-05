<!-- markdownlint-disable MD024 MD028 -->

# SOAL 07 — Typography dan Warna

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Memilih **font stack** yang tepat untuk web (system fonts, web fonts, monospace)
- Menggunakan **unit relatif** `rem` untuk font-size yang scalable dan accessible
- Mengatur **font-size**, **font-weight**, **line-height**, dan **letter-spacing** dengan proporsi yang benar
- Membuat **hierarki heading** (`h1` sampai `h4`) yang jelas dan konsisten
- Menerapkan **text alignment** (`left`, `center`, `right`, `justify`) sesuai konteks
- Menggunakan **text-transform** dan **letter-spacing** untuk badge dan label
- Mendesain **color palette** yang harmonis: primary, secondary, success, warning, danger, neutral
- Menerapkan **color contrast** yang cukup untuk aksesibilitas (WCAG AA)
- Membuat **link styles** yang interaktif (default, hover, visited)
- Mendesain **divider/gradient** untuk memisahkan section secara visual
- Menggunakan **text truncation** (ellipsis, line-clamp) untuk konten yang melebihi ruang
- Memahami **aksesibilitas warna**: kontras, color blindness, preferensi user

**Topik:** font stack, font size, line height, font weight, letter spacing, color palette, text alignment, text transform, text decoration, gradients, text overflow

**Referensi utama:**

- [MDN: CSS Fonts](https://developer.mozilla.org/id/docs/Web/CSS/CSS_fonts)
- [MDN: color()](https://developer.mozilla.org/id/docs/Web/CSS/color_value)
- [MDN: font-family](https://developer.mozilla.org/id/docs/Web/CSS/font-family)
- [MDN: line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
- [MDN: text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
- [MDN: text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
- [-webkit-line-clamp (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors: Palette Generator](https://coolors.co/)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Di soal-soal CSS sebelumnya kamu sudah bermain dengan **box model** (margin, padding, border) dan **layout dasar**. Tapi ada satu hal yang **paling banyak dilihat user pertama kali**: tipografi dan warna.

Bayangkan kamu membuka sebuah website. Sebelum kamu membaca satu kata pun, mata kamu sudah menangkap: **font apa yang dipakai? warna apa yang dominan? teksnya enak dibaca atau menyilaukan?** Ini semua adalah **typography** dan **warna**.

Fakta penting dari dunia web design: **typography menyumbang sekitar 60%** dari keseluruhan kesan desain sebuah website. Warna harmonis menambah sekitar 30%. Sisanya baru layout, spacing, dan detail kecil lain.

Di soal ini kamu akan belajar **sistem yang profesional** untuk mengatur teks dan warna di sebuah halaman web. Kamu akan membangun sebuah **demo page** yang menunjukkan berbagai variasi typography dan color system, seperti yang biasa kamu lihat di **Storybook** atau **design system documentation**.

**Yang akan kamu bangun:**

1. **Section Typography** — hierarki heading, paragraf lead, small text
2. **Section Color System** — palette warna + background/text utilities + badges
3. **Section Gradients** — hero, card, dan warm section dengan gradient
4. **Section Line Height** — perbandingan tight, normal, relaxed
5. **Section Links** — link interaktif dengan state default, hover, dan visited
6. **Section Truncation** — ellipsis dan line-clamp untuk teks panjang

**Prinsip utama yang akan kamu pelajari:** Tipografi yang baik bukan sekadar "memilih font yang bagus" — ini soal **hierarki, ritme, dan konsistensi**. Warna yang baik bukan sekadar "memilih warna favorit" — ini soal **sistem, harmoni, dan aksesibilitas**.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logika di balik CSS property yang sedang dibahas
2. **Lihat Yang Terjadi di Browser** — bayangkan output visualnya
3. **Ketik dari 0** di `code/07-typography-dan-warna.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah nilai, ubah warna, lihat perubahannya langsung

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir dan mengetik**, bukan menyalin. Ini skill paling penting untuk programmer.

---

## Bagian A: Font Family dan Font Stack

### Penjelasan

`font-family` adalah **properti CSS pertama** yang sebaiknya kamu atur. Tanpa font yang tepat, semua typography lain (size, weight, line-height) jadi meaningless.

Karena user menggunakan **berbagai OS dan device**, font yang tersedia di tiap perangkat berbeda. Contohnya:

- **Mac/iOS** punya San Francisco
- **Windows** punya Segoe UI
- **Android** punya Roboto

Karena itulah kita pakai **font stack**: daftar font berurutan dari prioritas tertinggi ke terendah. Browser akan coba font pertama; jika tidak ada, lanjut ke berikutnya; dan seterusnya.

**Prinsip penting:** Selalu akhiri font stack dengan **generic family** seperti `sans-serif` atau `monospace`. Ini adalah "jaring pengaman" terakhir agar browser selalu punya font untuk ditampilkan.

### Wajib Ada di Kode Kamu

- `body` dengan system font stack (multi-OS, diakhiri `sans-serif`)
- `font-size` di body (`1rem` sebagai base)
- Kode di section Typography memiliki heading dengan `font-family` yang terwarisi dari body

### Pola Kode HTML/CSS

```css
/* Font stack untuk cross-OS */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem; /* 16px default */
  line-height: 1.6;
  color: #333;
  background: #f8fafc;
}
```

### Yang Terjadi di Browser

- Di Mac, body akan menggunakan **San Francisco** (font bawaan Apple yang sangat optimal)
- Di Windows, body akan menggunakan **Segoe UI** (font bawaan Windows)
- Di Android, body akan menggunakan **Roboto**
- Jika user memakai OS yang tidak ada di daftar, browser pakai **sans-serif** generik
- Hasilnya: tampilan **native, cepat, dan familiar** di setiap device

### Kapan Pakai System Fonts vs Web Fonts

- **System fonts** cocok untuk blog, dashboard, dan aplikasi internal. Keuntungannya: cepat dimuat (tidak perlu download), native feel, dan tidak menambah HTTP request.
- **Web fonts** (misal Google Fonts: Inter, Poppins, Roboto Flex) cocok untuk landing page atau brand website yang butuh **konsistensi visual** lintas device. Kekurangannya: menambah waktu load dan ada risiko FOUT (Flash of Unstyled Text).
- **Pendekatan hybrid** (sering dipakai): body pakai system fonts, heading pakai web fonts untuk aksen brand.

### Verifikasi

- [ ] `body` punya `font-family` dengan stack minimal 3-4 font
- [ ] Stack diakhiri dengan generic family (`sans-serif`)
- [ ] Font name lebih dari 1 kata dibungkus tanda kutip (`'Segoe UI'`)
- [ ] `font-size: 1rem` di body sebagai base

---

## Bagian B: Font Size, Weight, dan Heading Hierarchy

### Penjelasan

**Font size** menentukan seberapa besar teks. **Font weight** menentukan seberapa tebal teks. Kombinasi keduanya menciptakan **hierarki visual** — cara mata user memindai halaman dan menemukan informasi penting.

Untuk **font-size**, ada 3 unit yang umum:

- **`px`** (pixel) — fixed, tidak respect setting browser user. Cocok untuk border dan shadow.
- **`rem`** (root em) — relatif terhadap ukuran font di elemen `<html>` (default 16px). **Best practice untuk font-size.** Saat user zoom in browser, `rem` ikut menyesuaikan.
- **`em`** — relatif terhadap parent. Bisa membingungkan saat nested (nested `em` jadi makin besar/kecil).

Untuk **font-weight**, nilai yang umum:

- `100`–`300` → tipis (light), cocok untuk teks besar/dekoratif
- `400` → normal (default body text)
- `500`–`600` → medium/semibold, cocok untuk sub-heading dan button
- `700` → bold, cocok untuk heading
- `800`–`900` → extra bold, cocok untuk hero/display text

### Wajib Ada di Kode Kamu

- `h1` sampai `h4` dengan `font-size` dan `font-weight` yang proporsional
- `p` dengan `font-size: 1rem` dan `line-height: 1.7`
- `small` dengan ukuran lebih kecil dari body
- Hierarki jelas: `h1` > `h2` > `h3` > `h4` > `p` > `small`

### Pola Kode HTML/CSS

```css
/* Body baseline */
body {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;
  color: #475569;
}

/* Heading hierarchy: makin ke dalam, makin kecil */
h1 {
  font-size: 2.5rem;     /* 40px */
  font-weight: 800;      /* extra bold untuk hero */
  line-height: 1.2;
  color: #1e293b;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 2rem;       /* 32px */
  font-weight: 700;
  line-height: 1.3;
  color: #334155;
  margin-bottom: 16px;
}

h3 {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;
  color: #475569;
  margin-bottom: 12px;
}

h4 {
  font-size: 1.125rem;   /* 18px */
  font-weight: 600;
  color: #64748b;
}

p {
  font-size: 1rem;       /* 16px */
  line-height: 1.7;
  color: #475569;
  margin-bottom: 16px;
}

small {
  font-size: 0.875rem;   /* 14px */
  color: #94a3b8;
}
```

### Yang Terjadi di Browser

- **h1** tampil dominan di paling atas, besar dan tebal — user langsung tahu ini judul utama
- **h2, h3, h4** membentuk sub-section yang jelas, user bisa scan struktur halaman
- **p** memiliki line-height lega (1.7) sehingga enak dibaca dalam paragraf panjang
- **small** tampil lebih kecil, cocok untuk caption, footer, atau info tambahan
- Rasio ukuran antar heading terlihat **proporsional** dan tidak ada yang "jumpscare" terlalu besar/kecil

### Tip: Pakai Rasio yang Konsisten

Pilih satu rasio dan gunakan untuk seluruh heading. Dua rasio yang umum:

- **1.25 (Major Third)** — lembut, cocok untuk konten editorial. Contoh: 1 → 1.25 → 1.563 → 1.953 → 2.441 rem
- **1.333 (Perfect Fourth)** — tegas, cocok untuk aplikasi. Contoh: 1 → 1.333 → 1.777 → 2.369 rem
- **1.5 (Perfect Fifth)** — dramatis, cocok untuk landing page. Contoh: 1 → 1.5 → 2.25 → 3.375 rem

Pada contoh di atas, kita pakai rasio sederhana (1 → 1.125 → 1.5 → 2 → 2.5) untuk memudahkan pemahaman.

### Verifikasi

- [ ] Semua heading pakai `rem` (bukan `px`)
- [ ] `h1` paling besar, `h4` paling kecil di antara heading
- [ ] `p` ukurannya `1rem` (sama dengan body default)
- [ ] `small` lebih kecil dari `p`
- [ ] Inspect Element: urutan heading logis, tidak loncat level

---

## Bagian C: Line Height dan Paragraph Spacing

### Penjelasan

**`line-height`** adalah jarak vertikal antara dua baris teks dalam satu paragraf. Ini **sangat mempengaruhi keterbacaan**.

Bayangkan kamu membaca paragraf rapat (line-height 1.0) — baris-barisnya nempel, mata lelah. Sebaliknya, line-height terlalu renggang (2.5) — baris terlihat terputus, susah mencari kelanjutan.

**Panduan praktis:**

- **Body text / paragraf**: `1.5` sampai `1.7` — ini sweet spot untuk membaca
- **Heading**: `1.1` sampai `1.3` — lebih rapat, supaya tidak ada ruang kosong besar di heading pendek
- **Display/hero text**: `1.0` sampai `1.1` — sangat rapat, untuk efek dramatis

**Tips penting:** Gunakan `line-height` **tanpa unit** (misal `1.6`), bukan dengan `px` atau `rem`. Tanpa unit, browser akan mengalikan `line-height` dengan `font-size` — hasilnya otomatis proporsional. Dengan `px`/`rem`, nilainya fixed.

Selain line-height, **jarak antar paragraf** (`margin-top` atau `margin-bottom`) juga penting agar blok teks tidak terlalu nempel.

### Wajib Ada di Kode Kamu

- `.lead` (paragraf pembuka) dengan `font-size` lebih besar dan `line-height` proporsional
- `p + p` (paragraf setelah paragraf) punya margin-top untuk pemisah visual
- 4 utility class: `.tight`, `.normal`, `.relaxed`, `.loose`

### Pola Kode HTML/CSS

```css
/* Lead: paragraf pembuka yang lebih besar */
.lead {
  font-size: 1.25rem;   /* 20px */
  line-height: 1.6;
  color: #475569;
}

/* Spacing antar paragraf */
p + p {
  margin-top: 12px;
}

/* Line height utilities */
.tight   { line-height: 1.2; }  /* untuk heading/display */
.normal  { line-height: 1.6; }  /* default body */
.relaxed { line-height: 1.8; }  /* untuk artikel panjang */
.loose   { line-height: 2.0; }  /* untuk dokumen formal */
```

### Yang Terjadi di Browser

- **Paragraf `.lead`** tampil sedikit lebih besar dan lebih "penting" — cocok untuk paragraf pembuka artikel
- **Antar paragraf biasa** (`p + p`) ada jarak 12px sehingga blok teks tidak bertumpuk
- **`.tight`** membuat teks kompak (heading) — tidak ada ruang kosong besar
- **`.relaxed`** membuat teks lebih "breathing" — enak untuk baca panjang
- **`.loose`** untuk dokumen yang butuh kesan formal atau banyak spasi

### Kapan Pakai Line Height Berbeda

- **Tight (1.1–1.3)** → heading, hero text, button label, badge
- **Normal (1.5–1.7)** → body text, paragraf pendek, UI label
- **Relaxed (1.7–1.9)** → artikel blog, dokumentasi, teks bacaan panjang
- **Loose (2.0+)** → konten anak-anak, accessibility mode, dokumen formal

### Verifikasi

- [ ] Body `line-height` di kisaran 1.5–1.7
- [ ] Heading `line-height` lebih rapat dari body
- [ ] `line-height` ditulis tanpa unit (misal `1.6`, bukan `1.6rem`)
- [ ] `p + p` memiliki margin-top (cek di DevTools, computed style)
- [ ] `.lead` tampil lebih besar dari `<p>` biasa

---

## Bagian D: Text Alignment dan Text Transform

### Penjelasan

**Text alignment** menentukan perataan horizontal teks. Ada 4 nilai utama:

- **`left`** (default untuk LTR languages seperti Indonesia/Inggris) — teks rata kiri, kanan tidak rata
- **`right`** — teks rata kanan, cocok untuk angka, tabel, atau konten bahasa Arab
- **`center`** — teks rata tengah, cocok untuk judul pendek, button, badge
- **`justify`** — teks rata kiri-kanan (seperti koran). Hati-hati, sering membuat spasi antar kata tidak merata, sehingga **kurang nyaman dibaca** di layar kecil. Gunakan hanya untuk dokumen formal/artikel panjang di layar besar.

**Text transform** mengubah kapitalisasi teks:

- **`uppercase`** → semua huruf jadi KAPITAL
- **`lowercase`** → semua huruf jadi kecil
- **`capitalize`** → Huruf Pertama Setiap Kata Jadi Kapital
- **`none`** → tampil sesuai aslinya (default)

**Kombinasi umum:** `text-transform: uppercase` sering dipadukan dengan `letter-spacing` positif agar huruf tidak terlalu rapat (misalnya di badge, label kategori, button).

### Wajib Ada di Kode Kamu

- Utility class `.text-center`, `.text-right`, `.text-justify`
- Utility class `.text-uppercase` dengan `letter-spacing` dan `font-size` yang sesuai
- (Bonus) Class `.text-gradient` untuk efek teks dengan background gradient

### Pola Kode HTML/CSS

```css
/* Text alignment utilities */
.text-center  { text-align: center; }
.text-right   { text-align: right; }
.text-justify { text-align: justify; }

/* Uppercase + letter-spacing untuk badge/label */
.text-uppercase {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
}

/* Bonus: text dengan gradient background */
.text-gradient {
  background-image: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Yang Terjadi di Browser

- **`.text-center`** memposisikan teks di tengah secara horizontal — cocok untuk judul section, hero, atau button
- **`.text-right`** meletakkan teks di kanan — jarang dipakai di body, lebih sering untuk angka/label
- **`.text-justify`** merenggangkan spasi antar kata agar kedua ujung baris rata — tampilan rapi tapi **kurang readable** di layar sempit
- **`.text-uppercase`** dengan letter-spacing membuat teks "TAMPILAN BADGE" yang tegas dan modern
- **`.text-gradient`** (jika diimplementasikan) membuat teks terlihat seperti **warna pelangi** yang mengalir dari biru ke ungu

### Kapan Pakai `text-align: justify`

- Hampir **tidak pernah** di web modern — spasi antar kata tidak rata membuat mata lelah
- Lebih baik pakai `text-align: left` (default) untuk sebagian besar kasus
- Justify hanya untuk dokumen formal yang dicetak (PDF, laporan) atau artikel dengan kolom sempit di layar besar

### Verifikasi

- [ ] `.text-center` membuat teks ada di tengah
- [ ] `.text-justify` membuat kedua ujung paragraf rata (bisa diuji dengan paragraf yang cukup panjang)
- [ ] `.text-uppercase` mengubah semua huruf jadi kapital DAN ada spasi antar huruf yang lebih lebar
- [ ] Cek di DevTools: `text-transform` di computed style sesuai nilai yang ditulis

---

## Bagian E: Color System (Palette)

### Penjelasan

**Color palette** adalah set warna yang digunakan secara konsisten di seluruh website. Ibarat sebuah **palet pelukis** — kamu tidak akan menggunakan 20 warna cat acak di satu kanvas; kamu pilih 5-7 warna yang harmonis dan pakai berulang.

**Komponen color palette yang baik:**

- **Primary** — warna utama brand. Dipakai untuk button utama, link, heading highlight.
- **Secondary** — warna pendukung. Sering dipakai untuk variasi, secondary button, atau accent.
- **Success** — hijau, untuk notifikasi sukses, badge "active", checkbox.
- **Warning** — kuning/amber, untuk peringatan, badge "pending".
- **Danger** — merah, untuk error, badge "deleted", tombol hapus.
- **Dark / Light** — abu-abu sangat gelap/terang, untuk teks utama dan background.
- **Gray shades** — untuk teks muted, border, divider.

**Prinsip harmoni warna:**

- Gunakan 1-2 warna utama (primary + secondary)
- Tambahkan 2-3 semantic colors (success, warning, danger)
- Sisanya adalah **netral** (abu-abu, putih, hitam)
- Kontras teks dengan background harus cukup: **minimal 4.5:1** untuk body text (standar WCAG AA)

### Wajib Ada di Kode Kamu

- Background utilities: `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-warning`, `.bg-danger`, `.bg-dark`, `.bg-light`
- Text utilities: `.text-primary`, `.text-secondary`, `.text-success`, `.text-warning`, `.text-danger`, `.text-dark`, `.text-muted`
- Badge components: `.badge` (base) + 4 variant (`.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-danger`)

### Pola Kode HTML/CSS

```css
/* Background color utilities */
.bg-primary   { background: #3b82f6; color: white; }
.bg-secondary { background: #8b5cf6; color: white; }
.bg-success   { background: #10b981; color: white; }
.bg-warning   { background: #f59e0b; color: white; }
.bg-danger    { background: #ef4444; color: white; }
.bg-dark      { background: #1e293b; color: white; }
.bg-light     { background: #f1f5f9; color: #1e293b; }

/* Text color utilities */
.text-primary   { color: #3b82f6; }
.text-secondary { color: #8b5cf6; }
.text-success   { color: #10b981; }
.text-warning   { color: #f59e0b; }
.text-danger    { color: #ef4444; }
.text-dark      { color: #1e293b; }
.text-muted     { color: #94a3b8; }

/* Badge base */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Badge variants (background + text color yang harmonis) */
.badge-primary {
  background: #dbeafe;   /* primary muda */
  color: #1e40af;        /* primary tua */
}
.badge-success {
  background: #dcfce7;
  color: #166534;
}
.badge-warning {
  background: #fef3c7;
  color: #92400e;
}
.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}
```

### Yang Terjadi di Browser

- **Background utilities** mengubah warna background elemen apapun. Berguna untuk button, card, banner, alert.
- **Text utilities** mengubah warna teks tanpa mengubah background. Berguna untuk paragraf, heading, link.
- **Badges** tampil sebagai **pil kecil berwarna** dengan teks uppercase. Misalnya `Primary` jadi `[ PRIMARY ]` di pojok konten.
- Badge punya **2 warna**: background muda (tinted) + teks tua (shaded) — ini pattern umum untuk badge yang mudah dibaca.
- Color swatch di section 2 akan menampilkan **6 kotak warna** (primary, secondary, success, warning, danger, dark) dengan label.

### Tools untuk Memilih Warna

- **[Coolors](https://coolors.co/)** — generator palette acak, bisa lock warna dan generate pelengkap
- **[Adobe Color](https://color.adobe.com/)** — color wheel dengan aturan harmoni (complementary, triadic, analogous)
- **[Tailwind Color](https://tailwindcss.com/docs/customizing-colors)** — palet profesional siap pakai (salah satu yang paling populer di industri)
- **[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)** — cek kontras teks vs background, standar WCAG

### Verifikasi

- [ ] Minimal 7 background utility class bekerja (coba pakai di `<div>` baru)
- [ ] Minimal 7 text utility class bekerja (coba pakai di `<p>` baru)
- [ ] Badge tampil sebagai **pil berwarna** dengan teks uppercase
- [ ] Badge `.badge-primary` background biru muda, teks biru tua
- [ ] Cek kontras: teks di badge terbaca jelas (gunakan WebAIM Contrast Checker)
- [ ] Color swatch di section 2 tampil 6 kotak warna dengan label hex

---

## Bagian F: Link Styles (Default, Hover, Visited)

### Penjelasan

**Link** adalah elemen interaktif yang punya **3 state utama** yang harus di-styling dengan baik:

- **`:link`** (default) — tampilan saat link belum pernah diklik. Warna primer.
- **`:hover`** — tampilan saat mouse di atas link. Biasanya lebih gelap/terang + underline muncul.
- **`:visited`** — tampilan saat link sudah pernah dikunjungi. Browser default memberi warna ungu, tapi kita override dengan warna brand.

Prinsip UX link yang baik:

- **Selalu ada affordance visual** — user harus tahu itu bisa diklik. Bisa berupa warna berbeda, underline, atau cursor pointer (otomatis).
- **Hover state harus jelas** — saat mouse di atas, ada feedback instan (warna berubah, underline muncul, atau animasi).
- **Jangan hapus underline default tanpa alternatif** — kalau `text-decoration: none`, pastikan ada cara lain untuk menandai link (warna, icon, dll).

### Wajib Ada di Kode Kamu

- `a` dengan warna primary dan `text-decoration: none`
- `a:hover` dengan warna lebih gelap DAN underline muncul
- `a:visited` dengan warna berbeda (misal ungu)
- `transition` pada `color` agar perubahan warna halus (bukan instan)

### Pola Kode HTML/CSS

```css
a {
  color: #3b82f6;            /* primary */
  text-decoration: none;     /* hilangkan underline default */
  transition: color 0.2s;    /* transisi halus saat hover */
}

a:hover {
  color: #1d4ed8;            /* primary lebih gelap */
  text-decoration: underline;/* underline muncul saat hover */
}

a:visited {
  color: #7c3aed;            /* ungu untuk link yang sudah dikunjungi */
}
```

### Yang Terjadi di Browser

- Saat user melihat link pertama kali: **teks biru, tanpa underline**
- Saat mouse diarahkan ke link: **warna lebih gelap, underline muncul**, transisi halus 0.2 detik
- Saat link sudah pernah dikunjungi: **teks ungu** (override default browser)
- Klik link: cursor jadi **jari penunjuk** (otomatis dari browser, tidak perlu di-style)

### Pola Link di Industri

- **Klasik (Wikipedia style)**: `text-decoration: underline` permanen, warna biru
- **Modern (Medium, Notion)**: tidak ada underline, warna primer, underline muncul saat hover
- **Subtle (Docs, blog)**: warna primer lembut, tidak ada underline, underline tipis muncul saat hover

Pada soal ini kita pakai **pola modern** — umum di website kontemporer.

### Verifikasi

- [ ] Link default berwarna biru (`#3b82f6`) tanpa underline
- [ ] Hover link: warna lebih gelap DAN underline muncul (coba dengan mouse)
- [ ] Link visited berwarna ungu (coba refresh page setelah klik)
- [ ] Transisi warna halus (bukan langsung berubah)
- [ ] Cursor berubah jadi jari penunjuk saat di atas link

---

## Bagian G: Divider, HR, dan Gradient Backgrounds

### Penjelasan

**Divider** atau **separator** adalah elemen visual yang memisahkan bagian-bagian konten. Bisa berupa:

- **Garis tipis** (`<hr>` dengan `border-top`) — formal, klasik
- **Garis gradient** — modern, eye-catching
- **Spasi kosong** (margin/padding antar section) — minimalis

**Gradient** adalah transisi halus antara 2 atau lebih warna. Digunakan untuk:

- **Hero section** — menarik perhatian, membuat halaman "pop"
- **Card highlight** — membedakan card penting dari card biasa
- **Section warm/cool** — membagi halaman menjadi zona-zona dengan mood berbeda
- **Background dekoratif** — memberikan kedalaman tanpa gambar

**Tips gradient yang baik:**

- Pilih warna yang berdekatan di color wheel (analogous) atau complementary
- Arah gradient mempengaruhi mood: 90deg (horizontal) = tenang, 135deg (diagonal) = dinamis
- Tambahkan `border-radius` untuk sudut yang lebih lembut

### Wajib Ada di Kode Kamu

- `hr` dengan `border-top` solid, margin atas-bawah
- `.hr-gradient` dengan `linear-gradient` multi-warna dan `border-radius`
- `.hero-gradient` (background ungu-biru gradient diagonal)
- `.card-gradient` (background pink gradient dengan rounded corner)
- `.section-warm` (background kuning gradient lembut)

### Pola Kode HTML/CSS

```css
/* Standard divider */
hr {
  border: none;
  border-top: 2px solid #e2e8f0;  /* garis tipis abu-abu */
  margin: 32px 0;                  /* jarak atas-bawah */
}

/* Gradient divider — lebih menarik */
.hr-gradient {
  border: none;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  border-radius: 2px;
  margin: 40px 0;
}

/* Hero gradient — untuk section atas/judul besar */
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

/* Card gradient — untuk highlight card */
.card-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
}

/* Section warm — zona kuning/amber */
.section-warm {
  background: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%);
  padding: 48px 0;
}
```

### Yang Terjadi di Browser

- **`<hr>`** tampil sebagai garis horizontal tipis di antara konten — formal dan bersih
- **`.hr-gradient`** tampil sebagai **garis warna-warni** (biru → ungu → pink) setebal 4px dengan ujung membulat
- **`.hero-gradient`** jadi section penuh dengan background biru-ke-ungu diagonal, teks putih di tengah — sangat eye-catching untuk hero/landing
- **`.card-gradient`** jadi card dengan background pink gradient dan sudut membulat 16px
- **`.section-warm`** jadi section dengan nuansa kuning lembut (cocok untuk highlight, caution area)

### Sintaks `linear-gradient`

```css
background: linear-gradient(
  [arah],         /* opsional: 0deg, 45deg, 90deg, 135deg, 180deg, 270deg */
  [warna1] [pos1],/* warna pertama dan posisinya (0%-100%) */
  [warna2] [pos2],/* warna kedua */
  ...
);
```

- **Arah default** adalah `180deg` (atas ke bawah). Pakai `90deg` untuk horizontal, `135deg` untuk diagonal.
- **Tanpa posisi warna**, browser membagi rata (`0%` dan `100%`).
- **Bisa lebih dari 2 warna** — pisahkan dengan koma.

### Verifikasi

- [ ] `hr` tampil sebagai garis tipis (bukan double border default)
- [ ] `.hr-gradient` tampil sebagai garis multi-warna yang menarik
- [ ] `.hero-gradient` punya background warna-warni diagonal dan teks putih
- [ ] `.card-gradient` punya sudut membulat
- [ ] `.section-warm` punya nuansa kuning lembut
- [ ] Semua gradient **tidak menutupi teks** — teks masih terbaca dengan jelas

---

## Bagian H: Text Overflow dan Truncation

### Penjelasan

Dalam aplikasi web modern, kamu sering menghadapi situasi: **teks terlalu panjang untuk ruang yang tersedia**. Contoh: judul card di grid, deskripsi produk di list, atau komentar user di timeline.

Solusinya adalah **truncation** — memotong teks secara visual dengan indikator (biasanya `...` atau disebut **ellipsis**). Ada 2 metode utama:

**1. Single-line ellipsis** — untuk kasus 1 baris (judul, label, button).

```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Tiga properti ini bekerja bersama:

- `white-space: nowrap` → teks **tidak boleh wrap** ke baris baru
- `overflow: hidden` → bagian yang **melebihi container disembunyikan**
- `text-overflow: ellipsis` → bagian yang disembunyikan diganti dengan `...`

**2. Multi-line clamp** — untuk kasus 2-3 baris (deskripsi, paragraf pendek). Ini pakai trik `-webkit-line-clamp` (awalnya fitur WebKit, sekarang banyak didukung).

```css
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Wajib Ada di Kode Kamu

- `.truncate` (single-line ellipsis)
- `.line-clamp-2` (maksimal 2 baris + ellipsis)
- `.line-clamp-3` (maksimal 3 baris + ellipsis)

### Pola Kode HTML/CSS

```css
/* Single-line truncation: potong jadi 1 baris + "..." */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line clamp: potong jadi N baris + "..." */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Yang Terjadi di Browser

- **`.truncate`** memotong teks panjang jadi 1 baris dan mengakhiri dengan `...`. Misalnya: `"Ini adalah judul yang sangat panjang sekali dan harus dipotong"` jadi `"Ini adalah judul yang sangat p..."`
- **`.line-clamp-2`** membolehkan teks sampai 2 baris, jika lebih akan diakhiri `...`. Baris ke-3 dan seterusnya **disembunyikan**.
- **`.line-clamp-3`** sama tapi untuk 3 baris. Cocok untuk deskripsi produk atau ringkasan artikel.
- Ini sangat berguna untuk **card grid** di mana semua card harus punya tinggi yang konsisten.

### Catatan Browser Support

- `text-overflow: ellipsis` — **didukung semua browser modern** (IE6+)
- `-webkit-line-clamp` — awalnya Safari/Chrome only, sekarang juga Firefox (68+). Untuk production, tambahkan fallback: `max-height` + `overflow: hidden` sebagai backup.

### Verifikasi

- [ ] `.truncate` memotong teks jadi 1 baris + `...` (uji dengan teks panjang)
- [ ] `.line-clamp-2` menampilkan maksimal 2 baris + `...` di akhir baris ke-2
- [ ] `.line-clamp-3` menampilkan maksimal 3 baris + `...` di akhir baris ke-3
- [ ] Inspect Element: cek computed style `overflow`, `text-overflow`, dan `-webkit-line-clamp`
- [ ] Coba ubah container width lebih kecil → truncation jadi lebih agresif

---

## Ringkasan: Cheat Sheet

Berikut adalah ringkasan seluruh materi Typography & Warna yang sudah kamu pelajari. Gunakan sebagai referensi cepat saat membangun website.

**Font family dan font stack:**

- `font-family` menentukan font yang dipakai
- Pakai **font stack** (daftar font berurutan) untuk kompatibilitas lintas OS
- Selalu akhiri dengan **generic family** (`sans-serif`, `monospace`, `serif`)
- System fonts cocok untuk aplikasi internal; web fonts untuk brand website

**Unit untuk font-size:**

- `px` (pixel) → fixed, tidak respect setting user. Pakai untuk border dan shadow.
- `rem` (root em) → relatif terhadap `<html>`. **Best practice untuk font-size** karena accessible.
- `em` → relatif terhadap parent. Bisa membingungkan saat nested.

**Font weight (ketebalan):**

- `300-400` → body text (enak dibaca)
- `500-600` → sub-heading, label, button
- `700-800` → h1, h2, judul penting
- `900` → hero, display text (paling tebal)

**Line-height (jarak antar baris):**

- Body text: `1.5` sampai `1.7` (enak dibaca)
- Heading: `1.1` sampai `1.3` (compact, dramatic)
- Pakai **tanpa unit** (misal `1.6`), bukan `1.6rem` — agar otomatis proporsional

**Letter-spacing (jarak antar huruf):**

- Heading modern: `-0.02em` (lebih rapat, modern)
- Uppercase text: `0.05em` sampai `0.1em` (lebih renggang supaya tidak terlalu padat)
- Body text: `0` (default)

**Text alignment:**

- `left` → default, cocok untuk sebagian besar kasus
- `center` → judul, hero, button
- `right` → angka, tabel, label
- `justify` → jarang dipakai di web (kurang readable di layar kecil)

**Text transform:**

- `uppercase` → semua huruf kapital (untuk badge, label kategori)
- `capitalize` → huruf pertama setiap kata kapital
- `lowercase` → semua huruf kecil

**Color palette (best practice):**

- Pakai **CSS variables** (`:root { --color-primary: #...; }`) untuk konsistensi
- Skema minimum: primary, secondary, success, warning, danger, neutral
- Kontras teks vs background **minimal 4.5:1** (WCAG AA) untuk body text

**Link states:**

- `a` (default) → warna primer, tanpa underline (opsional)
- `a:hover` → warna lebih gelap, underline muncul
- `a:visited` → warna berbeda (misal ungu)
- Tambahkan `transition: color 0.2s` agar perubahan halus

**Divider/HR:**

- `hr` default punya `border` yang dobel — reset dengan `border: none; border-top: ...`
- Gradient divider: `background: linear-gradient(90deg, color1, color2, color3)`

**Gradient backgrounds:**

- `linear-gradient([arah], [warna1], [warna2])` — arah default `180deg` (atas ke bawah)
- Arah `135deg` (diagonal) cocok untuk hero, card highlight
- Tambahkan `border-radius` untuk sudut lembut

**Text truncation:**

- Single line: `overflow: hidden` + `text-overflow: ellipsis` + `white-space: nowrap`
- Multi line: `display: -webkit-box` + `-webkit-line-clamp: N` + `-webkit-box-orient: vertical` + `overflow: hidden`

**Aksesibilitas (color):**

- Selalu cek kontras dengan [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Jangan andalkan **warna saja** untuk menyampaikan informasi (tambah icon atau teks)
- Test dengan color blindness simulator (ada di DevTools)

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 08, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **Font stack** di body dengan minimal 3-4 font + generic family di akhir
- [ ] **Font-size** di body = `1rem` (16px base)
- [ ] **Hierarki heading** jelas: h1 (40px) > h2 (32px) > h3 (24px) > h4 (18px) > p (16px) > small (14px)
- [ ] **Line-height** body `1.5`–`1.7`, heading `1.1`–`1.3` — semua tanpa unit
- [ ] **Letter-spacing** heading negatif, uppercase text positif
- [ ] **Color utilities** lengkap: minimal 7 background + 7 text utility
- [ ] **Badges** tampil sebagai pil dengan background tinted + teks shaded, uppercase
- [ ] **Link styles**: default (primer), hover (gelap + underline), visited (ungu)
- [ ] **Transisi** pada hover link halus (0.2s)
- [ ] **HR** tampil sebagai garis tipis, `.hr-gradient` tampil sebagai garis multi-warna
- [ ] **Gradient backgrounds** hero/card/section warm tampil sesuai deskripsi
- [ ] **Teks truncation**: `.truncate` 1 baris + `...`, `.line-clamp-2/3` multi-baris + `...`
- [ ] **Browser menampilkan**:
  - Typography nyaman dibaca (tidak terlalu rapat/renggang)
  - Warna harmonis, ada hierarki visual
  - Link interaktif dengan state yang jelas
  - Badge/badge dengan warna konsisten
  - Gradient backgrounds eye-catching
  - Truncation rapi saat teks panjang

---

## Cara Submit

1. Buka `code/07-typography-dan-warna.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri (jangan copy-paste dari contoh)
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Eksperimen**:
   - Ubah `font-family` di body — lihat perubahan font di seluruh halaman
   - Ubah `font-size` heading — lihat perubahan hierarki visual
   - Ubah hex color di utility classes — lihat perubahan warna di semua elemen yang pakai
   - Coba tambahkan teks panjang di `<h1>` dan lihat `.truncate` beraksi
   - Ubah `linear-gradient` direction di `.hero-gradient` — lihat efek visual berubah
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/08-form-styling.md`

---

## Catatan untuk Pemula

> **`rem` lebih accessible dari `px`.** Saat user ubah font-size di browser (Settings → Display & Brightness di Mac, Settings → Display di Windows), semua `rem` ikut menyesuaikan. `px` tidak. Untuk user dengan gangguan penglihatan yang butuh teks lebih besar, `rem` sangat membantu. Inilah alasan utama kenapa **`rem` adalah best practice** di web modern.

> **Font stack bukan sekadar daftar font.** Ini tentang **progressive enhancement**: mulai dari yang paling ideal (San Francisco di Mac), turun ke yang umum (Segoe UI di Windows), berakhir di yang pasti ada (`sans-serif` generic). Prinsip ini sama dengan responsive design: berikan pengalaman terbaik di setiap kondisi, jangan hanya di kondisi ideal.

> **Color palette: less is more.** Jangan pakai 10 warna berbeda di 1 halaman. Pilih 2-3 warna utama (primary, secondary, accent), gunakan **tint/shade** (variasi terang/gelap) dari warna yang sama untuk variasi. Website seperti Stripe, Linear, dan Vercel hanya pakai 3-4 warna utama di setiap halaman. Lebih harmonis, lebih profesional.

> **Kontras warna bukan pilihan, ini keharusan.** Standar WCAG AA mensyaratkan kontras minimal **4.5:1** untuk body text dan **3:1** untuk teks besar. Website dengan kontras rendah tidak hanya tidak aesthetic — ini **melanggar hukum aksesibilitas** di banyak negara. Selalu cek dengan [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) sebelum publish.

> **Gradient mudah digunakan secara berlebihan.** Gradient yang bagus
> **mendukung konten**, bukan menggantikan konten. Pakai gradient untuk hero,
> card highlight, atau section break. Jangan pasang gradient di setiap card
> atau tombol—itu akan membuat halaman terasa "berisik" dan sulit dibaca.
> **Prinsip umum: maksimal 2–3 gradient per halaman.**

> **Line-clamp awalnya fitur WebKit saja.** `-webkit-line-clamp` dulunya tidak ada di Firefox atau Edge lama, tapi sekarang sudah didukung luas. Untuk memastikan truncation bekerja di semua browser, **selalu sertakan fallback** (`max-height` + `overflow: hidden`) di production code.

> **Transisi halus lebih "mahal" dari perubahan instan.** Mungkin terdengar aneh, tapi user sering **merasa lebih percaya** pada website yang transisinya halus. Saat hover link, transisi 0.2s terasa lebih responsif daripada perubahan warna yang tiba-tiba. Ini detail kecil yang membedakan website profesional dari yang amatir.

> **Cek font di berbagai OS.** Font yang terlihat bagus di Mac (San Francisco) mungkin **tidak tersedia** di Windows. Selalu test di beberapa OS/browser, atau gunakan system font stack seperti di Bagian A. Ini cara paling aman untuk cross-platform.

> **Bold + Italic = double emphasis.** Jangan pakai `font-weight: bold` DAN `<em>` di tempat yang sama — itu double emphasis yang berlebihan. Pilih satu: bold untuk **penting**, italic untuk **istilah/sitasi**. Konsistensi lebih penting dari "penekanan maksimal".

> **Eksperimen adalah cara belajar terbaik.** Setelah semua kode jalan, coba ubah satu per satu: ganti `2.5rem` jadi `3rem` di h1, ganti `#3b82f6` jadi `#ec4899` di primary, ganti `135deg` jadi `45deg` di gradient. Lihat apa yang terjadi. **Pemahaman datang dari eksperimen**, bukan dari membaca saja.

<!-- markdownlint-enable MD024 MD028 -->

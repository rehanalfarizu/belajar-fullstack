<!-- markdownlint-disable MD024 MD028 -->

# SOAL 08 — Form Styling

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Mendesain **form input** (text, email, password, URL) yang konsisten lintas browser
- Menerapkan **state visual** untuk interaksi: `:focus`, `:disabled`, error, dan success
- Styling **textarea** dengan `resize: vertical` dan `min-height`
- Styling **select dropdown** dengan custom arrow (cross-browser)
- Mendesain **button** (primary, secondary, ghost) dengan state hover, active, dan focus
- Membuat **custom checkbox** dan **radio button** dengan `appearance: none` + `::after`
- Styling **placeholder** dengan pseudo-element `::placeholder`
- Mendesain **form layout** (form row, form group, divider, form actions)
- Memahami **UX form**: feedback visual, focus ring untuk aksesibilitas

**Topik:** form styling, input states, custom select, custom checkbox, button states, placeholder, form layout, UX

**Referensi utama:**

- [MDN: Styling HTML forms](https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms)
- [MDN: `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [MDN: `appearance`](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)
- [MDN: `::placeholder`](https://developer.mozilla.org/en-US/docs/Web/CSS/::placeholder)
- [MDN: `:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Form adalah **titik konversi** paling penting di web: login, register, checkout, contact, search. Form yang buruk = user kabur. Form yang baik = user nyaman, conversion naik.

Di soal ini kamu akan men-styling **halaman form registrasi** yang sudah disiapkan di `code/08-form-styling.html`. Form-nya sudah berisi HTML lengkap dengan input text, email, password, URL, textarea, select, checkbox, radio, dan button. Tugasmu hanya **mengisi CSS** pada bagian yang ditandai `TODO(human)`.

Bagian-bagian yang akan kamu styling:

- **Form wrapper** (card dengan shadow)
- **Label & hint** (typography untuk label dan hint text)
- **Text & email input** (default, focus, error, success)
- **Textarea** (resize handle, min-height)
- **Select** (custom arrow, focus state)
- **Custom checkbox & radio** (pakai `appearance: none`)
- **Button primary** (hover, active, focus)
- **Button secondary & ghost** (variasi warna)
- **Button full width** (lebar 100%)
- **Placeholder** (italic, warna lebih muda)

**Skill ini akan kepakai di SETIAP project web yang kamu buat selamanya.** Hampir semua aplikasi web punya form.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Lihat Yang Terjadi di Browser** — bayangkan output
3. **Ketik dari 0** di `code/08-form-styling.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Test interaksi** — klik, hover, focus, ketik, lihat perubahannya

---

## Bagian A: Form Wrapper (Card)

### Penjelasan

**Form card** adalah container utama untuk seluruh form. Card berfungsi memisahkan form dari background halaman, sehingga fokus user langsung ke form. Pola yang umum: **background putih + shadow + border-radius**.

Property penting untuk form card:

- `background: white` — warna dasar
- `border-radius: 16px` — sudut membulat (modern look)
- `padding: 40px` — jarak dalam yang lapang
- `box-shadow` — bayangan halus, memberi efek "terangkat"

### Wajib Ada di Kode Kamu

- `box-shadow: 0 4px 20px rgba(0,0,0,0.08)` di `.form-card`
- Property lain (background, radius, padding) sudah disiapkan

### Pola Kode

```css
.form-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
```

### Yang Terjadi di Browser

- Card "terangkat" dari background abu-abu halaman
- Konten di dalam card punya ruang yang lapang (padding 40px)
- Sudut membulat modern, bukan kotak kaku

### Verifikasi

- [ ] Card punya shadow halus di bawah & samping
- [ ] Border-radius 16px (sudut jelas membulat)
- [ ] Padding cukup (40px terasa lapang, tidak sesak)

---

## Bagian B: Label & Hint Text

### Penjelasan

**Label** adalah teks yang mendeskripsikan input (misal "Email", "Password"). Label harus **jelas dan mudah dibaca**. Property penting:

- `display: block` — label di baris sendiri, bukan sejajar dengan input
- `font-weight: 600` — sedikit tebal, lebih menonjol dari body text
- `color` gelap tapi tidak pure black (lebih nyaman di mata)
- `margin-bottom` — jarak ke input

**Hint text** adalah teks kecil di bawah input untuk membantu user (misal "Gunakan minimal 8 karakter"). Hint harus:

- `font-size` lebih kecil dari label
- `color` lebih muda (abu-abu)
- `margin-top` kecil — jarak ke input

### Wajib Ada di Kode Kamu

- `.form-group label` punya `display: block`, `font-weight: 600`, `color: #374151`, `margin-bottom: 8px`, `font-size: 0.9rem`
- `.form-hint` punya `font-size: 0.8rem`, `color: #94a3b8`, `margin-top: 4px`

### Pola Kode

```css
.form-group label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-hint {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 4px;
}
```

### Yang Terjadi di Browser

- Label terlihat **jelas dan menonjol** di atas input
- Hint text terlihat **kecil dan lembut** di bawah input
- Jarak vertikal konsisten antara label → input → hint

### Kenapa `display: block` Penting

Tanpa `display: block`, label akan **sejajar dengan input** (karena `<label>` adalah inline element). Dengan `display: block`, label berada di baris sendiri di atas input — **pattern yang paling umum dan mudah dibaca**.

### Verifikasi

- [ ] Label ada di **atas** input (bukan di samping)
- [ ] Label terlihat **tebal** (font-weight 600)
- [ ] Hint text **kecil dan abu-abu** (lebih lembut dari label)
- [ ] Jarak antar elemen proporsional

---

## Bagian C: Text & Email Input (Default State)

### Penjelasan

Input adalah element yang **paling sering diinteraksi** user di form. Styling-nya harus **konsisten** dan **nyaman diketik**. Property penting:

- `width: 100%` — ambil seluruh lebar parent
- `padding: 12px 16px` — ruang klik yang nyaman
- `border: 2px solid` — border cukup tebal untuk terlihat
- `border-radius: 10px` — sudut membulat
- `font-size: 1rem` — sama dengan body (baca lebih lanjut di catatan pemula)
- `font-family: inherit` — pakai font parent, bukan default browser
- `transition` — animasi halus saat state berubah

### Wajib Ada di Kode Kamu

- `font-family: inherit` (penting! default input pakai font OS, beda dengan body)
- `color: #1e293b` (warna teks gelap, bukan pure black)
- `background: white`
- `transition: border-color 0.2s, box-shadow 0.2s` (siap untuk focus state)

### Pola Kode

```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  color: #1e293b;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}
```

### Yang Terjadi di Browser

- Input **nyaman diketik** (padding cukup, font jelas)
- Border **netral** (abu-abu terang, tidak mencolok)
- Saat state berubah nanti (focus, error, success), **transisi halus** karena sudah ada `transition`

### Kenapa `font-family: inherit` Penting

Tanpa `font-family: inherit`, browser akan pakai **font default OS** untuk input. Font ini sering **berbeda** dengan font body (misal body pakai Inter, input pakai Times). Hasilnya: form terlihat **tidak konsisten**. `inherit` memaksa input pakai font parent-nya.

### Verifikasi

- [ ] Input **nyaman** diketik (padding cukup)
- [ ] Font input **sama** dengan font body
- [ ] Border **netral** (abu-abu terang)
- [ ] `transition` sudah ada (siap untuk focus)

---

## Bagian D: Input States (Focus, Error, Success)

### Penjelasan

**State** adalah kondisi visual input yang berubah sesuai situasi. Ini feedback penting untuk user.

- **`:focus`** — saat input di-klik/diketik. Beri **glow/border accent** supaya user tahu "ini sedang aktif"
- **`.error`** — saat validasi gagal. Border **merah** + background merah muda
- **`.success`** — saat validasi lulus. Border **hijau** + background hijau muda

### Wajib Ada di Kode Kamu

- `.form-input:focus` → `border-color: #3b82f6` + `box-shadow: 0 0 0 3px rgba(59,130,246,0.15)`
- `.form-input.error` → `background: #fef2f2` (border-color sudah di-set)
- `.form-input.success` sudah disiapkan lengkap

### Pola Kode

```css
/* Focus: border biru + glow */
.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Error: background merah muda */
.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

/* Success: border hijau + background hijau muda (sudah ada) */
.form-input.success {
  border-color: #10b981;
  background: #f0fdf4;
}
```

### Yang Terjadi di Browser

- **Klik input** → border berubah biru + ada glow lembut di sekitar input
- **Tambah class `.error`** → border merah, background merah muda (tanda "ada yang salah")
- **Tambah class `.success`** → border hijau, background hijau muda (tanda "valid")
- Perubahan **halus** (0.2s transition), bukan langsung

### Trik Glow dengan `box-shadow`

Pattern glow focus yang umum:

```css
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
```

Cara baca: `0 0 0` = tidak ada offset, tidak ada blur. `3px` = lebar glow. `rgba(...,0.15)` = transparan 15% (lembut). Hasilnya: **cincin biru transparan** di sekitar input — modern, tidak menusuk mata.

### Verifikasi

- [ ] Klik input → border **biru** + **glow** di sekitar
- [ ] `.error` → border **merah** + background **merah muda**
- [ ] `.success` → border **hijau** + background **hijau muda**
- [ ] Perubahan **halus** (bukan langsung patah)
- [ ] `outline: none` (kita ganti dengan glow sendiri)

---

## Bagian E: Textarea Styling

### Penjelasan

**`<textarea>`** default punya **resize handle** di kanan bawah yang bisa di-drag untuk mengubah ukuran. Handle ini sering **merusak layout** — user bisa drag sampai textarea sangat lebar atau sangat pendek.

Solusinya: `resize: vertical` (hanya boleh resize **vertikal/tinggi**, tidak horizontal/lebar).

Property tambahan:

- `min-height: 120px` — tinggi minimum, supaya tidak terlalu kecil
- `line-height: 1.6` — jarak antar baris nyaman untuk teks panjang

### Wajib Ada di Kode Kamu

- `resize: vertical`
- `min-height: 120px`
- `line-height: 1.6`

### Pola Kode

```css
textarea.form-input {
  resize: vertical;   /* hanya resize vertikal */
  min-height: 120px;
  line-height: 1.6;
}
```

### Yang Terjadi di Browser

- Textarea punya **handle kecil di bawah** untuk resize
- Drag **vertikal** → textarea memanjang/memendek
- Drag **horizontal** → **tidak bisa** (lebar tetap 100% parent)
- Tinggi minimum 120px (cukup untuk ~3-4 baris)

### Kenapa `resize: vertical` (Bukan `none`)

- **`resize: none`** → user tidak bisa resize sama sekali. Kadang user butuh textarea lebih panjang untuk teks panjang.
- **`resize: vertical`** → user bisa panjangkan jika perlu, tapi tidak bisa merusak layout.
- **Sweet spot**: izinkan resize vertikal, kunci horizontal.

### Verifikasi

- [ ] Drag handle bawah → textarea **memanjang vertikal**
- [ ] Drag horizontal → **tidak bisa** (lebar tetap)
- [ ] Tinggi minimum 120px (tidak ada textarea yang terlalu kecil)
- [ ] Teks di dalam **enak dibaca** (line-height 1.6)

---

## Bagian F: Select Styling (Custom Arrow)

### Penjelasan

**`<select>`** default punya **arrow bawaan OS** (segitiga kecil di kanan) yang **tidak bisa di-style** dengan CSS biasa. Untuk **konsistensi visual** lintas browser/OS, kita custom dengan:

1. `appearance: none` — hilangkan default arrow
2. `background-image` dengan SVG inline — ganti dengan custom arrow
3. `padding-right` lebih besar — ruang untuk arrow

### Wajib Ada di Kode Kamu

- `.form-select` punya `transition: border-color 0.2s, box-shadow 0.2s` (sama dengan input)
- `.form-select:focus` → `border-color: #3b82f6` + `box-shadow` glow biru

### Pola Kode

```css
.form-select {
  /* property lain sudah ada */
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
```

### Yang Terjadi di Browser

- Default arrow OS **hilang**, diganti dengan **chevron SVG abu-abu** di kanan
- Padding kanan 40px → teks **tidak bertabrakan** dengan arrow
- Klik → dropdown **tetap muncul** (kita tidak merusak fungsionalitas, hanya kosmetik)
- Hover/focus state tetap bekerja (border + glow biru)

### Trik Custom Arrow dengan SVG Inline

```css
background: white url("data:image/svg+xml,...") no-repeat right 12px center;
background-size: 20px;
appearance: none;
```

Cara baca: `data:image/svg+xml,...` adalah SVG yang di-encode langsung di CSS. Tidak perlu file terpisah. Browser render SVG itu sebagai gambar background. `no-repeat` + `right 12px center` = posisi di kanan dengan jarak 12px dari tepi, vertikal tengah.

### Verifikasi

- [ ] Default OS arrow **hilang**
- [ ] Custom chevron **terlihat** di kanan select
- [ ] Padding kanan cukup (teks tidak tertutup arrow)
- [ ] Klik → dropdown **masih bisa dibuka**
- [ ] Focus → border biru + glow (sama seperti input)

---

## Bagian G: Custom Checkbox & Radio

### Penjelasan

Default checkbox/radio **terlihat berbeda di tiap OS** (Mac, Windows, Linux). Untuk **konsistensi visual**, kita custom dengan `appearance: none` + teknik pseudo-element.

**Cara kerja custom checkbox/radio:**

1. **Hide input asli** dengan `position: absolute; opacity: 0` — tapi tetap di-DOM untuk submit
2. **Buat visual box/circle** dengan `<span class="checkmark">` atau `<span class="radiomark">`
3. **Gunakan sibling selector** (`+`) — styling berdasarkan state input
4. **`:checked`** → ubah background, tampilkan icon (`::after`)
5. **`:focus`** → ring fokus untuk aksesibilitas keyboard

### Wajib Ada di Kode Kamu

- `.custom-checkbox` dan `.custom-radio` punya `font-size: 0.95rem` dan `color: #374151`

### Pola Kode

```css
.custom-checkbox,
.custom-radio {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #374151;
}

.custom-checkbox input,
.custom-radio input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
```

**Checkbox checkmark (sudah ada di kode):**

```css
.custom-checkbox input:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "";
  width: 6px;
  height: 10px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(-1px, -1px);
  display: block;
}
```

**Radio inner dot (sudah ada di kode):**

```css
.custom-radio input:checked + .radiomark {
  border-color: #3b82f6;
}

.custom-radio input:checked + .radiomark::after {
  content: "";
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  display: block;
}
```

### Yang Terjadi di Browser

- Checkbox/radio **konsisten** lintas OS (selalu 22×22px, warna brand biru)
- Saat checked: **background biru + icon putih** (checkmark untuk checkbox, dot untuk radio)
- Hover: border **lebih biru** (cursor di atas, kasih feedback)
- Focus: **ring biru transparan** (untuk keyboard navigation)
- Input asli **tetap di-DOM** — saat submit, data tetap terkirim

### Trik Checkmark dengan Border + Rotate

```css
.custom-checkbox input:checked + .checkmark::after {
  content: "";
  width: 6px;
  height: 10px;
  border: 2px solid white;
  border-top: none;     /* hilangkan border atas */
  border-left: none;    /* hilangkan border kiri */
  transform: rotate(45deg);
}
```

Cara baca: bikin kotak kecil dengan border **hanya kanan dan bawah**. Rotate 45° → kelihatan seperti **"✓"**. Trik klasik CSS untuk checkmark tanpa gambar.

### Verifikasi

- [ ] Checkbox: **22×22px rounded** (sudut membulat 6px)
- [ ] Checked: background **biru** + **checkmark putih** di tengah
- [ ] Radio: **22×22px circle** (border-radius 50%)
- [ ] Radio checked: border **biru** + **inner dot biru** di tengah
- [ ] Hover: border lebih biru
- [ ] Focus (Tab): **ring biru transparan** di sekitar
- [ ] Klik label **sama** dengan klik box (karena label membungkus input)

---

## Bagian H: Button Primary (Default, Hover, Active, Focus)

### Penjelasan

Button harus punya **multiple state** supaya user tahu apa yang terjadi:

- **Default** → tampil normal, bisa diklik
- **Hover** → mouse di atas, beri feedback "ini bisa diklik" (warna lebih gelap, lift effect)
- **Active** → sedang ditekan (klik ditahan), button "turun" kembali
- **Focus** → keyboard navigation, ring fokus terlihat (a11y)

**Prinsip utama: setiap state butuh visual feedback.** User tidak boleh bingung.

### Wajib Ada di Kode Kamu

- `.btn` punya `transition: all 0.2s` (siap untuk semua perubahan)
- `.btn-primary` punya `box-shadow: 0 4px 12px rgba(59,130,246,0.3)`
- `.btn-primary:hover` punya `transform: translateY(-2px)` + `box-shadow: 0 6px 20px rgba(59,130,246,0.4)`
- `.btn-primary:active` punya `transform: translateY(0)` + `box-shadow: 0 2px 8px rgba(59,130,246,0.3)`
- `.btn-primary:focus` punya `box-shadow: 0 0 0 3px rgba(59,130,246,0.4)`

### Pola Kode

```css
.btn {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  background: #1d4ed8;
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}
```

### Yang Terjadi di Browser

- **Default**: tombol biru dengan shadow halus
- **Hover** (mouse di atas): tombol **naik 2px** + shadow **lebih dalam** + background **lebih gelap** — efek "lift"
- **Active** (klik ditahan): tombol **turun kembali** + shadow **lebih kecil** — efek "ditekan"
- **Focus** (Tab dari keyboard): ring biru transparan di sekitar tombol
- Semua perubahan **halus** (0.2s transition)

### Prinsip Lift + Press

Pola button interaktif yang baik:

- **Hover** → `translateY(-2px)` + shadow **lebih dalam** (tombol "naik")
- **Active** → `translateY(0)` + shadow **lebih kecil** (tombol "turun saat ditekan")

Ini mensimulasikan **fisika tombol fisik**: angkat saat disentuh, tekan saat diklik. User langsung tahu "ini tombol yang bisa diklik".

### Verifikasi

- [ ] Hover: tombol **naik** + shadow lebih dalam
- [ ] Active: tombol **turun** + shadow lebih kecil
- [ ] Focus: **ring biru** terlihat
- [ ] Transisi **halus** (0.2s, bukan langsung)
- [ ] Cursor jadi **pointer** saat di atas button

---

## Bagian I: Button Secondary, Ghost, & Full Width

### Penjelasan

**Variasi button** untuk konteks berbeda:

- **Primary** → aksi utama (submit, "Daftar", "Beli")
- **Secondary** → aksi alternatif (bisa juga "Login dengan Google")
- **Ghost** → aksi ringan ("Batal", "Lewati")
- **Full width** → button yang **lebar 100%** parent, untuk mobile atau CTA besar

### Wajib Ada di Kode Kamu

- `.btn-secondary` (background gelap, teks putih) — sudah disiapkan lengkap
- `.btn-ghost` (transparan, border biru, teks biru) — sudah disiapkan lengkap
- `.btn-full` (lebar 100% + text-align center) — sudah disiapkan lengkap

### Pola Kode

**Button secondary (sudah ada di kode):**

```css
.btn-secondary {
  background: #1e293b;
  color: white;
}

.btn-secondary:hover {
  background: #334155;
  transform: translateY(-2px);
}
```

**Button ghost (sudah ada di kode):**

```css
.btn-ghost {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-ghost:hover {
  background: #eff6ff;
  transform: translateY(-2px);
}
```

**Button full width (sudah ada di kode):**

```css
.btn-full {
  width: 100%;
  text-align: center;
  display: block;
}
```

### Yang Terjadi di Browser

- **Primary** (biru, shadow) → aksi utama, paling menonjol
- **Secondary** (hitam/abu gelap) → aksi sekunder, tidak se-menonjol primary
- **Ghost** (transparan, border biru) → aksi ringan, "tidak berisik"
- **Full width** → button melebar 100% parent, biasanya untuk mobile atau CTA hero
- Semua variasi: hover **naik 2px** + background **berubah**

### Kapan Pakai Variasi Apa

- **Primary** → "Daftar", "Beli Sekarang", "Submit". Paling **1 per section**.
- **Secondary** → "Login dengan Google", alternatif lain. Lebih **gelap dari primary**.
- **Ghost** → "Batal", "Lewati", "Pelajari Lebih Lanjut". **Tidak mencolok**.
- **Full width** → mobile form, CTA di bawah halaman, button yang jadi fokus utama.

### Verifikasi

- [ ] Primary: biru + shadow + hover lift
- [ ] Secondary: hitam/abu gelap + hover lift
- [ ] Ghost: transparan + border biru + hover background biru muda
- [ ] Full width: lebar **100%** parent
- [ ] Semua punya **hover effect** yang sama (lift)

---

## Bagian J: Placeholder Styling

### Penjelasan

**`::placeholder`** adalah pseudo-element untuk styling teks placeholder (teks "hints" yang muncul saat input kosong). Default placeholder terlihat seperti **teks abu-abu terang**, dan sering **kurang kontras** dengan input.

Kapan customize placeholder:

- **Beri warna lebih jelas** (tidak terlalu muda)
- **Italic** untuk membedakannya dari teks asli
- **Opacity** untuk kelembutan

### Wajib Ada di Kode Kamu

- `.form-input::placeholder` punya `color: #cbd5e1` (sudah ada) dan `font-style: italic`

### Pola Kode

```css
.form-input::placeholder {
  color: #cbd5e1;
  font-style: italic;
}
```

### Yang Terjadi di Browser

- Teks placeholder sekarang **italic** (miring)
- Warna **lebih lembut** dari teks asli (#cbd5e1 vs #1e293b)
- User langsung tahu "ini cuma hint, bukan nilai asli"

### Kenapa `::placeholder` Pakai Double Colon

CSS3 pakai konvensi **double colon** (`::`) untuk pseudo-element (`::placeholder`, `::before`, `::after`, `::first-letter`) dan **single colon** (`:`) untuk pseudo-class (`:hover`, `:focus`, `:disabled`).

**Catatan:** `::placeholder` sebenarnya **pseudo-element**, bukan pseudo-class. Tapi browser masih mendukung sintaks lama single colon (`:placeholder`) untuk backward compatibility. Pakai double colon untuk standard.

### Verifikasi

- [ ] Placeholder **italic** (miring)
- [ ] Warna placeholder **lebih lembut** dari teks input asli
- [ ] Saat user mulai mengetik → placeholder **hilang** (bukan tertimpa)

---

## Ringkasan Cheat Sheet (Tanpa Tabel)

**Prinsip form styling:**

- `font-family: inherit` di input → biar **konsisten** dengan body
- `transition` di element **asal**, bukan di `:hover`/`::placeholder` → supaya **halus dua arah** (in/out)
- `outline: none` + custom `box-shadow` glow untuk focus → modern look
- Hidden input asli (`opacity: 0`) untuk custom checkbox/radio → tetap bisa submit

**State interaksi yang wajib ada:**

- **Default** → border netral (#e2e8f0), background putih
- **Focus** → border accent (#3b82f6) + `box-shadow: 0 0 0 3px rgba(...,0.15)` glow
- **Error** → border merah (#ef4444) + background merah muda (#fef2f2)
- **Success** → border hijau (#10b981) + background hijau muda (#f0fdf4)
- **Disabled** → background abu-abu + `cursor: not-allowed`

**Button state yang wajib ada:**

- **Default** → warna brand + shadow halus
- **Hover** → `translateY(-2px)` + shadow lebih dalam + background lebih gelap (efek "lift")
- **Active** → `translateY(0)` + shadow lebih kecil (efek "ditekan")
- **Focus** → `box-shadow: 0 0 0 3px rgba(...,0.4)` ring biru untuk keyboard

**Custom select/checkbox/radio:**

- `appearance: none` → hilangkan default OS (arrow, checkbox, radio)
- Custom styling dengan `border`, `background`, `::after`
- Checkmark: `border` (hanya kanan + bawah) + `rotate(45deg)` = "✓"
- Radio: `inner dot` absolute positioned di tengah
- Hidden input asli (`position: absolute; opacity: 0`) supaya tetap functional

**Form layout pattern:**

- `.form-group` → wrapper untuk 1 label + 1 input
- `.form-row` → flex row untuk input yang **sejajar horizontal** (misal nama depan + nama belakang)
- `.divider` → `<hr>` styling sebagai pemisah section
- `.form-actions` → wrapper untuk button di akhir form

**Best practices:**

- `font-size: 1rem` (= 16px) di input → **wajib** untuk cegah auto-zoom iOS Safari
- `padding: 12px 16px` → ruang klik yang nyaman (minimal 12px vertikal)
- `border-radius: 8-10px` → modern look, tidak kotak kaku
- Selalu `<label for="id">` yang terasosiasi dengan `<input id="id">` → **a11y**, screen reader butuh ini
- Test di **device asli** (HP) → cek touch target cukup besar, tidak ada zoom aneh

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 09, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **Form card** punya shadow halus
- [ ] **Label & hint text** styling rapi
- [ ] **Input default** dengan border, padding, radius, transition
- [ ] **Input focus** → border biru + glow
- [ ] **Input error** → border merah + background merah muda
- [ ] **Input success** → border hijau + background hijau muda
- [ ] **Textarea** dengan `resize: vertical` + `min-height: 120px`
- [ ] **Select** dengan custom arrow (default OS arrow hilang)
- [ ] **Select focus** → border biru + glow (sama seperti input)
- [ ] **Custom checkbox** → 22×22, rounded, checkmark saat checked
- [ ] **Custom radio** → 22×22 circle, inner dot saat checked
- [ ] **Button primary** → hover lift, active tekan, focus ring
- [ ] **Button secondary** → dark background
- [ ] **Button ghost** → transparent + border
- [ ] **Button full width** → lebar 100%
- [ ] **Placeholder italic** + warna lembut
- [ ] **Test interaksi**:
  - Tab → input pertama ter-focus (lihat glow biru)
  - Ketik di input → lihat teks, font konsisten dengan body
  - Klik select → dropdown muncul, custom arrow tetap terlihat
  - Centang checkbox → checkmark biru muncul
  - Pilih radio → inner dot muncul
  - Hover button → lihat lift + shadow lebih dalam
  - Klik & tahan button → lihat active state
- [ ] **Test keyboard**:
  - Tab → navigasi dari input ke input
  - Shift+Tab → mundur
  - Space/Enter di checkbox/radio → toggle
  - Enter di input → submit form

---

## Cara Submit

1. Buka `code/08-form-styling.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Test interaksi**:
   - Klik input → lihat border + glow
   - Ketik sesuatu → lihat font konsisten
   - Hover button → lihat lift + shadow
   - Klik button → lihat active state
   - Centang checkbox → lihat checkmark
   - Pilih radio → lihat inner dot
   - Buka di HP → coba ketik (cek auto-zoom iOS, harus TIDAK zoom)
6. **Test keyboard**:
   - Tab → input pertama ter-focus
   - Tab lagi → input kedua, dst
   - Shift+Tab → mundur
   - Enter di form → submit
7. Verifikasi dengan checklist di atas
8. Kalau PASS, lanjut ke `soal/09-animasi-dan-transisi.md`

---

## Catatan untuk Pemula

> **`font-family: inherit` itu WAJIB untuk input/textarea/select/button.** Tanpa ini, browser pakai **font default OS** yang sering berbeda dari font body. Hasilnya: form terlihat tidak konsisten. `inherit` memaksa element pakai font parent-nya.
>
> **`font-size: 1rem` (= 16px) di input itu WAJIB untuk mobile.** Tanpa ini, iOS Safari **auto-zoom** halaman saat input di-focus. Sangat mengganggu. Selalu set minimal 16px untuk input (boleh lebih besar, tapi jangan lebih kecil).
>
> **Transition HARUS di element asal, bukan di `:hover`/`::placeholder`/`::after`.** Ini pattern paling penting di CSS. Kalau transition di `:hover`, saat hover selesai, **tidak ada transisi keluar** (perubahan jadi patah). Taruh di element asal, transition bisa 2 arah (in/out) — perubahan jadi halus.
>
> **Custom checkbox/radio butuh teknik khusus:** hide input asli dengan `position: absolute; opacity: 0; width: 0; height: 0`. Lalu styling **sibling element** (`.checkmark`/`.radiomark`) berdasarkan state `:checked` dari input. Pakai `+` selector (sibling) atau `~` (general sibling) untuk menghubungkan.
>
> **Checkmark dengan border + rotate itu klasik.** Border hanya di `border-right` + `border-bottom` (sisa di-`none`), lalu `transform: rotate(45deg)` → terlihat seperti "✓". Trik ini bekerja tanpa gambar, tanpa SVG, tanpa font icon. CSS murni.
>
> **Box-shadow `0 0 0 3px rgba(...)` itu pattern glow/focus ring yang umum.** `0 0 0` artinya offset dan blur = 0, jadi glow-nya solid (cincin). `3px` adalah lebar glow. `rgba(...,0.15)` adalah opacity 15% (transparan, lembut). Bisa dipakai untuk focus di input, button, checkbox, dan radio — konsistensi visual.
>
> **Disabled button tetap terlihat disabled, jangan hilangkan.** Pakai `opacity: 0.5` atau `background: gray`. Jangan `display: none` atau `visibility: hidden` — user bingung kenapa tombolnya hilang. Disabled = "tidak bisa diklik" bukan "tidak ada".
>
> **A11y (accessibility) untuk form:** selalu pakai `<label for="id">` yang terasosiasi dengan `<input id="id">`. Screen reader butuh ini untuk tahu "input ini untuk apa". Placeholder **bukan** pengganti label — saat user mulai mengetik, placeholder hilang, dan screen reader tidak bisa baca placeholder sebagai label.
>
> **Test form di device asli, bukan cuma desktop.** Buka di HP, coba ketik. Lihat apakah keyboard muncul dengan benar, apakah ada zoom yang aneh, apakah touch target cukup besar (minimal 44×44px untuk a11y).

<!-- markdownlint-enable MD024 MD028 -->

<!-- markdownlint-disable MD024 MD028 -->

# SOAL 02 — Selector & Box Model (Lanjutan)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membedakan **child selector** (`>`) dan **descendant selector** (spasi) — dan kapan pakai masing-masing
- Menggunakan **adjacent sibling selector** (`+`) untuk styling element setelah element tertentu
- Menulis **attribute selector** (`[type="text"]`) untuk styling element berdasarkan atribut HTML
- Menggunakan **pseudo-class** (`:hover`, `:first-child`, `:last-child`, `:nth-child`) untuk state & posisi
- Memahami **box-sizing: content-box vs border-box** secara visual
- Memvisualisasikan **4 lapis box model** (content, padding, border, margin) dengan warna berbeda

**Topik:** child selector, adjacent sibling, attribute selector, pseudo-class, box-sizing deep dive

**Referensi utama:**

- [MDN: CSS Selectors](https://developer.mozilla.org/id/docs/Web/CSS/CSS_Selectors)
- [MDN: Box Model](https://developer.mozilla.org/id/docs/Learn/CSS/Building_blocks/The_box_model)
- [MDN: :nth-child()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)

**Difficulty:** Pemula • **Estimasi:** 45-60 menit

---

## Briefing

Di soal 01 kamu sudah belajar 5 selector dasar (element, class, ID, descendant, group) dan box model secara umum. Sekarang kita **perdalam** dua hal: selector lanjutan yang lebih spesifik, dan box model yang **sering bikin bingung** (`box-sizing: content-box` vs `border-box`).

Yang akan kamu bangun adalah **halaman demo** — di satu tempat, kamu bisa **lihat langsung** perbedaan tiap selector bekerja, dan **visualisasi 4 lapis box model** dengan warna berbeda. Ini akan jadi "cheat sheet visual" yang bisa kamu bookmark untuk ditinjau kapan saja.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya (kenapa selector ini ada, kapan dipakai)
2. **Lihat Yang Terjadi di Browser** — bayangkan output sebelum nulis
3. **Ketik dari 0** di `code/02-selector-dan-box-model.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah-ubah value, hapus/komentar selector, lihat perubahannya

---

## Bagian A: Refleksi dari Soal 01

### Penjelasan

Sebelum lanjut, pastikan kamu sudah nyaman dengan 5 selector dari soal 01. Review kilat 5 selector:

- **Element** → `h1 { }` memilih semua `<h1>`
- **Class** → `.card { }` memilih semua element dengan class="card"
- **ID** → `#header { }` memilih element dengan id="header" (unik)
- **Descendant** → `.card p { }` memilih semua `<p>` di dalam `.card` (kapan saja, berapa level)
- **Group** → `h1, h2, h3 { }` memilih semua `<h1>`, `<h2>`, dan `<h3>`

### Wajib Ada di Kode Kamu

- **Pakai ulang** 5 selector dari soal 01 (jangan hapus)
- Tambah selector baru yang akan dipelajari di soal 02

### Verifikasi

- [ ] 5 selector dari soal 01 masih ada
- [ ] Tidak ada duplikasi ID
- [ ] Bisa Inspect Element dan lihat di tab "Styles" rule mana yang aktif

---

## Bagian B: Child Selector (`>`) vs Descendant

### Penjelasan

**Descendant** (spasi) memilih element "kapan saja di dalam, berapa level pun". Misal `.menu li` memilih **semua** `<li>` di dalam `.menu`, termasuk yang ada di dalam `<ul>` bersarang.

**Child** (`>`) memilih element "langsung di dalam, satu level saja". Misal `.menu > li` hanya memilih `<li>` yang **anak langsung** dari `.menu`, tidak yang di dalam `<ul>` lain di dalam `.menu`.

**Analogi keluarga:**

- **Descendant** = "semua keturunanku" (anak, cucu, cicit)
- **Child** = "anak kandungku saja" (bukan cucu)

### Wajib Ada di Kode Kamu

- **Descendant**: `.menu li` (semua li di dalam menu)
- **Child**: `.menu > li` (hanya li langsung di bawah menu)
- Bikin struktur HTML bersarang untuk lihat perbedaannya

### Pola Kode

```html
<nav class="menu">
  <li>Item 1 (langsung anak)</li>
  <li>Item 2 (langsung anak)</li>
  <ul>
    <li>Item 3.1 (di dalam ul bersarang — TIDAK kena .menu > li)</li>
    <li>Item 3.2 (di dalam ul bersarang)</li>
  </ul>
</nav>
```

```css
/* Semua li di dalam .menu, termasuk yang bersarang */
.menu li {
  border-bottom: 1px solid #ddd;
}

/* Hanya li LANGSUNG anak .menu, bukan yang di dalam ul bersarang */
.menu > li {
  font-size: 18px;
  font-weight: bold;
}
```

### Yang Terjadi di Browser

- Semua `<li>` punya border-bottom (dari descendant)
- Hanya Item 1 dan Item 2 yang tebal + besar (dari child)
- Item 3.1 dan Item 3.2 hanya kena descendant, tidak kena child

### Kapan Pakai

- **Child (`>`)**: untuk styling "level pertama" saja (misal: menu utama, tidak dengan submenu)
- **Descendant**: untuk styling **semua** element di dalam (lebih longgar)

### Kapan Jangan

- **Jangan** pakai child selector kalau kamu mau kena **semua** level — pakai descendant
- **Jangan** pakai descendant kalau kamu mau **konsisten** di tiap level — pakai child + class khusus di tiap level

### Verifikasi

- [ ] Minimal 1 struktur HTML bersarang (menu dengan submenu)
- [ ] `.menu > li` hanya men-style anak langsung
- [ ] `.menu li` men-style semua, termasuk yang bersarang
- [ ] Inspect Element: lihat di tab "Styles" selector mana yang aktif

---

## Bagian C: Adjacent Sibling Selector (`+`)

### Penjelasan

**Adjacent sibling** (`+`) memilih element yang **langsung mengikuti** element lain, **dengan parent yang sama**.

**Analogi antrian:** `+` artinya "orang yang **persis di belakang** saya" — bukan orang di belakang yang jauh.

**Contoh kasus:**

- `h2 + p` = paragraf yang **langsung mengikuti** `<h2>` (jadi "paragraf pembuka" di tiap section)
- `input + label` = label yang langsung setelah input
- `.error + .help` = help text yang muncul setelah error message

### Wajib Ada di Kode Kamu

- `h2 + p` — styling paragraf pembuka (misal: font-size lebih besar, margin-top kecil)
- `input + .error` — styling error message yang muncul setelah input
- Bikin minimal 2 contoh berbeda

### Pola Kode

```html
<h2>Section 1</h2>
<p>Paragraf ini langsung setelah h2 — kena styling h2 + p</p>
<p>Paragraf ini TIDAK kena (ada h2 + p di atasnya)</p>

<h2>Section 2</h2>
<p>Paragraf ini juga kena h2 + p (karena langsung setelah h2 baru)</p>
```

```css
/* Paragraf pembuka tiap section */
h2 + p {
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: -8px;  /* rapat ke judul */
}
```

### Yang Terjadi di Browser

- Tiap section, **paragraf pertama** (langsung setelah `<h2>`) punya style khusus
- Paragraf kedua, ketiga, dst — tidak kena (karena bukan adjacent)

### Kapan Pakai

- Lead paragraph (paragraf pembuka)
- Error/help text setelah input
- "Penekanan" untuk element pertama setelah element tertentu

### Kapan Jangan

- **Jangan** pakai `+` kalau kamu mau styling **semua** element setelahnya — pakai general sibling (`~`) atau descendant

### Verifikasi

- [ ] `h2 + p` hanya men-style paragraf pertama setelah h2
- [ ] Bukan paragraf kedua/ketiga
- [ ] Inspect Element: lihat di "Styles" panel, rule `h2 + p` aktif di paragraf yang tepat

---

## Bagian D: Attribute Selector (`[attr="value"]`)

### Penjelasan

**Attribute selector** memilih element berdasarkan **atribut HTML**-nya. Sintaks: `[atribut="nilai"]`.

**Kasus pakai umum:**

- `input[type="text"]` — styling input text saja (bukan checkbox, bukan submit)
- `input[type="email"]` — styling input email (misal warna border beda)
- `a[href^="https://"]` — link yang dimulai dengan https (link eksternal)
- `a[href$=".pdf"]` — link ke file PDF
- `[disabled]` — element yang punya atribut disabled (tanpa peduli nilai)

### Wajib Ada di Kode Kamu

- `input[type="text"]` — border biru
- `input[type="email"]` — border hijau
- `input[type="password"]` — border merah
- `a[href^="http"]` — styling link eksternal (misal: icon panah ↗)

### Pola Kode

```html
<input type="text" placeholder="Nama">
<input type="email" placeholder="Email">
<input type="password" placeholder="Password">

<a href="https://google.com">Google (eksternal)</a>
<a href="#tentang">Tentang (internal)</a>
```

```css
input[type="text"] { border-color: blue; }
input[type="email"] { border-color: green; }
input[type="password"] { border-color: red; }

/* Link eksternal (mulai dengan http) */
a[href^="http"] {
  color: blue;
  text-decoration: underline;
}
```

### Yang Terjadi di Browser

- Tiap tipe input punya warna border berbeda (visual cue untuk user)
- Link eksternal (`https://`) berwarna biru + underline
- Link internal (`#anchor`) warna default

### Kapan Pakai

- Form styling berdasarkan tipe input
- Link eksternal vs internal (beda visual)
- File download (PDF, DOC) dengan icon berbeda
- State tertentu (disabled, required, readonly)

### Kapan Jangan

- **Jangan** pakai attribute selector untuk hal yang **lebih baik** dilakukan class. Misal: `class="external-link"` lebih eksplisit daripada `a[href^="http"]`.

### Verifikasi

- [ ] Minimal 3 attribute selector dengan `[type="..."]`
- [ ] Minimal 1 attribute selector dengan `^=` (starts with) atau `$=` (ends with)
- [ ] Inspect Element: lihat "Styles" panel, attribute selector aktif

---

## Bagian E: Pseudo-Class untuk State & Posisi

### Penjelasan

**Pseudo-class** = "keadaan khusus" dari element. Ditulis dengan tanda titik dua (`:`) setelah selector.

Pseudo-class yang sering dipakai:

- **`:hover`** — element saat cursor di atasnya
- **`:focus`** — element saat di-klik/di-tab (input, button, link)
- **`:first-child`** — element pertama di antara siblings-nya
- **`:last-child`** — element terakhir di antara siblings-nya
- **`:nth-child(N)`** — element ke-N (N bisa angka, `odd`, `even`, atau `2n+1`)
- **`:disabled`** — element input/button yang disabled

**Kasus pakai umum:**

- `:hover` di button → warna berubah
- `:first-child` di `<li>` → font lebih tebal untuk item pertama
- `:nth-child(even)` di `<tr>` → warna background selang-seling (zebra stripe)
- `:nth-child(2n+1)` → sama dengan `:nth-child(odd)`

### Wajib Ada di Kode Kamu

- `button:hover` — warna background lebih gelap saat hover
- `li:first-child` — item pertama list ditebalkan
- `li:last-child` — item terakhir tidak ada border-bottom
- `tr:nth-child(even)` — background abu-abu selang-seling di tabel
- `tr:nth-child(odd)` — background putih (atau tidak di-style)

### Pola Kode

```html
<button>Hover saya</button>

<ul>
  <li>Pertama</li>
  <li>Kedua</li>
  <li>Ketiga</li>
  <li>Terakhir</li>
</ul>

<table>
  <tr><td>Baris 1 (ganjil)</td></tr>
  <tr><td>Baris 2 (genap - abu)</td></tr>
  <tr><td>Baris 3 (ganjil)</td></tr>
  <tr><td>Baris 4 (genap - abu)</td></tr>
</table>
```

```css
button:hover {
  background: darkblue;
}

li:first-child {
  font-weight: bold;
  color: navy;
}

li:last-child {
  border-bottom: none; /* hilangkan border di item terakhir */
}

tr:nth-child(even) {
  background: #f0f0f0;
}
```

### Yang Terjadi di Browser

- Hover button → background lebih gelap
- Item pertama list → tebal + warna navy
- Item terakhir list → tidak ada border-bottom
- Tabel: baris genap abu-abu, ganjil putih (zebra stripe)

### Kapan Pakai

- **`:hover`**: untuk interaktivitas (button, link, card)
- **`:first-child` / `:last-child`**: untuk styling posisi khusus (item pertama/terakhir beda)
- **`:nth-child(even)`**: untuk tabel, list panjang — supaya mudah dibaca (eye-tracking)

### Kapan Jangan

- **Jangan** pakai `:hover` di element yang **tidak bisa** di-hover (misal: heading tanpa link)
- **Jangan** pakai `:nth-child(N)` kalau class sudah cukup — class lebih eksplisit

### Verifikasi

- [ ] `:hover` bekerja saat cursor di atas element
- [ ] `:first-child` dan `:last-child` hanya men-style 1 element (pertama/terakhir)
- [ ] `:nth-child(even)` men-style baris genap, `:nth-child(odd)` baris ganjil
- [ ] Inspect Element: tab "Styles" → `:hover` muncul saat kamu Force State (icon cursor di DevTools)

---

## Bagian F: `box-sizing: content-box` vs `border-box` (Visualisasi)

### Penjelasan

Ini sumber **kebingungan #1** pemula CSS. `box-sizing` menentukan **apa yang dihitung** dalam property `width`/`height`.

**`content-box` (default browser):**

- Width = **hanya** content
- Padding & border **menambah** ukuran
- `width: 200px + padding: 20px + border: 5px` = 250px total

**`border-box`:**

- Width = content + padding + border (total **tetap** 200px)
- `width: 200px` sudah termasuk semua
- Padding "menyusup" ke dalam, border "menyusup" ke dalam

### Wajib Ada di Kode Kamu

- 2 box berdampingan: satu `content-box`, satu `border-box`
- Keduanya punya `width: 200px`, `padding: 20px`, `border: 5px solid`
- Background atau border color berbeda untuk visualisasi

### Pola Kode

```html
<div class="box-content">content-box (lebar total 250px)</div>
<div class="box-border">border-box (lebar total 200px)</div>
```

```css
.box-content {
  width: 200px;
  padding: 20px;
  border: 5px solid red;
  background: lightyellow;
  box-sizing: content-box; /* default — tidak perlu ditulis */
}

.box-border {
  width: 200px;
  padding: 20px;
  border: 5px solid blue;
  background: lightgreen;
  box-sizing: border-box; /* HARUS ditulis manual */
}
```

### Yang Terjadi di Browser

- Box **kuning** (`content-box`) lebih besar dari box **hijau** (`border-box`) — walaupun `width` keduanya 200px
- Inspect Element: klik box → tab "Computed" → lihat ukuran total di "Rendered" atau ukur dengan DevTools ruler

### Aturan Penting

- **`border-box` adalah best practice.** Selalu set di awal CSS:
  ```css
  * { box-sizing: border-box; }
  ```
- Dengan `border-box`, kamu bisa `width: 50%` dan **yakin** lebarnya 50% dari parent — tidak peduli padding/border

### Kapan Pakai

- **Selalu** `border-box` (kecuali ada alasan spesifik pakai `content-box`)
- Sudah dibahas di soal 01, di sini divisualisasikan

### Verifikasi

- [ ] 2 box dengan width sama, tapi ukuran visual berbeda
- [ ] Ukur dengan DevTools ruler / Inspect → "Computed" → cek total width
- [ ] `* { box-sizing: border-box; }` di paling atas CSS (dari soal 01)

---

## Bagian G: Visualisasi 4 Lapis Box Model dengan Warna

### Penjelasan

Box model punya **4 lapis** (dari dalam ke luar): content, padding, border, margin. Tanpa visualisasi, sulit membayangkan "margin ada di mana, padding ada di mana".

**Cara memvisualisasikan:**

- Pakai **warna berbeda** untuk tiap lapis
- `background-color` di element → mewarnai content + padding
- `background-clip` bisa diatur per-lapis (advanced)
- Inspect Element (F12) → tab "Computed" → lihat box model di kanan

### Wajib Ada di Kode Kamu

- Minimal 1 box dengan 4 lapis "terlihat" (warna berbeda)
- Demo di Inspect Element (Computed → Box Model)
- Penjelasan ringkas: **warna apa untuk apa**

### Pola Kode

```css
.box-demo {
  width: 200px;
  height: 100px;

  /* Content area (background) */
  background: lightblue;

  /* Padding (jarak dalam) */
  padding: 20px;
  /* Padding area = background yang melebar sampai padding */
  /* Trik: background-color menutupi content + padding */

  /* Border (garis tepi) */
  border: 5px solid orange;

  /* Margin (jarak luar) */
  margin: 30px;
  /* Margin area = transparan (tidak ada warna, hanya ruang) */
}
```

**Cara Inspect:**

1. Klik kanan box → Inspect Element
2. Tab "Computed" di panel kanan
3. Scroll ke bawah → ada visualisasi box model dengan 4 warna:
   - **Biru** = content
   - **Hijau** = padding
   - **Kuning** = border
   - **Oranye** = margin

### Yang Terjadi di Browser

- Box kelihatan dengan border orange dan background lightblue
- Ruang margin di luar box (transparan, tapi dorong element lain)
- Inspect → Computed → ada diagram box model

### Verifikasi

- [ ] Box dengan 4 lapis terlihat (background, border, margin)
- [ ] Inspect → Computed → box model diagram muncul dengan 4 warna
- [ ] Bisa identifikasi: warna apa = lapis apa

---

## Ringkasan: Kapan Pakai Selector Apa

**Universal & Element:**

- `*` → semua element (untuk reset)
- `h1 { }` → semua tag `<h1>`

**Class & ID:**

- `.card { }` → element dengan class="card" (boleh banyak)
- `#header { }` → element dengan id="header" (harus 1)

**Group & Descendant:**

- `h1, h2, h3 { }` → beberapa selector sekaligus
- `.card p { }` → semua `<p>` di dalam `.card` (kapan saja)

**Child & Sibling:**

- `.menu > li { }` → hanya `<li>` **anak langsung**
- `h2 + p { }` → `<p>` yang **langsung mengikuti** `<h2>`

**Attribute:**

- `input[type="text"] { }` → berdasarkan atribut `type="text"`
- `a[href^="http"] { }` → link yang **mulai dengan** "http"

**Pseudo-class (state):**

- `button:hover { }` → saat cursor di atas
- `input:focus { }` → saat input di-klik/di-tab
- `input:disabled { }` → saat input disabled

**Pseudo-class (posisi):**

- `li:first-child { }` → element pertama
- `li:last-child { }` → element terakhir
- `tr:nth-child(even) { }` → baris genap (zebra)
- `tr:nth-child(odd) { }` → baris ganjil

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 03, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **5 selector dasar** (dari soal 01) masih ada
- [ ] **4 selector baru** (child, adjacent, attribute, pseudo-class) sudah dipakai
- [ ] **Box-sizing** di-set ke `border-box` di `*`
- [ ] **Demo box-sizing**: 2 box berdampingan dengan width sama tapi ukuran visual berbeda
- [ ] **Visualisasi box model**: ada box dengan 4 lapis terlihat
- [ ] **Browser menampilkan**:
  - Menu dengan item bersarang → child selector hanya kena anak langsung
  - Paragraf pembeda setelah `<h2>` → adjacent sibling bekerja
  - Input text/email/password → border color berbeda (attribute selector)
  - Tabel/list dengan zebra stripe → `:nth-child(even)` bekerja
  - Button hover → warna berubah

---

## Cara Submit

1. Buka `code/02-selector-dan-box-model.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Eksperimen**: hapus/komentar satu selector, lihat perubahannya
6. **Tambah selector baru** yang ingin kamu coba (misal `:focus`, `:disabled`)
7. Verifikasi dengan checklist di atas
8. Kalau PASS, lanjut ke `soal/03-flexbox.md`

---

## Catatan untuk Pemula

> **Selector specificity (urutan kekuatan):** `ID > Class > Attribute/Pseudo-class > Element > Universal (*)`. Makin spesifik, makin menang. Misal: `.card` lebih kuat dari `div`, tapi `#header` lebih kuat dari `.card`.
>
> **Descendant (spasi) vs Child (`>`) — ini yang sering bingung.** Descendant = "kapan saja di dalam, berapa level". Child = "langsung satu level". Default-nya pakai descendant (lebih fleksibel). Pakai child kalau kamu **sengaja** mau membatasi.
>
> **Attribute selector dengan `^=` (starts with) berguna untuk link eksternal.** `a[href^="http"]` akan kena link ke `https://google.com`, `http://...`, tapi tidak kena link internal `#tentang` atau `/about`.
>
> **`:hover` di non-interactive element sering tidak berguna.** Misal: `h1:hover` bekerja (h1 bisa di-hover), tapi **tidak ada efek visual** kecuali kamu tambah style. Pakai `:hover` di element yang memang interaktif (button, link, card dengan cursor pointer).
>
> **`:nth-child` mulai hitung dari 1, bukan 0.** `li:nth-child(1)` = item pertama, `li:nth-child(2)` = item kedua. `0` tidak valid. Pakai `even`/`odd` untuk selang-seling, atau `2n+1` untuk ganjil.
>
> **`box-sizing: border-box` WAJIB di awal project.** Ini bukan opsional. Tanpa ini, layout kamu akan "bocor" — element lebih besar dari yang kamu kira. Set di `*` agar universal.

<!-- markdownlint-enable MD024 MD028 -->

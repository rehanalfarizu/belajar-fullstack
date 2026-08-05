<!-- markdownlint-disable MD024 MD028 -->

# SOAL 04 — Card Component

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **anatomi card component**: container, header, body, footer
- Membuat **4 jenis card**: Profile, Product, Stat, Feature
- Menggunakan **avatar circle** dengan `border-radius: 50%`
- Membuat **badge dengan position absolute** untuk label promo/new
- Menerapkan **gradient background** untuk visual impact
- Membuat **hover effects** (lift, scale, shadow) dengan `transition`

**Topik:** card pattern, badge, gradient, transition, hover effects, transform

**Referensi utama:**

- [MDN: Box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- [MDN: Transition](https://developer.mozilla.org/id/docs/Web/CSS/transition)
- [MDN: Transform](https://developer.mozilla.org/id/docs/Web/CSS/transform)
- [MDN: Linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)

**Difficulty:** Pemula–Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Card adalah **komponen paling umum** di web modern. Hampir semua website punya card: Twitter/X (post), Tokopedia (produk), LinkedIn (profil), Notion (page). Card adalah **container serbaguna** yang membungkus informasi jadi 1 unit visual.

Yang akan kamu bangun adalah **4 jenis card** dalam 1 halaman:

1. **Profile Card** — avatar, nama, role, bio, social links
2. **Product Card** — gambar, nama, harga, deskripsi, tombol "Beli", badge "Sale"
3. **Stat Card** — angka besar, label, gradient background
4. **Feature Card** — icon, judul, deskripsi, hover scale

Setelah selesai, kamu akan punya **"card library"** yang bisa kamu pakai ulang di project lain.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logikanya
2. **Lihat Yang Terjadi di Browser** — bayangkan output
3. **Ketik dari 0** di `code/04-card-component.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah warna, padding, shadow, hover effect

---

## Bagian A: Anatomi Card & Base Style

### Penjelasan

Card pada dasarnya adalah **container** dengan styling minimal:

- **`background`** (warna dasar, biasanya putih)
- **`border-radius`** (sudut membulat, modern look)
- **`padding`** (jarak dalam, agar konten tidak nempel ke tepi)
- **`box-shadow`** (bayangan halus, memberi efek "terangkat")
- **`width`** (terbatas, tidak full-width)

**Analogi:** Card seperti **kartu nama fisik** — ada background, sudut membulat, isi di tengah.

### Wajib Ada di Kode Kamu

- Class `.card` dengan: `background: white`, `border-radius: 12px`, `padding: 24px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- Bungkus konten apa saja di dalam `.card` untuk lihat efeknya

### Pola Kode

```html
<div class="card">
  <h3>Judul Card</h3>
  <p>Ini konten di dalam card. Padding membuat teks tidak nempel ke tepi.</p>
</div>
```

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* bayangan halus */
  max-width: 320px; /* batas lebar */
}
```

### Yang Terjadi di Browser

- Kotak putih dengan sudut membulat
- Bayangan halus di bawah & samping
- Konten di dalam punya jarak dari tepi (padding)

### Verifikasi

- [ ] Class `.card` punya 5 property di atas
- [ ] Box terlihat "terangkat" dari background (karena shadow)
- [ ] Sudut membulat terlihat jelas

---

## Bagian B: Layout Container dengan Flexbox

### Penjelasan

Untuk menampilkan **beberapa card** dalam 1 halaman, kamu butuh container Flexbox (dari soal 03) dengan:

- `display: flex`
- `flex-wrap: wrap` (supaya card turun ke baris baru)
- `gap: 16px` (jarak antar card)

**Kasus pakai:** Halaman portfolio (multiple card), product listing, dashboard dengan multiple widget.

### Wajib Ada di Kode Kamu

- Container dengan 4 card (1 profile, 1 product, 1 stat, 1 feature)
- Container styling: `display: flex; flex-wrap: wrap; gap: 16px; padding: 16px`
- Tiap card punya lebar konsisten (misal `flex: 1; min-width: 250px`)

### Pola Kode

```html
<div class="card-container">
  <div class="card profile-card">...</div>
  <div class="card product-card">...</div>
  <div class="card stat-card">...</div>
  <div class="card feature-card">...</div>
</div>
```

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: #f0f0f0; /* background halaman agar card terlihat */
}

.card {
  flex: 1;
  min-width: 250px;
  /* base style dari Bagian A */
}
```

### Yang Terjadi di Browser

- 4 card berjajar horizontal
- Saat browser kecil, card turun ke baris baru (responsive)
- Gap antar card konsisten (16px)

### Verifikasi

- [ ] Container punya `display: flex; flex-wrap: wrap; gap: 16px`
- [ ] Resize browser: card turun ke baris baru
- [ ] Tidak ada card yang terlalu kecil (`min-width: 250px`)

---

## Bagian C: Profile Card (Avatar Circle)

### Penjelasan

Profile card adalah pola paling umum di web: avatar + identitas + bio + social links.

**Avatar circle** dibuat dengan:

- `<img>` dengan `width` dan `height` sama
- `border-radius: 50%` (lingkaran sempurna)
- `object-fit: cover` (gambar tidak distorsi)

### Wajib Ada di Kode Kamu

- Avatar image (pakai placeholder atau emoji)
- `border-radius: 50%` di avatar
- Nama, role/posisi, bio singkat
- Minimal 3 social link (text atau icon sederhana)

### Pola Kode

```html
<div class="card profile-card">
  <img src="https://i.pravatar.cc/100" alt="Avatar" class="avatar">
  <h3 class="name">Andi Wijaya</h3>
  <p class="role">Frontend Developer</p>
  <p class="bio">Suka coding dan mengajar. Sekarang fokus di React dan CSS.</p>
  <div class="social-links">
    <a href="#">Twitter</a>
    <a href="#">GitHub</a>
    <a href="#">LinkedIn</a>
  </div>
</div>
```

```css
.profile-card {
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;  /* ← ini yang bikin bulat */
  object-fit: cover;
  margin: 0 auto 16px; /* center horizontal */
  display: block;
}

.name {
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.role {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.bio {
  color: #475569;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-links a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.9rem;
}
```

### Yang Terjadi di Browser

- Avatar **bulat sempurna** (bukan kotak)
- Nama di tengah, role abu-abu, bio hitam
- Social links di tengah dengan jarak antar link

### Kapan Pakai

- **Halaman about / team** di website
- **User profile** di dashboard
- **Testimonial** dengan foto
- **Contact list** dengan avatar

### Verifikasi

- [ ] Avatar bulat sempurna (bukan kotak, bukan oval)
- [ ] Nama + role + bio center horizontal
- [ ] Social links punya jarak (`gap`)

---

## Bagian D: Product Card dengan Badge Absolute

### Penjelasan

Product card adalah pola di e-commerce. Punya **gambar, harga, tombol, dan sering badge** (label "Sale", "New", "-50%").

**Badge dengan `position: absolute`** butuh:

- **Parent** (card) → `position: relative` (sebagai anchor)
- **Badge** → `position: absolute; top: ...; right: ...` (posisi relatif ke parent)
- `z-index: 1` (supaya di atas gambar)

### Wajib Ada di Kode Kamu

- Gambar produk (placeholder)
- Nama produk, harga, harga diskon (strikethrough)
- Tombol "Beli" (full-width)
- Badge "Sale" / "-50%" di pojok kanan atas gambar

### Pola Kode

```html
<div class="card product-card">
  <div class="product-image">
    <img src="https://picsum.photos/300/200" alt="Produk">
    <span class="badge">-50%</span>
  </div>
  <div class="product-info">
    <h3>Sepatu Sneakers</h3>
    <p class="price">
      <span class="original">Rp 500.000</span>
      <span class="discount">Rp 250.000</span>
    </p>
    <button class="btn-beli">Beli</button>
  </div>
</div>
```

```css
.product-card {
  position: relative; /* anchor untuk badge */
}

.product-image {
  position: relative; /* anchor untuk badge */
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 1; /* di atas gambar */
}

.product-info h3 {
  margin-bottom: 8px;
}

.price {
  margin-bottom: 12px;
}

.original {
  color: #94a3b8;
  text-decoration: line-through; /* coret harga asli */
  margin-right: 8px;
}

.discount {
  color: #ef4444;
  font-weight: bold;
  font-size: 1.1rem;
}

.btn-beli {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-beli:hover {
  background: #2563eb;
}
```

### Yang Terjadi di Browser

- Gambar produk di atas, nama + harga + tombol di bawah
- Badge "**-50%**" merah di pojok **kanan atas** gambar
- Harga asli **dicoret** (line-through), harga diskon merah bold
- Tombol "Beli" **full-width** dengan background biru

### Aturan Penting

- **`position: absolute` butuh parent dengan `position: relative`** (atau non-static). Tanpa ini, badge akan nempel ke `<body>`.
- **Urutan parent-child**: card (relative) → product-image (relative) → badge (absolute). Badge absolute ke product-image (bukan langsung ke card).

### Kapan Pakai

- **E-commerce** listing produk
- **Course platform** dengan label "Best Seller"
- **News portal** dengan label "Breaking"

### Verifikasi

- [ ] Badge "Sale" / "-50%" ada di pojok kanan atas gambar
- [ ] Badge tidak keluar dari card (tetap di dalam)
- [ ] Tombol "Beli" full-width
- [ ] Harga asli ada `text-decoration: line-through`

---

## Bagian E: Stat Card dengan Gradient

### Penjelasan

**Stat card** menampilkan **1 angka/data besar** dengan label. Sering di dashboard analytics. Biasanya punya:

- Background **gradient** (lebih eye-catching)
- Angka **besar dan tebal**
- Label **kecil** di bawah

**Gradient CSS** ada 2 jenis umum:

- `linear-gradient(arah, warna1, warna2)` — garis lurus
- `radial-gradient(...)` — lingkaran dari tengah

### Wajib Ada di Kode Kamu

- Stat card dengan **gradient background** (misal biru-ungu)
- Angka besar di tengah
- Label kecil di bawah angka
- Teks putih di atas gradient (kontras)

### Pola Kode

```html
<div class="card stat-card">
  <div class="stat-icon">📊</div>
  <div class="stat-number">1,250</div>
  <div class="stat-label">Pengguna Aktif</div>
</div>
```

```css
.stat-card {
  background: linear-gradient(135deg, #667eea, #764ba2); /* biru ke ungu */
  color: white;
  text-align: center;
  padding: 32px 24px;
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9; /* sedikit transparan */
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

### Yang Terjadi di Browser

- Card dengan background **gradient biru-ungu** (135deg = diagonal)
- Icon/emoji besar, angka **sangat besar dan tebal**, label kecil
- Semua teks **putih** di atas gradient

### Kapan Pakai

- **Dashboard analytics** (pengguna aktif, revenue, conversion)
- **Hero section** dengan stat singkat
- **Achievement section** (jumlah download, user, dst)

### Verifikasi

- [ ] Background gradient terlihat (bukan warna solid)
- [ ] Angka dominan di tengah card
- [ ] Teks putih terbaca jelas di atas gradient

---

## Bagian F: Feature Card dengan Hover Scale

### Penjelasan

Feature card menampilkan **1 fitur/icon + judul + deskripsi**. Sering di landing page "Why choose us?". Punya **hover effect** untuk interaktivitas.

**Hover effect** yang umum:

- **`transform: translateY(-4px)`** — card "terangkat" sedikit
- **`transform: scale(1.02)`** — card "membesar" sedikit
- **`box-shadow` lebih dalam** — bayangan lebih kuat

**WAJIB:** taruh `transition` di element **asalnya** (bukan di `:hover`), supaya perubahan halus.

### Wajib Ada di Kode Kamu

- Feature card dengan icon + judul + deskripsi
- `transition` di `.feature-card`
- `:hover` dengan `transform: scale(1.05)` ATAU `translateY(-8px)`
- `box-shadow` lebih dalam saat hover

### Pola Kode

```html
<div class="card feature-card">
  <div class="feature-icon">⚡</div>
  <h3>Cepat</h3>
  <p>Loading di bawah 1 detik. Pengalaman pengguna yang mulus.</p>
</div>
```

```css
.feature-card {
  text-align: center;
  padding: 32px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* ↑ transition di element ASAL, bukan di :hover */
}

.feature-card:hover {
  transform: translateY(-8px); /* card terangkat */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  /* shadow lebih dalam */
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  background: #eff6ff;
  border-radius: 50%; /* icon circle */
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card h3 {
  margin-bottom: 12px;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  font-size: 0.9rem;
}
```

### Yang Terjadi di Browser

- Icon dalam **lingkaran biru muda** (icon circle)
- Judul + deskripsi di tengah
- Saat cursor di atas: card **terangkat 8px** + shadow lebih dalam
- Perubahan **halus** (0.3s transition, bukan langsung)

### Kapan Pakai

- **Landing page** section "Features" atau "Why choose us"
- **Pricing card** dengan hover lift
- **Portfolio item** dengan hover zoom

### Verifikasi

- [ ] Hover: card terangkat / scale (transform aktif)
- [ ] Hover: shadow lebih dalam
- [ ] Transisi **halus** (0.2-0.3s), bukan langsung
- [ ] `transition` di element **asal**, BUKAN di `:hover`

---

## Ringkasan: Pola Card

**Base card (wajib di semua card):**

- `background: white` (atau gradient untuk special)
- `border-radius: 8-16px`
- `padding: 16-32px`
- `box-shadow: 0 2-8px rgba(0,0,0,0.1)`
- `transition: transform 0.3s, box-shadow 0.3s`

**Varian card:**

- **Profile** → avatar `border-radius: 50%`, text-align center, social links flex
- **Product** → image (object-fit cover), badge `position: absolute`, button full-width
- **Stat** → background `linear-gradient`, angka `font-size: 2.5-3rem`, color white
- **Feature** → icon circle, hover `transform` + `box-shadow` lebih dalam

**Pattern tambahan:**

- **Avatar bulat** → `border-radius: 50%; width = height; object-fit: cover`
- **Badge absolute** → parent `position: relative`, badge `position: absolute; top/right: ...`
- **Hover lift** → `transition` di asal, `:hover { transform: translateY(-Npx); }`
- **Full-width button** → `width: 100%`

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 05, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **4 card** sudah dibuat: Profile, Product, Stat, Feature
- [ ] **Container** punya flex + wrap (responsive)
- [ ] **Profile card**: avatar bulat, text center
- [ ] **Product card**: badge di pojok kanan atas gambar
- [ ] **Stat card**: gradient background, teks putih
- [ ] **Feature card**: hover effect (transform + shadow)
- [ ] **Transisi halus** (transition ada di asal, bukan di :hover)
- [ ] **Box-shadow** ada di setiap card
- [ ] **Border-radius** ada di setiap card
- [ ] **Browser menampilkan**:
  - 4 card berjajar (atau tersusun rapi)
  - Profile: avatar bulat sempurna
  - Product: badge "Sale" / "New" terlihat
  - Stat: gradient background jelas
  - Feature: hover lift saat cursor di atas

---

## Cara Submit

1. Buka `code/04-card-component.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Eksperimen**:
   - Ubah shadow, padding, border-radius — lihat perubahannya
   - Coba warna card berbeda (light theme, dark theme)
   - Tambah card baru dengan variasi sendiri
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/05-grid-system.md`

---

## Catatan untuk Pemula

> **Card component adalah pattern yang paling sering dipakai di web development.** Hampir semua website modern punya card: Twitter (post), Tokopedia (produk), LinkedIn (profil), Notion (page). Setelah paham card, kamu sudah bisa buat 80% layout website.
>
> **`:hover` dengan `transform` perlu `transition` di element asalnya.** Kalau `transition` cuma di `:hover`, perubahan jadi **langsung** (bukan halus). Aturan: taruh `transition` di selector utama, bukan di pseudo-class.
>
> **`position: absolute` perlu parent dengan `position: relative`.** Tanpa parent yang non-static (relative/absolute/fixed/sticky), element absolute akan nempel ke `<body>` atau ke ancestor terdekat yang punya position. Untuk badge, anchor-nya biasanya card (parent langsung).
>
> **Box-shadow: `0 2px 8px rgba(0,0,0,0.1)` adalah "sweet spot" untuk card.** Shadow terlalu kecil = tidak terasa, shadow terlalu besar = terlihat murahan. 0 2-4px dengan opacity 0.1 = standar industri.
>
> **`border-radius: 50%` untuk avatar/lingkaran sempurna.** Tapi butuh `width = height` (misal keduanya 80px). Kalau width ≠ height, hasilnya **ellipse** (lonjong), bukan circle.
>
> **`object-fit: cover` untuk gambar yang di-crop.** Tanpa `object-fit`, gambar akan di-stretch (distorsi). Dengan `cover`, gambar di-crop proporsional untuk memenuhi container. Penting untuk product image yang aslinya tidak square.

<!-- markdownlint-enable MD024 MD028 -->

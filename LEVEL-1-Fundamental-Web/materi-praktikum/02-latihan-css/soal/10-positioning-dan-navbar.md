<!-- markdownlint-disable MD024 MD028 -->

# SOAL 10 — CSS Position & Navbar

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan **5 value `position`** — `static`, `relative`, `absolute`, `fixed`, `sticky` — beserta perbedaan dan kapan pakainya
- Memahami **stacking context** dan cara kerja **`z-index`** (termasuk jebakan "child 9999 tidak selalu di atas")
- Membuat **fixed navbar** yang tetap di atas saat halaman di-scroll
- Membuat **sticky header / sidebar** yang nempel saat scroll tapi berhenti di parent
- Membuat **dropdown menu** dengan `relative` parent + `absolute` child
- Membuat **card dengan absolute badge** (NEW, SALE, HOT) dan **category tag** di pojok card
- Membuat **float label input** dengan `position: absolute` + `transform`
- Membuat **back-to-top button** dengan `position: fixed`
- Memahami jebakan **`overflow: hidden`** yang bisa "memotong" child absolute

**Topik:** CSS `position`, `top/right/bottom/left`, `inset`, `z-index`, stacking context, navbar, dropdown, sticky, tooltip, badge, overlay.

**Referensi utama:**

- [MDN: CSS `position`](https://developer.mozilla.org/id/docs/Web/CSS/position)
- [MDN: CSS `z-index`](https://developer.mozilla.org/id/docs/Web/CSS/z-index)
- [MDN: Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
- [MDN: `inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/inset)
- [CSS-Tricks: Position](https://css-tricks.com/almanac/properties/p/position/)

**Difficulty:** Lanjutan • **Estimasi:** 80-110 menit

---

## Briefing

Di soal 03-05 kamu sudah belajar **Flexbox** & **Grid** untuk layout. Itu sudah cukup untuk **layout normal** (header, sidebar, main, footer — semua di "tempatnya" masing-masing).

Tapi ada situasi di mana sebuah element **harus keluar dari alur normal**:

- Navbar yang **tetap di atas** saat halaman di-scroll
- Header section yang **nempel** di bawah navbar saat scroll dalam section itu
- Dropdown menu yang **tumpang tindih** dengan konten di bawahnya
- Badge "NEW" / "SALE" yang **menjorok keluar** dari pojok card
- Back-to-top button yang **nempel di pojok kanan bawah** viewport
- Label form yang **mengambang** ke atas saat input difokuskan
- Tooltip / overlay yang **menutupi** element lain

Semua ini **tidak bisa** dilakukan dengan Flex/Grid saja. Kamu butuh **CSS `position` property** — senjata untuk element yang "lari" dari alur normal.

Yang akan kamu bangun adalah **1 halaman** dengan 6 pattern position yang umum dipakai di production:

1. **Fixed navbar** dengan logo, link, dan tombol hamburger (mobile)
2. **Sticky header** di bawah navbar (nempel saat scroll, berhenti di parent)
3. **Dropdown menu** dengan anchor `relative` + child `absolute`
4. **Card dengan absolute badge & category tag**
5. **Float label input** dengan label yang mengambang saat focus
6. **Back-to-top button** yang `fixed` di pojok kanan bawah

Setelah selesai, kamu akan paham **kapan pakai position apa** dan kenapa Flex/Grid saja tidak cukup untuk UI modern.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logika & visualisasi position-nya
2. **Lihat Yang Terjadi di Browser** — bayangkan output
3. **Ketik dari 0** di `code/10-positioning-dan-navbar.html`, cari komentar `/* TODO */`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah `top/right/bottom/left`, ubah `z-index`, lihat perubahannya

---

## Bagian A: Konsep `position` (5 Value)

### Penjelasan

**`position`** menentukan **bagaimana sebuah element diposisikan** di halaman. Ada 5 value utama, masing-masing dengan perilaku berbeda.

- **`static`** → **Default**. Element mengikuti alur dokumen biasa. Tidak keluar dari alur normal. (Hampir tidak pernah ditulis eksplisit — hanya untuk override.)
- **`relative`** → Element tetap di posisi normalnya, tapi bisa di-move dengan `top/right/bottom/left`. **Tidak** keluar dari alur normal (ruang tetap dipesan). Sering dipakai sebagai **anchor** untuk child `absolute`.
- **`absolute`** → Element **diambil dari alur normal**, diposisikan relatif ke **ancestor terdekat yang punya `position`** (selain `static`). Kalau tidak ada ancestor dengan `position`, dia relatif ke `<html>`/viewport. Cocok untuk element yang harus presisi (tooltip, badge, dropdown, modal).
- **`fixed`** → Element **diambil dari alur normal**, diposisikan relatif ke **viewport** (tetap saat scroll). Cocok untuk navbar, back-to-top, chat widget. Bisa "bocor" kalau ancestor punya `transform`, `filter`, atau `perspective`.
- **`sticky`** → Element **mengikuti alur normal** sampai titik tertentu, lalu **"stick"** (nempel) saat scroll. Hybrid: relative + fixed. Cocok untuk sidebar, table header, breadcrumb. **Wajib** set `top/bottom/left/right` agar bekerja.

**Visualisasi mental:**

```
position: static    → Element di posisi normal (default, tidak bisa di-offset)
position: relative  → Element di posisi normal + offset (top/left geser)
position: absolute  → Element "lari" ke koordinat tertentu, RELATIF ke ancestor
position: fixed     → Element "lari" ke koordinat tertentu, RELATIF ke viewport (tetap saat scroll)
position: sticky    → Element flow normal sampai top: 0, lalu nempel
```

### Wajib Ada di Kode Kamu

- Memahami perbedaan 5 value di atas (tidak perlu demo terpisah — akan dipakai di bagian B-F)

### Pola Kode (Ringkas)

```css
.static   { position: static; }                         /* default browser */
.relative { position: relative; top: 20px; left: 30px; } /* offset, ruang tetap ada */
.absolute { position: absolute; top: 0; right: 0; }     /* relatif ke ancestor positioned */
.fixed    { position: fixed; top: 16px; right: 16px; }  /* relatif ke viewport */
.sticky   { position: sticky; top: 16px; }              /* hybrid: relative → fixed */
```

### Jebakan Umum

> **`position: absolute` RELATIF ke ancestor terdekat yang punya `position`** (selain `static`). Kalau tidak ada ancestor dengan `position`, dia relatif ke `<html>` (yang berarti "full halaman").

> **`position: fixed` bisa "bocor"** kalau ancestor punya `transform`, `filter`, atau `perspective` — itu akan jadi containing block-nya, bukan viewport. Trik: debug di DevTools, lihat "containing block" di panel Computed.

> **`position: sticky` butuh `top` (atau `bottom/left/right`)** untuk bekerja. Tanpa salah satunya, dia sama saja dengan `relative`. Dan parent flex container **wajib** `align-items: flex-start` (default `stretch` meregangkan dan sticky tidak bekerja).

> **`overflow: hidden` di parent akan memotong child `absolute` yang keluar dari parent.** Ini sering jadi "bug misterius" — badge tidak muncul, tooltip terpotong, dll. Solusi: hapus `overflow: hidden` di parent, atau pindahkan anchor ke parent yang lebih luar.

### Verifikasi

- [ ] Pahami kapan pilih `relative` vs `absolute` vs `fixed` vs `sticky`
- [ ] Bisa menjelaskan kenapa `fixed` bisa "bocor" di ancestor dengan `transform`
- [ ] Tahu kenapa `sticky` butuh `align-items: flex-start` di flex parent

---

## Bagian B: Fixed Navbar

### Penjelasan

**Fixed navbar** adalah pola paling umum: navbar di atas halaman yang **tetap terlihat** saat user scroll ke bawah. Ini pakai `position: fixed` + `top: 0` + `z-index` tinggi.

**Tapi hati-hati:** karena `fixed` **menghapus element dari alur normal**, konten di bawahnya akan **naik** (tertutup navbar). Solusinya: tambah `padding-top` di `body` (atau `<div>` spacer) setinggi navbar.

Untuk layering, navbar pakai **`z-index` tinggi** (mis. `1000`) supaya selalu di atas konten lain, termasuk dropdown, modal, dll.

### Wajib Ada di Kode Kamu

- Navbar dengan `position: fixed; top: 0; left: 0; right: 0`
- `z-index: 1000` (di atas element lain)
- Height: 64px
- Background solid + box-shadow
- Display flex: `space-between` logo dan menu
- Padding horizontal 24px
- Link dengan `transition: background 0.2s, color 0.2s` di element asal
- Tombol hamburger (display none di desktop)

### Pola Kode

```html
<nav class="navbar-fixed">
  <a href="#" class="logo">MyApp</a>
  <div class="nav-links">
    <a href="#" class="active">Beranda</a>
    <a href="#">Produk</a>
    <a href="#">Layanan</a>
    <a href="#">Harga</a>
    <a href="#">Kontak</a>
  </div>
  <button class="hamburger" aria-label="Menu">☰</button>
</nav>

<!-- Push content down (kompensasi navbar fixed setinggi 64px) -->
<div style="height:64px;"></div>
```

```css
.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1e293b;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar-fixed .logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  flex-shrink: 0; /* jangan menyusut saat menu panjang */
}

.navbar-fixed .nav-links {
  display: flex;
  gap: 8px;
}

.navbar-fixed .nav-links a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  /* transition HARUS di element asal, bukan di :hover */
  transition: background 0.2s, color 0.2s;
}

.navbar-fixed .nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.navbar-fixed .nav-links a.active {
  background: #3b82f6;
  color: white;
}

.navbar-fixed .hamburger {
  display: none; /* tampilkan di mobile dengan media query */
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
```

### Yang Terjadi di Browser

- Navbar **nempel di paling atas**, full-width, tinggi 64px
- Background abu-abu gelap dengan shadow halus di bawah
- Logo "MyApp" di kiri, menu link di kanan (Flexbox)
- **Scroll ke bawah**: navbar **tetap di atas** viewport, konten lewat di bawahnya
- Link "Beranda" punya background biru (state `active`)
- Hover ke link → background putih transparan muncul halus (0.2s)
- Tombol hamburger ☰ **tersembunyi** di desktop, akan muncul saat viewport kecil (mobile)

### Kapan Pakai

- **Hampir semua website modern** punya fixed/sticky navbar
- Admin dashboard (topbar + sidebar keduanya fixed)
- Landing page (navbar transparan di hero, jadi solid saat scroll)

### Kapan Jangan

- **Jangan** pakai `position: fixed` untuk **footer** — footer harus di akhir konten, ikut scroll
- **Jangan** lupa tambah kompensasi tinggi navbar di body — konten akan tertutup

### Verifikasi

- [ ] Navbar nempel di atas, full-width
- [ ] `z-index: 1000` (di atas konten lain)
- [ ] Logo di kiri, menu di kanan (Flexbox)
- [ ] Scroll ke bawah: navbar tetap di atas, konten lewat di bawah
- [ ] Konten **tidak tertutup** (ada spacer/div setinggi 64px)
- [ ] Hover ke link → background berubah halus (transition 0.2s)
- [ ] Tombol hamburger `display: none` di desktop

---

## Bagian C: Sticky Header (dalam Section)

### Penjelasan

**Sticky** adalah hybrid antara `relative` dan `fixed`:

- Bersifat **relative** sampai user scroll mencapai threshold (`top`)
- Lalu **nempel** (seperti `fixed`) saat scroll
- **Berhenti** saat parent container keluar dari viewport

Bedanya dengan `fixed`:

- **`fixed`** → selalu nempel di posisi yang sama di viewport, **tidak peduli** parent
- **`sticky`** → nempel hanya **di dalam parent**, ikut hilang saat parent keluar viewport

Cocok untuk: section header yang nempel saat scroll konten section itu, sidebar daftar isi, table header, breadcrumb.

### Wajib Ada di Kode Kamu

- Header dengan `position: sticky; top: 64px` (di bawah navbar fixed 64px)
- Background solid + box-shadow
- `z-index: 100` (di bawah navbar 1000, di atas konten biasa)
- Konten panjang (lorem ipsum) di bawahnya agar bisa di-scroll

### Pola Kode

```html
<div class="sticky-header">
  <h2>Sticky Header — tetap di atas saat scroll dalam section ini</h2>
</div>

<div style="padding: 24px; max-width: 700px; margin: 0 auto;">
  <p>Scroll ke bawah untuk melihat sticky header nempel di bawah navbar.</p>
  <p>Section ini panjang, jadi ada cukup ruang untuk scroll.</p>
  <p>Saat section ini keluar dari viewport, sticky header ikut hilang.</p>
</div>
```

```css
.sticky-header {
  position: sticky;
  top: 64px; /* = tinggi navbar fixed */
  z-index: 100;
  background: #3b82f6;
  color: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sticky-header h2 {
  color: white;
  font-size: 1.25rem;
  margin: 0;
}
```

### Yang Terjadi di Browser

- Header biru nempel di bawah navbar abu-abu (top: 64px)
- **Scroll ke bawah dalam section**: header biru **tetap di bawah navbar** (sticky)
- **Scroll terus sampai section keluar viewport**: header biru **ikut hilang** (karena keluar parent)
- Beda dengan navbar fixed yang **selalu** ada di atas

### Kapan Pakai Sticky vs Fixed

- **`sticky`** → sidebar, table header, breadcrumb, section header. Nempel hanya di dalam parent.
- **`fixed`** → navbar global, back-to-top, chat widget. Selalu nempel di viewport, tidak peduli parent.

### Jebakan Umum

> **`align-items: flex-start` WAJIB di flex parent** agar sticky bekerja. Default `stretch` meregangkan element dan `position: sticky` jadi tidak efektif. Kalau sticky kamu tidak jalan, cek dulu parent-nya.

> **`top` (atau `bottom/left/right`) WAJIB** di sticky. Tanpa salah satunya, sticky = relative biasa.

> **Parent tidak boleh punya `overflow: hidden`** (atau `auto`/`scroll`). `overflow` di parent akan "memotong" sticky dan dia tidak bisa nempel ke viewport.

### Verifikasi

- [ ] Sticky header `position: sticky; top: 64px`
- [ ] Scroll dalam section → header nempel di bawah navbar
- [ ] Scroll terus sampai section keluar → header ikut hilang
- [ ] `z-index: 100` (di bawah navbar, di atas konten)
- [ ] Parent tidak punya `overflow: hidden`

---

## Bagian D: Dropdown Menu (Absolute dalam Relative)

### Penjelasan

Dropdown menu adalah **pattern position paling umum di web**: klik/hover tombol, daftar opsi muncul di bawahnya.

**Triknya:**

- **Parent** (container) → `position: relative` (sebagai **anchor**)
- **Child** (dropdown menu) → `position: absolute; top: 100%; left: 0` (muncul **tepat di bawah** parent)

Dropdown defaultnya **tersembunyi** (`opacity: 0; pointer-events: none`) dan **muncul** saat parent di-hover (`:hover` di parent, **bukan** di child).

### Wajib Ada di Kode Kamu

- Container dengan `position: relative` (anchor)
- Dropdown menu dengan `position: absolute; top: 100%; left: 0`
- Default `opacity: 0; pointer-events: none; transform: translateY(-8px)`
- Saat `container:hover` → `opacity: 1; pointer-events: auto; transform: translateY(0)`
- `transition` untuk fade + slide
- `z-index: 999` (di atas konten lain)
- `box-shadow` dan `border-radius` untuk visual

### Pola Kode

```html
<div class="dropdown-container">
  <button class="dropdown-trigger">☰ Menu</button>
  <div class="dropdown-menu">
    <a href="#">🏠 Beranda</a>
    <a href="#">👤 Profil</a>
    <a href="#">⚙️ Pengaturan</a>
    <div class="dropdown-divider"></div>
    <a href="#">
      🔔 Notifikasi
      <span class="dropdown-badge">3</span>
    </a>
    <a href="#">🚪 Keluar</a>
  </div>
</div>
```

```css
.dropdown-container {
  position: relative;
  display: inline-block;
  margin: 40px;
}

.dropdown-trigger {
  background: #1e293b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.dropdown-trigger:hover { background: #334155; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 180px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 999;

  /* default: tersembunyi */
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition: opacity 0.2s, transform 0.2s;
}

/* Tampilkan saat container di-hover */
.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 12px 20px;
  color: #475569;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.dropdown-menu a:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.dropdown-menu a:first-child { border-radius: 12px 12px 0 0; }
.dropdown-menu a:last-child  { border-radius: 0 0 12px 12px; }

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 4px 0;
}

.dropdown-badge {
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  float: right;
  margin-top: 2px;
}
```

### Yang Terjadi di Browser

- Tombol "☰ Menu" hitam dengan rounded corner
- Hover tombol → warna sedikit lebih terang (`#334155`)
- Hover tombol → **dropdown putih** muncul **tepat di bawah** tombol dengan shadow halus
- Dropdown berisi 5 item: Beranda, Profil, Pengaturan, divider, Notifikasi (dengan badge "3"), Keluar
- Hover ke item → background abu-abu terang
- Mouse leave dari container → dropdown **menghilang** dengan fade + slide ke atas

### Kapan Pakai

- **User menu** (Profile, Settings, Logout) di pojok kanan atas
- **Filter dropdown** (Sort by, Category, Price range)
- **Navigasi** dengan sub-menu (Products → Web/Mobile/Desktop)

### A11y Tips (Accessibility)

> Hover-only dropdown **tidak accessible** untuk user keyboard. Untuk production, tambahkan:

- `aria-haspopup="true"` di trigger
- `aria-expanded="false/true"` di trigger
- `:focus-within` di CSS agar dropdown muncul saat tab ke child
- JavaScript untuk toggle di click (penting untuk mobile/tablet)

```css
/* Bonus: juga muncul saat focus */
.dropdown-container:focus-within .dropdown-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

### Verifikasi

- [ ] Container `position: relative`
- [ ] Dropdown `position: absolute; top: 100%; left: 0`
- [ ] Default `opacity: 0; pointer-events: none`
- [ ] Hover container → dropdown muncul dengan transition
- [ ] Mouse leave → dropdown hilang
- [ ] Dropdown di atas konten lain (`z-index: 999`)
- [ ] Item pertama/terakhir punya rounded sesuai posisi

---

## Bagian E: Card dengan Absolute Badge & Overlays

### Penjelasan

**Absolute badge** adalah pattern untuk label kecil di pojok card: "NEW", "SALE", "HOT", "DISCOUNT". Badge **menjorok keluar atau di dalam** card untuk menarik perhatian.

**Triknya sama dengan dropdown:**

- **Parent (card)** → `position: relative` (sebagai **anchor**)
- **Badge** → `position: absolute` dengan `top`/`right`/`bottom`/`left` sesuai posisi yang diinginkan

Varian posisi badge:

- **Pojok kanan atas** (paling umum) → `top: 12px; right: 12px` (di dalam card)
- **Pojok kanan atas menjorok keluar** → `top: -8px; right: -8px`
- **Pojok kiri bawah** (category) → `bottom: 12px; left: 12px`
- **Overlay bawah** (price gradient) → `bottom: 0; left: 0; right: 0`

### Wajib Ada di Kode Kamu

- Card dengan `position: relative` (anchor)
- Badge di pojok kanan atas (`.card-badge`)
- Category tag di pojok kiri bawah gambar (`.card-category`)
- Price overlay gradient di bawah (`.card-price-overlay`)
- Card dengan `overflow: hidden` agar gambar tidak bocor
- `box-shadow` halus + `max-width` di card

### Pola Kode

```html
<div class="card-relative">
  <img src="https://picsum.photos/400/250?random=10" alt="Product">
  <span class="card-badge hot">🔥 Hot</span>
  <span class="card-category">Tech</span>
  <div class="card-relative-body">
    <h3>Keyboard Mechanical</h3>
    <p>Keyboard gaming dengan switch Cherry MX dan RGB backlight.</p>
  </div>
</div>

<div class="card-relative">
  <img src="https://picsum.photos/400/250?random=11" alt="Product">
  <span class="card-badge new">New</span>
  <div class="card-price-overlay">
    <span class="price">Rp 450.000</span>
    <span class="original">Rp 600.000</span>
  </div>
  <div class="card-relative-body" style="margin-top: 60px;">
    <h3 style="color: white;">Headphone Wireless</h3>
    <p style="color: rgba(255,255,255,0.8);">Noise-cancelling dengan baterai 30 jam.</p>
  </div>
</div>
```

```css
.card-relative {
  position: relative;          /* anchor untuk badge & overlay */
  background: white;
  border-radius: 16px;
  overflow: hidden;            /* gambar tidak bocor keluar */
  max-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-relative img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.card-relative-body { padding: 20px; }
.card-relative-body h3 { margin-bottom: 8px; color: #1e293b; }
.card-relative-body p  { color: #64748b; font-size: 0.875rem; }

/* Badge pojok kanan atas */
.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-badge.new      { background: #10b981; }
.card-badge.hot      { background: #f59e0b; }
.card-badge.trending { background: #8b5cf6; }

/* Category tag pojok kiri bawah */
.card-category {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
}

/* Price overlay gradient di bawah gambar */
.card-price-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 24px 16px 12px;
  color: white;
}

.card-price-overlay .price     { font-size: 1.25rem; font-weight: bold; }
.card-price-overlay .original  { text-decoration: line-through; opacity: 0.7; font-size: 0.875rem; margin-left: 8px; }
```

### Yang Terjadi di Browser

- 2 card berjajar
- **Card 1**: gambar, badge "🔥 Hot" oranye di pojok kanan atas, tag "Tech" transparan di pojok kiri bawah, judul + deskripsi di body
- **Card 2**: gambar, badge "New" hijau di pojok kanan atas, gradient gelap di bawah gambar dengan harga "Rp 450.000" dan harga coret "Rp 600.000", judul putih di atas gradient
- Semua badge/overlay **menempel** di posisi absolut relatif ke card
- Teks body Card 2 berwarna putih dan muncul di atas gradient

### Kapan Pakai

- **E-commerce** (SALE, NEW, HOT, BEST SELLER)
- **Status indicator** (ONLINE, AWAY, BUSY) di avatar
- **Notifikasi** (angka unread) di icon
- **Tag** (Featured, Trending) di article card
- **Price overlay** untuk efek "dramatis" di banner promo

### Varian Posisi Absolute

- **Pojok kanan atas** (paling umum) → `top: 12px; right: 12px`
- **Pojok kiri atas** → `top: 12px; left: 12px`
- **Pojok kanan atas menjorok keluar** → `top: -8px; right: -8px` (kalau parent tidak `overflow: hidden`)
- **Tengah atas (banner)** → `top: 0; left: 50%; transform: translateX(-50%)`
- **Overlay bawah (gradient)** → `bottom: 0; left: 0; right: 0`

### Jebakan Umum

> **`overflow: hidden` di parent akan memotong badge yang menjorok keluar.** Kalau kamu mau badge "menjorok keluar" card, parent tidak boleh `overflow: hidden`. Tapi kalau mau badge "di dalam" card, `overflow: hidden` aman.

> **Jangan lupa `position: relative` di card** — kalau tidak ada, badge akan relatif ke ancestor lain (bisa `<body>` atau `<html>`), bukan card.

### Verifikasi

- [ ] Card `position: relative` (anchor)
- [ ] Badge `.card-badge` di pojok kanan atas dengan warna sesuai kategori
- [ ] Category tag `.card-category` di pojok kiri bawah gambar
- [ ] Price overlay `.card-price-overlay` gradient di bawah gambar
- [ ] Card 1: "🔥 Hot" oranye
- [ ] Card 2: "New" hijau + gradient dengan harga

---

## Bagian F: Float Label Input

### Penjelasan

**Float label input** adalah pattern form modern: label **mengambang** di atas input saat input difokuskan atau sudah berisi value. Terlihat rapi dan hemat ruang.

**Triknya:**

- Wrapper `position: relative` (anchor untuk label)
- Input dengan `padding-top` cukup untuk label
- Label `position: absolute` di tengah input
- Saat input `:focus` atau `:not(:placeholder-shown)` → label **naik ke atas** dengan `top` lebih kecil + `font-size` lebih kecil

### Wajib Ada di Kode Kamu

- Wrapper `.float-label-group` dengan `position: relative`
- Input dengan `padding: 16px 16px 8px` (ruang untuk label di atas)
- Label `.float-label-label` dengan `position: absolute; left: 16px; top: 50%; transform: translateY(-50%)`
- Selector `:focus + label` dan `:not(:placeholder-shown) + label` untuk trigger float
- `transition` untuk animasi label naik
- `placeholder=" "` (spasi) — penting agar `:placeholder-shown` bekerja

### Pola Kode

```html
<div class="float-label-group">
  <input type="text" class="float-label-input" id="nama" placeholder=" ">
  <label for="nama" class="float-label-label">Nama Lengkap</label>
</div>

<div class="float-label-group">
  <input type="email" class="float-label-input" id="email" placeholder=" ">
  <label for="email" class="float-label-label">Alamat Email</label>
</div>
```

```css
.float-label-group {
  position: relative;   /* anchor untuk label */
  margin: 40px;
  max-width: 320px;
}

.float-label-input {
  width: 100%;
  padding: 16px 16px 8px;  /* ruang di atas untuk label */
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.float-label-input:focus { border-color: #3b82f6; }

.float-label-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1rem;
  pointer-events: none;
  transition: top 0.2s, font-size 0.2s, color 0.2s;
}

/* Label naik ke atas saat input focus ATAU sudah berisi value */
.float-label-input:focus + .float-label-label,
.float-label-input:not(:placeholder-shown) + .float-label-label {
  top: 8px;
  transform: translateY(0);
  font-size: 0.7rem;
  color: #3b82f6;
}
```

### Yang Terjadi di Browser

- 2 input field: "Nama Lengkap" dan "Alamat Email"
- Default: label abu-abu **di tengah** input (terlihat seperti placeholder)
- Klik input → border **biru**, label **naik ke atas** mengecil, warna biru
- Ketik sesuatu → label tetap **di atas** (karena `:not(:placeholder-shown)`)
- Hapus semua (input kosong) → label **turun kembali** ke tengah
- Klik input lain → label input sebelumnya **turun kembali**

### Trik Penting: `placeholder=" "`

> **`placeholder=" "` (dengan spasi) WAJIB** agar selector `:not(:placeholder-shown)` bekerja. Browser menganggap placeholder "visible" hanya jika ada isinya (termasuk spasi). Kalau `placeholder=""`, `:placeholder-shown` selalu true, dan label tidak bisa "turun" kembali.

### Kapan Pakai

- **Form modern** yang hemat ruang (Material Design, iOS style)
- **Signup / login form** yang clean dan minimal
- **Multi-step form** dengan banyak field

### Verifikasi

- [ ] Wrapper `position: relative`
- [ ] Input `padding-top` cukup untuk label
- [ ] Label default `top: 50%; transform: translateY(-50%)` (tengah)
- [ ] Saat focus/ada value: label naik (`top: 8px`) + font-size kecil
- [ ] Saat kosong kembali: label turun lagi
- [ ] `placeholder=" "` (dengan spasi) — bukan kosong
- [ ] Transition halus 0.2s

---

## Bagian G: Back-to-Top Button (Fixed + Hover)

### Penjelasan

**Back-to-top button** adalah tombol kecil di pojok kanan bawah yang **nempel di viewport** saat user scroll ke bawah. Klik tombol → scroll ke atas halaman.

Pakai `position: fixed; bottom: 32px; right: 32px` — selalu nempel di pojok kanan bawah viewport, **tidak peduli** parent atau scroll position.

Plus pattern animasi: tombol tersembunyi default (`opacity: 0; transform: translateY(20px)`), lalu muncul dengan transisi saat scroll. Untuk demo ini, tombol selalu terlihat.

### Wajib Ada di Kode Kamu

- Tombol `position: fixed; bottom: 32px; right: 32px`
- Bentuk bulat (border-radius: 50%) + size 48x48
- Background biru + box-shadow
- Default `opacity: 1; transform: translateY(0)` (di demo)
- Hover: `transform: translateY(-4px)` (sedikit naik)
- `z-index: 999` (di atas konten biasa, di bawah modal)
- `onclick="window.scrollTo({top:0, behavior:'smooth'})"`

### Pola Kode

```html
<button class="back-to-top" title="Kembali ke atas"
        onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
  ↑
</button>
```

```css
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  z-index: 999;

  /* Di demo ini, selalu terlihat */
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s, transform 0.3s, background 0.2s;
}

.back-to-top:hover {
  background: #2563eb;
  transform: translateY(-4px);
}
```

### Yang Terjadi di Browser

- Tombol bulat biru dengan panah ↑ di pojok kanan bawah viewport
- **Selalu nempel** di posisi yang sama, **tidak peduli** scroll atau konten
- Hover tombol → warna **lebih gelap** + tombol **naik 4px** (efek lift)
- Klik tombol → halaman **scroll halus** ke atas (`behavior: 'smooth'`)
- Tombol di atas konten biasa (`z-index: 999`)

### Pattern Lanjutan: Hidden by Default, Show on Scroll

Untuk production, tombol **default hidden** dan **muncul** saat user scroll ke bawah (mis. > 300px). Pakai JavaScript:

```javascript
const btn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});
```

```css
.back-to-top {
  /* default: hidden & turun sedikit */
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

### Kapan Pakai

- **Halaman panjang** (artikel, dokumentasi, e-commerce listing)
- **Landing page** dengan banyak section
- **Mobile website** (user sulit scroll balik ke atas dengan jempol)

### Verifikasi

- [ ] Tombol `position: fixed; bottom: 32px; right: 32px`
- [ ] Bulat (border-radius: 50%) + size 48x48
- [ ] `z-index: 999`
- [ ] Hover: warna lebih gelap + naik 4px
- [ ] Klik: scroll halus ke atas
- [ ] Selalu nempel di pojok kanan bawah viewport

---

## Ringkasan Cheat Sheet

### Position: Kapan Pakai Apa

- **`static`** → Default browser. Hampir tidak pernah ditulis eksplisit. Tulis hanya untuk override `position` lain.
- **`relative`** → Anchor untuk absolute child, atau geser element sedikit dari posisi normalnya. **Tidak** keluar dari alur normal (ruang tetap dipesan).
- **`absolute`** → Element yang harus presisi posisinya (tooltip, badge, dropdown, modal, overlay). Relatif ke ancestor terdekat dengan `position`. **Keluar** dari alur normal.
- **`fixed`** → Element yang harus nempel di viewport (navbar, back-to-top, chat widget). **Keluar** dari alur normal. Bisa "bocor" kalau ancestor punya `transform`/`filter`/`perspective`.
- **`sticky`** → Element yang flow normal lalu nempel di titik tertentu (sidebar, table header, breadcrumb). Hybrid. Wajib `top` dan parent tidak boleh `overflow: hidden`.

### Properties Pendukung

- **`top` / `right` / `bottom` / `left`** → offset dari anchor
- **`inset`** → shorthand untuk `top/right/bottom/left` (`inset: 0` = menutupi seluruh parent)
- **`z-index`** → urutan tumpukan (butuh `position` selain `static`)

### Pattern Umum (Resep Cepat)

- **Anchor** → `position: relative` di parent
- **Posisikan** → `position: absolute` di child dengan `top/right/bottom/left`
- **Navbar nempel di viewport** → `position: fixed` + `top: 0` + `z-index` tinggi
- **Sidebar nempel saat scroll** → `position: sticky` + `top: 80px` + parent `align-items: flex-start`
- **Dropdown** → parent `relative` + child `absolute; top: 100%`
- **Image overlay** → container `relative` + overlay `absolute; inset: 0`
- **Card badge** → card `relative` + badge `absolute; top/right`

### Position vs Flex/Grid

- **Flex/Grid** → layout utama (alur normal, semua element di "tempatnya")
- **Position** → element yang **keluar** dari alur normal (overlay, badge, tooltip, navbar, dropdown)
- **Kombinasi** → Grid untuk layout, `absolute` untuk badge di dalam card. Flex untuk navbar, `fixed` untuk navbar global.

### Jebakan yang Sering Terjadi

- Lupa `position: relative` di parent → child `absolute` "lari" ke `<html>`
- `position: fixed` "bocor" karena ancestor punya `transform`/`filter`
- `position: sticky` tidak jalan karena parent `overflow: hidden` atau `align-items: stretch`
- `z-index: 9999` di child tidak menutupi sibling karena stacking context parent
- `overflow: hidden` di parent memotong badge/tooltip yang menjorok keluar

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 11, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **6 pattern** sudah dibuat:
  - [ ] Fixed navbar dengan `z-index: 1000` dan kompensasi tinggi (spacer/div 64px)
  - [ ] Sticky header nempel di `top: 64px` (di bawah navbar) saat scroll
  - [ ] Dropdown menu (parent `relative` + child `absolute; top: 100%`)
  - [ ] Card dengan absolute badge & category tag & price overlay
  - [ ] Float label input (label mengambang saat focus/ada value)
  - [ ] Back-to-top button fixed di pojok kanan bawah
- [ ] **Setiap element `position: absolute` punya parent `position: relative`**
- [ ] **Browser menampilkan**:
  - Navbar nempel di atas saat scroll
  - Sticky header nempel di bawah navbar saat scroll dalam section
  - Dropdown muncul dengan fade saat hover tombol
  - Badge "Hot" oranye dan "New" hijau di pojok card
  - Category "Tech" transparan di pojok kiri bawah
  - Price overlay gradient dengan harga di card kedua
  - Label form mengambang ke atas saat input difokuskan
  - Tombol ↑ nempel di pojok kanan bawah, scroll halus saat diklik

---

## Cara Submit

1. Buka `code/10-positioning-dan-navbar.html` di VS Code
2. Isi semua `/* TODO */` dengan kodemu sendiri (jangan copy-paste dari pola di atas)
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Eksperimen**:
   - Ubah `z-index` navbar dari `1000` ke `1` → lihat dropdown tertutupi konten
   - Ubah `top: 64px` di sticky header jadi `top: 0` → header nempel di paling atas (nutupi navbar)
   - Hapus `align-items: flex-start` di parent flex (kalau ada) → sticky tidak bekerja
   - Hapus `position: relative` di `.card-relative` → badge "lari" ke pojok `<body>`, bukan card
   - Tambah `transform: rotate(45deg)` di element → lihat efek ke stacking context
   - Buka DevTools → inspect badge → lihat "containing block" di panel Computed (harusnya `.card-relative`, bukan body)
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/11-...`

---

## Catatan untuk Pemula

> **`position: relative` adalah "jangkar" untuk child `absolute`.** Ini pattern paling penting dan paling sering dipakai. Parent `relative` (anchor) + child `absolute` (yang diposisikan). Tanpa `relative` di parent, `absolute` akan relatif ke ancestor terjauh yang punya `position` (bisa `<html>`), dan posisinya jadi "aneh".

> **`position: fixed` relatif ke viewport, bukan parent.** Jadi navbar `fixed` tetap di atas viewport saat scroll, **tidak peduli** parent-nya. Tapi hati-hati: kalau ada ancestor dengan `transform`/`filter`/`perspective`, fixed jadi relatif ke ancestor itu, bukan viewport. Ini bug yang membingungkan kalau tidak tahu.

> **`position: sticky` butuh `top` (atau `left/right/bottom`).** Tanpa salah satunya, sticky sama saja dengan `relative`. Dan parent harus `align-items: flex-start` di flex container (default `stretch` meregangkan dan sticky tidak bekerja). Parent juga tidak boleh `overflow: hidden`/`auto`/`scroll`.

> **`z-index` butuh `position` bukan `static`.** Element dengan `position: static` (default) **tidak** bisa di-set `z-index`. Pakai `relative` (default paling aman) kalau hanya butuh stacking context tanpa geser posisi.

> **Stacking context = "dinding" untuk `z-index`.** `z-index: 9999` di dalam parent `z-index: 1` **tidak akan** menutupi sibling `z-index: 2` di parent yang sama. z-index di-stack per parent. Property yang bikin stacking context baru: `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `perspective`, `isolation: isolate`, `will-change`.

> **`inset: 0` shorthand untuk `top/right/bottom/left: 0`.** Ini cara modern untuk menutupi seluruh parent dengan element absolute. Lebih ringkas daripada tulis 4 baris. Bisa juga `inset: 10px 20px` (atas-bawah 10px, kanan-kiri 20px) seperti margin/padding.

> **`overflow: hidden` di parent memotong child `absolute`.** Kalau badge/card kamu "hilang" padahal position-nya benar, cek apakah parent punya `overflow: hidden` — itu "memotong" child yang keluar. Solusi: hapus `overflow: hidden` di parent, atau pindahkan anchor ke parent yang lebih luar.

> **Float label butuh `placeholder=" "` (dengan spasi).** Kosong `placeholder=""` membuat `:not(:placeholder-shown)` selalu true dan label tidak bisa "turun" kembali saat input kosong. Spasi di placeholder adalah trik agar browser anggap ada "tempat" untuk placeholder.

> **Back-to-top button pakai `position: fixed` + JavaScript scroll event.** CSS saja tidak bisa detect "user sudah scroll ke bawah". Pakai `window.addEventListener('scroll', ...)` + toggle class `.show` untuk show/hide tombol berdasarkan `window.scrollY`.

> **Untuk production: hover-only dropdown tidak accessible.** Pakai `:focus-within` untuk keyboard, dan tambahkan JavaScript untuk click toggle (mobile/tablet). Plus `aria-haspopup` dan `aria-expanded` untuk screen reader. Pattern ini sudah dibahas di soal 05, tapi ingat selalu untuk posisi interaktif apa pun.

> **Triek panah tooltip pakai border (kalau nanti bikin tooltip).** `border: 6px solid transparent; border-top-color: black` = panah ke bawah. Ini cara klasik yang ringan (no image, no SVG). Untuk panah ke arah lain, ganti sisi yang berwarna.

<!-- markdownlint-enable MD024 MD028 -->

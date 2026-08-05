<!-- markdownlint-disable MD024 MD028 -->

# SOAL 09 — Animasi & Transisi

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membedakan **`transition`** (perubahan state halus) dan **`@keyframes`** (animasi kompleks multi-step)
- Memilih **timing function** yang tepat untuk feel yang natural (`ease`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier`)
- Membuat **loading spinner** dengan `@keyframes` rotate
- Membuat **entrance animation** (fade-in, slide-in) untuk konten
- Menerapkan **stagger animation** (item muncul satu per satu)
- Membuat **hover effects** yang halus (card lift, button press, image zoom)
- Memahami **performance**: property mana yang aman di-animate (`transform`, `opacity`)
- Menggunakan **`animation-fill-mode`** untuk mempertahankan state akhir
- Membuat **page load animation** yang menarik
- Memahami kapan harus **mengurangi animasi** (a11y, `prefers-reduced-motion`)

**Topik:** CSS transition, @keyframes, animation properties, timing function, stagger animation, page load, prefers-reduced-motion

**Referensi utama:**

- [MDN: CSS Transitions](https://developer.mozilla.org/id/docs/Web/CSS/CSS_transitions)
- [MDN: CSS Animations](https://developer.mozilla.org/id/docs/Web/CSS/CSS_animations)
- [MDN: `cubic-bezier()`](https://developer.mozilla.org/id/docs/Web/CSS/easing-function)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Easings.net](https://easings.net/) → visual cheat sheet untuk timing function

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Animasi yang baik membedakan **"web hidup"** dari **"web statis"**. Tapi animasi yang buruk = **mengganggu dan tidak profesional**.

Di soal ini kamu akan membuat **galeri animasi** yang menampilkan:

1. **Transition** (hover effects, state changes)
2. **@keyframes** (loading spinner, fade-in, slide, bounce, pulse)
3. **Stagger animation** (item muncul satu per satu)
4. **Page load animation** (konten muncul saat halaman dimuat)

**Prinsip utama:** Animasi harus **tidak terasa**. Kalau user sadar ada animasi, mungkin animasinya **terlalu lambat/cepat/berlebihan**. Animasi terbaik = **transisi natural** yang user tidak sadari.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** — pahami logika transition vs animation
2. **Lihat Yang Terjadi di Browser** — bayangkan output
3. **Ketik dari 0** di `code/09-animasi-dan-transisi.html`, cari `TODO(human)`, isi sendiri
4. **Verifikasi** dengan checklist per bagian
5. **Eksperimen** — ubah timing function, ubah durasi, lihat perbedaannya

---

## Bagian A: Transition Dasar (Hover State)

### Penjelasan

**`transition`** = animasi **singkat dan dua-state**: dari state A ke state B, dengan durasi dan timing tertentu. Paling sering dipakai untuk **hover effects**.

**Properti transition:**

- `transition-property` → property apa yang di-animate (`background`, `transform`, `opacity`, dll)
- `transition-duration` → berapa lama (`0.2s`, `0.3s`, `0.5s`)
- `transition-timing-function` → kurva gerakan (`ease`, `linear`, `ease-in`, `ease-out`, `cubic-bezier`)
- `transition-delay` → tunggu berapa detik sebelum mulai

**Shorthand:** `transition: <property> <duration> <timing-function> <delay>;`

### Wajib Ada di Kode Kamu

- Button hover: background transition 0.2s
- Card hover: transform + shadow transition 0.3s
- Input focus: border-color transition 0.2s
- Link hover: color transition 0.15s

### Pola Kode

```css
/* Button */
.btn {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  /* transition HARUS di element asal */
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Card */
.card {
  background: var(--color-surface);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### Yang Terjadi di Browser

- **Hover button**: background **halus berubah** ke warna lebih gelap (0.2s), button **naik 1px** (0.1s)
- **Active (klik)**: button **turun kembali** (transform 0)
- **Hover card**: card **naik 4px**, shadow **membesar dan lebih dalam** (0.3s)
- **Mouse leave**: semua **kembali ke awal** dengan durasi yang sama (halus 2 arah)

### Prinsip Penting: Transition di Element ASAL

**`transition` HARUS diletakkan di element asal, BUKAN di `:hover`/`::placeholder`.**

```css
/* ✅ BENAR: transition di element asal */
.btn {
  background: blue;
  transition: background 0.2s;
}
.btn:hover { background: darkblue; }

/* ❌ SALAH: transition di :hover */
.btn:hover {
  background: darkblue;
  transition: background 0.2s;
}
```

**Kenapa?**

- ✅ **Benar**: transition bekerja 2 arah (in & out)
- ❌ **Salah**: transition hanya bekerja masuk (saat hover), tidak ada transisi keluar (saat mouse leave → instan)

### Verifikasi

- [ ] Transition di element **asal** (bukan di `:hover`)
- [ ] Duration 0.1-0.3s (responsif, tidak lambat)
- [ ] Hover & leave **keduanya** halus

---

## Bagian B: Timing Function (Kurva Gerakan)

### Penjelasan

**`transition-timing-function`** = kurva yang menentukan **kecepatan animasi sepanjang durasi**. Default = `ease`.

**Visualisasi setiap timing:**

- **`linear`** — Konstan, mekanis. Pakai untuk: spinner, loading bar.
- **`ease`** — Default, natural (cepat di tengah). Pakai untuk: general purpose.
- **`ease-in`** — Lambat di awal, cepat di akhir. Pakai untuk: element **keluar** layar.
- **`ease-out`** — Cepat di awal, lambat di akhir. Pakai untuk: element **masuk** layar.
- **`ease-in-out`** — Lambat di awal & akhir, cepat di tengah. Pakai untuk: element **bolak-balik**.
- **`cubic-bezier(0.68, -0.55, 0.265, 1.55)`** — Bouncy/overshoot. Pakai untuk: fun effects.

### Wajib Ada di Kode Kamu

- Demonstrasi 5-6 timing function berbeda pada box yang bergerak
- Setiap box dengan label yang menjelaskan feel-nya

### Pola Kode

```html
<div class="timing-demo">
  <div class="timing-box" style="transition-timing-function: linear">linear</div>
  <div class="timing-box" style="transition-timing-function: ease">ease</div>
  <div class="timing-box" style="transition-timing-function: ease-in">ease-in</div>
  <div class="timing-box" style="transition-timing-function: ease-out">ease-out</div>
  <div class="timing-box" style="transition-timing-function: ease-in-out">ease-in-out</div>
  <div class="timing-box" style="transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce</div>
</div>
```

```css
.timing-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
}

.timing-box {
  width: 100px;
  height: 50px;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  /* durasi sama untuk semua, agar fair comparison */
  transition: transform 0.6s;
}

.timing-box:hover {
  transform: translateX(300px);
}
```

### Yang Terjadi di Browser

- **Hover** ke salah satu box → box bergerak ke kanan
- **Linear**: kecepatan konstan sepanjang jalan
- **Ease**: cepat di tengah, lambat di awal/akhir
- **Ease-in**: lambat di awal, baru "tancap gas" di akhir (seperti mobil yang baru jalan)
- **Ease-out**: cepat di awal, lalu **rem** di akhir (seperti mobil yang direm)
- **Ease-in-out**: lambat di awal, cepat di tengah, lambat di akhir (seperti mobil yang jalan pelan → cepat → pelan)
- **Bounce**: melewati target, lalu kembali (overshoot effect)

### Kapan Pakai Timing Apa

- **Hover/click feedback** → `ease` (0.1-0.3s) — natural
- **Modal/dropdown masuk** → `ease-out` (0.2-0.4s) — masuk dengan lembut
- **Modal/dropdown keluar** → `ease-in` (0.2-0.4s) — keluar dengan tegas
- **Spinner** → `linear` (infinite) — mekanis, konsisten
- **Page transition** → `ease-in-out` (0.3-0.5s) — dramatis
- **Bounce/fun** → `cubic-bezier(0.68, -0.55, 0.265, 1.55)` — playful

### Tools: Easings.net

Buka [easings.net](https://easings.net/) — visual cheat sheet untuk timing function. Copy-paste `cubic-bezier()` yang kamu mau.

### Verifikasi

- [ ] 5-6 timing function berbeda
- [ ] Hover ke setiap box → gerakan berbeda
- [ ] Perhatikan feel: mana yang natural, mana yang mechanical

---

## Bagian C: @keyframes (Animasi Multi-Step)

### Penjelasan

**`@keyframes`** = animasi **multi-step** yang bisa lebih kompleks dari transition. Bisa **looping**, **infinite**, dan punya **multiple keyframe** (0%, 50%, 100%).

**Sintaks:**

```css
@keyframes nama-animasi {
  0% { /* state awal */ }
  50% { /* state tengah */ }
  100% { /* state akhir */ }
}

.element {
  animation: nama-animasi 1s ease infinite;
}
```

**Properti animation:**

- `animation-name` → nama @keyframes
- `animation-duration` → durasi 1 siklus
- `animation-timing-function` → kurva
- `animation-delay` → tunggu sebelum mulai
- `animation-iteration-count` → berapa kali (default 1, `infinite` untuk loop)
- `animation-direction` → `normal`, `reverse`, `alternate`
- `animation-fill-mode` → `none` (default), `forwards` (pertahankan state akhir), `backwards` (pakai state awal sebelum delay), `both`
- `animation-play-state` → `running` atau `paused`

**Shorthand:** `animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode> <play-state>;`

### Wajib Ada di Kode Kamu

- **fadeIn** (opacity 0 → 1)
- **slideIn** (translateX -100% → 0)
- **bounce** (translateY dengan scale)
- **spin** (rotate 0 → 360deg)
- **pulse** (scale 1 → 1.05)
- **shake** (translateX bolak-balik)
- **colorCycle** (background-color berubah)

### Pola Kode

```css
/* Fade in: opacity 0 ke 1 */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Slide in: dari kiri */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideInLeft 0.6s ease-out forwards;
}

/* Bounce: vertical bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}

/* Spin: rotate 360deg */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: spin 0.8s linear infinite;
}

/* Pulse: scale + opacity */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.05); opacity: 0.8; }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Shake: horizontal shake */
@keyframes shake {
  0%, 100%       { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80%      { transform: translateX(8px); }
}

.shake {
  animation: shake 0.6s ease-in-out;
}

/* Color cycle: background berubah */
@keyframes colorCycle {
  0%   { background: #ef4444; }
  33%  { background: #f59e0b; }
  66%  { background: #22c55e; }
  100% { background: #ef4444; }
}

.color-cycle {
  animation: colorCycle 3s linear infinite;
}
```

### Yang Terjadi di Browser

- **fade-in**: elemen muncul perlahan dari transparan ke solid
- **slide-in**: elemen **masuk dari kiri** sambil memudar
- **bounce**: elemen **naik-turun** (looping)
- **spin**: elemen **muter terus** (untuk spinner)
- **pulse**: elemen **denyut** (looping, halus)
- **shake**: elemen **goyang horizontal** (1x, biasanya untuk error/notif)
- **color-cycle**: background **berubah-ubah warna** (looping)

### `animation-fill-mode: forwards` Penting!

Untuk animasi yang **tidak looping**, kalau tidak ada `forwards`, elemen **kembali ke state awal** setelah animasi selesai. Pakai `forwards` supaya **state akhir dipertahankan**.

```css
.fade-in {
  /* tanpa forwards: opacity kembali ke 0 setelah animasi */
  animation: fadeIn 0.5s ease-out;
}

/* dengan forwards: opacity tetap 1 */
.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
```

### Verifikasi

- [ ] 6+ keyframe animation berbeda
- [ ] Spinner: rotate infinite dengan `linear` timing
- [ ] Fade/slide: `forwards` untuk pertahankan state akhir
- [ ] Pulse/bounce: infinite + ease-in-out
- [ ] Shake: 1x eksekusi (bukan infinite)

---

## Bagian D: Loading Spinner (Praktis)

### Penjelasan

Loading spinner adalah penggunaan `@keyframes` paling umum. Cara paling simple: **rotate element** dengan border yang punya `border-top-color` berbeda.

### Wajib Ada di Kode Kamu

- Spinner ring (border dengan 1 sisi berbeda)
- Spinner dots (3 titik berdenyut)
- Progress bar (lebar berubah)

### Pola Kode

**Spinner Ring:**

```html
<div class="spinner"></div>
```

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Spinner Dots (3 titik):**

```html
<div class="dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
```

```css
.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40%           { transform: scale(1); opacity: 1; }
}
```

**Progress Bar (Indeterminate):**

```html
<div class="progress">
  <div class="progress-bar"></div>
</div>
```

```css
.progress {
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  width: 30%;
  height: 100%;
  background: var(--color-primary);
  border-radius: 2px;
  animation: progress 1.5s ease-in-out infinite;
}

@keyframes progress {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
```

### Yang Terjadi di Browser

- **Ring spinner**: lingkaran berputar (border atas warna berbeda)
- **Dots**: 3 titik muncul satu per satu (stagger)
- **Progress bar**: garis geser dari kiri ke kanan (looping)

### Kapan Pakai Loading Indicator

- **HTTP request** yang > 200ms
- **Proses async** (upload, download, processing)
- **Page transition** (kalau > 1 detik)

**Best practice:** loading indicator harus **muncul dalam 100ms** (kalau loading < 100ms, jangan tampilkan, biar tidak "flicker"). Pakai `setTimeout` minimum 200-300ms sebelum tampilkan.

### Verifikasi

- [ ] Spinner ring berputar terus
- [ ] Spinner dots: muncul satu per satu (stagger)
- [ ] Progress bar: geser kiri-kanan looping

---

## Bagian E: Hover Animations (Lift, Press, Zoom, Rotate)

### Penjelasan

Hover animation yang baik = **responsif dan natural**. Duration terlalu lama (0.5s+) = terasa lambat. Terlalu cepat (0.05s) = terasa instan (tidak ada feedback). **Sweet spot: 0.1-0.3s**.

### Wajib Ada di Kode Kamu

- **Card lift**: `translateY(-8px)` + shadow lebih dalam
- **Button press**: `scale(0.97)` saat active
- **Image zoom**: `scale(1.05)` saat hover
- **Icon rotate**: `rotate(15deg)` saat hover
- **Background slide**: `background-position` berubah

### Pola Kode

```css
/* Card lift */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Button press */
.btn-press {
  transition: transform 0.1s ease;
}

.btn-press:active {
  transform: scale(0.97);
}

/* Image zoom (butuh wrapper) */
.image-zoom {
  overflow: hidden;
  border-radius: 8px;
}

.image-zoom img {
  transition: transform 0.4s ease-out;
  display: block;
  width: 100%;
}

.image-zoom:hover img {
  transform: scale(1.05);
}

/* Icon rotate */
.icon-rotate {
  display: inline-block;
  transition: transform 0.3s ease;
}

.icon-rotate:hover {
  transform: rotate(15deg);
}

/* Background slide (gradient slide) */
.bg-slide {
  background: linear-gradient(90deg, var(--color-primary) 50%, var(--color-primary-dark) 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  color: white;
  transition: background-position 0.4s ease;
}

.bg-slide:hover {
  background-position: 0 0;
}
```

### Yang Terjadi di Browser

- **Card lift**: card **naik 8px** + shadow **membesar**
- **Button press**: button **mengecil 3%** saat ditekan
- **Image zoom**: gambar di dalam container **membesar 5%** (harus ada `overflow: hidden` di parent)
- **Icon rotate**: icon **miring 15°**
- **Background slide**: background "**geser**" ke kiri, transisi dari dark ke light color

### Best Practice untuk Hover Image

**Pakai wrapper dengan `overflow: hidden`**, scale hanya di `<img>`:

```html
<div class="image-zoom">
  <img src="..." alt="...">
</div>
```

```css
.image-zoom { overflow: hidden; }
.image-zoom img { transition: transform 0.4s; }
.image-zoom:hover img { transform: scale(1.05); }
```

Tanpa `overflow: hidden` di wrapper, gambar akan **keluar dari container** saat di-scale.

### Verifikasi

- [ ] Card lift: transition halus
- [ ] Button press: cepat (0.1s)
- [ ] Image zoom: gambar tidak keluar container
- [ ] Icon rotate: 15° atau 45° (tergantung style)
- [ ] Background slide: gradient bergeser halus

---

## Bagian F: Stagger Animation (Item Satu Per Satu)

### Penjelasan

**Stagger animation** = item-item dalam list muncul **satu per satu** dengan delay yang meningkat. Triknya: pakai **`animation-delay`** dengan **`nth-child`** atau **`--i` custom property**.

### Wajib Ada di Kode Kamu

- List item muncul satu per satu dengan delay
- `animation-delay` naik: 0s, 0.1s, 0.2s, 0.3s, ...

### Pola Kode (Cara 1: nth-child)

```css
.list-item {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

.list-item:nth-child(1) { animation-delay: 0.0s; }
.list-item:nth-child(2) { animation-delay: 0.1s; }
.list-item:nth-child(3) { animation-delay: 0.2s; }
.list-item:nth-child(4) { animation-delay: 0.3s; }
.list-item:nth-child(5) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Pola Kode (Cara 2: Custom Property `--i`)

Lebih elegan, scalable:

```html
<ul class="stagger-list">
  <li style="--i: 0">Item 1</li>
  <li style="--i: 1">Item 2</li>
  <li style="--i: 2">Item 3</li>
  <li style="--i: 3">Item 4</li>
  <li style="--i: 4">Item 5</li>
</ul>
```

```css
.stagger-list li {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  /* delay = i * 0.1s */
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Yang Terjadi di Browser

- Item 1 muncul duluan (delay 0s)
- Item 2 muncul 0.1s kemudian
- Item 3 muncul 0.2s kemudian
- ... dan seterusnya
- Total durasi: 0.5s + (5 × 0.1s) = 1.0s untuk 5 item

### Kapan Pakai Stagger Animation

- **List item** yang baru dimuat
- **Card grid** yang baru di-render
- **Form field** yang muncul bertahap (multi-step form)

**Jangan overdo:** stagger untuk **5-10 item** masih OK. Untuk 50+ item = terlalu lama, gunakan chunk atau skip stagger.

### Verifikasi

- [ ] Item muncul satu per satu (delay meningkat)
- [ ] State akhir: semua item visible
- [ ] Total durasi tidak terlalu lama (< 2 detik)

---

## Bagian G: Page Load Animation

### Penjelasan

**Page load animation** = konten muncul saat halaman dimuat. Triknya: set `opacity: 0` di awal, lalu jalankan animasi fade-in. Pakai `forwards` supaya state akhir (visible) dipertahankan.

### Wajib Ada di Kode Kamu

- Hero section fade in saat page load
- Section lain muncul dengan stagger
- Total durasi entry: < 1.5 detik

### Pola Kode

```html
<body>
  <header class="hero">...</header>
  <main>
    <section class="section-anim" style="--i: 0">Section 1</section>
    <section class="section-anim" style="--i: 1">Section 2</section>
    <section class="section-anim" style="--i: 2">Section 3</section>
  </main>
</body>
```

```css
.hero {
  opacity: 0;
  animation: fadeInDown 0.8s ease-out 0.2s forwards;
}

.section-anim {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(0.5s + var(--i) * 0.15s);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Yang Terjadi di Browser

- **0.0s**: halaman muncul, hero masih tersembunyi
- **0.2s**: hero mulai fade in
- **1.0s**: hero selesai fade in
- **0.5s**: section 1 mulai muncul
- **0.65s**: section 2 mulai muncul
- **0.8s**: section 3 mulai muncul
- **1.4s**: semua section visible

### Kapan Pakai Page Load Animation

- **Landing page** yang butuh "dramatic entrance"
- **Hero section** dengan CTA penting
- **Hindari**: untuk halaman yang butuh cepat (admin dashboard, e-commerce checkout)

### Verifikasi

- [ ] Refresh halaman → konten **muncul dengan animasi**
- [ ] Total durasi entry < 1.5 detik
- [ ] `forwards` → state akhir (visible) dipertahankan

---

## Bagian H: `prefers-reduced-motion` (A11y)

### Penjelasan

Beberapa user punya **motion sickness** (mabuk gerakan) atau **vestibular disorders** yang membuat animasi terasa tidak nyaman. OS modern (Mac, Windows, iOS, Android) punya setting **"Reduce motion"** yang harus di-respek oleh web.

**Cara handle:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Atau lebih sederhana, **disable animasi untuk user yang minta reduce motion**:

```css
@media (prefers-reduced-motion: reduce) {
  .fade-in,
  .slide-in,
  .bounce,
  .pulse,
  .shake {
    animation: none;
    opacity: 1;
    transform: none;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}
```

### Wajib Ada di Kode Kamu

- `@media (prefers-reduced-motion: reduce)` yang mengurangi/mendisable animasi
- Test: aktifkan "Reduce motion" di OS, lihat animasi berkurang/hilang

### Test Reduce Motion

- **Mac**: System Preferences → Accessibility → Display → Reduce motion
- **Windows**: Settings → Ease of Access → Display → Show animations
- **iOS**: Settings → Accessibility → Motion → Reduce Motion
- **Chrome DevTools**: F12 → ⋮ (3 dot) → More tools → Rendering → "Emulate CSS prefers-reduced-motion" → `reduce`

### Kapan Pakai Reduce Motion

- **SELALU sertakan** untuk animasi besar (page load, parallax, large transitions)
- **Tidak wajib** untuk animasi sangat singkat (hover feedback 0.1s, spinner loading)
- **Penting untuk**: entrance animation, parallax, infinite bounce, rotate besar

### Verifikasi

- [ ] `@media (prefers-reduced-motion: reduce)` ada
- [ ] Test: aktifkan reduce motion → animasi berkurang
- [ ] Konten tetap **visible** (tidak hilang) tanpa animasi

---

## Ringkasan: Animasi Cheat Sheet

**Transition vs Animation:**

- **State** — Transition: 2 state (A → B). @keyframes: multi-state, looping.
- **Trigger** — Transition: pseudo-class (`:hover`). @keyframes: otomatis, bisa loop.
- **Durasi** — Transition: pendek (0.1-0.3s). @keyframes: pendek/panjang (0.3-3s).
- **Penggunaan** — Transition: hover, focus, state changes. @keyframes: loading, entrance, complex motion.

**Property yang aman di-animate (performant):**

- ✅ **`transform`**: translate, scale, rotate
- ✅ **`opacity`**: 0 sampai 1
- ⚠️ **`background`, `color`**: OK tapi repaint
- ❌ **`width`, `height`, `top`, `left`, `margin`**: trigger reflow, **lambat**

**Best practices:**

- Durasi transition: 0.1-0.3s (responsif)
- Durasi entrance: 0.3-0.6s
- Pakai `transform: scale()` bukan `width/height` untuk zoom
- Pakai `transform: translateY()` bukan `margin-top/bottom`
- `transition` di element ASAL, bukan di `:hover`
- `animation-fill-mode: forwards` untuk pertahankan state akhir
- Selalu sertakan `prefers-reduced-motion`

**Timing function cheat sheet:**

- **`linear`** — Konstan. Pakai untuk: spinner, loading bar.
- **`ease`** — Natural. Pakai untuk: general, hover.
- **`ease-out`** — Lembut masuk. Pakai untuk: modal/dropdown masuk.
- **`ease-in`** — Tegas keluar. Pakai untuk: modal/dropdown keluar.
- **`ease-in-out`** — Dramatis. Pakai untuk: page transition.
- **`cubic-bezier(0.68,-0.55,0.265,1.55)`** — Bouncy. Pakai untuk: fun effects.

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 10, cek semua ini:

- [ ] File **bisa dibuka** di browser tanpa error
- [ ] **CSS valid** — cek di [CSS Validator W3C](https://jigsaw.w3.org/css-validator/)
- [ ] **Transition** di element asal (bukan di `:hover`)
- [ ] **Duration transition** 0.1-0.3s
- [ ] **5-6 timing function** berbeda untuk perbandingan
- [ ] **6+ @keyframes** animation: fadeIn, slideIn, bounce, spin, pulse, shake, colorCycle
- [ ] **Loading spinner** berputar dengan `linear infinite`
- [ ] **Hover effects**: card lift, button press, image zoom, icon rotate
- [ ] **Stagger animation** (item muncul satu per satu)
- [ ] **Page load animation** dengan `forwards`
- [ ] **`prefers-reduced-motion`** media query
- [ ] **Performance**:
  - Pakai `transform` dan `opacity` (bukan `width`/`height`/`margin`)
  - Animasi tidak terasa "laggy" di browser
- [ ] **Test**:
  - Hover, klik, lihat animasi
  - Refresh halaman, lihat page load animation
  - Aktifkan reduce motion, lihat animasi berkurang

---

## Cara Submit

1. Buka `code/09-animasi-dan-transisi.html` di VS Code
2. Isi semua `TODO(human)` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Double-click file untuk buka di browser
5. **Test interaksi**:
   - Hover ke button → lihat transition
   - Hover ke card → lihat lift effect
   - Refresh halaman → lihat page load animation
   - Lihat spinner berputar
   - Hover ke image → lihat zoom
6. **Test reduce motion**:
   - Mac: System Preferences → Accessibility → Display → Reduce motion ON
   - Refresh halaman → animasi entrance hilang, langsung visible
7. **Eksperimen**:
   - Ubah `transition-duration` di button → bandingkan feel
   - Ubah timing function (coba semua) → lihat perbedaannya
   - Tambah `@keyframes` baru
8. Verifikasi dengan checklist di atas
9. Kalau PASS, lanjut ke `soal/10-positioning-dan-navbar.md`

---

## Catatan untuk Pemula

> **Transition vs Animation bingung?** Pakai analogi: Transition = perpindahan rumah (sekali jalan, ada trigger). Animation = kipas angin berputar (looping, otomatis). Transition untuk hover/focus. Animation untuk loading/entrance.
>
> **Transition HARUS di element asal, BUKAN di `:hover`/`::placeholder`.** Ini pattern paling penting. Kalau transition di `:hover`, saat mouse leave, tidak ada transisi keluar — terasa "patah". Taruh di element asal, transisi 2 arah (in & out).
>
> **Pakai `transform` dan `opacity`, hindari `width`/`height`/`margin`.** Browser sangat optimize `transform` dan `opacity` (GPU-accelerated, tidak trigger reflow). `width`/`height`/`margin`/`top`/`left` trigger **reflow** — repaint seluruh halaman, terasa lambat. Untuk zoom, pakai `scale()`. Untuk geser, pakai `translate()`.
>
> **Spinner itu `rotate(360deg)` dengan `linear` dan `infinite`.** Trik border-top-color beda = terlihat seperti "kipas". Ini pattern paling umum dan simple.
>
> **Stagger animation butuh `animation-delay` bertingkat.** Cara paling scalable: pakai CSS custom property `--i` (set di `style="--i: 0"`), lalu `animation-delay: calc(var(--i) * 0.1s)`. Bisa sampai 100+ item tanpa nulis 100 rule.
>
> **`animation-fill-mode: forwards` WAJIB untuk entrance animation.** Tanpa `forwards`, elemen kembali ke state awal (opacity 0) setelah animasi selesai. Pakai `forwards` supaya state akhir (visible) dipertahankan.
>
> **`prefers-reduced-motion` bukan opsional.** Sekitar 1-3% user punya vestibular disorders yang membuat animasi besar terasa tidak nyaman. Selalu sertakan `@media (prefers-reduced-motion: reduce)` untuk disable/shorten animasi besar. Ini **a11y best practice** yang sering dilupakan.
>
> **Animasi yang baik = animasi yang TIDAK terasa.** Kalau user sadar "wah animasinya keren", mungkin animasinya **terlalu lambat atau berlebihan**. Animasi terbaik = transisi natural yang user tidak sadari. Duration 0.1-0.3s, timing `ease`, simple motion. Less is more.
>
> **Test animasi di device low-end.** Animasi yang smooth di MacBook Pro bisa laggy di HP Android kentang. Pakai `transform` dan `opacity` untuk performa, dan hindari animate `width`/`height`/`margin` yang berat.

<!-- markdownlint-enable MD024 MD028 -->

# TUGAS — Latihan CSS

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Sepuluh halaman yang kamu styling sendiri: layout dasar, card, grid, navbar, form, animasi.
2. Satu halaman yang benar-benar responsif (enak dibuka di HP dan laptop).
3. Kemampuan membongkar "kenapa elemen ini posisinya begini" lewat DevTools, bukan coba-coba nilai acak.

---

## Daftar Soal

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [Layout Dasar](soal/01-layout-dasar.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/01-layout-dasar.html` | 30-45 menit |
| 02 | [Selector & Box Model](soal/02-selector-dan-box-model.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/02-selector-dan-box-model.html` | 45-60 menit |
| 03 | [Flexbox Dasar](soal/03-flexbox.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/03-flexbox.html` | 45-60 menit |
| 04 | [Card Component](soal/04-card-component.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/04-card-component.html` | 60-90 menit |
| 05 | [CSS Grid System](soal/05-grid-system.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/05-grid-system.html` | 60-90 menit |
| 06 | [Responsive Design](soal/06-responsive-design.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/06-responsive-design.html` | 60-90 menit |
| 07 | [Typography & Warna](soal/07-typography-dan-warna.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/07-typography-dan-warna.html` | 60-90 menit |
| 08 | [Form Styling](soal/08-form-styling.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/08-form-styling.html` | 60-90 menit |
| 09 | [Animasi & Transisi](soal/09-animasi-dan-transisi.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/09-animasi-dan-transisi.html` | 60-90 menit |
| 10 | [Position & Navbar](soal/10-positioning-dan-navbar.md) | `level-1-dasar-web/materi-praktikum/02-latihan-css/code/10-positioning-dan-navbar.html` | 80-110 menit |

Total kira-kira 10-14 jam.

### Di mana menulis kodenya?

Soal menyuruh kamu mengisi file di `code/`. Kalau kamu ikut aturan
[latihan-saya](../../../latihan-saya/README.md) (bahan tidak diedit), salin starter ke folder mingguanmu
dengan nama yang sama, lalu kerjakan salinannya.

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal sampai habis**, terutama gambar/deskripsi hasil akhir dan bagian verifikasi.
2. **Tutup soalnya, lalu gambar.** Sketsa layout di kertas: kotak apa di dalam kotak apa, mana yang
   berjajar (flex/grid), mana yang menumpuk. CSS jauh lebih gampang kalau kotaknya sudah kebayang.
3. **Kerjakan sedikit-sedikit.** Tulis 2-3 property, save, refresh browser. Jangan menulis 50 baris
   lalu baru dicek.
4. **Cek sendiri** dengan langkah di bagian "Cara Mengecek" di bawah.
5. **Catat satu hal** yang paling bikin bingung di `latihan-saya/JURNAL.md`, plus cara kamu memecahkannya.

---

## Petunjuk Kalau Macet

### Tingkat 1 — lihat kotaknya

- Tambahkan sementara `* { outline: 1px solid red; }` di paling bawah CSS. Semua kotak jadi kelihatan.
  Hapus lagi setelah selesai.
- Pilih elemen di DevTools, buka tab **Computed**. Diagram box model di sana menunjukkan margin,
  border, padding, dan ukuran konten yang **benar-benar** dipakai.

### Tingkat 2 — cari tahu siapa yang menang

- Di tab **Styles**, property yang dicoret artinya kalah oleh aturan lain. Lihat aturan mana yang menang
  dan kenapa (specificity atau urutan).
- Property tidak berefek sama sekali? Cek apakah dia butuh syarat. Contoh: `z-index` butuh `position`
  selain `static`, `justify-content` butuh parent `display: flex`/`grid`, `top`/`left` tidak berefek
  di elemen `static`.
- Flexbox/Grid: klik badge `flex` atau `grid` di samping elemen di tab Elements. DevTools akan
  menggambar garis grid dan arah axis.

### Tingkat 3 — kecilkan masalahnya

- Salin bagian yang bermasalah ke file baru berisi 2-3 div saja. Kalau di file kecil berhasil, berarti
  masalahnya ada di aturan lain yang ikut campur.

### Tingkat 4 — dokumentasi resmi

- [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference): lihat bagian
  "Formal definition" untuk tahu property itu berlaku ke elemen apa.
- [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox),
  [MDN Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids),
  [MDN Positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning),
  [MDN Media queries](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries).
- Soal 09: [MDN Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations).

---

## Cara Mengecek Hasil Sendiri

### 1. Validasi HTML (dari root repo, setelah `npm install`)

```bash
npx html-validate level-1-dasar-web/materi-praktikum/02-latihan-css/code/01-layout-dasar.html
```

Harus tanpa error. CSS yang rapi tetap butuh HTML yang benar.

### 2. Validasi CSS

Tempel CSS-mu di [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/#validate_by_input).
Error di sini biasanya typo nama property atau nilai yang tidak dikenal (yang di browser diam-diam diabaikan).

### 3. Cek di browser

- Soal 01-02: buka tab Computed, cocokkan ukuran box dengan hitunganmu di kertas.
  Coba ganti `box-sizing` lalu lihat ukurannya berubah.
- Soal 03, 05: aktifkan overlay flex/grid di DevTools. Garisnya harus sesuai sketsamu.
- Soal 06: buka **Device Toolbar** (`Ctrl+Shift+M` / `Cmd+Shift+M`). Geser lebar dari 320px sampai
  1440px pelan-pelan. Tidak boleh ada scroll horizontal, dan layout berganti tepat di breakpoint-mu.
- Soal 08: klik setiap input, lalu tekan `Tab`. State fokus harus kelihatan jelas.
- Soal 09: di DevTools buka panel **Animations** untuk memperlambat animasi dan melihat urutannya.
- Soal 10: scroll halaman. Navbar fixed tetap di atas, sticky berhenti di parent-nya, dropdown tidak
  tertutup elemen lain.

---

## Tentang `contoh/`

Folder ini tidak punya `contoh/`. Pembandingmu adalah deskripsi hasil akhir dan checklist verifikasi
di setiap soal. Itu justru bagus: kamu belajar menilai hasil sendiri.

## Tentang `solusi-jangan-dibuka-dulu.md`

Stylesheet lengkap yang dulu ada di `soal/` dipindah ke [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). HTML kerangka tetap di soal. Tulis dulu CSS-mu sendiri, cek di DevTools, baru buka solusi kalau benar-benar buntu.

# TUGAS — Advanced React (Portal, Suspense, Error Boundary, Ref, Compound)

> **Urutan folder `01-` di Level 5:** kerjakan folder ini **dulu**, baru
> [01-latihan-performa](../01-latihan-performa/TUGAS.md). Latihan performa
> (code splitting) memakai `React.lazy` dan `Suspense` yang dipelajari di soal 02
> sini.

Belum tahu topiknya? Baca [README.md](README.md) dulu.

## Hasil Akhir yang Diharapkan

Satu proyek Vite React berisi lima demo yang kamu tulis sendiri:

1. `Modal` dengan Portal: tutup lewat backdrop dan Escape, fokus terkunci di
   dalam, fokus kembali ke tombol pembuka setelah ditutup.
2. Tiga halaman (Home, About, Dashboard) yang dimuat lazy, dengan fallback dan
   preload saat hover.
3. `ErrorBoundary` yang menangkap error, menampilkan pesan ramah, dan punya
   tombol "Coba Lagi".
4. `TextInput` yang menerima `ref` sebagai prop (React 19) dan hanya membuka
   `focus()` dan `clear()`, plus versi `forwardRef` untuk perbandingan.
5. `Tabs` dengan compound components yang bisa dipakai dengan keyboard.

---

## Daftar Soal dan File Starter

| No | Soal | Starter | Kamu menulis di | Estimasi |
| --- | --- | --- | --- | --- |
| 01 | `soal/01-portal-modal.md` | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-advanced-react/code/01-portal-modal.jsx` (kerangka TODO) | `src/components/Modal.jsx`, `src/App.jsx` | 90 menit |
| 02 | `soal/02-suspense-code-splitting.md` | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-advanced-react/code/02-suspense-code-splitting.jsx` (kerangka TODO) | `src/pages/Home.jsx`, `About.jsx`, `Dashboard.jsx`, `src/App.jsx` | 75 menit |
| 03 | `soal/03-error-boundary.md` | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-advanced-react/code/03-error-boundary.jsx` (kerangka TODO) | `src/components/ErrorBoundary.jsx` | 60 menit |
| 04 | `soal/04-forward-ref.md` | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-advanced-react/code/04-forward-ref.jsx` (kerangka TODO) | `src/components/TextInput.jsx`, `TextInputLegacy.jsx` | 60 menit |
| 05 | `soal/05-compound-components.md` | `LEVEL-5-Expert-Level/materi-praktikum/01-latihan-advanced-react/code/05-compound-components.jsx` (kerangka TODO) | `src/components/Tabs.jsx` | 75 menit |

### Catatan jujur

- File `code/` di sini adalah **kerangka `TODO(human)`**. Tulis komponenmu di
  proyek latihan (kolom "Kamu menulis di").
- Blok "Contoh Code" di soal sudah dipindah ke
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka hanya
  setelah punyamu lolos cek di bawah, lalu bandingkan.

---

## Cara Menjalankan

```bash
npm create vite@latest latihan-advanced-react -- --template react
cd latihan-advanced-react
npm install
npm install react-router-dom   # soal 02 (route-based splitting)
npm run dev
```

- Pastikan versi React 19: lihat `package.json` atau jalankan `npm ls react`.
  Soal 04 butuh React 19 untuk `ref` sebagai prop.
- Untuk melihat hasil code splitting yang sebenarnya, jalankan
  `npm run build` lalu `npm run preview`. Di mode dev, Vite memuat modul satu per
  satu, jadi tab Network terlihat berbeda.

---

## Langkah Pengerjaan

1. **Soal 01 (Modal)** — pertama tanpa Portal: taruh modal di dalam elemen yang
   punya `overflow: hidden`. Lihat masalahnya. Baru pindahkan dengan Portal.
   Urutan fitur: buka/tutup → backdrop → Escape → focus trap → kembalikan fokus.
2. **Soal 02 (Suspense)** — buat dulu tiga halaman biasa. Jalankan
   `npm run build`, catat ukuran file JS. Baru ubah ke lazy, build lagi,
   bandingkan daftar file. Terakhir tambahkan preload saat hover.
3. **Soal 03 (Error Boundary)** — buat komponen yang sengaja `throw` saat tombol
   diklik (lewat state, supaya error terjadi saat render). Tangkap. Lalu buat
   tombol reset. Pikirkan: kalau penyebab error belum hilang, apa yang terjadi
   setelah reset?
4. **Soal 04 (Ref)** — tulis dulu daftar apa yang **boleh** dilakukan parent ke
   input. Hanya itu yang dibuka lewat `useImperativeHandle`. Lalu tulis versi
   `forwardRef` dan tulis bedanya di jurnal.
5. **Soal 05 (Tabs)** — tulis dulu cara **pakai** komponennya (JSX di App),
   seolah-olah library-nya sudah ada. Baru implementasikan supaya kode pemakaian
   itu jalan.

Teori: [React modern](../../materi-teori/00-react-modern/README.md),
[Performance](../../materi-teori/01-performance-optimization/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Gejala umum

- `Target container is not a DOM element` → node tujuan Portal belum ada saat
  render.
- Klik di dalam modal ikut menutup modal → event klik dari konten "naik" ke
  backdrop. Ingat: event di Portal tetap mengikuti pohon **React**, bukan pohon
  DOM.
- `Element type is invalid... Received a promise` → `React.lazy` butuh modul
  dengan `export default`.
- Error Boundary tidak menangkap error → error terjadi di event handler atau
  kode async. Boundary hanya menangkap error saat render, lifecycle, dan
  constructor.

### Level 2 — Lihat buktinya

- **DevTools → Elements**: modal-mu ada di mana di DOM? Di dalam `#root` atau
  langsung di `body`?
- **DevTools → Network** (filter JS) setelah `npm run preview`: chunk halaman
  About baru dimuat saat kamu membuka About (atau saat hover kalau sudah
  preload)?
- Untuk melihat fallback Suspense lebih lama: Network → Throttling → "Slow 4G".
- **React DevTools → Components**: lihat state ErrorBoundary (`hasError`) dan
  context Tabs.
- Untuk focus trap: tekan Tab berkali-kali dan perhatikan outline fokus. Ketik
  `document.activeElement` di Console.

### Level 3 — Perkecil masalah

- Focus trap ruwet? Mulai dengan: "saat modal terbuka, fokus pindah ke tombol
  close". Lalu: "Tab dari elemen terakhir kembali ke elemen pertama".
- Compound components ruwet? Mulai dengan `Tabs` yang menerima array lewat props.
  Setelah jalan, pecah jadi `TabList`/`Tab`/`TabPanel` yang berbagi context.

### Dokumentasi

- react.dev → Reference → `createPortal`, `lazy`, `Suspense`,
  `useImperativeHandle`, `forwardRef`.
- react.dev → Reference → `Component` → bagian "Catching rendering errors with
  an Error Boundary".
- react.dev → Blog → rilis React 19 (bagian `ref` sebagai prop).
- WAI-ARIA Authoring Practices → pola "Dialog (Modal)" dan "Tabs".

---

## Cara Mengecek Hasil Sendiri

- [ ] Modal: tekan Escape → tertutup. Klik backdrop → tertutup. Klik isi modal →
      **tidak** tertutup.
- [ ] Modal: Tab berulang kali → fokus berputar di dalam modal saja. Setelah
      ditutup, fokus kembali ke tombol yang membukanya.
- [ ] Modal: di Elements, modal berada langsung di bawah `body`.
- [ ] `npm run build` menghasilkan beberapa file JS terpisah untuk halaman lazy.
- [ ] Di `npm run preview` + Network: chunk Dashboard tidak dimuat sebelum
      dibutuhkan.
- [ ] Error di satu widget hanya mengganti widget itu dengan pesan error. Bagian
      lain halaman tetap jalan. Tombol "Coba Lagi" bekerja.
- [ ] `TextInput`: parent bisa memanggil `focus()` dan `clear()`. Coba panggil
      method lain (misalnya `ref.current.style`) → tidak tersedia.
- [ ] Tabs: bisa pindah tab dengan klik. Bonus: dengan tombol panah kiri/kanan,
      dan role ARIA (`tablist`, `tab`, `tabpanel`) terpasang.
- [ ] Console bersih dari warning.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Lalu buka file `code/` satu per satu dan tulis
di jurnal: satu hal yang mereka lakukan lebih baik, dan satu hal yang menurutmu
versimu lebih jelas.

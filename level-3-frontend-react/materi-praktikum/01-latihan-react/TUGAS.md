# TUGAS — React Dasar (JSX, Props, State, Hooks, Context)

Folder ini paling gemuk di Level 3: 10 soal. Jangan dikebut sehari. Satu soal per
sesi sudah bagus.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. Satu proyek Vite React (misalnya `latihan-react`) yang bisa menampilkan hasil
   tiap soal, satu per satu.
2. Komponen yang kamu tulis sendiri: kartu mahasiswa, list dengan `key` yang
   benar, conditional rendering, form kecil dengan state, context tema/keranjang,
   custom hook, dan beberapa halaman dengan React Router.
3. Jawaban "Pertanyaan Analisis" di tiap soal, ditulis dengan kalimatmu sendiri.
4. Kebiasaan buka React DevTools untuk melihat props dan state, bukan menebak.

---

## Daftar Soal dan File Starter

Kerjakan urut dari atas. Path ditulis lengkap dari root repo.

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-jsx-dan-component.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/01-jsx-dan-component.jsx` | 60 menit |
| 02 | `soal/02-props-dan-state.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/02-props-dan-state.jsx` | 60–75 menit |
| 03 | `soal/03-component-patterns.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/03-component-patterns.jsx` | 75–90 menit |
| 04 | `soal/04-list-dan-key.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/04-list-dan-key.jsx` | 60–90 menit |
| 05 | `soal/05-conditional-rendering.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/05-conditional-rendering.jsx` | 60 menit |
| 06 | `soal/06-useState-dan-useEffect.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/06-useState-dan-useEffect.jsx` | 75 menit |
| 07 | `soal/07-useContext.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/07-useContext.jsx` | 90 menit |
| 08 | `soal/08-custom-hooks.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/08-custom-hooks.jsx` | 75 menit |
| 09 | `soal/09-react-router-dasar.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/09-react-router-dasar.jsx` | 90 menit |
| 10 | `soal/10-context-api.md` | `level-3-frontend-react/materi-praktikum/01-latihan-react/code/10-context-api.jsx` | 90 menit |

### Catatan penting: soal dan starter tidak selalu sama

Nama filenya cocok, tapi isinya kadang beda. Jadi kamu tahu dari awal:

- **01**: soal minta `StudentDirectory` + `StudentCard`. Starter berisi TODO
  `GreetingCard`, `Card`, `ProductTable`, `Avatar`. Kerjakan TODO starter dulu
  sebagai pemanasan, lalu buat `StudentDirectory` di file baru.
- **02**: soal fokus ke `children` dan callback props. Starter berisi `UserCard`
  dan daftar user interaktif. Dua-duanya latihan props, kerjakan keduanya.
- **03**: soal minta HOC dan render props. Starter punya keduanya, plus `Badge`
  dan editor auto-save sebagai bonus.
- **05**: soal punya 4 bagian (5A–5D). Starter tidak punya bagian
  `ShippingCalculator` (5C). Bagian itu kamu tulis sendiri dari nol.
- **06**: soal (TrafficLight + GitHub search) sama persis dengan
  `02-latihan-hooks/soal/01`. Starter di sini isinya lain (counter, password,
  todo, BMI). Di folder ini kerjakan TODO starter. TrafficLight dan GitHub search
  kerjakan nanti di `02-latihan-hooks`.
- **07 dan 10**: soal dan starter sama-sama latihan context, tapi daftar
  context-nya beda (misalnya soal 10 minta LanguageContext, starter punya
  ThemeContext). Ikuti soal sebagai patokan utama.
- **08**: mirip `02-latihan-hooks/soal/04`. Anggap ini percobaan pertama.
- **09**: mirip isi `03-latihan-router`. Anggap ini perkenalan, lalu diperdalam
  di sana.

---

### Soal buntu?

Blok jawaban yang dulu ada di starter dipindah ke [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Coba dulu minimal 30 menit dan catat apa yang sudah kamu coba, baru buka untuk membandingkan.

## Cara Menjalankan Starter

File di `code/` bukan aplikasi utuh. Isinya potongan komponen. Butuh proyek Vite
React dulu. Panduan install ada di
[Install React dan Vite](../../software/01-react-dan-vite-install.md).

```bash
# sekali saja, di luar folder LEVEL-3 (misalnya di latihan-saya/04-frontend/)
npm create vite@latest latihan-react -- --template react
cd latihan-react
npm install
npm install react-router-dom   # baru dibutuhkan di soal 09
npm run dev                    # buka http://localhost:5173
```

Lalu untuk tiap soal:

1. Salin file starter ke `src/`, misalnya `src/01-jsx-dan-component.jsx`.
2. Di `src/App.jsx`, import komponen dari file itu dan render.
3. Edit salinannya, bukan file asli di folder ini. File asli biarkan bersih
   (aturan ini ada di [latihan-saya/README.md](../../../latihan-saya/README.md)).

Dua hal yang perlu kamu tahu:

- Header starter menulis `npm start`. Di Vite perintahnya `npm run dev`.
- Starter memakai `import React from "react"`. Di Vite + React modern baris itu
  tidak wajib, tapi juga tidak bikin error.

---

## Langkah Pengerjaan

Ulangi pola ini untuk setiap soal:

1. **Baca soal sampai habis** tanpa buka starter. Tulis di kertas: komponen apa
   saja, props apa saja, state apa saja.
2. **Gambar pohon komponen** (siapa parent, siapa child, data mengalir ke mana).
3. **Tebak output** sebelum menulis kode. Contoh: "kalau gpa 3.6, badge-nya biru."
4. **Buka starter**, baca semua TODO, cocokkan dengan catatanmu.
5. **Kerjakan satu TODO, simpan, lihat browser.** Jangan tulis 5 TODO sekaligus
   lalu bingung mana yang error.
6. **Coba input aneh**: list kosong, nama sangat panjang, angka 0, nilai `null`.
7. **Jawab Pertanyaan Analisis** di jurnalmu.

Teori pendukung:
[React dan JSX](../../materi-teori/01-react-dan-jsx/README.md),
[React Hooks](../../materi-teori/02-react-hooks/README.md),
[React Router](../../materi-teori/03-react-router/README.md),
[State Management](../../materi-teori/04-state-management/README.md).

---

## Petunjuk Kalau Macet

Naik level petunjuk satu per satu. Jangan langsung loncat ke level 3.

### Level 1 — Baca pesan error dengan pelan

- Layar putih? Buka DevTools (F12) → tab **Console**. Error merah biasanya
  menyebut nama file dan nomor baris.
- `X is not defined` → lupa import atau salah ketik nama.
- `Each child in a list should have a unique "key" prop` → cek elemen paling luar
  di dalam `.map()`.
- `Objects are not valid as a React child` → kamu me-render objek utuh, bukan
  salah satu field-nya.

### Level 2 — Lihat isi data, jangan menebak

- Pasang ekstensi **React DevTools**. Tab **Components** → klik komponenmu →
  lihat props dan state yang sebenarnya.
- Taruh `console.log(props)` di baris pertama komponen. Apakah datanya sudah
  sampai?
- Untuk soal useEffect: tambahkan `console.log("effect jalan")`. Berapa kali
  muncul? Kenapa?
- Untuk soal fetch (GitHub search): DevTools → tab **Network** → lihat request,
  status code, dan response-nya.

### Level 3 — Pecah jadi masalah lebih kecil

- Komponen terlalu ramai? Hapus semua styling dan logika, tampilkan satu teks
  dulu. Tambah sedikit demi sedikit.
- Bingung props? Hardcode dulu nilainya di child. Kalau sudah tampil, baru ganti
  dengan props.
- Context tidak jalan? Cek dulu: apakah komponennya ada **di dalam** Provider?

### Dokumentasi yang dibaca

- react.dev → Learn → "Describing the UI", "Adding Interactivity",
  "Managing State".
- react.dev → Reference → `useState`, `useEffect`, `useContext`.
- reactrouter.com → Docs → bagian Routing (untuk soal 09).

---

## Cara Mengecek Hasil Sendiri

Untuk setiap soal, cek hal yang bisa dilihat:

- [ ] `npm run dev` jalan dan Console **tidak** ada error merah atau warning
      `key`.
- [ ] Output di browser sama dengan bagian "Expected Output" di soal.
- [ ] Di React DevTools, props yang diterima child sesuai yang kamu kirim.
- [ ] Soal list (04): hapus atau urutkan item, lalu cek input di item lain tidak
      "pindah" isi.
- [ ] Soal useEffect (06): taruh `console.log` di dalam effect. Pastikan effect
      tidak jalan terus-menerus, dan cleanup (kalau ada) terpanggil saat
      komponen hilang.
- [ ] Soal context (07, 10): ganti tema atau isi keranjang, lalu cek semua
      komponen yang memakai context ikut berubah.
- [ ] Soal router (09): klik link, URL berubah, halaman tidak reload penuh
      (tab Network tidak memuat ulang `index.html`). Tekan tombol Back, harus
      kembali ke halaman sebelumnya.
- [ ] Jalankan `npm run build` sekali di akhir. Harus sukses tanpa error.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md) dengan jujur. Kalau mau, bandingkan cara
pikirmu dengan kasus di [Self Problem Solving](../../SELF_PROBLEM_SOLVING.md),
terutama bagian stale closure dan key.

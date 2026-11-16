# TUGAS — State Management

Makin besar aplikasi, makin susah menjawab "data ini disimpan di mana, dan siapa
yang boleh mengubahnya?". Folder ini melatih jawaban itu: Context + reducer,
memecah context supaya tidak semua komponen render ulang, dan menyimpan state ke
localStorage dengan aman.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. AuthContext berbasis `useReducer` dengan login, logout, error, dan loading.
2. Versi kedua AuthContext yang "ingat" state UI setelah refresh, dan tidak crash
   kalau data di localStorage rusak.
3. Aplikasi notifikasi yang context-nya dipecah (user, theme, notif), dengan bukti
   dari Profiler bahwa render ulang jadi lebih sedikit.
4. Hook `useContextSelector` buatanmu sendiri.
5. NotesApp dengan persist middleware dan undo/redo.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-context-api.md` (2 bagian: AuthContext + persistence) | `level-3-frontend-react/materi-praktikum/04-latihan-state/code/01-context-api.jsx` | 120 menit |
| 02 | `soal/02-split-context.md` (split context + context selector) | `level-3-frontend-react/materi-praktikum/04-latihan-state/code/02-split-context.jsx` (ThemeContext, salah satu potongan split context) + file baru untuk User/Notif context | 120 menit |
| 03 | `soal/03-context-selector.md` (context selector + memoization) | `level-3-frontend-react/materi-praktikum/04-latihan-state/code/03-context-selector.jsx` | 90 menit |
| 04 | `soal/04-persist-state.md` | `level-3-frontend-react/materi-praktikum/04-latihan-state/code/04-persist-state.jsx` | 120 menit |
| Bonus | Tidak ada soal | `level-3-frontend-react/materi-praktikum/04-latihan-state/code/05-cart-context.jsx` (CartContext + reducer) | 60 menit |

### Catatan

- Semua soal di sini memakai Context dan `useReducer` buatan sendiri, tanpa
  library. Nama file lama (`02-zustand`, `03-tanstack-query`) sudah diganti supaya
  sesuai isi.
- `05-cart-context.jsx` tidak punya soal, jadi anggap latihan tambahan.
- Kalau penasaran dengan Zustand atau TanStack Query, coba setelah semua soal
  selesai: tulis ulang satu fitur memakai library itu, lalu bandingkan.

---

### Soal buntu?

Blok jawaban yang dulu ada di starter dipindah ke [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Coba dulu minimal 30 menit dan catat apa yang sudah kamu coba, baru buka untuk membandingkan.

## Cara Menjalankan Starter

Butuh proyek Vite React
([panduan install](../../software/01-react-dan-vite-install.md)).

```bash
npm create vite@latest latihan-state -- --template react
cd latihan-state
npm install
npm install react-router-dom   # starter 01 punya bagian ProtectedRoute
npm run dev
```

1. Salin starter ke `src/`.
2. Starter di sini tidak punya `export default`. Tambahkan `export` pada komponen
   yang mau dirender, lalu import di `src/App.jsx`.
3. `code/01` dan `code/04` punya beberapa baris `import` di tengah file. Di file
   ES module, semua `import` sebaiknya dipindah ke paling atas. Kalau ada error
   "Identifier has already been declared", cek import ganda.

---

## Langkah Pengerjaan

1. **Petakan state dulu.** Untuk tiap soal, tulis tabel: nama state, siapa yang
   membaca, siapa yang mengubah, perlu disimpan setelah refresh atau tidak.
2. **Soal 01** — tulis `authReducer` sebagai fungsi biasa. Tes di Console dengan
   beberapa action. Baru bungkus dengan Provider.
3. **Soal 01 bagian 2** — tentukan dulu **apa** yang aman disimpan di
   localStorage. Tulis daftarnya di jurnal sebelum menulis kode.
4. **Soal 02** — buat dulu versi **satu context besar**. Rekam dengan Profiler.
   Lalu pecah jadi tiga context. Rekam lagi. Simpan dua screenshot itu.
5. **Soal 03** — tulis `useContextSelector` versi paling sederhana dulu. Lalu
   cek di Profiler: apakah benar komponen yang tidak terkait tidak render ulang?
   Kalau masih render, cari tahu kenapa (ini bagian dari belajarnya).
6. **Soal 04** — urutan: reducer notes → middleware persist → undo/redo →
   UI. Tes reducer + middleware tanpa React dulu.

Teori: [State Management](../../materi-teori/04-state-management/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Gejala umum

- `useAuth must be used within AuthProvider` (atau `null` dari `useContext`) →
  komponen ada di luar Provider.
- Semua komponen render ulang walau cuma satu nilai berubah → objek `value`
  Provider dibuat baru tiap render. Pikirkan cara supaya identitasnya stabil.
- Refresh langsung logout → cek urutan: kapan kamu membaca localStorage, dan
  apakah state awal sudah memakai nilai itu?

### Level 2 — Lihat buktinya

- **React DevTools → Profiler**: aktifkan "Highlight updates when components
  render". Klik tombol, lihat komponen mana yang berkedip.
- **DevTools → Application → Local Storage**: lihat isi yang tersimpan. Ubah
  manual jadi teks rusak, refresh. Aplikasi harus tetap jalan.
- `console.log(action)` di awal reducer. Apakah action yang datang sesuai?

### Level 3 — Perkecil masalah

- Undo/redo bingung? Gambar di kertas tiga tumpukan: `past`, `present`,
  `future`. Jalankan 3 aksi dan 2 undo dengan tangan.
- Middleware bingung? Ingat: middleware cuma fungsi yang menerima reducer dan
  mengembalikan reducer baru. Tulis versi yang hanya `console.log` dulu.

### Dokumentasi

- react.dev → Learn → "Scaling Up with Reducer and Context".
- react.dev → Reference → `useReducer`, `useMemo`, `createContext`.
- MDN → `Window.localStorage`, `JSON.parse`.

---

## Cara Mengecek Hasil Sendiri

- [ ] Login dengan data benar → state berubah. Data salah → pesan error tampil.
- [ ] Soal 01 bagian 2: refresh setelah login, UI masih ingat user. Logout →
      localStorage bersih (cek di tab Application).
- [ ] Isi localStorage dengan `{rusak` lalu refresh. Aplikasi menganggap user
      logout, tidak layar putih.
- [ ] Di localStorage **tidak ada** token atau password. Hanya data UI.
- [ ] Soal 02/03: punya dua rekaman Profiler (sebelum dan sesudah). Jumlah
      komponen yang render saat ganti theme lebih sedikit di versi "sesudah".
- [ ] Soal 04: tambah 3 catatan, undo 2 kali, redo 1 kali. Hasilnya sesuai
      tebakanmu di kertas. Refresh, catatan masih ada.
- [ ] `npm run build` sukses.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Tulis di jurnal: kapan kamu akan memakai Context
biasa, kapan reducer, dan kapan library seperti Zustand.

# TUGAS — React Router

Aplikasi web nyata punya banyak halaman. Di sini kamu belajar membuat URL yang
"bermakna": bisa di-bookmark, bisa di-share, dan tombol Back tetap bekerja.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. Aplikasi dengan beberapa halaman, Navbar dengan link aktif, dan halaman 404.
2. Layout bersarang (nested routes) dengan `<Outlet />`, plus halaman detail
   memakai `useParams`.
3. Katalog buku yang filter, sort, dan halamannya tersimpan di URL
   (`?genre=fiksi&page=2`). Refresh halaman, filternya tetap.
4. Halaman yang hanya bisa dibuka setelah "login", dengan redirect balik ke
   halaman asal setelah login.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-routing-dasar.md` (3 bagian: router dasar, nested, programmatic nav) | `level-3-frontend-react/materi-praktikum/03-latihan-router/code/01-routing-dasar.jsx` | 90–120 menit |
| 02 | `soal/02-nested-routes.md` | `level-3-frontend-react/materi-praktikum/03-latihan-router/code/02-nested-routes.jsx` | 90 menit |
| 03 | `soal/03-search-params.md` | `level-3-frontend-react/materi-praktikum/03-latihan-router/code/03-search-params.jsx` | 90 menit |
| 04 | `soal/04-protected-routes.md` | `level-3-frontend-react/materi-praktikum/03-latihan-router/code/04-protected-routes.jsx` (kerangka dengan TODO) | 75 menit |

### Catatan

- `soal/01` sudah memuat bagian nested routes dan programmatic navigation.
  `soal/02` membahas nested routes lagi lebih dalam. Tidak apa-apa, anggap
  latihan ulang.
- `code/02-nested-routes.jsx` juga punya TODO `Protected Route` dan login flow.
  Kerjakan bagian itu bersama soal 04.
- `code/04-protected-routes.jsx` berupa kerangka dengan `TODO(human)`.
  Implementasi lama dipindah ke
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Tulis versimu
  dulu, baru bandingkan.
- Soal memakai `<AuthContext.Provider value={...}>`. Di React 19 `<AuthContext value={...}>`
  juga jalan. Pilih satu dan konsisten.

---

### Soal buntu?

Blok jawaban yang dulu ada di starter dipindah ke [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Coba dulu minimal 30 menit dan catat apa yang sudah kamu coba, baru buka untuk membandingkan.

## Cara Menjalankan Starter

Butuh proyek Vite React + `react-router-dom`
([panduan install](../../software/01-react-dan-vite-install.md)).

```bash
npm create vite@latest latihan-router -- --template react
cd latihan-router
npm install
npm install react-router-dom
npm run dev
```

1. Salin starter ke `src/`.
2. Router butuh satu `<BrowserRouter>` di paling luar. Starter `02` dan `03`
   tidak membungkus dirinya sendiri dengan router (contohnya hanya di komentar).
   Pasang `<BrowserRouter>` di `src/main.jsx` atau `src/App.jsx`, cukup sekali.
3. Starter di folder ini tidak punya `export default`. Tambahkan `export` pada
   komponen yang mau kamu render.

---

## Langkah Pengerjaan

1. **Gambar peta URL dulu.** Tulis daftar path: `/`, `/about`, `/products`,
   `/products/:id`, `/login`, `/dashboard`, `*`. Tandai mana yang butuh login.
2. **Soal 01** — buat semua halaman sebagai komponen kosong yang cuma menampilkan
   judul. Pastikan navigasi jalan dulu. Isi halaman belakangan.
3. **Soal 02** — tentukan bagian layout yang selalu tampil (sidebar, header) dan
   bagian yang berganti (Outlet). Baru tulis route-nya.
4. **Soal 03** — tanya dirimu: "kalau aku kirim link ini ke teman, apakah dia
   melihat filter yang sama?" Semua state filter harus dari URL, bukan
   `useState`.
5. **Soal 04** — urutan: AuthContext → ProtectedRoute → LoginPage → Navbar →
   PublicRoute. Tes setiap langkah sebelum lanjut.

Teori: [React Router](../../materi-teori/03-react-router/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Error umum

- `useNavigate() may be used only in the context of a <Router>` → komponenmu ada
  di luar `<BrowserRouter>`.
- Halaman anak tidak muncul di nested route → cek apakah parent me-render
  `<Outlet />`.
- Halaman reload penuh saat klik link → kamu memakai `<a href>` bukan `<Link to>`.
- Infinite redirect → ProtectedRoute dan PublicRoute saling melempar. Tulis di
  kertas: user login? mau ke mana? diarahkan ke mana?

### Level 2 — Lihat buktinya

- Lihat address bar. Apakah URL berubah sesuai yang kamu harapkan?
- React DevTools → Components → cari komponen `Routes`/`Route`, lihat props-nya.
- Untuk search params: `console.log(Object.fromEntries(searchParams))` di render.
- Untuk redirect setelah login: `console.log(location.state)` di LoginPage.

### Level 3 — Perkecil masalah

- Search params ruwet? Buat satu filter saja dulu (misalnya genre). Kalau jalan,
  tambah sort, lalu pagination.
- Ingat: nilai dari URL **selalu string**. `page` dari URL perlu diubah ke angka
  dan divalidasi (bagaimana kalau `?page=abc` atau `?page=-5`?).

### Dokumentasi

- reactrouter.com → Docs → Routing, `Link`/`NavLink`, `useParams`,
  `useNavigate`, `useSearchParams`, `Navigate`.

---

## Cara Mengecek Hasil Sendiri

- [ ] Klik semua link di Navbar. URL berubah, halaman berganti, tab Network
      tidak memuat ulang dokumen HTML.
- [ ] Link aktif punya gaya berbeda (`NavLink`).
- [ ] Ketik URL ngawur (`/asdf`). Muncul halaman 404 buatanmu.
- [ ] Buka `/products/1` langsung dari address bar. Detail produk tampil.
      Buka `/products/999`. Muncul pesan "tidak ditemukan", bukan crash.
- [ ] Katalog buku: pilih filter, refresh halaman. Filter masih sama. Tekan Back,
      filter sebelumnya kembali. Coba `?page=abc`, aplikasi tidak rusak.
- [ ] Buka `/dashboard` saat belum login → dilempar ke `/login`. Setelah login →
      kembali ke `/dashboard`, bukan ke `/`.
- [ ] Sudah login, buka `/login` → dilempar ke `/dashboard`.
- [ ] Logout, tekan Back. Dashboard tidak bisa dibuka lagi.
- [ ] `npm run build` sukses.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Lalu tulis satu paragraf di jurnal: "Kenapa
ProtectedRoute di frontend **tidak** cukup untuk mengamankan data?"

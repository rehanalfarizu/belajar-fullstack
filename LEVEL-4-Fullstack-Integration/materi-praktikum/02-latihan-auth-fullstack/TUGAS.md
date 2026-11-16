# TUGAS — Auth Fullstack (React + Express + Cookie HttpOnly)

Belum tahu topiknya? Baca [README.md](README.md) dulu.

Folder ini **tidak punya `soal/`**. Tugas di bawah disusun dari komentar TODO di
file `code/`. Prasyarat (urutan: fullstack dulu, lalu auth): [01-latihan-fullstack](../01-latihan-fullstack/TUGAS.md)
dan [01-latihan-auth](../01-latihan-auth/TUGAS.md) sudah selesai.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya dua proyek yang saling bicara:

1. **Backend** (pengembangan dari server `01-latihan-auth`) yang menaruh sesi di
   cookie `HttpOnly` + `SameSite`, menyediakan `POST /api/auth/login`,
   `GET /api/auth/me`, `POST /api/auth/logout`, dan mengecek role di setiap
   endpoint sensitif.
2. **Frontend** Vite React dengan:
   - client API yang mengirim cookie (`withCredentials` / `credentials: "include"`);
   - AuthContext yang mengecek sesi ke `/auth/me` saat aplikasi dibuka;
   - ProtectedRoute, GuestRoute, AdminRoute (dan RoleRoute sebagai bonus);
   - Navbar, Dashboard, dan AdminPanel yang tampil beda per role.
3. Bukti di DevTools bahwa token **tidak** ada di localStorage dan **tidak** bisa
   dibaca lewat `document.cookie`.

---

## Daftar Tugas dan File Starter

Tidak ada file soal, jadi kolom "Tugas" merujuk ke TODO di file.

| No | Tugas | File di folder ini | Kamu menulis di | Estimasi |
| --- | --- | --- | --- | --- |
| 0 | Ubah backend ke cookie `HttpOnly` (TODO baris atas di file 03) | `LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/code/03-protected-routes.jsx` (bagian BACKEND, hanya daftar syarat) | Server dari `01-latihan-auth` milikmu | 120 menit |
| 1 | Tulis client axios | `LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/code/01-axios-client.js` (daftar TODO) | `client/src/lib/api.js` | 45 menit |
| 2 | Tulis auth service versi fetch | `LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/code/02-jwt-client-side.js` (daftar TODO) | Catatan di jurnal + `client/src/lib/authService.js` (opsional) | 30 menit |
| 3 | AuthContext dasar + route guard + LoginPage + Navbar | `LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/code/03-protected-routes.jsx` | `client/src/context/AuthContext.jsx`, `client/src/components/ProtectedRoute.jsx`, `GuestRoute.jsx`, `AdminRoute.jsx`, `RoleRoute.jsx` (bonus), `Navbar.jsx`, `client/src/pages/LoginPage.jsx`, `Profile.jsx`, `client/src/App.jsx` | 150 menit |
| 4 | RBAC backend + frontend | `LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/code/04-role-based-access.jsx` | Backend: middleware `requireRole`, `requireMinRole`. Frontend: `client/src/components/HasRole.jsx`, `client/src/pages/AdminPanel.jsx`, `Dashboard.jsx`, update `Navbar.jsx` dan AuthContext | 150 menit |
| 5 | Matangkan AuthContext-mu | `LEVEL-4-Fullstack-Integration/materi-praktikum/02-latihan-auth-fullstack/code/05-auth-context-complete.jsx` (daftar TODO) | `client/src/context/AuthContext.jsx` + catatan perbandingan di jurnal | 30 menit |

### Catatan jujur soal file di folder ini

- Semua file `code/` (`01` sampai `05`) sekarang berisi daftar `TODO(human)`
  tanpa jawaban. File `01`, `02`, dan `05` dulu implementasi penuh; kodenya
  dipindahkan ke solusi.
- File `03` dan `04` sekarang berisi daftar `TODO(human)` dengan petunjuk dan
  **"Selesai kalau"**, tanpa jawaban. Kode lengkapnya ada di
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka hanya
  setelah versimu jalan, atau buntu lebih dari 30 menit dan kebuntuanmu sudah
  kamu catat di jurnal.
- Backend dari `01-latihan-auth` mengembalikan token di **body JSON** (Bearer).
  Folder ini butuh token di **cookie**. Mengubahnya adalah Tugas 0, dan itu
  bagian penting dari belajarnya.
- Role di `01-latihan-auth` adalah `admin/user/guest`. Di file `04` ini role-nya
  `user/author/editor/admin/owner`. Pilih satu set role, tulis di jurnal, dan
  pakai konsisten di backend dan frontend.
- Header file `04` menulis `npm start`. Di Vite perintahnya `npm run dev`.

---

## Cara Menjalankan

```bash
# backend: lanjutkan proyek auth-api dari 01-latihan-auth
cd auth-api
npm install cookie-parser
node server.js                      # http://localhost:3001

# frontend: proyek baru
npm create vite@latest client -- --template react
cd client
npm install
npm install axios react-router-dom
npm run dev                         # http://localhost:5173
```

Buat `client/.env` (bukan rahasia, hanya alamat API):

```bash
VITE_API_URL=http://localhost:3001/api
```

Ingat: semua variabel `VITE_*` **ikut masuk ke bundle** dan bisa dilihat siapa
pun. Jangan pernah taruh secret di sana.

Panduan Vite: [Install React dan Vite](../../../LEVEL-3-Frontend-React/software/01-react-dan-vite-install.md).

---

## Langkah Pengerjaan

1. **Tugas 0 (backend)** — baca daftar 6 syarat di bagian BACKEND file `03`.
   Ubah satu per satu:
   - saat login, set cookie (bukan kirim token di body);
   - `/auth/me` membaca token dari cookie;
   - `/auth/logout` menghapus cookie;
   - CORS: origin `http://localhost:5173` + `credentials: true`.
   Uji dengan curl (lihat bagian cek) **sebelum** menyentuh React.
2. **Tugas 1 dan 2** — tulis client axios dan auth service. Untuk setiap fungsi,
   tulis satu kalimat di jurnal: "fungsi ini ada untuk ...". Jawab juga: kenapa interceptor 401 tidak langsung
   redirect ke `/login`?
3. **Tugas 3** — urutan yang disarankan:
   1. AuthContext dengan tiga status: `loading`, `authenticated`, `guest`.
   2. ProtectedRoute. Uji: buka `/dashboard` saat belum login.
   3. LoginPage, termasuk redirect kembali ke halaman asal.
   4. GuestRoute, lalu AdminRoute, lalu Navbar.
4. **Tugas 4** — isi dulu tabel permission di bagian bawah file `04` versi
   role-mu. Lalu backend (`requireRole`, `requireMinRole`), baru frontend
   (`HasRole`, Dashboard, AdminPanel).
5. **Tugas 5** — matangkan AuthContext-mu mengikuti TODO di file `05` (status
   `error`, event `auth:unauthorized`, logout yang selalu mereset state). Setelah
   jalan, bandingkan dengan solusi dan catat bedanya.

---

## Petunjuk Kalau Macet

### Level 1 — Masalah klasik CORS + cookie

- Error CORS menyebut `Access-Control-Allow-Origin` tidak boleh `*` → server
  memakai origin wildcard padahal request membawa credentials.
- Login sukses tapi `/auth/me` tetap 401 → cookie tidak terkirim. Cek tiga hal:
  client memakai `withCredentials`/`credentials: "include"`? server mengizinkan
  credentials? atribut cookie (`SameSite`, `Secure`) cocok dengan lingkungan
  localhost (HTTP, bukan HTTPS)?
- Refresh halaman langsung terlempar ke `/login` → ProtectedRoute memutuskan
  sebelum pengecekan sesi selesai. Status `loading` dipakai untuk apa?

### Level 2 — Lihat buktinya

- **DevTools → Network** → klik request login → tab **Headers** → cari
  `Set-Cookie` di response. Ada peringatan kuning di sebelahnya? Arahkan mouse
  untuk membaca alasannya.
- Klik request `/auth/me` → apakah request header punya `Cookie:`?
- **DevTools → Application → Cookies** → cookie-mu punya centang `HttpOnly`?
- Di Console ketik `document.cookie`. Cookie sesi seharusnya **tidak** muncul.
- **React DevTools → Components** → lihat nilai AuthContext (`user`, `status`).

### Level 3 — Perkecil masalah

- Pisahkan backend dan frontend: kalau alur cookie belum jalan dengan curl,
  jangan debug di React dulu.
- Buat halaman kecil `/debug` yang cuma menampilkan
  `JSON.stringify({ status, user })` dari AuthContext.
- RBAC rumit? Mulai dengan satu aturan: "hanya admin yang boleh buka
  `/admin`". Setelah jalan, tambah aturan lain.

### Dokumentasi

- MDN → "Using HTTP cookies", "Set-Cookie", "CORS" (bagian credentialed
  requests).
- expressjs.com → `res.cookie()`, `res.clearCookie()`; npm `cookie-parser`.
- axios-http.com → Request Config (`withCredentials`), Interceptors.
- reactrouter.com → `Navigate`, `Outlet`, `useLocation`.
- OWASP Cheat Sheet → "Session Management", "Cross-Site Request Forgery
  Prevention".

---

## Cara Mengecek Hasil Sendiri

```bash
# login, simpan cookie ke file
curl -i -c cookies.txt -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"andi@example.com","password":"rahasia123"}'
# response harus punya header Set-Cookie dengan HttpOnly
# body tidak boleh berisi token

# pakai cookie tadi
curl -i -b cookies.txt http://localhost:3001/api/auth/me     # 200
curl -i http://localhost:3001/api/auth/me                    # 401

# logout lalu coba lagi
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:3001/api/auth/logout
curl -i -b cookies.txt http://localhost:3001/api/auth/me     # 401
```

Hapus `cookies.txt` setelah selesai dan jangan di-commit.

- [ ] Application → Local Storage dan Session Storage **kosong** dari token.
- [ ] `document.cookie` di Console tidak menampilkan cookie sesi.
- [ ] Belum login, buka `/dashboard` → ke `/login`. Setelah login → kembali ke
      `/dashboard`.
- [ ] Sudah login, buka `/login` → dialihkan ke dashboard.
- [ ] Refresh di `/dashboard` saat login → tetap di dashboard (tidak "kedip" ke
      login).
- [ ] User biasa: menu admin tidak tampil, `/admin` dialihkan.
- [ ] **Paling penting:** sebagai user biasa, panggil endpoint admin langsung
      dengan curl + cookie user biasa → server menjawab **403**. Kalau server
      menjawab 200, RBAC-mu hanya hiasan.
- [ ] Logout → kembali ke `/login`, tombol Back tidak membuka dashboard lagi.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Tulis di jurnal: satu hal di
`solusi-jangan-dibuka-dulu.md` (bagian AuthContext) yang kamu tidak kepikiran, dan kenapa itu penting.

// ============================================================
// TUGAS 0 + 3 — Cookie HttpOnly di backend, lalu Protected Routes di React
// ============================================================
// File ini adalah daftar tugas (TODO(human)), bukan komponen jadi. Tiap TODO
// kamu tulis di file proyek `client/` milikmu sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install frontend: npm create vite@latest client -- --template react
//                   cd client && npm install && npm install react-router-dom axios
// Backend harus jalan di: http://localhost:3001/api
// ============================================================

// ------------------------------------------------------------
// BACKEND (Tugas 0)
// ------------------------------------------------------------

// TODO(human): ubah backend dari 01-latihan-auth ke sesi cookie HttpOnly.
// Petunjuk : Backend minimal harus:
//   1. mengambil JWT_SECRET dari environment dan gagal start bila tidak valid;
//   2. menyimpan password sebagai hash, bukan plaintext;
//   3. mengatur cookie sesi HttpOnly + SameSite (+ Secure di production);
//   4. menyediakan POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout;
//   5. memakai CORS allowlist + credentials, dan punya rencana melawan CSRF;
//   6. memeriksa role/ownership di server pada setiap resource sensitif.
//   Frontend memanggil API dengan credentials: "include" (fetch) atau
//   withCredentials (axios). ProtectedRoute hanya mengatur UX navigasi, bukan
//   pengganti otorisasi di backend.
// Selesai kalau: lihat bagian "Cara Mengecek Hasil Sendiri" di TUGAS.md —
//   response login punya Set-Cookie HttpOnly dan body tanpa token; /auth/me 200
//   dengan cookie dan 401 tanpa cookie.

// ------------------------------------------------------------
// FRONTEND (Tugas 3)
// ------------------------------------------------------------

// TODO(human): src/context/AuthContext.jsx — AuthProvider dan hook useAuth.
// Petunjuk : Tiga status: loading, authenticated, guest. Saat aplikasi dibuka,
//            tanyakan ke /auth/me apakah sesi masih ada. Sediakan login(),
//            logout(), dan data user. Kenapa status `loading` perlu ada
//            terpisah dari "belum login"?
// Selesai kalau: refresh halaman saat login tidak "kedip" ke /login.

// TODO(human): src/components/ProtectedRoute.jsx
// Petunjuk : Pembungkus route (cari `Outlet` dan `Navigate` di dokumentasi
//            react-router). Belum login -> arahkan ke /login dan INGAT halaman
//            asalnya (cari `useLocation` dan `state` pada Navigate). Saat
//            status masih loading, jangan memutuskan apa-apa dulu.
// Selesai kalau: buka /dashboard saat belum login -> ke /login; setelah login
//            kembali ke /dashboard.

// TODO(human): src/components/GuestRoute.jsx
// Petunjuk : Kebalikan ProtectedRoute, untuk halaman login/register. Sudah login
//            -> jangan boleh melihat halaman itu lagi.
// Selesai kalau: sudah login, buka /login -> dialihkan ke dashboard.

// TODO(human): src/components/AdminRoute.jsx
// Petunjuk : Hanya role admin. Selain itu dialihkan. Ingat: ini cuma UX. Siapa
//            yang sebenarnya menolak user biasa saat memanggil endpoint admin?
// Selesai kalau: user biasa membuka /admin -> dialihkan.

// TODO(human): src/components/RoleRoute.jsx (bonus)
// Petunjuk : Versi generik yang menerima daftar role yang diizinkan lewat props.
// Selesai kalau: menggantikan AdminRoute tanpa mengubah perilakunya.

// TODO(human): src/App.jsx — susun router dan provider.
// Petunjuk : Rute publik (Home, 404), rute tamu (login/register), rute yang
//            butuh login (dashboard, profile), dan rute admin. Pikirkan di
//            mana AuthProvider harus diletakkan relatif terhadap router.
// Selesai kalau: semua rute di atas berperilaku sesuai checklist di TUGAS.md.

// TODO(human): src/components/Navbar.jsx
// Petunjuk : Menu berbeda untuk tamu, user login, dan admin. Tombol logout
//            memanggil logout() dari konteks.
// Selesai kalau: user biasa tidak melihat menu admin.

// TODO(human): src/pages/Profile.jsx — halaman yang dilindungi.
// Selesai kalau: menampilkan nama, email, dan role dari data konteks.

// TODO(human): src/pages/LoginPage.jsx — form login + redirect ke halaman asal.
// Petunjuk : Ambil halaman asal dari state router (`useLocation`). Tampilkan
//            error dari server, dan matikan tombol saat request berjalan.
// Selesai kalau: login sukses mengembalikan ke halaman asal, login gagal
//            menampilkan pesan.

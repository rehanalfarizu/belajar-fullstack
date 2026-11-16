// ============================================================
// TUGAS 4 — Role-Based Access Control (RBAC): backend + frontend
// ============================================================
// File ini adalah daftar tugas (TODO(human)), bukan komponen jadi. Tiap TODO
// kamu tulis di proyekmu sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install: npm install react-router-dom
// Jalankan frontend: cd client && npm run dev   (Vite, bukan npm start)
// Backend harus jalan di: http://localhost:3001/api
// ============================================================

// Sebelum menulis kode, isi tabel ini untuk role-mu (Y/N):
//
// | Fitur               | user | author | editor | admin |
// |---------------------|------|--------|--------|-------|
// | Lihat dashboard     |      |        |        |       |
// | Lihat profil sendiri|      |        |        |       |
// | Buat post           |      |        |        |       |
// | Edit post sendiri   |      |        |        |       |
// | Edit semua post     |      |        |        |       |
// | Publish post        |      |        |        |       |
// | Hapus post          |      |        |        |       |
// | Kelola user         |      |        |        |       |
// | Admin panel         |      |        |        |       |
//
// Catatan: set role di sini (user/author/editor/admin) berbeda dari
// 01-latihan-auth (admin/user/guest). Pilih satu set, tulis di jurnal, pakai
// konsisten di backend dan frontend.

// ------------------------------------------------------------
// BACKEND
// ------------------------------------------------------------

// TODO(human): middleware pabrik requireRole(...allowedRoles)
// Petunjuk : Bedakan "belum login" dari "login tapi tidak berhak" (status code
//            berbeda). Contoh pemakaian yang kamu harapkan:
//            app.delete('/api/posts/:id', authMiddleware, requireRole('admin'), handler)
// Selesai kalau: user biasa memanggil endpoint admin dengan curl -> 403.

// TODO(human): requireMinRole(minRole) dengan hierarki role
// Petunjuk : Kalau role punya tingkatan (user < author < editor < admin), kamu
//            tidak perlu menulis semua kombinasi. Struktur data apa yang bisa
//            menerjemahkan nama role jadi angka yang bisa dibandingkan? Apa
//            yang terjadi kalau role tidak dikenal?
// Selesai kalau: editor lolos requireMinRole('author'), author ditolak di
//            requireMinRole('editor'), role asing ditolak.

// ------------------------------------------------------------
// FRONTEND
// ------------------------------------------------------------

// TODO(human): perluas AuthContext dengan pengecekan role
// Petunjuk : Tambahkan fungsi bantu seperti hasRole, hasMinRole, hasAnyRole
//            (nama bebas). Ambil role dari data user yang datang dari server,
//            jangan dari localStorage.
// Selesai kalau: komponen lain bisa bertanya "apakah user ini minimal editor?".

// TODO(human): src/components/HasRole.jsx — render bersyarat per role
// Petunjuk : Komponen pembungkus yang menampilkan children hanya jika role
//            cocok, dan menampilkan `fallback` kalau tidak. Ingat: menyembunyikan
//            tombol itu UX, bukan keamanan.
// Selesai kalau: <HasRole ...> membungkus tombol/menu dan tampil/hilang sesuai role.

// TODO(human): src/components/Navbar.jsx — navigasi per role
// Selesai kalau: menu yang tampil mengikuti tabel permission-mu.

// TODO(human): src/pages/AdminPanel.jsx — halaman khusus admin
// Selesai kalau: user non-admin dialihkan, dan data admin yang diambil dari
//            server tetap ditolak server (403) walau halamannya dipaksa dibuka.

// TODO(human): src/pages/Dashboard.jsx — konten dashboard berbeda per role
// Selesai kalau: tiap role melihat panel yang sesuai tabel permission.

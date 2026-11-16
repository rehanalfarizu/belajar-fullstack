// ============================================================
// TUGAS 5 — AuthContext yang matang (setelah versi dasarmu jalan)
// ============================================================
// Daftar tugas (TODO(human)). Tulis di client/src/context/AuthContext.jsx
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Dependency: React dan client dari tugas 1.
// Kerjakan SETELAH AuthContext dasar (tugas 3) jalan. Di sini kamu
// mengerasinya.
// ============================================================

// TODO(human): status sesi yang lengkap: loading | authenticated | guest | error.
// Petunjuk : Bedakan "server bilang belum login (401)" dari "gagal memeriksa
//            (jaringan/500)". Keduanya bukan hal yang sama; UI-nya pun beda.
// Selesai kalau: mematikan server membuat status error (bukan guest), dan 401
//            membuat guest.

// TODO(human): dengarkan event 401 dari client axios (tugas 1).
// Petunjuk : Pasang listener di useEffect dan jangan lupa membersihkannya.
//            Saat sesi dicabut server di tengah pemakaian, state harus ikut
//            reset tanpa reload.
// Selesai kalau: menghapus cookie manual lalu memanggil API apa pun membuat UI
//            kembali ke guest.

// TODO(human): login, register, logout yang aman.
// Petunjuk : Error dari server dinormalkan (normalizeApiError) sebelum
//            dilempar ke form. Pada logout, reset state lokal walaupun request
//            ke server gagal — kenapa? Bagaimana mencegah nilai konteks
//            berubah identitas di tiap render (cari useMemo/useCallback)?
// Selesai kalau: logout selalu membuat UI jadi guest, dan komponen konsumen
//            tidak re-render tanpa alasan.

// TODO(human): hook useAuth + komponen kecil AuthStatus.
// Petunjuk : useAuth harus melempar error jelas bila dipakai di luar provider.
//            AuthStatus menampilkan empat keadaan dengan semantik yang benar
//            (role="status" untuk loading, role="alert" untuk error).
// Selesai kalau: keempat keadaan terlihat berbeda dan bisa dibaca screen reader.

// Kontrak backend yang kamu andalkan:
// - POST /auth/login mengatur cookie HttpOnly dan mengembalikan profil user.
// - GET /auth/me membaca cookie dan mengembalikan profil user.
// - POST /auth/logout mencabut sesi/refresh token dan menghapus cookie.
// - Cookie auth butuh pertahanan CSRF, CORS origin eksplisit, dan HTTPS.

// ============================================================
// TUGAS 1 — Axios client untuk auth berbasis cookie HttpOnly
// ============================================================
// Daftar tugas (TODO(human)). Tulis di proyek Vite-mu: client/src/lib/api.js
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install: npm install axios
// Server harus mengatur CORS origin eksplisit dan credentials: true.
// ============================================================

// TODO(human): buat axios instance bernama `api`.
// Petunjuk : Alamat API dari variabel env Vite (VITE_API_URL, dengan default
//            lokal). Atur timeout dan header Accept JSON. Agar cookie ikut
//            terkirim lintas origin, opsi apa yang dibutuhkan? (cek Request
//            Config di dokumentasi axios)
// Selesai kalau: tab Network menunjukkan header Cookie terkirim ke /auth/me
//            setelah login.

// TODO(human): interceptor response untuk status 401.
// Petunjuk : Jangan redirect langsung dari lapisan jaringan. Kenapa? (pikirkan
//            loop redirect di endpoint login/check-session, dan sulitnya dites).
//            Alternatifnya: umumkan lewat event (CustomEvent di window) supaya
//            AuthProvider yang memutuskan.
// Selesai kalau: 401 memicu event, error tetap diteruskan ke pemanggil, dan
//            tidak ada redirect di file ini.

// TODO(human): objek authAPI (register, login, getMe, logout, refresh) dan
//            postsAPI (getAll, getOne, create, update, remove).
// Petunjuk : Satu baris per fungsi. Untuk id di URL, apa risikonya kalau id
//            berisi karakter aneh? Cari encodeURIComponent.
// Selesai kalau: semua fungsi memanggil endpoint yang benar (cek di Network).

// TODO(human): normalizeApiError(error) — ubah error axios jadi { code, message,
//            status, fields }.
// Petunjuk : Bedakan: bukan error axios, tidak ada response (jaringan mati),
//            dan ada response dengan status tertentu (400, 401, 403, 404, 422,
//            429, 500). Utamakan pesan dari server, pakai pesan bawaan sebagai
//            cadangan. Cari axios.isAxiosError.
// Selesai kalau: server dimatikan menghasilkan code NETWORK_ERROR dan status
//            422 membawa daftar error per field.

// Latihan lanjutan:
// 1. Tambahkan pembatalan request dengan AbortController (config.signal).
// 2. Cegah beberapa refresh request berjalan bersamaan.
// 3. Tulis test untuk 401, 422, network error, dan timeout.

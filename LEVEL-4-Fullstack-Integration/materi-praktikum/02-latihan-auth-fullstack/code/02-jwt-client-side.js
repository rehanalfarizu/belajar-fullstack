// ============================================================
// TUGAS 2 — Auth service versi fetch (browser)
// ============================================================
// Daftar tugas (TODO(human)). Opsional: tulis di client/src/lib/authService.js
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Nama file dipertahankan agar urutan praktikum stabil. Pendekatan modern TIDAK
// membaca JWT dari JavaScript: server menaruh sesi di cookie HttpOnly, browser
// mengirimnya dengan credentials: "include".
// ============================================================

// TODO(human): class AuthService dengan method request(path, options).
// Petunjuk : Bungkus fetch: awalan alamat API, credentials "include", header
//            Accept JSON, dan Content-Type hanya jika ada body. Jangan lupa:
//            fetch tidak melempar error untuk status 4xx/5xx. Baca body JSON
//            hanya jika Content-Type-nya JSON, dan lempar Error yang membawa
//            status serta error per field. Terima implementasi fetch lewat
//            constructor — apa untungnya untuk pengujian?
// Selesai kalau: 401 melempar error dengan properti status = 401, dan 200
//            mengembalikan body.

// TODO(human): method login, register, getCurrentUser, refreshSession, logout.
// Petunjuk : getCurrentUser dan refreshSession: 401 itu keadaan normal
//            ("belum login"), bukan error — kembalikan nilai yang menandakannya.
//            Setelah login, simpan apa dan di mana? (Bukan token, bukan
//            localStorage.) Setelah logout, siapa yang menghapus cookie?
// Selesai kalau: getCurrentUser mengembalikan null saat belum login, dan error
//            non-401 tetap dilempar.

// TODO(human): catatan di jurnal — daftar keamanan sisi server untuk cookie auth.
// Petunjuk : Minimal bahas atribut cookie, CORS, CSRF, rotasi refresh token,
//            rate limit, dan otorisasi per endpoint. Tidak ada yang boleh
//            diserahkan ke frontend saja.

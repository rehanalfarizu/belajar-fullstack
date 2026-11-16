/**
 * Server Autentikasi (register, login, profile, logout)
 *
 * TUGAS: Lengkapi bagian TODO(human) sampai semua endpoint jalan dengan aman.
 * Selesaikan dulu 01-hash-password.js, karena file ini memakai fungsinya.
 *
 * Jalankan:
 *   cd modul-keamanan-web/04-autentikasi-dan-password/kerjakan-di-sini
 *   npm install
 *   node 02-auth-server.js
 *
 * Tes pakai curl (-c dan -b menyimpan/mengirim cookie, mirip browser):
 *   curl -X POST http://127.0.0.1:3040/register -H "Content-Type: application/json" \
 *     -d '{"username":"budi","password":"latihan-saja-123"}'
 *   curl -c cookie.txt -X POST http://127.0.0.1:3040/login -H "Content-Type: application/json" \
 *     -d '{"username":"budi","password":"latihan-saja-123"}'
 *   curl -b cookie.txt http://127.0.0.1:3040/profile
 *   curl -b cookie.txt -X POST http://127.0.0.1:3040/logout
 *
 * Aturan pesan error (penting!):
 *   Kalau login gagal, pesannya SELALU "Username atau password salah".
 *   Jangan bilang "username tidak ditemukan" atau "password salah".
 *   Pikirkan: kalau pesannya beda, informasi apa yang kamu bocorkan ke penyerang?
 */

const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
// SQLite bawaan Node.js (butuh Node 22.18+), tidak perlu install apa-apa
const { DatabaseSync } = require('node:sqlite');
const { hashPassword, verifyPassword } = require('./01-hash-password');

const app = express();
app.use(express.json());

// ============================================
// Database (in-memory, hilang saat server dimatikan)
// ============================================
const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// ============================================
// TODO(human): Konfigurasi session cookie
// ============================================
// Saat ini cookie session pakai pengaturan default. Lengkapi objek `cookie`.
//
// Pertanyaan yang harus kamu jawab sendiri (cari di dokumentasi express-session:
// https://www.npmjs.com/package/express-session bagian "cookie"):
// - Opsi apa yang membuat JavaScript di browser TIDAK bisa membaca cookie ini?
//   (hubungkan dengan XSS di modul 06)
// - Opsi apa yang mengatur apakah cookie ikut terkirim dari website lain?
//   Nilainya ada 3. Mana yang cocok untuk lab ini?
// - Opsi `secure: true` artinya cookie hanya lewat HTTPS. Kalau kamu nyalakan
//   di sini (http://127.0.0.1), apa yang terjadi saat login? Kenapa?
// - Berapa lama session sebaiknya hidup? Cari opsi untuk umur cookie.
//
// Soal `secret`: nilai di bawah cuma untuk latihan. Di modul 07 kamu akan
// belajar memindahkannya ke environment variable.
app.use(session({
  secret: process.env.SESSION_SECRET || 'contoh-secret-latihan-jangan-dipakai',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // TODO(human): isi opsi cookie di sini
  },
}));

// ============================================
// TODO(human): Rate limiting untuk /login
// ============================================
// Target: maksimal 5 percobaan login per IP per 1 menit. Percobaan ke-6 → 429.
//
// Petunjuk:
// - Baca README express-rate-limit: https://www.npmjs.com/package/express-rate-limit
// - Kamu perlu menentukan: panjang "jendela waktu" (dalam milidetik) dan batas request.
// - Pasang limiter HANYA di route /login, bukan di semua route. Kenapa?
//
// Saat ini loginLimiter cuma meneruskan request (belum membatasi apa-apa).
// Ganti dengan hasil rateLimit({ ... }).
const loginLimiter = (req, res, next) => next();
void rateLimit; // hapus baris ini setelah kamu memakai rateLimit di atas

// ============================================
// Validasi sederhana (sudah jadi, boleh kamu perketat)
// ============================================
function bacaKredensial(body) {
  const username = typeof body?.username === 'string' ? body.username.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  return { username, password };
}

// ============================================
// POST /register
// ============================================
app.post('/register', async (req, res) => {
  const { username, password } = bacaKredensial(req.body);

  if (username.length < 3 || password.length < 8) {
    return res.status(400).json({ error: 'Username minimal 3 karakter, password minimal 8 karakter' });
  }

  // TODO(human): Simpan user baru dengan password yang SUDAH di-hash
  //
  // Langkah:
  // 1. Hash password pakai hashPassword() dari 01-hash-password.js
  // 2. INSERT ke tabel users (pakai parameterized query seperti modul 03!)
  // 3. Kalau username sudah dipakai, INSERT akan error karena UNIQUE.
  //    Tangkap error itu dan balas status yang masuk akal (cari: 409 artinya apa?)
  // 4. Balas 201 tanpa mengirim balik password atau hash-nya
  //
  // Cara cek hasilmu: tambahkan console.log isi tabel users sementara.
  // Kolom password_hash harus diawali "$2", bukan password polos.

  res.status(501).json({ error: 'Belum diimplementasi' });
});

// ============================================
// POST /login
// ============================================
app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = bacaKredensial(req.body);

  // TODO(human): Verifikasi kredensial lalu buat session
  //
  // Langkah:
  // 1. Ambil user dari database berdasarkan username (parameterized query)
  // 2. Kalau user tidak ada ATAU verifyPassword() false
  //    → 401 dengan pesan "Username atau password salah" (pesan yang SAMA untuk dua kasus)
  // 3. Kalau cocok, simpan identitas user di req.session (cukup id-nya, jangan hash-nya)
  //
  // Bonus (session fixation): cari di dokumentasi express-session fungsi
  // req.session.regenerate(). Kenapa sebaiknya session ID diganti tepat setelah login?
  //
  // Bonus (timing): kalau user tidak ditemukan kamu langsung return, sedangkan
  // kalau ditemukan kamu menjalankan bcrypt yang lambat. Apakah perbedaan waktu
  // respons ini bisa membocorkan sesuatu? Catat pendapatmu di catatan.md.

  void username; void password; void verifyPassword; // hapus setelah dipakai
  res.status(501).json({ error: 'Belum diimplementasi' });
});

// ============================================
// Middleware: wajib login
// ============================================
// TODO(human): Lengkapi middleware ini
// - Kalau di session tidak ada user id → 401
// - Kalau ada → panggil next()
function requireLogin(req, res, next) {
  // TODO(human): tulis kodemu di sini
  next();
}

// ============================================
// GET /profile (hanya untuk yang sudah login)
// ============================================
app.get('/profile', requireLogin, (req, res) => {
  // TODO(human): Ambil user berdasarkan id di session, kirim id, username, created_at.
  // Jangan pernah kirim password_hash ke client, walaupun itu "cuma hash".
  res.status(501).json({ error: 'Belum diimplementasi' });
});

// ============================================
// POST /logout
// ============================================
app.post('/logout', (req, res) => {
  // TODO(human): Hapus session di server, lalu bersihkan cookie di browser.
  // Petunjuk: cari req.session.destroy() di dokumentasi express-session,
  // dan res.clearCookie() di dokumentasi Express.
  // Pertanyaan: kalau cuma cookie di browser yang dihapus, apakah session di
  // server ikut hilang? Apa risikonya kalau cookie lama sempat dicuri?
  res.status(501).json({ error: 'Belum diimplementasi' });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Server latihan autentikasi',
    endpoints: ['POST /register', 'POST /login', 'GET /profile', 'POST /logout'],
  });
});

// ============================================
// Start server
// ============================================
const PORT = 3040;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
// Tanpa ini, Express membuka port ke SEMUA jaringan (termasuk WiFi kampus).
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server auth berjalan di http://127.0.0.1:${PORT}`);
  console.log('Lengkapi TODO(human) di file ini, lalu tes pakai curl.');
});

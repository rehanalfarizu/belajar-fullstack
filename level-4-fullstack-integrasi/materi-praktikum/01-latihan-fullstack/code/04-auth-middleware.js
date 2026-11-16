// ============================================================
// SOAL 04 — AUTH MIDDLEWARE (JWT)
// ============================================================
// Install : npm install express jsonwebtoken cors dotenv
// Jalankan: node code/04-auth-middleware.js   (butuh .env berisi JWT_SECRET)
// Buat token percobaan lewat endpoint pembantu di bawah, atau skrip jwt.sign
// kecil buatanmu.
// ============================================================

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error('JWT_SECRET wajib diisi dan minimal 32 karakter');
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Data user simulasi (tanpa password; fokus latihan ini adalah middleware)
const users = [
  { id: 1, email: 'admin@example.com', role: 'admin' },
  { id: 2, email: 'user@example.com', role: 'user' },
];

// Endpoint pembantu: keluarkan token untuk user tertentu. Hanya untuk latihan.
app.post('/api/auth/token', (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (!user) return res.status(400).json({ error: 'User tidak ditemukan' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// TODO(human): authMiddleware(req, res, next)
// Petunjuk : Baca header Authorization (format `Bearer <token>`), verifikasi
//            dengan SECRET, simpan payload di req.user, lalu next(). Dua kasus
//            gagal dengan status berbeda: token tidak ada vs token tidak
//            sah/kedaluwarsa. Mulai dengan versi yang cuma console.log header.
// Selesai kalau: tanpa token 401; token ngawur atau diubah satu huruf ditolak;
//            token valid membuat req.user terisi.

// TODO(human): requireAdmin(req, res, next)
// Petunjuk : Dipasang SETELAH authMiddleware. Role bukan admin -> status apa?
// Selesai kalau: user biasa mendapat 403, admin lolos.

// TODO(human): pasang route berikut dengan middleware yang tepat.
//   GET    /api/protected/profile   -> kembalikan data user dari token
//   DELETE /api/protected/account   -> pesan akun dihapus (simulasi)
//   GET    /api/admin/dashboard     -> hanya admin
// Selesai kalau: ketiga route lolos uji di bagian "Cara Mengecek Hasil Sendiri"
//            pada TUGAS.md.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth middleware server: http://localhost:${PORT}`);
});

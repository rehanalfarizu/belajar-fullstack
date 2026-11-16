// ============================================================
// SOAL 01 — REGISTER & LOGIN (JWT)
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express bcryptjs jsonwebtoken cors dotenv
// Jalankan: node code/01-register-login-jwt.js   (butuh .env berisi JWT_SECRET)
// ============================================================

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}

const app = express();
app.use(cors());
app.use(express.json());

// Penyimpanan user in-memory (di aplikasi nyata diganti database)
const users = [];

// TODO(human): POST /api/auth/register
// Petunjuk : Gambar dulu alurnya di kertas: input apa, dicek apa, disimpan apa,
//            dikembalikan apa. Validasi nama, email, dan password (minimal 8
//            karakter). Email yang sudah terdaftar itu status code apa? Password
//            TIDAK boleh disimpan apa adanya dan TIDAK boleh ikut di response.
//            Cek dokumentasi `bcryptjs` untuk fungsi hash dan arti "salt rounds".
// Selesai kalau: register valid -> 201 tanpa field password; email yang sama
//            didaftarkan lagi -> ditolak; `console.log(users)` menunjukkan
//            password berupa hash (diawali `$2`).

// TODO(human): POST /api/auth/login
// Petunjuk : Cari user, bandingkan password dengan hash-nya (fungsi compare
//            bcryptjs itu async, jangan lupa await). Email tidak ada dan
//            password salah sebaiknya memberi pesan yang SAMA. Kenapa? Isi
//            token (payload) bisa dibaca siapa saja — apa yang aman ditaruh
//            di sana? Beri masa berlaku (lihat opsi `expiresIn` di README
//            jsonwebtoken).
// Selesai kalau: login benar -> token + info user (tanpa password); login salah
//            (email atau password) -> pesan identik; token tampil di jwt.io
//            (token latihan saja!) dengan payload yang kamu harapkan.

// TODO(human): fungsi authMiddleware(req, res, next)
// Petunjuk : Token datang lewat header `Authorization: Bearer <token>`. Tiga
//            keadaan berbeda: header tidak ada, token rusak/palsu, token
//            kedaluwarsa. Tulis dulu versi yang hanya console.log header lalu
//            next(), baru isi verifikasinya.
// Selesai kalau: tanpa token -> 401; token diubah satu huruf -> ditolak; token
//            valid -> handler berikutnya jalan dan `req.user` terisi.

// TODO(human): GET /api/auth/me (dilindungi authMiddleware)
// Petunjuk : Ambil user dari data token, lalu cari datanya di `users`.
//            Apa yang terjadi kalau user sudah tidak ada tapi token masih sah?
// Selesai kalau: dengan token valid mengembalikan data user tanpa password.

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Auth server running" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth server berjalan di http://localhost:${PORT}`);
});

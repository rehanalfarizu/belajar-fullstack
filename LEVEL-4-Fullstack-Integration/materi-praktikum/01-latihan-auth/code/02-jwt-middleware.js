// ============================================================
// SOAL 02 — JWT MIDDLEWARE & PROTECTED ROUTES
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express jsonwebtoken cors dotenv
// Jalankan: node code/02-jwt-middleware.js   (butuh .env berisi JWT_SECRET)
// ============================================================

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Data demo
const posts = [
  { id: 1, title: "Post 1", content: "Content 1" },
  { id: 2, title: "Post 2", content: "Content 2" },
];

// TODO(human): fungsi authMiddleware(req, res, next)
// Petunjuk : Baca header Authorization (format `Bearer <token>`), verifikasi
//            dengan SECRET, taruh hasilnya di `req.user`, lalu lanjut. Bedakan
//            tiga kasus dengan status code yang tepat: tidak ada token, token
//            kedaluwarsa, token tidak sah. Cek `error.name` dari
//            jsonwebtoken di dokumentasinya. Pikirkan juga: kenapa 401 dan
//            403 itu beda arti?
// Selesai kalau: ketiga kasus di atas masing-masing memberi respons berbeda,
//            dan token valid membuat `req.user` berisi id dan email.

// ---- Route publik (tidak perlu token) ----
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

app.get("/api/public", (req, res) => {
  res.json({ success: true, data: posts, message: "Data publik, bisa diakses tanpa token" });
});

// TODO(human): route yang dilindungi middleware — GET /api/profile,
//            GET /api/settings, POST /api/data.
// Petunjuk : Pasang authMiddleware di route, bukan menyalin pengecekan token
//            ke tiap handler. Isi respons bebas, yang penting memakai
//            `req.user`.
// Selesai kalau: ketiganya menolak request tanpa token, dan /api/public serta
//            /api/health tetap terbuka.

// TODO(human): GET /api/admin/stats — hanya untuk admin.
// Petunjuk : Token tahu role pemiliknya? Dari mana role itu masuk ke token
//            (siapa yang menulisnya saat login)? Role tidak cocok -> status
//            code apa?
// Selesai kalau: token user biasa -> 403, token admin -> 200.

// Cara membuat token percobaan: tulis skrip kecil memakai jwt.sign dengan
// SECRET yang sama dari .env, atau pakai server dari soal 01.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Protected routes server: http://localhost:${PORT}`);
});

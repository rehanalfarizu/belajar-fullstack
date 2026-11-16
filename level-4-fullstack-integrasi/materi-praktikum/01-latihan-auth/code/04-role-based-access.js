// ============================================================
// SOAL 04 — ROLE-BASED ACCESS CONTROL (RBAC)
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express jsonwebtoken cors dotenv
// Jalankan: node code/04-role-based-access.js   (butuh .env berisi JWT_SECRET)
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
let posts = [
  { id: 1, title: "Post 1", content: "Content 1", authorId: 1 },
  { id: 2, title: "Post 2", content: "Content 2", authorId: 2 },
];

const users = [
  { id: 1, nama: "Admin", email: "admin@email.com", role: "admin" },
  { id: 2, nama: "User Biasa", email: "user@email.com", role: "user" },
  { id: 3, nama: "Guest", email: "guest@email.com", role: "guest" },
];

// Autentikasi (kamu sudah menulisnya di soal 02) — di sini disediakan supaya
// fokus ke otorisasi.
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token diperlukan" });
  }
  try {
    req.user = jwt.verify(authHeader.split(" ")[1], SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token invalid" });
  }
}

// Endpoint pembantu: bikin token percobaan untuk role tertentu.
// (Hanya untuk latihan. Di aplikasi nyata token dibuat saat login.)
app.post("/api/auth/token", (req, res) => {
  const user = users.find((u) => u.role === req.body.role);
  if (!user) return res.status(400).json({ error: "Role tidak ditemukan" });
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token, role: user.role });
});

// Sebelum ngoding, isi tabel ini di kertas (boleh/tidak):
//
//   endpoint                  | guest | user | admin
//   GET    /api/posts         |       |      |
//   POST   /api/posts         |       |      |
//   PUT    /api/posts/:id     |       |      |   (user: hanya miliknya sendiri)
//   DELETE /api/posts/:id     |       |      |
//   GET    /api/admin/stats   |       |      |
//   GET    /api/users         |       |      |

// TODO(human): fungsi authorize(...allowedRoles) — middleware pabrik.
// Petunjuk : Fungsi yang MENGEMBALIKAN middleware. Dua pertanyaan berbeda:
//            "kamu siapa?" (belum login) dan "kamu boleh?" (login tapi role
//            salah). Masing-masing status code berbeda.
// Selesai kalau: authorize("admin") meloloskan admin, menolak user dan guest
//            dengan 403, dan menolak request tanpa login dengan 401.

// TODO(human): pasang route sesuai tabelmu.
// Petunjuk : GET /api/posts publik. Untuk "PUT hanya pemilik atau admin",
//            pikirkan: data apa yang harus dibandingkan, dan kenapa itu tidak
//            bisa diselesaikan hanya dengan authorize()? Perhatikan juga
//            urutan middleware: authMiddleware harus jalan sebelum authorize.
// Selesai kalau: tabelmu terbukti lewat curl — user biasa DELETE -> 403, user
//            edit post orang lain -> 403, admin boleh semuanya.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`RBAC server: http://localhost:${PORT}`));

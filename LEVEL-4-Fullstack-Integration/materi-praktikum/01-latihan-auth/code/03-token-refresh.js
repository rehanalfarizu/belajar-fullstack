// ============================================================
// SOAL 03 — TOKEN REFRESH
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express jsonwebtoken cors bcryptjs dotenv
// Jalankan: node code/03-token-refresh.js
//           (.env: JWT_SECRET dan JWT_REFRESH_SECRET, masing-masing >= 32 karakter)
// ============================================================

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
if (!SECRET || SECRET.length < 32 || !REFRESH_SECRET || REFRESH_SECRET.length < 32) {
  throw new Error("JWT_SECRET dan JWT_REFRESH_SECRET wajib minimal 32 karakter");
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Catatan: demi mudah diuji dengan curl, token dikembalikan di body JSON.
// Untuk browser, refresh token seharusnya di cookie HttpOnly (dibahas di
// 02-latihan-auth-fullstack). Di aplikasi nyata simpan hash/id refresh token
// di database, bukan di array.

const users = [
  {
    id: 1,
    email: "admin@email.com",
    password: bcrypt.hashSync("password123", 10),
    nama: "Admin User",
  },
];
const refreshTokens = []; // tempat menyimpan refresh token yang masih sah

// Sebelum ngoding, jawab di jurnal:
//   1. Kenapa access token dibuat pendek umurnya?
//   2. Apa yang terjadi kalau refresh token dicuri?
//   3. Bagaimana "rotasi" (token lama hangus tiap dipakai) membantu?

// TODO(human): POST /api/auth/login — keluarkan DUA token.
// Petunjuk : Access token pendek umur (misalnya belasan menit) untuk akses API;
//            refresh token berumur panjang dan memakai REFRESH_SECRET yang
//            berbeda. Catat refresh token ke `refreshTokens`.
// Selesai kalau: login benar -> kedua token keluar; login salah -> 401.

// TODO(human): fungsi authMiddleware untuk access token.
// Petunjuk : Sama seperti soal 02. Pastikan ia memverifikasi dengan SECRET
//            (bukan REFRESH_SECRET). Apa jadinya kalau refresh token dipakai
//            sebagai access token?
// Selesai kalau: refresh token yang ditempel di header Authorization ditolak.

// TODO(human): POST /api/auth/refresh — tukar refresh token dengan access token baru.
// Petunjuk : Cek token ada di daftar yang sah DAN signature/umurnya valid.
//            Mulai tanpa rotasi sampai jalan. Setelah itu tambahkan rotasi:
//            token lama dihapus dan token refresh baru dikeluarkan.
// Selesai kalau: refresh token yang sudah dipakai sekali (setelah rotasi)
//            ditolak saat dipakai lagi.

// TODO(human): POST /api/auth/logout — cabut refresh token.
// Petunjuk : Hapus token dari daftar yang sah.
// Selesai kalau: setelah logout, refresh token lama ditolak oleh /refresh.

// TODO(human): GET /api/protected — route yang dilindungi access token.
// Selesai kalau: tanpa token 401, dengan access token valid 200.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Token refresh server: http://localhost:${PORT}`);
});

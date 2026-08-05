/**
 * ============================================================
 * LATIHAN 2.2: Middleware Kustom
 * ============================================================
 * Materi  : Express.js Dasar
 * Tujuan  : Membuat dan menggunakan middleware kustom untuk logging,
 *           validasi header, dan autentikasi sederhana.
 *
 * Requirements:
 * - Middleware logger -> catat method, URL, timestamp
 * - Middleware validateHeader -> cek X-Api-Key header
 * - Middleware authenticate -> cek query parameter token
 * - Middleware dipanggil dengan next() jika valid
 *
 * Install: npm install express
 * Run    : node02-middleware-kustom.js
 * ============================================================
 */

const express = require('express');
const app = express();
const PORT = 3000;

// ============================================================
// MIDDLEWARE 1: Logger
// TODO(human): Buat middleware logging
// Format log: [YYYY-MM-DD HH:mm:ss] METHOD /url
// Contoh: [2026-05-31 10:00:00] GET /api/data
// function logger(req, res, next) { ... }
// app.use(logger);

// ============================================================
// MIDDLEWARE 2: Validate Header
// TODO(human): Cek apakah header X-Api-Key ada
// Jika tidak ada: res.status(401).json({ error: "X-Api-Key header diperlukan!" })
// Jika ada: panggil next()

// ============================================================
// MIDDLEWARE 3: Authenticate (query param)
// TODO(human): Cek apakah query token = "secret123"
// Jika tidak valid: res.status(403).json({ error: "Token tidak valid. Akses ditolak." })
// Jika valid: panggil next()

// ============================================================
// ROUTES
// TODO(human): Route GET /api/data -> { message: "Data berhasil diambil" }
// Tanpa proteksi (tidak pakai middleware authenticate)

// TODO(human): Route GET /api/secure -> { message: "Data sensitif berhasil diakses" }
// PAKAI middleware authenticate

// TODO(human): Route POST /api/create -> { message: "Data berhasil dibuat" }
// PAKAI middleware validateHeader DAN authenticate

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
 console.log('Coba akses:');
  console.log('  GET /api/data         (tanpa proteksi)');
  console.log('  GET  /api/secure?token=secret123 (dengan token)');
  console.log('  POST /api/create dengan header X-Api-Key dan token query');
});

// ============================================================
// EXPECTED OUTPUT (console):
// ============================================================
// [2026-05-31 10:00:00] GET /api/data
// [2026-05-31 10:00:02] POST /api/create
// X-Api-Key header diperlukan!
// Token tidak valid. Akses ditolak.
// ============================================================

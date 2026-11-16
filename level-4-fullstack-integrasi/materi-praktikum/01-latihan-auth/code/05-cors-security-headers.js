// ============================================================
// SOAL 05 — CORS & SECURITY HEADERS
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express cors helmet express-rate-limit dotenv
// Jalankan: node code/05-cors-security-headers.js
// Periksa : curl -i http://localhost:3001/api/public  (lihat header response)
// ============================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = 3001;

// Pasang SATU per satu, dan setelah tiap langkah cek header dengan curl -i.

// TODO(human): CORS dengan allowlist origin.
// Petunjuk : Origin frontend-mu (misalnya http://localhost:5173) harus eksplisit,
//            bukan "*". Kenapa "*" tidak boleh dipakai bersama cookie
//            (credentials)? Baca bagian opsi di README paket `cors` dan
//            materi-teori/02-cors-cookies.
// Selesai kalau: request dengan header `Origin` yang tidak ada di allowlist
//            tidak mendapat header Access-Control-Allow-Origin.

// TODO(human): Helmet — header keamanan.
// Petunjuk : Pasang dengan default dulu. Bandingkan header response sebelum
//            dan sesudah. Setelah itu baca apa itu Content-Security-Policy dan
//            tentukan sendiri kebijakan yang cocok untuk API ini.
// Selesai kalau: `curl -i` menampilkan header seperti X-Content-Type-Options:
//            nosniff, dan kamu bisa menjelaskan fungsi tiga header di
//            dalamnya.

// TODO(human): rate limit global.
// Petunjuk : Pakai express-rate-limit (lihat opsi `windowMs` dan `limit`/`max`
//            sesuai versi yang kamu install — cek README versinya, nama opsi
//            berubah antar versi). Pasang sebagai middleware global.
// Selesai kalau: melewati batas -> 429 dan response membawa info sisa kuota.

// TODO(human): rate limit ketat untuk /api/auth/login dan /api/auth/register.
// Petunjuk : Batas jauh lebih kecil dari global (ini pertahanan brute force).
//            Saat latihan turunkan batasnya jadi 3 supaya mudah diuji.
// Selesai kalau: percobaan login berulang melewati batas -> 429.

app.use(express.json());

// Endpoint demo untuk diuji (isinya simulasi, tidak ada validasi).
app.get("/api/public", (req, res) => {
  res.json({ success: true, message: "Endpoint publik" });
});

app.post("/api/auth/login", (req, res) => {
  res.json({ success: true, message: "Login berhasil (simulasi)" });
});

app.post("/api/auth/register", (req, res) => {
  res.json({ success: true, message: "Registrasi berhasil (simulasi)" });
});

app.listen(PORT, () => {
  console.log(`Security server: http://localhost:${PORT}`);
});

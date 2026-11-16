// ============================================================
// 02 — XSS & CSRF
// ============================================================
// Starter ini berisi kerangka + TODO(human). Versi RENTAN sengaja ada untuk
// diserang; versi AMAN kamu tulis sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express helmet cookie-parser dotenv
//           (+ dompurify jsdom jika kamu memilih sanitasi HTML)
// Catatan : paket `csurf` sudah DEPRECATED (diarsipkan, tidak dirawat) — jangan
//           dipakai. Pahami polanya, lalu tulis sendiri seperti TODO di bawah.
//           Untuk produksi, pakai paket yang masih dirawat: `csrf-csrf` (signed
//           double-submit cookie, tanpa state server) atau `csrf-sync`
//           (synchronizer token, untuk aplikasi bersesi). Baca README-nya.
// ============================================================

const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

// ============================================================
// BAGIAN 1 — XSS
// ============================================================

// TODO(human): sanitizeHTML(dirty)
// Petunjuk : Dua strategi berbeda: (a) escape semua karakter spesial HTML, atau
//            (b) allowlist tag/atribut tertentu dengan library sanitizer
//            (cek dokumentasi DOMPurify, perhatikan juga bagaimana memakainya
//            di Node). Pilih satu, tulis alasanmu di jurnal.
//            Yang harus mati: event handler (onerror, onclick), URL
//            `javascript:`, tag <script>.
// Selesai kalau: '<img src=x onerror=alert(1)>' dan '<script>alert(1)</script>'
//            tidak lagi bisa mengeksekusi script saat dirender.
function sanitizeHTML(dirty) {}

// TODO(human): sanitizeInput(input)
// Petunjuk : Bukan string -> aman; buang spasi tepi dan karakter null; batasi
//            panjang (10.000).
// Selesai kalau: input 1 juta karakter dipotong dan "\0" hilang.
function sanitizeInput(input) {}

// ============================================================
// BAGIAN 2 — CSP (Content-Security-Policy)
// ============================================================

// TODO(human): konfigurasi CSP untuk Helmet.
// Petunjuk : Mulai dari "semua hanya dari asal sendiri" lalu longgarkan hanya
//            kalau ada alasan. Pikirkan: script, style, img (data: untuk gambar
//            base64?), connect, font, object, frame-ancestors (anti
//            clickjacking), form-action, base-uri. Cek nama direktif dan format
//            opsi di dokumentasi Helmet untuk versi yang terpasang.
// Selesai kalau: `curl -i` menampilkan header Content-Security-Policy, dan
//            kamu bisa menjelaskan fungsi tiap direktif yang kamu pilih.
const cspConfig = {};

// ============================================================
// BAGIAN 3 — CSRF (token tulis-sendiri, hanya untuk BELAJAR konsep)
// ============================================================

const csrfTokens = new Map(); // sessionId -> { token, expiresAt }

// TODO(human): generateCSRFToken(sessionId)
// Petunjuk : Token acak yang tak bisa ditebak (modul `crypto`, 32 byte), simpan
//            per sesi dengan masa kedaluwarsa (misalnya 1 jam), kembalikan.
// Selesai kalau: dua pemanggilan berbeda menghasilkan token berbeda.
function generateCSRFToken(sessionId = 'default-session') {}

// TODO(human): validateCSRFToken(sessionId, token)
// Petunjuk : Token ada? Belum kedaluwarsa? Bandingkan dengan cara yang tahan
//            serangan timing (cari `crypto.timingSafeEqual`; perhatikan
//            syaratnya soal panjang buffer).
// Selesai kalau: token benar true; token salah/kedaluwarsa/undefined false
//            tanpa melempar error.
function validateCSRFToken(sessionId, token) {}

// TODO(human): csrfMiddleware(req, res, next)
// Petunjuk : Method aman (GET/HEAD/OPTIONS) dilewati. Method yang mengubah data
//            butuh token dari header kustom. Kenapa header kustom lebih baik
//            daripada token di body untuk API yang dipanggil JavaScript?
// Selesai kalau: POST tanpa token -> 403; POST dengan token valid -> lanjut.
function csrfMiddleware(req, res, next) {}

// ============================================================
// BAGIAN 4 — Cookie aman
// ============================================================

// TODO(human): setSecureCookie(res, name, value)
// Petunjuk : Tiga atribut penting: httpOnly (apa yang dicegah?), secure
//            (kapan wajib?), sameSite (bandingkan strict vs lax, kapan
//            butuh none?). Tentukan juga umur cookie.
// Selesai kalau: header Set-Cookie di curl -i memuat atribut yang kamu pilih
//            dan kamu bisa menjelaskan tiap atribut.
function setSecureCookie(res, name, value) {}

// ============================================================
// SERVER DEMO
// ============================================================

const app = express();
app.use(express.json());
// TODO(human): pasang Helmet dengan cspConfig-mu.

app.get('/api/csrf-token', (req, res) => {
  // TODO(human): keluarkan token untuk sesi ini (identifikasi sesi dengan
  // cara yang kamu pilih — sadari bahwa header buatan klien tidak aman untuk
  // identitas sesi di aplikasi nyata).
  res.status(501).json({ error: 'Belum diimplementasikan' });
});

// RENTAN SENGAJA — jangan dicontoh di aplikasi nyata. Untuk berlatih menyerang.
app.post('/api/comments/insecure', (req, res) => {
  res.json({ message: 'Comment stored (INSECURE)', original: req.body.content });
});

// TODO(human): POST /api/comments versi AMAN — pasang csrfMiddleware, lalu
// sanitasi konten sebelum dikembalikan.
// Selesai kalau: tanpa token -> 403; dengan token + payload XSS -> hasil
//            sudah dinetralkan.

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Security server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, sanitizeHTML, sanitizeInput, generateCSRFToken, validateCSRFToken, csrfMiddleware, setSecureCookie };

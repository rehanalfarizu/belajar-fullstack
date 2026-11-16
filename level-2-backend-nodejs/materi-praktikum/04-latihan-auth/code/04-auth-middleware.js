/**
 * ============================================================
 * LATIHAN 4.4: Auth Middleware
 * ============================================================
 * Materi  : Authentication dan Authorization
 * Tujuan  : Membuat middleware autentikasi JWT yang memverifikasi token
 *           di setiap request dan melindungi route tertentu.
 *
 * Requirements:
 * - Middleware authenticateToken -> ekstrak Bearer token dari header
 * - Verifikasi token dengan jwt.verify()
 * - Jika token tidak ada/invalid/kedaluwarsa -> 401 (role tidak cukup baru 403)
 * - Jika valid -> req.user = decoded, next()
 * - Route GET /protected -> pakai middleware
 * - Route GET /public    -> tidak pakai middleware
 *
 * Install: npm install express jsonwebtoken
 * Run    : node 04-auth-middleware.js
 * ============================================================
 */

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret-key-yang-aman-minimal-32-karakter';

app.use(express.json());

// ============================================================
// IN-MEMORY USERS (untuk simulasi)
// TODO(human): const users = [{ id: 1, email: 'user@email.com', password: 'hashed_password' }];

// ============================================================
// MIDDLEWARE: Authenticate Token
// TODO(human): tulis authenticateToken(req, res, next) sesuai soal

// ============================================================
// ROUTE: POST /login (untuk dapat token)
// TODO(human): tulis app.post '/login' sesuai soal

// ============================================================
// ROUTE: GET /public (tanpa proteksi)
// TODO(human): tulis app.get '/public' sesuai soal

// ============================================================
// ROUTE: GET /protected (dengan proteksi)
// TODO(human): tulis app.get '/protected' sesuai soal

// ============================================================
// ROUTE: GET /profile (dengan proteksi)
// TODO(human): tulis app.get '/profile' sesuai soal

app.listen(PORT, () => {
  console.log(`Auth Server berjalan di http://localhost:${PORT}`);
  console.log('');
  console.log('TESTING:');
  console.log('1. Login dulu: POST /login -> dapat token');
  console.log('2. Akses publik: GET /public (tanpa header)');
  console.log('3. Akses terproteksi: GET /protected (tanpa token -> 401)');
  console.log('4. Akses terproteksi: GET /protected dengan header Authorization: Bearer <token>');
});

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// GET /public (tanpa token) -> 200: { "message": "Halaman publik - semua orang bisa akses" }
// GET /protected (tanpa token) -> 401: { "error": "Unauthorized", "message": "Token diperlukan" }
// GET /protected (token valid) -> 200: { "message": "Selamat datang di area terproteksi!", "user": { "userId": 1, "email": "..." } }
// GET /protected (token invalid) -> 401: { "error": "Unauthorized", "message": "Token tidak valid" }
// ============================================================

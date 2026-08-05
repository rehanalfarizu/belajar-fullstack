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
 * - Jika token invalid/tdk ada -> 401/403
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
// TODO(human): async function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized', message: 'Token diperlukan' });
//   }
//
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ error: 'Forbidden', message: 'Token tidak valid' });
//   }
// }

// ============================================================
// ROUTE: POST /login (untuk dapat token)
// TODO(human): app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email);
//   if (!user) return res.status(401).json({ error: 'Unauthorized', message: 'Email tidak ditemukan' });
//   const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
//   res.json({ message: 'Login berhasil', token });
// });

// ============================================================
// ROUTE: GET /public (tanpa proteksi)
// TODO(human): app.get('/public', (req, res) => {
//   res.json({ message: 'Halaman publik - semua orang bisa akses' });
// });

// ============================================================
// ROUTE: GET /protected (dengan proteksi)
// TODO(human): app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'Selamat datang di area terproteksi!', user: req.user });
// });

// ============================================================
// ROUTE: GET /profile (dengan proteksi)
// TODO(human): app.get('/profile', authenticateToken, (req, res) => {
//   res.json({ message: 'Profil kamu', user: req.user });
// });

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
// GET /protected (token invalid) -> 403: { "error": "Forbidden", "message": "Token tidak valid" }
// ============================================================

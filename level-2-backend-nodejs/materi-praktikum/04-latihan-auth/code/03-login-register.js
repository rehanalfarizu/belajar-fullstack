/**
 * ============================================================
 * LATIHAN 4.3: Login dan Register API
 * ============================================================
 * Materi  : Authentication dan Authorization
 * Tujuan  : Membangun endpoint register dan login yang lengkap dan aman.
 *           Termasuk validasi input, hashing password, dan JWT generation.
 *
 * Requirements:
 * - POST /register: { name, email, password } -> hash password, simpan
 * - Validasi: name min 3 char, email format valid, password min 6 char
 * - Cek email duplikat ->409 Conflict
 * - POST /login: { email, password } -> verify, return JWT
 * - Centralized error handler
 *
 * Install: npm install express bcryptjs jsonwebtoken
 * Run    : node 03-login-register.js
 * ============================================================
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret-key-yang-aman-minimal-32-karakter';
const SALT_ROUNDS = 10;

// ============================================================
// IN-MEMORY STORAGE
// TODO(human): const users = []; // { id, name, email, password (hashed) }

// ============================================================
// MIDDLEWARE
// TODO(human): tulis app.use sesuai soal

// ============================================================
// CUSTOM ERROR
// TODO(human): tulis bagian ini sesuai soal
// TODO(human): class ConflictError extends Error { constructor(msg) { super(msg); this.name='ConflictError'; this.statusCode=409; } }

// ============================================================
// VALIDATION HELPER
// TODO(human): tulis validateRegister(data) sesuai soal

// ============================================================
// ROUTE: POST /register
// TODO(human): Di handler:
// 1. validateRegister(req.body)
// 2. Cek email duplikat -> throw ConflictError('Email sudah terdaftar')
// 3. Hash password: await bcrypt.hash(req.body.password, SALT_ROUNDS)
// 4. Push ke array users
// 5. res.status(201).json({ message: 'Registrasi berhasil', userId: newUser.id })

// ============================================================
// ROUTE: POST /login
// TODO(human): Di handler:
// 1. Cari user by email -> if (!user) return401
// 2. bcrypt.compare(req.body.password, user.password)
// 3. Jika match: jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' })
// 4. res.json({ message: 'Login berhasil', token })

// ============================================================
// CENTRALIZED ERROR HANDLER
// TODO(human): tulis app.use sesuai soal

app.listen(PORT, () => {
  console.log(`Auth API berjalan di http://localhost:${PORT}`);
  console.log('POST /register -> { "name": "Budi", "email": "budi@email.com", "password": "rahasia123" }');
  console.log('POST /login   -> { "email": "budi@email.com", "password": "rahasia123" }');
});

// ============================================================
// EXPECTED OUTPUT (HTTP response):
// ============================================================
// POST /register (valid)      -> 201: { "message": "Registrasi berhasil", "userId": 1 }
// POST /register (duplikat)    -> 409: { "error": "ConflictError", "message": "Email sudah terdaftar" }
// POST /register (email invalid) -> 400: { "error": "ValidationError", "message": "Format email tidak valid" }
// POST /login (valid)         -> 200: { "message": "Login berhasil", "token": "eyJhbG..." }
// POST /login (password salah) -> 401: { "error": "Unauthorized", "message": "Password salah" }
// ============================================================

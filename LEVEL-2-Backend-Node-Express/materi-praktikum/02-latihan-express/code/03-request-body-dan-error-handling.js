/**
 * ============================================================
 * LATIHAN 2.3: Request Body dan Error Handling
 * ============================================================
 * Materi  : Express.js Dasar
 * Tujuan  : Menerima dan memproses data dari request body,
 *           membuat validasi input, serta centralized error handler.
 *
 * Requirements:
 * - Route POST /users -> terima { name, email, age }
 * - Validasi: name wajib isi, email format valid, age angka positif
 * - Return error 400 dengan pesan spesifik jika validasi gagal
 * - Centralized error handler dengan app.use((err, req, res, next))
 * - Handle ValidationError dan TypeError
 *
 * Install: npm install express
 * Run    : node 03-request-body-dan-error-handling.js
 * ============================================================
 */

const express = require('express');
const app = express();
const PORT = 3000;

// ============================================================
// CUSTOM ERROR CLASS
// TODO(human): Buat kelas ValidationError yang extends Error
// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'ValidationError';
//     this.statusCode = 400;
//   }
// }

// ============================================================
// MIDDLEWARE: JSON Parser
// app.use(express.json());

// ============================================================
// VALIDATION HELPER
// TODO(human): Buat fungsi validateUserData(data) yang:
// - throw ValidationError jika name kosong atau kurang dari 3 karakter
// - throw ValidationError jika email tidak match regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// - throw ValidationError jika age bukan angka positif
// - Mengembalikan true jika semua valid

// ============================================================
// ROUTE: POST /users
// TODO(human): Di handler:
// 1. Panggil validateUserData(req.body)
// 2. Jika berhasil, return res.status(201).json({ message: "User berhasil dibuat", data: req.body })
// 3. Tangkap ValidationError di catch block dan lempar ke centralized handler

// ============================================================
// ROUTE: GET /users (bonus - daftar semua user)
// const users = [];
// TODO(human): Route GET /users -> return res.json(users)

// ============================================================
// CENTRALIZED ERROR HANDLER
// TODO(human): app.use((err, req, res, next) => {
// console.error('Error:', err.message);
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json({ error: err.name, message: err.message });
//   }
//   if (err instanceof TypeError) {
//     return res.status(500).json({ error: 'TypeError', message: err.message });
//   }
//   res.status(500).json({ error: 'InternalServerError', message: 'Terjadi kesalahan server' });
// });

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('POST /users dengan body: { "name": "Budi", "email": "budi@email.com", "age": 25 }');
});

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// POST /users (valid)     -> 201: { "message": "User berhasil dibuat", "data": {...} }
// POST /users (email invalid) -> 400: { "error": "ValidationError", "message": "Format email tidak valid" }
// POST /users (tanpa name) -> 400: { "error": "ValidationError", "message": "Name wajib diisi" }
// ============================================================

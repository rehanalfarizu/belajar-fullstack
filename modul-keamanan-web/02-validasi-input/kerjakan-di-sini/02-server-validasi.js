/**
 * Server dengan Validasi Input
 *
 * TUGAS: Tambahkan validasi di endpoint /register
 *
 * Jalankan:
 *   cd modul-keamanan-web/02-validasi-input/kerjakan-di-sini
 *   npm install
 *   node 02-server-validasi.js
 *
 * Test dengan curl:
 *   curl -X POST http://localhost:3000/register \
 *     -H "Content-Type: application/json" \
 *     -d '{"username": "test", "email": "test@example.com", "password": "12345678", "age": 25}'
 */

const express = require('express');
const { z } = require('zod');

const app = express();
app.use(express.json());

// ============================================
// TODO(human): Buat Zod schema untuk validasi
// ============================================
// Aturan validasi:
// - username: string, 3-50 karakter, hanya huruf/angka/underscore
// - email: format email valid
// - password: minimal 8 karakter
// - age: angka integer, 13-120

const RegisterSchema = z.object({
  // TODO(human): Lengkapi schema di sini
  // Contoh: username: z.string().min(3).max(50),
});

// ============================================
// Endpoint Register
// ============================================
app.post('/register', (req, res) => {
  // TODO(human): Tambahkan validasi menggunakan RegisterSchema
  //
  // Langkah:
  // 1. Parse req.body dengan RegisterSchema.safeParse()
  // 2. Jika tidak valid, kembalikan status 400 dengan error
  // 3. Jika valid, lanjutkan proses

  // GANTI KODE DI BAWAH INI
  // Saat ini tidak ada validasi sama sekali!
  const data = req.body;

  // Simulasi simpan ke database
  console.log('Data diterima:', data);

  res.json({
    success: true,
    message: 'Registrasi berhasil',
    data: {
      username: data.username,
      email: data.email,
      // JANGAN kembalikan password ke response!
    }
  });
});

// ============================================
// Endpoint untuk test
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Server validasi input',
    endpoints: {
      'POST /register': 'Registrasi user baru'
    },
    testCommands: [
      'curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d \'{"username": "test", "email": "test@example.com", "password": "12345678", "age": 25}\'',
      'curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d \'{"username": "ab", "email": "bukan-email", "password": "123", "age": -5}\''
    ]
  });
});

// ============================================
// Start server
// ============================================
const PORT = 3000;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Test dengan: curl http://localhost:3000');
});

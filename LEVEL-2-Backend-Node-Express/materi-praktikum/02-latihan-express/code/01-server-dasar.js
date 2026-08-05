/**
 * ============================================================
 * LATIHAN 2.1: Server Dasar dan Routing
 * ============================================================
 * Materi  : Express.js Dasar
 * Tujuan  : Membuat server Express.js, mendefinisikan route untuk
 *           berbagai metode HTTP, serta menggunakan middleware
 *           express.json() untuk parsing request body.
 *
 * Requirements:
 * - Server Express di port 3000
 * - Route GET / -> pesan selamat datang
 * - Route GET /api/info -> informasi server
 * - Route POST /api/echo -> mengembalikan body yang dikirim
 * - Middleware express.json() aktif
 *
 * Install: npm install express
 * Run : node01-server-dasar.js
 * ============================================================
 */

const express = require('express');
const app = express();
const PORT = 3000;

// TODO(human): Aktifkan middleware express.json() untuk parsing JSON body
// app.use(express.json());

// TODO(human): Route GET / -> kembalikan { message: "Selamat datang di Express.js Server!" }
// app.get('/', (req, res) => { ... });

// TODO(human): Route GET /api/info -> kembalikan { version, status, uptime }
// Gunakan process.uptime() untuk uptime

// TODO(human): Route POST /api/echo -> kembalikan { received: req.body }
// Ini akan membaca body JSON yang dikirim client

// TODO(human): Route GET /api/query -> baca query string ?name=xxx&city=yyy
// Kembalikan { name: req.query.name, city: req.query.city }

// TODO(human): Route GET /api/params/:id -> baca URL parameter id
// Kembalikan { id: req.params.id }

// TODO(human): Route DELETE /api/data/:id -> hapus data (simulasi)
// Kembalikan { message: "Data ${id} berhasil dihapus" }

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// ============================================================
// EXPECTED OUTPUT (saat dijalankan):
// ============================================================
// Server berjalan di http://localhost:3000
//
// TESTING:
// GET / -> { "message": "Selamat datang di Express.js Server!" }
// GET /api/info   -> { "version": "1.0.0", "status": "running", "uptime": 0.1 }
// POST /api/echo  -> { "received": { data yang dikirim } }
// GET /api/query?name=Budi&city=Jakarta -> { "name": "Budi", "city": "Jakarta" }
// GET /api/params/123 -> { "id": "123" }
// DELETE /api/data/1 -> { "message": "Data 1 berhasil dihapus" }
// ============================================================

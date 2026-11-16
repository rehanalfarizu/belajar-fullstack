/**
 * Server dengan Konfigurasi yang Masih Berantakan
 *
 * Server ini "jalan", tapi konfigurasinya bocor di mana-mana:
 *   1. Secret ditulis langsung di kode (hardcoded)
 *   2. Ada route debug yang menampilkan secret
 *   3. Tidak ada security header
 *   4. Error handler membocorkan detail internal (stack trace, query SQL)
 *   5. Log mencatat password
 *
 * Semua secret di file ini PALSU (contoh-jangan-dipakai), jadi aman untuk latihan.
 *
 * TUGAS: perbaiki semua TODO(human) di bawah.
 *
 * Jalankan:
 *   cd modul-keamanan-web/07-konfigurasi-aman/kerjakan-di-sini
 *   npm install
 *   node 01-server-config.js
 *
 * Coba (sebelum dan sesudah diperbaiki, catat bedanya di catatan.md):
 *   curl -i http://127.0.0.1:3070/                 ← lihat response header
 *   curl http://127.0.0.1:3070/debug/config        ← secret bocor?
 *   curl http://127.0.0.1:3070/api/produk/1        ← error SQL bocor?
 *   curl -X POST http://127.0.0.1:3070/api/login -H "Content-Type: application/json" \
 *     -d '{"username":"budi","password":"latihan-saja"}'   ← lihat log di terminal
 */

const crypto = require('node:crypto');
const express = require('express');
// SQLite bawaan Node.js (butuh Node 22.18+)
const { DatabaseSync } = require('node:sqlite');

// ============================================
// TODO(human): Pindahkan secret ke environment variable
// ============================================
// Saat ini secret ditulis langsung di kode. Kalau file ini di-push ke GitHub,
// secret-nya ikut tersebar dan tersimpan di riwayat git selamanya.
//
// Langkah:
// 1. Salin .env.example menjadi .env (file .env TIDAK boleh di-commit)
// 2. Isi .env dengan nilai buatanmu sendiri
// 3. Ganti tiga konstanta di bawah supaya membaca dari process.env
// 4. Muat file .env saat server jalan. Node 22+ sudah bisa tanpa library dotenv.
//    Cari di dokumentasi Node: opsi CLI `--env-file`, atau fungsi process.loadEnvFile().
//    (https://nodejs.org/api/cli.html dan https://nodejs.org/api/process.html)
// 5. Kalau ada variable wajib yang kosong, server sebaiknya langsung berhenti
//    dengan pesan jelas. Kenapa "gagal di awal" lebih baik daripada jalan
//    dengan secret kosong?
//
// Cek: `git check-ignore -v .env` harus menunjukkan bahwa .env diabaikan git.
const DB_PASSWORD = 'contoh-jangan-dipakai-db-123';
const API_KEY = 'sk-contoh-jangan-dipakai-000000';
const SESSION_SECRET = 'contoh-jangan-dipakai-session';
const NODE_ENV = 'development';

const app = express();
app.use(express.json());

// ============================================
// TODO(human): Security headers
// ============================================
// Langkah:
// 1. Jalankan `curl -i http://127.0.0.1:3070/` dan catat header yang ada SEKARANG.
//    Perhatikan header `X-Powered-By`. Informasi apa yang dia bocorkan?
// 2. Pasang helmet (sudah ada di package.json). Baca README-nya:
//    https://www.npmjs.com/package/helmet
// 3. Jalankan curl lagi. Header apa saja yang bertambah? Pilih 3 dan cari
//    artinya di MDN, tulis di catatan.md.
// 4. Cek juga di browser: DevTools → Network → klik request → Response Headers.
//
// Pertanyaan: README modul ini menyebut X-XSS-Protection. Cek apa yang helmet
// lakukan dengan header itu, dan cari tahu kenapa.

// ============================================
// TODO(human): Log yang tidak membocorkan rahasia
// ============================================
// Middleware ini mencatat SEMUA isi body, termasuk password.
// Log biasanya disimpan lama dan dibaca banyak orang (tim ops, layanan logging).
// Ubah supaya field sensitif (password, token, dll) tidak ikut tercatat.
// Pertanyaan: lebih aman "hapus field yang dilarang" atau "catat field yang diizinkan saja"? Kenapa?
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, req.body ?? '');
  next();
});

// ============================================
// Database kecil untuk memicu error SQL
// ============================================
const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
  INSERT INTO products (name, price) VALUES ('Laptop', 15000000), ('Mouse', 150000);
`);

// ============================================
// Routes
// ============================================
app.get('/', (req, res) => {
  res.json({ message: 'Server latihan konfigurasi aman' });
});

// ❌ Route debug yang lupa dihapus sebelum production
// TODO(human): Route ini tidak boleh ada di production. Pilih salah satu dan
// tulis alasanmu di catatan.md:
//   (a) hapus route ini sama sekali, atau
//   (b) hanya daftarkan route ini kalau NODE_ENV === 'development', dan
//       tetap jangan pernah kirim nilai secret-nya (cukup "terisi"/"kosong").
app.get('/debug/config', (req, res) => {
  res.json({ NODE_ENV, DB_PASSWORD, API_KEY, SESSION_SECRET });
});

// Route ini sengaja memakai nama tabel yang salah, supaya muncul error SQL.
app.get('/api/produk/:id', (req, res) => {
  const sql = 'SELECT id, name, price FROM produk_lama WHERE id = ?';
  try {
    const row = db.prepare(sql).get(Number(req.params.id));
    res.json(row ?? { error: 'Produk tidak ditemukan' });
  } catch (err) {
    err.sql = sql; // ditempel supaya error handler di bawah "bisa" membocorkannya
    throw err;
  }
});

app.post('/api/login', (req, res) => {
  // Login palsu, fokus lab ini ada di log dan error handling.
  res.status(401).json({ error: 'Username atau password salah' });
});

// ============================================
// TODO(human): Error handler yang aman
// ============================================
// Saat ini semua detail internal dikirim ke client: pesan error, stack trace
// (berisi path folder di laptopmu), dan query SQL (berisi nama tabel).
// Semua itu peta gratis untuk penyerang.
//
// Target:
// - Client hanya menerima pesan umum + sebuah requestId
// - Detail lengkap (termasuk requestId yang SAMA) dicatat di console.error
//   supaya kamu tetap bisa debugging
//
// Petunjuk:
// - Untuk requestId, cari crypto.randomUUID() di dokumentasi node:crypto.
// - Pertanyaan: kenapa requestId berguna? Bayangkan user melapor
//   "aplikasinya error" ke kamu. Apa yang kamu minta dari mereka?
// - Bonus: error 400 (salah input user) dan 500 (salah server) apakah perlu
//   diperlakukan berbeda? Pesan mana yang boleh lebih jelas?
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  void crypto; // hapus baris ini setelah crypto dipakai
  res.status(500).json({
    error: err.message,
    stack: err.stack,
    sql: err.sql,
  });
});

// ============================================
// Start server
// ============================================
const PORT = 3070;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
// Server ini masih membocorkan secret (palsu) lewat /debug/config, jangan buka ke jaringan.
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server berjalan di http://127.0.0.1:${PORT} (NODE_ENV=${NODE_ENV})`);
  console.log('Coba perintah curl di komentar atas file ini, lalu perbaiki TODO(human).');
});

/**
 * Server dengan Parameterized Query
 *
 * TUGAS: Perbaiki kode di bawah agar tidak rentan SQL injection
 *
 * Jalankan: node 02-server-aman.js
 */

const express = require('express');
// SQLite bawaan Node.js (butuh Node 22.18+), tidak perlu install apa-apa
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup database
const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  );

  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER,
    stock INTEGER
  );

  -- Catatan: password disimpan polos HANYA supaya lab ini fokus ke SQL injection.
  -- Cara menyimpan password yang benar ada di modul 04.
  INSERT INTO users (username, password, role) VALUES
    ('admin', 'password123', 'admin'),
    ('user1', 'user1pass', 'user');

  INSERT INTO products (name, price, stock) VALUES
    ('Laptop', 15000000, 10),
    ('Mouse', 150000, 50),
    ('Keyboard', 500000, 30);
`);

// ============================================
// TODO(human): Perbaiki login agar aman dari SQL injection
// ============================================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ❌ SAAT INI MASIH RENTAN!
  // Ganti dengan parameterized query
  //
  // Petunjuk:
  // - Di node:sqlite, tanda tanya (?) di dalam SQL adalah "tempat kosong"
  //   yang nanti diisi nilai secara terpisah dari perintah SQL-nya.
  // - Baca bagian "statement.get()" di dokumentasi resmi:
  //   https://nodejs.org/api/sqlite.html
  // - Pertanyaan untuk dirimu: kenapa memisahkan "perintah" dan "data"
  //   membuat `admin' --` tidak lagi bisa mengubah arti query?

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  try {
    const user = db.prepare(query).get();

    if (user) {
      res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    // TODO(human): Jangan tampilkan error detail ke user!
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// TODO(human): Perbaiki search agar aman dari SQL injection
// ============================================
app.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  // ❌ SAAT INI MASIH RENTAN!
  // Ganti dengan parameterized query
  //
  // Petunjuk:
  // - Pola LIKE '%kata%' juga bisa memakai tanda tanya.
  // - Jebakan umum: tanda % itu bagian dari DATA, bukan bagian dari SQL.
  //   Jadi di mana seharusnya kamu menempelkan % ?

  const query = `SELECT * FROM products WHERE name LIKE '%${q}%'`;

  try {
    const products = db.prepare(query).all();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// Test endpoint
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: 'Server untuk latihan SQL injection prevention',
    endpoints: {
      'POST /login': 'Login dengan username dan password',
      'GET /search?q=keyword': 'Cari produk'
    }
  });
});

const PORT = 3001;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Perbaiki kode di file ini agar aman dari SQL injection!');
});

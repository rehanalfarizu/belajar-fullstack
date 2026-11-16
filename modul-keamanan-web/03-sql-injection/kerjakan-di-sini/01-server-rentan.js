/**
 * ⚠️ SERVER SENGAJA RENTAN - HANYA UNTUK BELAJAR ⚠️
 *
 * Server ini SENGAJA memiliki kerentanan SQL injection.
 * JANGAN gunakan pola ini di production!
 * JANGAN deploy server ini ke internet!
 *
 * Jalankan: node 01-server-rentan.js
 */

const express = require('express');
// SQLite bawaan Node.js (butuh Node 22.18+), tidak perlu install apa-apa
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup database in-memory
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

  INSERT INTO users (username, password, role) VALUES
    ('admin', 'password123', 'admin'),
    ('user1', 'user1pass', 'user'),
    ('user2', 'secret456', 'user');

  INSERT INTO products (name, price, stock) VALUES
    ('Laptop', 15000000, 10),
    ('Mouse', 150000, 50),
    ('Keyboard', 500000, 30);
`);

// ============================================
// Homepage dengan form login
// ============================================
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>⚠️ Lab SQL Injection</title>
      <style>
        body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
        .warning { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        input { padding: 8px; margin: 5px 0; width: 200px; }
        button { padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; }
        .hint { background: #fff3cd; padding: 15px; border-radius: 4px; margin-top: 20px; }
        code { background: #e9ecef; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="warning">
        <strong>⚠️ SERVER SENGAJA RENTAN</strong><br>
        Ini adalah lab untuk belajar SQL injection. JANGAN gunakan teknik ini untuk menyerang sistem lain!
      </div>

      <h1>Login</h1>
      <form action="/login" method="POST">
        <div><input type="text" name="username" placeholder="Username"></div>
        <div><input type="password" name="password" placeholder="Password"></div>
        <div><button type="submit">Login</button></div>
      </form>

      <h2>Pencarian Produk</h2>
      <form action="/search" method="GET">
        <div><input type="text" name="q" placeholder="Cari produk..."></div>
        <div><button type="submit">Cari</button></div>
      </form>

      <div class="hint">
        <strong>💡 Hint untuk SQL Injection:</strong><br>
        <ul>
          <li>Login bypass: <code>admin' --</code></li>
          <li>Union injection: <code>x' UNION SELECT id, username, password FROM users --</code></li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// ============================================
// ❌ RENTAN: Login dengan string concatenation
// ============================================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ❌ JANGAN LAKUKAN INI! String concatenation = SQL injection!
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log('Query:', query); // Log untuk melihat apa yang terjadi

  try {
    const user = db.prepare(query).get();

    if (user) {
      res.send(`
        <h1>✅ Login Berhasil!</h1>
        <p>Selamat datang, ${user.username} (role: ${user.role})</p>
        <p><strong>Query yang dijalankan:</strong></p>
        <pre>${query}</pre>
        <a href="/">Kembali</a>
      `);
    } else {
      res.send(`
        <h1>❌ Login Gagal</h1>
        <p>Username atau password salah.</p>
        <p><strong>Query yang dijalankan:</strong></p>
        <pre>${query}</pre>
        <a href="/">Kembali</a>
      `);
    }
  } catch (error) {
    res.send(`<h1>Error</h1><pre>${error.message}</pre><a href="/">Kembali</a>`);
  }
});

// ============================================
// ❌ RENTAN: Search dengan string concatenation
// ============================================
app.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.send('<h1>Masukkan kata kunci</h1><a href="/">Kembali</a>');
  }

  // ❌ JANGAN LAKUKAN INI!
  const query = `SELECT * FROM products WHERE name LIKE '%${q}%'`;

  console.log('Query:', query);

  try {
    const products = db.prepare(query).all();

    let html = '<h1>Hasil Pencarian</h1>';
    html += `<p><strong>Query:</strong> <code>${query}</code></p>`;
    html += '<table border="1" cellpadding="10"><tr><th>ID</th><th>Nama</th><th>Harga</th></tr>';

    for (const p of products) {
      html += `<tr><td>${p.id}</td><td>${p.name || p.username}</td><td>${p.price || p.password}</td></tr>`;
    }

    html += '</table><br><a href="/">Kembali</a>';
    res.send(html);
  } catch (error) {
    res.send(`<h1>Error</h1><pre>${error.message}</pre><a href="/">Kembali</a>`);
  }
});

// ============================================
// Start server
// ============================================
const PORT = 3000;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
// Tanpa ini, Express membuka port ke SEMUA jaringan (termasuk WiFi kampus).
app.listen(PORT, '127.0.0.1', () => {
  console.log(`
⚠️  SERVER RENTAN - HANYA UNTUK BELAJAR ⚠️

Server berjalan di http://localhost:${PORT}

Akun yang tersedia:
- admin / password123
- user1 / user1pass
- user2 / secret456

Coba SQL injection:
- Username: admin' --
- Password: apapun

`);
});

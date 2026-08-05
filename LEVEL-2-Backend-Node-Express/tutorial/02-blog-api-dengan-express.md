# Tutorial 02 — Blog API dengan Express + SQLite

## Tujuan
Membuat REST API lengkap untuk blog (posts + comments) menggunakan Express dan database SQLite, tanpa perlu install database server terpisah.

---

## Langkah 1 — Install Dependencies

```bash
mkdir blog-api
cd blog-api
npm init -y
npm install express cors better-sqlite3
```

| Package | Fungsi |
|---------|--------|
| `express` | Web framework |
| `cors` | Mengizinkan request dari frontend |
| `better-sqlite3` | Database SQLite (file-based, ringan) |

---

## Langkah 2 — Setup Database

Buat folder `db/` dan file `db/database.js`:

```javascript
const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "blog.db"));

// Buat tabel posts
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    judul TEXT NOT NULL,
    konten TEXT NOT NULL,
    penulis TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Buat tabel comments
db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    nama TEXT NOT NULL,
    isi TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  )
`);

module.exports = db;
```

Jalankan sekali untuk membuat file `blog.db`:

```bash
node -e "require('./db/database')"
```

---

## Langkah 3 — Buat Route Posts

Buat file `routes/posts.js`:

```javascript
const express = require("express");
const router = express.Router();
const db = require("../db/database");

// GET /api/posts — semua post
router.get("/", (req, res) => {
  const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
  res.json(posts);
});

// GET /api/posts/:id — satu post
router.get("/:id", (req, res) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post tidak ditemukan" });
  res.json(post);
});

// POST /api/posts — buat post baru
router.post("/", (req, res) => {
  const { judul, konten, penulis } = req.body;
  if (!judul || !konten || !penulis) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  const result = db.prepare(
    "INSERT INTO posts (judul, konten, penulis) VALUES (?, ?, ?)"
  ).run(judul, konten, penulis);

  res.status(201).json({ id: result.lastInsertRowid, judul, konten, penulis });
});

// PUT /api/posts/:id — update post
router.put("/:id", (req, res) => {
  const { judul, konten } = req.body;
  const result = db.prepare(
    "UPDATE posts SET judul = ?, konten = ? WHERE id = ?"
  ).run(judul, konten, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Post tidak ditemukan" });
  }

  res.json({ message: "Post berhasil diupdate" });
});

// DELETE /api/posts/:id — hapus post
router.delete("/:id", (req, res) => {
  const result = db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Post tidak ditemukan" });
  }
  res.json({ message: "Post berhasil dihapus" });
});

module.exports = router;
```

---

## Langkah 4 — Buat Route Comments

Buat file `routes/comments.js`:

```javascript
const express = require("express");
const router = express.Router();
const db = require("../db/database");

// GET /api/posts/:postId/comments — comment untuk post tertentu
router.get("/posts/:postId/comments", (req, res) => {
  const comments = db.prepare(
    "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC"
  ).all(req.params.postId);
  res.json(comments);
});

// POST /api/posts/:postId/comments — tambah comment
router.post("/posts/:postId/comments", (req, res) => {
  const { nama, isi } = req.body;
  if (!nama || !isi) {
    return res.status(400).json({ error: "Nama dan isi wajib diisi" });
  }

  const result = db.prepare(
    "INSERT INTO comments (post_id, nama, isi) VALUES (?, ?, ?)"
  ).run(req.params.postId, nama, isi);

  res.status(201).json({ id: result.lastInsertRowid, nama, isi });
});

module.exports = router;
```

---

## Langkah 5 — Gabung di index.js

Buat file `index.js`:

```javascript
const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", postsRouter);
app.use("/api", commentsRouter);

app.listen(PORT, () => {
  console.log(`Blog API berjalan di http://localhost:${PORT}`);
});
```

---

## Langkah 6 — Test dengan curl

```bash
# Buat post baru
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"judul":"Tutorial Express","konten":"Belajar Express itu mudah!","penulis":"Andi"}'

# Lihat semua post
curl http://localhost:3000/api/posts

# Tambah comment
curl -X POST http://localhost:3000/api/posts/1/comments \
  -H "Content-Type: application/json" \
  -d '{"nama":"Siti","isi":"Artikel yang bagus!"}'
```

---

## Struktur Akhir Project

```
blog-api/
├── db/
│   ├── database.js
│   └── blog.db          ← otomatis terbuat
├── routes/
│   ├── posts.js
│   └── comments.js
├── node_modules/
├── package.json
└── index.js
```

---

## Latihan Tambahan

1. Tambahkan field `kategori` pada posts dan filter berdasarkan kategori
2. Tambahkan pagination: `?page=1&limit=10`
3. Tambahkan endpoint search: `?q=cari-judul`
4. Gunakan Postman atau Thunder Client untuk test API

---

**Lanjut ke:** [LEVEL-3 — Frontend React](../../LEVEL-3-Frontend-React/)

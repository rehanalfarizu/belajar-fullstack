# 📘 MATERI TEORI 03 — Database SQL (PostgreSQL)

## 1. Apa itu Database SQL?

SQL (Structured Query Language) = bahasa untuk mengelola **relational database** — data tersimpan dalam **tabel** yang saling berelasi.

```
Relational Database
┌─────────────┐       ┌─────────────┐
│   users     │       │   posts     │
├─────────────┤       ├─────────────┤
│ id (PK)     │──┐    │ id (PK)     │
│ name        │  │    │ title       │
│ email       │  └───►│ user_id (FK)│
│ created_at  │       │ body        │
└─────────────┘       └─────────────┘
```

---

## 2. SQL vs NoSQL

| Aspek | SQL (PostgreSQL) | NoSQL (MongoDB) |
|-------|-----------------|-----------------|
| Struktur | Tabel dengan skema tetap | Document (JSON-like) |
| Relasi | JOIN antar tabel | Embed atau reference |
| Skalabilitas | Vertical (scale up) | Horizontal (scale out) |
| Query | JOIN kompleks, ACID | Aggregasi pipeline |
| Fleksibilitas | Skema ketat | Skema fleksibel/dynamic |
| Cocok Untuk | Data terstruktur, transaksi | Data semi-terstruktur, rapid iteration |

---

## 3. SQL Data Types

```sql
-- Angka
INT           -- bilangan bulat (4 byte)
BIGINT        -- bilangan besar (8 byte)
SMALLINT      -- bilangan kecil (2 byte)
DECIMAL(10,2) -- desimal presisi (harga, koordinat)
FLOAT / REAL  -- floating point
BOOLEAN       -- true / false

-- Teks
VARCHAR(255)  -- string panjang terbatas
TEXT          -- string panjang tidak terbatas
CHAR(10)      -- string tetap 10 karakter

-- Waktu
DATE          -- tanggal (2026-05-31)
TIME          -- waktu (14:30:00)
TIMESTAMP     -- tanggal + waktu
TIMESTAMPTZ   -- timestamp dengan timezone
INTERVAL      -- durasi

-- Lainnya
UUID          -- identifier unik universal
JSONB         -- JSON yang di-index
SERIAL        -- auto-increment integer
```

---

## 4. CREATE TABLE — Membuat Tabel

```sql
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  age           INTEGER CHECK (age >= 0),
  role          VARCHAR(50) DEFAULT 'user',
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Constraints (Pembatasan)

```sql
PRIMARY KEY   -- unik + NOT NULL, satu per tabel
UNIQUE        -- tidak boleh duplikat
NOT NULL      -- tidak boleh kosong
CHECK         -- kondisi yang harus terpenuhi
DEFAULT       -- nilai default jika tidak diisi
FOREIGN KEY   -- relasi ke tabel lain
```

---

## 5. CRUD —INSERT, SELECT, UPDATE, DELETE

### INSERT — Tambah Data

```sql
-- Tambah satu baris
INSERT INTO users (name, email, age)
VALUES ('Andi Wijaya', 'andi@email.com', 25);

-- Tambah banyak sekaligus
INSERT INTO users (name, email, age)
VALUES
  ('Budi Santoso', 'budi@email.com', 30),
  ('Citra Dewi', 'citra@email.com', 28);

-- Insert + Return
INSERT INTO users (name, email)
VALUES ('Eko Prasetyo', 'eko@email.com')
RETURNING id, name, email;
```

### SELECT — Baca Data

```sql
-- Semua kolom
SELECT * FROM users;

-- Kolom tertentu
SELECT name, email FROM users;

-- Dengan alias
SELECT name AS "Nama", email AS "Email" FROM users;

-- DISTINCT — hapus duplikat
SELECT DISTINCT role FROM users;

-- WHERE — filter
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE role = 'admin' AND is_active = TRUE;
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE id IN (1, 3, 5);

-- ORDER BY — urutkan
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY name ASC, age DESC;

-- LIMIT & OFFSET — pagination
SELECT * FROM users LIMIT 10 OFFSET 0;    -- halaman 1
SELECT * FROM users LIMIT 10 OFFSET 10;   -- halaman 2
SELECT * FROM users LIMIT 10 OFFSET 20;   -- halaman 3

-- COUNT, SUM, AVG, MIN, MAX
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(age) FROM users;
SELECT SUM(age) FROM users WHERE is_active = TRUE;

-- GROUP BY — berkelompok
SELECT role, COUNT(*) AS jumlah, AVG(age) AS rata_umur
FROM users
GROUP BY role
HAVING COUNT(*) > 1;
```

### UPDATE — Ubah Data

```sql
-- Update satu kolom
UPDATE users
SET age = 26
WHERE id = 1;

-- Update banyak kolom
UPDATE users
SET
  name = 'Andi Wijaya Jr.',
  age = 27,
  updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Update dengan RETURNING
UPDATE users
SET is_active = FALSE
WHERE id = 5
RETURNING *;
```

### DELETE — Hapus Data

```sql
-- Hapus dengan kondisi
DELETE FROM users WHERE id = 5;

-- Hapus semua (awas!)
DELETE FROM users;

-- Hapus + return
DELETE FROM users
WHERE id = 5
RETURNING *;
```

---

## 6. JOIN — Menghubungkan Tabel

```
users                              posts
───────                            ───────
id  name                           id  user_id  title
1   Andi       ───┐                1   1        Belajar JS
2   Budi       ───┼──┐             2   2        React Native
3   Citi            └──┘            3   1        Node.js
                                4   3        MongoDB
```

### INNER JOIN — Hanya yang punya hubungan

```sql
-- Tampilkan post beserta nama author-nya
SELECT
  posts.id,
  posts.title,
  users.name AS author
FROM posts
INNER JOIN users ON posts.user_id = users.id;

/*
Hasil:
id | title       | author
───┼─────────────┼────────
1  | Belajar JS  | Andi
2  | React Native| Budi
3  | Node.js     | Andi
(4 row) Citi tidak punya post → tidak muncul
*/
```

### LEFT JOIN — Semua dari kiri + yang cocok dari kanan

```sql
SELECT
  users.name,
  COUNT(posts.id) AS total_posts
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.name;

/*
Hasil:
name      | total_posts
──────────┼────────────
Andi      | 2
Budi      | 1
Citi      | 0  ← tetap muncul walau tidak punya post
*/
```

### RIGHT JOIN & FULL OUTER JOIN

```sql
-- RIGHT JOIN: semua dari kanan + yang cocok dari kiri
-- FULL OUTER JOIN: semua dari kedua tabel

SELECT *
FROM users
FULL OUTER JOIN posts ON users.id = posts.user_id;
```

### Multiple JOIN (3 tabel+)

```sql
SELECT
  u.name,
  p.title,
  c.body AS comment_body,
  c.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
INNER JOIN comments c ON p.id = c.post_id
WHERE u.is_active = TRUE;
```

---

## 7. ALTER TABLE — Ubah Struktur

```sql
-- Tambah kolom
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Hapus kolom
ALTER TABLE users DROP COLUMN phone;

-- Ubah tipe kolom
ALTER TABLE users ALTER COLUMN age TYPE SMALLINT;

-- Ubah nama kolom
ALTER TABLE users RENAME COLUMN age TO user_age;

-- Tambah constraint
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

-- Hapus constraint
ALTER TABLE users DROP CONSTRAINT unique_email;

-- Set default
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'user';

-- Rename tabel
ALTER TABLE users RENAME TO app_users;
```

---

## 8. Index — Percepat Query

```sql
-- Index pada kolom yang sering di-WHERE
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age ON users(age);

-- Index untuk kolom yang di-JOIN
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Index untuk teks (full-text search)
CREATE INDEX idx_posts_title ON posts USING gin(to_tsvector('indonesian', title));

-- Unique index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Hapus index
DROP INDEX idx_users_age;

-- Cek query plan (untuk optimization)
EXPLAIN SELECT * FROM users WHERE email = 'andi@email.com';
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 20;
```

---

## 9. Transactions

Transaction = **group operasi** yang harus berhasil semua atau gagal semua (atomic).

```sql
BEGIN; -- mulai transaksi

-- Transfer uang dari akun A ke akun B
UPDATE accounts SET balance = balance - 1000 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE user_id = 2;

-- Kalau gagal (error), rollback semua
COMMIT; -- simpan semua perubahan

-- Atau kalau error:
-- ROLLBACK; -- batalkan semua perubahan
```

---

## 10. PostgreSQL di Node.js (pg library)

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  database: "myapp",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  max: 20,              // max koneksi
  idleTimeoutMillis: 30000
});

// Query biasa
async function getUsers() {
  const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
  return result.rows; // array of object
}

// Query dengan parameter (SQL Injection prevention!)
async function getUserById(id) {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0]; // satu object atau undefined
}

// INSERT + RETURNING
async function createUser(name, email) {
  const result = await pool.query(
    "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
}

// UPDATE
async function updateUser(id, name) {
  const result = await pool.query(
    "UPDATE users SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
}

// Transaction
async function transferMoney(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "UPDATE accounts SET balance = balance - $1 WHERE user_id = $2",
      [amount, fromId]
    );
    await client.query(
      "UPDATE accounts SET balance = balance + $1 WHERE user_id = $2",
      [amount, toId]
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// Tutup pool saat aplikasi shutdown
pool.end();
```

---

## Ringkasan

```
PostgreSQL
├── Data Types  → INT, VARCHAR, TEXT, BOOLEAN, DATE, TIMESTAMP, UUID
├── Constraints  → PRIMARY KEY, UNIQUE, NOT NULL, CHECK, DEFAULT
├── CRUD         → INSERT, SELECT, WHERE, ORDER BY, LIMIT
├── JOIN         → INNER, LEFT, RIGHT, FULL OUTER
├── Modify       → UPDATE, DELETE, ALTER TABLE
├── Index        → CREATE INDEX, EXPLAIN
├── Transaction  → BEGIN, COMMIT, ROLLBACK
└── Node.js      → pg Pool, parameterized query ($1, $2)
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-database/`
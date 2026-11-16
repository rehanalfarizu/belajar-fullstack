# SOFTWARE 02 — Install PostgreSQL dan pgAdmin

## Apa itu PostgreSQL?

**PostgreSQL** adalah database relasional (SQL) yang paling populer untuk aplikasi production. Data disimpan dalam tabel dengan baris dan kolom, mirip spreadsheet.

---

## Langkah 1: Install PostgreSQL

### Mac — Menggunakan Homebrew (Recommended)

```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Verifikasi
psql --version
```

### Mac — Menggunakan Postgres.app (Easier)

1. Download dari: https://postgresapp.com
2. Drag ke Applications
3. Buka Postgres.app
4. Klik **Initialize** untuk buat server baru

### Windows — Menggunakan EnterpriseDB Installer

1. Buka: https://www.postgresql.org/download/windows/
2. Download **Windows x86-64**
3. Jalankan installer
4. Pilih:
   - Components: ✅ PostgreSQL Server, ✅ pgAdmin 4, ✅ Command Line Tools
   - Port: `5432` (default)
   - Password: `postgres` (untuk superuser)
5. Klik **Next → Install**

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## Langkah 2: Setup User dan Database

### Mac (Homebrew)

```bash
# Login ke PostgreSQL
psql -U postgres

# Atau jika perlu login dengan user sistem
psql -h localhost -U postgres
```

### Mac (Postgres.app)

```bash
# Buka terminal, jalankan:
psql -p 5432 -U postgres
```

### Windows

1. Buka **pgAdmin 4** dari Start Menu
2. Browser kiri → Servers → PostgreSQL 16
3. Masukkan password yang sudah diset saat install
4. Klik **OK**

---

## Langkah 3: Dasar PostgreSQL via Terminal

### Login

```bash
psql -U postgres
```

### Buat User

```sql
-- Buat user baru
CREATE USER raihan WITH PASSWORD 'password123';

-- Beri privileges
GRANT ALL PRIVILEGES ON DATABASE belajar TO raihan;
```

### Buat Database

```sql
-- Buat database baru
CREATE DATABASE belajar_db OWNER raihan;

-- Atau dari terminal
createdb belajar_db -U postgres
```

### Buat Tabel

```sql
-- Connect ke database
\c belajar_db

-- Buat tabel users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  jurusan VARCHAR(100),
  semester INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  judul VARCHAR(200) NOT NULL,
  konten TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### CRUD Operations

```sql
-- INSERT (tambah data)
INSERT INTO users (nama, email, jurusan, semester)
VALUES ('Andi Wijaya', 'andi@email.com', 'Informatika', 5);

-- SELECT (baca data)
SELECT * FROM users;
SELECT nama, email FROM users WHERE semester > 3;

-- UPDATE (ubah data)
UPDATE users SET semester = 6 WHERE id = 1;

-- DELETE (hapus data)
DELETE FROM users WHERE id = 1;
```

### Join Tables

```sql
-- Gabung users dan posts
SELECT users.nama, posts.judul, posts.created_at
FROM posts
INNER JOIN users ON posts.user_id = users.id
ORDER BY posts.created_at DESC;
```

---

## Langkah 4: Install pgAdmin (GUI untuk Database)

### pgAdmin 4 (All Platforms)

**pgAdmin** adalah GUI (Graphical User Interface) untuk mengelola PostgreSQL.

**Mac** — Sudah termasuk di installer PostgreSQL dari EnterpriseDB, atau:

```bash
# Install via Homebrew
brew install --cask pgadmin4
```

**Windows** — Sudah termasuk saat install PostgreSQL dari EnterpriseDB.

**Linux** — https://www.pgadmin.org/download/

### Cara Pakai pgAdmin

1. Buka **pgAdmin 4**
2. Klik **Add Server**
3. Isi:
   - Name: `Local PostgreSQL`
   - Host: `localhost`
   - Port: `5432`
   - Database: `postgres`
   - Username: `postgres`
   - Password: `password-yang-dipasang`
4. Klik **Save**

### pgAdmin: Buat Tabel dengan GUI

1. Klik database `belajar_db`
2. Klik **Schemas → Tables**
3. Klik kanan → **Create Table**
4. Name: `users`
5. Tab **Columns** → Add columns:
   - `id` → SERIAL, Primary Key ✅
   - `nama` → VARCHAR(100), Not Null ✅
   - `email` → VARCHAR(100), Not Null ✅
   - `jurusan` → VARCHAR(100)
   - `semester` → INTEGER
6. Klik **Save**

---

## Langkah 5: Install Extension Database Viewer di VS Code

### PostgreSQL Viewer

1. Buka VS Code
2. Tekan `Cmd + Shift + X`
3. Search: `PostgreSQL Viewer`
4. Install dari **ckolk22.vscode-postgres**

### Konfigurasi

1. Buka VS Code → PostgreSQL Viewer panel (icon database di sidebar)
2. Klik **Add Connection**
3. Isi:
   - Host: `localhost`
   - Port: `5432`
   - Database: `belajar_db`
   - User: `postgres`
   - Password: `password-yang-dipasang`
4. Klik **Connect**

Sekarang kamu bisa lihat tabel, jalankan query SQL langsung dari VS Code!

---

## Langkah 6: Connect dari Node.js

Install driver PostgreSQL untuk Node.js:

```bash
npm install pg
```

Buat file `db.js`:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'belajar_db',
  user: 'postgres',
  password: 'password-yang-dipasang'
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting:', err);
  } else {
    console.log('Connected! Server time:', res.rows[0].now);
  }
});

module.exports = pool;
```

---

## Ringkasan

```
PostgreSQL Installation:
├── Mac    → brew install postgresql@16
├── Windows → Download dari postgresql.org
└── Linux → sudo apt install postgresql

Commands:
├── psql -U postgres           → login
├── createdb dbname           → buat database
├── CREATE TABLE ... → buat tabel
├── INSERT/SELECT/UPDATE/DELETE → CRUD

Tools:
├── pgAdmin 4 → GUI database manager
└── PostgreSQL Viewer (VS Code) → SQL di VS Code
```
# 📦 Software 05 — PostgreSQL & Database Tools

## Apa itu PostgreSQL?

**PostgreSQL** = Open-source relational database paling powerful. Favorit di kalangan production apps.

```
PostgreSQL = RDBMS (Relational Database Management System)
├── Data tersimpan dalam tabel (baris & kolom)
├── SQL sebagai bahasa query
├── ACID compliant (data konsisten)
├── Support JSON (bisa jadi dokumen)
└── Scalable & reliable
```

---

## 1. Install PostgreSQL

### Via Homebrew:

```bash
brew install postgresql@15
brew install postgresql@16

# Install versi terbaru
brew install postgresql
```

### Atau pakai Docker (lebih cepat):

```bash
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=secretpassword \
  -e POSTGRES_USER=admin \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  -d postgres:15-alpine
```

---

## 2. Setup PostgreSQL

### Setelah install via Homebrew:

```bash
# Start service
brew services start postgresql@15

# Login ke postgres (user default = nama Mac kamu)
psql -d postgres

# Atau login sebagai postgres user
psql -U postgres -d postgres

# Cek versi
psql --version
```

### Perintah dasar psql:

```sql
-- Lihat semua database
\l

-- Buat database baru
CREATE DATABASE myapp;

-- Hapus database
DROP DATABASE myapp;

-- Konek ke database
\c myapp

-- Lihat semua tabel
\dt

-- Lihat struktur tabel
\d nama_tabel

-- Lihat semua user/role
\du

-- Quit
\q
```

---

## 3. Membuat User & Database

```sql
-- Login sebagai postgres
psql -U postgres

-- Buat user baru
CREATE USER dev WITH PASSWORD 'devpassword123';

-- Buat database
CREATE DATABASE myapp OWNER dev;

-- Beri akses superuser (opsional)
ALTER USER dev WITH SUPERUSER;

-- Beri semua privileges
GRANT ALL PRIVILEGES ON DATABASE myapp TO dev;

-- Cek koneksi
\conninfo
```

---

## 4. SQL Fundamental

### Create Table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Insert Data:

```sql
-- Insert satu row
INSERT INTO users (name, email, password, age)
VALUES ('Andi Wijaya', 'andi@email.com', 'hashed123', 25);

-- Insert banyak row
INSERT INTO users (name, email, password, age) VALUES
  ('Budi Santoso', 'budi@email.com', 'pass456', 30),
  ('Citra Dewi', 'citra@email.com', 'pass789', 28);
```

### Select Data:

```sql
-- Pilih semua
SELECT * FROM users;

-- Pilih kolom tertentu
SELECT name, email FROM users;

-- Filter dengan WHERE
SELECT * FROM users WHERE age >= 25;
SELECT * FROM users WHERE name LIKE 'A%';

-- Order by
SELECT * FROM users ORDER BY created_at DESC;

-- Limit
SELECT * FROM users LIMIT 10;

-- Count
SELECT COUNT(*) FROM users WHERE is_active = true;
```

### Update Data:

```sql
-- Update satu row
UPDATE users SET age = 26 WHERE id = 1;

-- Update banyak row
UPDATE users SET is_active = false WHERE created_at < '2024-01-01';

-- Hapus row
DELETE FROM users WHERE id = 5;

-- Hapus semua (truncate lebih cepat)
TRUNCATE TABLE users;
```

### Join Tables:

```sql
-- Inner join
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- Left join
SELECT u.name, COALESCE(SUM(o.total), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;
```

---

## 5. Database GUI Tools

### TablePlus (Direkomendasikan — macOS native):

```bash
brew install --cask tableplus
```

**Fitur:**
- UI native macOS (bagus & cepat)
- Query builder visual
- Auto-complete
- Multi-tab (banyak koneksi)
- Dark mode

### DBeaver (Gratis, cross-platform):

```bash
brew install --cask dbeaver-community
```

**Fitur:**
- Support banyak database (MySQL, PostgreSQL, MongoDB, dll)
- ERD diagram
- Data export/import
- Full-featured query editor

### pgAdmin (Official PostgreSQL GUI):

```bash
# Via Docker
docker run -p 5050:80 \
  -e PGADMIN_DEFAULT_EMAIL="admin@email.com" \
  -e PGADMIN_DEFAULT_PASSWORD="admin" \
  -d dpage/pgadmin4
```

### Cara connect TablePlus ke PostgreSQL:

```
Host:     localhost
Port:     5432
Database: myapp
User:     admin
Password: secretpassword
SSL Mode: Disable
```

---

## 6. Prisma ORM (Node.js)

Prisma = modern ORM untuk akses database.

```bash
npm install prisma --save-dev
npx prisma init
```

### Setup .env:
```
DATABASE_URL="postgresql://admin:secretpassword@localhost:5432/mydb"
```

### Buat schema (schema.prisma):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders Order[]
}

model Order {
  id        Int      @id @default(autoincrement())
  total     Float
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

### Generate client:
```bash
npx prisma generate
```

### Migrasi:
```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

### Query dengan Prisma Client:
```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Create
const user = await prisma.user.create({
  data: { name: 'Andi', email: 'andi@email.com', age: 25 }
})

// Read
const users = await prisma.user.findMany({
  where: { age: { gte: 25 } },
  orderBy: { createdAt: 'desc' }
})

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { age: 26 }
})

// Delete
await prisma.user.delete({ where: { id: 1 } })
```

---

## 7. psql Cheatsheet

```bash
# Connect
psql -U username -d database

# File SQL
psql -U username -d database -f query.sql

# Export
pg_dump -U username mydb > backup.sql

# Import
psql -U username -d mydb < backup.sql

# Backup entire database
pg_dump -Fc mydb > mydb.dump

# Restore
pg_restore -U username -d mydb -C mydb.dump
```

---

## 8. Troubleshooting

### Error: "connection refused"

```bash
# Pastikan PostgreSQL service jalan
brew services start postgresql@15

# Cek apakah port 5432 sudah dipakai
lsof -i :5432

# Test koneksi
psql -h localhost -U postgres -d postgres
```

### Error: "password authentication failed"

```bash
# Reset password postgres user
ALTER USER postgres WITH PASSWORD 'newpassword';
```

### Error: "database already exists"

```bash
# Drop dulu
DROP DATABASE IF EXISTS mydb;
CREATE DATABASE mydb;
```

---

## Checklist

```
✅ psql --version → postgres 15.x
✅ brew services start postgresql@15 → service jalan
✅ psql -U postgres → bisa login
✅ CREATE DATABASE + CREATE USER → berhasil
✅ TablePlus/DBeaver → bisa connect ke postgres
✅ Prisma init + migrate → tabel terbuat
✅ pg_dump backup → file backup.sql terbuat
```

---

**Next:**
- Lanjut ke Software 06: API Testing (Postman & Thunder Client)
- Atau ke Tutorial: Database Setup
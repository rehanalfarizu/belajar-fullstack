# SOAL 03 — Database di Production

## Tujuan
Mengonfigurasi database untuk environment production, memahami perbedaan development vs production database setup, dan membuat seed/migration scripts.

---

## Studi Kasus

```
Development:
- SQLite: database.sqlite (local file)
- No password needed

Production:
- PostgreSQL di Railway
- Connection string: postgresql://user:password@host:port/database
- Credentials di environment variables
```

---

## Tugas

### Soal 3A — Development vs Production DB

```bash
# 1. Mengapa SQLite tidak cocok untuk production?
#    Apa keterbatasan utamanya?
# Jawaban:

# 2. PostgreSQL vs MySQL — kapan memilih salah satu?
# Jawaban:

# 3. Di environment production, siapa yang bertanggung jawab untuk backup?
#    Bagaimana backup strategy yang baik?
# Jawaban:
```

### Soal 3B — Database Connection Setup
Lihat file `code/03-database-production.js`. Lengkapi:

```javascript
// ============================================
// DATABASE CONNECTION (Development vs Production)
// ============================================

// TODO 1: Install dependencies
// npm install pg dotenv

// TODO 2: Environment-based configuration
const config = {
  development: {
    // SQLite connection untuk development
    // database: './dev.sqlite'
  },
  production: {
    // PostgreSQL connection untuk production
    // connectionString: process.env.DATABASE_URL
    // ssl: { rejectUnauthorized: false }
  }
};

// TODO 3: Get environment
const env = process.env.NODE_ENV || 'development';

// TODO 4: Create pool (PostgreSQL)
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: env === 'production' ? { rejectUnauthorized: false } : false,
});

// TODO 5: Test connection
async function testConnection() {
  // try/catch: SELECT NOW()
  // log: "Database connected: {timestamp}"
  // catch: "Connection failed: {error}"
}

// TODO 6: Query helper
async function query(text, params) {
  // pool.query(text, params)
  // return rows
  // catch: throw error dengan context
}

// TODO 7: Health check
app.get('/api/health/db', async (req, res) => {
  // Test connection
  // Return: { db: "connected", timestamp }
});

// ============================================
// MIGRATIONS (Simple version)
// ============================================

// TODO 8: createTables function
async function createTables() {
  // CREATE TABLE IF NOT EXISTS users (...)
  // CREATE TABLE IF NOT EXISTS posts (...)
  // CREATE TABLE IF NOT EXISTS comments (...)
}

// TODO 9: seedData function (for testing)
async function seedData() {
  // INSERT sample users
  // INSERT sample posts
}

// TODO 10: Run migrations on startup (conditional)
if (env === 'development') {
  // createTables() + seedData()
}
```

### Soal 3C — SQL Migration Best Practices

```bash
# 1. Apa itu database migration?
#    Mengapa penting untuk memiliki migration scripts?
# Jawaban:

# 2. Bagaimana cara handle schema changes tanpa kehilangan data production?
#    (Hints: migrations vs new DB, backup first)
# Jawaban:

# 3. Apa perbedaan antara migrations dan seed data?
# Jawaban:
```

### Soal 3D — Connection String Management

```bash
# 1. Format connection string PostgreSQL:
# postgresql://user:password@host:port/database
#
# breakdown:
# - user: ?
# - password: ?
# - host: ?
# - port: default PostgreSQL?
# - database: ?

# 2. Di Railway, DATABASE_URL sudah include credentials?
#    Atau perlu diset manual?

# 3. Apa risiko jika connection string ter-expose di GitHub?
# Jawaban:
```

---

## Environment Variables Checklist

```bash
# Development (.env)
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp_dev
JWT_SECRET=dev_secret_do_not_use_in_production
NODE_ENV=development

# Production (.env — di Railway dashboard, BUKAN di file)
DATABASE_URL=<from Railway PostgreSQL plugin>
JWT_SECRET=<generate: openssl rand -hex 32>
NODE_ENV=production
```

---

## Kriteria Penilaian
- [ ] Database connection menggunakan environment variables
- [ ] Production menggunakan PostgreSQL, development bisa SQLite
- [ ] Connection SSL dikonfigurasi untuk production
- [ ] Health check endpoint menguji koneksi database
- [ ] Migration/seed functions tersedia
// ============================================================
// 03 — DATABASE IN PRODUCTION
// PostgreSQL connection, migrations, and seed data
// ============================================================
// Install: npm install pg dotenv
// This file works for both local dev and production (Railway/Render)

// ============================================================
// TODO 1: Database configuration (environment-based)
// ============================================================
/*
const { Pool } = require('pg');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: env === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,           // Max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
*/

// ============================================================
// TODO 2: Query helper function
// ============================================================
/*
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('[DB]Executed query', { text: text.substring(0, 50), duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('[DB]Query error:', error.message);
    throw error;
  }
}
*/

// ============================================================
// TODO 3: Connection test
// ============================================================
/*
async function testConnection() {
  try {
    const res = await query('SELECT NOW() as now, version() as pg_version');
    console.log('[DB]Connected:', res.rows[0]);
    console.log('[DB]PostgreSQL version:', res.rows[0].pg_version);
  } catch (error) {
    console.error('[DB]Connection failed:', error.message);
    process.exit(1);
  }
}
*/

// ============================================================
// TODO 4: Database schema / migrations
// ============================================================
/*
const MIGRATIONS = {
  createUsersTable: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,

  createPostsTable: `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,

  createCommentsTable: `
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
};

async function runMigrations() {
  console.log('[MIGRATION] Running migrations...');
  await query(MIGRATIONS.createUsersTable);
  await query(MIGRATIONS.createPostsTable);
  await query(MIGRATIONS.createCommentsTable);
  console.log('[MIGRATION] Done.');
}
*/

// ============================================================
// TODO 5: Seed data (for development/testing)
// ============================================================
/*
const bcrypt = require('bcryptjs');

async function seedData() {
  console.log('[SEED] Seeding data...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // Insert sample users
  await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING`,
    ['Admin', 'admin@example.com', passwordHash, 'admin']
  );

  await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING`,
    ['User', 'user@example.com', passwordHash, 'user']
  );

  // Insert sample posts
  await query(
    `INSERT INTO posts (title, content, author_id, status)
     VALUES ($1, $2, 1, 'published'),
            ($3, $4, 2, 'published')`,
    ['First Post', 'Hello world!', 'Second Post', 'Express is great!']
  );

  console.log('[SEED] Done.');
}
*/

// ============================================================
// TODO 6: Health check with DB verification
// ============================================================
/*
app.get('/api/health/db', async (req, res) => {
  try {
    const result = await query('SELECT 1 as check');
    res.json({ db: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ db: 'disconnected', error: error.message });
  }
});
*/

// ============================================================
// TODO 7: Run migrations on startup (dev only)
// ============================================================
/*
// Only run migrations in development, not production
if (env === 'development') {
  testConnection().then(() => {
    return runMigrations();
  }).then(() => {
    return seedData();
  }).then(() => {
    console.log('[INIT] Development setup complete');
  }).catch((err) => {
    console.error('[INIT] Setup failed:', err.message);
    process.exit(1);
  });
} else {
  // Production: just test connection
  testConnection();
}
*/

// ============================================================
// FULL WORKING IMPLEMENTATION
// ============================================================

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/myapp',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

async function testConnection() {
  const res = await query('SELECT NOW() as now');
  console.log('[DB] Connected at:', res.rows[0].now);
}

async function runMigrations() {
  await query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  await query(`CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  console.log('[DB] Migrations complete');
}

// Auto-run demo (will fail without actual PostgreSQL — expected)
if (require.main === module) {
  testConnection().catch(err => {
    console.log('[DB] Note: Connection requires DATABASE_URL env var');
    console.log('[DB] This is expected if no PostgreSQL is running locally');
  });
}

module.exports = { pool, query, testConnection, runMigrations };
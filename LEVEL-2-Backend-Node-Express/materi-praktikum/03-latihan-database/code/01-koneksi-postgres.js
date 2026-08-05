/**
 * ============================================================
 * LATIHAN 3.1: PostgreSQL Dasar
 * ============================================================
 * Materi  : Database dan ORM
 * Tujuan  : Menghubungkan Node.js ke PostgreSQL, menulis query SQL
 *           dasar, dan memahami connection pool.
 *
 * Requirements:
 * - Koneksi ke PostgreSQL menggunakan pg.Pool
 * - CREATE TABLE users (id, name, email, created_at)
 * - INSERT 3 data user
 * - SELECT semua data user
 * - pool.end() untuk menutup koneksi
 *
 * Install: npm install pg
 * Prerequisite: PostgreSQL berjalan di port 5432
 *               Database 'belajar_nodejs' sudah dibuat
 * Run    : node 01-koneksi-postgres.js
 * ============================================================
 */

const { Pool } = require('pg');

// ============================================================
// KONFIGURASI KONEKSI
// TODO(human): Buat object konfigurasi pool
// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   database: 'belajar_nodejs',
//   user: 'postgres',
//   password: 'password',  // Ganti dengan password PostgreSQL kamu
// });

// ============================================================
// FUNGSI: Buat Tabel
// TODO(human): Jalankan query CREATE TABLE IF NOT EXISTS users
// Kolom: id (SERIAL PRIMARY KEY), name (VARCHAR 100), email (VARCHAR 100 UNIQUE), created_at (TIMESTAMP DEFAULT NOW())
// const createTable = async () => { ... }

// ============================================================
// FUNGSI: Insert Data
// TODO(human): Insert 3 user dengan query parameterized
// Gunakan $1, $2 untuk parameter
// Budi Santoso (budi@email.com), Siti Aminah (siti@email.com), Andi Wijaya (andi@email.com)

// ============================================================
// FUNGSI: Ambil Semua User
// TODO(human): SELECT * FROM users ORDER BY id
// Return hasil query

// ============================================================
// MAIN EXECUTION
// TODO(human): async function main()
//1. await createTable()
// 2. await insertUsers()
// 3. const users = await getAllUsers()
// 4. console.log semua data user
// 5. await pool.end()

// main().catch(err => { console.error('Error:', err); pool.end(); });

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Database: belajar_nodejs
// Tabel 'users' berhasil dibuat.
//
// User berhasil ditambahkan:
// - Budi Santoso (budi@email.com)
// - Siti Aminah (siti@email.com)
// - Andi Wijaya (andi@email.com)
//
// Jumlah user: 3
// ============================================================

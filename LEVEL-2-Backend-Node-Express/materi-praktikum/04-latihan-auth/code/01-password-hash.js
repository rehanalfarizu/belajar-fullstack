/**
 * ============================================================
 * LATIHAN 4.1: Password Hashing
 * ============================================================
 * Materi  : Authentication dan Authorization
 * Tujuan  : Menggunakan bcryptjs untuk hash password dan memverifikasi
 *           password terhadap hash yang tersimpan.
 *
 * Requirements:
 * - Hash3 password plaintext dengan bcrypt.hash()
 * - Salt rounds = 10
 * - Verifikasi password yang benar dan salah dengan bcrypt.compare()
 * - Tampilkan hasil perbandingan
 *
 * Install: npm install bcryptjs
 * Run    : node 01-password-hash.js
 * ============================================================
 */

const bcrypt = require('bcryptjs');

// ============================================================
// KONFIGURASI
// TODO(human): const SALT_ROUNDS = 10;
// TODO(human): const passwords = ['rahasia123', 'password456', 'admin123'];

// ============================================================
// FUNGSI: Hash Password
// TODO(human): tulis hashPassword(password) sesuai soal

// ============================================================
// FUNGSI: Verifikasi Password
// TODO(human): tulis verifyPassword(password, hash) sesuai soal

// ============================================================
// MAIN
// TODO(human): tulis main() sesuai soal

// main().catch(err => { console.error('Error:', err); });

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Password asli: "rahasia123"
// Hash: $2a$10$Kl2Skx... (salt + hash)
// Hash berhasil dibuat.
//
// Verifikasi:
// "rahasia123" vs hash -> true (PASSWORD COCOK)
// "rahasia999" vs hash -> false (PASSWORD TIDAK COCOK)
// "password456" vs hash[1] -> true (PASSWORD COCOK)
// ============================================================

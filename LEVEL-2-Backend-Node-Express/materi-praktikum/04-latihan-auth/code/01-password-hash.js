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
// TODO(human): async function hashPassword(password) {
//   return await bcrypt.hash(password, SALT_ROUNDS);
// }

// ============================================================
// FUNGSI: Verifikasi Password
// TODO(human): async function verifyPassword(password, hash) {
//   return await bcrypt.compare(password, hash);
// }

// ============================================================
// MAIN
// TODO(human): async function main() {
//   console.log(`Password asli: "${passwords[0]}"`);
//
//   // Hash semua password
//   const hashes = await Promise.all(passwords.map(hashPassword));
//   console.log(`Hash: ${hashes[0].substring(0, 20)}... (salt + hash)`);
//   console.log('Hash berhasil dibuat.\n');
//
//   // Verifikasi
//   console.log('Verifikasi:');
//   const match1 = await verifyPassword('rahasia123', hashes[0]);
//   console.log(`"rahasia123" vs hash -> ${match1} (${match1 ? 'PASSWORD COCOK' : 'PASSWORD TIDAK COCOK'})`);
//
//   const match2 = await verifyPassword('rahasia999', hashes[0]);
//   console.log(`"rahasia999" vs hash -> ${match2} (${match2 ? 'PASSWORD COCOK' : 'PASSWORD TIDAK COCOK'})`);
//
//   const match3 = await verifyPassword(passwords[1], hashes[1]);
//   console.log(`"${passwords[1]}" vs hash[1] -> ${match3} (${match3 ? 'PASSWORD COCOK' : 'PASSWORD TIDAK COCOK'})`);
// }

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

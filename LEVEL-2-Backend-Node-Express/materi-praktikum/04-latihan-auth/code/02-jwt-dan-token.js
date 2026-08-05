/**
 * ============================================================
 * LATIHAN 4.2: JWT dan Token
 * ============================================================
 * Materi  : Authentication dan Authorization
 * Tujuan  : Membuat dan memverifikasi JSON Web Token (JWT) menggunakan
 *           library jsonwebtoken. Memahami struktur JWT.
 *
 * Requirements:
 * - Buat JWT dengan payload { userId, email, role }
 * - Secret key minimal 32 karakter
 * - Masa berlaku token 24 jam
 * - Verifikasi token valid dan token yang dimanipulasi
 * - Tampilkan payload dari token yang valid
 *
 * Install: npm install jsonwebtoken
 * Run    : node 02-jwt-dan-token.js
 * ============================================================
 */

const jwt = require('jsonwebtoken');

// ============================================================
// KONFIGURASI
// TODO(human): const SECRET_KEY = 'ini-adalah-secret-key-yang-aman-minimal-32-karakter';
// TODO(human): const PAYLOAD = { userId: 1, email: 'user@email.com', role: 'admin' };

// ============================================================
// BUAT TOKEN
// TODO(human): const token = jwt.sign(PAYLOAD, SECRET_KEY, { expiresIn: '24h' });
// TODO(human): console.log('Token berhasil dibuat:');
// TODO(human): console.log(token);

// ============================================================
// VERIFIKASI TOKEN VALID
// TODO(human): try { const decoded = jwt.verify(token, SECRET_KEY); ... }
// TODO(human): console.log('\nPayload dari token yang valid:');
// TODO(human): console.log(decoded);

// ============================================================
// VERIFIKASI TOKEN YANG DIMANIPULASI
// TODO(human): const tamperedToken = token.slice(0, -5) + 'xxxxx';
// TODO(human): try { jwt.verify(tamperedToken, SECRET_KEY); } catch(err) { ... }
// TODO(human): console.log(`\nToken yang dimanipulasi -> Error: "${err.message}"`);

// ============================================================
// BONUS: Lihat Struktur JWT
// TODO(human): const parts = token.split('.');
// TODO(human): console.log('\nStruktur JWT:');
// TODO(human): console.log('Header:', JSON.parse(Buffer.from(parts[0], 'base64').toString()));
// TODO(human): console.log('Payload:', JSON.parse(Buffer.from(parts[1], 'base64').toString()));
// TODO(human): console.log('Signature: [hidden]');

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Token berhasil dibuat:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//
// Payload dari token yang valid:
// { userId: 1, email: 'user@email.com', role: 'admin', iat: ..., exp: ... }
//
// Token yang dimanipulasi -> Error: "invalid signature"
//
// Struktur JWT:
// Header: { alg: 'HS256', typ: 'JWT' }
// Payload: { userId: 1, email: 'user@email.com', role: 'admin', iat: ..., exp: ... }
// Signature: [hidden]
// ============================================================

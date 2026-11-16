/**
 * Latihan Hash Password
 *
 * TUGAS: Lengkapi hashPassword() dan verifyPassword().
 *
 * Kenapa bcryptjs, bukan bcrypt?
 *   `bcrypt` butuh dikompilasi (native addon) dan sering gagal di Node 24.
 *   `bcryptjs` ditulis full JavaScript, cara pakainya hampir sama.
 *   Dokumentasi: https://www.npmjs.com/package/bcryptjs
 *
 * Jalankan cek otomatis:
 *   cd modul-keamanan-web/04-autentikasi-dan-password/kerjakan-di-sini
 *   npm install
 *   node 01-hash-password.js
 *
 * Selesai kalau semua baris cek bertanda ✅.
 */

const bcrypt = require('bcryptjs');

// Seberapa "berat" proses hash-nya. Makin besar, makin lambat (dan makin
// mahal buat penyerang yang mau brute force). 10–12 itu angka yang umum.
// Pertanyaan untukmu: kalau angka ini dinaikkan 1, waktunya jadi berapa kali lipat?
const SALT_ROUNDS = 10;

// ============================================
// TODO(human): Implementasi hashPassword
// ============================================
// Dipakai saat REGISTRASI. Input: password polos. Output: string hash.
//
// Petunjuk:
// - Cari fungsi di bcryptjs yang menerima (password, saltRounds).
// - Fungsinya async (mengembalikan Promise), jadi pakai await.
// - Kamu TIDAK perlu bikin salt sendiri. Coba cari tahu: salt-nya disimpan
//   di mana kalau kamu tidak menyimpannya di kolom terpisah?
//
// Jebakan: jangan pakai crypto.createHash('sha256') atau md5.
// Cari tahu kenapa hash "cepat" justru buruk untuk password.
async function hashPassword(plainPassword) {
  // TODO(human): tulis kodemu di sini
  return undefined;
}

// ============================================
// TODO(human): Implementasi verifyPassword
// ============================================
// Dipakai saat LOGIN. Input: password yang diketik user + hash dari database.
// Output: true kalau cocok, false kalau tidak.
//
// Petunjuk:
// - Jangan hash ulang lalu bandingkan dengan ===. Coba sendiri: kenapa
//   hasilnya selalu false? (ingat: salt-nya acak)
// - bcryptjs punya fungsi khusus untuk membandingkan. Cari di dokumentasinya.
async function verifyPassword(plainPassword, hashedPassword) {
  // TODO(human): tulis kodemu di sini
  return undefined;
}

// ============================================
// Cek otomatis (jangan diubah)
// ============================================
// Bagian ini hanya jalan kalau file dijalankan langsung (node 01-hash-password.js),
// bukan saat di-require oleh 02-auth-server.js.
async function jalankanCek() {
  const hasil = [];
  const cek = (nama, lulus) => hasil.push({ nama, lulus: Boolean(lulus) });

  try {
    const hash1 = await hashPassword('rahasia-latihan-123');
    const hash2 = await hashPassword('rahasia-latihan-123');

    cek('hashPassword mengembalikan string', typeof hash1 === 'string');
    cek('Hash tidak sama dengan password polos', hash1 !== 'rahasia-latihan-123');
    cek('Password polos tidak muncul di dalam hash',
      typeof hash1 === 'string' && !hash1.includes('rahasia-latihan-123'));
    cek('Password sama → hash beda (karena salt acak)',
      typeof hash1 === 'string' && hash1 !== hash2);
    cek('Password benar → verifyPassword true',
      (await verifyPassword('rahasia-latihan-123', hash1)) === true);
    cek('Password salah → verifyPassword false',
      (await verifyPassword('rahasia-latihan-124', hash1)) === false);
    cek('Hash kedua juga bisa diverifikasi',
      (await verifyPassword('rahasia-latihan-123', hash2)) === true);
  } catch (err) {
    console.log('Ada error saat menjalankan fungsi kamu:', err.message);
  }

  console.log('Cek hashPassword & verifyPassword\n');
  hasil.forEach((h, i) => console.log(`${i + 1}. ${h.lulus ? '✅' : '❌'} ${h.nama}`));

  const semuaLulus = hasil.length > 0 && hasil.every((h) => h.lulus);
  console.log(semuaLulus
    ? '\nMantap, semua lulus. Lanjut ke 02-auth-server.js.'
    : '\nMasih ada yang ❌. Baca petunjuk TODO(human) di atas.');
}

if (require.main === module) {
  jalankanCek();
}

module.exports = { hashPassword, verifyPassword };

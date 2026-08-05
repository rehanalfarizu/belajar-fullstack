/**
 * ============================================================
 * LATIHAN 1.2: Modul dan Require
 * ============================================================
 * Materi  : Node.js Dasar
 * Tujuan  : Membuat modul kustom, mengekspornya dengan module.exports,
 *           dan mengimpornya kembali di file utama. Juga menggunakan
 *           modul os untuk mendapatkan informasi sistem.
 *
 * Requirements:
 * - Membuat modul calculator.js (eksport fungsi penjumlahan & pengurangan)
 * - Membuat modul greeting.js (eksport fungsi sapaan)
 * - Mengimpor kedua modul di file utama dan memanggil fungsinya
 * - Menggunakan modul os untuk nama user dan jumlah CPU
 * ============================================================
 */

// TODO(human): Buat file calculator.js di direktori yang sama
// exports fungsi add(a, b) dan subtract(a, b)
// Contoh isi calculator.js:
//   function add(a, b) { return a + b; }
//   function subtract(a, b) { return a - b; }
//   module.exports = { add, subtract };

// TODO(human): Buat file greeting.js di direktori yang sama
// exports fungsi greet(name) yang mengembalikan string sapaan
// Contoh isi greeting.js:
//   function greet(name) { return `Halo ${name}, selamat datang!`; }
//   module.exports = { greet };

// TODO(human): Impor kedua modul yang sudah dibuat
// const calculator = require('./calculator');
// const greeting = require('./greeting');

const os = require('os');

// TODO(human): Panggil fungsi dari modul calculator
// console.log('Kalkulator:');
// console.log(`5 + 3 = ${calculator.add(5, 3)}`);
// console.log(`10 - 4 = ${calculator.subtract(10, 4)}`);

// TODO(human): Panggil fungsi dari modul greeting
// console.log(`\nSalam untuk Budi: ${greeting.greet('Budi')}`);

// TODO(human): Gunakan modul os untuk info sistem
// console.log(`\nUser sistem: ${os.userInfo().username}`);
// console.log(`Jumlah CPU: ${os.cpus().length}`);

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Kalkulator:
// 5 + 3 = 8
// 10 - 4 = 6
//
// Salam untuk Budi: Halo Budi, selamat datang!
// User sistem: nama-user
// Jumlah CPU: 8
// ============================================================

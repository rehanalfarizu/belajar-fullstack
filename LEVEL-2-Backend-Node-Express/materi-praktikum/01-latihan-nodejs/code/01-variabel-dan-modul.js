/**
 * ============================================================
 * LATIHAN 1.1: Variabel dan Modul
 * ============================================================
 * Materi  : Node.js Dasar
 * Tujuan : Memahami deklarasi variabel, tipe data, dan penggunaan
 *           modul bawaan Node.js (fs, path)
 *
 * Requirements:
 * - Mendeklarasikan minimal 3 variabel const dan 2 variabel let
 * - Menggunakan minimal 3 tipe data berbeda
 * - Mengimpor modul fs dan path
 * - Membaca file data.txt menggunakan fs.readFileSync
 * - Menggabungkan path dengan path.join
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

// TODO(human): Deklarasikan variabel dengan tipe data yang berbeda
// - const untuk nilai yang tidak berubah (misal: nama aplikasi, versi)
// - let untuk nilai yang bisa berubah (misal: counter, hasil sementara)
// Contoh tipe data: string, number, boolean, array, object


// TODO(human): Buat objek yang menyimpan informasi dari file
// Hint: fs.readFileSync mengembalikan Buffer, gunakan .toString()


// TODO(human): Gunakan path.join untuk membuat path absolut ke file data.txt
// Hint: __dirname = direktori file ini berjalan


// Tampilkan hasil
console.log('Data dari file:');
console.log(`Nama: ${undefined /* TODO(human): tampilkan nama */}`);
console.log(`Umur: ${undefined /* TODO(human): tampilkan umur */}`);
console.log(`Status: ${undefined /* TODO(human): tampilkan status */}`);
console.log('\nPath lengkap:', undefined /* TODO(human): tampilkan path absolut */);

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Data dari file:
// Nama: Budi
// Umur: 25
// Status: Aktif
//
// Path lengkap: /Users/macbookpro/Documents/belajar-fullstack/LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/data.txt
// ============================================================

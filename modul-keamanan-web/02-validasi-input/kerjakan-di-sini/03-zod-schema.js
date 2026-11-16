/**
 * Latihan Zod Schema
 *
 * TUGAS: Buat schema Zod untuk data produk e-commerce
 *
 * Jalankan test:
 *   node 03-zod-schema.js
 */

const { z } = require('zod');

// ============================================
// Daftar kategori yang diizinkan
// ============================================
const ALLOWED_CATEGORIES = [
  'elektronik',
  'fashion',
  'makanan',
  'kesehatan',
  'olahraga',
  'rumah-tangga',
  'buku',
  'mainan'
];

// ============================================
// TODO(human): Buat ProductSchema dengan Zod
// ============================================
// Aturan validasi:
// - name: string, 1-200 karakter
// - price: number, positif, maksimal 1.000.000.000 (1 miliar)
// - stock: integer, minimal 0
// - category: harus salah satu dari ALLOWED_CATEGORIES
// - description: string, optional, maksimal 2000 karakter
// - isActive: boolean, default true

const ProductSchema = z.object({
  // TODO(human): Lengkapi schema di sini

});

// ============================================
// Test data
// ============================================
const testCases = [
  {
    name: 'Valid product',
    data: {
      name: 'Laptop Gaming',
      price: 15000000,
      stock: 10,
      category: 'elektronik',
      description: 'Laptop dengan RTX 4060'
    },
    shouldPass: true
  },
  {
    name: 'Harga negatif',
    data: {
      name: 'Produk Gratis',
      price: -1000,
      stock: 5,
      category: 'fashion'
    },
    shouldPass: false
  },
  {
    name: 'Kategori tidak valid',
    data: {
      name: 'Produk Aneh',
      price: 50000,
      stock: 1,
      category: 'kategori-tidak-ada'
    },
    shouldPass: false
  },
  {
    name: 'Nama terlalu panjang',
    data: {
      name: 'A'.repeat(250), // 250 karakter
      price: 10000,
      stock: 5,
      category: 'buku'
    },
    shouldPass: false
  },
  {
    name: 'Stock negatif',
    data: {
      name: 'Produk Habis',
      price: 25000,
      stock: -5,
      category: 'makanan'
    },
    shouldPass: false
  },
  {
    name: 'Tanpa description (optional)',
    data: {
      name: 'Produk Simple',
      price: 5000,
      stock: 100,
      category: 'rumah-tangga'
    },
    shouldPass: true
  }
];

// ============================================
// Jalankan test
// ============================================
console.log('Testing ProductSchema...\n');

testCases.forEach((testCase, index) => {
  const result = ProductSchema.safeParse(testCase.data);
  const passed = result.success === testCase.shouldPass;

  console.log(`${index + 1}. ${testCase.name}`);
  console.log(`   Expected: ${testCase.shouldPass ? 'PASS' : 'FAIL'}`);
  console.log(`   Actual:   ${result.success ? 'PASS' : 'FAIL'}`);
  console.log(`   Result:   ${passed ? '✅' : '❌'}`);

  if (!result.success && !testCase.shouldPass) {
    console.log(`   Errors:   ${result.error.errors.map(e => e.message).join(', ')}`);
  }

  console.log('');
});

// ============================================
// Export untuk digunakan di tempat lain
// ============================================
module.exports = { ProductSchema, ALLOWED_CATEGORIES };

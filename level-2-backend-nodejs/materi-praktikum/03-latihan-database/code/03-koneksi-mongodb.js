/**
 * ============================================================
 * LATIHAN 3.3: MongoDB dan Mongoose
 * ============================================================
 * Materi  : Database dan ORM
 * Tujuan  : Menghubungkan Node.js ke MongoDB menggunakan Mongoose,
 *           mendefinisikan schema dan model, serta menangani event
 *           koneksi database.
 *
 * Requirements:
 * - Koneksi ke MongoDB menggunakan mongoose.connect()
 * - Schema Product (name, price, category, stock, createdAt)
 * - Model Product dari schema
 * - Event listener: connected, error, disconnected
 * - Tutup koneksi dengan mongoose.connection.close()
 *
 * Install: npm install mongoose
 * Prerequisite: MongoDB berjalan di port 27017
 * Run    : node 03-koneksi-mongodb.js
 * ============================================================
 */

const mongoose = require('mongoose');

// ============================================================
// CONNECTION STRING
// TODO(human): const MONGO_URI = 'mongodb://localhost:27017/belajar_nodejs';

// ============================================================
// EVENT LISTENERS
// TODO(human): mongoose.connection.on('connected', () => { ... })
// TODO(human): mongoose.connection.on('error', (err) => { ... })
// TODO(human): mongoose.connection.on('disconnected', () => { ... })

// ============================================================
// SCHEMA: Product
// TODO(human): const productSchema = new mongoose.Schema({ ... }, { timestamps: true })
// name: String (required), price: Number (required), category: String, stock: Number (default: 0)

// ============================================================
// MODEL: Product
// TODO(human): const Product = mongoose.model('Product', productSchema);

// ============================================================
// FUNGSI: Koneksi dan Tes
// TODO(human): async function connectAndTest() {
//   await mongoose.connect(MONGO_URI);
//   console.log(`MongoDB connected: ${MONGO_URI}`);
//   console.log("Model 'Product' berhasil dibuat dengan schema fields:");
//   console.log('  - name (String)');
//   console.log('  - price (Number)');
//   console.log('  - category (String)');
//   console.log('  - stock (Number)');
//   await mongoose.connection.close();
//   console.log('MongoDB disconnected.');
// }

// connectAndTest().catch(err => { console.error('Error:', err); process.exit(1); });

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// MongoDB connected: mongodb://localhost:27017/belajar_nodejs
// Model 'Product' berhasil dibuat dengan schema fields:
//   - name (String)
//   - price (Number)
//   - category (String)
//   - stock (Number)
// MongoDB disconnected.
// ============================================================

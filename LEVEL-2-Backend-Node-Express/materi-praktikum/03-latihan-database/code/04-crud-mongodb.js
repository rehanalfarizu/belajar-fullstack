/**
 * ============================================================
 * LATIHAN 3.4: CRUD dengan MongoDB
 * ============================================================
 * Materi  : Database dan ORM
 * Tujuan  : Mengimplementasikan operasi Create, Read, Update, Delete
 *           lengkap menggunakan Mongoose dengan async/await.
 *
 * Requirements:
 * - Model Author dan Book dengan relasi reference
 * - CREATE: tambah 2 author dan 3 book
 * - READ: ambil semua book dengan populate author
 * - UPDATE: update stock dan harga menggunakan $inc dan $set
 * - DELETE: hapus 1 book berdasarkan ID
 * - Semua operasi menggunakan async/await
 *
 * Install: npm install mongoose
 * Run    : node 04-crud-mongodb.js
 * ============================================================
 */

const mongoose = require('mongoose');

// ============================================================
// KONEKSI
// TODO(human): const MONGO_URI = 'mongodb://localhost:27017/belajar_nodejs';
// TODO(human): await mongoose.connect(MONGO_URI);

// ============================================================
// SCHEMA: Author
// TODO(human): const authorSchema = new mongoose.Schema({
//   name: String, country: String
// }, { timestamps: true });

// ============================================================
// SCHEMA: Book
// TODO(human): const bookSchema = new mongoose.Schema({
//   title: String, year: Number,
//   author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
// }, { timestamps: true });

// ============================================================
// MODEL
// TODO(human): const Author = mongoose.model('Author', authorSchema);
// TODO(human): const Book = mongoose.model('Book', bookSchema);

// ============================================================
// CREATE
// TODO(human): async function createData() {
//   await Author.deleteMany({}); await Book.deleteMany({});
//   const authors = await Author.create([
//     { name: 'Budi Santoso', country: 'Indonesia' },
//     { name: 'Siti Aminah', country: 'Indonesia' },
//   ]);
//   await Book.create([
//     { title: 'Belajar Node.js', year: 2024, author: authors[0]._id },
//     { title: 'Express js Guide', year: 2024, author: authors[0]._id },
//     { title: 'MongoDB Basics', year: 2023, author: authors[1]._id },
//   ]);
//   console.log('[CREATE] 2 author dan 3 book berhasil ditambahkan.');
// }

// ============================================================
// READ
// TODO(human): async function readData() {
//   const books = await Book.find().populate('author');
//   console.log('[READ] Semua book (dengan author):');
//   books.forEach((b, i) => console.log(`- "${b.title}" oleh ${b.author.name} (${b.year})`));
// }

// ============================================================
// UPDATE
// TODO(human): async function updateData() {
//   const book = await Book.findOne({ title: 'MongoDB Basics' });
//   await Book.findByIdAndUpdate(book._id, {
//     $set: { price: 150000 },
//     $inc: { stock: 5 },
//   });
//   console.log(`[UPDATE] Book "${book.title}" diupdate: stock +5, price Rp150000`);
// }

// ============================================================
// DELETE
// TODO(human): async function deleteData() {
//   const book = await Book.findOne({ title: 'Express js Guide' });
//   await Book.findByIdAndDelete(book._id);
//   console.log(`[DELETE] Book "${book.title}" berhasil dihapus.`);
// }

// ============================================================
// MAIN
// TODO(human): async function main() {
// await connectAndTest();
//   await createData();
//   await readData();
//   await updateData();
//   await deleteData();
//   await readData();
//   await mongoose.connection.close();
// }

// main().catch(err => { console.error('Error:', err); process.exit(1); });

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// [CREATE] 2 author dan 3 book berhasil ditambahkan.
// [READ] Semua book (dengan author):
// - "Belajar Node.js" oleh Budi Santoso (2024)
// - "Express js Guide" oleh Budi Santoso (2024)
// - "MongoDB Basics" oleh Siti Aminah (2023)
// [UPDATE] Book "MongoDB Basics" diupdate: stock +5, price Rp150000
// [DELETE] Book "Express js Guide" berhasil dihapus.
// ============================================================

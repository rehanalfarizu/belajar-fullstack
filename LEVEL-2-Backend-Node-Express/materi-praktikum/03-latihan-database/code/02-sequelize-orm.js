/**
 * ============================================================
 * LATIHAN 3.2: Sequelize ORM
 * ============================================================
 * Materi  : Database dan ORM
 * Tujuan  : Mendefinisikan model dan relasi menggunakan Sequelize,
 *           melakukan sync database, dan operasi CRUD via ORM.
 *
 * Requirements:
 * - Inisialisasi Sequelize dengan koneksi PostgreSQL
 * - Model User (name, email, password) dan Post (title, content, userId)
 * - Relasi User.hasMany(Post) dan Post.belongsTo(User)
 * - sync() untuk membuat tabel
 * - Buat 2 user, masing-masing punya 2 post
 * - Ambil data dengan eager loading (include)
 *
 * Install: npm install sequelize
 * Run    : node02-sequelize-orm.js
 * ============================================================
 */

const { Sequelize, DataTypes } = require('sequelize');

// ============================================================
// KONEKSI SEQUELIZE
// TODO(human): Buat instance Sequelize
// const sequelize = new Sequelize('belajar_nodejs', 'postgres', 'password', {
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres',
//   logging: false,
// });

// ============================================================
// DEFINISI MODEL: User
// TODO(human): sequelize.define('User', { ... })
// name: DataTypes.STRING, email: DataTypes.STRING (unique), password: DataTypes.STRING

// ============================================================
// DEFINISI MODEL: Post
// TODO(human): sequelize.define('Post', { ... })
// title: DataTypes.STRING, content: DataTypes.TEXT, userId: DataTypes.INTEGER

// ============================================================
// RELASI
// TODO(human): User.hasMany(Post, { foreignKey: 'userId' })
// TODO(human): Post.belongsTo(User, { foreignKey: 'userId' })

// ============================================================
// FUNGSI: Sync Database
// TODO(human): await sequelize.sync({ force: true })
// console.log('Database tersinkronisasi.');

// ============================================================
// FUNGSI: Buat Data
// TODO(human): await User.bulkCreate([...]) untuk 2 user
// TODO(human): await Post.bulkCreate([...]) untuk 4 post (masing-masing user 2 post)
// console.log('User dan Post berhasil dibuat.');

// ============================================================
// FUNGSI: Ambil Data dengan Eager Loading
// TODO(human): const users = await User.findAll({ include: Post })
// console.log semua data user + posts

// ============================================================
// MAIN
// TODO(human): async function main()
// connection test: await sequelize.authenticate()
// panggil sync, buat data, ambil data
// finally: await sequelize.close()

// main().catch(err => { console.error('Error:', err); process.exit(1); });

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// Database tersinkronisasi.
// User dan Post berhasil dibuat.
//
// Data dengan relasi:
// { name: "Budi", posts: [ { title: "Post1 Budi" }, { title: "Post 2 Budi" } ] }
// { name: "Siti",  posts: [ { title: "Post 1 Siti" }, { title: "Post 2 Siti" } ] }
// ============================================================

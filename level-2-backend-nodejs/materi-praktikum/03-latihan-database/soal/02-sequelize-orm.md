# Soal 02: Sequelize ORM

## Deskripsi Singkat

Soal ini menguji kemampuan mendefinisikan model dan relasi menggunakan Sequelize ORM, mengimplementasikan operasi CRUD tanpa menulis SQL manual, serta melakukan migrasi database.

## Persyaratan

- [ ] Menginisialisasi Sequelize dengan koneksi ke database PostgreSQL
- [ ] Mendefinisikan model `User` dengan field: id (auto), name (string), email (string, unik), password (string)
- [ ] Mendefinisikan model `Post` dengan field: id, title, content, userId (foreign key)
- [ ] Membuat relasi `User.hasMany(Post)` dan `Post.belongsTo(User)`
- [ ] Melakukan `sync()` untuk membuat tabel secara otomatis
- [ ] Membuat 2 user dan masing-masing punya 2 post, lalu ambil semua data dengan eager loading

## Hint

Import Sequelize: `const { Sequelize, DataTypes } = require('sequelize')`. Definisikan model dengan `sequelize.define('nama', { field: { type: DataTypes.STRING } })`. Relasi: `User.hasMany(Post, { foreignKey: 'userId' })`. Eager loading: `User.findAll({ include: Post })`.

## Expected Output

```
Database tersinkronisasi.

User dibuat:
- Budi (budi@email.com) -> 2 post
- Siti (siti@email.com) -> 2 post

Data dengan relasi:
{ name: "Budi", posts: [ { title: "Post 1 Budi" }, { title: "Post 2 Budi" } ] }
{ name: "Siti",  posts: [ { title: "Post 1 Siti" }, { title: "Post 2 Siti" } ] }
```
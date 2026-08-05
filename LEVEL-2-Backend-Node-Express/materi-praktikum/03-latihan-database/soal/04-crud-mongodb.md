# Soal 04: CRUD dengan MongoDB

## Deskripsi Singkat

Soal ini menguji kemampuan mengimplementasikan operasi Create, Read, Update, dan Delete lengkap menggunakan Mongoose. Mahasiswa akan bekerja dengan model `Book` yang memiliki relasi dengan `Author` melalui reference.

## Persyaratan

- [ ] Membuat model `Author` dan `Book` dengan relasi reference (book.authorId -> author._id)
- [ ] Operasi CREATE: menambahkan 2 author dan 3 book
- [ ] Operasi READ: mengambil semua book dengan data author yang populated
- [ ] Operasi UPDATE: memperbarui stock dan harga salah satu book menggunakan `$inc` dan `$set`
- [ ] Operasi DELETE: menghapus 1 book berdasarkan ID
- [ ] Semua operasi menggunakan async/await dengan try-catch

## Hint

Author schema: `{ name: String, country: String }`. Book schema: `{ title: String, year: Number, author: { type: Schema.Types.ObjectId, ref: 'Author' } }`. Populate: `Book.find().populate('author')`. Update: `Book.findByIdAndUpdate(id, { $set: {...}, $inc: { stock: -1 } })`. Delete: `Book.findByIdAndDelete(id)`.

## Expected Output

```
[CREATE] 2 author dan 3 book berhasil ditambahkan.

[READ] Semua book (dengan author):
- "Belajar Node.js" oleh Budi Santoso (2024)
- "Express js Guide" oleh Budi Santoso (2024)
- "MongoDB Basics" oleh Siti Aminah (2023)

[UPDATE] Book ID xxx diupdate: stock +5, price Rp150000
[DELETE] Book ID xxx berhasil dihapus.
```
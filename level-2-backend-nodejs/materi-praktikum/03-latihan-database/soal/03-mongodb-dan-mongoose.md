# Soal 03: MongoDB dan Mongoose

## Deskripsi Singkat

Soal ini menguji kemampuan menghubungkan aplikasi Node.js ke MongoDB menggunakan Mongoose ODM, mendefinisikan schema dan model untuk dokumen, serta memahami perbedaan pendekatan dokumen-oriented dengan relasional.

## Persyaratan

- [ ] Membuat koneksi ke MongoDB menggunakan `mongoose.connect()`
- [ ] Mendefinisikan schema `Product` dengan field: name, price (number), category, stock (number), createdAt
- [ ] Membuat model `Product` dari schema tersebut
- [ ] Membuat koneksi dan menangani event `connected`, `error`, dan `disconnected`
- [ ] Menutup koneksi dengan `mongoose.connection.close()` setelah operasi selesai

## Hint

Import mongoose: `const mongoose = require('mongoose')`. Connection string: `mongodb://localhost:27017/belajar_nodejs`. Gunakan `mongoose.connection.on('connected', () => {...})` untuk event listener. Schema menggunakan `new mongoose.Schema({ ... })` dengan option `timestamps: true` untuk auto createdAt/updatedAt.

## Expected Output

```
MongoDB connected: mongodb://localhost:27017/belajar_nodejs
Model 'Product' berhasil dibuat dengan schema fields:
  - name (String)
  - price (Number)
  - category (String)
  - stock (Number)
MongoDB disconnected.
```
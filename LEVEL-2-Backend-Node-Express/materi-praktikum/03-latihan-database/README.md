# Latihan 3: Database dan ORM

## Tujuan Praktikum

Mahasiswa diharapkan dapat menghubungkan aplikasi Node.js dengan database relasional (PostgreSQL) dan non-relasional (MongoDB), memahami konsep CRUD operations, serta menggunakan ORM/ODM untuk menyederhanakan interaksi dengan database.

## Apa yang Akan Dipelajari

Pada praktikum ini, mahasiswa akan mengerjakan empat topik utama:

1. **PostgreSQL Dasar** -- Menghubungkan aplikasi Node.js ke PostgreSQL menggunakan modul `pg`, menulis dan mengeksekusi query SQL dasar (SELECT, INSERT, UPDATE, DELETE), serta memahami konsep connection pool untuk mengelola koneksi database.
2. ** Sequelize ORM** -- Mendefinisikan model dan relasi antar tabel menggunakan Sequelize, melakukan migrasi database, dan mengimplementasikan operasi CRUD melalui Sequelize API tanpa menulis SQL manual.
3. **MongoDB dan Mongoose** -- Menghubungkan aplikasi ke MongoDB menggunakan Mongoose ODM, mendefinisikan schema dan model untuk dokumen, serta memahami perbedaan pendekatan relasional dan dokumen-orinted.
4. **CRUD dengan MongoDB** -- Mengimplementasikan operasi Create, Read, Update, dan Delete menggunakan Mongoose. Memahami konsep embedded documents, populate untuk relasi, dan query operators seperti `$set`, `$push`, `$gt`.

## Struktur Direktori

```
03-latihan-database/
├── soal/
│   ├── 01-postgresql-dasar.md
│   ├── 02-sequelize-orm.md
│   ├── 03-mongodb-dan-mongoose.md
│   └── 04-crud-mongodb.md
├── code/
│   ├── 01-koneksi-postgres.js
│   ├── 02-sequelize-orm.js
│   ├── 03-koneksi-mongodb.js
│   └── 04-crud-mongodb.js
└── README.md
```

## Cara Menjalankan

1. Masuk ke direktori latihan:

   ```bash
   cd LEVEL-2-Backend-Node-Express/materi-praktikum/03-latihan-database
   ```

2. Inisialisasi proyek dan instal dependensi:

   ```bash
   npm init -y
   npm install pg pg-hstore sequelize  # untuk PostgreSQL
   npm install mongoose                # untuk MongoDB
   ```

3. Pastikan database yang diperlukan sudah berjalan:
   - PostgreSQL di port default `5432`
   - MongoDB di port default `27017`

4. Sesuaikan konfigurasi koneksi di setiap file kode (host, username, password, nama database).

5. Jalankan skrip:

   ```bash
   node code/01-koneksi-postgres.js
   node code/04-crud-mongodb.js
   ```

## Catatan Penting

- Buat database `belajar_nodejs` di PostgreSQL sebelum menjalankan skrip terkait PostgreSQL.
- Untuk MongoDB, database dan collection akan dibuat secara otomatis oleh Mongoose.
- Pastikan kredensial database disesuaikan dengan environment lokal.
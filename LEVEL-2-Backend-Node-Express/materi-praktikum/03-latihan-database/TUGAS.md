# TUGAS — Latihan Database

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Skrip Node.js yang terhubung ke PostgreSQL, membuat tabel, menambah, dan membaca data dengan query berparameter.
2. Model `User` dan `Post` di Sequelize dengan relasi satu-ke-banyak, plus data yang diambil dengan eager loading.
3. Koneksi MongoDB lewat Mongoose dengan schema `Product`, dan CRUD lengkap untuk `Author`/`Book`.
4. Kebiasaan mengecek isi database langsung (`psql`, `mongosh`), bukan cuma percaya pada `console.log`.

---

## Daftar Soal

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [PostgreSQL Dasar](soal/01-postgresql-dasar.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/03-latihan-database/code/01-koneksi-postgres.js` | 60-90 menit (termasuk instal PostgreSQL) |
| 02 | [Sequelize ORM](soal/02-sequelize-orm.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/03-latihan-database/code/02-sequelize-orm.js` | 90 menit |
| 03 | [MongoDB dan Mongoose](soal/03-mongodb-dan-mongoose.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/03-latihan-database/code/03-koneksi-mongodb.js` | 60-90 menit (termasuk instal MongoDB) |
| 04 | [CRUD dengan MongoDB](soal/04-crud-mongodb.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/03-latihan-database/code/04-crud-mongodb.js` | 90 menit |

Estimasi di atas perkiraan, karena soal tidak mencantumkan waktu.

### Persiapan sekali saja

1. PostgreSQL jalan di port `5432`, dan database `belajar_nodejs` sudah dibuat:

   ```bash
   psql -U postgres -c "CREATE DATABASE belajar_nodejs;"
   ```

2. MongoDB jalan di port `27017` (untuk soal 03-04).
3. Buat folder project sendiri (misalnya `latihan-saya/03-backend/minggu-10/`), lalu:

   ```bash
   npm init -y
   npm install pg pg-hstore sequelize mongoose
   ```

   `npm init -y` harus duluan, supaya dependency tidak masuk ke `package.json` root repo.

4. Salin file starter ke folder itu (lihat aturan [latihan-saya](../../../latihan-saya/README.md)).

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal**, terutama "Persyaratan" dan "Expected Output".
2. **Tutup soalnya.** Tulis dulu SQL atau bentuk dokumen yang kamu bayangkan di jurnal. Contoh: kolom
   tabel `users` dan tipe datanya. Kalau tidak bisa menulisnya tanpa kode, berarti belum paham datanya.
3. **Coba query-nya langsung di `psql`/`mongosh` dulu.** Kalau query-nya benar di sana, baru pindahkan ke Node.
4. **Kerjakan `TODO(human)` satu per satu**, jalankan setelah setiap bagian.
5. **Cek isi database langsung** (lihat "Cara Mengecek"). Jalankan skrip dua kali dan perhatikan apa yang terjadi.

---

## Petunjuk Kalau Macet

### Tingkat 1 — koneksinya dulu

- `ECONNREFUSED`? Database-nya belum jalan, atau port-nya beda. Coba sambung pakai `psql` atau `mongosh`
  dengan host dan port yang sama. Kalau itu juga gagal, masalahnya bukan di kodemu.
- `password authentication failed` atau `database "belajar_nodejs" does not exist`? Cocokkan konfigurasi
  di kode dengan yang kamu pakai di `psql`.
- Skrip tidak pernah selesai? Koneksi belum ditutup (`pool.end()` atau `mongoose.connection.close()`).

### Tingkat 2 — query-nya

- Cetak SQL dan parameternya sebelum dijalankan. Jalankan SQL yang sama di `psql` untuk membandingkan.
- `duplicate key value violates unique constraint` saat dijalankan kedua kali? Itu bukan bug kode, itu
  database menjaga aturan `UNIQUE`. Putuskan sendiri: hapus data dulu, atau tangani error-nya.
- Sequelize: tambahkan `logging: console.log` di konfigurasi untuk melihat SQL yang dibuat Sequelize.
- Mongoose: `populate` mengembalikan `null`? Cek nama di `ref` sama persis dengan nama model.

### Tingkat 3 — dokumentasi resmi

- [node-postgres (pg)](https://node-postgres.com/), terutama bagian "Queries" tentang parameter `$1`.
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html).
- [Sequelize: Associations](https://sequelize.org/docs/v6/core-concepts/assocs/) dan
  [Eager Loading](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/).
- [Mongoose: Schemas](https://mongoosejs.com/docs/guide.html), [Populate](https://mongoosejs.com/docs/populate.html),
  [Connections](https://mongoosejs.com/docs/connections.html).
- Operator update MongoDB (`$set`, `$inc`): [MongoDB update operators](https://www.mongodb.com/docs/manual/reference/operator/update/).

---

## Cara Mengecek Hasil Sendiri

Jalankan skripmu:

```bash
node 01-koneksi-postgres.js
```

Lalu cek isi database **langsung**, jangan cuma percaya output skrip:

```bash
psql -U postgres -d belajar_nodejs -c "\d users"
psql -U postgres -d belajar_nodejs -c "SELECT id, name, email, created_at FROM users;"
```

Yang harus terjadi:

- Soal 01: tabel `users` punya kolom sesuai soal, ada 3 baris, dan email bersifat `UNIQUE`.
  Jalankan skrip kedua kali: program tidak boleh crash tanpa pesan jelas.
- Soal 02: `\d "Posts"` (atau nama tabel yang dibuat Sequelize) menunjukkan foreign key ke `Users`.
  Output eager loading menampilkan setiap user dengan 2 post-nya.
- Soal 03: muncul log `connected` lalu `disconnected`, dan skrip selesai sendiri.
- Soal 04: cek dengan `mongosh`:

  ```bash
  mongosh belajar_nodejs --eval "db.books.find().toArray()"
  ```

  Stock dan harga buku yang di-update benar-benar berubah di database, dan buku yang dihapus sudah tidak ada.

---

## Tentang `contoh/`

Folder ini tidak punya `contoh/`. Pembandingmu adalah Expected Output di soal dan isi database yang kamu
cek sendiri dengan `psql` dan `mongosh`.

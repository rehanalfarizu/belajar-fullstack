# Soal 01: PostgreSQL Dasar

## Deskripsi Singkat

Soal ini menguji kemampuan menghubungkan aplikasi Node.js ke PostgreSQL menggunakan modul `pg`, menulis query SQL dasar, dan memahami konsep connection pool untuk mengelola koneksi database secara efisien.

## Persyaratan

- [ ] Membuat koneksi ke PostgreSQL menggunakan `pg.Pool` dengan konfigurasi yang sesuai
- [ ] Menjalankan query `CREATE TABLE` untuk membuat tabel `users` (id, name, email, created_at)
- [ ] Menjalankan query `INSERT` untuk menambahkan 3 data user
- [ ] Menjalankan query `SELECT` untuk mengambil semua data user
- [ ] Menutup koneksi pool dengan benar menggunakan `pool.end()`

## Hint

Import `pg` dengan `const { Pool } = require('pg')`. Konfigurasi pool: `{ host: 'localhost', port: 5432, database: 'belajar_nodejs', user: 'postgres', password: 'password' }`. Gunakan `pool.query(sql, params)` untuk menjalankan query. Params menggunakan format `$1`, `$2`, dst.

## Expected Output

```
Database: belajar_nodejs
Tabel 'users' berhasil dibuat.

User berhasil ditambahkan:
- Budi Santoso (budi@email.com)
- Siti Aminah (siti@email.com)
- Andi Wijaya (andi@email.com)

Jumlah user: 3
```
# CHECKLIST — Latihan Database

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku paham apa itu connection pool dan kenapa koneksi harus ditutup
- [ ] Aku bisa menjelaskan beda SQL manual (`pg`) dan ORM (Sequelize), plus untung-ruginya
- [ ] Aku paham relasi satu-ke-banyak dan di tabel mana foreign key-nya ditaruh
- [ ] Aku paham eager loading (`include`) dan kenapa lebih baik daripada query di dalam loop
- [ ] Aku bisa menjelaskan beda database relasional (tabel, baris) dan dokumen (collection, document)
- [ ] Aku paham `ref` + `populate` di Mongoose dan beda `$set` dengan `$inc`
- [ ] Aku paham kenapa query harus memakai parameter (`$1`, `$2`) dan bukan menyambung string

---

## Kemampuan Praktis

- [ ] Aku bisa membuat database dan tabel lewat `psql`, dan melihat strukturnya dengan `\d`
- [ ] Aku bisa menjalankan `CREATE TABLE`, `INSERT`, `SELECT` dari Node.js dengan query berparameter
- [ ] Aku bisa mendefinisikan model dan relasi di Sequelize, lalu mengambil data beserta relasinya
- [ ] Aku bisa terhubung ke MongoDB, membuat schema, dan menangani event `connected`/`error`/`disconnected`
- [ ] Aku bisa melakukan CRUD di Mongoose dengan `async/await` dan `try/catch`
- [ ] Aku bisa memastikan hasil kodeku dengan mengecek langsung di `psql` atau `mongosh`
- [ ] Aku bisa membaca error database (`ECONNREFUSED`, unique constraint) dan tahu harus cek apa

---

## Kebiasaan Baik

- [ ] Aku mencoba query di `psql`/`mongosh` dulu sebelum menaruhnya di kode
- [ ] Aku menjalankan skrip dua kali untuk melihat apa yang terjadi pada data yang sudah ada
- [ ] Aku tidak pernah menyambung input user langsung ke string SQL
- [ ] Password database tidak ditulis langsung di kode yang di-commit; nanti dipindah ke `.env`

Kenapa menyambung string SQL itu berbahaya? Coba sendiri di [SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md).
Soal password di `.env` ada di [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan Auth](../04-latihan-auth/README.md). Sudah Minggu 10? Kerjakan juga
[Soal 01 Membaca ERD](../../../LEVEL-0-Software-Engineering/materi-praktikum/01-latihan-membaca-dokumen/soal/01-membaca-erd.md),
karena soal itu dijadwalkan setelah latihan PostgreSQL.

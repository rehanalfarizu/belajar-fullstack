# 05 — Database dan Migration

## Ini Apa?

Migration adalah file PHP yang mencatat **perubahan bentuk database**: tabel apa yang
dibuat, kolom apa yang ditambah, index apa yang dipasang. Query Builder adalah cara
Laravel menulis query SQL dengan method PHP, lengkap dengan parameter binding.

Di topik ini kamu belajar dua hal yang saling nempel:

- **Bentuk** data (migration, foreign key, seeder)
- **Cara mengambil** data dengan aman (Query Builder, binding, allowlist)

## Analogi

Migration itu seperti **buku catatan renovasi rumah**. Setiap halaman berisi satu
perubahan: "tambah kamar", "pasang pintu ke dapur". Tukang baru cukup membaca buku
dari halaman pertama sampai terakhir, dan rumahnya akan jadi persis sama. Kalau ada
renovasi yang salah, halaman itu punya instruksi "cara membongkarnya" (`down()`).

## Kenapa Penting Buat Kerja?

- Di tim, database tiap developer, server staging, dan production harus **sama bentuknya**. Migration yang membuat itu mungkin.
- Code review di kantor sering menolak PR karena `down()` rusak atau foreign key lupa dipasang.
- SQL injection masih masuk daftar celah paling sering ditemukan. Developer yang paham *kenapa* binding bekerja jauh lebih dipercaya daripada yang cuma hafal "pakai Eloquent aja".

## Daftar Soal

| # | Soal | Level |
|---|---|---|
| 01 | [Migration Products](soal/01-products-migration.md) | Pemula |
| 02 | [Categories dan Foreign Key](soal/02-categories-dan-foreign-key.md) | Menengah |
| 03 | [Query Builder dan SQL Injection](soal/03-query-builder-dan-sql-injection.md) | Lanjut |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Cek pemahamanmu di [CHECKLIST.md](CHECKLIST.md).

## Bacaan

- Teori: [materi-teori/05-database-migration](../../materi-teori/05-database-migration/README.md)
- Keamanan: [Modul Keamanan 03 — SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md)
- Cara menyiapkan proyek latihan: [materi-praktikum/README.md](../README.md)

## Glosarium

| Istilah | Arti singkat |
|---|---|
| Migration | File yang mencatat satu perubahan schema, punya `up()` dan `down()` |
| Schema | Bentuk database: tabel, kolom, tipe, index, relasi |
| `up()` | Instruksi memasang perubahan |
| `down()` | Instruksi membongkar perubahan (kebalikan `up()`) |
| Rollback | Menjalankan `down()` untuk batch migration terakhir |
| Foreign key | Aturan bahwa nilai kolom harus ada di tabel lain |
| Index | "Daftar isi" supaya pencarian kolom tertentu cepat |
| Unique index | Index yang juga melarang nilai kembar |
| Seeder | Class untuk mengisi data awal/contoh |
| Idempotent | Dijalankan berkali-kali hasilnya tetap sama |
| Query Builder | API PHP (`DB::table()->where()...`) untuk menyusun SQL |
| Parameter binding | Mengirim nilai terpisah dari teks query (`?`) |
| Allowlist | Daftar nilai yang boleh; selain itu ditolak |
| SQL injection | Input user ikut dibaca sebagai perintah SQL |

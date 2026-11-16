# CHECKLIST — Database dan Migration

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri, bukan untuk orang lain.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan kenapa migration lebih baik daripada mengubah tabel manual lewat GUI database
- [ ] Aku paham kenapa `down()` harus kebalikan persis dari `up()`
- [ ] Aku bisa menjelaskan beda `restrict`, `cascade`, dan `set null` dengan contoh toko
- [ ] Aku paham kenapa harga rupiah disimpan sebagai integer, bukan float
- [ ] Aku bisa menjelaskan SQL injection pakai analogi, tanpa istilah teknis
- [ ] Aku paham kenapa binding melindungi nilai tapi tidak melindungi nama kolom
- [ ] Aku tahu beda allowlist dan blacklist, dan kenapa allowlist lebih aman

---

## Kemampuan Praktis

- [ ] Aku bisa membuat tabel baru dan mengubah tabel lama lewat migration
- [ ] Aku bisa menambahkan foreign key dan melepasnya lagi di `down()`
- [ ] Aku bisa menjalankan siklus rollback tanpa error berkali-kali
- [ ] Aku bisa menulis seeder yang aman dijalankan 2 kali
- [ ] Aku bisa memakai `php artisan db:table` untuk memeriksa bentuk tabel
- [ ] Aku bisa membuktikan celah SQL injection di tinker lokal
- [ ] Aku bisa menulis query pencarian dengan Query Builder dan allowlist sort

---

## Best Practices

- [ ] Aku tidak mengedit migration yang sudah dijalankan di database orang lain
- [ ] Aku tidak pernah menjalankan `migrate:fresh` di production
- [ ] Aku tidak menempel variabel PHP ke dalam string SQL, termasuk di `whereRaw`/`orderByRaw`
- [ ] Aku memilih kolom yang diambil (`select`), bukan selalu `select *`
- [ ] Aku menulis alasan setiap keputusan schema yang tidak jelas (misal pilihan `on delete`)

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [`06-eloquent-orm/`](../06-eloquent-orm/README.md).

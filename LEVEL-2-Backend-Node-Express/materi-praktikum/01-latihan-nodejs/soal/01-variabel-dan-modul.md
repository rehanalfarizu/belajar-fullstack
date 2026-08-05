# Soal 01: Variabel dan Modul

## Deskripsi Singkat

Soal ini menguji pemahaman tentang cara mendeklarasikan variabel dengan `let` dan `const`, memahami tipe data di JavaScript, serta bagaimana mengimpor dan menggunakan modul bawaan Node.js seperti `fs` dan `path`.

## Persyaratan

- [ ] Mendeklarasikan minimal 3 variabel menggunakan `const` dan 2 variabel menggunakan `let`
- [ ] Menggunakan minimal 3 tipe data berbeda (string, number, boolean, array, atau object)
- [ ] Mengimpor modul `fs` dan `path` dari modul bawaan Node.js
- [ ] Menggunakan `fs.readFileSync` untuk membaca isi file `data.txt`
- [ ] Menggabungkan path dengan `path.join` dan menampilkan hasilnya

## Hint

Gunakan `require()` untuk mengimpor modul. Untuk `path.join`, gabungkan direktori saat ini dengan nama file. `fs.readFileSync` mengembalikan `Buffer` -- gunakan `.toString()` untuk mengubahnya menjadi string.

## Expected Output

```
Data dari file: (isi file data.txt)
Nama: Budi
Umur: 25
Status: Aktif

Path lengkap: /Users/macbookpro/Documents/belajar-fullstack/LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/data.txt
```
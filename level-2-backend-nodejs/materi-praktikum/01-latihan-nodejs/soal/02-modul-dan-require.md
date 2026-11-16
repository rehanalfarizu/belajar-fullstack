# Soal 02: Modul dan Require

## Deskripsi Singkat

Soal ini menguji kemampuan membuat modul kustom sendiri, mengekspornya dengan `module.exports`, dan mengimpornya kembali di file utama. juga menggunakan modul `os` untuk mendapatkan informasi sistem.

## Persyaratan

- [ ] Membuat modul kustom `calculator.js` yang mengekspor minimal 2 fungsi (penjumlahan dan pengurangan)
- [ ] Membuat modul `greeting.js` yang mengekspor fungsi yang menerima nama dan mengembalikan sapaan
- [ ] Mengimpor kedua modul tersebut di file utama dan memanggil fungsinya
- [ ] Menggunakan modul `os` untuk mendapatkan nama user dan jumlah CPU
- [ ] Menampilkan hasil dari semua operasi ke console

## Hint

Gunakan `module.exports = { namaFungsi }` untuk mengekspor banyak fungsi sekaligus. Modul `os` memiliki metode seperti `os.userInfo().username` dan `os.cpus().length`.

## Expected Output

```
Kalkulator:
5 + 3 = 8
10 - 4 = 6

Salam untuk Budi: Halo Budi, selamat datang!
User sistem: nama-user
Jumlah CPU: 8
```
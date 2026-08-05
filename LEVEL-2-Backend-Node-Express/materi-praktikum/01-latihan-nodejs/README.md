# Latihan 1: Node.js Dasar

## Tujuan Praktikum

Mahasiswa diharapkan dapat memahami dan mempraktikkan dasar-dasar pemrograman dengan Node.js, termasuk cara menjalankan skrip, menggunakan variabel, modularisasi kode, dan berinteraksi dengan sistem file serta modul-modul inti Node.js.

## Apa yang Akan Dipelajari

Pada praktikum ini, mahasiswa akan mengerjakan empat topik utama:

1. **Variabel dan Tipe Data** -- Membuat dan menggunakan variabel dengan berbagai tipe data di JavaScript (string, number, boolean, array, object). Memahami perbedaan `var`, `let`, dan `const`.
2. **Modul dan Require** -- Membaca dan menggunakan modul bawaan Node.js (`fs`, `path`, `os`, `http`) serta membuat modul kustom sendiri dengan `module.exports`.
3. **Control Flow** -- Mempraktikkan struktur kontrol seperti `if/else`, `switch`, dan perulangan `for`, `while`, `for...of` untuk menangani alur logika program.
4. **NPM dan Package** -- Menginisialisasi proyek dengan `npm init`, menginstal paket pihak ketiga, serta memahami perbedaan dependency dan devDependency.

## Struktur Direktori

```
01-latihan-nodejs/
├── soal/
│   ├── 01-variabel-dan-modul.md
│   ├── 02-modul-dan-require.md
│   ├── 03-control-flow.md
│   └── 04-npm-dan-package.md
├── code/
│   ├── 01-variabel-dan-modul.js
│   ├── 02-modul-dan-require.js
│   ├── 03-control-flow.js
│   └── 04-npm-dan-package.js
└── README.md
```

## Cara Menjalankan

1. Pastikan Node.js sudah terinstal di sistem. Cek dengan perintah:

   ```bash
   node --version
   npm --version
   ```

2. Masuk ke direktori latihan:

   ```bash
   cd LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs
   ```

3. Untuk setiap soal, buka file `.js` di folder `code/`, baca komentar `// TODO(human):`, dan isi bagian yang masih kosong.

4. Jalankan skrip dengan Node.js:

   ```bash
   node code/01-variabel-dan-modul.js
   ```

5. Bandingkan output yang muncul dengan expected output yang tertera di bagian bawah setiap file soal.

## Catatan Penting

- Semua skrip harus dijalankan menggunakan Node.js (bukan langsung di browser).
- Jangan mengubah struktur file atau menghapus komentar `TODO(human):`.
- Untuk soal NPM, jalankan `npm install` terlebih dahulu sebelum menjalankan skrip.
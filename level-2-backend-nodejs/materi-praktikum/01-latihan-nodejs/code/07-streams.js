// ============================================================
// SOAL 07 — STREAMS
// ============================================================
// Soal: soal/07-streams.md
const fs = require("fs");
const { createGzip } = require("zlib");
const path = require("path");

// ============================================================
// TODO(human) 1: Readable Stream — baca file chunk by chunk
// ============================================================
// Baca file ini sendiri (__filename) dengan fs.createReadStream.
// Cetak ukuran setiap chunk, cetak "Selesai membaca file" di akhir,
// dan tangani error stream dengan pesan yang jelas.
// Petunjuk: stream punya event "data", "end", dan "error".
// Selesai kalau: ada minimal satu baris ukuran chunk dan satu baris "Selesai".
// Coba rusak: ganti sumbernya ke file yang tidak ada, pastikan pesan error tampil.


// ============================================================
// TODO(human) 2: Pipe — copy file
// ============================================================
// Salin source.txt ke dest.txt memakai stream dan pipe (bukan readFileSync).
// Buat source.txt sendiri dulu. Cetak "File berhasil disalin!" saat selesai.
// Petunjuk: event mana di writable stream yang menandakan semua data sudah tertulis?
// Selesai kalau: `cmp source.txt dest.txt && echo SAMA` mencetak SAMA.


// ============================================================
// TODO(human) 3: Gzip Compression dengan pipe
// ============================================================
// Kompres file teks besar (1 MB atau lebih) jadi .gz memakai createGzip()
// (sudah di-import di atas) lewat rantai pipe.
// Selesai kalau: `gunzip -c large-file.txt.gz | cmp - large-file.txt && echo SAMA`
// mencetak SAMA, dan ukuran .gz lebih kecil dari aslinya.


// ============================================================
// TODO(human) 4: Word Count Stream
// ============================================================
// Hitung jumlah kata, karakter, dan baris sebuah file memakai stream
// (jangan baca seluruh file sekaligus). Cetak hasilnya di event "end".
// Jebakan: data datang per chunk, dan satu kata bisa terpotong di batas chunk.
// Pikirkan bagaimana kamu menghadapinya, tulis di komentar.
// Selesai kalau: hasilnya cocok dengan `wc -w -m -l namafile` di terminal
// (angka kata boleh selisih kecil kalau kamu bisa menjelaskan kenapa).


// ============================================================
// TODO(human) 5: Transform Stream (uppercase) — bonus
// ============================================================
// Buat Transform stream (modul "stream") yang mengubah teks jadi huruf besar,
// lalu hubungkan process.stdin -> transform -> process.stdout.
// Selesai kalau: mengetik "halo" lalu Enter mencetak "HALO".


// ============================================================
// Backpressure — baca dan jelaskan (bonus)
// ============================================================
// Cari tahu di dokumentasi stream: apa itu backpressure, dan apa yang
// dikembalikan write() saat buffer penuh? Tulis jawabanmu di sini:

console.log("Kerjakan TODO(human) di atas, lalu jalankan: node 07-streams.js");

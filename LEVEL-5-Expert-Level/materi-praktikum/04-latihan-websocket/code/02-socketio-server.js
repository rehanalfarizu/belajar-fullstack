// ============================================================
// SOAL 02 — Server Socket.IO untuk chat (kerangka)
// ============================================================
// Bangun server chat real-time dengan room, pesan privat, indikator mengetik,
// daftar user online, dan riwayat pesan.
//
// Install:
//   npm install express socket.io
//
// Jalankan (sesuaikan path):
//   node 02-socketio-server.js
//
// Uji: buka klien di 2 tab, login dengan username berbeda, kirim pesan.
//
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================
//
// Nama event sebaiknya mengikuti tabel event di soal/02-socketio-chatapp.md.
// Kalau kamu memilih nama sendiri, catat dan samakan dengan klien
// (code/04-real-time-chat.jsx).

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

// TODO(human): HTTP server + Socket.IO server.
//   Atur CORS untuk origin klien dev-mu (jangan "*" kalau tidak perlu).
//   Tambah GET /health.

// TODO(human): State di memori: siapa user yang terhubung, di room mana,
//   dan riwayat pesan per room (batasi, misalnya 100 terakhir).
//   Pertanyaan: apa yang hilang saat server restart, dan kapan itu masalah?

// TODO(human): Event join.
//   Validasi payload (username dan room wajib, panjang dibatasi, bersihkan
//   input). Pindahkan socket ke room, kirim konfirmasi + riwayat ke yang
//   baru join, beri tahu room lain, dan perbarui daftar user online.

// TODO(human): Event kirim pesan.
//   Tolak jika user belum join. Simpan ke riwayat dan siarkan ke seisi room.

// TODO(human): Pesan privat.
//   Kirim hanya ke penerima, dan konfirmasi ke pengirim. Tangani penerima
//   yang tidak online.

// TODO(human): Indikator mengetik (mulai/berhenti) yang tidak dikirim balik
//   ke pengirimnya sendiri.

// TODO(human): Leave dan disconnect.
//   Bersihkan state, umumkan ke room, perbarui daftar online.

// Selesai kalau:
//   [ ] pesan dari tab A muncul di tab B tanpa refresh
//   [ ] pesan privat hanya terlihat oleh penerima
//   [ ] menutup tab memperbarui daftar online di tab lain
//   [ ] payload sampah (undefined, string kosong, objek salah bentuk) tidak
//       membuat server crash

module.exports = { PORT, http, express, Server };

// ============================================================
// SOAL 02/03 — Rooms dan Broadcast dengan Socket.IO (kerangka)
// ============================================================
// Server untuk latihan room dinamis dan beragam jenis broadcast. Bisa dipakai
// sebagai server untuk klien `03-presence-tracker.jsx`.
//
// Install:
//   npm install express socket.io
//
// Uji dengan 3 klien berbeda (3 tab atau 3 terminal) lalu amati siapa yang
// menerima pesan apa.
//
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================
//
// Kontrak event yang disarankan (boleh kamu ubah, catat perubahannya):
//   Klien -> Server: join({ room, username }), leave({ room }),
//                    broadcast({ room, message }), global_broadcast({ message }),
//                    get_rooms(), admin_kick({ room, username })
//   Server -> Klien: room_joined, room_left, room_broadcast, global_broadcast,
//                    rooms_list, user_joined, user_left, error

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

// TODO(human): HTTP + Socket.IO server, dan endpoint /health yang menampilkan
//   jumlah koneksi dan daftar room aktif.
//   Petunjuk: Socket.IO menyimpan setiap socket di "room"-nya sendiri
//   (id socket = nama room). Bagaimana membedakannya dari room buatan user?

// TODO(human): join / leave.
//   Satu user boleh di banyak room? Putuskan, tulis alasannya.

// TODO(human): broadcast ke satu room.
//   Perbedaan `socket.to(room).emit` dan `io.to(room).emit`: siapa yang
//   menerima? Buktikan lewat percobaan dengan 3 klien.

// TODO(human): global_broadcast ke semua room.

// TODO(human): get_rooms: kirim daftar room beserta jumlah anggotanya.

// TODO(human): admin_kick. Siapa yang BOLEH memakainya? Pikirkan otorisasi,
//   jangan percaya field dari klien begitu saja.

// TODO(human): Bersihkan room kosong setelah jeda waktu.

// Selesai kalau:
//   [ ] pesan broadcast hanya diterima anggota room (selain pengirim)
//   [ ] daftar room akurat setelah ada yang pergi
//   [ ] event admin ditolak untuk user biasa

module.exports = { http, express, Server };

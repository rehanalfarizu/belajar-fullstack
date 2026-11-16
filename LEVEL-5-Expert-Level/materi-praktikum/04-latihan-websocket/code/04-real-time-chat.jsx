// ============================================================
// BONUS — Klien Chat Real-Time (React + socket.io-client) — kerangka
// ============================================================
// Bangun klien chat yang bicara dengan `02-socketio-server.js`.
//
// Install:
//   npm install socket.io-client
//
// Jalankan server dulu (sesuaikan path), lalu klien:
//   node 02-socketio-server.js
//   npm run dev
//
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================
//
// Fitur yang dibangun:
//   1. Layar login: pilih username dan room
//   2. Ruang chat: kirim dan terima pesan real-time
//   3. Indikator mengetik: siapa yang sedang mengetik
//   4. Daftar user online
//   5. Pesan sistem (join/leave)
//
// KONTRAK EVENT dengan server (samakan dengan server yang kamu tulis di soal 02):
//   Klien kirim  : join, leave, send-message, typing-start, typing-stop,
//                  private-message
//   Klien terima : message, room-joined, room-users, user-typing,
//                  user-stopped-typing, private-message, error
//
// Pertanyaan yang harus bisa kamu jawab setelah selesai:
//   - Kenapa koneksi socket dibuat sekali (singleton) di luar komponen?
//   - Apa yang bocor kalau listener tidak dilepas di cleanup useEffect?
//   - Kenapa indikator mengetik perlu timer untuk berhenti sendiri?
// ============================================================

import React, { useState } from "react";
// TODO(human): import { io } from "socket.io-client"; lalu pakai di bawah.

// Alamat server. Samakan dengan port di server-mu.
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// ── 1. Koneksi socket ──────────────────────────────
// TODO(human): Buat fungsi getSocket() yang membuat koneksi SEKALI saja dan
//   mengembalikan instance yang sama di pemanggilan berikutnya.
//   Petunjuk: simpan di variabel module-level; lihat opsi `reconnection*`
//   di dokumentasi Socket.IO client.
// Selesai kalau: membuka dua komponen yang memakai getSocket() hanya
//   menghasilkan satu koneksi di tab Network browser.

// ── 2. Custom hook useChat ─────────────────────────
// TODO(human): Buat hook `useChat(initialRoom)` yang menyimpan state:
//   messages, typingUsers, onlineUsers, isConnected, currentRoom,
//   dan mengembalikan fungsi: join, leave, sendMessage, startTyping,
//   stopTyping.
//   Petunjuk:
//     - Daftarkan listener event di useEffect, dan LEPAS semuanya di cleanup.
//     - Hati-hati dengan `socket.off(nama)` tanpa handler: itu melepas SEMUA
//       listener event itu, termasuk milik komponen lain. Simpan referensi
//       handler-nya.
//     - startTyping perlu timer supaya "typing-stop" terkirim otomatis kalau
//       user berhenti mengetik.
// Selesai kalau: pesan dari tab lain muncul tanpa refresh, dan tidak ada
//   listener ganda setelah komponen unmount lalu mount lagi.

// ── 3. Layar login ─────────────────────────────────
// TODO(human): Komponen LoginScreen({ onJoin }) dengan input username dan
//   pilihan room. Validasi: username wajib dan maksimal 20 karakter, room wajib.
//   Pakai <label htmlFor> untuk aksesibilitas.

// ── 4. Layar ruang chat ────────────────────────────
// TODO(human): Komponen ChatRoomScreen dengan daftar pesan (scroll otomatis ke
//   pesan terbaru), indikator mengetik, daftar user online, form kirim, dan
//   tombol keluar. Pesan bertipe "system" ditampilkan beda dari pesan biasa.
//   Tombol kirim nonaktif saat input kosong.

// ── 5. Komponen utama ──────────────────────────────
export default function RealTimeChatApp() {
  const [joined] = useState(false);

  // TODO(human): Gabungkan useChat, LoginScreen, dan ChatRoomScreen.
  //   Tampilkan "Connecting..." selama socket belum tersambung, layar login
  //   selama belum join, dan ruang chat setelahnya.

  return (
    <div className="app">
      <p>{joined ? "Ruang chat belum dibuat" : "Klien chat belum dibuat"}</p>
    </div>
  );
}

// ============================================================
// SOAL 01 — Server WebSocket dengan library `ws` (kerangka)
// ============================================================
// Bangun server "stock price ticker": klien subscribe ke simbol saham dan
// menerima harga yang berubah tiap detik.
//
// Install:
//   npm install express ws
//
// Jalankan (sesuaikan path):
//   node 01-websocket-server.js
//
// Uji lewat console browser:
//   const ws = new WebSocket("ws://localhost:8080/ws");
//   ws.onopen = () => ws.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
//   ws.onmessage = (e) => console.log(JSON.parse(e.data));
//
// Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
// ============================================================

// Kontrak pesan (JSON):
//   Klien -> Server: { type: "subscribe" | "unsubscribe" | "get-stocks" | "ping", symbol? }
//   Server -> Klien: { type: "welcome" | "stock-update" | "subscribed" |
//                            "unsubscribed" | "pong" | "error", ... }

const http = require("http");
const express = require("express");
const { WebSocketServer } = require("ws");

const PORT = process.env.PORT || 8080;

// TODO(human): HTTP server dengan Express.
//   Buat endpoint GET /health (status, uptime, jumlah klien terhubung) dan
//   GET /api/stats (jumlah subscriber per simbol).
//   Selesai kalau: curl /health menjawab JSON, dan jumlah klien berubah saat
//   kamu membuka/menutup tab.

// TODO(human): Pasang WebSocketServer ke HTTP server yang sama (path /ws).
//   Pertanyaan: kenapa WebSocket bisa berbagi port dengan HTTP?

// TODO(human): Struktur data langganan.
//   Putuskan sendiri bentuknya (misalnya Map simbol -> Set klien). Pikirkan:
//   apa yang harus dibersihkan saat klien putus?

// TODO(human): Tangani koneksi baru dan pesan masuk.
//   - Kirim pesan "welcome" saat terhubung.
//   - Parse JSON dengan aman: pesan rusak TIDAK boleh membuat server crash,
//     balas dengan { type: "error" }.
//   - Tangani tiap tipe pesan di kontrak di atas.

// TODO(human): Siarkan harga tiap 1 detik hanya ke subscriber simbolnya.
//   Gunakan harga simulasi buatanmu. Cek ws.readyState sebelum mengirim.

// TODO(human): Heartbeat (ping/pong) tiap 30 detik untuk membuang koneksi mati.
//   Cari tahu: kenapa koneksi bisa "mati" tanpa event close?

// TODO(human): Shutdown yang rapi (SIGINT): hentikan timer, tutup klien, tutup server.

// Selesai kalau:
//   [ ] dua tab menerima update hanya untuk simbol yang mereka subscribe
//   [ ] unsubscribe menghentikan update untuk simbol itu
//   [ ] pesan JSON rusak dibalas error tanpa menjatuhkan server
//   [ ] klien yang putus tidak tersisa di struktur data (cek /api/stats)

module.exports = { PORT, http, express, WebSocketServer };

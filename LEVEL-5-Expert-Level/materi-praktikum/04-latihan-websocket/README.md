# 04 — Latihan WebSocket & Real-Time

> Membangun fitur real-time dengan WebSocket dan Socket.io.

---

## Tujuan Pembelajaran

Setelah menyelesaikan semua soal di modul ini, mahasiswa diharapkan mampu:

1. Mengimplementasikan **WebSocket server** menggunakan Node.js `ws` library
2. Mengelola **connection lifecycle** — connect, disconnect, heartbeat
3. Menggunakan **Socket.io** untuk abstraksi yang lebih tinggi dan fallback transport
4. Membangun fitur **real-time collaboration** — presence tracking dan cursor broadcasting
5. Memahami kapan harus menggunakan **WebSocket** vs **Server-Sent Events (SSE)** vs polling

---

## Struktur Soal

| # | File Soal | Topik |
|---|-----------|------|
| 01 | `soal/01-websocket-dasar.md` | Dasar-dasar WebSocket dengan Node.js |
| 02 | `soal/02-socketio-chatapp.md` | Socket.io untuk aplikasi chat real-time |
| 03 | `soal/03-real-time-collaboration.md` | Presence tracking dan collaborative editing |

---

## Struktur Kode Template

| # | File Template | Deskripsi |
|---|---------------|-----------|
| 01 | `code/01-websocket-server.js` | WebSocket server dasar dengan `ws` library |
| 02 | `code/02-socketio-server.js` | Socket.io server dengan room dan event |
| 03 | `code/03-presence-tracker.jsx` | Komponen React untuk presence tracking |

---

## Tools yang Dibutuhkan

- **Node.js** 24 LTS
- **ws** library (`npm install ws`)
- **socket.io** dan **socket.io-client**
- **React** (untuk frontend components)

---

## Prasyarat

- Penguasaan Node.js dan Express (LEVEL-2)
- Penguasaan React fundamental (LEVEL-3)
- Pemahaman dasar tentang HTTP request-response lifecycle
- Familiar dengan konsep event-driven programming

---

## Protokol yang Dibahas

### WebSocket (RFC 6455)
- Full-duplex, persistent connection
- Cocok untuk: chat, live collaboration, gaming, IoT
- Overhead rendah setelah handshake

### Socket.io
- Fallback ke polling jika WebSocket tidak tersedia
- Room/namespace abstraction
- Automatic reconnection
- Cocok untuk: aplikasi yang butuh reliability di berbagai jaringan

### Server-Sent Events (SSE)
- Unidirectional (server → client only)
- Built-in reconnection
- Cocok untuk: notifications, live feeds, progress updates

---

## Langkah Pengerjaan

1. **Baca** teori real-time communication di `../../materi-teori/`
2. **Kerjakan** soal 01 untuk memahami WebSocket di level paling rendah
3. **Lanjut** ke soal 02 untuk menggunakan Socket.io dengan pattern yang lebih tinggi
4. **Selesaikan** soal 03 untuk fitur collaborative yang kompleks
5. **Test** dengan lebih dari satu client secara simultan

---

**Estimasi Waktu:** 6–8 jam

# SOAL 01 — WebSocket Fundamentals

> Membangun WebSocket server dengan Node.js `ws` library.

---

## Deskripsi Soal

Kamu diminta membangun WebSocket server untuk aplikasi **real-time stock price ticker**. Server harus:
1. Accept WebSocket connections
2. Broadcast harga saham setiap detik ke semua connected clients
3. Handle client disconnect gracefully
4. Implementasi heartbeat/ping-pong untuk connection health
5. Menyediakan HTTP endpoint untuk REST API (health check, stats)

---

## Teori Singkat

### WebSocket Lifecycle

```
Client Server
   │                                   │
   │───── HTTP Upgrade Request ───────▶│
   │◀────101 Switching Protocols ─────│
   │ │
   │──────── Data Frame ──────────────▶│ (text/binary)
   │◀──────── Data Frame ─────────────│
   │                                   │
   │──────── Close Frame ──────────────▶│
   │◀──────── Close Frame ─────────────│
```

### ws Library

```js
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
  // ws: the WebSocket connection
  // req: the HTTP upgrade request
});
```

### WebSocket Frame Types

| Opcode | Name | Direction | Description |
|--------|------|-----------|-------------|
| 0x1 | Text | Bidirectional | UTF-8 text data |
| 0x2 | Binary | Bidirectional | Binary data |
| 0x8 | Close | Bidirectional | Connection close |
| 0x9 | Ping | Server → Client | Heartbeat request |
| 0xA | Pong | Client → Server | Heartbeat response |

---

## Checklist Pengerjaan

### Bagian A — Basic WebSocket Server (20 menit)

**1. Setup Project**

```bash
mkdir ws-stock-ticker && cd ws-stock-ticker
npm init -y
npm install ws express cors
```

**2. Basic Server Implementation**

```js
// TODO: Implementasikan
// code/01-websocket-server.js
```

Server harus:
- Create WebSocketServer di port 8080
- Create Express server di port 3000
- Handle `connection` event
- Handle `message` event
- Handle `close` event
- Handle `error` event

**3. Test Connection**

```bash
# Start server
node server.js

# Test dengan websocat atau browser DevTools
websocat ws://localhost:8080
# atau di browser console:
# const ws = new WebSocket('ws://localhost:8080');
# ws.onmessage = (e) => console.log(e.data);
```

### Bagian B — Message Broadcasting (15 menit)

**1. Broadcast Function**

> **Tulis sendiri dulu.** Bagaimana mengirim satu pesan ke semua client yang masih terhubung? Cek `readyState` dulu, kenapa?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 1. Broadcast Function*.

**2. Simulated Stock Data**

Generate random stock prices:

> **Tulis sendiri dulu.** Siapkan data saham palsu: daftar simbol dan fungsi yang menghasilkan harga acak di sekitar harga dasar.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 2. Simulated Stock Data*.

**3. Periodic Broadcast**

> **Tulis sendiri dulu.** Bagaimana mengirim update berkala ke semua client? Pikirkan `setInterval` dan format pesan JSON dengan `type`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 3. Periodic Broadcast*.

### Bagian C — Connection Management (15 menit)

**1. Track Connected Clients**

> **Tulis sendiri dulu.** Saat client baru terhubung, apa yang perlu dicatat dan dikirim sebagai sapaan?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 1. Track Connected Clients*.

**2. Client Registry**

> **Tulis sendiri dulu.** Bagaimana melacak daftar client yang terhubung dan membersihkannya saat mereka putus?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 2. Client Registry*.

**3. Client Count Endpoint**

> **Tulis sendiri dulu.** Buat endpoint HTTP yang melaporkan jumlah client, uptime, dan pemakaian memori.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 3. Client Count Endpoint*.

### Bagian D — Heartbeat / Ping-Pong (15 menit)

**1. Implementasi Heartbeat**

> **Tulis sendiri dulu.** Bagaimana mendeteksi client yang "hantu" (koneksi mati tanpa close)? Pikirkan ping berkala dan penanda `isAlive`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 1. Implementasi Heartbeat*.

**2. Handle Pong Response**

> **Tulis sendiri dulu.** Event apa yang diterima server sebagai balasan ping, dan apa yang harus dilakukan?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 2. Handle Pong Response*.

**3. Detect Disconnect**

> **Tulis sendiri dulu.** Event `close` membawa kode dan alasan. Apa yang perlu dibersihkan di sini?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 3. Detect Disconnect*.

**4. Test Heartbeat**

```bash
# Test dengan connection timeout
# Tutup laptop WiFi selama 40 detik
# Client harus di-terminate setelah missed heartbeat
```

### Bagian E — Error Handling & Edge Cases (15 menit)

**1. Error Handling**

> **Tulis sendiri dulu.** Apa yang terjadi kalau event `error` tidak ditangani? Tulis handler minimalnya.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 1. Error Handling*.

**2. Invalid Message Handling**

> **Tulis sendiri dulu.** Pesan dari client bisa berupa sampah. Bagaimana mem-parse dengan aman dan membalas error yang rapi?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 2. Invalid Message Handling*.

**3. Message Types**

Definisikan dan handle message types:

| Type | Direction | Payload | Action |
|------|-----------|---------|--------|
| `subscribe` | Client → Server | `{ symbols: ['AAPL', 'GOOGL'] }` | Filter updates |
| `unsubscribe` | Client → Server | `{ symbols: ['AAPL'] }` | Remove filter |
| `ping` | Client → Server | `{}` | Respond with `pong` |
| `stock_update` | Server → Client | `{ data: [...] }` | Update UI |
| `error` | Server → Client | `{ message: '...' }` | Show error |

**4. Graceful Shutdown**

> **Tulis sendiri dulu.** Saat server dimatikan (SIGTERM), bagaimana menutup semua koneksi dengan sopan lalu keluar?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-websocket-dasar — 4. Graceful Shutdown*.

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Basic WebSocket server berfungsi | 15% |
| Message broadcasting | 20% |
| Connection management (track, disconnect) | 20% |
| Heartbeat/ping-pong implementation | 20% |
| Error handling & edge cases | 15% |
| REST API endpoints | 10% |

---

## Reference

- [ws Library Documentation](https://github.com/websockets/ws)
- [WebSocket Protocol (RFC 6455)](https://datatracker.ietf.org/doc/html/rfc6455)
- [MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [WebSocket vs HTTP](https://www.ably.io/blog/websocket-vs-http-streaming)

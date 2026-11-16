# SOAL 02 — Socket.io Chat Application

> Membangun aplikasi chat real-time dengan Socket.io.

---

## Deskripsi Soal

Kamu diminta membangun aplikasi chat real-time dengan Socket.io yang mendukung:
1. Multiple chat rooms
2. Private messaging
3. Typing indicators
4. Online presence (who's online)
5. Message history (with pagination)
6. Reconnection handling

---

## Teori Singkat

### Socket.io vs ws

| Feature | Socket.io | ws (raw) |
|---------|-----------|----------|
| Transport fallback | Polling if WS fails | WS only |
| Automatic reconnection | Built-in | Manual implementation |
| Room abstraction | Built-in | Manual management |
| Acknowledgements | Built-in | Manual |
| Namespace | Built-in | Manual |
| Binary support | Yes | Yes |
| Bundle size | ~200 KB | ~40 KB |

### Socket.io Key Concepts

```js
// Server
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }
});

// Rooms
io.to("room1").emit("message", data);
io.to("room1").to("user-id").emit("private", data);

// Namespaces (separate connection)
const adminIO = io.of("/admin");
adminIO.on("connection", (socket) => { ... });
```

```js
// Client
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: true,
  reconnection: true,
});
```

### Room Management

```js
// Join room
socket.join("roomId");

// Leave room
socket.leave("roomId");

// Send to room
io.to("roomId").emit("event", data);

// Rooms a socket is in
socket.rooms; // Set of room IDs
```

---

## Checklist Pengerjaan

### Bagian A — Server Setup (15 menit)

**1. Install Dependencies**

```bash
npm install socket.io express cors
npm install socket.io-client # untuk frontend testing
```

**2. Basic Server**

```js
// TODO: Implementasikan
// code/02-socketio-server.js
```

Server harus:
- Setup HTTP server dengan Express
- Setup Socket.io dengan CORS
- Handle connection event
- Handle disconnection event
- Handle basic message event

**3. Event Types**

Definisikan event types:

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join_room` | Client → Server | `{ roomId, username }` | Join/create room |
| `leave_room` | Client → Server | `{ roomId }` | Leave room |
| `chat_message` | Bidirectional | `{ roomId, message }` | Send message |
| `user_joined` | Server → Client | `{ username, roomId }` | Notify room |
| `user_left` | Server → Client | `{ username, roomId }` | Notify room |
| `typing` | Bidirectional | `{ roomId, username }` | Typing indicator |
| `stop_typing` | Bidirectional | `{ roomId, username }` | Stop typing |
| `room_message` | Server → Client | `{ ...message }` | Broadcast message |

### Bagian B — Room Management (20 menit)

**1. Join Room**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Leave Room**

> **Tulis sendiri dulu.** Kebalikan dari join: apa yang dilakukan saat user keluar room, dan siapa yang perlu diberi tahu?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 2. Leave Room*.

**3. Get Room Users**

> **Tulis sendiri dulu.** Bagaimana mengambil daftar socket di sebuah room beserta username-nya? Cari `fetchSockets` (perhatikan fungsinya perlu `async`).
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 3. Get Room Users*.

**4. Room List Endpoint**

> **Tulis sendiri dulu.** Bagaimana membaca daftar room dari adapter Socket.IO untuk endpoint REST, dan room mana yang harus dibuang dari hasil?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 4. Room List Endpoint*.

### Bagian C — Messaging (20 menit)

**1. Chat Message**

> **Tulis sendiri dulu.** Alur pesan chat: bentuk objek pesan, simpan ke riwayat, lalu kirim ke seluruh room. Siapa yang ikut menerima?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 1. Chat Message*.

**2. Message History with Pagination**

> **Tulis sendiri dulu.** Riwayat chat dengan paginasi lewat callback (acknowledgement). Rumus potongan halaman dan `hasMore` seperti apa?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 2. Message History with Pagination*.

**3. Typing Indicators**

> **Tulis sendiri dulu.** Indikator "sedang mengetik": kirim ke anggota lain, lalu hentikan otomatis setelah jeda. Struktur data apa untuk timer per socket?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 3. Typing Indicators*.

### Bagian D — Private Messaging (15 menit)

**1. Send Private Message**

> **Tulis sendiri dulu.** Pesan privat: siapa penerimanya, dan apa yang dikirim balik ke pengirim sebagai konfirmasi?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 1. Send Private Message*.

**2. Get Online Users**

> **Tulis sendiri dulu.** Bagaimana menyusun daftar user online dari data yang kamu simpan, dan mengembalikannya lewat callback?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 2. Get Online Users*.

### Bagian E — Reconnection Handling (15 menit)

**1. Client Reconnection**

> **Tulis sendiri dulu.** Saat koneksi putus lalu tersambung lagi, apa yang harus dilakukan client supaya kembali ke room-nya?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 1. Client Reconnection*.

**2. Server-side Reconnection**

> **Tulis sendiri dulu.** Sisi server untuk bergabung kembali: data apa yang dipulihkan, dan siapa yang diberi tahu?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 2. Server-side Reconnection*.

**3. Message Buffering**

> **Tulis sendiri dulu.** Bagaimana mencegah pengiriman ke room yang bukan milik socket, dan bagaimana menyimpan pesan saat client terputus?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-socketio-chatapp — 3. Message Buffering*.

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Basic Socket.io server berfungsi | 15% |
| Room management (join/leave) | 20% |
| Messaging dengan history | 20% |
| Typing indicators | 15% |
| Private messaging | 15% |
| Reconnection handling | 15% |

---

## Reference

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [Socket.io Server API](https://socket.io/docs/v4/server-api/)
- [Socket.io Client API](https://socket.io/docs/v4/client-api/)
- [Socket.io Rooms](https://socket.io/docs/v4/namespaces/#rooms)

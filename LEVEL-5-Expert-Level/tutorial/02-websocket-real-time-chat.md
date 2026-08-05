# Tutorial 02 — WebSocket Real-time Chat

## Tujuan
Membuat aplikasi chat real-time menggunakan Socket.io, memahami konsep WebSocket, rooms, dan broadcast events.

---

## Latar Belakang: HTTP vs WebSocket

```
HTTP (Request-Response)
Client ──── Request ────▶ Server
Client ◀─── Response ──── Server
(Hanya client yang bisa initiate)

WebSocket (Bi-directional)
Client ◀────▶ Server
(Kedua sisi bisa kirim kapan saja)
```

---

## Langkah 1 — Install Socket.io

```bash
cd blog-api
npm install socket.io
```

---

## Langkah 2 — Setup Socket.io Server

Buat `socket/index.js`:

```javascript
const { Server } = require("socket.io");

function setupSocket(httpServer) {
  const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
  const io = new Server(httpServer, {
    cors: {
      origin: clientOrigin,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", socket => {
    console.log(`User terhubung: ${socket.id}`);

    // User join room
    socket.on("join_room", ({ username, room }) => {
      socket.join(room);
      console.log(`${username} join room: ${room}`);

      // Broadcast ke room bahwa user sudah join
      io.to(room).emit("receive_message", {
        username: "System",
        message: `${username} telah bergabung di room ${room}`,
        time: new Date().toLocaleTimeString()
      });
    });

    // Terima dan broadcast message
    socket.on("send_message", data => {
      // Kirim ke SEMUA user di room yang sama (termasuk pengirim)
      io.to(data.room).emit("receive_message", data);
    });

    // User disconnect
    socket.on("disconnect", () => {
      console.log(`User terputus: ${socket.id}`);
    });
  });

  return io;
}

module.exports = setupSocket;
```

Di production, isi `CLIENT_ORIGIN` dengan origin frontend yang tepat. Jangan
memakai wildcard untuk aplikasi yang membawa cookie atau identitas pengguna.
Autentikasi socket harus diverifikasi pada fase handshake dan event sensitif
tetap membutuhkan validasi payload, authorization, serta rate limiting.

---

## Langkah 3 — Integrasi dengan HTTP Server

Ubah `index.js`:

```javascript
const express = require("express");
const http = require("http");
const cors = require("cors");
const setupSocket = require("./socket");

const app = express();
const server = http.createServer(app);
const PORT = 3000;

// Initialize Socket.io
setupSocket(server);

app.use(cors());
app.use(express.json());

// Routes REST API
app.use("/api", require("./routes/posts"));
app.use("/api/auth", require("./routes/auth"));

server.listen(PORT, () => {
  console.log(`Server + Socket.io berjalan di http://localhost:${PORT}`);
});
```

---

## Langkah 4 — Frontend Chat Component

Install Socket.io client:

```bash
cd fullstack-blog
npm install socket.io-client
```

Buat `src/components/ChatRoom.jsx`:

```jsx
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

function ChatRoom() {
  const { room } = useParams();
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Koneksi socket
    socketRef.current = io(SOCKET_URL);

    // Terima message
    socketRef.current.on("receive_message", data => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleJoin = () => {
    if (!username.trim()) return;
    socketRef.current.emit("join_room", { username, room });
    setJoined(true);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const data = {
      username,
      room,
      message,
      time: new Date().toLocaleTimeString()
    };

    socketRef.current.emit("send_message", data);
    setMessage("");
  };

  return (
    <div className="chat-room">
      {!joined ? (
        <div className="join-form">
          <h3>Masuk ke Room: {room}</h3>
          <input
            type="text"
            placeholder="Masukkan nama kamu"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Bergabung</button>
        </div>
      ) : (
        <>
          <div className="chat-header">
            <h3>Room: {room}</h3>
            <p>User: {username}</p>
          </div>

          <div className="messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.username === username ? "me" : "other"}`}
              >
                <span className="meta">
                  {msg.username} • {msg.time}
                </span>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Kirim</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatRoom;
```

---

## Langkah 5 — Styling Chat

Tambahkan di `src/index.css`:

```css
.chat-room {
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.join-form {
  padding: 24px;
  text-align: center;
}

.join-form input {
  padding: 10px;
  width: 70%;
  margin-right: 8px;
}

.chat-header {
  background: #2563eb;
  color: white;
  padding: 12px 16px;
}

.messages {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
}

.message.me {
  align-self: flex-end;
  background: #2563eb;
  color: white;
}

.message.other {
  align-self: flex-start;
  background: white;
  border: 1px solid #ddd;
}

.message .meta {
  font-size: 0.75rem;
  opacity: 0.7;
  display: block;
  margin-bottom: 2px;
}

.input-area {
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
}

.input-area input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px 0 0 6px;
}

.input-area button {
  border-radius: 0 6px 6px 0;
}
```

---

## Langkah 6 — Tambah Route Chat

Di `App.jsx`:

```jsx
import ChatRoom from "./components/ChatRoom";

// Tambahkan route:
// <Route path="/chat/:room" element={<ChatRoom />} />
```

---

## Konsep Kunci

| Konsep | Penjelasan |
|--------|------------|
| `socket.emit()` | Kirim event dari client ke server |
| `io.on()` | Terima event di server |
| `socket.join(room)` | User masuk ke room spesifik |
| `io.to(room).emit()` | Broadcast ke semua di room itu |
| `socket.disconnect()` | Cleanup saat component unmount |

---

## Latihan Tambahan

1. Tambah fitur "typing indicator" (user sedang mengetik)
2. Tambah fitur private message (DM) antar user
3. Tambah presence indicator (user online/offline)
4. Simpan chat history di database

---

**Selesai LEVEL-5!** Sekarang kamu sudah punya semua skill fullstack dari nol sampai expert.

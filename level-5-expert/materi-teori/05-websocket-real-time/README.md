# 📘 MATERI TEORI 05 — WebSocket & Real-time

## 1. HTTP vs WebSocket

```
HTTP — Request/Response (one-way, stateless)
─────────────────────────────────────────────
Client ──── GET /data ──────────► Server
Client ◄──── 200 OK ──────────── Server
Client ──── POST /data ─────────► Server
Client ◄──── 201 Created ──────── Server
(Tiap request = connection baru, client-pull only)

WebSocket — Bidirectional (two-way, persistent)
───────────────────────────────────────────────
Client ◄─────── Connection (handshake) ────────► Server
Client ──────── Message ────────────────────────► Server
Client ◄─────── Message ──────────────────────── Server
Client ──────── Message ───────────────────────► Server
(Tetap terhubung, push/pull bisa kapan saja)
```

---

## 2. Socket.io — Library Real-time

```bash
npm install socket.io
```

### Server Setup

```javascript
// server/index.js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

// Socket events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Leave room
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
  });

  // Private message
  socket.on("private-message", ({ to, message }) => {
    io.to(to).emit("private-message", {
      from: socket.id,
      message
    });
  });

  // Broadcast ke room
  socket.on("chat-message", ({ roomId, message }) => {
    // io.to(roomId) = semua di room itu KECUALI sender
    // io.in(roomId) = semua di room itu TERMASUK sender
    io.to(roomId).emit("chat-message", {
      from: socket.id,
      message,
      timestamp: new Date().toISOString()
    });
  });

  // Broadcast ke semua (global)
  socket.on("ping", () => {
    io.emit("pong", { time: Date.now() });
  });

  // Disconnect
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
  });
});

httpServer.listen(3000, () => {
  console.log("Socket.io server running on :3000");
});
```

### Client Setup

```javascript
// client/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: false,    // connect manual
  transports: ["websocket", "polling"], // fallback
  withCredentials: true
});

// Connect
socket.connect();

// Event listeners
socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

socket.on("chat-message", (data) => {
  console.log("New message:", data);
  // append to chat UI
});

socket.on("private-message", (data) => {
  console.log("Private from", data.from, ":", data.message);
});

// Emit events
export function sendMessage(roomId, message) {
  socket.emit("chat-message", { roomId, message });
}

export function joinRoom(roomId) {
  socket.emit("join-room", roomId);
}

export function leaveRoom(roomId) {
  socket.emit("leave-room", roomId);
}
```

---

## 3. React + Socket.io Integration

```jsx
// contexts/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("chat-message", (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat-message");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, messages, socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
```

```jsx
// ChatRoom.jsx
import { useState } from "react";
import { useSocket } from "../contexts/SocketContext";

function ChatRoom({ roomId }) {
  const [input, setInput] = useState("");
  const { messages } = useSocket();

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("chat-message", { roomId, message: input });
    setInput("");
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i}>
            <span>{msg.from}: </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Kirim</button>
    </div>
  );
}
```

---

## 4. Rooms — Group Chat / Colaboration

```javascript
// Room = logical group, bisa untuk:
// - Chat room
// - Document collaboration
// - Game room
// - Live dashboard

// Join saat user masuk halaman
socket.emit("join-room", "room-123");

// Notify semua orang di room bahwa user masuk
io.to("room-123").emit("user-joined", {
  userId: socket.id,
  userCount: io.sockets.adapter.rooms.get("room-123")?.size || 0
});

// Leave saat user keluar
socket.on("disconnect", () => {
  io.to("room-123").emit("user-left", { userId: socket.id });
});
```

---

## 5. Presence& Online Status

```javascript
// Server — track online users
const onlineUsers = new Map(); // socket.id → userData

io.on("connection", (socket) => {
  // User login → simpan
  socket.on("user-online", (userData) => {
    onlineUsers.set(socket.id, userData);
    io.emit("presence-update", {
      type: "online",
      users: Array.from(onlineUsers.values())
    });
  });

  // User disconnect → hapus
  socket.on("disconnect", () => {
    const user = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    if (user) {
      io.emit("presence-update", {
        type: "offline",
        userId: socket.id,
        users: Array.from(onlineUsers.values())
      });
    }
  });
});
```

---

## 6. Redis Adapter (Scale ke Banyak Server)

```bash
npm install @socket.io/redis-adapter redis
```

```javascript
// server/index.js
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  const io = new Server(httpServer, {
    adapter: createAdapter(pubClient, subClient)
  });
});
```

---

## 7. WebSocket vs Server-Sent Events (SSE)

```
WebSocket — bidirectional (client ↔ server bisa kirim kapan saja)
├── Chat real-time
├── Multiplayer game
├── Collaborative editing
└── Stock price ticker (banyak data mengalir dua arah)

SSE — unidirectional (server → client push only)
├── Notification feed
├── Live dashboard updates
├── News feed
└── Progress bar

Kapan pakai apa?
→ Kalau client perlu kirim data sering → WebSocket
→ Kalau hanya server push ke client → SSE (lebih simpel)
```

---

## Ringkasan

```
WebSocket & Real-time
├── Socket.io   → library real-time, rooms, broadcasting
├── Connection  → socket.on("connect"), socket.emit("event")
├── Rooms       → socket.join(), io.to(room).emit()
├── Private msg → io.to(socketId).emit()
├── Presence    → track online users, online/offline events
├── Redis       → adapter untuk scale multi-server
├── SSE         → alternatif untuk unidirectional push
└── Context     → SocketProvider, useSocket hook
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/04-latihan-websocket/`
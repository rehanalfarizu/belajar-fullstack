// ============================================================
// SOAL 02 — Socket.io Chat App
// ============================================================
// Install dependencies:
//   npm install express socket.io
//   # atau di React app:
//   npm install socket.io-client
//
// Run server:
//   node materi-praktikum/04-latihan-websocket/code/02-socketio-server.js
//
// Test (multiple browser tabs):
//   Buka http://localhost:3000 di 2 tab berbeda
//   Login dengan username berbeda
//   Kirim pesan — harus terlihat di semua tab
// ============================================================

// ──────────────────────────────────────────────
// Socket.io server untuk aplikasi chat real-time
// dengan fitur:
// 1. User join/leave notifications
// 2. Room-based chat (public rooms)
// 3. Private/direct messages
// 4. Typing indicators
// 5. Online users list
// 6. Message history (in-memory, last 100 per room)
//
// Socket events:
//   emit: "join", "send-message", "typing-start", "typing-stop",
//         "private-message", "get-users"
//   on:  "message", "room-joined", "room-users", "user-typing",
//         "user-stopped-typing", "private-message", "error"
// ──────────────────────────────────────────────

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());

// ── HTTP endpoints ──────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    connectedUsers: io ? io.engine.clientsCount : 0,
    rooms: io ? Object.keys(io.sockets.adapter.rooms || {}).length : 0,
  });
});

app.get("/api/rooms", (req, res) => {
  const rooms = io.sockets.adapter.rooms || new Map();
  const roomList = Array.from(rooms.keys())
    .filter((r) => !r.includes("-") || r.length > 20) // filter individual socket IDs
    .map((name) => ({
      name,
      userCount: rooms.get(name)?.size || 0,
    }));
  res.json(roomList);
});

const server = http.createServer(app);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// ── Socket.io Server ────────────────────────────
const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, methods: ["GET", "POST"] },
  transports: ["websocket", "polling"],
});

// Store active users: socketId → { username, room, joinedAt }
const users = new Map();

// Store message history: roomName → array of last 100 messages
const messageHistory = new Map();
const MAX_HISTORY = 100;

// ── Helper Functions ──────────────────────────────
function getUsersInRoom(room) {
  const roomObj = io.sockets.adapter.rooms.get(room);
  if (!roomObj) return [];
  return Array.from(roomObj)
    .map((socketId) => users.get(socketId))
    .filter(Boolean)
    .map(({ username, joinedAt }) => ({ username, joinedAt }));
}

function addToHistory(room, message) {
  if (!messageHistory.has(room)) messageHistory.set(room, []);
  const history = messageHistory.get(room);
  history.push(message);
  if (history.length > MAX_HISTORY) history.shift();
}

function getHistory(room) {
  return messageHistory.get(room) || [];
}

function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Socket Events ────────────────────────────────
io.on("connection", (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // ── 1. JOIN ────────────────────────────────────
  socket.on("join", ({ username, room }) => {
    if (!username || !room) {
      socket.emit("error", { message: "username and room are required" });
      return;
    }

    const cleanUsername = String(username).slice(0, 20).trim();
    const cleanRoom = String(room).slice(0, 30).trim();

    // Leave all previous rooms
    socket.rooms.forEach((r) => {
      if (r !== socket.id) socket.leave(r);
    });

    // Join new room
    socket.join(cleanRoom);

    // Save user data
    users.set(socket.id, {
      username: cleanUsername,
      room: cleanRoom,
      joinedAt: Date.now(),
    });

    // System message ke room
    const systemMsg = {
      id: `sys_${Date.now()}`,
      type: "system",
      content: `${cleanUsername} joined the room`,
      timestamp: Date.now(),
    };
    addToHistory(cleanRoom, systemMsg);
    io.to(cleanRoom).emit("message", systemMsg);

    // Send room info ke joining user
    socket.emit("room-joined", {
      room: cleanRoom,
      users: getUsersInRoom(cleanRoom),
      history: getHistory(cleanRoom),
    });

    // Notify others about updated user list
    io.to(cleanRoom).emit("room-users", getUsersInRoom(cleanRoom));

    console.log(`[Socket.io] ${cleanUsername} joined room "${cleanRoom}"`);
  });

  // ── 2. SEND MESSAGE ────────────────────────────
  socket.on("send-message", ({ content }) => {
    const user = users.get(socket.id);
    if (!user) {
      socket.emit("error", { message: "You must join a room first" });
      return;
    }

    const trimmed = String(content).slice(0, 1000).trim();
    if (!trimmed) return;

    const message = {
      id: generateMessageId(),
      type: "message",
      content: trimmed,
      sender: { id: socket.id, username: user.username },
      room: user.room,
      timestamp: Date.now(),
    };

    addToHistory(user.room, message);
    io.to(user.room).emit("message", message);
  });

  // ── 3. PRIVATE MESSAGE ─────────────────────────
  socket.on("private-message", ({ to, content }) => {
    const sender = users.get(socket.id);
    if (!sender) {
      socket.emit("error", { message: "You must join a room first" });
      return;
    }

    // Find recipient by username or socket id
    const recipientSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.id === to || users.get(s.id)?.username === to
    );

    if (!recipientSocket) {
      socket.emit("error", { message: "User not found or not online" });
      return;
    }

    const message = {
      id: generateMessageId(),
      type: "private",
      content: String(content).slice(0, 1000).trim(),
      sender: { id: socket.id, username: sender.username },
      to: users.get(recipientSocket.id)?.username,
      timestamp: Date.now(),
    };

    recipientSocket.emit("private-message", message);
    socket.emit("private-message", { ...message, delivered: true });
  });

  // ── 4. TYPING INDICATOR ───────────────────────
  socket.on("typing-start", () => {
    const user = users.get(socket.id);
    if (!user) return;
    socket.to(user.room).emit("user-typing", { username: user.username });
  });

  socket.on("typing-stop", () => {
    const user = users.get(socket.id);
    if (!user) return;
    socket.to(user.room).emit("user-stopped-typing", { username: user.username });
  });

  // ── 5. ROOM MANAGEMENT ────────────────────────
  socket.on("get-users", (room) => {
    socket.emit("room-users", getUsersInRoom(room || users.get(socket.id)?.room));
  });

  socket.on("get-history", (room) => {
    socket.emit("history", getHistory(room || users.get(socket.id)?.room));
  });

  // ── 6. LEAVE ROOM ─────────────────────────────
  socket.on("leave", () => {
    handleDisconnect(socket);
  });

  // ── 7. DISCONNECT ─────────────────────────────
  socket.on("disconnect", (reason) => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}, reason: ${reason}`);
    handleDisconnect(socket);
  });

  function handleDisconnect(sock) {
    const user = users.get(sock.id);
    if (!user) return;

    const { room, username } = user;
    sock.leave(room);
    users.delete(sock.id);

    const systemMsg = {
      id: `sys_${Date.now()}`,
      type: "system",
      content: `${username} left the room`,
      timestamp: Date.now(),
    };
    addToHistory(room, systemMsg);
    io.to(room).emit("message", systemMsg);
    io.to(room).emit("room-users", getUsersInRoom(room));
  }
});

// ── Start Server ────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
  console.log(`REST API: http://localhost:${PORT}/health`);
  console.log(`Rooms API: http://localhost:${PORT}/api/rooms`);
});

// ============================================================
// SOAL 03 — Rooms & Broadcast
// ============================================================
// Install dependencies:
//   npm install express socket.io
//
// Run:
//   node materi-praktikum/04-latihan-websocket/code/03-rooms-broadcast.js
//
// Test dengan 3 terminal (3 user berbeda):
//   Terminal 1: gunakan Socket.IO client
//   Terminal 2: gunakan Socket.IO client
//   Terminal 3: gunakan Socket.IO client
//
// Lalu emit event:
//   join({ room: "tech", username: "Alice" })
//   broadcast({ room: "tech", message: "Hello tech room!" })
// ============================================================

// ============================================================
// SOCKET.IO — ROOMS & BROADCAST SERVER
//
// Fitur:
// 1. Dynamic rooms — user bisa buat/join room dengan username
// 2. Room listing — info semua room yang aktif
// 3. Broadcast — kirim pesan ke semua orang di room (kecuali sender)
// 4. Global broadcast — kirim ke semua room sekaligus
// 5. Admin commands — kick, mute, room control
// 6. Auto-cleanup — hapus room kalau kosong setelah timeout
//
// Events:
//   Client → Server:
//     join({ room, username })         — join/buat room
//     leave({ room })                  — leave room
//     broadcast({ room, message })     — broadcast ke room
//     global_broadcast({ message })    — broadcast ke semua room
//     get_rooms()                      — minta list semua room
//     admin_kick({ room, username })   — kick user dari room
//
//   Server → Client:
//     room_joined({ room, users })     — konfirmasi join
//     room_left({ room })              — konfirmasi leave
//     room_broadcast({ room, username, message, timestamp })
//     global_broadcast({ username, message, timestamp })
//     rooms_list({ rooms })            — list semua room
//     user_joined({ room, username })
//     user_left({ room, username })
//     error({ message })
// ============================================================

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());

// ── HTTP Endpoints (monitoring) ─────────────────────
app.get("/health", (req, res) => {
  const rooms = io.sockets.adapter.rooms || new Map();
  res.json({
    status: "ok",
    totalConnections: io.engine.clientsCount,
    activeRooms: Array.from(rooms.keys()).filter(
      (r) => !r.includes("-") || r.length > 15
    ).length,
    rooms: Array.from(rooms.keys())
      .filter((r) => !r.includes("-") || r.length > 15)
      .map((r) => ({ name: r, count: rooms.get(r)?.size || 0 })),
  });
});

app.get("/api/rooms", (req, res) => {
  const rooms = io.sockets.adapter.rooms || new Map();
  const roomList = Array.from(rooms.keys())
    .filter((r) => !r.includes("-") || r.length > 15)
    .map((name) => ({
      name,
      userCount: rooms.get(name)?.size || 0,
      sockets: Array.from(rooms.get(name) || []),
    }));
  res.json(roomList);
});

// ── HTTP Server + Socket.io ─────────────────────────
const server = http.createServer(app);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, methods: ["GET", "POST"] },
  transports: ["websocket", "polling"],
});

// ── State ────────────────────────────────────────────
const users = new Map(); // socketId → { username, room, joinedAt }
const roomSettings = new Map(); // roomName → { isPrivate, maxUsers, createdAt }
const ROOM_TIMEOUT = 5 * 60 * 1000; // 5 menit — room dihapus kalau kosong

// Helper: get all rooms with user counts
function getAllRooms() {
  const rooms = io.sockets.adapter.rooms || new Map();
  return Array.from(rooms.keys())
    .filter((r) => !r.includes("-") || r.length > 15)
    .map((name) => {
      const roomSet = rooms.get(name);
      return {
        name,
        userCount: roomSet?.size || 0,
        settings: roomSettings.get(name) || {},
      };
    });
}

// Helper: get users in a specific room
function getRoomUsers(roomName) {
  const room = io.sockets.adapter.rooms.get(roomName);
  if (!room) return [];
  return Array.from(room)
    .map((sid) => {
      const u = users.get(sid);
      return u ? { socketId: sid, username: u.username, joinedAt: u.joinedAt } : null;
    })
    .filter(Boolean);
}

// Helper: check if user is in a room
function isUserInRoom(socketId, roomName) {
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.has(socketId) : false;
}

// Helper: broadcast to room (excluding sender)
function broadcastToRoom(roomName, event, data, excludeSocketId = null) {
  if (!io.sockets.adapter.rooms.has(roomName)) return;
  for (const [sid] of io.sockets.adapter.rooms.get(roomName)) {
    if (excludeSocketId && sid === excludeSocketId) continue;
    io.to(sid).emit(event, data);
  }
}

// Helper: broadcast to all connected clients
function broadcastGlobal(event, data) {
  for (const [sid] of io.sockets.adapter.sids || []) {
    io.to(sid).emit(event, data);
  }
}

// ── Socket Events ───────────────────────────────────
io.on("connection", (socket) => {
  console.log(`[Rooms] Client connected: ${socket.id} (total: ${io.engine.clientsCount})`);

  // ── 1. JOIN ROOM ─────────────────────────────────
  socket.on("join", ({ room, username, isPrivate = false }) => {
    if (!room || !username) {
      socket.emit("error", { message: "room and username are required" });
      return;
    }

    const cleanRoom = String(room).slice(0, 30).trim();
    const cleanUsername = String(username).slice(0, 20).trim();
    const settings = roomSettings.get(cleanRoom) || { isPrivate, maxUsers: 50, createdAt: Date.now() };

    // Leave previous room if any
    const prevUser = users.get(socket.id);
    if (prevUser?.room) {
      socket.leave(prevUser.room);
      broadcastToRoom(prevUser.room, "user_left", {
        room: prevUser.room,
        username: prevUser.username,
        reason: "joined another room",
      });
    }

    // Join new room
    socket.join(cleanRoom);

    // Save user state
    users.set(socket.id, {
      username: cleanUsername,
      room: cleanRoom,
      joinedAt: Date.now(),
      isAdmin: false,
    });

    // Update/create room settings
    roomSettings.set(cleanRoom, settings);

    const roomUsers = getRoomUsers(cleanRoom);

    // Confirm to joining user
    socket.emit("room_joined", {
      room: cleanRoom,
      username: cleanUsername,
      users: roomUsers,
      settings,
    });

    // Notify others in room
    broadcastToRoom(cleanRoom, "user_joined", {
      room: cleanRoom,
      username: cleanUsername,
      totalUsers: roomUsers.length,
    }, socket.id);

    console.log(`[Rooms] ${cleanUsername} joined room "${cleanRoom}" (${roomUsers.length} users)`);
  });

  // ── 2. LEAVE ROOM ────────────────────────────────
  socket.on("leave", ({ room }) => {
    const user = users.get(socket.id);
    if (!user) return;

    socket.leave(room);

    broadcastToRoom(room, "user_left", {
      room,
      username: user.username,
      reason: "manual leave",
    });

    users.delete(socket.id);

    socket.emit("room_left", { room });

    console.log(`[Rooms] ${user.username} left room "${room}"`);

    // Cleanup empty rooms after timeout
    scheduleRoomCleanup(room);
  });

  // ── 3. BROADCAST TO ROOM ─────────────────────────
  socket.on("broadcast", ({ room, message }) => {
    const user = users.get(socket.id);
    if (!user) {
      socket.emit("error", { message: "You must join a room first" });
      return;
    }

    const content = String(message).slice(0, 500).trim();
    if (!content) return;

    // Check if user is in this room
    if (!isUserInRoom(socket.id, room)) {
      socket.emit("error", { message: "You are not in this room" });
      return;
    }

    const broadcastData = {
      id: `bc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      room,
      username: user.username,
      message: content,
      timestamp: Date.now(),
    };

    // Broadcast ke semua user di room, termasuk sender; ubah bila ingin exclude.
    io.to(room).emit("room_broadcast", broadcastData);

    console.log(`[Rooms] [${room}] ${user.username}: ${content.slice(0, 50)}`);
  });

  // ── 4. GLOBAL BROADCAST ──────────────────────────
  socket.on("global_broadcast", ({ message }) => {
    const user = users.get(socket.id);
    if (!user) {
      socket.emit("error", { message: "You must join a room first" });
      return;
    }

    const content = String(message).slice(0, 500).trim();
    if (!content) return;

    const broadcastData = {
      id: `gb_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      username: user.username,
      fromRoom: user.room,
      message: content,
      timestamp: Date.now(),
    };

    // Kirim ke semua room yang punya listener untuk global broadcast
    io.emit("global_broadcast", broadcastData);

    console.log(`[Rooms] [GLOBAL] ${user.username}: ${content.slice(0, 50)}`);
  });

  // ── 5. GET ROOMS LIST ────────────────────────────
  socket.on("get_rooms", () => {
    socket.emit("rooms_list", { rooms: getAllRooms() });
  });

  // ── 6. ADMIN: KICK USER ─────────────────────────
  socket.on("admin_kick", ({ room, username }) => {
    const admin = users.get(socket.id);
    if (!admin || admin.username !== "admin") {
      socket.emit("error", { message: "Admin only" });
      return;
    }

    // Find target socket
    const targetSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => users.get(s.id)?.username === username && users.get(s.id)?.room === room
    );

    if (targetSocket) {
      targetSocket.emit("kicked", { room, reason: "You were kicked by admin" });
      targetSocket.disconnect(true);
      io.to(room).emit("user_kicked", { room, username, by: admin.username });
    }
  });

  // ── 7. DIRECT MESSAGE ────────────────────────────
  socket.on("direct_message", ({ to, message }) => {
    const sender = users.get(socket.id);
    if (!sender) return;

    const targetSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => users.get(s.id)?.username === to
    );

    if (!targetSocket) {
      socket.emit("error", { message: `User "${to}" not found` });
      return;
    }

    const dmData = {
      id: `dm_${Date.now()}`,
      from: sender.username,
      fromSocketId: socket.id,
      to,
      message: String(message).slice(0, 300).trim(),
      timestamp: Date.now(),
    };

    targetSocket.emit("direct_message", dmData);
    socket.emit("dm_sent", { ...dmData, delivered: true });
  });

  // ── 8. PING/PONG (health check) ─────────────────
  socket.on("ping_server", () => {
    socket.emit("pong_server", { serverTime: Date.now() });
  });

  // ── 9. DISCONNECT ───────────────────────────────
  socket.on("disconnect", (reason) => {
    const user = users.get(socket.id);
    if (user) {
      const { room, username } = user;
      users.delete(socket.id);

      if (room) {
        broadcastToRoom(room, "user_left", {
          room,
          username,
          reason: "disconnected",
        });
        console.log(`[Rooms] ${username} disconnected from "${room}" (reason: ${reason})`);
        scheduleRoomCleanup(room);
      }
    }
    console.log(`[Rooms] Client disconnected: ${socket.id} (total: ${io.engine.clientsCount})`);
  });
});

// ── Room Cleanup ─────────────────────────────────────
const roomCleanupTimers = new Map();

function scheduleRoomCleanup(roomName) {
  if (roomCleanupTimers.has(roomName)) {
    clearTimeout(roomCleanupTimers.get(roomName));
  }

  const timer = setTimeout(() => {
    const room = io.sockets.adapter.rooms.get(roomName);
    if (!room || room.size === 0) {
      io.sockets.adapter.rooms.delete(roomName);
      roomSettings.delete(roomName);
      console.log(`[Rooms] Room "${roomName}" cleaned up (empty)`);
      roomCleanupTimers.delete(roomName);
    }
  }, ROOM_TIMEOUT);

  roomCleanupTimers.set(roomName, timer);
}

// ── Start Server ────────────────────────────────────
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[Rooms] Socket.io server with rooms running on port ${PORT}`);
  console.log(`[Rooms] REST API: http://localhost:${PORT}/health`);
  console.log(`[Rooms] Rooms API: http://localhost:${PORT}/api/rooms`);
});

// ============================================================
// EXAMPLE USAGE
// ============================================================
/*
// Join a room
socket.emit("join", { room: "tech", username: "Alice" });

// Listen for room events
socket.on("room_joined", ({ room, users }) => console.log("Joined", room, users));
socket.on("user_joined", ({ room, username }) => console.log(username, "joined", room));
socket.on("user_left", ({ room, username }) => console.log(username, "left", room));
socket.on("room_broadcast", (data) => console.log(data.username + ":", data.message));

// Broadcast to room
socket.emit("broadcast", { room: "tech", message: "Hello everyone!" });

// Global broadcast
socket.emit("global_broadcast", { message: "Announcement to all!" });

// Get all rooms
socket.emit("get_rooms");
socket.on("rooms_list", ({ rooms }) => console.log(rooms));

// Direct message
socket.emit("direct_message", { to: "Bob", message: "Hi Bob!" });
*/

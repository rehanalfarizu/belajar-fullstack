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

```js
socket.on("join_room", ({ roomId, username }) => {
  // Leave all current rooms
  for (const room of socket.rooms) {
    if (room !== socket.id) {
      socket.leave(room);
    }
  }

  // Join new room
  socket.join(roomId);
  socket.data.username = username;
  socket.data.roomId = roomId;

  // Notify room
  socket.to(roomId).emit("user_joined", {
    username,
    socketId: socket.id,
  });

  // Send confirmation to joiner
  socket.emit("room_joined", {
    roomId,
    username,
    users: getRoomUsers(roomId),
  });
});
```

**2. Leave Room**

```js
socket.on("leave_room", ({ roomId }) => {
  socket.leave(roomId);
  socket.to(roomId).emit("user_left", {
    username: socket.data.username,
    socketId: socket.id,
  });
});
```

**3. Get Room Users**

```js
function getRoomUsers(roomId) {
  const sockets = await io.in(roomId).fetchSockets();
  return sockets.map((s) => ({
    socketId: s.id,
    username: s.data.username,
  }));
}
```

**4. Room List Endpoint**

```js
app.get("/api/rooms", async (req, res) => {
  const rooms = [];
  for (const [roomId, set] of io.of("/").adapter.rooms) {
    if (roomId !== "" && typeof roomId === "string") {
      rooms.push({
        id: roomId,
        userCount: set.size,
      });
    }
  }
  res.json(rooms);
});
```

### Bagian C — Messaging (20 menit)

**1. Chat Message**

```js
socket.on("chat_message", ({ roomId, content }) => {
  const message = {
    id: generateMessageId(),
    roomId,
    username: socket.data.username,
    content,
    timestamp: Date.now(),
  };

  // Save to message history (in-memory for now)
  saveMessage(roomId, message);

  // Broadcast to room (including sender)
  io.to(roomId).emit("room_message", message);
});
```

**2. Message History with Pagination**

```js
const messageHistory = new Map();  // roomId → [messages]

function getMessages(roomId, page = 1, limit = 50) {
  const messages = messageHistory.get(roomId) || [];
  const start = (page - 1) * limit;
  return messages.slice(start, start + limit);
}

socket.on("get_history", ({ roomId, page = 1 }, callback) => {
  const messages = getMessages(roomId, page);
  const total = (messageHistory.get(roomId) || []).length;

  callback({
    messages,
    page,
    total,
    hasMore: total > page * 50,
  });
});
```

**3. Typing Indicators**

```js
// Timeout untuk stop typing
const typingTimers = new Map();

socket.on("typing", ({ roomId }) => {
  socket.to(roomId).emit("typing", {
    username: socket.data.username,
  });

  // Auto-clear typing after 3 seconds
  clearTimeout(typingTimers.get(socket.id));
  typingTimers.set(
    socket.id,
    setTimeout(() => {
      socket.to(roomId).emit("stop_typing", {
        username: socket.data.username,
      });
    }, 3000)
  );
});
```

### Bagian D — Private Messaging (15 menit)

**1. Send Private Message**

```js
socket.on("private_message", ({ toSocketId, content }) => {
  const message = {
    id: generateMessageId(),
    from: socket.data.username,
    to: getUsernameBySocketId(toSocketId),
    content,
    timestamp: Date.now(),
    type: "private",
  };

  // Send to recipient
  io.to(toSocketId).emit("private_message", message);

  // Send confirmation to sender
  socket.emit("private_message", {
    ...message,
    delivered: true,
  });
});
```

**2. Get Online Users**

```js
socket.on("get_online_users", (callback) => {
  const users = [];
  for (const [id, socketData] of onlineUsers) {
    users.push({
      socketId: id,
      username: socketData.username,
      currentRoom: socketData.roomId,
    });
  }
  callback(users);
});
```

### Bagian E — Reconnection Handling (15 menit)

**1. Client Reconnection**

```js
// Client-side
socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // If was in a room, rejoin
  if (previousRoomId) {
    socket.emit("join_room", {
      roomId: previousRoomId,
      username: previousUsername,
    });
  }
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});
```

**2. Server-side Reconnection**

```js
socket.on("reconnect_room", ({ roomId, username }) => {
  // Verify user exists (could add auth here)
  socket.join(roomId);
  socket.data.username = username;
  socket.data.roomId = roomId;

  // Notify room
  socket.to(roomId).emit("user_reconnected", {
    username,
    socketId: socket.id,
  });
});
```

**3. Message Buffering**

```js
// Buffer messages sent while disconnected
const messageBuffer = new Map();  // socketId → [messages]

socket.on("chat_message", ({ roomId, content }) => {
  if (!socket.rooms.has(roomId)) {
    socket.emit("error", { message: "Not in this room" });
    return;
  }

  // Normal message handling...
});

// On reconnect, send buffered messages
socket.on("reconnect", () => {
  const buffered = messageBuffer.get(socket.id) || [];
  buffered.forEach((msg) => socket.emit("room_message", msg));
  messageBuffer.delete(socket.id);
});
```

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

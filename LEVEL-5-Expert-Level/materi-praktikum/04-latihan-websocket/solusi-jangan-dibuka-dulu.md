# Solusi — Latihan WebSocket (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi kunci jawaban klien chat. Kerjakan dulu
> versimu sendiri, jalankan bersama `02-socketio-server.js`, baru bandingkan.
> Cara kamu tidak harus sama, asal fiturnya jalan dan tidak bocor listener.

Isi di bawah dipindahkan apa adanya dari `code/04-real-time-chat.jsx` lama.

---

## Bonus — Klien chat real-time (versi lama lengkap)

````jsx
// ============================================================
// SOAL 04 — Real-Time Chat Application
// ============================================================
// React + Socket.io Client — Real-Time Chat Room
//
// Install dependencies:
//   npm install socket.io-client
//
// Run backend server first:
//   node materi-praktikum/04-latihan-websocket/code/02-socketio-server.js
//
// Then run this React app:
//   npm run dev
// ============================================================

// ============================================================
// REAL-TIME CHAT — React Component
//
// Fitur:
// 1. Login screen — pilih username & room
// 2. Chat room — kirim/terima pesan real-time
// 3. Typing indicators — lihat siapa yang sedang mengetik
// 4. Online users list — siapa saja yang online
// 5. Private messaging — chat langsung ke user tertentu
// 6. System notifications — join/leave messages
// ============================================================

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { io } from "socket.io-client";

// ── Configuration ────────────────────────────────
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// ── 1. Socket Connection (Singleton) ───────────────
let socket = null;

function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

// ── 2. Custom Hooks ────────────────────────────────
function useChat(initialRoom) {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [currentRoom, setCurrentRoom] = useState(initialRoom || "");
  const typingTimerRef = useRef(null);

  const sock = useRef(getSocket());

  useEffect(() => {
    const s = sock.current;

    s.on("connect", () => setIsConnected(true));
    s.on("disconnect", () => setIsConnected(false));

    s.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("room-joined", ({ room, users, history }) => {
      setCurrentRoom(room);
      setOnlineUsers(users);
      setMessages(history || []);
    });

    s.on("room-users", (users) => setOnlineUsers(users));

    s.on("user-typing", ({ username }) => {
      setTypingUsers((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );
    });

    s.on("user-stopped-typing", ({ username }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    });

    s.on("private-message", (msg) => {
      // Handle private messages (shown as separate notification)
      console.log("Private message received:", msg);
    });

    s.on("error", ({ message }) => {
      console.error("Socket error:", message);
    });

    return () => {
      s.off("connect");
      s.off("disconnect");
      s.off("message");
      s.off("room-joined");
      s.off("room-users");
      s.off("user-typing");
      s.off("user-stopped-typing");
      s.off("private-message");
      s.off("error");
    };
  }, []);

  const join = useCallback((username, room) => {
    sock.current.emit("join", { username, room });
    setMyUsername(username);
  }, []);

  const leave = useCallback(() => {
    sock.current.emit("leave");
    setCurrentRoom("");
    setMessages([]);
    setOnlineUsers([]);
  }, []);

  const sendMessage = useCallback((content) => {
    sock.current.emit("send-message", { content });
    // Stop typing indicator after sending
    sock.current.emit("typing-stop");
    clearTimeout(typingTimerRef.current);
  }, []);

  const sendPrivateMessage = useCallback((toUsername, content) => {
    sock.current.emit("private-message", { to: toUsername, content });
  }, []);

  const startTyping = useCallback(() => {
    sock.current.emit("typing-start");
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      sock.current.emit("typing-stop");
    }, 2000);
  }, []);

  const stopTyping = useCallback(() => {
    sock.current.emit("typing-stop");
    clearTimeout(typingTimerRef.current);
  }, []);

  return {
    messages,
    typingUsers,
    onlineUsers,
    isConnected,
    myUsername,
    currentRoom,
    join,
    leave,
    sendMessage,
    sendPrivateMessage,
    startTyping,
    stopTyping,
  };
}

// ── 3. Login Screen ────────────────────────────────
function LoginScreen({ onJoin }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("general");
  const [customRoom, setCustomRoom] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = username.trim();
    const selectedRoom = room === "custom" ? customRoom.trim() : room;
    if (!name) {
      setError("Username is required");
      return;
    }
    if (!selectedRoom) {
      setError("Room name is required");
      return;
    }
    if (name.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }
    onJoin(name, selectedRoom);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>Real-Time Chat</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room</label>
            <select
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="general">general</option>
              <option value="tech">tech</option>
              <option value="random">random</option>
              <option value="custom">custom...</option>
            </select>
            {room === "custom" && (
              <input
                type="text"
                placeholder="Custom room name"
                value={customRoom}
                onChange={(e) => setCustomRoom(e.target.value)}
                style={{ marginTop: "8px" }}
              />
            )}
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-primary">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

// ── 4. Chat Room Screen ────────────────────────────
function ChatRoomScreen({ messages, typingUsers, onlineUsers, onLeave, onSendMessage, onTyping, onStopTyping, currentRoom }) {
  const [input, setInput] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    onSendMessage(text);
    setInput("");
    onStopTyping();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      onTyping();
    }
  };

  const formatTime = (ts) => {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageClass = (msg) => {
    if (msg.type === "system") return "message system";
    if (msg.type === "private") return "message private";
    return "message";
  };

  return (
    <div className="chat-room">
      {/* Header */}
      <div className="chat-header">
        <div className="room-info">
          <span className="room-name">#{currentRoom}</span>
          <span className="online-count">
            {onlineUsers.length} online
          </span>
        </div>
        <div className="header-actions">
          <button
            className="btn-icon"
            onClick={() => setShowUsers(!showUsers)}
            title="Toggle user list"
          >
            {onlineUsers.length} 👤
          </button>
          <button className="btn-leave" onClick={onLeave}>
            Leave
          </button>
        </div>
      </div>

      <div className="chat-body">
        {/* Messages */}
        <div className="messages-list">
          {messages.map((msg, i) => (
            <div key={msg.id || i} className={getMessageClass(msg)}>
              {msg.type === "system" ? (
                <span className="system-text">{msg.content}</span>
              ) : (
                <>
                  <div className="msg-meta">
                    <span className="msg-sender">{msg.sender?.username || "You"}</span>
                    <span className="msg-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="msg-content">{msg.content}</div>
                </>
              )}
            </div>
          ))}
          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {typingUsers.join(", ")}{" "}
              {typingUsers.length === 1 ? "is" : "are"} typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Online users sidebar */}
        {showUsers && (
          <div className="users-sidebar">
            <h3>Online ({onlineUsers.length})</h3>
            <ul>
              {onlineUsers.map((user, i) => (
                <li key={user.username || i}>{user.username}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Message input */}
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          maxLength={1000}
        />
        <button type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

// ── 5. Main App ────────────────────────────────────
export default function RealTimeChatApp() {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("general");

  const {
    messages,
    typingUsers,
    onlineUsers,
    isConnected,
    join,
    leave,
    sendMessage,
    startTyping,
    stopTyping,
  } = useChat(room);

  const handleJoin = (username, selectedRoom) => {
    setRoom(selectedRoom);
    join(username, selectedRoom);
    setJoined(true);
  };

  const handleLeave = () => {
    leave();
    setJoined(false);
  };

  if (!isConnected) {
    return (
      <div className="connecting-screen">
        <p>Connecting to server...</p>
      </div>
    );
  }

  if (!joined) {
    return <LoginScreen onJoin={handleJoin} />;
  }

  return (
    <div className="app">
      <ChatRoomScreen
        messages={messages}
        typingUsers={typingUsers}
        onlineUsers={onlineUsers}
        currentRoom={room}
        onLeave={handleLeave}
        onSendMessage={sendMessage}
        onTyping={startTyping}
        onStopTyping={stopTyping}
      />
    </div>
  );
}

// ============================================================
// SOLUSI (fully working code — uncomment untuk pakai)
// ============================================================
/*
export default function RealTimeChatApp() {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("general");

  const {
    messages,
    typingUsers,
    onlineUsers,
    isConnected,
    join,
    leave,
    sendMessage,
    startTyping,
    stopTyping,
  } = useChat(room);

  const handleJoin = (username, selectedRoom) => {
    setRoom(selectedRoom);
    join(username, selectedRoom);
    setJoined(true);
  };

  if (!isConnected) {
    return <div className="connecting-screen"><p>Connecting to server...</p></div>;
  }

  if (!joined) {
    return <LoginScreen onJoin={handleJoin} />;
  }

  return (
    <div className="app">
      <ChatRoomScreen
        messages={messages}
        typingUsers={typingUsers}
        onlineUsers={onlineUsers}
        currentRoom={room}
        onLeave={() => { leave(); setJoined(false); }}
        onSendMessage={sendMessage}
        onTyping={startTyping}
        onStopTyping={stopTyping}
      />
    </div>
  );
}
*/

````

---

## Soal 01 — Server WebSocket (ws) (`code/01-websocket-server.js` lama)

````js
// ============================================================
// SOAL 01 — WebSocket Server dengan library `ws`
// ============================================================
// Install dependencies:
//   npm install express ws
//
// Run:
//   node materi-praktikum/04-latihan-websocket/code/01-websocket-server.js
//
// Test dengan browser console:
//   const ws = new WebSocket("ws://localhost:8080");
//   ws.onopen = () => ws.send(JSON.stringify({type:"subscribe",symbol:"AAPL"}));
//   ws.onmessage = (e) => console.log(JSON.parse(e.data));
// ============================================================

const http = require("http");
const express = require("express");
const { WebSocketServer } = require("ws");

// ──────────────────────────────────────────────
// WebSocket server untuk aplikasi real-time
// stock price ticker.
//
// Features:
// 1. HTTP server dengan Express untuk health check
// 2. WebSocket server yang attach ke HTTP server
// 3. Track semua connected clients
// 4. Broadcast harga saham setiap 1 detik ke subscriber
// 5. Subscribe/unsubscribe per symbol
// 6. Heartbeat/ping-pong untuk detect dead connections
// 7. Stats endpoint
//
// Events:
// Client → Server: { type: "subscribe"|"unsubscribe"|"get-stocks"|"ping", symbol?: string }
//   Server → Client: { type: "welcome"|"stock-update"|"subscribed"|"unsubscribed"|"pong"|"error" }
// ============================================================

const PORT = process.env.PORT || 8080;
const HTTP_PORT = 3000;
const HEARTBEAT_INTERVAL = 30_000; // 30 detik
const BROADCAST_INTERVAL = 1_000;  // 1 detik

// ── 1. HTTP Server dengan Express ────────────────
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    connectedClients: wss ? wss.clients.size : 0,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/stats", (req, res) => {
  res.json({
    connectedClients: wss ? wss.clients.size : 0,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    subscriptions: Array.from(subscriptions.entries()).map(([symbol, clients]) => ({
      symbol,
      subscriberCount: clients.size,
    })),
  });
});

const httpServer = http.createServer(app);

// ── 2. WebSocket Server ────────────────────────────
const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

// Map: client → Set of subscribed symbols
const clientSubscriptions = new Map();

// Map: symbol → Set of subscribed clients
const subscriptions = new Map();

// Stock data (mock — ganti dengan real API di production)
const stockData = {
  AAPL:  { price: 178.50, change: 0 },
  GOOGL: { price: 141.80, change: 0 },
  MSFT:  { price: 378.90, change: 0 },
  TSLA:  { price: 248.50, change: 0 },
  AMZN:  { price: 178.20, change: 0 },
  META:  { price: 500.00, change: 0 },
};

function getRandomChange(price) {
  // Simulasi perubahan harga ±2%
  return Math.round((Math.random() - 0.5) * 0.04 * price * 100) / 100;
}

function generateStockUpdate() {
  return Object.entries(stockData).map(([symbol, data]) => {
    const newPrice = Math.round((data.price + getRandomChange(data.price)) * 100) / 100;
    const change = Math.round((newPrice - data.price) * 100) / 100;
    stockData[symbol] = { price: newPrice, change };
    return {
      symbol,
      name: getStockName(symbol),
      price: newPrice,
      change,
      changePercent: Math.round((change / newPrice) * 10000) / 100,
      timestamp: Date.now(),
    };
  });
}

function getStockName(symbol) {
  const names = {
    AAPL: "Apple Inc.", GOOGL: "Alphabet Inc.", MSFT: "Microsoft Corp.",
    AMZN: "Amazon.com Inc.", TSLA: "Tesla Inc.", META: "Meta Platforms",
  };
  return names[symbol] || symbol;
}

// ── 3. Broadcast stock update ke subscriber ────────
function broadcastStockUpdate() {
  const updates = generateStockUpdate();

  wss.clients.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return;

    const subs = clientSubscriptions.get(client) || new Set();
    updates.forEach((update) => {
      // Kirim hanya ke client yang subscribe symbol ini
      if (subs.has(update.symbol)) {
        client.send(JSON.stringify({ type: "stock-update", data: [update] }));
      }
    });
  });
}

const broadcastInterval = setInterval(broadcastStockUpdate, BROADCAST_INTERVAL);

// ── 4. Connection Handler ─────────────────────────
wss.on("connection", (socket, req) => {
  const clientId = `client_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  console.log(`[WS] New connection: ${clientId} from ${req.socket.remoteAddress}`);

  // Initialize subscription tracking
  clientSubscriptions.set(socket, new Set(stocks.map((s) => s.symbol)));

  // ── 5. Message Handler ─────────────────────────
  socket.on("message", (rawData) => {
    let data;
    try {
      data = JSON.parse(rawData.toString());
    } catch {
      socket.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
    }

    const subs = clientSubscriptions.get(socket);

    switch (data.type) {
      case "ping":
        socket.send(JSON.stringify({ type: "pong", timestamp: Date.now() }));
        break;

      case "subscribe": {
        const { symbol } = data;
        if (!stockData[symbol]) {
          socket.send(JSON.stringify({ type: "error", message: `Unknown symbol: ${symbol}` }));
          return;
        }
        subs.add(symbol);
        if (!subscriptions.has(symbol)) subscriptions.set(symbol, new Set());
        subscriptions.get(symbol).add(socket);
        console.log(`[WS] ${clientId} subscribed to ${symbol}`);
        socket.send(
          JSON.stringify({
            type: "subscribed",
            symbol,
            currentPrice: stockData[symbol].price,
          })
        );
        break;
      }

      case "unsubscribe": {
        const { symbol } = data;
        subs.delete(symbol);
        subscriptions.get(symbol)?.delete(socket);
        console.log(`[WS] ${clientId} unsubscribed from ${symbol}`);
        socket.send(JSON.stringify({ type: "unsubscribed", symbol }));
        break;
      }

      case "get-stocks": {
        const currentPrices = Object.entries(stockData).map(([symbol, data]) => ({
          symbol,
          name: getStockName(symbol),
          price: data.price,
          change: data.change,
          changePercent: Math.round((data.change / data.price) * 10000) / 100,
          timestamp: Date.now(),
        }));
        socket.send(JSON.stringify({ type: "stock-snapshot", data: currentPrices }));
        break;
      }

      case "get-subscriptions": {
        socket.send(JSON.stringify({ type: "subscription-list", symbols: Array.from(subs) }));
        break;
      }

      default:
        socket.send(JSON.stringify({ type: "error", message: `Unknown type: ${data.type}` }));
    }
  });

  // ── 6. Disconnect Handler ──────────────────────
  socket.on("close", (code, reason) => {
    console.log(`[WS] ${clientId} disconnected (code=${code})`);
    const subs = clientSubscriptions.get(socket);
    if (subs) {
      subs.forEach((symbol) => subscriptions.get(symbol)?.delete(socket));
      clientSubscriptions.delete(socket);
    }
  });

  socket.on("error", (err) => {
    console.error(`[WS] ${clientId} error:`, err.message);
  });

  // ── 7. Heartbeat ───────────────────────────────
  socket.isAlive = true;
  socket.on("pong", () => {
    socket.isAlive = true;
  });

  // Welcome message
  socket.send(
    JSON.stringify({
      type: "welcome",
      clientId,
      availableSymbols: Object.keys(stockData),
      message: "Stock ticker connected. Subscribed to all symbols by default.",
    })
  );
});

// ── 8. Heartbeat Interval ─────────────────────────
const heartbeat = setInterval(() => {
  wss.clients.forEach((socket) => {
    if (socket.isAlive === false) {
      console.log(`[WS] Terminating dead socket`);
      return socket.terminate();
    }
    socket.isAlive = false;
    socket.ping();
  });
}, HEARTBEAT_INTERVAL);

wss.on("close", () => {
  clearInterval(heartbeat);
  clearInterval(broadcastInterval);
});

// ── 9. Graceful Shutdown ─────────────────────────
function gracefulShutdown(signal) {
  console.log(`\n[WS] Received ${signal}, shutting down gracefully...`);

  // Stop accepting new connections
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ type: "server-shutdown", message: "Server is shutting down" }));
    client.close(1001, "Server shutdown");
  });

  setTimeout(() => {
    clearInterval(heartbeat);
    clearInterval(broadcastInterval);
    httpServer.close(() => {
      console.log("[WS] Server closed");
      process.exit(0);
    });
  }, 500);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT",  () => gracefulShutdown("SIGINT"));

// ── 10. Start Server ──────────────────────────────
httpServer.listen(HTTP_PORT, () => {
  console.log(`[HTTP] REST API running on http://localhost:${HTTP_PORT}`);
  console.log(`[WS]   WebSocket server running on ws://localhost:${HTTP_PORT}/ws`);
  console.log(` Health:  http://localhost:${HTTP_PORT}/health`);
  console.log(`       Stats:   http://localhost:${HTTP_PORT}/api/stats`);
  console.log(` Symbols: ${Object.keys(stockData).join(", ")}`);
});

// ── Initial data ─────────────────────────────────
const stocks = Object.keys(stockData).map((symbol) => ({ symbol, name: getStockName(symbol), basePrice: stockData[symbol].price }));
````

---

## Soal 02 — Server Socket.IO chat (`code/02-socketio-server.js` lama)

````js
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
````

---

## Soal 02/03 — Server rooms dan broadcast (`code/03-rooms-broadcast.js` lama)

````js
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
````

---

## Blok dari `soal/02-socketio-chatapp.md`: 1. Join Room

````js
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
````

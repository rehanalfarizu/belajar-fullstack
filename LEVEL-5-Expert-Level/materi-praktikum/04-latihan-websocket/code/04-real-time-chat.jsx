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

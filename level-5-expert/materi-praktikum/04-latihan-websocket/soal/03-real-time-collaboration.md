# SOAL 03 — Real-Time Collaboration

> Membangun fitur presence tracking dan collaborative editing.

---

## Deskripsi Soal

Kamu diminta membangun fitur **real-time collaboration** untuk document editor. Fitur utama:
1. **Presence indicators** — siapa yang sedang melihat dokumen yang sama
2. **Cursor broadcasting** — posisi kursor collaborator lain
3. **Selection highlighting** — teks yang dipilih collaborator lain
4. **Conflict resolution** — last-write-wins vs CRDT untuk edit conflicts

---

## Teori Singkat

### CRDT vs OT (Operational Transformation)

| Aspect | CRDT | OT |
|--------|------|----|
| Complexity | Higher (math-based) | Lower (algorithmic) |
| Server dependency | None (peer-to-peer possible) | Required |
| Offline editing | Supported | Limited |
| Memory usage | Higher (metadata per operation) | Lower |
| Library size | Larger | Smaller |
| Use case | Google Docs (CRDT-like) | Traditional collaborative editors |

### Presence Data Structure

```js
// Presence state per user
{
  id: "user-123",
  name: "John Doe",
  avatar: "https://...",
  color: "#FF5733",  // untuk highlight di UI
  cursor: { line: 12, column: 45 },
  selection: { start: { line: 10, col: 0 }, end: { line: 12, col: 20 } },
  lastActive: 1699999999999,
  status: "active" | "idle" | "away"
}
```

### Conflict Resolution Strategies

| Strategy | Description | Pros | Cons |
|----------|-------------|------|------|
| Last Write Wins | Latest timestamp wins | Simple | Data loss |
| First Write Wins | First change wins | Predictable | Frustrating |
| Operational Transform | Transform concurrent operations | Battle-tested | Complex |
| CRDT | Merge based on math properties | No conflicts | Large metadata |

---

## Checklist Pengerjaan

### Bagian A — Presence Tracking (20 menit)

**1. Presence Store**

```js
// Server-side presence store
const presenceStore = new Map();  // documentId → Map<socketId, presence>

function updatePresence(documentId, socketId, presence) {
  if (!presenceStore.has(documentId)) {
    presenceStore.set(documentId, new Map());
  }
  presenceStore.get(documentId).set(socketId, {
    ...presence,
    lastActive: Date.now(),
  });
}

function getDocumentPresence(documentId) {
  return Array.from(presenceStore.get(documentId)?.values() || []);
}

function removePresence(documentId, socketId) {
  presenceStore.get(documentId)?.delete(socketId);
}
```

**2. Join Document**

```js
socket.on("document:join", ({ documentId, user }) => {
  socket.join(documentId);
  socket.data.currentDocument = documentId;
  socket.data.user = user;

  // Broadcast presence to existing users
  socket.to(documentId).emit("presence:user_joined", {
    user: { ...user, socketId: socket.id },
  });

  // Send current presence to new user
  socket.emit("presence:sync", {
    users: getDocumentPresence(documentId),
  });
});
```

**3. Periodic Presence Update**

```js
// Client-side: broadcast presence every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    socket.emit("presence:update", {
      cursor: editorState.cursor,
      selection: editorState.selection,
      status: "active",
    });
  }, 5000);

  return () => clearInterval(interval);
}, []);
```

### Bagian B — Cursor Broadcasting (15 menit)

**1. Cursor Position Event**

```js
// Client-side: emit cursor position on change
socket.on("cursor:move", ({ documentId, position }) => {
  socket.to(documentId).emit("presence:cursor_update", {
    socketId: socket.id,
    username: socket.data.user.name,
    color: socket.data.user.color,
    cursor: position,
  });
});
```

**2. Throttle Cursor Updates**

```js
// Cursor updates should be throttled (50ms) to avoid flooding
import { throttle } from "lodash";

const throttledCursorMove = throttle((position) => {
  socket.emit("cursor:move", { documentId, position });
}, 50);
```

**3. Cursor Component**

```js
// TODO: Implementasikan presence tracker component
// code/03-presence-tracker.jsx
```

### Bagian C — Selection Highlighting (15 menit)

**1. Selection Event**

```js
socket.on("selection:change", ({ documentId, selection }) => {
  // Broadcast to all EXCEPT sender
  socket.to(documentId).emit("presence:selection_update", {
    socketId: socket.id,
    username: socket.data.user.name,
    color: socket.data.user.color,
    selection,
  });
});
```

**2. Selection Color Generation**

```js
// Generate consistent color from user ID
function getUserColor(userId) {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33F5",
    "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF",
  ];
  const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
```

**3. Apply Remote Selection**

```js
// In editor component
socket.on("presence:selection_update", ({ socketId, color, selection }) => {
  // Create decoration for remote user's selection
  const decoration = createSelectionDecoration(selection, color, socketId);
  decorations.add(socketId, decoration);
});
```

### Bagian D — Conflict Resolution (20 menit)

**1. Last Write Wins (Simple)**

```js
// Server-side
const documentState = new Map();  // documentId → { content, version }

socket.on("document:edit", ({ documentId, change, timestamp }) => {
  const doc = documentState.get(documentId);

  // Last write wins
  if (!doc || timestamp > doc.lastUpdate) {
    documentState.set(documentId, {
      content: applyChange(doc?.content || "", change),
      lastUpdate: timestamp,
    });
  }

  // Broadcast to all clients
  io.to(documentId).emit("document:update", {
    content: documentState.get(documentId).content,
    version: documentState.get(documentId).version,
  });
});
```

**2. Operational Transformation (Basic)**

```js
// Transform operation against concurrent operations
function transformOperation(op1, op2) {
  // If op1 and op2 operate on different positions, no transform needed
  if (op1.position< op2.position) return op1;
  if (op1.position > op2.position) {
    return { ...op1, position: op1.position + getOpLength(op2) };
  }

  // Same position — need to transform
  if (op1.type === "insert" && op2.type === "insert") {
    return op1; // op2 already applied before op1
  }

  if (op1.type === "insert" && op2.type === "delete") {
    return op1; // Delete affects original text, op1 inserts after
  }

  // ... more cases
}
```

**3. Version Vectors**

```js
// Simple version tracking
const documentVersions = new Map();

socket.on("document:sync", ({ documentId, clientVersion }) => {
  const serverVersion = documentVersions.get(documentId) || 0;

  if (clientVersion < serverVersion) {
    // Client is behind, send full document
    socket.emit("document:full_sync", {
      content: getDocumentContent(documentId),
      version: serverVersion,
    });
  } else if (clientVersion === serverVersion) {
    // In sync
    socket.emit("document:synced", { version: serverVersion });
  } else {
    // Client is ahead (shouldn't happen with single-server)
    // Send conflict resolution request
    socket.emit("document:conflict", {
      serverVersion,
      serverContent: getDocumentContent(documentId),
    });
  }
});
```

### Bagian E — Idle& Away Detection (10 menit)

**1. Idle Detection**

```js
// Mark as idle after 60 seconds of no activity
const IDLE_TIMEOUT = 60000;

socket.on("presence:update", ({ documentId, ...presence }) => {
  updatePresence(documentId, socket.id, {
    ...presence,
    status: "active",
    lastActive: Date.now(),
  });

  // Reset idle timer
  resetIdleTimer(socket, documentId);
});

function resetIdleTimer(socket, documentId) {
  clearTimeout(socket.idleTimer);
  socket.idleTimer = setTimeout(() => {
    updatePresence(documentId, socket.id, { status: "idle" });
    io.to(documentId).emit("presence:status_change", {
      socketId: socket.id,
      status: "idle",
    });
  }, IDLE_TIMEOUT);
}
```

**2. Away on Disconnect**

```js
socket.on("disconnect", () => {
  const { currentDocument, user } = socket.data;
  if (currentDocument) {
    removePresence(currentDocument, socket.id);
    io.to(currentDocument).emit("presence:user_left", {
      socketId: socket.id,
      username: user?.name,
    });
  }
});
```

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Presence tracking (join/leave/sync) | 20% |
| Cursor broadcasting | 20% |
| Selection highlighting | 20% |
| Conflict resolution strategy | 25% |
| Idle/away detection | 15% |

---

## Reference

- [Yjs — CRDT Implementation](https://docs.yjs.dev/)
- [Automerge — CRDT Library](https://automerge.github.io/automerge/)
- [Socket.io Presence Example](https://socket.io/docs/v4/rooms/#Cross sockets presence)
- [Collaborative Editing Fundamentals](https://beta.observablehq.com/@jrus/collaborative-editing)

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

```js
function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
```

**2. Simulated Stock Data**

Generate random stock prices:

```js
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 175 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 140 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', basePrice: 380 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', basePrice: 175 },
  { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 250 },
];

function generateStockUpdate() {
  return stocks.map((stock) => ({
    symbol: stock.symbol,
    name: stock.name,
    price: stock.basePrice + (Math.random() - 0.5) * 10,
    change: (Math.random() - 0.5) * 5,
    timestamp: Date.now(),
  }));
}
```

**3. Periodic Broadcast**

```js
// Broadcast setiap1 detik
setInterval(() => {
  const data = JSON.stringify({
    type: 'stock_update',
    data: generateStockUpdate(),
  });
  broadcast(data);
}, 1000);
```

### Bagian C — Connection Management (15 menit)

**1. Track Connected Clients**

```js
wss.on('connection', (ws, req) => {
  const clientId = generateClientId();
  const clientIp = req.socket.remoteAddress;

  console.log(`Client connected: ${clientId} from ${clientIp}`);

  // Add metadata to WebSocket
  ws.clientId = clientId;
  ws.isAlive = true;

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    clientId,
    message: 'Connected to stock ticker',
  }));
});
```

**2. Client Registry**

```js
const clients = new Map(); // clientId → { ws, ip, connectedAt }

wss.on('connection', (ws, req) => {
  const clientId = generateClientId();
  clients.set(clientId, { ws, ip: req.socket.remoteAddress, connectedAt: new Date() });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(`Client disconnected: ${clientId}`);
  });
});
```

**3. Client Count Endpoint**

```js
app.get('/api/stats', (req, res) => {
  res.json({
    connectedClients: wss.clients.size,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});
```

### Bagian D — Heartbeat / Ping-Pong (15 menit)

**1. Implementasi Heartbeat**

```js
// Ping semua client setiap 30 detik
const HEARTBEAT_INTERVAL = 30000;

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      console.log(`Terminating inactive client: ${ws.clientId}`);
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  });
}, HEARTBEAT_INTERVAL);
```

**2. Handle Pong Response**

```js
ws.on('pong', () => {
  ws.isAlive = true;
});
```

**3. Detect Disconnect**

```js
ws.on('close', (code, reason) => {
  console.log(`Client ${ws.clientId} disconnected: ${code} - ${reason}`);
  clients.delete(ws.clientId);
});
```

**4. Test Heartbeat**

```bash
# Test dengan connection timeout
# Tutup laptop WiFi selama 40 detik
# Client harus di-terminate setelah missed heartbeat
```

### Bagian E — Error Handling & Edge Cases (15 menit)

**1. Error Handling**

```js
ws.on('error', (error) => {
  console.error(`Error for client ${ws.clientId}:`, error.message);
});
```

**2. Invalid Message Handling**

```js
ws.on('message', (data, isBinary) => {
  try {
    const message = isBinary ? data : JSON.parse(data.toString());
    handleMessage(ws, message);
  } catch (error) {
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Invalid message format',
    }));
  }
});
```

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

```js
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');

  wss.clients.forEach((ws) => {
    ws.send(JSON.stringify({ type: 'server_shutdown' }));
    ws.close(1001, 'Server shutting down');
  });

  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});
```

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

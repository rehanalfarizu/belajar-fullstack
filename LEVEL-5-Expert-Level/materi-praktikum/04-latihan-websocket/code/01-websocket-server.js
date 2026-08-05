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

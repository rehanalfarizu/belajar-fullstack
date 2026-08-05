# SOAL 06 — Event Emitter

## Tujuan
Memahami EventEmitter pattern untuk custom event system.

---

## Briefing
Buat EventEmitter untuk system notifikasi dan logging.

---

## Syarat (Checklist)

### Basic EventEmitter
- [ ] `const { EventEmitter } = require("events")`
- [ ] `emitter.on("event", callback)` — listen
- [ ] `emitter.emit("event", data)` — trigger
- [ ] `emitter.once("event", callback)` — once only
- [ ] `emitter.off("event", callback)` — remove listener

### Event Names
- [ ] String events: `"data"`, `"error"`
- [ ] Multiple listeners — `emitter.listenerCount()`

### Custom Class
- [ ] Extend `EventEmitter`
- [ ] Emit events dari dalam class method

### Use Cases
- [ ] Logger dengan levels (info, warn, error)
- [ ] File watcher
- [ ] Notifikasi event

---

## Contoh Code

```javascript
const { EventEmitter } = require("events");

class Logger extends EventEmitter {
  info(msg) {
    console.log("[INFO]", msg);
    this.emit("log", { level: "info", msg, time: new Date() });
  }

  warn(msg) {
    console.warn("[WARN]", msg);
    this.emit("log", { level: "warn", msg, time: new Date() });
  }

  error(msg) {
    console.error("[ERROR]", msg);
    this.emit("log", { level: "error", msg, time: new Date() });
  }
}

const logger = new Logger();

logger.on("log", entry => {
  console.log("Handler 1:", entry);
});

logger.on("log", entry => {
  if (entry.level === "error") {
    // Send to monitoring
    console.log("Monitoring:", entry);
  }
});

logger.info("Server started");
logger.error("Database connection failed");
```

---

## Cara Submit
1. Simpan sebagai `06-event-emitter.js`
2. Jalankan — setiap emit trigger semua handlers
3. COBA `once()` — hanya trigger sekali
4. BUAT class `FileWatcher` yang emit event saat file berubah
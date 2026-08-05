// ============================================================
// SOAL 06 — EVENT EMITTER
// ============================================================
const { EventEmitter } = require("events");

// ============================================================
// Custom EventEmitter Class
// ============================================================
// class Logger extends EventEmitter {
//   info(msg) {
//     console.log("[INFO]", msg);
//     this.emit("log", { level: "info", msg, time: new Date() });
//   }
//
//   warn(msg) {
//     console.warn("[WARN]", msg);
//     this.emit("log", { level: "warn", msg, time: new Date() });
//   }
//
//   error(msg) {
//     console.error("[ERROR]", msg);
//     this.emit("log", { level: "error", msg, time: new Date() });
//   }
// }
//
// const logger = new Logger();
//
// // Handler 1: semua logs
// logger.on("log", entry => {
//   console.log("Handler 1 - Log:", JSON.stringify(entry));
// });
//
// // Handler 2: hanya error
// logger.on("log", entry => {
//   if (entry.level === "error") {
//     console.log("Handler 2 - ERROR DETECTED:", entry.msg);
//   }
// });
//
// logger.info("Server started");
// logger.warn("Low memory");
// logger.error("Database connection failed");


// ============================================================
// FileWatcher dengan EventEmitter
// ============================================================
// class FileWatcher extends EventEmitter {
//   constructor(filename) {
//     super();
//     this.filename = filename;
//     this.watch();
//   }
//
//   watch() {
//     fs.watch(this.filename, (eventType) => {
//       if (eventType === "change") {
//         this.emit("change", { file: this.filename, time: new Date() });
//       }
//     });
//   }
// }
//
// const watcher = new FileWatcher("data.txt");
// watcher.on("change", ({ file, time }) => {
//   console.log(`${file} diubah pada ${time}`);
// });


// ============================================================
// once() — hanya trigger sekali
// ============================================================
const emitter = new EventEmitter();

emitter.once("greet", () => {
  console.log("Handler ini hanya jalan sekali!");
});

emitter.emit("greet"); // jalan
emitter.emit("greet"); // tidak jalan


// ============================================================
// removeListener
// ============================================================
function handler() {
  console.log("Handler A");
}

emitter.on("data", handler);
emitter.on("data", () => console.log("Handler B"));

emitter.emit("data"); // "Handler A" + "Handler B"

emitter.off("data", handler); // hapus handler A

emitter.emit("data"); // hanya "Handler B"


// ============================================================
// TEST
// ============================================================
console.log("=== Event Emitter Demo ===");
const demo = new EventEmitter();

demo.on("custom", data => {
  console.log("Event received:", data);
});

demo.emit("custom", { message: "Hello, Events!" });
demo.emit("custom", { message: "Second event!" });
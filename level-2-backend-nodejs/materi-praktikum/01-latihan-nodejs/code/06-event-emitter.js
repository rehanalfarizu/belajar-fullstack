// ============================================================
// SOAL 06 — EVENT EMITTER
// ============================================================
const { EventEmitter } = require("events");

// ============================================================
// TODO(human): Custom EventEmitter Class — Logger
// ============================================================
// Buat class Logger yang extends EventEmitter dengan method info, warn, error.
// - Setiap method mencetak pesan berlabel ([INFO], [WARN], [ERROR]) ke console
// - Setiap method juga emit event "log" dengan objek { level, msg, time }
// Lalu pasang dua listener pada event "log":
// - Listener 1: mencetak semua log sebagai JSON
// - Listener 2: hanya bereaksi kalau level === "error"
// Panggil logger.info, logger.warn, logger.error satu kali masing-masing.
// Selesai kalau: 3 log tercetak oleh Listener 1, dan hanya log error yang
// memicu Listener 2. Cek dengan logger.listenerCount("log") bernilai 2.
// Ingat: listener harus dipasang SEBELUM emit.


// ============================================================
// TODO(human): FileWatcher dengan EventEmitter (bonus)
// ============================================================
// Buat class FileWatcher yang extends EventEmitter. Constructor menerima nama
// file, lalu memantaunya dengan fs.watch (baca dokumentasi fs.watch; jangan
// lupa require("fs")). Saat file berubah, emit event "change" berisi
// { file, time }.
// Selesai kalau: mengedit file yang dipantau mencetak pesan dari listener "change".


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
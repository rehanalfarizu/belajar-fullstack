# Solusi Jangan Dibuka Dulu

> **STOP.** File ini berisi potongan jawaban untuk beberapa soal di folder ini.
> Membukanya sebelum kamu mencoba sendiri sama saja dengan melewatkan latihannya.
>
> Aturan main:
>
> 1. Kerjakan soalnya sampai macet **30 menit penuh** (pakai catatan "Petunjuk Kalau Macet" di `TUGAS.md`).
> 2. Tulis di jurnal: apa yang kamu coba dan apa errornya.
> 3. Baru buka satu bagian saja, baca, lalu **tutup lagi dan ketik ulang dari ingatan**.
>
> Ini bukan satu-satunya jawaban benar, cuma satu contoh.

---

## Soal 05 — Module System

Bagian ini dulu ada di `code/05-module-system.js`.

### Simulasi modul (satu file, tanpa `require`)

```javascript
const math = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

const str = {
  capitalize: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
};

console.log("math.add(5,3):", math.add(5, 3));
console.log("str.capitalize('andi'):", str.capitalize("andi"));
```

### Circular dependency: perbaikan dengan lazy loading

Masalah: `a.js` dan `b.js` saling `require` di baris paling atas, jadi salah satunya
mendapat `exports` yang belum terisi (`undefined`).

```javascript
// b.js (versi lazy)
let valueA;
function getValueA() {
  if (valueA === undefined) valueA = require("./a").valueA;
  return valueA;
}
const valueB = 20;
module.exports = { valueB, getValueA };
```

Intinya: `require("./a")` dipindah ke dalam fungsi, jadi baru dijalankan saat dipakai,
setelah `a.js` selesai dimuat.

---

## Soal 07 — Streams

Bagian ini dulu ada di `code/07-streams.js`.

### 1. Readable stream

```javascript
const readable = fs.createReadStream(__filename, "utf-8");

readable.on("data", chunk => {
  console.log("Received chunk:", chunk.length, "bytes");
});

readable.on("end", () => {
  console.log("Selesai membaca file");
});

readable.on("error", err => {
  console.error("Error:", err.message);
});
```

### 2. Pipe (copy file)

```javascript
const source = fs.createReadStream("source.txt");
const dest = fs.createWriteStream("dest.txt");

source.pipe(dest);

dest.on("finish", () => {
  console.log("File berhasil disalin!");
});
```

### 3. Gzip dengan pipe

```javascript
const input = fs.createReadStream("large-file.txt");
const output = fs.createWriteStream("large-file.txt.gz");
const gzip = createGzip();

input.pipe(gzip).pipe(output);

output.on("finish", () => {
  console.log("Compression selesai!");
});
```

### 4. Word count (versi sederhana)

Versi ini punya kelemahan: kata bisa terpotong di batas chunk, jadi angka kata bisa meleset.
Itu bagian dari latihannya.

```javascript
let wordCount = 0;
let charCount = 0;
let lineCount = 0;

// Buat test file sementara
const testContent = "Node.js streams are powerful\nfor handling data\nin chunks\n";


const readStream = fs.createReadStream(__filename, "utf-8");

readStream.on("data", chunk => {
  wordCount += chunk.split(/\s+/).length;
  charCount += chunk.length;
  lineCount += (chunk.match(/\n/g) || []).length;
});

readStream.on("end", () => {
  console.log("=== Stream Stats ===");
  console.log("Words:", wordCount);
  console.log("Chars:", charCount);
  console.log("Lines:", lineCount);
});

readStream.on("error", err => {
  console.error("Error reading:", err.message);
});
```

### 5. Transform stream (uppercase)

```javascript
const { Transform } = require("stream");

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin
  .pipe(upperCase)
  .pipe(process.stdout);
```

---

## Soal 09 — Child Process: worker dengan `fork`

Bagian ini dulu ada di `code/09-child-process.js`.

```javascript
// worker.js
process.on("message", msg => {
  console.log("Worker received:", msg);
  if (msg.task === "double") {
    process.send({ result: msg.value * 2 });
  }
});
```

```javascript
// di skrip utama
const path = require("path");
const { fork } = require("child_process");

const worker = fork(path.join(__dirname, "worker.js"));
worker.send({ task: "double", value: 21 });
worker.on("message", msg => {
  console.log("Result:", msg.result);
  worker.kill();
});
```

---

## Soal 08 — Buffer: slice dan concat

Bagian ini dulu ada di `code/08-buffer-binary.js`.

```javascript
const sub = buf.slice(0, 5);
console.log("Slice:", sub.toString());

const combined = Buffer.concat([buf1, buf2]);
console.log("Combined length:", combined.length);
```

---

## Soal 06 — Event Emitter: Logger dan FileWatcher

Bagian ini dulu ada di `code/06-event-emitter.js`.

```javascript
const fs = require("fs");

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
logger.on("log", entry => console.log("Handler 1 - Log:", JSON.stringify(entry)));
logger.on("log", entry => {
  if (entry.level === "error") console.log("Handler 2 - ERROR DETECTED:", entry.msg);
});

logger.info("Server started");
logger.warn("Low memory");
logger.error("Database connection failed");

class FileWatcher extends EventEmitter {
  constructor(filename) {
    super();
    this.filename = filename;
    this.watch();
  }
  watch() {
    fs.watch(this.filename, eventType => {
      if (eventType === "change") {
        this.emit("change", { file: this.filename, time: new Date() });
      }
    });
  }
}
```

---

## Soal 10 — Contoh path builder

Bagian ini dulu ada di `code/10-os-path.js`.

```javascript
function getConfigPath() {
  return path.join(os.homedir(), ".config", "myapp", "config.json");
}

function getDataDir() {
  return os.platform() === "win32" ? "C:\\data" : "/var/data";
}
```

Ini baru contoh dua fungsi. Soal minta kamu merancang path builder yang konsisten
untuk semua OS, jadi pikirkan sendiri kenapa `getDataDir` di atas kurang ideal.

## Soal 06 — Contoh Logger berlevel (dari soal)

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

## Soal 07 — Contoh copy, gzip, dan hitung kata dengan stream (dari soal)

```javascript
const fs = require("fs");
const { createGzip } = require("zlib");

// Copy file dengan stream
const readable = fs.createReadStream("file.txt", "utf-8");
const writable = fs.createWriteStream("copy.txt");

readable.pipe(writable);

// Compress file dengan gzip
const input = fs.createReadStream("big-file.txt");
const output = fs.createWriteStream("big-file.txt.gz");
const gzip = createGzip();

input.pipe(gzip).pipe(output);

// Count words dengan stream
let wordCount = 0;
fs.createReadStream("article.txt", "utf-8")
  .on("data", chunk => {
    wordCount += chunk.split(/\s+/).length;
  })
  .on("end", () => {
    console.log("Words:", wordCount);
  });
```

## Soal 08 — Contoh Buffer, hex, dan base64 (dari soal)

```javascript
// Create buffer
const buf = Buffer.alloc(10);
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// From string
const hello = Buffer.from("Hello, 世界!", "utf-8");
console.log(hello.length); // 16 bytes

// Convert
const hex = hello.toString("hex");
console.log(hex); // 48656c6c6f2c20e4b896e7958c21

const back = Buffer.from(hex, "hex").toString("utf-8");
console.log(back); // Hello, 世界!

// Base64
const b64 = hello.toString("base64");
console.log(b64); // SGVsbG8sIOS4nJ+cIQ==

// Decode
const decoded = Buffer.from(b64, "base64").toString("utf-8");
console.log(decoded); // Hello, 世界!
```

## Soal 09 — Contoh exec, spawn, dan fork (dari soal)

```javascript
const { exec, spawn } = require("child_process");
const { fork } = require("child_process");

// exec: run shell command
exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("Output:", stdout);
});

// spawn: streaming output
const ls = spawn("ls", ["-la", "/tmp"]);
ls.stdout.on("data", data => console.log(data.toString()));
ls.stderr.on("data", data => console.error(data.toString()));
ls.on("close", code => console.log("Exit:", code));

// fork: Node.js worker
const worker = fork("./worker.js");
worker.send({ task: "process", id: 1 });
worker.on("message", msg => console.log("Worker:", msg));
```

## Soal 10 — Contoh info sistem dan manipulasi path (dari soal)

```javascript
const os = require("os");
const path = require("path");

// System info
console.log("Platform:", os.platform());
console.log("Arch:", os.arch());
console.log("CPUs:", os.cpus().length);
console.log("Total RAM:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Free RAM:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Home:", os.homedir());
console.log("Temp:", os.tmpdir());
console.log("Hostname:", os.hostname());

// Path manipulation
console.log("\nPath demo:");
console.log("Join:", path.join("a", "b", "c")); // a/b/c
console.log("Resolve:", path.resolve("a", "b")); // /current/dir/a/b
console.log("Basename:", path.basename("/path/to/file.txt")); // file.txt
console.log("Extname:", path.extname("/path/to/file.txt")); // .txt
console.log("Parse:", path.parse("/path/to/file.txt"));
// { dir: '/path/to', base: 'file.txt', ext: '.txt', name: 'file' }
```

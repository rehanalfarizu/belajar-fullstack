# 📘 MATERI TEORI 01 — Node.js Fundamental

## 1. Apa itu Node.js?

Node.js = **runtime JavaScript** yang berjalan di **sisi server** (bukan di browser).

```
Browser:  JavaScript → DOM APIs
Node.js:  JavaScript → File System, Network, OS, dll
```

| | Browser | Node.js |
|---|---|---|
| Eksekusi | V8 Engine | V8 Engine (sama) |
| Tujuan | Frontend | Backend / Server |
| API | DOM, fetch, window | fs, http, path, crypto |
| Output | Halaman web interaktif | API, CLI, service |

---

## 2. Install & Cek Versi

```bash
node --version     # cek versi Node.js
npm --version      # cek versi npm
npx --version      # cek versi npx

# Install LTS version (disarankan)
# https://nodejs.org
```

---

## 3. Menjalankan JavaScript dengan Node.js

### Cara 1: REPL (Interactive)

```bash
node
# > 2 + 2
# 4
# > .exit
```

### Cara 2: File Script

```javascript
// hello.js
console.log("Halo dari Node.js!");
```

```bash
node hello.js
```

---

## 4. Node.js Global Objects

Di browser, `window` adalah objek global.
Di Node.js, **global** adalah objek global.

```javascript
// ✅ Ada di Node.js
console.log("halo");        // global
setTimeout(() => {}, 1000); // global
setInterval(() => {}, 1000); // global
clearTimeout(id);
clearInterval(id);
__filename;                  // path file yang sedang jalan
__dirname;                  // direktori file yang sedang jalan
process;                    // info & kontrol proses
```

```javascript
// Contoh __dirname & __filename
console.log(__filename); // /Users/macbookpro/project/app.js
console.log(__dirname);  // /Users/macbookpro/project

// Contoh process
process.version           // "v20.x.x"
process.platform          // "darwin"
process.env.NODE_ENV      // "development"
process.cwd();            // current working directory
process.exit(0);          // keluar program (0 = sukses)
```

---

## 5. Module System (CommonJS)

Node.js pakai sistem modul — setiap file adalah **module privat**.

### exports & require (CommonJS)

```javascript
// math.js — export
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Cara 1: exports objek
module.exports = { add, subtract, PI };

// Cara 2: exports individual
exports.PI = PI;
exports.add = add;
```

```javascript
// app.js — import
const math = require("./math");

console.log(math.add(5, 3));    // 8
console.log(math.PI);          // 3.14159
```

### Module Caching

```javascript
// require() cache module — hanya jalan sekali
// Bahkan kalau require() berkali-kali, kode module hanya jalan sekali
const a = require("./config"); // config.js jalan
const b = require("./config"); // langsung dari cache
```

---

## 6. Built-in Modules (Module Inti Node.js)

### fs (File System)

```javascript
const fs = require("fs"); // sync (blocking)

// Synchronous — block thread (jangan pakai di production)
const data = fs.readFileSync("data.txt", "utf-8");
fs.writeFileSync("output.txt", "Halo!");
fs.appendFileSync("log.txt", "item baru\n");

// Asynchronous — callback-based (pakai ini di callback style)
fs.readFile("data.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Synchronous check
if (fs.existsSync("file.txt")) {
  console.log("File ada");
}

// Buat folder
fs.mkdirSync("logs");

// Hapus file
fs.unlinkSync("temp.txt");
```

### fs (Promise-based / async-await)

```javascript
// fs promises — modern
const fs = require("fs/promises");

async function main() {
  const data = await fs.readFile("data.txt", "utf-8");
  console.log(data);

  await fs.writeFile("output.txt", "Halo!");
  await fs.mkdir("folder baru", { recursive: true });

  const files = await fs.readdir(".");
  console.log(files);
}

main();
```

### path (Manipulasi Path)

```javascript
const path = require("path");

path.join("folder", "file.txt");      // folder/file.txt (cross OS)
path.resolve("file.txt");              // absolute path dari cwd
path.dirname("/a/b/c.js");            // /a/b
path.basename("/a/b/c.js");           // c.js
path.basename("/a/b/c.js", ".js");     // c
path.extname("/a/b/c.js");             // .js
path.parse("/a/b/c.js");
// { root: '/', dir: '/a/b', base: 'c.js', ext: '.js', name: 'c' }
```

### http (Buat Web Server)

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Halo dari Node.js!");
});

server.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
```

### url (Parsing URL)

```javascript
const url = require("url");

const myURL = new URL("https://example.com:8080/path?id=1#section");
myURL.hostname   // "example.com"
myURL.pathname   // "/path"
myURL.searchParams.get("id") // "1"
```

### crypto (Enkripsi)

```javascript
const crypto = require("crypto");

// Hash
const hash = crypto.createHash("sha256").update("password").digest("hex");

// Random
const token = crypto.randomBytes(32).toString("hex");

// Salt + Hash
const salt = crypto.randomBytes(16).toString("hex");
const hash2 = crypto
  .pbkdf2Sync("password", salt, 100000, 64, "sha512")
  .toString("hex");
```

### os (Info OS)

```javascript
const os = require("os");

os.platform();    // "darwin", "linux", "win32"
os.arch();        // "x64", "arm64"
os.cpus();        // info CPU
os.totalmem();    // total RAM (bytes)
os.freemem();     // free RAM (bytes)
os.homedir();     // home directory
os.hostname();    // hostname
os.uptime();      // uptime dalam detik
```

### events (Event-Driven Pattern)

```javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// event listener
emitter.on("greet", (name) => {
  console.log(`Halo, ${name}!`);
});

// trigger event
emitter.emit("greet", "Andi"); // "Halo, Andi!"
emitter.emit("greet", "Budi"); // "Halo, Budi!"

// once — jalan sekali saja
emitter.once("init", () => console.log("Initialized!"));
```

---

## 7. package.json & npm

### Inisialisasi Project

```bash
npm init -y           # buat package.json default
npm init              # interaktif
```

### package.json Structure

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "Aplikasi fullstack pertama",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "keywords": ["nodejs", "express"],
  "author": "Nama Anda",
  "license": "MIT"
}
```

### Perintah npm Penting

```bash
npm install express           # install package
npm install -D nodemon        # dev dependency
npm install bcryptjs          # production dependency
npm install                    # install semua dari package.json
npm uninstall express          # hapus package
npm update                     # update semua package
npm list                       # list installed packages
npm list --depth=0             # hanya level pertama
npm search express             # cari package
npm info express               # info tentang package
npm outdated                   # cek package yang outdated
```

### package-lock.json

> Jangan pernah edit file ini manual. Ini generated otomatis oleh npm.

---

## 8. Asynchronous JavaScript di Node.js

### Callback Pattern

```javascript
// Callback hell — ini yang buruk
fs.readFile("a.txt", "utf-8", (err, dataA) => {
  fs.readFile("b.txt", "utf-8", (err, dataB) => {
    fs.readFile("c.txt", "utf-8", (err, dataC) => {
      console.log(dataA + dataB + dataC);
    });
  });
});
```

### Promise Pattern

```javascript
const fs = require("fs/promises");

async function readAll() {
  const [dataA, dataB, dataC] = await Promise.all([
    fs.readFile("a.txt", "utf-8"),
    fs.readFile("b.txt", "utf-8"),
    fs.readFile("c.txt", "utf-8"),
  ]);
  console.log(dataA + dataB + dataC);
}

readAll();
```

### Error Handling di Async

```javascript
async function readData() {
  try {
    const data = await fs.readFile("data.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.error("Gagal baca file:", error.message);
  }
}
```

---

## 9. Buffers & Streams

### Buffer (Data Biner)

```javascript
// Buffer = data biner (seperti byte array)
const buf = Buffer.from("Halo");
buf.toString("hex");     // "48616c6f"
buf.toString("base64");  // "SGFsbw=="
Buffer.from([72, 105]);  // "Hi"
```

### Streams (Proses Data Bertahap)

```javascript
const fs = require("fs");
const zlib = require("zlib");

// Read stream — baca file besar tanpa load semua ke memory
const readStream = fs.createReadStream("big-file.txt", "utf-8");

readStream.on("data", (chunk) => {
  console.log(`Menerima ${chunk.length} bytes`);
});

readStream.on("end", () => {
  console.log("Selesai");
});

readStream.on("error", (err) => {
  console.error("Error:", err.message);
});
```

```javascript
// Write stream
const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Baris 1\n");
writeStream.write("Baris 2\n");
writeStream.end(); // wajib dipanggil

// Pipe — sambung read stream ke write stream (misal: compress)
const gzip = zlib.createGzip();
const read = fs.createReadStream("file.txt");
const write = fs.createWriteStream("file.txt.gz");

read.pipe(gzip).pipe(write);
```

---

## 10. Child Process

```javascript
const { exec, spawn } = require("child_process");

// exec — jalankan command shell
exec("ls -la", (err, stdout, stderr) => {
  if (err) throw err;
  console.log(stdout);
});

// spawn — jalankan proses (streaming)
const child = spawn("node", ["--version"]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});
```

---

## 11. Environment Variables

```javascript
// process.env — dapat dari sistem operasi
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const DB_HOST = process.env.DB_HOST;
const API_KEY = process.env.API_KEY;

// Set saat jalan (terminal)
PORT=4000 node server.js

// Buat .env file (gunakan package dotenv)
// .env:  PORT=3000,  DB_URL=postgres://...
// (JANGAN COMMIT .env ke git!)
```

---

## 12. Event Loop di Node.js

```
┌───────────────────────────┐
│        Call Stack          │  ← executes synchronous code
└──────────┬────────────────┘
           ▼
┌───────────────────────────┐
│      Node.js C++ API      │  ← binding ke low-level
│   (setTimeout, fs, etc)    │
└──────────┬────────────────┘
           ▼
┌───────────────────────────┐
│     Microtask Queue        │  ← Promise .then(), process.nextTick()
│   (Higher priority)        │
└──────────┬────────────────┘
           ▼
┌───────────────────────────┐
│     MacroTask Queue        │  ← setTimeout, setInterval, I/O callbacks
│   (Lower priority)         │
└───────────────────────────┘
```

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

process.nextTick(() => console.log("4"));

console.log("5");

// Output: 1, 5, 4, 3, 2
// - Sync code jalan duluan (1, 5)
// - process.nextTick > Promise > setTimeout
```

---

## Ringkasan

```
Node.js Fundamental
├── Runtime      → V8 engine di server
├── Global       → console, process, __dirname, __filename
├── Module       → require(), module.exports (CommonJS)
├── fs           → readFile, writeFile, readdir, mkdir
├── path         → join, resolve, dirname, basename
├── http         → createServer, listen
├── url          → URL class, searchParams
├── crypto       → hash, randomBytes, pbkdf2
├── events       → EventEmitter pattern
├── streams      → Readable, Writable, Pipe
├── child_process → exec, spawn
└── env          → process.env
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/01-latihan-nodejs/`
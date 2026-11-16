# SOAL 10 — OS & Path Module

## Tujuan
Memahami utility modules: `os` dan `path`.

---

## Briefing
Buat program yang menampilkan system info dan manipulasi path.

---

## Syarat (Checklist)

### OS Module
- [ ] `os.platform()` — darwin, win32, linux
- [ ] `os.arch()` — x64, arm64
- [ ] `os.hostname()` — machine name
- [ ] `os.type()` — OS name
- [ ] `os.totalmem()` — total RAM
- [ ] `os.freemem()` — free RAM
- [ ] `os.cpus()` — CPU info
- [ ] `os.networkInterfaces()` — network interfaces
- [ ] `os.homedir()` — home directory
- [ ] `os.tmpdir()` — temp directory

### Path Module
- [ ] `path.join("a", "b", "c")` — join segments
- [ ] `path.resolve("a", "b")` — absolute path
- [ ] `path.basename("/path/to/file.txt")` — "file.txt"
- [ ] `path.basename("/path/to/file.txt", ".txt")` — "file"
- [ ] `path.extname("file.txt")` — ".txt"
- [ ] `path.dirname("/path/to/file.txt")` — "/path/to"
- [ ] `path.parse("/path/to/file.txt")` — { dir, base, ext, name }
- [ ] `path.isAbsolute("/path")` — true/false

### Real-World Use
- [ ] Detect OS untuk cross-platform script
- [ ] Path manipulation untuk file operations
- [ ] System info dashboard

---

## Contoh Code

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

---

## Cara Submit

Starter: `code/10-os-path.js`. Bagian atas starter sudah berisi demo yang jalan. **Tugas aslimu ada di dua `TODO(human)` di bagian bawah.**

1. Salin starter ke `latihan-saya/03-backend/minggu-08/10-os-path.js` (nama sama).
2. Jalankan dulu dan baca outputnya.
3. Tulis path builder lintas OS (`getConfigPath`, `getDataDir`) di salinan starter itu.
4. Buat file terpisah `system-report.js` yang hanya mencetak satu objek JSON berisi info sistem. Harus terpisah, karena starter mencetak banyak teks demo yang akan merusak JSON.
5. Cek: `node system-report.js > info.json`, lalu `node -e "JSON.parse(require('fs').readFileSync('info.json','utf8'))"` harus jalan tanpa error.

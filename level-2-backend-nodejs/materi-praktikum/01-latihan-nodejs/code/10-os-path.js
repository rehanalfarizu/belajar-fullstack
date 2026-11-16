// ============================================================
// SOAL 10 — OS & PATH MODULE
// ============================================================
const os = require("os");
const path = require("path");

// ============================================================
// OS Module: System Info
// ============================================================
console.log("=== System Info ===");
console.log("Platform:", os.platform());       // darwin, win32, linux
console.log("Arch:", os.arch());               // x64, arm64
console.log("OS Type:", os.type());             // Darwin, Windows_NT, Linux
console.log("Hostname:", os.hostname());        // nama komputer
console.log("Release:", os.release());          // versi OS

console.log("\n=== CPU Info ===");
console.log("CPU cores:", os.cpus().length);
console.log("CPU model:", os.cpus()[0].model);
console.log("Speed:", os.cpus()[0].speed, "MHz");

console.log("\n=== Memory ===");
const totalGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
const freeGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
const usedGB = (totalGB - freeGB).toFixed(2);
console.log("Total RAM:", totalGB, "GB");
console.log("Free RAM:", freeGB, "GB");
console.log("Used RAM:", usedGB, "GB");

console.log("\n=== Paths ===");
console.log("Home:", os.homedir());
console.log("Temp:", os.tmpdir());
console.log("EOL:", JSON.stringify(os.EOL)); // newline character

console.log("\n=== Uptime ===");
console.log("System uptime:", os.uptime(), "seconds");
console.log("Human readable:", (os.uptime() / 60 / 60).toFixed(1), "hours");


// ============================================================
// Path Module: Manipulation
// ============================================================
console.log("\n=== Path Demo ===");

const filePath = "/Users/andi/Documents/project/src/index.js";
const relativePath = "src/utils/helper.js";

console.log("Join:", path.join("a", "b", "c")); // a/b/c
console.log("Resolve:", path.resolve("a", "b")); // /current/dir/a/b
console.log("Basename:", path.basename(filePath)); // index.js
console.log("Basename (no ext):", path.basename(filePath, ".js")); // index
console.log("Extname:", path.extname(filePath)); // .js
console.log("Dirname:", path.dirname(filePath)); // /Users/andi/Documents/project/src
console.log("Is absolute:", path.isAbsolute(filePath)); // true
console.log("Is relative:", path.isAbsolute(relativePath)); // false

console.log("\n=== Path Parse ===");
console.log(JSON.stringify(path.parse(filePath), null, 2));
// { root: '/', dir: '...', base: 'index.js', ext: '.js', name: 'index' }


// ============================================================
// TODO(human): Cross-platform path builder (TUGAS INTI SOAL INI)
// ============================================================
// Lihat "Cara Submit" di soal/10-os-path.md.
// Buat fungsi getConfigPath(namaApp) dan getDataDir(namaApp) yang:
// - mengembalikan path yang benar di macOS, Linux, dan Windows
//   (jangan menulis "/" atau "\\" manual; biarkan modul path yang menyambung)
// - memakai os.homedir() atau os.tmpdir() sebagai titik awal, bukan path tetap
// Petunjuk: pikirkan folder mana yang boleh ditulis user biasa di semua OS.
// Selesai kalau: memanggil fungsinya dengan "myapp" menghasilkan path absolut
// (path.isAbsolute === true) yang berakhir dengan nama appmu.


// ============================================================
// Bonus: Network interfaces
// ============================================================
console.log("\n=== Network Interfaces ===");
const interfaces = os.networkInterfaces();
Object.entries(interfaces).forEach(([name, addrs]) => {
  addrs.forEach(addr => {
    if (addr.family === "IPv4") {
      console.log(`${name}: ${addr.address}`);
    }
  });
});


// ============================================================
// TODO(human): System info reporter JSON
// ============================================================
// JANGAN taruh di file ini, karena file ini mencetak banyak teks demo
// dan akan merusak JSON-nya. Buat file baru `system-report.js` yang HANYA
// mencetak satu objek JSON (platform, arch, jumlah CPU, RAM, hostname, dst).
// Selesai kalau:
//   node system-report.js > info.json
//   node -e "JSON.parse(require('fs').readFileSync('info.json','utf8'))"
// berjalan tanpa error.

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
// Real-world: Cross-platform path builder
// ============================================================
// function getConfigPath() {
//   return path.join(os.homedir(), ".config", "myapp", "config.json");
// }
//
// function getDataDir() {
//   return os.platform() === "win32"
//     ? "C:\\data"
//     : "/var/data";
// }


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
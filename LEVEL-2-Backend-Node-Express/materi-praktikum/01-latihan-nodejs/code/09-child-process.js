// ============================================================
// SOAL 09 — CHILD PROCESS
// ============================================================
const { exec, spawn, fork } = require("child_process");
const path = require("path");

// ============================================================
// TODO 1: exec — run shell command
// ============================================================
// exec("ls -la", (error, stdout, stderr) => {
//   if (error) {
//     console.error("Error:", error.message);
//     return;
//   }
//   console.log("STDOUT:", stdout);
//   if (stderr) console.log("STDERR:", stderr);
// });


// ============================================================
// Demo: beberapa command
// ============================================================
console.log("=== Child Process Demo ===");

// exec: simple command
exec("echo 'Hello from shell'", (err, stdout, stderr) => {
  if (err) return console.error("Error:", err.message);
  console.log("Echo:", stdout.trim());
});

// exec: node version
exec("node --version", (err, stdout) => {
  if (err) return;
  console.log("Node version:", stdout.trim());
});

// exec: list files
exec("ls -1 package.json 2>/dev/null || echo 'no file'", (err, stdout) => {
  console.log("package.json exists:", stdout.trim() !== "no file");
});


// ============================================================
// TODO 2: spawn — async streaming
// ============================================================
// const child = spawn("node", ["--version"]);
//
// child.stdout.on("data", data => {
//   console.log("stdout:", data.toString());
// });
//
// child.stderr.on("data", data => {
//   console.error("stderr:", data.toString());
// });
//
// child.on("close", code => {
//   console.log("Exit code:", code);
// });


// ============================================================
// spawn: long-running process
// ============================================================
const find = spawn("find", [".", "-name", "*.js", "-type", "f"]);

let jsFiles = [];
find.stdout.on("data", data => {
  const files = data.toString().trim().split("\n");
  jsFiles.push(...files.filter(f => f));
});

find.stderr.on("data", data => {
  // ignore permission errors
});

find.on("close", code => {
  console.log(`Found ${jsFiles.length} .js files`);
});


// ============================================================
// TODO 3: fork — Node.js worker
// ============================================================
// worker.js content:
// process.on("message", msg => {
//   console.log("Worker received:", msg);
//   if (msg.task === "double") {
//     process.send({ result: msg.value * 2 });
//   }
// });
//
// const worker = fork("./worker.js");
// worker.send({ task: "double", value: 21 });
// worker.on("message", msg => {
//   console.log("Result:", msg.result);
//   worker.kill();
// });


// ============================================================
// TEST
// ============================================================
// Untuk full implementation:
// 1. Buat worker.js
// 2. Uncomment kode fork di atas
// 3. Jalankan: node 09-child-process.js

console.log("\nLihat kode untuk contoh lengkap child_process!");
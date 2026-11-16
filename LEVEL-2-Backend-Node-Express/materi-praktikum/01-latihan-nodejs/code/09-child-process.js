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
// TODO(human) 3: fork — Node.js worker
// ============================================================
// Buat file worker.js sendiri, di folder yang sama dengan salinan starter ini.
//
// worker.js harus:
// - mendengarkan pesan dari proses induk (process.on("message", ...))
// - kalau pesannya { task: "double", value: 21 }, balas lewat process.send
//   dengan { result: <value dikali 2> }
//
// Skrip utama (di file ini) harus:
// - fork worker.js, kirim { task: "double", value: 21 }
// - mencetak "Result: 42" saat balasan datang, lalu mematikan worker
//
// Petunjuk: path untuk fork() dihitung dari folder tempat kamu mengetik `node`.
// Pakai path.join(__dirname, "worker.js") supaya aman dari mana pun dijalankan
// (modul `path` sudah di-import di atas).
//
// Selesai kalau: pesan dari induk sampai ke worker, balasan tercetak di induk,
// dan program berhenti sendiri (tidak menggantung) karena worker dimatikan.
// Bonus: kirim 3 pesan berbeda dan pastikan semua balasannya datang.


// ============================================================
// TEST
// ============================================================
console.log("\nKerjakan TODO(human) 3, lalu jalankan: node 09-child-process.js");

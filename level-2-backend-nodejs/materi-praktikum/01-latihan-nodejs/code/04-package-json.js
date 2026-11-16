// ============================================================
// SOAL 04 — PACKAGE.JSON & NPM
// ============================================================
//
// STEP 1: Jalankan di terminal (di folder project ini):
//
//   npm init -y
//
// STEP 2: Install dependencies:
//
//   npm install express
//   npm install --save-dev nodemon
//   npm install axios
//
// STEP 3: Lihat hasil di package.json
//
// STEP 4: Buat script di src/index.js:
//
//   const express = require("express");
//   const app = express();
//   app.get("/", (req, res) => res.send("Hello Express!"));
//   app.listen(3000, () => console.log("Running on :3000"));
//
// STEP 5: Tambahkan ke package.json scripts:
//   "scripts": {
//     "start": "node src/index.js",
//     "dev": "nodemon src/index.js"
//   }
//
// STEP 6: Jalankan:
//
//   npm run dev
//
// STEP 7: Cleanup (hapus dependencies):
//
//   npm uninstall express
//   npm uninstall nodemon axios
//
// ============================================================

// Script ini hanya untuk demonstrasi.
// Jalankan command di terminal, bukan di sini.

// ============================================================
// CONTOH: Auto-generate package.json
// ============================================================
const packageJson = {
  name: "my-backend-app",
  version: "1.0.0",
  description: "Backend API dengan Express dan Node.js",
  main: "src/index.js",
  scripts: {
    start: "node src/index.js",
    dev: "nodemon src/index.js",
    test: "echo \"Error: no test specified\" && exit 1"
  },
  keywords: ["nodejs", "express", "api"],
  author: "Nama Kamu",
  license: "MIT",
  engines: {
    node: ">=18.0.0"
  },
  dependencies: {
    express: "^4.18.2",
    axios: "^1.6.0"
  },
  devDependencies: {
    nodemon: "^3.0.0"
  }
};

console.log("Contoh package.json yang akan digenerate:");
console.log(JSON.stringify(packageJson, null, 2));

console.log("\n=== Command untuk dijalankan di terminal ===");
console.log("npm init -y");
console.log("npm install express nodemon");
console.log("mkdir -p src");
console.log('echo "const express = require(\'express\');" > src/index.js');
console.log("npm run dev");
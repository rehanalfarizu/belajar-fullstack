// ============================================================
// SOAL 07 — STREAMS
// ============================================================
const fs = require("fs");
const { createGzip } = require("zlib");
const path = require("path");

// ============================================================
// TODO 1: Readable Stream — baca file chunk by chunk
// ============================================================
// const readable = fs.createReadStream(__filename, "utf-8");
//
// readable.on("data", chunk => {
//   console.log("Received chunk:", chunk.length, "bytes");
// });
//
// readable.on("end", () => {
//   console.log("Selesai membaca file");
// });
//
// readable.on("error", err => {
//   console.error("Error:", err.message);
// });


// ============================================================
// TODO 2: Pipe — copy file
// ============================================================
// const source = fs.createReadStream("source.txt");
// const dest = fs.createWriteStream("dest.txt");
//
// source.pipe(dest);
//
// dest.on("finish", () => {
//   console.log("File berhasil disalin!");
// });


// ============================================================
// TODO 3: Gzip Compression dengan pipe
// ============================================================
// const input = fs.createReadStream("large-file.txt");
// const output = fs.createWriteStream("large-file.txt.gz");
// const gzip = createGzip();
//
// input.pipe(gzip).pipe(output);
//
// output.on("finish", () => {
//   console.log("Compression selesai!");
// });


// ============================================================
// TODO 4: Word Count Stream
// ============================================================
let wordCount = 0;
let charCount = 0;
let lineCount = 0;

// Buat test file sementara
const testContent = "Node.js streams are powerful\nfor handling data\nin chunks\n";

// fs.writeFileSync("test-stream.txt", testContent);

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


// ============================================================
// TODO 5: Transform Stream (uppercase)
// ============================================================
// const { Transform } = require("stream");
//
// const upperCase = new Transform({
//   transform(chunk, encoding, callback) {
//     this.push(chunk.toString().toUpperCase());
//     callback();
//   }
// });
//
// process.stdin
//   .pipe(upperCase)
//   .pipe(process.stdout);


// ============================================================
// Backpressure Demo
// ============================================================
// const write = fs.createWriteStream("output.txt");
// write._write = (chunk, encoding, next) => {
//   // Simulasi slow write
//   setTimeout(() => {
//     write.write(chunk);
//     next();
//   }, 100);
// };
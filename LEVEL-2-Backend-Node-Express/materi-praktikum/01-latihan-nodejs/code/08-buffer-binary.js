// ============================================================
// SOAL 08 — BUFFER & BINARY
// ============================================================

// ============================================================
// Buffer Creation
// ============================================================
const buf1 = Buffer.alloc(10); // 10 bytes, zero-filled
console.log("Alloc:", buf1);

const buf2 = Buffer.from("Hello, World!", "utf-8"); // from string
console.log("From string:", buf2, "| Length:", buf2.length);

const buf3 = Buffer.from([72, 101, 108, 108, 111]); // from array of bytes
console.log("From array:", buf3.toString("utf-8")); // "Hello"


// ============================================================
// TODO: Buffer Operations
// ============================================================
// buf.toString("utf-8") — convert back to string
// buf.length — size in bytes
// buf.slice(start, end) — sub-buffer (view, not copy)
// Buffer.concat([buf1, buf2]) — concatenate
// buf.toJSON() — { type: 'Buffer', data: [...] }


// ============================================================
// Hex & Base64
// ============================================================
const text = "Hello, 世界!"; // unicode string
const buf = Buffer.from(text, "utf-8");

console.log("\n=== Encoding Demo ===");
console.log("Raw bytes:", buf);
console.log("Hex:", buf.toString("hex"));
console.log("Base64:", buf.toString("base64"));

// Decode back
const hex = buf.toString("hex");
const decoded = Buffer.from(hex, "hex").toString("utf-8");
console.log("From hex:", decoded);

const b64 = buf.toString("base64");
const decodedB64 = Buffer.from(b64, "base64").toString("utf-8");
console.log("From base64:", decodedB64);


// ============================================================
// TODO: Slice & Concatenate
// ============================================================
// const sub = buf.slice(0, 5);
// console.log("Slice:", sub.toString());
//
// const combined = Buffer.concat([buf1, buf2]);
// console.log("Combined length:", combined.length);


// ============================================================
// Practical: Base64 Image (simulated)
// ============================================================
console.log("\n=== Practical Base64 ===");
const fakeImageData = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A // PNG header
]);
console.log("PNG header (hex):", fakeImageData.toString("hex"));
console.log("Base64 encoded:", fakeImageData.toString("base64"));


// ============================================================
// allocUnsafe (faster but not zeroed)
// ============================================================
const fastBuf = Buffer.allocUnsafe(16);
console.log("\nallocUnsafe (may contain garbage):", fastBuf);


// ============================================================
// Buffer comparison
// ============================================================
const bufA = Buffer.from("abc");
const bufB = Buffer.from("abd");
console.log("\nBuffer comparison:");
console.log("'abc' vs 'abd':", bufA.compare(bufB)); // -1 (a < b)

// ============================================================
// TEST
// ============================================================
console.log("\n=== Test Section ===");

// Test 1: Buat buffer dari nama kamu, encode hex, decode
const nama = Buffer.from("Andi Wijaya", "utf-8");
console.log("Nama encoded hex:", nama.toString("hex"));
console.log("Nama decoded:", Buffer.from(nama.toString("hex"), "hex").toString("utf-8"));

// Test 2: Bandingkan 2 strings via buffer
console.log("Byte comparison:", Buffer.from("apple").compare(Buffer.from("banana"))); // -1
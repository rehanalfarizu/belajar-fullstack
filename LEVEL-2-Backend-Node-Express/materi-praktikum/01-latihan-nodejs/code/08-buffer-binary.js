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
// TODO(human): Buffer Operations
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
// TODO(human): Slice & Concatenate
// ============================================================
// - Ambil 5 byte pertama dari `buf`, ubah ke string, cetak.
// - Gabungkan buf1 dan buf2, cetak panjangnya.
// Tebak dulu angkanya sebelum menjalankan. Selesai kalau tebakanmu benar.
// (Sebagai perbandingan setelah mencoba sendiri: solusi-jangan-dibuka-dulu.md)


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


// ============================================================
// TODO(human): Fungsi gambarKeBase64 (TUGAS INTI SOAL INI)
// ============================================================
// Lihat "Cara Submit" di soal/08-buffer-binary.md.
// - Buat fungsi gambarKeBase64(pathFile) yang mengembalikan string base64
//   dari isi file gambar.
// - Petunjuk: baca file TANPA encoding supaya hasilnya Buffer, bukan string.
//   Cek dokumentasi fs.readFileSync untuk tahu kapan hasilnya Buffer.
// - Uji dengan gambar PNG kecil (di bawah 10 KB) apa saja.
//
// Selesai kalau:
// 1. Hasilnya sama dengan keluaran `base64 -i gambar.png` di terminal
//    (macOS; di Linux `base64 gambar.png`), mengabaikan karakter baris baru.
// 2. Path yang salah tidak membuat program crash tanpa penjelasan:
//    tangkap errornya dan cetak pesan yang jelas.
// 3. Buffer.from(hasil, "base64").equals(isiFileAsli) bernilai true.

# SOAL 08 — Buffer & Binary

## Tujuan
Memahami Buffer untuk handling binary data di Node.js.

---

## Briefing
Buat program yang manipulasi binary data: create buffer, convert, slice.

---

## Syarat (Checklist)

### Buffer Creation
- [ ] `Buffer.alloc(10)` — allocate 10 bytes (zero-filled)
- [ ] `Buffer.allocUnsafe(10)` — faster, not zeroed
- [ ] `Buffer.from("string")` — from string
- [ ] `Buffer.from([1, 2, 3])` — from array

### Buffer Operations
- [ ] `buffer.toString("utf-8")` — convert back
- [ ] `buffer.length` — size in bytes
- [ ] `buffer.slice(start, end)` — sub-buffer
- [ ] `Buffer.concat([buf1, buf2])` — concatenate
- [ ] `buffer.toJSON()` — to object

### Encoding
- [ ] `Buffer.from("中文", "utf-8")` — multi-byte
- [ ] `buffer.toString("hex")` — hexadecimal
- [ ] `buffer.toString("base64")` — base64
- [ ] `Buffer.from("aGVsbG8=", "base64")` — decode base64

### Use Cases
- [ ] Base64 image encoding
- [ ] File to hex conversion
- [ ] Network protocol handling

---

## Contoh Code

```javascript
// Create buffer
const buf = Buffer.alloc(10);
console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// From string
const hello = Buffer.from("Hello, 世界!", "utf-8");
console.log(hello.length); // 16 bytes

// Convert
const hex = hello.toString("hex");
console.log(hex); // 48656c6c6f2c20e4b896e7958c21

const back = Buffer.from(hex, "hex").toString("utf-8");
console.log(back); // Hello, 世界!

// Base64
const b64 = hello.toString("base64");
console.log(b64); // SGVsbG8sIOS4nJ+cIQ==

// Decode
const decoded = Buffer.from(b64, "base64").toString("utf-8");
console.log(decoded); // Hello, 世界!
```

---

## Cara Submit
1. Simpan sebagai `08-buffer-binary.js`
2. Jalankan — test semua conversions
3. COBA base64 encoding untuk file gambar kecil
4. BUAT fungsi yang encode image ke base64 string
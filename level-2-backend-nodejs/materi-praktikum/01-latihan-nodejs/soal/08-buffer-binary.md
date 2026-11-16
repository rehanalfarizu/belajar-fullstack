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

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "Soal 08 — Contoh Buffer, hex, dan base64 (dari soal)").

Petunjuk: jumlah byte tidak sama dengan jumlah karakter, coba dengan huruf non-Latin. Coba satu panggilan dulu, misalnya `Buffer.from("hi").toString("hex")`, lalu bolak-balik ke string asal untuk membuktikan hasilnya sama.

---

## Cara Submit

Starter: `code/08-buffer-binary.js`. Bagian atas starter sudah berisi demo yang jalan, supaya kamu bisa melihat bentuk Buffer. **Tugas aslimu ada di bagian `TODO(human)`**, terutama yang paling bawah.

1. Salin starter ke `latihan-saya/03-backend/minggu-08/08-buffer-binary.js` (nama sama).
2. Isi `TODO(human)` Buffer Operations dan Slice & Concatenate. Tebak output dulu, baru jalankan.
3. Tulis fungsi `gambarKeBase64(pathFile)` yang mengembalikan string base64 isi file gambar (kriteria selesai ada di komentar starter).
4. Uji dengan gambar PNG kecil, bandingkan dengan `base64 -i gambar.png` di terminal (macOS).
5. Coba path yang tidak ada. Program harus memberi pesan jelas, bukan crash tanpa penjelasan.

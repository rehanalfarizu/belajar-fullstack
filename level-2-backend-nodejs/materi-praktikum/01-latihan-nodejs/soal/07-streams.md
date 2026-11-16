# SOAL 07 — Streams

## Tujuan
Memahami Stream API untuk handling data flow yang efisien.

---

## Briefing
Buat program yang membaca file besar dengan stream, pipe data.

---

## Syarat (Checklist)

### Readable Stream
- [ ] `fs.createReadStream(path)`
- [ ] `stream.on("data", chunk => {})`
- [ ] `stream.on("end", () => {})`
- [ ] `stream.on("error", err => {})`

### Writable Stream
- [ ] `fs.createWriteStream(path)`
- [ ] `stream.write(data)`
- [ ] `stream.end()`

### Pipe
- [ ] `readable.pipe(writable)` — copy file
- [ ] `response.pipe(res)` — proxy
- [ ] Transform stream

### HTTP Stream
- [ ] Serve file besar dengan stream
- [ ] Accept file upload dengan stream

### Backpressure
- [ ] Handle slow consumer

---

## Contoh Code

```javascript
const fs = require("fs");
const { createGzip } = require("zlib");

// Copy file dengan stream
const readable = fs.createReadStream("file.txt", "utf-8");
const writable = fs.createWriteStream("copy.txt");

readable.pipe(writable);

// Compress file dengan gzip
const input = fs.createReadStream("big-file.txt");
const output = fs.createWriteStream("big-file.txt.gz");
const gzip = createGzip();

input.pipe(gzip).pipe(output);

// Count words dengan stream
let wordCount = 0;
fs.createReadStream("article.txt", "utf-8")
  .on("data", chunk => {
    wordCount += chunk.split(/\s+/).length;
  })
  .on("end", () => {
    console.log("Words:", wordCount);
  });
```

---

## Cara Submit

Starter: `code/07-streams.js` (berisi lima `TODO(human)`).

1. Salin starter ke `latihan-saya/03-backend/minggu-08/07-streams.js` (nama sama).
2. Buat file teks besar (1 MB atau lebih) dan `source.txt` kecil sebagai bahan uji.
3. Isi TODO satu per satu, jalankan setelah tiap TODO.
4. Cek hasil salin dan kompres dengan `cmp` (perintahnya ada di komentar starter dan `TUGAS.md`).
5. Bonus: stream HTTP response ke file.

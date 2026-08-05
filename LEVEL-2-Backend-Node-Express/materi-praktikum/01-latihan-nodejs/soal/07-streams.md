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
1. Simpan sebagai `07-streams.js`
2. Buat file teks besar (1MB+)
3. COBA pipe untuk copy dan compress
4. COBA stream HTTP request ke file
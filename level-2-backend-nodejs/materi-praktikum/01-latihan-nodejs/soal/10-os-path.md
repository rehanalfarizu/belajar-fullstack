# SOAL 10 — OS & Path Module

## Tujuan
Memahami utility modules: `os` dan `path`.

---

## Briefing
Buat program yang menampilkan system info dan manipulasi path.

---

## Syarat (Checklist)

### OS Module
- [ ] `os.platform()` — darwin, win32, linux
- [ ] `os.arch()` — x64, arm64
- [ ] `os.hostname()` — machine name
- [ ] `os.type()` — OS name
- [ ] `os.totalmem()` — total RAM
- [ ] `os.freemem()` — free RAM
- [ ] `os.cpus()` — CPU info
- [ ] `os.networkInterfaces()` — network interfaces
- [ ] `os.homedir()` — home directory
- [ ] `os.tmpdir()` — temp directory

### Path Module
- [ ] `path.join("a", "b", "c")` — join segments
- [ ] `path.resolve("a", "b")` — absolute path
- [ ] `path.basename("/path/to/file.txt")` — "file.txt"
- [ ] `path.basename("/path/to/file.txt", ".txt")` — "file"
- [ ] `path.extname("file.txt")` — ".txt"
- [ ] `path.dirname("/path/to/file.txt")` — "/path/to"
- [ ] `path.parse("/path/to/file.txt")` — { dir, base, ext, name }
- [ ] `path.isAbsolute("/path")` — true/false

### Real-World Use
- [ ] Detect OS untuk cross-platform script
- [ ] Path manipulation untuk file operations
- [ ] System info dashboard

---

## Contoh Code

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "Soal 10 — Contoh info sistem dan manipulasi path (dari soal)").

Petunjuk: baca dokumentasi modul `os` dan `path`. Satuan apa yang dikembalikan `totalmem()`? Bedakan `path.join` dan `path.resolve` dengan mencoba keduanya pada path relatif.

---

## Cara Submit

Starter: `code/10-os-path.js`. Bagian atas starter sudah berisi demo yang jalan. **Tugas aslimu ada di dua `TODO(human)` di bagian bawah.**

1. Salin starter ke `latihan-saya/03-backend/minggu-08/10-os-path.js` (nama sama).
2. Jalankan dulu dan baca outputnya.
3. Tulis path builder lintas OS (`getConfigPath`, `getDataDir`) di salinan starter itu.
4. Buat file terpisah `system-report.js` yang hanya mencetak satu objek JSON berisi info sistem. Harus terpisah, karena starter mencetak banyak teks demo yang akan merusak JSON.
5. Cek: `node system-report.js > info.json`, lalu `node -e "JSON.parse(require('fs').readFileSync('info.json','utf8'))"` harus jalan tanpa error.

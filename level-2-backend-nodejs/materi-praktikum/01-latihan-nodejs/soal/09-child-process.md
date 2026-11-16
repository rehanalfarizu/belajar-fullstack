# SOAL 09 — Child Process

## Tujuan
Memahami cara spawn process lain dari Node.js.

---

## Briefing
Buat program yang menjalankan command shell dan script lain.

---

## Syarat (Checklist)

### exec
- [ ] `child_process.exec("command", callback)` — synchronous-ish
- [ ] `exec("ls -la", (err, stdout, stderr) => {})`
- [ ] Handle stderr

### spawn
- [ ] `spawn("command", ["args"])` — async, streaming
- [ ] `child.stdout.on("data", data => {})`
- [ ] `child.on("exit", code => {})`

### fork
- [ ] `fork("./script.js")` — spawn Node script
- [ ] `child.send({ data })` — IPC
- [ ] `process.on("message", msg => {})`

### Use Cases
- [ ] Run shell command dari JS
- [ ] Spawn Python script
- [ ] Worker thread dengan fork

---

## Contoh Code

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "Soal 09 — Contoh exec, spawn, dan fork (dari soal)").

Petunjuk: kapan output cukup ditunggu sekaligus dan kapan perlu dibaca bertahap? Siapa yang menerima pesan di proses anak, dan lewat apa pesan dikirim balik? Apa risikonya memasukkan input pengguna ke `exec`?

---

## Cara Submit

Starter: `code/09-child-process.js`. `exec` dan `spawn` di starter sudah berupa demo yang jalan. **`worker.js` tidak disediakan**, kamu yang membuatnya.

1. Salin starter ke `latihan-saya/03-backend/minggu-08/09-child-process.js` (nama sama).
2. Jalankan dulu apa adanya, baca outputnya, lalu coba `ls`, `node -v`, dan `echo "Hello"` lewat `exec`.
3. Buat `worker.js` di folder yang sama dengan salinan starter, lalu isi `TODO(human) 3` di starter untuk `fork` worker itu.
4. Uji IPC dua arah: pesan dari induk sampai ke worker, balasan worker tercetak di induk, program berhenti sendiri.

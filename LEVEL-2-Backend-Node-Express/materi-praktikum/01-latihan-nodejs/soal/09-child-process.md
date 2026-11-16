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

```javascript
const { exec, spawn } = require("child_process");
const { fork } = require("child_process");

// exec: run shell command
exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("Output:", stdout);
});

// spawn: streaming output
const ls = spawn("ls", ["-la", "/tmp"]);
ls.stdout.on("data", data => console.log(data.toString()));
ls.stderr.on("data", data => console.error(data.toString()));
ls.on("close", code => console.log("Exit:", code));

// fork: Node.js worker
const worker = fork("./worker.js");
worker.send({ task: "process", id: 1 });
worker.on("message", msg => console.log("Worker:", msg));
```

---

## Cara Submit

Starter: `code/09-child-process.js`. `exec` dan `spawn` di starter sudah berupa demo yang jalan. **`worker.js` tidak disediakan**, kamu yang membuatnya.

1. Salin starter ke `latihan-saya/03-backend/minggu-08/09-child-process.js` (nama sama).
2. Jalankan dulu apa adanya, baca outputnya, lalu coba `ls`, `node -v`, dan `echo "Hello"` lewat `exec`.
3. Buat `worker.js` di folder yang sama dengan salinan starter, lalu isi `TODO(human) 3` di starter untuk `fork` worker itu.
4. Uji IPC dua arah: pesan dari induk sampai ke worker, balasan worker tercetak di induk, program berhenti sendiri.

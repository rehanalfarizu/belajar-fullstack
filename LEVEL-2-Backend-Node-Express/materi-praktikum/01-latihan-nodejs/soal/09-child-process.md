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
1. Simpan sebagai `09-child-process.js`
2. Jalankan command: `ls`, `node -v`, `echo "Hello"`
3. BUAT worker script (`worker.js`) dan fork dari main
4. COBA IPC: kirim pesan dari main ke worker dan sebaliknya
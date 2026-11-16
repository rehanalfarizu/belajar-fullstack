# SOAL 06 — Event Emitter

## Tujuan
Memahami EventEmitter pattern untuk custom event system.

---

## Briefing
Buat EventEmitter untuk system notifikasi dan logging.

---

## Syarat (Checklist)

### Basic EventEmitter
- [ ] `const { EventEmitter } = require("events")`
- [ ] `emitter.on("event", callback)` — listen
- [ ] `emitter.emit("event", data)` — trigger
- [ ] `emitter.once("event", callback)` — once only
- [ ] `emitter.off("event", callback)` — remove listener

### Event Names
- [ ] String events: `"data"`, `"error"`
- [ ] Multiple listeners — `emitter.listenerCount()`

### Custom Class
- [ ] Extend `EventEmitter`
- [ ] Emit events dari dalam class method

### Use Cases
- [ ] Logger dengan levels (info, warn, error)
- [ ] File watcher
- [ ] Notifikasi event

---

## Contoh Code

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "Soal 06 — Contoh Logger berlevel (dari soal)").

Petunjuk: class apa yang perlu di-extend supaya punya `on` dan `emit`? Satu method per level (info, warn, error) mengerjakan dua hal, apa saja? Kenapa listener kedua bisa memfilter hanya level `error`?

---

## Cara Submit

Starter: `code/06-event-emitter.js`. Demo `once` dan `off` di starter sudah jalan; tugas utamamu ada di `TODO(human)` (class `Logger`, lalu `FileWatcher` sebagai bonus).

1. Salin starter ke `latihan-saya/03-backend/minggu-08/06-event-emitter.js` (nama sama).
2. Jalankan dulu dan baca outputnya, lalu kerjakan `TODO(human)`.
3. Pastikan setiap emit memicu semua listener, dan cek dengan `listenerCount()`.
4. Bonus: `FileWatcher` yang emit event saat file berubah.

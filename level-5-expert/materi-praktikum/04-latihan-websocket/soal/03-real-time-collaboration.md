# SOAL 03 — Real-Time Collaboration

> Membangun fitur presence tracking dan collaborative editing.

---

## Deskripsi Soal

Kamu diminta membangun fitur **real-time collaboration** untuk document editor. Fitur utama:
1. **Presence indicators** — siapa yang sedang melihat dokumen yang sama
2. **Cursor broadcasting** — posisi kursor collaborator lain
3. **Selection highlighting** — teks yang dipilih collaborator lain
4. **Conflict resolution** — last-write-wins vs CRDT untuk edit conflicts

---

## Teori Singkat

### CRDT vs OT (Operational Transformation)

| Aspect | CRDT | OT |
|--------|------|----|
| Complexity | Higher (math-based) | Lower (algorithmic) |
| Server dependency | None (peer-to-peer possible) | Required |
| Offline editing | Supported | Limited |
| Memory usage | Higher (metadata per operation) | Lower |
| Library size | Larger | Smaller |
| Use case | Google Docs (CRDT-like) | Traditional collaborative editors |

### Presence Data Structure

```js
// Presence state per user
{
  id: "user-123",
  name: "John Doe",
  avatar: "https://...",
  color: "#FF5733",  // untuk highlight di UI
  cursor: { line: 12, column: 45 },
  selection: { start: { line: 10, col: 0 }, end: { line: 12, col: 20 } },
  lastActive: 1699999999999,
  status: "active" | "idle" | "away"
}
```

### Conflict Resolution Strategies

| Strategy | Description | Pros | Cons |
|----------|-------------|------|------|
| Last Write Wins | Latest timestamp wins | Simple | Data loss |
| First Write Wins | First change wins | Predictable | Frustrating |
| Operational Transform | Transform concurrent operations | Battle-tested | Complex |
| CRDT | Merge based on math properties | No conflicts | Large metadata |

---

## Checklist Pengerjaan

### Bagian A — Presence Tracking (20 menit)

**1. Presence Store**

> **Tulis sendiri dulu.** Rancang penyimpanan presence di server: per dokumen, per socket. Fungsi apa saja yang kamu perlukan (ubah, baca, hapus)?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 1. Presence Store*.

**2. Join Document**

> **Tulis sendiri dulu.** Saat user bergabung ke dokumen: siapa yang diberi tahu, dan apa yang dikirim ke pendatang baru?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 2. Join Document*.

**3. Periodic Presence Update**

> **Tulis sendiri dulu.** Bagaimana client mengirim presence berkala dan membereskannya saat komponen dilepas di React?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 3. Periodic Presence Update*.

### Bagian B — Cursor Broadcasting (15 menit)

**1. Cursor Position Event**

> **Tulis sendiri dulu.** Bagaimana server meneruskan posisi kursor ke peserta lain tanpa mengirim balik ke pengirim?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 1. Cursor Position Event*.

**2. Throttle Cursor Updates**

> **Tulis sendiri dulu.** Kursor bisa berubah puluhan kali per detik. Teknik apa untuk membatasi pengiriman?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 2. Throttle Cursor Updates*.

**3. Cursor Component**

```js
// TODO: Implementasikan presence tracker component
// code/03-presence-tracker.jsx
```

### Bagian C — Selection Highlighting (15 menit)

**1. Selection Event**

> **Tulis sendiri dulu.** Sama seperti kursor, tapi untuk seleksi teks. Apa yang perlu ikut dikirim agar warna bisa dipakai di UI?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 1. Selection Event*.

**2. Selection Color Generation**

> **Tulis sendiri dulu.** Bagaimana memberi warna yang konsisten untuk tiap user dari ID-nya, tanpa menyimpan tabel?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 2. Selection Color Generation*.

**3. Apply Remote Selection**

> **Tulis sendiri dulu.** Di sisi editor, bagaimana menampilkan seleksi user lain dan menyimpannya per socket?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 3. Apply Remote Selection*.

### Bagian D — Conflict Resolution (20 menit)

**1. Last Write Wins (Simple)**

> **Tulis sendiri dulu.** Strategi konflik paling sederhana: "yang terakhir menang". Apa kekurangannya dan data apa yang dibandingkan?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 1. Last Write Wins (Simple)*.

**2. Operational Transformation (Basic)**

> **Tulis sendiri dulu.** Operational Transform: bagaimana dua operasi di posisi yang sama diurutkan? Mulai dari kasus insert vs insert.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 2. Operational Transformation (Basic)*.

**3. Version Vectors**

> **Tulis sendiri dulu.** Bagaimana server dan client saling mencocokkan versi dokumen? Tiga kasus: client tertinggal, sama, atau lebih maju.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 3. Version Vectors*.

### Bagian E — Idle& Away Detection (10 menit)

**1. Idle Detection**

> **Tulis sendiri dulu.** Menandai user "idle" setelah tidak aktif beberapa waktu: timer apa yang direset di setiap update?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 1. Idle Detection*.

**2. Away on Disconnect**

> **Tulis sendiri dulu.** Saat socket putus: apa yang dibersihkan dan siapa yang diberi tahu?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *03-real-time-collaboration — 2. Away on Disconnect*.

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Presence tracking (join/leave/sync) | 20% |
| Cursor broadcasting | 20% |
| Selection highlighting | 20% |
| Conflict resolution strategy | 25% |
| Idle/away detection | 15% |

---

## Reference

- [Yjs — CRDT Implementation](https://docs.yjs.dev/)
- [Automerge — CRDT Library](https://automerge.github.io/automerge/)
- [Socket.io Presence Example](https://socket.io/docs/v4/rooms/#Cross sockets presence)
- [Collaborative Editing Fundamentals](https://beta.observablehq.com/@jrus/collaborative-editing)

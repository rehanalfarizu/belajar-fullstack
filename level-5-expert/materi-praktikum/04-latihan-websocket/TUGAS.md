# TUGAS — WebSocket dan Real-Time (ws, Socket.io, Presence)

HTTP biasa itu seperti berkirim surat: kamu tanya, server jawab. WebSocket itu
seperti telepon: koneksi dibuka sekali, lalu kedua pihak bisa bicara kapan saja.
Cocok untuk chat, notifikasi, dan dokumen kolaboratif.

## Hasil Akhir yang Diharapkan

1. Server WebSocket dengan `ws`: broadcast pesan, mengelola koneksi, heartbeat
   (ping-pong), dan penanganan error.
2. Aplikasi chat Socket.io: room, pesan, pesan pribadi, dan reconnect.
3. Komponen React untuk presence (siapa online) dan posisi kursor kolaborator.
4. Daftar jujur: apa yang terjadi kalau koneksi putus, pesan datang dobel, atau
   user jahat mengirim data aneh.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-websocket-dasar.md` | `level-5-expert/materi-praktikum/04-latihan-websocket/code/01-websocket-server.js` (kerangka TODO) | 80 menit |
| 02 | `soal/02-socketio-chatapp.md` | `level-5-expert/materi-praktikum/04-latihan-websocket/code/02-socketio-server.js` (kerangka TODO) dan klien React di file baru | 85 menit |
| 03 | `soal/03-real-time-collaboration.md` | `level-5-expert/materi-praktikum/04-latihan-websocket/code/03-presence-tracker.jsx` (TODO) dengan server dari soal 02 atau `level-5-expert/materi-praktikum/04-latihan-websocket/code/03-rooms-broadcast.js` (kerangka TODO) | 80 menit |
| Bonus | Tidak ada soal | `level-5-expert/materi-praktikum/04-latihan-websocket/code/04-real-time-chat.jsx` (kerangka klien chat, TODO) | 45 menit |

### Catatan jujur

- Semua file di `code/` kini berupa **kerangka `TODO(human)`**. Tulis versimu
  sendiri berdasarkan bagian Tujuan dan Checklist di soal.
- `03-presence-tracker.jsx` (klien) butuh server Socket.IO: pakai server yang
  kamu tulis di soal 02, atau `03-rooms-broadcast.js` setelah kamu
  mengisinya.
- Klien chat `04-real-time-chat.jsx` bicara dengan server soal 02. Samakan nama
  event di kedua sisi.
- Kunci jawaban semua file ada di
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka setelah
  mencoba sendiri.

---

## Cara Menjalankan

```bash
# server
mkdir ws-server && cd ws-server
npm init -y
npm install express ws                 # soal 01
npm install express socket.io          # soal 02 dan 03
node server.js
```

```bash
# klien React
npm create vite@latest ws-client -- --template react
cd ws-client
npm install
npm install socket.io-client
npm run dev
```

- Starter server memakai `CLIENT_ORIGIN` dari environment untuk CORS. Atur
  `CLIENT_ORIGIN=http://localhost:5173` sebelum menjalankan, atau cek nilai
  bawaan di file.
- Cek port yang dipakai di tiap file (header file) agar tidak bentrok.
- Menguji WebSocket tanpa React: DevTools Console
  (`new WebSocket("ws://localhost:8080")`) atau alat seperti `websocat`.
- Buka dua atau tiga tab browser untuk mensimulasikan banyak user.

---

## Langkah Pengerjaan

1. **Soal 01** — gambar siklus hidup koneksi: open, message, close, error. Tulis
   server paling sederhana (echo). Lalu broadcast ke semua klien **kecuali**
   pengirim. Lalu heartbeat.
2. **Soal 02** — rancang event di kertas: nama event, siapa kirim, siapa
   menerima, bentuk datanya. Lalu implementasikan join/leave room, pesan, dan
   pesan pribadi.
3. **Reconnect** — matikan server saat klien terbuka, nyalakan lagi. Apa yang
   terjadi pada pesan yang dikirim selama putus?
4. **Soal 03** — mulai dari presence saja. Lalu kursor (batasi frekuensi
   kirim!). Lalu seleksi. Terakhir pikirkan konflik edit.
5. **Keamanan** — untuk tiap event di server, tulis: siapa yang boleh
   mengirim ini, dan apa yang terjadi kalau datanya tidak sesuai bentuk?

Teori: [WebSocket dan Real-Time](../../materi-teori/05-websocket-real-time/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Gejala umum

- Klien tidak tersambung dan di Console ada error CORS (Socket.io) → cek
  `cors.origin` di server.
- `WebSocket connection failed` → port atau path salah, atau server belum jalan.
- Pesan terkirim dua kali → listener didaftarkan berulang. Di React, itu tanda
  `useEffect` tidak membersihkan listener (`socket.off`) atau
  koneksi dibuat tiap render.
- User tetap "online" setelah menutup tab → server tidak menangani `close` atau
  `disconnect`.

### Level 2 — Lihat buktinya

- **DevTools → Network → filter WS** → klik koneksi → tab **Messages**. Setiap
  frame yang masuk dan keluar terlihat di sana.
- Log server pada `connection`, `message`, `close` lengkap dengan id koneksi.
- Cetak jumlah klien terhubung (`wss.clients.size`) tiap kali berubah.

### Level 3 — Perkecil masalah

- Presence salah? Uji server dengan dua tab dan **hanya** console log, tanpa
  React.
- Kursor membuat browser berat? Hitung: berapa event per detik? Apa yang bisa
  dikurangi tanpa terasa oleh user?
- Konflik edit ruwet? Mulai dari "last write wins" dan tulis kerugiannya, lalu
  baca ide CRDT/OT sebagai bacaan, bukan implementasi.

### Dokumentasi

- npm `ws` → README (API, heartbeat contoh konsep).
- socket.io/docs → "Server API", "Rooms", "Handling disconnections".
- MDN → "WebSocket API", "Writing WebSocket servers".
- OWASP Cheat Sheet → "WebSocket Security".

---

## Cara Mengecek Hasil Sendiri

- [ ] Tiga tab browser: pesan dari satu tab muncul di dua lainnya, tidak muncul
      dobel di pengirim.
- [ ] Tutup satu tab: user hilang dari daftar presence di tab lain dalam
      beberapa detik.
- [ ] Matikan server, nyalakan lagi: klien tersambung kembali tanpa refresh
      manual.
- [ ] Heartbeat: koneksi yang "mati diam-diam" dibersihkan server.
- [ ] Kirim pesan kosong, JSON rusak, dan pesan super panjang dari Console →
      server tidak crash dan menolak dengan jelas.
- [ ] Pesan dari klien yang mengaku sebagai user lain tidak dipercaya begitu
      saja (identitas ditentukan server).
- [ ] Koneksi dari origin lain yang tidak diizinkan ditolak.
- [ ] Tidak ada memory leak jelas: jumlah listener tidak bertambah setiap kali
      klien reconnect.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[05-latihan-cicd](../05-latihan-cicd/TUGAS.md).

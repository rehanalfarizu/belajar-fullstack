# CHECKLIST — WebSocket dan Real-Time

Centang dengan jujur. Real-time itu gampang dibuat jalan, susah dibuat benar.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda HTTP request/response dan WebSocket
- [ ] Aku bisa menjelaskan siklus hidup koneksi (open, message, close, error)
- [ ] Aku paham kenapa butuh heartbeat (ping-pong)
- [ ] Aku bisa menjelaskan room dan broadcast di Socket.io
- [ ] Aku paham beda `ws` dan Socket.io (reconnect, room, fallback)
- [ ] Aku paham kenapa pesan bisa hilang atau dobel saat koneksi putus
- [ ] Aku bisa menjelaskan ide dasar "last write wins" dan alasan CRDT/OT ada
- [ ] Aku paham WebSocket tidak otomatis aman: perlu autentikasi dan validasi

---

## Kemampuan Praktis

- [ ] Aku bisa membuat server WebSocket dengan broadcast dan heartbeat
- [ ] Aku bisa membuat chat Socket.io dengan room dan pesan pribadi
- [ ] Aku bisa menyambungkan Socket.io ke React dengan `useEffect` yang
      membersihkan listener
- [ ] Aku bisa membuat presence dan kursor kolaborator
- [ ] Aku bisa membatasi frekuensi event yang sering (throttle)
- [ ] Aku bisa melihat frame WebSocket di DevTools

---

## Kebiasaan Baik

- [ ] Aku mengautentikasi koneksi WebSocket di server (saat handshake), bukan
      hanya percaya data yang dikirim klien
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md))
- [ ] Aku memeriksa izin tiap aksi (siapa boleh masuk room, siapa boleh kick)
      (baca [Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md))
- [ ] Aku memvalidasi bentuk dan ukuran setiap pesan masuk
      (baca [Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md))
- [ ] Isi pesan chat dirender sebagai teks, bukan HTML mentah
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Origin koneksi dibatasi, tidak dibuka untuk semua
- [ ] Token tidak dikirim lewat URL query yang bisa tercatat di log
- [ ] Aku menguji jalur gagal: koneksi putus, data rusak, klien jahat

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[05-latihan-cicd](../05-latihan-cicd/TUGAS.md).

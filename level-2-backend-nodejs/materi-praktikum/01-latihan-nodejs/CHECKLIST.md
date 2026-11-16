# CHECKLIST — Latihan Node.js

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda `__dirname` dan `process.cwd()`
- [ ] Aku paham cara kerja `module.exports` dan `require`, termasuk path relatif
- [ ] Aku bisa menjelaskan beda CommonJS dan ES Modules, dan kapan Node memakai yang mana
- [ ] Aku paham beda `dependencies` dan `devDependencies`, dan arti `^1.2.3`, `~1.2.3`, `1.2.3`
- [ ] Aku paham pola event emitter: `on`, `once`, `emit`, `off`
- [ ] Aku bisa menjelaskan kenapa stream lebih hemat memori daripada `readFileSync` untuk file besar
- [ ] Aku paham Buffer sebagai data biner, dan beda encoding `utf-8`, `hex`, `base64`
- [ ] Aku paham beda `exec`, `spawn`, dan `fork`
- [ ] Aku paham base64 itu **encoding, bukan enkripsi**. Siapa pun bisa mendekodenya.

---

## Kemampuan Praktis

- [ ] Aku bisa membaca file dengan `fs` dan membangun path dengan `path.join` yang jalan di semua OS
- [ ] Aku bisa membuat modul sendiri dan meng-import-nya di file lain
- [ ] Aku bisa membuat project dengan `npm init`, menambah `scripts`, dan memasang dependency
- [ ] Aku bisa membuat class yang `extends EventEmitter` dan memancarkan event dari method-nya
- [ ] Aku bisa menyalin dan mengompres file dengan `pipe`, lalu membuktikan hasilnya sama dengan `cmp`
- [ ] Aku bisa mengubah file kecil jadi base64 dan balik lagi
- [ ] Aku bisa menjalankan perintah shell dan worker dengan `child_process`, termasuk kirim pesan bolak-balik
- [ ] Aku bisa membaca pesan error Node (`ENOENT`, `MODULE_NOT_FOUND`) dan tahu harus cek apa

---

## Kebiasaan Baik

- [ ] Aku mencetak path dulu sebelum menyalahkan kode saat file tidak ketemu
- [ ] Aku selalu menangani event `error` pada stream dan child process
- [ ] Aku tidak pernah memasukkan input user langsung ke `exec()`. Kalau perlu argumen dari luar, pakai `spawn` dengan array argumen.
- [ ] Aku tidak meng-commit `node_modules/` atau file berisi password/token
- [ ] Aku menjalankan `npm init` di folder project sendiri, bukan menumpang `package.json` orang lain

Poin `exec()` di atas namanya command injection, saudara dekat SQL injection. Konsepnya dibahas di
[SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md), dan soal menyimpan rahasia di
[Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Latihan Express](../02-latihan-express/README.md).

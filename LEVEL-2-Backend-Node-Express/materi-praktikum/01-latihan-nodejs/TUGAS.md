# TUGAS — Latihan Node.js

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Sepuluh skrip Node.js yang jalan dari terminal, memakai modul bawaan (`fs`, `path`, `os`, `events`, `stream`, `child_process`) dan modul buatanmu sendiri.
2. Satu project kecil dengan `package.json` buatanmu, lengkap dengan `scripts` dan dependency.
3. Pemahaman kapan pakai CommonJS (`require`) dan kapan ES Modules (`import`).

---

## Daftar Soal

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [Variabel dan Modul](soal/01-variabel-dan-modul.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/01-variabel-dan-modul.js` (plus `data.txt` buatanmu) | 30-45 menit |
| 02 | [Modul dan Require](soal/02-modul-dan-require.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/02-modul-dan-require.js` (plus `calculator.js` dan `greeting.js` buatanmu) | 45 menit |
| 03 | [Control Flow](soal/03-control-flow.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/03-control-flow.js` | 45 menit |
| 04 | [Package.json & npm](soal/04-package-json.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/04-package-json.js` (berisi langkah). Project-nya dibuat di folder baru, misalnya `latihan-saya/03-backend/minggu-08/projectku/` | 60 menit |
| 05 | [Module System](soal/05-module-system.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/05-module-system.js` (berisi kerangka). Soal minta folder `05-modules/` berisi `utils.js`, `math.js`, `index.js` | 60 menit |
| 06 | [Event Emitter](soal/06-event-emitter.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/06-event-emitter.js` | 60 menit |
| 07 | [Streams](soal/07-streams.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/07-streams.js` | 60-90 menit |
| 08 | [Buffer & Binary](soal/08-buffer-binary.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/08-buffer-binary.js` | 45-60 menit |
| 09 | [Child Process](soal/09-child-process.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/09-child-process.js` (plus `worker.js` buatanmu) | 60 menit |
| 10 | [OS & Path](soal/10-os-path.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs/code/10-os-path.js` | 45 menit |

Estimasi di atas perkiraan, karena soal di folder ini tidak mencantumkan waktu.

**Penting soal 08 dan 10:** file starter-nya sudah berisi kode yang jalan. Jangan cuma menjalankannya.
Tugas aslimu ada di bagian "Cara Submit" soal: soal 08 minta fungsi encode gambar ke base64, soal 10
minta path builder dan system info reporter JSON. Kerjakan bagian itu dari nol.

### Di mana menulis kodenya?

Kalau ikut aturan [latihan-saya](../../../latihan-saya/README.md), buat folder seperti
`latihan-saya/03-backend/minggu-08/` dan salin starter ke sana. File pendukung (`data.txt`,
`calculator.js`, `worker.js`) ditaruh di folder yang sama.

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal**, terutama "Persyaratan"/"Syarat" dan "Expected Output".
2. **Tutup soalnya.** Tulis di jurnal: modul bawaan apa yang dipakai, dan urutan langkahnya dalam bahasa biasa.
3. **Tebak output**, lalu kerjakan `TODO` satu per satu. Jalankan `node` setelah setiap `TODO`.
4. **Bandingkan dengan Expected Output.** Angka yang tergantung komputer (jumlah CPU, nama user, RAM) boleh beda, formatnya harus sama.
5. **Coba rusak.** Ganti nama file yang dibaca jadi file yang tidak ada, kirim argumen salah, matikan listener. Lihat apa yang terjadi dan catat.

---

## Petunjuk Kalau Macet

### Tingkat 1 — cek "di mana" dan "apa"

- `ENOENT: no such file or directory`? Cetak path-nya dulu: `console.log(pathYangDibaca)`. Lalu cek
  dengan `ls`. Ingat: `__dirname` adalah folder file `.js`, sedangkan `process.cwd()` adalah folder
  tempat kamu mengetik `node`. Keduanya sering beda.
- `Cannot find module './calculator'`? Path `require` relatif terhadap file yang memanggil, bukan terhadap terminal.
- Hasil `fs.readFileSync` aneh (`<Buffer ...>`)? Kamu lupa encoding atau `.toString()`.

### Tingkat 2 — perkecil masalah

- Event emitter tidak terpanggil? Cek urutan: `on` harus dipasang **sebelum** `emit`.
- Stream: mulai dari membaca file kecil dan cetak panjang setiap chunk. Setelah itu baru `pipe`.
- Child process: jalankan dulu perintahnya langsung di terminal. Kalau di terminal saja gagal, masalahnya bukan di Node.
- ES Modules error `Cannot use import statement outside a module`? Bandingkan ekstensi file (`.mjs`
  vs `.js`) dan isi `"type"` di `package.json` terdekat.

### Tingkat 3 — dokumentasi resmi

Semua modul bawaan ada di [nodejs.org/api](https://nodejs.org/api/). Baca bagian modul yang kamu pakai:
[fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html),
[os](https://nodejs.org/api/os.html), [events](https://nodejs.org/api/events.html),
[stream](https://nodejs.org/api/stream.html), [buffer](https://nodejs.org/api/buffer.html),
[child_process](https://nodejs.org/api/child_process.html),
[modules](https://nodejs.org/api/modules.html). Untuk npm: [docs.npmjs.com](https://docs.npmjs.com/).

### Tingkat 4 — tulis pertanyaannya

Di jurnal: perintah yang kamu jalankan, output lengkap (copy errornya), dan dua dugaan yang sudah kamu coba.

---

## Cara Mengecek Hasil Sendiri

Jalankan dari folder latihan ini (ganti path kalau kamu kerja di `latihan-saya/`):

```bash
cd LEVEL-2-Backend-Node-Express/materi-praktikum/01-latihan-nodejs
node code/01-variabel-dan-modul.js
node code/03-control-flow.js
```

Yang harus terjadi:

- Soal 01-03: output sama formatnya dengan "Expected Output" di soal. Rata-rata IPK di soal 03 bisa
  kamu hitung manual di kalkulator untuk dicocokkan.
- Soal 04: di folder project-mu, `npm run dev` menjalankan server dengan nodemon, `npm ls` menampilkan
  dependency yang benar, dan `nodemon` ada di `devDependencies`, bukan `dependencies`.
  **Jalankan `npm init -y` di folder project dulu.** Kalau tidak, npm akan mencari `package.json` ke
  folder induk dan menambah dependency ke `package.json` root repo.
- Soal 05: `node index.js` jalan untuk versi CommonJS, dan `node index.mjs` jalan untuk versi ES Modules.
- Soal 06: setiap `emit` memicu semua listener; listener `once` hanya terpanggil sekali. Cek dengan `listenerCount()`.
- Soal 07: setelah copy dengan stream, bandingkan isi file:

  ```bash
  cmp file-asli.txt file-copy.txt && echo SAMA
  ```

  Untuk file gzip, cek dengan `gunzip -c file.txt.gz | cmp - file.txt && echo SAMA`.

- Soal 08: base64 hasil fungsimu bisa didekode balik jadi isi yang sama. Bandingkan dengan perintah
  `base64 -i gambar.png` di terminal (macOS) atau `base64 gambar.png` (Linux).
- Soal 09: pesan dari main sampai ke worker, dan balasan worker tercetak di main. Exit code tercetak `0`.
- Soal 10: taruh reporter JSON-mu di skrip sendiri (misalnya `system-report.js`) yang hanya mencetak
  JSON. Lalu `node system-report.js > info.json` dan
  `node -e "JSON.parse(require('fs').readFileSync('info.json','utf8'))"` harus jalan tanpa error.

---

## Tentang `contoh/`

Folder ini tidak punya `contoh/`. Pembandingmu adalah Expected Output di soal, dokumentasi Node.js, dan
perintah terminal (`cmp`, `base64`, `ls`) yang bisa memastikan hasilmu benar.

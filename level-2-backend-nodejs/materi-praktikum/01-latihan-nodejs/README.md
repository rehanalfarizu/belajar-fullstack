# Latihan 1: Node.js Dasar

## Tujuan Praktikum

Mahasiswa diharapkan dapat memahami dan mempraktikkan dasar-dasar pemrograman dengan Node.js, termasuk cara menjalankan skrip, menggunakan variabel, modularisasi kode, dan berinteraksi dengan sistem file serta modul-modul inti Node.js.

## Apa yang Akan Dipelajari

Ada sepuluh soal, dikelompokkan dalam tiga bagian:

**Dasar (soal 01-04)**

1. **Variabel dan Modul** -- variabel, tipe data, `var`/`let`/`const`, dan membaca file dengan `fs`.
2. **Modul dan Require** -- modul bawaan (`fs`, `path`, `os`, `http`) dan modul buatan sendiri dengan `module.exports`.
3. **Control Flow** -- `if/else`, `switch`, `for`, `while`, `for...of`.
4. **package.json dan npm** -- `npm init`, instal paket, `scripts`, beda `dependencies` dan `devDependencies`.

**Modul inti Node.js (soal 05-07)**

5. **Module System** -- CommonJS vs ES Modules, circular dependency.
6. **Event Emitter** -- `on`, `once`, `emit`, dan `listenerCount`.
7. **Streams** -- membaca, menulis, `pipe`, dan gzip.

**Sistem dan biner (soal 08-10)**

8. **Buffer dan Binary** -- Buffer, encoding `hex` dan `base64`.
9. **Child Process** -- `exec`, `spawn`, dan `fork` dengan IPC.
10. **OS dan Path** -- info sistem dan path lintas platform.

## Struktur Direktori

```text
01-latihan-nodejs/
├── soal/
│   ├── 01-variabel-dan-modul.md
│   ├── 02-modul-dan-require.md
│   ├── 03-control-flow.md
│   ├── 04-package-json.md
│   ├── 05-module-system.md
│   ├── 06-event-emitter.md
│   ├── 07-streams.md
│   ├── 08-buffer-binary.md
│   ├── 09-child-process.md
│   └── 10-os-path.md
├── code/
│   ├── 01-variabel-dan-modul.js
│   ├── 02-modul-dan-require.js
│   ├── 03-control-flow.js
│   ├── 04-package-json.js
│   ├── 05-module-system.js
│   ├── 06-event-emitter.js
│   ├── 07-streams.js
│   ├── 08-buffer-binary.js
│   ├── 09-child-process.js
│   └── 10-os-path.js
├── solusi-jangan-dibuka-dulu.md
├── README.md
├── TUGAS.md
└── CHECKLIST.md
```

File pendukung yang diminta soal (misalnya `data.txt`, `calculator.js`, `worker.js`, `05-modules/`) **tidak ada di repo**.
Kamu membuatnya sendiri di folder kerjamu di `latihan-saya/`.

## Cara Menjalankan

1. Pastikan Node.js sudah terinstal di sistem. Cek dengan perintah:

   ```bash
   node --version
   npm --version
   ```

2. Masuk ke direktori latihan:

   ```bash
   cd level-2-backend-nodejs/materi-praktikum/01-latihan-nodejs
   ```

3. Untuk setiap soal, salin file `.js` dari `code/` ke folder kerjamu di `latihan-saya/` (nama file sama), baca komentar `// TODO(human):`, dan isi bagian yang masih kosong di salinan itu.

4. Jalankan skrip dengan Node.js:

   ```bash
   node code/01-variabel-dan-modul.js
   ```

5. Bandingkan output yang muncul dengan expected output atau kriteria selesai di soal dan komentar starter.

## Catatan Penting

- Semua skrip harus dijalankan menggunakan Node.js (bukan langsung di browser).
- Jangan menghapus komentar `TODO(human):` di starter asli di `code/`; kerjakan di salinanmu.
- Untuk soal package.json, jalankan `npm init -y` di folder project barumu dulu, baru `npm install`.
- `solusi-jangan-dibuka-dulu.md` berisi potongan jawaban. Baca aturannya sebelum membuka.

# Latihan Saya

Folder ini milikmu. Semua kode dan jawaban latihan ditulis di sini.
Folder `LEVEL-*` adalah bahan: dibaca, tidak diedit. Dengan begitu bahan tetap
bersih, dan riwayat Git di folder ini menunjukkan perjalanan belajarmu.

Panduan menulis kode dan menyusun folder:
[Kode yang Rapi dan Folder yang Teratur](../level-0-dasar-engineering/materi-teori/06-kode-rapi-dan-struktur-folder.md).

## Struktur

Folder dibuat sendiri saat minggunya tiba, bukan sekarang semuanya.

```text
latihan-saya/
├── README.md                ← kamu di sini
├── JURNAL.md                ← satu entri setiap sesi
├── .prettierrc.json         ← aturan format otomatis
│
├── 01-fondasi/              Minggu 1–2
│   ├── minggu-01/
│   │   ├── catatan-git.md          perintah Git yang dicoba + hasilnya
│   │   ├── 01-form-diri.html
│   │   ├── 04-form-pendaftaran.html
│   │   └── 05-halaman-portfolio.html
│   └── minggu-02/
│
├── 02-javascript/           Minggu 3–7
│   ├── minggu-03/
│   │   ├── 01-kalkulator-sederhana.js
│   │   ├── 02-cek-bilangan.js
│   │   └── 03-fizzbuzz.js
│   ├── ...
│   └── minggu-07/
│       ├── todo-list-browser/      mini proyek = satu folder
│       │   ├── index.html
│       │   ├── style.css
│       │   └── app.js
│       └── kasir-rapi.js           soal refactor
│
├── 03-backend/              Minggu 8–11
│   ├── minggu-08/ ... minggu-11/   latihan per soal
│   └── api-catatan/                proyek yang tumbuh tiap minggu
│
├── 04-frontend/             Minggu 12–14
│   ├── minggu-12/ ... minggu-14/
│   └── web-catatan/
│
└── membaca-dokumen/         jawaban soal ERD/PRD (Minggu 10 dan 15)
```

Proyek portofolio (Minggu 15–18) dibuat di **repo GitHub terpisah**, karena itu
yang akan kamu tunjukkan ke perusahaan.

## Aturan penamaan

- Folder minggu memakai dua digit: `minggu-03`, bukan `minggu3`.
- Nama file latihan = nama file soalnya. `soal/03-fizzbuzz.md` dikerjakan di
  `03-fizzbuzz.js`. Jadi kamu selalu tahu file ini menjawab soal yang mana.
- Satu soal = satu file. Mini proyek = satu folder.
- Huruf kecil dan tanda hubung untuk folder. Tanpa spasi.

## Alur satu sesi

**Membuka sesi (5 menit)**

1. Buka `JURNAL.md`, baca entri paling atas, terutama baris **Mulai dari**.
2. Tulis dari ingatan apa yang kamu pelajari sesi kemarin (tanpa membuka file).
3. Buat folder minggu kalau belum ada.

**Inti sesi (75 menit)** — ikuti format di rencana 20 minggu: baca soal → tebak
output → tulis kode dari file kosong → coba input aneh.

**Menutup sesi (10 menit)**

1. Jalankan sekali lagi, pastikan tidak error.
2. Format dengan Prettier.
3. Cek [checklist sebelum commit](../level-0-dasar-engineering/materi-teori/06-kode-rapi-dan-struktur-folder.md#6-checklist-sebelum-commit).
4. Commit dengan format `jenis: ringkasan`, misalnya
   `feat: soal 03 fizzbuzz dengan validasi input`.
5. Tulis entri jurnal di **paling atas** `JURNAL.md`, termasuk **Mulai dari**.

**Sesi terakhir tiap minggu** — tambahkan review mingguan di jurnal, centang
checklist di rencana, lalu pilih satu file paling berantakan minggu itu dan
rapikan.

## Prettier di VS Code

1. Pasang ekstensi **Prettier - Code formatter**.
2. Buka Settings, cari *Format On Save*, centang.
3. Cari *Default Formatter*, pilih Prettier.

File `.prettierrc.json` di folder ini otomatis dipakai untuk semua file di
dalam `latihan-saya/`.

## Kalau buntu

Ikuti aturan 30 menit di rencana. Sebelum bertanya ke siapa pun, tulis di
jurnal: apa yang diharapkan, apa yang terjadi, dan dua dugaan yang sudah dicoba.
Menulis ini saja sering membuat jawabannya ketemu sendiri.

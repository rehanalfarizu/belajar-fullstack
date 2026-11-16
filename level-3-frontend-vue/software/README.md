# Software — Track Vue

## Kebutuhan

- Node.js 24 LTS direkomendasikan.
- npm yang disertakan Node.js.
- VS Code dengan extension **Vue - Official**.
- Browser modern dan DevTools.
- Git.

Verifikasi:

```bash
node --version
npm --version
git --version
```

Scaffold:

```bash
npm create vue@latest
```

Vue dan Vite berkembang. Jika command atau persyaratan engine berbeda, ikuti
[Vue Quick Start](https://vuejs.org/guide/quick-start.html) dan
[Vite Guide](https://vite.dev/guide/) resmi.

---

## Panduan Instalasi Langkah demi Langkah

Bagian ini untuk kamu yang baru pertama kali menyiapkan laptop untuk Vue.
Analoginya: sebelum masak, siapkan dapur dulu. Kompor (Node.js), panci
(Vite), dan kaca untuk mengintip isi panci (Vue DevTools).

### 1. Node.js 24 LTS

Node.js menjalankan JavaScript di luar browser. Vite, npm, dan test runner
semuanya butuh Node.

Pilih salah satu cara:

- **Installer resmi**: unduh versi LTS dari [nodejs.org](https://nodejs.org/).
- **Version manager** (disarankan kalau kamu punya banyak project): pakai
  `nvm` (macOS/Linux) atau `nvm-windows` / `fnm` (Windows). Keuntungannya, kamu
  bisa pindah versi Node per project tanpa install ulang.

Contoh dengan `nvm`:

```bash
nvm install 24
nvm use 24
node --version   # harus v24.x.x
```

Kalau `node --version` masih menampilkan versi lama, tutup terminal lalu buka lagi.

### 2. create-vue dan Vite

Kamu **tidak perlu** install apa pun secara global. Perintah ini mengunduh
`create-vue` (scaffolder resmi) sesaat lalu menjalankannya:

```bash
npm create vue@latest latihan-vue
```

Pertanyaan yang muncul dan saran jawaban untuk track ini:

| Pertanyaan | Saran | Kenapa |
| --- | --- | --- |
| TypeScript | Tidak (dulu) | Fokus konsep Vue dulu |
| JSX | Tidak | Track ini pakai template |
| Router | Ya | Soal 08 dan tutorial |
| Pinia | Ya | Soal 09 dan tutorial |
| Vitest | Ya | Soal 07 |
| End-to-End | Opsional (Playwright) | Dipakai di akhir tutorial |
| ESLint / Prettier | Ya | Menangkap kesalahan kecil lebih awal |
| Vue DevTools plugin (kalau ditanya) | Ya | Lihat bagian 3 |

Nama pertanyaan bisa sedikit berbeda antar versi `create-vue`. Baca pelan-pelan,
jangan asal tekan Enter.

Setelah selesai:

```bash
cd latihan-vue
npm install
npm run dev
```

Vite (alat build yang dipakai create-vue) akan menampilkan alamat seperti
`http://localhost:5173`. Buka di browser.

Perintah lain yang akan sering kamu pakai:

```bash
npm run build      # bikin versi produksi ke folder dist/
npm run preview    # jalankan hasil build untuk dicek
npm run test:unit  # jalankan Vitest (kalau dipilih saat scaffold)
```

### 3. Vue DevTools

Vue DevTools adalah "kaca" untuk mengintip isi aplikasi: nilai `ref`, props
tiap komponen, event yang di-emit, route aktif, dan isi store Pinia. Tanpa ini,
debugging Vue seperti menebak isi panci tanpa membuka tutupnya.

Dua cara memasang:

- **Ekstensi browser**: cari "Vue.js devtools" di Chrome Web Store atau Firefox
  Add-ons. Pastikan versi untuk Vue 3. Setelah dipasang, buka DevTools browser
  (F12), lalu cari tab **Vue**.
- **Plugin Vite**: kalau saat `npm create vue@latest` kamu menjawab Ya untuk
  DevTools, plugin `vite-plugin-vue-devtools` sudah terpasang. Panel DevTools
  muncul sebagai tombol kecil di bagian bawah halaman saat `npm run dev`.

Cara mengecek DevTools jalan: buka aplikasi, klik sebuah komponen di panel Vue,
dan pastikan kamu bisa melihat state-nya.

### 4. VS Code

- Extension **Vue - Official** (dulu bernama Volar). Kalau kamu pernah pasang
  "Vetur", nonaktifkan, karena Vetur untuk Vue 2 dan bisa bentrok.
- Opsional: **ESLint** dan **Prettier** supaya error dan format terlihat langsung.

---

## Cek Akhir Setup

- [ ] `node --version` menampilkan v24.x
- [ ] `npm create vue@latest` berhasil membuat project
- [ ] `npm run dev` jalan dan halaman contoh tampil
- [ ] Tab atau panel Vue DevTools muncul dan bisa memilih komponen
- [ ] Mengedit `src/App.vue` lalu menyimpan langsung mengubah halaman tanpa refresh manual
- [ ] VS Code memberi warna dan autocomplete di file `.vue`

## Masalah yang Sering Muncul

- **`EACCES` / permission error saat npm install** — jangan pakai `sudo`. Pakai
  version manager (`nvm`/`fnm`) supaya Node terpasang di folder user.
- **Port 5173 sudah dipakai** — Vite otomatis pindah ke port lain. Baca alamat
  yang muncul di terminal.
- **Tab Vue tidak muncul di DevTools** — refresh halaman setelah DevTools dibuka,
  dan pastikan kamu membuka mode development (`npm run dev`), bukan hasil build.

Langkah berikutnya: [cara menjalankan starter praktikum](../materi-praktikum/TUGAS.md).

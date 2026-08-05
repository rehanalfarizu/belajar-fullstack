# Tutorial 01 — Memulai Perjalanan Web Development

## Tujuan
Memahami gambaran besar web development, alat-alat yang dibutuhkan, dan cara menyiapkan lingkungan kerja.

---

## Apa Itu Web Development?

Web development = membuat aplikasi/website yang berjalan di internet.

```
Client (Browser)  ←→  Server (Internet)
    Frontend            Backend
   (yang kamu lihat)  (logika di belakang)
```

### 3 Teknologi Utama:

| Teknologi | Fungsi | Analogi |
|-----------|--------|---------|
| **HTML** | Struktur halaman | Kerangka rumah |
| **CSS** | Tampilan & desain | Cat, lantai, tirai |
| **JavaScript** | Interaktivitas | Listrik, AC, interaksi |

---

## Browser & Developer Tools

### Browser yang Direkomendasikan:
- **Chrome** (paling populer, DevTools terbaik)
- **Firefox** ( bagus untuk debugging)
- **Edge** (basis Chrome juga bagus)

### Chrome DevTools:
Tekan `Cmd + Option + I` (Mac) atau `F12` untuk membuka panel developer yang dipakai untuk inspect element, debug JavaScript, dan monitor network request.

---

## Editor Kode (VS Code)

### Kenapa VS Code?
- Gratis & open source
- Ringan tapi powerful
- Extensions sangat banyak
- Didukung Microsoft (update rutin)

### Extensions yang Wajib Install:
1. **Live Server** — auto-refresh browser saat save
2. **Prettier** — auto-format kode
3. **ESLint** — deteksi error JavaScript
4. **Auto Rename Tag** — auto rename tag HTML berpasangan
5. **Bracket Pair Colorization** — warna bracket biar mudah baca

### Cara Install Extension:
1. Buka VS Code
2. Klik icon **Extensions** di sidebar kiri (kubus)
3. Ketik nama extension di search bar
4. Klik **Install**

---

## Struktur Dasar Sebuah Website

```
nama-project/
├── index.html      → halaman utama
├── style.css       → styling (CSS)
├── script.js       → interaktivitas (JS)
└── assets/         → gambar, font, file lain
    ├── images/
    └── icons/
```

### Catatan Penting:
- Semua file HTML, CSS, JS harus disimpan di folder yang sama
- Nama file **tidak boleh ada spasi** (pakai `-` atau `_` sebagai pengganti)
- Huruf kecil semua (konvensi: `kebab-case`)
- Ekstensi harus sesuai: `.html`, `.css`, `.js`

---

## Cara Kerja Browser (Sangat Sederhana)

```
1. Kamu ketik URL (misal: google.com)
2. Browser kirim request ke server
3. Server kirim file HTML, CSS, JS kembali
4. Browser render (gambar) ke layar
```

**DevTools Flow:**
```
DevTools Elements  → lihat struktur HTML
DevTools Console   → lihat output JS & error
DevTools Network   → lihat request & response
```

---

## Dasar Command Line (Terminal)

Beberapa command dasar yang perlu kamu tahu:

### macOS / Linux:
```bash
# Navigasi
pwd                 # di mana kita sekarang
ls                  # list file di folder
cd nama-folder      # masuk ke folder
cd ..              # mundur 1 folder

# Buat & hapus
mkdir nama-folder   # buat folder baru
touch file.html     # buat file baru
rm file.html        # hapus file

# Lainnya
clear              # bersihkan layar
```

### Windows (Command Prompt / PowerShell):
```bash
cd                  # sama
dir                 # list file (bukan ls)
mkdir nama-folder   # buat folder
```

---

## Setup Lingkungan Kerja

### Langkah 1: Install VS Code
1. Buka https://code.visualstudio.com
2. Download & install untuk Mac/Windows
3. Buka VS Code

### Langkah 2: Install Chrome
1. Buka https://google.com/chrome
2. Download & install
3. Set Chrome sebagai browser default

### Langkah 3: Buat Folder Project
```bash
# Di Terminal
cd ~/Documents
mkdir belajar-web
cd belajar-web
mkdir level-1
cd level-1
```

### Langkah 4: Buka di VS Code
```bash
code .
```
Atau di VS Code: `File → Open Folder → pilih folder level-1`

---

## Hands-on: Buat Halaman Web Pertama

### Di VS Code:
1. `Cmd + N` (new file)
2. Ketik:
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Ini halaman web pertamaku.</p>
</body>
</html>
```
3. Simpan: `Cmd + S` → nama file: `index.html`

### Buka di Browser:
1. Klik kanan file `index.html`
2. Pilih **"Open with Live Server"**
3. Lihat hasilnya!

---

## Ringkasan

```
Web Development = HTML + CSS + JavaScript

HTML → Struktur (kerangka)
CSS  → Tampilan (desain)
JS   → Perilaku (interaksi)

Tools yang dipakai:
├── Browser  → Chrome (direkomendasikan)
├── Editor   → VS Code
└── Terminal → Command line dasar

Struktur project sederhana:
index.html + style.css + script.js
```

---

**Lanjut ke:** [02-html-dari-nol.md](./02-html-dari-nol.md)
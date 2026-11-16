# Tutorial 01 — Membuat Server Express Pertama

## Tujuan
Membuat server HTTP sederhana menggunakan Express.js, memahami struktur project Express, dan membuat API endpoint pertama.

---

## Persiapan

Pastikan kamu sudah install:
- Node.js (cek: `node --version`)
- VS Code

---

## Langkah1 — Inisialisasi Project

Buat folder baru dan inisialisasi dengan npm:

```bash
mkdir server-express-pertama
cd server-express-pertama
npm init -y
```

File `package.json` akan terbuat otomatis.

---

## Langkah 2 — Install Express

```bash
npm install express
```

Setelah install, cek `package.json` — Express sudah masuk di `dependencies`.

---

## Langkah 3 — Buat File Server

Buat file `index.js` dan tulis kode berikut:

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware untuk membaca body JSON
app.use(express.json());

// Endpoint GET — halaman utama
app.get("/", (req, res) => {
  res.json({
    message: "Selamat datang di API saya!",
    status: "online"
  });
});

// Endpoint GET — daftar buku
app.get("/api/buku", (req, res) => {
  res.json([
    { id: 1, judul: "Belajar Node.js", penulis: "Andi" },
    { id: 2, judul: "Pemrograman Web", penulis: "Siti" },
    { id: 3, judul: "Database SQL", penulis: "Budi" }
  ]);
});

// Endpoint GET — buku berdasarkan ID
app.get("/api/buku/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const buku = books.find(b => b.id === id);

  if (!buku) {
    return res.status(404).json({ error: "Buku tidak ditemukan" });
  }

  res.json(buku);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
```

---

## Langkah 4 — Jalankan Server

```bash
node index.js
```

Buka browser dan akses:
- `http://localhost:3000` — pesan selamat datang
- `http://localhost:3000/api/buku` — daftar buku
- `http://localhost:3000/api/buku/1` — buku dengan ID 1

---

## Langkah 5 — CORS (Agar Frontend Bisa Akses)

Karena frontend dan backend biasanya berjalan di port berbeda, install CORS:

```bash
npm install cors
```

Tambahkan di `index.js`:

```javascript
const cors = require("cors");
app.use(cors());
```

---

## Struktur Akhir Project

```
server-express-pertama/
├── node_modules/
├── package.json
├── package-lock.json
└── index.js
```

---

## Latihan Tambahan

1. Tambahkan endpoint `POST /api/buku` untuk menambah buku baru
2. Tambahkan endpoint `DELETE /api/buku/:id` untuk menghapus buku
3. Tambahkan query parameter `?penulis=Andi` untuk filter di GET `/api/buku`

---

**Lanjut ke:** Tutorial 02 — Membuat Blog API dengan Express + SQLite

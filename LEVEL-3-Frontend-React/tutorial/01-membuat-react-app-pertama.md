# Tutorial 01 — Membuat React App Pertama

## Tujuan
Membuat project React pertama menggunakan Vite, memahami struktur folder React, dan membuat komponen sederhana.

---

## Langkah 1 — Buat Project dengan Vite

Vite adalah build tool modern yang lebih cepat dari Create React App.

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
```

Pilih template `React` (JavaScript).

---

## Langkah 2 — Struktur Folder

```
my-react-app/
├── public/ → File statis (favicon, dll)
├── src/
│   ├── App.jsx → Komponen utama
│   ├── main.jsx         → Entry point
│   ├── App.css          → Styling App
│   └── index.css        → Global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## Langkah 3 — Jalankan Development Server

```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## Langkah 4 — Buat Komponen Card

Hapus semua isi `src/App.jsx` dan ganti dengan:

```jsx
function Card({ judul, deskripsi, harga }) {
  return (
    <div className="card">
      <h3>{judul}</h3>
      <p>{deskripsi}</p>
      <span className="harga">Rp {harga.toLocaleString()}</span>
    </div>
  );
}

function App() {
  const produk = [
    { id: 1, judul: "Laptop ASUS", deskripsi: "Laptop untuk mahasiswa", harga: 8500000 },
    { id: 2, judul: "Mouse Logitech", deskripsi: "Mouse wireless ergonomis", harga: 250000 },
    { id: 3, judul: "Keyboard Mechanical", deskripsi: "Keyboard gaming60%", harga: 1200000 }
  ];

  return (
    <div className="app">
      <h1>Daftar Produk</h1>
      <div className="grid">
        {produk.map(p => (
          <Card
            key={p.id}
            judul={p.judul}
            deskripsi={p.deskripsi}
            harga={p.harga}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

---

## Langkah 5 — Styling

Ganti `src/index.css` dengan:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f5f5f5;
  padding: 20px;
}

.app {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card h3 {
  color: #2563eb;
  margin-bottom: 8px;
}

.card p {
  color: #666;
  margin-bottom: 12px;
}

.harga {
  font-weight: bold;
  color: #16a34a;
}
```

---

## Hasil

```
┌──────────────────────────────────────┐
│           Daftar Produk              │
│ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│ │  Laptop  │ │  Mouse   │ │Keyboard│ │
│ │ ASUS     │ │Logitech  │ │Mech    │ │
│ │Rp8.500.000│ │Rp250.000│ │Rp1.200.000│ │
│ └──────────┘ └──────────┘ └────────┘ │
└──────────────────────────────────────┘
```

---

## Konsep yang Sudah Dipelajari

| Konsep | Penjelasan |
|--------|------------|
| `JSX` | Sintaks HTML di dalam JavaScript |
| `Component` | Fungsi yang return JSX |
| `Props` | Data yang dikirim dari parent ke child |
| `map()` | Render list dari array |
| `key` | Identifier unik untuk setiap item list |

---

## Latihan Tambahan

1. Tambahkan prop `gambar` dan tampilkan gambar di Card
2. Tambahkan state `hover` dengan `useState` untuk efek tambahan
3. Tambahkan button "Beli" yang menampilkan alert saat diklik
4. Tambahkan filter berdasarkan harga

---

**Lanjut ke:** Tutorial 02 — React dengan API (mengambil data dari backend)

// ============================================================
// SOAL 01 — JSX DAN COMPONENT
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React from "react";

// ============================================================
// SOAL 1A — GreetingCard Component
// Buat component GreetingCard yang menerima props:
// - name (string)
// - age (number) — tampilkan dengan toLocaleString("id-ID")
// - greeting (string, default: "Halo")
//
// Tampilkan:
// - <h1>{greeting}, {name}!</h1>
// - <p>Usia: {age.toLocaleString("id-ID")} tahun</p>
// - <p>dewasa/belum dewasa berdasarkan age >= 18
// ============================================================

function GreetingCard({ name, age, greeting = "Halo" }) {
  // TODO(human): Buat component GreetingCard
  // - Tampilkan heading dengan greeting + name
  // - Tampilkan age dengan format Indonesia
  // - Conditional: jika age >= 18 tampilkan "Anda dewasa", jika tidak "Anda belum dewasa"

  return (
    <div className="card">
      {/* TODO(human): Render GreetingCard di sini */}
    </div>
  );
}

// ============================================================
// SOAL 1B — Card Component dengan Children
// Component Card menerima props: title (string) dan children (React node)
// Struktur:
//   <div className="card">
//     <div className="card-header"><h2>{title}</h2></div>
//     <div className="card-body">{children}</div>
//   </div>
// ============================================================

function Card({ title, children }) {
  // TODO(human): Buat component Card dengan children prop

  return (
    <div className="card">
      {/* TODO(human): Tambahkan card-header dan card-body */}
    </div>
  );
}

// ============================================================
// SOAL 1C — ProductTable (List Rendering dengan Key)
// Component ini menerima props: products (array)
// {
//   id: "P001",
//   name: "Laptop ASUS ROG",
//   price: 18500000,
//   stock: 5,
//   category: "elektronik"
// }
//
// Render sebagai <table class="product-table"> dengan kolom:
// Nama Produk, Kategori, Harga (IDR locale), Stok, Status
// Status: "Tersedia" (stock > 0) / "Habis" (stock === 0, warna merah)
// Key WAJIB menggunakan product.id — BUKAN index
// ============================================================

function ProductTable({ products = [] }) {
  // TODO(human): Buat ProductTable dengan list rendering
  // - Gunakan .map() untuk merender baris
  // - Key prop WAJIB: key={product.id}
  // - Format harga dengan toLocaleString("id-ID", { style: "currency", currency: "IDR" })
  // - Jika stock === 0, tampilkan "Habis" dengan warna merah

  return (
    <div>
      {/* TODO(human): Render tabel produk di sini */}
    </div>
  );
}

// ============================================================
// SOAL 1D — Avatar Component dengan Destructuring & Default
// Component Avatar menerima props:
// - src (string, URL gambar)
// - alt (string, teks alternatif)
// - size: "sm" | "md" | "lg" (default: "md")
// - rounded (boolean, default: false)
// - fallback (string, default: "?")
//
// Size mapping: sm=32px, md=48px, lg=80px
// Jika rounded=true, tambahkan className "rounded-full"
// Jika src null/undefined/empty, tampilkan div dengan fallback text
// ============================================================

function Avatar({ src, alt, size = "md", rounded = false, fallback = "?" }) {
  // TODO(human): Buat Avatar component
  // - Size mapping dengan inline style
  // - Jika src invalid, tampilkan initial avatar (div dengan fallback)
  // - Gunakan className dinamis

  return (
    <div>
      {/* TODO(human): Render img atau fallback div */}
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  // Data contoh untuk Avatar/UserCard
  const users = [
    { id: 1, name: "Andi Wijaya", role: "Frontend Developer", avatarUrl: "https://i.pravatar.cc/150?img=11" },
    { id: 2, name: "Budi Santoso", role: "Backend Developer", avatarUrl: "https://i.pravatar.cc/150?img=12" },
  ];

  // Data contoh untuk ProductTable
  const products = [
    { id: "P001", name: "Laptop ASUS ROG", price: 18500000, stock: 5, category: "elektronik" },
    { id: "P002", name: "Mechanical Keyboard", price: 1200000, stock: 23, category: "aksesoris" },
    { id: "P003", name: "Wireless Mouse", price: 350000, stock: 0, category: "aksesoris" },
    { id: "P004", name: "Monitor 27 inch", price: 4500000, stock: 8, category: "elektronik" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Demo: JSX dan Component</h1>

      {/* SOAL 1A */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 1A — GreetingCard</h2>
        <GreetingCard name="Rehan" age={22} greeting="Selamat Pagi" />
        <GreetingCard name="Ani" age={15} />
      </section>

      {/* SOAL 1B */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 1B — Card dengan Children</h2>
        <Card title="Dashboard">
          <p>Selamat datang di aplikasi kami!</p>
          <button>Tombol Aksi</button>
        </Card>
      </section>

      {/* SOAL 1C */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 1C — ProductTable</h2>
        <ProductTable products={products} />
      </section>

      {/* SOAL 1D */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 1D — Avatar + UserCard</h2>
        {users.map(user => (
          <div key={user.id} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <Avatar src={user.avatarUrl} alt={`Foto ${user.name}`} size="lg" rounded />
            <div>
              <strong>{user.name}</strong>
              <br />
              <span style={{ color: "#64748b" }}>{user.role}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;

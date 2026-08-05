// ============================================================
// SOAL 09 — REACT ROUTER DASAR
// ============================================================
// Install: npm install react-router-dom
// Jalankan: cd latihan-react && npm start
// ============================================================

import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

// ============================================================
// SOAL 9A — Setup Router Dasar
// Install react-router-dom: npm install react-router-dom
//
// Struktur:
// - BrowserRouter sebagai wrapper
// - Routes → Route untuk setiap halaman
// - Route path: "/" → Home, "/about" → About, "/contact" → Contact
//
// Di App.jsx:
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/about" element={<About />} />
//     <Route path="/contact" element={<Contact />} />
//   </Routes>
// </BrowserRouter>
// ============================================================

// TODO(human): Buat 3 komponen: Home, About, Contact
// - Home: menampilkan "Selamat datang di Beranda"
// - About: menampilkan info tentang aplikasi
// - Contact: menampilkan form kontak sederhana

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Selamat datang di Beranda</h1>
      <p>Halaman utama aplikasi.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: "20px" }}>
      {/* TODO(human): Implementasikan About page */}
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: "20px" }}>
      {/* TODO(human): Implementasikan Contact page dengan form sederhana */}
    </div>
  );
}

// ============================================================
// SOAL 9B — Navigation dengan Link dan NavLink
// Buat Navbar dengan Link ke setiap halaman
// Style: horizontal menu dengan border bottom
//
// Contoh:
// <nav style={{ display: "flex", gap: "16px", borderBottom: "1px solid #e2e8f0", padding: "16px" }}>
//   <Link to="/">Home</Link>
//   <Link to="/about">About</Link>
//   <Link to="/contact">Contact</Link>
// </nav>
//
// Bonus: NavLink dengan active class
// <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
// ============================================================

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", borderBottom: "1px solid #e2e8f0", padding: "16px" }}>
      {/* TODO(human): Link ke Home, About, Contact */}
      {/* Bonus: gunakan NavLink dengan active class */}
    </nav>
  );
}

// ============================================================
// SOAL 9C — Dynamic Routes (useParams)
// Buat halaman "User Profile" dengan parameter ID
// Route: /users/:id
//
// useParams(): returns { id: "123" }
// Contoh URL: /users/123 → useParams() → { id: "123" }
//
// Buat data dummy users dan fungsi untuk mencari berdasarkan ID
// Jika user tidak ditemukan → tampilkan "User tidak ditemukan"
// ============================================================

const usersData = [
  { id: "1", name: "Andi Wijaya", role: "Frontend Developer" },
  { id: "2", name: "Budi Santoso", role: "Backend Developer" },
  { id: "3", name: "Citra Dewi", role: "UI/UX Designer" },
];

function UserProfile() {
  const { id } = useParams();

  // TODO(human): Cari user berdasarkan id dari useParams()
  // TODO(human): Jika ditemukan → tampilkan profil
  // TODO(human): Jika tidak ditemukan → tampilkan "User tidak ditemukan"

  return (
    <div style={{ padding: "20px" }}>
      {/* TODO(human): Render user profile atau error message */}
    </div>
  );
}

// ============================================================
// SOAL 9D — useNavigate (Programmatic Navigation)
// Buat halaman "Product List" dengan:
// - List 3 produk
// - Klik produk → navigasi ke /products/:id
//
// useNavigate(): const navigate = useNavigate()
// navigate("/products/1")
// navigate(-1) → go back
// ============================================================

const productsData = [
  { id: "P001", name: "Laptop ASUS ROG", price: 18500000 },
  { id: "P002", name: "Mechanical Keyboard", price: 1200000 },
  { id: "P003", name: "Wireless Mouse", price: 350000 },
];

function ProductList() {
  const navigate = useNavigate();

  // TODO(human): Render list produk
  // TODO(human): onClick → navigate(`/products/${product.id}`)

  return (
    <div style={{ padding: "20px" }}>
      {/* TODO(human): Render product list dengan .map() */}
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO(human): Cari produk berdasarkan id
  // TODO(human): Tombol "Kembali" → navigate(-1)

  return (
    <div style={{ padding: "20px" }}>
      {/* TODO(human): Render product detail */}
      {/* TODO(human): Tombol Kembali dengan navigate(-1) */}
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "sans-serif" }}>
        {/* TODO(human): Navbar dengan Link */}
        <Routes>
          {/* Routes untuk Home, About, Contact */}
          {/* Route untuk /users/:id */}
          {/* Route untuk /products dan /products/:id */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
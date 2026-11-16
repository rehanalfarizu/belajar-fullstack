// ============================================================
// FILE: 03-latihan-router/code/01-routing-dasar.jsx
// MATERI: React Router v6 — Setup, Routes, Link, NavLink
// ============================================================
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";

// ============================================================
// TODO: Page Components (create simple placeholder components)
// ============================================================

export function HomePage() {
  return (
    <div className="page home-page">
      <h1>Selamat Datang di Portal Kami</h1>
      <p>Platform pembelajaran React terbaik untuk mahasiswa.</p>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="page about-page">
      <h1>Tentang Kami</h1>
      <p>Kami adalah platform edukasi yang fokus pada pembelajaran React.</p>
    </div>
  );
}

export function PortfolioPage() {
  return (
    <div className="page portfolio-page">
      <h1>Portfolio</h1>
      <p>Karya-karya terbaik dari mahasiswa kami.</p>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="page contact-page">
      <h1>Hubungi Kami</h1>
      <p>Email: info@portal.com | Telepon: (021) 1234-5678</p>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="page not-found-page">
      <h1>404 — Halaman Tidak Ditemukan</h1>
      <p>Halaman yang Anda cari tidak tersedia.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}

// ============================================================
// TODO: Navbar Component
// ============================================================
// Fitur:
//   1. Navigation links menggunakan NavLink
//   2. Active state styling dengan className function:
//      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//   3. Links: Home (/), About (/about), Portfolio (/portfolio), Contact (/contact)
//   4. Styling: horizontal list, spacing, active color highlight
//
// ============================================================

export function Navbar() {
  // TODO: Implementasikan Navbar seperti di atas
  return <nav className="navbar">Navbar</nav>;
}

// ============================================================
// TODO: Layout Component (with Outlet for nested routes)
// ============================================================
// ============================================================

export function Layout() {
  // TODO: Implementasikan Layout dengan Navbar, Outlet, Footer
  return <div className="layout">Layout</div>;
}

// ============================================================
// TODO: App Router Setup
// ============================================================
// ============================================================

export function AppRouter() {
  // TODO: Implementasikan AppRouter seperti di atas
  return <BrowserRouter><Routes><Route path="/" element={<Layout />}><Route index element={<HomePage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes></BrowserRouter>;
}

// ============================================================
// CSS Styles (letakkan di CSS file atau inline)
// ============================================================
/*
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1f2937;
  color: white;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: white;
}

.nav-link.active {
  color: #3b82f6;
  font-weight: 600;
}

.page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.footer {
  text-align: center;
  padding: 1rem;
  background: #f3f4f6;
  margin-top: 2rem;
}
*/
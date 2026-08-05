// ============================================================
// SOAL 02 — SUSPENSE & CODE SPLITTING
// ============================================================

import React, { Suspense, lazy, useState } from "react";

// ============================================================
// LAZY LOAD — component tidak di-load sampai diakses
// ============================================================
const Home = lazy(() => {
  console.log("Loading: Home");
  return import("./pages/Home");
});

const About = lazy(() => {
  console.log("Loading: About");
  return import("./pages/About");
});

const Dashboard = lazy(() => {
  console.log("Loading: Dashboard");
  return import("./pages/Dashboard");
});

const Settings = lazy(() => {
  console.log("Loading: Settings");
  return import("./pages/Settings");
});

const NotFound = lazy(() => import("./pages/NotFound"));

// ============================================================
// LOADING SPINNER
// ============================================================
function Loading({ message = "Memuat..." }) {
  return (
    <div style={{
      padding: "40px", textAlign: "center",
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "16px"
    }}>
      <div style={{
        width: "40px", height: "40px",
        border: "4px solid #e2e8f0",
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: "#64748b", margin: 0 }}>{message}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ============================================================
// PAGE COMPONENTS (fake — akan dibuat sebagai file terpisah)
// ============================================================
// Karena ini demo, kita buat pages sebagai inline component
// Di production: buat file pages/Home.jsx dst

function PageWrapper({ title, children }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "8px" }}>{title}</h2>
      {children}
    </div>
  );
}

// ============================================================
// ROUTER (simple, tanpa react-router untuk demo ini)
// ============================================================
function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <PageWrapper title="Home Page">Selamat datang di aplikasi! Ini adalah halaman utama.</PageWrapper>,
    about: <PageWrapper title="About Page">Kami adalah tim developer yang passionate.</PageWrapper>,
    dashboard: <PageWrapper title="Dashboard">Statistik: 150 users, 500 posts, 80% uptime.</PageWrapper>,
    settings: <PageWrapper title="Settings">Pengaturan aplikasi dan preferensi.</PageWrapper>,
    notfound: <PageWrapper title="404 - Not Found">Halaman tidak ditemukan.</PageWrapper>,
  };

  const navItems = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "dashboard", label: "Dashboard" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav style={{
        display: "flex", gap: "4px", padding: "12px 20px",
        background: "#1e293b", alignItems: "center"
      }}>
        <span style={{ color: "white", fontWeight: "bold", marginRight: "16px" }}>
          MyApp
        </span>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            style={{
              padding: "8px 16px",
              background: page === item.key ? "#3b82f6" : "transparent",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Content — Suspense handles lazy loading */}
      <Suspense fallback={<Loading message="Memuat halaman..." />}>
        {pages[page] || pages.notfound}
      </Suspense>

      {/* Info panel */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#1e293b", color: "#94a3b8",
        padding: "8px 20px", fontSize: "12px",
        display: "flex", justifyContent: "space-between"
      }}>
        <span>💡 Buka DevTools → Network tab untuk lihat chunk loading</span>
        <span>Current: {page}</span>
      </div>
    </div>
  );
}

// ============================================================
// CONTOH: Real-world file-based lazy loading
// ============================================================
/*
DI PRODUCTION — buat file terpisah:

// pages/Home.jsx
export default function Home() {
  return <div>Halaman Home</div>;
}

// pages/About.jsx
export default function About() {
  return <div>Halaman About</div>;
}

// App.jsx
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

// Preloading on hover
const prefetchHome = () => import("./pages/Home");

// Usage
<button onMouseEnter={prefetchHome}>Home</button>
<Suspense fallback={<Loading />}><Home /></Suspense>
*/

export default App;
# Solusi — 01-latihan-advanced-react (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi kunci jawaban. Kerjakan dulu versimu sendiri
> minimal 30 menit per soal, jalankan, lalu buka bagian yang relevan untuk
> **membandingkan**, bukan menyalin. Cara yang beda tapi benar itu sah.

Isi di bawah dipindahkan apa adanya dari starter lama.

---

## Soal 01 — 01-portal-modal (`code/01-portal-modal.jsx` lama)

````jsx
// ============================================================
// SOAL 01 — PORTAL & MODAL (Advanced React)
// ============================================================

import React, { useState } from "react";
import ReactDOM from "react-dom";

// ============================================================
// Modal dengan Portal
// ============================================================
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // Portal: render ke document.body, keluar dari parent DOM
  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* stopPropagation agar click di dalam modal tidak close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "440px",
          width: "90%",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
          animation: "slideUp 0.2s ease-out",
        }}
      >
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "16px"
        }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none",
              fontSize: "24px", cursor: "pointer",
              color: "#94a3b8"
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// Toast Notification dengan Portal
// ============================================================
function Toast({ message, type = "info", onClose }) {
  const colors = {
    success: { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
    error: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" },
    info: { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
    warning: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
  };

  return ReactDOM.createPortal(
    <div style={{
      position: "fixed",
      bottom: "24px", right: "24px",
      background: colors[type].bg,
      borderLeft: `4px solid ${colors[type].border}`,
      color: colors[type].text,
      padding: "16px 20px",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      maxWidth: "320px",
      zIndex: 10000,
      animation: "slideInRight 0.3s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none",
            fontSize: "18px", cursor: "pointer",
            color: colors[type].text, opacity: 0.6
          }}
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// Main App
// ============================================================
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    showToast("Aksi berhasil dilakukan!", "success");
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Portal Demo</h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>
        Modal & Toast dirender ke document.body (di luar parent DOM)
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: "12px 24px", background: "#3b82f6",
            color: "white", border: "none", borderRadius: "8px",
            cursor: "pointer", fontSize: "1rem"
          }}
        >
          Buka Modal Konfirmasi
        </button>
        <button
          onClick={() => showToast("Ini toast info!", "info")}
          style={{ padding: "12px 24px", background: "#e2e8f0", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Toast Info
        </button>
        <button
          onClick={() => showToast("Terjadi error!", "error")}
          style={{ padding: "12px 24px", background: "#fee2e2", border: "none", borderRadius: "8px", cursor: "pointer", color: "#ef4444" }}
        >
          Toast Error
        </button>
      </div>

      {/* Portal Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Konfirmasi Aksi"
      >
        <p>Apakah kamu yakin ingin melanjutkan aksi ini?</p>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
          Aksi ini tidak bisa di-undo setelah dijalankan.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={() => setModalOpen(false)}
            style={{
              padding: "10px 20px", background: "#e2e8f0",
              border: "none", borderRadius: "8px", cursor: "pointer"
            }}
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: "10px 20px", background: "#3b82f6",
              color: "white", border: "none", borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Ya, Lanjutkan
          </button>
        </div>
      </Modal>

      {/* Portal Toast */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
````

---

## Soal 02 — 02-suspense-code-splitting (`code/02-suspense-code-splitting.jsx` lama)

````jsx
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
````

---

## Soal 03 — 03-error-boundary (`code/03-error-boundary.jsx` lama)

````jsx
// ============================================================
// SOAL 03 — ERROR BOUNDARY
// ============================================================

import React, { Component } from "react";

// ============================================================
// ERROR BOUNDARY (Class Component — wajib)
// ============================================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Ganti state saat error terjadi
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    console.group("🔴 Error Caught by ErrorBoundary");
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
    this.setState({ errorInfo });
  }

  // Reset error state
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "40px", maxWidth: "500px", margin: "40px auto",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
          <h2 style={{ color: "#1e293b", marginBottom: "8px" }}>
            Terjadi Kesalahan
          </h2>
          <p style={{ color: "#ef4444", background: "#fee2e2", padding: "12px", borderRadius: "8px", fontSize: "14px" }}>
            {this.state.error?.message || "Unknown error"}
          </p>

          {this.state.errorInfo && (
            <details style={{
              marginTop: "16px", padding: "12px",
              background: "#f8fafc", borderRadius: "8px",
              textAlign: "left", fontSize: "12px", cursor: "pointer"
            }}>
              <summary style={{ cursor: "pointer", fontWeight: "600", marginBottom: "8px" }}>
                Lihat detail error
              </summary>
              <pre style={{ overflow: "auto", fontSize: "11px", color: "#64748b" }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <button
            onClick={this.resetError}
            style={{
              marginTop: "20px", padding: "12px 24px",
              background: "#3b82f6", color: "white",
              border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "1rem",
            }}
          >
            🔄 Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================
// COMPONENTS YANG BISA ERROR
// ============================================================

// Error sederhana
function BuggyCounter() {
  const [count, setCount] = React.useState(0);

  if (count === 5) {
    throw new Error("Count tidak boleh 5! Ini sengaja di-throw.");
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Buggy Counter</h3>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{count}</p>
      <p style={{ fontSize: "12px", color: "#ef4444" }}>⚠️ Akan error saat count = 5</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: "8px" }}>Reset</button>
    </div>
  );
}

// Error async (fetch gagal)
function FailingFetch() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Simulasi error — fetch URL yang tidak ada
    fetch("https://jsonplaceholder.typicode.com/invalid-endpoint-404")
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: Endpoint tidak ditemukan`);
        return r.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    throw new Error(`Fetch Error: ${error}`);
  }

  return <p>Data: {JSON.stringify(data)}</p>;
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Error Boundary Demo</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        ErrorBoundary menangkap error dan menampilkan UI fallback.
        Error tidak akan crash seluruh app.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Demo 1: Buggy Counter */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#f8fafc", padding: "12px", borderBottom: "1px solid #e2e8f0", fontWeight: "600" }}>
            Demo 1: Buggy Counter
          </div>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </div>

        {/* Demo 2: Simple Error */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#f8fafc", padding: "12px", borderBottom: "1px solid #e2e8f0", fontWeight: "600" }}>
            Demo 2: Throw Manual
          </div>
          <ErrorBoundary>
            <ThrowButton />
          </ErrorBoundary>
        </div>
      </div>

      {/* Full page Error Boundary */}
      <div style={{ marginTop: "20px", border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "20px" }}>
        <div style={{ fontWeight: "600", marginBottom: "12px" }}>🌐 Page-level Error Boundary</div>
        <ErrorBoundary>
          <SimulatedPageError />
        </ErrorBoundary>
      </div>
    </div>
  );
}

// Helper: Button yang throw saat diklik
function ThrowButton() {
  const [throwError, setThrowError] = React.useState(false);

  if (throwError) {
    throw new Error("Error dari button click!");
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Klik tombol untuk trigger error</p>
      <button
        onClick={() => setThrowError(true)}
        style={{
          padding: "10px 20px", background: "#ef4444",
          color: "white", border: "none", borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Trigger Error
      </button>
    </div>
  );
}

// Helper: Simulated page error
function SimulatedPageError() {
  const [crash, setCrash] = React.useState(false);
  if (crash) throw new Error("Page crash!");

  return (
    <div style={{ textAlign: "center" }}>
      <p>Ini component dengan tombol crash</p>
      <button onClick={() => setCrash(true)} style={{ padding: "10px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        💥 Crash entire page
      </button>
    </div>
  );
}

export default App;
````

---

## Soal 04 — 04-forward-ref (`code/04-forward-ref.jsx` lama)

````jsx
// ============================================================
// SOAL 04 — REF PROP REACT 19 + LEGACY FORWARD REF
// ============================================================

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

// React 19: ref dapat diterima sebagai prop. Untuk komponen baru, mulai dari
// pola ini. Bagian forwardRef di bawah dipertahankan untuk memahami codebase
// React 18 dan library yang belum bermigrasi.
export function ModernTextInput({ ref, error, style, ...inputProps }) {
  return (
    <input
      {...inputProps}
      ref={ref}
      style={{
        padding: "10px 12px",
        border: `1px solid ${error ? "#ef4444" : "#e2e8f0"}`,
        borderRadius: "8px",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    />
  );
}

// ============================================================
// LEGACY FORWARD REF — pola React 18 yang masih banyak dijumpai
// ============================================================

// Input dengan forwardRef
const TextInput = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}  // pass ref ke DOM element
      type={props.type || "text"}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      style={{
        padding: "10px 12px",
        border: `1px solid ${props.error ? "#ef4444" : "#e2e8f0"}`,
        borderRadius: "8px",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
        ...props.style,
      }}
    />
  );
});

// Button dengan forwardRef
const FancyButton = forwardRef((props, ref) => (
  <button
    ref={ref}
    onClick={props.onClick}
    style={{
      padding: props.size === "large" ? "16px 32px" : "10px 20px",
      background: props.variant === "primary" ? "#3b82f6"
        : props.variant === "danger" ? "#ef4444"
        : "#e2e8f0",
      color: props.variant === "primary" || props.variant === "danger" ? "white" : "#333",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "transform 0.1s, opacity 0.1s",
    }}
  >
    {props.children}
  </button>
));

// ============================================================
// CUSTOM IMPERATIVE HANDLE — batasi apa yang di-expose
// ============================================================

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // Expose BEBERAPA method saja, tidak semua
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => inputRef.current.value = "",
    getValue: () => inputRef.current.value,
  }), []);

  return (
    <div>
      <input ref={inputRef} value={props.value} onChange={props.onChange} style={{
        padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%"
      }} />
      <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
        Bisa diakses: focus(), clear(), getValue()
      </p>
    </div>
  );
});

// ============================================================
// APP — penggunaan ref
// ============================================================
function App() {
  // Refs
  const simpleInputRef = useRef(null);
  const buttonRef = useRef(null);
  const customInputRef = useRef(null);

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Auto-focus saat mount
  useEffect(() => {
    simpleInputRef.current.focus();
  }, []);

  // Button click handler
  useEffect(() => {
    // Button ref untuk animation
    const btn = buttonRef.current;
    if (btn) {
      btn.addEventListener("mouseenter", () => btn.style.transform = "scale(1.05)");
      btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nama: ${name}\nEmail: ${email}`);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    simpleInputRef.current.focus();
  };

  const handleCustomClear = () => {
    if (customInputRef.current) {
      customInputRef.current.clear();
    }
  };

  const getCustomValue = () => {
    if (customInputRef.current) {
      alert(`Value: "${customInputRef.current.getValue()}"`);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Forward Ref Demo</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        forwardRef mengizinkan parent mengakses DOM node langsung.
        useImperativeHandle membatasi API yang di-expose.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Ref: auto-focus on mount */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Nama</label>
          <TextInput
            ref={simpleInputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ketik nama..."
          />
        </div>

        {/* Tab to focus */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Email</label>
          <TextInput
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ketik email..."
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <FancyButton ref={buttonRef} variant="primary" onClick={handleSubmit}>
            Submit
          </FancyButton>
          <FancyButton variant="secondary" onClick={clearForm}>
            Clear
          </FancyButton>
        </div>
      </form>

      <hr style={{ margin: "32px 0" }} />

      {/* useImperativeHandle demo */}
      <h3 style={{ marginBottom: "12px" }}>useImperativeHandle Demo</h3>
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
        <CustomInput
          ref={customInputRef}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <button onClick={() => customInputRef.current?.focus()} style={{ padding: "8px 12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Focus
          </button>
          <button onClick={handleCustomClear} style={{ padding: "8px 12px", background: "#f59e0b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Clear
          </button>
          <button onClick={getCustomValue} style={{ padding: "8px 12px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Get Value
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
````

---

## Soal 05 — 05-compound-components (`code/05-compound-components.jsx` lama)

````jsx
// ============================================================
// SOAL 05 — COMPOUND COMPONENTS
// ============================================================

import React, { createContext, useContext, useState } from "react";

// ============================================================
// CONTEXT — shared state antara compound components
// ============================================================
const TabsContext = createContext();

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Compound components harus di dalam <Tabs>");
  }
  return context;
}

// ============================================================
// COMPOUND COMPONENTS
// ============================================================

// Tabs — parent container
function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ fontFamily: "sans-serif" }}>{children}</div>
    </TabsContext.Provider>
  );
}

// TabList — wrapper untuk tab buttons
function TabList({ children }) {
  return (
    <div style={{
      display: "flex",
      borderBottom: "2px solid #e2e8f0",
      gap: "4px",
    }}>
      {children}
    </div>
  );
}

// Tab — individual tab button
function Tab({ children, tabId }) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === tabId;

  return (
    <button
      onClick={() => setActiveTab(tabId)}
      style={{
        padding: "12px 20px",
        border: "none",
        background: "transparent",
        color: isActive ? "#3b82f6" : "#64748b",
        borderBottom: `2px solid ${isActive ? "#3b82f6" : "transparent"}`,
        cursor: "pointer",
        fontWeight: isActive ? "600" : "400",
        fontSize: "14px",
        transition: "all 0.2s",
        marginBottom: "-2px",
      }}
    >
      {children}
    </button>
  );
}

// TabPanel — content panel
function TabPanel({ children, tabId }) {
  const { activeTab } = useTabs();

  if (activeTab !== tabId) return null;

  return (
    <div style={{
      padding: "24px 0",
      animation: "fadeIn 0.2s ease-out",
    }}>
      {children}
    </div>
  );
}

// Icon component (decorative)
function Icon({ name }) {
  const icons = {
    home: "🏠", about: "👤", contact: "📧",
    settings: "⚙️", profile: "👨‍💻", messages: "💬"
  };
  return <span style={{ marginRight: "6px" }}>{icons[name] || ""}</span>;
}

// ============================================================
// CONTENT COMPONENTS (demo content untuk setiap tab)
// ============================================================
function HomeContent() {
  return (
    <div>
      <h3>Selamat Datang!</h3>
      <p>Ini adalah halaman utama aplikasi.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px" }}>
        {[{ label: "Total Users", value: "1,234" }, { label: "Posts", value: "5,678" }, { label: "Revenue", value: "$12.5k" }].map(item => (
          <div key={item.label} style={{ background: "#f1f5f9", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3b82f6" }}>{item.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div>
      <h3>Tentang Kami</h3>
      <p>Kami membangun aplikasi fullstack berkualitas tinggi.</p>
      <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
        {["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"].map(tag => (
          <span key={tag} style={{ background: "#dbeafe", color: "#1e40af", padding: "6px 12px", borderRadius: "16px", fontSize: "12px" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div>
      <h3>Hubungi Kami</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>📧</span>
          <span>contact@company.com</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>📱</span>
          <span>+62 812 3456 7890</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>📍</span>
          <span>Jakarta, Indonesia</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Compound Components Pattern</h1>
      <p style={{ color: "#64748b", marginBottom: "32px" }}>
        TabList, Tab, TabPanel share state via Context — masing-masing hanya aware dengan fitur itself.
      </p>

      <Tabs defaultTab="home">
        {/* Tab Buttons */}
        <TabList>
          <Tab tabId="home"><Icon name="home" />Home</Tab>
          <Tab tabId="about"><Icon name="about" />About</Tab>
          <Tab tabId="contact"><Icon name="contact" />Contact</Tab>
        </TabList>

        {/* Tab Content */}
        <TabPanel tabId="home"><HomeContent /></TabPanel>
        <TabPanel tabId="about"><AboutContent /></TabPanel>
        <TabPanel tabId="contact"><ContactContent /></TabPanel>
      </Tabs>

      <div style={{ marginTop: "32px", background: "#f8fafc", padding: "16px", borderRadius: "8px", fontSize: "14px" }}>
        <strong>Kenapa Compound Components?</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: "20px" }}>
          <li>Flexible — parent kontrol struktur, children kontrol behavior</li>
          <li>Reusable — bisa pakai pattern ini untuk Accordion, Select, dll</li>
          <li>Clean API — consumer tidak perlu tahu internal state</li>
          <li>Type-safe — TypeScript happy</li>
        </ul>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
````

---

## Blok dari `soal/01-portal-modal.md`: Contoh Code

````jsx
import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open Modal</button>
      <Modal isOpen={show} onClose={() => setShow(false)} title="Konfirmasi">
        <p>Apakah kamu yakin?</p>
        <button onClick={() => setShow(false)}>Ya</button>
      </Modal>
    </>
  );
}
````

---

## Blok dari `soal/02-suspense-code-splitting.md`: Contoh Code

````jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load — tidak di-load sampai diakses
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function Loading() {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <div style={{
        width: 40, height: 40,
        border: "4px solid #e2e8f0",
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        margin: "0 auto",
      }} />
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
````

---

## Blok dari `soal/03-error-boundary.md`: Contoh Code

````jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <h2>Terjadi kesalahan</h2>
          <p style={{ color: "#666" }}>{this.state.error?.message}</p>
          <button
            onClick={this.resetError}
            style={{
              padding: "10px 20px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyComponent() {
  throw new Error("Error ini sengaja dibuat!");
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
````

---

## Blok dari `soal/05-compound-components.md`: Contoh Code

````jsx
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ children, tabId }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === tabId;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(tabId)}
      style={{
        padding: "8px 16px",
        border: "none",
        background: isActive ? "#3b82f6" : "#e2e8f0",
        color: isActive ? "white" : "#333",
        borderRadius: "8px 8px 0 0",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function TabPanel({ children, tabId }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== tabId) return null;
  return <div role="tabpanel">{children}</div>;
}

// Usage
function App() {
  return (
    <Tabs defaultTab="home">
      <TabList>
        <Tab tabId="home">Home</Tab>
        <Tab tabId="about">About</Tab>
        <Tab tabId="contact">Contact</Tab>
      </TabList>
      <TabPanel tabId="home">Ini halaman Home</TabPanel>
      <TabPanel tabId="about">Ini halaman About</TabPanel>
      <TabPanel tabId="contact">Ini halaman Contact</TabPanel>
    </Tabs>
  );
}
````

---

## Blok dari `soal/04-forward-ref.md`: Contoh Code

````jsx
function FancyButton({ ref, children, ...buttonProps }) {
  return (
    <button ref={ref} type="button" {...buttonProps}>
      {children}
    </button>
  );
}

// Usage
function App() {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return <FancyButton ref={buttonRef}>Click Me</FancyButton>;
}
````

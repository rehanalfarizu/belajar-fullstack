// ============================================================
// SOAL 03 — COMPONENT PATTERNS
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { useState } from "react";

// ============================================================
// SOAL 3A — Render Props (MouseTracker)
// Component MouseTracker menerima children sebagai render function
// API: <MouseTracker>{({ x, y }) => <div>Koordinat: {x}, {y}</div>}</MouseTracker>
//
// Behavior:
// - Track posisi mouse dengan useRef + useEffect (mousemove di window)
// - Saat mouse belum bergerak: tampilkan "Gerakkan mouse..."
// - Setelah mouse bergerak: tampilkan koordinat
// - Saat mouse keluar window (mouseleave): x/y = 0, tampilkan "Mouse di luar window"
// ============================================================

function MouseTracker({ children }) {
  // TODO(human): Implementasikan MouseTracker dengan render props pattern
  // - Gunakan useRef untuk menyimpan posisi
  // - Gunakan useEffect untuk menambahkan event listener mousemove
  // - Cleanup: removeEventListener saat unmount
  // - Panggil children sebagai fungsi dengan { x, y }

  return (
    <div>
      {/* TODO(human): Render hasil dari children({ x, y }) */}
    </div>
  );
}

// ============================================================
// SOAL 3B — Higher-Order Component (withLoading)
// HOC withLoading menerima WrappedComponent dan loadingMessage
// Mengembalikan component baru yang:
// - Jika isLoading === true: render loading div
// - Jika data === null/undefined: render loading div
// - Jika tidak: render <WrappedComponent {...props} />
// ============================================================

function withLoading(WrappedComponent, loadingMessage = "Memuat...") {
  // TODO(human): Implementasikan HOC withLoading
  // - Kembalikan component baru
  // - Component baru menerima prop isLoading dan data
  // - Handle edge cases: isLoading=true atau data=null → loading
  // - Forward props ke WrappedComponent

  return function WithLoadingComponent(props) {
    // TODO(human): Implementasikan logika loading di sini
    return<WrappedComponent {...props} />;
  };
}

// ============================================================
// SOAL 3C — Conditional Class Names (Badge)
// Component Badge menerima: text, variant, size, outlined, onClick
// variant: "success" | "warning" | "error" | "info" (default: "info")
// size: "sm" | "md" | "lg" (default: "md")
// outlined: boolean (default: false)
//
// Helper classNames:
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
//
// className akhir: "badge badge-{variant} badge-{size}" + ("badge-outlined" jika outlined) + ("badge-clickable" jika onClick)
// Jika ada onClick: render sebagai <button>, jika tidak:<span>
// ============================================================

function classNames(...classes) {
  // TODO(human): Implementasikan helper classNames
  return classes.filter(Boolean).join(" ");
}

function Badge({ text, variant = "info", size = "md", outlined = false, onClick }) {
  // TODO(human): Implementasikan Badge component
  // - Gunakan classNames helper
  // - Jika ada onClick: render <button>, jika tidak <span>
  // - Pisahkan onClick dari props yang di-spread ke element

  return (
    <span className="badge">
      {text}
    </span>
  );
}

// ============================================================
// SOAL 3D — Auto-save Document Editor
// Component DocumentEditor memiliki:
// - content (string, default: "Lorem ipsum dolor sit amet...")
// - saveStatus: "saved" | "unsaved" | "saving" (default: "saved")
// - lastSaved: Date | null (default: null)
//
// Behavior:
// - Setiap kali content berubah → setSaveStatus("unsaved")
// -2 detik setelah user berhenti mengetik → simulate save
//   - setSaveStatus("saving") selama 1 detik
//   - lalu setSaveStatus("saved") dengan timestamp lastSaved
// - WAJIB cleanup: clearTimeout di useEffect sebelum setTimeout baru
// - Format lastSaved: "Saved X detik yang lalu" / "Saved X menit yang lalu"
// ============================================================

function DocumentEditor() {
  const [content, setContent] = useState("Lorem ipsum dolor sit amet...");
  const [saveStatus, setSaveStatus] = useState("saved");
  const [lastSaved, setLastSaved] = useState(null);

  // TODO(human): Implementasikan auto-save dengan useEffect + debounce
  // - Setiap kali content berubah → setSaveStatus("unsaved")
  // - 2 detik setelah berhenti mengetik → simulate save
  // - Cleanup: clearTimeout sebelumnya agar tidak ada multiple timers
  // - lastSaved diformat sebagai "Saved X detik yang lalu"

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>Document Editor</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          minHeight: "200px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "1rem",
          fontFamily: "monospace",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginTop: "12px", fontSize: "0.875rem", color: "#64748b" }}>
        {/* TODO(human): Tampilkan status: saved/unsaved/saving */}
        {/* Jika saved: tampilkan lastSaved timestamp */}
        {/* Jika unsaved: tampilkan "Unsaved changes" */}
        {/* Jika saving: tampilkan "Saving..." */}
      </div>
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Demo: Component Patterns</h1>

      {/* SOAL 3A */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 3A — Render Props (MouseTracker)</h2>
        <MouseTracker>
          {({ x, y }) => (
            <div style={{
              padding: "20px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              background: "#f8fafc",
            }}>
              Koordinat X: {x}, Y: {y}
            </div>
          )}
        </MouseTracker>
      </section>

      {/* SOAL 3B */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 3B — HOC withLoading</h2>
        {/* TODO(human): Demo withLoading di sini */}
      </section>

      {/* SOAL 3C */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 3C — Badge Component</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Badge text="Success" variant="success" />
          <Badge text="Warning!" variant="warning" size="lg" />
          <Badge text="Error" variant="error" outlined />
          <Badge text="Click me" variant="info" onClick={() => alert("Clicked!")} />
        </div>
      </section>

      {/* SOAL 3D */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 3D — Auto-save Document Editor</h2>
        <DocumentEditor />
      </section>
    </div>
  );
}

export default App;

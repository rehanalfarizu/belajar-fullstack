// ============================================================
// SOAL 08 — CUSTOM HOOKS
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { useState, useEffect } from "react";

// ============================================================
// SOAL 8A — useToggle
// Hook: useToggle(initialValue = false)
// Return: [value, toggle]
// toggle: () => setValue(v => !v)
//
// Aturan Hook:
// - Nama harus mulai dengan "use"
// - Hanya dipanggil dari dalam component atau hook lain
// - Tidak boleh di dalam conditional/loop
// ============================================================

function useToggle(initialValue = false) {
  // TODO(human): Implementasikan useToggle
  // - useState(initialValue)
  // - toggle function: setValue(prev => !prev)
  // - Return [value, toggle]
  return [false, () => {}];
}

// ============================================================
// SOAL 8B — useLocalStorage
// Hook: useLocalStorage(key, initialValue)
// Return: [value, setValue]
//
// Implementasi:
// 1. Inisialisasi: coba baca dari localStorage, jika gagal → initialValue
// 2. Setiap value berubah → simpan ke localStorage
// 3. Handle error (JSON parse error, quota exceeded)
//
// Lazy initialization:
// const [value, setValue] = useState(() => {
//   try {
//     const item = window.localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//   } catch {
//     return initialValue;
//   }
// });
// ============================================================

function useLocalStorage(key, initialValue) {
  // TODO(human): Implementasikan useLocalStorage
  // - Lazy initialization dari localStorage
  // - useEffect: setiap value berubah → localStorage.setItem
  // - Handle error dengan try/catch

  return [initialValue, () => {}];
}

// ============================================================
// SOAL 8C — useDebounce
// Hook: useDebounce(value, delay = 500)
// Return: debouncedValue
//
// Implementasi:
// - Simpan value dengan state
// - useEffect dengan setTimeout delay
// - Cleanup: clearTimeout
// - Return debouncedValue
// ============================================================

function useDebounce(value, delay = 500) {
  // TODO(human): Implementasikan useDebounce
  // - State: debouncedValue (init dengan value)
  // - useEffect: setTimeout 500ms → update debouncedValue
  // - Cleanup: clearTimeout(timer)
  // - Return debouncedValue

  return value;
}

// ============================================================
// SOAL 8D — useWindowSize
// Hook: useWindowSize()
// Return: { width, height }
//
// Implementasi:
// - useState dengan initial: { width: window.innerWidth, height: window.innerHeight }
// - useEffect: addEventListener("resize", handler)
// - Cleanup: removeEventListener
// - Empty deps [] → sekali saat mount
// ============================================================

function useWindowSize() {
  // TODO(human): Implementasikan useWindowSize
  // - useState: { width, height }
  // - useEffect: resize listener → update state
  // - Cleanup: removeEventListener
  // - Return { width, height }

  return { width: window.innerWidth, height: window.innerHeight };
}

// ============================================================
// SOAL 8E — useOnClickOutside
// Hook: useOnClickOutside(ref, handler)
// ref: React ref object (dari useRef)
// handler: function yang dipanggil saat click di luar element
//
// Implementasi:
// - useEffect dengan document.addEventListener("mousedown", handler)
// - Handler: e.target tidak ada dalam ref.current → panggil handler
// - Cleanup: removeEventListener
// ============================================================

function useOnClickOutside(ref, handler) {
  // TODO(human): Implementasikan useOnClickOutside
  // - useEffect: document.addEventListener("mousedown", ...)
  // - Di handler: check if click target is outside ref.current
  // - Cleanup: document.removeEventListener

  return undefined;
}

// ============================================================
// App.jsx — Demo semua custom hooks
// ============================================================
function App() {
  // Demo useToggle
  const [isOn, toggleIsOn] = useToggle(false);
  const [isDark, toggleIsDark] = useToggle(false);

  // Demo useLocalStorage
  const [savedName, setSavedName] = useLocalStorage("name", "");
  const [savedColor, setSavedColor] = useLocalStorage("themeColor", "#3b82f6");

  // Demo useDebounce
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Demo useWindowSize
  const windowSize = useWindowSize();

  // Demo useOnClickOutside
  const dropDownRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(dropDownRef, () => setIsOpen(false));

  const colors = isDark
    ? { bg: "#1a1a1a", text: "#e2e8f0" }
    : { bg: "#f8fafc", text: "#1e293b" };

  return (
    <div style={{
      background: colors.bg,
      color: colors.text,
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "sans-serif",
      transition: "all 0.3s ease",
    }}>
      <h1>Custom Hooks Demo</h1>

      {/* useToggle */}
      <section style={sectionStyle}>
        <h3>useToggle</h3>
        <p>Toggle Switch: <strong>{isOn ? "ON" : "OFF"}</strong></p>
        <button onClick={toggleIsOn} style={btnStyle}>Toggle</button>
        <p>Dark Mode: <strong>{isDark ? "🌙 Dark" : "☀️ Light"}</strong></p>
        <button onClick={toggleIsDark} style={btnStyle}>Toggle Theme</button>
      </section>

      {/* useLocalStorage */}
      <section style={sectionStyle}>
        <h3>useLocalStorage (data persist di browser!)</h3>
        <p>Coba ketik, refresh browser — data tetap ada!</p>
        <input
          type="text"
          value={savedName}
          onChange={(e) => setSavedName(e.target.value)}
          placeholder="Ketik nama..."
          style={inputStyle}
        />
        <p style={{ marginTop: "8px", fontSize: "14px", color: "#64748b" }}>
          Terakhir diinput: <strong>{savedName || "-"}</strong>
        </p>
        <div style={{ marginTop: "12px" }}>
          <label>Pilih warna: </label>
          <input
            type="color"
            value={savedColor}
            onChange={(e) => setSavedColor(e.target.value)}
          />
          <span style={{ marginLeft: "8px", fontWeight: "bold", color: savedColor }}>
            {savedColor}
          </span>
        </div>
      </section>

      {/* useDebounce */}
      <section style={sectionStyle}>
        <h3>useDebounce</h3>
        <p>Ketik cepat — hanya "API call" terakhir yang jalan:</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari..."
          style={inputStyle}
        />
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "8px" }}>
          Immediate: <strong>{searchTerm}</strong>
        </p>
        <p style={{ fontSize: "14px", color: "#3b82f6" }}>
          Debounced (setelah 500ms): <strong>{debouncedSearch}</strong>
        </p>
      </section>

      {/* useWindowSize */}
      <section style={sectionStyle}>
        <h3>useWindowSize</h3>
        <p>Resize browser untuk update:</p>
        <p>Width: <strong>{windowSize.width}px</strong></p>
        <p>Height: <strong>{windowSize.height}px</strong></p>
        <p style={{ color: windowSize.width < 768 ? "#10b981" : "#3b82f6" }}>
          {windowSize.width < 768 ? "Mobile View" : "Desktop View"}
        </p>
      </section>

      {/* useOnClickOutside */}
      <section style={sectionStyle}>
        <h3>useOnClickOutside</h3>
        {/* TODO(human): Demo dropdown dengan useOnClickOutside */}
        {/* Klik di luar dropdown → close otomatis */}
      </section>
    </div>
  );
}

const sectionStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "16px",
};

const btnStyle = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};

export default App;

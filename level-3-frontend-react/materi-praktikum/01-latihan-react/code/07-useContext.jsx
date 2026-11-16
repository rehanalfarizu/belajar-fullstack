// ============================================================
// SOAL 07 — USECONTEXT
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { createContext, useContext, useState } from "react";

// ============================================================
// SOAL 7A — ThemeContext dengan useContext
// Buat context ThemeContext dengan createContext()
// ThemeProvider component dengan:
// - State: isDark (boolean, default: false)
// - Toggle function: setIsDark(prev => !prev)
// - Value: { isDark, toggleTheme, colors }
//
// colors:
//   isDark → { bg: "#1a1a1a", surface: "#262626", text: "#e2e8f0", accent: "#3b82f6" }
//   light  → { bg: "#f8fafc", surface: "#ffffff", text: "#1e293b", accent: "#3b82f6" }
//
// Export: ThemeContext, ThemeProvider, useTheme() hook
// useTheme: return useContext(ThemeContext), throw error jika null
// ============================================================

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // TODO(human): Implementasikan ThemeProvider
  // - State: isDark, toggleTheme
  // - Value object: { isDark, toggleTheme, colors }
  // - Return <ThemeContext.Provider value={...}>{children}</ThemeContext.Provider>

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  // TODO(human): Implementasikan useTheme hook
  // - useContext(ThemeContext)
  // - Jika context null/undefined → throw new Error("useTheme harus di dalam ThemeProvider")
  // - Return context
  return useContext(ThemeContext);
}

// ============================================================
// SOAL 7B — AuthContext dengan Login/Logout
// Buat AuthContext dengan:
// - State: user (object | null)
// - login(name, role) → setUser({ name, role, loginTime: Date string })
// - logout() → setUser(null)
// - Value: { user, login, logout }
//
// Export: AuthContext, AuthProvider, useAuth() hook
// ============================================================

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // TODO(human): Implementasikan AuthProvider
  // - State: user (null atau { name, role, loginTime })
  // - login(name, role): setUser dengan timestamp
  // - logout(): setUser(null)
  // - Return <AuthContext.Provider>

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // TODO(human): Implementasikan useAuth hook (sama pattern dengan useTheme)
  return useContext(AuthContext);
}

// ============================================================
// SOAL 7C — CounterContext (Multiple Context)
// Buat CounterContext dengan:
// - State: count (number)
// - increment(amount) → setCount(prev => prev + amount)
// - decrement(amount) → setCount(prev => prev - amount)
// - reset() → setCount(0)
// - Value: { count, increment, decrement, reset }
//
// Demo: 3 komponen berbeda pakai useCounter() yang sama
// ============================================================

const CounterContext = createContext();

export function CounterProvider({ children }) {
  // TODO(human): Implementasikan CounterProvider
  // - State: count (default: 0)
  // - increment(amount), decrement(amount), reset()
  // - Value: { count, increment, decrement, reset }

  return (
    <CounterContext.Provider value={{ count: 0, increment: () => {}, decrement: () => {}, reset: () => {} }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  // TODO(human): Implementasikan useCounter hook
  return useContext(CounterContext);
}

// ============================================================
// SOAL 7D — ThemedApp (Gabungkan semua context)
// Aplikasi yang pakai:
// - ThemeProvider (wrapper paling luar)
// - AuthProvider (di dalam ThemeProvider)
// - CounterProvider (opsional)
//
// Komponen:
// - ThemedButton: pakai useTheme() — tombol toggle theme
// - Navbar: pakai useTheme() + useAuth() — toggle theme + user info + logout
// - Dashboard: pakai useAuth() — tampilkan user info + admin panel
// - LoginForm: pakai useAuth() — form login sederhana
// - Counter: pakai useCounter() — increment/decrement/reset
// ============================================================

function ThemedButton() {
  const { isDark, toggleTheme } = useTheme();

  // TODO(human): Implementasikan ThemedButton
  // - Gunakan colors.accent untuk background
  // - Teks: "☀️ Light" jika dark, "🌙 Dark" jika light

  return (
    <button onClick={toggleTheme}>
      Theme
    </button>
  );
}

function Navbar() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  // TODO(human): Implementasikan Navbar
  // - Background: colors.surface, border bottom
  // - Kiri: judul "App", Kanan: ThemedButton + user info/logout

  return (
    <nav style={{ padding: "16px", display: "flex", justifyContent: "space-between" }}>
      <h2>App</h2>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {/* TODO(human): ThemedButton, user name atau "Belum login", logout button */}
      </div>
    </nav>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const { colors } = useTheme();

  if (!user) return null;

  // TODO(human): Implementasikan Dashboard
  // - Jika belum login: return null
  // - Tampilkan: nama, role, login time
  // - Jika role === "admin": tampilkan admin panel

  return (
    <div style={{ padding: "24px" }}>
      <h1>Dashboard</h1>
      {/* TODO(human): User info card */}
      {/* TODO(human): Admin panel jika role === "admin" */}
    </div>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const [name, setName] = useState("");

  // TODO(human): Implementasikan LoginForm
  // - Input nama
  // - Submit → login(name, role="user")
  // - Jika nama mengandung "admin" → role="admin"

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      {/* TODO(human): Form dengan input + tombol login */}
    </div>
  );
}

function Counter() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <h2>Counter: {count}</h2>
      {/* TODO(human): Tombol -5, -1, Reset, +1, +5 */}
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CounterProvider>
          <div style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
            {/* TODO(human): Navbar */}
            {/* TODO(human): Dashboard */}
            {/* TODO(human): Counter */}
            {/* TODO(human): LoginForm */}
          </div>
        </CounterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

// ============================================================
// SOAL 10 — CONTEXT API
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { createContext, useContext, useState } from "react";

// ============================================================
// SOAL 10A — ThemeContext (Dark/Light Toggle)
// Buat ThemeContext dengan:
// - createContext()
// - ThemeProvider component
// - useTheme() hook
//
// State:
// - isDark (boolean, default: false)
// - toggleTheme: setIsDark(prev => !prev)
//
// Value object:
// {
//   isDark,
//   toggleTheme,
//   colors: isDark
//     ? { bg: "#1a1a1a", surface: "#262626", text: "#e2e8f0", accent: "#3b82f6", border: "#404040" }
//     : { bg: "#f8fafc", surface: "#ffffff", text: "#1e293b", accent: "#3b82f6", border: "#e2e8f0" }
// }
//
// Error handling: throw new Error("useTheme harus di dalam ThemeProvider")
// ============================================================

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // TODO(human): Implementasikan toggleTheme
  // TODO(human): Buat value object dengan colors based on isDark
  // TODO(human): Return <ThemeContext.Provider>

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme harus di dalam ThemeProvider");
  }
  return context;
}

// ============================================================
// SOAL 10B — AuthContext (Login/Logout/Register)
// Buat AuthContext dengan:
// - createContext()
// - AuthProvider component
// - useAuth() hook
//
// State:
// - user: { name, role, loginTime } | null
//
// Actions:
// - login(name, role) → setUser({ name, role, loginTime: new Date().toLocaleTimeString() })
// - logout() → setUser(null)
//
// Value: { user, login, logout }
//
// Error handling: throw new Error("useAuth harus di dalam AuthProvider")
// ============================================================

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // TODO(human): Implementasikan login dan logout
  // login: setUser dengan name, role, dan loginTime
  // logout: setUser(null)

  return (
    <AuthContext.Provider value={{ user, login: () => {}, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus di dalam AuthProvider");
  }
  return context;
}

// ============================================================
// SOAL 10C — CartContext (Shopping Cart)
// Buat CartContext dengan:
// - items: array [{ id, name, price, qty }]
// - addItem(product) → jika belum ada, push; jika ada, qty++
// - removeItem(id) → hapus dari array
// - updateQty(id, qty) → update qty, jika qty <= 0 → hapus
// - clearCart() → set items []
// - totalItems: items.reduce((sum, i) => sum + i.qty, 0)
// - totalPrice: items.reduce((sum, i) => sum + i.price * i.qty, 0)
//
// Value: { items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }
// ============================================================

const CartContext = createContext();

const sampleProducts = [
  { id: "P001", name: "Laptop ASUS ROG", price: 18500000 },
  { id: "P002", name: "Mechanical Keyboard", price: 1200000 },
  { id: "P003", name: "Wireless Mouse", price: 350000 },
];

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // TODO(human): addItem(product) — jika ada di items, qty++; jika tidak, push baru
  const addItem = (product) => {
    // TODO(human): Cek apakah product.id sudah ada di items
    // Jika ada → setItems(items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    // Jika tidak → setItems([...items, { ...product, qty: 1 }])
  };

  // TODO(human): removeItem(id) — setItems(items.filter(i => i.id !== id))
  const removeItem = (id) => {};

  // TODO(human): updateQty(id, qty) — jika qty <= 0 → hapus; jika tidak → update
  const updateQty = (id, qty) => {};

  // TODO(human): clearCart() — setItems([])
  const clearCart = () => {};

  // TODO(human): totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  // TODO(human): totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems: 0, totalPrice: 0 }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus di dalam CartProvider");
  }
  return context;
}

// ============================================================
// SOAL 10D — ThemedApp (Gabungkan semua context)
// Wrapper hierarchy:
// <ThemeProvider>
//   <AuthProvider>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </AuthProvider>
// </ThemeProvider>
//
// Komponen:
// - ThemeToggle: tombol toggle theme dengan useTheme()
// - Navbar: theme + auth + cart summary
// - ProductCatalog: list produk dengan addToCart
// - CartDrawer: slide-out cart dengan useCart()
// - Dashboard: user info + admin panel (jika role === "admin")
// ============================================================

function ThemeToggle() {
  const { isDark, toggleTheme, colors } = useTheme();

  // TODO(human): Implementasikan tombol toggle
  // - Background: colors.accent, color: white
  // - Teks: "☀️ Light" / "🌙 Dark"

  return (
    <button onClick={toggleTheme} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
      Toggle Theme
    </button>
  );
}

function Navbar() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  // TODO(human): Implementasikan Navbar
  // - Background: colors.surface, borderBottom: colors.border
  // - Kiri: "Toko App" + ThemeToggle
  // - Kanan: cart badge (totalItems) + user info/logout

  return (
    <nav style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h2 style={{ margin: 0 }}>Toko App</h2>
        <ThemeToggle />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* TODO(human): Cart badge dengan totalItems */}
        {/* TODO(human): User name atau "Login" link, logout button jika logged in */}
      </div>
    </nav>
  );
}

function ProductCatalog() {
  const { addItem } = useCart();

  return (
    <div style={{ padding: "24px" }}>
      <h2>Katalog Produk</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {/* TODO(human): Render setiap produk dengan tombol "Tambah ke Keranjang" */}
      </div>
    </div>
  );
}

function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();

  // TODO(human): Implementasikan CartDrawer
  // - Jika items.length === 0 → "Keranjang kosong"
  // - List item: name, qty controls (- / +), remove button
  // - Total items dan total price (format IDR)
  // - Tombol "Hapus Semua"

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Keranjang ({totalItems})</h2>
      {/* TODO(human): Render cart items atau "Keranjang kosong" */}
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const { colors } = useTheme();

  if (!user) return null;

  // TODO(human): Implementasikan Dashboard
  // - User info: name, role, login time
  // - Admin panel: jika role === "admin" → tampilkan panel admin

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
  // - Submit: login(name, role dari nama)
  // - "admin" di nama → role="admin", selain itu "user"

  return (
    <div style={{ padding: "24px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      {/* TODO(human): Form login */}
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  const { colors } = useTheme();

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div style={{ background: colors.bg, color: colors.text, minHeight: "100vh", fontFamily: "sans-serif" }}>
            <Navbar />
            <Dashboard />
            <ProductCatalog />
            <CartDrawer />
            <LoginForm />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

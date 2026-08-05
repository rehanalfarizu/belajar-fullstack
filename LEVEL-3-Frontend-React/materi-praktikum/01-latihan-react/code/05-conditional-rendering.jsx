// ============================================================
// SOAL 05 — CONDITIONAL RENDERING
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { useState } from "react";

// ============================================================
// SOAL 5A — AuthApp (Login/Logout dengan Conditional)
// State:
// - isLoading: boolean (default: true)
// - isLoggedIn: boolean (default: false)
// - user: object | null (default: null)
//
// Simulasi loading: setTimeout 1500ms → setIsLoading(false)
// Login: setUser({ name: "Andi Wijaya", email: "andi@email.com", role: "admin" }), setIsLoggedIn(true)
// Logout: setUser(null), setIsLoggedIn(false)
//
// Conditional patterns yang harus digunakan:
// 1. Early return: if (isLoading) return <LoadingSpinner />
// 2. Ternary: isLoggedIn ? <Dashboard /> : <LoginForm />
// 3. Logical AND: user.role === "admin" && <AdminPanel />
// 4. Logical OR: displayName || "Guest User"
// ============================================================

function AuthApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // TODO(human): Simulasi loading1500ms → setIsLoading(false)
  // TODO(human): handleLogin → setUser + setIsLoggedIn(true)
  // TODO(human): handleLogout → setUser(null) + setIsLoggedIn(false)

  // TODO(human): Early return jika isLoading →<LoadingSpinner />

  // TODO(human): Ternary — jika isLoggedIn →<LoggedInView /> :<LoginView />

  return (
    <div>
      {/* TODO(human): Render sesuai state */}
    </div>
  );
}

// ============================================================
// SOAL 5B — NotificationBell (Empty State& Badge)
// Component NotificationBell memiliki:
// - notifications: array of objects [{ id, text, read: boolean }]
// - unreadCount: derived — notifications.filter(n => !n.read).length
//
// Conditional rendering:
// - Jika notifications.length === 0 → <EmptyState> "Tidak ada notifikasi"
// - Jika unreadCount > 0 → tampilkan badge angka
// - Logical AND: {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
// ============================================================

const notifData = [
  { id: 1, text: "Pesan baru dari Budi", read: false },
  { id: 2, text: "Tugas React deadline besok", read: false },
  { id: 3, text: "Selamat! Anda lulus quiz", read: true },
];

function NotificationBell() {
  const [notifications] = useState(notifData);

  // TODO(human): Hitung unreadCount dari notifications
  const unreadCount = 0; // TODO(human): Ganti dengan derived value

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "24px" }}>🔔</span>

      {/* TODO(human): Badge unread count — hanya tampil jika unreadCount > 0 */}
      {/* TODO(human): Empty state — jika tidak ada notifications */}

      <span>{notifications.length} total notifikasi</span>
    </div>
  );
}

// ============================================================
// SOAL 5C — PermissionGate (Role-based Rendering)
// Component PermissionGate menerima: user, children, requiredRole
//
// Jika user.role === requiredRole → render children
// Jika tidak → render<AccessDenied />
//
// Contoh penggunaan:
// <PermissionGate user={currentUser} requiredRole="admin">
//   <AdminPanel />
// </PermissionGate>
// ============================================================

function PermissionGate({ user, children, requiredRole }) {
  // TODO(human): Cek apakah user.role === requiredRole
  // Jika ya → render children
  // Jika tidak → render AccessDenied

  return (
    <div>
      {/* TODO(human): Render children atau AccessDenied */}
    </div>
  );
}

function AccessDenied() {
  return (
    <div style={{ background: "#fee2e2", padding: "16px", borderRadius: "8px", color: "#991b1b" }}>
      <strong>Akses Ditolak</strong>
      <p>Anda tidak memiliki izin untuk melihat konten ini.</p>
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Demo: Conditional Rendering</h1>

      {/* SOAL 5A */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 5A — AuthApp</h2>
        <AuthApp />
      </section>

      {/* SOAL 5B */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 5B — NotificationBell</h2>
        <NotificationBell />
      </section>

      {/* SOAL 5C */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 5C — PermissionGate</h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => setCurrentUser({ name: "Andi", role: "admin" })}>
            Login Admin
          </button>
          <button onClick={() => setCurrentUser({ name: "Budi", role: "user" })}>
            Login User
          </button>
          <button onClick={() => setCurrentUser(null)}>
            Logout
          </button>
        </div>
        <PermissionGate user={currentUser} requiredRole="admin">
          <div style={{ background: "#d1fae5", padding: "16px", borderRadius: "8px", color: "#065f46" }}>
            <strong>🔐 Admin Panel</strong>
            <p>Konten yang hanya bisa dilihat oleh admin.</p>
          </div>
        </PermissionGate>
      </section>
    </div>
  );
}

export default App;

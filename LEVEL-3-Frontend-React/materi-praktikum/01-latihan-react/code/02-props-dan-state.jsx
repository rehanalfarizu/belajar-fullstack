// ============================================================
// SOAL 02 — PROPS DAN STATE
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React from "react";

// ============================================================
// SOAL 2A — UserCard Component (Destructuring Props)
// Component menerima: name, role, avatar, children
// - Avatar: gunakan img dengan fallback "https://i.pravatar.cc/150"
// - children prop: tampilkan di bagian bawah card ( setelah info user )
// - Style: card dengan border, padding, border-radius, shadow
// ============================================================

function UserCard({ name, role, avatar, children }) {
  // TODO(human): Buat UserCard component
  // - Destructure props: name, role, avatar, children
  // - Default role: "User" ( gunakan default parameter )
  // - Tampilkan avatar, name, role
  // - Jika ada children, render di bagian bawah card
  // - Gunakan inline style untuk styling card

  return (
    <div>
      {/* TODO(human): Render UserCard di sini */}
    </div>
  );
}

// ============================================================
// SOAL 2B — Interactive User List
// App component merender 3 UserCard dengan data berbeda
// Setiap card punya children: tombol Follow dan Message
// Follow: alert(`Follow ${name}!`)
// Message: alert(`Kirim pesan ke ${name}`)
// ============================================================

function App() {
  const users = [
    { id: 1, name: "Andi Wijaya", role: "Fullstack Developer", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 2, name: "Budi Santoso", role: "Frontend Developer", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 3, name: "Citra Dewi", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

  const handleFollow = (name) => {
    // TODO(human): Implementasikan handler follow
    alert(`Follow ${name}!`);
  };

  const handleMessage = (name) => {
    // TODO(human): Implementasikan handler message
    alert(`Kirim pesan ke ${name}`);
  };

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "32px" }}>Team Profile</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
      }}>
        {/* TODO(human): Render 3 UserCard dengan data dari array users */}
        {/* Setiap card punya children: tombol Follow dan Message */}
      </div>
    </div>
  );
}

export default App;

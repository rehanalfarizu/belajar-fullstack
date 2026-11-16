// ============================================================
// FILE: 03-latihan-router/code/04-protected-routes.jsx
// MATERI: Protected Routes (soal/04-protected-routes.md)
// ============================================================
import { createContext, useContext, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

// ============================================================
// Soal 4A — AuthContext
// ============================================================
// Nilai: user, isAuthenticated (turunan dari user), login, logout
//
// TODO(human): buat AuthContext, AuthProvider, dan hook useAuth.
// Petunjuk: isAuthenticated tidak perlu jadi state terpisah.
// Petunjuk: apa yang terjadi kalau useAuth dipakai di luar Provider?
//
// Selesai kalau: komponen mana pun bisa membaca user dan memanggil
// login/logout, dan pemakaian di luar Provider memberi pesan error jelas.

// ============================================================
// Soal 4B — Penjaga route
// ============================================================
// TODO(human): buat komponen penjaga untuk route yang butuh login.
// Petunjuk: simpan lokasi tujuan awal supaya bisa kembali setelah login.
// Petunjuk: pelajari <Outlet /> untuk membungkus banyak route sekaligus.
//
// Selesai kalau: membuka /dashboard saat belum login mengalihkan ke /login.

// ============================================================
// Soal 4C — LoginPage
// ============================================================
// TODO(human): form login yang setelah berhasil menuju lokasi asal
// (atau /dashboard kalau tidak ada).
//
// Selesai kalau: login dari /dashboard langsung kembali ke /dashboard.

// ============================================================
// Soal 4D dan 4E — Navbar dan PublicRoute
// ============================================================
// TODO(human): Navbar yang berbeda untuk user login/tidak, dan PublicRoute
// yang mengalihkan user yang sudah login keluar dari /login.
// Bonus: penjaga berdasarkan role (mis. /admin hanya untuk role "admin").
//
// Selesai kalau: tidak ada redirect berputar (infinite loop) di skenario apa pun.

export default function ProtectedRoutesExample() {
  // TODO(human): bungkus <Routes> dengan AuthProvider dan pasang rute-rutenya.
  return <Routes>{/* TODO(human): Route /login, /dashboard, /profile, 404 */}</Routes>;
}

// Route guard hanya membantu navigasi/UX. Backend tetap wajib memeriksa
// authentication dan authorization pada setiap request yang dilindungi.

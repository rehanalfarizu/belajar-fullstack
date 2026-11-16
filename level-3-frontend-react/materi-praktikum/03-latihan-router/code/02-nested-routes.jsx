// ============================================================
// FILE: 03-latihan-router/code/02-useParams.jsx
// MATERI: React Router — useParams, Nested Routes, Programmatic Nav
// ============================================================
import { Routes, Route, Link, NavLink, Outlet, useParams, useNavigate, useLocation } from "react-router-dom";

// ============================================================
// TODO: ProductList Component
// ============================================================
// List semua produk dengan Link ke detail page
//
// Data: array of { id, name, price, category }
// Link: <Link to={`/products/${product.id}`}>Lihat Detail</Link>
//
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

const PRODUCTS = [
  { id: "P001", name: "Laptop ASUS ROG", price: 18500000, category: "elektronik", description: "Laptop gaming dengan spesifikasi tinggi." },
  { id: "P002", name: "Mechanical Keyboard", price: 1200000, category: "aksesoris", description: "Keyboard mechanical untuk kenyamanan mengetik." },
  { id: "P003", name: "Wireless Mouse", price: 350000, category: "aksesoris", description: "Mouse nirkabel dengan presisi tinggi." },
  { id: "P004", name: "Monitor 27 inch", price: 4500000, category: "elektronik", description: "Monitor 4K untuk produktivitas." },
];

export function ProductList() {
  // TODO: Implementasikan ProductList seperti di atas
  return <div>ProductList</div>;
}

// ============================================================
// TODO: ProductDetail Component — useParams
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

export function ProductDetail({ products }) {
  // TODO: Ambil id dari useParams()
  // TODO: Cari product dari products array berdasarkan id
  // TODO: Jika tidak ditemukan, tampilkan "Produk tidak ditemukan"
  // TODO: Render product detail
  // TODO: Link kembali ke /products

  return <div>ProductDetail</div>;
}

// ============================================================
// TODO: UserList + UserProfile dengan useParams
// ============================================================
// URL pattern: /users/:id
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

const USERS = [
  { id: "U001", name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: "U002", name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: "U003", name: "Charlie Brown", email: "charlie@example.com", role: "moderator" },
];

export function UserList() {
  // TODO: Implementasikan UserList
  return <div>UserList</div>;
}

export function UserProfile() {
  // TODO: Implementasikan UserProfile dengan useParams
  return <div>UserProfile</div>;
}

// ============================================================
// TODO: Blog System dengan useParams
// ============================================================
// URL pattern: /blog/:year/:month/:slug
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

export function BlogPost() {
  // TODO: Ambil year, month, slug dari useParams()
  // TODO: Render blog post dengan informasi params

  return <div>BlogPost</div>;
}

// ============================================================
// TODO: Programmatic Navigation — Login Flow
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

export function LoginPage() {
  // TODO: useNavigate, useLocation
  // TODO: Redirect ke location.state.from atau /dashboard
  return <div>LoginPage</div>;
}

export function DashboardPage() {
  // TODO: useLocation untuk baca state
  // TODO: Tampilkan welcome message dari state
  return <div>DashboardPage</div>;
}

// ============================================================
// TODO: Protected Route Component
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

import { useEffect } from "react";

export function ProtectedRoute({ children, isAuthenticated = false }) {
  // TODO: useNavigate, useLocation
  // TODO: useEffect untuk redirect jika tidak authenticated
  // TODO: Navigate ke /login dengan state { from: location.pathname }
  // TODO: Jika authenticated, return children

  return children;
}

// ============================================================
// TODO: App Router dengan semua routes
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

export function AppRouter() {
  // TODO: Implementasikan AppRouter dengan semua routes di atas
  return null;
}
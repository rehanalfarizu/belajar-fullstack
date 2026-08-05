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
// function ProductList({ products }) {
//   return (
//     <div className="product-list">
//       <h1>Daftar Produk</h1>
//       <div className="product-grid">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <h3>{product.name}</h3>
//             <p>Harga: Rp{product.price.toLocaleString("id-ID")}</p>
//             <p>Kategori: {product.category}</p>
//             <Link to={`/products/${product.id}`}>Lihat Detail</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// ============================================================

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
// function ProductDetail({ products }) {
//   const { id } = useParams();
//   const product = products.find(p => p.id === id);
//
//   if (!product) return <p>Produk tidak ditemukan</p>;
//
//   return (
//     <div className="product-detail">
//       <h1>{product.name}</h1>
//       <p>ID: {product.id}</p>
//       <p>Harga: Rp{product.price.toLocaleString("id-ID")}</p>
//       <p>Kategori: {product.category}</p>
//       <p>{product.description}</p>
//       <Link to="/products">Kembali ke Daftar</Link>
//     </div>
//   );
// }
// ============================================================

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
//
// function UserProfile({ users }) {
//   const { id } = useParams();
//   const user = users.find(u => u.id === id);
//
//   if (!user) return <p>User tidak ditemukan</p>;
//
//   return (
//     <div className="user-profile">
//       <h1>{user.name}</h1>
//       <p>Email: {user.email}</p>
//       <p>Role: {user.role}</p>
//       <Link to="/users">Kembali ke Daftar</Link>
//     </div>
//   );
// }
//
// function UserList({ users }) {
//   return (
//     <div className="user-list">
//       <h1>Daftar User</h1>
//       {users.map(user => (
//         <div key={user.id} className="user-item">
//           <h3>{user.name}</h3>
//           <p>{user.email}</p>
//           <Link to={`/users/${user.id}`}>Lihat Profil</Link>
//         </div>
//       ))}
//     </div>
//   );
// }
// ============================================================

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
//
// function BlogPost() {
//   const { year, month, slug } = useParams();
//
//   return (
//     <div className="blog-post">
//       <p>Year: {year}, Month: {month}</p>
//       <h1>Slug: {slug}</h1>
//       <p>Artikel dengan slug "{slug}" pada {month}/{year}</p>
//     </div>
//   );
// }
// ============================================================

export function BlogPost() {
  // TODO: Ambil year, month, slug dari useParams()
  // TODO: Render blog post dengan informasi params

  return <div>BlogPost</div>;
}

// ============================================================
// TODO: Programmatic Navigation — Login Flow
// ============================================================
// function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/dashboard";
//
//   const handleLogin = () => {
//     // Simulate login
//     navigate(from, { replace: true });
//   };
//
//   return (
//     <div className="login-page">
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Login Sekarang</button>
//     </div>
//   );
// }
//
// function DashboardPage() {
//   const location = useLocation();
//   const message = location.state?.message;
//
//   return (
//     <div className="dashboard-page">
//       {message && <div className="alert">{message}</div>
//       <h1>Dashboard</h1>
//       <p>Welcome to the dashboard!</p>
//     </div>
//   );
// }
// ============================================================

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
// function ProtectedRoute({ children, isAuthenticated }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login", { state: { from: location.pathname }, replace: true });
//     }
//   }, [isAuthenticated, navigate, location]);
//
//   if (!isAuthenticated) return null;
//   return children;
// }
// ============================================================

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
// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Layout />}>
//       <Route index element={<HomePage />} />
//       <Route path="products" element={<ProductList />} />
//       <Route path="products/:id" element={<ProductDetail products={PRODUCTS} />} />
//       <Route path="users" element={<UserList />} />
//       <Route path="users/:id" element={<UserProfile />} />
//       <Route path="blog/:year/:month/:slug" element={<BlogPost />} />
//       <Route path="dashboard" element={
//         <ProtectedRoute isAuthenticated={false}>
//           <DashboardPage />
//         </ProtectedRoute>
//       } />
//       <Route path="login" element={<LoginPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Route>
//   </Routes>
// </BrowserRouter>
// ============================================================

export function AppRouter() {
  // TODO: Implementasikan AppRouter dengan semua routes di atas
  return null;
}
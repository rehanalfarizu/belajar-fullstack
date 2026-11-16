# Solusi — JANGAN DIBUKA DULU
> **Stop.** File ini berisi jawaban lengkap latihan di folder ini. Kalau kamu buka sekarang, otakmu cuma belajar *membaca* jawaban, bukan *menemukannya*.
>
> Buka hanya setelah:
>
> 1. kamu sudah mencoba sendiri minimal 30 menit,
> 2. kamu sudah menulis di jurnal apa yang kamu coba dan di mana macetnya,
> 3. versimu sudah jalan (atau kamu benar-benar buntu setelah mengikuti tangga "Petunjuk Kalau Macet" di `TUGAS.md`).
>
> Setelah membuka: **jangan salin**. Tutup file ini, ketik ulang dari ingatan, lalu bandingkan keputusan desainnya dengan punyamu dan catat bedanya.
Isi di bawah adalah kode asli starter sebelum dikosongkan, utuh tanpa diubah. Kode lama itu mengandung komentar `SOLUSI`, `Full Implementation`, atau fungsi `working*` — semuanya jawaban.

---

## `code/03-protected-routes.jsx`

````jsx
// ============================================================
// SOAL 03 — Protected Routes (React Router)
// ============================================================
// Install frontend: npm create vite@latest client -- --template react
// Jalankan frontend: cd client && npm install && npm run dev
// Dependencies: npm install react-router-dom
// Backend harus jalan di: http://localhost:3001/api
// ============================================================

// ============================================================
// BACKEND: Minimal Express server (for testing protected routes)
// ============================================================
// Run: node code/03-protected-routes.js (or reuse from 01-jwt-auth.js)

// TODO(human): gunakan backend cookie HttpOnly dari latihan 01/02.
// Backend minimal harus:
// 1. mengambil JWT_SECRET dari environment dan gagal start bila tidak valid;
// 2. menyimpan password sebagai hash, bukan plaintext;
// 3. mengatur cookie session HttpOnly + SameSite (+ Secure di production);
// 4. menyediakan POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout;
// 5. memakai CORS allowlist + credentials dan memitigasi CSRF;
// 6. memeriksa role/ownership di server pada setiap resource sensitif.
//
// Frontend memanggil API dengan credentials: "include". ProtectedRoute hanya
// mengatur UX navigasi; ia bukan pengganti authorization backend.
// ============================================================

// Place this backend code above in a separate file if needed.
// The focus of this exercise is the FRONTEND implementation below.


// ============================================================
// FRONTEND: React — Protected Route Components
// ============================================================

// TODO(human): src/components/ProtectedRoute.jsx
// Route wrapper: redirects to /login if not authenticated
// ============================================================
// SOLUSI:
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// // Protect routes that require authentication
// export function ProtectedRoute() {
//   const { isAuthenticated, isLoading } = useAuth();
//
//   if (isLoading) {
//     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
//   }
//
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//
//   return <Outlet />;
// }
// ============================================================

// TODO(human): src/components/GuestRoute.jsx
// Route wrapper: redirects to /dashboard if ALREADY authenticated
// Use for login/register pages so authenticated users can't visit them
// ============================================================
// SOLUSI:
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// // Only allow guests (not logged in) — redirects to /dashboard if logged in
// export function GuestRoute() {
//   const { isAuthenticated, isLoading } = useAuth();
//
//   if (isLoading) {
//     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
//   }
//
//   if (isAuthenticated) {
//     const from = location.state?.from?.pathname || '/dashboard';
//     return <Navigate to={from} replace />;
//   }
//
//   return <Outlet />;
// }
// ============================================================

// TODO(human): src/components/AdminRoute.jsx
// Route wrapper: only allows users with role === 'admin'
// Redirects to / if user is not admin
// ============================================================
// SOLUSI:
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// export function AdminRoute() {
//   const { user, isAuthenticated, isLoading } = useAuth();
//
//   if (isLoading) {
//     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
//   }
//
//   if (!isAuthenticated || user?.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }
//
//   return <Outlet />;
// }
// ============================================================

// TODO(human): src/components/RoleRoute.jsx (bonus)
// Generic role-based route: accepts allowedRoles array
// ============================================================
// SOLUSI:
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// export function RoleRoute({ allowedRoles = [] }) {
//   const { user, isLoading } = useAuth();
//
//   if (isLoading) return <div>Loading...</div>;
//   if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
//   if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }
//   return <Outlet />;
// }
// ============================================================


// ============================================================
// FRONTEND: App.jsx — Complete Route Configuration
// ============================================================

// TODO(human): src/App.jsx
// ============================================================
// SOLUSI:
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import { GuestRoute } from './components/GuestRoute';
// import { AdminRoute } from './components/AdminRoute';
//
// import { Home } from './pages/Home';
// import { LoginPage } from './pages/LoginPage';
// import { RegisterPage } from './pages/RegisterPage';
// import { Dashboard } from './pages/Dashboard';
// import { Profile } from './pages/Profile';
// import { Settings } from './pages/Settings';
// import { AdminPanel } from './pages/AdminPanel';
// import { Navbar } from './components/Navbar';
//
// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           {/* Public routes — everyone can access */}
//           <Route path="/" element={<Home />} />
//
//           {/* Guest-only routes — redirect to dashboard if logged in */}
//           <Route element={<GuestRoute />}>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//           </Route>
//
//           {/* Protected routes — must be logged in */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>
//
//           {/* Admin-only routes */}
//           <Route element={<AdminRoute />}>
//             <Route path="/admin" element={<AdminPanel />} />
//           </Route>
//
//           {/* 404 */}
//           <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h1>404 — Page Not Found</h1><a href="/">Kembali ke Home</a></div>} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
// ============================================================

// TODO(human): src/components/Navbar.jsx
// ============================================================
// SOLUSI:
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// export function Navbar() {
//   const { isAuthenticated, user, logout } = useAuth();
//
//   return (
//     <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f8f8f8', borderBottom: '1px solid #ddd' }}>
//       <Link to="/">Home</Link>
//       {isAuthenticated ? (
//         <>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/profile">Profile</Link>
//           {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
//           <span style={{ marginLeft: 'auto' }}>Halo, {user?.name}</span>
//           <button onClick={logout} style={{ border: 'none', background: '#dc3545', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }
// ============================================================

// TODO(human): src/pages/Profile.jsx — protected page example
// ============================================================
// SOLUSI:
// import { useAuth } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';
//
// export function Profile() {
//   const { user, isAuthenticated, isLoading } = useAuth();
//
//   if (isLoading) return <div>Loading...</div>;
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//
//   return (
//     <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
//       <h1>Profile</h1>
//       <div style={{ background: '#f8f8f8', padding: '1.5rem', borderRadius: 8 }}>
//         <p><strong>Nama:</strong> {user?.name}</p>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>Role:</strong> {user?.role}</p>
//       </div>
//     </div>
//   );
// }
// ============================================================

// TODO(human): src/pages/LoginPage.jsx — redirect to previous page after login
// ============================================================
// SOLUSI:
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// export function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   const from = location.state?.from?.pathname || '/dashboard';
//
//   async function handleLogin(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       await login(email, password);
//       navigate(from, { replace: true }); // redirect back to previous page
//     } catch (err) { setError(err.message); }
//     finally { setLoading(false); }
//   }
//
//   return (
//     <div style={{ maxWidth: 400, margin: '4rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: 8 }}>
//       <h2>Login</h2>
//       {error && <div style={{ background: '#fee', color: '#c00', padding: '0.75rem', borderRadius: 4 }}>{error}</div>}
//       <p style={{ fontSize: '0.9rem', color: '#666' }}>Redirected from: {from}</p>
//       <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" style={{ padding: '0.6rem', borderRadius: 4, border: '1px solid #ccc', width: '100%' }} />
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" style={{ padding: '0.6rem', borderRadius: 4, border: '1px solid #ccc', width: '100%' }} />
//         <button type="submit" disabled={loading} style={{ padding: '0.75rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>{loading ? 'Loading...' : 'Login'}</button>
//       </form>
//     </div>
//   );
// }
// ============================================================
````

---

## `code/04-role-based-access.jsx`

````jsx
// ============================================================
// SOAL 04 — Role-Based Access Control (RBAC)
// ============================================================
// Install: npm install react-router-dom
// Jalankan frontend: cd client && npm start
// Backend harus jalan di: http://localhost:3001/api
// ============================================================

// ============================================================
// BACKEND: Express + JWT with Role Checks (add to any auth server)
// ============================================================

// TODO(human): Middleware requireRole(...allowedRoles)
// Generic role-check middleware factory
// Usage: app.delete('/api/posts/:id', authMiddleware, requireRole('admin', 'editor'), handler)
// ============================================================
// SOLUSI:
// function requireRole(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ error: `Akses ditolak. Diperlukan role: ${allowedRoles.join(', ')}` });
//     }
//     next();
//   };
// }
//
// // Example usage:
// // app.get('/api/admin/stats', authMiddleware, requireRole('admin'), handler);
// // app.delete('/api/posts/:id', authMiddleware, requireRole('admin', 'editor'), handler);
// // app.post('/api/posts', authMiddleware, requireRole('admin', 'editor', 'author'), handler);
// ============================================================

// TODO(human): Role hierarchy — owner > admin > editor > author > user
// Middleware: requireMinRole(minRole)
// ============================================================
// SOLUSI:
// const ROLE_LEVEL = { user: 1, author: 2, editor: 3, admin: 4, owner: 5 };
//
// function requireMinRole(minRole) {
//   return (req, res, next) => {
//     if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
//     const userLevel = ROLE_LEVEL[req.user.role] || 0;
//     const minLevel = ROLE_LEVEL[minRole] || 0;
//     if (userLevel < minLevel) return res.status(403).json({ error: `Minimal role: ${minRole}` });
//     next();
//   };
// }
// ============================================================


// ============================================================
// FRONTEND: React — Role-Based Rendering & Navigation
// ============================================================

// TODO(human): src/context/AuthContext.jsx — full RBAC auth context
// ============================================================
// SOLUSI:
// import { createContext, useContext, useReducer, useEffect } from 'react';
//
// const AuthContext = createContext(null);
//
// const ROLE_LEVEL = { user: 1, author: 2, editor: 3, admin: 4 };
//
// const initialState = { user: null, isAuthenticated: false, isLoading: true };
// const ACTIONS = { LOGIN: 'LOGIN', LOGOUT: 'LOGOUT', SET_LOADING: 'SET_LOADING', RESTORE: 'RESTORE' };
//
// function authReducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.LOGIN: return { ...state, ...action.payload, isAuthenticated: true, isLoading: false };
//     case ACTIONS.LOGOUT: return { ...initialState, isLoading: false };
//     case ACTIONS.SET_LOADING: return { ...state, isLoading: action.payload };
//     case ACTIONS.RESTORE: return { ...state, ...action.payload, isAuthenticated: true, isLoading: false };
//     default: return state;
//   }
// }
//
// export function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//
//   useEffect(() => {
//     fetch('http://localhost:3001/api/auth/me', { credentials: 'include' })
//       .then(async res => {
//         if (!res.ok) throw new Error('No active session');
//         return res.json();
//       })
//       .then(data => dispatch({ type: ACTIONS.RESTORE, payload: { user: data.user } }))
//       .catch(() => dispatch({ type: ACTIONS.SET_LOADING, payload: false }));
//   }, []);
//
//   const login = async (email, password) => {
//     const res = await fetch('http://localhost:3001/api/auth/login', {
//       method: 'POST', headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);
//     dispatch({ type: ACTIONS.LOGIN, payload: { user: data.user } });
//     return data.user;
//   };
//
//   const logout = async () => {
//     await fetch('http://localhost:3001/api/auth/logout', {
//       method: 'POST',
//       credentials: 'include',
//     });
//     dispatch({ type: ACTIONS.LOGOUT });
//   };
//
//   const hasRole = (role) => state.user?.role === role;
//
//   const hasMinRole = (minRole) => (ROLE_LEVEL[state.user?.role] || 0) >= (ROLE_LEVEL[minRole] || 0);
//
//   const hasAnyRole = (...roles) => roles.includes(state.user?.role);
//
//   return (
//     <AuthContext.Provider value={{ ...state, login, logout, hasRole, hasMinRole, hasAnyRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
//
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be within AuthProvider');
//   return ctx;
// }
// ============================================================

// TODO(human): src/components/HasRole.jsx — conditional rendering by role
// <HasRole role="admin"> <AdminPanel /> </HasRole>
// <HasRole minRole="editor"> <EditorTools /> </HasRole>
// ============================================================
// SOLUSI:
// import { useAuth } from '../context/AuthContext';
//
// // Single role check
// export function HasRole({ role, children, fallback = null }) {
//   const { user, hasRole } = useAuth();
//   if (!user || !hasRole(role)) return fallback;
//   return children;
// }
//
// // Minimum role check
// export function HasMinRole({ minRole, children, fallback = null }) {
//   const { user, hasMinRole } = useAuth();
//   if (!user || !hasMinRole(minRole)) return fallback;
//   return children;
// }
//
// // Any of roles check
// export function HasAnyRole({ roles, children, fallback = null }) {
//   const { user, hasAnyRole } = useAuth();
//   if (!user || !hasAnyRole(...roles)) return fallback;
//   return children;
// }
// ============================================================

// TODO(human): src/components/Navbar.jsx — role-based navigation
// ============================================================
// SOLUSI:
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
//
// export function Navbar() {
//   const { isAuthenticated, user, logout } = useAuth();
//   const navigate = useNavigate();
//
//   function handleLogout() {
//     logout();
//     navigate('/login');
//   }
//
//   return (
//     <nav style={{ display: 'flex', gap: '1rem', padding: '1rem 2rem', background: '#343a40', color: '#fff', alignItems: 'center' }}>
//       <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>MyApp</Link>
//
//       {isAuthenticated ? (
//         <>
//           <Link to="/dashboard" style={{ color: '#adb5bd', textDecoration: 'none' }}>Dashboard</Link>
//           <Link to="/profile" style={{ color: '#adb5bd', textDecoration: 'none' }}>Profile</Link>
//
//           {/* Editor+ can access content management */}
//           <HasMinRole minRole="editor">
//             <Link to="/posts" style={{ color: '#adb5bd', textDecoration: 'none' }}>Posts</Link>
//           </HasMinRole>
//
//           {/* Admin only */}
//           <HasRole role="admin">
//             <Link to="/admin" style={{ color: '#ffc107', textDecoration: 'none' }}>Admin</Link>
//           </HasRole>
//
//           <span style={{ marginLeft: 'auto', color: '#adb5bd' }}>
//             {user?.name} <span style={{ background: user?.role === 'admin' ? '#dc3545' : '#6c757d', padding: '2px 8px', borderRadius: 4, fontSize: '0.8rem' }}>{user?.role}</span>
//           </span>
//           <button onClick={handleLogout} style={{ border: '1px solid #dc3545', background: 'transparent', color: '#dc3545', padding: '0.25rem 0.75rem', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login" style={{ marginLeft: 'auto', color: '#fff', textDecoration: 'none' }}>Login</Link>
//           <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }
// ============================================================

// TODO(human): src/pages/AdminPanel.jsx — admin-only page
// ============================================================
// SOLUSI:
// import { useAuth } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';
//
// export function AdminPanel() {
//   const { user, isAuthenticated, isLoading, hasRole } = useAuth();
//
//   if (isLoading) return <div>Loading...</div>;
//   if (!isAuthenticated) return <Navigate to="/login" />;
//   if (!hasRole('admin')) return <Navigate to="/" />;
//
//   return (
//     <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
//       <h1>Admin Panel</h1>
//       <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem' }}>
//         <strong>Welcome, {user?.name}</strong> — Anda memiliki akses admin.
//       </div>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
//         <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: 8 }}>
//           <h3>Total Users</h3>
//           <p style={{ fontSize: '2rem', margin: 0 }}>142</p>
//         </div>
//         <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: 8 }}>
//           <h3>Total Posts</h3>
//           <p style={{ fontSize: '2rem', margin: 0 }}>389</p>
//         </div>
//         <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: 8 }}>
//           <h3>Active Sessions</h3>
//           <p style={{ fontSize: '2rem', margin: 0 }}>23</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// ============================================================

// TODO(human): src/pages/Dashboard.jsx — role-based dashboard content
// ============================================================
// SOLUSI:
// import { useAuth } from '../context/AuthContext';
// import { HasRole, HasMinRole, HasAnyRole } from '../components/HasRole';
// import { Navigate } from 'react-router-dom';
//
// export function Dashboard() {
//   const { user, isAuthenticated, isLoading, hasMinRole } = useAuth();
//
//   if (isLoading) return <div>Loading...</div>;
//   if (!isAuthenticated) return <Navigate to="/login" />;
//
//   return (
//     <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
//       <h1>Dashboard</h1>
//       <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: 8, marginBottom: '1.5rem' }}>
//         <h2>Halo, {user?.name}!</h2>
//         <p>Role Anda: <strong>{user?.role}</strong></p>
//         <p>Level: <strong>{user && { user: 1, author: 2, editor: 3, admin: 4 }[user.role]}</strong></p>
//       </div>
//
//       {/* Content visible to all authenticated users */}
//       <div style={{ background: '#e7f1ff', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
//         <h3>Profil Saya</h3>
//         <p>Email: {user?.email}</p>
//       </div>
//
//       {/* Content for authors and above */}
//       <HasMinRole minRole="author">
//         <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
//           <h3>Panel Penulis</h3>
//           <p>Anda bisa membuat dan mengelola postingan.</p>
//           <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Buat Post Baru</button>
//         </div>
//       </HasMinRole>
//
//       {/* Content for editors and above */}
//       <HasMinRole minRole="editor">
//         <div style={{ background: '#d1ecf1', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
//           <h3>Panel Editor</h3>
//           <p>Anda bisa review dan publish postingan.</p>
//         </div>
//       </HasMinRole>
//
//       {/* Admin only */}
//       <HasRole role="admin">
//         <div style={{ background: '#f8d7da', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
//           <h3>Admin Panel</h3>
//           <p>Kelola user dan sistem.</p>
//           <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Masuk Admin</button>
//         </div>
//       </HasRole>
//
//       {/* Multiple roles */}
//       <HasAnyRole roles={['admin', 'editor']}>
//         <div style={{ background: '#d4edda', padding: '1rem', borderRadius: 8 }}>
//           <h3>Moderasi Konten</h3>
//           <p>Hanya untuk Admin dan Editor.</p>
//         </div>
//       </HasAnyRole>
//     </div>
//   );
// }
// ============================================================

// TODO(human): Role permission matrix reference
// ============================================================
/*
| Feature              | user | author | editor | admin |
|----------------------|------|--------|--------|-------|
| Lihat dashboard      |  Y   |   Y    |   Y    |   Y   |
| Lihat profil sendiri  |  Y   |   Y    |   Y    |   Y   |
| Buat post            |  N   |   Y    |   Y    |   Y   |
| Edit post sendiri     |  N   |   Y    |   Y    |   Y   |
| Edit semua post      |  N   |   N    |   Y    |   Y   |
| Publish post         |  N   |   N    |   Y    |   Y   |
| Hapus post           |  N   |   N    |   N    |   Y   |
| Kelola user          |  N   |   N    |   N    |   Y   |
| Admin panel          |  N   |   N    |   N    |   Y   |
*/
````

---

# Lampiran: file yang dipindahkan belakangan

## `code/01-axios-client.js`

````js
// ============================================================
// 01 — AXIOS CLIENT UNTUK AUTH BERBASIS HTTPONLY COOKIE
// ============================================================
// Tempatkan file ini di project Vite, misalnya src/lib/api.js.
// Server harus mengatur CORS origin secara eksplisit dan credentials: true.

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Metadata durasi berguna saat development. Jangan log body/header sensitif.
api.interceptors.request.use((config) => {
  config.metadata = { startedAt: performance.now() };
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Router/AuthProvider dapat mendengar event ini dan me-reset user state.
      // Hindari redirect langsung dari networking layer karena sulit dites dan
      // dapat membuat redirect loop pada endpoint login/check-session.
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export const authAPI = {
  register: (input) => api.post("/auth/register", input),
  login: (input) => api.post("/auth/login", input),
  getMe: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
};

export const postsAPI = {
  getAll: (params = {}) => api.get("/posts", { params }),
  getOne: (id) => api.get(`/posts/${encodeURIComponent(id)}`),
  create: (input) => api.post("/posts", input),
  update: (id, input) =>
    api.put(`/posts/${encodeURIComponent(id)}`, input),
  remove: (id) => api.delete(`/posts/${encodeURIComponent(id)}`),
};

export function normalizeApiError(error) {
  if (!axios.isAxiosError(error)) {
    return {
      code: "UNKNOWN",
      message: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }

  if (!error.response) {
    return {
      code: "NETWORK_ERROR",
      message: "Tidak dapat terhubung ke server.",
    };
  }

  const byStatus = {
    400: ["BAD_REQUEST", "Request tidak valid."],
    401: ["UNAUTHORIZED", "Sesi berakhir. Silakan login kembali."],
    403: ["FORBIDDEN", "Kamu tidak memiliki akses."],
    404: ["NOT_FOUND", "Data tidak ditemukan."],
    409: ["CONFLICT", "Data bertentangan dengan state terbaru."],
    422: ["VALIDATION_ERROR", "Periksa kembali input."],
    429: ["RATE_LIMITED", "Terlalu banyak request. Coba lagi nanti."],
    500: ["SERVER_ERROR", "Server mengalami gangguan."],
  };
  const [code, fallbackMessage] = byStatus[error.response.status] ?? [
    "HTTP_ERROR",
    "Request gagal.",
  ];

  return {
    code,
    message: error.response.data?.message ?? fallbackMessage,
    status: error.response.status,
    fields: error.response.data?.errors ?? null,
  };
}

// Latihan:
// 1. Tambahkan AbortController melalui config.signal.
// 2. Cegah beberapa refresh request berjalan bersamaan.
// 3. Tulis test untuk 401, 422, network error, dan timeout.
````

## `code/02-jwt-client-side.js`

````js
// ============================================================
// 02 — BROWSER AUTH SERVICE
// ============================================================
// Nama file dipertahankan agar urutan praktikum stabil. Implementasi modern
// tidak membaca JWT dari JavaScript. Server menyimpan session/refresh token
// dalam cookie HttpOnly; browser mengirimkannya dengan credentials: "include".

const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export class AuthService {
  constructor(fetchImplementation = fetch) {
    this.fetch = fetchImplementation;
  }

  async request(path, options = {}) {
    const response = await this.fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      const error = new Error(body?.message ?? `HTTP ${response.status}`);
      error.status = response.status;
      error.fields = body?.errors ?? null;
      throw error;
    }

    return body;
  }

  async login(email, password) {
    const body = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Simpan profil user dalam React state. Jangan simpan bearer/refresh token
    // di localStorage. Cookie HttpOnly diatur oleh response server.
    return body.user;
  }

  async register(input) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async getCurrentUser() {
    try {
      const body = await this.request("/auth/me");
      return body.user;
    } catch (error) {
      if (error.status === 401) return null;
      throw error;
    }
  }

  async refreshSession() {
    try {
      await this.request("/auth/refresh", { method: "POST" });
      return true;
    } catch (error) {
      if (error.status === 401) return false;
      throw error;
    }
  }

  async logout() {
    // Server harus menghapus/merotasi session atau refresh token lalu mengirim
    // Set-Cookie dengan Max-Age=0. Reset state client setelah request selesai.
    await this.request("/auth/logout", { method: "POST" });
  }
}

export const authService = new AuthService();

// Security checklist server:
// - HttpOnly, Secure di production, SameSite sesuai topologi.
// - CORS origin eksplisit + credentials true; jangan origin "*".
// - Proteksi CSRF untuk cookie auth.
// - Rotasi/revocation refresh token.
// - Rate limit login/refresh/reset password.
// - Authorization tetap diperiksa pada setiap endpoint.
````

## `code/05-auth-context-complete.jsx`

````jsx
// ============================================================
// 05 — AUTH CONTEXT LENGKAP DENGAN HTTPONLY COOKIE
// ============================================================
// Dependency: React 19 dan client dari 01-axios-client.js.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authAPI, normalizeApiError } from "./01-axios-client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const checkSession = useCallback(async () => {
    setStatus("loading");

    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
      setStatus("authenticated");
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        setStatus("guest");
        return;
      }

      setStatus("error");
      throw error;
    }
  }, []);

  useEffect(() => {
    checkSession().catch(() => {
      // Error detail dapat dikirim ke observability layer.
    });
  }, [checkSession]);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
      setStatus("guest");
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setUser(response.data.user);
      setStatus("authenticated");
      return response.data.user;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }, []);

  const register = useCallback(async (input) => {
    try {
      const response = await authAPI.register(input);
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } finally {
      // Reset local state sekalipun server sedang gagal. Server harus memiliki
      // expiry/revocation sehingga cookie tidak hidup selamanya.
      setUser(null);
      setStatus("guest");
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated",
      checkSession,
      login,
      register,
      logout,
    }),
    [user, status, checkSession, login, register, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }
  return context;
}

export function AuthStatus() {
  const { user, status, logout } = useAuth();

  if (status === "loading") return <p role="status">Memeriksa sesi…</p>;
  if (status === "error") {
    return <p role="alert">Sesi tidak dapat diperiksa. Coba lagi.</p>;
  }
  if (status === "guest") return <a href="/login">Login</a>;

  return (
    <div>
      <span>Halo, {user.name}</span>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

// Backend contract:
// - POST /auth/login mengatur cookie HttpOnly dan return profil user.
// - GET /auth/me membaca cookie dan return profil user.
// - POST /auth/logout mencabut session/refresh token dan menghapus cookie.
// - Cookie auth memerlukan CSRF defense, CORS origin eksplisit, dan HTTPS.
````

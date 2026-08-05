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

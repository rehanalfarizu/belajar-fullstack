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

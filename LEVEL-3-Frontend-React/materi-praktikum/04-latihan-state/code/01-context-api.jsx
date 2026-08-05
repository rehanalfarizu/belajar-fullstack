// ============================================================
// FILE: 04-latihan-state/code/01-auth-context.jsx
// MATERI: AuthContext — Global Auth State dengan useReducer
// ============================================================
import { createContext, useContext, useReducer, useEffect } from "react";

// ============================================================
// TODO: Auth Context Setup
// ============================================================
// State shape:
//   { user: null, isAuthenticated: false, isLoading: true, error: null }
//
// Action types:
//   AUTH_START: { type: "AUTH_START" }
//   AUTH_SUCCESS: { type: "AUTH_SUCCESS", payload: { user } }
//   AUTH_ERROR: { type: "AUTH_ERROR", payload: { error } }
//   AUTH_END_LOADING: { type: "AUTH_END_LOADING" }
//   LOGOUT: { type: "LOGOUT" }
//   UPDATE_PROFILE: { type: "UPDATE_PROFILE", payload: { updates } }
//
// function authReducer(state, action) {
//   switch (action.type) {
//     case "AUTH_START":
//       return { ...state, isLoading: true, error: null };
//
//     case "AUTH_SUCCESS":
//       return {
//         ...state,
//         user: action.payload.user,
//         isAuthenticated: true,
//         isLoading: false,
//         error: null,
//       };
//
//     case "AUTH_ERROR":
//       return { ...state, error: action.payload.error, isLoading: false };
//
//     case "AUTH_END_LOADING":
//       return { ...state, isLoading: false };
//
//     case "LOGOUT":
//       return { user: null, isAuthenticated: false, isLoading: false, error: null };
//
//     case "UPDATE_PROFILE":
//       return { ...state, user: { ...state.user, ...action.payload.updates } };
//
//     default:
//       return state;
//   }
// }
// ============================================================

function authReducer(state, action) {
  // TODO: Implementasikan authReducer seperti di atas
  return state;
}

// Demo users
const DEMO_USERS = [
  { id: 1, name: "Admin User", email: "admin@demo.com", password: "admin123", role: "admin", avatar: "👨‍💼" },
  { id: 2, name: "Rehan Alfarizu", email: "rehan@demo.com", password: "rehan123", role: "user", avatar: "👨‍💻" },
  { id: 3, name: "Guest User", email: "guest@demo.com", password: "guest123", role: "user", avatar: "👤" },
];

// ============================================================
// TODO: AuthContext dan Provider
// ============================================================
// const AuthContext = createContext(null);
//
// export function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false, isLoading: true, error: null });
//
//   // TODO: login(email, password) — async function
//   // function login(email, password) {
//   //   return async (dispatch) => {
//   //     dispatch({ type: "AUTH_START" });
//   //     await new Promise(r => setTimeout(r, 1000)); // simulate delay
//   //     const user = DEMO_USERS.find(u => u.email === email && u.password === password);
//   //     if (user) {
//   //       dispatch({ type: "AUTH_SUCCESS", payload: { user: { ...user, password: undefined } } });
//   //     } else {
//   //       dispatch({ type: "AUTH_ERROR", payload: { error: "Email atau password salah" } });
//   //     }
//   //   };
//   // }
//
//   // TODO: logout()
//
//   // TODO: updateProfile(updates)
//
//   return (
//     <AuthContext.Provider value={{ ...state, login, logout, updateProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
//
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// }
// ============================================================

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false, isLoading: true, error: null });

  // TODO: login function (async, dispatch actions)
  // TODO: logout function
  // TODO: updateProfile function

  // TODO: demo persistence data UI, bukan bukti authentication/authorization.
  // Aplikasi nyata harus hydrate sesi dari /auth/me dengan cookie HttpOnly.
  // TODO: useEffect untuk hydrate dari localStorage
  // useEffect(() => {
  //   try {
  //     const stored = localStorage.getItem("auth_user");
  //     if (stored) {
  //       const user = JSON.parse(stored);
  //       dispatch({ type: "AUTH_SUCCESS", payload: { user } });
  //     } else {
  //       dispatch({ type: "AUTH_END_LOADING" });
  //     }
  //   } catch {
  //     dispatch({ type: "AUTH_END_LOADING" });
  //   }
  // }, []);

  const value = {
    ...state,
    login: async (email, password) => {},
    logout: () => {},
    updateProfile: (updates) => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

// ============================================================
// TODO: LoginForm Component
// ============================================================
// function LoginForm() {
//   const { login, isLoading, error } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Login</h1>
//       {error && <div className="error">{error}</div>}
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit" disabled={isLoading}>{isLoading ? "Memuat..." : "Login"}</button>
//       <p>Demo: admin@demo.com / admin123</p>
//     </form>
//   );
// }
// ============================================================

import { useState } from "react";

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  // TODO: email dan password state

  // TODO: handleSubmit

  return (
    <form className="login-form">
      {/* TODO: Fields dan submit */}
    </form>
  );
}

// ============================================================
// TODO: ProtectedRoute Component
// ============================================================
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "./01-auth-context";
//
// function ProtectedRoute({ children, requiredRole }) {
//   const { isAuthenticated, isLoading, user } = useAuth();
//   const location = useLocation();
//
//   if (isLoading) return <div className="loading">Memuat session...</div>;
//
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//
//   if (requiredRole && user?.role !== requiredRole) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//
//   return children;
// }
// ============================================================

import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // TODO: isLoading state → loading screen
  // TODO: !isAuthenticated → redirect ke /login dengan state
  // TODO: requiredRole check → redirect ke /unauthorized
  // TODO: Otherwise → return children

  return children;
}

// ============================================================
// TODO: UserProfile Component
// ============================================================
// function UserProfile() {
//   const { user, updateProfile, logout } = useAuth();
//
//   const handleUpdate = (updates) => {
//     updateProfile(updates);
//   };
//
//   return (
//     <div className="user-profile">
//       <h1>Profil</h1>
//       <p>Nama: {user?.name}</p>
//       <p>Email: {user?.email}</p>
//       <p>Role: {user?.role}</p>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }
// ============================================================

export function UserProfile() {
  const { user, updateProfile, logout } = useAuth();

  // TODO: Display user info
  // TODO: Update profile button
  // TODO: Logout button

  return (
    <div className="user-profile">
      {/* TODO: User info display */}
    </div>
  );
}

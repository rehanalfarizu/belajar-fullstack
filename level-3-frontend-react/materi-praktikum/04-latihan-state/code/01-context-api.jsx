// ============================================================
// FILE: 04-latihan-state/code/01-context-api.jsx
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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false, isLoading: true, error: null });

  // TODO: login function (async, dispatch actions)
  // TODO: logout function
  // TODO: updateProfile function

  // TODO: demo persistence data UI, bukan bukti authentication/authorization.
  // Aplikasi nyata harus hydrate sesi dari /auth/me dengan cookie HttpOnly.
  // TODO: useEffect untuk hydrate dari localStorage
  // TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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

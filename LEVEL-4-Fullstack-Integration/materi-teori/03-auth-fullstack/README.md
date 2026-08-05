# 📘 MATERI TEORI 03 — Auth Fullstack (Frontend + Backend)

## 1. Arsitektur Auth Fullstack

```
┌─────────────────────────────────────────────────────────┐
│  BROWSER (Frontend)        │  SERVER (Backend)           │
│                            │                             │
│  React App                 │  Express API                │
│    │                       │    │                       │
│    ├── AuthContext ──────────────── Login, Register      │
│    │                       │    │                       │
│    ├── localStorage/cookie │    ├── Validate creds       │
│    └── Protected Route     │    ├── Hash/verify password │
│                            │    └── JWT → cookie          │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Auth Context (State Management)

```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek auth saat app mount (restore session)
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include"    // kirim cookie
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login gagal");
    }

    const data = await res.json();
    setUser(data.user);
    return data;
  }

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  }

  async function register(name, email, password) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Registrasi gagal");
    }

    const data = await res.json();
    setUser(data.user);
    return data;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus di dalam AuthProvider");
  return ctx;
}
```

---

## 3. Protected Route Component

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage di App.jsx
<ProtectedRoute allowedRoles={["admin"]}>
  <AdminPanel />
</ProtectedRoute>
```

---

## 4. Axios Instance dengan Interceptors

```jsx
// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,    // kirim cookies otomatis
  timeout: 10000
});

// Request interceptor — tambahkan header
api.interceptors.request.use(
  (config) => {
    // Bisa tambahkan token dari storage di sini (kalau tidak pakai cookie)
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika 401 dan belum pernah retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Coba refresh token
        await api.post("/api/auth/refresh");
        // Retry request asli
        return api(originalRequest);
      } catch {
        // Refresh gagal → logout
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Usage di component
// import api from "../lib/api";
// const res = await api.get("/users");
// await api.post("/login", { email, password });
```

---

## 5. Refresh Token Rotation

```javascript
// Backend — refresh endpoint
let refreshTokens = new Set(); // production: gunakan Redis

app.post("/api/auth/refresh", (req, res) => {
  const oldRefresh = req.cookies.refresh_token;

  if (!oldRefresh || !refreshTokens.has(oldRefresh)) {
    return res.status(403).json({ error: "Refresh token invalid" });
  }

  refreshTokens.delete(oldRefresh); // Rotate — hapus yang lama

  // Verify old token, extract user info
  const payload = jwt.verify(oldRefresh, REFRESH_SECRET);

  // Generate tokens baru
  const newAccessToken = jwt.sign(
    { sub: payload.sub, email: payload.email },
    SECRET,
    { expiresIn: "15m" }
  );

  const newRefreshToken = jwt.sign(
    { sub: payload.sub },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  refreshTokens.add(newRefreshToken); // simpan yang baru

  res.cookie("token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ message: "Token refreshed" });
});
```

---

## 6. Frontend — Login Page

```jsx
// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect ke halaman sebelumnya setelah login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate(from, { replace: true }); // redirect balik
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
```

---

## Ringkasan

```
Auth Fullstack
├── AuthContext    → login, logout, register, user state
├── ProtectedRoute → redirect kalau belum login
├── Axios Interceptor → auto-handle 401, refresh token
├── Credentials    → fetch: "include", axios: withCredentials
├── CORS           → origin frontend + credentials: true
├── Refresh Token  → rotate untuk keamanan
└── JWT HttpOnly   → token di cookie, bukan localStorage
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/02-latihan-auth-fullstack/`
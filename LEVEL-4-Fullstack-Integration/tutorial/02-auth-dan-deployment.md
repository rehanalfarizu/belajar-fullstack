# Tutorial 02 — Authentication Aman + Deployment

## Tujuan
Menambahkan autentikasi berbasis sesi JWT di cookie `HttpOnly`, lalu mendeploy
aplikasi. Browser tidak pernah membaca atau menyimpan token. Contoh ini adalah
fondasi; aplikasi produksi tetap memerlukan rate limiting, audit log, rotasi
secret, dan proteksi CSRF yang sesuai arsitektur.

---

## Bagian 1 — Setup Auth di Backend

### Install dependencies

```bash
cd blog-api
npm install bcryptjs jsonwebtoken cors cookie-parser
```

### Buat file auth

Buat `middleware/auth.js`:

```javascript
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

function authMiddleware(req, res, next) {
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ error: "Sesi tidak ditemukan" });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.clearCookie("session", { path: "/" });
    res.status(401).json({ error: "Sesi tidak valid atau kedaluwarsa" });
  }
}

module.exports = { generateToken, verifyToken, authMiddleware };
```

Di entry point server, aktifkan parser dan CORS berbasis allowlist:

```javascript
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Tambah route register dan login

Tambahkan di `routes/auth.js` (buat baru):

```javascript
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db/database");
const { generateToken, authMiddleware } = require("../middleware/auth");

const crossSiteCookie = process.env.CROSS_SITE_COOKIE === "true";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" || crossSiteCookie,
  sameSite: crossSiteCookie ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

function publicUser(user) {
  return { id: user.id, username: user.username, email: user.email };
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return res.status(409).json({ error: "Email sudah terdaftar" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = db.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  ).run(username, email, hashed);

  const user = { id: result.lastInsertRowid, username, email };
  res.cookie("session", generateToken(user), cookieOptions);
  res.status(201).json({ user });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) {
    return res.status(401).json({ error: "Email atau password salah" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Email atau password salah" });
  }

  const safeUser = publicUser(user);
  res.cookie("session", generateToken(safeUser), cookieOptions);
  res.json({ user: safeUser });
});

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || crossSiteCookie,
    sameSite: crossSiteCookie ? "none" : "lax",
    path: "/"
  });
  res.status(204).end();
});

module.exports = router;
```

---

## Bagian 2 — Auth di Frontend

### Buat AuthContext

Buat `src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Request gagal");
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    request("/auth/me", { signal: controller.signal })
      .then(data => setUser(data.user))
      .catch(error => {
        if (error.name !== "AbortError") setUser(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setStatus("ready");
      });

    return () => controller.abort();
  }, []);

  async function login(credentials) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await request("/auth/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <AuthContext value={{ user, status, login, logout }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return context;
}
```

### Halaman Login

Buat `src/pages/Login.jsx`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}

export default Login;
```

---

## Bagian 3 — Deployment ke Railway

> Dashboard dan paket hosting dapat berubah. Gunakan bagian ini sebagai pola,
> lalu cocokkan kembali dengan dokumentasi platform yang dipilih.

Paling sederhana, gunakan subdomain dari site yang sama, misalnya
`app.example.com` dan `api.example.com`, sehingga cookie `SameSite=Lax` tetap
berguna. Jika frontend dan API benar-benar cross-site (misalnya domain Vercel dan
Railway berbeda), isi `CROSS_SITE_COOKIE=true`; cookie menjadi
`SameSite=None; Secure`. Mode itu wajib disertai proteksi CSRF eksplisit seperti
signed synchronizer token atau pola lain yang sesuai arsitektur.

### 1. Push ke GitHub

```bash
cd blog-api
git init
git add .
git commit -m "feat: blog API dengan auth"
git remote add origin https://github.com/username/blog-api.git
git push -u origin main
```

### 2. Deploy di Railway

1. Buka [railway.app](https://railway.app)
2. Login dengan GitHub
3. Klik **New Project** → **Deploy from GitHub repo**
4. Pilih repo `blog-api`
5. Railway otomatis detect Node.js dan install `npm install`
6. Tambahkan environment variable:
   - `JWT_SECRET` = string acak yang kuat
   - `FRONTEND_URL` = URL frontend production
   - `NODE_ENV` = `production`
   - `CROSS_SITE_COOKIE` = `true` hanya bila frontend dan API berbeda site
7. Railway akan memberikan URL seperti `https://blog-api.up.railway.app`

### 3. Update Frontend API URL

Di `src/api/blogApi.js`, ubah `BASE_URL` ke URL Railway:

```javascript
const BASE_URL = import.meta.env.VITE_API_URL;
```

### 4. Redeploy Frontend ke Vercel

```bash
cd fullstack-blog
npm run build
```

Lalu deploy folder `dist/` ke Vercel atau langsung dari repo GitHub.

---

## Checklist Deployment

```
□ Backend di Railway dengan JWT_SECRET
□ Frontend di Vercel dengan URL Railway yang benar
□ CORS di backend sudah allow domain Vercel
□ Request frontend memakai credentials: "include"
□ Cookie session HttpOnly, Secure di production, dan SameSite
□ Environment variables tidak hardcoded di kode
□ HTTPS aktif untuk kedua app
□ Endpoint mutasi memiliki mitigasi CSRF dan login diberi rate limit
```

---

## Latihan Tambahan

1. Tambah refresh token dengan rotasi dan deteksi reuse
2. Tambah role-based access (admin vs user)
3. Setup custom domain untuk production
4. Tambah rate limiting untuk login endpoint

---

**Lanjut ke:** [LEVEL-5 — Expert Level](../../LEVEL-5-Expert-Level/)

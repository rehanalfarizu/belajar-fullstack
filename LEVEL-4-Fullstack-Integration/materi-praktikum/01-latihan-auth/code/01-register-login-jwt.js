// ============================================================
// SOAL 01 — REGISTER & LOGIN (JWT)
// ============================================================
// Install: npm install express bcryptjs jsonwebtoken cors dotenv

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}

const app = express();
app.use(cors());
app.use(express.json());

// In-memory user store (ganti dengan database di production)
const users = [];

// ============================================================
// TODO 1: Register Endpoint
// ============================================================
// app.post("/api/auth/register", async (req, res) => {
//   // TODO: validasi nama, email, password (min 8 char)
//   // TODO: cek email sudah ada
//   // TODO: bcrypt.hash(password, 10)
//   // TODO: push ke array users
//   // TODO: return success tanpa password
// });


// ============================================================
// TODO 2: Login Endpoint
// ============================================================
// app.post("/api/auth/login", async (req, res) => {
//   // TODO: validasi email + password
//   // TODO: find user by email
//   // TODO: bcrypt.compare(password, user.password)
//   // TODO: jwt.sign({ id, email }, secret, { expiresIn: "7d" })
//   // TODO: return token + user info
// });


// ============================================================
// Auth Middleware
// ============================================================
// function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   // TODO: check Bearer token
//   // TODO: jwt.verify(token, secret)
//   // TODO: attach req.user = decoded
//   // TODO: next() atau error response
// }


// ============================================================
// Protected Route
// ============================================================
// app.get("/api/auth/me", authMiddleware, (req, res) => {
//   res.json({ user: req.user });
// });


// ============================================================
// Health Check
// ============================================================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Auth server running" });
});


// ============================================================
// Full Implementation (uncomment untuk test)
// ============================================================

// Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token invalid" });
  }
}

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    if (!nama || !email || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password min 8 karakter" });
    }
    const exist = users.find(u => u.email === email);
    if (exist) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), nama, email, password: hashed };
    users.push(user);
    res.status(201).json({
      message: "Registrasi berhasil",
      user: { id: user.id, nama, email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib" });
    }
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Email/password salah" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Email/password salah" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user.id, nama: user.nama, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Me
app.get("/api/auth/me", authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
  res.json({ user: { id: user.id, nama: user.nama, email: user.email } });
});


// START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth server berjalan di http://localhost:${PORT}`);
});

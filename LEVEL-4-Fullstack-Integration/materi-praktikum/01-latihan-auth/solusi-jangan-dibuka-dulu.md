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

## `code/01-register-login-jwt.js`

````js
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
````

---

## `code/02-jwt-middleware.js`

````js
// ============================================================
// SOAL 02 — JWT MIDDLEWARE & PROTECTED ROUTES
// ============================================================

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Demo data
const posts = [
  { id: 1, title: "Post 1", content: "Content 1" },
  { id: 2, title: "Post 2", content: "Content 2" },
];

// ============================================================
// TODO: Auth Middleware
// ============================================================
// function authMiddleware(req, res, next) {
//   // Ambil header: Authorization: Bearer <token>
//   // Verify token
//   // Attach user ke req.user
//   // Next() atau error
// }


// ============================================================
// Full Implementation
// ============================================================

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Token tidak ditemukan. Header: Authorization: Bearer <token>"
    });
  }

  const token = authHeader.split(" ")[1]; // ["Bearer", "token"]

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token expired" });
    }
    return res.status(403).json({ success: false, error: "Token invalid" });
  }
}

// ============================================================
// PUBLIC ROUTES
// ============================================================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

app.get("/api/public", (req, res) => {
  res.json({
    success: true,
    data: posts,
    message: "Data publik - bisa diakses tanpa token"
  });
});

// ============================================================
// PROTECTED ROUTES
// ============================================================
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Data pribadi",
    user: req.user
  });
});

app.get("/api/settings", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Settings page",
    user: req.user,
    settings: {
      theme: "dark",
      notifications: true,
    }
  });
});

app.post("/api/data", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Data berhasil dibuat",
    userId: req.user.id,
    data: req.body
  });
});

// Admin only route
app.get("/api/admin/stats", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, error: "Hanya untuk admin" });
  }
  res.json({
    success: true,
    stats: { totalUsers: 100, totalPosts: 500 }
  });
});


// ============================================================
// TEST COMMANDS
// ============================================================
// curl http://localhost:3000/api/public
// curl -H "Authorization: Bearer INVALID" http://localhost:3000/api/profile
// TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
//   -H "Content-Type: application/json" \
//   -d '{"email":"a@b.com","password":"password123"}' | jq -r '.token')
// curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/profile

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Protected routes server: http://localhost:${PORT}`);
  console.log("Endpoints:");
  console.log("  GET  /api/public        (public)");
  console.log("  GET  /api/profile       (protected)");
  console.log("  GET  /api/settings      (protected)");
  console.log("  POST /api/data          (protected)");
  console.log("  GET  /api/admin/stats   (admin only)");
});
````

---

## `code/03-token-refresh.js`

````js
// ============================================================
// SOAL 03 — TOKEN REFRESH
// ============================================================

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
if (!SECRET || SECRET.length < 32 || !REFRESH_SECRET || REFRESH_SECRET.length < 32) {
  throw new Error("JWT_SECRET dan JWT_REFRESH_SECRET wajib minimal 32 karakter");
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Demo API-client: token dikembalikan di body agar alur mudah diuji dengan curl.
// Untuk browser, simpan refresh token pada cookie HttpOnly dan access token hanya
// di memory. Di production simpan hash/id refresh token di database, ikat ke sesi,
// batasi jumlah sesi, serta deteksi reuse setelah rotation.

// In-memory store
const users = [];
const refreshTokens = []; // store valid refresh tokens

// Seed user
users.push({
  id: 1,
  email: "admin@email.com",
  password: bcrypt.hashSync("password123", 10),
  nama: "Admin User"
});

// ============================================================
// LOGIN — generate access + refresh token
// ============================================================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email/password salah" });
    }

    // Access token: short-lived (15 menit)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "15m" }
    );

    // Refresh token: long-lived (7 hari)
    const refreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token (untuk invalidasi nanti)
    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      expiresIn: "15 menit untuk access, 7 hari untuk refresh"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// REFRESH — exchange refresh token untuk access token baru
// ============================================================
app.post("/api/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token diperlukan" });
  }

  // Cek token valid dan ada di store
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Refresh token invalid atau sudah logout" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = users.find(u => u.id === decoded.id);

    // Generate access token baru
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "15m" }
    );

    // Token rotation: generate refresh token baru
    const newRefreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Hapus old refresh token, tambah yang baru
    const idx = refreshTokens.indexOf(refreshToken);
    refreshTokens.splice(idx, 1);
    refreshTokens.push(newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: "Token di-refresh dengan token rotation"
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Refresh token expired, login lagi" });
    }
    res.status(403).json({ error: "Refresh token invalid" });
  }
});

// ============================================================
// LOGOUT — invalidate refresh token
// ============================================================
app.post("/api/auth/logout", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    const idx = refreshTokens.indexOf(refreshToken);
    if (idx > -1) {
      refreshTokens.splice(idx, 1);
    }
  }

  res.json({ message: "Logout berhasil, token invalid" });
});

// ============================================================
// PROTECTED ROUTE (untuk test)
// ============================================================
const { verify } = jwt;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token diperlukan" });
  }
  try {
    req.user = verify(authHeader.split(" ")[1], SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token invalid/expired" });
  }
}

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Data rahasia", user: req.user });
});


// ============================================================
// TEST GUIDE
// ============================================================
console.log("=== TOKEN REFRESH DEMO ===");
console.log("");
console.log("STEP 1: Login");
console.log('curl -X POST http://localhost:3001/api/auth/login \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"email":"admin@email.com","password":"password123"}\'');
console.log("");
console.log("STEP 2: Test protected route dengan access token");
console.log("curl -H 'Authorization: Bearer <access_token>' http://localhost:3001/api/protected");
console.log("");
console.log("STEP 3: Refresh token (sebelum 15 menit)");
console.log('curl -X POST http://localhost:3001/api/auth/refresh \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"refreshToken":"<refresh_token>"}\'');
console.log("");
console.log("STEP 4: Logout");
console.log('curl -X POST http://localhost:3001/api/auth/logout \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"refreshToken":"<refresh_token>"}\'');

const PORT = 3001;
app.listen(PORT, () => {
  console.log("\nServer running: http://localhost:" + PORT);
});
````

---

## `code/04-role-based-access.js`

````js
// ============================================================
// SOAL 04 — ROLE-BASED ACCESS CONTROL (RBAC)
// ============================================================

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Demo data
let posts = [
  { id: 1, title: "Post 1", content: "Content 1", authorId: 1 },
  { id: 2, title: "Post 2", content: "Content 2", authorId: 2 },
];

const users = [
  { id: 1, nama: "Admin", email: "admin@email.com", role: "admin" },
  { id: 2, nama: "User Biasa", email: "user@email.com", role: "user" },
  { id: 3, nama: "Guest", email: "guest@email.com", role: "guest" },
];

// ============================================================
// Auth Middleware
// ============================================================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token diperlukan" });
  }
  try {
    req.user = jwt.verify(authHeader.split(" ")[1], SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token invalid" });
  }
}

// ============================================================
// TODO: Role Authorization Middleware
// ============================================================
// function authorize(...allowedRoles) {
//   return (req, res, next) => {
//     // TODO: check req.user.role against allowedRoles
//     // TODO: return 403 kalau tidak punya akses
//     // TODO: next() kalau diizinkan
//   };
// }


// ============================================================
// Full Implementation
// ============================================================

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Login dulu" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Akses ditolak. Butuh role: ${allowedRoles.join(", ")}`,
        yourRole: req.user.role
      });
    }
    next();
  };
}

// ============================================================
// ROUTES
// ============================================================

// GET /api/posts — PUBLIC (semua bisa akses)
app.get("/api/posts", (req, res) => {
  res.json({
    success: true,
    data: posts,
    accessedBy: req.user?.role || "guest (public)"
  });
});

// POST /api/posts — USER & ADMIN only
app.post("/api/posts", authMiddleware, authorize("user", "admin"), (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    authorId: req.user.id
  };
  posts.push(newPost);
  res.status(201).json({
    success: true,
    data: newPost,
    createdBy: req.user.role
  });
});

// PUT /api/posts/:id — OWNER atau ADMIN
app.put("/api/posts/:id", authMiddleware, (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post tidak ditemukan" });

  // Check: owner atau admin
  if (post.authorId !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({
      error: "Hanya bisa edit post sendiri atau admin"
    });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.json({ success: true, data: post });
});

// DELETE /api/posts/:id — ADMIN only
app.delete("/api/posts/:id", authMiddleware, authorize("admin"), (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Post tidak ditemukan" });

  posts.splice(index, 1);
  res.json({ success: true, message: "Post dihapus oleh admin" });
});

// GET /api/admin/stats — ADMIN only
app.get("/api/admin/stats", authMiddleware, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    stats: {
      totalPosts: posts.length,
      totalUsers: users.length,
      systemStatus: "operational"
    }
  });
});

// GET /api/users — USER & ADMIN
app.get("/api/users", authMiddleware, authorize("user", "admin"), (req, res) => {
  res.json({
    success: true,
    data: users.map(u => ({ id: u.id, nama: u.nama, role: u.role }))
  });
});


// ============================================================
// HELPERS — Generate token untuk test
// ============================================================
app.post("/api/auth/token", (req, res) => {
  const { role } = req.body;
  const user = users.find(u => u.role === role);
  if (!user) return res.status(400).json({ error: "Role tidak ditemukan" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role });
});


// ============================================================
// TEST GUIDE
// ============================================================
console.log("=== RBAC DEMO ===");
console.log("");
console.log("Generate token:");
console.log('curl -X POST http://localhost:3001/api/auth/token -H "Content-Type: application/json" -d \'{"role":"admin"}\'');
console.log('curl -X POST http://localhost:3001/api/auth/token -H "Content-Type: application/json" -d \'{"role":"user"}\'');
console.log('curl -X POST http://localhost:3001/api/auth/token -H "Content-Type: application/json" -d \'{"role":"guest"}\'');
console.log("");
console.log("Test routes:");
console.log("GET  /api/posts          — all roles");
console.log("POST /api/posts          — user, admin (auth required)");
console.log("PUT  /api/posts/1        — owner or admin");
console.log("DELETE /api/posts/1      — admin only");
console.log("GET  /api/admin/stats    — admin only");

const PORT = 3001;
app.listen(PORT, () => console.log(`RBAC server: http://localhost:${PORT}`));
````

---

## `code/05-cors-security-headers.js`

````js
// ============================================================
// SOAL 05 — CORS & SECURITY HEADERS
// ============================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = 3001;

// ============================================================
// TODO: Security Middleware
// ============================================================

// CORS — allow specific origins (bukan * di production)
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
// app.use(cors(corsOptions));

// Helmet — security headers otomatis
// app.use(helmet());

// Global rate limit — 100 req per 15 menit
// const globalLimiter = rateLimit({ ... });
// app.use(globalLimiter);

// Auth rate limit — 5 req per 15 menit (brute force protection)
// const authLimiter = rateLimit({ ... });
// app.use("/api/auth/login", authLimiter);


// ============================================================
// FULL IMPLEMENTATION
// ============================================================

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Helmet — security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Global rate limit: 100 req / 15 menit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100,
  message: {
    success: false,
    error: "Too many requests. Coba lagi dalam beberapa menit."
  },
  standardHeaders: true, // Return rate limit info di headers
  legacyHeaders: false,
});
app.use(globalLimiter);

// Auth rate limit: 5 req / 15 menit (strict untuk brute force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit."
  },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use(express.json());

// Demo endpoints
app.get("/api/public", (req, res) => {
  res.json({
    success: true,
    message: "Endpoint publik",
    note: "Rate limit: 100 req/15 menit"
  });
});

app.post("/api/auth/login", (req, res) => {
  res.json({
    success: true,
    message: "Login berhasil (ini simulasi, tidak ada validasi)"
  });
});

app.post("/api/auth/register", (req, res) => {
  res.json({
    success: true,
    message: "Registrasi berhasil (ini simulasi)"
  });
});

// Test endpoint untuk cek rate limit
app.get("/api/rate-test", (req, res) => {
  res.json({
    success: true,
    message: "Request ke-" + (req.rateLimit?.remaining + 1 || "?") + " dari 100"
  });
});


// ============================================================
// Security Headers Info
// ============================================================
app.get("/api/security-info", (req, res) => {
  res.json({
    success: true,
    security: {
      cors: "Origins: localhost:5173, localhost:3000",
      helmet: "Enabled - security headers aktif",
      rateLimit: {
        global: "100 req / 15 menit",
        auth: "5 req / 15 menit"
      },
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
      }
    }
  });
});


// ============================================================
// TEST COMMANDS
// ============================================================
console.log("=== SECURITY & CORS DEMO ===");
console.log("");
console.log("CORS test (dari origin berbeda):");
console.log("curl -H 'Origin: http://localhost:5173' -v http://localhost:3001/api/public");
console.log("");
console.log("Rate limit test:");
console.log("for i in {1..6}; do curl http://localhost:3001/api/auth/login; done");
console.log("");
console.log("Security headers:");
console.log("curl -I http://localhost:3001/api/public");

app.listen(PORT, () => {
  console.log(`Security server: http://localhost:${PORT}`);
  console.log("CORS: localhost:5173 & localhost:3000");
  console.log("Rate limit global: 100 req/15min");
  console.log("Rate limit auth: 5 req/15min");
});
````

---

# Lampiran: bagian "Contoh Code" yang dipindahkan dari file soal

Bagian ini dulu ada di `soal/*.md`. Dipindah ke sini supaya soal tidak membocorkan jawaban. Catatan: beberapa contoh lama sengaja disederhanakan (misalnya memakai satu secret untuk dua jenis token) — bandingkan dengan versi lengkap di atas dan catat bedanya.

## Dari `soal/01-register-login-jwt.md`

### Contoh Code

```javascript
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Validasi
    if (!nama || !email || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password min 8 karakter" });
    }

    // Cek email
    const exist = users.find(u => u.email === email);
    if (exist) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), nama, email, password: hashed };
    users.push(user);

    res.status(201).json({ message: "Registrasi berhasil", user: { id: user.id, nama, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: "Email/password salah" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Email/password salah" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, nama: user.nama, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Dari `soal/02-jwt-middleware.md`

### Contoh Code

```javascript
// Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1]; // ["Bearer", "token"]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach ke request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(403).json({ error: "Token invalid" });
  }
}

// Usage
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Data pribadi", user: req.user });
});

// Public route
app.get("/api/public", (req, res) => {
  res.json({ message: "Data publik" });
});
```

## Dari `soal/03-token-refresh.md`

### Contoh Code

```javascript
const refreshTokens = []; // store refresh tokens

app.post("/api/auth/login", async (req, res) => {
  // ... verify email/password ...

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

app.post("/api/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Refresh token invalid" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Refresh token expired" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  const { refreshToken } = req.body;
  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) refreshTokens.splice(index, 1);
  res.json({ message: "Logout berhasil" });
});
```

## Dari `soal/04-role-based-access.md`

### Contoh Code

```javascript
// Role middleware
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Login dulu" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Akses ditolak. Butuh role: ${allowedRoles.join(", ")}`
      });
    }
    next();
  };
}

// Routes
app.get("/api/posts", (req, res) => res.json(posts));

app.post("/api/posts", authMiddleware, authorize("user", "admin"), (req, res) => {
  const newPost = { id: Date.now(), ...req.body, authorId: req.user.id };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.delete("/api/posts/:id", authMiddleware, authorize("admin"), (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: "Post dihapus" });
});
```

## Dari `soal/05-cors-security-headers.md`

### Contoh Code

```javascript
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Helmet
app.use(helmet());

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100,
  message: { error: "Too many requests, coba lagi nanti" },
});
app.use(globalLimiter);

// Auth rate limit (lebih strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Terlalu banyak percobaan login" },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
```

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

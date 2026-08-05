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

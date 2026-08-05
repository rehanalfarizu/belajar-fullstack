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

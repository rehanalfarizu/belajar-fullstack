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
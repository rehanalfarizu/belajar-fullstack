# 📘 MATERI TEORI 06 — Security (OWASP Top 10)

## 1. OWASP Top 10 — Risiko Keamanan Web

OWASP = Open Web Application Security Project — daftar 10 risiko keamanan paling kritis.

---

### A01 — Broken Access Control

Masalah: User bisa akses resource/data yang tidak seharusnya.

```javascript
// ❌ BERBAHAYA — tidak ada authorization check
app.get("/api/users/:id", (req, res) => {
  const user = db.findUser(req.params.id);
  res.json(user);
});

// ✅ AMAN — cek apakah user boleh akses
app.get("/api/users/:id", authenticate, (req, res) => {
  const userId = req.params.id;
  const currentUser = req.user.sub;

  // User hanya boleh akses profil sendiri, KECUALI admin
  if (currentUser !== userId && req.user.role !== "admin") {
    return res.status(403).json({ error: "Akses ditolak" });
  }

  const user = db.findUser(userId);
  res.json(user);
});
```

### Principe of Least Privilege

```javascript
// Setiap route butuh auth? Pakai middleware
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Login dulu" });
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Akses ditolak" });
    }
    next();
  };
}

// Protect routes
app.delete("/api/posts/:id", requireAuth, requireRole("admin", "editor"), deletePost);
```

---

### A02 — Cryptographic Failures

Masalah: Data sensitif (password, kartu kredit) tidak terenkripsi.

```javascript
// ❌ BERBAHAYA — plaintext password
const user = { email, password }; // ❌❌❌

// ✅ AMAN — bcrypt hash
const bcrypt = require("bcryptjs");
const hash = await bcrypt.hash(password, 12); // 12 rounds
const match = await bcrypt.compare(input, hash);

// ❌ Jangan pakai encoding sederhana
const encoded = Buffer.from(password).toString("base64"); // bisa di-decode!
```

### HTTPS Mandatory

```javascript
// Middleware — redirect HTTP ke HTTPS
function requireHTTPS(req, res, next) {
  if (req.protocol === "http" && process.env.NODE_ENV === "production") {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  next();
}

// Helmet — security headers
const helmet = require("helmet");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));
```

---

### A03 — Injection (SQL Injection)

Masalah: User input tidak disanitasi, attacker bisa execute SQLarbitrary.

```javascript
// ❌ BERBAHAYA — SQL injection
app.get("/search", (req, res) => {
  const query = req.query.q;
  // User input langsung masuk query!
  db.query(`SELECT * FROM posts WHERE title LIKE '%${query}%'`); // 💀
});

// ✅ AMAN — parameterized query
app.get("/search", (req, res) => {
  const query = req.query.q;
  db.query(
    "SELECT * FROM posts WHERE title LIKE $1",
    [`%${query}%`]
  );
});
```

```javascript
// ❌ BERBAHAYA — NoSQL injection (MongoDB)
app.get("/user", (req, res) => {
  const username = req.query.username;
  db.collection("users").find({ username }); // 💀 bisa injection
});

// ✅ AMAN — validasi input
app.get("/user", (req, res) => {
  const username = req.query.username;

  if (typeof username !== "string" || username.length > 50) {
    return res.status(400).json({ error: "Invalid input" });
  }

  db.collection("users").find({ username });
});
```

---

### A04 — Insecure Design

Masalah: Arsitektur yang lemah sejak awal (tidak ada authorization global, no rate limiting).

```javascript
// Rate limiting — prevent brute force
const rateLimit = require("express-rate-limit");

app.use("/api/auth/login", rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 menit
  max: 5,                     // maks 5 kali percobaan
  message: { error: "Terlalu banyak percobaan login. Coba 15 menit lagi." },
  standardHeaders: true,
  legacyHeaders: false
}));

// Global rate limit
app.use("/api/", rateLimit({
  windowMs: 60 * 1000,        // 1 menit
  max: 100,                   // maks 100 request per menit
  skip: (req) => req.path === "/health"
}));
```

---

### A05 — Security Misconfiguration

```javascript
// ❌ Konfigurasi lemah
app.disable("x-powered-by"); // minimal

// ✅ Konfigurasi aman
const helmet = require("helmet");
app.use(helmet());

// CORS ketat
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(","),
  credentials: true
}));

// Stack trace mati di production
if (process.env.NODE_ENV === "production") {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  });
}
```

---

### A06 — Vulnerable & Outdated Components

```bash
# Cek vulnerabilities
npm audit                 # audit dependencies
npx npm-check-updates    # cek yang outdated

# Update
npm audit fix
npx npm-check-updates -u
npm update

# Minimal node version
"engines": {
  "node": ">=22.18.0"
}
```

---

### A07 — Authentication Failures

```javascript
// ❌ Weak session management
app.use(session({
  secret: "short-secret", // 💀
  resave: true,
  saveUninitialized: true
}));

// ✅ Strong session
app.use(session({
  secret: process.env.SESSION_SECRET, // panjang, random, dari env
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// JWT — rotate, short expiry
const accessToken = jwt.sign(
  { sub: user.id },
  SECRET,
  { expiresIn: "15m" }  // pendek!
);
```

---

### A08 — Software & Data Integrity Failures

```javascript
// ❌ Takut import tanpa verifikasi
const package = require("untrusted-package");

// ✅ Pakai checksum, cek integrity
// package.json — lockfileVersion 2
// Pastikan package-lock.json di-commit
// Setup provenance (npm 9+)
npm install --provenance
```

---

### A09 — Security Logging & Monitoring

```javascript
// ❌ Tidak ada logging
app.get("/api/admin", (req, res) => {
  // berhasil/gagal tidak ada jejak
  res.json({ data: "rahasia" });
});

// ✅ Logging semua request
const morgan = require("morgan");
app.use(morgan("combined")); // Apache format + IP, timestamp

// Log security events
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!verify(email, password)) {
    console.warn(`Login GAGAL untuk ${email} dari IP ${req.ip}`);
    return res.status(401).json({ error: "Login gagal" });
  }

  console.info(`Login BERHASIL untuk ${email}`);
  res.json({ token });
});
```

---

### A10 — Server-Side Request Forgery (SSRF)

Masalah: Aplikasi fetching data dari user-provided URL tanpa validasi.

```javascript
// ❌ BERBAHAYA — SSRF
app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  const data = await fetch(url); // bisa fetch ke internal service!
  res.send(data);
});

// ✅ AMAN — whitelist domain
const ALLOWED_HOSTS = ["api.github.com", "api.example.com"];

app.get("/fetch", async (req, res) => {
  const url = req.query.url;

  try {
    const parsed = new URL(url);
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
      return res.status(400).json({ error: "Domain tidak diizinkan" });
    }
    const data = await fetch(url);
    res.send(data);
  } catch {
    res.status(400).json({ error: "URL tidak valid" });
  }
});
```

---

## Ringkasan

```
Security (OWASP Top 10)
├── A01 Access Control → cek authorization di setiap route
├── A02 Crypto        → bcrypt, HTTPS, tidak pernah plaintext
├── A03 Injection     → parameterized query, sanitasi input
├── A04 Design        → rate limiting, good architecture
├── A05 Config        → helmet, CORS, production settings
├── A06 Components    → npm audit, update dependencies
├── A07 Auth          → short JWT expiry, strong session
├── A08 Integrity     → package-lock, provenance
├── A09 Logging       → morgan, security event logging
└── A10 SSRF          → whitelist URL yang boleh di-fetch
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/04-latihan-security/`

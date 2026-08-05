# 📘 MATERI TEORI 05 — Authentication (JWT)

## 1. Apa itu Authentication?

```
Authentication (AuthN) → Siapa kamu?     (login, verify identity)
Authorization (AuthZ)   → Apa yang boleh kamu lakukan? (permission, role)
```

### Metode Authentication:

| Metode | Penjelasan | Pakai di |
|--------|-----------|---------|
| Session + Cookie | Data session di server, cookie di browser | Traditional web |
| JWT | Token stateless di browser/storage | API, SPA, Mobile |
| OAuth 2.0 | Login via Google, Facebook, dll | Social login |
| API Key | Static key untuk server-to-server | Internal API |

---

## 2. Password Hashing

**JANGAN** simpan password plain text. **SELALU** hash.

```javascript
// ❌ BERBAHAYA — jangan pernah!
const user = { name: "Andi", password: "rahasia123" };

// ✅ Pakai bcrypt
const bcrypt = require("bcryptjs");

// Hash password (searah — tidak bisa di-decode)
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);      // 10 rounds (speed vs security)
  return await bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash); // true / false
}

// Usage
const hash = await hashPassword("rahasia123");
// $2a$10$ZKbXGkQqLQv3ePxkS9Q8dO1h5n8Xj2mQvL6pS1tR3wX7vU0nJ9aW

const match = await verifyPassword("rahasia123", hash); // true
const wrong = await verifyPassword("salah", hash);      // false
```

---

## 3. JWT (JSON Web Token)

JWT = **token self-contained** yang menyimpan informasi pengguna secara stateless.

### Struktur JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuZGkiLCJpYXQiOjE3NTAxMjM0NDJ9.abc123signature

[Header]                [Payload]                [Signature]
   │                       │                         │
JSON di-base64           JSON di-base64          HMAC-SHA256
```

### 3 Parts:

```javascript
// Header
{
  "alg": "HS256",        // Algorithm: HMAC-SHA256
  "typ": "JWT"           // Type
}

// Payload (claims — data yang disimpan)
{
  "sub": "1234567890",   // Subject (user ID)
  "name": "Andi",
  "role": "admin",
  "iat": 1750123442,     // Issued at (waktu dibuat)
  "exp": 1750209842      // Expiration (24 jam dari iat)
}

// Signature
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), SECRET)
```

### JWT di Node.js (jsonwebtoken)

```bash
npm install jsonwebtoken
```

```javascript
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib diisi dan minimal 32 karakter");
}
const EXPIRES_IN = "24h";

// Generate Token
function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,         // simpan user ID di `sub`
      name: user.name,
      role: user.role,
      email: user.email
    },
    SECRET,
    { expiresIn: EXPIRES_IN }
  );
}

// Verify Token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null; // token invalid atau expired
  }
}

// Usage
const token = generateToken({ id: 1, name: "Andi", role: "admin" });
console.log(token);

const payload = verifyToken(token);
if (payload) {
  console.log("User ID:", payload.sub);
  console.log("Role:", payload.role);
}
```

---

## 4. Login API dengan JWT

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const router = express.Router();
const SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = "24h";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Cek email sudah ada?
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "Email sudah terdaftar" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // Generate token
  const token = jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  res.status(201).json({
    message: "Registrasi berhasil",
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Cari user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Email atau password salah" });
  }

  // Verifikasi password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Email atau password salah" });
  }

  // Generate token
  const token = jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  res.json({
    message: "Login berhasil",
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

// GET /api/auth/me — protected route
router.get("/me", authenticate, async (req, res) => {
  const user = await User.findById(req.user.sub).select("-password");
  res.json({ user });
});

// Middleware authenticate (export terpisah)
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token diperlukan" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Token invalid atau expired" });
  }

  req.user = payload; // simpan payload ke request
  next();
}

module.exports = router;
```

---

## 5. HTTP-Only Cookie (Lebih Aman)

Menyimpan JWT di **HttpOnly cookie** — tidak bisa diakses oleh JavaScript (XSS protection).

```javascript
// Login — simpan token di cookie
router.post("/login", async (req, res) => {
  const user = await loginUser(email, password);
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,         // JavaScript TIDAK BISA baca (XSS protection)
    secure: false,           // true di production (HTTPS only)
    sameSite: "strict",     // hanya kirim cookie kalau domain sama
    maxAge: 24 * 60 * 60 * 1000 // 24 jam dalam ms
  });

  res.json({ message: "Login berhasil" });
});

// Middleware — baca dari cookie
function authenticate(req, res, next) {
  const token = req.cookies.token; // perlu cookie-parser middleware

  if (!token) {
    return res.status(401).json({ error: "Token diperlukan" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Token invalid" });
  }

  req.user = payload;
  next();
}

// Logout — hapus cookie
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout berhasil" });
});
```

### Install cookie-parser

```bash
npm install cookie-parser
```

```javascript
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Untuk CORS + credentials
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true          // izinkan cookie di-cross-origin
}));
```

---

## 6. Refresh Token

Short-lived access token (JWT) + long-lived refresh token untuk UX yang lebih baik.

```
┌──────────┐  login   ┌──────────┐  access_token   ┌──────────┐
│  Client  │─────────►│  Server  │◄───────────────│  Browser │
└──────────┘          └──────────┘                └──────────┘
     │                     │
     │  access_token       │  refresh_token (HttpOnly cookie)
     │  expires 15 menit   │  expires 7 hari
     │                     │
     ▼                     ▼
┌──────────────────────────────────────────────────────────┐
│  Ketika access_token expire:                              │
│  Client kirim POST /refresh → Server cek refresh_token   │
│  → Generate access_token baru +rotasi refresh_token      │
└──────────────────────────────────────────────────────────┘
```

```javascript
// Refresh token — simpan terpisah
const refreshTokens = new Set(); // atau simpan di DB/Redis

router.post("/refresh", (req, res) => {
  const oldToken = req.cookies.refresh_token;

  if (!oldToken || !refreshTokens.has(oldToken)) {
    return res.status(403).json({ error: "Refresh token invalid" });
  }

  // Rotate: hapus token lama, buat baru
  refreshTokens.delete(oldToken);
  const payload = verifyToken(oldToken);

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

  refreshTokens.add(newRefreshToken);

  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ token: newAccessToken });
});
```

---

## 7. Role-Based Access Control (RBAC)

```javascript
// roles: 'user' | 'editor' | 'admin'

// Middleware factory — buat middleware berdasarkan role
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Token diperlukan" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Akses ditolak — role tidak cukup" });
    }
    next();
  };
}

// Usage
router.delete("/users/:id", authenticate, requireRole("admin"), deleteUser);
router.patch("/posts/:id", authenticate, requireRole("admin", "editor"), updatePost);
router.get("/dashboard", authenticate, requireRole("user", "editor", "admin"), dashboard);
```

---

## 8. Security Best Practices

```javascript
// 1. Rate limiting — prevent brute force
const rateLimit = require("express-rate-limit");
app.use("/api/auth/login", rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 menit
  max: 5,                     // maks 5 percobaan per IP
  message: { error: "Terlalu banyak percobaan. Coba lagi dalam 15 menit." }
}));

// 2. Helmet — security headers
const helmet = require("helmet");
app.use(helmet());

// 3. Input validation (Zod / Joi)
const z = require("zod");
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password min 6 karakter")
});

// 4. Jangan expose detail error di production
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    console.error(err.stack);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
  res.status(500).json({ error: err.message });
});

// 5. CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

---

## Ringkasan

```
Authentication
├── Hashing     → bcrypt.hash() + bcrypt.compare()
├── JWT         → jwt.sign() + jwt.verify()
├── HttpOnly    → cookie tidak bisa dibaca JS (XSS safe)
├── Refresh     → rotate token + blacklist/Set
├── RBAC        → middleware factory requireRole()
├── Security    → rate limit, helmet, CORS, Zod validation
└── Flow        → Register → Hash → Store → Login → Compare → JWT
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/04-latihan-auth/`

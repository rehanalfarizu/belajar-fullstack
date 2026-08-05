# 📘 MATERI TEORI 02 — CORS & Cookies

## 1. Same-Origin Policy (SOP)

Browser **blokir request** dari origin A ke origin B kecuali server mengizinkannya.

```
Origin = scheme + domain + port
https://api.example.com:443 ← berbeda dari →
http://example.com:80        (port & scheme beda)
http://www.example.com       (subdomain beda)
```

---

## 2. CORS (Cross-Origin Resource Sharing)

CORS = **mekanisme browser** yang mengizinkan server mengatakan siapa yang boleh akses.

### CORS Headers

```javascript
// Server Express
const cors = require("cors");

// Allow semua origin (development)
app.use(cors());

// Allow specific origin (production)
app.use(cors({
  origin: "http://localhost:5173",      // frontend URL
  credentials: true                     // izinkan cookies
}));

// Allow multiple origins
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://myapp.vercel.app"
  ],
  credentials: true
}));
```

### Preflight Request

```
OPTIONS /api/data HTTP/1.1
Origin: http://localhost:5173
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

---

## 3. Cookies — Simpan Data di Browser

Cookie = **small piece of data** yang disimpan browser dan dikirim otomatis ke server setiap request.

```javascript
// Server — set cookie
res.cookie("theme", "dark", {
  httpOnly: true,        // JS TIDAK BISA baca (XSS protection)
  secure: false,          // true = hanya HTTPS (production)
  sameSite: "strict",     // strict | lax | none
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari (ms)
  path: "/",             // cookie dikirim ke semua path
  domain: ".example.com" // subdomain yang bisa akses
});

// Server — read cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// req.cookies = { theme: "dark", token: "abc123" }

// Server — delete cookie
res.clearCookie("theme");
```

### Cookie Attributes

```
httpOnly  → true = JavaScript tidak bisa baca (aman dari XSS)
secure    → true = hanya kirim lewat HTTPS
sameSite  → strict  = cookie hanya dikirim di origin yang sama
         → lax     = cookie dikirim di navigation top-level (default modern)
         → none    = cookie dikirim cross-origin, WAJIB secure=true
path      → "/" = cookie aktif di semua path
domain    → .example.com = aktif di semua subdomain
maxAge    → dalam detik sampai expires
```

---

## 4. Session vs JWT di Cookie

### Session-Based Auth

```javascript
const session = require("express-session");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,          // true di production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 24 jam
  }
}));

// Login — simpan di session (di server memory/Redis)
app.post("/login", (req, res) => {
  if (validCredentials(email, password)) {
    req.session.userId = user.id;
    res.json({ message: "Login berhasil" });
  }
});

// Auth middleware — cek session
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Login dulu" });
  }
  req.userId = req.session.userId;
  next();
}
```

### JWT + HttpOnly Cookie (Recommended)

```javascript
// Login — set JWT di HttpOnly cookie
app.post("/login", async (req, res) => {
  const user = await validateUser(email, password);

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    SECRET,
    { expiresIn: "24h" }
  );

  res.cookie("token", token, {
    httpOnly: true,     // JS tidak bisa baca
    secure: false,       // true di production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ message: "Login berhasil" });
});

// Auth middleware — baca dari cookie
function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token tidak ada" });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalid" });
  }
}
```

---

## 5. Frontend — Fetch dengan Credentials

```javascript
// Frontend — kirim cookies ke cross-origin API
fetch("http://localhost:3000/api/data", {
  credentials: "include"   // WAJIB untuk kirim/receive cookies
});

// Dengan axios
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true    // kirim cookies
});

// Contoh: Login → Server set cookie → Browser simpan
// Request berikutnya → Browser kirim cookie otomatis
// Server verifikasi cookie → Izinkan akses
```

---

## 6. localStorage vs Cookies

| Aspek | localStorage | Cookies |
|-------|-------------|---------|
| Kapasitas | ~5MB | ~4KB |
| Akses JS | Ya | httpOnly = tidak |
| Auto-kirim | Tidak | Ya, di setiap request |
| Expires | Tidak pernah (manual) | Bisa diatur |
| Cocok untuk | Data client | Session token, preferences |
| Security | Rentan XSS | httpOnly = aman |

```javascript
// ❌ BERBAHAYA — token di localStorage bisa dicuri XSS
localStorage.setItem("token", jwt);

// ✅ LEBIH AMAN — httpOnly cookie tidak bisa dibaca JS
// JWT disimpan di cookie oleh server, tidak ada di localStorage
```

---

## Ringkasan

```
CORS & Cookies
├── SOP         → Browser blokir cross-origin request
├── CORS        → Server izin siapa boleh akses
├── Preflight   → OPTIONS request sebelum main request
├── Cookie Attr → httpOnly (aman), secure, sameSite
├── Session     → data di server, session ID di cookie
├── JWT Cookie  → JWT di HttpOnly cookie (paling aman)
├── Frontend    → fetch/axios dengan credentials: "include"
└── localStorage → bisa dicuri XSS, tidak aman untuk token
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/02-latihan-auth-fullstack/`
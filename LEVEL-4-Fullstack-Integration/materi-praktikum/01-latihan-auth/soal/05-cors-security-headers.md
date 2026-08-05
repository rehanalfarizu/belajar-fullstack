# SOAL 05 — CORS Configuration & Security Headers

## Tujuan
Memahami CORS, helmet, dan keamanan HTTP headers.

---

## Briefing
Konfigurasi keamanan server: CORS, helmet, rate limiting.

---

## Syarat (Checklist)

### CORS
- [ ] `npm install cors helmet express-rate-limit`
- [ ] Allow specific origins (bukan `*` di production)
- [ ] Allow specific methods: GET, POST, PUT, DELETE
- [ ] Allow credentials: Authorization header
- [ ] Preflight request handling

### Helmet
- [ ] `helmet()` — set security headers otomatis
- [ ] Content-Security-Policy
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security (HTTPS only)

### Rate Limiting
- [ ] Global rate limit: 100 req/15 menit
- [ ] Auth routes: 5 req/15 menit (brute force protection)
- [ ] Return 429 Too Many Requests

---

## Contoh Code

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

---

## Cara Submit
1. Buat server dengan semua security config
2. Test CORS dari browser ( beda origin)
3. Test rate limit: trigger 6x login → dapat 429
# SOAL 02 — JWT Middleware & Protected Routes

## Tujuan
Memahami auth middleware pattern dan cara protect routes dengan JWT.

---

## Briefing
Buat auth middleware yang verifikasi token dan protect endpoint tertentu.

---

## Syarat (Checklist)

### Auth Middleware
- [ ] `authMiddleware(req, res, next)` function
- [ ] Ambil token dari header: `Authorization: Bearer <token>`
- [ ] Verify token dengan `jwt.verify(token, secret)`
- [ ] Attach user info ke `req.user`
- [ ] Return 401 kalau token tidak ada
- [ ] Return 403 kalau token invalid

### Protected Routes
- [ ] `GET /api/profile` — hanya bisa diakses dengan token valid
- [ ] `GET /api/settings` — hanya untuk user yang login
- [ ] `POST /api/data` — create resource dengan user info dari token

### Public Routes
- [ ] `GET /api/public` — bisa diakses tanpa token
- [ ] `GET /api/health` — health check endpoint

---

## Contoh Code

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

---

## Cara Submit
1. Buat `server.js` dengan semua route di atas
2. Test dengan curl:
   - Tanpa token → 401
   - Token invalid → 403
   - Token valid → 200 + data
3. COBA expired token test
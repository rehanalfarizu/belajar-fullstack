# 📘 MATERI TEORI 02 — Express.js & REST API

## 1. Apa itu Express.js?

Express.js = **web framework minimal** untuk Node.js — cara paling populer bikin web server & REST API.

```
Tanpa Express:  http.createServer() → semua logika manual
Dengan Express: app.get(), app.post() → lebih clean & powerful
```

---

## 2. Install & Setup Awal

```bash
mkdir my-api && cd my-api
npm init -y
npm install express
```

```javascript
// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware wajib — parsing body JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Halo dari Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
```

```bash
node server.js
```

---

## 3. Routing

### HTTP Methods

```javascript
app.get("/users", (req, res) => { ... });       // Baca semua
app.get("/users/:id", (req, res) => { ... });   // Baca satu
app.post("/users", (req, res) => { ... });      // Buat baru
app.put("/users/:id", (req, res) => { ... });   // Update penuh
app.patch("/users/:id", (req, res) => { ... }); // Update sebagian
app.delete("/users/:id", (req, res) => { ... }); // Hapus
app.options("/users", (req, res) => { ... });    // CORS preflight
```

### Route Parameters (params)

```javascript
// /users/123
app.get("/users/:id", (req, res) => {
  const { id } = req.params;       // "123"
  res.send(`User ID: ${id}`);
});

// /users/123/posts/456
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, Post ${postId}`);
});
```

### Query Parameters

```javascript
// GET /users?page=2&limit=10&sort=name
app.get("/users", (req, res) => {
  const { page = 1, limit = 10, sort = "asc" } = req.query;
  // page = "2", limit = "10", sort = "name"
  res.json({ page, limit, sort });
});
```

### Request Body

```javascript
// POST /users
app.use(express.json()); // WAJIB untuk parsing body JSON

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  // req.body = { name: "Andi", email: "andi@email.com", age: 25 }
  res.status(201).json({ message: "User dibuat", user: req.body });
});
```

---

## 4. Middleware

Middleware = **fungsi yang jalan antara request dan response**.

```
Request
   │
   ▼
Middleware 1 ──→ next()
   │
   ▼
Middleware 2 ──→ next()
   │
   ▼
Route Handler
   │
   ▼
Response
```

### Jenis Middleware:

```javascript
// 1. Built-in middleware
app.use(express.json());        // parse JSON body
app.use(express.urlencoded());  // parse form data
app.use(express.static("public")); // serve file statis

// 2. Third-party middleware
// npm install cors helmet morgan
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(cors());                          // izinkan cross-origin
app.use(helmet());                        // security headers
app.use(morgan("dev"));                  // logging HTTP

// 3. Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // lanjut ke middleware/handler berikutnya
});

// 4. Route-specific middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "secret") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.get("/dashboard", requireAuth, (req, res) => {
  res.json({ message: "Dashboard rahasia" });
});

// 5. Error-handling middleware (4 params: err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Terjadi kesalahan" });
});
```

### Middleware Chaining

```javascript
// Berurutan: log → auth → validate → handler
app.post(
  "/articles",
  logger,
  authenticate,
  validateArticle,
  createArticle
);
```

---

## 5. Response Methods

```javascript
// JSON response
res.json({ message: "Berhasil", data: {} });
res.json([{ id: 1 }, { id: 2 }]);

// Status code
res.status(201).json({ message: "Created" });
res.status(204).send(); // No content
res.status(404).json({ error: "Not Found" });
res.status(500).json({ error: "Server Error" });

// Text/HTTP
res.send("Halo");                     // auto Content-Type: text/html
res.type("text/plain").send("Halo");   // override

// File statis
res.sendFile("/path/to/file.html");  // butuh absolute path

// Redirect
res.redirect("/login");

// Cookie
res.cookie("token", "abc123", {
  httpOnly: true,
  secure: false,  // true di production
  maxAge: 24 * 60 * 60 * 1000, // 24 jam dalam ms
  sameSite: "strict"
});

// Hapus cookie
res.clearCookie("token");
```

---

## 6. REST API Design (Best Practices)

### Resource Naming

```
✅  GET    /users          — daftar users
✅  GET    /users/:id      — satu user
✅  POST    /users          — buat user baru
✅  PUT     /users/:id      — update penuh
✅  PATCH   /users/:id      — update sebagian
✅  DELETE  /users/:id      — hapus user

❌  GET /getUsers          — jangan pakai verbs di URL
❌  POST /createUser
❌  DELETE /deleteUser/:id
❌  GET /user?id=123       — params di URL, bukan query
```

### Response Format (Convention)

```javascript
// Sukses — pakai array untuk list
res.json({
  success: true,
  data: { id: 1, name: "Andi", email: "andi@email.com" }
});

// List dengan pagination
res.json({
  success: true,
  data: [/* array items */],
  meta: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  }
});

// Error — konsisten format error
res.status(400).json({
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Email sudah terdaftar",
    details: { field: "email" }
  }
});
```

### HTTP Status Codes yang Umum

| Code | Meaning | Pakai Untuk |
|------|---------|-------------|
| 200 | OK | Sukses (GET, PUT, PATCH) |
| 201 | Created | Sukses buat resource baru (POST) |
| 204 | No Content | Sukses, tidak ada body (DELETE) |
| 400 | Bad Request | Input tidak valid |
| 401 | Unauthorized | Belum login |
| 403 | Forbidden | Tidak punya hak akses |
| 404 | Not Found | Resource tidak ditemukan |
| 409 | Conflict | Duplicate data |
| 422 | Unprocessable Entity | Validasi gagal |
| 500 | Internal Server Error | Error server |

---

## 7. Express Router (Modular Route)

Pecah route ke file terpisah biar rapi.

```javascript
// routes/users.js
const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Andi", email: "andi@email.com" },
  { id: 2, name: "Budi", email: "budi@email.com" }
];

router.get("/", (req, res) => {
  res.json({ success: true, data: users });
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User tidak ditemukan" });
  res.json({ success: true, data: user });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

module.exports = router;
```

```javascript
// server.js
const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

app.use(express.json());

app.use("/api/users", usersRouter);   // prefix: /api/users
app.use("/api/posts", postsRouter);   // prefix: /api/posts

app.listen(3000);
```

---

## 8. Request Lifecycle di Express

```
1. Incoming Request
         │
         ▼
2. middleware: express.json() ──► 400 kalau body tidak valid
         │
         ▼
3. middleware: cors() ─────────► handle CORS headers
         │
         ▼
4. middleware: helmet() ────────► security headers
         │
         ▼
5. middleware: morgan() ──────► logging
         │
         ▼
6. middleware: (custom) ───────► auth, logging, dll
         │
         ▼
7. Route Handler ──────────────► res.json()
         │
         ▼
8. Error Handler ──────────────► handle errors
         │
         ▼
9. Response
```

---

## 9. Input Validation Sederhana

```javascript
// Manual validation
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Nama wajib diisi" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Email tidak valid" });
  }

  // Lanjut simpan ke database
  res.status(201).json({ message: "OK" });
});
```

---

## 10. Struktur Project Express (Recommended)

```
my-api/
├── node_modules/
├── src/
│   ├── routes/           # Route definitions
│   │   ├── users.js
│   │   └── posts.js
│   ├── controllers/       # Business logic
│   │   ├── userController.js
│   │   └── postController.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/           # Data models (ORM/ODM)
│   ├── config/           # Config (db, env)
│   ├── utils/            # Helper functions
│   └── app.js            # Express app setup
├── .env
├── .gitignore
└── package.json
```

### app.js (Separated Setup)

```javascript
// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const usersRouter = require("./routes/users");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Terjadi kesalahan server" });
});

module.exports = app;
```

```javascript
// server.js (entry point)
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Port ${PORT}`));
```

---

## Ringkasan

```
Express.js & REST API
├── Setup        → express(), app.listen()
├── Routing      → app.METHOD(path, handler)
├── Params       → :id (URL param) vs ?key=value (query)
├── Middleware   → request lifecycle, built-in, custom
├── Response     → res.json(), res.status(), res.cookie()
├── Router       → pecah route ke file terpisah
├── REST Design  → resource-based URLs, proper status codes
└── Structure    → routes / controllers / middleware
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/02-latihan-express/`
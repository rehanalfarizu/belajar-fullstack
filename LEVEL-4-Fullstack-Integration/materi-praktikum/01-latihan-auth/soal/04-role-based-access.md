# SOAL 04 — Role-Based Access Control (RBAC)

## Tujuan
Memahami authorization dengan roles: admin vs user vs guest.

---

## Briefing
Buat sistem dengan 3 role dan enforce permission di middleware.

---

## Syarat (Checklist)

### User Roles
- [ ] `admin` — full access
- [ ] `user` — access ke resource miliknya
- [ ] `guest` — read-only access

### Permission Middleware
- [ ] `authorize(...roles)` — middleware factory
- [ ] Check `req.user.role` terhadap allowed roles
- [ ] Return 403 kalau tidak punya akses

### Routes
- [ ] `GET /api/posts` — public (all roles)
- [ ] `POST /api/posts` — user & admin only
- [ ] `DELETE /api/posts/:id` — admin only
- [ ] `PUT /api/posts/:id` — owner atau admin
- [ ] `GET /api/admin/stats` — admin only

---

## Contoh Code

```javascript
// Role middleware
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Login dulu" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Akses ditolak. Butuh role: ${allowedRoles.join(", ")}`
      });
    }
    next();
  };
}

// Routes
app.get("/api/posts", (req, res) => res.json(posts));

app.post("/api/posts", authMiddleware, authorize("user", "admin"), (req, res) => {
  const newPost = { id: Date.now(), ...req.body, authorId: req.user.id };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.delete("/api/posts/:id", authMiddleware, authorize("admin"), (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: "Post dihapus" });
});
```

---

## Cara Submit
1. Buat server dengan RBAC
2. Test semua role: admin, user, guest
3. Verify permission enforcement
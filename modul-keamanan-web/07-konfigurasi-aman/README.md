# 07 — Konfigurasi Aman

## Environment Variables

### ❌ Jangan Commit Secret

```javascript
// ❌ JANGAN!
const dbPassword = 'supersecret123';
const apiKey = 'sk-abc123xyz';
```

### ✅ Gunakan Environment Variables

```javascript
// ✅ BENAR
const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;
```

### File .env

```bash
# .env (JANGAN commit!)
DB_PASSWORD=supersecret123
API_KEY=sk-abc123xyz
```

```bash
# .env.example (Commit ini, tanpa nilai sebenarnya)
DB_PASSWORD=
API_KEY=
```

### .gitignore

```
# Wajib ada!
.env
.env.local
.env.*.local
```

---

## Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet()); // Set berbagai security headers

// Atau manual:
app.use((req, res, next) => {
  // Cegah clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Cegah MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  
  next();
});
```

---

## Dependency Security

```bash
# Cek vulnerabilities
npm audit

# Update packages yang vulnerable
npm audit fix

# Cek outdated packages
npm outdated
```

### Dependabot (GitHub)

Aktifkan Dependabot untuk auto-update dependencies dengan security patches.

---

## Error Handling

```javascript
// ❌ Error terlalu detail ke user
app.use((err, req, res, next) => {
  res.status(500).json({ 
    error: err.message,
    stack: err.stack,
    query: err.sql  // Bocorkan struktur database!
  });
});

// ✅ Error generic ke user, detail ke log
app.use((err, req, res, next) => {
  console.error(err); // Log full error untuk debugging
  
  res.status(500).json({ 
    error: 'Internal server error',
    requestId: req.id // Untuk tracking tanpa bocorkan detail
  });
});
```

---

## Checklist Deployment

1. [ ] Semua secret di environment variables
2. [ ] .env tidak di-commit
3. [ ] HTTPS aktif
4. [ ] Security headers terpasang
5. [ ] npm audit clean
6. [ ] Error tidak bocorkan internal info
7. [ ] Debug mode off di production
8. [ ] Log tidak mengandung password/token

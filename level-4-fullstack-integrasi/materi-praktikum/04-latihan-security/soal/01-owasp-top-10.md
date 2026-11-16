# SOAL 01 — OWASP Top 10 Overview + Zod Validation

## Tujuan
Memahami OWASP Top 10 2021, mengidentifikasi vulnerability dalam kode, dan mengimplementasikan input validation dengan Zod untuk mencegah berbagai serangan.

---

## OWASP Top 10 2021 — Quick Reference

| Rank | Category | Example Attack |
|------|----------|----------------|
| A01 | Broken Access Control | User akses data user lain via IDOR |
| A02 | Cryptographic Failures | Sensitive data exposure (no encryption) |
| A03 | Injection | SQL Injection, XSS, Command Injection |
| A04 | Insecure Design | No rate limiting, weak auth flow |
| A05 | Security Misconfiguration | Default creds, verbose errors, exposed stack trace |
| A06 | Vulnerable Components | Outdated libraries |
| A07 | Auth Failures | Weak passwords, credential stuffing |
| A08 | Data Integrity Failures | No integrity check, tampered data |
| A09 | Logging Failures | No logging → undetected breach |
| A10 | SSRF | Server fetches malicious URL |

---

## Studi Kasus

Anda membangun API untuk aplikasi e-commerce. Berikut endpoint yang perlu diamankan:

```javascript
// Vulnerable endpoint example (TIDAK AMAN):
app.post('/api/orders', (req, res) => {
  const { userId, productId, quantity } = req.body;
  // Langsung insert ke DB tanpa validasi
  db.query(`INSERT INTO orders VALUES (${userId}, ${productId}, ${quantity})`);
});
```

---

## Tugas

### Soal 1A — Vulnerability Analysis
Untuk setiap skenario berikut, identifikasi:
- OWASP category apa yang terkait?
- Jenis serangan apa yang mungkin?
- Bagaimana cara memperbaikinya?

```bash
# Skenario 1: User bisa akses /api/users/123 dan /api/users/124
# Bahkan tanpa login
# OWASP Category:
# Serangan:
# Fix:

# Skenario 2: Search box menjalankan command SQL:
# Input: "'; DROP TABLE users; --"
# OWASP Category:
# Serangan:
# Fix:

# Skenario 3: API tidak ada rate limit, attacker bisa spam login
# OWASP Category:
# Serangan:
# Fix:

# Skenario 4: Error message menampilkan full stack trace ke user
# OWASP Category:
# Serangan:
# Fix:
```

### Soal 1B — Implementasi Zod Validation
Lihat file `code/01-zod-validation.js`. Lengkapi:

```javascript
// npm install zod

const { z } = require('zod');

// TODO 1: User registration schema
// - email: valid email format
// - password: min 8 chars, harus ada uppercase + number
// - nama: min 2 chars, max 100 chars

// const userSchema = z.object({ ... });

// TODO 2: Order creation schema
// - productId: positive integer
// - quantity: integer 1-99
// - shippingAddress: object { street, city, postalCode }
//   - street: min 5 chars
//   - city: min 2 chars
//   - postalCode: 5 digit format

// TODO 3: Login schema
// - email: valid email
// - password: min 1 char (any)

/*
// Validation function helper
function validate(schema, data) {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.errors };
  }
}
*/

// TODO 4: Create Express middleware untuk validasi
// function validateBody(schema) {
//   return (req, res, next) => {
//     const result = validate(schema, req.body);
//     if (!result.success) {
//       return res.status(400).json({ errors: result.errors });
//     }
//     req.validatedBody = result.data;
//     next();
//   };
// }

// TODO 5: Apply ke endpoint
// app.post('/api/auth/register',
//   validateBody(userSchema),
//   async (req, res) => { ... }
// );

// TODO 6: Sanitization (bonus)
// - Trim whitespace dari semua string input
// - Remove HTML tags dari input text
// - Convert email ke lowercase
```

### Soal 1C — Defense in Depth
Jawab pertanyaan berikut:

```bash
# 1. Apakah input validation di frontend cukup? Mengapa tetap butuh validasi di backend?
# Jawaban:

# 2. Apa bedanya allowlist vs denylist approach dalam validasi?
#    Mana yang lebih direkomendasikan?
# Jawaban:

# 3. Zod vs built-in validation manual — keuntungan menggunakan Zod?
# Jawaban:
```

---

## Kriteria Penilaian
- [ ] Schema Zod untuk user registration dengan email validation dan password strength
- [ ] Schema Zod untuk order creation dengan nested object validation
- [ ] Validation middleware yang return 400 dengan errors
- [ ] Applied ke endpoint registration
- [ ] Memahami OWASP Top 10 categories
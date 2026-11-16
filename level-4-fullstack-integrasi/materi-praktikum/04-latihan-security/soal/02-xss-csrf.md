# SOAL 02 — XSS & CSRF Prevention

## Tujuan
Mengidentifikasi dan mencegah Cross-Site Scripting (XSS) dan Cross-Site Request Forgery (CSRF) attacks dengan sanitization dan CSRF token.

---

## Briefing
User-generated content (komentar, post, bio) adalah target utama XSS attack. Attackers bisa inject malicious JavaScript yang akan berjalan di browser victim.

---

## Studi Kasus — Vulnerable Comment Form

```javascript
// Vulnerable code (TIDAK AMAN):
app.post('/api/comments', (req, res) => {
  const { content, authorId } = req.body;
  // Simpan apa adanya tanpa sanitization
  db.query(`INSERT INTO comments (content, author_id) VALUES (?, ?)`, [content, authorId]);

  // Vulnerable render:
  // <div>{comment.content}</div>  ← attacker bisa inject <script>alert('xss')</script>
});
```

---

## XSS Types

| Type | Description | Example |
|------|-------------|---------|
| Reflected | Payload di URL, tidak stored | `site.com/search?q=<script>...</script>` |
| Stored | Payload tersimpan di DB | Comment dengan `<script>` tag |
| DOM-based | Manipulasi DOM di client-side | `innerHTML` dengan user input |

---

## Tugas

### Soal 2A — XSS Attack Identification

```bash
# Identifikasi apakah skenario berikut vulnerable terhadap XSS:

# 1. User input langsung di-render dengan dangerouslySetInnerHTML
#    Vulnerable? Ya/Tidak → Kenapa?

# 2. User input di-escape sebelum render (HTML entities)
#    Vulnerable? Ya/Tidak → Kenapa?

# 3. User input tidak di-sanitize dan disimpan di database
#    Vulnerable? Ya/Tidak → Kenapa?

# 4. API endpoint yang menampilkan user input dalam response
#    tanpa Content-Type: application/json
#    Vulnerable? Ya/Tidak → Kenapa?
```

### Soal 2B — Sanitization Implementation
Lihat file `code/02-xss-csrf.js`. Lengkapi:

```javascript
// npm install dompurify jsdom

// ============================================
// PART 1: XSS PREVENTION
// ============================================

// TODO 1: HTML sanitization function
// - Gunakan DOMPurify untuk sanitize HTML
// - Allowlist: hanya tag <b>, <i>, <p>, <br>, <ul>, <li>
// - Hapus semua event handlers (onclick, onerror, dst)
// - Hapus javascript: URLs

// function sanitizeHTML(dirty) {
//   // return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [...], ALLOWED_ATTR: [] })
// }

// TODO 2: Input validation (before saving to DB)
// - Trim whitespace
// - Remove null bytes
// - Max length check (prevent DoS dengan 10MB input)
// function sanitizeInput(input) {
//   // return string yang aman
// }

// TODO 3: Content Security Policy header
// - Di set header: Content-Security-Policy
// - Default-src 'self'
// - Script-src 'self'
// - Style-src 'self' 'unsafe-inline' (hanya untuk demo)
// - img-src 'self' data:
// function setSecurityHeaders(app) {
//   app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'");
//     // ...
//   });
// }

// ============================================
// PART 2: CSRF PREVENTION
// ============================================

// TODO 4: CSRF Token generation & validation
// - Generate: crypto.randomBytes(32).toString('hex')
// - Store di session (atau httpOnly cookie)
// - Validate: check token dari request body/header match dengan session

// const csrfTokens = new Map(); // sessionId → token

// function generateCSRFToken(sessionId) {
//   // Generate token
//   // Store in Map
//   // Return token
// }

// function validateCSRFToken(sessionId, token) {
//   // Get stored token
//   // Timing-safe compare (secrets harus compared dengan timing-safe method)
//   // Return true/false
// }

// TODO 5: CSRF middleware
// function csrfMiddleware(req, res, next) {
//   // Skip untuk GET, HEAD, OPTIONS (safe methods)
//   // Untuk POST/PUT/DELETE: validate token
//   // Jika invalid: 403 Forbidden
// }

// TODO 6: CSRF token endpoint
// - GET /api/csrf-token → return token untuk frontend
// - Token di-set di cookie (httpOnly) atau kirim via body
```

### Soal 2C — CSRF Attack Analysis

```bash
# 1. Bagaimana CSRF attack bekerja?
#    Jelaskan langkah-langkah penyerangan dari perspective attacker.
# Jawaban:

# 2. Mengapa GET request tidak perlu CSRF protection?
#    Tapi POST/PUT/DELETE perlu?
# Jawaban:

# 3. Apa itu double-submit cookie pattern?
#    Bagaimana perbandingannya dengan CSRF token di server-side session?
# Jawaban:

# 4. SameSite cookie attribute — bagaimana membantu mencegah CSRF?
#    Jelaskan perbedaan Strict, Lax, dan None.
# Jawaban:
```

### Soal 2D — SameSite Cookie

```javascript
// Implementasikan cookie dengan SameSite attribute

// function setAuthCookie(res, token) {
//   res.cookie('session_token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict', // atau 'lax'
//     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//   });
// }

// Pertanyaan:
// - sameSite: 'strict' — cookie hanya dikirim untuk request same-site
//   Ini BLOCK semua CSRF. Tapi juga bisa terlalu strict.
//   Contoh ketika user klik link dari email ke checkout?
// - sameSite: 'lax' — cookie dikirim untuk top-level navigation GET
//   Ini lebih user-friendly. CSRF dengan POST masih terblokir.
// - sameSite: 'none' — cookie dikirim untuk cross-site requests
//   BUTUH secure: true. Hanya gunakan jika ada valid alasan.
```

---

## Kriteria Penilaian
- [ ] HTML sanitization dengan allowlist untuk safe tags
- [ ] CSP header dikonfigurasi dengan benar
- [ ] CSRF token generation dan validation diimplementasikan
- [ ] CSRF middleware diterapkan untuk semua mutating methods
- [ ] SameSite cookie attribute dikonfigurasi
- [ ] Memahami perbedaan XSS types dan cara mitigasi masing-masing
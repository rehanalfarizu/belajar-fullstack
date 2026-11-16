# Solusi — JANGAN DIBUKA DULU
> **Stop.** File ini berisi jawaban lengkap latihan di folder ini. Kalau kamu buka sekarang, otakmu cuma belajar *membaca* jawaban, bukan *menemukannya*.
>
> Buka hanya setelah:
>
> 1. kamu sudah mencoba sendiri minimal 30 menit,
> 2. kamu sudah menulis di jurnal apa yang kamu coba dan di mana macetnya,
> 3. versimu sudah jalan (atau kamu benar-benar buntu setelah mengikuti tangga "Petunjuk Kalau Macet" di `TUGAS.md`).
>
> Setelah membuka: **jangan salin**. Tutup file ini, ketik ulang dari ingatan, lalu bandingkan keputusan desainnya dengan punyamu dan catat bedanya.
Isi di bawah adalah kode asli starter sebelum dikosongkan, utuh tanpa diubah. Kode lama itu mengandung komentar `SOLUSI`, `Full Implementation`, atau fungsi `working*` — semuanya jawaban.

---

## `code/01-zod-validation.js`

````js
// ============================================================
// 01 — ZOD VALIDATION
// Input validation middleware for Express using Zod
// ============================================================
// Install: npm install zod
// Usage: import { z } from 'zod'; then create schemas below

const { z } = require('zod');

// ============================================================
// TODO 1: User Registration Schema
// ============================================================
const userRegistrationSchema = z.object({
  // TODO: email — must be valid email format
  // TODO: password — min 8 chars, must have uppercase AND number (regex)
  // TODO: name — min 2 chars, max 100 chars, trimmed
});

// ============================================================
// TODO 2: User Login Schema
// ============================================================
const userLoginSchema = z.object({
  // TODO: email — valid email format
  // TODO: password — min 1 char (any non-empty)
});

// ============================================================
// TODO 3: Post Creation Schema
// ============================================================
const postSchema = z.object({
  // TODO: title — min 3 chars, max 255 chars
  // TODO: content — min 10 chars (or allow empty string?)
  // TODO: tags — optional array of strings, each max 50 chars, max 10 tags
  // TODO: status — optional, enum: 'draft' | 'published', default: 'draft'
});

// ============================================================
// TODO 4: Order Schema (nested objects)
// ============================================================
const orderSchema = z.object({
  // TODO: productId — positive integer
  // TODO: quantity — integer between 1 and 99
  // TODO: shippingAddress — object:
  //   - street: min 5 chars
  //   - city: min 2 chars
  //   - postalCode: regex matching 5 digits (e.g., "12345")
});

// ============================================================
// TODO 5: Validation helper function
// ============================================================
function validate(schema, data) {
  // TODO: try schema.safeParse(data)
  // TODO: if success: return { success: true, data: result.data }
  // TODO: if fail: return { success: false, errors: result.error.flatten().fieldErrors }
}

// ============================================================
// TODO 6: Validation middleware factory
// ============================================================
// function validateBody(schema) {
//   return (req, res, next) => {
//     // TODO: validate(req.body) using the helper above
//     // TODO: if !success: return res.status(400).json({ errors })
//     // TODO: if success: req.validatedBody = data, next()
//   };
// }

// ============================================================
// TODO 7: Query param validation (for pagination, etc.)
// ============================================================
function validatePaginationParams(query) {
  // TODO: parse page (default 1, min 1)
  // TODO: parse limit (default 10, min 1, max 100)
  // TODO: return { page, limit } as numbers
}

// ============================================================
// TODO 8: Sanitization — clean input before validation
// ============================================================
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .trim()           // Remove leading/trailing whitespace
    .replace(/\0/g, '') // Remove null bytes
    .slice(0, 10000);  // Max length: 10k chars
}

// ============================================================
// WORKING IMPLEMENTATION (uncomment to use)
// ============================================================

// User registration schema (working)
const workingUserSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
    .regex(/[0-9]/, 'Password harus mengandung angka'),
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100).trim(),
});

// Post schema (working)
const workingPostSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter').max(255),
  content: z.string().min(10, 'Konten minimal 10 karakter'),
  tags: z.array(z.string().max(50)).max(10).optional().default([]),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Order schema (working)
const workingOrderSchema = z.object({
  productId: z.number().int().positive('Product ID harus bilangan bulat positif'),
  quantity: z.number().int().min(1).max(99, 'Quantity maksimal 99'),
  shippingAddress: z.object({
    street: z.string().min(5, 'Alamat minimal 5 karakter'),
    city: z.string().min(2, 'Kota minimal 2 karakter'),
    postalCode: z.string().regex(/^\d{5}$/, 'Kode pos harus 5 digit'),
  }),
});

// Validation function (working)
function workingValidate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
  };
}

// Validation middleware (working)
function workingValidateBody(schema) {
  return (req, res, next) => {
    const result = workingValidate(schema, req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.errors });
    }
    req.validatedBody = result.data;
    next();
  };
}

// Pagination (working)
function workingValidatePagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10) || 10));
  return { page, limit };
}

// ============================================================
// USAGE IN EXPRESS
// ============================================================
/*
const express = require('express');
const app = express();
app.use(express.json());

// Apply validation to routes
app.post('/api/auth/register',
  workingValidateBody(workingUserSchema),
  (req, res) => {
    // req.validatedBody is guaranteed to be valid here
    const { email, password, name } = req.validatedBody;
    // ... create user
  }
);

app.post('/api/posts',
  workingValidateBody(workingPostSchema),
  (req, res) => {
    const { title, content, tags, status } = req.validatedBody;
    // ... create post
  }
);

app.get('/api/posts',
  (req, res, next) => {
    req.pagination = workingValidatePagination(req.query);
    next();
  },
  (req, res) => {
    const { page, limit } = req.pagination;
    // ... fetch posts
  }
);
*/

module.exports = {
  userRegistrationSchema: workingUserSchema,
  userLoginSchema: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
  postSchema: workingPostSchema,
  orderSchema: workingOrderSchema,
  validate: workingValidate,
  validateBody: workingValidateBody,
  validatePagination: workingValidatePagination,
  sanitizeInput,
};
````

---

## `code/02-xss-csrf.js`

````js
// ============================================================
// 02 — XSS & CSRF PREVENTION
// Sanitization, CSP headers, and CSRF token implementation
// ============================================================
// Install: npm install dompurify jsdom helmet csurf
// For Node < 18: npm install node-fetch@2
// Usage: See usage examples at the bottom of this file

const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

// ============================================================
// PART 1: XSS PREVENTION — HTML Sanitization
// ============================================================

// TODO 1: sanitizeHTML function using DOMPurify
// - Allow tags: b, i, p, br, ul, ol, li, strong, em, a, blockquote
// - Allow attributes: href (for a tag only, must start with http/https)
// - Strip all event handlers (onclick, onerror, onload, etc.)
// - Strip javascript: URLs

function sanitizeHTML(dirty) {
  // TODO: Use DOMPurify to sanitize
  // DOMPurify.toStaticMarkup(dirty, { ALLOWED_TAGS: [...], ALLOWED_ATTR: [...] })
  // Return sanitized string
}

// TODO 2: sanitizeInput function — text input sanitization
// - Trim whitespace
// - Remove null bytes
// - Remove/replace control characters
// - Max length 10000 chars
function sanitizeInput(input) {
  // TODO: Handle non-string inputs
  // TODO: Trim
  // TODO: Remove null bytes (\0)
  // TODO: Max length check
  // TODO: Return sanitized string
}

// ============================================================
// PART 2: CSP HEADERS
// ============================================================

// TODO 3: Helmet CSP configuration
const cspConfig = {
  // TODO: default-src: 'self'
  // TODO: script-src: 'self' (no 'unsafe-inline')
  // TODO: style-src: 'self' 'unsafe-inline' (needed for some CSS-in-JS)
  // TODO: img-src: 'self' data: (data: for base64 images)
  // TODO: connect-src: 'self' (AJAX/WebSocket destinations)
  // TODO: font-src: 'self'
  // TODO: object-src: 'none' (no Flash/object embeds)
  // TODO: frame-ancestors: 'none' (prevent clickjacking)
  // TODO: form-action: 'self' (restrict form submissions)
  // TODO: base-uri: 'self'
  // TODO: upgrade-insecure-requests: (only in production)
};

// ============================================================
// PART 3: CSRF TOKEN
// ============================================================

const crypto = require('crypto');
const csrfTokens = new Map(); // sessionId → { token, expiresAt }

// TODO 4: Generate CSRF token
// - Generate: crypto.randomBytes(32).toString('hex')
// - Store in Map with sessionId key
// - Expires in 1 hour
// - Return token
function generateCSRFToken(sessionId = 'default-session') {
  // TODO: Generate random token
  // TODO: Store in Map with expiry (Date.now() + 3600000)
  // TODO: Return token
}

// TODO 5: Validate CSRF token
// - Get stored token from Map
// - Check if expired
// - Use timing-safe comparison (crypto.timingSafeEqual)
// - Return boolean
function validateCSRFToken(sessionId, token) {
  // TODO: Get stored data
  // TODO: Check expiry
  // TODO: Timing-safe compare
  // TODO: Return true/false
}

// TODO 6: CSRF middleware
// - Skip for GET, HEAD, OPTIONS (safe methods)
// - For POST/PUT/PATCH/DELETE:
//   - Get token from header (X-CSRF-Token) or body (_csrf)
//   - Validate against stored token
//   - If invalid: 403 Forbidden
//   - If valid: next()
function csrfMiddleware(req, res, next) {
  // TODO: Check if safe method → skip
  // TODO: Extract token from header/body
  // TODO: Validate token
  // TODO: If invalid → res.status(403).json({ error: 'CSRF token tidak valid' })
  // TODO: If valid → next()
}

// ============================================================
// PART 4: SameSite Cookie
// ============================================================

// TODO 7: Secure cookie setter
// - httpOnly: true (prevents JS access — important!)
// - secure: true in production, auto in development
// - sameSite: 'strict' (blocks all cross-site requests)
//   or 'lax' (allows top-level navigation, blocks CSRF POST)
// - maxAge: 7 days in ms
function setSecureCookie(res, name, value) {
  // TODO: res.cookie(name, value, { httpOnly, secure, sameSite, maxAge })
}

// ============================================================
// WORKING IMPLEMENTATION (uncomment to use)
// ============================================================

// Simple sanitize without DOMPurify (basic escape)
function workingSanitizeHTML(dirty) {
  if (typeof dirty !== 'string') return '';
  return dirty
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Helmet working config
function applySecurityHeaders(app) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
        baseUri: ["'self'"],
      },
    },
    frameguard: { action: 'deny' },
    xContentTypeOptions: true,
    xDnsPrefetchControl: { allow: false },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));
}

// CSRF working implementation
const csrfStore = new Map();

function workingGenerateCSRFToken(sessionId = 'anon') {
  const token = crypto.randomBytes(32).toString('hex');
  csrfStore.set(sessionId, {
    token,
    expiresAt: Date.now() + 3600000,
  });
  return token;
}

function workingValidateCSRFToken(sessionId, token) {
  const stored = csrfStore.get(sessionId);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    csrfStore.delete(sessionId);
    return false;
  }
  if (token !== stored.token) return false;
  return true;
}

function workingCsrfMiddleware(req, res, next) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) return next();

  const sessionId = req.headers['x-session-id'] || 'anon';
  const token = req.headers['x-csrf-token'] || req.body?._csrf;

  if (!workingValidateCSRFToken(sessionId, token)) {
    return res.status(403).json({
      error: 'CSRF token tidak valid atau expired',
      code: 'CSRF_ERROR',
    });
  }
  next();
}

// ============================================================
// DEMONSTRATION SERVER
// ============================================================

const app = express();
app.use(express.json());

// Apply security headers
applySecurityHeaders(app);

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  const sessionId = req.headers['x-session-id'] || 'anon';
  const token = workingGenerateCSRFToken(sessionId);
  res.json({ token });
});

// Insecure endpoint (no sanitization) — for demonstration
app.post('/api/comments/insecure', (req, res) => {
  // This is vulnerable! Do not use in production
  res.json({ message: 'Comment stored (INSECURE)', original: req.body.content });
});

// Secure endpoint (with sanitization)
app.post('/api/comments', workingCsrfMiddleware, (req, res) => {
  const sanitized = workingSanitizeHTML(req.body.content || '');
  res.json({ message: 'Comment stored securely', sanitized });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', security: 'enabled' });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Security server running at http://localhost:${PORT}`);
    console.log('Test CSRF:');
    console.log('  1. GET /api/csrf-token → copy token');
    console.log('  2. POST /api/comments -H "X-CSRF-Token: <token>" -d \'{"content":"hello"}\'');
  });
}

module.exports = {
  sanitizeHTML: workingSanitizeHTML,
  generateCSRFToken: workingGenerateCSRFToken,
  validateCSRFToken: workingValidateCSRFToken,
  csrfMiddleware: workingCsrfMiddleware,
  applySecurityHeaders,
};
````

---

## `code/03-sql-injection.js`

````js
// ============================================================
// 03 — SQL INJECTION PREVENTION
// Parameterized queries, LIKE escaping, ORDER BY allowlisting
// ============================================================
// Install: npm install pg
// This file demonstrates safe vs vulnerable query patterns

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/testdb',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ============================================================
// PART 1: VULNERABLE CODE (FOR LEARNING — DO NOT USE)
// ============================================================

// ❌ VULNERABLE — NEVER do this!
const vulnerableExamples = {
  // String concatenation in query — SQL INJECTION RISK
  searchByName: (name) => `
    SELECT * FROM users WHERE name = '${name}'
  `,
  // ID from params — also vulnerable
  getUserById: (id) => `
    SELECT * FROM users WHERE id = ${id}
  `,
  // Login query
  loginQuery: (email, password) => `
    SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}'
  `,
};

// Exploit payloads for the above (what an attacker would input):
const exploitPayloads = {
  // For name field: "'; DROP TABLE users; --"
  // Result: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
  //
  // For id field: "1 OR 1=1"
  // Result: SELECT * FROM users WHERE id = 1 OR 1=1
  //
  // For email: "admin@email.com' --"
  // Result: SELECT * FROM users WHERE email = 'admin@email.com' --' AND ...
};

// ============================================================
// PART 2: SAFE IMPLEMENTATION — Parameterized Queries
// ============================================================

// TODO 1: Safe SELECT with parameterized query
async function getUserByEmail(email) {
  // TODO: const query = 'SELECT * FROM users WHERE email = $1'
  // TODO: const result = await pool.query(query, [email])
  // TODO: return result.rows[0] || null
}

// TODO 2: Safe SELECT with multiple params
async function getUserById(id) {
  // TODO: Type coerce: const userId = parseInt(id, 10)
  // TODO: If NaN: throw new Error('Invalid ID')
  // TODO: Parameterized: pool.query('SELECT * FROM users WHERE id = $1', [userId])
}

// TODO 3: Safe INSERT
async function createUser(name, email, passwordHash) {
  // TODO: Parameterized: INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)
  // TODO: Return created user (without password)
}

// TODO 4: Safe UPDATE
async function updateUserBio(userId, bio) {
  // TODO: UPDATE users SET bio = $1, updated_at = NOW() WHERE id = $2
  // TODO: Return updated user
}

// TODO 5: Safe DELETE
async function deleteUser(userId) {
  // TODO: DELETE FROM users WHERE id = $1
  // TODO: Return success
}

// ============================================================
// PART 3: LIKE CLAUSE — Escaping wildcards
// ============================================================

// TODO 6: Escape LIKE special characters (%, _, \)
// These have special meaning in LIKE and must be escaped
function escapeLikePattern(input) {
  if (typeof input !== 'string') return '';
  // TODO: Replace % → \pct (but actually just escape the backslash)
  // Better approach: escape \ first, then escape % and _
  // Return the escaped string
  return input
    .replace(/\\/g, '\\\\')   // Escape backslashes first
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_');
}

// TODO 7: Safe LIKE search
async function searchPostsByTitle(keyword) {
  // TODO: Escape keyword with escapeLikePattern()
  // TODO: Append % for partial match: escaped + '%'
  // TODO: Query: SELECT * FROM posts WHERE title LIKE $1 (using $1, not $2!)
  // TODO: Note: The % goes in the PARAMETER VALUE, not the query string
}

// ============================================================
// PART 4: ORDER BY — Allowlist approach
// ============================================================

// Allowed columns for ORDER BY (never accept raw user input!)
const ALLOWED_ORDER_COLUMNS = ['id', 'created_at', 'updated_at', 'title', 'name', 'email'];
const ALLOWED_ORDER_DIR = ['ASC', 'DESC'];

// TODO 8: Safe ORDER BY with allowlist
function getSafeOrderBy(userColumn, userDirection) {
  // TODO: Check if userColumn is in ALLOWED_ORDER_COLUMNS
  // TODO: Check if userDirection is in ALLOWED_ORDER_DIR
  // TODO: Default to: 'id ASC' if invalid
  // TODO: Return: { column: safe, direction: safe }
}

// TODO 9: Paginated query with ORDER BY
async function getPostsPaginated(page = 1, limit = 10, sortBy = 'id', sortDir = 'DESC') {
  const { column, direction } = getSafeOrderBy(sortBy, sortDir);
  const offset = (page - 1) * limit;
  // TODO: Query with ORDER BY using safe column/direction
  // TODO: Count total for pagination
}

// ============================================================
// PART 5: INPUT VALIDATION & TYPE COERCION
// ============================================================

// TODO 10: Safe ID parser
function parseId(id) {
  // TODO: parseInt(id, 10)
  // TODO: If NaN or <= 0: throw new Error('Invalid ID format')
  // TODO: Return safe integer
}

// TODO 11: Strip SQL comments (defense-in-depth — NOT primary defense)
function stripSQLComments(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/--/g, '')   // Single-line comment
    .replace(/\/\*/g, '') // Block comment start
    .replace(/\*\//g, ''); // Block comment end
}

// ============================================================
// PART 6: ERROR HANDLING — Don't expose SQL details
// ============================================================

// TODO 12: Database error handler
function handleDatabaseError(err, res) {
  // TODO: Log full error server-side: console.error('[DB ERROR]', err)
  // TODO: Return generic message to client: 'Terjadi kesalahan sistem'
  // TODO: NEVER return: err.message, err.stack, SQL syntax, table names
  // TODO: Optionally: return error code for internal tracking (not exposed to client)
}

// ============================================================
// PART 7: SECURITY CHECKLIST
// ============================================================
const securityChecklist = {
  mandatory: [
    'All queries use parameterized statements ($1, $2)',
    'Numeric IDs are type-coerced (parseInt) and validated',
    'ORDER BY columns are allowlisted, never from user input',
    'LIKE wildcards are escaped before use',
    'Error messages do not expose SQL details',
  ],
  recommended: [
    'Database user has least privilege (not postgres/root)',
    'ORM used with parameterized queries (not raw when possible)',
    'Query logging for anomaly detection',
    'WAF in front of application',
  ],
};

// ============================================================
// WORKING IMPLEMENTATIONS (uncomment to use)
// ============================================================

async function workingGetUserByEmail(email) {
  const result = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

function workingEscapeLikePattern(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
}

async function workingSearchPosts(keyword) {
  const escaped = workingEscapeLikePattern(keyword);
  const result = await pool.query(
    'SELECT * FROM posts WHERE title ILIKE $1 LIMIT 20',
    [`%${escaped}%`]
  );
  return result.rows;
}

function workingGetSafeOrderBy(userColumn, userDirection) {
  const col = ALLOWED_ORDER_COLUMNS.includes(userColumn) ? userColumn : 'id';
  const dir = ALLOWED_ORDER_DIR.includes(userDirection?.toUpperCase()) ? userDirection.toUpperCase() : 'DESC';
  return { column: col, direction: dir };
}

function workingParseId(id) {
  const parsed = parseInt(id, 10);
  if (isNaN(parsed) || parsed <= 0) {
    throw Object.assign(new Error('Invalid ID format'), { status: 400 });
  }
  return parsed;
}

function workingHandleDbError(err, res) {
  console.error('[DB ERROR]', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan sistem' });
}

// ============================================================
// DEMONSTRATION
// ============================================================
async function demo() {
  console.log('SQL Injection Prevention Module');
  console.log('---');
  console.log('Vulnerable patterns (NEVER use):');
  console.log(Object.keys(vulnerableExamples).join(', '));
  console.log('---');
  console.log('Safe patterns: parameterized queries');
  console.log('LIKE escape:', workingEscapeLikePattern('100%_test'));
  console.log('Safe ORDER BY:', workingGetSafeOrderBy('title', 'ASC'));
  console.log('Safe ORDER BY (invalid):', workingGetSafeOrderBy('DROP TABLE', 'hax'));
  console.log('Parse ID:', workingParseId('42'));
}

if (require.main === module) {
  demo().catch(console.error);
}

module.exports = {
  getUserByEmail: workingGetUserByEmail,
  searchPostsByTitle: workingSearchPosts,
  getSafeOrderBy: workingGetSafeOrderBy,
  parseId: workingParseId,
  escapeLikePattern: workingEscapeLikePattern,
  handleDatabaseError: workingHandleDbError,
  securityChecklist,
};
````

---

## 01-owasp-top-10 — TODO 4-5 — helper validate dan middleware validateBody

````js
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
````

---

## 02-xss-csrf — TODO 3 — header CSP

````js
// function setSecurityHeaders(app) {
//   app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'");
//     // ...
//   });
// }
````

---

## 02-xss-csrf — SameSite cookie — setAuthCookie

````js
// function setAuthCookie(res, token) {
//   res.cookie('session_token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict', // atau 'lax'
//     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//   });
// }
````

---

## 03-sql-injection — TODO 1-4 — query berparameter

````js
// TODO 1: Parameterized SELECT
// Sebelum: `SELECT * FROM users WHERE email = '${email}'`
// Sesudah: `SELECT * FROM users WHERE email = $1`
// Dengan: pool.query(query, [email])

// TODO 2: Parameterized INSERT
// INSERT INTO users (name, email) VALUES ($1, $2)
// Params: [name, email]

// TODO 3: Parameterized UPDATE
// UPDATE users SET bio = $1 WHERE id = $2
// Params: [bio, id]

// TODO 4: Parameterized DELETE
// DELETE FROM posts WHERE id = $1
````

---

## 03-sql-injection — TODO 6 — safeOrderBy

````js
// function safeOrderBy(allowedColumns, userInput) {
//   if (allowedColumns.includes(userInput)) {
//     return userInput;
//   }
//   return 'id'; // default
// }
````

---

## 03-sql-injection — TODO 7 — contoh Prisma

````js
/*
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Safe by default — Prisma uses parameterized queries internally
const users = await prisma.user.findMany({
  where: { email: userInput }
});

// vs raw query (tetap harus parameterized):
const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`;
// CATATAN: tagged template ini baru di Prisma 4+
*/
````

---

## 03-sql-injection — TODO 8 — contoh Sequelize

````js
/*
const { User } = require('./models');

const users = await User.findAll({
  where: { email: userInput } // Sequelize auto-parameterizes
});
*/
````

---

## 03-sql-injection — TODO 11 — handleDatabaseError

````js
// function handleDatabaseError(err, res) {
//   console.error('[DB ERROR]', err.message);
//   res.status(500).json({ error: 'Terjadi kesalahan sistem' });
// }
````

---

## 04-security-headers — TODO 3 — globalLimiter

````js
// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: 'Terlalu banyak request' },
//   standardHeaders: true, // Return rate limit info in headers
//   legacyHeaders: false,
// });
````

---

## 04-security-headers — TODO 4 — authLimiter

````js
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   skipSuccessfulRequests: true, // Jangan hitung jika login berhasil
// });
````

---

## 04-security-headers — TODO 6 — pasang rate limiter

````js
// app.use(globalLimiter);
// app.use('/api/auth', authLimiter);
// app.use('/api', apiLimiter);
````

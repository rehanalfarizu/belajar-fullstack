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
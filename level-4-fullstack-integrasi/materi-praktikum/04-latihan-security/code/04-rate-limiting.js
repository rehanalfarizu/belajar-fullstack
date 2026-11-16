// ============================================================
// 04 — RATE LIMITING & SECURITY HEADERS
// express-rate-limit, helmet, and security event logging
// ============================================================
// Install: npm install express helmet express-rate-limit morgan winston
// Run: node code/04-rate-limiting.js

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());

// ============================================================
// PART 1: HELMET — Security Headers
// ============================================================

// TODO 1: Configure helmet with custom CSP
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'"],
//       objectSrc: ["'none'"],
//       frameAncestors: ["'none'"],
//     },
//   },
//   frameguard: { action: 'deny' },
//   xContentTypeOptions: 'nosniff',
//   xXssProtection: '1; mode=block',
// }));

// TODO 2: Custom security headers (beyond helmet defaults)
// app.use((req, res, next) => {
//   res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
//   res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
//   next();
// });

// ============================================================
// PART 2: RATE LIMITING
// ============================================================

// TODO 3: Global rate limiter (all endpoints)
// - Window: 15 minutes
// - Max: 100 requests per IP
// - Include standard rate limit headers
// - Custom message when exceeded
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,  // Return rate limit info in headers
  legacyHeaders: false,   // Disable X-RateLimit-* headers
  message: {
    error: 'Terlalu banyak request. Coba lagi dalam beberapa menit.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  // Skip certain paths (health check, static assets)
  // skip: (req) => ['/api/health', '/favicon.ico'].includes(req.path),
});

// TODO 4: Auth rate limiter (login, register, password reset)
// - Window: 15 minutes
// - Max: 5 failed attempts per IP
// - Only count failed requests (optional: skipSuccessfulRequests)
// - Key by IP only (or IP + user-agent for more granularity)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, // Don't count successful logins
  keyGenerator: (req) => {
    // TODO: Return key for rate limiting (IP by default)
    // Optionally: return req.ip + '-' + req.headers['user-agent']
  },
  message: {
    error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.',
    code: 'AUTH_RATE_LIMITED',
  },
});

// TODO 5: API rate limiter (heavy endpoints)
// - Window: 1 minute
// - Max: 30 requests per IP per minute
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 30,
  message: {
    error: 'Terlalu banyak request API. Perlambat.',
    code: 'API_RATE_LIMITED',
  },
});

// TODO 6: Strict limiter for sensitive operations
// - Window: 1 hour
// - Max: 3 password change requests
// - For: password reset, email change, account deletion
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 3,
  message: {
    error: 'Terlalu banyak permintaan. Coba lagi dalam 1 jam.',
    code: 'STRICT_RATE_LIMITED',
  },
});

// Apply rate limiters
// app.use(globalLimiter);         // All requests
// app.use('/api/auth', authLimiter);     // Auth endpoints only
// app.use('/api/posts', apiLimiter);     // Heavy read endpoints
// app.use('/api/password', strictLimiter); // Very sensitive

// ============================================================
// PART 3: SECURITY EVENT LOGGING
// ============================================================

const securityEvents = {
  FAILED_LOGIN: 'FAILED_LOGIN',
  RATE_LIMIT_HIT: 'RATE_LIMIT_HIT',
  SUSPICIOUS_PATH: 'SUSPICIOUS_PATH',
  INVALID_TOKEN: 'INVALID_TOKEN',
  SQL_INJECTION_ATTEMPT: 'SQL_INJECTION_ATTEMPT',
  XSS_ATTEMPT: 'XSS_ATTEMPT',
};

// TODO 7: Security logger
// Log format: [SECURITY] TIMESTAMP | EVENT_TYPE | IP | USER_AGENT | DETAILS
function logSecurityEvent(eventType, details = {}) {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    eventType,
    ...details,
  };
  // In production: use proper logger (winston, pino)
  // In development: just console for visibility
  console.log(`[SECURITY] ${timestamp} | ${eventType} | ${details.ip || '?'} | ${JSON.stringify(entry)}`);

  // TODO: Store in database or log file for later analysis
  // TODO: Optionally: alert if threshold exceeded (e.g., 10 failed logins in 1 min)
}

// TODO 8: Failed login logger
// Log: timestamp, IP, attempted email (not actual password!)
function logFailedLogin(ip, email, reason = 'invalid_credentials') {
  // TODO: logSecurityEvent(SECURITY_EVENTS.FAILED_LOGIN, { ip, email, reason })
}

// TODO 9: Suspicious path detector
// Detect: paths containing .env, /admin, /wp-, /.git, etc.
function detectSuspiciousPath(req, res, next) {
  const suspiciousPatterns = [
    /\.env/, /\.git/, /\/admin/, /\/wp-admin/, /\/wp-login/,
    /\.\./,               // Path traversal attempts
    /<script|javascript:/i, // XSS in URL
    /union.*select/i,     // SQL injection
  ];

  const path = req.path.toLowerCase();

  // TODO: Check if any pattern matches
  // TODO: If suspicious: logSecurityEvent(SUSPICIOUS_PATH, { path, ip, ua })
  // TODO: Still allow request (don't block by path — might be false positive)
  //       But flag for review

  next();
}

// TODO 10: Response time anomaly detector
// Flag: requests taking > 5 seconds (possible DoS or slowloris)
function responseTimeMiddleware(req, res, next) {
  const start = Date.now();
  // TODO: On res.finish, calculate duration = Date.now() - start
  // TODO: If duration > 5000: logSecurityEvent(SLOW_REQUEST, { path, duration, ip })
  next();
}

// ============================================================
// PART 4: COMPLETE MIDDLEWARE STACK
// ============================================================
/*
Final middleware configuration:

1. helmet()                  // Security headers
2. detectSuspiciousPath       // Flag suspicious requests
3. responseTimeMiddleware     // Monitor slow requests
4. globalLimiter              // General rate limit
5. morgan('combined')         // Request logging
6. express.json()             // Body parser
7. Your routes here...
8. Global error handler
*/

// ============================================================
// DEMO SERVER
// ============================================================

// Apply all security middleware (demo mode)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
}));

app.use(detectSuspiciousPath);

// Health check (not rate limited)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth endpoints (rate limited)
app.post('/api/auth/login', authLimiter, (req, res) => {
  const { email, password } = req.body;
  // Demo: always fail (to test rate limiting)
  logFailedLogin(req.ip, email);
  res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/auth/register', authLimiter, (req, res) => {
  res.status(201).json({ message: 'Registered (demo)' });
});

// Search endpoint (rate limited)
app.get('/api/posts/search', apiLimiter, (req, res) => {
  res.json({ data: [], query: req.query.q });
});

// Rate limit status endpoint
app.get('/api/rate-limit-test', globalLimiter, (req, res) => {
  res.json({ message: 'This request is rate limited' });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Security server running at http://localhost:${PORT}`);
    console.log('Test rate limiting:');
    console.log('  for i in {1..6}; do curl http://localhost:3001/api/auth/login -X POST; done');
    console.log('  (5th+ request should be rate limited)');
  });
}

module.exports = {
  globalLimiter,
  authLimiter,
  apiLimiter,
  strictLimiter,
  logSecurityEvent,
  logFailedLogin,
  securityEvents,
};
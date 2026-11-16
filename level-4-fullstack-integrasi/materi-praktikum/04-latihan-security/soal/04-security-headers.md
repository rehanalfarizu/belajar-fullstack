# SOAL 04 — Security Headers & Rate Limiting

## Tujuan
Mengimplementasikan security HTTP headers dengan Helmet, rate limiting untuk mencegah brute force dan DoS attacks, dan logging/monitoring security events.

---

## Briefing
Security headers memberikan layer defense tambahan. Rate limiting mengontrol berapa banyak request yang bisa dilakukan client dalam waktu tertentu, mencegah abuse.

---

## Security Headers Reference

| Header | Fungsi | Contoh Nilai |
|--------|--------|--------------|
| `Content-Security-Policy` | Prevent XSS/injection | `default-src 'self'` |
| `X-Frame-Options` | Prevent clickjacking | `DENY` |
| `X-Content-Type-Options` | Prevent MIME sniffing | `nosniff` |
| `Strict-Transport-Security` | Force HTTPS | `max-age=31536000` |
| `X-XSS-Protection` | XSS filter (legacy browsers) | `1; mode=block` |
| `Referrer-Policy` | Control referrer info | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disable unnecessary browser features | `geolocation=(), camera=()` |

---

## Studi Kasus

Aplikasi Anda mengalami:
1. Brute force attack: attacker mencoba login 1000x dalam 1 menit
2. API abuse: user memanggil endpoint yang sama 500x dalam 1 menit
3. Clickjacking attempt: iframe embedding dari domain mencurigakan

---

## Tugas

### Soal 4A — Rate Limiting Strategy

```bash
# 1. Perbedaan rate limiting vs throttling?
# Jawaban:

# 2. Kapan menggunakan sliding window vs fixed window rate limit?
# Jawaban:

# 3. Redis vs in-memory store untuk rate limiting — kapan pilih yang mana?
# Jawaban:

# 4. Rate limit response yang baik — HTTP status apa yang digunakan?
#    Header apa yang perlu diset?
# Jawaban:
```

### Soal 4B — Implementasi Rate Limiting & Headers
Lihat file `code/04-rate-limiting.js`. Lengkapi:

```javascript
// npm install helmet express-rate-limit

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// ============================================
// PART 1: HELMET SECURITY HEADERS
// ============================================

// TODO 1: Configure helmet
// - Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'
// - X-Frame-Options: DENY
// - X-Content-Type-Options: nosniff
// - Strict-Transport-Security: max-age=31536000; includeSubDomains
// - Referrer-Policy: strict-origin-when-cross-origin

// app.use(helmet());

// TODO 2: Custom CSP untuk API vs Frontend
// - API: strict CSP (no scripts allowed)
// - Frontend: CSP yang lebih relaxed untuk inline scripts (nonce-based)

// ============================================
// PART 2: RATE LIMITING
// ============================================

// TODO 3: Global rate limiter
// - Window: 15 minutes
// - Max: 100 requests per IP
// - Message: "Terlalu banyak request, coba lagi nanti"
// - Skip successful responses (optional: only count errors)

// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: 'Terlalu banyak request' },
//   standardHeaders: true, // Return rate limit info in headers
//   legacyHeaders: false,
// });

// TODO 4: Auth-specific rate limiter ( lebih strict )
// - Window: 15 minutes
// - Max: 5 attempts per IP
// - Key: based on IP + user agent
// - Message: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit."

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   skipSuccessfulRequests: true, // Jangan hitung jika login berhasil
// });

// TODO 5: API-specific rate limiter
// - Window: 1 minute
// - Max: 30 requests per IP
// - Untuk: /api/posts, /api/users (heavy endpoints)

// TODO 6: Apply rate limiters
// app.use(globalLimiter);
// app.use('/api/auth', authLimiter);
// app.use('/api', apiLimiter);

// ============================================
// PART 3: SECURITY MONITORING
// ============================================

// TODO 7: Failed login logger
// - Log: timestamp, IP, email, user-agent
// - Simpan ke file atau database
// - Threshold: jika 5+ failed logins dari IP sama dalam 10 menit → flag as suspicious

// TODO 8: Request anomaly logger
// - Log: path, method, IP, user-agent, response time
// - Flag: response time > 5 detik
// - Flag: 404 pada path yang mencurigakan (/admin/, /.env, /wp-admin)

// TODO 9: Security event types
const securityEvents = {
  FAILED_LOGIN: 'failed_login',
  RATE_LIMIT_HIT: 'rate_limit_hit',
  SUSPICIOUS_PATH: 'suspicious_path',
  INVALID_TOKEN: 'invalid_token',
  SQL_INJECTION_ATTEMPT: 'sql_injection_attempt',
  XSS_ATTEMPT: 'xss_attempt',
};

// TODO 10: logSecurityEvent function
// function logSecurityEvent(eventType, details) {
//   // Log dengan format: [SECURITY] TIMESTAMP - EVENT_TYPE - details
//   // Include: IP, timestamp, user-agent, event details
// }

// ============================================
// PART 4: COMPLETE MIDDLEWARE STACK
// ============================================

/*
Final middleware order:

1. helmet()              → Security headers
2. globalLimiter          → General rate limit
3. morgan('combined')      → Request logging (bukan security, tapi berguna)
4. customSecurityLogger    → Security event logging
5. express.json()          → Body parser
6. routes                 → Your API routes
7. errorHandler           → Global error handler
*/
```

### Soal 4C — Header Analysis

```bash
# Untuk setiap response header berikut, identifikasi:
# - Apakah aman? (Ya/Tidak)
# - Masalah keamanan apa yang ada?
# - Saran perbaikan

# 1. Strict-Transport-Security: max-age=0
#    Aman? → Masalah:
#    Saran:

# 2. X-Frame-Options: ALLOWALL
#    Aman? → Masalah:
#    Saran:

# 3. Content-Security-Policy: default-src * 'unsafe-inline'
#    Aman? → Masalah:
#    Saran:

# 4. Server: Apache/2.4.41 (Ubuntu)
#    Aman? → Masalah:
#    Saran:
```

### Soal 4D — Rate Limit Configuration

```bash
# Design rate limit untuk skenario berikut:

# Skenario 1: Public API
# - Heavy endpoint (search): ?
# - Read endpoint: ?
# - Auth endpoint: ?

# Skenario 2: Authenticated API (premium user)
# - Heavy endpoint: ?
# - Read endpoint: ?
# - Auth endpoint: ?

# Skenario 3: Admin API
# - Semua endpoint: ?
```

---

## Kriteria Penilaian
- [ ] Helmet dengan CSP yang dikonfigurasi dengan benar
- [ ] Global rate limiter diterapkan
- [ ] Auth rate limiter lebih strict (5 attempts per 15 menit)
- [ ] Security event logging diimplementasikan
- [ ] Response headers di-test dan diverifikasi
- [ ] Memahami perbedaan antara security headers dan rate limiting
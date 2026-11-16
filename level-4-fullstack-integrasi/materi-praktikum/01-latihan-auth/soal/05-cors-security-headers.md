# SOAL 05 — CORS Configuration & Security Headers

## Tujuan
Memahami CORS, helmet, dan keamanan HTTP headers.

---

## Briefing
Konfigurasi keamanan server: CORS, helmet, rate limiting.

---

## Syarat (Checklist)

### CORS
- [ ] `npm install cors helmet express-rate-limit`
- [ ] Allow specific origins (bukan `*` di production)
- [ ] Allow specific methods: GET, POST, PUT, DELETE
- [ ] Allow credentials: Authorization header
- [ ] Preflight request handling

### Helmet
- [ ] `helmet()` — set security headers otomatis
- [ ] Content-Security-Policy
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security (HTTPS only)

### Rate Limiting
- [ ] Global rate limit: 100 req/15 menit
- [ ] Auth routes: 5 req/15 menit (brute force protection)
- [ ] Return 429 Too Many Requests

---

## Contoh Code

Contoh jawaban sengaja tidak ditaruh di sini. Tulis sendiri dulu berdasarkan checklist di atas. Setelah punyamu jalan, bandingkan dengan [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).

---

## Cara Submit
1. Buat server dengan semua security config
2. Test CORS dari browser ( beda origin)
3. Test rate limit: trigger 6x login → dapat 429
# 04 — Latihan Security (OWASP, XSS, SQL Injection, Security Headers)

## Tujuan
Mempelajari dan mengimplementasikan praktik keamanan web: input validation, proteksi dari OWASP Top 10, konfigurasi security headers, dan rate limiting.

---

## Struktur Folder

```
04-latihan-security/
├── soal/
│   ├── 01-owasp-top-10.md
│   ├── 02-xss-csrf.md
│   ├── 03-sql-injection.md
│   └── 04-security-headers.md
├── code/
│   ├── 01-zod-validation.js        (Zod schema validation)
│   ├── 02-xss-csrf.js              (sanitize + CSRF token)
│   ├── 03-sql-injection.js         (parameterized queries)
│   └── 04-rate-limiting.js          (express-rate-limit + helmet)
└── README.md
```

---

## Daftar Latihan

| # | Judul | File Soal | File Code |
|---|-------|-----------|-----------|
| 01 | OWASP Top 10 Overview | `01-owasp-top-10.md` | `01-zod-validation.js` |
| 02 | XSS & CSRF Prevention | `02-xss-csrf.md` | `02-xss-csrf.js` |
| 03 | SQL Injection Prevention | `03-sql-injection.md` | `03-sql-injection.js` |
| 04 | Security Headers & Rate Limiting | `04-security-headers.md` | `04-rate-limiting.js` |

---

## Prasyarat
- Server Express sudah berjalan
- Install dependencies:
  ```bash
  npm install zod helmet express-rate-limit cors csurf
  # atau sesuai kebutuhan setiap soal
  ```

---

## OWASP Top 10 (2021) — Ringkasan

| # | Kategori | Deskripsi Singkat |
|---|----------|-------------------|
| A01 | Broken Access Control | User bisa akses data/fitur yang tidak seharusnya |
| A02 | Cryptographic Failures | Data sensitif tidak terenkripsi |
| A03 | Injection | SQL, NoSQL, OS command injection |
| A04 | Insecure Design | Architecture & design yang lemah |
| A05 | Security Misconfiguration | Default config, verbose error, dll |
| A06 | Vulnerable Components | Library/dependency yang outdated |
| A07 | Auth Failures | Weak auth, credential stuffing |
| A08 | Data Integrity Failures | Tidak validasi integritas data |
| A09 | Logging Failures | Tidak ada logging untuk deteksi serangan |
| A10 | SSRF | Server-side request forgery |

---

## Alur Pengerjaan

1. Baca soal untuk memahami ancaman keamanan.
2. Baca template code untuk melihat pola yang vulnerable.
3. Implementasikan fix di bagian yang ditandai `TODO`.
4. Test dengan tools seperti **Burp Suite**, **OWASP ZAP**, atau manual testing.

---

## Tips
- **Defense in Depth**: jangan rely pada satu layer keamanan saja.
- **Input validation** selalu lakukan di ** kedua sisi** (client & server).
- **Error message** ke user harus generic — jangan expose stack trace.
- **Rate limiting** mencegah brute force attack.
- **Helmet** middleware di Express adalah cara termudah untuk set security headers.

---

**Setelah menyelesaikan LEVEL-4, lanjut ke
[LEVEL-5](../../../LEVEL-5-Expert-Level/)**

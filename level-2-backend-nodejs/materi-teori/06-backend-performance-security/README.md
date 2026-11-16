# Backend Quality, Performance, dan Security — Node/Express

Target Level 2 adalah API yang benar di bawah input buruk, concurrent request,
dependency lambat, dan pengguna yang tidak berhak.

## 1. Boundary dan kontrak

Validasi semua data eksternal sebelum masuk domain:

- path/query/header/body/cookie;
- hasil database yang berasal dari schema lama;
- response third-party;
- file upload dan metadata;
- message dari queue atau WebSocket.

Schema validation harus membatasi tipe, panjang, format, enum, nested depth, dan
jumlah item. Tolak field yang tidak dikenal bila mass assignment berisiko.
Normalisasikan hanya jika aturan bisnisnya jelas.

Error response harus stabil tetapi tidak membocorkan stack, SQL, secret, atau
detail akun. Log internal dapat lebih detail dengan redaction.

## 2. Authentication bukan authorization

Authentication menetapkan identitas. Authorization menentukan apakah identitas
boleh melakukan aksi pada resource tertentu.

```javascript
app.get("/orders/:id", authenticate, async (req, res) => {
  const order = await orders.findById(req.params.id);
  if (!order) return res.status(404).end();
  if (order.ownerId !== req.user.id && req.user.role !== "admin") {
    return res.status(403).end();
  }
  res.json(order);
});
```

Jangan hanya memeriksa role global. Periksa ownership, tenant, status resource,
dan action. Gunakan deny-by-default dan negative authorization tests.

## 3. Event loop dan blocking

Node efisien untuk I/O concurrent, tetapi JavaScript panjang tetap memblokir event
loop. Risiko:

- synchronous filesystem/crypto/compression pada request path;
- regex dengan catastrophic backtracking;
- JSON payload sangat besar;
- loop/serialization besar;
- terlalu banyak Promise tanpa concurrency limit.

Ukur event-loop delay, CPU profile, heap, request rate, error, dan p95/p99 latency.
Pindahkan CPU-heavy work ke worker/background job bila memang perlu, setelah
profiling.

## 4. Database lebih sering menjadi bottleneck

- pilih kolom, jangan selalu `SELECT *`;
- pagination dan hard limit wajib untuk collection;
- index mengikuti query/filter/order nyata;
- periksa query plan;
- hindari N+1;
- gunakan transaction untuk invariant lintas statement;
- connection pool memiliki timeout dan ukuran terbatas;
- batalkan query/request yang tidak lagi dibutuhkan.

Optimistic check-then-update dapat race. Gunakan atomic update, constraint,
transaction/locking, dan test concurrent.

## 5. Cache dan queue

Cache memerlukan key, TTL, invalidation, ukuran, ownership, serta fallback. Hindari:

- cache data antar-tenant dengan key tidak lengkap;
- cache stampede;
- cache error terlalu lama;
- menganggap cache sebagai sumber kebenaran.

Queue cocok untuk pekerjaan lambat yang tidak harus selesai sebelum response.
Consumer harus idempotent, memiliki retry terbatas, dead-letter handling, dan
observability lag.

## 6. Risiko security utama

- Injection: query parameterized, jangan gabung SQL/command string.
- Broken access control: cek ownership/tenant/action di server.
- Security misconfiguration: production error mode, CORS allowlist, headers,
  default account, directory listing, debug endpoint.
- Supply chain: lockfile, review dependency, audit, update policy, provenance.
- Authentication failure: rate limit, generic error, session revocation, MFA pada
  risiko tinggi.
- SSRF: allowlist destination bila server mengambil URL, blok private/link-local
  network, batasi redirect, protocol, timeout, dan response size.
- DoS: body limit, pagination limit, timeout, rate/concurrency limit, backpressure.
- Exceptional condition: fail closed pada authorization, jangan meneruskan request
  ketika dependency/security check error.

## 7. Secret dan logging

Secret berasal dari environment/secret manager dan aplikasi gagal start jika
required secret hilang/lemah. Jangan log:

- authorization header, cookie, password, reset token;
- full payment/identity data;
- raw request body tanpa klasifikasi.

Gunakan request ID dan event terstruktur. Log security event seperti login failure,
authorization denial, rate-limit, secret/config error, dan perubahan privilege,
tetapi cegah log injection dan alert flood.

## 8. Performance/security test

Minimal:

- payload terlalu besar/dalam;
- IDOR: user A membaca/mengubah resource user B;
- duplicate/concurrent request;
- slow dependency dan timeout;
- injection strings;
- pagination ekstrem;
- invalid/expired/revoked session;
- rate-limit behavior;
- cache isolation antar-user/tenant;
- graceful shutdown saat ada request aktif.

Simpan baseline RPS, p95/p99, error rate, CPU, memory, dan query count. Optimasi
dianggap berhasil hanya bila correctness dan security tests tetap lulus.

## Referensi resmi

- [Node.js Learn](https://nodejs.org/en/learn)
- [Node.js security reporting dan update](https://nodejs.org/en/about/security-reporting)
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/0x00_2025-Introduction/)

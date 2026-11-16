# Self Problem Solving — Level 4 Fullstack

Kasus Level 4 harus ditelusuri end-to-end. Bukti minimal: browser Network,
correlation ID/log, API test, query evidence, dan deployment/rollback notes.

## 1. Cookie tidak terkirim

Login sukses tetapi `/me` 401 setelah frontend dan API dideploy pada site berbeda.
Diagnosis `credentials`, CORS exact origin, `Secure`, `SameSite`, domain/path,
proxy/HTTPS, dan browser cookie rejection. Jangan mengubah semua flag sekaligus.

## 2. CSRF

Aplikasi cookie-auth memiliki endpoint transfer. Buat threat model dan lab lokal
yang menunjukkan cross-site request, lalu implementasikan defense sesuai topology:
SameSite, CSRF token/origin validation, content type, dan re-auth untuk risiko
tinggi. Pastikan XSS tetap diperlakukan sebagai risiko terpisah.

## 3. CORS misconception

API server-to-server bekerja tetapi browser diblokir; tim mencoba `origin: "*"`.
Jelaskan enforcement browser, preflight, credentials, cache, dan buat allowlist
yang gagal tertutup untuk origin tidak dikenal.

## 4. Latency waterfall

Dashboard 5 detik walau setiap endpoint “hanya” 500 ms. Trace waterfall browser,
server span, query, dan third party. Parallel-kan request independen, hilangkan
N+1, dan ukur p95 journey, bukan satu endpoint.

## 5. Cache privacy

CDN/cache mengirim profil user A ke user B. Identifikasi cache layer/key/header,
contain incident, purge, perbaiki policy, dan tambahkan isolation regression test.

## 6. Duplicate order

User double-click/retry setelah timeout dan dua order dibuat. Terapkan idempotency
end-to-end, unique constraint/transaction, UI state, dan test request concurrent.

## 7. Zero-downtime migration

Versi baru mengganti nama kolom yang masih dibaca versi lama. Buat rencana
expand–migrate–contract, backfill, compatibility window, observation, dan rollback.

## 8. SSR/CSR trade-off

Halaman yang dipindah ke SSR meningkatkan TTFB/server cost dan masih lambat
interaktif. Bandingkan CSR/SSR/SSG/cache berdasarkan freshness, auth, LCP,
hydration, navigation, dan biaya.

## 9. Deployment incident

Setelah deploy, error rate naik 20% tetapi health endpoint hijau. Buat triage:
declare, metric/log/trace, rollback decision, communication, data integrity check,
dan postmortem.

## 10. Capstone staging

Integrasikan frontend+backend+database dengan HttpOnly session, CSRF defense,
authorization, migrations, CI, HTTPS, structured log/trace ID, performance budget,
security headers, dependency audit, smoke test, backup/restore, dan rollback drill.

## Exit criteria

- Tidak ada diagnosis berhenti di satu layer.
- Cookie/CORS/CSRF dijelaskan sebagai konsep berbeda.
- Cache/idempotency/migration mempunyai failure tests.
- Baseline memakai user-journey p95/p99 dan error rate.
- Deployment dapat dipulihkan dengan prosedur teruji.

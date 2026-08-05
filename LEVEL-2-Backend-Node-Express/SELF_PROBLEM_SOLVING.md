# Self Problem Solving — Level 2 Node/Express

Gunakan API dan database lokal. Jangan menjalankan security payload terhadap
sistem yang tidak kamu miliki. Setiap perbaikan harus memiliki automated
regression test.

## 1. Error contract

Endpoint kadang mengembalikan HTML stack trace, kadang `{ error }`, dan kadang
socket ditutup. Rancang error taxonomy, centralized handler, request ID, serta
logging redaction. Test validation, not-found, conflict, dependency timeout, dan
unexpected error.

## 2. Event-loop stall

Endpoint laporan membuat semua health request lambat. Rekam p95/p99 dan event-loop
delay, ambil CPU profile, temukan operasi blocking, dan pilih worker/job/algoritma.

Acceptance: throughput dan tail latency membaik, hasil identik, concurrency dibatasi.

## 3. N+1 dan index

Daftar 100 post menjalankan 101 query dan filter tanggal melakukan sequential scan.
Perbaiki query, pilih index dari access pattern, bandingkan execution plan, query
count, dan latency.

## 4. Overselling race

Dua request membeli stok terakhir. Buat integration test concurrent yang
mereproduksi oversell, lalu perbaiki dengan constraint/atomic update/transaction.
Retry duplicate harus idempotent.

## 5. IDOR

User A dapat mengganti `/orders/:id` ke order user B. Implementasikan
authorization owner/admin, tenant scope, dan negative tests list/detail/update/
delete/export.

## 6. Injection boundary

Audit SQL, command, log, dan response header construction. Ganti concatenation
dengan parameter/API aman. Uji karakter kontrol, panjang ekstrem, nested object,
dan unknown fields.

## 7. SSRF

Endpoint preview mengambil URL dari user. Buat policy yang membatasi protocol,
host/network, redirect, timeout, dan response size. Test loopback/private/
link-local/IPv6/encoded address di lab.

## 8. Session lifecycle

Rancang login, logout-all, expiry, revocation, refresh rotation, dan reuse
detection. Untuk browser gunakan cookie `HttpOnly` serta CSRF defense. Jangan
menaruh token di log atau `localStorage`.

## 9. Overload

Simulasikan payload besar, search mahal, dan dependency lambat. Tambahkan body
limit, pagination cap, timeout, rate/concurrency limit, backpressure, serta
graceful degradation. Buktikan server pulih setelah beban berhenti.

## 10. Capstone

Bangun order API dengan schema/migration, validation, authn/authz, transaction,
idempotency, pagination, structured logs, health/readiness, unit/integration test,
load baseline, threat model, Docker, dan recovery notes.

## Exit criteria

- Seluruh kasus security memiliki negative tests.
- Performance memakai p95/p99, CPU/memory/query evidence.
- Tidak ada secret/PII/token di response atau log.
- Race/duplicate/timeout dapat direproduksi otomatis.
- Capstone rata-rata rubrik minimal 2.

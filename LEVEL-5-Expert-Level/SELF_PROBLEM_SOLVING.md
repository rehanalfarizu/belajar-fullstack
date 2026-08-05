# Self Problem Solving — Level 5

Soal Level 5 sengaja ambigu. Mulai dengan requirement, angka, invariant, dan
failure mode. Tidak ada satu jawaban arsitektur; keputusan dinilai dari bukti dan
trade-off.

## 1. Capacity dan bottleneck

Sistem tumbuh dari 10 ke 10.000 RPS. Buat asumsi traffic/payload/read-write,
capacity estimate, load model, SLO, lalu temukan bottleneck dengan test. Jangan
langsung memilih microservice.

## 2. Tail latency

Average 120 ms tetapi p99 8 detik. Korelasikan trace, GC, pool, queue, cold path,
dependency, retry storm, dan noisy neighbor. Perbaikan wajib menjaga correctness.

## 3. Backpressure

Producer 10× lebih cepat dari consumer sampai memory/queue penuh. Rancang bounded
queue, admission control, rate/load shedding, retry, DLQ, autoscaling signal, dan
recovery setelah overload.

## 4. WebSocket delivery

Reconnect menghasilkan pesan hilang/ganda/out-of-order. Definisikan delivery
semantics, sequence/idempotency, resume, presence, auth refresh, rate limit,
scale-out, dan observability.

## 5. Multi-tenant breach

Tenant A menerima export/cache/search result tenant B. Jalankan incident tabletop,
contain, scope, evidence, notification, recovery, lalu redesign policy/data/cache/
job isolation beserta negative test matrix.

## 6. Supply-chain compromise

Asumsikan dependency/CI action/container base image compromised. Tulis deteksi,
containment, credential rotation, artifact provenance, SBOM impact analysis,
rebuild-from-trusted-source, serta release recovery.

## 7. SSRF dan egress

Service screenshot/webhook dapat mencapai metadata/internal service. Rancang
parser/policy/network egress, DNS/redirect handling, credential isolation, limits,
logging, dan lab tests IPv4/IPv6/encoded destinations.

## 8. SLO burn

Availability masih 99,9% bulan berjalan tetapi error budget habis cepat. Buat
multi-window burn-rate alert, ownership, feature freeze/degradation policy, dan
komunikasi stakeholder.

## 9. Disaster recovery

Database primary dan backup terbaru dianggap corrupt. Buktikan RPO/RTO melalui
restore drill, point-in-time recovery, dependency/key restoration, verification,
traffic cutover, dan reconciliation.

## 10. Architecture review

Review capstone dengan requirement, non-goal, invariant, API/event, data model,
capacity, failure modes, threat model, SLO, cost, migration, observability,
deployment, rollback, dan alternative rejected.

## Exit criteria

- Angka mempunyai asumsi dan test plan.
- Sistem disederhanakan sebelum didistribusikan.
- Failure injection aman dan memiliki stop condition.
- Security mencakup preventive, detective, response, recovery.
- SLO/alert/runbook/postmortem dapat dipakai operator lain.
- Semua keputusan penting memiliki ADR dan residual risk owner.

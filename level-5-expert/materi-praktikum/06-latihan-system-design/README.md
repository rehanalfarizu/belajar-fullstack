# Praktikum System Design

Pilih satu sistem: checkout, chat, task manager collaborative, atau notification
platform. Hasil praktikum adalah dokumen keputusan yang dapat diuji, bukan hanya
diagram.

## Deliverables

1. Requirement, non-goal, dan estimasi traffic/storage.
2. API/event contract serta error semantics.
3. Schema data, invariant, transaction boundary, dan index.
4. Diagram container dan satu sequence diagram untuk alur kritis.
5. Tabel minimal delapan failure mode: dampak, deteksi, mitigasi, recovery.
6. SLO, metric, logs, traces, alerts, dan runbook.
7. Security threat model dan data classification.
8. Load-test plan dengan hipotesis, batas lulus, serta rollback.
9. Rencana evolusi dari modular monolith; pemisahan service hanya jika ada bukti.
10. Architecture decision record untuk tiga trade-off utama.

## Review checklist

- Semua angka memiliki asumsi.
- Cache bukan sumber kebenaran.
- Retry tidak menciptakan side effect ganda.
- Backup memiliki restore test dan target RPO/RTO.
- Setiap komponen memiliki owner dan alasan keberadaan.
- Diagram konsisten dengan API, data flow, dan deployment.
- Desain dapat disederhanakan bila skala turun sepuluh kali.

# Level 5 — Engineering Lanjutan

Level ini mengubah fokus dari “fitur berjalan” menjadi sistem yang terukur, aman,
dapat dioperasikan, dan dapat berkembang. Kata *expert* bukan status otomatis
setelah membaca; kompetensi dibuktikan melalui keputusan, pengujian, operasi, dan
pengalaman menghadapi kegagalan nyata.

## Urutan materi

1. [React modern](materi-teori/00-react-modern/README.md) — React 19, Actions,
   optimistic UI, ref prop, dan pemisahan server/client state.
2. [Performance](materi-teori/01-performance-optimization/README.md) — profiling,
   rendering, network, asset, dan Core Web Vitals.
3. [Testing](materi-teori/02-testing/README.md) — unit, integration, contract,
   component, dan end-to-end.
4. [Docker](materi-teori/03-docker-containerization/README.md) — image,
   multi-stage build, Compose, dan container security.
5. [CI/CD](materi-teori/04-ci-cd-pipeline/README.md) — quality gate, artifact,
   environment, deployment, dan rollback.
6. [WebSocket](materi-teori/05-websocket-real-time/README.md) — connection,
   rooms, delivery, scale-out, dan failure handling.
7. [System design](materi-teori/06-system-design/README.md) — requirement,
   capacity, data, consistency, scaling, dan trade-off.
8. [Observability & reliability](materi-teori/07-observability-reliability/README.md)
   — SLI/SLO, logs, metrics, traces, incident, dan recovery.
9. [Advanced security](materi-teori/08-advanced-security/README.md) — threat
   modeling, supply chain, multi-tenant, SSRF, crypto, dan incident response.

## Praktikum yang tersedia

- [Performance](materi-praktikum/01-latihan-performa/README.md)
- [Testing](materi-praktikum/02-latihan-testing/README.md)
- [Docker](materi-praktikum/03-latihan-docker/README.md)
- [WebSocket](materi-praktikum/04-latihan-websocket/README.md)
- [CI/CD](materi-praktikum/05-latihan-cicd/README.md)
- [System design](materi-praktikum/06-latihan-system-design/README.md)
- [Self problem solving](SELF_PROBLEM_SOLVING.md)
- [Final project](final-project/README.md)

## Definition of done

Proyek akhir belum selesai hanya karena dapat dibuka di browser. Minimal:

- requirement dan architecture decision terdokumentasi;
- type/static check, unit, integration, dan satu alur E2E lulus;
- input divalidasi di trust boundary dan authorization diuji;
- database migration dapat dijalankan serta di-rollback dengan aman;
- container berjalan sebagai non-root bila memungkinkan;
- CI menghasilkan artifact yang sama untuk semua environment;
- health/readiness, structured logs, metrics, dan request ID tersedia;
- SLO, alert, runbook, backup/restore, serta rollback pernah disimulasikan;
- load test membuktikan target kapasitas;
- README memungkinkan developer baru menjalankan proyek tanpa pengetahuan tribal.

Setelah itu, lakukan review dengan orang lain. Kemampuan menjelaskan trade-off dan
menanggapi bukti yang berlawanan adalah bagian dari keahlian.

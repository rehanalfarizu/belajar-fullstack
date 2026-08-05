# Panduan Belajar: Fundamental sampai Engineering Lanjutan

Gunakan panduan ini bersama [Peta Kompetensi Bertingkat](KOMPETENSI_BERTINGKAT.md)
dan file `SELF_PROBLEM_SOLVING.md` pada setiap level.

## Cara menentukan titik mulai

Kerjakan placement test tanpa internet:

1. Buat halaman semantic, responsive, keyboard-accessible.
2. Tulis fungsi JavaScript untuk mengelompokkan transaksi dan uji kasus batas.
3. Jelaskan event loop serta prediksi Promise versus timer.
4. Rancang schema user/order/product beserta constraint dan satu transaction.
5. Buat endpoint CRUD dengan validation, error handling, dan test.
6. Buat UI fetch dengan loading, error, empty, success, dan cancellation.
7. Jelaskan authentication, authorization, CORS, CSRF, dan XSS.
8. Containerize aplikasi dan jelaskan health/readiness serta rollback.

Mulai dari kompetensi pertama yang belum dapat kamu buktikan. Tetap lakukan review
cepat level sebelumnya agar tidak ada lubang model mental.

## Siklus belajar setiap topik

Gunakan satu siklus 90–150 menit:

1. **Recall (10 menit):** tulis yang sudah diketahui tanpa membuka materi.
2. **Theory (25 menit):** baca satu bagian dan buat pertanyaan “mengapa”.
3. **Predict (10 menit):** prediksi output/failure sebelum menjalankan contoh.
4. **Build (45–75 menit):** kerjakan starter tanpa solusi.
5. **Break (15 menit):** masukkan input invalid, timeout, duplicate, dan race.
6. **Verify (20 menit):** test, type check, lint, DevTools, atau query plan.
7. **Explain (10 menit):** tulis apa, mengapa, bukti, dan hal yang belum pasti.

Besok, ulangi konsep selama lima menit tanpa catatan. Ulangi lagi setelah 3, 7,
dan 21 hari. Spaced repetition paling berguna untuk model mental dan command
penting, bukan menghafal API yang mudah dicari.

## Roadmap 32 minggu

Asumsi 10–15 jam per minggu. Percepat atau perlambat berdasarkan bukti penguasaan,
bukan kalender.

### Fase A — Engineering foundation (minggu 1–2)

- Level 0: data, proses, memory, network, HTTP/TLS, database, concurrency.
- Terminal, filesystem, process, environment variable, Git branch/merge/revert.
- Debugging ilmiah, requirement, contract, test strategy, code review.
- Output: repository kecil dengan README, issue, branch, PR simulasi, test, dan
  laporan bug berisi reproduce–hypothesis–evidence–fix.

### Fase B — Web platform (minggu 3–8)

- HTML semantic, form, validation, accessibility.
- CSS cascade, layout, responsive, typography, focus, animation.
- JavaScript types, scope, function, collections, DOM, events, async, errors.
- TypeScript strict, union, generic, narrowing, runtime validation.
- Output: portfolio tanpa framework dan satu aplikasi data kecil.

Exit criteria: Lighthouse/keyboard/manual accessibility review, tidak ada console
error, responsive, TypeScript tanpa `any`, serta test untuk logika penting.

### Fase C — Backend pertama (minggu 9–15)

Pilih Node/Express atau Laravel.

- HTTP contract, middleware, validation, structured errors.
- SQL terlebih dahulu: normalization, constraint, index, transaction, query plan.
- NoSQL setelah memahami alasan access pattern.
- Password hashing, session/JWT, authorization, cookie, CSRF, rate limit.
- Unit, integration, dan API test dengan database terisolasi.
- Output: task/order API dengan migration, seed, pagination, filtering, auth, test,
  OpenAPI/contract, logs, dan Docker development.

Exit criteria: duplicate request aman, race condition kritis diuji, password tidak
pernah keluar di response/log, serta restore data dapat didemonstrasikan.

### Fase D — Frontend pertama (minggu 16–21)

Pilih React atau Vue.

- Component contract, state ownership, derived state, effect/lifecycle cleanup.
- Router, accessible form, validation, error boundary/handling.
- Bedakan local UI state dan server state; cache dan invalidation.
- Performance diukur dengan profiler sebelum memoization.
- Component/integration/E2E tests untuk satu user journey.
- Output: dashboard yang mengonsumsi API fase C.

Exit criteria: refresh/direct URL bekerja, request dapat dibatalkan, tidak ada
stale update, semua state UI tertangani, dan keyboard navigation valid.

### Fase E — Fullstack dan production path (minggu 22–26)

- Contract versioning, CORS, cookies, CSRF, refresh/session lifecycle.
- SSR/SSG/Server Components hanya setelah memahami kebutuhan rendering.
- Environment separation, migration, artifact, CI, deployment, rollback.
- Threat modeling menggunakan kategori OWASP sebagai checklist awal.
- Output: aplikasi fullstack di staging dengan HTTPS, CI, auth `HttpOnly`,
  database managed, observability dasar, dan security review.

### Fase F — Engineering lanjut (minggu 27–32)

- Profiling dan load test.
- Docker multi-stage/non-root, supply-chain/dependency checks.
- CI/CD gates, progressive delivery, rollback.
- WebSocket delivery semantics dan scale-out.
- System design, capacity estimate, SLO, metrics, logs, traces, incident.
- Output: final project Level 5 dan simulasi insiden.

## Framework problem solving

Saat menemui bug atau soal kompleks, isi template ini:

```text
Expected:
Actual:
Minimal reproduction:
Last known-good boundary:
Evidence (error/trace/network/query/log):
Hypothesis:
Prediction if hypothesis is true:
Smallest experiment:
Root cause:
Fix:
Regression proof:
Risk and rollback:
```

Urutan isolasi fullstack yang efektif:

```text
UI event
→ state/validation
→ browser Network request
→ CORS/cookie/TLS
→ route/middleware
→ authorization
→ business rule
→ query/transaction
→ response contract
→ UI state update
```

Temukan batas terakhir yang benar. Jangan langsung menyalahkan framework atau
mengubah lima file.

## Tangga latihan

Untuk setiap konsep, naikkan kesulitan:

1. **Imitate:** ketik contoh dan jelaskan setiap baris.
2. **Modify:** ubah requirement dan prediksi dampaknya.
3. **Build:** buat dari soal kosong.
4. **Debug:** perbaiki program yang sengaja rusak.
5. **Design:** pilih solusi dan pertahankan trade-off.
6. **Operate:** ukur, deploy, observasi, rusakkan, dan pulihkan.
7. **Teach:** jelaskan kepada orang lain dan jawab pertanyaan tandingan.

Jangan melompat dari menonton tutorial langsung ke system design.

## Rubrik proyek

Beri skor 0–3 pada setiap dimensi:

| Dimensi | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Requirement | tidak jelas | happy path | edge case | acceptance test |
| Correctness | tidak jalan | demo jalan | error tertangani | invariant terbukti |
| Code | kusut | terbaca | boundary jelas | mudah diubah |
| Test | tidak ada | unit sporadis | integration kritis | risk-based suite |
| Security | diabaikan | checklist | threat model | mitigasi teruji |
| Accessibility | diabaikan | semantic dasar | keyboard/focus | audit teruji |
| Performance | tebakan | satu angka | profile/load test | target dan regresi |
| Reliability | tidak ada | health/log | SLO/alert | recovery drill |
| Docs/Git | tidak ada | setup | keputusan/test | onboarding/rollback |

Target kelulusan level: tidak ada skor 0 dan rata-rata minimal 2. Level 5 menuntut
skor 3 pada correctness, security, test, reliability, dan documentation.

## Cara memakai AI dengan benar

- Minta AI memberi pertanyaan, test case, code review, atau hint bertahap.
- Sebelum menerima solusi, tulis hipotesis dan percobaanmu.
- Verifikasi API/version dengan dokumentasi resmi.
- Jalankan code, baca diff, dan pahami setiap baris sebelum menyimpan.
- Minta AI menyisipkan bug untuk latihan debugging.
- Jangan memasukkan secret, credential, atau data pengguna.

AI mempercepat feedback, tetapi compiler, test, runtime evidence, dokumentasi
resmi, dan review manusia tetap menjadi sumber pembuktian.

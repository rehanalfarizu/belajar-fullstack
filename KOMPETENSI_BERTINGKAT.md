# Peta Kompetensi Bertingkat

Dokumen ini memastikan empat jalur dipelajari berulang dengan kedalaman yang
meningkat: teori, problem solving, optimasi, dan security. Security dan performa
bukan bab penutup; keduanya adalah bagian dari definition of done sejak awal.

## Matriks Level 0–5

| Level | Problem solving | Optimasi | Security | Bukti kelulusan |
|---|---|---|---|---|
| 0 | observasi, hipotesis, isolasi, Git recovery | Big-O, CPU/memory/I/O, ukur sebelum ubah | asset, CIA, trust boundary, secret | laporan debugging dan threat model sederhana |
| 1 | DOM, event, async, layout | render path, image, network, main thread, CWV dasar | semantic form, XSS/DOM sink, URL, CSP konsep | website accessible dengan budget dan security review |
| 2 | API contract, database, race condition | event loop, query plan, index, pagination, cache | validation, injection, authn/authz, rate, SSRF, secret | API teruji dengan profiling dan abuse cases |
| 3 | state, effect/lifecycle, request race | profiler, rerender, bundle, server-state cache | unsafe HTML/URL, token handling, dependency risk | frontend dengan profile sebelum/sesudah dan negative tests |
| 4 | diagnosis lintas browser–API–database | waterfall end-to-end, CDN/cache, DB, queue | cookie, CORS, CSRF, headers, session, deployment | staging dengan CI, SLO dasar, rollback dan threat model |
| 5 | ambiguity, failure injection, incident | load/capacity, tail latency, backpressure, cost | secure design, supply chain, multi-tenant, incident | sistem terukur, resilience test, security review dan runbook |

Track Node/Laravel dan React/Vue memiliki target kompetensi yang sama. Framework
hanya mengubah alat dan idiom, bukan prinsip.

## Empat mode belajar

### 1. Teori

Untuk setiap konsep, jawab:

- masalah apa yang diselesaikan;
- mekanisme kerjanya;
- kapan tidak dipakai;
- failure mode dan trade-off;
- bukti apa yang menunjukkan solusi benar.

### 2. Self problem solving

Kerjakan file `SELF_PROBLEM_SOLVING.md` pada tiap level tanpa membuka solusi selama
timebox pertama. Wajib menghasilkan:

```text
Expected:
Actual:
Minimal reproduction:
Evidence:
Hypothesis:
Prediction:
Experiment:
Root cause:
Fix:
Regression proof:
Risk/rollback:
```

Hint dipakai bertingkat: dokumentasi API → log/DevTools → test kecil → pseudocode.
Solusi atau AI baru boleh dibuka setelah ada minimal dua hipotesis yang diuji.

### 3. Optimasi

Urutannya selalu:

1. definisikan user journey dan target;
2. ukur baseline pada kondisi yang dapat diulang;
3. temukan bottleneck dominan;
4. ubah satu hal;
5. ukur ulang dan cek correctness;
6. simpan bukti sebelum/sesudah;
7. tambahkan regression budget.

Optimasi yang hanya “terasa lebih cepat” belum terbukti.

### 4. Security

Gunakan alur:

1. identifikasi asset dan data sensitif;
2. gambar trust boundary dan data flow;
3. identifikasi actor serta abuse case;
4. cegah, deteksi, dan siapkan recovery;
5. buat negative test;
6. review residual risk.

Checklist OWASP membantu menemukan kategori risiko, tetapi tidak menggantikan
threat model aplikasi.

## Definition of done lintas level

Sebuah latihan dianggap selesai bila:

- requirement dan non-goal tertulis;
- happy path dan kasus gagal terbukti;
- input eksternal divalidasi pada boundary;
- authorization dilakukan di server;
- tidak ada secret/data sensitif di source, response, atau log;
- baseline performa dan budget relevan tercatat;
- test mencegah regression pada risiko utama;
- error dapat didiagnosis tanpa menebak;
- README menjelaskan setup, keputusan, batas, dan rollback;
- pelajar dapat menjelaskan kode tanpa membaca baris demi baris.

## Cara penilaian

Gunakan skor 0–3 untuk correctness, reasoning, test, performance, security,
accessibility, operability, dan explanation:

- **0:** tidak ada bukti;
- **1:** happy path atau klaim;
- **2:** kasus batas dan bukti yang dapat diulang;
- **3:** trade-off, negative test, regression guard, serta recovery.

Naik level bila tidak ada nilai 0 dan rata-rata minimal 2. Jangan menutupi
fundamental yang lemah dengan framework yang lebih kompleks.

# System Design untuk Fullstack Engineer

System design bukan lomba menggambar microservice. Tujuannya memilih arsitektur
yang memenuhi requirement dengan kompleksitas dan biaya yang dapat dipertanggungjawabkan.

## 1. Mulai dari requirement dan angka

Pisahkan functional requirement dari quality attribute:

- traffic rata-rata dan puncak;
- read/write ratio dan ukuran payload;
- target latency dan availability;
- consistency, durability, privacy, serta lokasi data;
- retention, pertumbuhan, biaya, dan kemampuan tim.

Perkiraan awal:

```text
requests/second = daily requests / 86.400
peak RPS        = average RPS × peak factor
storage/year    = writes/day × bytes/write × 365 × replication factor
bandwidth       = RPS × average response bytes
```

Angka kasar yang ditulis lebih berguna daripada presisi palsu yang tidak memiliki
sumber.

## 2. Desain baseline

Mulai dengan satu deployable application yang modular:

```text
Browser
   │ HTTPS
Load balancer / reverse proxy
   │
Stateless application ─── Cache
   │        │
Database   Object storage
   │
Backup / replica
```

Pisahkan service hanya saat ada bukti: scaling profile berbeda, ownership tim,
isolation, deployment cadence, atau boundary data yang kuat. Microservice menambah
network failure, distributed tracing, consistency, deployment, dan operational cost.

## 3. Data dan consistency

Pilih sumber kebenaran terlebih dahulu.

- Relational database: transaksi, constraint, dan relasi kuat.
- Document database: aggregate fleksibel dengan access pattern yang jelas.
- Cache: salinan yang boleh hilang, bukan sumber kebenaran diam-diam.
- Queue/stream: pekerjaan asynchronous dan integrasi berbasis event.
- Object storage: blob besar seperti gambar/video.

Index mempercepat read tertentu tetapi menambah storage dan biaya write. Desain
index dari query nyata, periksa execution plan, dan hindari N+1.

Untuk operasi uang/order, gunakan transaction, unique constraint, dan idempotency
key. “Exactly once” end-to-end biasanya dicapai sebagai at-least-once delivery
ditambah deduplication/idempotency.

## 4. Scaling dan resilience

- Scale up menambah kapasitas satu mesin; scale out menambah instance.
- Stateless app lebih mudah di-scale; session disimpan pada signed cookie atau
  shared store sesuai kebutuhan.
- Timeout harus ada pada setiap network call.
- Retry hanya untuk kegagalan sementara, dengan exponential backoff dan jitter.
- Circuit breaker membatasi kegagalan berantai.
- Backpressure mencegah producer menenggelamkan consumer.
- Bulkhead memisahkan resource agar satu fitur tidak menjatuhkan semuanya.

Cache memerlukan strategi invalidation, TTL, key, dan perlindungan stampede.
CDN cocok untuk static/public content, bukan jawaban universal untuk data privat.

## 5. Availability dan recovery

Tetapkan SLI (ukuran), SLO (target), lalu error budget. Contoh: persentase request
checkout valid yang selesai di bawah 800 ms. “Server hidup” saja bukan ukuran
pengalaman pengguna.

Pahami:

- RTO: berapa lama sistem boleh tidak tersedia;
- RPO: berapa banyak data boleh hilang;
- backup bukan bukti recovery sampai restore diuji;
- multi-region menambah availability sekaligus consistency dan biaya operasional.

## 6. Security dan observability

Threat model mencakup asset, trust boundary, actor, attack path, dan mitigasi.
Terapkan least privilege, secret manager, encryption in transit/at rest, audit
trail, validation di boundary, serta dependency/patch management.

Setiap desain harus menjawab bagaimana operator mengetahui kerusakan:

- structured logs dengan request/correlation ID;
- metrics traffic, errors, latency, saturation;
- distributed traces untuk lintasan request;
- dashboard, alert, runbook, dan owner.

## Template jawaban system design

1. Klarifikasi requirement dan non-goal.
2. Hitung skala dan target SLO.
3. Definisikan API/event contract.
4. Modelkan data, invariant, dan access pattern.
5. Gambar baseline end-to-end.
6. Temukan bottleneck dan failure mode.
7. Tambahkan cache/queue/replica hanya bila menyelesaikan masalah terukur.
8. Bahas security, observability, migration, biaya, dan trade-off.

## Studi kasus

Desain URL shortener, notification service, chat, dan checkout. Untuk tiap kasus,
tulis:

- tiga invariant yang tidak boleh rusak;
- dua keputusan yang sengaja ditunda;
- failure mode pada database, cache, queue, dan dependency;
- strategi rollout/rollback;
- satu eksperimen load test untuk membuktikan kapasitas.

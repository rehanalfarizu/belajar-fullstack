# Optimasi Fullstack untuk Production

Pada Level 4, bottleneck tidak boleh ditebak dari satu layer. Waktu yang terlihat
pengguna adalah gabungan browser, network, edge, server, dependency, database, dan
queue.

## 1. Model latency end-to-end

```text
User input
→ main-thread/UI work
→ DNS/TCP/TLS
→ CDN/reverse proxy
→ middleware/auth
→ domain/service
→ cache/database/third party
→ serialization/compression
→ network
→ render/paint
```

Propagasikan request/trace ID. Ukur span tiap batas dan korelasikan dengan
browser Network. Tanpa korelasi, tim frontend dan backend mudah saling menebak.

## 2. Tetapkan SLI dan budget

Contoh user journey checkout:

- availability: persentase checkout valid yang berhasil;
- latency: p95/p99 dari klik bayar sampai konfirmasi;
- correctness: tidak ada charge/order ganda;
- freshness: status pembayaran diperbarui dalam batas tertentu.

Turunkan budget, misalnya browser 200 ms, network/edge 200 ms, aplikasi 150 ms,
database 100 ms, external payment 800 ms. Angka harus berasal dari target dan
pengukuran, bukan disalin tanpa konteks.

## 3. HTTP dan CDN

- Fingerprinted immutable static assets dapat cache panjang.
- HTML/dynamic private data memerlukan policy berbeda.
- Gunakan `Cache-Control`, validator (`ETag`/`Last-Modified`), dan `Vary` dengan
  sadar.
- Jangan cache response personalized sebagai public.
- Compression membantu text tetapi memakai CPU; ukur.
- Hindari API waterfall; gabungkan atau parallel-kan request yang independen.
- Preload/preconnect hanya untuk resource kritis yang terbukti.

## 4. API dan database

- Batasi field dan collection.
- Cursor pagination lebih stabil untuk dataset berubah/offset besar.
- Index harus cocok filter dan order.
- Hilangkan N+1 dan ukur query count.
- Gunakan transaction/constraint untuk invariant.
- Pisahkan operasi synchronous kritis dari side effect yang aman di-queue.
- Timeout dan cancellation diteruskan sejauh mungkin.

Retry tanpa idempotency dapat menggandakan order/payment. Gunakan idempotency key
yang disimpan secara atomic beserta hasil operasi.

## 5. Cache end-to-end

Definisikan:

- sumber kebenaran;
- key termasuk user/tenant/locale/version bila relevan;
- TTL dan freshness;
- invalidation;
- stampede protection;
- fallback saat cache gagal;
- observability hit/miss/eviction.

Client cache, CDN, reverse proxy, aplikasi, dan database cache dapat menghasilkan
data stale dari tempat berbeda. Dokumentasikan ownership tiap layer.

## 6. Rendering strategy

Pilih CSR, SSR, SSG, ISR, atau Server Components berdasarkan kebutuhan:

- personalisasi dan auth;
- freshness;
- SEO/share preview;
- interactivity;
- cacheability;
- server/client cost.

Lebih banyak server rendering bukan otomatis lebih cepat. Ukur TTFB, LCP,
hydration/main-thread work, navigation, cache hit, dan biaya server.

## 7. Background job

Job harus idempotent dan memiliki:

- correlation/idempotency key;
- bounded retries dengan backoff+jitter;
- timeout;
- dead-letter/quarantine;
- metric queue depth/oldest age/failure;
- replay procedure;
- aturan data retention.

Jangan mengembalikan `200 OK` jika pekerjaan wajib belum durably diterima.

## 8. Release dan regression

Quality gate:

1. static/type/security checks;
2. unit/integration/contract/E2E risk utama;
3. production-like build;
4. migration compatibility;
5. performance budget;
6. deploy bertahap;
7. smoke/SLO observation;
8. rollback otomatis/manual yang pernah diuji.

Optimasi belum selesai sampai ada metric produksi/field yang menunjukkan manfaat
dan alert untuk regression.

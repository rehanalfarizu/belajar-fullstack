# Observability dan Reliability

Monitoring menjawab pertanyaan yang sudah diketahui. Observability membantu
menyelidiki keadaan internal dari output sistem ketika pertanyaannya belum
diketahui.

## Sinyal utama

Gunakan empat golden signals:

- latency, termasuk distribusi p50/p95/p99;
- traffic;
- errors, dibedakan menurut jenis dan dampak;
- saturation pada CPU, memory, connection pool, queue, dan disk.

Rata-rata dapat menyembunyikan tail latency. Ukur dari sudut pandang pengguna dan
pisahkan request valid dari traffic bot/health check.

## Logging

Log sebagai event terstruktur, bukan paragraf:

```json
{
  "level": "error",
  "event": "checkout_failed",
  "requestId": "req_123",
  "orderId": "ord_456",
  "durationMs": 812,
  "errorCode": "PAYMENT_TIMEOUT"
}
```

Jangan log password, token, cookie, nomor kartu, atau data pribadi tanpa kebutuhan
dan kontrol retention. Sertakan timestamp, severity, service/version, environment,
request ID, event name, dan error classification.

## Metrics, traces, dan correlation

Metric murah untuk agregasi dan alert. Trace menunjukkan dependency path dan span
latency. Log memberi detail event. Propagasikan correlation/trace ID melalui HTTP
dan message agar ketiganya dapat dihubungkan.

Hindari label metric ber-cardinality tinggi seperti user ID atau raw URL query.

## SLO dan alert

Contoh SLI:

```text
good events / valid events
```

SLO 99,9% bulanan memberi error budget sekitar 43 menit jika mengukur waktu,
tetapi event-based SLO sering lebih dekat ke pengalaman user. Alert harus berbasis
symptom dan burn rate, punya owner, severity, dashboard, serta runbook. Alarm yang
sering diabaikan adalah defect.

## Reliability patterns

- deadline dan timeout lebih penting daripada retry;
- retry harus dibatasi, memakai backoff+jitter, dan hanya untuk operasi aman;
- idempotency key mencegah side effect ganda;
- graceful shutdown berhenti menerima traffic lalu menyelesaikan pekerjaan aktif;
- readiness berbeda dari liveness;
- load shedding menolak pekerjaan lebih awal saat overload;
- queue harus punya retry policy, dead-letter handling, dan observability lag.

## Incident workflow

1. Declare incident dan tentukan commander.
2. Stabilkan dampak: rollback, feature flag, atau isolasi dependency.
3. Komunikasikan status dan timeline.
4. Kumpulkan bukti tanpa merusak forensic data.
5. Pulihkan dan verifikasi dari sisi pengguna.
6. Tulis postmortem tanpa menyalahkan individu.
7. Prioritaskan action item yang mencegah, mendeteksi, atau mempercepat recovery.

## Praktikum

Instrumentasikan satu API dengan request ID, structured logs, histogram latency,
error counter, dan health/readiness endpoint. Buat:

- dashboard traffic/error/latency/saturation;
- dua alert berbasis dampak;
- runbook satu halaman;
- simulasi dependency timeout;
- bukti graceful shutdown;
- postmortem latihan berisi timeline dan action owner.

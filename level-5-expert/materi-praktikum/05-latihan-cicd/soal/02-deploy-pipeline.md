# SOAL 02 — Continuous Deployment Pipeline

> Membangun CD pipeline yang men-deploy aplikasi ke cloud secara otomatis.

---

## Deskripsi Soal

Kamu diminta membangun CD pipeline untuk fullstack application yang:
1. Deploy ke **staging** pada setiap push ke `develop` branch
2. Deploy ke **production** pada setiap release (tagged commit)
3. Menjalankan smoke test setelah deployment
4. Rollback otomatis jika smoke test gagal
5. Mendukung Docker-based deployment

---

## Teori Singkat

### Deployment Strategies

| Strategy | Description | Risk | Rollback | Use Case |
|----------|-------------|------|----------|----------|
| Direct Deploy | Replace running app | High | Manual | MVP |
| Blue-Green | Two identical environments | Low | Instant | Production |
| Canary | Gradual rollout | Low | Gradual | Large apps |
| Rolling | Replace instances one-by-one | Medium | Manual | Kubernetes |

### Git Flow dengan CI/CD

```
feature/xyz ──▶ develop ──▶ main ──▶ tag ──▶ release
                      │         │
                      ▼         ▼
                   staging production
                  (auto)     (manual tag)
```

### Environment Strategy

| Environment | Trigger | URL | Purpose |
|-------------|---------|-----|---------|
| Development | Every push | dev.example.com | Integration testing |
| Staging | Push to `develop` | staging.example.com | Pre-production testing |
| Production | Release tag | app.example.com | Live users |

---

## Checklist Pengerjaan

### Bagian A — Staging Deployment (20 menit)

**1. Staging Workflow**

> **Tulis sendiri dulu.** Rancang workflow deploy ke staging: dipicu branch apa, urutan langkahnya (test, build image, push, deploy), dan secret apa yang dibutuhkan?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 1. Staging Workflow*.

**2. Environment Protection**

> **Tulis sendiri dulu.** Apa gunanya blok `environment` dengan `name` dan `url` di GitHub Actions?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 2. Environment Protection*.

**3. Notify on Failure**

> **Tulis sendiri dulu.** Bagaimana mengirim notifikasi hanya saat langkah sebelumnya gagal?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 3. Notify on Failure*.

### Bagian B — Production Deployment (15 menit)

**1. Release Workflow**

> **Tulis sendiri dulu.** Bagaimana membuat workflow berjalan hanya saat ada tag versi seperti `v1.2.3`?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 1. Release Workflow*.

**2. Approval Gate**

> **Tulis sendiri dulu.** Bagaimana membuat deploy produksi menunggu persetujuan manual? Cari environment protection rules.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 2. Approval Gate*.

**3. Production Deployment Steps**

> **Tulis sendiri dulu.** Alur produksi: tag release, build dan push image berversi, lalu deploy dan tunggu rollout selesai.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 3. Production Deployment Steps*.

### Bagian C — Smoke Testing (15 menit)

**1. Smoke Test Job**

> **Tulis sendiri dulu.** Smoke test setelah deploy: job mana yang harus selesai dulu, dan bagaimana base URL diteruskan?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 1. Smoke Test Job*.

**2. Critical Smoke Tests**

Minimal smoke tests:

| Test | Description | Timeout |
|------|-------------|---------|
| Health check | GET /health returns 200 | 5s |
| API responds | GET /api/products returns JSON | 10s |
| Frontend loads | Page loads without JS error | 15s |
| Login works | POST /api/auth/login succeeds | 10s |

**3. Pass/Fail to Next Job**

> **Tulis sendiri dulu.** Bagaimana memastikan produksi hanya jalan kalau staging dan smoke test lolos? Cari `needs`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 3. Pass/Fail to Next Job*.

### Bagian D — Rollback Strategy (20 menit)

**1. Automatic Rollback on Failure**

> **Tulis sendiri dulu.** Kalau deploy gagal, bagaimana mengembalikan versi sebelumnya dan memverifikasinya?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 1. Automatic Rollback on Failure*.

**2. Manual Rollback Workflow**

Buat workflow terpisah untuk rollback manual:

> **Tulis sendiri dulu.** Workflow rollback manual: input apa yang diminta dari operator dan bagaimana diverifikasi?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 2. Manual Rollback Workflow*.

**3. Health Check Loop**

> **Tulis sendiri dulu.** Bagaimana menunggu service benar-benar sehat sebelum lanjut, dengan batas waktu dan jumlah percobaan?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 3. Health Check Loop*.

### Bagian E — Docker Registry Integration (15 menit)

**1. Login to Registry**

> **Tulis sendiri dulu.** Bagaimana login ke container registry dengan kredensial dari secrets?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 1. Login to Registry*.

**2. Build and Push with Labels**

> **Tulis sendiri dulu.** Bagaimana membangun dan mendorong image dengan beberapa tag dan cache dari GitHub Actions?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *02-deploy-pipeline — 2. Build and Push with Labels*.

**3. Image Versioning Strategy**

| Tag | Source | When | Use |
|-----|--------|------|-----|
| `sha-abc123` | Commit SHA | Every push | Unique, traceable |
| `latest` | Latest on main | Every merge | Convenience |
| `v1.2.3` | Git tag | Release | Semantic versioning |

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Staging deployment workflow | 20% |
| Production deployment dengan approval | 20% |
| Smoke testing integration | 20% |
| Rollback strategy | 20% |
| Docker registry integration | 10% |
| Documentation& security | 10% |

---

## Reference

- [GitHub Actions Deployment](https://docs.github.com/en/actions/deployments)
- [GitHub Actions Environments](https://docs.github.com/en/actions/deployments/using-environments)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Deployment Strategies](https://github.com/ContainerSolutions/k8s-deployment-strategies)
- [Blue-Green Deployments](https://kubernetes.io/docs/tutorials/configuration/update/)

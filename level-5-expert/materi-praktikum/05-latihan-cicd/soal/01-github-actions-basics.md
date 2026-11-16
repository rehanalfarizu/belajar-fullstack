# SOAL 01 — GitHub Actions Fundamentals

> Membangun CI pipeline dengan GitHub Actions.

---

## Deskripsi Soal

Tim development membutuhkan CI pipeline otomatis untuk:
1. Menjalankan unit tests pada setiap push ke branch mana pun
2. Menjalankan integration tests pada setiap Pull Request
3. Melakukan linting dan type checking
4. Membuat build artifact untuk setiap commit
5. Menerapkan branch protection rules secara otomatis

---

## Teori Singkat

### GitHub Actions Basic Concepts

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions │
│                                                             │
│  Workflow (.yml files di .github/workflows/) │
│  └── Job (logical unit of work) │
│      └── Step (individual task)                            │
│          └── Action (reusable unit, bisa dari marketplace) │
└─────────────────────────────────────────────────────────────┘
```

### Workflow Structure

> **Tulis sendiri dulu.** Rancang workflow CI dari nol: kapan jalan (trigger), jalan di mana (runner), dan langkah apa berurutan (checkout, setup, install, lint, test, build)?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — Workflow Structure*.

### Key Concepts

| Concept | Description |
|---------|-------------|
| `workflow` | File YAML yang mendefinisikan pipeline |
| `job` | Unit kerja yang berjalan di runner |
| `step` | Task individual dalam job |
| `action` | Reusable step yang di-publish |
| `runner` | Server yang menjalankan job |
| `artifact` | File yang di-generate dan bisa di-download |
| `cache` | Cached dependencies untuk speed |

---

## Checklist Pengerjaan

### Bagian A — Basic CI Workflow (20 menit)

**1. Create Workflow File**

Buat file `.github/workflows/ci.yml`:

```yaml
# TODO: Implementasikan
# code/01-ci-workflow.yml
```

**2. Trigger Conditions**

Konfigurasi trigger yang tepat:

> **Tulis sendiri dulu.** Selain push dan PR, trigger apa yang memungkinkan workflow dijalankan manual?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 2. Trigger Conditions*.

Pertanyaan:
- Apa perbedaan `push` dan `pull_request` trigger?
- Kapan sebaiknya workflow jalan di `pull_request` tapi tidak di `push`?
- Apa fungsi `workflow_dispatch`?

**3. Basic Steps**

Setup minimal:
- Checkout code
- Setup Node.js
- Install dependencies
- Run tests

**4. Verify Workflow**

```bash
# Check syntax
act -l  # List available workflows dengan act

# Push ke branch dan check GitHub Actions tab
git push origin your-branch
```

### Bagian B — Matrix Strategy (15 menit)

**1. Test Against Multiple Node Versions**

> **Tulis sendiri dulu.** Bagaimana menjalankan job yang sama di beberapa versi Node dan beberapa OS? Cari `strategy.matrix`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 1. Test Against Multiple Node Versions*.

**2. Fast Fail**

> **Tulis sendiri dulu.** Kalau satu job di matrix gagal, apa pilihan untuk job lainnya? Cari `fail-fast`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 2. Fast Fail*.

**3. Limit Concurrency**

> **Tulis sendiri dulu.** Bagaimana membatalkan run lama saat ada push baru ke branch yang sama? Cari `concurrency`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 3. Limit Concurrency*.

### Bagian C — Caching (15 menit)

**1. npm Cache**

> **Tulis sendiri dulu.** Bagaimana mempercepat install dependency lewat cache bawaan setup-node?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 1. npm Cache*.

**2. Build Cache (Vite/Webpack)**

> **Tulis sendiri dulu.** Cache manual untuk artefak build: apa yang dijadikan `key` dan apa fungsinya `restore-keys`?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 2. Build Cache (Vite/Webpack)*.

**3. Compare Build Times**

Dokumentasikan sebelum/setelah caching:

| Scenario | Without Cache | With Cache | Improvement |
|----------|--------------|------------|-------------|
| First run | ? | ? | - |
| Subsequent (no changes) | ? | ? | - |
| After package.json change | ? | ? | - |

### Bagian D — Test& Coverage (20 menit)

**1. Run Tests with Coverage**

> **Tulis sendiri dulu.** Bagaimana menjalankan test dengan coverage dalam mode CI?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 1. Run Tests with Coverage*.

**2. Upload Coverage Report**

> **Tulis sendiri dulu.** Bagaimana mengunggah laporan coverage ke layanan eksternal tanpa menaruh token di kode?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 2. Upload Coverage Report*.

**3. Artifact for Test Results**

> **Tulis sendiri dulu.** Kenapa hasil test tetap perlu diunggah walau test gagal? Cari kondisi `if: always()`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 3. Artifact for Test Results*.

**4. Generate JUnit XML**

Konfigurasi Jest untuk output JUnit XML:

> **Tulis sendiri dulu.** Reporter apa yang menghasilkan file hasil test yang bisa dibaca mesin?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 4. Generate JUnit XML*.

### Bagian E — Security & Quality Gates (20 menit)

**1. Linting**

> **Tulis sendiri dulu.** Bagaimana menjalankan lint sebagai langkah CI?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 1. Linting*.

**2. Secret Scanning**

GitHub sudah otomatis scan secrets, tapi tambahkan pre-commit check:

> **Tulis sendiri dulu.** Pengecekan sederhana agar secret tidak ikut ter-commit. Apa kelemahan pendekatan `grep` ini?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 2. Secret Scanning*.

**3. Dependency Audit**

> **Tulis sendiri dulu.** Bagaimana memeriksa kerentanan dependency dari CI, dan level apa yang menggagalkan build?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 3. Dependency Audit*.

**4. Build Verification**

> **Tulis sendiri dulu.** Bagaimana menyimpan hasil build sebagai artefak, dengan nama unik per commit?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 4. Build Verification*.

**5. Quality Gate Summary**

Buat markdown report:

> **Tulis sendiri dulu.** Bagaimana menampilkan ringkasan hasil CI di halaman run? Cari `GITHUB_STEP_SUMMARY`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *01-github-actions-basics — 5. Quality Gate Summary*.

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Basic CI workflow yang berfungsi | 15% |
| Matrix strategy (multiple versions) | 15% |
| Caching implementation | 15% |
| Test coverage setup | 20% |
| Security& quality gates | 20% |
| Artifact management | 15% |

---

## Reference

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions Caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [actions/cache](https://github.com/actions/cache)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

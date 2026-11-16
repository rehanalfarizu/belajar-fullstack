# SOAL 04 — End-to-End Testing dengan Playwright

> E2E testing dengan Playwright — menguji complete user flows dari browser perspective.

---

## Deskripsi Soal

Kamu diminta untuk membuat E2E test suite untuk e-commerce app yang mencakup:
1. Login flow
2. Product search dan filter
3. Add to cart dan checkout
4. Order confirmation

E2E test berada di level tertinggi—semua berjalan di browser nyata, seluruh
network call juga nyata, dan tidak ada mocking.

---

## Teori Singkat

### Kapan E2E Test?

```
Speed:    E2E (s)  >  Integration (ms)  >  Unit (μs)
Scope:    E2E (full) > Integration (partial) > Unit (function)
Reliability: E2E (flakey) > Integration (stable) > Unit (very stable)
Cost:     E2E (expensive) > Integration (cheap) > Unit (very cheap)
```

**Gunakan E2E untuk:**
- Critical user journeys (checkout, login, payment)
- flows yang melibatkan multiple systems
- regression detection untuk high-priority features

**Jangan gunakan E2E untuk:**
- Testing logic/unit-level behavior
- edge cases yang bisa di-test di unit level
- anything that changes frequently

### Playwright Architecture

```
┌─────────────��────────────────────────────────────────┐
│                    Test Runner (Jest/Vitest)         │
└──────────────────────┬──────────────────────────────┘
                       │
        Playwright Test API (page, expect, request)
                       │
┌──────────────────────▼──────────────────────────────┐
│                  Playwright Driver                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ Chromium   │  │  Firefox   │  │  WebKit    │   │
│  │ (Chrome)   │  │  (Gecko)   │  │  (Safari)  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
└──────────────────────────────────────────────────────┘
                       │
              Actual Browser Rendering
              (DOM, Network, JavaScript Engine)
```

---

## Checklist Pengerjaan

### Bagian A — Playwright Setup (20 menit)

**1. Install Playwright**

```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps chromium
```

**2. Configure Playwright**

Buat `playwright.config.js`:

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**3. Verify Setup**

```bash
npx playwright test --project=chromium --grep "smoke"
```

### Bagian B — Login Flow E2E (25 menit)

**1. Test Structure**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Authentication Storage**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

### Bagian C — Shopping Flow E2E (30 menit)

**1. Product Search and Filter**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Add to Cart Flow**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

### Bagian D — Checkout Flow (20 menit)

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

### Bagian E — CI Integration & Reporting (15 menit)

**1. Add to GitHub Actions**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Analyze Test Results**

Setelah menjalankan test suite lengkap, jawab:

a) Berapa total test yang run?
b) Berapa yang PASS? Berapa FAIL?
c) Berapa lama total execution time?
d) Berapa banyak flaky tests (PASS/FAIL tidak konsisten)?
e) Diantara test yang fail, apakah fail karena bug di aplikasi atau karena test yang ditulis tidak reliable?

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Playwright setup yang correct | 10% |
| Login flow E2E (5+ tests) | 20% |
| Shopping flow E2E (search, filter, cart) | 25% |
| Checkout flow E2E | 15% |
| CI integration | 15% |
| Test result analysis | 15% |

---

## Reference

- [Playwright — Getting Started](https://playwright.dev/docs/intro)
- [Playwright — Test Configuration](https://playwright.dev/docs/test-configuration)
- [Playwright — Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright — CI GitHub Actions](https://playwright.dev/docs/ci-github-actions)
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

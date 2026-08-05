# Software — LEVEL 5: Expert Level

Folder ini berisi panduan install dan setup **software yang dibutuhkan** untuk level expert — performance optimization, testing, containerization, dan CI/CD.

---

## Daftar Software

| # | File | Software | Keterangan |
|---|------|----------|-------------|
| 01 | `01-docker-install.md` | Docker & Docker Compose | Container untuk semua services |
| 02 | `02-jest-testing.md` | Jest | Unit testing dan integration testing |
| 03 | `03-react-testing-library.md` | React Testing Library | Component testing di React |
| 04 | `04-playwright-install.md` | Playwright | End-to-end testing |
| 05 | `05-github-actions.md` | GitHub Actions | CI/CD pipeline |
| 06 | `06-lighthouse-cli.md` | Lighthouse CI | Performance auditing |

---

## Cara Pakai

1. **Install software** sesuai urutan dari atas ke bawah
2. **Cek versi** setelah install untuk memastikan berhasil
3. **Ikuti instruksi** di setiap file dengan teliti
4. **Praktik** dengan menjalankan test di project kamu

---

## Urutan Install yang Disarankan

```
STEP 1 → Install Docker (wajib untuk containerisasi)
STEP 2 → Install Jest (untuk unit testing)
STEP 3 → Install React Testing Library (untuk component testing)
STEP 4 → Install Playwright (untuk E2E testing)
STEP 5 → Setup GitHub Actions (untuk CI/CD)
STEP 6 → Install Lighthouse CI (untuk performance audit)
```

---

## Verifikasi Install

```bash
# Cek Docker
docker --version
docker-compose --version

# Cek Jest
npx jest --version

# Cek Playwright
npx playwright --version

# Cek GitHub Actions (sudah tersedia di GitHub)
gh run --version

# Cek Lighthouse
npx lighthouse --version
```

---

## Containerization Benefits

```
Benefits Docker:
├── Consistent environment — sama di dev, staging, prod
├── Easy setup — satu command untuk semua services
├── Isolation — setiap service terisolasi
├── Scalability — mudah scale horizontal
└── CI/CD integration — mudah integrate dengan GitHub Actions
```

---

**Lanjut ke:** [tutorial/](../tutorial/) untuk panduan advanced

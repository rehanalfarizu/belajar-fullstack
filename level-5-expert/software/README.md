# Software — LEVEL 5: Expert Level

Folder ini berisi panduan install dan setup **software yang dibutuhkan** untuk level expert — performance optimization, testing, containerization, dan CI/CD.

---

## Daftar Software

| # | File | Software | Keterangan |
|---|------|----------|-------------|
| 01 | `01-docker-install.md` | Docker & Docker Compose | Container untuk semua services |
| 02 | `02-testing-dan-ci-cd.md` | Jest, React Testing Library, Playwright, GitHub Actions | Testing dan CI/CD dalam satu file |

Lighthouse (audit performa) belum punya file sendiri. Pakai tab Lighthouse di
Chrome DevTools, atau lihat soal di
[01-latihan-performa](../materi-praktikum/01-latihan-performa/README.md).

---

## Cara Pakai

1. **Install software** sesuai urutan dari atas ke bawah
2. **Cek versi** setelah install untuk memastikan berhasil
3. **Ikuti instruksi** di setiap file dengan teliti
4. **Praktik** dengan menjalankan test di project kamu

---

## Urutan Install yang Disarankan

```
STEP 1 → Install Docker                      (01-docker-install.md)
STEP 2 → Install Jest + React Testing Library (02-testing-dan-ci-cd.md, bagian 1-2)
STEP 3 → Install Playwright                  (02-testing-dan-ci-cd.md, bagian 3)
STEP 4 → Setup GitHub Actions                (02-testing-dan-ci-cd.md, bagian 4)
STEP 5 → Lighthouse lewat Chrome DevTools    (tanpa file panduan)
```

---

## Verifikasi Install

```bash
# Cek Docker
docker --version
docker compose version   # Compose v2, tanpa tanda hubung

# Cek Jest
npx jest --version

# Cek Playwright
npx playwright --version

# GitHub Actions tidak diinstal: cukup file workflow di .github/workflows/
# (opsional) GitHub CLI untuk melihat run: gh --version

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

**Lanjut ke:** [tutorial/](../tutorial/README.md) untuk panduan langkah demi langkah

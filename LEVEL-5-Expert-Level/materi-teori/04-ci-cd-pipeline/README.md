# 📘 MATERI TEORI 04 — CI/CD Pipeline

## 1. Apa itu CI/CD?

```
CI (Continuous Integration)
─────────────────────────────
Setiap commit → Otomatis run:
1. Build
  2. Test (unit, integration)
  3. Lint
  4. Security scan
→ Jika gagal → block merge ke main

CD (Continuous Deployment)
─────────────────────────────
CI PASS → Otomatis deploy ke:
  staging → UAT → production
→ Tanpa intervensi manual
```

---

## 2. GitHub Actions — Pipeline Otomatis

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Job 1: Lint & Type Check
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check TypeScript
        run: npm run typecheck

  # Job 2: Unit Tests
  test:
    runs-on: ubuntu-latest
    needs: lint  # jalan setelah lint selesai
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test -- --coverage

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # Job 3: Build
  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  # Job 4: Deploy
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'  # hanya deploy dari main
    environment: production

    steps:
      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

## 3. Environment Variables di GitHub

```
GitHub Repo → Settings → Secrets and variables → Actions

Secrets (rahasia):
  VERCEL_TOKEN
  VERCEL_ORG_ID
  VERCEL_PROJECT_ID
  DATABASE_URL
  JWT_SECRET

Variables (tidak rahasia):
  VITE_API_URL
  NODE_VERSION
```

---

## 4. Pipeline Pattern

```yaml
# Pipeline stages
jobs:
  stage-1:    # parallel — lint, typecheck
    runs-on: ubuntu-latest
    steps: [...]

  stage-2:    # sequential — test (setelah lint/typecheck)
    runs-on: ubuntu-latest
    needs: [stage-1]
    steps: [...]

  stage-3:    # sequential — build (setelah test)
    runs-on: ubuntu-latest
    needs: [stage-2]
    steps: [...]

  stage-4:    # sequential — deploy (setelah build)
    runs-on: ubuntu-latest
    needs: [stage-3]
    steps: [...]
```

---

## 5. Docker + CI/CD

```yaml
# .github/workflows/docker.yml
name: Docker Build & Push

on:
  push:
    branches: [main]
    tags: ["v*"]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=sha,prefix=
            type=ref,event=branch
            type=semver,pattern={{version}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

## 6. GitHub Environments (Protection Rules)

```
GitHub Repo → Settings → Environments

production environment:
  required reviewers: 2    # harus ada 2 orang approve
  wait timer: 0            # wait sebelum deploy
  deployment branch rule: main only

staging environment:
  required reviewers: 0
  wait timer: 0
```

---

## 7. Cache Dependencies

```yaml
# NPM cache
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "npm"           # otomatis cache node_modules

# Atau manual cache
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: npm-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      npm-${{ runner.os }}-
```

---

## Ringkasan

```
CI/CD Pipeline
├── CI         → lint → test → build (otomatis setiap commit)
├── CD         → deploy otomatis ke staging/production
├── GitHub Actions → YAML-based pipeline
├── Jobs       → parallel / sequential dengan needs
├── Secrets    → Environment Variables yang aman
├── Artifacts  → upload/download antar jobs
├── Docker     → build & push ke registry
└── Environments → protection rules, reviewers
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/05-latihan-cicd/`
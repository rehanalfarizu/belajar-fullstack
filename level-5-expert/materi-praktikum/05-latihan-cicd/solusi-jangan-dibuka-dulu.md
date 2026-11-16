# Solusi — 05-latihan-cicd (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi kunci jawaban. Kerjakan dulu versimu sendiri
> minimal 30 menit per soal, jalankan, lalu buka bagian yang relevan untuk
> **membandingkan**, bukan menyalin. Cara yang beda tapi benar itu sah.

Isi di bawah dipindahkan apa adanya dari starter lama.

---

## Soal 01 — Workflow CI lengkap (`code/01-ci-workflow.yml` lama)

````yaml
# ============================================================
# CI Workflow — GitHub Actions
# ============================================================
# Trigger: setiap push ke branch mana pun + setiap PR
# Stages: lint → test → build
# Gate: semua stage harus PASS agar bisa merge
#
# Setup Secrets di GitHub Repo → Settings → Secrets:
#   NPM_TOKEN          — npm access token untuk private packages
#   CODECOV_TOKEN      — Codecov upload token (optional)
# ============================================================

name: CI Pipeline

on:
  push:
    branches: [main, develop, "**"]      # semua branch
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: "24"
  CACHE_DIR: node_modules

jobs:
  # ──────────────────────────────────────────────────
  # Job 1: Lint & Type Check (parallel, fastest)
  # ──────────────────────────────────────────────────
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Cache node_modules
        uses: actions/cache@v6
        with:
          path: |
            ~/.npm
            node_modules
          key: npm-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            npm-${{ runner.os }}-
            npm-

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint || npm run lint:check || echo "No lint script configured"

      - name: Check TypeScript types
        run: npm run typecheck || npm run tsc || echo "No typecheck configured"

      - name: Check Prettier formatting
        run: npm run format:check || npx prettier --check "src/**/*.{js,jsx,ts,tsx}" || echo "No format check configured"

  # ──────────────────────────────────────────────────
  # Job 2: Unit Tests
  # ──────────────────────────────────────────────────
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    timeout-minutes: 15
    needs: lint                   # run setelah lint selesai

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run Jest tests
        run: npm test -- --coverage --ci --maxWorkers=2
        env:
          DATABASE_URL: postgres://testuser:testpass@localhost:5432/testdb
          NODE_ENV: test
          JWT_SECRET: test-jwt-secret-do-not-use-in-prod

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        if: always()
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: false

      - name: Upload coverage artifacts
        uses: actions/upload-artifact@v7
        with:
          name: coverage-report
          path: coverage/
          retention-days: 14

  # ──────────────────────────────────────────────────
  # Job 3: Build
  # ──────────────────────────────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    timeout-minutes: 10
    needs: test                  # run setelah test selesai

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build production bundle
        run: npm run build
        env:
          VITE_API_URL: ${{ vars.VITE_API_URL }}
          VITE_APP_TITLE: ${{ vars.VITE_APP_TITLE }}

      - name: Analyze bundle size
        run: |
          if [ -f "./stats.html" ]; then
            echo "Bundle analyzer found. Upload artifact..."
          fi

      - name: Upload build artifacts
        uses: actions/upload-artifact@v7
        with:
          name: dist
          path: dist/
          retention-days: 7

  # ──────────────────────────────────────────────────
  # Job 4: E2E Tests (Playwright)
  # ──────────────────────────────────────────────────
  e2e:
    name: End-to-End Tests
    runs-on: ubuntu-latest
    timeout-minutes: 20
    needs: build                # run setelah build selesai

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Download build artifact
        uses: actions/download-artifact@v8
        with:
          name: dist
          path: dist/

      - name: Run dev server
        run: npm run dev -- --port 5173 &
        env:
          PORT: 5173

      - name: Wait for dev server
        run: npx wait-on http://localhost:5173 --timeout 30000

      - name: Run Playwright tests
        run: npx playwright test --reporter=list
        env:
          BASE_URL: http://localhost:5173

      - name: Upload Playwright report
        uses: actions/upload-artifact@v7
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14

  # ──────────────────────────────────────────────────
  # Job 5: Security Scan
  # ──────────────────────────────────────────────────
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    timeout-minutes: 10
    needs: lint                 # run setelah lint selesai

    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=high
        continue-on-error: true  # don't fail pipeline, report only

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  # ──────────────────────────────────────────────────
  # Summary Comment on PR
  # ──────────────────────────────────────────────────
  summary:
    name: Build Summary
    runs-on: ubuntu-latest
    needs: [lint, test, build, e2e]
    if: github.event_name == 'pull_request'

    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v8

      - name: Post summary comment
        run: |
          echo "## CI/CD Build Summary" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Stage | Status |" >> $GITHUB_STEP_SUMMARY
          echo "|-------|--------|" >> $GITHUB_STEP_SUMMARY
          echo "| Lint | ${{ needs.lint.result == 'success' && '✅ PASS' || '❌ FAIL' }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Unit Tests | ${{ needs.test.result == 'success' && '✅ PASS' || '❌ FAIL' }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Build | ${{ needs.build.result == 'success' && '✅ PASS' || '❌ FAIL' }} |" >> $GITHUB_STEP_SUMMARY
          echo "| E2E Tests | ${{ needs.e2e.result == 'success' && '✅ PASS' || '❌ FAIL' }} |" >> $GITHUB_STEP_SUMMARY
````

---

## 01-github-actions-basics — Workflow Structure

````yaml
name: CI Pipeline # Workflow name

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env: # Global environment variables
  NODE_VERSION: '24'

jobs:
  build:
    runs-on: ubuntu-latest                 # Runner (VM)
    steps:
      - name: Checkout code
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
````

---

## 01-github-actions-basics — 2. Trigger Conditions

````yaml
on:
  push:
    branches: [main, develop, 'feature/**']
  pull_request:
    branches: [main, develop]
  workflow_dispatch: # Manual trigger
````

---

## 01-github-actions-basics — 1. Test Against Multiple Node Versions

````yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [22, 24]
        os: [ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: ${{ matrix.node-version }}
````

---

## 01-github-actions-basics — 2. Fast Fail

````yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [22, 24]
      fail-fast: true  # Stop all jobs if one fails
````

---

## 01-github-actions-basics — 3. Limit Concurrency

````yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
````

---

## 01-github-actions-basics — 1. npm Cache

````yaml
- name: Setup Node.js
  uses: actions/setup-node@v7
  with:
    node-version: '24'
    cache: 'npm'
````

---

## 01-github-actions-basics — 2. Build Cache (Vite/Webpack)

````yaml
- name: Cache build artifacts
  uses: actions/cache@v6
  with:
    path: |
      node_modules
      .vite
      dist
    key: ${{ runner.os }}-build-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-build-
````

---

## 01-github-actions-basics — 1. Run Tests with Coverage

````yaml
- name: Run tests with coverage
  run: npm test -- --coverage --ci
  env:
    CI: true
````

---

## 01-github-actions-basics — 2. Upload Coverage Report

````yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/lcov.info
    flags: unittests
````

---

## 01-github-actions-basics — 3. Artifact for Test Results

````yaml
- name: Upload test results
  uses: actions/upload-artifact@v7
  if: always()  # Upload even if tests fail
  with:
    name: test-results-${{ matrix.node-version }}
    path: |
      test-results/
      coverage/
    retention-days: 7
````

---

## 01-github-actions-basics — 4. Generate JUnit XML

````js
// jest.config.js (ini JavaScript, bukan YAML)
module.exports = {
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-results' }]
  ]
};
````

---

## 01-github-actions-basics — 1. Linting

````yaml
- name: Run ESLint
  run: npm run lint
````

---

## 01-github-actions-basics — 2. Secret Scanning

````yaml
- name: Check for secrets in code
  run: |
    if grep -r "api_key\|password\|secret" --include="*.js" --include="*.jsx" .; then
      echo "Found potential secrets in code!"
      exit 1
    fi
````

---

## 01-github-actions-basics — 3. Dependency Audit

````yaml
- name: Audit dependencies
  run: npm audit --audit-level=high
````

---

## 01-github-actions-basics — 4. Build Verification

````yaml
- name: Build
  run: npm run build

- name: Upload build artifacts
  uses: actions/upload-artifact@v7
  with:
    name: dist-${{ github.sha }}
    path: dist/
    retention-days: 14
````

---

## 01-github-actions-basics — 5. Quality Gate Summary

````yaml
- name: Generate PR summary
  if: always()
  run: |
    echo "## CI Results" >> $GITHUB_STEP_SUMMARY
    echo "- Tests: ${{ steps.test.outcome }}" >> $GITHUB_STEP_SUMMARY
    echo "- Lint: ${{ steps.lint.outcome }}" >> $GITHUB_STEP_SUMMARY
    echo "- Build: ${{ steps.build.outcome }}" >> $GITHUB_STEP_SUMMARY
````

---

## 02-deploy-pipeline — 1. Staging Workflow

````yaml
# TODO: Implementasikan
# code/02-deploy-workflow.yml

name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Checkout code
        uses: actions/checkout@v7

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version: '24'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: |
          docker build -t myapp:staging-${{ github.sha }} .

      - name: Push to registry
        run: |
          docker push ${{ secrets.REGISTRY }}/myapp:staging-${{ github.sha }}

      - name: Deploy to staging
        run: |
          # Deploy command untuk hosting provider
          kubectl set image deployment/myapp-staging \
            app=${{ secrets.REGISTRY }}/myapp:staging-${{ github.sha }}
````

---

## 02-deploy-pipeline — 2. Environment Protection

````yaml
# Tambah environment protection
environment:
  name: staging
  url: https://staging.example.com
````

---

## 02-deploy-pipeline — 3. Notify on Failure

````yaml
- name: Notify failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Staging deployment failed! :x:",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Staging Deployment Failed* :x:\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View logs>"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
````

---

## 02-deploy-pipeline — 1. Release Workflow

````yaml
on:
  push:
    tags:
      - 'v*.*.*'
````

---

## 02-deploy-pipeline — 2. Approval Gate

````yaml
jobs:
  deploy-production:
    runs-on: ubuntu-latest
    # Job ini menunggu persetujuan manual kalau environment "production" punya
    # required reviewers (atur di Settings → Environments).
    environment:
      name: production
      url: https://app.example.com
````

---

## 02-deploy-pipeline — 3. Production Deployment Steps

````yaml
- name: Tag release
  run: |
    git tag ${{ github.ref_name }}
    git push origin ${{ github.ref_name }}

- name: Build and push production image
  run: |
    docker build -t myapp:${{ github.ref_name }} .
    docker tag myapp:${{ github.ref_name }} ${{ secrets.REGISTRY }}/myapp:latest
    docker push ${{ secrets.REGISTRY }}/myapp:latest

- name: Deploy to production
  run: |
    kubectl rollout restart deployment/myapp-production
    kubectl rollout status deployment/myapp-production --timeout=300s
````

---

## 02-deploy-pipeline — 1. Smoke Test Job

````yaml
jobs:
  smoke-test:
    runs-on: ubuntu-latest
    needs: deploy-staging
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Run smoke tests
        run: |
          npx playwright test e2e/smoke.spec.js \
            --base-url ${{ needs.deploy-staging.outputs.url }}

      - name: Report smoke test results
        if: always()
        run: |
          echo "## Smoke Test Results" >> $GITHUB_STEP_SUMMARY
          echo "- Status: ${{ job.status }}" >> $GITHUB_STEP_SUMMARY
````

---

## 02-deploy-pipeline — 3. Pass/Fail to Next Job

````yaml
deploy-production:
  needs: [deploy-staging, smoke-test]
  # Only runs if both deploy-staging AND smoke-test pass
````

---

## 02-deploy-pipeline — 1. Automatic Rollback on Failure

````yaml
- name: Rollback on failure
  if: failure()
  run: |
    echo "Deployment failed, rolling back..."
    kubectl rollout undo deployment/myapp-staging

- name: Verify rollback
  run: |
    kubectl rollout status deployment/myapp-staging
    curl -f ${{ env.STAGING_URL }}/health || exit 1
````

---

## 02-deploy-pipeline — 2. Manual Rollback Workflow

````yaml
# .github/workflows/rollback.yml
name: Rollback Production

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to rollback to (e.g., v1.2.3)'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Rollback to version
        run: |
          kubectl set image deployment/myapp-production \
            app=${{ secrets.REGISTRY }}/myapp:${{ inputs.version }}

      - name: Verify rollback
        run: |
          kubectl rollout status deployment/myapp-production --timeout=300s
          curl -f https://app.example.com/health
````

---

## 02-deploy-pipeline — 3. Health Check Loop

````yaml
# Tidak perlu action pihak ketiga: curl sudah bisa mengulang sendiri.
# 24 percobaan x 5 detik = maksimal 120 detik menunggu.
- name: Wait for health check
  run: |
    curl --fail --silent --show-error \
      --retry 24 --retry-delay 5 --retry-all-errors \
      https://staging.example.com/health
````

---

## 02-deploy-pipeline — 1. Login to Registry

````yaml
- name: Login to Container Registry
  uses: docker/login-action@v4
  with:
    registry: ${{ secrets.REGISTRY }}
    username: ${{ secrets.REGISTRY_USER }}
    password: ${{ secrets.REGISTRY_TOKEN }}
````

---

## 02-deploy-pipeline — 2. Build and Push with Labels

````yaml
- name: Build and push
  uses: docker/build-push-action@v7
  with:
    context: .
    push: true
    tags: |
      ${{ secrets.REGISTRY }}/myapp:${{ github.sha }}
      ${{ secrets.REGISTRY }}/myapp:latest
      ${{ secrets.REGISTRY }}/myapp:${{ github.ref_name }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
    labels: |
      org.opencontainers.image.source=${{ github.server_url }}/${{ github.repository }}
      org.opencontainers.image.version=${{ github.ref_name }}
````

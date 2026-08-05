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

```yaml
name: CI Pipeline # Workflow name

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env: # Global environment variables
  NODE_VERSION: '20'

jobs:
  build:
    runs-on: ubuntu-latest                 # Runner (VM)
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
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
```

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

```yaml
on:
  push:
    branches: [main, develop, 'feature/**']
 pull_request:
    branches: [main, develop]
  workflow_dispatch: # Manual trigger
```

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

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
```

**2. Fast Fail**

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]
      fail-fast: true  # Stop all jobs if one fails
```

**3. Limit Concurrency**

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Bagian C — Caching (15 menit)

**1. npm Cache**

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

**2. Build Cache (Vite/Webpack)**

```yaml
- name: Cache build artifacts
  uses: actions/cache@v4
  with:
    path: |
      node_modules
      .vite
 dist
    key: ${{ runner.os }}-build-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-build-
```

**3. Compare Build Times**

Dokumentasikan sebelum/setelah caching:

| Scenario | Without Cache | With Cache | Improvement |
|----------|--------------|------------|-------------|
| First run | ? | ? | - |
| Subsequent (no changes) | ? | ? | - |
| After package.json change | ? | ? | - |

### Bagian D — Test& Coverage (20 menit)

**1. Run Tests with Coverage**

```yaml
- name: Run tests with coverage
  run: npm test -- --coverage --ci
  env:
    CI: true
```

**2. Upload Coverage Report**

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/lcov.info
    flags: unittests
```

**3. Artifact for Test Results**

```yaml
- name: Upload test results
  uses: actions/upload-artifact@v4
  if: always()  # Upload even if tests fail
  with:
    name: test-results-${{ matrix.node-version }}
    path: |
      test-results/
      coverage/
    retention-days: 7
```

**4. Generate JUnit XML**

Konfigurasi Jest untuk output JUnit XML:

```yaml
# jest.config.js
module.exports = {
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-results' }]
  ]
};
```

### Bagian E — Security & Quality Gates (20 menit)

**1. Linting**

```yaml
- name: Run ESLint
  run: npm run lint
```

**2. Secret Scanning**

GitHub sudah otomatis scan secrets, tapi tambahkan pre-commit check:

```yaml
- name: Check for secrets in code
  run: |
    if grep -r "api_key\|password\|secret" --include="*.js" --include="*.jsx" .; then
      echo "Found potential secrets in code!"
      exit 1
    fi
```

**3. Dependency Audit**

```yaml
- name: Audit dependencies
  run: npm audit --audit-level=high
```

**4. Build Verification**

```yaml
- name: Build
  run: npm run build

- name: Upload build artifacts
  uses: actions/upload-artifact@v4
  with:
    name: dist-${{ github.sha }}
    path: dist/
    retention-days: 14
```

**5. Quality Gate Summary**

Buat markdown report:

```yaml
- name: Generate PR summary
  if: always()
  run: |
    echo "## CI Results" >> $GITHUB_STEP_SUMMARY
    echo "- Tests: ${{ steps.test.outcome }}" >> $GITHUB_STEP_SUMMARY
    echo "- Lint: ${{ steps.lint.outcome }}" >> $GITHUB_STEP_SUMMARY
    echo "- Build: ${{ steps.build.outcome }}" >> $GITHUB_STEP_SUMMARY
```

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

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

```yaml
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
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
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
```

**2. Environment Protection**

```yaml
# Tambah environment protection
environment:
  name: staging
  url: https://staging.example.com
```

**3. Notify on Failure**

```yaml
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
```

### Bagian B — Production Deployment (15 menit)

**1. Release Workflow**

```yaml
on:
  push:
    tags:
      - 'v*.*.*'
```

**2. Approval Gate**

```yaml
jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://app.example.com
 environment:
      name: production
      url: https://app.example.com
    # Wait for manual approval
    environment: production
```

**3. Production Deployment Steps**

```yaml
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
```

### Bagian C — Smoke Testing (15 menit)

**1. Smoke Test Job**

```yaml
jobs:
  smoke-test:
    runs-on: ubuntu-latest
    needs: deploy-staging
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run smoke tests
        run: |
          npx playwright test e2e/smoke.spec.js \
            --base-url ${{ needs.deploy-staging.outputs.url }}

      - name: Report smoke test results
        if: always()
        run: |
          echo "## Smoke Test Results" >> $GITHUB_STEP_SUMMARY
          echo "- Status: ${{ job.status }}" >> $GITHUB_STEP_SUMMARY
```

**2. Critical Smoke Tests**

Minimal smoke tests:

| Test | Description | Timeout |
|------|-------------|---------|
| Health check | GET /health returns 200 | 5s |
| API responds | GET /api/products returns JSON | 10s |
| Frontend loads | Page loads without JS error | 15s |
| Login works | POST /api/auth/login succeeds | 10s |

**3. Pass/Fail to Next Job**

```yaml
deploy-production:
  needs: [deploy-staging, smoke-test]
  # Only runs if both deploy-staging AND smoke-test pass
```

### Bagian D — Rollback Strategy (20 menit)

**1. Automatic Rollback on Failure**

```yaml
- name: Rollback on failure
  if: failure()
  run: |
    echo "Deployment failed, rolling back..."
    kubectl rollout undo deployment/myapp-staging

- name: Verify rollback
  run: |
    kubectl rollout status deployment/myapp-staging
    curl -f ${{ env.STAGING_URL }}/health || exit 1
```

**2. Manual Rollback Workflow**

Buat workflow terpisah untuk rollback manual:

```yaml
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
```

**3. Health Check Loop**

```yaml
- name: Wait for health check
  uses: joshmcgrath/await-verification-action@v1
  with:
    verify: |
      curl -f https://staging.example.com/health
    timeout: 120s
    interval: 5s
    retries: 24
```

### Bagian E — Docker Registry Integration (15 menit)

**1. Login to Registry**

```yaml
- name: Login to Container Registry
  uses: docker/login-action@v3
  with:
    registry: ${{ secrets.REGISTRY }}
    username: ${{ secrets.REGISTRY_USER }}
    password: ${{ secrets.REGISTRY_TOKEN }}
```

**2. Build and Push with Labels**

```yaml
- name: Build and push
  uses: docker/build-push-action@v5
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
```

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

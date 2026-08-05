# Tutorial 01 — Docker & CI/CD Pipeline

## Tujuan
Meng-containerize fullstack app dengan Docker, lalu setup CI/CD otomatis dengan GitHub Actions.

---

## Bagian 1 — Docker untuk Backend

### Buat Dockerfile

Di folder `blog-api/`, buat `Dockerfile`:

```dockerfile
# Gunakan image Node.js resmi
FROM node:24-alpine

# Buat direktori kerja
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy seluruh kode
COPY . .

# Expose port
EXPOSE 3000

# Jalankan server
CMD ["node", "index.js"]
```

### Buat .dockerignore

```
node_modules/
.git/
*.db
.env
```

### Build & Run

```bash
cd blog-api

# Build image
docker build -t blog-api .

# Jalankan container
docker run -p 3000:3000 --env-file .env blog-api
```

Buka `http://localhost:3000`.

---

## Bagian 2 — Docker Compose (Backend + DB)

Buat `docker-compose.yml` di root project:

```yaml
version: "3.9"

services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: blog
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: ./blog-api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://admin:password123@db:5432/blog
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - db
    volumes:
      - ./blog-api:/app
      - /app/node_modules

  frontend:
    build: ./fullstack-blog
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:3000
    depends_on:
      - api

volumes:
  postgres_data:
```

---

## Bagian 3 — GitHub Actions CI/CD

Buat `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # ==========================================
  # JOB 1: CI - Test & Lint
  # ==========================================
  ci:
    name: Test & Lint
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
          cache-dependency-path: blog-api/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

  # ==========================================
  # JOB 2: Build Docker Image
  # ==========================================
  build:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: ci

    steps:
      - uses: actions/checkout@v4

      - name: Build image
        run: docker build -t blog-api ./blog-api

  # ==========================================
  # JOB 3: Deploy to Railway
  # ==========================================
  deploy:
    name: Deploy to Railway
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: railway-deploy-action@v1
        with:
          api-token: ${{ secrets.RAILWAY_API_TOKEN }}
          project-id: ${{ secrets.RAILWAY_PROJECT_ID }}
          service: blog-api
```

---

## Bagian 4 — Setup Secrets di GitHub

1. Buka repo di GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Tambahkan:
   - `RAILWAY_API_TOKEN` — dari railway.app → Account Settings
   - `RAILWAY_PROJECT_ID` — dari project Railway

---

## Alur CI/CD Otomatis

```
Push ke main
    │
    ▼
┌─────────┐
│   CI    │ ← Checkout → Install → Lint → Test
└────┬───┘
    │ ✅ Semua pass
    ▼
┌─────────┐
│  Build  │ ← Docker build
└────┬───┘
    │
    ▼
┌─────────┐
│ Deploy  │ ← Railway auto-deploy
└─────────┘
```

---

## Latihan Tambahan

1. Tambah job untuk test frontend (Vitest)
2. Tambah Snyk atau Trivy untuk security scanning
3. Setup preview deployment untuk setiap PR
4. Tambahkan notification ke Slack saat deploy berhasil/gagal

---

**Lanjut ke:** Tutorial 02 — WebSocket Real-time Chat

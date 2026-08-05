# 📘 MATERI TEORI 03 — Docker& Containerization

## 1. Apa itu Docker?

Docker = tool untuk **containerization** — paket aplikasi + semua dependensinya jadi satu unit yang bisa jalan di mana saja.

```
Traditional:                  Docker:
┌──────────────┐              ┌────────────────────┐
│   Server    │              │      Docker Host    │
│ ┌─────────┐ │              │  ┌───────┐ ┌───────┐ │
│ │  App    │ │              │  │Container│ │Container│ │
│ │  Node   │ │              │  │  App1  │ │  App2  │ │
│ │  Libs   │ │              │  │  Node  │ │  Node  │ │
│ └─────────┘ │              │  └───────┘ └───────┘ │
│ ┌─────────┐ │              │  ┌───────┐ ┌───────┐ │
│ │  App    │ │              │  │Container│ │Container│ │
│ │  Python │ │              │  │  DB1  │ │  DB2  │ │
│ │  Libs   │ │              │  │ Postgres│ │ Mongo  │ │
│ └─────────┘ │              │  └───────┘ └───────┘ │
└──────────────┘              └────────────────────┘
    Conflict!                    Isolated, portable
```

---

## 2. Docker vs VM

| Aspek | VM | Docker Container |
|-------|-----|-----------------|
| Ukuran | GB | MB |
| Startup | Menit | Detik |
| Isolation | Penuh (hardware) | Process-level |
| Portability | Medium | Sangat tinggi |
| Performance | overhead | Minimal overhead |

---

## 3. Dockerfile — Build Image

```dockerfile
# Dockerfile — contoh Node.js app
FROM node:24-alpine                    # Base image (small, secure)

WORKDIR /app                           # Working directory

# Copy package files dulu (untuk cache layer)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production           # ci = clean install, lebih reproducible

# Copy source code
COPY . .

# Non-root user untuk keamanan
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start command
CMD ["node", "src/index.js"]
```

### Multi-Stage Build (Ukuran kecil!)

```dockerfile
# Multi-stage — build di satu stage, copy artifact ke stage baru
# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build                      # Build frontend

# Stage 2: Production
FROM node:24-alpine AS runner
WORKDIR /app

# Copy hanya file yang dibutuhkan
COPY package*.json ./
RUN npm ci --only=production
COPY src/ ./src/
COPY --from=builder /app/dist ./dist   # Copy hasil build

USER nodejs
EXPOSE 3000
CMD ["node", "src/index.js"]
```

---

## 4. .dockerignore

```bash
# .dockerignore — exclude file dari build context
node_modules/
.git/
.env
.env.*
*.log
dist/
coverage/
*.md
.gitignore
Dockerfile
docker-compose.yml
```

---

## 5. Docker Commands

```bash
# Build image
docker build -t my-app:latest .

# Run container
docker run -d -p 3000:3000 --name my-app-container my-app:latest
# -d = detached (background)
# -p 3000:3000 = port host:container
# --name = nama container

# Run dengan env variables
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgres://... \
  --name my-app-container \
  my-app:latest

# Run dengan volume (data persist)
docker run -d -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name my-app-container \
  my-app:latest

# List running containers
docker ps

# Stop / Start
docker stop my-app-container
docker start my-app-container

# Logs
docker logs -f my-app-container

# Exec into container
docker exec -it my-app-container sh

# Remove container
docker rm -f my-app-container

# Remove image
docker rmi my-app:latest

# Build dengan tag
docker build -t my-app:1.0.0 -t my-app:latest .

# Push to registry
docker tag my-app:latest myusername/my-app:latest
docker push myusername/my-app:latest
```

---

## 6. Docker Compose — Multi-Container

```yaml
# docker-compose.yml
version: "3.9"

services:
  # Backend API
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: my-api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres:secret@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  # Database
  db:
    image: postgres:16-alpine
    container_name: my-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-secretpassword}
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # Redis (cache)
  redis:
    image: redis:7-alpine
    container_name: my-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx (reverse proxy)
  nginx:
    image: nginx:alpine
    container_name: my-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

```bash
# Start semua services
docker compose up -d

# Start dengan rebuild
docker compose up -d --build

# Stop semua services
docker compose down

# Stop + hapus volumes (clean slate)
docker compose down -v

# Logs semua services
docker compose logs -f

# Logs service tertentu
docker compose logs -f api

# Scale (tambah replica)
docker compose up -d --scale api=3
```

---

## 7. Docker Compose untuk Development

```yaml
# docker-compose.yml (development)
version: "3.9"

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: my-api-dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://postgres:secret@db:5432/myapp
    volumes:
      - .:/app        # hot reload — mount source code
      - /app/node_modules  # preserve node_modules di container
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
```

---

## 8. Docker Security Best Practices

```dockerfile
# 1. Pakai Alpine (lebih kecil, lebih aman)
FROM node:24-alpine

# 2. Non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# 3. Tidak ada secrets di Dockerfile (pakai env vars atau secrets manager)
# ❌ COPY secrets.json ./

# 4. Scan vulnerabilities
# docker scan my-app:latest
# atau: trivy image my-app:latest

# 5. Minimal base image
# ❌ FROM node:24 (full image)
# ✅ FROM node:24-alpine
# ✅ FROM node:24-alpine
```

---

## Ringkasan

```
Docker
├── Image       → template read-only untuk container
├── Container   → instance dari image (jalan)
├── Dockerfile  → instruksi build image
├── .dockerignore → exclude file dari build
├── Multi-stage → build di builder, run di runner (size kecil)
├── Docker Compose → orchestrate multi-container
├── Commands    → build, run, ps, logs, exec, rm
└── Security    → Alpine, non-root, no secrets in image, scan
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-docker/`
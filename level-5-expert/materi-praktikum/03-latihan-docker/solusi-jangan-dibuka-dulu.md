# Solusi — Latihan Docker (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi kunci jawaban. Kerjakan dulu Dockerfile,
> `.dockerignore`, dan `nginx.conf` versimu sendiri, bangun image-nya, lalu
> bandingkan di sini. Kalau cara kamu beda tapi image-nya jalan, kecil, dan
> non-root, itu tidak salah.

Isi di bawah dipindahkan apa adanya dari starter lama. Salinan file kembar
`02-multi-stage-Dockerfile` dan `03-.dockerignore` juga ada di
`_arsip/level-5-file-kembar/03-latihan-docker/`.

---

## Soal 01 — Dockerfile backend Node.js (`01-Dockerfile` lama)

````dockerfile
# ============================================================
# SOAL 01 — Dockerfile Dasar
# ============================================================
# Install dependencies:
#   npm install
#
# Build image:
#   docker build -t my-api:1.0 -f materi-praktikum/03-latihan-docker/code/01-Dockerfile .
#
# Run container:
#   docker run -d -p 5000:5000 --name my-api my-api:1.0
#
# Test:
#   curl http://localhost:5000/health
#
# Inspect image size:
#   docker images my-api:1.0
# ============================================================

# ──────────────────────────────────────────────
# Stage 1: Install dependencies (cached layer)
# ──────────────────────────────────────────────
FROM node:24-alpine AS deps

WORKDIR /app

# Copy package files dulu — leverage Docker layer cache.
# Jika package.json tidak berubah, layer ini di-cache
# bahkan saat source code berubah.
COPY package*.json ./

# Install production dependencies only.
# --only=production = skip devDependencies (lebih kecil)
RUN npm ci --only=production

# ──────────────────────────────────────────────
# Stage 2: Production
# ──────────────────────────────────────────────
FROM node:24-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy node_modules dari stage deps (cached, tidak re-install)
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY src/ ./src/

# ── Security: Non-root user ─────────────────────
# alpine base image tidak punya user management tools,
# jadi kita buat secara manual.
RUN addgroup -g 1001 -S nodeapp && \
    adduser -S nodeapp -u 1001

# Set ownership dari /app ke user nodeapp
RUN chown -R nodeapp:nodeapp /app

# Switch ke non-root user —INI PENTING untuk security
USER nodeapp

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port yang digunakan server
EXPOSE 5000

# Health check — curl sudah ada di alpine
# curl sudah built-in di node:24-alpine
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# CMD dalam array format (shell form vs exec form — pakai exec form)
CMD ["node", "src/server.js"]
````

## Soal 02 — Dockerfile multi-stage (`02-multi-stage-Dockerfile`)

````dockerfile
# ============================================================
# SOAL 02 — Multi-Stage Build untuk Frontend + Nginx
# ============================================================
# Install dependencies:
#   cd frontend && npm install
#
# Build frontend image:
#   docker build -t my-frontend:1.0 \
#     -f materi-praktikum/03-latihan-docker/code/02-multi-stage-Dockerfile \
#     ./frontend
#
# Run container:
#   docker run -d -p 8080:80 --name my-frontend my-frontend:1.0
#
# Test SPA routing:
#   curl http://localhost:8080/             → 200 (index.html)
#   curl http://localhost:8080/dashboard   → 200 (index.html, bukan 404!)
# ============================================================

# ──────────────────────────────────────────────
# Stage 1: Builder — compile React app
# ──────────────────────────────────────────────
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files dulu (cache optimization)
COPY package*.json ./

# Install semua dependencies (termasuk devDependencies untuk build)
RUN npm ci

# Copy source code
COPY src/ ./src/
COPY public/ ./public/
COPY vite.config.js ./
COPY index.html ./

# Build production bundle
# VITE_API_URL akan di-override saat runtime
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2: Production — serve dengan Nginx
# ──────────────────────────────────────────────
FROM nginx:alpine AS production

# Copy hasil build dari stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx SPA configuration
# try_files $uri $uri/ /index.html → fallback ke index.html
# Ini penting untuk React Router (client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: non-root (nginx:alpine sudah non-root)
# nginx:alpine berjalan sebagai "nginx" user (UID 82)

# Expose port 80 (default untuk nginx)
EXPOSE 80

# Gzip compression sudah enabled by default di nginx:alpine
# Jika perlu explicit:
# RUN sed -i 's|# gzip on;|gzip on;|' /etc/nginx/nginx.conf

# Start nginx di foreground
CMD ["nginx", "-g", "daemon off;"]


# ============================================================
# nginx.conf — Konfigurasi Nginx untuk SPA
# ============================================================
# Buat file ini di direktori yang sama:
#   materi-praktikum/03-latihan-docker/code/nginx.conf
# ============================================================

# Catatan: karena nginx:alpine tidak punya curl, healthcheck pakai:
# HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
#   CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

````

## Soal 02 — Jawaban kecil yang sebelumnya terselip di `02-Dockerfile`

Bagian "EXAMPLE SOLUTION" dan konfigurasi nginx yang dulu ada dalam komentar
`02-Dockerfile`:

````text
# ============================================================
# Multi-Stage Dockerfile — React Frontend dengan Nginx
# ============================================================
#
# TODO: Implementasikan multi-stage Dockerfile untuk React SPA
#
# Goals:
# - Build stage: Compile React dengan Vite
# - Production stage: Serve dengan Nginx
# - Final image < 50MB
# - SPA routing (fallback ke index.html)
# - Security headers
# - Gzip compression
#
# Run: docker build -t my-frontend:1.0 .
# Run: docker run -p 8080:80 my-frontend:1.0
# ============================================================

# ============================================================
# STAGE 1: Builder — Compile React App
# ============================================================
# TODO: Base image untuk build stage
# Hint: Butuh Node.js + npm
# FROM node:24-alpine AS builder

# TODO: Set working directory
# WORKDIR /app

# TODO: Copy package files
# COPY package*.json ./

# TODO: Install ALL dependencies (karena perlu build tools)
# Hint: npm ci (karena ada package-lock.json)

# TODO: Copy source code
# COPY . .

# TODO: Run build command
# Hint: Vite build: npm run build
# Atau untuk Create React App: npm run build

# ============================================================
# STAGE 2: Production — Nginx
# ============================================================
# TODO: Base image untuk production stage
# Hint:nginx:alpine (~50MB)
# FROM nginx:alpine AS production

# TODO: Copy built assets dari builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# TODO: Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# TODO: Expose port 80
# EXPOSE 80

# TODO: Start nginx
# CMD harus foreground untuk container tidak exit immediately
# CMD ["nginx", "-g", "daemon off;"]

# ============================================================
# NGINX CONFIGURATION (nginx.conf)
# ============================================================
# TODO: Buat file nginx.conf dengan:
#
# server {
#   listen 80;
#   server_name _;
#   root /usr/share/nginx/html;
#   index index.html;
#
#   # SPA routing — PENTING untuk React Router
#   location / {
#       try_files $uri $uri/ /index.html;
#   }
#
#   # Cache static assets (CSS, JS, images)
#   location /assets {
#       expires 1y;
#       add_header Cache-Control "public, immutable";
#   }
#
#   # Security headers
#   add_header X-Frame-Options "SAMEORIGIN" always;
#   add_header X-Content-Type-Options "nosniff" always;
#   add_header X-XSS-Protection "1; mode=block" always;
#
#   # Gzip compression
#   gzip on;
#   gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
# }

# ============================================================
# BUILD AND TEST
# ============================================================
# Build:
# docker build -t my-frontend:1.0 --target production .
#
# Run:
# docker run -p 8080:80 my-frontend:1.0
#
# Test SPA routing:
# curl -I http://localhost:8080/
# curl -I http://localhost:8080/dashboard  (should return 200, bukan 404!)
# curl -I http://localhost:8080/nonexistent-route (should return 200!)

# ============================================================
# EXAMPLE SOLUTION (simplified — remove when implementing)
# ============================================================

# # Stage 1: Build
# FROM node:24-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# # Stage 2: Production
# FROM nginx:alpine AS production
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
````

## Soal 01 — `.dockerignore` lengkap (`03-.dockerignore`)

````text
# ============================================================
# SOAL 01 — .dockerignore
# ============================================================
# Tambahkan file/folder yang TIDAK perlu masuk ke Docker image.
# Docker build context = semua file yang di-COPY dari host ke image.
# .dockerignore mencegah file besar/tidak perlu dikirim ke Docker daemon.
#
# Test efek .dockerignore:
#   docker build --no-cache -t my-app:test . 2>&1 | grep "Sending build context"
#   → Tanpa .dockerignore: context bisa GB+
#   → Dengan .dockerignore: context lebih kecil
# ============================================================

# ─── Version Control ───────────────────────────────
.git
.gitignore
.gitattributes

# ─── Dependencies (di-install saat build) ──────────
node_modules/
bower_components/

# ─── Build Artifacts (di-generate ulang) ───────────
dist/
build/
.vite/
.next/
.nuxt/
output/

# ─── Development Files ──────────────────────────────
.env
.env.*
.env.local
.env.development
.env.production
*.md
LICENSE
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# ─── Test & Coverage ───────────────────────────────
coverage/
.nyc_output/
test-results/
__tests__/
*.test.js
*.test.jsx
*.spec.js
*.spec.jsx
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx
jest.config.*
vitest.config.*
playwright.config.*

# ─── Editor & IDE ──────────────────────────────────
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db

# ─── CI/CD & Docker ────────────────────────────────
docker-compose*.yml
docker-compose*.yaml
Dockerfile
.dockerignore
.docker/

# ─── Documentation ─────────────────────────────────
docs/
*.md
CHANGELOG*
CONTRIBUTING*

# ─── Temporary & Cache ─────────────────────────────
tmp/
temp/
.cache/
.parcel-cache/

````

---

## Soal 04 — docker-compose.yml lengkap (`code/04-docker-compose.yml` lama)

````yaml
# ============================================================
# SOAL 04 — Docker Compose: Fullstack App
# ============================================================
# Install:
#   docker compose version   # Pastikan Docker Compose v2+
#
# Start semua services:
#   docker compose -f materi-praktikum/03-latihan-docker/code/04-docker-compose.yml up -d
#
# Start dengan development profile (hot reload + dev tools):
#   docker compose -f materi-praktikum/03-latihan-docker/code/04-docker-compose.yml --profile dev up -d
#
# Stop semua services:
#   docker compose -f materi-praktikum/03-latihan-docker/code/04-docker-compose.yml down
#
# Stop + hapus volumes (clean slate):
#   docker compose -f materi-praktikum/03-latihan-docker/code/04-docker-compose.yml down -v
#
# View logs:
#   docker compose -f materi-praktikum/03-latihan-docker/code/04-docker-compose.yml logs -f
# ============================================================

# Catatan: kunci `version:` sudah usang di Compose v2, jadi sengaja tidak dipakai.

# ─── Named Volumes ────────────────────────────────
volumes:
  # PostgreSQL data persistence — data survive container restart
  postgres_data:
  # Redis data persistence
  redis_data:

# ─── Networks ───────────────────────────────────
networks:
  app-network:
    driver: bridge

# ─── Services ───────────────────────────────────
services:

  # ── Nginx Reverse Proxy ────────────────────────
  # Entry point — route traffic ke frontend/backend
  nginx:
    image: nginx:alpine
    container_name: myapp_nginx
    ports:
      - "80:80"
      # - "443:443" # uncomment untuk HTTPS
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      # - ./nginx/certs:/etc/nginx/certs:ro  # uncomment untuk SSL
    depends_on:
      frontend:
        condition: service_started
      backend:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped
    # Security hardening
    read_only: true
    tmpfs:
      - /tmp
      - /run
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # ── Frontend (React + Vite) — Production ────────
  frontend:
    build:
      context: ../../frontend
      dockerfile: ../materi-praktikum/03-latihan-docker/code/02-Dockerfile
      target: production
    container_name: myapp_frontend
    profiles:
      - prod
    networks:
      - app-network
    restart: unless-stopped
    read_only: true
    tmpfs:
      - /tmp
      - /app:mode=1777   # Vite hot reload butuh write ke /app

  # ── Frontend Dev (dengan hot reload) ───────────
  frontend-dev:
    build:
      context: ../../frontend
      dockerfile: ../materi-praktikum/03-latihan-docker/code/02-Dockerfile
      target: development
    container_name: myapp_frontend_dev
    profiles:
      - dev
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:5000
      - CHOKIDAR_USEPOLLING=true
    volumes:
      - ../../frontend/src:/app/src
    networks:
      - app-network
    restart: unless-stopped

 # ── Backend (Express.js API) ───────────────────
  backend:
    build:
      context: ../../backend
      dockerfile: ../materi-praktikum/03-latihan-docker/code/01-Dockerfile
    container_name: myapp_backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://${POSTGRES_USER:-admin}:${POSTGRES_PASSWORD:-changeme}@postgres:5432/${POSTGRES_DB:-myapp}
      - REDIS_URL=redis://redis:6379
      - PORT=5000
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:5000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    read_only: true
    tmpfs:
      - /tmp
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # ── Backend Dev ────────────────────────────────
  backend-dev:
    image: node:24-alpine
    container_name: myapp_backend_dev
    profiles:
      - dev
    ports:
      - "5000:5000"
    working_dir: /app
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://${POSTGRES_USER:-admin}:${POSTGRES_PASSWORD:-changeme}@postgres:5432/${POSTGRES_DB:-myapp}
      - REDIS_URL=redis://redis:6379
    volumes:
      - ../../backend:/app
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - app-network
    command: sh -c "npm install && npm run dev"
    restart: unless-stopped

  # ── PostgreSQL Database ────────────────────────
  postgres:
    image: postgres:15-alpine
    container_name: myapp_postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-admin}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme}
      POSTGRES_DB: ${POSTGRES_DB:-myapp}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-admin} -d ${POSTGRES_DB:-myapp}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 1G
        reservations:
          cpus: "0.25"
          memory: 256M
    security_opt:
      - no-new-privileges:true

  # ── Redis Cache ───────────────────────────────
  redis:
    image: redis:7-alpine
    container_name: myapp_redis
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp

  # ── Adminer — DB GUI (Development Only) ────────
  adminer:
    image: adminer:4
    container_name: myapp_adminer
    profiles:
      - dev
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_started
    networks:
      - app-network
    restart: unless-stopped

  # ── Mailhog — Email Testing (Development Only) ─
  mailhog:
    image: mailhog/mailhog:latest
    container_name: myapp_mailhog
    profiles:
      - dev
    ports:
      - "1025:1025"   # SMTP server
      - "8025:8025"   # Web UI
    networks:
      - app-network
    restart: unless-stopped
````

---

## Soal 02 — nginx.conf lengkap (`code/nginx.conf` lama)

````nginx
# ============================================================
# nginx.conf — Konfigurasi Nginx untuk React SPA
# ============================================================
# Tempatkan di direktori yang sama dengan 02-Dockerfile
# Include di Dockerfile:
#   COPY nginx.conf /etc/nginx/conf.d/default.conf
# ============================================================

server {
    listen 80;
    server_name _;

    # Root directory untuk static files (dari COPY --from=builder)
    root /usr/share/nginx/html;
    index index.html;

    # ─── SPA Routing ────────────────────────────────
    # React Router menggunakan client-side routing.
    # Jika user akses /dashboard langsung, nginx harus return index.html,
    # bukan 404. try_files akan coba file fisik, lalu /index.html fallback.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ─── Static Assets — Cache Long-lived ───────────
    # assets/ dari Vite build — cache 1 tahun (immutable)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ─── Security Headers ───────────────────────────
    add_header X-Frame-Options        "SAMEORIGIN"           always;
    add_header X-Content-Type-Options  "nosniff"              always;
    add_header X-XSS-Protection        "1; mode=block"        always;
    add_header Referrer-Policy         "strict-origin-when-cross-origin" always;

    # ─── CSP — Content Security Policy ─────────────
    # Sesuaikan dengan domain API yang digunakan aplikasi
    # 'self' = origin yang sama
    # 'unsafe-inline' diperlukan karena React produksi build
    #   menghasilkan inline styles dan eval untuk HMR
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.example.com wss://api.example.com;" always;

    # ─── Gzip Compression ────────────────────────────
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/xml
        application/xml+rss
        image/svg+xml;

    # ─── Rate Limiting Zones ─────────────────────────
    # Batasi request per IP untuk mencegah abuse
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

    # Apply rate limiting ke /api (jika reverse proxy ke backend)
    # location /api {
    #     limit_req zone=api burst=20 nodelay;
    #     proxy_pass http://backend:5000;
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    # }

    # ─── Health Check ───────────────────────────────
    location /health {
        return 200 'OK';
        add_header Content-Type text/plain;
        access_log off;
    }

    # ─── Error Pages ────────────────────────────────
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
````

---

## Blok dari `soal/04-docker-compose.md`: 1. Nginx Configuration

````nginx
# nginx.conf
upstream frontend {
    server frontend:3000;
}

upstream backend {
    server backend:5000;
}

server {
    listen 80;
    server_name _;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://backend;
        access_log off;
    }
}
````

---

## Blok dari `soal/02-multi-stage-build.md`: Nginx for SPA

````nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
````

---

## 01-dockerfile-basics — 1. Non-root User

````dockerfile
# Tambahkan user non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodeapp -u 1001

# Gunakan user tersebut
USER nodeapp
````

---

## 01-dockerfile-basics — 2. Health Check

````dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1
````

---

## 01-dockerfile-basics — 1. Dependency Layer Optimization

````dockerfile
# Layer 1: Copy package files FIRST
COPY package*.json ./

# Layer 2: Install dependencies (cached if package.json unchanged)
RUN npm ci --only=production

# Layer 3: Copy source code (changed frequently)
COPY . .

# Layer 4: Non-root setup
RUN adduser ...
````

---

## 01-dockerfile-basics — 1. Setup Multi-Stage Dockerfile

````dockerfile
# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # atau transpile TypeScript

# Stage 2: Production
FROM node:24-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER nodeapp
CMD ["node", "dist/server.js"]
````

---

## 02-multi-stage-build — 2. Production Stage

````dockerfile
# Production stage
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
````

---

## 02-multi-stage-build — 1. Security Headers

````nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
````

---

## 02-multi-stage-build — 2. Rate Limiting

````nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20;
````

---

## 02-multi-stage-build — 3. Content Security Policy (CSP)

````nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.example.com;" always;
````

---

## 04-docker-compose — 1. Health Checks

````yaml
postgres:
  image: postgres:15-alpine
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
    interval: 5s
    timeout: 5s
    retries: 5
    start_period: 10s
````

---

## 04-docker-compose — 3. Backend Health Check

````yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
    interval: 10s
    timeout: 5s
    retries: 3
    start_period: 15s
````

---

## 04-docker-compose — 2. Override File

````yaml
# docker-compose.override.yml (auto-loaded)

services:
  frontend:
    build:
      context: ./frontend
      target: development
    volumes:
      - ./frontend/src:/app/src  # Hot reload
    environment:
      - CHOKIDAR_USEPOLLING=true  # Watch mode untuk volume mount

  backend:
    volumes:
      - ./backend/src:/app/src  # Hot reload
    environment:
      - NODE_ENV=development
      - DEBUG=*
````

---

## 04-docker-compose — 3. Profile untuk Development Tools

````yaml
services:
  adminer:
    image: adminer:4
    profiles: [dev]
    ports:
      - 8080:8080
    depends_on:
      - postgres

  mailhog:
    image: mailhog/mailhog
    profiles: [dev]
    ports:
      - 8025:8025  # Web UI
      - 1025:1025  # SMTP server
````

---

## 04-docker-compose — 4. Production Build

````yaml
services:
  frontend:
    build:
      context: ./frontend
      target: production
    restart: unless-stopped
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
    restart: unless-stopped
    environment:
      - NODE_ENV=production
````

---

## 04-docker-compose — 1. Restart Policies

````yaml
services:
  frontend:
    restart: unless-stopped
  backend:
    restart: unless-stopped
  postgres:
    restart: unless-stopped
````

---

## 04-docker-compose — 2. Resource Limits

````yaml
services:
  postgres:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
````

---

## 04-docker-compose — 3. Logging Configuration

````yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
````

---

## 04-docker-compose — 4. Security Hardening

````yaml
services:
  postgres:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
      - /run

  backend:
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
````


## 03-volume-networking — A1. Create Custom Network

```bash
# Buat network untuk aplikasi
docker network create --driver bridge app-network

# Verifikasi
docker network ls
docker network inspect app-network
```


## 03-volume-networking — A2. Connect Containers to Network

```bash
# Jalankan PostgreSQL di network
docker run -d \
  --network app-network \
  --name postgres \
  -e POSTGRES_DB=myapp \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  postgres:15-alpine

# Jalankan backend di network
docker run -d \
  --network app-network \
  --name backend \
  -e DATABASE_URL=postgresql://admin:secret@postgres:5432/myapp \
  -p 5000:5000 \
  my-backend:1.0

# Verifikasi konektivitas
docker exec backend ping -c 3 postgres
docker exec backend psql -h postgres -U admin -d myapp -c "SELECT 1;"
```


## 03-volume-networking — B1. Named Volume untuk Database

```bash
# Buat named volume
docker volume create --driver local pgdata

# Mount ke PostgreSQL container
docker run -d \
  --name postgres \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15-alpine

# Verifikasi data persistence
docker exec postgres psql -U postgres -c "CREATE TABLE test (id SERIAL PRIMARY KEY);"
docker restart postgres
docker exec postgres psql -U postgres -c "SELECT * FROM test;"  # Data masih ada!
```


## 03-volume-networking — B2. Bind Mount untuk Development

```bash
# Bind mount source code untuk hot reload
docker run -d \
  --name frontend-dev \
  -v $(pwd)/src:/app/src \
  -p 3000:3000 \
  my-frontend:dev

# Verifikasi perubahan kode langsung terlihat
echo "// dev comment" >> src/App.jsx
docker exec frontend-dev cat /app/src/App.jsx # Comment harus terlihat
```


## 03-volume-networking — B3. tmpfs untuk Sensitive Data

```bash
# tmpfs mount untuk secrets
docker run -d \
  --name backend \
  --tmpfs /run/secrets \
  -e SECRET_PATH=/run/secrets/api-key \
  my-backend:1.0

# Verifikasi secrets tidak ada di disk
docker exec backend ls /run/secrets
docker inspect backend --format='{{json .Mounts}}' | jq
```


## 03-volume-networking — B4. Volume Backup & Restore

```bash
# Backup
docker run --rm \
  -v pgdata:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/pgdata-backup.tar.gz -C /data .

# Restore
docker volume create pgdata-new
docker run --rm \
  -v pgdata-new:/data \
  -v $(pwd):/backup \
  alpine \
  tar xzf /backup/pgdata-backup.tar.gz -C /data
```


## 03-volume-networking — C2. ENV in Dockerfile

```dockerfile
# ENV di Dockerfile — baked into image (perlu rebuild untuk change)
ENV NODE_ENV=production
ENV PORT=5000

# Bisa di-override saat runtime
# docker run -e PORT=8080 myapp:1.0
```


## 03-volume-networking — C3. Environment File (.env)

```bash
# .env file
DATABASE_URL=postgresql://admin:secret@localhost:5432/myapp
API_KEY=your-api-key-here
LOG_LEVEL=info

# Load dengan --env-file
docker run --env-file .env my-backend:1.0
```


## 03-volume-networking — C4. Security: Secrets vs ENV

```bash
# BAD: Secrets di ENV (visible di docker inspect)
docker run -e API_KEY=super-secret-key myapp:1.0
docker inspect container_id  # API_KEY visible!

# GOOD: Secrets dari file
echo "super-secret-key" > /run/secrets/api-key
docker run --tmpfs /run/secrets:ro myapp:1.0
docker exec container_id cat /run/secrets/api-key  # Butuh access ke container

# BETTER: Docker Secrets (Swarm mode)
echo "super-secret-key" | docker secret create api_key -
```


## 03-volume-networking — D2. Test dengan docker-compose

```bash
# Start all services
docker compose up -d

# Verify all services running
docker compose ps

# Verify networking
docker compose exec backend ping -c 3 postgres

# View logs
docker compose logs -f backend

# Stop all services
docker compose down
```


## 03-volume-networking — D3. Volume dalam docker-compose

```yaml
volumes:
  pgdata:
    driver: local
services:
  postgres:
    volumes:
      - pgdata:/var/lib/postgresql/data
```


## 03-volume-networking — E1. Could not resolve host

```bash
# Cause: Container tidak di network yang sama
docker run --rm postgres:15-alpine psql -h backend -U admin
# Error: could not translate host name "backend" to address

# Solution: Connect ke network yang benar
docker network connect app-network container_id
docker network disconnect wrong-network container_id
```


## 03-volume-networking — E2. Connection refused

```bash
# Cause: Port mismatch atau service belum ready
# Check: Apakah service listen di port yang benar?
docker exec backend netstat -tlnp
# Check: Apakah service sudah started?
docker compose logs backend | grep "listening"
```


## 03-volume-networking — E3. Permission denied pada volume

```bash
# Cause: File ownership mismatch
docker exec postgres ls -la /var/lib/postgresql/data
# Solution: Set ownership
docker run --rm -v pgdata:/data alpine chown -R postgres:postgres /data
```


## 03-volume-networking — E4. Volume mount failed

```bash
# Cause: Path tidak ada atau permission
docker run -v /nonexistent/path:/data alpine  # Error!
# Solution: Buat path atau gunakan named volume
```


## 03-volume-networking — E5. Variable not set

```bash
# Debug: Check environment variables
docker exec container_id env | grep YOUR_VAR

# Check: Apakah ENV di Dockerfile sudah di-set?
docker inspect container_id --format='{{json .Config.Env}}'
```

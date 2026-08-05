# TUTORIAL 01 — Docker: Containerize Aplikasi Fullstack

## Tujuan
Kamu akan belajar cara mem-packaging aplikasi fullstack ke dalam Docker container, sehingga bisa jalan di mana saja tanpa perlu install Node.js, PostgreSQL, dll.

---

## Apa itu Docker?

**Docker** adalah alat untuk membuat dan menjalankan **container** — lingkungan terisolasi yang berisi semua yang dibutuhkan aplikasi (kode, library, setting) agar bisa jalan konsisten di mana saja.

---

## Arsitektur yang Akan Dibuat

```
┌─────────────────────────────────────────────────────┐
│                   Docker Host │
│                                                      │
│  ┌──────────────────┐   ┌──────────────────┐        │
│  │ React Container │   │ Express Container│ │
│  │ (Frontend)      │   │ (Backend)         │        │
│  │  port: 5173      │   │ port: 3000        │        │
│  └────────┬─────────┘   └────────┬─────────┘        │
│           │                       │                   │
│           └──────────┬───────────┘                   │
│                      │                               │
│           ┌──────────▼──────────┐                   │
│           │  PostgreSQL Container│ │
│           │  port: 5432         │                   │
│           └─────────────────────┘                   │
│                                                      │
│              ┌──────────────────┐                  │
│              │  Docker Network │                  │
│              │  (bridge network) │ │
│              └──────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

---

## Langkah 1: Install Docker

### Mac

```bash
# Install Docker Desktop
brew install --cask docker

# Atau download dari https://docs.docker.com/desktop/install/mac-install/
```

### Windows

1. Download **Docker Desktop** dari https://docs.docker.com/desktop/install/windows-install/
2. Jalankan installer
3. Aktifkan **WSL 2** jika diminta (restart komputer)
4. Buka **Docker Desktop**

### Verifikasi

```bash
docker --version
docker compose version
```

---

## Langkah 2: Buat Dockerfile untuk Backend

Di folder `server/`, buat file `Dockerfile`:

```dockerfile
# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Stage 2: Production
FROM node:24-alpine

WORKDIR /app

# Copy package files dan install production dependencies saja
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "src/index.js"]
```

---

## Langkah 3: Buat Dockerfile untuk Frontend

Di folder `client/`, buat file `Dockerfile`:

```dockerfile
# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Buat nginx.conf

Di folder `client/`, buat file `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://server:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Langkah 4: Buat docker-compose.yml

Di folder `fullstack-app/` (root), buat file `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Database PostgreSQL
  db:
    image: postgres:16-alpine
    container_name: fullstack_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: fullstack_app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Backend Express
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: fullstack_server
    environment:
      PORT: 3000
      DB_HOST: db
      DB_PORT: 5432
      DB_NAME: fullstack_app
      DB_USER: postgres
      DB_PASSWORD: password123
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./server/src:/app/src

  # Frontend React (Development)
  client:
    build:
      context: ./client
      dockerfile: Dockerfile.dev
    container_name: fullstack_client
    environment:
      VITE_API_URL: http://localhost:3000/api
    ports:
      - "5173:5173"
    depends_on:
      - server
    volumes:
      - ./client/src:/app/src
      - ./client/package.json:/app/package.json

volumes:
  postgres_data:
```

### Dockerfile.dev untuk Frontend (Development Mode)

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

---

## Langkah 5: Jalankan dengan Docker Compose

```bash
# Masuk ke folder project
cd fullstack-app

# Build dan jalankan semua container
docker compose up -d

# Lihat logs
docker compose logs -f

# Lihat container yang jalan
docker compose ps

# Stop semua container
docker compose down

# Stop dan hapus volumes
docker compose down -v
```

---

## Langkah 6: Setup Database Awal

```bash
# Buka shell PostgreSQL container
docker exec -it fullstack_db psql -U postgres -d fullstack_app

# Di dalam psql, buat tabel:
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Insert sample data
INSERT INTO todos (text, done) VALUES
  ('Belajar Docker', false),
  ('Setup docker-compose', false),
  ('Deploy ke production', true);

# Keluar
\q
```

---

## Langkah 7: Akses Aplikasi

```
Frontend: http://localhost:5173
Backend:   http://localhost:3000
PostgreSQL: localhost:5432
```

---

## Konsep Docker yang Dipelajari

### Image vs Container
```
Image → Template read-only (blueprint)
Container → Instance yang jalan dari image
```

### Dockerfile Instructions
```dockerfile
FROM → Base image
WORKDIR       → Set working directory
COPY          → Copy file
RUN           → Jalankan perintah
EXPOSE        → Expose port
CMD           → Command saat container jalan
```

### Docker Compose
```yaml
services:     → Container yang akan dibuat
image:        → Image yang dipakai
build:        → Build dari Dockerfile
ports:        → Port mapping
environment:  → Environment variables
volumes:      → Mount folder
depends_on:   → Urutan start
```

### Network
```yaml
# Container bisa akses satu sama lain via nama service
# db → hostname: db
# server → bisa connect ke db:5432
```

---

## Ringkasan

```
Docker Steps:
1. docker build -t image-name .           → Build image
2. docker run -p 3000:3000 image-name    → Jalankan container
3. docker compose up -d                   → Jalankan semua service
4. docker compose logs -f                 → Lihat logs
5. docker compose down                    → Stop semua
```
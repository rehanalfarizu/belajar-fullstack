# 📦 Software 04 — Docker

## Apa itu Docker?

**Docker** = Platform untuk packaging aplikasi + environment-nya dalam **container**.

```
SEBELUM Docker (Works on My Machine):
┌─────────────────┐     ┌─────────────────┐
│ Komputer Saya   │     │ Server Produksi │
│ Node.js 22      │     │ Node.js 24      │
│ Python 3.12     │ ──→ │ Python 3.13     │
│ Redis 7         │     │ Redis 8         │
│ → ERROR!        │     │                 │
└─────────────────┘     └─────────────────┘

SESUDAH Docker:
┌─────────────────┐     ┌─────────────────┐
│ Laptop          │     │ Server          │
│ ┌─────────────┐ │     │ ┌─────────────┐ │
│ │ Container    │ │ ──→ │ │ Container   │ │
│ │ Node 24      │ │     │ │ Node 24     │ │
│ │ Python 3.13  │ │     │ │ Python 3.13 │ │
│ │ Redis 8      │ │     │ │ Redis 8     │ │
│ └─────────────┘ │     │ └─────────────┘ │
│ ✅ WORK!       │     │ ✅ WORK!       │
└─────────────────┘     └─────────────────┘
```

---

## 1. Install Docker Desktop

```bash
brew install --cask docker
```

### Atau download dari:
```
https://www.docker.com/products/docker-desktop/
```

### Verifikasi installasi:
```bash
docker --version
# Output: Docker version 24.x.x

docker compose version
# Output: Docker Compose version v2.x.x
```

---

## 2. Konsep Dasar Docker

### Image vs Container:

```
IMAGE      = Blueprint / Template (seperti class)
CONTAINER  = Running instance (seperti object)
```

```
docker build   → buat image dari Dockerfile
docker run     → buat container dari image
docker ps      → lihat container yang jalan
docker stop    → stop container
docker rm     → hapus container
```

### Registry (Docker Hub):

```
docker pull nginx          → download image dari Docker Hub
docker push my-app:v1      → upload image ke registry
```

---

## 3. Perintah Dasar Docker

### Images:

```bash
# Lihat semua image
docker images

# Pull image
docker pull nginx:latest

# Hapus image
docker rmi nginx:latest

# Build image dari Dockerfile
docker build -t my-app:1.0 .
```

### Containers:

```bash
# Lihat container yang jalan
docker ps

# Lihat SEMUA container (termasuk yang stop)
docker ps -a

# Jalankan container baru
docker run nginx
docker run -d nginx                      # -d = detach (background)
docker run -p 8080:80 nginx             # -p = port mapping
docker run --name my-nginx nginx         # --name = nama container

# Interactive container
docker run -it ubuntu bash               # -i = interactive, -t = terminal

# Stop / Start container
docker stop my-nginx
docker start my-nginx

# Hapus container
docker rm my-nginx
docker rm $(docker ps -aq)              # hapus semua container
```

### Logs & Exec:

```bash
# Lihat log container
docker logs my-nginx
docker logs -f my-nginx                  # follow (real-time)

# Masuk ke container yang jalan
docker exec -it my-nginx bash

# Copy file dari/ke container
docker cp file.txt my-nginx:/app/
docker cp my-nginx:/app/file.txt ./
```

---

## 4. Dockerfile

Dockerfile = instruksi untuk build image.

```dockerfile
# syntax=docker/dockerfile:1

# Base image
FROM node:24-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Environment variable
ENV NODE_ENV=production

# Start command
CMD ["node", "index.js"]
```

### Build image dari Dockerfile:

```bash
docker build -t my-app:1.0 .
docker build -t my-app:1.0 -f Dockerfile.prod .
```

### Penjelasan instruksi:

```
FROM        → Base image (seperti import)
RUN         → Eksekusi perintah (install, setup)
COPY        → Copy file dari host ke image
WORKDIR     → Set working directory
EXPOSE      → Port yang digunakan
ENV         → Environment variable
CMD         → Perintah default saat container jalan
ENTRYPOINT  → Perintah yang TIDAK bisa di-override
```

---

## 5. Docker Compose

docker-compose.yml = definisi multi-container (app + db + redis, dll).

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    volumes:
      - ./src:/app/src
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
```

### Perintah Docker Compose:

```bash
# Jalankan semua service
docker compose up -d

# Lihat log semua service
docker compose logs -f

# Stop semua service
docker compose down

# Rebuild + up
docker compose up --build -d

# Lihat status service
docker compose ps

# Exec command di service
docker compose exec web npm run dev

# Scale service
docker compose up -d --scale web=3
```

---

## 6. Docker Network

```bash
# Lihat network
docker network ls

# Buat network
docker network create my-network

# Connect container ke network
docker network connect my-network my-nginx

# Inspect network
docker network inspect my-network
```

### Bridge Network (default):

```yaml
# Dalam docker-compose.yml
services:
  web:
    networks:
      - my-network
  db:
    networks:
      - my-network

networks:
  my-network:
    driver: bridge
```

---

## 7. Docker Volume (Persist Data)

```bash
# Lihat volume
docker volume ls

# Buat volume
docker volume create my-data

# Inspect volume
docker volume inspect my-data
```

### Volume di docker-compose.yml:

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## 8. Multi-stage Build (Optimasi Ukuran)

```dockerfile
# Stage 1: Build
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

---

## 9. .dockerignore

File yang tidak perlu di-copy ke image:

```
node_modules/
.git/
.env
*.log
dist/
coverage/
.DS_Store
```

---

## 10. Dev Workflow dengan Docker

### Development:

```bash
# Run database + redis
docker compose up -d db redis

# Jalankan app dengan volume (live reload)
docker run -v $(pwd):/app -p 3000:3000 my-app
```

### Production:

```bash
# Build + run
docker compose -f docker-compose.prod.yml up --build -d

# Health check
docker compose ps
curl http://localhost:3000/health
```

---

## 11. Troubleshooting

### Error: "Cannot connect to the Docker daemon"

```bash
# Pastikan Docker Desktop berjalan
open -a Docker

# Cek daemon
docker info

# Kalau pakai Linux, start daemon:
sudo systemctl start docker
```

### Error: "Port already in use"

```bash
# Cek port yang dipakai
lsof -i :3000

# Kill process yang pakai port
kill -9 <PID>

# Atau pakai port berbeda
docker run -p 3001:3000 my-app
```

### Container tidak mau start:

```bash
# Lihat log
docker logs <container-name>

# Inspect container
docker inspect <container-name>

# Exec ke container
docker run -it <image> sh
```

### Hapus semua (clean up):

```bash
# Hapus semua container
docker compose down

# Hapus semua image
docker rmi $(docker images -q)

# Hapus semua volume
docker volume prune

# Clean up sistem
docker system prune -a
```

---

## Checklist

```
✅ docker --version → 24.x.x
✅ docker compose version → v2.x.x
✅ docker run hello-world → berhasil
✅ docker ps → lihat container
✅ Bisa buat Dockerfile sederhana
✅ Bisa buat docker-compose.yml
✅ Paham perbedaan image vs container
✅ Paham multi-stage build
```

---

**Next:**
- Lanjut ke Software 05: PostgreSQL & pgAdmin
- Atau ke materi-praktikum/02-latihan-docker.md

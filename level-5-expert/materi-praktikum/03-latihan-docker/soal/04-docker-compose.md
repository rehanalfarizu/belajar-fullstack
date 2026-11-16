# SOAL 04 — Docker Compose untuk Fullstack App

> Orchestrasi multi-container dengan Docker Compose untuk arsitektur fullstack lengkap.

---

## Deskripsi Soal

Kamu diminta untuk membuat Docker Compose setup untuk fullstack e-commerce application dengan arsitektur berikut:

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                        │
│                    (Nginx — Port 80/443)                    │
└──────────────────────────┬────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
     ┌──────────────┐             ┌──────────────┐
     │   Frontend │             │   Backend    │
     │  (React/Vite)│             │  (Express.js)│
     │  Port 3000   │             │  Port 5000   │
     └──────────────┘             └──────┬───────┘
 │
                                  ┌──────▼───────┐
                                  │  PostgreSQL  │
                                  │  Port 5432   │
                                  └──────────────┘
```

Docker Compose setup harus mendukung:
1. Development mode dengan hot reload
2. Production mode dengan optimized builds
3. Database persistence
4. Automatic dependency resolution (postgres ready sebelum backend start)
5. Health checks untuk semua services

---

## Teori Singkat

### docker-compose.yml Structure

```yaml
# (Compose v2: kunci `version:` sudah usang, tidak perlu ditulis)

services:
  service_name: # Container identifier (hostname)
    build:               # Build context atau Dockerfile path
    image:               # Pre-built image
    container_name:      # Override container name
    ports:               # Port mapping (host:container)
    environment:         # ENV variables
    volumes:             # Volume mounts
    depends_on:          # Start order
    networks:            # Network membership
    healthcheck:         # Health check configuration
    restart:             # Restart policy
    profiles:            # Start profile (dev/prod)

volumes: # Named volumes
networks:                # Custom networks
```

### depends_on vs healthcheck

```yaml
# depends_on: wait for container to start (not ready!)
services:
  backend:
    depends_on:
      - postgres # backend starts when postgres STARTS, not READY
```

Bandingkan dengan versi yang menunggu sampai service benar-benar sehat:

```yaml
# healthcheck: wait for service to be healthy
services:
  backend:
    depends_on:
      postgres:
        condition: service_healthy  # backend starts when postgres IS HEALTHY
```

### Profiles

```yaml
services:
  frontend:
    profiles: [dev]  # Only start with: docker compose --profile dev up
  adminer:
    profiles: [dev] # Only for development tools
```

---

## Checklist Pengerjaan

### Bagian A — Basic docker-compose.yml (20 menit)

**1. Define All Services**

```yaml
# TODO: Implementasikan
# code/04-docker-compose.yml
```

Minimal services:

| Service | Image/Build | Ports | Environment |
|---------|-------------|-------|-------------|
| nginx | `nginx:alpine` |80:80 | - |
| frontend | `./frontend` | 3000:3000 | VITE_API_URL |
| backend | `./backend` | 5000:5000 | DATABASE_URL |
| postgres | `postgres:15-alpine` | 5432:5432 | POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD |

**2. Networks**

```yaml
networks:
  app-network:
    driver: bridge
```

**3. Volumes**

```yaml
volumes:
  pgdata:
```

**4. Test Basic Setup**

```bash
# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Bagian B — Dependency Management (15 menit)

**1. Health Checks**

Tambahkan health check untuk PostgreSQL:

> **Tulis sendiri dulu.** Healthcheck apa yang cocok untuk PostgreSQL? Cari `pg_isready`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 1. Health Checks*.

**2. depends_on dengan condition**

```yaml
backend:
  depends_on:
    postgres:
      condition: service_healthy
```

**3. Backend Health Check**

> **Tulis sendiri dulu.** Healthcheck untuk backend: perintah, interval, timeout, retries, dan start_period apa yang masuk akal?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 3. Backend Health Check*.

**4. Verify Startup Order**

```bash
# Hapus semua container
docker compose down -v

# Start dan check logs
docker compose up -d
docker compose logs --timestamps | head -50

# Verifikasi: backend baru start setelah postgres healthy
# Check: docker compose ps
```

### Bagian C — Development vs Production (20 menit)

**1. Environment Files**

Buat file `.env.example`:

```bash
# .env.example
# Development variables
POSTGRES_DB=myapp_dev
POSTGRES_USER=admin
POSTGRES_PASSWORD=devpassword

# Production variables (di .env yang tidak di-commit)
POSTGRES_PASSWORD=realpassword
API_KEY=real-api-key
```

**2. Override File**

Buat `docker-compose.override.yml` untuk development:

> **Tulis sendiri dulu.** File override apa yang otomatis dibaca Compose untuk kebutuhan development (hot reload, mode debug)?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 2. Override File*.

**3. Profile untuk Development Tools**

> **Tulis sendiri dulu.** Bagaimana membuat service pendukung (misal adminer, mailhog) hanya jalan saat development? Cari `profiles`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 3. Profile untuk Development Tools*.

Start dengan development tools:
```bash
docker compose --profile dev up -d
```

**4. Production Build**

> **Tulis sendiri dulu.** Konfigurasi produksi: restart policy dan environment apa yang berbeda dari development?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 4. Production Build*.

### Bagian D — Nginx Reverse Proxy (15 menit)

**1. Nginx Configuration**

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

**2. Verify Proxy Routing**

```bash
docker compose up -d

# Test frontend
curl -I http://localhost/

# Test backend via nginx
curl -I http://localhost/api/health

# Test direct backend
curl -I http://localhost:5000/health
```

### Bagian E — Production Deployment (20 menit)

**1. Restart Policies**

> **Tulis sendiri dulu.** Apa saja pilihan `restart` di Compose, dan mana yang cocok untuk produksi?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 1. Restart Policies*.

**2. Resource Limits**

> **Tulis sendiri dulu.** Bagaimana membatasi CPU dan memori sebuah service? Cari `deploy.resources`.
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 2. Resource Limits*.

**3. Logging Configuration**

> **Tulis sendiri dulu.** Log container bisa membengkak. Opsi apa yang membatasi ukuran dan jumlah file log?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 3. Logging Configuration*.

**4. Security Hardening**

> **Tulis sendiri dulu.** Opsi hardening container apa yang bisa dipasang di Compose (`security_opt`, `read_only`, `tmpfs`)? Apa efek masing-masing?
> Kalau sudah buntu, contoh jawabannya ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian *04-docker-compose — 4. Security Hardening*.

**5. Complete Production Checklist**

| Item | Implementation | Verified |
|------|---------------|----------|
| Health checks semua service | `healthcheck` directive | [ ] |
| Restart policy | `restart: unless-stopped` | [ ] |
| Resource limits | `deploy.resources` | [ ] |
| Non-root user | `USER` di Dockerfile | [ ] |
| Secrets management | Runtime env/secrets | [ ] |
| Logging | `logging.driver` | [ ] |
| Network isolation | Custom network | [ ] |
| Read-only filesystem | `read_only: true` | [ ] |

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Basic docker-compose.yml (4 services) | 15% |
| Health checks& dependency management | 20% |
| Development profile & hot reload | 15% |
| Nginx reverse proxy | 15% |
| Production hardening | 20% |
| Full stack integration test | 15% |

---

## Reference

- [Docker Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Compose Spec](https://compose-spec.io/)
- [Docker Compose in Production](https://docs.docker.com/compose/production/)
- [Nginx as Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

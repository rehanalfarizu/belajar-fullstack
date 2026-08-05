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
version: "3.9"  # Docker Compose file format version

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

```yaml
postgres:
  image: postgres:15-alpine
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
    interval: 5s
    timeout: 5s
    retries: 5
    start_period: 10s
```

**2. depends_on dengan condition**

```yaml
backend:
  depends_on:
    postgres:
      condition: service_healthy
```

**3. Backend Health Check**

```yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
    interval: 10s
    timeout: 5s
    retries: 3
    start_period: 15s
```

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

```yaml
# docker-compose.override.yml (auto-loaded)
version: "3.9"

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
```

**3. Profile untuk Development Tools**

```yaml
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
```

Start dengan development tools:
```bash
docker compose --profile dev up -d
```

**4. Production Build**

```yaml
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
```

### Bagian D — Nginx Reverse Proxy (15 menit)

**1. Nginx Configuration**

```nginx
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
```

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

```yaml
services:
  frontend:
    restart: unless-stopped
  backend:
    restart: unless-stopped
  postgres:
    restart: unless-stopped
```

**2. Resource Limits**

```yaml
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
```

**3. Logging Configuration**

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**4. Security Hardening**

```yaml
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
```

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

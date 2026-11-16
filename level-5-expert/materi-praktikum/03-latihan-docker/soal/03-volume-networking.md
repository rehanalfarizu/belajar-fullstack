# SOAL 03 — Volume, Networking, dan Environment Variables

> Memahami Docker networking, volume mounting, dan environment variable management.

---

## Deskripsi Soal

Kamu perlu mengkonfigurasi environment Docker untuk development workflow yang melibatkan:
- Frontend React app (port 3000)
- Backend Express API (port 5000)
- PostgreSQL database (port 5432)

Tugas kamu adalah memahami dan mengkonfigurasi networking antar container, volume untuk persistence, dan environment variables untuk konfigurasi yang aman.

---

## Teori Singkat

### Docker Networking

```
┌─────────────────────────────────────────────────────────────┐
│ Docker Network                          │
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   frontend │──────│ nginx     │──────┐            │
│  │  (bridge)    │      │   (bridge)   │      │            │
│  │172.17.0.2 │      │  172.17.0.3  │      │            │
│  └──────────────┘      └──────────────┘      │            │
│         │                     │               │            │
│         │ ┌──────▼──────┐        │            │
│         │              │   backend   │◀───────┘            │
│         │              │  (bridge)   │                      │
│         │              │ 172.17.0.4 │                      │
│         │              └──────┬──────┘                      │
│         │                     │                             │
│         │ ┌──────▼──────┐                     │
│         └─────────────▶│  postgres │                     │
│                        │  (bridge)   │                     │
│                        │  172.17.0.5 │                     │
│                        └─────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

**Network Types:**
- `bridge` — default, untuk single host
- `host` — langsung ke host network (no isolation)
- `overlay` — untuk Docker Swarm
- `none` — no networking

### Docker DNS

Container dalam Docker network bisa reach satu sama lain dengan **container name sebagai hostname**:

```bash
# Dari container frontend, kamu bisa akses:
curl http://backend:5000/api/health
# Tidak perlu IP address!
```

### Volume Types

| Type | Use Case | Persistence | Performance |
|------|----------|-------------|-------------|
| Anonymous | Temporary data | Lost when container removed | Best |
| Named | Persistent data | Survives container restart | Good |
| Bind Mount | Development (hot reload) | Host filesystem | Best |
| tmpfs | Secrets, sensitive data | Lost on restart | Best |

---

## Checklist Pengerjaan

### Bagian A — Docker Networking (20 menit)

**1. Create Custom Network**

```bash
# Buat network untuk aplikasi
docker network create --driver bridge app-network

# Verifikasi
docker network ls
docker network inspect app-network
```

**2. Connect Containers to Network**

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

**3. Internal vs External Access**

Demonstrasikan:
- Backend bisa akses postgres dengan hostname `postgres`
- Frontend di host machine akses backend dengan `localhost:5000`
- Database TIDAK bisa diakses dari host machine secara langsung (security)

### Bagian B — Volume Management (20 menit)

**1. Named Volume untuk Database**

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

**2. Bind Mount untuk Development**

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

**3. tmpfs untuk Sensitive Data**

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

**4. Volume Backup& Restore**

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

### Bagian C — Environment Variables (20 menit)

**1. ENV vs ARG vs .env**

| Type | Build Time | Runtime | Secure | Use Case |
|------|-----------|---------|--------|----------|
| `ARG` | Yes | No | No | Build flags, version numbers |
| `ENV` | Yes | Yes | No | Defaults, non-sensitive config |
| `.env` file | No | Yes | Some | Development config |
| Docker Secrets | No | Yes | Yes | Passwords, API keys |

**2. ENV in Dockerfile**

```dockerfile
# ENV di Dockerfile — baked into image (perlu rebuild untuk change)
ENV NODE_ENV=production
ENV PORT=5000

# Bisa di-override saat runtime
# docker run -e PORT=8080 myapp:1.0
```

**3. Environment File (.env)**

```bash
# .env file
DATABASE_URL=postgresql://admin:secret@localhost:5432/myapp
API_KEY=your-api-key-here
LOG_LEVEL=info

# Load dengan --env-file
docker run --env-file .env my-backend:1.0
```

**4. Security: Secrets vs ENV**

Demonstrasikan security concern:

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

**5. Production Environment Checklist**

Buat checklist untuk production deployment:

| Item | Implementation | Security Level |
|------|---------------|----------------|
| No hardcoded secrets in image | Use runtime ENV | High |
| .env file tidak di-commit | .gitignore | High |
| Secrets tidak visible di inspect | tmpfs/docker secrets | Critical |
| Default credentials changed | ENV override | High |
| Debug mode disabled | ENV NODE_ENV=production | High |

### Bagian D — Docker Compose Integration (15 menit)

**1. Convert CLI ke docker-compose.yml**

Dari semua command di atas, buat `docker-compose.yml`:

```yaml
# TODO: Implementasikan di soal 04
# code/04-docker-compose.yml
```

**2. Test dengan docker-compose**

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

**3. Volume dalam docker-compose**

```yaml
volumes:
  pgdata:
    driver: local
services:
  postgres:
    volumes:
      - pgdata:/var/lib/postgresql/data
```

### Bagian E — Troubleshooting (20 menit)

**1. Network Issues**

Simulasikan dan debug masalah:

**Issue 1: "Could not resolve host"**
```bash
# Cause: Container tidak di network yang sama
docker run --rm postgres:15-alpine psql -h backend -U admin
# Error: could not translate host name "backend" to address

# Solution: Connect ke network yang benar
docker network connect app-network container_id
docker network disconnect wrong-network container_id
```

**Issue 2: "Connection refused"**
```bash
# Cause: Port mismatch atau service belum ready
# Check: Apakah service listen di port yang benar?
docker exec backend netstat -tlnp
# Check: Apakah service sudah started?
docker compose logs backend | grep "listening"
```

**2. Volume Issues**

**Issue: "Permission denied"**
```bash
# Cause: File ownership mismatch
docker exec postgres ls -la /var/lib/postgresql/data
# Solution: Set ownership
docker run --rm -v pgdata:/data alpine chown -R postgres:postgres /data
```

**Issue: "Volume mount failed"**
```bash
# Cause: Path tidak ada atau permission
docker run -v /nonexistent/path:/data alpine  # Error!
# Solution: Buat path atau gunakan named volume
```

**3. ENV Issues**

**Issue: "Variable not set"**
```bash
# Debug: Check environment variables
docker exec container_id env | grep YOUR_VAR

# Check: Apakah ENV di Dockerfile sudah di-set?
docker inspect container_id --format='{{json .Config.Env}}'
```

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Docker networking setup | 20% |
| Volume management (named, bind, tmpfs) | 25% |
| Environment variable security | 20% |
| docker-compose conversion | 15% |
| Troubleshooting capabilities | 20% |

---

## Reference

- [Docker Networking](https://docs.docker.com/network/)
- [Docker Volumes](https://docs.docker.com/storage/volumes/)
- [Dockerfile ENV vs ARG](https://docs.docker.com/engine/reference/builder/#env)
- [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/)
- [ Twelve-Factor App](https://12factor.net/config)

# SOAL 01 — Dockerfile Fundamentals

> Menulis Dockerfile production-ready untuk aplikasi Node.js.

---

## Deskripsi Soal

Tim DevOps meminta kamu untuk membuat Dockerfile untuk backend API yang baru selesai dikembangkan. Aplikasi ini adalah REST API Express.js yang connect ke PostgreSQL database. Aplikasi currently run dengan `node server.js` dan listen di port 5000.

Tugas kamu adalah membuat Dockerfile yang:
1. Berfungsi dengan benar di development
2. Produce image yang kecil (~200MB atau kurang)
3. Mengikuti best practices keamanan
4. Bisa di-build dengan `docker build`

---

## Teori Singkat

### Dockerfile Instructions

```dockerfile
# Syntax: INSTRUCTION arguments

FROM # Base image
RUN           # Execute command during build
COPY          # Copy files from build context
ADD # Copy files (supports URLs and tar extraction)
WORKDIR       # Set working directory
ENV # Set environment variable
EXPOSE        # Document port
CMD # Default command (can be overridden)
ENTRYPOINT    # Fixed entry point
ARG # Build-time variable
LABEL         # Metadata
USER # Set user (for security)
```

### Build Context

Build context adalah direktori yang dikirim ke Docker daemon. Semua `COPY` dan `ADD` relatif terhadap build context.

```
docker build -t myapp:1.0 .
              ↑
 Build context (.)
```

**Best practice:** Buat `.dockerignore` untuk exclude file yang tidak perlu masuk image (node_modules, .git, *.log).

### Layer Caching

Docker cache setiap layer. Jika layer berubah, semua layer setelahnya harus rebuild. Urutan instruksi yang optimal:

1. `FROM` — base image
2. `ARG` / `LABEL` — metadata
3. `ENV` — environment variables
4. `RUN` — install dependencies (JANGAN invalidasi cache di sini dengan COPY package.json lalu RUN npm install)
5. `COPY` — copy source code
6. `EXPOSE` / `WORKDIR`
7. `CMD` / `ENTRYPOINT`

---

## Checklist Pengerjaan

### Bagian A — Basic Dockerfile (20 menit)

**1. Buat Dockerfile pertama**

Mulailah dengan Dockerfile paling sederhana:

```dockerfile
# TODO: Implementasikan
# code/01-Dockerfile
```

Verifikasi dengan:
```bash
docker build -t my-api:1.0 .
docker run -p 5000:5000 my-api:1.0
curl http://localhost:5000/health
```

**2. Identifikasi Masalah**

Setelah mencoba Dockerfile dasar, analisis:
- Apakah image size reasonable?
- Apakah ada warning security di `docker scan`?
- Apakah ada layers yang bisa di-cache?
- Apakah ada file yang tidak seharusnya ada di image?

### Bagian B — Optimization& Security (25 menit)

**1. Non-root User**

Docker container berjalan sebagai root secara default — ini adalah security risk.

```dockerfile
# Tambahkan user non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodeapp -u 1001

# Gunakan user tersebut
USER nodeapp
```

Tugas: Modifikasi Dockerfile untuk:
- Buat user `nodeapp` dengan UID 1001
- Copy file sebagai root, tapi jalankan sebagai non-root
- Pastikan application tetap bisa write ke directories yang diperlukan

**2. Health Check**

Tambahkan HEALTHCHECK instruction:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1
```

Verifikasi:
```bash
docker inspect --format='{{.State.Health.Status}}' container_id
```

**3. Security Best Practices Checklist**

Untuk setiap item, implementasikan di Dockerfile:

| Best Practice | Implementation | Status |
|-------------|---------------|--------|
| Use specific tag, not `latest` | `node:24-alpine` | ✅ |
| No root user | `USER nodeapp` | ✅ |
| No secrets in ENV | Use runtime secrets | ✅ |
| Multi-stage build | Separate build/run stages | ❓ |
| Minimal base image | `alpine` vs `slim` vs `bookworm` | ❓ |
| Explicit ports | `EXPOSE 5000` | ✅ |
| Labels for maintainability | `LABEL maintainer` | ❓ |

### Bagian C — Layer Caching Strategy (15 menit)

**1. Dependency Layer Optimization**

Docker cache layer berdasarkan instruksi yang persis sama. Jika `package.json` tidak berubah, layer `npm install` tidak perlu re-run.

Desain Dockerfile yang optimal:

```dockerfile
# Layer 1: Copy package files FIRST
COPY package*.json ./

# Layer 2: Install dependencies (cached if package.json unchanged)
RUN npm ci --only=production

# Layer 3: Copy source code (changed frequently)
COPY . .

# Layer 4: Non-root setup
RUN adduser ...
```

Pertanyaan:
- Mengapa `COPY package*.json` dipisah dari `COPY . .`?
- Apa yang terjadi jika package.json berubah tapi source code tidak?
- Apa yang terjadi jika source code berubah tapi package.json tidak?

**2. Verify Caching**

```bash
# Build pertama
docker build -t my-api:1.0 .  # → 45 detik

# Build kedua (cache hit)
docker build -t my-api:1.0 .  # → 3 detik

# Touch package.json
touch package.json
docker build -t my-api:1.0 .  # → 44 detik (cache invalidated)

# Touch server.js
touch server.js
docker build -t my-api:1.0 .  # → 5 detik (package layer cached)
```

Dokumentasikan hasil timing untuk setiap scenario.

### Bagian D — Multi-Stage Build (20 menit)

**1. Setup Multi-Stage Dockerfile**

Untuk Node.js apps, multi-stage build memisahkan build stage dari production stage:

```dockerfile
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
```

Tugas: Modifikasi `code/02-Dockerfile` untuk multi-stage build.

**2. Analyze Image Size**

Ukur dan bandingkan:

| Dockerfile | Strategy | Image Size | Build Time |
|-----------|----------|-----------|------------|
| Single-stage | Semua di satu stage | ? | ? |
| Multi-stage | Build terpisah | ? | ? |
| Alpine only | `node:24-alpine` | ? | ? |

### Bagian E — .dockerignore (10 menit)

**1. Buat .dockerignore**

```dockerignore
# TODO: Implementasikan
# code/03-dockerignore
```

Tentukan file/folder yang harus di-exclude:

| Pattern | Reason |
|---------|--------|
| `node_modules` | Sudah di-install saat build |
| `.git` | Tidak perlu di image |
| `*.log` | Log files tidak perlu |
| `.env*` | Environment files (secrets) |
| `*.md` | Documentation files |
| `coverage/` | Test coverage reports |
| `dist/` (build stage) | Generated, will be rebuilt |

Verifikasi efek `.dockerignore`:
```bash
# Check build context size
docker build --no-cache -t my-api:1.0 . 2>&1 | grep "Sending build context"
```

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Dockerfile yang bisa di-build dan run | 20% |
| Image size optimization | 15% |
| Security best practices (non-root, no secrets) | 20% |
| Layer caching strategy | 20% |
| Multi-stage build implementation | 15% |
| .dockerignore completeness | 10% |

---

## Reference

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Dockerfile Security](https://github.com/docker/docker-bench-security)
- [node-alpine vs node-slim](https://blog.routinginfinity.org/node-alpine-vs-node-slim/)

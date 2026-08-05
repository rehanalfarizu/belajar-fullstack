# SOAL 02 — Multi-Stage Build untuk Frontend

> Membangun Docker image untuk React SPA dengan multi-stage build dan Nginx.

---

## Deskripsi Soal

Aplikasi frontend React kamu perlu di-containerize untuk production deployment. Kamu harus membuat multi-stage Dockerfile yang:
1. Build React app dengan Vite di stage pertama
2. Serve static files dengan Nginx di stage kedua
3. Image final< 50MB
4. Mendukung SPA routing (redirect ke index.html untuk routes)

---

## Teori Singkat

### Why Multi-Stage for Frontend?

```
┌────────────────────────────────────────────────────┐
│  Single Stage (BAD)                               │
│  FROM node:24                                     │
│  ├── Build tools (Vite, TypeScript, ESLint)       │
│  ├── Source code │
│  ├── node_modules (dev + prod) │
│  └── production image: ~1.2 GB                   │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│  Multi-Stage (GOOD)                               │
│  Stage 1: Build │
│  ├── Build tools + dependencies                   │
│  └── Output: dist/ folder │
│  Stage 2: Production │
│  ├── nginx:alpine (~50 MB)                        │
│  └── dist/ files                                  │
│  Final image: ~50 MB │
└────────────────────────────────────────────────────┘
```

### Nginx for SPA

Single Page Applications (React/Vue/Angular) menggunakan client-side routing. Artinya:

- Request ke `/dashboard` → server harus return `index.html`, bukan 404
- Nginx config harus menggunakan `try_files $uri $uri/ /index.html`

```nginx
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
```

---

## Checklist Pengerjaan

### Bagian A — Stage 1: Build Stage (15 menit)

**1. Setup Build Stage**

```dockerfile
# TODO: Implementasikan
# code/02-Dockerfile
```

Build stage harus:
- Install semua dependencies (termasuk devDependencies untuk build)
- Run `npm run build` atau `npm run build:staging`
- Output ke folder `dist/`

**2. Verify Build Stage**

```bash
docker build -t frontend-build:1.0 --target builder .
docker run --rm frontend-build:1.0 ls -la dist/
```

Pastikan `dist/` berisi:
- `index.html`
- `assets/` folder dengan compiled JS/CSS
- Static assets (gambar, fonts)

### Bagian B — Stage 2: Production Stage (15 menit)

**1. Nginx Configuration**

Buat `nginx.conf`:

```nginx
# TODO: Implementasikan konfigurasi nginx
# Include di Dockerfile: COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Konfigurasi harus:
- Listen di port 80
- Root di `/usr/share/nginx/html`
- SPA routing dengan `try_files`
- Gzip compression
- Cache headers untuk static assets
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

**2. Production Stage**

```dockerfile
# Production stage
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Bagian C — Image Size Analysis (15 menit)

**1. Breakdown per Layer**

```bash
docker history frontend:multi-stage
```

Analisis output:

| Layer | Size | Description |
|-------|------|-------------|
| abc123 | 50 MB | nginx:alpine base |
| def456 | 2 MB | Built assets |
| ghi789 | 0.5 KB | nginx.conf |

**2. Size Optimization Techniques**

Evaluasi setiap teknik:

| Technique | Before | After | Notes |
|-----------|--------|-------|-------|
| Multi-stage | ~1.2 GB | ? | |
| Alpine base | baseline | - | |
| Gzip compression | baseline | - | |
| Remove sourcemaps | baseline | - | |
| Remove unused i18n | baseline | - | |

### Bagian D — SPA Routing Configuration (15 menit)

**1. Test SPA Routes**

Jalankan container dan test routes:

```bash
docker run -p 8080:80 frontend:1.0
```

Test dengan curl:

```bash
# Root path
curl -I http://localhost:8080/          # → 200 OK

# Known route
curl -I http://localhost:8080/dashboard # → 200 OK (bukan 404!)

# Static asset
curl -I http://localhost:8080/assets/main.js  # → 200 OK

# Non-existent route
curl -I http://localhost:8080/nonexistent-route # → 200 OK (index.html)
```

**2. Verify Nginx Config**

Pertanyaan:
- Apa yang terjadi jika `try_files` tidak dikonfigurasi?
- Mengapa SPA routes perlu fallback ke `index.html`?
- Apa perbedaan `try_files $uri $uri/ /index.html` dan `try_files $uri =404`?

### Bagian E — Security& Production Hardening (20 menit)

**1. Security Headers**

Tambahkan security headers di nginx.conf:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

**2. Rate Limiting**

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20;
```

**3. Content Security Policy (CSP)**

Untuk React app, CSP harus allow inline styles dan scripts (karena React build menghasilkan inline styles):

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.example.com;" always;
```

**4. Scan for Vulnerabilities**

```bash
# Install docker scan
docker scan frontend:1.0

# Check for critical vulnerabilities
docker scan frontend:1.0 --severity high
```

Dokumentasikan semua vulnerabilities yang ditemukan dan cara mitigasinya.

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Build stage yang berfungsi |15% |
| Production stage dengan Nginx | 15% |
| Image size < 50MB | 15% |
| SPA routing yang berfungsi | 15% |
| Security headers& hardening | 20% |
| Security scan analysis | 10% |
| Dokumentasi konfigurasi | 10% |

---

## Reference

- [Dockerfile Multi-Stage](https://docs.docker.com/build/building/multi-stage/)
- [Nginx for SPA](https://www.nginx.com/blog/deploying-wordpress-with-docker-compose-and-nginx/)
- [Nginx Security Headers](https://www.keycdn.com/blog/nginx-security-headers)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)

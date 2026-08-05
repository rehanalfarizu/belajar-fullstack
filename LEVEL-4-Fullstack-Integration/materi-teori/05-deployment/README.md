# 📘 MATERI TEORI 05 — Deployment

## 1. Build & Serve App

### Frontend (React/Vite)

```bash
# Development
npm run dev

# Production build
npm run build    # output: dist/

# Preview production build (local)
npm run preview

# Serve static files
npx serve dist
```

### Backend (Node/Express)

```bash
# Development
npm run dev  # nodemon index.js

# Production
NODE_ENV=production node index.js

# PM2 — process manager (production)
npm install -g pm2
pm2 start index.js --name "my-api"
pm2 list
pm2 logs my-api
pm2 restart my-api
pm2 delete my-api

# Forever — alternatif PM2
npm install -g forever
forever start index.js
forever stop index.js
```

---

## 2. Environment Variables

```bash
# .env (JANGAN COMMIT ke git!)
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://user:pass@host:5432/db
JWT_SECRET=rahasia-sangat-panjang-dan-aman
API_URL=https://api.myapp.com
CLIENT_URL=https://myapp.com
```

```javascript
// app.js
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Akses
process.env.JWT_SECRET
process.env.DATABASE_URL
```

```bash
# .gitignore
.env
.env.local
.env.production
node_modules/
```

---

## 3. Deploy Backend (Render)

[Render](https://render.com) = cloud hosting yang bagus untuk Node.js (persistent + background workers).

```yaml
# render.yaml (opsional — Infrastructure as Code)
services:
  - type: web
    name: my-api
    env: node
    region: singapore
    buildCommand: npm install
    startCommand: node src/index.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
```

Atau manual di dashboard:
```
1. Create Web Service
2. Connect GitHub repo
3. Region: Singapore
4. Root Directory: /
5. Build Command: npm install
6. Start Command: node src/index.js
7. Environment: Node
8. Add Environment Variables (dari .env)
```

---

## 4. Deploy Frontend (Vercel)

```bash
npm install -g vercel
cd my-frontend-app
vercel login
vercel deploy
```

Atau via [vercel.com](https://vercel.com):
```
1. Import GitHub repo
2. Framework: Vite (detect otomatis)
3. Root Directory: . atau src/
4. Build Command: npm run build
5. Output Directory: dist
6. Environment Variables:
   - VITE_API_URL = https://my-api.onrender.com
```

```javascript
// vite.config.js — base URL untuk production
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false  // production: matikan sourcemap
  }
});
```

---

## 5. Deploy Frontend (Netlify)

```
1. Connect GitHub repo
2. Build command: npm run build
3. Publish directory: dist
4. Environment Variables: VITE_API_URL=...
5. Site settings → Domain management
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 6. Database Hosting

### PostgreSQL (Neon / Supabase / Render)

```bash
# Neon — serverless Postgres
# https://neon.tech
# Buat project → salin connection string

DATABASE_URL=postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

```javascript
// src/config/database.js
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default pool;
```

### MongoDB (MongoDB Atlas)

```bash
# Atlas — cloud MongoDB
# https://www.mongodb.com/atlas
# Buat cluster → Network Access → IP whitelist 0.0.0.0/0
# Database → Connect → salin connection string

MONGODB_URI=mongodb+srv://user:password@cluster0.mongodb.net/myapp?retryWrites=true&w=majority
```

---

## 7. Reverse Proxy (Nginx)

```nginx
# /etc/nginx/sites-available/myapp

server {
    listen 80;
    server_name myapp.com;

    # Frontend (static files)
    location / {
        root /var/www/myapp/dist;
        try_files $uri $uri/ /index.html;
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Reload nginx
sudo nginx -t
sudo systemctl reload nginx

# SSL (Let's Encrypt)
sudo certbot --nginx -d myapp.com
```

---

## 8. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

## Ringkasan

```
Deployment
├── Build        → npm run build (frontend), NODE_ENV=production node (backend)
├── Env          → .env, process.env, jangan commit ke git
├── Backend      → Render (Node.js), Railway, DigitalOcean App
├── Frontend     → Vercel, Netlify (otomatis detect Vite/Next.js)
├── Database    → Neon (Postgres), Atlas (MongoDB)
├── Nginx       → reverse proxy, SSL, static file serving
└── CI/CD       → GitHub Actions, deploy otomatis dari branch main
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-deployment/`
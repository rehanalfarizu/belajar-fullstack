# SOAL 02 — Deploy Backend ke Railway/Render

## Tujuan
Mendeploy Express API ke Railway (atau Render), mengkonfigurasi environment variables, dan menghubungkan dengan frontend yang sudah di-deploy.

---

## Studi Kasus

```
Frontend (Vercel):  https://my-app.vercel.app
Backend (Railway): https://my-api.railway.app  (contoh)

Flow:
React (Vercel) → API calls → Express API (Railway)
```

---

## Prasyarat
- [ ] Akun Railway (railway.app) atau Render
- [ ] Repository GitHub dengan Express server
- [ ] Database sudah di-setup (PostgreSQL)

---

## Tugas

### Soal 2A — Persiapan Backend
Jawab pertanyaan berikut:

```bash
# 1. Perubahan apa yang diperlukan di server code sebelum deployment?
#    - Port handling (process.env.PORT)
#    - CORS configuration
#    - Database connection string
# Jawaban:

# 2. Apa yang harus ada di package.json scripts untuk Railway/Render?
#    (minimal: start script)
# Jawaban:

# 3. Kapan perlu menggunakan `npm start` vs `node server.js`?
# Jawaban:
```

### Soal 2B — Konfigurasi Railway
Lihat file `code/02-railway-render-deploy.js`. Buat checklist dan konfigurasi:

```javascript
// ============================================
// RAILWAY DEPLOYMENT CHECKLIST
// ============================================

// TODO 1: package.json adjustments
// - Pastikan "scripts": { "start": "node server.js" }
// - Pastikan "engines": { "node": ">=22.18" }

// TODO 2: Server code adjustments
// - Ganti hardcoded PORT ke: const PORT = process.env.PORT || 3001
// - Ganti hardcoded DB URL ke: process.env.DATABASE_URL
// - Ganti hardcoded JWT secret ke: process.env.JWT_SECRET

// TODO 3: CORS configuration
// - Update allowedOrigins untuk include:
//   - http://localhost:5173 (dev)
//   - https://my-app.vercel.app (production Vercel)

// TODO 4: Health check endpoint
// - GET /api/health
// - Return: { status: "ok", timestamp, uptime }

// TODO 5: Environment variables di Railway dashboard
// - DATABASE_URL (auto dari PostgreSQL plugin)
// - JWT_SECRET (generate random string)
// - NODE_ENV=production

// ============================================
// RENDER DEPLOYMENT ALTERNATIVES
// ============================================

// Jika menggunakan Render (render.com):
// TODO 6: render.yaml atau manual setup
// - Build command: npm install && npm run build
// - Start command: npm start
// - Environment variables diset di dashboard

// ============================================
// CONNECTING FRONTEND TO BACKEND
// ============================================

// TODO 7: Update frontend API base URL
// - Development: http://localhost:3001/api
// - Production: https://my-api.railway.app/api
// - Gunakan environment variable:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// TODO 8: CORS whitelist update (di backend)
const allowedOrigins = [
  'http://localhost:5173',
  'https://my-app.vercel.app',  // Ganti dengan URL Vercel Anda
];

module.exports = { /* export config */ };
```

### Soal 2C — Testing Production API

```bash
# 1. Bagaimana cara test API production?
#    Alat apa yang digunakan?

# 2. Jika API error di production, di mana melihat logs?
#    - Railway: ?
#    - Render: ?

# 3. Perbedaan antara Railway vs Render untuk Node.js deployment:
#    - Railway: ?
#    - Render: ?
```

### Soal 2D — Deployment Diagram

```
┌────────────────────────────────────────────────────────────┐
│                  ARCHITECTURE DEPLOYMENT                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│   ┌──────────────┐        ┌──────────────────────────┐   │
│   │  GitHub Repo │───────→│  Vercel (Frontend)        │   │
│   │              │        │  URL: my-app.vercel.app   │   │
│   │  (monorepo   │        │  Build: npm run build     │   │
│   │   atau 2     │        └──────────────┬───────────┘   │
│   │   repos)     │                       │               │
│   │              │        ┌──────────────┴───────────┐   │
│   │              │───────→│  Railway (Backend)        │   │
│   │              │        │  URL: my-api.railway.app  │   │
│   │              │        │  Runtime: Node.js         │   │
│   │              │        └──────────────┬───────────┘   │
│   │              │                       │               │
│   │              │        ┌──────────────┴───────────┐   │
│   │              │───────→│  Railway DB (PostgreSQL)  │   │
│   │              │        └───────────────────────────┘   │
│   └──────────────┘                                       │
│                                                            │
│   CORS: Vercel → Railway (allow)                         │
│   API calls: React → Railway (axios baseURL)            │
└────────────────────────────────────────────────────────────┘
```

---

## Kriteria Penilaian
- [ ] Backend ter-deploy dan accessible via production URL
- [ ] Environment variables dikonfigurasi dengan benar (tidak hardcoded)
- [ ] CORS whitelist sudah include URL Vercel
- [ ] Health check endpoint berfungsi
- [ ] Frontend di Vercel bisa fetch data dari backend di Railway

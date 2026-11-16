# SOAL 04 — Environment Variables

## Tujuan
Memahami dan mengimplementasikan environment variables dengan benar di development dan production, menggunakan dotenv di local dan Vercel/Railway dashboard di cloud.

---

## Teori Singkat

**Environment Variables Flow:**

```
Development (local):
.env file → dotenv → process.env → code

Production (Vercel):
Dashboard → injected → process.env → code

Production (Railway):
Dashboard → injected → process.env → code
```

**Important: .env files should NEVER be committed to git.**

---

## Studi Kasus

Aplikasi fullstack dengan variabel berikut:

```bash
# Backend (Express)
DATABASE_URL       = postgresql://...   # DB connection
JWT_SECRET         = super_secret_123   # JWT signing key
PORT               = 3001               # Server port
NODE_ENV           = production         # environment
FRONTEND_URL       = https://my-app.vercel.app  # untuk CORS

# Frontend (React/Vite)
VITE_API_URL       = https://my-api.railway.app # Backend URL
VITE_APP_NAME      = "My Fullstack App"
```

---

## Tugas

### Soal 4A — dotenv Setup di Backend
Lihat file `code/04-environment-vars.js`. Lengkapi:

```javascript
// ============================================
// PART 1: BACKEND (Express)
// ============================================

// TODO 1: Install dotenv
// npm install dotenv

// TODO 2: Create .env.example (TEMPLATE, tidak ada nilai asli)
// (tulis sendiri: isi .env.example dengan nama variabel saja, tanpa nilai asli)

// TODO 3: Load dotenv di entry point (server.js/app.js)
require('dotenv').config();

// TODO 4: Validate required env vars saat startup
// (tulis sendiri: fungsi validateEnv. Cek variabel wajib, hentikan proses kalau ada yang hilang,
//  dan beri peringatan kalau JWT_SECRET terlalu pendek)

// TODO 5: Generate secure JWT_SECRET
function generateSecret() {
  // crypto.randomBytes(64).toString('hex')
  // Ini untuk locally generate, bukan di production
}

// ============================================
// PART 2: FRONTEND (Vite + React)
// ============================================

// TODO 6: Vite environment variables
// Var env frontend HARUS prefixed dengan VITE_
// Contoh: VITE_API_URL, VITE_APP_NAME
//
// .env.local (local overrides):
// VITE_API_URL=http://localhost:3001/api
// VITE_APP_NAME="My App (Dev)"
//
// .env.production:
// VITE_API_URL=https://my-api.railway.app
// VITE_APP_NAME="My App"

// TODO 7: Access env di React
// import.meta.env.VITE_API_URL
// import.meta.env.VITE_APP_NAME

// TODO 8: API Base URL configuration
// (tulis sendiri: fungsi yang memberi URL API dari env Vite, dengan nilai cadangan)

// ============================================
// PART 3: VERCEL DEPLOYMENT SETUP
// ============================================

// TODO 9: Vercel Environment Variables di Dashboard
// Settings → Environment Variables
//
// Variables yang perlu di-set:
// - VITE_API_URL = https://my-api.railway.app
// - (CATATAN: tidak perlu set NODE_ENV, Vercel otomatis set production)

// TODO 10: Vercel Build Configuration
// vercel.json atau Build & Deploy Settings:
// Build Command: npm run build
// Output Directory: dist
// Install Command: npm install
//
// Environment: Production
// All env vars yang diperlukan akan di-inject otomatis

// ============================================
// PART 4: SECURITY NOTES
// ============================================

// CRITICAL SECURITY RULES:

// 1. Backend vars (JWT_SECRET, DATABASE_URL):
//    - JANGAN pernah prefix dengan VITE_
//    - Karena VITE_ vars akan expose ke browser
//    - Backend vars hanya ada di server, tidak di browser bundle

// 2. Frontend vars (VITE_API_URL):
//    - Hanya expose vars yang boleh PUBLIC
//    - Contoh: API URLs, public config
//    - Contoh BUKAN: secrets, passwords, DB credentials

// 3. Production secrets:
//    - Railway: set di Variables tab
//    - Vercel: set di Environment Variables
//    - Generate using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

module.exports = {
  envExample,
  validateEnv,
  getApiBaseUrl,
};
```

### Soal 4B — Security Questions

```bash
# 1. Apakah aman menggunakan VITE_JWT_SECRET di frontend?
#    Jelaskan risiko dan alternatives.
# Jawaban:

# 2. Apa yang terjadi jika JWT_SECRET di-commit ke GitHub?
#    Dan orang lain melihatnya di repository public?
# Jawaban:

# 3. Perbedaan antara .env, .env.local, .env.production di Vite:
#    - .env: loaded di SEMUA environment
#    - .env.local: loaded di development, ignored by git
#    - .env.production: loaded di production only
#    Kapan menggunakan masing-masing?
# Jawaban:

# 4. Jika menggunakan shared hosting (bukan Vercel), bagaimana mengelola env vars?
# Jawaban:
```

---

## Kriteria Penilaian
- [ ] `.env.example` dibuat sebagai template tanpa nilai asli
- [ ] dotenv di-load di entry point backend
- [ ] Required env vars di-validate saat startup
- [ ] Frontend vars menggunakan prefix `VITE_`
- [ ] Secrets (JWT_SECRET, DATABASE_URL) TIDAK di-expose ke browser
- [ ] Environment variables diset di dashboard Vercel/Railway
> **Catatan:** contoh jawaban untuk bagian yang bertanda "(tulis sendiri ...)" ada di [`solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md). Buka setelah punyamu jalan atau benar-benar buntu.

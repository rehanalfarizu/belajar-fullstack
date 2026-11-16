# Solusi — Latihan Deployment (JANGAN DIBUKA DULU)

> **Peringatan:** Buka SETELAH punyamu jalan atau benar-benar buntu. File ini
> berisi contoh jawaban yang dipindahkan dari soal. Kerjakan dulu sendiri,
> baru bandingkan. Cara yang beda tapi hasilnya benar itu tidak salah.


---

## 02-railway-render-deploy — TODO 7 — API base URL

````js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
````

---

## 02-railway-render-deploy — TODO 8 — whitelist CORS

````js
const allowedOrigins = [
  'http://localhost:5173',
  'https://my-app.vercel.app',  // Ganti dengan URL Vercel Anda
];
````

---

## 03-database-production — TODO 4 — Pool PostgreSQL

````js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: env === 'production' ? { rejectUnauthorized: false } : false,
});
````

---

## 04-environment-vars — TODO 2 — isi .env.example

````js
const envExample = `
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# JWT
JWT_SECRET=your-secret-key-here

# CORS
FRONTEND_URL=http://localhost:5173
`.trim();
````

---

## 04-environment-vars — TODO 4 — validateEnv

````js
function validateEnv() {
  const required = ['JWT_SECRET', 'DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(', ')}`);
    process.exit(1);
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET.length < 32) {
    console.warn('Warning: JWT_SECRET should be at least 32 characters');
  }
}
````

---

## 04-environment-vars — TODO 8 — getApiBaseUrl

````js
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:3001/api'; // fallback
};
````

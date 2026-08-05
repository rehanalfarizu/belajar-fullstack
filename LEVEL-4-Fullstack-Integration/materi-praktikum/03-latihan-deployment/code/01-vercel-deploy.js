// ============================================================
// 01 — VERCEL DEPLOY CONFIGURATION
// vercel.json and deployment checklist for React + Vite frontend
// ============================================================
// This file documents vercel.json configuration
// and serves as a checklist for Vercel deployment

// ============================================================
// TODO 1: Create vercel.json at project root
// ============================================================
/*
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend.railway.app/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
*/

// ============================================================
// TODO 2: package.json — ensure these are present
// ============================================================
/*
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
},
"engines": {
  "node": ">=18"
}
*/

// ============================================================
// TODO 3: vite.config.js — for SPA routing
// ============================================================
/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ensures proper base path for deployed app
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,  // Disable in production for smaller bundle
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',  // Dev proxy — not used in production
    },
  },
});
*/

// ============================================================
// TODO 4: Environment variables for frontend
// ============================================================
// Create .env.production (or set in Vercel dashboard):
/*
VITE_API_URL=https://your-backend.railway.app
VITE_APP_NAME="My Fullstack App"
*/

// CRITICAL: Variables starting with VITE_ are exposed to the browser bundle!
// DO NOT include secrets (JWT_SECRET, DATABASE_URL) with VITE_ prefix.
// They will be visible in the browser's source code.

// ============================================================
// TODO 5: Update API base URL in frontend code
// ============================================================
/*
// src/api/client.js — update baseURL
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
*/

// ============================================================
// TODO 6: Deployment checklist
// ============================================================
const deploymentChecklist = {
  beforePush: [
    'npm run build  # Verify build succeeds locally',
    'git add .gitignore  # Ensure node_modules and .env are ignored',
    'Check .gitignore contains: node_modules/, .env, dist/, .vercel/',
    'git commit -m "ready for deploy"',
    'git push origin main',
  ],
  inVercelDashboard: [
    'Go to vercel.com → New Project',
    'Import GitHub repository',
    'Framework Preset: Vite (or Other)',
    'Build Command: npm run build',
    'Output Directory: dist',
    'Environment Variables:',
    '  - VITE_API_URL = https://your-backend.railway.app',
    '  - NODE_ENV = production (Vercel sets this automatically)',
    'Click Deploy',
  ],
  afterDeploy: [
    'Copy Vercel URL (e.g., https://your-app.vercel.app)',
    'Add Vercel URL to backend CORS allowedOrigins',
    'Redeploy backend or restart Railway',
    'Test: Open Vercel URL, try login/register',
    'Test: Refresh page on sub-routes (/dashboard, /profile)',
    'Check browser console for CORS errors — fix if needed',
  ],
};

// ============================================================
// TODO 7: Troubleshooting
// ============================================================
const troubleshooting = {
  blankScreen: [
    'Check if VITE_API_URL points to correct backend URL',
    'Verify CORS allows Vercel domain in backend',
    'Check Network tab — are API calls succeeding?',
    'Check .env is not in build (use Vercel env vars dashboard)',
  ],
  routing404: [
    'vercel.json must have: { "src": "/(.*)", "dest": "/index.html" }',
    'This catches all routes and lets React Router handle them',
  ],
  buildFails: [
    'Check Node.js version matches engines field in package.json',
    'Run npm run build locally — fix errors first',
    'Check all imports resolve — no missing dependencies',
  ],
};

module.exports = { deploymentChecklist, troubleshooting };
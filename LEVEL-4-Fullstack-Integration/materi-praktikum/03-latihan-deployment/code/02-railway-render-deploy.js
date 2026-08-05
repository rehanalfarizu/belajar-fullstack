// ============================================================
// 02 — RAILWAY / RENDER DEPLOY CONFIGURATION
// Backend deployment to Railway + CORS + environment setup
// ============================================================
// This file is a documentation + code template for backend deployment
// Railway: railway.app | Render: render.com

// ============================================================
// TODO 1: package.json adjustments for Railway/Render
// ============================================================
/*
{
  "name": "my-backend-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",        // Railway/Render use this
    "dev": "nodemon server.js",        // Local development
    "build": "npm install"              // Not needed for Node, but safe
  },
  "engines": {
    "node": ">=18"
  }
}
*/

// ============================================================
// TODO 2: server.js — production-ready configuration
// ============================================================
/*
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;  // Railway/Render sets PORT

// CORS — allow both localhost (dev) and Vercel (production)
const allowedOrigins = [
  'http://localhost:5173',           // Vite dev
  'http://localhost:3000',           // React dev alternative
  'https://your-app.vercel.app',    // Production Vercel
  'https://*.vercel.app',           // All Vercel preview deployments
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,  // Allow cookies/auth headers
}));

app.use(helmet());        // Security headers
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

// ============================================================
// TODO 3: Environment variables — Railway dashboard
// ============================================================
const railwayEnvVars = {
  // Set in Railway dashboard → Variables tab
  required: {
    DATABASE_URL: 'postgresql://user:password@host:5432/dbname',
    JWT_SECRET: 'generate-with-openssl-rand-hex-32',
    NODE_ENV: 'production',
  },
  optional: {
    PORT: '3001',              // Railway auto-sets this
    FRONTEND_URL: 'https://your-app.vercel.app',
  },
};

// Generate strong JWT_SECRET:
// Mac/Linux: openssl rand -hex 32
// Node: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

// ============================================================
// TODO 4: Railway deployment steps
// ============================================================
const railwaySteps = [
  '1. Go to railway.app → New Project → Deploy from GitHub repo',
  '2. Select repository containing server code',
  '3. Railway auto-detects Node.js — set start command: npm start',
  '4. Add PostgreSQL plugin: railway project → New → Database → PostgreSQL',
  '5. Set environment variables in Variables tab',
  '6. Railway auto-provides DATABASE_URL from PostgreSQL plugin',
  '7. Click Deploy — wait for build to complete',
  '8. Copy deployment URL (https://your-app.up.railway.app)',
];

// ============================================================
// TODO 5: CORS update after getting deployment URL
// ============================================================
/*
// Update allowedOrigins with your Railway URL:
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://your-app.vercel.app',
//   'https://your-backend.up.railway.app',   // Add this
// ];
*/

// ============================================================
// TODO 6: Render deployment alternative
// ============================================================
const renderConfig = {
  // render.yaml (or manual dashboard setup):
  /*
  services:
    - type: web
      name: my-backend
      env: node
      buildCommand: npm install
      startCommand: npm start
      plan: free
      envVars:
        - key: DATABASE_URL
          sync: false   # Set in Render dashboard
        - key: JWT_SECRET
          generateValue: true  # Render generates random value
        - key: NODE_ENV
          value: production
  */
};

// ============================================================
// TODO 7: Connecting frontend to deployed backend
// ============================================================
// After Railway deployment, update Vercel env var:
// VITE_API_URL = https://your-backend.up.railway.app

// Or update .env.production in frontend:
/*
VITE_API_URL=https://your-backend.up.railway.app
*/

// ============================================================
// TODO 8: Health check verification
// ============================================================
/*
After deployment, test health endpoint:
curl https://your-backend.up.railway.app/api/health

Expected response:
{ "status": "ok", "timestamp": "2024-..." }

If this fails:
- Check Railway logs: railway project → deployment → logs
- Verify environment variables are set
- Check if server is listening on correct PORT
*/

module.exports = { railwayEnvVars, railwaySteps, renderConfig };
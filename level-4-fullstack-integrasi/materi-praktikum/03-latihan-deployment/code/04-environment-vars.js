// ============================================================
// 04 — ENVIRONMENT VARIABLES
// Backend + Frontend env var management, dotenv, security rules
// ============================================================

// ============================================================
// PART 1: BACKEND — dotenv setup
// ============================================================

// TODO 1: .env.example template (NEVER commit real values!)
const envExample = `
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
# Local: postgresql://postgres:password@localhost:5432/myapp
# Railway: auto-provided as DATABASE_URL
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Authentication
JWT_SECRET=your-super-secret-key-at-least-32-chars-long
JWT_EXPIRES_IN=7d

# CORS — URLs allowed to access this API
FRONTEND_URL=http://localhost:5173

# Optional: Email (for password reset, etc.)
EMAIL_HOST=smtp.example.com
EMAIL_USER=noreply@example.com
EMAIL_PASSWORD=your-email-password
`.trim();

// TODO 2: Validate required env vars at startup
/*
require('dotenv').config();

function validateEnv() {
  const required = ['JWT_SECRET', 'DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('[ERROR] Missing required environment variables:');
    missing.forEach(key => console.error(`  - ${key}`));
    console.error('\nSet these in:');
    console.error('  Development: .env file');
    console.error('  Production: Railway/Render dashboard → Variables');
    process.exit(1);
  }

  // Security check: JWT_SECRET must be strong enough
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('[WARN] JWT_SECRET should be at least 32 characters for security');
  }

  // Warn about NODE_ENV
  if (process.env.NODE_ENV === 'production') {
    console.log('[INFO] Running in PRODUCTION mode');
  }
}

validateEnv();
*/

// ============================================================
// PART 2: BACKEND — safe env access
// ============================================================

// TODO 3: Config object with defaults
/*
const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  db: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production',
  },
  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
};
*/

// ============================================================
// PART 3: BACKEND — generate secure JWT_SECRET
// ============================================================

// TODO 4: Generate secret (run once, then put in dashboard)
/*
const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(64).toString('hex');
}

function generateSecretCli() {
  console.log('JWT_SECRET=' + generateSecret());
  console.log('\nAdd this to your .env file and Railway/Render dashboard');
}

// Run: node -e "require('./04-environment-vars').generateSecretCli()"
*/

// ============================================================
// PART 4: FRONTEND — Vite environment variables
// ============================================================

// TODO 5: Vite env files
/*
.env                    # Loaded in ALL environments
.env.local             # Local overrides — git ignored automatically
.env.development       # Loaded when NODE_ENV=development (or no NODE_ENV)
.env.production        # Loaded when NODE_ENV=production

Example .env.development:
  VITE_API_URL=http://localhost:3001/api
  VITE_APP_NAME="My App (Dev)"

Example .env.production:
  VITE_API_URL=https://my-backend.up.railway.app
  VITE_APP_NAME="My App"
*/

// TODO 6: Using env vars in React/Vite
/*
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const APP_NAME = import.meta.env.VITE_APP_NAME || 'My App';

export const config = {
  apiBaseUrl: API_BASE_URL,
  appName: APP_NAME,
};
*/

// ============================================================
// PART 5: SECURITY RULES
// ============================================================

const securityRules = {
  // RULES:
  // 1. NEVER prefix secrets with VITE_ — they are exposed in browser bundle
  //    BAD: VITE_JWT_SECRET=abc123  (anyone can see this in DevTools)
  //    GOOD: JWT_SECRET=abc123  (backend only)
  //
  // 2. VITE_ prefix: only for PUBLIC config
  //    GOOD: VITE_API_URL, VITE_APP_NAME
  //
  // 3. .env files should never be committed
  //    Make sure .gitignore has: .env
  //
  // 4. Use .env.example as template (no real values)
  //
  // 5. In production: use dashboard (Vercel/Railway/Render)
  //
  // 6. Generate secrets with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
};

// ============================================================
// PART 6: WHERE TO SET ENV VARS
// ============================================================

const envVarLocations = {
  development: {
    backend: '.env file in server/ directory',
    frontend: '.env.local in client/ directory',
    loadOrder: '.env → .env.local → .env.[mode] → .env.[mode].local',
  },
  vercel: {
    backend: 'N/A (Vercel for frontend only)',
    frontend: 'Dashboard → Settings → Environment Variables',
    note: 'All vars are injected at build time. Restart deployment after adding.',
  },
  railway: {
    backend: 'Project → Variables → Add Variable',
    frontend: 'N/A (backend only)',
    database: 'Auto-provided as DATABASE_URL via PostgreSQL plugin',
    note: 'Use ${DATABASE_URL} to reference other vars in Railway',
  },
  render: {
    backend: 'Dashboard → Environment → Secret Files or Variables',
    frontend: 'N/A',
    note: 'Render can generate random values: Generate Value button',
  },
};

// ============================================================
// WORKING FUNCTIONS
// ============================================================

function validateEnvVars() {
  const crypto = require('crypto');
  const required = ['JWT_SECRET', 'DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.log('[ENV] Missing required vars:', missing.join(', '));
    console.log('[ENV] In development: create a .env file from .env.example');
    console.log('[ENV] In production: set vars in Railway/Render dashboard');
    return false;
  }
  return true;
}

function generateSecret() {
  const crypto = require('crypto');
  return crypto.randomBytes(64).toString('hex');
}

console.log('Environment Variables Module');
console.log('---');
console.log('To generate a JWT_SECRET:');
console.log('  node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"');
console.log('---');
console.log('envExample template:');
console.log(envExample);

module.exports = {
  envExample,
  securityRules,
  envVarLocations,
  validateEnvVars,
  generateSecret,
};
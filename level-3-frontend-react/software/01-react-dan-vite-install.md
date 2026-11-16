# SOFTWARE 01 — Install React & Vite

## Apa itu Vite?

**Vite** adalah build tool terbaru untuk frontend development. Lebih cepat dari Create React App karena:
- Dev server instant (tanpa bundling saat development)
- Hot Module Replacement (HMR) super cepat
- Bundle dengan Rollup (production build lebih kecil)

---

## Langkah 1: Install Node.js

React butuh Node.js. Cek dulu:

```bash
node --version
npm --version
```

Jika belum ada, install:

### Mac

```bash
# Menggunakan nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Windows

Download dari https://nodejs.org → pilih **LTS version**

---

## Langkah 2: Install Vite + React

```bash
# Buat project baru
npm create vite@latest nama-project -- --template react

# Masuk ke folder
cd nama-project

# Install dependencies
npm install

# Install React Router
npm install react-router-dom

# Install HTTP client
npm install axios

# Jalankan dev server
npm run dev
```

---

## Langkah 3: Struktur Project Vite

```
nama-project/
├── public/           → Static assets
├── src/
│   ├── assets/       → Images, fonts
│   ├── components/  → Reusable components
│   ├── pages/        → Page components
│   ├── App.jsx       → Main component
│   ├── main.jsx      → Entry point
│   └── index.css      → Global styles
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Langkah 4: Konfigurasi Vite

`vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port dev server
    open: true, // Buka browser otomatis
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

---

## Langkah 5: ESLint + Prettier Setup

```bash
# Install ESLint
npm install --save-dev eslint
npx eslint --init
```

Pilih opsi:
- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- React
- Does your project use TypeScript? **No**
- Where does your code run? **Browser**
- Use a popular style guide
- ESLint configuration format: **JSON**

Tambahkan ke `.eslintrc.json`:

```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

---

## Langkah 6: Git Integration

```bash
# Inisialisasi git
git init

# Buat .gitignore
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore

# First commit
git add .
git commit -m "feat: initial setup dengan Vite + React"
```

---

## Langkah 7: Build untuk Production

```bash
# Build
npm run build

# Preview production build
npm run preview
```

---

## Ringkasan

```
Vite + React Setup:
1. Install Node.js (nvm untuk Mac)
2. npm create vite@latest -- --template react
3. npm install react-router-dom axios
4. Konfigurasi vite.config.js
5. Setup ESLint + Prettier
6. git init && first commit
7. npm run dev → mulai development
```
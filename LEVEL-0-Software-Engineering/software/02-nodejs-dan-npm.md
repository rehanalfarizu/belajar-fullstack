# 📦 Software 02 — Node.js & npm

## Apa itu Node.js?

**Node.js** = JavaScript runtime yang bisa jalan di server (di luar browser).

```
SEBELUM Node.js:
┌─────────┐     ┌──────────────┐
│ Browser │ ──→ │ JS cuma bisa │
│         │     │ jalan di     │
│         │     │ browser      │
└─────────┘     └──────────────┘

SESUDAH Node.js:
┌─────────┐     ┌──────────────┐
│ Server  │ ←─→ │ JS bisa jalan│
│ (Node)  │     │ di server    │
│         │     │ bikin API    │
└─────────┘     └──────────────┘

npm = Node Package Manager
→ Install library/package JavaScript
→ Contoh: express, react, typescript, dll
```

---

## 1. Install Node.js

### Cara 1: Homebrew (direkomendasikan):

```bash
brew install node
```

### Cara 2: nvm (Node Version Manager) — REKOMENDASI:

nvm memungkinkan install **beberapa versi Node.js** sekaligus dan switch antar versi.

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Tambah ke ~/.zshrc
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc

# Reload shell
source ~/.zshrc

# Install Node.js LTS
nvm install --lts

# Atau install versi tertentu
nvm install 20
nvm install 22
```

### Install via Website:
1. Buka https://nodejs.org
2. Download LTS version
3. Install wizard

---

## 2. Verifikasi Installasi

```bash
node --version
# Output: v20.x.x

npm --version
# Output: 10.x.x

# Cek keduanya sekaligus
node -v && npm -v
```

---

## 3. Perintah npm Dasar

### Initialize Project (buat package.json):

```bash
# Buat project baru
mkdir nama-project
cd nama-project
npm init

# Atau langsung dengan yes semua (cepat)
npm init -y

# Atau dengan detail
npm init --yes
npm init --scope=username
```

### Install Package:

```bash
# Install package terbaru
npm install express

# Install versi tertentu
npm install express@5.2.1

# Install sebagai devDependency (hanya untuk development)
npm install --save-dev jest

# Install globally (bisa pakai dari mana saja)
npm install -g typescript

# Install dari package.json (setelah clone repo)
npm install
```

### Package.json fields:

```json
{
  "name": "nama-project",
  "version": "1.0.0",
  "description": "Deskripsi project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "keywords": ["node", "javascript"],
  "author": "Nama",
  "license": "MIT",
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "jest": "^30.4.2"
  }
}
```

### Update Package:

```bash
# Cek versi terbaru semua package
npm outdated

# Update semua
npm update

# Update satu package
npm update express

# Upgrade ke versi major (breaking change)
npx npm-check-updates -u
npm install
```

### Uninstall Package:

```bash
npm uninstall express
npm uninstall jest
npm uninstall --save-dev typescript
```

---

## 4. npx (Jalankan Package Tanpa Install)

```bash
# Jalankan package tanpa install global
npm create vite@latest my-app -- --template react
npx tsc --init
npx nodemon server.js

# npx = npm package runner
# Otomatis download & jalankan dari internet
```

---

## 5. Scripts di package.json

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest --coverage",
    "lint": "eslint src/",
    "deploy": "git push && npm run build"
  }
}
```

### Jalankan Script:

```bash
npm run start
npm run dev
npm run test
npm run lint

# Script khusus:
# npm start      → jalan tanpa "run"
# npm test       → jalan tanpa "run"
# npm stop       → jalan tanpa "run"
```

---

## 6. Node.js Global Packages

### Install Global:

```bash
npm install -g typescript
npm install -g nodemon
npm install -g ts-node
npm install -g yarn
npm install -g pnpm
```

### List Global Packages:

```bash
npm list -g --depth=0
```

### Uninstall Global:

```bash
npm uninstall -g typescript
```

---

## 7. Global vs Local (Dependencies)

```
LOCAL (default):
├── project saya/
│   ├── node_modules/       ← semua package lokal di sini
│   ├── package.json
│   └── index.js

GLOBAL (hanya yang perlu):
├── npm install -g typescript    ← CLI tools
├── npm install -g nodemon       ← Development tools
└── npm install -g yarn          ← Package manager alternatif
```

**Aturan:**
- **Local** (default): Semua library/framework (express, react, dll)
- **Global**: Hanya CLI tools yang kamu jalankan dari terminal (typescript, nodemon, dll)

---

## 8. Semantic Versioning (Semver)

```
1.2.3  →  major.minor.patch

1.2.3  →  patch (bug fix, backward compatible)
1.3.0  →  minor (fitur baru, backward compatible)
2.0.0  →  major (breaking change, tidak backward compatible)
```

### Simbol di package.json:

```json
"express": "^5.2.1"   // boleh update minor & patch
"express": "~5.2.1"   // boleh update patch saja
"express": "5.2.1"    // exact version
"express": ">=5.0.0"  // minimal version
```

---

## 9. Common Package Ecosystem

### Web Backend:
```bash
npm install express          # Web framework
npm install cors            # Cross-origin resource sharing
npm install dotenv          # Environment variables
npm install bcrypt          # Password hashing
npm install jsonwebtoken    # JWT token
npm install prisma          # ORM database
```

### Development Tools:
```bash
npm install --save-dev typescript       # TypeScript compiler
npm install --save-dev nodemon          # Auto-restart server
npm install --save-dev jest             # Testing
npm install --save-dev eslint          # Linting
npm install --save-dev prettier        # Code formatter
```

### Frontend:
```bash
npm install react              # React library
npm install react-dom         # React DOM
npm install next              # Next.js framework
npm install axios             # HTTP client
npm install tailwindcss       # CSS framework
```

---

## 10. Troubleshooting

### Error: "npm: command not found"

```bash
# Cek npm ada di PATH
which npm

# Refresh shell
source ~/.zshrc

# Atau cek dengan nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm --version
```

### Error: "EACCES: permission denied"

```bash
# JANGAN pakai sudo npm install
# Solusi: atur npm global directory ke home

mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### node_modules terlalu besar:

```bash
# Hapus node_modules
rm -rf node_modules

# Install ulang dari package.json
npm install

# Atau gunakan .gitignore
echo "node_modules/" >> .gitignore
```

---

## Checklist

```
✅ node --version → v20.x.x
✅ npm --version  → 10.x.x
✅ npm init -y    → membuat package.json
✅ npm install express → folder node_modules muncul
✅ Bisa jalankan script: npm run dev
✅ Paham perbedaan dependencies vs devDependencies
```

---

**Next:**
- Lanjut ke Software 03: Git
- Atau ke Tutorial: Dev Environment Setup

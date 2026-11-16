# SOFTWARE 01 — Install Node.js dan npm

## Apa itu Node.js?

**Node.js** adalah runtime JavaScript yang berjalan di server (di luar browser). Dengan Node.js, kamu bisa menulis backend/server menggunakan JavaScript.

**npm** (Node Package Manager) adalah alat untuk menginstall library/package JavaScript.

---

## Langkah 1: Cek Apakah Node.js Sudah Terinstall

Buka Terminal dan ketik:

```bash
node --version
npm --version
```

Jika sudah terinstall, akan muncul versi, misalnya:
```
v20.10.0
10.2.4
```

---

## Langkah 2: Install Node.js (Jika Belum)

### Mac& Linux — Menggunakan nvm (Recommended)

**nvm** (Node Version Manager) memungkinkan kamu switch antar versi Node.js.

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload terminal
source ~/.zshrc   # untuk zsh (Mac default)
# atau
source ~/.bashrc  # untuk bash

# Install Node.js LTS (Long Term Support)
nvm install --lts

# Atau install versi tertentu
nvm install 20

# Set sebagai default
nvm alias default 20

# Verifikasi
node --version
npm --version
```

### Windows — Menggunakan nvm-windows

1. Download dari: https://github.com/coreybutler/nvm-windows/releases
2. Download `nvm-setup.exe`
3. Jalankan installer
4. Buka **Command Prompt** (cmd), ketik:
   ```bash
   nvm install lts
   nvm use lts
   ```

### Mac dengan Homebrew

```bash
brew install node

# Verifikasi
node --version
npm --version
```

---

## Langkah 3: Verifikasi Installation

```bash
node --version    # v20.x.x
npm --version     # 10.x.x
npx --version     # 10.x.x
```

---

## Langkah 4: Update npm

npm selalu update. Untuk update ke versi terbaru:

```bash
# Update npm itu sendiri
npm install -g npm@latest

# Atau
npm update -g npm

# Cek versi
npm --version
```

---

## Langkah 5: Kenali Perintah Penting

### Perintah npm dasar

```bash
# Inisialisasi project baru
npm init -y

# Install package
npm install nama-package
npm install nama-package@1.2.3         # versi spesifik
npm install nama-package --save        # production dependency
npm install nama-package --save-dev    # dev dependency

# Install semua dari package.json
npm install

# Uninstall package
npm uninstall nama-package

# Update package
npm update nama-package

# List semua package
npm list
npm list --depth=0       # hanya level 1

# Run script
npm run nama-script

# Clear cache
npm cache clean --force
```

### package.json Scripts bawaan

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  }
}
```

Jalankan dengan:
```bash
npm start
npm run dev
npm test
```

---

## Langkah 6: Install Tools Pendukung

### npx — Jalankan package tanpa install globally

```bash
# Scaffold React dengan Vite tanpa install global
npm create vite@latest my-app -- --template react

# Jalankan prettier langsung
npx prettier --write .

# Jalankan eslint
npx eslint .
```

### nodemon — Auto-restart saat file berubah

```bash
# Install sebagai dev dependency
npm install --save-dev nodemon

# Jalankan dengan nodemon
npx nodemon index.js
```

### yarn — Package manager alternatif

```bash
# Install yarn
npm install -g yarn

# Pakai yarn
yarn add express
yarn dev
```

---

## Troubleshooting

### Error: "EACCES: permission denied"

Jangan pakai `sudo npm install`. Solusi:

```bash
# Setup npm global directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.zshrc
```

### Error: "command not found: node"

```bash
# Cek apakah nvm sudah terinstall
command -v nvm

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Version conflict

```bash
# Cek versi Node.js yang tersedia
nvm ls-remote

# Install versi tertentu
nvm install 18

# Switch versi
nvm use 18
nvm use 20
```

---

## Ringkasan

```
Install Node.js:
1. Mac → nvm install --lts
2. Windows → nvm-windows installer
3. Verifikasi → node --version && npm --version

npm Commands:
├── npm init -y          → buat package.json
├── npm install x        → install package
├── npm install -D x     → dev dependency
├── npm run dev          → jalankan script dev
├── npm uninstall x      → hapus package
└── npm update           → update semua
```

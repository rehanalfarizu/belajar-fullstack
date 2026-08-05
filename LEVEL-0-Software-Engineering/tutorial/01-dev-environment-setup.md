# Tutorial 01 — Dev Environment Setup (Windows & macOS)

## Apa yang Akan Kita Setup?

Di tutorial ini, kita akan setup semua tool yang dibutuhkan untuk fullstack development.

```
TARGET SETUP:
✅ VS Code + extensions
✅ Node.js + npm
✅ Git + GitHub account
✅ Docker Desktop
✅ PostgreSQL (via Docker)
✅ MongoDB Atlas (cloud)
✅ Terminal customization
```

---

## Langkah 1: VS Code

### macOS:

```bash
brew install --cask visual-studio-code
```

### Windows:
```
1. Download dari https://code.visualstudio.com
2. Run installer (.exe)
3. Install "code" command di PATH:
   → Cmd + Shift + P → "Shell Command: Install 'code' command in PATH"
```

### Extensions yang Perlu Diinstall:

Buka VS Code → `Cmd + Shift + X` → install satu per satu:

```
1. Prettier - Code formatter
2. ESLint
3. GitLens — Git supercharged
4. Thunder Client (API testing)
5. Tailwind CSS IntelliSense
6. vscode-icons
7. Auto Rename Tag
8. Markdown All in One
9. REST Client
10. Live Server
```

---

## Langkah 2: Node.js

### macOS (via Homebrew):

```bash
brew install node
```

### Windows:

```
1. Download LTS dari https://nodejs.org
2. Run installer
3. Selesai (Node + npm otomatis terinstall)
```

### Verifikasi:

```bash
node --version
npm --version
```

---

## Langkah 3: Git

### macOS:

```bash
brew install git
```

### Windows:

```
1. Download dari https://git-scm.com
2. Run installer
3. Pilih: "Use Git from the Windows Command Prompt"
```

### Setup Git Global:

```bash
git config --global user.name "Muhammad Raihan Alfarizi"
git config --global user.email "muhammadraihanalfarizi@gmail.com"
git config --global init.defaultBranch main
```

---

## Langkah 4: GitHub Account

### Buat Akun:

```
1. Buka https://github.com
2. Klik "Sign up"
3. Masukkan email, password, username
4. Verifikasi email
5. Setup 2FA (recommended)
```

### Setup SSH Key:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "muhammadraihanalfarizi@gmail.com"

# Tekan Enter 3x (tanpa passphrase untuk development)
# Atau set passphrase kalau mau lebih aman

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Copy seluruh output

# Paste ke GitHub:
# → github.com → Settings → SSH and GPG keys → New SSH key
# → Paste public key
```

### Test Koneksi:

```bash
ssh -T git@github.com
# Output: Hi username! You've successfully authenticated...
```

---

## Langkah 5: Docker Desktop

### macOS:

```bash
brew install --cask docker
```

### Windows:

```
1. Download Docker Desktop dari https://docker.com
2. Run installer
3. WSL 2 backend akan otomatis terinstall (Windows)
4. Restart komputer kalau diminta
```

### Verifikasi:

```bash
docker --version
docker compose version
docker run hello-world
```

---

## Langkah 6: Database (PostgreSQL via Docker)

### Jalankan PostgreSQL dengan Docker:

```bash
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_USER=devuser \
  -e POSTGRES_DB=devdb \
  -p 5432:5432 \
  -v postgres-dev:/var/lib/postgresql/data \
  -d postgres:15-alpine
```

### Verifikasi:

```bash
docker ps
# Harus ada container postgres-dev yang jalan

# Install psql client (macOS)
brew install libpq

# Connect
psql -h localhost -U devuser -d devdb
# Password: devpassword
```

---

## Langkah 7: MongoDB Atlas (Cloud)

### Langkah 7a: Buat Akun:

```
1. Buka https://www.mongodb.com/atlas
2. Klik "Try Free"
3. Daftar dengan email atau Google
```

### Langkah 7b: Buat Cluster:

```
1. Klik "Build a Database"
2. Pilih: FREE tier (M0)
3. Region: Singapore (terdekat)
4. Cluster Name: "dev-cluster"
5. Klik "Create"
6. Tunggu 3-5 menit
```

### Langkah 7c: Buat Database User:

```
1. Security → Quickstart
2. Username: devuser
3. Password: devpassword123 (generate & SIMPAN!)
4. IP Access: 0.0.0.0/0 (allow semua IP)
5. Klik "Finish"
```

### Langkah 7d: Connect:

```
1. Clusters → "Connect" → "Connect your application"
2. Copy connection string:
   mongodb+srv://devuser:<PASSWORD>@dev-cluster.xxxxx.mongodb.net
3. Ganti <PASSWORD> dengan password yang dibuat
```

---

## Langkah 8: TablePlus (Database GUI)

### Install:

```bash
brew install --cask tableplus
```

### Connect PostgreSQL:

```
Host:     localhost
Port:     5432
Database: devdb
User:     devuser
Password: devpassword
```

### Connect MongoDB Atlas:

```
1. Download MongoDB Compass:
   brew install --cask mongodb-compass
2. Buka Compass
3. Paste connection string dari Atlas
4. Connect
```

---

## Langkah 9: Postman (API Testing)

### Install:

```bash
brew install --cask postman
```

### Setup:

```
1. Buka Postman
2. Buat account (atau skip)
3. Buat Collection baru: "Dev Collection"
4. Collection → variable:
   - BASE_URL = http://localhost:3000
```

---

## Langkah 10: Final Verification

Jalankan semua verifikasi untuk memastikan semua berjalan:

```bash
# 1. VS Code
code --version

# 2. Node.js
node --version
npm --version

# 3. Git
git --version
git config --list | grep user

# 4. GitHub SSH
ssh -T git@github.com

# 5. Docker
docker --version
docker ps

# 6. Database
psql -h localhost -U devuser -d devdb -c "SELECT 1;"
```

---

## Troubleshooting

### Docker: "Cannot connect to the Docker daemon"

```bash
# macOS: Buka Docker Desktop
open -a Docker

# Cek status
docker info
```

### PostgreSQL: "connection refused"

```bash
# Cek container
docker ps -a | grep postgres

# Start container
docker start postgres-dev

# Cek logs
docker logs postgres-dev
```

### GitHub SSH: "Permission denied"

```bash
# Cek SSH key ada
ls ~/.ssh/

# Cek SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Test lagi
ssh -T git@github.com
```

---

## Checklist Final

```
✅ code --version  → version number
✅ node --version  → v20.x.x
✅ npm --version   → 10.x.x
✅ git --version   → 2.x.x
✅ git config name + email → terlihat
✅ ssh -T git@github.com → authenticated
✅ docker --version → 24.x.x
✅ docker ps → container postgres-dev jalan
✅ psql connect ke postgres → berhasil
✅ MongoDB Atlas cluster → online
✅ MongoDB Compass connect → berhasil
✅ Postman installed
✅ TablePlus installed
```

---

## Setup File untuk Semua Project

Buat folder project + clone repo template:

```bash
cd ~/Documents

# Buat folder kerja
mkdir -p belajar-fullstack
cd belajar-fullstack

# Setup .env file (database credentials)
cat > .env << 'EOF'
# PostgreSQL
DATABASE_URL=postgresql://devuser:devpassword@localhost:5432/devdb

# MongoDB
MONGODB_URI=mongodb+srv://devuser:devpassword123@dev-cluster.xxxxx.mongodb.net/devdb

# JWT Secret
JWT_SECRET=ini_secret_rubah_sendiri_minimal_32_karakter

# Node Environment
NODE_ENV=development
PORT=3000
EOF

# Add .env ke .gitignore
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
```

---

**Next:**
- Tutorial 02: Git Collaboration Workflow
- Atau lanjut ke LEVEL-1: HTML Fundamental
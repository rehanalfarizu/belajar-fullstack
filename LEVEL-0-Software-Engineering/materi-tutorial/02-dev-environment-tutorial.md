# Tutorial: Dev Environment Setup — Hands-On Guide

## Tujuan

Setelah tutorial ini, komputer kamu siap untuk development (web, Node.js, React, dll).

---

## Checklist Sebelum Mulai

```
✅ macOS sudah terinstall
✅ Internet connection stabil
✅ 20-30 GB free disk space
```

---

## Bagian 1: Homebrew (Package Manager)

### Langkah 1.1 — Cek Apakah Sudah Terinstall

```bash
brew --version
```

**Output jika sudah ada:**
```
Homebrew 4.x.x
Homebrew/homebrew-core (git version ...)
```

**Output jika belum ada:**
```
command not found: brew
```

### Langkah 1.2 — Install Homebrew

Buka terminal dan jalankan:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Penjelasan per-baris:**
```
/bin/bash -c "..."
→ Jalankan script bash

curl -fsSL https://...
→ curl = download file dari URL
→ -f = fail silently kalau HTTP error
→ -s = silent (tidak tampilkan progress)
→ -S = show error kalau gagal
→ -L = follow redirect

https://raw.githubusercontent.com/...
→ Download script install dari GitHub Homebrew repo
```

**Output yang diharapkan:**
```
==> Checking for `sudo` access (which may request your password)...
Password:
```

Masukkan password Mac kamu (password login Mac, bukan Apple ID).

### Langkah 1.3 — Setup Homebrew (setelah install)

```bash
# Tambahkan Homebrew ke PATH (untuk Apple Silicon / M1 chip)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc

# Load ulang shell
source ~/.zshrc

# Verifikasi installasi
brew doctor
```

**Penjelasan:**
```
eval "$(/opt/homebrew/bin/brew shellenv)"
→ Setup environment variables untuk Homebrew
→ Di Apple Silicon Mac, Homebrew terinstall di /opt/homebrew/
→ Di Intel Mac, Homebrew terinstall di /usr/local/

~/.zshrc
→ File konfigurasi untuk zsh shell
→ Setiap buka terminal baru, file ini di-load
→ Kita tambahkan export PATH Homebrew ke sini
```

### Langkah 1.4 — Update Homebrew

```bash
brew update
brew upgrade
```

**Penjelasan:**
```
brew update
→ Update database package Homebrew
→ Cek versi terbaru dari semua package

brew upgrade
→ Upgrade semua package yang sudah outdated
```

---

## Bagian 2: Git

### Langkah 2.1 — Install Git via Homebrew

```bash
brew install git
```

### Langkah 2.2 — Cek Versi

```bash
git --version
# Output: git version 2.43.0
```

### Langkah 2.3 — Setup Git Global Config

```bash
# Setup nama
git config --global user.name "Muhammad Raihan Alfarizi"

# Setup email (pakai email yang sama dengan GitHub)
git config --global user.email "email@domain.com"

# Setup default branch
git config --global init.defaultBranch main

# Setup pull behavior
git config --global pull.rebase false

# Cek semua konfigurasi
git config --list
```

**Output git config --list:**
```
user.name=Muhammad Raihan Alfarizi
user.email=email@domain.com
init.defaultbranch=main
pull.rebase=false
```

---

## Bagian 3: Node.js

### Langkah 3.1 — Install Node.js via Homebrew

```bash
brew install node
```

**Penjelasan:**
```
brew install node
→ Install Node.js LTS (Long Term Support) version
→ Include juga npm (Node Package Manager)
```

### Langkah 3.2 — Cek Versi

```bash
node --version
# Output: v20.x.x (contoh: v20.10.0)

npm --version
# Output: 10.x.x (contoh: 10.2.4)
```

### Langkah 3.3 — Install Yarn (optional, alternatif npm)

```bash
brew install yarn
```

### Langkah 3.4 — Setup Global npm Packages

```bash
# Install package globally
npm install -g npm-check-updates

# Cek package yang outdated
ncu
# ncu = npm-check-updates
```

---

## Bagian 4: Python

### Langkah 4.1 — Cek Python

```bash
python3 --version
# Output: Python 3.x.x
```

### Langkah 4.2 — Install pip (jika belum ada)

```bash
python3 -m ensurepip --upgrade
```

### Langkah 4.3 — Install pyenv (manajemen versi Python)

```bash
brew install pyenv
```

Tambahkan ke `~/.zshrc`:

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

---

## Bagian 5: Docker

### Langkah 5.1 — Install Docker Desktop

```bash
brew install --cask docker
```

**Penjelasan:**
```
brew install        → Install CLI tools
brew install --cask → Install GUI applications
docker → Docker Desktop (GUI + CLI)
```

### Langkah 5.2 — Verifikasi Docker

```bash
docker --version
# Output: Docker version 24.x.x

docker compose version
# Output: Docker Compose version v2.x.x
```

### Langkah 5.3 — Test Docker

```bash
docker run hello-world
```

**Output yang diharapkan:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## Bagian 6: VS Code

### Langkah 6.1 — Install VS Code

```bash
brew install --cask visual-studio-code
```

### Langkah 6.2 — Install CLI Command

```bash
# Tambahkan 'code' command ke PATH
# Buka VS Code → Cmd + Shift + P → "Shell Command: Install 'code' command in PATH"
```

Atau via terminal:

```bash
ln -s "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" /usr/local/bin/code
```

### Langkah 6.3 — Buka Folder dari Terminal

```bash
# Buka folder saat ini di VS Code
code .

# Buka folder tertentu
code ~/Documents/belajar-fullstack
```

### Langkah 6.4 — Install Essential Extensions

Buka VS Code → `Cmd + Shift + X` (Extensions panel), lalu install:

```
1. Prettier - Code formatter
2. ESLint
3. GitLens — Git supercharged
4. GitHub Pull Requests and Issues
5. Error Lens
6. REST Client
7. Thunder Client
8. Tailwind CSS IntelliSense
9. vscode-icons
10. Todo Tree
```

---

## Bagian 7: GitHub Setup

### Langkah 7.1 — Buat Akun GitHub

```
1. Buka https://github.com
2. Klik "Sign up"
3. Ikuti instruksi
4. Verifikasi email
```

### Langkah 7.2 — Generate SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "email@domain.com"
```

**Output:**
```
Generating public/private ed25519 key pair.
Enter file in which to save key (/Users/macbookpro/.ssh/id_ed25519):
```

Tekan Enter (default location).

```
Enter passphrase (empty for no passphrase):
```

Masukkan passphrase (minimal 4 karakter) atau tekan Enter untuk kosong.

### Langkah 7.3 — Copy SSH Key

```bash
# Copy isi public key ke clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

**Penjelasan:**
```
pbcopy = pasteboard copy (copy ke clipboard macOS)
~/.ssh/id_ed25519.pub = file public key
```

### Langkah 7.4 — Tambahkan SSH Key ke GitHub

```
1. Buka https://github.com
2. Klik avatar → Settings
3. Sidebar: "SSH and GPG keys"
4. Klik "New SSH key"
5. Isi:
   - Title: MacBook Pro (atau nama komputer)
   - Key type: Authentication Key
   - Key: paste isi clipboard (Cmd + V)
6. Klik "Add SSH key"
```

### Langkah 7.5 — Test SSH Connection

```bash
ssh -T git@github.com
```

**Output yang diharapkan:**
```
Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```

**Penjelasan:**
```
Hi USERNAME!
→ SSH connection berhasil!
→ Kamu sudah terautentikasi dengan GitHub

You've successfully authenticated
→ Autentikasi berhasil

but GitHub does not provide shell access
→ Ini normal — GitHub memang tidak kasih shell access
→ Yang penting: "successfully authenticated"
```

---

## Bagian 8: Initialize Project dengan Git

### Langkah 8.1 — Buat Folder Project

```bash
cd ~/Documents/belajar-fullstack
mkdir latihan-git
cd latihan-git
```

### Langkah 8.2 — Inisialisasi Git

```bash
git init
```

### Langkah 8.3 — Buat File Pertama

```bash
echo "# Latihan Git" > README.md
echo "Ini repo pertama saya" >> README.md
```

### Langkah 8.4 — Commit

```bash
git add .
git commit -m "feat: initial commit"
```

### Langkah 8.5 — Hubungkan ke GitHub

```
1. Buka https://github.com
2. Klik "+" → "New repository"
3. Nama: latihan-git
4. Jangan centang "Initialize with README"
5. Klik "Create repository"
6. Copy HTTPS atau SSH URL
```

### Langkah 8.6 — Push ke GitHub

```bash
# Hubungkan remote
git remote add origin https://github.com/USERNAME/latihan-git.git

# Push
git push -u origin main
```

---

## Bagian 9: Verify Everything Works

### Test List:

```bash
#1. Homebrew
brew --version
# ✅ Output: Homebrew 4.x.x

# 2. Git
git --version
# ✅ Output: git version 2.x.x

# 3. Node.js
node --version
# ✅ Output: v20.x.x

# 4. npm
npm --version
# ✅ Output: 10.x.x

# 5. Docker
docker --version
# ✅ Output: Docker version 24.x.x

# 6. VS Code
code --version
# ✅ Output: version number

# 7. GitHub SSH
ssh -T git@github.com
# ✅ Output: Hi USERNAME! You've successfully authenticated...

# 8. Git config
git config --list
# ✅ Output: user.name=..., user.email=...
```

---

## Troubleshooting

### Error: "brew: command not found"

```bash
# Pastikan Homebrew di PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

### Error: "git: command not found"

```bash
# Install Git via Homebrew
brew install git
# Tutup terminal, buka lagi
```

### Error: "permission denied" saat install brew

```bash
# Check apakah ada sudo
sudo brew install git
# Masukkan password Mac
```

### Error: SSH "Connection refused" ke GitHub

```bash
# Test koneksi
ssh -vT git@github.com

# Pastikan SSH agent running
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

---

## Checklist Dev Environment

```
SOFTWARE INSTALLED:
✅ Homebrew (package manager)
✅ Git (version control)
✅ Node.js + npm (JavaScript runtime)
✅ Docker (containerization)
✅ VS Code (code editor)

ACCOUNTS SETUP:
✅ GitHub account
✅ SSH key added to GitHub
✅ Git global config (name + email)

VERIFICATION:
✅ Semua command bisa jalan
✅ Bisa push ke GitHub
✅ VS Code extensions terinstall
```

---

## Next Steps

Setelah dev environment siap, lanjut ke:

```
1. materi-teori/05-git-github.md → Teori Git& GitHub
2. materi-praktikum/ → Latihan soal
```
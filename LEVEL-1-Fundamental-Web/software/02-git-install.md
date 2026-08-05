# SOFTWARE 02 — Install Git

## Apa itu Git?

**Git** adalah version control system — alat untuk melacak perubahan kode, collaborate dengan developer lain, dan menyimpan history project secara lokal.

---

## Install Git

### Mac

**Cek dulu apakah sudah ada:**
```bash
git --version
```

**Cara 1: Sudah ada** → langsung pakai, skip ke config

**Cara 2: Install via Homebrew:**
```bash
brew install git
```

**Cara 3: Download installer:**
1. Buka https://git-scm.com/download/mac
2. Download file `.pkg`
3. Jalankan installer

### Windows

1. Buka https://git-scm.com/download/win
2. Pilih **64-bit Git for Windows Setup**
3. Jalankan installer
4. Centang semua opsi default
5. Pilih **"Use Git from the Windows Command Prompt"**
6. Klik **Install**

### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install git
```

### Linux (Lainnya)

```bash
# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```

---

## Setup Global Config

```bash
# Ganti dengan data kamu
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"

# Cek settingan
git config --list
```

---

## Verifikasi Install

```bash
git --version
# Output: git version 2.x.x

git config --list
# Output: user.name=Nama Kamu
#         user.email=email@kamu.com
```

---

## Perintah Git Dasar

```bash
# Inisialisasi repo baru
git init

# Cek status file
git status

# Lihat perubahan file
git diff

# Add file ke staging
git add nama-file.js
git add .              # add semua file

# Commit dengan pesan
git commit -m "feat: menambahkan fitur baru"

# Lihat history commit
git log --oneline

# Lihat remote URL
git remote -v
```

---

## Ringkasan

```
Git Commands:
├── git init              → Inisialisasi repo baru
├── git status            → Cek status file
├── git diff              → Lihat perubahan
├── git add .            → Add semua file
├── git commit -m "msg"  → Commit
├── git log --oneline   → Lihat history
└── git remote -v       → Lihat remote
```
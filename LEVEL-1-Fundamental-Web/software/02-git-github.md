# SOFTWARE 02 — Git & GitHub

## Apa itu Git?

**Git** = version control system — alat untuk melacak perubahan kode, collaborate, dan menyimpan history project.

**GitHub** = platform cloud hosting untuk repo Git (remote repository).

```
Git Workflow:
Working Directory → Staging (git add) → Repository (git commit) → Remote (git push)
```

---

## Bagian 1: Install Git

### Mac

```bash
# Cek apakah sudah ada
git --version
# Jika sudah: git version 2.x.x → langsung ke Bagian 2

# Install via Homebrew
brew install git
```

### Windows

1. Buka https://git-scm.com/download/win
2. Jalankan installer, centang semua opsi default
3. Pilih **"Use Git from the Windows Command Prompt"**

### Linux

```bash
sudo apt update && sudo apt install git
```

---

## Bagian 2: Setup Global Config

```bash
# Ganti dengan data kamu (WAJIB sebelum pakai git)
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"

# Verifikasi
git config --list
```

---

## Bagian 3: Install GitHub CLI (gh)

**GitHub CLI** = perintah `gh` untuk mengelola repo GitHub langsung dari terminal.

### Mac

```bash
brew install gh
```

### Windows

```bash
winget install GitHub.cli
```

### Linux

```bash
sudo apt install gh
```

### Verifikasi

```bash
gh --version
```

---

## Bagian 4: Login GitHub via CLI

```bash
gh auth login
```

Ikuti instruksi step-by-step:
1. Pilih **GitHub.com**
2. Pilih **HTTPS**
3. Pilih **Login with a web browser**
4. Copy kode dari terminal
5. Buka browser → paste kode
6. Konfirmasi

---

## Bagian 5: Repository Pertama

### a. Buat repo di GitHub

1. Buka https://github.com → **"+"** → **New repository**
2. Isi:
   - Repository name: `belajar-fullstack`
   - Description: `Project belajar fullstack development`
   - Public / Private: pilih sesuai kebutuhan
   - **Jangan centang** "Add a README" (repo kosong agar bisa push dari lokal)

### b. Hubungkan repo lokal

```bash
cd ~/Documents/belajar-fullstack

# Inisialisasi git (jika folder belum ter-track)
git init

# remote origin → URL repo GitHub kamu
git remote add origin https://github.com/USERNAME/belajar-fullstack.git

# Cek remote
git remote -v
```

### c. Workflow Commit-Push pertama

```bash
# Cek status (file apa yang berubah)
git status

# Add semua file ke staging
git add .

# Commit dengan pesan (pisahkan topik dengan : prefix)
git commit -m "Initial commit"

# Push ke GitHub (flag -u set upstream sekali saja)
git push -u origin main
```

---

## Bagian 6: Perintah Git yang Sering Dipakai

```bash
# === STATUS & INFO ===
git status              # File apa yang berubah?
git log --oneline      # History commit (1 baris per commit)
git diff               # Lihat perubahan sebelum commit

# === STAGING & COMMIT ===
git add .              # Add semua file
git add file.txt       # Add file tertentu
git commit -m "msg"   # Commit dengan pesan

# === REMOTE ===
git remote -v          # Cek remote URL
git push origin main   # Push branch main
git pull origin main   # Pull dari remote
git clone URL           # Download repo

# === BRANCH ===
git branch             # Lihat semua branch
git checkout -b nama    # Buat + pindah ke branch baru
git checkout main      # Pindah ke branch main
git branch -d nama     # Hapus branch
git merge nama         # Gabung branch ke branch saat ini

# === UNDO ===
git checkout -- file   # Batalkan perubahan di file (belum di-staging)
git reset HEAD file   # Batalkan staging
git reset --soft HEAD~1  # Batalkan commit terakhir (keep perubahan di staging)
git reset --hard HEAD~1  # Batalkan commit terakhir (HAPUS perubahan)
```

---

## Bagian 7: Pesan Commit yang Baik

Gunakan prefix untuk mengklarifikasi jenis perubahan:

```
feat:     → fitur baru
fix:      → bug fix
docs:     → dokumentasi
style:    → format kode (tanpa ubah logic)
refactor: → restructure kode (tanpa ubah behavior)
test:     → tambah/fix test
chore:    → maintenance (deps, build config)
```

Contoh:
```bash
git commit -m "feat: tambah form login"
git commit -m "fix: perbaiki validasi email"
git commit -m "docs: update README"
```

---

## Bagian 8: .gitignore

File yang **tidak boleh** di-commit (secret, deps, build):

```
# === Dependencies ===
node_modules/

# === Environment (JANGAN pernah commit!) ===
.env
.env.local
.env.production

# === Build output ===
dist/
build/

# === Logs ===
*.log
npm-debug.log*

# === OS files ===
.DS_Store
Thumbs.db

# === IDE ===
.vscode/
.idea/
```

---

## Bagian 9: GitHub CLI (gh) yang Berguna

```bash
# Clone repo
gh repo clone USERNAME/repo-name

# Buat repo baru via CLI
gh repo create nama-repo --public

# Buat repo dari folder saat ini
gh repo create nama-repo --source=. --public

# Lihat semua repo
gh repo list USERNAME

# Buat Pull Request
gh pr create --title "Judul PR" --body "Deskripsi perubahan"

# Cek status PR
gh pr status
```

---

## Ringkasan

```
Git Fundamentals:
├── git init                        → Inisialisasi repo baru
├── git config --global user.name   → Setup nama
├── git config --global user.email  → Setup email
├── git add .                       → Add semua ke staging
├── git commit -m "msg"            → Commit
├── git push -u origin main        → Push pertama kali
├── git push origin main           → Push (biasa)
├── git pull origin main           → Pull
├── git branch -b nama             → Buat branch baru
├── git merge nama                 → Merge branch
├── git status                     → Cek status
└── git log --oneline             → Lihat history

GitHub CLI:
├── gh auth login                  → Login
├── gh repo create nama --public  → Buat repo
├── gh repo clone url              → Clone
└── gh pr create                  → Buat PR
```

---

**Lanjut ke:** `tutorial/01-command-line-fundamental.md` untuk belajar Terminal/CLI.

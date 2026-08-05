# 📦 Software 03 — Git

## Apa itu Git?

**Git** = Version Control System (VCS). Melacak perubahan kode, kolaborasi tim, dan history project.

```
TANPA Git:
─ File1.js (disimpan, overwrite, overwrite, overwrite...)

DENGAN Git:
─ commit 1: "feat: add login"
─ commit 2: "fix: password validation"
─ commit 3: "feat: add dashboard"
─ commit 4: "fix: layout bug"
  → Semua history tersimpan, bisa rollback kapan saja
```

---

## 1. Install Git

### Via Homebrew (direkomendasikan):

```bash
brew install git
```

### Cek versi:
```bash
git --version
# Output: git version 2.x.x
```

---

## 2. Setup Global Config

```bash
# Setup nama (wajib)
git config --global user.name "Muhammad Raihan Alfarizi"

# Setup email (wajib — harus sama dengan GitHub)
git config --global user.email "muhammadraihanalfarizi@gmail.com"

# Setup default branch
git config --global init.defaultBranch main

# Setup pull behavior (merge vs rebase)
git config --global pull.rebase false

# Setup color UI
git config --global color.ui auto

# Cek semua konfigurasi
git config --list
```

### File config lokasi:
```
~/.gitconfig  → global config (setiap user)
.project/.git/config  → local config (per project)
```

---

## 3. Git Areas (3 Buah)

Memahami 3 area Git adalah kunci memahami cara kerja Git:

```
WORKING DIRECTORY        STAGING AREA           REPOSITORY
(kode sekarang)          (siap di-commit)       (history tersimpan)

  edit file              git add                git commit
──────────────         ────────────            ────────────
                        ←─── reset ───→          ←─── reset ───→
                        ──checkout───            ──reset --soft───
                        ──restore───
```

### Contoh alur kerja:

```bash
# 1. Edit file (Working Directory)
echo "# Project" > README.md

# 2. Stage file (ke Staging Area)
git add README.md

# 3. Commit (ke Repository)
git commit -m "feat: add README"
```

---

## 4. Perintah Dasar Git

### git init — Inisialisasi Repo Baru:

```bash
cd ~/Documents/my-project
git init
# Output: Initialized empty Git repository in /path/.git/
```

### git status — Cek Status:

```bash
git status
# Output:
# On branch main
# No commits yet
# Untracked files:
#   README.md
```

### git add — Stage File:

```bash
# Stage satu file
git add README.md

# Stage semua file
git add .

# Stage semua file dengan pattern
git add *.js

# Stage semua file yang sudah tracked
git add -A
```

### git commit — Simpan Perubahan:

```bash
# Commit dengan pesan
git commit -m "feat: add user login"

# Commit semua stage sekaligus (tanpa git add)
git commit -am "fix: password validation"

# Amend (tambah ke commit terakhir)
git commit --amend
# WARNING: Jangan amend commit yang sudah di-push!
```

### git diff — Lihat Perubahan:

```bash
# Perubahan yang belum di-stage
git diff

# Perubahan yang sudah di-stage
git diff --staged

# Perubahan di file tertentu
git diff README.md

# Bandingkan branch
git diff main..feature-branch
```

### git log — Lihat History:

```bash
# History commit (satu baris)
git log --oneline

# History dengan graph
git log --oneline --graph --all

# History commit tertentu
git log --oneline -5

# Filter commit berdasarkan pesan
git log --grep="fix:"
```

---

## 5. Git Branch

### Branch commands:

```bash
# Lihat semua branch
git branch

# Buat branch baru
git branch fitur-baru

# Pindah ke branch
git checkout fitur-baru
git switch fitur-baru     # versi baru

# Buat + pindah sekaligus
git checkout -b fitur-baru
git switch -c fitur-baru

# Hapus branch
git branch -d fitur-baru

# Rename branch
git branch -m old-name new-name
```

### Merge:

```bash
# 1. Pindah ke branch tujuan
git checkout main

# 2. Merge branch lain
git merge fitur-baru

# Resolve conflict:
# → Edit file yang conflict
# → git add <file>
# → git commit
```

### Rebase (alternatif merge):

```bash
# Reabase current branch di atas main
git rebase main

# Interaktif rebase (squash, edit, reorder)
git rebase -i HEAD~3
```

---

## 6. Git Remote (GitHub)

### git remote:

```bash
# Lihat remote
git remote -v
# Output:
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)

# Tambah remote
git remote add origin https://github.com/user/repo.git

# Ganti remote URL
git remote set-url origin https://github.com/user/repo.git

# Hapus remote
git remote remove origin
```

### git push — Kirim ke Remote:

```bash
# Push ke branch
git push origin main

# Push dengan upstream (set default)
git push -u origin main
git push -u origin fitur-baru   # next time cukup `git push`

# Push semua branch
git push --all

# Push tag
git push origin v1.0.0
git push --tags
```

### git pull — Tarik dari Remote:

```bash
# Pull + merge
git pull

# Pull + rebase
git pull --rebase

# Fetch + merge spesifik branch
git fetch origin
git merge origin/main
```

### git clone — Clone Repository:

```bash
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git folder-tujuan
```

---

## 7. Git Stash (Simpan Sementara)

```bash
# Simpan perubahan sementara (stash)
git stash
git stash save "fix: belum selesai"

# Lihat daftar stash
git stash list
# Output: stash@{0}: WIP on main: abc123 "fix: belum selesai"

# Apply stash terakhir (tetap simpan di stash)
git stash apply

# Apply stash terakhir (hapus dari stash)
git stash pop

# Apply stash tertentu
git stash apply stash@{0}

# Hapus stash
git stash drop stash@{0}
git stash clear   # hapus semua
```

---

## 8. Git Undo (Balik Perubahan)

```bash
# Undo perubahan di working directory (belum di-stage)
git checkout -- file.txt
git restore file.txt          # versi baru

# Undo di staging area (batalkan add)
git reset HEAD file.txt
git restore --staged file.txt

# Undo commit (hapus commit, perubahan tetap ada)
git reset --soft HEAD~1       # commit hilang, staging tetap
git reset --mixed HEAD~1      # commit hilang, unstaged (default)
git reset --hard HEAD~1      # commit hilang, semua hilang! ⚠️

# Revert commit (buat commit baru yang undo)
git revert HEAD
```

---

## 9. Gitignore (.gitignore)

File/folder yang **tidak** masuk Git:

```
# File umum
node_modules/
.env
.env.local
.DS_Store
*.log

# Folder
dist/
build/
coverage/

# Pattern
*.tmp
*.bak
```

### Generate .gitignore otomatis:
```
https://gitignore.io
→ Input: Node, React, macOS, Windows
→ Generate + copy ke .gitignore
```

---

## 10. Conventional Commits (Pesan Commit Standar)

Format:
```
<type>(<scope>): <description>

<body> (opsional)
<footer> (opsional)
```

### Type:

```
feat    → Fitur baru
fix     → Bug fix
docs    → Dokumentasi
style   → Format/kode, tidak mengubah logic
refactor → Refactoring kode
test    → Tambah/rubah test
chore   → Maintenance (build, config, dll)
```

### Contoh:

```bash
git commit -m "feat(auth): add login with JWT"
git commit -m "fix(api): handle null user object"
git commit -m "docs(readme): update installation guide"
git commit -m "refactor(cart): simplify addToCart logic"
git commit -m "test(checkout): add integration test"
```

---

## 11. Git Alias (Shortcut)

```bash
# Buat shortcut untuk perintah panjang
git config --global alias.st "status -s"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.lg "log --oneline --graph --all"

# Sekarang bisa pakai:
git st        # git status -s
git co main   # git checkout main
git lg        # git log --oneline --graph --all
```

---

## 12. Troubleshooting

### Error: "Please tell me who you are"

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@domain.com"
```

### Error: "Merge conflict"

```bash
# Lihat file yang conflict
git status

# Edit file conflict → hapus <<< === >>> markers
# Lalu:
git add .
git commit -m "resolve: merge conflict"
```

### Error: "fatal: not a git repository"

```bash
# Cek apakah sudah di dalam repo git
git status

# Inisialisasi kalau belum
git init
```

### Lupa Password SSH Passphrase:

```bash
# Cek SSH agent
eval "$(ssh-agent -s)"

# Identifikasi passphrase lupa → generate SSH key baru
ssh-keygen -t ed25519 -C "email@domain.com"
```

---

## Checklist

```
✅ git --version → 2.x.x
✅ git config --list → name + email muncul
✅ git init → folder .git terbuat
✅ git add + git commit → commit pertama
✅ git remote add origin → repo GitHub terhubung
✅ git push -u origin main → berhasil push
✅ Paham perbedaan working dir, staging, repo
✅ Paham git branch (create, switch, merge)
✅ Paham git stash
✅ Paham git reset vs git revert
✅ .gitignore sudah dibuat
```

---

**Next:**
- Lanjut ke Software 04: Docker
- Atau ke materi-teori/02-git-github-fundamental.md
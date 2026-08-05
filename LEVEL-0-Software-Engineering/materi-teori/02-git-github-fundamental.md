# 📘 MATERI TEORI 02 — Git & GitHub Fundamental

## 1. Apa itu Git?

Git = **version control system** (VCS) terdistribusi untuk melacak perubahan file.

```
Tanpa Git                      Dengan Git
──────────────                ─────────────────────────────
"Versi1.html"                 "Versi1.html"
"Versi1-FINAL.html"           Commit history lengkap
"Versi1-FINAL-REVISI.html"   Bisa kembali ke versi mana pun
"Versi1-FINAL-v2.html"       Branching untuk fitur baru
Sulit kolaborasi              Multi-orang, merge otomatis
```

---

## 2. Cara Install Git

```bash
# macOS — biasanya sudah terinstall
git --version
# Output: git version 2.x.x

# Kalau belum, install via Homebrew:
brew install git

# Windows — download dari https://git-scm.com
# Atau via Chocolatey:
choco install git

# Linux (Ubuntu/Debian):
sudo apt update && sudo apt install git
```

---

## 3. Setup Awal (Wajib Sekali)

```bash
# Set nama dan email (muncul di setiap commit!)
git config --global user.name "mraihanalfarizi"
git config --global user.email "muhammadraihanalfarizi@gmail.com"

# Set default branch (main vs master)
git config --global init.defaultBranch main

# Set editor default (VS Code)
git config --global core.editor "code --wait"

# Cek semua konfigurasi
git config --list

# Cek konfigurasi per item
git config user.name
git config user.email
```

---

## 4. Konsep Dasar Git

```
┌──────────────────────────────────────────────────────┐
│                    REMOTE (GitHub)                   │
│         Repository di cloud (backup + kolaborasi)     │
└──────────────────────────────────────────────────────┘
                          ▲
                          │ push / pull
                          │
┌──────────────────────────────────────────────────────┐
│                    LOCAL                             │
│                                                      │
│  Working     Staging      Repository                │
│  Directory   Area (Index)  (HEAD)                    │
│                                                      │
│  file.txt ──► git add ──► git commit ──► committed  │
│  (edited)       (staged)      (saved)               │
└──────────────────────────────────────────────────────┘
```

### Penjelasan 3 Area:

```
1. Working Directory (Folder kerja)
   → File yang sedang kamu edit
   → Status: untracked / modified

2. Staging Area (Index)
   → File yang sudah ditandai untuk di-commit
   → Status: staged

3. Repository (.git folder)
   → Database commit history
   → Status: committed
```

---

## 5. Inisialisasi Repository

```bash
# Buat repo baru di folder saat ini
git init

# Clone repo yang sudah ada di GitHub
git clone git@github.com:mraihanalfarizi/my-portfolio.git
git clone git@github.com:mraihanalfarizi/my-portfolio.git nama-folder
```

---

## 6. Basic Workflow

```bash
# 1. Lihat status
git status

# 2. Lihat perubahan (vs committed)
git diff              # perubahan working vs staged
git diff --staged     # perubahan staged vs last commit
git diff HEAD         # semua perubahan vs commit terakhir

# 3. Stage file
git add index.html              # stage satu file
git add css/                    # stage satu folder
git add .                       # stage semua file
git add -A                      # stage semua (termasuk deleted)

# 4. Unstage file
git reset HEAD index.html       # unstage (tapi perubahan tetap ada)
git reset                       # unstage semua

# 5. Commit (simpan ke repository)
git commit -m "feat: add login page"

# 6. Lihat history
git log                         # semua commit
git log --oneline               # 1 baris per commit
git log --oneline -10           # 10 commit terakhir
git log --author="nama"         # filter by author
git log --grep="fix"            # filter by pesan commit
git log -p index.html           # history satu file
git log --stat                  # dengan statistik
git log --graph --oneline       # visual graph
```

---

## 7. Commit Messages (Convention)

Format: `type(scope): description`

```
Types:
feat     → fitur baru
fix      → bug fix
docs     → dokumentasi
style    → formatting, tidak ganti logic
refactor → restruktur kode
test     → tambah/update test
chore    → maintenance, build, dll

Examples:
feat(auth): add login endpoint
fix(cart): handle empty cart state
docs(readme): add installation guide
refactor(api): extract validation logic
test(auth): add unit tests for login
chore(deps): upgrade Express to v5
```

---

## 8. Branching

```bash
# Lihat semua branch
git branch

# Lihat branch + remote tracking
git branch -a

# Lihat branch + commit terakhir
git branch -v

# Buat branch baru (tidak langsung pindah)
git branch fitur-login

# Pindah branch
git checkout fitur-login

# Buat + langsung pindah (shortcut)
git checkout -b fitur-register

# Switch ke branch yang sudah ada
git checkout main

# Rename branch
git branch -m old-name new-name

# Hapus branch
git branch -d fitur-login     # hati-hati (perlu di-merged dulu)
git branch -D fitur-login     # paksa hapus (meskipun belum di-merge)
```

---

## 9. Merging

```bash
# Pastikan di branch tujuan (misal: main)
git checkout main

# Gabung branch fitur-login ke main
git merge fitur-login

# Merge tanpa commit (fast-forward only)
git merge --ff-only fitur-login

# Merge dengan commit baru (even fast-forward)
git merge --no-ff fitur-login

# Merge aborted (kalau ada konflik)
git merge --abort
```

---

## 10. Merge Conflict

Konflik terjadi kalau 2 branch mengubah baris yang sama.

### Cara Resolve:

```bash
# 1. Deteksi konflik
git merge fitur-login
# Output: CONFLICT (content): Merge conflict in file.txt

# 2. Lihat file yang konflik
git status
# Output: both modified: file.txt

# 3. Buka file, cari penanda konflik:
<<<<<<< HEAD
Kode di branch aktif (main)
=======
Kode di branch yang di-merge (fitur-login)
>>>>>>> fitur-login

# 4. Perbaiki manual — hapus penanda <<< === >>> dan pilih kode yang benar

# 5. Stage file yang sudah diperbaiki
git add file.txt

# 6. Commit (tanpa -m untuk pesan custom)
git commit
# Editor akan terbuka, isikan pesan commit
# Pesan default: "Merge branch 'fitur-login' into main"
```

---

## 11. Remote & GitHub

```bash
# Lihat remote yang terhubung
git remote -v

# Tambah remote baru
git remote add origin git@github.com:user/repo.git

# Ganti URL remote
git remote set-url origin git@github.com:user/repo.git

# Hapus remote
git remote remove origin

# Rename remote
git remote rename origin upstream
```

---

## 12. Push, Pull, Fetch

```bash
# Push (upload commit lokal ke remote)
git push origin main           # push branch main
git push -u origin main        # push + set upstream (sekali aja)
git push --force               # paksa overwrite (BERBAHAYA!)
git push --force-with-lease    # paksa tapi aman (lebih direkomendasikan)
git push origin --tags         # push semua tag

# Pull (download + merge sekaligus)
git pull origin main
git pull --rebase origin main  # pull dengan rebase

# Fetch (download info terbaru saja, TIDAK merge)
git fetch origin
git fetch --all
```

---

## 13. Stashing (Penyimpanan Sementara)

```bash
# Simpan perubahan sementara
git stash
git stash save "WIP: work in progress"

# Lihat daftar stash
git stash list

# Ambil kembali perubahan
git stash pop          # ambil + hapus dari stash
git stash apply        # ambil + TETAP di stash

# Ambil stash tertentu
git stash pop stash@{2}

# Hapus stash
git stash drop stash@{0}
git stash clear        # hapus semua stash
```

---

## 14. Undo / Reset

```bash
# Undo perubahan di working directory (belum staged)
git checkout -- index.html
git restore index.html          # versi baru

# Undo staging (belum committed)
git reset HEAD index.html
git restore --staged index.html # versi baru

# Reset ke commit tertentu (BERBAHAYA!)
git reset --soft abc1234  # commit di hapus, perubahan DIKEMBALIKAN ke staging
git reset --mixed abc1234 # commit di hapus, perubahan DIKEMBALIKAN ke working
git reset --hard abc1234  # commit di hapus, SEMUA perubahan DIHAPUS

# Buat commit baru yang UNDO commit terakhir
git revert abc1234        # revert commit tertentu
```

---

## 15. Tagging

```bash
# Buat tag lightweight
git tag v1.0.0

# Buat tag annotated (lebih lengkap)
git tag -a v1.0.0 -m "Version 1.0.0"

# Buat tag untuk commit tertentu
git tag -a v0.9.0 abc1234 -m "Version 0.9.0"

# Lihat semua tag
git tag
git tag -l "v1.*"

# Push tag ke remote
git push origin v1.0.0
git push origin --tags     # push semua tag

# Hapus tag
git tag -d v0.9.0          # hapus lokal
git push origin --delete v0.9.0  # hapus remote
```

---

## 16. Gitignore

File/folder yang tidak di-commit.

```bash
# Buat file .gitignore
touch .gitignore

# Isi .gitignore:
node_modules/
.env
.DS_Store
dist/
build/
*.log
coverage/
```

---

## 17. Git Workflow di Tim

```
1. PULL sebelum mulai kerja
   git checkout main
   git pull origin main

2. BUAT branch baru
   git checkout -b fitur-xyz

3. KERJA, COMMIT sering
   git add .
   git commit -m "feat: ..."

4. PUSH branch ke remote
   git push -u origin fitur-xyz

5. BUAT PULL REQUEST di GitHub
   Review → Fix → Approve → Merge

6. DELETE branch setelah di-merge
   git checkout main
   git branch -d fitur-xyz
```

---

## Ringkasan

```
Git & GitHub
├── Setup       → git config, ssh key
├── Repo        → git init, git clone
├── Workflow    → status, add, commit, log
├── Branch      → branch, checkout, merge
├── Remote      → push, pull, fetch
├── Undo        → reset, revert, stash
├── Tag         → tag, annotate, release
└── Collaboration → fork, PR, merge
```

---

**Lanjut ke:** LEVEL-1-Fundamental-Web/materi-teori/01-html-fundamental/

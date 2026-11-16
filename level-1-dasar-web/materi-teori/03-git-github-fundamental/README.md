# 📘 MATERI TEORI 03 — Git & GitHub Fundamental

## 1. Apa itu Git?

**Git** adalah **version control system** (VCS) — alat untuk mencatat perubahan file dari waktu ke waktu.

```
Tanpa Git (BEFORE)                          Dengan Git (AFTER)
─────────────────                           ──────────────────
📁 project/                                 📁 project/
  ├── project-v1.zip                         ├── .git/          ← database riwayat
  ├── project-v2.zip                          ├── versi1/
  ├── project-v2-FIX.zip                     ├── versi2/
  ├── project-v2-FIX-FINAL.zip              ├── versi3/
  ├── project-v2-FIX-FINAL-REAL.zip        └── versi4/
  ├── project-v2-FIX-FINAL-REAL-ACTUAL.zip
  └── project-v3.zip                          → Semua riwayat TERSIMPAN
```

**Kenapa Git Penting?**
```
1. Riwayat perubahan lengkap — bisa kembali ke versi kapan saja
2. Branching — bisa kerja di fitur baru tanpa merusak kode utama
3. Merging — menggabungkan perubahan dari banyak orang
4. Collaboration — banyak orang bisa kerja bareng di repo yang sama
5. Backup — kode tersimpan di cloud (GitHub/GitLab/Bitbucket)
```

---

## 2. Apa itu GitHub?

```
Git    = software version control (berjalan di komputer lokal)
GitHub = layanan hosting repo Git di cloud (seperti Google Drive untuk kode)
         https://github.com

Layanan serupa:
- GitLab    (gitlab.com) — bisa self-host juga
- Bitbucket (bitbucket.org)
- Gitea     (self-hosted)
```

**Hubungan Git & GitHub:**
```
Komputer Lokal (Git)          Cloud (GitHub)
┌──────────────┐              ┌──────────────┐
│  Kode kita   │ ── push ──► │  Repo online │
│  .git/       │ ◄── pull ── │  (backup)   │
└──────────────┘              └──────────────┘
```

---

## 3. Istilah-Istilah Penting Git

```
Repository (Repo)
├── Local Repository  → .git folder di komputer kita
└── Remote Repository → repo di GitHub (cloud)

File States:
┌─────────────────────────────────────────────────┐
│  Working Directory  │  Staging Area  │  Repository │
│  (file lokal kita)  │  (antrian)    │  (tersimpan) │
│                      │               │              │
│  → edit file         │  → git add     │  → git commit │
│                      │               │              │
│  MERAH (untracked)   │  HIJAU (staged)│  TERSIMPAN   │
└─────────────────────────────────────────────────┘

Commit
├── Snapshot perubahan kode di satu titik waktu
├── Punya hash unik (contoh: a1b2c3d4...)
├── Punya author & timestamp
└── Bisa diberi pesan (commit message)

Branch
├── Percabangan dari kode utama
├── Independen — tidak ganggu branch lain
├── Setelah selesai, bisa di-merge ke main
└── Default branch: main (atau master di repo lama)
```

---

## 4. Alur Kerja Git (Basic Workflow)

### a. Inisialisasi Repo Baru:
```bash
# Di dalam folder project
git init
# Output: Initialized empty Git repository in /path/to/project/.git/
```

### b. Cek Status:
```bash
git status
# Output:
# On branch main
# No commits yet
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         README.md
```

### c. Staging (Menambahkan File ke Antrian):
```bash
# Tambah 1 file
git add README.md

# Tambah semua file
git add .

# Tambah semua file + pattern
git add *.js

# Hapus dari staging (kembalikan ke working directory)
git reset README.md
git reset .       # hapus semua dari staging
```

### d. Commit (Menyimpan Perubahan):
```bash
# Commit dengan pesan
git commit -m "feat: menambahkan fitur login"

# Kombinasi add + commit sekaligus (hanya untuk file yang SUDAH di-track)
git commit -am "fix: memperbaiki bug di form"

# Amend (ubah commit terakhir — gunakan dengan hati-hati!)
git commit --amend -m "pesan baru"
```

### e. Melihat Riwayat Commit:
```bash
git log
# Output:
# commit a1b2c3d4 (HEAD -> main)
# Author: Nama <email@email.com>
# Date:   Sat May 31 14:00:00 2026
#
#     feat: menambahkan fitur login

git log --oneline              # ringkas 1 baris per commit
git log --oneline --graph      # dengan visualisasi branch
git log -n 5                   # 5 commit terakhir
```

---

## 5. Git Branching

### a. Melihat Branch:
```bash
git branch              # daftar branch lokal
git branch -a           # daftar semua branch (lokal + remote)
```

### b. Membuat Branch Baru:
```bash
git branch fitur-baru       # buat branch (belum pindah)
git checkout fitur-baru     # pindah ke branch baru
# atau
git checkout -b fitur-baru  # buat + langsung pindah (1 perintah)
```

### c. Beralih Branch:
```bash
git checkout main          # kembali ke branch main
git checkout -             # kembali ke branch sebelumnya
```

### d. Menghapus Branch:
```bash
git branch -d fitur-baru   # hapus branch lokal
```

### e. Merge (Menggabungkan Branch):
```bash
# 1. Pindah ke branch tujuan (misal: main)
git checkout main

# 2. Merge branch fitur ke main
git merge fitur-baru

# 3. Branch fitur sudah selesai → hapus
git branch -d fitur-baru
```

### f. Contoh Workflow Branching:
```bash
# Buat branch untuk fitur baru
git checkout -b fitur-dark-mode

# ... edit-edit kode ...

# Commit perubahan
git add .
git commit -m "feat: menambahkan dark mode"

# Kembali ke main
git checkout main

# Merge perubahan
git merge fitur-dark-mode

# Hapus branch fitur
git branch -d fitur-dark-mode
```

---

## 6. GitHub Workflow (Remote Repository)

### a. Membuat Repo di GitHub:
```
1. Buka https://github.com
2. Klik "+" → "New repository"
3. Isi nama repo, deskripsi
4. Pilih Public / Private
5. Klik "Create repository"
```

### b. Push (Kirim dari Lokal ke GitHub):
```bash
# Hubungkan repo lokal dengan remote
git remote add origin https://github.com/username/repo-name.git

# Push ke remote (pertama kali)
git push -u origin main
# -u = set upstream (untuk git pull otomatis nanti)

# Push berikutnya
git push
```

### c. Clone (Salin dari GitHub ke Lokal):
```bash
# Clone repo ke komputer
git clone https://github.com/username/repo-name.git

# Clone ke folder tertentu
git clone https://github.com/username/repo-name.git nama-folder-terserah
```

### d. Pull (Tarik dari GitHub ke Lokal):
```bash
git pull              # tarik perubahan terbaru
git pull origin main # pull dari branch main di remote origin
```

### e. Fetch (Cek Perubahan Remote Tanpa Merge):
```bash
git fetch origin      # cek perubahan di remote
git fetch --all      # fetch dari semua remote
```

### f. Remote Commands:
```bash
git remote -v                 # lihat remote yang terhubung
git remote add origin URL     # tambah remote
git remote remove origin      # hapus remote
git remote rename origin upstream  # rename remote
```

---

## 7. .gitignore — Mengabaikan File

File/folder di `.gitignore` **tidak akan** di-commit.

### Contoh .gitignore Umum:
```gitignore
# === File sistem ===
.DS_Store
Thumbs.db

# === Dependencies ===
node_modules/
vendor/

# === Build output ===
dist/
build/
*.o
*.exe

# === Environment / Secrets ===
.env
.env.local
*.pem
credentials.json

# === Log & Debug ===
*.log
npm-debug.log*

# === Editor ===
.vscode/
.idea/
*.swp
*.swo

# === OS ===
*.bak
*~

# === Framework / Build ===
.next/
.nuxt/
.cache/
```

---

## 8. Git Undo / Rollback

### a. Membatalkan Perubahan di Working Directory:
```bash
# Kembalikan file ke versi commit terakhir
git checkout -- file.txt
# atau
git restore file.txt
```

### b. Membatalkan Staging (Unstage):
```bash
git reset HEAD file.txt
# atau
git restore --staged file.txt
```

### c. Membatalkan Commit (Tanpa Hapus Perubahan):
```bash
# Kembalikan ke commit sebelumnya, tapi perubahan tetap ada
git reset --soft HEAD~1
```

### d. Membatalkan Commit (Hapus Perubahan):
```bash
# Hapus commit DAN perubahannya
git reset --hard HEAD~1
```

### e. Revert (Membatalkan Commit Tertentu):
```bash
# Buat commit baru yang MENBALIKKAN commit tertentu
git revert abc1234
```

---

## 9. Git Stash — Menyimpan Perubahan Sementara

```bash
# Simpan perubahan sementara (belum di-commit)
git stash
# Output: Saved working directory and index state WIP on main: abc1234

# Lihat daftar stash
git stash list
# Output: stash@{0}: WIP on main: abc1234 feat: ...

# Kembalikan stash terakhir
git stash pop
# → mengembalikan + hapus dari stash

# Kembalikan stash TANPA hapus
git stash apply
# → tetap ada di stash

# Hapus stash
git stash drop stash@{0}
```

---

## 10. Git Diff — Melihat Perubahan

```bash
# Perubahan di working directory (belum di-staged)
git diff

# Perubahan yang sudah di-staged
git diff --staged
git diff --cached

# Perubahan antar 2 commit
git diff abc123..def456

# Perubahan di file tertentu
git diff file.txt

# Diff stat (ringkasan)
git diff --stat
```

---

## 11. Git Tags — Penanda Versi

```bash
# Buat tag untuk versi tertentu
git tag v1.0.0

# Buat tag dengan annotate (lebih lengkap)
git tag -a v1.0.0 -m "Versi 1.0.0 - Rilis pertama"

# Lihat semua tag
git tag

# Push tag ke remote
git push origin v1.0.0

# Push semua tag
git push --tags
```

---

## 12. Workflow Kolaborasi (Tim)

```
1. Clone repo
   git clone https://github.com/org/repo-name.git

2. Buat branch fitur
   git checkout -b fitur-xyz

3. Edit kode, commit
   git add .
   git commit -m "feat: menambahkan fitur xyz"

4. Push branch ke remote
   git push -u origin fitur-xyz

5. Buka GitHub → Pull Request (PR)
   → Review kode
   → Approve
   → Merge ke main

6. Update branch lokal
   git checkout main
   git pull origin main
```

---

## 13. Git Cheat Sheet

```
=== AWAL PROJECT ===
git init                          → inisialisasi repo baru
git clone URL                     → salin repo dari GitHub

=== CEK STATUS ===
git status                        → lihat status file
git log --oneline               → riwayat commit (ringkas)
git diff                         → lihat perubahan

=== STAGING & COMMIT ===
git add file.txt                 → stage 1 file
git add .                        → stage semua file
git commit -m "pesan"           → commit dengan pesan
git commit -am "pesan"          → add + commit (file yang sudah di-track)

=== BRANCH ===
git branch                       → daftar branch
git checkout -b nama-branch     → buat + pindah branch
git checkout main               → pindah ke main
git merge nama-branch           → gabung branch ke branch saat ini
git branch -d nama-branch       → hapus branch

=== REMOTE ===
git remote -v                   → lihat remote
git push -u origin main         → push pertama
git push                        → push berikutnya
git pull                        → tarik dari GitHub
git clone URL                    → clone repo

=== UNDO ===
git checkout -- file.txt        → batalkan perubahan working dir
git reset HEAD file.txt         → unstage file
git reset --hard HEAD~1         → batalkan 1 commit terakhir

=== STASH ===
git stash                       → simpan perubahan sementara
git stash pop                   → kembalikan stash
```

---

## Ringkasan Istilah

```
Repository (Repo)    → Folder project yang dikelola Git
Clone               → Salin repo dari GitHub ke komputer
Commit              → Simpan snapshot perubahan
Branch              → Percabangan kode independen
Merge               → Gabung branch
Push                → Kirim dari lokal ke GitHub
Pull                → Tarik dari GitHub ke lokal
.gitignore          → File/folder yang diabaikan Git
Stash               → Simpan perubahan sementara
Remote              → Repo di GitHub (cloud)
Origin              → Nama default untuk remote
HEAD                → Commit yang sedang aktif
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/` untuk latihan Git dengan soal.

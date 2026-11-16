# 📘 MATERI TEORI — Git & GitHub

## 1. Apa itu Git?

Git = **Version Control System (VCS)**. Software untuk melacak perubahan kode.

```
Tanpa Git:                     Dengan Git:
file_v1.html                   git log
file_v2.html                   v1 → v2 → v3 → v4
file_v3.html                   Bisa rollback, lihat siapa ubah apa
file_final.html
(ribuan versi menumpuk)        Tidak perlu punya banyak file
```

---

## 2. Apa itu GitHub?

GitHub = **Platform hosting** untuk repository Git. Tempat menyimpan kode di cloud.

```
Git    → Software di komputer kamu (local)
GitHub → Website/cloud untuk menyimpan Git repo (remote)
```

---

## 3. Anatomi Git Workflow

```
┌──────────────┐     git add      ┌──────────────┐   git commit   ┌──────────────┐
│  Working     │  ───────────►    │    Staging   │  ──────────►   │   Repository  │
│  Directory   │                 │    Area      │                │   (Local)     │
│  (file baru/ │                 │  (siap di-   │                │  (tersimpan)  │
│   diubah)    │                 │   commit)    │                │               │
└──────────────┘                 └──────────────┘                └───────────────┘

                                                                         │
                                                                         │ git push
                                                                         ▼
                                                                  ┌──────────────┐
                                                                  │  GitHub       │
                                                                  │  (Remote)     │
                                                                  └──────────────┘
```

Empat area penting dalam workflow Git:

1. **Working Directory** — folder tempat kamu kerja. File baru atau yang diubah ada di sini.
2. **Staging Area** — file yang sudah ditandai "akan di-commit", belum tersimpan permanen.
3. **Local Repository** — commit yang sudah tersimpan di komputer kamu.
4. **Remote Repository** — repository yang tersimpan di GitHub (cloud).

---

## 4. Perintah Dasar Git

### Inisialisasi & Status

```bash
# Inisialisasi repository baru
git init

# Cek status file
git status

# Keterangan warna git status:
# Merah   → Untracked (file baru, Git belum kenal)
# Hijau   → Staged (siap di-commit)
# Tanpa warna → Committed (sudah tersimpan)
```

### Add, Commit, Push

```bash
# Add satu file ke staging
git add nama-file.txt

# Add semua file yang berubah
git add .

# Commit dengan pesan
git commit -m "feat: tambahkan fitur baru"

# Push ke GitHub
git push origin main
```

---

## 5. Remote Repository

```bash
# Lihat remote yang sudah terhubung
git remote -v

# Tambah remote baru
git remote add origin https://github.com/USERNAME/repo.git

# Hapus remote
git remote remove origin

# Rename remote
git remote rename origin upstream
```

---

## 6. Branch (Cabang)

```bash
# Lihat semua branch
git branch

# Buat branch baru
git branch fitur-baru

# Pindah ke branch lain
git checkout fitur-baru

# Buat branch baru DAN langsung pindah
git checkout -b fitur-baru

# Hapus branch (setelah di-merge)
git branch -d fitur-yang-sudah-done

# Force hapus branch (belum di-merge)
git branch -D fitur-yang-belum-selesai
```

---

## 7. Merge (Menggabungkan Branch)

```bash
# Pastikan di branch main
git checkout main

# Gabungkan branch fitur ke main
git merge fitur-baru

# Merge conflict? → resolve manual, lalu:
git add .
git commit -m "resolve: merge conflict"
```

---

## 8. Log & History

```bash
# Lihat riwayat commit
git log

# Log 1 baris (ringkas)
git log --oneline

# Log grafik branch
git log --oneline --graph --all

# Lihat perubahan file
git diff
```

---

## 9. Undo / Reset

```bash
# Batalkan perubahan file (belum di-add)
git restore nama-file.txt

# Batalkan staging (sudah di-add, belum commit)
git restore --staged nama-file.txt

# Reset HARD (hapus commit & perubahan, KERAS!)
git reset --hard HEAD~1

# Reset SOFT (hapus commit, tapi perubahan tetap di staging)
git reset --soft HEAD~1
```

---

## 10. GitHub Collaboration

### Clone

```bash
git clone https://github.com/USERNAME/repo.git
```

### Fork & Pull Request

Alur kontribusi ke repository lain:

1. Fork repo di GitHub — salin ke akun kita.
2. Clone fork ke komputer.
3. Buat branch baru.
4. Edit dan commit.
5. Push ke fork kita.
6. Buat Pull Request (PR) ke repo original.
7. Owner review lalu merge.

### Sync Fork

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## 11. .gitignore

File yang tidak ingin di-commit (password, `node_modules`, dll).

```bash
# Buat file .gitignore
touch .gitignore

# Isi .gitignore:
node_modules/
.env
.DS_Store
*.log
dist/
```

---

## 12. .git/config (Cek Siapa yang Commit)

```bash
# Lihat siapa yang mengubah baris
git blame nama-file.html

# Lihat config global
git config --list
```

---

## 13. Tag (Versi Rilis)

```bash
# Buat tag versi
git tag v1.0.0

# Push tag ke GitHub
git push origin v1.0.0

# Lihat semua tag
git tag
```

---

## 14. Stash (Simpan Sementara)

```bash
# Simpan perubahan sementara
git stash

# Lihat daftar stash
git stash list

# Kembalikan perubahan tersimpan
git stash pop

# Hapus stash
git stash drop
```

---

## Ringkasan Empat Workflow

1. **Git Workflow** — `file baru/ubah → git add → git commit → git push → GitHub`.
2. **Git Branching** — `main → feature/xxx → merge → main`.
3. **Git Collaboration** — `fork → clone → branch → edit → push → Pull Request → review → merge`.
4. **Git Undo** — `git restore` untuk undo perubahan (belum staged); `git reset --soft` untuk undo commit (tetap staged); `git reset --hard` untuk undo commit (hapus semua); `git revert` untuk undo commit (buat commit baru).

---

**Lanjut ke:**

- Praktikum → `materi-praktikum/01-git-dasar/`
- Tutorial → `tutorial/README.md`
- Software → `software/README.md`

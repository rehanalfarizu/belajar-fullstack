# SOFTWARE 03 — Git & GitHub untuk Developer

## Apa yang Akan Dipelajari

- Branching strategy
- Pull request workflow
- Merge vs Rebase
- Git stash
- Resolve conflict
- Git alias

---

## Branching Strategy

### Git Flow (Standard)

```
main (production)
 └── develop (development)
      ├── feature/login
      ├── feature/register
      └── feature/dashboard
```

### Perintah Branching

```bash
# Lihat semua branch
git branch

# Buat branch baru
git checkout -b fitur-login

# Pindah branch
git checkout main

# Hapus branch
git branch -d fitur-login

# Rename branch
git branch -m fitur-lama fitur-baru
```

---

## Commit Convention

Gunakan format prefix:

| Prefix | Penggunaan |
|--------|-----------|
| `feat:` | Fitur baru |
| `fix:` | Bug fix |
| `docs:` | Dokumentasi |
| `style:` | Formatting, tidak ada perubahan logic |
| `refactor:` | Refactoring kode |
| `test:` | Menambah test |
| `chore:` | Maintenance |

### Contoh

```bash
git commit -m "feat: menambahkan login dengan JWT"
git commit -m "fix: memperbaiki bug redirect setelah login"
git commit -m "docs: update README untuk setup"
git commit -m "refactor: extract auth logic ke helper"
```

---

## Stash (Simpan Sementara)

Saat mau switch branch tapi belum mau commit:

```bash
# Simpan perubahan sementara
git stash

# Lihat daftar stash
git stash list

# Kembalikan perubahan
git stash pop

# Kembalikan tapi tetap di stash list
git stash apply

# Hapus stash
git stash drop
```

---

## Remote Operations

```bash
# Lihat remote
git remote -v

# Tambah remote
git remote add origin https://github.com/username/repo.git

# Rename remote
git remote rename origin upstream

# Fetch dari remote
git fetch origin

# Pull (fetch + merge)
git pull origin main

# Push dengan upstream (pertama kali)
git push -u origin nama-branch

# Push biasa
git push origin nama-branch

# Hapus remote branch
git push origin --delete nama-branch
```

---

## Pull Request Workflow

### Langkah 1: Buat Branch

```bash
git checkout -b fitur-register
```

### Langkah 2: Commit Perubahan

```bash
git add .
git commit -m "feat: menambahkan halaman register"
```

### Langkah 3: Push ke GitHub

```bash
git push -u origin fitur-register
```

### Langkah 4: Buat Pull Request

1. Buka GitHub repository
2. Klik **"Compare & pull request"**
3. Isi deskripsi:
   ```markdown
   ## Deskripsi
   Menambahkan fitur registrasi user baru

   ## Perubahan
   - Menambah halaman register
   - Validasi form input
   - Simpan user ke database

   ## Testing
   - [ ] Register berhasil
   - [ ] Validasi email
   - [ ] Password strength check
   ```
4. Pilih reviewer
5. Klik **"Create pull request"**

### Langkah 5: Code Review

- Reviewer kasih komentar
- Kamu push commit baru untuk perbaikan
- Reviewer approve
- Merge ke main

---

## Merge vs Rebase

### Merge (Menyimpan history)

```bash
git checkout main
git merge fitur-login
```

```
main:    A---B---C
                  \
fitur:       D---E---F
```

Hasil:
```
main:    A---B---C---M
                  \ /
fitur:       D---E---F
```

### Rebase (Linear history)

```bash
git checkout fitur-login
git rebase main
```

```
main:    A---B---C
                  \
fitur:       D'---E'---F'
```

Hasil lebih bersih, history linear.

---

## Resolve Conflict

### Penyebab Conflict

Dua branch mengubah baris yang sama di file yang sama.

### Cara Resolve

```bash
# Pull latest dari main
git checkout main
git pull origin main

# Rebase ke main
git checkout fitur-login
git rebase main

# VS Code akan show conflict markers
<<<<<<< HEAD
kode dari main
=======
kode dari fitur-login
>>>>>>> fitur-login

# Edit file, pilih kode yang benar
# Hapus conflict markers

# Stage dan continue rebase
git add .
git rebase --continue

# Atau abort jika mau batal
git rebase --abort
```

---

## Git Alias (Shortcut)

Tambahkan ke `~/.gitconfig`:

```ini
[alias]
  s = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  lg = log --oneline --graph --decorate --all
  adog = log --all --oneline --graph --decorate
```

Cara pakai:
```bash
git s          # git status
git co main    # git checkout main
git ci -m "msg" # git commit -m "msg"
git lg         # git log dengan graph
```

---

## Reset, Revert, Restore

```bash
# Restore file ke state terakhir di HEAD
git restore filename.js

# Unstage file (hapus dari staging)
git restore --staged filename.js

# Revert commit (membuat commit baru yang undo)
git revert HEAD

# Reset (soft) — commit di-undo, tetap di staging
git reset --soft HEAD~1

# Reset (mixed) — commit di-undo, tidak di staging
git reset --mixed HEAD~1

# Reset (hard) — HAPUS semua perubahan (BERBAHAYA!)
git reset --hard HEAD~1
```

---

## Ringkasan

```
Git Workflow:
1. git checkout -b fitur-xxx   → Buat branch
2. git add . && git commit -m "msg" → Commit
3. git push -u origin fitur-xxx → Push
4. GitHub → Compare & pull request → Buat PR
5. Code review → Approve → Merge
6. git checkout main && git pull → Update main lokal
```
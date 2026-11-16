# CONTOH — GitHub Collaboration

## Contoh 1: Fork Repository

```
1. Buka https://github.com/facebook/react
2. Klik tombol "Fork" di kanan atas
3. Tunggu beberapa detik
4. Repository baru ada di:
   https://github.com/USERNAME/react
```

---

## Contoh 2: Clone dan Setup Remote

```bash
# Clone fork kita
$ git clone https://github.com/USERNAME/react.git
Cloning into 'react'...
$ cd react

# Lihat remote
$ git remote -v
origin  https://github.com/USERNAME/react.git (fetch)
origin  https://github.com/USERNAME/react.git (push)

# Tambahkan upstream (repo original)
$ git remote add upstream https://github.com/facebook/react.git

# Lihat semua remote
$ git remote -v
origin https://github.com/USERNAME/react.git (fetch)
origin    https://github.com/USERNAME/react.git (push)
upstream  https://github.com/facebook/react.git (fetch)
upstream  https://github.com/facebook/react.git (push)
```

---

## Contoh 3: Sync Fork dengan Upstream

```bash
# Ambil perubahan terbaru dari upstream
$ git fetch upstream

# Pindah ke main lokal
$ git checkout main

# Merge perubahan upstream ke main lokal
$ git merge upstream/main

# Push ke fork kita
$ git push origin main
```

---

## Contoh 4: Workflow Kontribusi

```bash
# 1. Pastikan main terkini
$ git checkout main
$ git pull origin main

# 2. Buat branch baru
$ git checkout -b fix/typo-readme

# 3. Edit file
$ echo "- typo fix" >> README.md

# 4. Commit
$ git add .
$ git commit -m "fix: perbaiki typo di README"

# 5. Push
$ git push -u origin fix/typo-readme

# 6. Buka GitHub → Buat Pull Request
```

---

## Contoh 5: Code Review Feedback

Sebagai reviewer, kamu bisa kasih feedback di PR:

```markdown
## Review Comments

### ✅ Yang bagus:
- Kode sudah bersih dan mudah dibaca
- Naming variable sudah deskriptif

### ⚠️ Yang perlu diperbaiki:
- Function `calculateTotal` terlalu panjang, pecah jadi beberapa function
- Missing error handling untuk kasus input kosong
- Tambahkan unit test untuk function tersebut

### 💡 Saran:
- Pertimbangkan pakai `reduce` daripada for loop di baris 45

---

**Status:** Changes Requested

Silakan perbaiki, lalu push ulang — saya akan review lagi.
```

---

## Contoh 6: Resolve Merge Conflict

```bash
# Saat PR punya konflik:
# 1. Fetch& merge upstream
$ git fetch upstream
$ git checkout main
$ git merge upstream/main

# 2. Pindah ke branch PR
$ git checkout fix/typo-readme

# 3. Rebase dari main
$ git rebase main

# 4. Jika ada konflik, edit file untuk resolve
# 5. Setelah resolve:
$ git add .
$ git rebase --continue

# 6. Push ulang (force push karena rebase)
$ git push --force-with-lease origin fix/typo-readme
```
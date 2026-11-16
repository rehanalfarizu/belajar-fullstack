# CONTOH — Git Dasar

## Contoh1: Inisialisasi Repository

### Terminal:
```bash
$ mkdir ~/proyek-belajar
$ cd ~/proyek-belajar
$ git init
Initialized empty Git repository in /Users/raihan/proyek-belajar/.git/

$ git status
On branch main
No commits yet
nothing to commit (create/copy files and use "git add" to track)
```

---

## Contoh 2: Workflow Lengkap

### Terminal:
```bash
# Buat file baru
$ cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Halaman Pertama</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
EOF

# Cek status → untracked
$ git status
Untracked files:
  index.html

# Add ke staging
$ git add index.html

# Cek status → staged
$ git status
Changes to be committed:
  index.html

# Commit
$ git commit -m "feat: halaman HTML pertama"
[main (root-commit) a1b2c3d] feat: halaman HTML pertama
 1 file changed, 10 insertions(+)
 create mode 100644 index.html

# Cek log
$ git log --oneline
a1b2c3d feat: halaman HTML pertama

# Push ke GitHub
$ git remote add origin https://github.com/USERNAME/proyek-belajar.git
$ git push -u origin main
```

---

## Contoh 3: Membatalkan Perubahan

```bash
# Ubah file
$ echo "text baru" >> index.html

# Cek perbedaannya
$ git diff index.html
+text baru

# Restore (batalkan perubahan)
$ git restore index.html

# Verifikasi — perubahan hilang
$ git diff index.html
# (tidak ada output = tidak ada perubahan)
```

---

## Contoh 4: Melihat Riwayat

```bash
# Log lengkap
$ git log
commit a1b2c3d (HEAD -> main)
Author: Muhammad Raihan <raihan@email.com>
Date:   Sat May 31 2026 10:00:00

 feat: halaman HTML pertama

# Log ringkas 1 baris
$ git log --oneline
a1b2c3d feat: halaman HTML pertama

# Log 3 commit terakhir
$ git log --oneline -3
a1b2c3d feat: halaman HTML pertama
```

---

## Contoh 5: Workflow Multi-File

```bash
# Buat beberapa file sekaligus
$ cat > style.css << 'EOF'
body { font-family: sans-serif; }
EOF

$ cat > app.js << 'EOF'
console.log("Hello!");
EOF

# Add semua file yang berubah
$ git add .

# Commit
$ git commit -m "feat: tambahkan CSS dan JS"
[main b2c3d4e] feat: tambahkan CSS dan JS
 2 files changed, 10 insertions(+)
 create mode 100644 style.css
 create mode 100644 app.js

# Lihat status
$ git status
On branch main
nothing to commit (working tree clean)
```

---

## Ringkasan Perintah

```
git init → inisialisasi repo baru
git status              → cek status file
git add<file>          → add ke staging
git add .               → add semua file
git commit -m "pesan"   → commit dengan pesan
git log → lihat riwayat
git log --oneline       → log ringkas
git diff                → lihat perubahan
git restore <file>       → undo perubahan
git remote add origin   → hubungkan ke GitHub
git push -u origin main → push pertama
```
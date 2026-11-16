# SOAL 01 — Git Dasar

## Tujuan
Memahami cara kerja Git: inisialisasi repo, cek status, add, commit, dan push ke remote.

---

## Briefing
Kamu akan membuat repository Git pertama, melakukan perubahan, dan mengirim ke GitHub.

---

## Persiapan

### 1. Buat Akun GitHub
Buka https://github.com, buat akun (kalau belum punya).

### 2. Buat Repository di GitHub
1. Klik **"+"** → **"New repository"**
2. Isi:
   - Name: `latihan-git-pertama`
   - Description: `Repository pertama belajar Git`
   - Public
   - ✅ Add a README file
3. Klik **Create repository**

---

## Soal

### SOAL 1: Inisialisasi Repository

Di terminal, buat folder baru dan inisialisasi Git:

```bash
# 1. Buat folder baru
mkdir ~/latihan-git-pertama
cd ~/latihan-git-pertama

# 2. Inisialisasi Git repository
git init

# 3. Cek status
git status
```

**Expected output:**
```
Initialized empty Git repository in /Users/raihan/latihan-git-pertama/.git/
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

---

### SOAL 2: Buat File dan Cek Status

```bash
# 1. Buat file README.md
cat > README.md << 'EOF'
# Latihan Git Pertama

Repository ini adalah latihan untuk memahami dasar-dasar Git.
EOF

# 2. Cek status lagi
git status
```

**Expected output:**
```
On branch main

No commits yet

Untracked files:
 (use "git add <file>..." to include in what will be committed)
 README.md
```

> File `README.md` muncul di bagian "Untracked files" — artinya Git belum kenal file ini.

---

### SOAL 3: Add ke Staging Area

```bash
# 1. Add file ke staging
git add README.md

# 2. Cek status
git status
```

**Expected output:**
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
    new file:   README.md
```

> File sekarang di "Changes to be committed" (staging area).

---

### SOAL 4: Commit (Simpan Perubahan)

```bash
# 1. Commit dengan pesan yang jelas
git commit -m "feat: file README pertama"

# 2. Cek status dan log
git status
git log --oneline
```

**Expected output:**
```
[main (root-commit) abc1234] feat: file README pertama
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
```

---

### SOAL 5: Push ke GitHub

```bash
# 1. Hubungkan folder lokal ke GitHub repository
git remote add origin https://github.com/USERNAME/latihan-git-pertama.git

# Ganti USERNAME dengan username GitHub kamu!

# 2. Push ke GitHub
git push -u origin main

# 3. Buka https://github.com/USERNAME/latihan-git-pertama
#    → File README.md sudah muncul!
```

---

## Catatan Penting

```
git status  → selalu cek ini sebelum dan sesudah ngapain
git log     → lihat riwayat commit
git diff    → lihat perubahan apa yang terjadi
```

Kalau error "Please tell me who you are", jalankan:
```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
```

---

## Checklist

```
□ git init berhasil (folder .git terbuat)
□ git status menunjukkan "Untracked files"
□ git add berhasil, status berubah ke "Changes to be committed"
□ git commit berhasil, muncul di git log
□ git push berhasil, file muncul di GitHub
```
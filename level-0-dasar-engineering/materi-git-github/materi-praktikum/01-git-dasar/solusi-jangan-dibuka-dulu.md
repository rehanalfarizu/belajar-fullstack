# Solusi — Latihan Git Dasar (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi perintah jadi. Coba dulu dari `git --help` dan hasil `git status` di terminal-mu, baru bandingkan di sini.

---


## Git Dasar — SOAL 1: Inisialisasi Repository

```bash
# 1. Buat folder baru
mkdir ~/latihan-git-pertama
cd ~/latihan-git-pertama

# 2. Inisialisasi Git repository
git init

# 3. Cek status
git status
```


## Git Dasar — SOAL 2: Buat File dan Cek Status

```bash
# 1. Buat file README.md
cat > README.md << 'EOF'
# Latihan Git Pertama

Repository ini adalah latihan untuk memahami dasar-dasar Git.
EOF

# 2. Cek status lagi
git status
```


## Git Dasar — SOAL 3: Add ke Staging Area

```bash
# 1. Add file ke staging
git add README.md

# 2. Cek status
git status
```


## Git Dasar — SOAL 4: Commit

```bash
# 1. Commit dengan pesan yang jelas
git commit -m "feat: file README pertama"

# 2. Cek status dan log
git status
git log --oneline
```


## Git Dasar — SOAL 5: Push ke GitHub

```bash
# 1. Hubungkan folder lokal ke GitHub repository
git remote add origin https://github.com/USERNAME/latihan-git-pertama.git

# Ganti USERNAME dengan username GitHub kamu!

# 2. Push ke GitHub
git push -u origin main

# 3. Buka https://github.com/USERNAME/latihan-git-pertama
#    → File README.md sudah muncul!
```

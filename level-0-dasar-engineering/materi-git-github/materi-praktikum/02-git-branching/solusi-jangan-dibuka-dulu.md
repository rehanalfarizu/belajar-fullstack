# Solusi — Latihan Git Branching (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi perintah jadi. Coba dulu sendiri dengan `git branch --help`, baru bandingkan di sini.

---


## Git Branching — SOAL 1: Lihat Branch Saat Ini

```bash
# Lihat semua branch lokal
git branch

# Lihat branch saat ini (ada tanda *)
* main
```


## Git Branching — SOAL 2: Buat Branch Baru

```bash
# Buat branch baru (tanpa pindah)
git branch feature/profil

# Lihat daftar branch — feature/profil sudah ada
git branch
  feature/profil
* main
```


## Git Branching — SOAL 3: Pindah Branch

```bash
# Pindah ke branch baru
git checkout feature/profil

# Alternatif modern:
# git switch feature/profil

# Cek — sekarang tanda * di feature/profil
git branch
* feature/profil
  main
```


## Git Branching — SOAL 4: Edit di Branch Baru

```bash
#1. Buat file profil.html
cat > profil.html << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Halaman Profil</title>
</head>
<body>
  <h1>Halaman Profil</h1>
  <p>Ini adalah halaman profil saya.</p>
</body>
</html>
EOF

# 2. Add + Commit
git add profil.html
git commit -m "feat: halaman profil"

# 3. Lihat log
git log --oneline
```


## Git Branching — SOAL 5: Merge Branch ke Main

```bash
# 1. Kembali ke main
git checkout main
# git switch main

# 2. Lihat isi folder main — profil.html TIDAK ada di sini
ls
# README.md  (profil.html belum ada)

# 3. Merge feature/profil ke main
git merge feature/profil

# 4. Cek isi folder main — sekarang profil.html ADA
ls
# README.md  profil.html

# 5. Hapus branch (sudah tidak diperlukan)
git branch -d feature/profil

# 6. Verifikasi
git branch
* main
```


## Git Branching — SOAL Bonus: Branch + Push ke GitHub

```bash
# 1. Buat branch baru
git checkout -b feature/kontak

# 2. Buat file kontak.html
cat > kontak.html << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kontak</title>
</head>
<body>
  <h1>Hubungi Saya</h1>
  <p>Email: email@kamu.com</p>
</body>
</html>
EOF

# 3. Add + Commit
git add .
git commit -m "feat: halaman kontak"

# 4. Push branch ke GitHub
git push -u origin feature/kontak

# 5. Buka GitHub → buat Pull Request → Merge
```

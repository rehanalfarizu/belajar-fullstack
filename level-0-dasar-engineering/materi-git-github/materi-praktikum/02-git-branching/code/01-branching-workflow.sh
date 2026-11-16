#!/bin/bash
# ============================================
# SOAL 01: Git Branching Workflow
# ============================================
# LATIHAN: Buat branch, edit, merge, hapus
# ============================================

# STEP 1: Setup repo (jika belum ada)
# mkdir ~/repo-branch && cd ~/repo-branch
# git init
# echo "# Repo Branching" > README.md
# git add . && git commit -m "feat: README pertama"

# STEP 2: Lihat branch saat ini
# git branch

# STEP 3: Buat branch baru
# git branch feature/profil

# STEP 4: Pindah ke branch baru
# git checkout feature/profil
# git switch feature/profil  # alternatif modern

# STEP 5: Buat file di branch baru
# cat > profil.html << 'EOF'
# <!DOCTYPE html>
# <html lang="id">
# <head>
#   <meta charset="UTF-8">
#   <title>Halaman Profil</title>
# </head>
# <body>
#   <h1>Halaman Profil</h1>
#   <p>Ini adalah halaman profil saya.</p>
# </body>
# </html>
# EOF

# STEP 6: Add + Commit
# git add profil.html
# git commit -m "feat: halaman profil"

# STEP 7: Kembali ke main
# git checkout main
# git switch main

# STEP 8: Merge branch ke main
# git merge feature/profil

# STEP 9: Hapus branch
# git branch -d feature/profil

# STEP 10: Verifikasi
# git branch
# ls  # profil.html seharusnya ada di main

echo "=== Branching workflow selesai ==="
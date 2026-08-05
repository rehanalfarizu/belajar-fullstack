#!/bin/bash
# ============================================
# SOAL 01: Workflow Git Dasar
# ============================================
# LATIHAN: Inisialisasi repo, add, commit, push
# ============================================

# STEP 1: Buat folder baru
# cd ~/Documents
# mkdir latihan-git-pertama
# cd latihan-git-pertama

# STEP 2: Inisialisasi Git
# git init

# STEP 3: Buat file README.md
# cat > README.md << 'EOF'
# # Latihan Git Pertama
# Repository ini adalah latihan untuk memahami dasar-dasar Git.
# EOF

# STEP 4: Cek status (seharusnya untracked)
# git status

# STEP 5: Add ke staging
# git add README.md

# STEP 6: Cek status (seharusnya staged)
# git status

# STEP 7: Commit
# git commit -m "feat: file README pertama"

# STEP 8: Lihat log
# git log --oneline

# STEP 9: Hubungkan ke GitHub (ganti USERNAME)
# git remote add origin https://github.com/USERNAME/latihan-git-pertama.git

# STEP 10: Push
# git push -u origin main

echo "=== Langkah selesai ==="
echo "Buka GitHub, cek repository — file README.md sudah muncul!"
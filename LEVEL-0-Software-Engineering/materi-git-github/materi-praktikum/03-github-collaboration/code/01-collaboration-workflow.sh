#!/bin/bash
# ============================================
# SOAL 01: GitHub Collaboration Workflow
# ============================================
# LATIHAN: Fork, Clone, Branch, PR, Merge
# ============================================

# STEP 1: Fork repository di GitHub
# Buka https://github.com/USERNAME/latihan-kontribusi
# Klik tombol "Fork"

# STEP 2: Clone fork ke komputer
# git clone https://github.com/USERNAME/latihan-kontribusi.git
# cd latihan-kontribusi

# STEP 3: Setup upstream (opsional)
# git remote add upstream https://github.com/ORIGINAL_OWNER/latihan-kontribusi.git

# STEP 4: Buat branch baru
# git checkout -b feature/saran-app

# STEP 5: Buat file saran.txt
# cat > saran.txt << 'EOF'
# # Saran Aplikasi
# 1. Tambahkan fitur dark mode
# 2. Perbaiki tampilan mobile
# 3. Tambahkan notifikasi email
# EOF

# STEP 6: Add + Commit
# git add saran.txt
# git commit -m "docs: tambahkan file saran aplikasi"

# STEP 7: Push branch ke fork
# git push -u origin feature/saran-app

# STEP 8: Buat Pull Request di GitHub
# Buka https://github.com/USERNAME/latihan-kontribusi
# Klik "Compare& pull request"
# Isi title & description
# Klik "Create pull request"

# STEP 9: Merge PR (sebagai owner)
# Buka PR di GitHub
# Klik "Merge pull request"
# Klik "Confirm merge"

echo "=== Collaboration workflow selesai ==="
echo "Sekarang kamu sudah bisa berkontribusi ke repository manapun!"
#!/bin/bash
# ============================================
# SOAL 01: GitHub Collaboration Workflow
# ============================================
# LATIHAN: Fork, Clone, Branch, PR, Merge
# ============================================

# STEP 1: Fork repository di GitHub (Jalur A saja)
# GitHub tidak mengizinkan fork repo milik sendiri.
# Jalur A: fork repo temanmu, https://github.com/PEMILIK_ASLI/latihan-kontribusi
# Jalur B: lewati, clone repo milikmu sendiri langsung

# STEP 2: Clone repo ke komputer (fork-mu di Jalur A, repo sendiri di Jalur B)
# git clone https://github.com/USERNAME/latihan-kontribusi.git
# cd latihan-kontribusi

# STEP 3: Setup upstream (opsional, hanya kalau punya fork)
# git remote add upstream https://github.com/PEMILIK_ASLI/latihan-kontribusi.git

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

# STEP 7: Push branch ke origin
# git push -u origin feature/saran-app

# STEP 8: Buat Pull Request di GitHub
# Buka https://github.com/USERNAME/latihan-kontribusi
# Klik "Compare & pull request"
# Isi title & description
# Klik "Create pull request"

# STEP 9: Review lalu merge PR (sebagai owner; Jalur A: temanmu)
# Buka PR di GitHub
# Klik "Merge pull request"
# Klik "Confirm merge"

echo "=== Collaboration workflow selesai ==="
echo "Sekarang kamu sudah bisa berkontribusi ke repository manapun!"
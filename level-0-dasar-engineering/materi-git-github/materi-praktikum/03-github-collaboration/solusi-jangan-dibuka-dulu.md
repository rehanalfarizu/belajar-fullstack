# Solusi — Latihan GitHub Collaboration (JANGAN DIBUKA DULU)

> **Peringatan:** file ini berisi perintah jadi. Coba dulu dari dokumentasi GitHub dan `git --help`, baru bandingkan di sini.

---


## GitHub Collaboration — SOAL 2: Clone Repository

```bash
# 1. Clone repository fork ke komputer
git clone https://github.com/USERNAME/latihan-kontribusi.git

# 2. Masuk ke folder
cd latihan-kontribusi

# 3. Lihat remote — seharusnya menunjuk ke repo yang kamu clone (fork-mu di Jalur A)
git remote -v
```


## GitHub Collaboration — SOAL 3: Buat Branch dan Edit

```bash
# 1. Buat branch baru
git checkout -b feature/saran-app

# 2. Buat file saran.txt
cat > saran.txt << 'EOF'
# Saran Aplikasi

Berikut saran untuk meningkatkan aplikasi:

1. Tambahkan fitur dark mode
2. Perbaiki tampilan mobile
3. Tambahkan notifikasi email
EOF

# 3. Add + Commit
git add saran.txt
git commit -m "docs: tambahkan file saran aplikasi"

# 4. Push branch ke origin (fork-mu di Jalur A, repo sendiri di Jalur B)
git push -u origin feature/saran-app
```


## GitHub Collaboration — SOAL Bonus: Setup Upstream

```bash
# 1. Tambahkan remote upstream (repo original)
git remote add upstream https://github.com/PEMILIK_ASLI/latihan-kontribusi.git

# 2. Sinkronkan dengan repo original
git fetch upstream

# 3. Merge perubahan dari upstream ke main lokal
git checkout main
git merge upstream/main

# 4. Push ke fork kita
git push origin main
```

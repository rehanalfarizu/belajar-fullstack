# SOAL 01 — GitHub Collaboration

## Tujuan
Memahami workflow kolaborasi: Fork, Clone, Pull Request, dan Code Review.

---

## Briefing
Kamu akan berkontribusi ke repository orang lain (atau repository latihan) menggunakan Fork dan Pull Request — seperti workflow di dunia kerja nyata.

---

## Persiapan

1. Login ke GitHub
2. Buka https://github.com
3. Buat repository baru bernama `latihan-kontribusi` (Public, ✅ Add README)

---

## Soal

### SOAL 1: Fork Repository

```bash
# 1. Buka repository latihan-kontribusi di GitHub
#    https://github.com/USERNAME/latihan-kontribusi

# 2. Klik tombol "Fork" di kanan atas
#    Repository sekarang ada di akun kamu:
#    https://github.com/USERNAME/latihan-kontribusi
```

---

### SOAL 2: Clone Repository Fork

```bash
# 1. Clone repository fork ke komputer
git clone https://github.com/USERNAME/latihan-kontribusi.git

# 2. Masuk ke folder
cd latihan-kontribusi

# 3. Lihat remote — seharusnya menunjuk ke fork kita
git remote -v
```

**Expected output:**
```
origin https://github.com/USERNAME/latihan-kontribusi.git (fetch)
origin  https://github.com/USERNAME/latihan-kontribusi.git (push)
```

---

### SOAL 3: Buat Branch dan Edit

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

# 4. Push branch ke fork kita
git push -u origin feature/saran-app
```

---

### SOAL 4: Buat Pull Request

```bash
# 1. Buka GitHub di browser
#    https://github.com/USERNAME/latihan-kontribusi

# 2. GitHub otomatis menampilkan banner:
#    "feature/saran-app had recent pushes"
#    Klik tombol "Compare & pull request"

# 3. Isi Pull Request:
#    - Title: "docs: tambahkan file saran aplikasi"
#    - Description: "Saya menambahkan file saran untuk perbaikan aplikasi"
#    - Base repository: USERNAME/latihan-kontribusi
#    - Base branch: main
#    - Head repository: USERNAME/latihan-kontribusi
#    - Head branch: feature/saran-app

# 4. Klik "Create pull request"
```

---

### SOAL 5: Merge Pull Request (Sebagai Owner)

```bash
# Sebagai owner repository:
# 1. Buka https://github.com/USERNAME/latihan-kontribusi
# 2. Klik tab "Pull requests"
# 3. Klik PR yang baru dibuat
# 4. Review perubahan
# 5. Klik "Merge pull request"
# 6. Klik "Confirm merge"
# 7. Branch sudah masuk ke main!
```

---

## Bonus: Setup Upstream (Sinkronisasi dengan Repo Original)

```bash
# 1. Tambahkan remote upstream (repo original)
git remote add upstream https://github.com/ORIGINAL_OWNER/latihan-kontribusi.git

# 2. Sinkronkan dengan repo original
git fetch upstream

# 3. Merge perubahan dari upstream ke main lokal
git checkout main
git merge upstream/main

# 4. Push ke fork kita
git push origin main
```

---

## Ringkasan Workflow

```
1. FORK    → Salin repo orang lain ke akun kita
2. CLONE   → Download ke komputer
3. BRANCH  → Buat branch baru
4. EDIT    → Ubah kode
5. COMMIT  → Simpan perubahan
6. PUSH    → Kirim ke fork kita
7. PR      → Minta merge ke repo original
8. REVIEW  → Owner review & merge
```

---

## Checklist

```
□ Fork repository berhasil
□ Clone fork ke komputer berhasil
□ git remote -v menampilkan origin yang benar
□ Branch feature/saran-app berhasil dibuat
□ File saran.txt di-commit dan di-push
□ Pull Request berhasil dibuat di GitHub
□ Pull Request berhasil di-merge
```
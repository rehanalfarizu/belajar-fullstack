# TUTORIAL 02 — Git & GitHub: Langkah Praktis

## Tujuan
Latihan step-by-step untuk menguasai alur kerja Git sehari-hari.

---

## Prasyarat
- Git sudah terinstall (`git --version` jalan)
- Akun GitHub sudah dibuat di https://github.com

---

## Langkah 1: Setup Awal (Sekali Doang)

```bash
# Ganti dengan data kamu sendiri
git config --global user.name "Muhammad Raihan Alfarizi"
git config --global user.email "emailkamu@domain.com"

# Verifikasi
git config --list
```

---

## Langkah 2: Buat Repo Baru (Local)

```bash
# Buat folder project
mkdir belajar-git
cd belajar-git

# Inisialisasi Git
git init
# Output: Initialized empty Git repository in .../.git/
```

---

## Langkah 3: Cek Status

```bash
git status
# Akan muncul: "No commits yet"
# Belum ada file yang di-track
```

---

## Langkah 4: Buat File Pertama & Commit

```bash
# Buat file README
echo "# Belajar Git" > README.md

# Cek status lagi — sekarang ada file baru (untracked = merah)
git status

# Add file ke staging
git add README.md

# Cek status — HIJAU = staged, siap di-commit
git status

# Commit
git commit -m "feat: menambahkan README"
```

---

## Langkah 5: Lihat Riwayat

```bash
git log
git log --oneline              # versi ringkas
git log --oneline --graph       # dengan visualisasi branch
```

---

## Langkah 6: Branching — Kerja di Fitur Baru

```bash
# Buat branch baru + langsung pindah
git checkout -b fitur-dark-mode

# Di branch baru, edit file
echo "/* Dark Mode */" > dark.css
git add dark.css
git commit -m "feat: menambahkan dark mode"

# Kembali ke main
git checkout main

# Merge branch fitur ke main
git merge fitur-dark-mode

# Hapus branch fitur (sudah selesai)
git branch -d fitur-dark-mode
```

---

## Langkah 7: Push ke GitHub

```bash
# Buka https://github.com → "+" → "New repository"
# Isi nama repo: belajar-git
# Jangan centang "Initialize with README"
# Klik "Create repository"

# Hubungkan repo lokal dengan remote GitHub
git remote add origin https://github.com/USERNAME/belajar-git.git

# Push ke GitHub (pertama kali)
git push -u origin main

# Setelah itu cukup:
git push
```

---

## Langkah 8: Clone Repo yang Sudah Ada

```bash
# Keluar dari folder sekarang
cd ..

# Clone repo dari GitHub
git clone https://github.com/USERNAME/belajar-git.git

# Masuk ke folder hasil clone
cd belajar-git
```

---

## Langkah 9: Update & Pull dari GitHub

```bash
# Tarik perubahan terbaru ke komputer
git pull origin main
```

---

## Langkah 10: .gitignore — Abaikan File

```bash
# Buat file .gitignore
touch .gitignore
```

Contoh `.gitignore` untuk project Node.js:
```gitignore
node_modules/
.env
.DS_Store
*.log
```

---

## Langkah 11: Undo / Rollback

```bash
# Batalkan perubahan di file (belum di-commit)
git checkout -- nama-file.txt
# atau
git restore nama-file.txt

# Batalkan staging
git reset HEAD nama-file.txt

# Batalkan commit terakhir (perubahan tetap ada)
git reset --soft HEAD~1

# Batalkan commit + hapus perubahan
git reset --hard HEAD~1
```

---

## Langkah 12: Stash — Simpan Perubahan Sementara

```bash
# Lagi edit tapi perlu switch branch urgent?
git stash
# → perubahan disembunyikan

# Lihat daftar stash
git stash list

# Kembalikan perubahan
git stash pop
```

---

## Cek Pemahaman

Jalankan perintah ini dan cek outputnya:

```bash
git status
git log --oneline
git branch -a
git remote -v
```

---

## Tantangan Latihan

1. Buat repo baru, init Git, buat 3 commit
2. Buat branch `fitur-login`, commit di branch itu
3. Merge ke main, push ke GitHub
4. Clone repo kamu ke folder berbeda
5. Buat perubahan, commit, push
6. Pull perubahan dari komputer pertama

---

**Lanjut ke:** `materi-praktikum/01-latihan-html/` untuk mulai belajar HTML.

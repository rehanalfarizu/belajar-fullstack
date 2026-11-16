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

Di terminal: buat folder baru bernama `latihan-git-pertama` di home directory, masuk ke dalamnya, jadikan folder itu repository Git, lalu cek statusnya.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Dasar — SOAL 1: Inisialisasi Repository".
>
> Pertanyaan pemandu: perintah apa yang membuat folder `.git`, dan perintah apa yang memberi tahu kamu kondisi repo saat ini?

**Expected output:**
```
Initialized empty Git repository in /Users/raihan/latihan-git-pertama/.git/
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

---

### SOAL 2: Buat File dan Cek Status

Buat file `README.md` berisi judul "Latihan Git Pertama" dan satu kalimat penjelasan, lalu cek status lagi.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Dasar — SOAL 2: Buat File dan Cek Status".
>
> Pertanyaan pemandu: kenapa file baru muncul sebagai "Untracked", dan apa artinya buat Git?

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

Masukkan `README.md` ke staging area, lalu cek status.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Dasar — SOAL 3: Add ke Staging Area".
>
> Pertanyaan pemandu: apa bedanya working directory, staging area, dan repository, dan perintah mana yang memindahkan file antar ketiganya?

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

Simpan perubahan dengan commit berpesan jelas ("feat: file README pertama"), lalu cek status dan riwayat commit dalam satu baris per commit.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Dasar — SOAL 4: Commit".
>
> Pertanyaan pemandu: bagaimana cara menulis pesan commit lewat satu perintah, dan perintah apa yang menampilkan riwayat ringkas?

**Expected output:**
```
[main (root-commit) abc1234] feat: file README pertama
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
```

---

### SOAL 5: Push ke GitHub

Hubungkan folder lokal ke repository GitHub `latihan-git-pertama` milikmu dengan nama remote `origin`, lalu push branch `main`. Setelah itu buka GitHub dan pastikan `README.md` muncul.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Dasar — SOAL 5: Push ke GitHub".
>
> Pertanyaan pemandu: apa yang dilakukan remote `origin`, dan kenapa push pertama butuh opsi untuk mengatur upstream?

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
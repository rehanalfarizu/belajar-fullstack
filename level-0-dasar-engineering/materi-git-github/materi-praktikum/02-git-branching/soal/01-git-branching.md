# SOAL 01 — Git Branching

## Tujuan
Memahami cara kerja branch: buat, switch, merge, dan hapus.

---

## Briefing
Kamu akan membuat fitur baru di branch terpisah, lalu menggabungkan ke main — simulasi workflow tim.

---

## Persiapan

Pastikan ada repository yang sudah di-commit. Kalau belum, buat dulu:
```bash
mkdir ~/repo-branch
cd ~/repo-branch
git init
echo "# Repo Branching" > README.md
git add .
git commit -m "feat: README pertama"
```

---

## Soal

### SOAL 1: Lihat Branch Saat Ini

Lihat semua branch lokal. Output yang diharapkan: satu branch, `main`, bertanda `*`.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Branching — SOAL 1: Lihat Branch Saat Ini".
>
> Pertanyaan pemandu: tanda `*` di daftar branch menunjukkan apa?

---

### SOAL 2: Buat Branch Baru

Buat branch baru bernama `feature/profil` tanpa pindah ke sana, lalu lihat daftar branch. Output yang diharapkan: `feature/profil` sudah ada, tanda `*` masih di `main`.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Branching — SOAL 2: Buat Branch Baru".
>
> Pertanyaan pemandu: apa bedanya membuat branch dengan pindah ke branch itu?

---

### SOAL 3: Pindah Branch

Pindah ke `feature/profil` (ada dua perintah yang bisa dipakai: yang klasik dan yang modern), lalu cek daftar branch. Output yang diharapkan: tanda `*` sekarang di `feature/profil`.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Branching — SOAL 3: Pindah Branch".
>
> Pertanyaan pemandu: dua perintah apa yang bisa memindahkan branch, dan apa bedanya?

---

### SOAL 4: Edit di Branch Baru

Di branch `feature/profil`: buat file `profil.html` berisi halaman HTML sederhana dengan judul "Halaman Profil" dan satu paragraf, tambahkan ke staging, commit dengan pesan "feat: halaman profil", lalu lihat log ringkas.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Branching — SOAL 4: Edit di Branch Baru".
>
> Pertanyaan pemandu: kalau kamu pindah ke `main` sekarang, apakah `profil.html` ada di folder? Kenapa?

---

### SOAL 5: Merge Branch ke Main

Kembali ke `main` dan buktikan `profil.html` belum ada di folder. Gabungkan `feature/profil` ke `main`, buktikan file-nya kini ada, hapus branch fitur yang sudah tidak dipakai, lalu verifikasi daftar branch. Output yang diharapkan: tinggal `main`.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Branching — SOAL 5: Merge Branch ke Main".
>
> Pertanyaan pemandu: di branch mana kamu harus berdiri saat menjalankan merge, dan kenapa `git branch -d` aman dipakai setelah merge?

---

## Bonus: Branch + Push ke GitHub

Buat dan pindah ke branch `feature/kontak` dalam satu perintah, buat file `kontak.html` sederhana (judul "Hubungi Saya", satu baris email), commit, lalu push branch itu ke GitHub dengan upstream. Setelah itu buka GitHub, buat Pull Request, dan merge.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "Git Branching — SOAL Bonus: Branch + Push ke GitHub".
>
> Pertanyaan pemandu: perintah mana yang membuat sekaligus pindah branch, dan kenapa push branch baru butuh opsi upstream?

---

## Ringkasan Perintah

```
git branch              → daftar branch
git branch <nama>       → buat branch baru
git checkout <branch>   → pindah branch
git checkout -b <nama>  → buat + pindah sekaligus
git switch <branch>     → (modern) pindah branch
git switch -c <nama>    → (modern) buat + pindah
git merge <branch>      → gabung branch ke branch saat ini
git branch -d <branch>  → hapus branch lokal
git push -u origin <nama> → push branch ke remote
```

---

## Checklist

```
□ git branch melihat branch main
□ git branch feature/profil berhasil dibuat
□ git checkout feature/profil berhasil pindah
□ File profil.html di-commit di branch fitur
□ git merge feature/profil ke main berhasil
□ git branch -d feature/profil berhasil dihapus
```
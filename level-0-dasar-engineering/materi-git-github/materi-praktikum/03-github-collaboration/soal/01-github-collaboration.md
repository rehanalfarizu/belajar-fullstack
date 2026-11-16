# SOAL 01 — GitHub Collaboration

## Tujuan
Memahami workflow kolaborasi: Fork, Clone, Pull Request, dan Code Review.

---

## Briefing
Kamu akan berkontribusi ke repository orang lain (atau repository latihan) menggunakan Fork dan Pull Request — seperti workflow di dunia kerja nyata.

---

## Persiapan

GitHub **tidak mengizinkan kamu mem-fork repo milikmu sendiri** ke akun yang sama. Jadi ada dua jalur. Pilih satu dulu, dan ikuti catatan "Jalur A" atau "Jalur B" di setiap soal.

**Jalur A: berdua dengan teman (paling mirip dunia kerja)**

1. Temanmu membuat repository `latihan-kontribusi` di akunnya (Public, centang Add README).
2. Kamu mem-fork repo itu. Temanmu yang me-review dan me-merge PR-mu.
3. Setelah selesai, tukar peran.

**Jalur B: sendirian**

1. Buat repository `latihan-kontribusi` di akunmu (Public, centang Add README).
2. Lewati fork. Kamu clone repo itu langsung, lalu buat PR dari branch ke `main` di repo yang sama.
3. Fork sungguhan dilatih terpisah di repo latihan publik untuk pemula, misalnya [first-contributions](https://github.com/firstcontributions/first-contributions).

Di bawah, `USERNAME` adalah pemilik repo yang kamu clone: akunmu sendiri di Jalur B, atau **akunmu** (hasil fork) di Jalur A. `PEMILIK_ASLI` adalah akun temanmu di Jalur A.

---

## Soal

### SOAL 1: Fork Repository (Jalur A saja)

```bash
# 1. Buka repository milik temanmu di GitHub
#    https://github.com/PEMILIK_ASLI/latihan-kontribusi

# 2. Klik tombol "Fork" di kanan atas
#    Repository sekarang ada juga di akunmu:
#    https://github.com/USERNAME/latihan-kontribusi
```

**Jalur B:** lewati soal ini. Tulis di catatanmu satu kalimat: kenapa kamu tidak bisa mem-fork repo milikmu sendiri, dan apa bedanya fork dengan branch.

---

### SOAL 2: Clone Repository

Jalur A: clone fork-mu. Jalur B: clone repo milikmu sendiri.

Clone repository (fork-mu di Jalur A, repo milikmu sendiri di Jalur B) ke komputer, masuk ke foldernya, lalu lihat remote yang terdaftar. Seharusnya `origin` menunjuk ke repo yang kamu clone.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "GitHub Collaboration — SOAL 2: Clone Repository".
>
> Pertanyaan pemandu: dari mana kamu mendapat URL untuk clone, dan perintah apa yang menampilkan daftar remote?

**Expected output:**
```
origin https://github.com/USERNAME/latihan-kontribusi.git (fetch)
origin  https://github.com/USERNAME/latihan-kontribusi.git (push)
```

---

### SOAL 3: Buat Branch dan Edit

Buat branch `feature/saran-app` dan pindah ke sana, buat file `saran.txt` berisi judul "Saran Aplikasi" dan tiga saran (dark mode, tampilan mobile, notifikasi email), commit dengan pesan "docs: tambahkan file saran aplikasi", lalu push branch ke `origin` dengan upstream.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "GitHub Collaboration — SOAL 3: Buat Branch dan Edit".
>
> Pertanyaan pemandu: kenapa kamu bekerja di branch baru dan bukan langsung di `main`, dan apa yang muncul di GitHub setelah push?

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
#    - Base repository:
#        Jalur A: PEMILIK_ASLI/latihan-kontribusi (repo temanmu)
#        Jalur B: USERNAME/latihan-kontribusi (repo yang sama)
#    - Base branch: main
#    - Head repository: USERNAME/latihan-kontribusi
#    - Head branch: feature/saran-app

# 4. Klik "Create pull request"
```

---

### SOAL 5: Review dan Merge Pull Request

Jalur A: temanmu yang menjadi owner dan me-merge PR-mu. Jalur B: kamu sendiri owner-nya.

```bash
# Sebagai owner repository:
# 1. Buka repository di GitHub
# 2. Klik tab "Pull requests"
# 3. Klik PR yang baru dibuat
# 4. Buka tab "Files changed", tulis minimal satu komentar di baris tertentu
# 5. Klik "Merge pull request"
# 6. Klik "Confirm merge"
# 7. Branch sudah masuk ke main!
```

---

## Bonus: Setup Upstream (Sinkronisasi dengan Repo Original)

Hanya bermakna kalau kamu punya fork (Jalur A, atau latihan di first-contributions). Di Jalur B murni, `origin` sudah repo aslinya, jadi cukup `git pull`.

Tambahkan repo original sebagai remote kedua bernama `upstream`, ambil perubahannya, gabungkan ke `main` lokal, lalu push `main` ke fork-mu.

> Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di [`../solusi-jangan-dibuka-dulu.md`](../solusi-jangan-dibuka-dulu.md), bagian "GitHub Collaboration — SOAL Bonus: Setup Upstream".
>
> Pertanyaan pemandu: apa bedanya `fetch` dan `pull`, dan kenapa remote kedua dinamai `upstream`, bukan `origin`?

---

## Ringkasan Workflow

```
1. FORK    → Salin repo orang lain ke akun kita (Jalur A; di Jalur B dilewati)
2. CLONE   → Download ke komputer
3. BRANCH  → Buat branch baru
4. EDIT    → Ubah kode
5. COMMIT  → Simpan perubahan
6. PUSH    → Kirim ke fork kita (Jalur B: ke repo sendiri)
7. PR      → Minta merge ke repo original (Jalur B: ke main repo yang sama)
8. REVIEW  → Owner review & merge
```

---

## Checklist

```
□ Jalur A: fork repository teman berhasil. Jalur B: soal 1 dilewati dan alasannya tertulis
□ Clone fork ke komputer berhasil
□ git remote -v menampilkan origin yang benar (fork-mu di Jalur A, repo sendiri di Jalur B)
□ Branch feature/saran-app berhasil dibuat
□ File saran.txt di-commit dan di-push
□ Pull Request berhasil dibuat di GitHub
□ Pull Request punya minimal satu komentar review, lalu berhasil di-merge
```
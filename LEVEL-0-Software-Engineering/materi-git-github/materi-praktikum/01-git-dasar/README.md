# Materi Praktikum 01 — Git Dasar

## Tujuan Pembelajaran

Setelah menyelesaikan modul ini, kamu akan mampu:
- Menginstall dan mengkonfigurasi Git
- Menginisialisasi repository baru
- Melakukan workflow dasar: add → commit → push
- Memahami perbedaan working directory, staging, dan repository

---

## Alur Kerja

```
1. READ     → Baca soal/01-git-dasar.md
2. OBSERVE  → Buka materi-teori/README.md jika lupa konsep
3. TYPE     → Ketik semua perintah dari 0 di terminal
4. VERIFY   → Cek hasilnya (git status, git log, GitHub)
5. EXPERIMENT → Ubah-ubah, break, lalu fix
```

---

## Format Perintah

Di setiap soal, perintah yang kamu ketik akan terlihat seperti:
```bash
# Komentar — penjelas
git init                # perintah yang diketik
```

Hasil output dari terminal akan terlihat seperti:
```
Initialized empty Git repository in /Users/raihan/proyek-saya/.git/
```

---

## Sebelum Mulai

Pastikan Git sudah terinstall:
```bash
git --version
```
Kalau belum, lihat `software/README.md` untuk panduan install.

Konfigurasi awal (sekali saja, global):
```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
```

---

**Target: 5/5 soal dikerjakan → Fondasi Git SOLID!**
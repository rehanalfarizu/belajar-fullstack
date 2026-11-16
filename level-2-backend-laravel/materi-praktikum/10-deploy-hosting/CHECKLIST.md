# CHECKLIST — 10 Deploy dan Hosting

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda `.env` dan `.env.example`
- [ ] Aku bisa menyebut minimal 3 hal yang bocor kalau `APP_DEBUG=true`
- [ ] Aku paham kenapa web root harus folder `public/`
- [ ] Aku paham kenapa `env()` hanya boleh dipakai di folder `config/`
- [ ] Aku tahu langkah pertama saat `.env` terlanjur ter-commit (ganti rahasia, bukan hapus file)
- [ ] Aku paham beda maintenance mode, rollback, dan restore backup

---

## Kemampuan Praktis

- [ ] Aku bisa menulis script yang gagal dengan exit code benar saat konfigurasi berbahaya
- [ ] Aku bisa memeriksa file yang dilacak Git dengan `git ls-files`
- [ ] Aku bisa membuat halaman `errors/500.blade.php` sendiri
- [ ] Aku bisa menulis `deploy.sh` dengan `set -euo pipefail` dan `trap`
- [ ] Aku bisa menjalankan script dalam mode `DRY_RUN` dan membaca hasilnya
- [ ] Aku bisa menemukan detail error di `storage/logs/laravel.log`

---

## Best Practices

- [ ] `.env` ada di `.gitignore`, `.env.example` berisi placeholder saja
- [ ] `APP_ENV=production` dan `APP_DEBUG=false` di server
- [ ] Output script dan log tidak pernah mencetak nilai rahasia
- [ ] Path dari input selalu di-escape sebelum masuk perintah shell
- [ ] `migrate:fresh` tidak pernah dijalankan di production
- [ ] Ada rencana rollback tertulis sebelum deploy

---

## Siap Lanjut?

Kalau semua item "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang:

- Kerjakan [tutorial end-to-end](../../tutorial/README.md)
- Audit aplikasimu di [Modul Keamanan 08 — Proyek Akhir Audit](../../../modul-keamanan-web/08-proyek-akhir-audit/README.md)

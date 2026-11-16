# CHECKLIST — Git Dasar

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda working directory, staging area, dan repository dengan gambar sendiri
- [ ] Aku paham arti "Untracked files", "Changes to be committed", dan "Changes not staged for commit"
- [ ] Aku paham kenapa ada staging area (tidak langsung commit semua perubahan)
- [ ] Aku bisa menjelaskan beda repo lokal dan remote (`origin`)
- [ ] Aku paham arti `-u` di `git push -u origin main`
- [ ] Aku paham bahwa yang sudah di-commit dan di-push ke repo publik bisa dilihat siapa saja, termasuk riwayat lamanya

---

## Kemampuan Praktis

- [ ] Aku bisa mengatur `user.name` dan `user.email` Git
- [ ] Aku bisa membuat repo baru, menambah file, staging, dan commit tanpa melihat catatan
- [ ] Aku bisa menghubungkan repo lokal ke GitHub dan push
- [ ] Aku bisa login ke GitHub dari terminal (SSH key atau personal access token)
- [ ] Aku bisa membaca `git status`, `git log --oneline`, dan `git remote -v` untuk tahu keadaan repo
- [ ] Aku bisa mengatasi push yang ditolak dengan membaca pesan error-nya

---

## Kebiasaan Baik

- [ ] Aku menjalankan `git status` sebelum dan sesudah setiap perintah yang mengubah sesuatu
- [ ] Pesan commit-ku menjelaskan apa yang berubah (`feat: ...`, `fix: ...`), bukan "update" atau "asdf"
- [ ] Aku menebak output dulu sebelum menjalankan perintah, lalu mencatat bedanya
- [ ] Aku tidak pernah meng-commit password, token, atau file `.env`, dan aku tahu `.gitignore` gunanya untuk apa
- [ ] Aku tidak membuat repo Git di dalam repo Git lain tanpa sengaja

Kenapa poin `.env` sangat penting? Baca bagian environment variables di
[Konfigurasi Aman](../../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[Git Branching](../02-git-branching/README.md).

# CHECKLIST — Git Branching

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan branch dengan gambar: titik commit dan penunjuk nama branch
- [ ] Aku paham kenapa file bisa "hilang" saat pindah branch, dan bahwa sebenarnya tidak hilang
- [ ] Aku bisa menjelaskan beda `git branch <nama>`, `git checkout <nama>`, `git checkout -b`, dan `git switch -c`
- [ ] Aku paham kapan merge menjadi fast-forward dan kapan membuat merge commit
- [ ] Aku paham kenapa merge conflict terjadi
- [ ] Aku paham beda `git branch -d` dan `-D`, dan kenapa `-d` kadang menolak

---

## Kemampuan Praktis

- [ ] Aku bisa membuat branch, commit di sana, lalu merge ke `main` tanpa melihat catatan
- [ ] Aku bisa membaca `git log --oneline --graph --all` dan menjelaskannya
- [ ] Aku bisa membuat merge conflict dengan sengaja dan menyelesaikannya sendiri
- [ ] Aku bisa membatalkan merge yang kacau dengan `git merge --abort`
- [ ] Aku bisa push branch ke GitHub dan membuat Pull Request

---

## Kebiasaan Baik

- [ ] Aku selalu cek branch aktif sebelum mulai mengedit
- [ ] Nama branch-ku menjelaskan isinya (`feature/...`, `fix/...`)
- [ ] Satu branch untuk satu fitur atau perbaikan
- [ ] Aku menghapus branch yang sudah di-merge
- [ ] Sebelum push branch, aku cek isi commit dengan `git diff main` supaya tidak ada password atau file rahasia ikut terkirim

File rahasia yang terlanjur ter-push tetap ada di riwayat walaupun dihapus belakangan. Baca
[Konfigurasi Aman](../../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, lanjut ke
[GitHub Collaboration](../03-github-collaboration/README.md).

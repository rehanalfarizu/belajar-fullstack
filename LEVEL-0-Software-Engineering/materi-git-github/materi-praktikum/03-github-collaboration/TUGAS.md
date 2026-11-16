# TUGAS — GitHub Collaboration

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Satu Pull Request yang kamu buat, di-review, lalu di-merge.
2. Pengalaman memakai alur fork → clone → branch → commit → push → PR, dengan `origin` dan `upstream` yang benar.
3. Satu komentar review yang kamu tulis sendiri di PR (milikmu atau milik teman).

---

## Daftar Soal

Semua soal ada di satu file, [soal/01-github-collaboration.md](soal/01-github-collaboration.md), dibagi
jadi 5 bagian plus bonus. Tidak ada file kode yang diedit: kamu bekerja di hasil clone, di folder **di luar
repo belajar ini** (misalnya `~/latihan-kontribusi`). File `saran.txt` dibuat di folder clone itu.

File `LEVEL-0-Software-Engineering/materi-git-github/materi-praktikum/03-github-collaboration/code/01-collaboration-workflow.sh`
berisi daftar langkah dalam bentuk komentar. Pakai sebagai peta, bukan untuk di-copy-paste.

| Bagian | Isi | Tempat kerja | Estimasi |
| --- | --- | --- | --- |
| Persiapan | Repo `latihan-kontribusi` di GitHub | browser | 10 menit |
| SOAL 1 | Fork repository | browser | 10 menit |
| SOAL 2 | Clone fork, cek remote | `~/latihan-kontribusi` | 10 menit |
| SOAL 3 | Branch, edit, commit, push | `~/latihan-kontribusi/saran.txt` | 15 menit |
| SOAL 4 | Buat Pull Request | browser | 15 menit |
| SOAL 5 | Review dan merge PR sebagai owner | browser | 15 menit |
| Bonus | Sinkronisasi dengan `upstream` | terminal | 20 menit |

Estimasi di atas perkiraan, karena soal tidak mencantumkan waktu.

**Penting sebelum mulai:** GitHub tidak mengizinkan kamu mem-fork repo milikmu sendiri ke akun yang sama.
Jadi Persiapan + SOAL 1 di soal tidak bisa dijalankan persis seperti tertulis kalau kamu sendirian.
Pilih salah satu:

- **Berdua dengan teman (paling mirip dunia kerja):** teman membuat repo `latihan-kontribusi`, kamu
  fork repo milik teman. Teman yang me-review dan merge PR-mu. Lalu tukar peran.
- **Sendirian:** lewati fork. Clone repo milikmu sendiri, kerjakan SOAL 3-5 (PR dari branch ke `main`
  di repo yang sama). Lalu latih fork sungguhan di repo latihan publik yang memang dibuat untuk pemula,
  misalnya [first-contributions](https://github.com/firstcontributions/first-contributions).

---

## Langkah Pengerjaan

1. **Baca seluruh soal sekali**, termasuk diagram "Ringkasan Workflow".
2. **Tutup soalnya, gambar dulu.** Tiga kotak: repo asli, fork di akunmu, folder di laptop. Beri label
   panah: fork, clone, push, PR. Tandai mana yang disebut `origin` dan mana `upstream`.
3. **Tebak sebelum mengetik.** Contoh: sebelum `git remote -v`, tulis alamat apa yang menurutmu akan muncul.
4. **Kerjakan bagian demi bagian.** Setelah push, cek GitHub di browser. Setelah PR dibuat, baca tab
   **Files changed**.
5. **Review sungguhan.** Sebelum merge, tulis minimal satu komentar di baris tertentu di tab Files changed.
   Pakai format "yang bagus / yang perlu diperbaiki / saran".
6. Catat semuanya di `latihan-saya/01-fondasi/minggu-01/catatan-git.md`.

---

## Petunjuk Kalau Macet

### Tingkat 1 — remote yang mana?

- `git remote -v` menunjukkan ke mana `push` dan `fetch` pergi. Kalau `origin` menunjuk ke repo asli
  (bukan fork-mu), push akan ditolak karena kamu tidak punya izin.
- Push `Permission denied` atau `403`? Cek dua hal: alamat `origin`, dan cara login (SSH key atau token,
  lihat petunjuk di latihan Git Dasar).

### Tingkat 2 — PR tidak muncul seperti di soal

- Banner "Compare & pull request" tidak muncul? Buka tab **Pull requests** → **New pull request**, lalu
  atur base dan compare secara manual. Perhatikan baik-baik repo dan branch di kedua sisi.
- PR berisi perubahan yang tidak kamu kenal? Kamu membuat branch dari commit yang salah. Cek dengan
  `git log --oneline --graph --all`.

### Tingkat 3 — bonus upstream

- `git fetch upstream` gagal? Cek `git remote -v`: `upstream` sudah ditambahkan dan alamatnya benar?
- Konflik saat merge `upstream/main`? Sama seperti di latihan Branching: buka file, putuskan isi akhir
  yang benar, hapus penanda konflik.

### Tingkat 4 — dokumentasi resmi

- [GitHub: Fork a repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
- [GitHub: Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
- [GitHub: Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)
- [Pro Git bab 6: GitHub](https://git-scm.com/book/id/v2)
- Teori di repo ini: [materi-teori Git](../../materi-teori/README.md).

---

## Cara Mengecek Hasil Sendiri

```bash
cd ~/latihan-kontribusi
git remote -v
git checkout main
git pull
git log --oneline --graph -5
ls
```

Yang harus terjadi:

- `git remote -v` menunjukkan `origin` = fork-mu (atau repo-mu sendiri di jalur "sendirian"), dan
  `upstream` = repo asli kalau kamu mengerjakan bonus.
- Setelah `git pull`, `saran.txt` ada di `main` lokal dan `git log` menunjukkan commit merge dari PR.
- Di GitHub, PR berstatus **Merged** dan punya minimal satu komentar review.
- Bonus: `git status -sb` di `main` menampilkan `## main...origin/main` tanpa `[ahead]`/`[behind]`
  setelah sinkronisasi.

Centang juga semua kotak di bagian "Checklist" di akhir soal.

---

## Tentang `contoh/`

`contoh/README.md` berisi contoh sesi terminal, format komentar review, dan cara menyelesaikan konflik
dengan rebase. Buka setelah PR-mu sendiri sudah di-merge, lalu coba contoh rebase di repo latihanmu.

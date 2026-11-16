# TUGAS — Git Branching

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Repo `repo-branch` yang riwayatnya menunjukkan fitur dikerjakan di branch terpisah lalu di-merge ke `main`.
2. (Bonus) Branch `feature/kontak` di GitHub dan satu Pull Request yang sudah di-merge.
3. Pengalaman membaca grafik `git log --oneline --graph --all` dan menjelaskannya.
4. Satu merge conflict yang kamu buat sendiri dan kamu selesaikan sendiri.

---

## Daftar Soal

Semua soal ada di satu file, [soal/01-git-branching.md](soal/01-git-branching.md), dibagi jadi 5 bagian
plus bonus. Tidak ada file kode yang diedit: kamu bekerja di folder baru **di luar repo belajar ini**
(misalnya `~/repo-branch`). File HTML yang diminta soal (`profil.html`, `kontak.html`) dibuat di folder itu.

File `LEVEL-0-Software-Engineering/materi-git-github/materi-praktikum/02-git-branching/code/01-branching-workflow.sh`
berisi daftar langkah dalam bentuk komentar. Pakai sebagai peta, bukan untuk di-copy-paste.

| Bagian | Isi | Tempat kerja | Estimasi |
| --- | --- | --- | --- |
| Persiapan | Repo dengan satu commit | `~/repo-branch` | 10 menit |
| SOAL 1 | Lihat branch saat ini | terminal | 5 menit |
| SOAL 2 | Buat branch baru | terminal | 5 menit |
| SOAL 3 | Pindah branch | terminal | 10 menit |
| SOAL 4 | Edit dan commit di branch baru | `~/repo-branch/profil.html` | 15 menit |
| SOAL 5 | Merge ke `main` dan hapus branch | terminal | 15 menit |
| Bonus | Push branch dan Pull Request | `~/repo-branch/kontak.html` + GitHub | 30 menit |
| Tambahan | Bikin dan selesaikan konflik sendiri (lihat di bawah) | `~/repo-branch` | 30 menit |

Estimasi di atas perkiraan, karena soal tidak mencantumkan waktu. Bonus butuh repo ini sudah terhubung ke
GitHub (`git remote add origin ...`), seperti di latihan Git Dasar.

---

## Langkah Pengerjaan

1. **Baca seluruh soal sekali.**
2. **Tutup soalnya, gambar dulu.** Di kertas, gambar garis `main` dengan titik-titik commit. Setiap kali
   kamu akan membuat branch atau commit, gambar dulu titik/cabang barunya.
3. **Tebak sebelum mengetik.** Contoh: sebelum `ls` di SOAL 5, tulis di catatan: "menurutku `profil.html`
   ada/tidak ada di sini, karena ...".
4. **Ketik sendiri**, lalu jalankan `git log --oneline --graph --all`. Cocokkan dengan gambarmu.
5. **Latihan tambahan, bikin konflik sendiri:** buat dua branch dari `main`, ubah **baris yang sama** di
   `README.md` dengan isi berbeda di masing-masing branch, commit, lalu merge keduanya ke `main`. Baca
   pesan Git dan selesaikan konfliknya.
6. Catat semuanya di `latihan-saya/01-fondasi/minggu-01/catatan-git.md`.

---

## Petunjuk Kalau Macet

### Tingkat 1 — "aku sedang di mana?"

- `git branch` (tanda `*`) atau `git status` baris pertama menunjukkan branch aktif. Hampir semua
  kebingungan branching berasal dari salah branch.
- File "hilang" setelah pindah branch? Itu normal. Cek `git log --oneline --all` untuk melihat di branch
  mana commit itu berada.

### Tingkat 2 — Git menolak perintahmu

- Tidak bisa pindah branch karena ada perubahan yang belum di-commit? Baca pilihan yang Git tawarkan.
  Pikirkan: perubahan ini milik branch yang mana?
- `git branch -d` menolak menghapus? Baca pesannya. Git sedang melindungimu dari kehilangan commit.
  Cari tahu kenapa, jangan langsung pakai `-D`.

### Tingkat 3 — merge conflict

- Buka file yang konflik. Cari penanda `<<<<<<<`, `=======`, `>>>>>>>`. Bagian atas dari branch aktif,
  bagian bawah dari branch yang di-merge.
- Tanya dirimu: isi akhir yang **benar** itu apa? Bisa salah satu, bisa gabungan. Edit file sampai
  penanda hilang, lalu `git status` akan memberi tahu langkah berikutnya.
- Panik? `git merge --abort` mengembalikan keadaan sebelum merge.

### Tingkat 4 — dokumentasi resmi

- [Pro Git bab 3: Git Branching](https://git-scm.com/book/id/v2) (ada versi Bahasa Indonesia).
- Latihan visual interaktif: [learngitbranching.js.org](https://learngitbranching.js.org/?locale=id_ID).
- [GitHub: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).
- Teori di repo ini: [materi-teori Git](../../materi-teori/README.md).

---

## Cara Mengecek Hasil Sendiri

```bash
cd ~/repo-branch
git branch
git log --oneline --graph --all
ls
```

Yang harus terjadi:

- `git branch` hanya menampilkan `* main` (branch fitur sudah dihapus setelah di-merge).
- `profil.html` ada di `main`.
- Grafik `git log` cocok dengan gambar di kertasmu. Kamu bisa menunjuk commit mana yang dibuat di branch fitur.
- Setelah latihan konflik: tidak ada penanda `<<<<<<<` tersisa. Cek dengan
  `grep -rn "<<<<<<<" --exclude-dir=.git .` (hasil harus kosong).
- Bonus: di GitHub, tab **Pull requests** menunjukkan PR berstatus **Merged**, dan `kontak.html` ada di branch `main` GitHub.

Centang juga semua kotak di bagian "Checklist" di akhir soal.

---

## Tentang `contoh/`

`contoh/README.md` berisi contoh sesi terminal, termasuk grafik branch dan alur kerja tim. Buka setelah
kamu menyelesaikan soal sendiri, lalu bandingkan grafik `git log`-mu dengan contoh di sana.

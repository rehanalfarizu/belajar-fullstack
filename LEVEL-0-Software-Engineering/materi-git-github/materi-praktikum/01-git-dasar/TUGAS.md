# TUGAS — Git Dasar

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Repository lokal `latihan-git-pertama` dengan minimal satu commit yang pesannya jelas.
2. Repository yang sama di akun GitHub-mu, isinya sama dengan yang di laptop.
3. File catatan `latihan-saya/01-fondasi/minggu-01/catatan-git.md` berisi setiap perintah yang kamu
   coba, tebakan output-mu, dan output aslinya.

---

## Daftar Soal

Semua soal ada di satu file, [soal/01-git-dasar.md](soal/01-git-dasar.md), dibagi jadi 5 bagian.
Tidak ada file kode yang diedit: kamu mengetik perintah di terminal, di folder **baru di luar repo
belajar ini** (misalnya `~/latihan-git-pertama`). Jangan `git init` di dalam folder `belajar-fullstack`,
karena folder itu sudah repo Git.

File `LEVEL-0-Software-Engineering/materi-git-github/materi-praktikum/01-git-dasar/code/01-workflow-dasar.sh`
berisi daftar langkah yang sama dalam bentuk komentar. Pakai sebagai peta, bukan untuk di-copy-paste.

| Bagian | Isi | Tempat kerja | Estimasi |
| --- | --- | --- | --- |
| Persiapan | Akun GitHub, repo baru di GitHub | browser | 15 menit |
| SOAL 1 | Inisialisasi repository | `~/latihan-git-pertama` | 10 menit |
| SOAL 2 | Buat file, cek status | `~/latihan-git-pertama/README.md` | 10 menit |
| SOAL 3 | Add ke staging area | terminal | 10 menit |
| SOAL 4 | Commit | terminal | 10 menit |
| SOAL 5 | Push ke GitHub | terminal + browser | 20-40 menit (sering ada kendala login pertama kali) |

Estimasi di atas perkiraan, karena soal tidak mencantumkan waktu. Total sekitar 1,5-2 jam.

---

## Langkah Pengerjaan

1. **Baca seluruh soal sekali**, supaya tahu alurnya: folder → file → staging → commit → GitHub.
2. **Tutup soalnya.** Gambar 3 kotak di kertas: *working directory*, *staging area*, *repository*.
   Untuk setiap perintah, gambar panah file berpindah dari kotak mana ke kotak mana.
3. **Sebelum mengetik setiap perintah, tulis tebakanmu** di `catatan-git.md`: "menurutku `git status`
   akan bilang ...".
4. **Ketik perintahnya sendiri** (jangan copy-paste), lalu tempel output asli di bawah tebakanmu.
5. **Kalau tebakan dan hasil beda**, tulis kenapa. Ini bagian paling berharga dari latihan.
6. **Eksperimen**: ubah file setelah `git add` lalu cek `git status`. Apa yang muncul? Kenapa file yang
   sama ada di dua bagian sekaligus?

---

## Petunjuk Kalau Macet

### Tingkat 1 — baca pesan Git dengan serius

Git hampir selalu memberi tahu langkah berikutnya di output-nya (kalimat dalam kurung, misalnya
`use "git add <file>..."`). Baca semua baris, bukan cuma baris pertama.

### Tingkat 2 — cek keadaan sekarang

- `git status` untuk posisi file, `git log --oneline` untuk riwayat, `git remote -v` untuk alamat GitHub.
- Branch-mu bernama `master`, bukan `main`? Cek dengan `git branch`. Lalu cari tahu tentang setting
  `init.defaultBranch` di dokumentasi `git config`. Putuskan sendiri cara membereskannya.
- `Please tell me who you are`? Bagian "Catatan Penting" di soal sudah membahasnya.

### Tingkat 3 — push ditolak

- **Login gagal / password tidak diterima**: GitHub tidak menerima password akun untuk Git lewat HTTPS.
  Baca [GitHub: About authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github),
  lalu pilih SSH key atau personal access token.
- **`rejected ... (fetch first)` atau `non-fast-forward`**: repo di GitHub punya commit yang tidak ada di
  laptopmu (ingat, waktu membuat repo kamu mencentang "Add a README file"). Baca pesan error-nya, lalu
  baca `git pull --help` bagian tentang menggabungkan riwayat. Pikirkan dulu: file README mana yang mau kamu simpan?
- `remote origin already exists`? Lihat isinya dengan `git remote -v` sebelum mengubah apa pun.

### Tingkat 4 — dokumentasi resmi

- [Pro Git Book bab 2: Git Basics](https://git-scm.com/book/id/v2) (ada versi Bahasa Indonesia).
- Teori di repo ini: [materi-teori Git](../../materi-teori/README.md) dan
  [Git & GitHub Fundamental](../../../materi-teori/02-git-github-fundamental.md).
- Instalasi: [software/README.md](../../software/README.md).

---

## Cara Mengecek Hasil Sendiri

```bash
cd ~/latihan-git-pertama
git status
git log --oneline
git remote -v
git status -sb
```

Yang harus terjadi:

- `git status` bilang `nothing to commit, working tree clean`.
- `git log --oneline` menampilkan commit dengan pesan yang menjelaskan isi perubahannya.
- `git remote -v` menunjuk ke repo GitHub milikmu.
- `git status -sb` menampilkan `## main...origin/main` **tanpa** tulisan `[ahead 1]` atau `[behind 1]`.
  Artinya laptop dan GitHub sudah sama.
- Buka repo di browser: file dan commit yang sama ada di sana.

Centang juga semua kotak di bagian "Checklist" di akhir soal.

---

## Tentang `contoh/`

`contoh/README.md` berisi contoh sesi terminal lengkap, termasuk perintah tambahan seperti `git diff` dan
`git restore`. Buka setelah kamu menyelesaikan kelima bagian soal sendiri, lalu coba perintah tambahan itu
di repo latihanmu.

# TUGAS — CI/CD (GitHub Actions)

CI/CD adalah robot yang menjalankan lint, test, build, dan deploy setiap kali
kamu push kode. Tujuannya: bug tertangkap sebelum sampai ke user, dan deploy
jadi membosankan (itu pujian).

## Hasil Akhir yang Diharapkan

1. Workflow CI di GitHub Actions: lint, test, build berjalan otomatis di setiap
   push dan pull request, dengan cache dan matrix versi Node.
2. Workflow CD: otomatis ke staging saat push ke `develop`, ke production saat
   ada tag rilis, dengan smoke test dan rencana rollback.
3. Secret disimpan di GitHub Secrets/Environments, bukan di file workflow.
4. Badge status hijau di repo proyekmu (bukan repo belajar ini).

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-github-actions-basics.md` | `LEVEL-5-Expert-Level/materi-praktikum/05-latihan-cicd/code/01-ci-workflow.yml` (sudah jadi, tulis versimu dulu) | 90 menit |
| 02 | `soal/02-deploy-pipeline.md` | `LEVEL-5-Expert-Level/materi-praktikum/05-latihan-cicd/code/02-deploy-workflow.yml` (TODO) | 85 menit |

### Catatan jujur

- `01-ci-workflow.yml` sudah lengkap (tanpa TODO). Tulis workflow-mu dari file
  kosong berdasarkan bagian A–E di soal, baru bandingkan.
- `02-deploy-workflow.yml` penuh TODO tapi struktur kerangkanya sudah ada.
- **Starter di folder ini tidak akan berjalan di sini.** GitHub hanya menjalankan
  workflow yang ada di `.github/workflows/` pada **root** repo. Salinan di
  `LEVEL-5-.../code/` hanya file teks.
- Soal 02 butuh target deploy sungguhan (server atau layanan hosting) dan
  registry container. Kalau belum punya, kerjakan sampai tahap build dan
  smoke test lokal, dan tuliskan jujur bagian mana yang belum teruji.
- Soal 01 menyebut Codecov (`CODECOV_TOKEN`). Itu opsional. Boleh dilewati atau
  diganti laporan coverage biasa.

---

## Cara Menjalankan

1. Buat repo GitHub **baru** untuk proyek latihan (misalnya dari proyek Vite +
   Express yang sudah kamu punya). Jangan pakai repo belajar ini.
2. Pastikan lokal sudah bisa: `npm ci`, `npm run lint`, `npm test`,
   `npm run build`. Kalau di laptop saja gagal, di CI pasti gagal.
3. Salin workflow ke `.github/workflows/ci.yml` di repo itu, `git push`, lalu
   buka tab **Actions**.
4. Validasi sintaks sebelum push (opsional):
   `npx yaml-lint .github/workflows/ci.yml` atau pakai ekstensi YAML di VS Code.
   Alat seperti `act` bisa menjalankan workflow secara lokal (butuh Docker,
   hasilnya tidak identik dengan GitHub).
5. Secret: Settings → Secrets and variables → Actions. Environment
   (`staging`, `production`): Settings → Environments.

Panduan alat: [Testing dan CI/CD](../../software/02-testing-dan-ci-cd.md).

---

## Langkah Pengerjaan

1. **Soal 01 bagian A** — tulis dulu workflow minimum: checkout, setup Node,
   `npm ci`, `npm test`. Push. Lihat hijau.
2. Buat gagal dengan sengaja (rusak-kan satu test), push, lihat merah, lalu
   perbaiki. Kamu perlu tahu bagaimana kegagalan terlihat.
3. **Bagian B–D** — tambah matrix versi Node, cache dependency, dan laporan
   coverage. Satu per satu.
4. **Bagian E** — tambah pengecekan kualitas dan keamanan (misalnya `npm audit`).
   Tentukan sendiri: gagal di level apa yang layak menghentikan merge?
5. **Soal 02 bagian A–B** — buat job staging, lalu job production dengan
   persetujuan manual lewat Environment.
6. **Bagian C–D** — tulis smoke test (cek `/health` setelah deploy) dan
   rencana rollback. Latih: sengaja deploy versi rusak, apakah pipeline-mu
   menyadarinya?

Teori: [CI/CD Pipeline](../../materi-teori/04-ci-cd-pipeline/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Baca log

- Buka job yang merah, klik langkah yang ada tanda silang, baca 20 baris
  terakhir.
- `npm ci` gagal → `package-lock.json` tidak sinkron dengan `package.json`.
- Workflow tidak muncul di tab Actions → file tidak di
  `.github/workflows/`, ekstensi bukan `.yml`/`.yaml`, atau YAML-nya rusak
  (indentasi).
- Job tidak terpicu → cek `on:` (branch dan event). Apakah branch-mu sesuai?
- `Resource not accessible by integration` → cek `permissions:` pada workflow.

### Level 2 — Lihat buktinya

- Tambahkan langkah sementara yang mencetak `node -v`, `pwd`, `ls` untuk melihat
  lingkungan runner.
- Aktifkan debug logging: tambah secret/variabel `ACTIONS_STEP_DEBUG` = `true`.
- Bandingkan versi Node di CI dan di laptop.
- Cek tab **Actions → run → Annotations** untuk peringatan.

### Level 3 — Perkecil masalah

- Pipeline panjang? Pangkas jadi satu job, satu langkah. Tambah lagi bertahap.
- Deploy sulit diuji? Buat repo percobaan kosong dengan satu langkah
  `echo "deploy ke staging"` untuk melatih aturan trigger dan approval dulu.
- Secret kosong di log? Itu normal: GitHub menyensor nilainya jadi `***`.
  Pastikan nama secret sama persis.

### Dokumentasi

- docs.github.com → Actions → "Understanding GitHub Actions", "Workflow syntax",
  "Using secrets", "Using environments for deployment", "Security hardening for
  GitHub Actions".
- Halaman tiap action yang kamu pakai di marketplace: baca README-nya.

---

## Cara Mengecek Hasil Sendiri

- [ ] Push ke branch biasa menjalankan CI. Pull request menampilkan status check.
- [ ] Merusak satu test membuat CI merah dan menghalangi merge (kalau branch
      protection diaktifkan).
- [ ] Run kedua dengan cache lebih cepat dari run pertama (bandingkan durasi
      langkah install).
- [ ] Matrix menghasilkan beberapa job (satu per versi Node).
- [ ] Push ke `develop` men-deploy ke staging. Production **hanya** jalan untuk
      tag rilis dan menunggu persetujuan.
- [ ] Setelah deploy, smoke test mengecek `/health`. Kalau gagal, job merah dan
      rencana rollback jelas.
- [ ] `grep -rniE "password|secret|token" .github/workflows` hanya menampilkan
      referensi `${{ secrets.NAMA }}`, tidak ada nilai asli.
- [ ] Workflow tidak punya izin lebih dari yang perlu (`permissions:` eksplisit).

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[06-latihan-system-design](../06-latihan-system-design/TUGAS.md).

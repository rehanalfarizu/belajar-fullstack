# Belajar Fullstack Development

Repository ini adalah kurikulum praktik dari fundamental ilmu komputer sampai
fullstack engineering lanjutan. Isinya mencakup teori, soal, starter code,
contoh solusi, tutorial, pilihan stack, security, delivery, system design, dan
reliability.

Ini bukan satu aplikasi monolitik yang dijalankan dengan satu perintah. Banyak
file adalah snippet atau starter latihan yang perlu ditempatkan dalam proyek
sesuai README modul.

## Mulai di sini

1. Baca [Panduan Belajar](PANDUAN_BELAJAR.md).
2. Pahami [Peta Kompetensi Bertingkat](KOMPETENSI_BERTINGKAT.md).
3. Baca README level dan `SELF_PROBLEM_SOLVING.md` yang sedang dikerjakan.
4. Pelajari teori, lalu tutup materi.
5. Buka `soal/` dan kerjakan file di `code/`.
6. Jalankan program dan tulis test/kasus uji.
7. Gunakan `contoh/` hanya setelah memiliki solusi sendiri.
8. Bandingkan keputusan, bukan sekadar hasil akhir.
9. Jalankan pemeriksaan repository:

```bash
npm install
npm run validate
```

Gunakan Node.js 24 LTS untuk lingkungan utama. Package ini menerima Node
`>=22.18.0`. PHP dan Composer diperlukan hanya untuk track Laravel.

## Peta kurikulum

| Tahap | Fokus | Bukti kelulusan |
|---|---|---|
| [Level 0](LEVEL-0-Software-Engineering/) | CS, terminal, Git, problem solving, engineering | mampu menelusuri request end-to-end dan melakukan debugging berbasis hipotesis |
| [Level 1](LEVEL-1-Fundamental-Web/) | HTML, CSS, JavaScript, TypeScript | website accessible/responsive dan program typed tanpa `any` |
| [Level 2 Node](LEVEL-2-Backend-Node-Express/) | Node, Express, SQL, MongoDB, auth | REST API tervalidasi, teruji, memakai transaction dan authorization |
| [Level 2 Laravel](LEVEL-2-Backend-Laravel/) | PHP, Laravel, Blade, Eloquent, API | alternatif backend; pilih ini atau Node sebagai fokus pertama |
| [Level 3 React](LEVEL-3-Frontend-React/) | component, hooks, router, state, form | SPA dengan loading/error/empty state, accessibility, dan test |
| [Level 3 Vue](LEVEL-3-Frontend-Vue/) | Composition API, Router, Pinia, HTTP | alternatif frontend; pilih ini atau React sebagai fokus pertama |
| [Level 4](LEVEL-4-Fullstack-Integration/) | contract, cookies/CORS, auth, Next.js, deployment, security | aplikasi end-to-end dengan cookie `HttpOnly`, CI, migration, dan rollback |
| [Level 5](LEVEL-5-Expert-Level/) | performance, testing, Docker, CI/CD, realtime, design, reliability | proyek terukur dengan SLO, observability, load test, runbook, dan threat model |

Selesaikan satu backend dan satu frontend lebih dahulu. Mempelajari dua framework
sekaligus sering memberi ilusi kemajuan tetapi mengurangi kedalaman.

Setiap level sekarang memiliki latihan mandiri tanpa solusi:

- [Level 0](LEVEL-0-Software-Engineering/SELF_PROBLEM_SOLVING.md)
- [Level 1](LEVEL-1-Fundamental-Web/SELF_PROBLEM_SOLVING.md)
- [Level 2 Node](LEVEL-2-Backend-Node-Express/SELF_PROBLEM_SOLVING.md) atau
  [Laravel](LEVEL-2-Backend-Laravel/SELF_PROBLEM_SOLVING.md)
- [Level 3 React](LEVEL-3-Frontend-React/SELF_PROBLEM_SOLVING.md) atau
  [Vue](LEVEL-3-Frontend-Vue/SELF_PROBLEM_SOLVING.md)
- [Level 4](LEVEL-4-Fullstack-Integration/SELF_PROBLEM_SOLVING.md)
- [Level 5](LEVEL-5-Expert-Level/SELF_PROBLEM_SOLVING.md)

## Arti folder

```text
materi-teori/       konsep dan model mental
materi-praktikum/
  soal/             requirement dan kasus yang harus diselesaikan
  code/             starter; bagian TODO milik pelajar
  contoh/           solusi referensi, bukan satu-satunya jawaban
materi-tutorial/    proyek/integrasi bertahap
tutorial/           panduan end-to-end
software/           setup alat
final-project/      capstone dan definition of done
```

## Standar belajar

Jangan menilai kemajuan dari jumlah file yang dibaca. Untuk setiap topik, kamu
harus dapat:

- menjelaskan konsep dengan kata sendiri;
- memprediksi output sebelum menjalankan kode;
- membuat implementasi tanpa melihat solusi;
- menangani happy path, invalid input, empty state, timeout, dan permission;
- menulis bukti otomatis yang gagal sebelum bug diperbaiki;
- menjelaskan trade-off, risiko, dan cara rollback;
- menemukan jawaban dari dokumentasi resmi.

Nilai proyek dengan rubrik di [Panduan Belajar](PANDUAN_BELAJAR.md), lalu gunakan
[Audit Repository](AUDIT_REPOSITORY.md) untuk memahami cakupan serta batas materi.

## Pemeriksaan kualitas

```bash
npm run audit          # sintaks JS/JSX/TS/Vue, JSON/YAML, link, struktur
npm run validate:html  # validitas dan aksesibilitas dasar HTML
npm run validate:types # TypeScript strict
npm run validate       # seluruh pemeriksaan di atas
```

Validator mencegah kerusakan struktural, tetapi tidak membuktikan semua snippet
benar secara bisnis atau aman untuk langsung dipakai di production. Setiap proyek
tetap memerlukan dependency sendiri, test runtime, database, dan threat model.

## Prinsip keamanan

- Jangan commit `.env`, secret, credential, atau data pribadi.
- Jangan simpan token autentikasi browser di `localStorage`; untuk pola sesi web
  gunakan cookie `HttpOnly`, `Secure` di production, dan mitigasi CSRF.
- Validasi dan authorize setiap input di server; validasi frontend hanya UX.
- Gunakan query berparameter, least privilege, dependency audit, HTTPS, timeout,
  rate limiting, logging yang tidak membocorkan secret, dan backup yang diuji.
- Contoh kode vulnerable hanya untuk latihan security dan harus diberi label jelas.

Mulai dari [Level 0](LEVEL-0-Software-Engineering/) jika benar-benar baru, atau
gunakan placement test pada [Panduan Belajar](PANDUAN_BELAJAR.md) jika sudah punya
pengalaman.

# Audit Repository Kurikulum

Tanggal audit: 29 Juli 2026.

## Ringkasan

Repository telah diperiksa secara rekursif untuk struktur, jenis file, local link,
sintaks JS/JSX/TS/Vue, JSON, YAML, HTML, karakter asing tidak disengaja, dan folder
kosong. Saat audit awal terdapat broken link, placeholder JavaScript yang tidak
valid, komentar bergaya shell di file JS/JSX, markup HTML rusak, dua track kosong,
versi runtime usang, dokumentasi struktur yang tidak cocok, dan contoh auth yang
bertentangan dengan teori security.

Perbaikan utama:

- validator repository dan package quality scripts ditambahkan;
- broken local links dan error parser diperbaiki;
- HTML divalidasi dan masalah struktur/accessibility dasar diperbaiki;
- track Laravel dan Vue yang kosong diisi teori, soal, starter, dan contoh;
- TypeScript, computer science, software engineering, React 19, system design,
  observability, dan reliability ditambahkan;
- jalur teori optimasi/security dan self problem solving tanpa solusi ditambahkan
  secara bertingkat pada setiap level/track;
- auth fullstack diubah ke cookie `HttpOnly` dan secret wajib dari environment;
- wildcard CORS pada contoh WebSocket diganti allowlist origin;
- dokumentasi root/level diselaraskan dengan folder nyata;
- versi belajar diperbarui menuju Node 24 LTS, Express 5, React 19, Vue 3,
  Laravel 13, dan toolchain modern.

## Cakupan saat ini

| Area | Kekuatan | Batas yang perlu dipahami |
|---|---|---|
| Level 0 | tooling, Git, terminal, CS dan engineering principles | beberapa panduan install dapat berubah; cek dokumentasi vendor |
| HTML/CSS/JS | teori luas dan banyak latihan | sebagian latihan CSS tidak memiliki solusi terpisah |
| TypeScript | strict typing, boundary validation, praktikum | baru satu praktikum terintegrasi; perlu dipakai lagi di proyek besar |
| Node/Express | runtime, API, SQL/NoSQL, JWT | snippet tidak berbagi satu package/app; integration test harus dibuat pelajar |
| Laravel | jalur 10 modul lengkap | file adalah potongan Laravel, bukan project Composer standalone |
| React | component, hooks, router, state, form | dependency/setup perlu dibuat per proyek Vite |
| Vue | jalur 10 modul dan solusi SFC | dependency/setup perlu dibuat melalui `create-vue` |
| Fullstack | API, cookie/CORS, auth, Next, deploy, security | platform hosting berubah; autentikasi produksi perlu CSRF/rate/audit detail |
| Expert | performance, test, Docker, CI/CD, realtime, design, SRE | “expert” memerlukan pengalaman operasi dan review, bukan membaca saja |

## Kategori file

- `materi-teori`: sumber konsep internal, bukan pengganti dokumentasi resmi.
- `soal`: requirement latihan; boleh sengaja berisi TODO atau kode belum lengkap.
- `code`: starter yang harus valid secara sintaks, tetapi belum tentu lengkap.
- `contoh`: referensi pembanding, bukan jaminan production-ready.
- `tutorial`: integrasi bertahap; URL dashboard/pricing/version perlu diverifikasi.

Beberapa file menunjukkan pola insecure untuk latihan SQL injection, XSS, atau
security review. Contoh seperti ini harus tetap terisolasi, diberi label
vulnerable, dan tidak dipindahkan ke aplikasi nyata.

## Quality gate

Jalankan dari root:

```bash
npm install
npm run validate
```

`npm run validate` menjalankan:

1. parser dan pemeriksaan struktur/local link;
2. `html-validate` pada latihan HTML;
3. TypeScript strict pada praktikum TypeScript.

PHP Laravel juga telah diperiksa dengan `php -l`. Untuk proyek nyata, tambahkan
quality gate sesuai stack: ESLint, formatter, unit/integration/E2E test, framework
build, database migration test, dependency/security scan, container build, dan
smoke test.

## Hal yang sengaja tidak dilakukan

- Tidak dibuat satu `package.json` untuk menjalankan ratusan snippet yang berasal
  dari aplikasi dan framework berbeda.
- Tidak mengklaim semua provider/deployment tutorial selalu mutakhir.
- Tidak mengganti bearer token pada latihan API murni; yang diperbaiki adalah pola
  penyimpanan token browser yang tidak aman.
- Tidak menambahkan framework hanya untuk mengejar jumlah topik.
- Tidak menjamin job-ready/expert berdasarkan penyelesaian folder.

## Prioritas pengembangan berikutnya

1. Bangun satu reference application end-to-end yang menggabungkan Level 1–5.
2. Tambahkan automated runtime tests untuk setiap kelompok snippet.
3. Tambahkan OpenAPI contract dan consumer contract test.
4. Perluas TypeScript ke frontend/backend reference app.
5. Tambahkan database lab nyata dengan migration, seed, query plan, transaction,
   race-condition test, backup, dan restore.
6. Jalankan security lab terisolasi dan threat-model review.
7. Minta code review manusia serta lakukan incident/load-test simulation.

Audit ini menyatakan repository lebih konsisten dan dapat divalidasi; bukan bahwa
setiap teknologi telah dibahas sampai seluruh kedalaman industrinya. Gunakan
[Panduan Belajar](PANDUAN_BELAJAR.md) untuk mengubah materi menjadi kompetensi.

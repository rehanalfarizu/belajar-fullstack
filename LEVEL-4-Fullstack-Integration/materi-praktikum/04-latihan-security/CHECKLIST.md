# CHECKLIST — Security

Centang dengan jujur. Di keamanan, "kayaknya aman" sama dengan "belum dicek".

---

## Pemahaman Konsep

- [ ] Aku bisa menyebut dan menjelaskan minimal 5 kategori OWASP Top 10 dengan
      contoh nyata
- [ ] Aku paham validasi di server wajib, validasi di frontend cuma kenyamanan
- [ ] Aku bisa menjelaskan beda stored, reflected, dan DOM-based XSS
- [ ] Aku paham kenapa `dangerouslySetInnerHTML` berbahaya dan kapan sanitasi
      dibutuhkan
- [ ] Aku bisa menjelaskan CSRF dan kenapa auth berbasis cookie rentan terhadapnya
- [ ] Aku paham peran `SameSite` dan token CSRF, dan kenapa keduanya saling
      melengkapi
- [ ] Aku paham kenapa parameterized query mencegah SQL injection, dan kenapa
      `ORDER BY` butuh allowlist
- [ ] Aku tahu fungsi header CSP, `X-Content-Type-Options`, HSTS
- [ ] Aku paham rate limit melindungi dari brute force, tapi bukan satu-satunya
      pertahanan

---

## Kemampuan Praktis

- [ ] Aku bisa membuat middleware validasi Zod untuk body, params, dan query
- [ ] Aku bisa menyanitasi HTML dengan DOMPurify memakai allowlist tag
- [ ] Aku bisa membuat dan memvalidasi token CSRF
- [ ] Aku bisa mengubah query rentan menjadi parameterized query di `pg`
- [ ] Aku bisa meng-escape `%` dan `_` pada pencarian `LIKE`
- [ ] Aku bisa memasang Helmet dan mengatur CSP dasar
- [ ] Aku bisa memasang rate limit global dan rate limit khusus login
- [ ] Aku bisa menulis payload serangan sederhana untuk menguji perbaikanku

---

## Kebiasaan Baik

- [ ] Aku selalu mencoba serangan dulu, menambal, lalu mencoba serangan yang sama
      lagi
- [ ] Aku memakai allowlist (yang boleh), bukan blocklist (yang dilarang)
      (baca [Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md))
- [ ] Aku tidak pernah menyusun SQL dengan template string dari input user
      (baca [SQL Injection](../../../modul-keamanan-web/03-sql-injection/README.md))
- [ ] Aku tidak menampilkan HTML dari user tanpa sanitasi
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Error ke client tidak membocorkan stack trace, nama tabel, atau query
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Aku mengecek apakah sebuah paket masih dirawat sebelum memakainya (contoh:
      `csurf` sudah deprecated)
- [ ] Aku mencatat kejadian keamanan (login gagal, 403, 429) di log, tanpa
      menyimpan password atau token di log

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, Level 4
selesai. Coba dulu kasus di [Self Problem Solving Level 4](../../SELF_PROBLEM_SOLVING.md)
dan [proyek akhir audit](../../../modul-keamanan-web/08-proyek-akhir-audit/README.md).

Lanjut ke Level 5:
[01-latihan-advanced-react](../../../LEVEL-5-Expert-Level/materi-praktikum/01-latihan-advanced-react/TUGAS.md).

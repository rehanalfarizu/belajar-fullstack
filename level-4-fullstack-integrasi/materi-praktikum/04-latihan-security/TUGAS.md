# TUGAS — Security (OWASP, XSS/CSRF, SQL Injection, Headers dan Rate Limit)

Aplikasimu sudah online (folder sebelumnya). Sekarang saatnya berpikir seperti
penyerang: "kalau aku mau merusak aplikasi ini, aku coba apa dulu?" Lalu
tambal celahnya satu per satu.

Folder ini berpasangan dengan [modul keamanan web](../../../modul-keamanan-web/README.md)
di root repo. Modul itu punya server rentan yang bisa kamu serang dengan aman.
Kalau ada waktu, kerjakan modul yang terkait sebelum soal yang sama di sini.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. Analisis tertulis beberapa skenario serangan: kategori OWASP, cara serang, cara
   perbaikan.
2. Middleware validasi dengan Zod yang menolak input aneh sebelum menyentuh
   logika bisnis.
3. Fungsi sanitasi HTML dan perlindungan CSRF yang bisa kamu jelaskan cara
   kerjanya.
4. Query database yang semuanya memakai parameter, termasuk kasus sulit: `LIKE`
   dan `ORDER BY`.
5. Server dengan header keamanan (Helmet), rate limit global + rate limit ketat
   untuk login, dan log kejadian mencurigakan.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Modul pendamping | Estimasi |
| --- | --- | --- | --- | --- |
| 01 | `soal/01-owasp-top-10.md` | `level-4-fullstack-integrasi/materi-praktikum/04-latihan-security/code/01-zod-validation.js` | [02-validasi-input](../../../modul-keamanan-web/02-validasi-input/TUGAS.md) | 90 menit |
| 02 | `soal/02-xss-csrf.md` | `level-4-fullstack-integrasi/materi-praktikum/04-latihan-security/code/02-xss-csrf.js` | [06-xss-dan-csrf](../../../modul-keamanan-web/06-xss-dan-csrf/TUGAS.md) | 120 menit |
| 03 | `soal/03-sql-injection.md` | `level-4-fullstack-integrasi/materi-praktikum/04-latihan-security/code/03-sql-injection.js` | [03-sql-injection](../../../modul-keamanan-web/03-sql-injection/TUGAS.md) | 120 menit |
| 04 | `soal/04-security-headers.md` | `level-4-fullstack-integrasi/materi-praktikum/04-latihan-security/code/04-rate-limiting.js` | [07-konfigurasi-aman](../../../modul-keamanan-web/07-konfigurasi-aman/TUGAS.md) | 90 menit |

### Catatan jujur soal starter

- Semua starter sekarang berisi `TODO(human)` dengan petunjuk dan **"Selesai
  kalau"**. Jawaban lengkap ada di
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka setelah
  punyamu jalan.
- `code/02` dan `code/03` sengaja menyertakan contoh kode **rentan** (endpoint
  komentar tanpa sanitasi, query string yang disusun dengan template). Itu untuk
  diserang dan dianalisis. Jangan dipakai di aplikasi nyata.
- **`csurf` sudah deprecated** (diarsipkan, tidak dirawat; npm menampilkan pesan
  deprecated). Jangan dipakai. Pahami dulu konsep token CSRF lewat TODO di
  `code/02` (token acak, header kustom, perbandingan aman waktu), lalu untuk
  produksi bandingkan paket yang masih dirawat: `csrf-csrf` (signed
  double-submit cookie, tanpa state server, versi 4.x; mewajibkan
  `cookie-parser` dan menuntut kamu menyediakan `getSecret` serta
  `getSessionIdentifier`) dan `csrf-sync` (synchronizer token untuk aplikasi
  bersesi, versi 4.x). Baca README resminya di npm/GitHub; opsi berubah antar
  versi. Kombinasikan dengan cookie `SameSite`.
- `code/03` membuat koneksi PostgreSQL ke `DATABASE_URL`. Kamu butuh database
  lokal dengan tabel `users` untuk benar-benar menjalankannya.
- `code/03` memakai `ssl: { rejectUnauthorized: false }` untuk production. Itu
  mematikan pengecekan sertifikat. Cari tahu di dokumentasi provider database-mu
  cara yang lebih aman.
- Ringkasan OWASP di soal memakai versi 2021. Cek owasp.org, apakah sudah ada
  versi yang lebih baru, dan apa yang berubah.

---

## Cara Menjalankan

Starter memakai CommonJS. Starter `02` dan `04` bisa dijalankan langsung
(`node file.js`) karena punya `app.listen` di dalam
`if (require.main === module)`. Starter `01` dan `03` hanya berisi fungsi yang
di-`module.exports`, jadi kamu perlu memanggilnya dari server atau skrip uji
buatanmu.

```bash
# misalnya di latihan-saya/05-fullstack/security/
npm init -y
npm install express zod dotenv          # soal 01
npm install helmet cookie-parser        # soal 02 (+ dompurify jsdom bila memilih sanitizer HTML)
npm install pg                          # soal 03 (butuh PostgreSQL jalan)
npm install express-rate-limit morgan winston   # soal 04
node 02-xss-csrf.js
```

Untuk soal 03, siapkan database lokal
([panduan install PostgreSQL](../../software/02-postgresql-dan-mongodb-install.md))
dan isi `.env`:

```bash
DATABASE_URL=postgresql://localhost:5432/testdb
```

Untuk soal 01, pasang schema dan middleware ke server latihan `01-latihan-auth`
milikmu. Untuk soal 03, buat skrip kecil yang memanggil fungsi-fungsinya dengan
input normal dan input serangan.

---

## Langkah Pengerjaan

1. **Selalu mulai dari serangan, baru perbaikan.** Untuk tiap soal: tulis dulu
   payload serangannya, coba ke versi rentan, catat hasilnya, baru tambal, lalu
   coba lagi payload yang sama.
2. **Soal 01** — kerjakan 1A (analisis skenario) di jurnal. Lalu tulis schema
   Zod. Uji tiap aturan dengan satu input valid dan satu input tidak valid.
3. **Soal 02** — kerjakan 2A dulu (identifikasi XSS). Lalu sanitasi: daftar tag
   yang **boleh**, bukan daftar tag yang dilarang. Lalu CSRF: gambar alurnya
   (token dibuat di mana, dikirim lewat mana, dicek di mana).
4. **Soal 03** — untuk setiap fungsi rentan di PART 1, tulis payload yang
   membobolnya. Lalu isi PART 2–6. Perhatikan: `ORDER BY` **tidak bisa**
   diparameterkan. Apa solusinya?
5. **Soal 04** — pasang Helmet, cek header dengan `curl -i`. Lalu rate limit.
   Lalu log keamanan. Jawab 4C dengan membandingkan header sebelum dan sesudah.

Teori: [Security](../../materi-teori/06-security/README.md) dan
[CORS dan Cookies](../../materi-teori/02-cors-cookies/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Pahami dulu serangannya

- Belum paham XSS/SQLi sama sekali? Kerjakan modul pendamping di tabel atas.
  Di sana ada server rentan yang sengaja dibuat untuk dibobol.
- Payload SQLi tidak "jalan"? Cetak query final dengan `console.log` sebelum
  dieksekusi. Lihat bagaimana inputmu mengubah bentuk query.

### Level 2 — Lihat buktinya

- `curl -i` untuk melihat header. Bandingkan sebelum dan sesudah Helmet.
- DevTools → Console: CSP yang bekerja akan memunculkan pesan pelanggaran saat
  script asing diblokir.
- DevTools → Application → Cookies: lihat kolom `SameSite`, `HttpOnly`,
  `Secure`.
- Log server: setiap request yang ditolak (400, 403, 429) sebaiknya tercatat.

### Level 3 — Perkecil masalah

- Zod error bentuknya rumit? `console.log(result.error.issues)` dan lihat
  strukturnya sebelum memformatnya.
- Sanitasi bingung? Coba DOMPurify di satu skrip kecil dengan 5 input berbeda,
  tanpa Express.
- Rate limit sulit diuji? Turunkan batas jadi 3 request per menit, lalu jalankan
  curl dalam loop.

### Dokumentasi

- owasp.org → Top 10, dan OWASP Cheat Sheet Series: "Input Validation",
  "Cross Site Scripting Prevention", "Cross-Site Request Forgery Prevention",
  "SQL Injection Prevention", "HTTP Headers".
- zod.dev, github.com/cure53/DOMPurify, helmetjs.github.io,
  npm `express-rate-limit`, node-postgres.com → "Queries" (parameterized query).

---

## Cara Mengecek Hasil Sendiri

```bash
# XSS: payload harus keluar dalam bentuk aman (tanpa onerror / script)
curl -s -X POST http://localhost:3001/api/comments \
  -H "Content-Type: application/json" \
  -d '{"content":"<img src=x onerror=alert(1)>halo"}'

# CSRF: tanpa token harus ditolak (403)
curl -i -X POST http://localhost:3001/api/comments \
  -H "Content-Type: application/json" -d '{"content":"hai"}'

# Rate limit: request ke-N harus 429
for i in $(seq 1 10); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"salah"}'
done
```

Sesuaikan path endpoint dengan server-mu.

- [ ] Input yang melanggar schema Zod ditolak dengan **400** dan pesan jelas,
      tanpa stack trace.
- [ ] Payload `' OR '1'='1` dan `1 OR 1=1` tidak mengubah hasil query.
- [ ] `ORDER BY` dengan nama kolom asing (misalnya `password; DROP TABLE`) tidak
      dieksekusi, jatuh ke kolom default.
- [ ] Pencarian dengan `%` dan `_` dicari sebagai karakter biasa.
- [ ] Error database ke client hanya berisi pesan umum. Detail ada di log server.
- [ ] `curl -i` menampilkan `Content-Security-Policy`,
      `X-Content-Type-Options`, dan tidak lagi menampilkan `X-Powered-By`.
- [ ] Login gagal berulang kali → 429, dan tercatat di log.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Level 4 selesai. Uji dirimu dengan
[proyek akhir audit](../../../modul-keamanan-web/08-proyek-akhir-audit/README.md):
audit aplikasi fullstack milikmu sendiri.

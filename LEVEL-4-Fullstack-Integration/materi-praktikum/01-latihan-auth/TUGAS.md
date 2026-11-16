# TUGAS — Auth Backend (bcrypt, JWT, Refresh, RBAC, CORS)

> **Urutan folder `01-` di Level 4:** kerjakan
> [01-latihan-fullstack](../01-latihan-fullstack/TUGAS.md) **dulu**, baru folder
> ini. Di sana kamu belajar REST, status code, dan konsep middleware yang di sini
> dipakai terus.

Belum tahu topiknya? Baca [README.md](README.md) dulu (ada analogi dan daftar
istilah).

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya satu server Express (boleh tumbuh dari soal 01 sampai
05) yang:

1. Bisa register dan login. Password tersimpan sebagai hash, tidak pernah
   dikembalikan ke client.
2. Mengeluarkan JWT saat login, dan menolak request tanpa token yang sah.
3. Punya access token pendek + refresh token dengan rotasi dan logout.
4. Membedakan admin, user, dan guest. User hanya boleh mengubah miliknya sendiri.
5. Memasang CORS dengan origin jelas, header keamanan dari Helmet, dan rate
   limit ketat di endpoint login.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-register-login-jwt.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-auth/code/01-register-login-jwt.js` | 90–120 menit |
| 02 | `soal/02-jwt-middleware.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-auth/code/02-jwt-middleware.js` | 60 menit |
| 03 | `soal/03-token-refresh.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-auth/code/03-token-refresh.js` | 120 menit |
| 04 | `soal/04-role-based-access.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-auth/code/04-role-based-access.js` | 90 menit |
| 05 | `soal/05-cors-security-headers.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-auth/code/05-cors-security-headers.js` | 60–90 menit |

### Catatan soal starter di folder ini

Semua file `code/` berisi kerangka dengan `TODO(human)`: petunjuk (bukan
jawaban) dan **"Selesai kalau"** yang bisa kamu uji sendiri dengan `curl`.
Jawaban lengkap sudah dipindahkan ke
[solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md).

Cara kerjanya:

1. Baca bagian **Tujuan** dan **Syarat (Checklist)** di soal.
2. Salin starter jadi `server.js` dan isi `TODO(human)` satu per satu. Uji tiap
   langkah dengan `curl` sebelum lanjut.
3. Kalau buntu, ikuti tangga "Petunjuk Kalau Macet" di bawah dulu. Baru setelah
   punyamu lolos semua cek (atau buntu lebih dari 30 menit dan sudah mencatat
   kebuntuanmu di jurnal), buka file solusi. Jangan salin; ketik ulang dan
   bandingkan keputusan desainnya.

---

## Cara Menjalankan

Starter memakai CommonJS (`require`).

```bash
# misalnya di latihan-saya/05-fullstack/auth-api/
npm init -y
npm install express bcryptjs jsonwebtoken cors dotenv
npm install helmet express-rate-limit   # untuk soal 05
node server.js
```

Buat file `.env` di folder itu (contoh isi ada di [.env.example](.env.example)):

```bash
JWT_SECRET=isi-dengan-teks-acak-minimal-32-karakter
JWT_REFRESH_SECRET=teks-acak-lain-minimal-32-karakter
PORT=3001
```

- Cara membuat teks acak: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- Starter `01` sampai `04` sengaja **gagal start** kalau secret kurang dari 32
  karakter. Itu fitur, bukan bug.
- Semua starter memuat `dotenv` di bagian atas. Kalau secret terbaca kosong, cek
  apakah `.env` ada di folder tempat kamu menjalankan `node`.
- Masukkan `.env` ke `.gitignore` **sebelum** commit pertama.

---

## Langkah Pengerjaan

1. **Soal 01** — gambar alur register dan login di kertas: input apa, dicek
   apa, disimpan apa, dikembalikan apa. Lalu tulis endpoint register, uji dengan
   curl, baru login, baru `/me`.
2. **Soal 02** — pindahkan pengecekan token jadi satu middleware. Pasang di
   route yang butuh login. Biarkan `/api/public` dan `/api/health` terbuka.
3. **Soal 03** — sebelum ngoding, jawab di jurnal: kenapa access token dibuat
   pendek? Apa yang terjadi kalau refresh token dicuri? Bagaimana rotasi
   membantu? Baru implementasi `/refresh` dan `/logout`.
4. **Soal 04** — tulis tabel: endpoint × role → boleh/tidak. Isi tabel itu dulu,
   lalu buat middleware `authorize(...roles)`. Untuk "owner atau admin",
   pikirkan: data apa yang perlu dibandingkan?
5. **Soal 05** — pasang satu per satu: CORS → Helmet → rate limit global → rate
   limit login. Setelah tiap langkah, cek header response dengan `curl -i`.

Teori: [Auth Fullstack](../../materi-teori/03-auth-fullstack/README.md),
[CORS dan Cookies](../../materi-teori/02-cors-cookies/README.md),
[Security](../../materi-teori/06-security/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Pesan error yang sering muncul

- `secretOrPrivateKey must have a value` → `.env` tidak terbaca.
- `JsonWebTokenError: invalid signature` → token dibuat dengan secret berbeda
  (misalnya server restart dengan secret lain, atau access vs refresh tertukar).
- `TokenExpiredError` → token memang habis. Untuk mengetes, buat token dengan
  umur `10s`.
- Login selalu gagal walau password benar → yang dibandingkan hash dengan hash,
  atau `bcrypt.compare` lupa di-`await`.

### Level 2 — Lihat buktinya

- Tempel token di jwt.io (bagian debugger) untuk **melihat** payload. Perhatikan:
  isinya bisa dibaca siapa saja. Jangan pernah taruh password atau data rahasia
  di payload. (Untuk token latihan saja. Jangan tempel token produksi ke situs
  mana pun.)
- `curl -i` untuk melihat status dan header. Setelah Helmet terpasang, header
  apa saja yang bertambah?
- `console.log(req.headers.authorization)` di awal middleware.
- `console.log(users)` setelah register: apakah password tersimpan sebagai hash
  (diawali `$2`)?

### Level 3 — Perkecil masalah

- Refresh token ruwet? Mulai tanpa rotasi. Setelah `/refresh` jalan, tambahkan
  rotasi, lalu tambahkan logout.
- RBAC ruwet? Hardcode dulu `req.user = { id: 1, role: "user" }` di middleware
  palsu, supaya kamu bisa fokus ke `authorize` tanpa urusan token.
- Rate limit sulit diuji? Turunkan batasnya jadi 3 request per menit saat
  latihan.

### Dokumentasi

- npm `bcryptjs` dan `jsonwebtoken` → bagian README/Usage.
- expressjs.com → "Using middleware".
- helmetjs.github.io dan npm `express-rate-limit`.
- OWASP Cheat Sheet → "Authentication", "Password Storage", "JSON Web Token".

---

## Cara Mengecek Hasil Sendiri

```bash
# register
curl -i -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nama":"Andi","email":"andi@example.com","password":"rahasia123"}'

# register email sama lagi → harus ditolak
# login → simpan token dari response
curl -i -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"andi@example.com","password":"rahasia123"}'

# akses /me tanpa token → 401
curl -i http://localhost:3001/api/auth/me

# akses /me dengan token
curl -i http://localhost:3001/api/auth/me -H "Authorization: Bearer <TOKEN>"
```

- [ ] Response register dan login **tidak** berisi field password.
- [ ] Password salah dan email tidak terdaftar memberi pesan yang **sama** (supaya
      penyerang tidak bisa menebak email mana yang terdaftar).
- [ ] Token diubah satu huruf → ditolak.
- [ ] Refresh token yang sudah dipakai sekali → ditolak saat dipakai lagi.
- [ ] Setelah logout, refresh token lama tidak bisa dipakai.
- [ ] User biasa `DELETE /api/posts/:id` → 403. User mengedit post orang lain →
      403. Admin → boleh.
- [ ] Login gagal 6 kali berturut-turut → dapat **429**.
- [ ] `curl -i` menampilkan header seperti `X-Content-Type-Options: nosniff`.
- [ ] `git status` tidak menampilkan file `.env`.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[02-latihan-auth-fullstack](../02-latihan-auth-fullstack/TUGAS.md). Di sana
server ini disambungkan ke React memakai cookie `HttpOnly`.

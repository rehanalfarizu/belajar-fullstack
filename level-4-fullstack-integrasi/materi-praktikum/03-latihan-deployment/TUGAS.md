# TUGAS — Deployment (Vercel, Railway/Render, Database, Environment Variables)

Aplikasi yang cuma jalan di laptopmu belum bisa dipakai orang lain. Di sini kamu
memindahkan aplikasi fullstack ke internet: frontend, backend, dan database,
lengkap dengan konfigurasi yang aman.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. Frontend React di Vercel dengan URL publik. Refresh di halaman mana pun
   (misalnya `/dashboard`) tidak menghasilkan 404.
2. Backend Express di Railway atau Render dengan endpoint `/api/health`.
3. Database PostgreSQL production dengan tabel hasil migration (bukan dibuat
   manual lewat klik-klik).
4. Semua secret disimpan di dashboard platform, **tidak** ada di repo.
5. Dokumen pendek di jurnal: diagram alur request (browser → Vercel →
   backend → database) dan jawaban semua pertanyaan di soal.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang dibaca/diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-vercel-deploy.md` | `level-4-fullstack-integrasi/materi-praktikum/03-latihan-deployment/code/01-vercel-deploy.js` | 90 menit |
| 02 | `soal/02-railway-render-deploy.md` | `level-4-fullstack-integrasi/materi-praktikum/03-latihan-deployment/code/02-railway-render-deploy.js` | 120 menit |
| 03 | `soal/03-database-production.md` | `level-4-fullstack-integrasi/materi-praktikum/03-latihan-deployment/code/03-database-production.js` | 120 menit |
| 04 | `soal/04-environment-vars.md` | `level-4-fullstack-integrasi/materi-praktikum/03-latihan-deployment/code/04-environment-vars.js` | 60–90 menit |

### Catatan jujur soal starter

- File `code/` di sini lebih mirip **catatan + contoh konfigurasi** daripada
  program. Hampir setiap TODO langsung diikuti jawabannya dalam blok komentar.
  Jadi: baca judul TODO saja, tutup file, tulis versimu di proyekmu, baru
  bandingkan.
- Contoh `vercel.json` di starter 01 sudah diperbarui ke format terkini
  (`rewrites` dengan `source`/`destination`; `builds`, `routes`, dan `version`
  adalah format lama). Tetap cek dokumentasi resmi Vercel sebelum memakainya,
  karena konfigurasi platform sering berubah.
- Soal 04 menyuruh membuka `code/04-environment-vars.js`, dan file itu memang
  ada. Aman.
- Kerjakan **soal 04 lebih dulu** kalau kamu belum rapi soal `.env`. Soal 01–03
  semuanya bergantung padanya.

---

## Apa yang Dibutuhkan

Ini bukan latihan lokal. Kamu butuh:

- Akun GitHub (repo proyek terpisah dari repo belajar ini).
- Akun Vercel dan Railway atau Render. Paket gratis dan batasannya bisa berubah,
  cek halaman harga mereka sebelum mulai.
- Aplikasi yang mau di-deploy. Pakai hasil
  [02-latihan-auth-fullstack](../02-latihan-auth-fullstack/TUGAS.md) atau CRUD
  dari [01-latihan-fullstack](../01-latihan-fullstack/TUGAS.md).
- PostgreSQL lokal untuk latihan migration
  ([panduan install PostgreSQL](../../software/02-postgresql-dan-mongodb-install.md)).

Panduan platform: [Vercel dan Render](../../software/01-vercel-render-deploy.md).

Starter 03 memakai `pg`:

```bash
npm install pg dotenv
```

---

## Langkah Pengerjaan

1. **Soal 04 dulu: rapikan environment.**
   - Buat daftar semua nilai yang beda antara laptop dan production.
   - Buat `.env.example` (tanpa nilai asli) dan pastikan `.env` ada di
     `.gitignore`.
   - Buat validasi saat server start: kalau variabel wajib kosong, server
     menolak jalan dengan pesan jelas.
2. **Soal 03: database.**
   - Tulis migration sebagai file SQL bernomor. Jalankan di database lokal.
   - Hapus database lokal, jalankan ulang migration dari nol. Kalau berhasil,
     migration-mu bisa diulang.
3. **Soal 02: backend.**
   - Pastikan server membaca `PORT` dari environment, punya script `start`, dan
     endpoint `/api/health`.
   - Deploy. Isi environment di dashboard. Jalankan migration ke database
     production.
4. **Soal 01: frontend.**
   - Atur alamat API lewat `VITE_API_URL`.
   - Atur rewrite supaya route React (`/dashboard`) tidak 404 saat di-refresh.
   - Deploy, lalu update CORS di backend dengan URL Vercel-mu.
5. **Jawab semua pertanyaan analisis** di soal, di jurnal.

Teori: [Deployment](../../materi-teori/05-deployment/README.md) dan
[CORS dan Cookies](../../materi-teori/02-cors-cookies/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Baca log, bukan menebak

- Build gagal di Vercel/Railway → buka **Build Logs**. Error biasanya di 20
  baris terakhir.
- Server crash setelah deploy → buka **Runtime/Deploy Logs**. Sering karena
  environment variable belum diisi, atau server listen di port yang salah.
- Frontend tampil tapi data kosong → buka DevTools → Network di URL production.

### Level 2 — Masalah khas production

- Refresh `/dashboard` → 404. Server statis mencari file `/dashboard` yang tidak
  ada. Apa yang harus terjadi untuk semua path yang bukan file?
- Request ke `http://localhost:3001` dari situs production → kamu lupa mengganti
  `VITE_API_URL`, atau lupa build ulang setelah menggantinya. Variabel `VITE_*`
  dibaca **saat build**, bukan saat jalan.
- Error CORS di production → origin Vercel belum masuk daftar CORS backend.
- Login jalan di lokal, gagal di production → frontend (`*.vercel.app`) dan
  backend (`*.railway.app` / `*.onrender.com`) beda situs. Pikirkan: cookie
  dengan `SameSite=Lax` ikut terkirim atau tidak? Ada dua jalan keluar: atur
  atribut cookie untuk lintas situs (dengan konsekuensi CSRF), atau buat
  frontend dan API terlihat satu origin (misalnya lewat rewrite/proxy). Baca,
  pilih, dan tulis alasannya.
- Koneksi database ditolak → banyak provider mewajibkan SSL. Cek dokumentasi
  provider-mu.

### Level 3 — Perkecil masalah

- Deploy backend dulu sendirian, uji `/api/health` dengan curl dari laptop.
- Lalu uji satu endpoint yang memakai database.
- Baru deploy frontend.

### Dokumentasi

- vercel.com/docs → "Vite", "Rewrites", "Environment Variables".
- docs.railway.com atau render.com/docs → "Deploy a Node app",
  "Environment Variables", "PostgreSQL".
- node-postgres.com → "Connecting", "Pooling".
- vite.dev → "Env Variables and Modes".

---

## Cara Mengecek Hasil Sendiri

```bash
# backend hidup
curl -i https://<backend-kamu>/api/health

# CORS: origin asing tidak diizinkan
curl -i https://<backend-kamu>/api/health -H "Origin: https://situs-asing.example"
# header Access-Control-Allow-Origin tidak boleh berisi situs-asing.example

# tidak ada secret di repo
git log -p | grep -i "JWT_SECRET="
git ls-files | grep -E "^\.env$"
```

- [ ] Buka URL Vercel di HP (pakai data seluler, bukan Wi-Fi rumah). Aplikasi
      jalan.
- [ ] Refresh di `/dashboard` → tidak 404.
- [ ] DevTools → Network: tidak ada request ke `localhost`.
- [ ] DevTools → Sources: cari kata `JWT_SECRET` atau `DATABASE_URL` di bundle
      JavaScript. Tidak boleh ketemu.
- [ ] Hapus satu environment variable wajib di dashboard, redeploy → server
      menolak start dengan pesan jelas. Kembalikan lagi.
- [ ] Dua perintah `git` di atas tidak menghasilkan apa pun.
- [ ] Migration bisa dijalankan dua kali tanpa error.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Simpan URL production di README proyekmu.

# TUGAS — Latihan Fullstack (REST, API Design, Fetch/Axios, Auth Middleware)

> **Urutan folder `01-` di Level 4:** kerjakan folder ini **dulu**, baru
> [01-latihan-auth](../01-latihan-auth/TUGAS.md). Endpoint login/register di sana
> adalah endpoint REST biasa, jadi kamu perlu paham status code, format response,
> dan middleware dari folder ini lebih dulu.

Ini pertama kalinya frontend (React) dan backend (Express) kamu saling bicara.
Kuncinya: **kontrak**. Backend janji bentuk response-nya seperti apa, frontend
percaya janji itu, dan keduanya sepakat soal error.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. Server Express yang mengikuti prinsip REST: URL kata benda, method sesuai
   aksi, status code tepat (200, 201, 204, 400, 404).
2. Format response yang konsisten untuk sukses, error, dan pagination.
3. Halaman React yang mengambil, membuat, dan menghapus post lewat API, sekali
   dengan `fetch` dan sekali dengan `axios`.
4. Middleware auth yang membedakan 401 (belum login) dan 403 (tidak punya akses).
5. Dokumen desain API kecil (skema JSON + daftar endpoint) di jurnal atau
   `latihan-saya/`.

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | Tidak ada file soal; TODO di dalam starter sudah cukup sebagai soal | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/code/01-rest-principles.js` | 60 menit |
| 02 | `soal/02-api-design.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/code/02-api-design.js` | 90 menit |
| 03 | `soal/03-fetch-axios.md` | Backend: `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/code/02-rest-api-crud.js`. Frontend: `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/code/03-fetch-axios.js` (salin ke `src/api/` di proyek Vite) | 120–150 menit |
| Bonus | Tidak ada file soal | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/code/03-pagination-filter.js` | 90 menit |
| 04 | `soal/04-auth-middleware.md` | `LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/code/04-auth-middleware.js` | 90 menit |

### Catatan soal dan starter di folder ini

- Penomoran starter dan soal tidak sejajar sempurna. Starter `01` dan bonus
  pagination memang **tidak punya file soal**; panduannya ada di `TODO(human)`
  di dalam file.
- Semua starter berisi kerangka dengan `TODO(human)`: petunjuk dan **"Selesai
  kalau"** yang bisa kamu uji dengan `curl`. Jawaban lengkap `02-rest-api-crud.js`
  dan `03-pagination-filter.js` sudah dipindahkan ke
  [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Buka hanya setelah
  punyamu jalan, atau buntu lebih dari 30 menit dan kebuntuanmu sudah kamu
  catat di jurnal.
- Untuk soal 04, kamu boleh mulai dari salinan server `code/01-rest-principles.js`
  (yang sudah kamu kerjakan) lalu tambahkan middleware.

---

## Cara Menjalankan Starter

Starter backend memakai CommonJS (`require`). Jangan tambahkan `"type": "module"`
di `package.json` proyek backend-mu.

```bash
# backend (misalnya di latihan-saya/05-fullstack/api/)
mkdir api && cd api
npm init -y
npm install express cors dotenv jsonwebtoken
cp <path-starter>/01-rest-principles.js ./server.js   # atau starter lain
node server.js          # jalan di http://localhost:3001
```

```bash
# frontend (folder terpisah, untuk soal 03)
npm create vite@latest client -- --template react
cd client
npm install
npm install axios
npm run dev             # http://localhost:5173
```

Jalankan backend dan frontend di dua terminal berbeda. Kalau port 3001 bentrok,
matikan server soal sebelumnya dulu (semua starter memakai port yang sama).

Panduan alat: [Deploy dan tool Level 4](../../software/README.md). Untuk menguji
API tanpa frontend, pakai `curl` atau Postman/Insomnia.

---

## Langkah Pengerjaan

1. **Starter 01** — sebelum ngoding, tulis tabel: method, URL, status sukses,
   status gagal. Baru isi TODO satu per satu. Uji tiap endpoint dengan `curl`.
2. **Soal 02** — kerjakan bagian 2A dan 2B **di kertas/markdown** dulu (desain
   skema dan endpoint). Baru 2C (implementasi helper response di starter 02).
3. **Soal 03** — jalankan backend `02-rest-api-crud.js`, isi TODO backend-nya,
   uji dengan `curl`. Setelah backend benar, baru pindah ke React. Kerjakan versi
   `fetch` dulu, lalu versi `axios`. Jawab 3A setelah kamu merasakan bedanya.
4. **Bonus pagination** — fokus ke angka: `page=0`, `page=-1`, `limit=1000`,
   `page` melebihi total. Apa respons yang masuk akal?
5. **Soal 04** — kerjakan 4A (pertanyaan) dulu. Lalu tulis middleware. Untuk
   mendapatkan token percobaan, buat skrip kecil yang memanggil `jwt.sign`
   dengan secret yang sama dari `.env`.

Teori: [REST API Design](../../materi-teori/01-rest-api-design/README.md),
[CORS dan Cookies](../../materi-teori/02-cors-cookies/README.md),
[Auth Fullstack](../../materi-teori/03-auth-fullstack/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Baca pesan error

- `Cannot find module 'express'` → belum `npm install` di folder itu.
- `EADDRINUSE :::3001` → server lama masih jalan. Matikan dengan Ctrl+C.
- Di browser muncul error **CORS** → request sampai ke server, tapi server tidak
  mengizinkan origin `http://localhost:5173`. Cek konfigurasi `cors()` di server.
- `req.body` kosong → middleware untuk membaca JSON belum dipasang, atau request
  tidak mengirim header `Content-Type: application/json`.

### Level 2 — Lihat buktinya

- **Terminal server**: tambahkan `console.log(req.method, req.url, req.body)` di
  awal handler. Request-nya sampai atau tidak?
- **DevTools → Network**: klik request → lihat tab Headers (URL, method, status)
  dan tab Response. Apakah status dan isi sama dengan yang kamu harapkan?
- **curl dengan `-i`**: `curl -i http://localhost:3001/api/posts` menampilkan
  status dan header. Kalau curl benar tapi React salah, masalahnya di frontend.

### Level 3 — Perkecil masalah

- Frontend tidak tampil data? Pisahkan: (1) apakah API benar via curl?
  (2) apakah fungsi fetch-mu mengembalikan data (cek dengan `console.log`)?
  (3) apakah komponen me-render state-nya?
- Perhatikan: `fetch` **tidak** melempar error untuk status 404/500. Cek
  `response.ok` sendiri. `axios` melempar. Ini sumber bug klasik.
- Middleware bingung? Tulis dulu middleware yang cuma `console.log` header
  `Authorization` lalu `next()`.

### Dokumentasi

- expressjs.com → Guide → Routing, Writing middleware, Error handling.
- MDN → "Using the Fetch API", "HTTP response status codes".
- axios-http.com → Docs → Instance, Interceptors, Handling Errors.

---

## Cara Mengecek Hasil Sendiri

```bash
# harus 200 dan berisi data + info pagination
curl -i "http://localhost:3001/api/posts?page=1&limit=5"

# harus 404 dengan format error yang konsisten
curl -i http://localhost:3001/api/posts/99999

# harus 400 (body tidak lengkap)
curl -i -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" -d '{}'

# soal 04: tanpa token harus 401
curl -i http://localhost:3001/api/protected/profile

# soal 04: token rusak harus ditolak
curl -i http://localhost:3001/api/protected/profile \
  -H "Authorization: Bearer token-ngawur"
```

- [ ] Semua response error punya bentuk yang sama (misalnya selalu ada
      `error.code` dan `error.message`).
- [ ] `POST` yang berhasil mengembalikan **201**, bukan 200.
- [ ] Di React: data tampil, loading tampil saat menunggu, pesan error tampil
      saat server dimatikan.
- [ ] Di tab Network: tidak ada request dobel yang tidak perlu.
- [ ] User biasa yang memanggil endpoint admin mendapat **403**, bukan 401.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md), lalu lanjut ke
[01-latihan-auth](../01-latihan-auth/TUGAS.md).

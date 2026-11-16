# TUGAS — Latihan Express

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Server Express yang bisa menerima request GET, POST, PUT, DELETE dan membalas JSON.
2. Middleware buatanmu sendiri untuk logging, cek header, dan cek token sederhana.
3. Validasi input dan satu error handler terpusat yang membalas status code yang tepat.
4. RESTful API CRUD `tasks` yang bisa kamu uji sendiri dengan `curl`.

---

## Daftar Soal

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [Routing dan Middleware](soal/01-routing-dan-middleware.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/02-latihan-express/code/01-server-dasar.js` | 45 menit |
| 02 | [Middleware Kustom](soal/02-middleware-kustom.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/02-latihan-express/code/02-middleware-kustom.js` | 60 menit |
| 03 | [Request Body dan Error Handling](soal/03-request-body-dan-error-handling.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/02-latihan-express/code/03-request-body-dan-error-handling.js` | 60-90 menit |
| 04 | [RESTful API](soal/04-restful-api.md) | `LEVEL-2-Backend-Node-Express/materi-praktikum/02-latihan-express/code/04-api-restful.js` | 90-120 menit |

Estimasi di atas perkiraan, karena soal tidak mencantumkan waktu. Perhatikan nama file soal dan code
tidak selalu sama (soal 01 = `01-server-dasar.js`, soal 04 = `04-api-restful.js`).

### Persiapan sekali saja

Express belum terpasang di repo ini. Buat project sendiri, misalnya di `latihan-saya/03-backend/minggu-09/`:

```bash
npm init -y
npm install express
```

Jalankan `npm init -y` **sebelum** `npm install`. Kalau tidak, npm akan menambah Express ke
`package.json` root repo. Lalu salin file starter ke folder itu dan kerjakan di sana (lihat aturan
[latihan-saya](../../../latihan-saya/README.md)).

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal**, terutama tabel "Expected Output": method, path, status code, dan bentuk JSON-nya.
2. **Tutup soalnya.** Tulis daftar endpoint di jurnal dalam format `METHOD /path -> status: isi`. Ini
   kontrak yang akan kamu uji nanti.
3. **Tulis perintah `curl` untuk setiap baris kontrak itu dulu**, sebelum menulis kode server.
4. **Kerjakan satu endpoint**, jalankan server, jalankan `curl`-nya. Baru lanjut ke endpoint berikutnya.
5. **Uji kasus gagal**: body kosong, JSON rusak, ID yang tidak ada, header yang hilang.

---

## Petunjuk Kalau Macet

### Tingkat 1 — request-nya sampai atau tidak?

- Pasang `console.log(req.method, req.url, req.body)` di baris pertama handler. Kalau tidak tercetak,
  request-nya tidak sampai ke route itu (cek path dan method).
- `req.body` bernilai `undefined`? Cek dua hal: `express.json()` dipasang **sebelum** route, dan
  `curl` mengirim header `Content-Type: application/json`.
- `EADDRINUSE`? Server lama masih jalan. Matikan dengan `Ctrl+C` di terminal tempat server jalan.

### Tingkat 2 — urutan middleware

- Request menggantung (curl tidak selesai)? Ada middleware yang tidak memanggil `next()` dan juga tidak mengirim respons.
- Error `Cannot set headers after they are sent`? Kamu mengirim respons dua kali. Biasanya lupa
  `return` setelah `res.status(400).json(...)`.
- Error handler tidak terpanggil? Error handler harus punya **4 parameter** dan dipasang **paling akhir**.

### Tingkat 3 — perkecil

- Buat server dengan satu route saja yang membalas `{ ok: true }`. Kalau itu jalan, tambah middleware satu per satu.
- Untuk soal 04, kerjakan GET semua dulu (array tetap di memori). Setelah lancar, baru GET by ID, lalu POST, PUT, DELETE.

### Tingkat 4 — dokumentasi resmi

- [Express: Routing](https://expressjs.com/en/guide/routing.html)
- [Express: Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [Express: Error handling](https://expressjs.com/en/guide/error-handling.html)
- Status code: [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## Cara Mengecek Hasil Sendiri

Jalankan server di satu terminal:

```bash
node 01-server-dasar.js
```

Uji di terminal kedua. Pakai `-i` supaya status code kelihatan:

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/api/info
curl -i -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"pesan":"halo"}'
```

Yang harus terjadi:

- Soal 01: baris pertama respons `HTTP/1.1 200 OK`, dan POST mengembalikan persis body yang kamu kirim.
- Soal 02: terminal server mencetak log `[waktu] METHOD /url` untuk setiap request. Request tanpa
  header `X-Api-Key` atau dengan `token` salah ditolak dan **tidak** sampai ke handler.
- Soal 03: kirim `{"name":"Budi","email":"bukan-email","age":25}`. Harus `400` dengan pesan yang
  menyebut field mana yang salah. Kirim JSON rusak (`-d '{nama:'`) juga tidak boleh membuat server mati.
- Soal 04: jalankan semua baris Expected Output di soal secara berurutan. `DELETE` membalas `204`,
  lalu `GET` ID yang sama membalas `404`.

Kalau suka tampilan grafis, Postman atau Thunder Client (ekstensi VS Code) juga boleh, tapi tetap bisa pakai `curl`.

---

## Tentang `contoh/`

Folder ini tidak punya `contoh/`. Pembandingmu adalah tabel Expected Output di soal. Kalau semua perintah
`curl`-mu menghasilkan status code dan JSON yang sama, berarti selesai.

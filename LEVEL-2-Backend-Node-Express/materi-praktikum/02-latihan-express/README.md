# Latihan 2: Express.js Dasar

## Tujuan Praktikum

Mahasiswa diharapkan dapat membangun aplikasi web sederhana menggunakan Express.js, memahami konsep routing, middleware, parsing request body, serta merancang dan mengimplementasikan RESTful API dasar.

## Apa yang Akan Dipelajari

Pada praktikum ini, mahasiswa akan mengerjakan empat topik utama:

1. **Server Dasar dan Routing** -- Membuat server HTTP sederhana dengan Express, mendefinisikan route untuk metode HTTP GET, POST, PUT, dan DELETE, serta memahami cara kerja route parameters dan query strings.
2. **Middleware** -- Menggunakan dan membuat middleware kustom. Memahami konsep middleware chain, cara membaca request object, response object, dan bagaimana middleware meneruskan eksekusi ke handler berikutnya dengan `next()`.
3. **Request Body dan Error Handling** -- Mempraktikkan cara menerima dan memproses data dari request body menggunakan `express.json()`, serta membuat centralized error handler untuk menangani error di seluruh aplikasi.
4. **RESTful API** -- Merancang API sederhana yang mengikuti prinsip REST.
   Menggunakan alat seperti Postman atau curl untuk menguji endpoint, memahami
   status code HTTP, dan menyusun respons JSON yang konsisten.

## Struktur Direktori

```
02-latihan-express/
├── soal/
│   ├── 01-routing-dan-middleware.md
│   ├── 02-middleware-kustom.md
│   ├── 03-request-body-dan-error-handling.md
│   └── 04-restful-api.md
├── code/
│   ├── 01-server-dasar.js
│   ├── 02-middleware-kustom.js
│   ├── 03-request-body-dan-error-handling.js
│   └── 04-api-restful.js
└── README.md
```

## Cara Menjalankan

1. Masuk ke direktori latihan:

   ```bash
   cd LEVEL-2-Backend-Node-Express/materi-praktikum/02-latihan-express
   ```

2. Jika belum ada `package.json`, inisialisasi proyek dan instal Express:

   ```bash
   npm init -y
   npm install express
   ```

3. Buka file `.js` di folder `code/`, baca komentar `// TODO(human):`, dan isi bagian yang masih kosong.

4. Jalankan server:

   ```bash
   node code/01-server-dasar.js
   ```

   Server akan berjalan di `http://localhost:3000`.

5. Uji endpoint menggunakan curl atau Postman:

   ```bash
   curl http://localhost:3000/
   curl http://localhost:3000/api/users
   ```

## Catatan Penting

- Gunakan Postman atau `curl` untuk menguji endpoint POST, PUT, dan DELETE.
- Untuk menguji request body, kirim data dalam format JSON dengan header `Content-Type: application/json`.
- Pastikan server berjalan di terminal terpisah saat menguji dengan Postman.

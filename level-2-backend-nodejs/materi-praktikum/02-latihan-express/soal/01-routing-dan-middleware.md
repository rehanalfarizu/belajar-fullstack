# Soal 01: Routing dan Middleware

## Deskripsi Singkat

Soal ini menguji kemampuan membuat server Express.js, mendefinisikan route untuk berbagai metode HTTP (GET, POST, PUT, DELETE), serta memahami cara kerja middleware bawaan Express seperti `express.json()` dan `express.urlencoded()`.

## Persyaratan

- [ ] Membuat server Express yang berjalan di port 3000
- [ ] Mendefinisikan route GET `/` yang mengembalikan pesan selamat datang
- [ ] Mendefinisikan route GET `/api/info` yang mengembalikan informasi server
- [ ] Mendefinisikan route POST `/api/echo` yang menerima JSON body dan mengembalikannya
- [ ] Menggunakan middleware `express.json()` untuk parsing request body

## Hint

Gunakan `app.get(path, handler)` dan `app.post(path, handler)`. Di dalam handler, `req.body` berisi data JSON yang dikirim client (setelah `express.json()` aktif). `req.query` untuk query string dan `req.params` untuk URL parameters.

## Expected Output

```
GET /           -> "Selamat datang di Express.js Server!"
GET /api/info   -> { version: "1.0.0", status: "running" }
POST /api/echo  -> (mengembalikan apa yang dikirim di body)
```
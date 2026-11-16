# Soal 02: Middleware Kustom

## Deskripsi Singkat

Soal ini menguji kemampuan membuat dan menggunakan middleware kustom di Express. Mahasiswa akan membuat middleware untuk logging, validasi header, dan autentikasi sederhana berdasarkan query parameter.

## Persyaratan

- [ ] Membuat middleware `logger` yang mencatat method, URL, dan timestamp setiap request
- [ ] Membuat middleware `validateHeader` yang mengecek keberadaan header `X-Api-Key`
- [ ] Membuat middleware `authenticate` yang memverifikasi query parameter `token`
- [ ] Menerapkan ketiga middleware tersebut ke route yang sesuai
- [ ] Middleware harus memanggil `next()` untuk melanjutkan ke handler berikutnya

## Hint

Middleware memiliki signature `function(req, res, next)`. `next()` harus dipanggil agar request berlanjut. Log: `console.log(\`[\${timestamp}] \${method} \${url}\`)`. Jika validasi gagal, kirim response error dan JANGAN panggil `next()`.

## Expected Output

```
[2026-05-31 10:00:00] GET /api/data
[2026-05-31 10:00:02] POST /api/users
X-Api-Key header diperlukan!
Token tidak valid. Akses ditolak.
```
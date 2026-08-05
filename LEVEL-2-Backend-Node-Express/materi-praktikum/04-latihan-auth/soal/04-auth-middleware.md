# Soal 04: Auth Middleware

## Deskripsi Singkat

Soal ini menguji kemampuan membuat middleware autentikasi yang memverifikasi token JWT di setiap request, serta melindungi route-route tertentu sehingga hanya bisa diakses oleh user yang sudah login dengan token yang valid.

## Persyaratan

- [ ] Membuat middleware `authenticateToken` yang mengekstrak header `Authorization: Bearer <token>`
- [ ] Memverifikasi token menggunakan `jwt.verify()`
- [ ] Jika token tidak ada atau invalid, return 401 Unauthorized
- [ ] Jika valid, simpan data user ke `req.user` dan panggil `next()`
- [ ] Menerapkan middleware ke route GET `/protected` dan GET `/profile`
- [ ] Route GET `/public` TIDAK menggunakan middleware autentikasi

## Hint

Authorization header format: `Bearer <token>`. Ekstrak dengan `req.headers.authorization?.split(' ')[1]`. Jika token kosong atau undefined, langsung return 401. Untuk token invalid, `jwt.verify` akan throw error -- bungkus dengan try-catch. Data user dari decoded token bisa diakses di handler berikutnya via `req.user`.

## Expected Output

```
GET /public (tanpa token)
-> 200: { "message": "Halaman publik - semua orang bisa akses" }

GET /protected (tanpa token)
-> 401: { "error": "Unauthorized", "message": "Token diperlukan" }

GET /protected (dengan token valid)
-> 200: { "message": "Selamat datang di area terproteksi!", "user": { "userId": 1, "email": "..." } }

GET /protected (dengan token invalid)
-> 403: { "error": "Forbidden", "message": "Token tidak valid" }
```
# Soal 03: Request Body dan Error Handling

## Deskripsi Singkat

Soal ini menguji kemampuan menerima dan memproses data dari request body, membuat validasi input sederhana, serta mengimplementasikan centralized error handler untuk menangani semua error di satu tempat.

## Persyaratan

- [ ] Membuat route POST `/users` yang menerima data { name, email, age }
- [ ] Melakukan validasi: name wajib diisi, email harus format valid, age harus angka positif
- [ ] Mengembalikan error 400 dengan pesan spesifik jika validasi gagal
- [ ] Membuat centralized error handler dengan `app.use((err, req, res, next) => {...})`
- [ ] Handle minimal 2 jenis error: ValidationError dan TypeError

## Hint

Gunakan regex untuk validasi email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Buat kelas custom `ValidationError` yang extends `Error`. Di centralized handler, cek `err instanceof ValidationError` untuk menentukan status code dan pesan.

## Expected Output

```
POST /users dengan data valid:
{ "name": "Budi", "email": "budi@email.com", "age": 25 }
-> 201 Created: { "message": "User berhasil dibuat", "data": {...} }

POST /users dengan email tidak valid:
-> 400 Bad Request: { "error": "ValidationError", "message": "Format email tidak valid" }

POST /users tanpa name:
-> 400 Bad Request: { "error": "ValidationError", "message": "Name wajib diisi" }
```
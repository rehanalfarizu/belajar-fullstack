# Soal 04: RESTful API

## Deskripsi Singkat

Soal ini menguji kemampuan merancang dan mengimplementasikan RESTful API lengkap dengan operasi CRUD untuk resource `tasks`. Mahasiswa juga akan mengorganisasi kode dengan controller dan router terpisah.

## Persyaratan

- [ ] Membuat endpoint GET `/tasks` untuk mengambil semua task
- [ ] Membuat endpoint GET `/tasks/:id` untuk mengambil satu task berdasarkan ID
- [ ] Membuat endpoint POST `/tasks` untuk membuat task baru
- [ ] Membuat endpoint PUT `/tasks/:id` untuk memperbarui task
- [ ] Membuat endpoint DELETE `/tasks/:id` untuk menghapus task
- [ ] Semua endpoint mengembalikan response JSON dengan format konsisten
- [ ] Mengikuti konvensi REST: penggunaan HTTP method dan status code yang tepat

## Hint

Gunakan array di memory sebagai storage sementara. Setiap task punya struktur `{ id: 1, title: string, completed: boolean }`. ID bisa menggunakan timestamp atau counter. Status code: 200 OK, 201 Created, 404 Not Found, 204 No Content (untuk delete).

## Expected Output

```
GET  /tasks       -> 200: [{ "id": 1, "title": "Belajar Node.js", "completed": false }]
GET  /tasks/1     -> 200: { "id": 1, "title": "Belajar Node.js", "completed": false }
POST /tasks       -> 201: { "id": 2, "title": "Belajar Express", "completed": false }
PUT  /tasks/1     -> 200: { "id": 1, "title": "Belajar Node.js", "completed": true }
DELETE /tasks/1   -> 204: (no content)
```
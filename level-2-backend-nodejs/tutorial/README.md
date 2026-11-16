# Tutorial — LEVEL 2: Backend Node.js & Express

Folder ini berisi **panduan langkah demi langkah** untuk membangun backend server dari awal. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | [01-membuat-server-express-pertama.md](01-membuat-server-express-pertama.md) | Server Express pertama | Express server, routing, JSON response |
| 02 | [02-blog-api-dengan-express.md](02-blog-api-dengan-express.md) | Blog API | CRUD dengan Express |

Tutorial untuk koneksi PostgreSQL dan autentikasi JWT belum ada. Pelajari lewat
[materi teori 03](../materi-teori/03-database-sql-postgresql/README.md) dan
[materi teori 05](../materi-teori/05-authentication-jwt/README.md), lalu latihan di
[praktikum database](../materi-praktikum/03-latihan-database/README.md) dan
[praktikum auth](../materi-praktikum/04-latihan-auth/README.md).

---

## Cara Pakai

1. **BACA** tutorial dari awal sampai akhir
2. **BUKA** terminal di folder project
3. **KETIK** kode dari 0 — jangan copy-paste
4. **JALANKAN** server dan test dengan Postman/Insomnia
5. **UBAH** nilai dan eksperimen untuk memahami alurnya

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial 01: Server Express pertama
         → Hasil: Express server yang bisa terima request

STEP 2 → Tutorial 02: Blog API dengan Express
         → Hasil: API dengan operasi CRUD (GET, POST, PUT, DELETE)

STEP 3 → Praktikum database dan auth (lihat tautan di atas)
         → Hasil: data tersimpan di database dan route terlindungi login
```

---

## Contoh Struktur Project Backend

Ini gambaran besar saat proyekmu sudah tumbuh. Tutorial 01 dan 02 cukup dengan beberapa file saja.

```
backend-api/
├── package.json
├── server.js              → Entry point
├── routes/
│   └── api.js            → Route definitions
├── controllers/
│   └── apiController.js  → Business logic
├── models/
│   └── index.js         → Database models
├── middleware/
│   └── auth.js          → JWT middleware
└── .env                 → Environment variables
```

---

## Checklist Kemampuan Backend

```
□ Buat Express server sederhana
□ Tangani GET, POST, PUT, DELETE request
□ Koneksi ke PostgreSQL dengan Sequelize
□ Koneksi ke MongoDB dengan Mongoose
□ Buat REST API yang mengikuti prinsip REST
□ Implementasi authentication dengan JWT
□ Buat middleware untuk proteksi route
□ Tangani error dengan proper error handling
□ Validasi input dengan library validation
□ Pakai environment variables dengan .env
```

---

## Tips

```
1. Gunakan nodemon untuk auto-restart saat edit kode
2. Test API dengan Postman/Insomnia sebelum lanjut
3. Console.log() di controller untuk debug response
4. Selalu gunakan .env untuk data sensitif (password, API key)
5. Commit setiap selesai satu fitur di GitHub
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan

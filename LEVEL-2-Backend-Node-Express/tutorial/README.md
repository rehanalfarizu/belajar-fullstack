# Tutorial — LEVEL 2: Backend Node.js & Express

Folder ini berisi **panduan langkah demi langkah** untuk membangun backend server dari awal. Tutorial di sini fokus pada praktik langsung, bukan teori.

---

## Tutorial yang Tersedia

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-buat-rest-api-pertama.md` | REST API Pertama | Express server, routing, JSON response |
| 02 | `02-crud-dengan-express.md` | CRUD API | Create, Read, Update, Delete data |
| 03 | `03-koneksi-postgresql.md` | Database PostgreSQL | Koneksi, query, Sequelize ORM |
| 04 | `04-authentication-jwt.md` | Auth API | Register, login, JWT token |

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
STEP 1 → Tutorial 01: Buat REST API pertama
         → Hasil: Express server yang bisa terima request

STEP 2 → Tutorial 02: CRUD dengan Express
         → Hasil: API lengkap (GET, POST, PUT, DELETE)

STEP 3 → Tutorial 03: Koneksi PostgreSQL
         → Hasil: API yang menyimpan data ke database

STEP 4 → Tutorial 04: Authentication JWT
         → Hasil: API dengan login dan proteksi route
```

---

## Struktur Project yang Akan Kamu Bangun

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

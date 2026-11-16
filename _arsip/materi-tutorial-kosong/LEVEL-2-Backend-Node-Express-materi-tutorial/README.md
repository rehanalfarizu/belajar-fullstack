# Materi Tutorial — LEVEL 2: Backend Node.js & Express

Folder ini berisi **panduan langkah demi langkah** untuk membangun backend server nyata dari awal. Tutorial di sini berbeda dari materi-teori — fokusnya bukan penjelasan konsep, tapi **praktik langsung** di mana kamu akan membuat sesuatu yang bisa langsung ditest dengan Postman.

---

## Isi Folder

Tutorial yang tersedia di folder ini:

| # | File | Project | Topik Utama |
|---|------|---------|-------------|
| 01 | `01-buat-server-express.md` | Server Express | Setup project, routing, middleware |
| 01 | `01-rest-api-design.md` | REST API Design | HTTP methods, status codes, REST principles |
| 02 | `02-crud-express-postgres.md` | CRUD PostgreSQL | Create, Read, Update, Delete dengan Sequelize |
| 02 | `02-crud-express-mongodb.md` | CRUD MongoDB | Create, Read, Update, Delete dengan Mongoose |
| 03 | `03-auth-jwt.md` | Auth API | bcrypt, JWT, login, register |
| 03 | `03-middleware-express.md` | Middleware | Logger, error handler, custom middleware |

---

## Cara Pakai

1. **BACA** tutorial yang kamu mau kerjakan dari awal sampai akhir
2. **BUKA** terminal dan buat folder project baru
3. **KETIK** kode dari 0 — jangan copy-paste, ketik sendiri
4. **JALANKAN** server dengan `node server.js` atau `nodemon`
5. **TEST** API dengan Postman/Insomnia
6. **SIMPAN** hasilnya di GitHub

---

## Alur Belajar yang Disarankan

```
STEP 1 → Tutorial01: Buat server Express pertama
         → Hasil: Server yang running di localhost:3000

STEP 2 → Tutorial02a/b: CRUD dengan database
         → Hasil: API lengkap terhubung ke PostgreSQL/MongoDB

STEP 3 → Tutorial03: Authentication JWT
         → Hasil: API dengan login, register, dan proteksi route

STEP 4 → Push semua project ke GitHub
         → Bangun portfolio backend pertamamu
```

---

## Project yang Akan Kamu Bangun

### REST API Server
```
backend-api/
├── package.json
├── server.js           → Entry point Express
├── routes/
│   └── api.js          → Route definitions
├── controllers/
│   └── apiController.js → Business logic
├── models/
│   └── index.js        → Sequelize/Mongoose models
├── middleware/
│   └── auth.js         → JWT authentication
├── config/
│   └── database.js     → Koneksi database
└── .env                → Environment variables
```

### Checklist Feature REST API
```
□ GET /users — Ambil semua user
□ GET /users/:id — Ambil user berdasarkan ID
□ POST /users — Tambah user baru
□ PUT /users/:id — Update user
□ DELETE /users/:id — Hapus user
□ POST /auth/register — Registrasi user baru
□ POST /auth/login — Login dan dapat JWT token
□ GET /protected — Route yang butuh JWT
□ Error handling untuk semua endpoint
□ Validasi input sebelum simpan ke database
```

---

## Tips

```
1. Mulai dari `npm init` untuk inisialisasi project
2. Install dependencies sedikit demi sedikit, pahami fungsinya
3. Test setiap endpoint SEBELUM lanjut ke fitur berikutnya
4. Gunakan Postman untuk menyimpan request dan response
5. Console.log() di controller untuk melihat data yang masuk
6. Commit setiap selesai satu fitur, bukan di akhir semua
```

---

**Lanjut ke:** [materi-praktikum/](../materi-praktikum/) untuk latihan soal tambahan

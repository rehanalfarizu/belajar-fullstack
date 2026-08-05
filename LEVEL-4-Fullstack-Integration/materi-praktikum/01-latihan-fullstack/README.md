# 01 — Latihan Fullstack (REST, API Design, Fetch/Axios, Auth Middleware)

## Tujuan
Memahami cara membangun komunikasi antara frontend (React) dan backend (Express) menggunakan REST API, desain endpoint yang baik, pagination/filter, dan JWT authentication middleware.

---

## Struktur Folder

```
01-latihan-fullstack/
├── soal/
│   ├── 01-rest-principles.md
│   ├── 02-api-design.md
│   ├── 03-fetch-axios.md
│   └── 04-auth-middleware.md
├── code/
│   ├── 01-rest-principles.js
│   ├── 02-api-design.js
│   ├── 03-pagination-filter.js
│   └── 04-auth-middleware.js
└── README.md
```

---

## Daftar Latihan

| # | Judul | File Soal | File Code |
|---|-------|-----------|-----------|
| 01 | REST Principles | `01-rest-principles.md` | `01-rest-principles.js` |
| 02 | API Design Best Practices | `02-api-design.md` | `02-api-design.js` |
| 03 | Pagination& Filter | `03-pagination-filter.md` | `03-pagination-filter.js` |
| 04 | Auth Middleware (JWT) | `04-auth-middleware.md` | `04-auth-middleware.js` |

---

## Prasyarat

- Node.js & npm terinstall
- Sudah menyelesaikan LEVEL-3 (React dasar + Express dasar)
- Install dependencies:
  ```bash
  npm install express cors dotenv jsonwebtoken bcryptjs axios
  ```

---

## Cara Install & Jalankan

### 1. Setup Folder
```bash
cd LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack
```

### 2. Install Dependencies
```bash
npm install express cors dotenv jsonwebtoken bcryptjs axios
```

### 3. Jalankan Backend (tiap latihan punya file sendiri)
```bash
node code/01-rest-principles.js      # port 3001
node code/02-api-design.js           # port 3001
node code/03-pagination-filter.js     # port 3001
node code/04-auth-middleware.js       # port 3001
```

### 4. Test API dengan curl
```bash
# GET all
curl http://localhost:3001/api/users

# POST create
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","role":"user"}'

# Login (latihan 04)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Protected route
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <access_token>"
```

### 5. Frontend (React)
```bash
npm create vite@latest client -- --template react
cd client
npm install react-router-dom axios
npm run dev
```
Edit `vite.config.js` tambahkan proxy ke backend:
```js
server: { proxy: { '/api': 'http://localhost:3001' } }
```

---

## Alur Pengerjaan

1. Baca soal di `soal/XX-*.md`
2. Baca template code di `code/XX-*.js`
3. Lengkapi bagian `TODO(human)` — bagian utama untuk dikerjakan
4. Solution lengkap ada di comment setelah setiap `TODO(human)`
5. Jalankan server dan test dengan curl atau Postman
6. Bangun frontend sesuai instruksi di section FRONTEND

---

## Tips
- Gunakan **Postman** atau **Insomnia** untuk test API manual
- Gunakan **browser DevTools → Network** untuk lihat request/response
- Baca error message dari Express — biasanya sudah cukup jelas
- Untuk soal auth, selalu sediakan `.env` dengan `JWT_SECRET`
- Frontend section di setiap file code berisi komponen React yang perlu diimplementasikan

---

**Setelah selesai: lanjut ke [02-latihan-auth-fullstack](../02-latihan-auth-fullstack/)**

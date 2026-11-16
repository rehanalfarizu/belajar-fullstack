# 📦 Software 06 — API Testing Tools

## Apa itu API Testing?

**API Testing** = Menguji endpoint API (REST/GraphQL) untuk memastikan request/response berfungsi dengan benar.

```
REQUEST                    API SERVER                    RESPONSE
┌─────────┐              ┌─────────────┐              ┌─────────┐
│ Client  │ ── GET / ──→ │   Express    │ ── process ─→│ 200 OK  │
│ (tool)  │ ←─ JSON ──── │   Server     │ ←────────────│ data    │
└─────────┘              └─────────────┘              └─────────┘
```

---

## 1. cURL (Command Line — Built-in)

cURL = alat testing API via terminal (sudah ada di macOS/Linux).

### GET Request:

```bash
# GET sederhana
curl https://jsonplaceholder.typicode.com/posts

# GET dengan header
curl -H "Authorization: Bearer token123" \
     https://api.example.com/user

# GET dengan query params
curl "https://api.example.com/posts?userId=1&_limit=5"
```

### POST Request:

```bash
# POST JSON data
curl -X POST https://api.example.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Judul Baru", "body": "Isi post", "userId": 1}'

# POST dengan auth token
curl -X POST https://api.example.com/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGci..." \
  -d '{"title": "Post Baru", "body": "Isi"}'
```

### PUT & DELETE:

```bash
# PUT (update seluruh data)
curl -X PUT https://api.example.com/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated", "body": "Updated body", "userId": 1}'

# DELETE
curl -X DELETE https://api.example.com/posts/1

# Dengan auth
curl -X DELETE https://api.example.com/posts/1 \
  -H "Authorization: Bearer token123"
```

### cURL Verbose (Debug):

```bash
# Lihat header + response detail
curl -v https://api.example.com/posts

# Lihat header saja (HEAD)
curl -I https://api.example.com/posts

# Simpan response ke file
curl -o response.json https://api.example.com/posts

# Follow redirect
curl -L https://short.link/api
```

---

## 2. Thunder Client (VS Code Extension)

Thunder Client = API client built-in di VS Code. Ringan & praktis.

### Install:
```
1. Cmd + Shift + X → ketik "Thunder Client"
2. Install → Reload
```

### Buat Request:

```
1. Klik ikon Thunder (sidebar kiri) → thunder icon
2. Klik "New Request"
3. Pilih method: GET / POST / PUT / DELETE
4. Masukkan URL: https://jsonplaceholder.typicode.com/posts/1
5. Klik "Send"
6. Lihat response di panel kanan
```

### TabTabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtabtab

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Accept: application/json
```

### Body (JSON):
```json
{
  "title": "Post baru",
  "body": "Isi konten post",
  "userId": 1
}
```

### Auth:
```
Tab Auth → Bearer Token → masukkan token
Tab Params → ?userId=1&_limit=10
```

### Collections:
```
1. Klik "+ New Collection"
2. Beri nama: "My API Tests"
3. Klik kanan request → "Save to Collection"
4. Pilih collection
```

### Environment Variables:
```
1. Settings (gear icon)
2. Environment → Add
3. Nama: localhost, Variable: BASE_URL = http://localhost:3000
4. Di request: {{BASE_URL}}/users
```

---

## 3. Postman (Standalone App)

Postman = tools API testing paling populer. Fitur lengkap.

### Install:

```bash
brew install --cask postman
```

### Fitur Utama:

```
1. Collections  → Kelompokkan request (seperti folder)
2. Environments → Variabel untuk dev/staging/prod
3. Tests       → Assertions (automatisasi testing)
4. Runner      → Jalankan semua request secara berurutan
5. Mock Server → Simulasi API tanpa backend
```

### Buat Request di Postman:

```
1. Buka Postman
2. Klik "+ New" → HTTP Request
3. Method: POST
4. URL: http://localhost:3000/api/users
5. Tab "Body" → raw → JSON:
   {
     "name": "Andi",
     "email": "andi@email.com"
   }
6. Tab "Headers":
   - Key: Content-Type, Value: application/json
7. Klik "Send"
```

### Auth di Postman:

```
Tab "Auth" → Bearer Token → masukkan JWT
Atau: Basic Auth → username:password
```

### Buat Collection:

```
1. Klik "New" → Collection
2. Nama: "Fullstack API"
3. Klik kanan collection → "Add Request"
4. Tambahkan: GET /users, POST /users, GET /posts, dll
```

### Import dari file:

```
1. Klik "Import" → drag file .json atau .http
2. Atau paste cURL command: Import → Raw text → paste
```

---

## 4. HTTP File (.http) — VS Code Native

Buat file `.http` untuk test API langsung di VS Code.

### Contoh (01-api-test.http):

```http
### GET all posts
GET https://jsonplaceholder.typicode.com/posts

### GET single post
GET https://jsonplaceholder.typicode.com/posts/1

### GET with query params
GET https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3

### POST create new post
POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json

{
  "title": "Post baru dari HTTP file",
  "body": "Isi post",
  "userId": 1
}

### PUT update post
PUT https://jsonplaceholder.typicode.com/posts/1
Content-Type: application/json

{
  "title": "Updated title",
  "body": "Updated body",
  "userId": 1
}

### DELETE post
DELETE https://jsonplaceholder.typicode.com/posts/1

### With auth token
GET https://api.example.com/protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Install REST Client Extension:

```
Cmd + Shift + X → ketik "REST Client" → Install
```

### Jalankan Request:

```
1. Buka file .http
2. Klik "Send Request" (di atas setiap block)
3. Response muncul di panel kanan
```

---

## 5. Test API Lokal (Express)

### Contoh server (server.js):

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Dummy data
let users = [
  { id: 1, name: 'Andi', email: 'andi@email.com' },
  { id: 2, name: 'Budi', email: 'budi@email.com' }
]

// GET all users
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users })
})

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  res.json({ success: true, data: user })
})

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  const newUser = { id: users.length + 1, name, email }
  users.push(newUser)
  res.status(201).json({ success: true, data: newUser })
})

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).json({ success: false, message: 'Not found' })
  Object.assign(user, req.body)
  res.json({ success: true, data: user })
})

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id))
  res.json({ success: true, message: 'Deleted' })
})

app.listen(3000, () => console.log('Server running on port 3000'))
```

### Jalankan:

```bash
node server.js
```

### Test dengan cURL:

```bash
# GET
curl http://localhost:3000/api/users

# POST
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Citra", "email": "citra@email.com"}'

# PUT
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Andi Updated", "email": "andi@email.com"}'

# DELETE
curl -X DELETE http://localhost:3000/api/users/1
```

---

## 6. API Testing Checklist

```
SEBELUM TEST:
□ API server sudah jalan (node server.js)
□ Port sudah benar (3000, 4000, dll)
□ Dokumentasi API sudah ada (Swagger/OpenAPI)

TEST ENDPOINTS:
□ GET /users → 200 OK
□ GET /users/:id → 200 OK (ditemukan)
□ GET /users/:id → 404 (tidak ditemukan)
□ POST /users → 201 Created
□ PUT /users/:id → 200 OK
□ DELETE /users/:id → 200 OK

VALIDATION:
□ Response JSON struktur sesuai
□ Status code benar
□ Error handling (400, 401, 403, 500)
□ Auth token berfungsi
```

---

## 7. HTTP Status Codes (Wajib Hafal)

```
2xx — SUCCESS
200 OK            → berhasil, return data
201 Created       → berhasil dibuat
204 No Content    → berhasil, tidak ada body

4xx — CLIENT ERROR
400 Bad Request   → request invalid
401 Unauthorized  → perlu login
403 Forbidden     → tidak punya akses
404 Not Found     → resource tidak ada
422 Unprocessable → validation error
429 Too Many Req  → rate limit

5xx — SERVER ERROR
500 Internal Server Error → error di server
502 Bad Gateway → upstream error
503 Service Unavailable → server down
```

---

## Checklist

```
✅ curl bisa test API (GET, POST, PUT, DELETE)
✅ Thunder Client installed di VS Code
✅ Buat .http file dengan 5+ request
✅ Test API lokal (Express server)
✅ Paham HTTP status codes
✅ Pakai Authorization header dengan JWT
```

---

**Next:**
- Lanjut ke Software 07: GitHub Desktop
- Atau ke Tutorial: API Development
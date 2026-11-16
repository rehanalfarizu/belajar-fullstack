# SOAL 03 — Fetch & Axios di React

## Tujuan
Menggunakan `fetch` dan `axios` untuk berkomunikasi dengan REST API dari frontend React, memahami perbedaan keduanya, dan menangani error dengan baik.

---

## Briefing
Anda membuat fitur dashboard blog di React. Data post diambil dari Express API yang berjalan di `http://localhost:3001/api/posts`.

---

## Studi Kasus

Anda memiliki API endpoint berikut:

```bash
GET    http://localhost:3001/api/posts      → list posts (paginated)
GET    http://localhost:3001/api/posts/:id   → single post
POST   http://localhost:3001/api/posts       → create post
PUT    http://localhost:3001/api/posts/:id   → update post
DELETE http://localhost:3001/api/posts/:id   → delete post
```

---

## Tugas

### Soal 3A — Bandingkan Fetch vs Axios
Jawab pertanyaan berikut:

```bash
# 1. Apa perbedaan utama fetch dan axios?
# Jawaban:

# 2. Kapan lebih baik gunakan fetch? Kapan lebih baik gunakan axios?
# Jawaban:

# 3. Apa yang perlu dilakukan agar fetch bisa mengirim JSON body?
# Jawaban:

# 4. Bagaimana cara axios secara default berbeda dari fetch dalam hal content-type?
# Jawaban:
```

### Soal 3B — Implementasi dengan Fetch
Lihat file `code/03-fetch-axios.js`. Bagian **Fetch section** perlu dilengkapi:

```javascript
// TODO: Implementasikan fungsi berikut menggunakan fetch

// 1. function getPosts(page = 1)
//    - Fetch GET /api/posts?page={page}&limit=10
//    - Return JSON response
//    - Handle error (throw error jika response status >= 400)

// 2. function getPost(id)
//    - Fetch GET /api/posts/{id}
//    - Return single post object
//    - Handle 404 (throw "Post tidak ditemukan")

// 3. function createPost(data)
//    - Fetch POST /api/posts dengan JSON body
//    - Header: Content-Type: application/json
//    - Return created post

// 4. function deletePost(id)
//    - Fetch DELETE /api/posts/{id}
//    - Return success message
```

### Soal 3C — Implementasi dengan Axios
Di file yang sama, bagian **Axios section** perlu dilengkapi:

```javascript
// TODO: Implementasikan fungsi berikut menggunakan axios

// 1. Buat axios instance dengan baseURL: 'http://localhost:3001/api'
//    - Configure default timeout: 5000ms
//    - Configure default headers: Content-Type: application/json

// 2. function getPostsAxios(page = 1)
//    - Gunakan axios instance
//    - Fetch GET /posts?page={page}&limit=10

// 3. function getPostAxios(id)
//    - Fetch GET /posts/{id}
//    - Handle 404

// 4. function createPostAxios(data)
//    - POST /posts dengan data

// 5. Bonus: Buat request interceptor yang auto-log setiap request
//    - Log: [REQUEST] METHOD /url
//    - Log: [RESPONSE] STATUS /url - DURATION ms
```

---

## Common Pitfalls (Perhatikan!)

```javascript
// ❌ SALAH: fetch tidak secara otomatis JSON-encode body
fetch('/api/posts', {
  body: { title: 'Hello' }  // Ini akan gagal!
});

// ✅ BENAR: stringify body
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hello' })
});

// ❌ SALAH: tidak handle error response
const data = await fetch('/api/posts');
console.log(data); // tetap readable meskipun status 500

// ✅ BENAR: check ok property
const res = await fetch('/api/posts');
if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
const data = await res.json();
```

---

## Kriteria Penilaian
- [ ] Implementasi `fetch` menggunakan proper headers dan JSON.stringify
- [ ] Implementasi `axios` menggunakan instance dengan konfigurasi default
- [ ] Error handling yang tepat untuk kedua approach
- [ ] Bonus interceptor diimplementasikan

---

## Tips
- `axios` lebih mudah untuk fitur seperti interceptors, automatic JSON transform, dan timeout handling
- `fetch` tidak memerlukan dependency tambahan (built-in browser API)
- Selalu handle kedua success case dan error case
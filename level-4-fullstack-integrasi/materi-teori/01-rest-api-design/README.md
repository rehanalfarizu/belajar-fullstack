# 📘 MATERI TEORI 01 — REST API Design

## 1. Apa itu REST?

REST (Representational State Transfer) = **konvensi/standar** desain API berbasis HTTP.

```
URL  = resource identifier (kata benda)
HTTP = verb/aksi

GET    /users      → ambil daftar users
POST   /users      → buat user baru
GET    /users/123  → ambil user dengan id=123
PUT    /users/123  → update seluruh user
PATCH  /users/123  → update sebagian user
DELETE /users/123  → hapus user
```

---

## 2. Resource Naming Convention

```javascript
// ✅ Benar — kata benda jamak, lowercase, hyphen pemisah
GET    /blog-posts
GET    /blog-posts/123
GET    /blog-posts/123/comments
POST   /blog-posts/123/comments
DELETE /blog-posts/123/comments/456

// ❌ Salah — jangan pakai verbs di URL
GET    /getUsers
POST   /createUser
DELETE /deleteUser/123

// ❌ Salah — camelCase tidak umum
GET    /blogPosts

// ❌ Salah — jangan pakai ID di path kalau tidak perlu spesifik
GET    /users?status=active    // filter: query param
GET    /users?sort=name&order=asc  // sort: query param
```

### Nested Resources

```javascript
// Komentar dari user tertentu
GET /users/123/comments        // ✅ dari user
GET /comments?user_id=123      // ⚠️ bisa, tapi kurang RESTful

// Posting seorang user
GET /users/123/posts           // semua post user 123
GET /users/123/posts/456       // post 456 dari user 123

// Transaksi dari order
GET /orders/789/transactions    // semua transaksi order 789
```

---

## 3. HTTP Status Codes

```javascript
// ✅ Sukses
200 OK              // GET, PUT, PATCH berhasil
201 Created         // POST berhasil buat resource baru
202 Accepted        // Request diterima, diproses async
204 No Content      // DELETE berhasil, tidak ada body

// ❌ Client Error
400 Bad Request     // Input tidak valid, bad JSON
401 Unauthorized     // Belum authenticate
403 Forbidden       // Tidak punya hak akses
404 Not Found       // Resource tidak ditemukan
405 Method Not Allowed // HTTP method tidak didukung
409 Conflict        // Conflict data (duplicate email)
422 Unprocessable Entity // Validasi gagal

// 💥 Server Error
500 Internal Server Error // Error umum server
502 Bad Gateway            // Server upstream error
503 Service Unavailable    // Server down / maintenance
```

---

## 4. Request & Response Format

```javascript
// Request Headers
Headers: {
  Content-Type: application/json
  Accept: application/json
  Authorization: Bearer <token>
  X-Request-ID: abc123        // tracing
}

// Success Response
res.status(200).json({
  success: true,
  data: { id: 1, name: "Andi", email: "andi@email.com" }
});

// Array response
res.status(200).json({
  success: true,
  data: [
    { id: 1, name: "Andi" },
    { id: 2, name: "Budi" }
  ]
});

// Error Response
res.status(400).json({
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Email sudah terdaftar",
    details: { field: "email" }
  }
});
```

---

## 5. Pagination

```javascript
// Query params
GET /users?page=2&limit=10

// Response dengan meta
res.json({
  success: true,
  data: [/* 10 items */],
  meta: {
    page: 2,
    limit: 10,
    total: 100,
    totalPages: 10,
    hasNext: true,
    hasPrev: true
  }
});

// Offset-based pagination (SQL)
LIMIT 10 OFFSET 20   // halaman 3 (page 3)

// Cursor-based pagination (lebih performant untuk data besar)
GET /posts?cursor=2026-05-01T10:00:00Z&limit=10
// cursor = timestamp/ID item terakhir yang dilihat
```

---

## 6. Filtering, Sorting, Search

```javascript
// Filter
GET /products?category=electronics&min_price=100000&in_stock=true

// Sort
GET /products?sort=price&order=asc        // termurah
GET /products?sort=created_at&order=desc  // terbaru

// Search
GET /products?q=laptop&fields=name,description

// Kombinasi
GET /posts?status=published&author_id=123&sort=views&order=desc&page=1&limit=20
```

---

## 7. API Versioning

```javascript
// Option 1: URL path (paling umum)
GET /api/v1/users
GET /api/v2/users

// Option 2: Header (lebih rapi tapi kurang obvious)
GET /users
Headers: { Accept: application/vnd.myapp.v2+json }

// Option 3: Query param (paling tidak direkomendasikan)
GET /users?version=2
```

---

## 8. OpenAPI / Swagger Documentation

```yaml
# openapi.yaml (contoh sederhana)
openapi: "3.0.0"
info:
  title: Fullstack App API
  version: "1.0.0"

paths:
  /users:
    get:
      summary: List all users
      parameters:
        - in: query
          name: page
          schema: { type: integer, default: 1 }
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: "#/components/schemas/User"
```

---

## Ringkasan

```
REST API Design
├── URL       → kata benda jamak, lowercase, hyphen
├── HTTP Verb → GET/POST/PUT/PATCH/DELETE
├── Status    → 200/201/204/400/401/403/404/500
├── Format    → { success, data } atau { success: false, error }
├── Pagination→ page+limit atau cursor-based
├── Filter    → query params (?category=x&sort=y)
└── Version   → /api/v1/ atau header Accept
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/01-latihan-fullstack/`
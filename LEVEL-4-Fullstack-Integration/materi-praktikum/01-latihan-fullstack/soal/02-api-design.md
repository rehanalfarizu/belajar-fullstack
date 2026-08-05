# SOAL 02 — API Design Best Practices

## Tujuan
Mendesain API yang scalable, konsisten, dan developer-friendly dengan memperhatikan naming convention, versioning, error handling, dan documentation.

---

## Briefing
Anda diminta untuk mendesain API lengkap untuk sistem **Blog CMS**. Buat desain yang clean dan professional.

---

## Teori Singkat

**API Design Best Practices:**

1. **Naming Convention**: Use lowercase + hyphens
   ```
   /blog-posts     ✓
   /blogPosts      ✗
   /blog_posts     ✗ (underscores are harder to read in URL)
   ```

2. **Versioning**: Gunakan prefix `v1`, `v2`, dst.
   ```
   /api/v1/users
   /api/v2/users   ← jika breaking changes
   ```

3. **Plural nouns** untuk resource collections
   ```
   /api/v1/posts    ✓
   /api/v1/post     ✗
   ```

4. **Nested resources** untuk relasi (tapi jangan terlalu deep)
   ```
   /api/v1/posts/123/comments       ✓
   /api/v1/posts/123/comments/456/replies/789   ✗ (too deep)
   ```

5. **Error response** konsisten
   ```json
   {
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Email sudah terdaftar",
       "details": { "field": "email" }
     }
   }
   ```

6. **Pagination** untuk collections
   ```
   GET /api/v1/posts?page=1&limit=10
   ```

---

## Tugas

### Soal 2A — Desain Schema
Desain JSON schema response untuk resource berikut:

```bash
# 1. User profile
# Response fields apa saja? Format seperti apa?

# 2. List of blog posts (dengan pagination)
# Fields apa saja yang perlu ada di response?

# 3. Single blog post (dengan author info)
# Fields apa saja?

# 4. Error response
# Struktur error response standard seperti apa?
```

### Soal 2B — Desain Endpoint
Desain semua endpoint API untuk Blog CMS. Resource yang perlu ada:

- **Users** (register, login, profile)
- **Posts** (CRUD, published/draft status)
- **Comments** (CRUD per post)
- **Categories** (CRUD)
- **Tags** (CRUD)
- **Media/Upload** (upload gambar)

**Format jawaban:**
```bash
# Format: METHOD /endpoint - Deskripsi

# Contoh:
POST   /api/v1/auth/register     - Registrasi user baru
POST   /api/v1/auth/login        - Login user
GET    /api/v1/posts             - List semua post (paginated)
# ... lanjutkan
```

**Minimal 15 endpoint**. Kelompokkan berdasarkan resource.

### Soal 2C — Implementasi
Lihat file `code/02-api-design.js`. Terdapat struktur Express yang perlu dilengkapi:
- Buat `routes/` sederhana dengan 5 endpoint utama (posts CRUD)
- Implementasikan pagination (`page`, `limit`)
- Implementasikan error response format yang konsisten
- Gunakan proper HTTP status codes

---

## Kriteria Penilaian
- [ ] Endpoint naming convention konsisten (lowercase, plural nouns)
- [ ] Versioning (`/api/v1/`) digunakan
- [ ] Pagination diimplementasikan
- [ ] Error response format konsisten
- [ ] HTTP status codes tepat (200, 201, 400, 404, 500)

---

## Bonus Challenge
Jelaskan perbedaan antara `PUT` vs `PATCH`. Kapan sebaiknya menggunakan masing-masing?
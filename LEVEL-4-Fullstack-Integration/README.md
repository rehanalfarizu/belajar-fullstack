# LEVEL-4 — Fullstack Integration

> 🔗 **Menghubungkan Frontend & Backend: Authentication, API Integration, Deployment**

---

## 📋 Struktur Folder

```
LEVEL-4/
├── materi-teori/                  → Konsep Fullstack
│   ├── 01-rest-api-design/
│   ├── 02-cors-cookies/
│   ├── 03-auth-fullstack/
│   ├── 04-ssr-ssg-nextjs/
│   ├── 05-deployment/
│   ├── 06-security/
│   └── 07-production-optimization/
├── materi-praktikum/             → Latihan Fullstack (kerjakan urut)
│   ├── 01-latihan-fullstack/       ← kerjakan DULU (REST, fetch/axios, middleware)
│   ├── 01-latihan-auth/            ← lalu ini (auth backend; sengaja bernomor 01 juga)
│   ├── 02-latihan-auth-fullstack/
│   ├── 03-latihan-deployment/
│   └── 04-latihan-security/
├── tutorial/                       → Study case & panduan langkah demi langkah
│   ├── 01-fullstack-blog-app.md
│   ├── 01-membuat-fullstack-app-pertama.md
│   └── 02-auth-dan-deployment.md
├── software/                       → Install & setup tools
│   ├── 01-vercel-render-deploy.md
│   └── 02-postgresql-dan-mongodb-install.md
├── SELF_PROBLEM_SOLVING.md
└── README.md
```

---

## 📖 Materi Teori

Tujuh modul teori fullstack:

1. **REST API design**: contract, status, pagination, idempotency.
2. **CORS & cookies**: origin policy, credentials, SameSite, dan CSRF.
3. **Auth fullstack**: password, session/JWT, refresh, dan authorization.
4. **Next.js rendering**: Server/Client Components, SSR, SSG, dan fetching.
5. **Deployment**: environment, platform, proxy, dan migration.
6. **Security**: validation, XSS, CSRF, injection, headers, dan rate limiting.
7. **Production optimization**: latency end-to-end, HTTP/cache/CDN, database,
   queue, rendering, dan release regression.

---

## 🏋️ Praktikum

Kerjakan README/soal di setiap folder: integrasi CRUD, backend auth, client auth,
deployment, dan security. Starter berada di `code/` berisi kerangka dan
`TODO(human)`. Jawaban lengkap ada di `solusi-jangan-dibuka-dulu.md` pada folder
latihan yang punya file itu; buka hanya setelah usaha mandiri. Folder
`01-latihan-fullstack` dikerjakan lebih dulu, baru `01-latihan-auth`.

Gunakan cookie `HttpOnly` untuk sesi browser pada latihan fullstack. Bearer token
masih relevan untuk API client tertentu, tetapi jangan mengajarkan penyimpanan
token autentikasi di `localStorage`.

Gunakan
[Production Optimization](materi-teori/07-production-optimization/README.md) dan
[Self Problem Solving](SELF_PROBLEM_SOLVING.md) sebagai quality gate sebelum
Level 5.

---

**Setelah menyelesaikan LEVEL-4, lanjut ke [LEVEL-5](../LEVEL-5-Expert-Level/)**

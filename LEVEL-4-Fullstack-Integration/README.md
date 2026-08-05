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
│   └── 06-security/
├── materi-praktikum/             → Latihan Fullstack
│   ├── 01-latihan-fullstack/
│   ├── 01-latihan-auth/
│   ├── 02-latihan-auth-fullstack/
│   ├── 03-latihan-deployment/
│   └── 04-latihan-security/
├── tutorial/                       → Study case & panduan langkah demi langkah
│   ├── 01-deploy-vercel-express.md
│   └── 02-ci-cd-github-actions.md
├── software/                       → Install & setup tools
│   └── 01-insomnia-postman.md
└── README.md
```

---

## 📖 Materi Teori

Enam modul teori fullstack:

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
deployment, dan security. Starter berada di `code/`; beberapa modul menyediakan
`contoh/` sebagai referensi setelah usaha mandiri.

Gunakan cookie `HttpOnly` untuk sesi browser pada latihan fullstack. Bearer token
masih relevan untuk API client tertentu, tetapi jangan mengajarkan penyimpanan
token autentikasi di `localStorage`.

Gunakan
[Production Optimization](materi-teori/07-production-optimization/README.md) dan
[Self Problem Solving](SELF_PROBLEM_SOLVING.md) sebagai quality gate sebelum
Level 5.

---

**Setelah menyelesaikan LEVEL-4, lanjut ke [LEVEL-5](../LEVEL-5-Expert-Level/)**

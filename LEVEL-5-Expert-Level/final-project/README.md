# FINAL PROJECT — Mini E-Commerce

## Overview

Build fullstack e-commerce app dengan: React (Vite) + Express + SQLite + JWT Auth.

---

## Fitur Utama

| Fitur | Description |
|-------|-------------|
| Auth | Register, Login, JWT, RBAC (admin/user) |
| Products | CRUD products (admin), browse (all) |
| Cart | Add, update quantity, remove items |
| Orders | Create order, view history |
| Public Pages | Home, product list, product detail |

---

## Struktur Folder

```
final-project/
├── client/               → Vite + React
│   ├── src/
│   │   ├── components/   → Reusable UI
│   │   ├── pages/        → Route pages
│   │   ├── context/       → Auth & Cart context
│   │   ├── hooks/         → Custom hooks
│   │   └── services/      → API calls
│   └── vite.config.js
├── server/               → Express API
│   ├── src/
│   │   ├── routes/        → /auth, /products, /orders, /cart
│   │   ├── middleware/    → auth, admin, validation
│   │   ├── controllers/   → Business logic
│   │   └── db/            → SQLite setup + seed
│   └── package.json
└── README.md
```

---

## API Endpoints

### Auth
```
POST /api/auth/register   — Register baru
POST /api/auth/login      — Login, dapat JWT
GET  /api/auth/me         — Current user (protected)
```

### Products
```
GET    /api/products           — List products (public)
GET    /api/products/:id       — Product detail (public)
POST   /api/products           — Create (admin only)
PUT    /api/products/:id       — Update (admin only)
DELETE /api/products/:id       — Delete (admin only)
```

### Cart
```
GET    /api/cart               — Get user cart (protected)
POST   /api/cart               — Add to cart
PUT    /api/cart/:itemId       — Update quantity
DELETE /api/cart/:itemId       — Remove item
```

### Orders
```
GET    /api/orders             — User order history (protected)
POST   /api/orders             — Create order dari cart
```

---

## User Stories

### sebagai Guest (belum login)
- [ ] Lihat list products
- [ ] Lihat product detail
- [ ] Register akun baru
- [ ] Login

### sebagai User (sudah login)
- [ ] Tambah product ke cart
- [ ] Update quantity di cart
- [ ] Hapus item dari cart
- [ ] Checkout (create order)
- [ ] Lihat order history

### sebagai Admin
- [ ] Tambah product baru
- [ ] Edit product
- [ ] Hapus product
- [ ] Lihat semua orders

---

## Bonus Features

- [ ] Search products
- [ ] Filter by category
- [ ] Pagination
- [ ] Image upload
- [ ] Email notification (simulasi console.log)
- [ ] Pagination di order history

---

## Cara Kerjakan

```
1. Buat folder final-project/
2. Setup server (Express + SQLite) dulu
3. Setup client (Vite + React)
4. Test semua endpoints dengan curl
5. Connect React ke API
6. Tambahkan fitur satu per satu
7. Test end-to-end
```

---

## Evaluasi

Project selesai kalau:
1. User bisa register & login
2. User bisa CRUD cart
3. User bisa checkout
4. Admin bisa CRUD products
5. Semua data persist di SQLite
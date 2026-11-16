# SOAL 04 — Role-Based Access Control (RBAC)

## Tujuan
Memahami authorization dengan roles: admin vs user vs guest.

---

## Briefing
Buat sistem dengan 3 role dan enforce permission di middleware.

---

## Syarat (Checklist)

### User Roles
- [ ] `admin` — full access
- [ ] `user` — access ke resource miliknya
- [ ] `guest` — read-only access

### Permission Middleware
- [ ] `authorize(...roles)` — middleware factory
- [ ] Check `req.user.role` terhadap allowed roles
- [ ] Return 403 kalau tidak punya akses

### Routes
- [ ] `GET /api/posts` — public (all roles)
- [ ] `POST /api/posts` — user & admin only
- [ ] `DELETE /api/posts/:id` — admin only
- [ ] `PUT /api/posts/:id` — owner atau admin
- [ ] `GET /api/admin/stats` — admin only

---

## Contoh Code

Contoh jawaban sengaja tidak ditaruh di sini. Tulis sendiri dulu berdasarkan checklist di atas. Setelah punyamu jalan, bandingkan dengan [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).

---

## Cara Submit
1. Buat server dengan RBAC
2. Test semua role: admin, user, guest
3. Verify permission enforcement
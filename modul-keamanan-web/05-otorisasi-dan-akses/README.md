# 05 — Otorisasi dan Akses

> ⚠️ **Peringatan lab rentan:** `kerjakan-di-sini/01-api-rentan.js` SENGAJA dibuat rentan IDOR
> supaya kamu bisa melihat sendiri akibatnya. Jalankan hanya di laptopmu (server terkunci ke
> `127.0.0.1`), jangan di-deploy, dan jangan pakai tekniknya ke sistem orang lain.
> Setiap percobaan wajib kamu perbaiki di `02-api-aman.js`.

## Autentikasi vs Otorisasi

- **Autentikasi** = Siapa kamu? (Login)
- **Otorisasi** = Apa yang boleh kamu lakukan? (Permission)

User sudah login (autentikasi) bukan berarti boleh mengakses semua fitur (otorisasi).

---

## Analogi: Hotel

- **Check-in** = Autentikasi (buktikan identitas)
- **Key card** = Session/Token
- **Akses kamar** = Otorisasi (kamu hanya boleh masuk kamar sendiri)

Kamu punya key card (sudah login), tapi tidak bisa masuk kamar orang lain.

---

## Kesalahan Umum: IDOR (Insecure Direct Object Reference)

```javascript
// ❌ RENTAN!
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order); // Siapa saja bisa lihat order siapa saja!
});

// ✅ AMAN: Cek kepemilikan
app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  res.json(order);
});
```

---

## Prinsip Least Privilege

Berikan akses **seminimal mungkin** yang dibutuhkan untuk menyelesaikan tugas.

- User biasa: lihat produk, beli, lihat order sendiri
- Admin: tambah produk, lihat semua order, kelola user

---

## Pola Otorisasi

### 1. Role-Based Access Control (RBAC)
```javascript
const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read']
};
```

### 2. Attribute-Based Access Control (ABAC)
```javascript
// Cek berdasarkan atribut resource
if (order.userId === currentUser.id || currentUser.role === 'admin') {
  // Boleh akses
}
```

### 3. Middleware Otorisasi
```javascript
const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

app.delete('/api/users/:id', requireRole('admin'), deleteUser);
```

---

## Best Practices

1. **Default deny** — Mulai dengan tidak ada akses, lalu buka yang perlu
2. **Cek di server** — Jangan andalkan hidden UI di frontend
3. **Cek kepemilikan** — User hanya boleh akses resource miliknya
4. **Audit log** — Catat siapa akses apa kapan

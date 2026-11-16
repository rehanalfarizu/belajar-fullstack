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
// ❌ RENTAN! (contoh: sistem peminjaman perpustakaan)
app.get('/api/pinjaman/:id', async (req, res) => {
  const pinjam = await Pinjaman.findById(req.params.id);
  res.json(pinjam); // Siapa saja bisa lihat pinjaman siapa saja!
});
```

Perbaikannya ada di dua pertanyaan:
- Data apa di `pinjam` yang bisa dibandingkan dengan identitas pengguna yang sedang login?
- Identitas itu harus diambil dari mana: dari `req.params`/`req.query`, atau dari sesi di server? Kenapa?

Lalu pikirkan status yang dibalas kalau bukan pemiliknya: 403 atau 404? Apa
yang bocor lewat masing-masing?

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

Keputusan diambil dari **atribut** pengguna dan resource. Contoh tiket helpdesk:
pelapor boleh melihat tiketnya sendiri, dan petugas yang ditugaskan juga boleh.
Bagaimana kamu menulis aturan itu sebagai satu fungsi `bolehLihatTiket(user, tiket)`
yang mengembalikan true/false? Fungsi kecil seperti ini bisa dipakai ulang di
banyak route.

### 3. Middleware Otorisasi

Middleware bisa dibuat lewat "fungsi pembuat" (factory) yang menerima
parameter dan mengembalikan middleware. Contoh dengan aturan jam operasional:

```javascript
const hanyaJam = (buka, tutup) => (req, res, next) => {
  const jam = new Date().getHours();
  if (jam < buka || jam >= tutup) {
    return res.status(503).json({ error: 'Loket tutup' });
  }
  next();
};

app.post('/api/parkir/masuk', hanyaJam(6, 22), catatMasuk);
```

Bagaimana kamu mengubah pola ini jadi middleware yang memeriksa **peran**
pengguna? Status HTTP apa yang tepat kalau perannya tidak cocok?

---

## Best Practices

1. **Default deny** — Mulai dengan tidak ada akses, lalu buka yang perlu
2. **Cek di server** — Jangan andalkan hidden UI di frontend
3. **Cek kepemilikan** — User hanya boleh akses resource miliknya
4. **Audit log** — Catat siapa akses apa kapan

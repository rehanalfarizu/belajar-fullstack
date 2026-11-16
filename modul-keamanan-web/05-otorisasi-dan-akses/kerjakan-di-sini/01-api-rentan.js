/**
 * ⚠️ API SENGAJA RENTAN (IDOR) - HANYA UNTUK BELAJAR DI LAPTOPMU ⚠️
 *
 * API ini SENGAJA tidak mengecek "order ini milik siapa".
 * JANGAN pakai pola ini di project sungguhan.
 * JANGAN deploy server ini ke internet.
 * Teknik di sini hanya boleh dicoba ke server ini sendiri, bukan ke sistem orang lain.
 *
 * Pasangannya: 02-api-aman.js (di sana kamu memperbaikinya).
 *
 * Jalankan:
 *   cd modul-keamanan-web/05-otorisasi-dan-akses/kerjakan-di-sini
 *   npm install
 *   node 01-api-rentan.js
 *
 * "Login palsu":
 *   Supaya lab ini fokus ke OTORISASI, autentikasinya dibuat sederhana:
 *   kirim header `X-User-Id` berisi id user. Anggap saja header ini hasil
 *   login yang sah (di aplikasi nyata, id ini datang dari session/JWT
 *   yang sudah diverifikasi server, BUKAN dari header yang bisa diketik bebas).
 *
 *   User yang tersedia:
 *     1 = andi  (user biasa)
 *     2 = sinta (user biasa)
 *     3 = admin (admin)
 *
 * Contoh:
 *   curl -H "X-User-Id: 1" http://127.0.0.1:3050/api/orders
 */

const express = require('express');

const app = express();
app.use(express.json());

// ============================================
// Data palsu (in-memory)
// ============================================
const users = [
  { id: 1, username: 'andi', role: 'user', email: 'andi@contoh.test' },
  { id: 2, username: 'sinta', role: 'user', email: 'sinta@contoh.test' },
  { id: 3, username: 'admin', role: 'admin', email: 'admin@contoh.test' },
];

const orders = [
  { id: 101, userId: 1, item: 'Buku Algoritma', total: 120000, alamat: 'Jl. Melati 1, Bandung' },
  { id: 102, userId: 1, item: 'Mouse Wireless', total: 85000, alamat: 'Jl. Melati 1, Bandung' },
  { id: 103, userId: 2, item: 'Headset', total: 250000, alamat: 'Jl. Kenanga 7, Surabaya' },
  { id: 104, userId: 2, item: 'Flashdisk 64GB', total: 70000, alamat: 'Jl. Kenanga 7, Surabaya' },
  { id: 105, userId: 3, item: 'Monitor 24 inch', total: 1800000, alamat: 'Kantor Pusat' },
];

// ============================================
// "Autentikasi" palsu: baca X-User-Id
// ============================================
function fakeLogin(req, res, next) {
  const id = Number(req.get('X-User-Id'));
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(401).json({ error: 'Belum login. Kirim header X-User-Id (1, 2, atau 3).' });
  }
  req.user = user;
  next();
}

app.use('/api', fakeLogin);

// ============================================
// ❌ RENTAN: daftar order bisa difilter pakai ?userId=
// ============================================
// Frontend "biasanya" memanggil /api/orders?userId=<id-sendiri>.
// Tapi siapa yang menjamin client mengirim id-nya sendiri?
app.get('/api/orders', (req, res) => {
  const userId = req.query.userId ? Number(req.query.userId) : req.user.id;
  res.json(orders.filter((o) => o.userId === userId));
});

// ============================================
// ❌ RENTAN: lihat detail order berdasarkan ID saja
// ============================================
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order tidak ditemukan' });
  res.json(order); // tidak ada cek pemilik sama sekali
});

// ============================================
// ❌ RENTAN: ubah alamat order siapa saja
// ============================================
app.patch('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order tidak ditemukan' });
  if (typeof req.body?.alamat === 'string') order.alamat = req.body.alamat;
  res.json(order);
});

// ============================================
// ❌ RENTAN: hapus order siapa saja
// ============================================
app.delete('/api/orders/:id', (req, res) => {
  const index = orders.findIndex((o) => o.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Order tidak ditemukan' });
  const [hapus] = orders.splice(index, 1);
  res.json({ dihapus: hapus });
});

// ============================================
// ❌ RENTAN: endpoint "admin" tanpa cek role
// ============================================
// Developer-nya berpikir: "tombol menu admin kan cuma muncul untuk admin di frontend."
app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

app.get('/', (req, res) => {
  res.json({
    peringatan: 'API SENGAJA RENTAN - hanya untuk latihan di localhost',
    caraLogin: 'Kirim header X-User-Id: 1 (andi), 2 (sinta), atau 3 (admin)',
    endpoints: [
      'GET    /api/orders',
      'GET    /api/orders/:id',
      'PATCH  /api/orders/:id   body: {"alamat": "..."}',
      'DELETE /api/orders/:id',
      'GET    /api/admin/users',
    ],
  });
});

// ============================================
// Start server
// ============================================
const PORT = 3050;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
// Tanpa ini, API rentan ini terbuka ke SEMUA orang di jaringan yang sama (misal WiFi kampus).
app.listen(PORT, '127.0.0.1', () => {
  console.log(`
⚠️  API RENTAN (IDOR) - HANYA UNTUK BELAJAR ⚠️

Berjalan di http://127.0.0.1:${PORT}

Kamu login sebagai andi (id 1). Order milik andi: 101, 102.
Misi: coba lihat, ubah, atau hapus order yang BUKAN milik andi.
Catat setiap percobaan di catatan.md.

Mulai dari sini:
  curl -H "X-User-Id: 1" http://127.0.0.1:${PORT}/api/orders/101
`);
});

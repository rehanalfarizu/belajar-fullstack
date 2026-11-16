/**
 * API Order — versi yang harus kamu amankan
 *
 * TUGAS: Tambahkan pengecekan kepemilikan dan role sampai semua serangan
 * yang berhasil di 01-api-rentan.js GAGAL di sini.
 *
 * Jalankan:
 *   cd modul-keamanan-web/05-otorisasi-dan-akses/kerjakan-di-sini
 *   node 02-api-aman.js
 *
 * Login palsu sama seperti 01-api-rentan.js: header X-User-Id (1 andi, 2 sinta, 3 admin).
 *
 * Aturan yang harus berlaku setelah kamu selesai:
 *   - User biasa hanya bisa melihat/mengubah/menghapus order MILIKNYA sendiri
 *   - Admin boleh melihat semua order
 *   - /api/admin/* hanya untuk role admin
 *
 * Saat ini kodenya masih sama rentannya dengan 01-api-rentan.js.
 */

const express = require('express');

const app = express();
app.use(express.json());

// ============================================
// Data palsu (sama dengan 01-api-rentan.js)
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
// "Autentikasi" palsu (sudah jadi, jangan diubah)
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
// TODO(human): Middleware requireRole
// ============================================
// requireRole('admin') menghasilkan middleware yang:
// - meneruskan request (next()) kalau req.user.role cocok
// - menolak dengan status yang tepat kalau tidak cocok
//
// Pertanyaan sebelum menulis kode:
// - 401 dan 403 itu bedanya apa? Yang mana untuk "sudah login tapi tidak boleh"?
// - Prinsip "default deny": kalau req.user tidak ada (misal middleware lupa dipasang),
//   apakah requireRole-mu tetap menolak? Pastikan iya.
// - Bonus: bisakah requireRole menerima lebih dari satu role, misal requireRole('admin', 'cs')?
function requireRole(role) {
  return (req, res, next) => {
    // TODO(human): tulis kodemu di sini
    void role; // hapus baris ini setelah role dipakai
    next();
  };
}

// ============================================
// TODO(human): Helper cek kepemilikan
// ============================================
// Satu fungsi kecil yang menjawab: "apakah user ini boleh mengakses order ini?"
// Dipakai ulang di GET/PATCH/DELETE supaya aturannya tidak ditulis berkali-kali.
//
// Petunjuk: lihat contoh ABAC di README modul ini. Ingat admin juga punya aturan.
// Pikirkan juga: apakah admin boleh MENGHAPUS order orang lain, atau cuma melihat?
// Tidak ada jawaban tunggal. Tentukan aturanmu dan tulis alasannya di catatan.md.
function bolehAksesOrder(user, order) {
  // TODO(human): tulis kodemu di sini
  void user; void order; // hapus baris ini setelah dipakai
  return true; // ❌ saat ini semua orang boleh
}

// ============================================
// GET /api/orders
// ============================================
// TODO(human): Jangan percaya ?userId= dari client.
// Pertanyaan: dari mana server SEHARUSNYA tahu id user yang sedang login?
// Bagaimana dengan admin, apakah perlu daftar semua order?
app.get('/api/orders', (req, res) => {
  const userId = req.query.userId ? Number(req.query.userId) : req.user.id;
  res.json(orders.filter((o) => o.userId === userId));
});

// ============================================
// GET /api/orders/:id
// ============================================
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order tidak ditemukan' });

  // TODO(human): pakai bolehAksesOrder() sebelum mengirim data.
  // Pertanyaan: kalau order ada tapi bukan milik user, lebih baik balas 403 atau 404?
  // Petunjuk: kalau balasannya 403, penyerang jadi tahu bahwa ID itu ADA.
  if (!bolehAksesOrder(req.user, order)) {
    // TODO(human): tentukan status dan pesan yang tepat
  }

  res.json(order);
});

// ============================================
// PATCH /api/orders/:id
// ============================================
app.patch('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order tidak ditemukan' });

  // TODO(human): cek kepemilikan SEBELUM mengubah data (urutan itu penting, kenapa?)

  if (typeof req.body?.alamat === 'string') order.alamat = req.body.alamat;
  res.json(order);
});

// ============================================
// DELETE /api/orders/:id
// ============================================
app.delete('/api/orders/:id', (req, res) => {
  const index = orders.findIndex((o) => o.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Order tidak ditemukan' });

  // TODO(human): cek kepemilikan SEBELUM menghapus

  const [hapus] = orders.splice(index, 1);
  res.json({ dihapus: hapus });
});

// ============================================
// GET /api/admin/users
// ============================================
// TODO(human): pasang requireRole('admin') di route ini.
// Petunjuk: middleware bisa disisipkan di antara path dan handler.
//
// Bonus (audit log): setiap kali endpoint admin diakses, console.log siapa,
// kapan, dan endpoint apa. Kenapa log ini berguna saat ada insiden?
//
// Bonus (least privilege): perlukah email semua user dikirim? Kirim seperlunya saja.
app.get('/api/admin/users', (req, res) => {
  void requireRole; // hapus baris ini setelah requireRole dipakai
  res.json(users);
});

app.get('/', (req, res) => {
  res.json({
    message: 'API order versi aman (setelah kamu perbaiki)',
    caraLogin: 'Kirim header X-User-Id: 1 (andi), 2 (sinta), atau 3 (admin)',
  });
});

// ============================================
// Start server
// ============================================
const PORT = 3051;
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
app.listen(PORT, '127.0.0.1', () => {
  console.log(`API (versi yang kamu perbaiki) berjalan di http://127.0.0.1:${PORT}`);
  console.log('Ulangi semua percobaan dari catatan.md ke port ini. Semua harus GAGAL.');
});

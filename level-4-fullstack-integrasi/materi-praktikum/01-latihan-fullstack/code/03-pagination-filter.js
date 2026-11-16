// ============================================================
// BONUS — Pagination & Filtering
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express cors dotenv
// Jalankan: node code/03-pagination-filter.js   (http://localhost:3001)
// ============================================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Data in-memory: 50 artikel
const articles = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Artikel ${i + 1}: ${['React Patterns', 'Express Middleware', 'Database Design', 'API Security', 'State Management'][i % 5]}`,
  content: `Konten lengkap untuk artikel ke-${i + 1}. Ini adalah artikel yang membahas topik penting dalam pengembangan web modern.`,
  author: `Author ${(i % 4) + 1}`,
  authorId: (i % 4) + 1,
  category: ['tech', 'life', 'business', 'science'][i % 4],
  status: i % 6 === 0 ? 'draft' : 'published',
  views: Math.floor(Math.random() * 5000),
  likes: Math.floor(Math.random() * 200),
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  tags: [['react', 'js'], ['node', 'express'], ['db', 'sql'], ['api', 'rest'], ['state', 'redux']][i % 5],
}));

// TODO(human): fungsi getPagination(page, limit, totalItems).
// Petunjuk : Kembalikan info yang dibutuhkan frontend untuk menggambar tombol
//            Prev/Next: halaman sekarang, limit, total item, total halaman,
//            ada halaman berikut/sebelumnya atau tidak. Tanya dirimu: berapa
//            totalPages kalau totalItems = 0? Kalau 51 item dan limit 10?
// Selesai kalau: kamu bisa menebak hasilnya di kertas untuk (page 1, limit 10,
//            total 51) sebelum menjalankannya, dan tebakanmu benar.

// TODO(human): GET /api/articles — daftar artikel dengan filter, sort, pagination.
// Petunjuk : Query: page (default 1), limit (default 10, maksimal 100), status,
//            category, authorId (cocok persis), q (cari di judul, tidak peka
//            huruf besar/kecil), sortBy (createdAt | views | likes, default
//            createdAt), order (asc | desc, default desc).
//            Urutan kerja yang masuk akal: filter -> sort -> baru potong
//            halaman. Kenapa urutannya penting? Kalau sortBy berisi nilai
//            ngawur (misal "password"), apa yang kamu lakukan? Bentuk response:
//            data + meta (pagination dan filter yang dipakai).
// Selesai kalau: kombinasi ?status=published&category=tech&sortBy=views&order=desc
//            memberi hasil terurut benar, page=0/-1/abc/limit=1000 tidak
//            membuat server crash, dan page melebihi total menghasilkan
//            respons yang kamu putuskan dengan sadar.

// TODO(human): GET /api/articles/:id — satu artikel + artikel terkait.
// Petunjuk : "Terkait" di sini = artikel lain dari penulis yang sama, maksimal
//            3. Id tak ada -> 404 dengan format error yang konsisten.
// Selesai kalau: respons berisi artikel + daftar terkait yang tidak memuat
//            artikel itu sendiri.

// TODO(human): GET /api/articles/stats — statistik agregat.
// Petunjuk : Total, jumlah published, jumlah draft, hitungan per kategori dan
//            per penulis. PERHATIAN urutan route: '/api/articles/:id' vs
//            '/api/articles/stats' — mana yang harus didaftarkan lebih dulu?
// Selesai kalau: /api/articles/stats mengembalikan angka yang jumlahnya cocok
//            dengan total (published + draft = total).

app.get('/api/health', (req, res) => res.json({ status: 'ok', total: articles.length }));

app.listen(PORT, () => {
  console.log(`Pagination server running at http://localhost:${PORT}`);
});

// ============================================================
// FRONTEND (di proyek Vite terpisah, bukan di file ini)
// ============================================================
// TODO(human): src/pages/ArticlesPage.jsx — daftar dengan search, filter, pagination.
// Petunjuk : Simpan page dan filter sebagai state. Saat filter berubah, apa
//            yang harus terjadi pada page? Kapan tombol Prev/Next dimatikan?
// Selesai kalau: mengubah filter kembali ke halaman 1, dan tombol Prev/Next
//            mengikuti info pagination dari server.

// TODO(human): src/pages/ArticleDetail.jsx — detail artikel + terkait.
// Petunjuk : Tangani tiga keadaan: loading, tidak ditemukan, dan sukses.
// Selesai kalau: id ngawur menampilkan pesan "tidak ditemukan", bukan layar putih.

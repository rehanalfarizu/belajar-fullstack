// ============================================================
// SOAL 03 (backend) — REST API CRUD Posts
// ============================================================
// Starter ini sengaja berisi kerangka + TODO(human). Tulis isinya sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install express cors dotenv
// Jalankan: node code/02-rest-api-crud.js   (http://localhost:3001)
// Uji     : pakai curl -i, lihat status code dan bentuk response-nya.
// ============================================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Database in-memory: 20 post contoh
let posts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Judul Post ${i + 1}`,
  content: `Ini adalah konten untuk post ke-${i + 1}. Menarik dan informatif untuk pembaca.`,
  author: `Author ${(i % 3) + 1}`,
  authorId: (i % 3) + 1,
  status: i % 5 === 0 ? 'draft' : 'published',
  tags: ['tech', 'life', 'tutorial'].slice(i % 3, (i % 3) + 1),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  likes: Math.floor(Math.random() * 50),
}));
let nextId = 21; // dipakai saat membuat post baru

// ============================================================
// HELPER
// ============================================================

// TODO(human): helper format response error dan sukses.
// Petunjuk : Frontend akan membaca response ini terus-menerus, jadi bentuknya
//            harus SELALU sama. Putuskan dulu: error pakai { error: { code,
//            message } } dan sukses pakai { data }? Tulis keputusanmu di
//            jurnal, lalu pakai konsisten di semua endpoint di bawah.
// Selesai kalau: semua endpoint (sukses maupun gagal) memanggil helper yang
//            sama, tidak ada `res.json({ ... })` dengan bentuk ad hoc.

// ============================================================
// ENDPOINT CRUD
// ============================================================

// TODO(human): GET /api/posts — daftar post dengan pagination.
// Petunjuk : Query: page (default 1), limit (default 10, maksimal 50), status
//            (opsional: published | draft). Response perlu data + info
//            halaman (page, limit, total, totalPages).
//            Pikirkan: apa yang terjadi kalau page=0, page=-1, limit=1000,
//            atau page=abc? Putuskan perilakunya, lalu uji dengan curl.
// Selesai kalau: ?page=2&limit=5 mengembalikan 5 post berbeda dari halaman 1,
//            dan input aneh tidak membuat server crash.

// TODO(human): GET /api/posts/:id — detail satu post.
// Petunjuk : id dari URL itu string. Apa tipe `id` di array? Kalau tidak
//            ketemu, status code apa yang tepat?
// Selesai kalau: id yang ada -> 200, id 99999 -> 404 dengan format error
//            yang sama seperti endpoint lain.

// TODO(human): POST /api/posts — buat post baru.
// Petunjuk : Body: title (wajib, min 5 karakter), content (wajib, min 20),
//            author (wajib), tags (opsional). Status awal 'draft'. Validasi
//            DI SERVER, jangan percaya frontend. Beri tahu field mana yang
//            salah, bukan cuma "gagal".
// Selesai kalau: body kosong -> 400, body valid -> 201 (bukan 200) berisi
//            post baru, dan post itu muncul di GET /api/posts.

// TODO(human): PUT /api/posts/:id — ubah post.
// Petunjuk : Body boleh berisi title/content/author/status/tags. Validasi
//            hanya field yang dikirim. Status hanya boleh draft | published.
//            Pikirkan beda PUT (ganti keseluruhan) dan PATCH. Versi ini
//            boleh kamu longgarkan, tapi tulis alasannya di jurnal.
// Selesai kalau: id tak ada -> 404, data salah -> 400, sukses -> 200 dan
//            data berubah saat di-GET ulang.

// TODO(human): PATCH /api/posts/:id — ubah sebagian (hanya status).
// Petunjuk : Hanya field `status` yang diterima di versi ini.
// Selesai kalau: status valid mengubah post, status ngawur -> 400,
//            id tak ada -> 404.

// TODO(human): DELETE /api/posts/:id — hapus post.
// Petunjuk : Pilih status sukses (200 dengan pesan, atau 204 tanpa isi) dan
//            tulis alasanmu. Pastikan setelah dihapus, GET id yang sama 404.
// Selesai kalau: hapus pertama sukses, hapus kedua pada id yang sama -> 404.

// TODO(human): GET /api/posts/search — cari post.
// Petunjuk : Query ?q=kata (cari di title, tidak peka huruf besar/kecil) dan
//            ?status=. PERHATIAN: Express mencocokkan route dari atas ke
//            bawah. Apa yang terjadi kalau '/api/posts/:id' terdaftar lebih
//            dulu dari '/api/posts/search'? Coba buktikan dengan curl.
// Selesai kalau: /api/posts/search?q=post mengembalikan hasil pencarian,
//            BUKAN error "post tidak ditemukan" dari route :id.

app.get('/api/health', (req, res) => res.json({ status: 'ok', totalPosts: posts.length }));

app.listen(PORT, () => {
  console.log(`CRUD API server running at http://localhost:${PORT}`);
});

// ============================================================
// FRONTEND (di proyek Vite terpisah, bukan di file ini)
// ============================================================
// TODO(human): src/api/postsFetch.js dan src/api/postsAxios.js — client API.
// Petunjuk : Versi fetch: ingat fetch TIDAK melempar error untuk 404/500, cek
//            `response.ok` sendiri. Versi axios: buat instance dengan baseURL
//            dan timeout. Pastikan pesan error dari server (format error di
//            atas) sampai ke komponen sebagai teks yang bisa ditampilkan.
// Selesai kalau: server dimatikan -> UI menampilkan pesan error, bukan layar
//            kosong atau crash.

// TODO(human): src/pages/PostsPage.jsx — daftar post + pagination + hapus.
// Petunjuk : Tiga state yang harus kamu tangani: loading, error, data kosong.
//            Setelah hapus, daftar harus ikut berubah tanpa reload.
// Selesai kalau: ganti halaman mengambil data baru, dan tab Network tidak
//            menunjukkan request dobel yang tidak perlu.

// TODO(human): src/pages/CreatePostPage.jsx — form buat post.
// Petunjuk : Validasi di sisi client hanya untuk kenyamanan. Server tetap
//            yang menentukan. Tampilkan error per field dari response 400.
// Selesai kalau: kirim form kosong menampilkan pesan per field, dan form
//            valid membuat post yang muncul di daftar.

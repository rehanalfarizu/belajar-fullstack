// ============================================================
// 03 — SQL INJECTION
// ============================================================
// Bagian 1 (RENTAN) sengaja ada untuk dianalisis. Bagian aman kamu tulis sendiri.
// Jawaban lengkap ada di ../solusi-jangan-dibuka-dulu.md (buka SETELAH
// punyamu jalan, atau benar-benar buntu).
//
// Install : npm install pg dotenv
// Butuh   : PostgreSQL lokal + DATABASE_URL di .env (lihat .env.example)
// ============================================================

const { Pool } = require('pg');
require('dotenv').config();

// TODO(human): konfigurasi SSL untuk production.
// Petunjuk : Di lokal biasanya SSL mati. Di production, jangan mematikan
//            verifikasi sertifikat (`rejectUnauthorized: false` membuat koneksi
//            bisa disadap). Baca dokumentasi provider databasemu tentang CA
//            certificate.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/testdb',
});

// ============================================================
// BAGIAN 1 — KODE RENTAN (UNTUK DIANALISIS, JANGAN DIPAKAI)
// ============================================================
// Fungsi di bawah hanya membangun STRING query supaya kamu bisa melihat
// kerusakannya. Jangan pernah menjalankan hasilnya dengan input pengguna.

const vulnerableExamples = {
  searchByName: (name) => `SELECT * FROM users WHERE name = '${name}'`,
  getUserById: (id) => `SELECT * FROM users WHERE id = ${id}`,
  loginQuery: (email, password) =>
    `SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}'`,
};

// Latihan analisis (tulis di jurnal, jangan di sini):
//   Untuk tiap fungsi di atas, input apa yang membuat query berubah makna?
//   Cetak hasil string-nya dengan input tersebut dan jelaskan kenapa berbahaya.

// ============================================================
// BAGIAN 2 — IMPLEMENTASI AMAN (TULIS SENDIRI)
// ============================================================

// TODO(human): getUserByEmail(email) — SELECT berparameter.
// Petunjuk : Placeholder `$1` di pg dan nilai di array kedua pool.query. Jangan
//            ambil kolom password_hash kalau tidak perlu.
// Selesai kalau: email berisi tanda kutip tidak merusak query; tak ada hasil ->
//            null.
async function getUserByEmail(email) {}

// TODO(human): getUserById(id) — validasi tipe + berparameter.
// Petunjuk : id dari URL itu string. Ubah dan validasi dulu (parseId di bawah),
//            baru query.
// Selesai kalau: "1 OR 1=1" ditolak sebelum menyentuh database.
async function getUserById(id) {}

// TODO(human): createUser(name, email, passwordHash) — INSERT berparameter.
// Selesai kalau: mengembalikan user baru TANPA password_hash.
async function createUser(name, email, passwordHash) {}

// TODO(human): updateUserBio(userId, bio) — UPDATE berparameter.
// Selesai kalau: bio berisi ' WHERE role = 'admin hanya tersimpan sebagai teks.
async function updateUserBio(userId, bio) {}

// TODO(human): deleteUser(userId) — DELETE berparameter.
// Selesai kalau: mengembalikan apakah ada baris yang benar-benar terhapus.
async function deleteUser(userId) {}

// ============================================================
// BAGIAN 3 — LIKE
// ============================================================

// TODO(human): escapeLikePattern(input) — netralkan %, _, dan \.
// Petunjuk : Parameter mencegah injeksi, tapi `%` dan `_` tetap punya arti
//            khusus di LIKE. Urutan escape penting: karakter escape-nya
//            sendiri diproses dulu atau belakangan? Cek dokumentasi PostgreSQL
//            tentang LIKE ... ESCAPE.
// Selesai kalau: pencarian "100%" mencari teks literal "100%", bukan semua baris.
function escapeLikePattern(input) {}

// TODO(human): searchPostsByTitle(keyword) — pencarian LIKE yang aman.
// Petunjuk : Tanda % pembungkus ditaruh di NILAI parameter, bukan di string query.
// Selesai kalau: keyword "%" tidak mengembalikan seluruh tabel.
async function searchPostsByTitle(keyword) {}

// ============================================================
// BAGIAN 4 — ORDER BY
// ============================================================

const ALLOWED_ORDER_COLUMNS = ['id', 'created_at', 'updated_at', 'title', 'name', 'email'];
const ALLOWED_ORDER_DIR = ['ASC', 'DESC'];

// TODO(human): getSafeOrderBy(userColumn, userDirection)
// Petunjuk : Nama kolom dan arah urut TIDAK bisa diganti placeholder `$n`.
//            Jadi bagaimana mengamankannya? (Jawab di jurnal: soal 3C.) Gunakan
//            allowlist di atas dan tentukan nilai default.
// Selesai kalau: ("DROP TABLE", "hax") menghasilkan nilai default yang aman.
function getSafeOrderBy(userColumn, userDirection) {}

// TODO(human): getPostsPaginated(page, limit, sortBy, sortDir)
// Petunjuk : Gabungkan getSafeOrderBy + LIMIT/OFFSET berparameter + hitung total.
//            Validasi page dan limit dulu.
// Selesai kalau: sortBy="title; DROP TABLE posts" tidak berefek apa-apa.
async function getPostsPaginated(page = 1, limit = 10, sortBy = 'id', sortDir = 'DESC') {}

// ============================================================
// BAGIAN 5 — VALIDASI & ERROR
// ============================================================

// TODO(human): parseId(id)
// Petunjuk : Angka bulat positif, atau lempar error dengan status 400.
// Selesai kalau: "42" -> 42; "abc", "-1", "0", "1 OR 1=1" ditolak.
function parseId(id) {}

// TODO(human): handleDatabaseError(err, res)
// Petunjuk : Catat error lengkap di server, tapi kirim pesan generik ke klien.
//            Apa saja yang tidak boleh bocor ke klien (pesan SQL, nama tabel,
//            stack trace)?
// Selesai kalau: respons klien tidak memuat teks dari err.message.
function handleDatabaseError(err, res) {}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUserBio,
  deleteUser,
  searchPostsByTitle,
  getPostsPaginated,
  getSafeOrderBy,
  parseId,
  escapeLikePattern,
  handleDatabaseError,
  vulnerableExamples,
};

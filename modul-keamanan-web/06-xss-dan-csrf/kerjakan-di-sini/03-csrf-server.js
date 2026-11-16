/**
 * ⚠️ LAB CSRF — BANK PALSU (SENGAJA RENTAN SAMPAI KAMU PERBAIKI) ⚠️
 *
 * File ini menyalakan DUA server, dua-duanya hanya di laptopmu:
 *   - http://127.0.0.1:3060  → "Bank Latihan" (target, punya form transfer)
 *   - port 3062              → "halaman penyerang" (attacker-page.html)
 *
 * Halaman penyerang HANYA menargetkan bank latihan di 127.0.0.1:3060.
 * Jangan mengubahnya untuk menargetkan website lain.
 *
 * Jalankan:
 *   cd modul-keamanan-web/06-xss-dan-csrf/kerjakan-di-sini
 *   npm install
 *   node 03-csrf-server.js
 *
 * Eksperimen (catat hasilnya di catatan.md):
 *   1. Buka http://127.0.0.1:3060, klik "Login sebagai Budi", lihat saldo.
 *   2. Di tab baru buka http://127.0.0.1:3062, klik tombol hadiahnya.
 *      Kembali ke tab bank, refresh. Saldo Budi berkurang?
 *   3. Ulangi dengan membuka halaman penyerang di http://localhost:3062
 *      (beda "site" dengan 127.0.0.1). Hasilnya sama? Browser apa yang kamu pakai?
 *
 * Setelah itu, perbaiki TODO(human) di bawah sampai eksperimen 2 dan 3 GAGAL,
 * tapi transfer lewat form asli di bank tetap BERHASIL.
 */

const crypto = require('node:crypto');
const path = require('node:path');
const express = require('express');
const session = require('express-session');

// ============================================
// Data rekening palsu (in-memory)
// ============================================
const rekening = {
  budi: { nama: 'Budi', saldo: 1000000 },
  siti: { nama: 'Siti', saldo: 500000 },
  'rekening-penyerang': { nama: 'Penyerang', saldo: 0 },
};
const riwayat = [];

// ============================================
// Server BANK (port 3060)
// ============================================
const bank = express();
bank.use(express.urlencoded({ extended: false }));

// ============================================
// TODO(human): Atur atribut SameSite cookie session
// ============================================
// Petunjuk:
// - Cari opsi `sameSite` di dokumentasi express-session (bagian cookie).
// - Ada 3 nilai: 'strict', 'lax', 'none'. Apa bedanya? Mana yang paling ketat?
// - Kalau tidak diisi, setiap browser punya perilaku default sendiri. Itu sebabnya
//   hasil eksperimen 3 bisa beda antara Chrome dan Firefox. Catat browser-mu.
// - Pertanyaan penting: di eksperimen 2 (127.0.0.1:3062 → 127.0.0.1:3060), port-nya
//   beda tapi host-nya sama. Apakah browser menganggapnya "same-site"?
//   Kalau iya, apakah SameSite saja cukup? Itulah alasan CSRF token tetap perlu.
bank.use(session({
  secret: 'contoh-secret-latihan-jangan-dipakai',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // TODO(human): tambahkan sameSite di sini
  },
}));

// ============================================
// TODO(human): Buat CSRF token per session
// ============================================
// Ide dasarnya: server memberi setiap session sebuah "kata sandi rahasia kecil"
// (token) yang ditaruh di form. Halaman penyerang tidak bisa membaca token itu,
// jadi request palsunya tidak akan membawa token yang benar.
//
// Petunjuk:
// - Token harus ACAK dan susah ditebak. Cari fungsi pembuat bilangan acak yang
//   aman di dokumentasi node:crypto (https://nodejs.org/api/crypto.html).
//   Kenapa Math.random() tidak boleh dipakai untuk ini?
// - Simpan token di req.session supaya bisa dicek saat POST.
// - Buat token cukup sekali per session (kalau belum ada), lalu pakai terus.
function ambilCsrfToken(req) {
  // TODO(human): kembalikan token milik session ini (buat dulu kalau belum ada)
  void crypto; void req; // hapus baris ini setelah dipakai
  return '';
}

// ============================================
// TODO(human): Middleware validasi CSRF token
// ============================================
// Langkah:
// 1. Ambil token yang dikirim form (nama field-nya kamu tentukan, misal "_csrf")
// 2. Bandingkan dengan token di session
// 3. Kalau tidak ada atau tidak cocok → tolak dengan 403
//
// Bonus: membandingkan pakai === bisa bocor lewat perbedaan waktu (timing attack).
// Cari crypto.timingSafeEqual(). Perhatikan: fungsi itu melempar error kalau
// panjang kedua buffer beda. Bagaimana kamu menanganinya?
function cekCsrf(req, res, next) {
  // TODO(human): tulis kodemu di sini
  next();
}

function rupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

bank.get('/', (req, res) => {
  const user = req.session.user ? rekening[req.session.user] : null;

  if (!user) {
    return res.send(`<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Bank Latihan</title></head>
<body style="font-family: system-ui; max-width: 560px; margin: 40px auto;">
  <p style="background:#f8d7da;padding:10px;border-radius:6px">⚠️ Bank palsu untuk latihan CSRF. Hanya di laptopmu.</p>
  <h1>🏦 Bank Latihan</h1>
  <form method="POST" action="/login"><button>Login sebagai Budi</button></form>
</body>
</html>`);
  }

  const csrfToken = ambilCsrfToken(req);
  // TODO(human): token di atas belum dipakai di form. Tambahkan ke form transfer
  // sebagai input tersembunyi. Petunjuk: <input type="hidden" name="..." value="...">
  void csrfToken;

  const opsiTujuan = Object.keys(rekening)
    .filter((id) => id !== req.session.user)
    .map((id) => `<option value="${id}">${rekening[id].nama}</option>`)
    .join('');

  const daftarRiwayat = riwayat
    .map((r) => `<li>${rekening[r.dari].nama} → ${rekening[r.ke].nama}: ${rupiah(r.jumlah)}</li>`)
    .join('');

  res.send(`<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Bank Latihan</title></head>
<body style="font-family: system-ui; max-width: 560px; margin: 40px auto;">
  <p style="background:#f8d7da;padding:10px;border-radius:6px">⚠️ Bank palsu untuk latihan CSRF. Hanya di laptopmu.</p>
  <h1>🏦 Halo, ${user.nama}</h1>
  <p>Saldo kamu: <strong>${rupiah(user.saldo)}</strong></p>

  <h2>Transfer</h2>
  <form method="POST" action="/transfer">
    <label>Ke: <select name="ke">${opsiTujuan}</select></label><br><br>
    <label>Jumlah: <input type="number" name="jumlah" min="1" required></label><br><br>
    <button>Kirim</button>
  </form>

  <h2>Riwayat</h2>
  <ul>${daftarRiwayat || '<li>Belum ada transaksi</li>'}</ul>

  <form method="POST" action="/logout"><button>Logout</button></form>
</body>
</html>`);
});

// Login palsu tanpa password, supaya lab ini fokus ke CSRF (login yang benar ada di modul 04).
bank.post('/login', (req, res) => {
  req.session.user = 'budi';
  res.redirect('/');
});

bank.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// ❌ RENTAN: cekCsrf belum melakukan apa-apa
bank.post('/transfer', cekCsrf, (req, res) => {
  if (!req.session.user) return res.status(401).send('Belum login');

  const dari = req.session.user;
  const ke = req.body.ke;
  const jumlah = Number(req.body.jumlah);

  if (!rekening[ke] || ke === dari || !Number.isInteger(jumlah) || jumlah <= 0) {
    return res.status(400).send('Data transfer tidak valid. <a href="/">Kembali</a>');
  }
  if (rekening[dari].saldo < jumlah) {
    return res.status(400).send('Saldo tidak cukup. <a href="/">Kembali</a>');
  }

  rekening[dari].saldo -= jumlah;
  rekening[ke].saldo += jumlah;
  riwayat.push({ dari, ke, jumlah });
  console.log(`[transfer] ${dari} → ${ke}: ${jumlah} (Origin: ${req.get('Origin') || '-'})`);

  res.redirect('/');
});

// ============================================
// Server PENYERANG (port 3062) — hanya menyajikan attacker-page.html
// ============================================
const penyerang = express();
penyerang.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'attacker-page.html'));
});

// ============================================
// Start kedua server
// ============================================
// '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
// Ini penting: bank latihan ini sengaja rentan, jangan sampai bisa dibuka
// orang lain di WiFi yang sama.
bank.listen(3060, '127.0.0.1', () => {
  console.log('🏦 Bank Latihan      : http://127.0.0.1:3060');
});
penyerang.listen(3062, '127.0.0.1', () => {
  console.log('😈 Halaman penyerang : http://127.0.0.1:3062  (atau http://localhost:3062 untuk eksperimen 3)');
});

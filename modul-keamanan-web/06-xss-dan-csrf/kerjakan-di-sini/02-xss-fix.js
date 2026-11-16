/**
 * Perbaiki XSS — Kolom Komentar versi Server
 *
 * ⚠️ Saat pertama dijalankan, server ini MASIH RENTAN (stored XSS),
 * sama seperti 01-xss-lab.html, bedanya komentar disimpan di server.
 * Jalankan hanya di laptopmu. Tugasmu membuatnya aman.
 *
 * TUGAS:
 *   1. Lengkapi escapeHtml() supaya teks dari user tampil sebagai TEKS, bukan HTML
 *   2. Pakai escapeHtml() di tempat yang tepat saat merender komentar
 *   3. (Lapis kedua) Tambahkan header Content-Security-Policy
 *
 * Jalankan:
 *   cd modul-keamanan-web/06-xss-dan-csrf/kerjakan-di-sini
 *   npm install
 *   node 02-xss-fix.js --cek   ← cek escapeHtml() tanpa menyalakan server
 *   node 02-xss-fix.js         ← nyalakan server di http://127.0.0.1:3061
 *
 * Selesai kalau: semua cek ✅, dan payload dari 01-xss-lab.html yang kamu
 * kirim lewat form di port 3061 tampil sebagai teks biasa (tidak ada alert).
 */

const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: false }));

// ============================================
// TODO(human): Implementasi escapeHtml
// ============================================
// Tujuan: mengubah karakter "berbahaya" di HTML menjadi bentuk aman
// (HTML entity), supaya browser menampilkannya apa adanya.
//
// Pertanyaan pemandu:
// - Karakter apa saja yang punya arti khusus di HTML? Minimal ada 5.
//   Petunjuk: buka https://developer.mozilla.org/en-US/docs/Glossary/Character_reference
// - Entity untuk masing-masing karakter itu apa?
// - Urutan penggantian penting! Kalau kamu mengganti "<" dulu menjadi "&lt;",
//   lalu mengganti "&" menjadi "&amp;", apa yang terjadi pada "&lt;" tadi?
// - Kenapa tanda kutip (" dan ') juga perlu di-escape? Pikirkan kasus
//   teks user masuk ke dalam atribut, misal <input value="...">.
//
// Catatan: di project sungguhan, template engine (EJS, Handlebars) atau
// framework (React, Vue) sudah melakukan escaping otomatis. Kamu menulisnya
// sendiri di sini supaya paham apa yang terjadi di balik layar.
function escapeHtml(teks) {
  // TODO(human): tulis kodemu di sini
  return String(teks);
}

// ============================================
// Data komentar (in-memory)
// ============================================
const komentar = [
  { nama: 'Rina', isi: 'Artikelnya membantu banget, makasih!' },
];

// ============================================
// TODO(human): Header Content-Security-Policy (lapis kedua)
// ============================================
// Kalau escaping-mu suatu hari kelupaan di satu tempat, CSP bisa mencegah
// script asing berjalan. Pasang header ini untuk semua response.
//
// Petunjuk:
// - Baca https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
// - Coba mulai dari directive `default-src`. Nilai apa yang artinya "hanya dari server ini sendiri"?
// - Eksperimen: pasang CSP TANPA memperbaiki escapeHtml dulu, lalu kirim payload
//   <img src=x onerror="alert('xss')">. Apakah alert masih muncul? Lihat Console di DevTools.
// - Kalau setelah memasang CSP tampilan halaman jadi polos (CSS hilang), itu bukan
//   bug acak. Cari tahu kenapa <style> di dalam HTML ikut diblokir, dan directive
//   apa yang mengatur style.
// - Pertanyaan: kenapa CSP disebut "lapis kedua", bukan pengganti escaping?
app.use((req, res, next) => {
  // TODO(human): set header di sini
  next();
});

// ============================================
// Halaman komentar
// ============================================
app.get('/', (req, res) => {
  // TODO(human): bagian mana di bawah ini yang berasal dari user?
  // Bungkus SEMUA bagian itu dengan escapeHtml(). Jangan ada yang terlewat.
  const daftar = komentar
    .map((k) => `<div class="komentar"><strong>${k.nama || 'Anonim'}</strong>: ${k.isi}</div>`)
    .join('');

  res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Komentar (versi server)</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; padding: 0 16px; }
    textarea, input { width: 100%; padding: 8px; box-sizing: border-box; margin-bottom: 8px; }
    .komentar { border-bottom: 1px solid #ddd; padding: 8px 0; }
  </style>
</head>
<body>
  <h1>Komentar (versi server, port 3061)</h1>
  <form method="POST" action="/komentar">
    <input name="nama" placeholder="Nama kamu" maxlength="40">
    <textarea name="isi" placeholder="Tulis komentar..." maxlength="500"></textarea>
    <button type="submit">Kirim</button>
  </form>
  <h2>Komentar</h2>
  ${daftar}
</body>
</html>`);
});

app.post('/komentar', (req, res) => {
  const nama = typeof req.body.nama === 'string' ? req.body.nama.slice(0, 40) : '';
  const isi = typeof req.body.isi === 'string' ? req.body.isi.slice(0, 500) : '';
  if (isi.trim()) {
    // Perhatikan: data disimpan APA ADANYA. Escaping dilakukan saat MENAMPILKAN.
    // Pertanyaan untuk catatan.md: kenapa escape saat output, bukan saat menyimpan?
    komentar.push({ nama, isi });
  }
  res.redirect('/');
});

// ============================================
// Cek otomatis escapeHtml (jangan diubah)
// ============================================
function jalankanCek() {
  const kasus = [
    ['Teks biasa tidak berubah', 'Halo semua', 'Halo semua'],
    ['Tag script jadi teks', '<script>alert(1)</script>', '&lt;script&gt;alert(1)&lt;/script&gt;'],
    ['Tag img jadi teks', '<img src=x onerror="alert(1)">', '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'],
    ['Ampersand di-escape', 'Tom & Jerry', 'Tom &amp; Jerry'],
    ['Teks mirip entity tetap tampil apa adanya', '&lt;', '&amp;lt;'],
    ['Petik satu di-escape', "it's", 'it&#39;s'],
  ];

  console.log('Cek escapeHtml()\n');
  let lulus = 0;
  kasus.forEach(([nama, input, harapan], i) => {
    const hasil = escapeHtml(input);
    // Petik satu boleh ditulis &#39; atau &#x27; — dua-duanya benar.
    const ok = hasil === harapan || hasil === harapan.replace('&#39;', '&#x27;');
    if (ok) lulus++;
    console.log(`${i + 1}. ${ok ? '✅' : '❌'} ${nama}`);
    if (!ok) console.log(`   input:   ${input}\n   harapan: ${harapan}\n   hasil:   ${hasil}`);
  });
  console.log(`\n${lulus}/${kasus.length} lulus.`);
}

if (process.argv.includes('--cek')) {
  jalankanCek();
} else {
  const PORT = 3061;
  // '127.0.0.1' = hanya laptopmu sendiri yang bisa mengakses.
  // Selama escapeHtml belum selesai, server ini rentan, jadi jangan dibuka ke jaringan.
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server komentar berjalan di http://127.0.0.1:${PORT}`);
    console.log('Jalankan "node 02-xss-fix.js --cek" untuk mengecek escapeHtml().');
  });
}

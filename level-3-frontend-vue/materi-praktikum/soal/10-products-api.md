<!-- markdownlint-disable MD024 MD028 -->

# SOAL 10 — Product Explorer: Search, Pagination, dan Request yang Aman

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Memakai `watch` untuk memicu request saat input berubah
- Menyusun query string dengan `URLSearchParams`
- Mencegah hasil request lama menimpa hasil baru (race condition)
- Membuat pagination sederhana
- Menggabungkan semua yang kamu pelajari di soal 01-09

**Difficulty:** Menengah-Lanjut • **Estimasi:** 90-150 menit

---

## Briefing

Kamu pernah cari barang di marketplace? Kamu ketik "sepatu", lalu ganti jadi
"sepatu lari". Bayangkan kalau hasil "sepatu" datang **belakangan** dan
menimpa hasil "sepatu lari". Kamu bingung, kok yang muncul sepatu pantofel?

Ini masalah nyata yang disebut **race condition**: dua request balapan, dan
yang lebih lambat menang. Analogi: kamu pesan dua kali di warung, lalu ganti
pesanan. Pelayan harus membuang pesanan pertama, bukan menyajikan dua-duanya
dan yang datang terakhir dianggap benar.

---

## Cara Kerja Latihan Ini

1. **Baca teori dulu** — [Pinia dan HTTP](../../materi-teori/06-pinia-dan-http/README.md)
   dan bagian `watch` di [Reactivity](../../materi-teori/02-reactivity-ref-reactive-computed/README.md)
2. **Buka starter** — `level-3-frontend-vue/materi-praktikum/code/10-products-api.vue`
   ([buka file](../code/10-products-api.vue)), cari semua `TODO(human)`
3. **Siapkan API** — ikuti bagian "Menyiapkan API" di [TUGAS.md](../TUGAS.md).
   Soal ini butuh API yang mendukung `page` dan `search`. Kalau kamu memakai
   file JSON statis, filter dan pagination tidak akan bekerja di server. Pakai
   backend Express buatanmu di Level 2 atau API publik, lalu sesuaikan bentuk
   datanya
4. **Ketik sendiri**
5. **Verifikasi** — pakai checklist tiap bagian

Kamu **tidak akan diberi kode jadi**.

---

## Bagian A: Susun URL dengan `URLSearchParams`

### Penjelasan

Merangkai URL dengan `+` atau template string itu rawan. Coba bayangkan user
mencari "Kaos & Celana". Tanda `&` akan dianggap pemisah parameter, dan
server menerima kata "Kaos " saja. `URLSearchParams` mengurus encoding untukmu.

### Wajib Ada di Kode Kamu

- Query dibuat dari `page` dan `search` lewat `URLSearchParams`
- Tidak ada string URL yang dirangkai manual untuk parameter

### Cara Mengerjakan

1. Baca dokumentasi `URLSearchParams` di MDN
2. Ingat: nilai harus string. `page` itu number
3. Cek hasilnya dengan `console.log` sebelum dipakai fetch

### Verifikasi

- [ ] Cari "Kaos & Celana" → di tab Network, URL berisi `%26` (bukan `&`
      polos di tengah kata)
- [ ] Parameter `page` dan `search` terkirim ke server

---

## Bagian B: Request + Empat Keadaan

### Penjelasan

Polanya sama dengan soal 06: batalkan request lama, nyalakan loading,
kosongkan error, ambil data, cek status, simpan hasil, matikan loading.
Bedanya, sekarang request dipicu oleh `watch`, bukan `onMounted`.

Perhatikan opsi `immediate: true` di starter. Itu yang membuat request pertama
langsung jalan tanpa perlu `onMounted`.

### Wajib Ada di Kode Kamu

- Loading, error + tombol "Coba lagi", kosong, dan list (key stabil)
- Error karena pembatalan tidak ditampilkan
- Bentuk respons API ditangani dengan aman (kalau tidak ada data, anggap
  kosong, jangan crash)

### Cara Mengerjakan

1. Tulis ulang pola soal 06 **dari ingatan**, jangan buka file lama dulu
2. Setelah selesai, baru bandingkan dengan soal 06 milikmu

### Verifikasi

- [ ] Halaman pertama tampil saat dibuka
- [ ] Ketik pencarian yang tidak ada hasilnya → pesan kosong
- [ ] Matikan server → error + tombol retry

---

## Bagian C: Cegah Race Condition

### Penjelasan

`watch` akan memanggil `loadProducts` setiap kali `search` berubah, artinya
setiap huruf yang kamu ketik. Kalau request tidak dibatalkan, respons bisa
datang tidak berurutan. Membatalkan request lama sebelum memulai yang baru
membuat hanya request terakhir yang "hidup".

### Wajib Ada di Kode Kamu

- Setiap request baru membatalkan request sebelumnya
- `onUnmounted` membatalkan request terakhir (sudah ada di starter, pahami
  kenapa)

### Cara Mengerjakan

1. Set DevTools Network ke "Slow 3G"
2. Ketik "keyboard" dengan cepat
3. Lihat kolom Status di Network

### Verifikasi

- [ ] Semua request kecuali yang terakhir berstatus `(canceled)`
- [ ] Hasil yang tampil selalu cocok dengan isi kotak pencarian

---

## Bagian D: Pagination

### Penjelasan

Pagination itu seperti halaman buku katalog. User butuh tahu sedang di
halaman berapa, dan tidak bisa mundur dari halaman 1.

Satu aturan penting: kalau user mengganti kata pencarian, page harus kembali
ke 1. Bayangkan kamu di halaman 5 hasil "sepatu", lalu cari "topi" yang cuma
punya 1 halaman. Kalau page tetap 5, hasilnya kosong padahal ada data.

### Wajib Ada di Kode Kamu

- Tombol Sebelumnya (disabled di halaman 1) dan Berikutnya
- Teks "Halaman N"
- Dibungkus `<nav>` dengan `aria-label`
- Ganti search → page kembali ke 1

### Cara Mengerjakan

1. Buat template pagination
2. Pikirkan di mana aturan "reset page" ditaruh: di watcher terpisah untuk
   `search`, atau di handler input? Coba satu, lalu cek di Network berapa
   request yang terkirim saat kamu mengetik di halaman 3. Kalau dua request
   per ketikan, cari cara supaya hanya satu
3. Bonus: matikan tombol Berikutnya kalau API memberi tahu total halaman

### Verifikasi

- [ ] Tombol Sebelumnya mati di halaman 1
- [ ] Di halaman 3, ketik pencarian baru → kembali ke halaman 1
- [ ] Navigasi bisa dipakai dengan keyboard (Tab + Enter)

---

## Bagian E (Bonus): Debounce

### Penjelasan

Membatalkan request mencegah hasil salah, tapi tetap mengirim satu request
per huruf. Debounce artinya "tunggu user berhenti mengetik sebentar (misal
300 ms), baru kirim". Analogi: lift yang menunggu beberapa detik sebelum
menutup pintu, siapa tahu masih ada orang lari mau masuk.

### Wajib Ada di Kode Kamu

- Request untuk pencarian baru dikirim setelah jeda, bukan tiap huruf
- Timer dibersihkan saat komponen dilepas

### Cara Mengerjakan

1. Pelajari `setTimeout` dan `clearTimeout`
2. Pikirkan: debounce berlaku untuk search saja, bukan untuk klik pagination

### Verifikasi

- [ ] Mengetik "keyboard" cepat → hanya 1-2 request di Network
- [ ] Klik pagination tetap langsung merespons

---

## Edge Case yang Harus Kamu Coba

- Ketik cepat di Slow 3G → hasil tidak pernah "lompat" ke kata lama
- Pencarian dengan karakter `&`, `?`, `#`, `%`
- Server balas 500 di halaman 2 → retry memuat halaman 2, bukan halaman 1
- Pindah halaman/route saat request masih jalan → tidak ada error di Console
- Spasi di awal/akhir pencarian (perhatikan `.trim` di `v-model`)

---

## Petunjuk Bertingkat

### Petunjuk 1

Kalau bingung harus mulai dari mana, matikan `watch` sementara dan panggil
`loadProducts` dari tombol. Setelah request jalan benar, baru nyalakan
`watch` lagi.

### Petunjuk 2

Race condition tidak bisa dibuktikan di koneksi cepat. Selalu tes dengan
throttling. Kalau kamu tidak pernah melihat `(canceled)`, kamu belum benar-benar
mengetesnya.

### Petunjuk 3

Untuk reset page: kalau page sudah 1 dan kamu set lagi ke 1, Vue tidak
menganggap itu perubahan. Kalau page bukan 1, mengubahnya akan memicu watcher.
Pikirkan bagaimana dua fakta ini memengaruhi jumlah request.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Search, pagination, dan retry jalan
- [ ] Tidak ada race condition di Slow 3G
- [ ] Search baru mengembalikan ke halaman 1
- [ ] URL request ter-encode dengan benar
- [ ] Console bersih
- [ ] Bonus: debounce

---

## Refleksi

1. Jelaskan race condition ke teman yang belum pernah dengar istilah itu
2. Apa bedanya membatalkan request dan debounce? Kenapa sering dipakai bersama?
3. Kalau user refresh halaman, search dan page hilang. Bagaimana cara
   menyimpannya di URL? (bahan untuk [tutorial](../../tutorial/README.md))

---

## Cara Submit / Lanjut

1. Commit hasilmu
2. Lanjut ke [soal 11 — Render Aman Tanpa v-html](11-render-aman-tanpa-v-html.md)

---

## Sudah Jalan? Baru Boleh Bandingkan dengan Contoh

Baca dulu [aturan folder contoh](../contoh/README.md). Catatan: contoh tidak
mengerjakan reset page dan debounce, jadi versimu mungkin lebih lengkap.

<!-- markdownlint-enable MD024 MD028 -->

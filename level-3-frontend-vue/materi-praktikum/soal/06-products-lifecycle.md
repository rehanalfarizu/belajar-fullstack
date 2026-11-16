<!-- markdownlint-disable MD024 MD028 -->

# SOAL 06 — Ambil Data Produk Saat Komponen Tampil (Lifecycle)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menjelaskan kapan `onMounted` dan `onUnmounted` dijalankan
- Mengambil data dari API dengan `fetch` + `async/await`
- Mengelola empat keadaan request: loading, error, kosong, sukses
- Membatalkan request yang tidak dibutuhkan lagi pakai `AbortController`
- Menyediakan tombol "Coba lagi" yang benar-benar bekerja

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Bayangkan kamu pesan makanan lewat ojek online. Ada empat kemungkinan yang
kamu lihat di aplikasi: "sedang dicari driver" (loading), "pesanan gagal"
(error), "restoran tutup, menu kosong" (kosong), dan "makanan sampai" (sukses).
Aplikasi yang baik **selalu** kasih tahu kamu sedang di keadaan mana.

Satu lagi: kalau kamu batalkan pesanan, driver harus berhenti jalan. Jangan
sampai dia tetap datang ke rumah yang penghuninya sudah pergi. Itu persis
masalah "request yang tetap jalan setelah komponen hilang".

---

## Cara Kerja Latihan Ini

1. **Baca teori dulu** — [Lifecycle dan Composable](../../materi-teori/04-lifecycle-dan-composable/README.md)
   dan bagian HTTP di [Pinia dan HTTP](../../materi-teori/06-pinia-dan-http/README.md)
2. **Buka starter** — `level-3-frontend-vue/materi-praktikum/code/06-products-lifecycle.vue`
   ([buka file](../code/06-products-lifecycle.vue)), cari semua `TODO(human)`
3. **Siapkan project + API** — cara bikin project Vite dan menyiapkan endpoint
   `/api/products` ada di [TUGAS.md](../TUGAS.md) bagian "Menyiapkan API"
4. **Ketik sendiri** — jangan copy-paste dari mana pun
5. **Verifikasi** — pakai checklist di tiap bagian

Kamu **tidak akan diberi kode jadi**. Yang kamu dapat adalah penjelasan, syarat,
dan cara mengecek. Sisanya kamu pikirkan sendiri.

---

## Bagian A: Kapan Mengambil Data (`onMounted`)

### Penjelasan

Komponen Vue punya "siklus hidup": dibuat, dipasang ke halaman (mounted),
diperbarui, lalu dilepas (unmounted). `onMounted` adalah momen "komponen sudah
nongol di layar". Ini tempat yang umum untuk mulai ambil data, karena kamu yakin
komponennya memang dipakai.

Analogi: kamu baru nyalain lampu toko setelah pintu toko dibuka, bukan saat
masih di jalan.

### Wajib Ada di Kode Kamu

- `onMounted` memanggil fungsi pemuat data
- Fungsi pemuat data adalah fungsi biasa yang bisa dipanggil ulang (nanti
  dipakai tombol retry)

### Cara Mengerjakan

1. Isi TODO di dalam `onMounted`
2. Untuk sementara, isi `loadProducts` cukup dengan `console.log` supaya kamu
   yakin fungsinya terpanggil
3. Buka DevTools → Console, refresh halaman

### Verifikasi

- [ ] Log muncul **satu kali** saat halaman dibuka
- [ ] Kamu bisa menjelaskan kenapa tidak memanggil fetch langsung di level
      atas `<script setup>` (petunjuk: baca bagian lifecycle di teori)

---

## Bagian B: Ambil Data dan Cek Response

### Penjelasan

`fetch` itu agak "polos": dia **hanya** gagal (melempar error) kalau jaringan
putus. Kalau server balas 404 atau 500, fetch tetap dianggap "berhasil". Jadi
kamu yang harus cek apakah response-nya benar-benar oke, lalu ubah body jadi
JSON.

Analogi: kurir sampai di rumahmu (fetch sukses), tapi paketnya rusak (status
500). Kamu tetap harus buka dan cek isinya.

### Wajib Ada di Kode Kamu

- Request ke `/api/products`
- Pengecekan status response; status bukan sukses diperlakukan sebagai error
- Body diubah jadi JSON lalu disimpan ke `products`
- Bisa menangani dua bentuk data: array langsung, atau object `{ data: [...] }`

### Cara Mengerjakan

1. Cek dulu bentuk respons API kamu: buka `/api/products` langsung di browser
2. Tulis langkah fetch, cek status, ubah ke JSON
3. Tulis di komentar: bentuk data yang kamu terima seperti apa
4. Simpan hasilnya ke `products`

### Verifikasi

- [ ] Tab Network menunjukkan request `products` dengan status 200
- [ ] Vue DevTools: `products` berisi array, bukan object
- [ ] Ganti URL sementara jadi `/api/tidak-ada` → muncul error, bukan list
      kosong diam-diam

---

## Bagian C: Empat Keadaan di Template

### Penjelasan

User tidak bisa lihat isi variabelmu. Yang mereka lihat cuma layar. Jadi setiap
keadaan harus punya tampilan sendiri. Urutan pengecekan penting: kalau masih
loading, jangan sekalian tampilkan "Belum ada produk".

### Wajib Ada di Kode Kamu

- `loading` dinyalakan di awal dan dimatikan di akhir, **apa pun hasilnya**
- `error` dikosongkan setiap kali request baru dimulai
- Template menampilkan tepat satu dari: loading, error, kosong, list
- Teks loading punya `role="status"`, kotak error punya `role="alert"`
- List memakai `:key` dari id produk

### Cara Mengerjakan

1. Tentukan urutan pengecekan di template (pakai rantai `v-if` / `v-else-if` / `v-else`)
2. Pikirkan di mana kamu mematikan loading supaya tetap mati walau terjadi error
   (petunjuk: `try` punya pasangan selain `catch`)
3. Tulis pesan yang bisa dimengerti orang awam, bukan cuma "Error"

### Verifikasi

- [ ] DevTools → Network → throttling "Slow 3G": teks "Memuat..." terlihat
- [ ] Tidak pernah muncul dua keadaan bersamaan
- [ ] API mengembalikan array kosong → muncul pesan kosong

---

## Bagian D: Tombol Coba Lagi

### Penjelasan

Error itu bukan jalan buntu. Kasih user jalan keluar: tombol untuk mencoba
lagi. Karena pemuat datamu adalah fungsi biasa, tombol cukup memanggil fungsi
yang sama.

### Wajib Ada di Kode Kamu

- Tombol "Coba lagi" di dalam kotak error
- Klik tombol memulai request baru dan menghapus pesan error lama

### Cara Mengerjakan

1. Matikan server API (atau set DevTools ke Offline)
2. Muat halaman → harus muncul error
3. Nyalakan lagi server/online → klik "Coba lagi"

### Verifikasi

- [ ] Setelah klik retry, pesan error lama hilang dan loading muncul
- [ ] Setelah server hidup, list produk tampil

---

## Bagian E: Batalkan Request (`AbortController` + `onUnmounted`)

### Penjelasan

`AbortController` itu seperti remote pembatal. Kamu bikin satu remote per
request, titipkan "sinyal"-nya ke fetch, lalu tekan tombol batal kapan pun
request itu tidak dibutuhkan lagi. Dua momen penting:

- Saat request baru dimulai sementara yang lama belum selesai (misal user klik
  retry berkali-kali)
- Saat komponen dilepas (`onUnmounted`), misal user pindah halaman

Request yang dibatalkan akan "gagal" dengan error khusus. Itu **bukan** error
yang perlu ditunjukkan ke user. Kamu harus bisa membedakannya dari error
sungguhan.

### Wajib Ada di Kode Kamu

- Request lama dibatalkan sebelum request baru dimulai
- `onUnmounted` membatalkan request yang masih jalan
- Error karena pembatalan tidak ditampilkan sebagai pesan error
- Loading tidak "tertinggal" dalam keadaan salah karena request yang dibatalkan

### Cara Mengerjakan

1. Baca dokumentasi `AbortController` di MDN, cari nama error yang muncul saat
   request dibatalkan
2. Isi TODO di awal `loadProducts` dan di `onUnmounted`
3. Pikirkan baik-baik bagian "matikan loading": kalau request A dibatalkan oleh
   request B, siapa yang berhak mematikan loading, A atau B?

### Verifikasi

- [ ] Slow 3G + klik "Coba lagi" 3x cepat → di Network terlihat request lama
      berstatus `(canceled)`
- [ ] Tidak muncul pesan error karena pembatalan
- [ ] Bungkus komponen dengan `v-if` di parent, lalu sembunyikan saat request
      masih jalan → request ikut `(canceled)`, tidak ada warning di Console

---

## Edge Case yang Harus Kamu Coba

- **Server 500** — ubah API supaya balas 500. Harus muncul error, bukan list kosong.
- **Offline** — DevTools → Network → Offline. Pesan error harus jelas.
- **Slow 3G + retry beruntun** — hanya hasil request terakhir yang dipakai.
- **Unmount di tengah request** — tidak ada error merah di Console.
- **Respons bukan JSON** — misal server balas HTML. Apa yang terjadi? Pesannya
  masuk akal?

---

## Petunjuk Bertingkat

Buka satu per satu, hanya kalau sudah mentok 15 menit.

### Petunjuk 1

Tulis alurnya dalam bahasa Indonesia dulu sebagai komentar: "batalkan yang lama,
bikin remote baru, nyalakan loading, ..." Baru ubah tiap baris jadi kode.

### Petunjuk 2

Blok `try` punya tiga bagian. Yang satu jalan kalau sukses, satu jalan kalau
gagal, dan satu lagi jalan **selalu**. Bagian "selalu" itu tempat yang cocok
untuk urusan loading.

### Petunjuk 3

Sinyal dari remote pembatal punya properti yang memberi tahu apakah ia sudah
dibatalkan. Kalau request ini sudah dibatalkan, berarti ada request lain yang
sekarang "memegang" loading. Biarkan dia yang mematikannya.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Halaman memuat produk otomatis saat dibuka
- [ ] Keempat keadaan bisa kamu tunjukkan satu per satu
- [ ] Retry bekerja setelah error
- [ ] Request lama `(canceled)` saat ada request baru
- [ ] Request dibatalkan saat komponen dilepas
- [ ] Console bersih, tidak ada error atau warning

---

## Refleksi

Jawab di catatanmu, pakai kata-katamu sendiri:

1. Apa bedanya error jaringan dan status 500 dari sudut pandang `fetch`?
2. Kenapa error karena pembatalan tidak boleh ditampilkan ke user?
3. Apa yang terjadi kalau `onUnmounted` tidak membatalkan request?

---

## Cara Submit / Lanjut

1. Pastikan semua checklist tercentang
2. Commit hasilmu sendiri dengan pesan yang jelas
3. Lanjut ke [soal 07 — Composable useCounter](07-use-counter.md)

---

## Sudah Jalan? Baru Boleh Bandingkan dengan Contoh

Kalau semua verifikasi lolos, baca dulu [aturan folder contoh](../contoh/README.md),
lalu bandingkan dengan solusi referensi. Cari minimal satu perbedaan dan
jelaskan mana yang menurutmu lebih baik dan kenapa.

<!-- markdownlint-enable MD024 MD028 -->

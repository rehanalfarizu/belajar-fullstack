# Soal 01: Membaca ERD

**Kapan:** Minggu 10, setelah latihan `01-koneksi-postgres`.
**Bahan:** [ERD studi kasus](../studi-kasus/02-erd-pemesanan.md), [PRD](../studi-kasus/01-prd-pemesanan.md).
**Waktu:** 2 sesi. Tulis jawaban di `latihan-saya/membaca-dokumen/01-membaca-erd.md`.

Jangan buka `contoh/` sebelum semua nomor terjawab.

## A. Membaca hubungan

1. ERD punya 6 garis. Tulis setiap garis sebagai **dua kalimat**, satu per arah
   (total 12 kalimat). Contoh: "Satu user membuat nol atau banyak order. Satu
   order dibuat oleh tepat satu user."
2. Kenapa FK-nya `orders.user_id`, bukan `users.order_id`? Apa yang rusak kalau
   dibalik?
3. Ada dua garis dari `users` ke tabel selain `orders`. Apa artinya masing-masing,
   dan kenapa tabelnya tetap `users`, bukan tabel `admins` terpisah?

## B. Menebak alasan desain

4. `orders` punya `agreed_price` padahal `packages.price` sudah ada. Kalimat mana
   di PRD yang membuat kolom ini wajib ada? Apa yang salah kalau kolom ini tidak ada?
5. Kenapa pembayaran dibuat tabel `payments` sendiri, bukan kolom `paid_amount`
   di `orders`? Sebutkan dua informasi yang akan hilang.
6. Paket tidak dihapus, hanya `is_active = false`. Apa yang terjadi pada `orders`
   kalau paket dihapus dengan `DELETE`?
7. Kenapa `order_status_logs.from_status` boleh `NULL`?

## C. Dari ERD ke SQL

8. Tulis query: semua pesanan milik user `id = 7`, tampilkan `id`, nama paket,
   `status`, `created_at`, terbaru di atas.
9. Tulis query: untuk setiap pesanan, tampilkan `id`, `agreed_price`, total
   dibayar, dan sisa tagihan. Pesanan yang belum pernah dibayar harus tetap muncul
   dengan total dibayar `0`. Jelaskan kenapa kamu memilih jenis JOIN tersebut.
10. Tulis `CREATE TABLE` untuk `orders` dan `payments`, lengkap dengan `NOT NULL`,
    `REFERENCES`, dan minimal dua `CHECK` yang masuk akal. Jalankan di PostgreSQL-mu.

## D. Perubahan

11. Requirement baru: satu pesanan boleh berisi lebih dari satu paket (misalnya
    Company Profile + Maintenance Bulanan). Gambar ulang bagian ERD yang berubah
    (boleh di kertas atau Mermaid). Kolom apa yang pindah, dan ke mana?

## Cek diri

- [ ] Bisa menjelaskan setiap garis tanpa melihat jawaban
- [ ] Query nomor 8 dan 9 benar-benar dijalankan dan hasilnya masuk akal
- [ ] Bisa menjelaskan perbedaan 1–N dan N–N dengan contoh dari studi kasus

# Soal 03: Merancang Fitur Baru dari Requirement Pendek

**Kapan:** Minggu 15, setelah Soal 02.
**Bahan:** semua file di [studi-kasus](../studi-kasus/01-prd-pemesanan.md).
**Waktu:** 2 sesi. Tulis jawaban di `latihan-saya/membaca-dokumen/03-fitur-baru-kode-promo.md`.

Di dunia kerja, requirement sering datang sependek ini:

> **Fitur kode promo.** Admin bisa membuat kode promo (contoh: `AWALTAHUN`) dengan
> diskon persen atau nominal, masa berlaku, dan kuota pemakaian. Klien bisa
> memasukkan satu kode saat membuat pesanan. Harga yang disepakati menjadi harga
> setelah diskon.

Tugasmu mengubahnya menjadi rancangan yang siap dikerjakan.

1. **Pertanyaan klarifikasi.** Tulis minimal 6 pertanyaan untuk product manager.
2. **Asumsi.** Karena PM sedang cuti, tulis jawaban yang kamu asumsikan untuk
   setiap pertanyaan. Tandai dengan jelas bahwa ini asumsi.
3. **ERD.** Tambahkan tabel/kolom baru dalam Mermaid `erDiagram`. Tulis kalimat
   hubungan untuk setiap garis baru.
4. **API.** Daftar endpoint baru dan endpoint yang berubah. Untuk setiap endpoint:
   akses, request, response sukses, dan semua error beserta `code`-nya.
5. **Acceptance criteria.** Minimal 6, dalam format Given/When/Then. Wajib ada:
   kode kedaluwarsa, kuota habis, kode tidak dikenal, dan diskon lebih besar dari
   harga paket.
6. **Race condition.** Kuota tinggal 1 dan dua klien memakai kode yang sama di
   detik yang sama. Jelaskan apa yang bisa salah dan satu cara mencegahnya di
   level database.

## Setelah selesai

Pakai format yang sama (masalah, out of scope, user story + acceptance criteria,
ERD, daftar endpoint, pertanyaan terbuka) untuk menulis spesifikasi proyek
portofoliomu di Minggu 15.

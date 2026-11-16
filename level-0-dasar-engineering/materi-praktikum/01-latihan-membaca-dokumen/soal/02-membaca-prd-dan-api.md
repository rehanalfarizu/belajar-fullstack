# Soal 02: Membaca PRD dan Dokumentasi API

**Kapan:** Minggu 15, sebelum menulis spesifikasi proyekmu sendiri.
**Bahan:** [PRD](../studi-kasus/01-prd-pemesanan.md), [API](../studi-kasus/03-api-pemesanan.md), [ERD](../studi-kasus/02-erd-pemesanan.md).
**Waktu:** 2 sesi. Tulis jawaban di `latihan-saya/membaca-dokumen/02-membaca-prd-dan-api.md`.

## A. Memahami tujuan

1. Dalam maksimal 3 kalimat: masalah apa yang diselesaikan, untuk siapa, dan
   bagaimana tahu berhasil?
2. Dari tiga metrik di PRD, mana yang bisa diukur oleh sistem itu sendiri, dan
   mana yang butuh data dari luar sistem?
3. Klien meminta: "Tolong kirim notifikasi WhatsApp tiap status berubah." Bagian
   PRD mana yang kamu rujuk, dan apa jawabanmu?

## B. Requirement menjadi pekerjaan

4. Buat tabel untuk US-01 sampai US-08 dengan kolom: user story · data/tabel ·
   endpoint · layar. Tandai sel yang tidak bisa kamu isi dari dokumen yang ada.
5. Ubah acceptance criteria US-03 menjadi daftar test case. Setiap test case:
   input, status code yang diharapkan, dan `code` error (kalau ada). Minimal 7.

## C. Membaca kontrak API

6. Apa respons `PATCH /orders/41/status` untuk kasus berikut?
   - a. pesanan berstatus `dikonfirmasi`, body `{"status": "selesai"}`
   - b. pesanan berstatus `dikerjakan`, body `{"status": "dibatalkan"}`, oleh admin
   - c. pesanan berstatus `baru`, body `{"status": "dikonfirmasi"}`, oleh klien pemiliknya
   - d. body `{"status": "DIKERJAKAN"}`
7. Kenapa `GET /orders/:id` mengembalikan `404`, bukan `403`, untuk pesanan milik
   klien lain?

## D. Mencari yang kurang

8. Temukan **minimal 5** ambiguitas atau ketidakcocokan antara PRD, ERD, dan API.
   Tulis masing-masing sebagai pertanyaan sopan untuk product manager.
   Petunjuk tempat mencari: US-05, status `review_klien`, US-01, requirement
   non-fungsional, dan US-03.
9. Requirement non-fungsional meminta daftar pesanan admin tampil di bawah 2
   detik untuk 5.000 pesanan. Apa yang kurang dari kontrak `GET /orders`? Apa yang
   perlu ditambahkan di database?

## E. Alur

10. Tulis sequence diagram versi teks untuk `POST /orders/:id/payments`, dari
    browser admin sampai database dan kembali, termasuk pengecekan `OVERPAYMENT`.
    Lalu jawab: kalau dua admin mencatat pembayaran untuk pesanan yang sama pada
    detik yang sama, di langkah mana pengecekan bisa kebobolan?

## Cek diri

- [ ] Ambiguitas yang ditemukan ditulis sebagai pertanyaan, bukan tebakan
- [ ] Test case nomor 5 bisa langsung dipakai untuk menguji API di Postman
- [ ] Bisa menjelaskan nomor 10 tanpa melihat catatan

# CHECKLIST — Latihan Membaca Dokumen

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa membaca setiap garis ERD sebagai dua kalimat, satu per arah
- [ ] Aku bisa menjelaskan di tabel mana sebuah foreign key harus ditaruh, dan apa yang rusak kalau dibalik
- [ ] Aku bisa menjelaskan beda relasi 1-N dan N-N dengan contoh dari studi kasus
- [ ] Aku bisa menjelaskan kenapa `orders` butuh `agreed_price` sendiri, dengan merujuk kalimat di PRD
- [ ] Aku bisa menjelaskan apa akibatnya kalau paket dihapus dengan `DELETE` alih-alih dinonaktifkan
- [ ] Aku bisa membedakan metrik yang bisa diukur sistem dan yang butuh data dari luar
- [ ] Aku bisa menjelaskan kenapa kontrak API memilih `404`, bukan `403`, untuk pesanan milik klien lain
- [ ] Aku bisa menjelaskan apa itu race condition dengan contoh dua admin atau dua klien

---

## Kemampuan Praktis

- [ ] Aku bisa menulis query JOIN dan memilih `INNER` atau `LEFT JOIN` dengan alasan
- [ ] Aku bisa menulis `CREATE TABLE` lengkap dengan `NOT NULL`, `REFERENCES`, dan `CHECK`, lalu menjalankannya
- [ ] Aku bisa mengubah user story menjadi daftar tabel, endpoint, dan layar
- [ ] Aku bisa mengubah acceptance criteria menjadi test case (input, status code, kode error)
- [ ] Aku bisa menemukan minimal 5 ambiguitas antara PRD, ERD, dan API, dan menuliskannya sebagai pertanyaan
- [ ] Aku bisa menulis acceptance criteria dalam format Given/When/Then
- [ ] Aku bisa menggambar ERD dan sequence diagram dengan Mermaid

---

## Kebiasaan Baik

- [ ] Aku menulis ambiguitas sebagai pertanyaan, bukan menebak lalu langsung membuat kode
- [ ] Aku menandai asumsi dengan jelas sebagai asumsi
- [ ] Setiap jawabanku menyebut bagian dokumen yang menjadi dasarnya
- [ ] Aku menjalankan SQL-ku, bukan cuma menulisnya
- [ ] Saat membaca kontrak API, aku selalu bertanya: "siapa yang boleh mengakses ini, dan apa yang terjadi kalau orang lain mencoba?"

Pertanyaan terakhir itu inti dari otorisasi. Lanjutannya ada di
[Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md).

---

## Siap Lanjut?

Folder ini dikerjakan di dua waktu:

- Selesai **Soal 01** (Minggu 10)? Kembali ke jalur backend:
  [Latihan Auth](../../../LEVEL-2-Backend-Node-Express/materi-praktikum/04-latihan-auth/README.md).
- Selesai **Soal 02 dan 03** (Minggu 15)? Pakai format yang sama untuk menulis spesifikasi proyek
  portofoliomu, seperti yang diminta di akhir [Soal 03](soal/03-fitur-baru-kode-promo.md).

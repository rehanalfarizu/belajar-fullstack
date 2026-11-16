# TUGAS — Latihan Membaca Dokumen (ERD, PRD, API)

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Tiga file jawaban di `latihan-saya/membaca-dokumen/`, satu per soal.
2. Query SQL yang **benar-benar sudah dijalankan** di PostgreSQL, beserta hasilnya.
3. Daftar pertanyaan klarifikasi yang sopan untuk product manager, dan rancangan fitur kode promo
   (ERD, endpoint, acceptance criteria) yang siap dikerjakan.

---

## Daftar Soal

Folder ini tidak punya `code/`. Yang kamu "edit" adalah file jawabanmu sendiri.

| No | Soal | Bahan yang dibaca | Tulis jawaban di | Estimasi |
| --- | --- | --- | --- | --- |
| 01 | [Membaca ERD](soal/01-membaca-erd.md) (Minggu 10) | [ERD](studi-kasus/02-erd-pemesanan.md), [PRD](studi-kasus/01-prd-pemesanan.md) | `latihan-saya/membaca-dokumen/01-membaca-erd.md` | 2 sesi |
| 02 | [Membaca PRD dan API](soal/02-membaca-prd-dan-api.md) (Minggu 15) | [PRD](studi-kasus/01-prd-pemesanan.md), [API](studi-kasus/03-api-pemesanan.md), [ERD](studi-kasus/02-erd-pemesanan.md) | `latihan-saya/membaca-dokumen/02-membaca-prd-dan-api.md` | 2 sesi |
| 03 | [Fitur Baru: Kode Promo](soal/03-fitur-baru-kode-promo.md) (Minggu 15) | semua file di `studi-kasus/` | `latihan-saya/membaca-dokumen/03-fitur-baru-kode-promo.md` | 2 sesi |

Satu sesi kira-kira 90 menit (lihat alur sesi di [latihan-saya](../../../latihan-saya/README.md)).
Folder `latihan-saya/membaca-dokumen/` belum ada; buat sendiri saat mulai Soal 01.

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca teorinya dulu**: [Membaca Dokumen Teknis](../../materi-teori/05-membaca-dokumen-teknis.md),
   bagian yang sesuai soal.
2. **Baca bahan studi kasus sekali penuh tanpa mencatat.** Tujuannya dapat gambaran besar.
3. **Baca lagi sambil mencatat.** Tandai kalimat yang menyebut aturan ("harus", "tidak boleh", "hanya"),
   angka, dan status.
4. **Tutup bahannya, jawab dari catatan.** Kalau tidak bisa menjawab dari catatan, buka lagi bahan dan
   perbaiki catatanmu, bukan langsung menyalin jawaban dari bahan.
5. **Untuk setiap nomor, tulis alasan, bukan cuma jawaban.** Contoh: "karena PRD bagian X bilang ...".
6. **Jalankan semua SQL** di PostgreSQL. Tempel query dan potongan hasilnya di file jawaban.
7. **Commit**, lalu baru buka `contoh/`.

---

## Petunjuk Kalau Macet

### Tingkat 1 — baca garisnya pelan-pelan

- Untuk setiap garis di ERD, tanyakan dua arah: "satu A punya berapa B?" dan "satu B milik berapa A?".
  Simbol di ujung garis menjawab pertanyaan itu.
- Bingung FK ditaruh di mana? Coba bayangkan versi yang dibalik dengan data nyata: kalau satu user punya
  3 order, kolom `users.order_id` harus diisi apa? Tulis barisnya di kertas dan lihat masalahnya sendiri.

### Tingkat 2 — buat data mainan

- Gambar 2-3 baris contoh untuk setiap tabel di kertas (misalnya 2 user, 3 order, 2 payment). Jawab
  pertanyaan pakai data mainan itu. Soal JOIN (nomor 9) jauh lebih mudah kalau kamu punya contoh order
  yang belum dibayar.
- Masukkan data mainan itu ke PostgreSQL. Jalankan query, lalu cocokkan dengan hitungan manualmu.

### Tingkat 3 — cari ketidakcocokan secara sistematis (Soal 02, 03)

- Buat tabel tiga kolom: PRD bilang apa, ERD punya apa, API punya apa. Isi per fitur. Sel yang kosong
  atau saling bertentangan adalah kandidat ambiguitas.
- Untuk race condition: tulis dua kolom "Admin A" dan "Admin B", lalu urutkan langkah mereka baris demi
  baris. Cari baris di mana keduanya membaca data yang sama sebelum ada yang menulis.

### Tingkat 4 — dokumentasi resmi

- JOIN: [PostgreSQL Tutorial: Joins](https://www.postgresql.org/docs/current/tutorial-join.html).
- Constraint: [PostgreSQL: Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).
- Diagram: [Mermaid erDiagram](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) dan
  [sequenceDiagram](https://mermaid.js.org/syntax/sequenceDiagram.html).
- Status code: [MDN HTTP status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

---

## Cara Mengecek Hasil Sendiri

- **Kalimat ERD (Soal 01 no. 1):** ada 12 kalimat, dan setiap kalimat menyebut jumlah ("nol atau banyak",
  "tepat satu"). Bacakan ke teman atau rekam suaramu. Kalau terdengar aneh, kemungkinan arah relasinya terbalik.
- **SQL (Soal 01 no. 8-10):** jalankan di PostgreSQL dengan data mainanmu:

  ```bash
  psql -U postgres -d belajar_nodejs -f latihan-saya/membaca-dokumen/01-query.sql
  ```

  Hasil harus cocok dengan hitungan manualmu, termasuk pesanan yang belum dibayar muncul dengan total `0`.
  Untuk `CHECK`, coba `INSERT` data yang melanggar. PostgreSQL harus menolaknya.
- **Test case (Soal 02 no. 5):** setiap baris punya input, status code, dan `code` error. Tanya diri sendiri:
  "bisakah orang lain menjalankan ini di Postman tanpa bertanya padaku?"
- **Pertanyaan PM (Soal 02 no. 8, Soal 03 no. 1):** setiap pertanyaan menyebut bagian dokumen yang
  dirujuk, dan bisa dijawab "ya/tidak" atau dengan satu angka/aturan.
- **Diagram Mermaid:** tempel di [mermaid.live](https://mermaid.live). Harus ter-render tanpa error.
- Centang bagian "Cek diri" di akhir setiap soal.

---

## Tentang `contoh/`

`contoh/` berisi jawaban referensi. Buka hanya setelah semua nomor terjawab dan sudah di-commit. Bandingkan
**alasannya**, bukan kecocokan kata per kata. Jawabanmu boleh berbeda selama alasannya kuat.

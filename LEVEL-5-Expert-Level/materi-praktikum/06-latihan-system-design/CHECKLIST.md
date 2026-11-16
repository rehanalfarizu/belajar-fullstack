# CHECKLIST — System Design

Centang dengan jujur. Diagram yang indah tapi tidak bisa dipertanggungjawabkan
belum dihitung.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda functional requirement, non-functional
      requirement, dan non-goal
- [ ] Aku bisa memperkirakan traffic dan storage dengan asumsi yang tertulis
- [ ] Aku paham invariant data dan batas transaksi
- [ ] Aku bisa menjelaskan kenapa cache bukan sumber kebenaran
- [ ] Aku paham retry bisa menimbulkan efek ganda, dan cara membuat operasi aman
      diulang (idempotency)
- [ ] Aku bisa menjelaskan SLI, SLO, dan beda log, metric, trace
- [ ] Aku paham RPO dan RTO
- [ ] Aku bisa menjelaskan kenapa memulai dari modular monolith itu masuk akal

---

## Kemampuan Praktis

- [ ] Aku bisa menulis requirement dan non-goal untuk satu sistem
- [ ] Aku bisa menggambar diagram container dan satu sequence diagram
- [ ] Aku bisa menulis tabel minimal delapan failure mode yang realistis
- [ ] Aku bisa menentukan SLO yang berarti bagi user, dan alert yang
      bisa ditindaklanjuti
- [ ] Aku bisa menulis threat model sederhana dan klasifikasi data
- [ ] Aku bisa menulis rencana load test dengan hipotesis dan batas lulus
- [ ] Aku bisa menulis ADR dengan konsekuensi yang jujur

---

## Kebiasaan Baik

- [ ] Setiap angka di dokumenku punya asumsi tertulis
- [ ] Setiap komponen punya alasan, pemilik, dan jawaban "apa jadinya kalau
      mati"
- [ ] Aku mengklasifikasi data (publik, internal, sensitif) dan menandai mana
      yang perlu perlindungan ekstra
      (baca [Kenapa Keamanan Penting](../../../modul-keamanan-web/01-kenapa-keamanan-penting/README.md))
- [ ] Autentikasi, otorisasi, dan validasi input muncul di desainku sebagai
      keputusan eksplisit, bukan tambahan belakangan
      (baca [Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md))
- [ ] Secret, konfigurasi, dan rencana rotasi kunci disebut di desain
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Aku menguji dokumenku dengan membacakannya ke orang lain
- [ ] Aku sudah mencoba mengaudit desainku sendiri seperti penyerang
      (lihat [Proyek Akhir Audit](../../../modul-keamanan-web/08-proyek-akhir-audit/README.md))

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, Level 5
selesai. Lanjut ke [Final Project](../../final-project/README.md).

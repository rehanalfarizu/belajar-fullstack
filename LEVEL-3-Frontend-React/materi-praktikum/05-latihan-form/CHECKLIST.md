# CHECKLIST — Form Handling

Centang dengan jujur. Kalau belum yakin, coba jelaskan ke teman (atau ke kertas)
dulu.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda controlled dan uncontrolled input
- [ ] Aku paham kenapa error sebaiknya muncul setelah field disentuh (touched)
- [ ] Aku paham beda validasi per field dan cross-field validation
- [ ] Aku paham race condition pada async validation
- [ ] Aku bisa menjelaskan optimistic update dan kapan perlu rollback
- [ ] Aku paham validasi frontend bisa dilewati dengan mudah, jadi server tetap
      wajib memvalidasi
      (baca [Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md))
- [ ] Aku paham React meng-escape teks di `{}`, dan `dangerouslySetInnerHTML`
      mematikan perlindungan itu

---

## Kemampuan Praktis

- [ ] Aku bisa membuat form dengan satu `handleChange` untuk banyak field
- [ ] Aku bisa membuat field array (tambah/hapus baris)
- [ ] Aku bisa menyimpan `values`, `errors`, `touched` dan menampilkan error
      di waktu yang tepat
- [ ] Aku bisa memindahkan fokus ke field pertama yang error
- [ ] Aku bisa membuat cek async (misalnya username) yang tidak salah hasil saat
      user mengetik cepat
- [ ] Aku bisa membuat form multi-langkah dengan progress
- [ ] Aku bisa membuat optimistic update dengan rollback
- [ ] Aku bisa membuat dropdown bertingkat yang reset dengan benar

---

## Kebiasaan Baik

- [ ] Aku menulis tabel aturan validasi sebelum menulis kode
- [ ] Aku mencegah submit dobel saat request masih berjalan
- [ ] Aku memberi label pada setiap input dan menghubungkan pesan error dengan
      `aria-describedby`
- [ ] Aku tidak me-render input user dengan `dangerouslySetInnerHTML`. Kalau suatu
      saat terpaksa, aku menyanitasinya dulu
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Aku tidak menyimpan password di state lebih lama dari yang perlu, dan tidak
      menulisnya ke `console.log`
- [ ] Aku mengetes jalur gagal, bukan cuma jalur sukses

---

## Siap Lanjut?

Level 3 selesai kalau "Pemahaman Konsep" dan "Kemampuan Praktis" di kelima folder
sudah tercentang. Sebelum pindah, coba kasus di
[Self Problem Solving Level 3](../../SELF_PROBLEM_SOLVING.md).

Lanjut ke Level 4:
[01-latihan-fullstack](../../../LEVEL-4-Fullstack-Integration/materi-praktikum/01-latihan-fullstack/TUGAS.md).

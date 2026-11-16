# CHECKLIST — CI/CD

Centang dengan jujur. Pipeline hijau yang tidak pernah kamu coba buat merah belum
terbukti bekerja.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda CI, continuous delivery, dan continuous deployment
- [ ] Aku paham istilah workflow, job, step, runner, dan trigger
- [ ] Aku paham kenapa memakai `npm ci`, bukan `npm install`, di CI
- [ ] Aku paham fungsi cache dan kapan cache bisa menipu
- [ ] Aku bisa menjelaskan environment dan persetujuan manual untuk production
- [ ] Aku paham smoke test dan kenapa ia dijalankan setelah deploy
- [ ] Aku bisa menjelaskan strategi rollback yang aku pilih

---

## Kemampuan Praktis

- [ ] Aku bisa menulis workflow CI (lint, test, build) dari file kosong
- [ ] Aku bisa memakai matrix dan cache
- [ ] Aku bisa membuat job deploy dengan trigger branch dan tag
- [ ] Aku bisa memakai GitHub Secrets dan Environments
- [ ] Aku bisa membaca log job yang gagal dan menemukan penyebabnya
- [ ] Aku bisa membuat smoke test sederhana

---

## Kebiasaan Baik

- [ ] Tidak ada secret (token, password, kunci) tertulis di file workflow atau
      repo; semua lewat `secrets`
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Secret production hanya bisa dipakai job production (lewat Environment)
- [ ] `permissions:` workflow dibatasi seminimal mungkin
- [ ] Action pihak ketiga dikunci ke versi tertentu dan aku membaca sumbernya
      sebelum memakainya
- [ ] Workflow dari pull request fork tidak diberi akses ke secret
- [ ] Aku menjalankan `npm audit` atau pemeriksaan dependency di pipeline
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)
      untuk pengelolaan kredensial)
- [ ] Aku sengaja membuat pipeline gagal sekali untuk memastikan ia benar-benar
      menghentikan rilis
- [ ] Aku jujur mencatat bagian pipeline yang belum teruji

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[06-latihan-system-design](../06-latihan-system-design/TUGAS.md).

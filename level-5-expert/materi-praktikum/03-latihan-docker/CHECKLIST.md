# CHECKLIST — Docker

Centang dengan jujur. "Jalan di laptopku" bukan bukti.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda image dan container
- [ ] Aku paham layer caching dan kenapa urutan instruksi Dockerfile penting
- [ ] Aku paham fungsi `.dockerignore` dan apa itu build context
- [ ] Aku bisa menjelaskan multi-stage build dan kenapa image akhir jadi kecil
- [ ] Aku paham `localhost` di dalam container berbeda dengan di host
- [ ] Aku paham Docker DNS: container saling memanggil lewat nama service
- [ ] Aku bisa menjelaskan beda volume, bind mount, dan data di layer container
- [ ] Aku paham beda `depends_on` dan `healthcheck`

---

## Kemampuan Praktis

- [ ] Aku bisa menulis Dockerfile Node.js dari file kosong
- [ ] Aku bisa menulis Dockerfile multi-stage untuk React + Nginx
- [ ] Aku bisa membuat network dan menghubungkan container
- [ ] Aku bisa menyimpan data PostgreSQL di volume
- [ ] Aku bisa menulis `docker-compose.yml` dengan tiga service
- [ ] Aku bisa memakai `logs`, `exec`/`run -it ... sh`, `inspect`, dan `history`
      untuk mencari masalah

---

## Kebiasaan Baik

- [ ] Container aplikasi berjalan sebagai **user non-root** (`USER` di Dockerfile)
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] `.env`, `.git`, dan `node_modules` masuk `.dockerignore`
- [ ] Secret tidak ditulis di Dockerfile (`ENV`/`ARG`) atau di dalam image.
      Dikirim saat runtime lewat environment atau secret manager
- [ ] Password database di Compose bukan nilai bawaan dan tidak di-commit
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md))
- [ ] Image dasar diberi tag versi yang jelas, bukan `latest`, dan aku tahu harus
      diperbarui berkala
- [ ] Port yang tidak perlu tidak dibuka ke host
- [ ] Aku memeriksa isi image (`docker run --rm -it <image> sh`) sebelum
      menganggapnya selesai

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[04-latihan-websocket](../04-latihan-websocket/TUGAS.md).

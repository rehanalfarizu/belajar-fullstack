# CHECKLIST — Latihan Fullstack

Centang dengan jujur. Kalau belum bisa tanpa contekan, belum dicentang.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan prinsip REST: resource, method, status code
- [ ] Aku tahu kapan memakai 200, 201, 204, 400, 401, 403, 404, 500
- [ ] Aku paham kenapa format response (sukses dan error) harus konsisten
- [ ] Aku bisa menjelaskan beda `fetch` dan `axios`, terutama soal error HTTP
- [ ] Aku paham beda autentikasi (siapa kamu) dan otorisasi (boleh apa)
- [ ] Aku paham kenapa auth harus dicek di server, walau frontend sudah
      menyembunyikan tombol
- [ ] Aku paham apa itu CORS dan kenapa browser memblokir request lintas origin

---

## Kemampuan Praktis

- [ ] Aku bisa membuat server Express CRUD dari nol
- [ ] Aku bisa membuat helper response sukses/error/pagination
- [ ] Aku bisa menguji API dengan `curl -i` dan membaca status code-nya
- [ ] Aku bisa memanggil API dari React dengan `fetch` dan dengan `axios`
- [ ] Aku bisa menampilkan state loading, error, dan data kosong di React
- [ ] Aku bisa menulis middleware auth yang membaca header `Authorization`
- [ ] Aku bisa membuat pagination yang tahan input aneh (`page=-1`,
      `limit=1000`)

---

## Kebiasaan Baik

- [ ] Aku menulis tabel endpoint sebelum menulis kode
- [ ] Aku menguji backend dengan curl dulu sebelum menyambungkan frontend
- [ ] Aku mengatur CORS dengan origin yang jelas, bukan `*`, terutama kalau
      memakai cookie
- [ ] `JWT_SECRET` dan secret lain ada di `.env`, dan `.env` masuk `.gitignore`
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Pesan error ke client tidak membocorkan stack trace atau query database
- [ ] Aku memvalidasi body request di server
      (baca [Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md))

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[01-latihan-auth](../01-latihan-auth/TUGAS.md).

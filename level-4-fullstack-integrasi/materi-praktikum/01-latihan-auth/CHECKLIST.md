# CHECKLIST — Auth Backend

Centang dengan jujur. Auth itu area yang salahnya mahal, jadi standarnya tinggi.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda autentikasi dan otorisasi
- [ ] Aku paham kenapa password di-hash, bukan dienkripsi
- [ ] Aku paham kenapa bcrypt sengaja lambat
- [ ] Aku tahu payload JWT bisa dibaca siapa saja, jadi tidak boleh berisi
      rahasia
- [ ] Aku bisa menjelaskan kenapa access token pendek dan refresh token panjang
- [ ] Aku paham tujuan token rotation dan apa yang terjadi kalau refresh token
      dicuri
- [ ] Aku tahu beda 401, 403, dan 429
- [ ] Aku paham CORS itu aturan **browser**, bukan pengaman server. curl tetap
      bisa memanggil API-mu
- [ ] Aku paham `origin: "*"` tidak boleh dipakai bersama `credentials: true`

---

## Kemampuan Praktis

- [ ] Aku bisa menulis register + login dengan bcrypt dari file kosong
- [ ] Aku bisa membuat dan memverifikasi JWT, termasuk menangani token
      kedaluwarsa
- [ ] Aku bisa menulis middleware auth dan memasangnya hanya di route tertentu
- [ ] Aku bisa membuat endpoint refresh dengan rotasi, dan logout yang
      membatalkan refresh token
- [ ] Aku bisa membuat middleware `authorize(...roles)` dan cek kepemilikan data
- [ ] Aku bisa memasang CORS dengan daftar origin, Helmet, dan rate limit
- [ ] Aku bisa menguji semua alur di atas dengan curl

---

## Kebiasaan Baik

- [ ] Secret JWT minimal 32 karakter acak, disimpan di `.env`, dan `.env` ada di
      `.gitignore`
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Response tidak pernah berisi hash password
- [ ] Pesan login gagal tidak membedakan "email salah" dan "password salah"
- [ ] Endpoint login dan refresh punya rate limit sendiri yang lebih ketat
- [ ] Setiap endpoint yang mengubah data mengecek role **dan** kepemilikan di
      server
      (baca [Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md))
- [ ] Aku tahu token untuk browser sebaiknya tidak disimpan di `localStorage`
      (akan dipraktikkan di folder berikutnya)
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md))
- [ ] Aku menulis kode sendiri dulu, baru membandingkan dengan "Full
      Implementation"

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[02-latihan-auth-fullstack](../02-latihan-auth-fullstack/TUGAS.md).

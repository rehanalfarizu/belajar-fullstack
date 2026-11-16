# CHECKLIST — Deployment

Centang dengan jujur. Deploy yang "kebetulan jalan" belum dihitung.

---

## Pemahaman Konsep

- [ ] Aku bisa menggambar alur request dari browser sampai database di
      production
- [ ] Aku paham beda build-time env (`VITE_*`) dan runtime env (backend)
- [ ] Aku paham kenapa SPA butuh rewrite supaya refresh tidak 404
- [ ] Aku paham kenapa SQLite di laptop tidak sama dengan database production
- [ ] Aku paham apa itu migration dan kenapa harus bisa diulang
- [ ] Aku paham kenapa cookie bisa tidak terkirim saat frontend dan backend beda
      domain
- [ ] Aku paham semua yang ada di bundle frontend bisa dilihat publik

---

## Kemampuan Praktis

- [ ] Aku bisa deploy frontend Vite ke Vercel dan mengatur environment-nya
- [ ] Aku bisa deploy backend Express ke Railway atau Render
- [ ] Aku bisa menyambungkan backend ke PostgreSQL production
- [ ] Aku bisa menjalankan migration ke database production
- [ ] Aku bisa membaca build log dan runtime log untuk mencari error
- [ ] Aku bisa mengatur CORS untuk URL production
- [ ] Aku bisa membuat endpoint health check yang juga mengecek database

---

## Kebiasaan Baik

- [ ] `.env` tidak pernah masuk Git. Ada `.env.example` tanpa nilai asli
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Server menolak start kalau variabel wajib kosong
- [ ] Secret production berbeda dengan secret lokal
- [ ] Di production, cookie sesi memakai `Secure` dan `HttpOnly`
- [ ] Pesan error production tidak menampilkan stack trace ke user
- [ ] Aku menguji dari jaringan lain (HP), bukan hanya laptop sendiri
- [ ] Aku mencatat langkah deploy di README proyek supaya bisa diulang

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[04-latihan-security](../04-latihan-security/TUGAS.md).

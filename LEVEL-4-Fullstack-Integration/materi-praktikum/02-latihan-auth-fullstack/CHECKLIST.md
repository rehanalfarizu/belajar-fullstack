# CHECKLIST — Auth Fullstack

Centang dengan jujur. Kalau cuma jalan "karena kebetulan", belum dicentang.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan kenapa token di `localStorage` berisiko (bisa dibaca
      script hasil XSS)
- [ ] Aku paham arti atribut cookie `HttpOnly`, `Secure`, dan `SameSite`
- [ ] Aku paham kenapa CORS dengan credentials butuh origin spesifik, bukan `*`
- [ ] Aku paham cookie otomatis terkirim, jadi auth berbasis cookie butuh
      perlindungan CSRF
- [ ] Aku bisa menjelaskan kenapa AuthContext bertanya ke `/auth/me`, bukan
      membaca dari localStorage
- [ ] Aku paham ProtectedRoute dan HasRole hanya soal tampilan. Keamanan
      sebenarnya ada di server
- [ ] Aku paham semua variabel `VITE_*` bisa dilihat publik

---

## Kemampuan Praktis

- [ ] Aku bisa mengubah login backend dari "token di body" ke "token di cookie
      HttpOnly"
- [ ] Aku bisa mengatur CORS Express supaya cookie jalan dari `localhost:5173`
- [ ] Aku bisa membuat client axios/fetch yang mengirim cookie
- [ ] Aku bisa membuat AuthContext dengan status `loading`/`authenticated`/`guest`
- [ ] Aku bisa membuat ProtectedRoute, GuestRoute, dan AdminRoute
- [ ] Aku bisa redirect kembali ke halaman asal setelah login
- [ ] Aku bisa membuat middleware `requireRole` di backend dan komponen
      `HasRole` di frontend
- [ ] Aku bisa memeriksa cookie di DevTools (Network dan Application)

---

## Kebiasaan Baik

- [ ] Token sesi tidak pernah aku simpan di `localStorage`/`sessionStorage`
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md))
- [ ] Aku tahu cara melindungi auth berbasis cookie dari CSRF
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Setiap endpoint sensitif mengecek role **dan** kepemilikan di server,
      dan aku sudah mengujinya dengan curl
      (baca [Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md))
- [ ] Origin CORS dan atribut cookie diatur lewat environment, bukan hardcode
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Aku tidak me-log isi cookie, token, atau password ke Console
- [ ] Aku menulis kode sendiri dulu sebelum membuka blok `SOLUSI`

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[03-latihan-deployment](../03-latihan-deployment/TUGAS.md).

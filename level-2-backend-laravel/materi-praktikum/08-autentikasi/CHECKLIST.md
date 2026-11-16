# CHECKLIST — Autentikasi & Otorisasi

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda autentikasi dan otorisasi dengan contoh sendiri
- [ ] Aku tahu beda `401`, `403`, dan `404` dan kapan memakai masing-masing
- [ ] Aku paham kenapa password di-hash (satu arah), bukan dienkripsi (dua arah)
- [ ] Aku paham kenapa `md5`/`sha1` tidak cocok untuk password
- [ ] Aku bisa menjelaskan session fixation dan kenapa session di-regenerate setelah login
- [ ] Aku bisa menjelaskan IDOR dan kenapa "sudah login" tidak cukup
- [ ] Aku tahu beda Gate dan Policy

---

## Kemampuan Praktis

- [ ] Aku bisa membuat login/logout manual dengan `Auth::attempt()`
- [ ] Aku bisa membatasi percobaan login dengan `RateLimiter`
- [ ] Aku bisa mengecek hash password di `php artisan tinker`
- [ ] Aku bisa menulis policy berbasis kepemilikan dan `before()` untuk admin
- [ ] Aku bisa memasang policy lewat `Gate::authorize()` atau `->can()` di route
- [ ] Aku bisa mereproduksi IDOR dengan dua user dan curl
- [ ] Aku bisa menulis matriks test akses (guest / pemilik / bukan pemilik / admin)

---

## Best Practices

- [ ] Pesan login gagal-ku sama untuk email salah dan password salah
- [ ] Aku tidak pernah mencetak/log password, bahkan saat debugging
- [ ] Logout-ku memakai `POST` + CSRF, dan membuang session lama
- [ ] Aku mengecek otorisasi di server, bukan hanya menyembunyikan tombol di Blade
- [ ] `user_id` pemilik diisi dari server, bukan dari input
- [ ] Daftar "data saya" di-query lewat relasi user yang login

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [`09-rest-api/`](../09-rest-api/README.md)

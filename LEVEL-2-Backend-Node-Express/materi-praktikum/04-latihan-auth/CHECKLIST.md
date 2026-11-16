# CHECKLIST — Latihan Auth

Centang dengan jujur. "Bisa" artinya bisa tanpa melihat contoh atau bertanya ke AI.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda hashing dan enkripsi, dan kenapa password di-hash, bukan dienkripsi
- [ ] Aku paham fungsi salt dan kenapa hash password yang sama bisa berbeda setiap kali
- [ ] Aku paham arti salt rounds dan kenapa bcrypt sengaja dibuat lambat
- [ ] Aku bisa menjelaskan 3 bagian JWT (header, payload, signature) dan bagian mana yang bisa dibaca siapa saja
- [ ] Aku paham kenapa token yang diubah satu hurufnya ditolak oleh `jwt.verify`
- [ ] Aku bisa menjelaskan beda autentikasi (siapa kamu) dan otorisasi (boleh apa kamu)
- [ ] Aku bisa menjelaskan beda `401` dan `403`

---

## Kemampuan Praktis

- [ ] Aku bisa meng-hash dan memverifikasi password dengan `bcryptjs`
- [ ] Aku bisa membuat JWT dengan masa berlaku dan memverifikasinya dengan `try/catch`
- [ ] Aku bisa membuat endpoint register dengan validasi input dan pengecekan email dobel (`409`)
- [ ] Aku bisa membuat endpoint login yang mengembalikan JWT
- [ ] Aku bisa membuat middleware yang membaca `Authorization: Bearer <token>` dan mengisi `req.user`
- [ ] Aku bisa memasang middleware hanya di route yang perlu dilindungi
- [ ] Aku bisa menguji semua alur auth dengan `curl`, termasuk token palsu dan header hilang

---

## Kebiasaan Baik

- [ ] Aku **tidak pernah** mencetak password polos ke console atau log, bahkan saat debugging
- [ ] Aku tidak pernah mengirim hash password di respons API
- [ ] Aku tidak menaruh data rahasia di payload JWT, karena siapa pun bisa men-decode-nya
- [ ] Secret JWT minimal 32 karakter dan nantinya dibaca dari environment variable, bukan ditulis di kode yang di-commit
- [ ] Pesan login gagal sama untuk "email tidak ada" dan "password salah", supaya penyerang tidak bisa menebak email mana yang terdaftar

Bahan lanjutan untuk semua poin di atas:
[Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md),
[Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md), dan
[Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md).

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang, kerjakan modul
[Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md) untuk menguji
API-mu dari sisi penyerang, lalu lanjut ke
[LEVEL 3 — Frontend React](../../../LEVEL-3-Frontend-React/README.md).

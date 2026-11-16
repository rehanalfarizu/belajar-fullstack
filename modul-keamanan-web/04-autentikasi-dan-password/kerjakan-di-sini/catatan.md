# Catatan Belajar — Autentikasi dan Password

Isi pakai kata-katamu sendiri. Kalau belum bisa jawab, tulis dulu tebakanmu, lalu cek di dokumentasi.

## 1. Hash vs Enkripsi

Apa beda hashing dan enkripsi? Kenapa password di-hash, bukan dienkripsi?

<!-- TODO(human): jawabanmu -->

## 2. Eksperimen Salt

Jalankan `node 01-hash-password.js`, lalu tambahkan `console.log` untuk melihat dua hash dari password yang sama.

**Hash pertama:**

<!-- TODO(human): tempel di sini -->

**Hash kedua:**

<!-- TODO(human): tempel di sini -->

**Bagian mana yang salt, bagian mana yang cost (angka 10)?**

<!-- TODO(human): tandai dan jelaskan -->

**Kalau dua user punya password sama tapi hash-nya beda, serangan apa yang jadi susah?** (petunjuk: cari "rainbow table")

<!-- TODO(human): jawabanmu -->

## 3. Hash Cepat vs Hash Lambat

Ukur waktu `hashPassword()` dengan `console.time()` untuk SALT_ROUNDS 8, 10, dan 12.

| SALT_ROUNDS | Waktu |
|-------------|-------|
| 8 | <!-- TODO(human) --> |
| 10 | <!-- TODO(human) --> |
| 12 | <!-- TODO(human) --> |

Kenapa lambat itu bagus untuk password, padahal biasanya kita ingin kode yang cepat?

<!-- TODO(human): jawabanmu -->

## 4. Session Cookie

Setelah login, buka DevTools → Application → Cookies. Opsi apa saja yang tercentang di cookie `connect.sid`?

<!-- TODO(human): tulis opsi yang kamu lihat -->

Coba ketik `document.cookie` di Console. Apakah cookie session muncul? Kenapa?

<!-- TODO(human): jawabanmu -->

## 5. Rate Limiting

Command yang kamu pakai untuk mengirim 6 request login berturut-turut:

```bash
# TODO(human): tulis command-mu (petunjuk: loop for di bash + curl)
```

Status code request ke-1 sampai ke-6:

<!-- TODO(human): tulis hasilnya -->

Rate limit per IP punya kelemahan. Coba pikirkan satu skenario di mana itu tidak cukup.

<!-- TODO(human): jawabanmu -->

## 6. Pesan Error Login

Kenapa pesannya harus sama untuk "username tidak ada" dan "password salah"?

<!-- TODO(human): jawabanmu -->

Apakah waktu respons yang berbeda (tanpa bcrypt vs dengan bcrypt) bisa membocorkan info yang sama? Bagaimana kamu akan mengatasinya?

<!-- TODO(human): jawabanmu -->

## 7. Bug yang Aku Temui

Tulis error yang muncul saat mengerjakan, dan bagaimana kamu menemukan penyebabnya.

<!-- TODO(human): catat di sini -->

## Refleksi

Kalau besok kamu bikin fitur login dari nol, tiga hal apa yang pasti kamu lakukan?

<!-- TODO(human): tulis refleksimu -->

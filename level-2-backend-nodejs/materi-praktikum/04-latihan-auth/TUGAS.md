# TUGAS — Latihan Auth

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Skrip yang meng-hash password dengan bcrypt dan memverifikasinya.
2. Skrip yang membuat JWT, memverifikasinya, dan menolak token yang dimanipulasi.
3. API register dan login: password tersimpan sebagai hash, login mengembalikan JWT.
4. Middleware yang melindungi route tertentu, sementara route publik tetap terbuka.

---

## Daftar Soal

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [Password Hashing](soal/01-password-hashing.md) | `level-2-backend-nodejs/materi-praktikum/04-latihan-auth/code/01-password-hash.js` | 30-45 menit |
| 02 | [JWT dan Token](soal/02-jwt-dan-token.md) | `level-2-backend-nodejs/materi-praktikum/04-latihan-auth/code/02-jwt-dan-token.js` | 45-60 menit |
| 03 | [Login dan Register API](soal/03-login-dan-register-api.md) | `level-2-backend-nodejs/materi-praktikum/04-latihan-auth/code/03-login-register.js` | 90-120 menit |
| 04 | [Auth Middleware](soal/04-auth-middleware.md) | `level-2-backend-nodejs/materi-praktikum/04-latihan-auth/code/04-auth-middleware.js` | 60-90 menit |

Estimasi di atas perkiraan, karena soal tidak mencantumkan waktu.

**Catatan soal 04:** token tidak ada, invalid, atau kedaluwarsa dibalas `401`. Kode `403` dipakai kalau
identitasmu sudah terbukti tapi role-mu tidak cukup. Soal ini belum punya route berbasis role, jadi cuma `401`
yang muncul. Baca arti `401 Unauthorized` dan `403 Forbidden` di MDN, lalu tulis dengan kata-katamu sendiri di
jurnal kenapa token palsu itu 401 dan bukan 403.

### Persiapan sekali saja

Buat folder project sendiri (misalnya `latihan-saya/03-backend/minggu-11/`), lalu:

```bash
npm init -y
npm install express bcryptjs jsonwebtoken
```

`npm init -y` harus duluan, supaya dependency tidak masuk ke `package.json` root repo. Salin file starter
ke folder itu (lihat aturan [latihan-saya](../../../latihan-saya/README.md)).

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal**, terutama "Persyaratan" dan "Expected Output".
2. **Tutup soalnya.** Gambar alurnya di jurnal. Contoh untuk login: "terima email+password → cari user →
   bandingkan password → buat token → kirim". Tulis juga di setiap panah: apa yang terjadi kalau gagal?
3. **Tulis perintah `curl` untuk kasus sukses dan gagal** sebelum menulis kode server.
4. **Kerjakan `TODO` satu per satu**, jalankan setelah setiap bagian.
5. **Coba bobol sendiri.** Ubah satu huruf token, kirim tanpa header, daftar dengan email yang sama dua kali.

---

## Petunjuk Kalau Macet

### Tingkat 1 — lihat apa yang sebenarnya kamu punya

- `bcrypt.compare` selalu `false`? Cetak **tipe** dan **panjang** kedua argumen (jangan cetak password
  aslinya). Urutan argumennya: password polos dulu, hash kemudian.
- Hasil hash berupa `Promise { <pending> }`? Kamu lupa `await`.
- `jwt.verify` gagal terus? Pastikan secret saat `sign` dan `verify` persis sama. Cetak `typeof secret`
  dan `secret.length`, bukan isinya.

### Tingkat 2 — bongkar tokennya

- JWT itu tiga bagian dipisah titik. Bagian tengah (payload) cuma base64url, bisa kamu decode sendiri:

  ```bash
  node -e "console.log(Buffer.from(process.argv[1].split('.')[1], 'base64url').toString())" TOKEN_KAMU
  ```

  Lihat isinya. Inilah kenapa payload tidak boleh berisi password atau data rahasia.

- Header `Authorization` tidak terbaca? Cetak `req.headers.authorization` mentah-mentah. Cek ada kata
  `Bearer` dan spasi, dan apakah `curl` benar-benar mengirimnya.

### Tingkat 3 — perkecil

- Soal 03: kerjakan register dulu sampai `users` array berisi hash yang benar (cetak array-nya). Login
  belakangan.
- Soal 04: buat dulu middleware yang cuma `console.log` lalu `next()`. Setelah terpasang di route yang
  benar, baru isi logika verifikasinya.

### Tingkat 4 — dokumentasi resmi

- [bcryptjs di npm](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken di npm](https://www.npmjs.com/package/jsonwebtoken), bagian `sign` dan `verify`
- [Pengantar JWT](https://jwt.io/introduction)
- [MDN 401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) dan [MDN 403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

---

## Cara Mengecek Hasil Sendiri

### Soal 01-02 (skrip biasa)

```bash
node 01-password-hash.js
node 02-jwt-dan-token.js
```

- Soal 01: hash diawali `$2a$10$` atau `$2b$10$`. Jalankan dua kali: hash untuk password yang sama
  **berbeda** setiap kali (karena salt), tapi `compare` tetap `true`.
- Soal 02: payload yang tercetak punya `iat` dan `exp`, dan selisih `exp - iat` = `86400` (24 jam).
  Token yang diubah satu hurufnya ditolak dengan error `invalid signature`.

### Soal 03-04 (server)

Jalankan server, lalu di terminal kedua:

```bash
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Budi","email":"budi@email.com","password":"rahasia123"}'

curl -i -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"budi@email.com","password":"rahasia123"}'

curl -i http://localhost:3000/protected -H "Authorization: Bearer TOKEN_DARI_LOGIN"
```

Yang harus terjadi:

- Register pertama `201`, register kedua dengan email sama `409`.
- Login benar `200` dengan token. Login dengan password salah ditolak.
- `/public` bisa diakses tanpa token. `/protected` dan `/profile` tanpa token ditolak, dengan token valid
  `200` dan menampilkan data user dari token.
- Terminal server **tidak pernah** mencetak password polos, baik saat register maupun login.

---

## Tentang `contoh/`

Folder ini tidak punya `contoh/`. Pembandingmu adalah Expected Output di soal, ditambah usaha kamu sendiri
membobol API-mu (token palsu, header hilang, email dobel).

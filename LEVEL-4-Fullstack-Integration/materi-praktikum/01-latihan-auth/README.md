# 01 — Latihan Auth (Backend)

## Topik Ini Tentang Apa?

Autentikasi adalah cara server tahu **siapa** yang sedang mengirim request.
Otorisasi adalah cara server memutuskan orang itu **boleh apa**.

Di folder ini kamu membangun sisi backend-nya dengan Express:

1. Register dan login, dengan password yang di-hash pakai bcrypt.
2. Membuat dan memeriksa JWT (token tanda masuk).
3. Middleware yang menolak request tanpa token yang sah.
4. Refresh token: token akses berumur pendek, diperpanjang dengan token kedua.
5. Role-based access control (RBAC): admin, user, guest punya hak beda.
6. CORS, security headers (Helmet), dan rate limiting.

## Analogi Sehari-hari

Bayangkan kamu masuk gedung kantor.

- **Register** = mendaftar ke resepsionis. Resepsionis tidak mencatat kata
  sandimu apa adanya, tapi "sidik jari" dari kata sandi itu (hash).
- **Login** = kamu menunjukkan identitas, lalu dapat **kartu tamu** (JWT). Kartu
  itu ada cap resmi gedung, jadi satpam bisa cek keasliannya tanpa menelepon
  resepsionis.
- **Middleware auth** = satpam di tiap pintu yang mengecek kartu.
- **Kartu kedaluwarsa + refresh token** = kartu tamu cuma berlaku 15 menit. Kalau
  habis, kamu tukar di loket dengan kupon khusus (refresh token) tanpa perlu
  daftar ulang.
- **RBAC** = kartu warna merah boleh masuk ruang server, kartu biru cuma ke
  lobi.
- **Rate limit** = satpam mencurigai orang yang mencoba 50 kartu palsu dalam
  semenit.

## Kenapa Penting untuk Kerja Web Developer?

- Hampir semua aplikasi butuh login. Ini salah satu topik yang paling sering
  ditanya saat interview backend/fullstack.
- Bug di auth bukan bug biasa. Satu kesalahan bisa membuat data semua user bocor.
- Kamu akan sering membaca kode auth orang lain. Paham polanya membuatmu bisa
  menemukan celah sebelum penyerang menemukannya.

## Istilah Baru

| Istilah | Arti singkat |
| --- | --- |
| Hash | Mengubah password jadi teks acak satu arah. Tidak bisa dibalik. |
| Salt | Bumbu acak yang ditambahkan sebelum hash supaya password sama tidak menghasilkan hash sama. bcrypt mengurus ini otomatis. |
| bcrypt | Algoritma hash yang sengaja lambat, cocok untuk password. |
| JWT | JSON Web Token. Teks berisi data (payload) + tanda tangan dari server. |
| Payload | Isi JWT, misalnya id dan role user. Bisa dibaca siapa saja, jadi jangan isi rahasia. |
| Secret | Kunci rahasia server untuk menandatangani JWT. Harus panjang dan tidak boleh masuk Git. |
| Bearer token | Cara mengirim token lewat header `Authorization: Bearer <token>`. |
| Access token | Token berumur pendek untuk mengakses API. |
| Refresh token | Token berumur panjang untuk meminta access token baru. |
| Token rotation | Setiap refresh token dipakai, diganti yang baru dan yang lama dibatalkan. |
| Middleware | Fungsi yang berjalan sebelum handler route, misalnya pengecek token. |
| 401 vs 403 | 401: belum terautentikasi. 403: sudah dikenal, tapi tidak boleh. |
| RBAC | Role-Based Access Control. Hak akses ditentukan oleh role. |
| CORS | Aturan browser tentang website mana yang boleh memanggil API-mu. |
| Helmet | Library Express yang memasang header keamanan HTTP. |
| Rate limiting | Membatasi jumlah request dalam rentang waktu. Respons-nya 429. |

## Isi Folder

```text
01-latihan-auth/
├── README.md        ← kamu di sini
├── TUGAS.md         ← apa yang dikerjakan, di file mana
├── CHECKLIST.md     ← cek jujur "aku sudah bisa..."
├── soal/            ← 5 soal
└── code/            ← 5 starter (beberapa sudah berisi implementasi, baca TUGAS.md)
```

## Mulai dari Mana?

Kerjakan [01-latihan-fullstack](../01-latihan-fullstack/TUGAS.md) dulu. Setelah
itu buka [TUGAS.md](TUGAS.md).

Teori pendukung: [Auth Fullstack](../../materi-teori/03-auth-fullstack/README.md),
[CORS dan Cookies](../../materi-teori/02-cors-cookies/README.md), dan modul
[Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md).

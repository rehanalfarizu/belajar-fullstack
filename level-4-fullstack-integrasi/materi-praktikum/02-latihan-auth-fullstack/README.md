# 02 — Latihan Auth Fullstack (React + Express + Cookie HttpOnly)

## Topik Ini Tentang Apa?

Di [01-latihan-auth](../01-latihan-auth/README.md) kamu membuat login di sisi
server. Sekarang kamu menyambungkannya ke React:

1. Client HTTP (axios/fetch) yang otomatis mengirim cookie sesi.
2. AuthContext yang tahu user sedang login atau tidak, dengan bertanya ke server
   (`/auth/me`), bukan menebak dari localStorage.
3. Route yang hanya bisa dibuka setelah login (ProtectedRoute), route khusus tamu
   (GuestRoute), dan route khusus admin.
4. Tampilan yang berbeda tergantung role user (RBAC di frontend), sambil tetap
   mengecek hak akses di backend.

Kuncinya: token sesi disimpan di **cookie `HttpOnly`**. JavaScript di halaman
tidak bisa membacanya, jadi kalau ada celah XSS, token tidak ikut dicuri.

## Analogi Sehari-hari

Bayangkan kamu menginap di hotel.

- Saat check-in (login), resepsionis memberi **gelang kamar** yang dipasang di
  pergelanganmu (cookie `HttpOnly`). Kamu tidak bisa melepas lalu meminjamkannya
  ke orang lain dengan mudah. Gelang otomatis "ikut" setiap kamu ke fasilitas
  hotel (browser otomatis mengirim cookie).
- Bandingkan dengan **kunci kartu yang kamu taruh di saku** (token di
  localStorage). Siapa pun yang berhasil merogoh sakumu (script jahat) bisa
  membawanya pergi.
- Petugas di pintu restoran (ProtectedRoute di React) cuma membantu mengarahkan.
  Yang benar-benar menolak orang tanpa gelang adalah sistem kasir (server).

## Kenapa Penting untuk Kerja Web Developer?

- Hampir setiap aplikasi web punya halaman login, dashboard, dan halaman admin.
  Pola di sini dipakai di proyek nyata setiap hari.
- Banyak tutorial lama mengajarkan menyimpan JWT di localStorage. Paham kenapa
  itu berisiko, dan apa alternatifnya, adalah nilai plus saat interview.
- Masalah CORS + cookie adalah salah satu bug paling sering ditanyakan junior
  developer. Kamu akan menghadapinya langsung di sini.

## Istilah Baru

| Istilah | Arti singkat |
| --- | --- |
| Cookie `HttpOnly` | Cookie yang tidak bisa dibaca JavaScript (`document.cookie`). Hanya dikirim browser ke server. |
| `Secure` | Cookie hanya dikirim lewat HTTPS. Wajib di production. |
| `SameSite` | Aturan kapan cookie ikut terkirim dari situs lain (`Strict`, `Lax`, `None`). Membantu melawan CSRF. |
| `withCredentials` / `credentials: "include"` | Opsi di axios/fetch supaya browser mengirim cookie ke origin lain. |
| CORS credentials | Server harus membalas dengan origin yang spesifik (bukan `*`) dan `Access-Control-Allow-Credentials: true`. |
| CSRF | Serangan yang menumpang cookie korban untuk mengirim request dari situs lain. |
| Session check / hydrate | Saat aplikasi dibuka, tanya `/auth/me` ke server untuk tahu siapa yang login. |
| Interceptor | Fungsi axios yang berjalan sebelum request dikirim atau setelah response datang. |
| ProtectedRoute | Komponen yang mengalihkan ke `/login` kalau belum login. Hanya soal tampilan. |
| GuestRoute | Kebalikannya: mengalihkan user yang sudah login dari halaman login/register. |
| RBAC | Role-Based Access Control: hak akses berdasarkan role (user, author, editor, admin). |

## Isi Folder

```text
02-latihan-auth-fullstack/
├── README.md        ← kamu di sini
├── TUGAS.md         ← tugas berdasarkan TODO di code/
├── CHECKLIST.md
└── code/            ← 5 file (tidak ada folder soal/)
```

Folder ini tidak punya `soal/`. Tugasnya disusun dari TODO di dalam file
`code/`. Lihat [TUGAS.md](TUGAS.md).

Teori pendukung: [CORS dan Cookies](../../materi-teori/02-cors-cookies/README.md),
[Auth Fullstack](../../materi-teori/03-auth-fullstack/README.md), modul
[XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md).

# 08 — Autentikasi & Otorisasi

## Apa Ini?

Dua kata yang mirip tapi beda tugas:

- **Autentikasi (authentication)** — "Kamu siapa?" Dibuktikan dengan login.
- **Otorisasi (authorization)** — "Kamu boleh melakukan ini?" Dicek lewat policy/gate.

Di topik ini kamu membuat login/logout sendiri, menyimpan password dengan benar,
membatasi tebak-tebakan password, dan memastikan user hanya bisa menyentuh data
miliknya.

## Analogi

**Gedung kantor.**

- Di lobi, satpam mengecek kartu identitas → **autentikasi**. Kamu dapat kartu akses (session).
- Di depan tiap ruangan, pintu mengecek kartumu: "kartu ini boleh masuk ruang server?" → **otorisasi**.
- Kartu tamu bisa masuk lobi, tapi tidak bisa masuk ruang direksi. Sudah masuk gedung
  **tidak sama** dengan boleh masuk semua ruangan.

## Kenapa Penting Buat Kerja?

- **Broken Access Control** menempati peringkat #1 di OWASP Top 10. IDOR adalah bentuk paling umumnya.
- Bug otorisasi biasanya tidak kelihatan di demo — semua terlihat "jalan" — tapi
  fatal di production.
- Hampir semua aplikasi kantor punya role (admin, staf, pelanggan) dan kepemilikan
  data. Kamu pasti akan menulis policy.
- Pertanyaan wawancara klasik: "Beda 401 dan 403?", "Kenapa password di-hash, bukan
  dienkripsi?", "Apa itu session fixation?".

## Glosarium

| Istilah | Arti singkat |
|---|---|
| Session | Data user yang disimpan di server, dikenali lewat cookie |
| Guard | Cara Laravel mengenali user (`web` = session, `sanctum` = token/cookie SPA) |
| Hash | Ubahan satu arah dari password, tidak bisa dibalik |
| Rate limit | Batas jumlah percobaan dalam rentang waktu |
| Policy | Class berisi aturan otorisasi untuk satu model |
| Gate | Aturan otorisasi berbentuk closure, untuk aksi umum |
| IDOR | Akses data orang lain dengan mengganti id di request |
| 401 | Belum login |
| 403 | Sudah login, tapi tidak boleh |

## Daftar Soal

| # | Soal | Level |
|---|---|---|
| 01 | [Authentication dan Authorization](soal/01-auth-authorization.md) | Menengah |
| 02 | [Login Manual, Hash Password, dan Batas Percobaan](soal/02-login-manual-dan-hash.md) | Menengah |
| 03 | [IDOR: Ganti Angka di URL, Edit Produk Orang Lain](soal/03-idor-dan-policy-kepemilikan.md) | Lanjut |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Cek pemahaman di [CHECKLIST.md](CHECKLIST.md).

## Baca Dulu

- Teori: [Materi Teori 08 — Autentikasi & Otorisasi](../../materi-teori/08-autentikasi/README.md)
- Keamanan: [Modul Keamanan 04 — Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md)
- Keamanan: [Modul Keamanan 05 — Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md)
- Setup proyek latihan: [Materi Praktikum README](../README.md)

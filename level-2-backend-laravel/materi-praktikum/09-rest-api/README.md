# Praktikum 09 — REST API

## Ini Tentang Apa?

Di topik ini aplikasi toko kamu belajar "ngobrol" dengan aplikasi lain lewat
JSON. Aplikasi kasir Android, frontend Vue, atau sistem gudang bisa membaca dan
mengubah data produk lewat URL seperti `/api/products`.

Teori lengkapnya: [Materi Teori 09 — REST API](../../materi-teori/09-rest-api/README.md).

## Analogi

API itu **loket pemesanan di warung**. Pembeli tidak masuk dapur. Pembeli pesan
lewat loket dengan format yang jelas, lalu menerima makanan lewat loket yang
sama. Tugasmu di topik ini:

- Menentukan **menu apa saja** yang boleh dipesan (route).
- Memastikan **yang keluar dari loket hanya makanan**, bukan nota belanja dapur
  (API Resource).
- Memasang **antrean dan kartu anggota** supaya loket tidak diserbu (rate limit
  dan token).

## Kenapa Penting Buat Kerja?

- Hampir semua lowongan backend meminta pengalaman membuat REST API.
- Kebocoran data lewat API adalah salah satu insiden keamanan paling sering di
  dunia nyata. Pewawancara suka bertanya: "Bagaimana kamu memastikan API tidak
  membocorkan kolom sensitif?"
- Rate limit dan token adalah hal yang langsung ditanyakan saat API mau dipakai
  aplikasi mobile.

## Daftar Soal

| # | Soal | Level | Fokus |
|---|---|---|---|
| 01 | [REST API Products](soal/01-product-api.md) | Menengah | CRUD, pagination, filter, status code |
| 02 | [API Resource Tanpa Bocor Data](soal/02-api-resource-tanpa-bocor.md) | Menengah | `JsonResource`, `when()`, `whenLoaded()`, 404 JSON |
| 03 | [Rate Limit dan Token API](soal/03-rate-limit-dan-token.md) | Lanjut | `RateLimiter`, Sanctum token, ability, 429 |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Ukur pemahamanmu di
[CHECKLIST.md](CHECKLIST.md).

## Hubungan dengan Modul Keamanan

- [Modul 05 — Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md):
  data yang bocor lewat API dan IDOR.
- [Modul 04 — Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md):
  brute force login dan pengelolaan token.

## Glosarium

| Istilah | Arti |
|---|---|
| **Endpoint** | Method + URL, misal `GET /api/products` |
| **API Resource** | Class Laravel yang membentuk JSON dari model |
| **Excessive data exposure** | API mengirim field yang tidak perlu dilihat client |
| **Rate limit** | Batas jumlah request per waktu |
| **`429`** | Status "terlalu banyak request" |
| **`Retry-After`** | Header berisi berapa detik client harus menunggu |
| **Sanctum** | Paket autentikasi API resmi Laravel |
| **Bearer token** | Token di header `Authorization: Bearer ...` |
| **Ability** | Hak terbatas yang menempel di sebuah token |
| **User enumeration** | Menebak email terdaftar dari perbedaan pesan error |

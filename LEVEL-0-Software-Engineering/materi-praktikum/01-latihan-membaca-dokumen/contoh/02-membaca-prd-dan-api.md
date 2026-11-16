# Contoh Jawaban Soal 02: Membaca PRD dan Dokumentasi API

> Buka hanya setelah semua nomor kamu jawab sendiri.

## A. Memahami tujuan

**1.** Pesanan jasa website yang masuk lewat WhatsApp sering terlewat, klien
sering menanyakan status, dan pembayaran dicatat terpisah. Sistem ini untuk klien
dan admin. Berhasil kalau tidak ada pesanan terlewat, pertanyaan status turun
70%, dan admin bisa mengecek tagihan dalam kurang dari 1 menit.

**2.** Tidak ada yang bisa diukur sepenuhnya oleh sistem sendiri, dan itu temuan
penting:

- "100% pesanan lewat sistem" butuh pembanding: jumlah pesanan yang masih masuk
  lewat WhatsApp. Sistem hanya tahu pesanan yang masuk ke dirinya.
- "Pertanyaan status turun 70%" dihitung dari chat WhatsApp, di luar sistem.
- "Cek tagihan di bawah 1 menit" diukur dengan mengamati admin.

Pertanyaan lanjutan untuk PM: bagaimana dan siapa yang mengukur metrik ini?

**3.** Bagian 4 "Tidak termasuk": notifikasi email/WhatsApp direncanakan fase 2.
Jawaban: "Terima kasih, permintaan ini sudah masuk rencana fase 2. Untuk saat ini
status terbaru bisa dilihat kapan saja di halaman Pesanan Saya." Jangan langsung
dikerjakan walaupun terlihat kecil.

## B. Requirement menjadi pekerjaan

**4.**

| Story | Data | Endpoint | Layar |
|---|---|---|---|
| US-01 Registrasi | `users` | `POST /auth/register` | halaman daftar |
| US-02 Paket | `packages` | `GET /packages` | katalog paket |
| US-03 Buat pesanan | `orders`, `packages`, `order_status_logs` | `POST /orders` | form pesanan |
| US-04 Pesanan saya | `orders`, `packages`, `payments` | `GET /orders`, `GET /orders/:id` | daftar + detail pesanan |
| US-05 Batal | `orders`, `order_status_logs` | `POST /orders/:id/cancel` | tombol batal + konfirmasi |
| US-06 Daftar admin | `orders`, `users`, `packages`, `payments` | `GET /orders?status=` | dashboard admin |
| US-07 Ubah status | `orders`, `order_status_logs` | `PATCH /orders/:id/status` | kontrol status di detail admin |
| US-08 Pembayaran | `payments` | `POST /orders/:id/payments` | form pembayaran di detail admin |

Yang tidak bisa diisi dari dokumen: kontrak lengkap `register`/`login` (body dan
error), cara admin dibuat, dan cara file bukti pembayaran di-upload (API hanya
menerima `proofUrl` berupa teks).

**5.**

| # | Input | Status | `code` |
|---|---|---|---|
| 1 | data valid, login sebagai klien | 201, `status: "baru"`, `agreedPrice` = harga paket | – |
| 2 | tanpa login | 401 | `UNAUTHENTICATED` |
| 3 | login sebagai admin | 403 | `FORBIDDEN` |
| 4 | `brief` kosong | 400 | `VALIDATION_ERROR` |
| 5 | `brief` 2.001 karakter | 400 | `VALIDATION_ERROR` |
| 6 | `brief` tepat 2.000 karakter | 201 | – |
| 7 | paket tidak aktif | 422 | `PACKAGE_INACTIVE` |
| 8 | deadline 13 hari dari hari ini | 422 | `DEADLINE_TOO_SOON` |
| 9 | deadline tepat 14 hari | 201 | – |
| 10 | deadline `01-02-2027` | 400 | `VALIDATION_ERROR` |
| 11 | harga paket diubah setelah pesanan dibuat | `agreedPrice` pesanan lama tidak berubah | – |
| 12 | `packageId` tidak ada | **tidak didefinisikan** di kontrak | – |

Kasus batas (nomor 6 dan 9) sering lupa diuji, padahal bug off-by-one muncul di
situ. Nomor 12 adalah lubang di kontrak yang perlu ditanyakan.

## C. Membaca kontrak API

**6.**

- a. `422 INVALID_TRANSITION`, karena lompat dari `dikonfirmasi` ke `selesai`.
- b. `200`, karena `dibatalkan` boleh dari status mana pun yang belum final. Log
  status tercatat dengan `changed_by` = admin tersebut.
- c. `403 FORBIDDEN`, karena endpoint ini khusus admin.
- d. `400 VALIDATION_ERROR` kalau nilai status dianggap case-sensitive. Kontrak
  tidak menyebutnya, jadi ini juga layak ditanyakan.

**7.** `403` memberi tahu penyerang bahwa pesanan dengan id itu **ada**, hanya
bukan miliknya. Dengan mencoba id 1, 2, 3, dan seterusnya, orang bisa menebak
jumlah pesanan usaha ini. `404` tidak membocorkan apa pun.

## D. Mencari yang kurang

**8.** Contoh pertanyaan untuk PM:

1. **US-05:** "Sampai status apa klien boleh membatalkan? API saat ini mengizinkan
   pembatalan bahkan saat pesanan `dikerjakan`. Kalau sudah ada DP, apakah
   dikembalikan, dan bagaimana mencatatnya?"
2. **review_klien:** "Siapa yang memindahkan pesanan dari `review_klien` ke
   `selesai`? Saat ini hanya admin yang bisa mengubah status. Apakah klien perlu
   tombol 'Setujui' atau 'Minta revisi'?"
3. **US-01:** "Kontrak `POST /auth/register` belum menjelaskan error saat email
   sudah terdaftar. Apakah memakai `409 EMAIL_TAKEN`? Dan bagaimana akun admin
   dibuat?"
4. **Non-fungsional:** "Target 2 detik untuk 5.000 pesanan, tapi `GET /orders`
   belum punya pagination. Berapa jumlah per halaman yang diinginkan?"
5. **US-03:** "14 hari itu hari kalender atau hari kerja? 'Hari ini' dihitung
   dengan zona waktu WIB? `createdAt` di API memakai UTC."
6. **US-03:** "Kalau `packageId` tidak ada, responsnya 404 atau 422?"
7. **US-08:** "Bukti pembayaran di-upload ke mana? Format dan ukuran maksimal
   file? Upload file desain ada di out of scope; apakah bukti pembayaran
   pengecualian?"
8. **US-04/US-06:** "'Terbaru' berdasarkan waktu dibuat atau waktu terakhir
   diubah?"

**9.** Kontrak: tambahkan pagination (`?page=1&limit=20` atau cursor) dan total
data. Database: index untuk filter dan urutan admin, misalnya
`CREATE INDEX ON orders (status, created_at DESC)`, dan index di
`payments(order_id)`. `totalPaid` harus dihitung dengan satu query JOIN + GROUP BY
(seperti Soal 01 nomor 9), bukan satu query per pesanan (masalah N+1).

## E. Alur

**10.**

```text
Browser admin          API                         Database
  | POST /orders/41/payments {amount: 1500000}         |
  |------------------->|                              |
  |                    | cek sesi + role admin        |
  |                    | validasi body                |
  |                    | SELECT agreed_price, status  |
  |                    |----------------------------->|
  |                    | SELECT SUM(amount)           |
  |                    |----------------------------->|
  |                    | total + amount > harga?      |
  |                    |   ya  -> 422 OVERPAYMENT     |
  |                    |   tidak -> INSERT payment    |
  |                    |----------------------------->|
  | 201 + totalPaid    |                              |
  |<-------------------|                              |
```

Celahnya ada di antara `SELECT SUM` dan `INSERT`. Dua admin bisa membaca total
yang sama, sama-sama lolos pengecekan, lalu sama-sama menyimpan, sehingga total
melebihi harga. Pencegahannya: jalankan semuanya dalam satu transaction dan kunci
baris pesanan dulu dengan `SELECT ... FROM orders WHERE id = 41 FOR UPDATE`.
Request kedua akan menunggu sampai yang pertama selesai, lalu membaca total yang
sudah baru.

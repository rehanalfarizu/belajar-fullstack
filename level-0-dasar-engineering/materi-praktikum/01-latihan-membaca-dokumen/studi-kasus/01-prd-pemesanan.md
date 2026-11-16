# PRD: Sistem Pemesanan Jasa Website

> Studi kasus fiktif untuk latihan. Versi: draft 1.
> Baca bersama [ERD](02-erd-pemesanan.md) dan [dokumentasi API](03-api-pemesanan.md).

## 1. Latar belakang

Sebuah usaha jasa pembuatan website menerima pesanan lewat WhatsApp dan Google
Form, lalu mencatat pembayaran di spreadsheet terpisah. Dalam tiga bulan terakhir:

- 4 pesanan terlewat karena chat tenggelam;
- rata-rata klien menanyakan status proyek 3 kali per proyek;
- admin butuh sekitar 30 menit tiap minggu untuk mencocokkan spreadsheet
  pembayaran dengan chat.

## 2. Tujuan dan metrik

| Tujuan | Metrik | Target |
|---|---|---|
| Tidak ada pesanan terlewat | pesanan baru yang masuk lewat sistem | 100% dalam 2 bulan setelah rilis |
| Klien tahu status tanpa bertanya | pertanyaan status lewat WhatsApp | turun 70% |
| Tagihan mudah dipantau | waktu admin mengecek pesanan belum lunas | di bawah 1 menit |

## 3. Pengguna

- **Klien** — orang atau UMKM yang memesan website.
- **Admin** — pemilik usaha dan satu staf.

## 4. Scope

**Termasuk:**

1. Registrasi dan login klien
2. Melihat daftar paket
3. Membuat pesanan
4. Klien melihat daftar dan detail pesanannya
5. Klien membatalkan pesanan
6. Admin melihat semua pesanan
7. Admin mengubah status pesanan
8. Admin mencatat pembayaran

**Tidak termasuk (fase ini):**

- payment gateway online
- chat di dalam aplikasi
- upload file desain atau revisi
- notifikasi email/WhatsApp (direncanakan fase 2)
- aplikasi mobile native
- multi bahasa

## 5. Status pesanan

```text
baru ─► dikonfirmasi ─► dikerjakan ─► review_klien ─► selesai
  │           │              │              │
  └───────────┴──────────────┴──────────────┴─► dibatalkan
```

## 6. User story dan acceptance criteria

### US-01 Registrasi

Sebagai calon klien, saya ingin mendaftar dengan nama, email, dan password,
supaya saya bisa memesan.

- Email harus unik. Jika sudah dipakai, tampilkan "Email sudah terdaftar".
- Password minimal 8 karakter.
- Setelah berhasil daftar, klien langsung dalam keadaan login.

### US-02 Melihat paket

Sebagai calon klien, saya ingin melihat paket yang tersedia, supaya saya bisa
memilih sesuai budget.

- Hanya paket aktif yang ditampilkan.
- Urut dari harga termurah.
- Bisa dilihat tanpa login.

### US-03 Membuat pesanan

Sebagai klien, saya ingin membuat pesanan dengan memilih paket dan menulis brief,
supaya pemesanan saya tercatat.

- Klien memilih tepat satu paket aktif.
- Brief wajib diisi, maksimal 2.000 karakter.
- Deadline yang diinginkan minimal 14 hari dari hari ini.
- Status awal pesanan adalah `baru`.
- Harga yang disepakati adalah harga paket saat pesanan dibuat.

### US-04 Pesanan saya

Sebagai klien, saya ingin melihat status pesanan saya, supaya saya tidak perlu
bertanya lewat WhatsApp.

- Klien melihat semua pesanannya, terbaru di atas, beserta status.
- Jika belum punya pesanan, tampilkan "Belum ada pesanan" dan tombol "Buat pesanan".
- Klien tidak bisa melihat pesanan milik klien lain.

### US-05 Membatalkan pesanan

Sebagai klien, saya ingin membatalkan pesanan saya.

- Status pesanan berubah menjadi `dibatalkan`.

### US-06 Daftar pesanan untuk admin

Sebagai admin, saya ingin melihat semua pesanan, supaya tidak ada yang terlewat.

- Bisa difilter berdasarkan status.
- Terbaru di atas.
- Setiap baris menampilkan nama klien, nama paket, harga disepakati, total
  dibayar, dan sisa tagihan.

### US-07 Mengubah status

Sebagai admin, saya ingin mengubah status pesanan, supaya klien tahu progresnya.

- Status hanya boleh maju satu langkah sesuai urutan, kecuali ke `dibatalkan`.
- Pesanan `selesai` atau `dibatalkan` tidak bisa diubah lagi.
- Setiap perubahan dicatat: dari status apa, ke status apa, oleh siapa, kapan.

### US-08 Mencatat pembayaran

Sebagai admin, saya ingin mencatat pembayaran klien (DP dan pelunasan), supaya
tagihan bisa dipantau.

- Data: jumlah, tanggal bayar, metode (`transfer` atau `tunai`), bukti (opsional).
- Total pembayaran satu pesanan tidak boleh melebihi harga yang disepakati.

## 7. Requirement non-fungsional

- Password disimpan dalam bentuk hash (bcrypt), tidak pernah dikirim balik di response.
- Klien hanya bisa mengakses pesanannya sendiri.
- Daftar pesanan admin tampil di bawah 2 detik untuk 5.000 pesanan.
- Semua halaman bisa dipakai dengan nyaman dari HP.

## 8. Pertanyaan terbuka

_(Dikosongkan. Kamu yang mengisi di Soal 02.)_

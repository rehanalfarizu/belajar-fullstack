# Catatan Belajar — Otorisasi dan Akses

Kamu "login" sebagai **andi** (`X-User-Id: 1`). Order milik andi cuma 101 dan 102.

## Log Eksperimen IDOR (server rentan, port 3050)

Isi satu baris untuk setiap percobaan. Kolom "Kembali di 3051" diisi nanti setelah kamu memperbaiki `02-api-aman.js`.

| No | Method + URL yang kamu panggil | Header X-User-Id | Apa yang kamu ubah? | Data apa yang bocor / berubah? | Kembali di 3051 (status) |
|----|--------------------------------|------------------|---------------------|--------------------------------|--------------------------|
| 1 | `GET /api/orders/101` | 1 | (normal, order sendiri) | <!-- TODO(human) --> | <!-- TODO(human) --> |
| 2 | <!-- TODO(human) --> | 1 | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |
| 3 | <!-- TODO(human) --> | 1 | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |
| 4 | <!-- TODO(human) --> | 1 | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |
| 5 | <!-- TODO(human) --> | 1 | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |

Petunjuk kalau buntu:

- Ada berapa endpoint di `/`? Sudah kamu coba semua?
- Selain angka di path (`/:id`), ada parameter lain yang bisa diubah?
- Endpoint yang mengubah data (PATCH, DELETE) juga perlu dicoba, bukan cuma GET.

## Pertanyaan

**1. Dengan kata-katamu sendiri, apa itu IDOR?**

<!-- TODO(human): jawabanmu -->

**2. Bayangkan ini aplikasi toko online sungguhan. Informasi pribadi apa saja yang bocor dari percobaanmu?**

<!-- TODO(human): jawabanmu -->

**3. ID order di sini berurutan (101, 102, 103...). Apakah memakai ID acak (UUID) sudah cukup untuk mencegah IDOR? Kenapa?**

<!-- TODO(human): jawabanmu -->

**4. Untuk order milik orang lain, kamu pilih balas 403 atau 404? Alasannya?**

<!-- TODO(human): jawabanmu -->

**5. Aturan admin yang kamu pilih: boleh lihat saja, atau boleh ubah/hapus juga? Kenapa?**

<!-- TODO(human): jawabanmu -->

**6. Developer bilang "menu admin kan disembunyikan di frontend". Kenapa itu tidak cukup?**

<!-- TODO(human): jawabanmu -->

**7. Di lab ini identitas user diambil dari header `X-User-Id`. Kenapa itu tidak aman di aplikasi nyata, dan dari mana seharusnya identitas itu berasal?** (hubungkan dengan modul 04)

<!-- TODO(human): jawabanmu -->

## Kode Sebelum dan Sesudah

### Sebelum (rentan)

```javascript
// TODO(human): tempel satu handler dari 01-api-rentan.js
```

### Sesudah (aman)

```javascript
// TODO(human): tempel versi yang sudah kamu perbaiki
```

## Refleksi

Saat membuat endpoint baru yang menerima ID, pertanyaan apa yang akan selalu kamu tanyakan ke dirimu sendiri?

<!-- TODO(human): tulis refleksimu -->

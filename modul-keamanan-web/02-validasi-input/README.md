# 02 — Validasi Input

## Apa yang Dipelajari

Input validation adalah **garis pertahanan pertama** dalam keamanan aplikasi. Setiap 
data yang masuk dari luar (user, API, file) harus dianggap "bersalah sampai terbukti 
bersih".

---

## Analogi: Satpam Gedung

Bayangkan aplikasimu adalah gedung perkantoran:

- **Validasi client-side** = Satpam di lobby yang cek ID card
  - Cepat, langsung kasih feedback
  - TAPI bisa dilewati kalau punya cara (pakai pintu belakang)

- **Validasi server-side** = Satpam di lift yang cek ulang
  - Lebih lambat (perlu ke server)
  - TAPI tidak bisa di-bypass

**Kesimpulan:** Kamu butuh DUA-DUANYA. Client untuk UX, server untuk keamanan.

---

## Kenapa Validasi Client Saja TIDAK Cukup

User bisa bypass validasi client dengan:
1. **DevTools** — Edit HTML, hapus `required`, ubah `type="email"` jadi `type="text"`
2. **Postman/curl** — Kirim request langsung ke API tanpa lewat form
3. **Browser extension** — Intercept dan modifikasi request

Demo: Buka DevTools di form manapun, hapus atribut `required`, submit form kosong.

---

## Jenis Validasi

Contoh di bagian ini memakai kasus **peminjaman buku perpustakaan**, bukan form
registrasi di lab. Terjemahkan polanya sendiri ke kasusmu.

### 1. Validasi Tipe Data
```javascript
// ❌ Buruk - langsung pakai
const jumlah = req.body.jumlahBuku;

// ✅ Baik - cek tipe dulu
const jumlah = parseInt(req.body.jumlahBuku, 10);
if (isNaN(jumlah)) {
  return res.status(400).json({ error: 'jumlahBuku harus angka' });
}
```

### 2. Validasi Range/Batas
```javascript
// Cek batas nilai
if (jumlah < 1 || jumlah > 5) {
  return res.status(400).json({ error: 'Maksimal pinjam 5 buku' });
}

// Cek panjang string
if (catatan.length > 200) {
  return res.status(400).json({ error: 'Catatan maksimal 200 karakter' });
}
```

### 3. Validasi Format
```javascript
// Kode anggota berformat PST-0000 (regex sederhana)
const formatKode = /^PST-\d{4}$/;
if (!formatKode.test(kodeAnggota)) {
  return res.status(400).json({ error: 'Format kode anggota salah' });
}
```

Pertanyaan: untuk format yang rumit seperti email atau nomor telepon, kenapa
lebih aman memakai library yang sudah teruji daripada menulis regex sendiri?

### 4. Validasi Whitelist vs Blacklist
```javascript
// ❌ Blacklist - mencoba blokir yang buruk (selalu bisa dilewati)
const karakterTerlarang = ['<', '>', '"', "'"];
if (karakterTerlarang.some(c => kodeRak.includes(c))) {
  return res.status(400).json({ error: 'Karakter tidak valid' });
}

// ✅ Whitelist - hanya izinkan yang baik (lebih aman)
const formatRak = /^[A-C][0-9]{2}$/;   // contoh: rak A01, B12
if (!formatRak.test(kodeRak)) {
  return res.status(400).json({ error: 'Kode rak harus huruf A-C diikuti 2 angka' });
}
```

---

## Library Validasi yang Direkomendasikan

### JavaScript/Node.js
- **Zod** — Modern, TypeScript-first, runtime validation
- **Yup** — Populer, bagus untuk form
- **Joi** — Mature, banyak fitur
- **validator.js** — Utility functions

### PHP/Laravel
- **Laravel Validation** — Built-in, sangat lengkap

### Contoh dengan Zod

Contoh ini untuk form peminjaman buku. Schema untuk lab-mu berbeda, jadi kamu
tetap perlu menyusunnya sendiri dari aturan di file lab.

```javascript
const { z } = require('zod');

const PinjamSchema = z.object({
  kodeAnggota: z.string().regex(/^PST-\d{4}$/),
  jumlahBuku: z.number().int().min(1).max(5),
  layanan: z.enum(['reguler', 'kilat']),
});

const hasil = PinjamSchema.safeParse(req.body);
if (!hasil.success) {
  return res.status(400).json({ errors: hasil.error.issues });
}
// hasil.data sudah bersih
```

Pertanyaan pemandu untuk lab:
- Apa bedanya `parse` dan `safeParse`? Mana yang tidak melempar error?
- Bagaimana menulis aturan "boleh dikosongkan" dan "punya nilai bawaan" di Zod?
- Bagaimana membatasi nilai hanya pada daftar tertentu?

---

## Istilah Penting

| Istilah | Arti |
|---------|------|
| **Sanitization** | Membersihkan input (hapus/escape karakter berbahaya) |
| **Validation** | Memeriksa apakah input sesuai aturan |
| **Whitelist** | Daftar yang BOLEH (lebih aman) |
| **Blacklist** | Daftar yang TIDAK BOLEH (mudah dilewati) |
| **Type coercion** | Konversi tipe data otomatis (bisa berbahaya) |

---

## Prinsip Validasi

1. **Validate early, fail fast** — Cek di awal, tolak segera kalau salah
2. **Whitelist over blacklist** — Izinkan yang baik, bukan blokir yang buruk
3. **Validate at every boundary** — Client, server, database
4. **Never trust client** — Selalu validasi ulang di server
5. **Use established libraries** — Jangan bikin regex sendiri untuk email

---

## Selanjutnya

Setelah memahami validasi input, kamu akan belajar tentang **SQL Injection** — 
salah satu serangan paling umum yang terjadi karena kurang validasi.

# Latihan 05 — Form Submission Patterns

## Soal 01: Async Form Submission dan Optimistic Updates

### Tujuan
Memahami async form submission dengan proper loading states, error handling, dan optimistic UI updates.

### Deskripsi
Buat `CommentSection` — sistem komentar dengan optimistic updates.

**Comment Data:**
```js
{
  id: "C001",
  author: "Anonymous",
  content: "Komentar pertama",
  timestamp: Date.now(),
  likes: 0,
  likedByUser: false,
}
```

**Optimistic Update Pattern:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-form-submission Soal 01 — Optimistic handleSubmit").

Petunjuk: urutan kejadian: (1) UI langsung diperbarui, (2) permintaan dikirim, (3) kalau gagal, apa yang harus dikembalikan, dan data form apa yang perlu dipulihkan? Bagaimana mengenali komentar mana yang di-rollback?

**Fitur:**
1. **Comment Form**: author name + content textarea + submit button
2. **Comment List**: list semua komentar dengan newest first
3. **Like Button**: optimistic update — langsung update count sebelum server response
4. **Delete Button**: optimistic delete — langsung hapus dari UI
5. **Loading State**: spinner pada tombol submit saat mengirim
6. **Error Recovery**: jika submit gagal, rollback + tampilkan error + restore form
7. **Timestamps**: tampilkan relative time ("2 jam lalu", "Kemarin")

**Relative Time Helper:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-form-submission Soal 01 — getRelativeTime").

Petunjuk: ubah selisih milidetik ke detik, menit, jam, hari, lalu cek dari satuan terbesar ke terkecil. Contoh keluaran: `Baru saja`, `5 menit lalu`, `2 jam lalu`, `3 hari lalu`.

**Simulated API:**
```js
function simulateApiCall(data, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail || Math.random() < 0.1) { // 10% random failure
        reject(new Error("Network error. Silakan coba lagi."));
      } else {
        resolve({ success: true, data });
      }
    }, 800);
  });
}
```

### Aturan
- Optimistic update TIDAK menunggu server response
- Rollback WAJIB dilakukan jika server mengembalikan error
- Form WAJIB di-reset setelah submit berhasil
- Form WAJIB di-restore setelah rollback (karena user mungkin sudah mengetik banyak)
- Error message harus desaparecer setelah 3 detik (auto-dismiss)

### Pertanyaan Analisis
1. Apa risiko optimistic updates? Kapan sebaiknya tidak digunakan?
2. Bagaimana cara menangani conflict jika user A dan user B mengedit data yang sama hampir bersamaan?
3. Kapan sebaiknya menggunakan optimistic update vs waiting for server response?

---

## Soal 02: Form dengan Dependent Fields dan Cascading Dropdowns

### Tujuan
Memahami form dengan field yang nilainya bergantung pada pilihan field lain (cascading dropdowns).

### Deskripsi
Buat `LocationForm` — form untuk memilih lokasi dengan cascading dropdowns.

**Data:**
```js
const LOCATION_DATA = {
  Indonesia: {
    "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Utara", "Jakarta Timur"],
    "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok", "Sleman"],
    "Jawa Timur": ["Surabaya", "Malang", "Kediri", "Madiun"],
    "Bali": ["Denpasar", "Badung", "Kuta", "Ubud"],
  },
  Malaysia: {
    "Wilayah Persekutuan": ["Kuala Lumpur", "Putrajaya", "Labuan"],
    "Selangor": ["Shah Alam", "Petaling Jaya", "Subang Jaya"],
    "Penang": ["George Town", "Batu Ferringhi"],
  },
  Singapore: {
    "Singapore": ["Orchard", "Marina Bay", "Sentosa", "Jurong", "Ang Mo Kio"],
  },
};
```

**Form Fields:**
```js
{
  country: "",
  province: "",
  city: "",
  district: "",
  postalCode: "",
  address: "",
}
```

**Cascading Logic:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-form-submission Soal 02 — Handler cascading dropdown").

Petunjuk: saat induk berubah, field mana saja di bawahnya yang harus dikosongkan? Apa yang terjadi kalau tidak dikosongkan?

**Computed Options:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-form-submission Soal 02 — Opsi dropdown turunan").

Petunjuk: opsi tiap dropdown diturunkan dari data dan pilihan induknya, tidak perlu disimpan sebagai state. Waspadai nilai induk yang masih kosong, dan cek bentuk data di tiap level.

**Fitur:**
1. Semua dropdown di-disable jika parent field belum dipilih
2. Dependent fields di-reset saat parent field berubah
3. Validation: semua fields required
4. Submit: console.log form data
5. "Clear All" button untuk reset semua fields

### Aturan
- Province dropdown disabled jika country belum dipilih
- City dropdown disabled jika province belum dipilih
- District dropdown disabled jika city belum dipilih
- Reset semua dependent fields SAAT parent field berubah
- Postal code auto-fill berdasarkan kombinasi country/province/city (simulasi)

### Pertanyaan Analisis
1. Apa yang terjadi jika kita tidak me-reset dependent fields saat parent berubah?
2. Bagaimana cara menangani infinite nesting levels dalam cascading dropdowns?
3. Kapan cascading dropdowns menjadi bad UX? Berikan contoh.
# Latihan 05 — Form Validation

## Soal 01: Touched State dan Field-level Validation

### Tujuan
Memahami touched state pattern untuk menampilkan error hanya setelah user berinteraksi dengan field, dan validasi per field yang bisa di-trigger saat blur.

### Deskripsi
Buat `RegistrationForm` dengan comprehensive validation dan touched state.

**Form Fields:**
```js
{
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  website: "",
 bio: "",
}
```

**Validation Rules:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "02-validasi-per-field Soal 01 — validateField").

Aturan yang harus diterapkan (pesan error bebas, tapi harus informatif):

- `fullName`: wajib, minimal 2 karakter, hanya huruf dan spasi.
- `email`: wajib, format email valid.
- `username`: wajib, minimal 3 karakter, hanya huruf, angka, underscore.
- `password`: wajib, minimal 8 karakter, ada huruf besar, huruf kecil, dan angka.
- `confirmPassword`: wajib, harus sama dengan `password` (butuh nilai field lain).
- `age`: wajib, angka, 17 sampai 100.
- `website`: opsional; kalau diisi harus diawali `http://` atau `https://`.
- `bio`: opsional; maksimal 200 karakter.

Fungsi mengembalikan teks error atau `null` kalau valid. Pikirkan: kenapa `confirmPassword` butuh parameter ketiga?

**Touched State Pattern:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "02-validasi-per-field Soal 01 — handleBlur dan touched").

Petunjuk: saat blur ada dua hal yang dicatat. Apa saja? Bagaimana menghapus key error dari object tanpa mengubah state lama?

**Fitur:**
1. Error hanya tampil JIKA field sudah di-touch (touched[field] === true)
2. Error hilang saat user mulai mengetik lagi di field yang sama
3. Password strength meter (0-6 score) dengan visual bar
4. Bio character counter: "X / 200 karakter"
5. Submit attempt: semua field ditandai touched dan divalidasi
6. Form-level error: "Mohon perbaiki kesalahan di bawah" jika ada error

**Password Strength Display:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "02-validasi-per-field Soal 01 — getPasswordStrength").

Aturan skor: tambah 1 poin untuk tiap kriteria yang terpenuhi (panjang minimal 8, panjang minimal 12, ada huruf besar, ada huruf kecil, ada angka, ada simbol `!@#$%^&*`), maksimal 6. Pemetaan: skor 0 dikosongkan, 1-2 = Lemah (merah), 3-4 = Cukup (oranye), 5 = Kuat (hijau), 6 = Sangat Kuat (hijau tua). Fungsi mengembalikan `{ score, label, color }`.

### Aturan
- `handleBlur` wajib memanggil `setTouched` untuk menandai field sebagai touched
- Error display: `{touched[fieldName] && errors[fieldName] && <span>{errors[fieldName]}</span>}`
- Password strength dihitung dan ditampilkan SAAT user mengetik (bukan saat blur)
- Submit handler harus set semua field sebagai touched sebelum validasi

### Pertanyaan Analisis
1. Mengapa touched state diperlukan? Apa yang terjadi jika kita tampilkan semua error di awal?
2. Bagaimana validasi cross-field (confirmPassword vs password) ditangani berbeda dari field-level validation?
3. Kapan validasi saat blur lebih baik dibanding validasi saat typing?
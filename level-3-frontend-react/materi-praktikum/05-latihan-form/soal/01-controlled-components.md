# Latihan 05 — Controlled Form

## Soal 01: Controlled Components dan Multiple Inputs

### Tujuan
Memahami controlled component pattern, satu handler untuk banyak input dengan attribute `name`, dan handling array fields.

### Deskripsi
Buat `EmployeeForm` — form untuk menambah/mengedit data karyawan.

**Form Fields:**
```js
{
  fullName: "",
  email: "",
  phone: "",
  department: "", // "engineering" | "marketing" | "sales" | "hr"
  role: "",
  salary: "",
  startDate: "",
  skills: [""],        // array of strings
  isRemote: false,
  employmentType: "full-time", // "full-time" | "part-time" | "contract"
}
```

**Fitur:**
1. Semua input adalah controlled (value dari state)
2. Satu `handleChange` menggunakan attribute `name`:
   Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "01-controlled-components Soal 01 — handleChange satu untuk semua input").

   Petunjuk: properti `e.target` apa yang dipakai untuk membedakan input teks dan checkbox? Bagaimana key dinamis dipakai pada object spread?
3. **Dynamic skills**: mulai dengan 1 field skill, tombol "Add Skill" tambah field baru, tombol "Remove" hapus field
4. **Select dropdown** untuk department dan employment type
5. **Number input** untuk salary dengan format currency saat blur
6. **Date input** untuk start date
7. Submit: console.log form data + reset form

**Skills Array Handling:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "01-controlled-components Soal 01 — Array skills dinamis").

Petunjuk: jangan mengubah array lama; buat array baru. Kenapa? Bagaimana mencegah menghapus field terakhir?

**Salary Formatting:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "01-controlled-components Soal 01 — Format salary").

Petunjuk: bagaimana membuang semua karakter selain angka lebih dulu? Kapan format dipasang: saat mengetik atau saat blur, dan kenapa?

### Aturan
- `name` attribute pada setiap input HARUS match dengan key di state object
- `type="checkbox"` → gunakan `checked` bukan `value`
- Skills array: minimal 1 field, tidak bisa remove yang terakhir
- Salary display sebagai formatted string Indonesia (Rp 15.000.000), tapi state tetap number

### Pertanyaan Analisis
1. Apa keuntungan menggunakan satu handler untuk semua input dibanding handler terpisah per field?
2. Kapan controlled component menjadi beban performa? Apakah ada alternatif?
3. Apa perbedaan antara `e.target.value` dan `e.target.checked` untuk checkbox?
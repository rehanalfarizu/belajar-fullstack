# Soal 03: Control Flow

## Deskripsi Singkat

Soal ini menguji pemahaman tentang struktur kontrol di JavaScript: percabangan `if/else` dan `switch`, serta perulangan `for`, `while`, dan `for...of` untuk memproses array dan object.

## Persyaratan

- [ ] Membuat array berisi minimal 5 objek mahasiswa (nama, nim, jurusan, ipk)
- [ ] Menggunakan `forEach` untuk menampilkan semua data mahasiswa
- [ ] Menggunakan `for...of` untuk menghitung rata-rata IPK
- [ ] Menggunakan `switch` untuk menampilkan nama jurusan berdasarkan kode
- [ ] Menggunakan `if/else` untuk menentukan predikat IPK (cumlaude, sangat memuaskan, dll.)

## Hint

Gunakan `array.forEach((item, index) => { ... })` untuk iterasi. Untuk rata-rata, jumlahkan semua IPK lalu bagi dengan panjang array. Predikat: IPK >= 3.5 = Cumlaude, >= 3.0 = Sangat Memuaskan, >= 2.5 = Memuaskan, lainnya = Cukup.

## Expected Output

```
Daftar Mahasiswa:
1. Budi Santoso - NIM 21001 - Teknik Informatika - IPK 3.8 (Cumlaude)
2. Siti Aminah - NIM 21002 - Sistem Informasi - IPK 3.2 (Sangat Memuaskan)
3. Andi Wijaya - NIM 21003 - Teknik Komputer - IPK 2.8 (Memuaskan)
...

Rata-rata IPK: 3.26
```
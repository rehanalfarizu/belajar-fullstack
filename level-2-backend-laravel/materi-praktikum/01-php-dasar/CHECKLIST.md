# CHECKLIST — 01 PHP Dasar

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri, bukan untuk dinilai orang lain.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan apa yang berubah kalau `declare(strict_types=1)` dihapus
- [ ] Aku paham beda list dan associative array, dan kapan pakai masing-masing
- [ ] Aku paham kenapa uang disimpan sebagai integer rupiah, bukan float
- [ ] Aku bisa menjelaskan apa itu fungsi murni dan kenapa gampang dites
- [ ] Aku paham beda `array_map`, `array_filter`, `array_reduce`, dan `usort`
- [ ] Aku paham kapan melempar exception dan kapan return `null`
- [ ] Aku bisa menjelaskan gunanya `readonly`, `enum`, dan `interface` dengan kata-kataku sendiri

---

## Kemampuan Praktis

- [ ] Aku bisa menjalankan file PHP dari terminal dan membaca pesan error-nya
- [ ] Aku bisa menulis function dengan type parameter dan return type
- [ ] Aku bisa memakai `match` untuk memilih nilai berdasarkan kondisi
- [ ] Aku bisa membuat class dengan constructor promotion dan validasi di constructor
- [ ] Aku bisa membuat backed enum dan memakai `from` / `tryFrom`
- [ ] Aku bisa membuat interface dan dua class yang mengimplementasikannya
- [ ] Ketiga soal lulus cek mandiri tanpa mengubah bagian cek

---

## Best Practices

- [ ] Aku memvalidasi data di awal, sebelum dipakai untuk menghitung
- [ ] Pesan exception-ku menjelaskan apa yang salah dan nilai apa yang diharapkan
- [ ] Aku tidak mengubah array input secara diam-diam (urutkan salinan)
- [ ] Aku memberi nama fungsi dan variabel yang menjelaskan isinya, bukan `$a`, `$tmp`, `$data2`
- [ ] Aku menjalankan `php -l` sebelum menjalankan program

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [`02-setup-laravel/`](../02-setup-laravel/README.md).

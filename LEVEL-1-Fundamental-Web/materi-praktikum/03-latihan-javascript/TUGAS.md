# TUGAS — Latihan JavaScript

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:

1. Sepuluh program JavaScript yang jalan di Node.js tanpa error, dari kalkulator sampai error handling.
2. Program yang **tidak crash** saat diberi input aneh (kosong, huruf, angka negatif, pembagian nol).
3. Kebiasaan menebak output dulu, baru menjalankan, lalu menjelaskan kalau tebakanmu meleset.

---

## Daftar Soal

| No | Soal | File yang kamu edit | Estimasi |
| --- | --- | --- | --- |
| 01 | [Kalkulator Sederhana](soal/01-kalkulator-sederhana.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/01-kalkulator-sederhana.js` | 20-30 menit |
| 02 | [Cek Bilangan](soal/02-cek-bilangan.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/02-cek-bilangan.js` | 30-45 menit |
| 03 | [FizzBuzz](soal/03-fizzbuzz.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/03-fizzbuzz.js` | 25-35 menit |
| 04 | [Array Manipulation](soal/04-array-manipulation.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/04-array-manipulation.js` | 45-60 menit |
| 05 | [Todo List CLI](soal/05-todo-list-cli.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/05-todo-list-cli.js` | 60-90 menit |
| 06 | [Object & Destructuring](soal/06-object-destructuring.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/06-object-destructuring.js` | 60-90 menit |
| 07 | [Callback & Higher-Order Function](soal/07-callback-higher-order.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/07-callback-higher-order.js` | 60-90 menit |
| 08 | [Async/Await & Fetch](soal/08-async-await.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/08-async-await.js` | 60-90 menit |
| 09 | [Class & OOP](soal/09-class-oop.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/09-class-oop.js` | 60-90 menit |
| 10 | [Error Handling](soal/10-error-handling.md) | `LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/10-error-handling.js` | 45-60 menit |

Total kira-kira 9-13 jam.

Kolom "File yang kamu edit" menunjuk ke **starter** di `code/`. Starter itu bahan, jangan diedit langsung.

### Di mana menulis kodenya?

Satu aturan untuk semua soal 01-10, sesuai [latihan-saya](../../../latihan-saya/README.md):

1. Buat folder mingguan kalau belum ada, misalnya `latihan-saya/02-javascript/minggu-03/`.
2. Salin starter dari `code/` ke folder itu dengan **nama file yang sama** (contoh:
   `latihan-saya/02-javascript/minggu-03/03-fizzbuzz.js`).
3. Kerjakan `TODO(human)` di salinan itu. Perintah `node` di soal dijalankan terhadap salinanmu.

Sebagian soal (01, 05, 06, 07) bilang "buat file baru" di teksnya. Maksudnya: ketik isinya sendiri, jangan
copy-paste. Tetap mulai dari salinan starter dengan nama file yang sama.

---

## Langkah Pengerjaan (untuk setiap soal)

1. **Baca soal sampai habis**, termasuk contoh output dan edge case yang diminta.
2. **Tutup soalnya.** Tulis langkah dalam bahasa Indonesia biasa (pseudocode) di komentar paling atas
   file. Contoh: "1. ambil angka. 2. kalau bukan angka, tampilkan pesan. 3. ...". Belum boleh ada kode.
3. **Tebak output.** Sebelum menjalankan, tulis di komentar apa yang kamu kira akan tercetak.
4. **Kerjakan dan jalankan.** Isi `TODO` satu per satu. Jalankan `node` setelah setiap `TODO`, jangan
   tunggu semua selesai.
5. **Serang programmu sendiri.** Coba input aneh: kosong, huruf, negatif, nol, angka desimal, array kosong.
6. **Bandingkan dengan expected output di soal.** Kalau beda, cari kenapa sebelum lanjut.

---

## Petunjuk Kalau Macet

### Tingkat 1 — lihat isi variabel

- Taruh `console.log("nama variabel:", variabel)` sebelum baris yang bermasalah. Sering masalahnya
  cuma tipe data: `"5" + 3` hasilnya `"53"`. Cek dengan `console.log(typeof x)`.
- Untuk loop, log nilai `i` dan kondisinya di setiap putaran. Lihat putaran ke berapa hasilnya mulai salah.

### Tingkat 2 — pecah jadi masalah lebih kecil

- FizzBuzz terlalu banyak? Selesaikan dulu "cetak 1 sampai N". Lalu "cetak Fizz kalau kelipatan 3".
  Tambah satu aturan setiap kali.
- `reduce` membingungkan? Tulis versi `for` biasa dulu, lalu ubah ke `reduce`.
- Todo List CLI: buat dulu fungsi `tambah` dan `tampilkan` tanpa `readline`, panggil langsung di file.
  Setelah benar, baru sambungkan ke menu interaktif.

### Tingkat 3 — baca pesan error dengan serius

- Baca baris pertama error dan nomor barisnya. `TypeError: x is not a function` dan
  `ReferenceError: x is not defined` artinya beda.
- Untuk kode async (soal 08): kalau hasilnya `Promise { <pending> }`, kamu lupa `await`. Kalau error
  tidak tertangkap, cek apakah `try/catch` membungkus `await`-nya.

### Tingkat 4 — debugger

```bash
node --inspect-brk LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/04-array-manipulation.js
```

Buka `chrome://inspect` di Chrome, klik "inspect", lalu jalankan baris demi baris (`F10`) sambil melihat
isi variabel. Atau pakai tab **Run and Debug** di VS Code.

### Tingkat 5 — dokumentasi resmi

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide).
- Method array: [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Baca bagian "Return value" dan apakah method itu mengubah array asli.
- `readline`: [Node.js readline docs](https://nodejs.org/api/readline.html).
- Async: [MDN Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

---

## Cara Mengecek Hasil Sendiri

Contoh menjalankan starter dari root repo (untuk salinanmu di `latihan-saya/`, ganti path-nya):

```bash
node LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/01-kalkulator-sederhana.js
node LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/03-fizzbuzz.js 15
node LEVEL-1-Fundamental-Web/materi-praktikum/03-latihan-javascript/code/05-todo-list-cli.js
```

Yang harus terjadi:

- Program selesai tanpa pesan error merah (kecuali soal 10, di mana error memang sengaja ditangkap dan dicetak rapi).
- Output sama dengan "Expected Output" di soal.
- Soal 01: ubah nilai operator jadi `/` dan angka kedua jadi `0`. Harus muncul pesan yang jelas, bukan `Infinity`.
- Soal 03: coba tanpa argumen dan dengan argumen huruf (`node ... abc`). Program harus menangani keduanya.
- Soal 04, 07: setelah semua operasi, cetak array asli. Isinya harus **tidak berubah**.
- Soal 05: coba hapus ID yang tidak ada dan pilih menu yang tidak ada. Program tidak boleh berhenti.
- Soal 08: butuh internet (memanggil JSONPlaceholder). Matikan wifi lalu jalankan lagi. Harus muncul pesan error yang kamu tulis, bukan crash.

Cek sintaks cepat semua file sekaligus:

```bash
node scripts/validate-curriculum.mjs
```

---

## Tentang `contoh/`

Folder ini tidak punya `contoh/`. Pembandingmu adalah expected output di soal dan input aneh yang kamu
coba sendiri. Kalau semua cocok dan tidak ada yang crash, berarti kamu sudah selesai.

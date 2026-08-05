<!-- markdownlint-disable MD024 MD028 -->

# SOAL 03 — FizzBuzz

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menggunakan `for` loop untuk mengulang blok kode sebanyak N kali
- Menulis kondisi bertingkat dengan `if / else if / else`
- Memahami operator modulo (`%`) untuk mendeteksi kelipatan
- Membuat dan mengisi array menggunakan `array.push()`
- Membaca argumen dari command line lewat `process.argv`
- Memahami kenapa **urutan pengecekan** kelipatan itu penting

**Difficulty:** Pemula • **Estimasi:** 25-35 menit

---

## Briefing

FizzBuzz adalah **soal interview paling klasik** di dunia programming. Hampir
setiap programmer pemula pernah mengerjakannya. Aturannya simpel:

- Kelipatan 3 → tulis **"Fizz"**
- Kelipatan 5 → tulis **"Buzz"**
- Kelipatan 15 (kelipatan 3 DAN 5) → tulis **"FizzBuzz"**
- Sisanya → tulis angkanya sendiri

Kamu akan menulis fungsi `fizzBuzz(limit)` yang mengembalikan **array** berisi
hasil dari 1 sampai `limit`. Konsep yang kamu pelajari di sini (loop + kondisi
+ array) adalah fondasi hamper semua program yang akan kamu tulis nanti.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami konsep dan kenapa dipakai
2. **Ketik dari 0** — buka `code/03-fizzbuzz.js`, cari `TODO`, lalu ketik
   sendiri (JANGAN copy-paste dari contoh mana pun)
3. **Verifikasi** — cek hasilmu dengan panduan verifikasi

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir
dan mengetik**, bukan menyalin. Ini skill paling penting untuk programmer.

> Tips: kalau stuck lebih dari 5 menit di satu bagian, **jangan langsung
> lihat jawaban**. Coba pecah masalah jadi lebih kecil dulu: "bagaimana cara
> cek kelipatan 3?" — tulis itu saja, jalankan, baru lanjut ke kelipatan 5.

---

## Bagian A: Function Declaration & Default Parameter

### Penjelasan

Sebuah **fungsi** adalah blok kode yang bisa dipanggil berulang. Di JavaScript
modern, kamu bisa kasih **nilai default** untuk parameter yang tidak diisi.

```javascript
function namaFungsi(param1, param2 = nilaiDefault) {
  // kode di sini
}
```

Untuk FizzBuzz, kita mau fungsi `fizzBuzz(limit = 100)`. Kalau dipanggil tanpa
argumen, `limit` otomatis jadi 100. Kalau dipanggil `fizzBuzz(30)`, `limit`
menjadi 30.

### Wajib Ada di Kode Kamu

- Keyword `function` lalu nama fungsi `fizzBuzz`
- Satu parameter `limit` dengan default `100`
- Tanda kurung `()` setelah nama fungsi
- Kurung kurawal `{}` untuk body fungsi (kosong dulu, diisi di Bagian B dst)

### Cara Mengetik dari 0

1. Buka `code/03-fizzbuzz.js` di VS Code
2. Cari bagian yang ditandai `TODO: fizzBuzz(limit = 100)`
3. Ketik `function fizzBuzz(limit = 100) {`
4. Tutup dengan `}` di akhir body
5. Save, jalankan `node 03-fizzbuzz.js` — harusnya **belum error** dan
   menampilkan `undefined` atau pesan error "fizzBuzz is not defined" (itu
   wajar, fungsinya masih kosong)

### Verifikasi

- [ ] File `code/03-fizzbuzz.js` punya deklarasi `function fizzBuzz(limit = 100)`
- [ ] `node 03-fizzbuzz.js` bisa dijalankan tanpa syntax error
- [ ] Default parameter `100` tertulis di deklarasi fungsi

---

## Bagian B: Loop `for` dari 1 sampai `limit`

### Penjelasan

`for` loop dipakai saat kita tahu **berapa kali** ingin mengulang. Sintaksnya:

```javascript
for (inisialisasi; kondisi; increment) {
  // kode yang diulang
}
```

Untuk FizzBuzz, kita mau loop dari 1 sampai `limit` (inklusif). Artinya:

- **Inisialisasi:** `let i = 1` — mulai dari 1
- **Kondisi:** `i <= limit` — lanjut selama `i` masih kurang atau sama dengan `limit`
- **Increment:** `i++` — tambah `i` sebanyak 1 tiap iterasi

### Wajib Ada di Kode Kamu

- `for` loop di dalam body fungsi `fizzBuzz`
- Variabel counter `i` dimulai dari `1`
- Kondisi `i <= limit` (bukan `i < limit` — supaya `limit` ikut dihitung)
- Increment `i++` di akhir

### Cara Mengetik dari 0

1. Di dalam `function fizzBuzz(limit = 100) {`, tekan Enter untuk baris baru
2. Ketik `for (let i = 1; i <= limit; i++) {`
3. Tekan Enter, tambah `}` untuk menutup loop
4. Save dan jalankan — belum ada output, tapi loop sudah jalan (uji dengan
   tambah `console.log(i)` di dalam loop **sementara** lalu hapus lagi)

### Verifikasi

- [ ] Sintaks `for` lengkap: `for (let i = 1; i <= limit; i++)`
- [ ] Loop menutup dengan `}`
- [ ] Counter dimulai dari `1` (bukan `0` — ini soal tentang angka 1..N)
- [ ] Kondisi pakai `<=` (bukan `<`) supaya `limit` sendiri ikut dihitung

---

## Bagian C: Array Kosong & `array.push()`

### Penjelasan

**Array** adalah variabel yang bisa menyimpan banyak nilai dalam satu tempat.
Untuk FizzBuzz, kita mau kumpulkan semua hasil (angka atau string) ke dalam
satu array, lalu return array itu.

`array.push(item)` adalah method untuk **menambahkan item baru ke akhir array**.
Push selalu menambah di posisi terakhir.

```javascript
const hasil = [];          // array kosong
hasil.push("pertama");     // hasil = ["pertama"]
hasil.push(2);             // hasil = ["pertama", 2]
```

### Wajib Ada di Kode Kamu

- Deklarasi array kosong di **awal** fungsi, sebelum loop
- Biasanya namanya `hasil` atau `result`
- Pakai `const` (karena referensinya tetap, isinya boleh berubah)
- Minimal satu `hasil.push(...)` di dalam loop (untuk di Bagian D)

### Cara Mengetik dari 0

1. Di dalam fungsi, **sebelum** `for` loop, tambah baris:
   `const hasil = [];`
2. Di dalam `for` loop (antara `{` dan `}` loop), tambah:
   `hasil.push(i);`
3. Setelah loop, tambah: `return hasil;`
4. Jalankan `node 03-fizzbuzz.js` — output harus berupa array angka 1..30:
   `[ 1, 2, 3, ..., 30 ]`

### Verifikasi

- [ ] `const hasil = [];` ada **sebelum** loop
- [ ] `return hasil;` ada **setelah** loop
- [ ] `node 03-fizzbuzz.js` menampilkan array berisi angka 1 sampai 30
- [ ] Array benar-benar 30 elemen, bukan lebih/kurang

> Tips: kalau outputmu `[ 31, 32, ... ]` artinya loop mulai dari 0 atau
> kondisinya salah. Cek ulang `let i = 1` dan `i <= limit`.

---

## Bagian D: Kondisi `if / else if / else` untuk FizzBuzz

### Penjelasan

Sekarang bagian terpenting: **logika FizzBuzz**. Untuk setiap angka `i`,
kita harus cek:

- Apakah kelipatan 15? → `"FizzBuzz"`
- Apakah kelipatan 3? → `"Fizz"`
- Apakah kelipatan 5? → `"Buzz"`
- Sisanya → angka itu sendiri (sebagai string)

`if / else if / else` dibaca **dari atas ke bawah**. Begitu ada yang cocok,
yang di bawahnya di-skip.

```javascript
if (kondisi1) {
  // jalan kalau kondisi1 true
} else if (kondisi2) {
  // jalan kalau kondisi1 false, kondisi2 true
} else {
  // jalan kalau semua kondisi di atas false
}
```

### Wajib Ada di Kode Kamu

- Tiga percabangan: `if` untuk `% 15`, `else if` untuk `% 3`, `else if` untuk `% 5`, `else` untuk sisanya
- `hasil.push("FizzBuzz")` untuk kelipatan 15
- `hasil.push("Fizz")` untuk kelipatan 3
- `hasil.push("Buzz")` untuk kelipatan 5
- `hasil.push(String(i))` untuk sisanya (pakai `String(i)` bukan `i`!)

### Cara Mengetik dari 0

1. Di dalam `for` loop, **ganti** `hasil.push(i);` dengan blok `if / else if / else`
2. Ketik urutan dari atas ke bawah: cek 15 dulu, baru 3, baru 5, baru else
3. Untuk push angka biasa, **jangan lupa** `String(i)` — tanpa ini, array
   akan campur antara number dan string
4. Save, jalankan, cek output di terminal

### Verifikasi

- [ ] Urutan cek: `% 15` → `% 3` → `% 5` → `else` (PENTING!)
- [ ] Angka 15 di output adalah string `"FizzBuzz"` (bukan `"Fizz"` atau `"Buzz"`)
- [ ] Angka 3, 6, 9, 12 adalah `"Fizz"`
- [ ] Angka 5, 10, 20, 25 adalah `"Buzz"`
- [ ] Angka lain (1, 2, 4, 7, 8, 11, dst) adalah string angkanya sendiri
- [ ] Semua elemen array adalah string, tidak ada number

> Kenapa `String(i)` bukan `i`? Karena kita mau semua elemen array **tipe
> data-nya konsisten** (semua string). Kalau campur number dan string, output
> jadi agak aneh: `[1, 2, 'Fizz', 4, 'Buzz', ...]`. Bandingkan dengan versi
> tanpa `String(i)`: `[1, 2, 'Fizz', 4, 'Buzz', ...]` — sebenarnya default
> Node.js console.log akan tetap menampilkan number tanpa quote, jadi
> konsisten string lebih rapi.

---

## Bagian E: Urutan Pengecekan (Kenapa `% 15` Dulu?)

### Penjelasan

Ini **jebakan paling umum** di FizzBuzz. Kenapa cek `% 15` dulu, bukan `% 3`?

Karena `15` adalah kelipatan `3` (15 = 3 × 5). Kalau kamu cek `% 3` duluan:

```javascript
if (i % 3 === 0) {       // 15 % 3 = 0 → MASUK SINI
  hasil.push("Fizz");    // jadi "Fizz", bukan "FizzBuzz"!
} else if (i % 5 === 0) {
  hasil.push("Buzz");
} else if (i % 15 === 0) {  // kode ini tidak akan pernah jalan!
  hasil.push("FizzBuzz");
}
```

Logikanya: kalau kamu ketemu "Fizz" duluan, program **tidak akan pernah
sampai** ke cek `% 15`. Jadi kelipatan 15 akan salah jadi "Fizz" atau "Buzz".

**Solusi:** cek kondisi **paling spesifik duluan**. `% 15` lebih spesifik
daripada `% 3` atau `% 5`, jadi cek `% 15` dulu.

### Wajib Ada di Kode Kamu

- `i % 15 === 0` di cabang `if` **pertama**
- `i % 3 === 0` di `else if` **kedua**
- `i % 5 === 0` di `else if` **ketiga**
- Sisanya di `else`

### Cara Mengetik dari 0

1. Cek lagi urutan di kode kamu — pastikan `% 15` di paling atas
2. Kalau kamu tidak yakin, **uji manual**: angka 15 harus jadi "FizzBuzz"
3. Save dan jalankan, lihat posisi 15, 30, 45, 60 di output

### Verifikasi

- [ ] Di output, angka 15, 30, 45, 60 adalah `"FizzBuzz"`
- [ ] Di output, angka 30, 60, 90, dst bukan `"Fizz"` atau `"Buzz"`
- [ ] Kalau kamu balik urutannya (cek `% 3` dulu), outputnya salah — kamu
      akan tahu kalau lihat angka 15 jadi `"Fizz"`

---

## Bagian F: Test dengan Limit Berbeda

### Penjelasan

Sekarang fungsi `fizzBuzz(limit)` sudah jadi. Saatnya **uji dengan berbagai
limit** untuk memastikan logikamu benar. Jangan cuma test `limit = 30` — coba
juga `1`, `5`, `15`, `16`, `100`.

Di file `code/03-fizzbuzz.js` ada baris `const hasil = fizzBuzz(30);`. Coba
ubah jadi angka lain, lalu jalankan ulang.

### Wajib Ada di Kode Kamu

- Pemanggilan `fizzBuzz(...)` di bagian TEST
- Output yang ditampilkan lewat `console.log(hasil);`
- Uji minimal 3 limit berbeda

### Cara Mengetik dari 0

1. Ubah `const hasil = fizzBuzz(30);` jadi `const hasil = fizzBuzz(15);`
2. Jalankan, cek: `1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz',
   11, 'Fizz', 13, 14, 'FizzBuzz'`
3. Coba `fizzBuzz(5)` → `1, 2, 'Fizz', 4, 'Buzz'`
4. Coba `fizzBuzz(100)` → 100 elemen, banyak "Fizz" dan "Buzz"

### Verifikasi

- [ ] `fizzBuzz(15)` → 15 elemen, posisi 15 = `"FizzBuzz"`
- [ ] `fizzBuzz(5)` → `['Fizz'` di posisi 3, `'Buzz'` di posisi 5
- [ ] `fizzBuzz(1)` → `[ '1' ]` (satu elemen string "1")
- [ ] `fizzBuzz(100)` → 100 elemen, total 6 "FizzBuzz" (di 15, 30, 45, 60, 75, 90)
      dan terakhir "Buzz" di posisi 100

---

## Bagian G (Bonus): Baca Argument dari Command Line

### Penjelasan

Saat kamu menjalankan `node 03-fizzbuzz.js 50`, ada cara untuk baca `"50"`
itu di dalam program: pakai `process.argv`.

`process.argv` adalah array berisi argumen command line:

- `process.argv[0]` → path ke `node`
- `process.argv[1]` → path ke file JS yang dijalankan
- `process.argv[2]` → argument pertama yang kamu ketik
- `process.argv[3]` → argument kedua, dst

Jadi `node 03-fizzbuzz.js 50` → `process.argv[2]` = `"50"` (string, bukan
number!).

### Wajib Ada di Kode Kamu

- Baca `process.argv[2]` (optional, bisa `undefined` kalau tidak ada argumen)
- Kalau ada, pakai itu sebagai `limit`; kalau tidak, default `100`
- Tangani kalau argumen bukan angka (misal `node 03-fizzbuzz.js abc`) — bisa
  pakai `isNaN()` atau tampilkan error

### Cara Mengetik dari 0

1. Tambah logika di bagian TEST (bukan di dalam fungsi `fizzBuzz`):
   `const inputLimit = process.argv[2];`
2. Tambah validasi: kalau `inputLimit` ada dan bukan `NaN`, pakai itu;
   kalau tidak, pakai `100`
3. Jalankan:
   - `node 03-fizzbuzz.js` → default 100
   - `node 03-fizzbuzz.js 50` → 50 elemen
   - `node 03-fizzbuzz.js abc` → error message atau fallback ke 100

### Verifikasi

- [ ] `node 03-fizzbuzz.js` jalan tanpa error (default 100)
- [ ] `node 03-fizzbuzz.js 50` menghasilkan 50 elemen
- [ ] `node 03-fizzbuzz.js abc` tidak crash (error message atau default)
- [ ] Argumen selalu dikonversi ke Number: `Number(process.argv[2])`

> Tips: `process.argv[2]` selalu **string**. Kalau mau dipakai sebagai
> number, harus konversi: `parseInt(process.argv[2])` atau
> `Number(process.argv[2])`.

---

## Bagian H (Bonus): Versi String Biasa (Tanpa Array)

### Penjelasan

Selain return array, FizzBuzz juga bisa return **string** biasa dengan baris
baru. Konsepnya sama: loop, cek kondisi, tapi kali ini tambahkan ke string,
bukan push ke array.

Di file sudah ada skeleton:

```javascript
function fizzBuzzString(limit = 100) {
  let output = "";
  for (let i = 1; i <= limit; i++) {
    // TODO: tambahkan ke output
  }
  return output;
}
```

### Wajib Ada di Kode Kamu

- `let output = "";` di awal (string kosong)
- Di dalam loop, **tambah** ke `output` dengan operator `+=`
- Untuk angka biasa, langsung `output += i;` (otomatis jadi string)
- Tambah `output += "\n";` di akhir tiap iterasi untuk baris baru
- `return output;` di akhir

### Cara Mengetik dari 0

1. Uncomment skeleton `function fizzBuzzString` di file
2. Isi body loop dengan logika FizzBuzz yang sama persis seperti di Bagian D
3. Ganti `hasil.push(...)` jadi `output += ...` (atau `output += ... + "\n"`)
4. Test: `console.log(fizzBuzzString(15));`

### Verifikasi

- [ ] `fizzBuzzString(15)` return string multi-baris
- [ ] Tiap elemen ada di baris terpisah
- [ ] Logikanya sama persis dengan versi array
- [ ] Bonus: `fizzBuzzString(15).split("\n")` hasilnya sama dengan
      `fizzBuzz(15)` (kecuali tipe data number vs string)

---

## Ringkasan

Konsep yang sudah kamu pelajari di soal ini:

- **Function declaration** dengan `function namaFungsi() { ... }`
- **Default parameter** untuk nilai fallback
- **For loop** untuk pengulangan yang jumlahnya sudah diketahui
- **Array kosong + push** untuk kumpulan data
- **If / else if / else** untuk logika bercabang
- **Modulo `%`** untuk deteksi kelipatan
- **Urutan pengecekan** — yang paling spesifik duluan
- **`String(i)`** untuk konversi number ke string
- **`process.argv`** untuk baca argumen dari terminal

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 04, cek semua ini:

- [ ] `node 03-fizzbuzz.js` jalan tanpa error
- [ ] Output `fizzBuzz(15)` = `[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz',
      'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']`
- [ ] Output `fizzBuzz(30)` = `[1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz',
      'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz', 16, 17, 'Fizz', 19, 'Buzz',
      'Fizz', 22, 23, 'Fizz', 'Buzz', 26, 'Fizz', 28, 29, 'FizzBuzz']`
- [ ] **Posisi 15, 30, 45, 60, 75, 90 di output adalah `"FizzBuzz"`** (bukan
      `"Fizz"` atau `"Buzz"`)
- [ ] **Urutan cek di kode**: `% 15` di paling atas (cek pakai Ctrl+F)
- [ ] **Semua elemen array adalah string** (tidak ada number tanpa quote)
- [ ] Default parameter `100` tertulis di deklarasi fungsi
- [ ] Bonus: `node 03-fizzbuzz.js 50` jalan dan output 50 elemen
- [ ] Bonus: versi `fizzBuzzString` juga bisa dipanggil

---

## Cara Submit

1. Buka `code/03-fizzbuzz.js` di VS Code
2. Isi semua bagian yang ditandai `TODO` dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Jalankan: `node 03-fizzbuzz.js` — cek outputnya
5. Coba `node 03-fizzbuzz.js 20` — cek output 20 elemen
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/04-array-manipulation.md`

---

## Catatan untuk Pemula

> **FizzBuzz itu pondasi**. Mungkin terlihat sepele, tapi kombinasi loop +
> kondisi + array yang kamu tulis di sini akan muncul di 90% program
> berikutnya. Pahami logikanya, bukan hafalin kodenya.

> **Modulo (`%`) itu sisa bagi.** `15 % 3 = 0` karena 15 habis dibagi 3.
> Bukan "berapa kali 3 masuk ke 15", tapi "sisanya berapa". Kalau sisa = 0,
> berarti habis dibagi.

> **Jangan takut error.** Kalau `node 03-fizzbuzz.js` menampilkan
> `ReferenceError: fizzBuzz is not defined`, artinya kamu belum deklarasi
> fungsinya. Cek lagi apakah keyword `function` dan nama `fizzBuzz` benar.

> **Urutan `if / else if` itu krusial.** Selalu cek kondisi **paling spesifik
> duluan**. FizzBuzz = `% 15` dulu. Nanti di soal lain: kalau ada
> `if (a > 0)` dan `if (a > 100)`, cek yang `> 100` dulu.

> **Konsistensi tipe data itu penting.** Pakai `String(i)` membuat semua
> elemen array jadi string. Bisa juga tanpa `String(i)` (campur), tapi
> konsisten string lebih mudah di-debug dan diolah di soal selanjutnya.

> **Interview tip:** kalau ditanya FizzBuzz di interview, yang diuji bukan
> "bisa nulis kodenya", tapi **kenapa** kamu pilih urutan itu, **bagaimana**
> kalau limitnya 0 atau negatif, dan **gimana** kalau kata-katanya diganti
> (misal "Foo" / "Bar" / "FooBar"). Pahami konsep, bukan hafal.

<!-- markdownlint-enable MD024 MD028 -->

<!-- markdownlint-disable MD024 MD028 -->

# SOAL 02 — Cek Bilangan (Ganjil/Genap, Positif/Negatif, Prima)

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menggunakan `if`, `else if`, dan `else` untuk percabangan logika
- Memahami operator perbandingan (`>`, `<`, `===`, `!==`)
- Memahami operator modulus (`%`) untuk cek sisa bagi
- Menulis loop `for` sederhana untuk iterasi angka
- Mengenal `Math.sqrt()` dan `Math.floor()` dari objek `Math`
- Membuat function dengan `return` value

**Difficulty:** Pemula-Menengah • **Estimasi:** 30-45 menit

---

## Briefing

Kamu akan membuat **program cek bilangan** yang bisa menjawab tiga pertanyaan
tentang sebuah angka:

1. Apakah angka itu **ganjil atau genap**?
2. Apakah angka itu **positif, negatif, atau nol**?
3. Apakah angka itu **prima atau bukan**?

Program ini pondasi penting di pemrograman: **menerima input, memproses dengan
logika, mengembalikan output**. Setelah paham pola ini, kamu bisa bikin
klasifikasi apa saja (nilai huruf, kategori usia, tier pengguna, dst).

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami konsep dan kenapa dipakai
2. **Ketik dari 0** — buka `code/02-cek-bilangan.js`, cari `TODO(human)`,
   lalu ketik sendiri (JANGAN copy-paste)
3. **Verifikasi** — cek hasilmu dengan panduan verifikasi

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir
sebelum mengetik** dan **membiasakan diri dengan sintaks JavaScript**. Ini skill
paling penting sebelum kamu bisa bikin program sendiri.

---

## Bagian A: Fungsi `cekGanjilGenap(n)`

### Penjelasan

**Ganjil/genap** ditentukan oleh **sisa bagi 2**. Di JavaScript, kita pakai
operator modulus (`%`) untuk dapetin sisa bagi.

Cara baca modulus: `7 % 2` = "7 dibagi 2, sisanya berapa?" → 1.
Jadi kalau `n % 2 === 0` artinya habis dibagi 2 → **genap**.
Kalau `n % 2 !== 0` artinya ada sisa → **ganjil**.

Ini pakai `if/else` — bentuk percabangan paling dasar. Kalau kondisi `if` benar,
jalankan blok-nya. Kalau salah, jalankan blok `else`.

### Wajib Ada di Kode Kamu

- Deklarasi function dengan `function cekGanjilGenap(n) { ... }`
- Percabangan `if` untuk cek modulus sama dengan 0
- `return` string `"Genap"` untuk kasus genap
- `return` string `"Ganjil"` untuk kasus ganjil
- Tutup function dengan `}`

### Cara Mengetik dari 0

1. Buka `code/02-cek-bilangan.js` di VS Code
2. Cari komentar `TODO 1: cekGanjilGenap(n)`
3. **Pikirkan dulu**: kalau `n % 2 === 0` itu genap, apa yang terjadi kalau
   `n % 2 !== 0`? (Jawabannya: ganjil)
4. Ketik `function cekGanjilGenap(n) {`
5. Ketik `if (n % 2 === 0) {`
6. Di dalam blok, ketik `return "Genap";`
7. Tutup `}` untuk if, lalu ketik `else {`
8. Di dalam else, ketik `return "Ganjil";`
9. Tutup `}` untuk else, lalu `}` untuk function
10. Save (Cmd+S / Ctrl+S)

### Yang Terjadi di Kode

Saat function dipanggil dengan sebuah angka:

- JavaScript hitung `n % 2` dulu
- Bandingkan hasilnya dengan `0`
- Kalau hasilnya `true` (sama dengan 0) → function balikin `"Genap"`
- Kalau hasilnya `false` (tidak sama dengan 0) → function balikin `"Ganjil"`

> **Tips**: `===` artinya "sama dengan dan tipe data sama". Untuk angka,
> `===` dan `==` hasilnya sama, tapi **standar JavaScript modern pakai
> `===`**. Biasakan dari awal.

### Verifikasi

- [ ] Function bisa dipanggil tanpa error
- [ ] `cekGanjilGenap(4)` mengembalikan `"Genap"`
- [ ] `cekGanjilGenap(7)` mengembalikan `"Ganjil"`
- [ ] `cekGanjilGenap(0)` mengembalikan `"Genap"` (0 habis dibagi 2)
- [ ] `cekGanjilGenap(-3)` mengembalikan `"Ganjil"` (negatif juga bisa dicek)

---

## Bagian B: Fungsi `cekPositifNegatif(n)`

### Penjelasan

Sekarang kamu cek **tanda** sebuah angka. Di matematika, bilangan bisa positif
(lebih dari 0), negatif (kurang dari 0), atau nol (0 itu sendiri).

Berbeda dari ganjil/genap yang cuma 2 kemungkinan, ini ada **3 kemungkinan**.
Jadi kamu butuh **`if` → `else if` → `else`** (percabangan berantai).

Urutan cek itu penting. Kamu cek dari yang **paling spesifik** dulu:

- `n === 0` → paling spesifik (cuma satu angka)
- `n > 0` → positif
- sisanya → negatif

Kalau kamu cek `n > 0` duluan, angka 0 jatuh ke `else` (dianggap negatif), dan
itu salah.

### Wajib Ada di Kode Kamu

- Deklarasi function `cekPositifNegatif(n)`
- Percabangan `if (n === 0)` untuk kasus nol
- `else if (n > 0)` untuk positif
- `else` terakhir untuk negatif
- `return` string `"Nol"`, `"Positif"`, dan `"Negatif"` sesuai kasus

### Cara Mengetik dari 0

1. Cari komentar `TODO 2: cekPositifNegatif(n)`
2. **Pikirkan dulu urutan**: mana yang harus dicek duluan? (Hint: yang paling
   spesifik)
3. Ketik `function cekPositifNegatif(n) {`
4. Ketik `if (n === 0) { return "Nol"; }`
5. Di bawahnya, ketik `else if (n > 0) { return "Positif"; }`
6. Di bawahnya, ketik `else { return "Negatif"; }`
7. Tutup `}` untuk function
8. Save dan coba

### Yang Terjadi di Kode

JavaScript cek kondisi dari atas ke bawah:

- Cek pertama: `n === 0` → kalau ya, return `"Nol"`, selesai
- Kalau bukan, cek `n > 0` → kalau ya, return `"Positif"`, selesai
- Kalau dua-duanya bukan, masuk `else` → return `"Negatif"`

Begitu ada `return` yang jalan, function **langsung berhenti**. Baris di
bawahnya tidak dieksekusi.

### Verifikasi

- [ ] `cekPositifNegatif(5)` mengembalikan `"Positif"`
- [ ] `cekPositifNegatif(-5)` mengembalikan `"Negatif"`
- [ ] `cekPositifNegatif(0)` mengembalikan `"Nol"`
- [ ] `cekPositifNegatif(0.5)` mengembalikan `"Positif"` (desimal positif)
- [ ] `cekPositifNegatif(-0.5)` mengembalikan `"Negatif"`

---

## Bagian C: Fungsi `cekPrima(n)`

### Penjelasan

**Bilangan prima** adalah bilangan yang **hanya bisa dibagi oleh 1 dan dirinya
sendiri**. Contoh: 2, 3, 5, 7, 11, 13, 17, 19, 23.

Aturan main untuk cek prima:

- Angka **kurang dari 2** (yaitu 0 dan 1) **bukan prima**
- Mulai cek pembagi dari 2
- Cek sampai **akar kuadrat** dari `n` (nggak perlu sampai `n - 1`)

> **Kenapa sampai akar kuadrat?** Karena kalau `n = a × b` dan `a > √n`, maka
> `b < √n`. Jadi kalau kita udah cek sampai √n dan nggak ketemu pembagi, berarti
> nggak ada sama sekali.

Untuk dapetin akar kuadrat, pakai `Math.sqrt(n)`. Hasilnya bisa desimal
(misal `Math.sqrt(17)` = `4.123...`), jadi kita bulatkan ke bawah pakai
`Math.floor()`.

### Wajib Ada di Kode Kamu

- Deklarasi function `cekPrima(n)`
- Cek khusus di awal: kalau `n < 2` → langsung `return false`
- Hitung `Math.floor(Math.sqrt(n))` dan simpan di variabel
- Loop `for` dari 2 sampai batas tersebut
- Di dalam loop, cek `n % i === 0` → kalau ya, `return false`
- Setelah loop selesai, `return true`

### Cara Mengetik dari 0

1. Cari komentar `TODO 3: cekPrima(n)`
2. **Pikirkan dulu**: kenapa `n < 2` langsung false? (Karena 0 dan 1 bukan
   prima)
3. Ketik `function cekPrima(n) {`
4. Ketik `if (n < 2) { return false; }` (paling atas, sebelum loop)
5. Ketik `const batas = Math.floor(Math.sqrt(n));`
6. Ketik `for (let i = 2; i <= batas; i++) {`
7. Di dalam loop, ketik `if (n % i === 0) { return false; }`
8. Tutup `}` untuk if, lalu `}` untuk for
9. Setelah loop, ketik `return true;`
10. Tutup `}` untuk function
11. Save dan coba

### Yang Terjadi di Kode

Misal kamu panggil `cekPrima(17)`:

1. `n < 2` → 17 < 2 salah, lanjut
2. `batas = Math.floor(Math.sqrt(17))` = `Math.floor(4.123)` = `4`
3. Loop i dari 2 sampai 4
4. `17 % 2 = 1` → bukan 0, lanjut
5. `17 % 3 = 2` → bukan 0, lanjut
6. `17 % 4 = 1` → bukan 0, lanjut
7. Loop selesai
8. `return true` → 17 adalah prima

Misal `cekPrima(15)`:

1. `n < 2` → salah, lanjut
2. `batas = Math.floor(Math.sqrt(15))` = `Math.floor(3.87)` = `3`
3. Loop i dari 2 sampai 3
4. `15 % 2 = 1` → lanjut
5. `15 % 3 = 0` → **return false** → 15 bukan prima

### Verifikasi

- [ ] `cekPrima(2)` mengembalikan `true` (prima terkecil)
- [ ] `cekPrima(7)` mengembalikan `true`
- [ ] `cekPrima(11)` mengembalikan `true`
- [ ] `cekPrima(17)` mengembalikan `true`
- [ ] `cekPrima(1)` mengembalikan `false` (1 bukan prima)
- [ ] `cekPrima(0)` mengembalikan `false` (0 bukan prima)
- [ ] `cekPrima(15)` mengembalikan `false` (bisa dibagi 3 dan 5)
- [ ] `cekPrima(25)` mengembalikan `false` (bisa dibagi 5)

---

## Bagian D: Panggil Semua Fungsi (Bagian TEST)

### Penjelasan

Di bagian bawah file, ada blok `TEST` yang sudah disiapkan. Tugas kamu adalah
**memanggil ketiga function** yang sudah kamu buat, lalu tampilkan hasilnya
dengan `console.log()`.

Di JavaScript, function yang sudah kamu definisikan bisa **dipanggil**
(invoke) dengan cara tulis nama function lalu tambah `()` dan argumen di
dalamnya. Contoh: `cekGanjilGenap(17)`.

Template literal (backtick) bikin kita bisa **sisipkan variabel atau hasil
function** ke dalam string pakai `${...}`. Lebih praktis daripada pakai `+`
untuk gabung string.

### Wajib Ada di Kode Kamu

- Pemanggilan `cekGanjilGenap(angka)` di dalam template literal
- Pemanggilan `cekPositifNegatif(angka)` di dalam template literal
- Pemanggilan `cekPrima(angka)` di dalam template literal
- Hilangkan komentar `/* panggil fungsi */` dan ganti dengan kode kamu

### Cara Mengetik dari 0

1. Lihat blok `TEST` di bagian bawah file
2. Cari baris `console.log(\`Ganjil/Genap: ${/* panggil fungsi */}\`);`
3. **Hapus** komentar `/* panggil fungsi */` dan ganti dengan `cekGanjilGenap(angka)`
4. Ulangi untuk baris `Positif/Negatif` dan `Prima`
5. Save, lalu jalanin file-nya di terminal: `node code/02-cek-bilangan.js`

### Yang Terjadi di Kode

Saat kamu jalanin `node 02-cek-bilangan.js`:

1. JavaScript baca dari atas ke bawah
2. Definisi function dicatat (tapi belum jalan)
3. Variabel `angka = 17` disimpan
4. `console.log` pertama jalan → cetak "Angka: 17"
5. Function `cekGanjilGenap(17)` dipanggil → balikin "Ganjil" → dicetak
6. Function `cekPositifNegatif(17)` dipanggil → balikin "Positif" → dicetak
7. Function `cekPrima(17)` dipanggil → balikin `true` → dicetak

### Verifikasi

- [ ] Terminal menampilkan output seperti di blok `CONTOH OUTPUT` di file
- [ ] Tidak ada `undefined` atau `NaN` di output
- [ ] Tidak ada error merah di terminal
- [ ] `angka = 17` → output: `Ganjil/Genap: Ganjil`, `Positif/Negatif: Positif`, `Prima: true`
- [ ] Coba ganti `angka = 10` → output: `Genap`, `Positif`, `false`

---

## Bagian E (Bonus): Loop untuk Cek Banyak Angka

### Penjelasan

Bagian ini bonus — bisa diskip kalau waktu mepet. Tapi **sangat disarankan**
karena ini cara kamu lihat ketiga function jalan sekaligus untuk banyak kasus.

Konsepnya: pakai `for` loop dari `-1` sampai `20`, dan untuk setiap angka,
panggil ketiga function lalu cetak hasilnya. Format string-nya bisa kamu
desain sendiri.

Ini juga latihan bagus buat **format string** dengan template literal dan
**menggabungkan banyak data** dalam satu baris output.

### Wajib Ada di Kode Kamu

- Loop `for` dari `-1` sampai `20` (inclusive)
- Di dalam loop, panggil `cekGanjilGenap(i)`, `cekPositifNegatif(i)`,
  `cekPrima(i)`
- Tampilkan hasil untuk tiap angka dengan `console.log`
- Format output mudah dibaca (bebas, yang penting jelas)

### Cara Mengetik dari 0

1. Cari komentar `BONUS: TEST BERBAGAI ANGKA` di bawah file
2. **Pikirkan dulu**: range loop `for` dari `-1` sampai `20`. Berapa
   kondisinya? (Hint: `i <= 20`)
3. Ketik `for (let i = -1; i <= 20; i++) {`
4. Di dalam loop, ketik `console.log` yang menampilkan nomor dan hasil
   ketiga function
5. Contoh format:
   `console.log(\`${i}: ${cekGanjilGenap(i)} | ${cekPositifNegatif(i)} | Prima: ${cekPrima(i)}\`);`
6. Tutup `}` untuk loop
7. Save dan jalanin ulang

### Yang Terjadi di Kode

Loop jalan 22 kali (dari -1 sampai 20):

- Iterasi 1: `i = -1` → cek `-1` di semua function
- Iterasi 2: `i = 0` → cek `0`
- Iterasi 3: `i = 1` → cek `1`
- ...
- Iterasi 22: `i = 20` → cek `20`

Tiap iterasi cetak satu baris output. Setelah loop selesai, program selesai.

### Verifikasi

- [ ] Output menampilkan 22 baris (dari -1 sampai 20)
- [ ] `-1` muncul sebagai `Ganjil | Negatif | Prima: false`
- [ ] `0` muncul sebagai `Genap | Nol | Prima: false`
- [ ] `2` muncul sebagai `Genap | Positif | Prima: true`
- [ ] `15` muncul sebagai `Ganjil | Positif | Prima: false`
- [ ] `20` muncul sebagai `Genap | Positif | Prima: false`

---

## Ringkasan

- **Modulus (`%`)** = sisa bagi. `7 % 2 = 1` karena 7 dibagi 2 sisanya 1
- **Ganjil/genap** ditentukan `n % 2`. `0` = genap, `1` = ganjil
- **Positif/negatif/nol** dicek dengan `>`, `<`, `===` dalam urutan paling
  spesifik dulu
- **Prima** = cuma bisa dibagi 1 dan dirinya sendiri. `0` dan `1` bukan prima
- **Cek prima** sampai `Math.sqrt(n)` saja, nggak perlu sampai `n - 1`
- **`Math.floor()`** membulatkan desimal ke bawah
- **Function dipanggil** dengan tulis nama + `(argumen)`
- **Template literal** (`` ` ``) pakai `${...}` untuk sisipkan variabel ke
  string
- **Loop `for`** dipakai untuk iterasi berkali-kali dengan kode yang sama

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 03, cek semua ini:

- [ ] **Tiga function** sudah dibuat dan tidak ada yang error
- [ ] **`cekGanjilGenap`** return string `"Ganjil"` atau `"Genap"` (bukan number)
- [ ] **`cekPositifNegatif`** return string `"Positif"`, `"Negatif"`, atau `"Nol"`
- [ ] **`cekPrima`** return boolean `true` atau `false`
- [ ] **`cekPrima(0)` dan `cekPrima(1)`** keduanya return `false`
- [ ] **Blok TEST** sudah memanggil ketiga function (bukan masih komentar)
- [ ] **`node 02-cek-bilangan.js`** jalan tanpa error
- [ ] **Output** sesuai dengan contoh di file untuk `angka = 17`
- [ ] **Coba angka lain**: 0, 1, 2, 7, 15, 100, -5 → semua output masuk akal
- [ ] **Bonus (kalau sempat)**: loop dari -1 sampai 20 menampilkan 22 baris

---

## Cara Submit

1. Buka `code/02-cek-bilangan.js` di VS Code
2. Isi semua `TODO(human)` (Bagian A, B, C) dengan kodemu sendiri
3. Ganti `/* panggil fungsi */` di blok TEST dengan pemanggilan function
   (Bagian D)
4. (Bonus) Isi bagian loop angka 1-20 (Bagian E)
5. Save (Cmd+S / Ctrl+S)
6. Buka terminal di folder `code/`, jalanin: `node 02-cek-bilangan.js`
7. Cek output sesuai dengan verifikasi
8. Kalau PASS, lanjut ke `soal/03-kalkulator-sederhana.md`

---

## Catatan untuk Pemula

> **Modulus (`%`) bukan persentase.** Di JavaScript, `%` itu **sisa bagi**.
> Bahasa Inggris: "remainder". `10 % 3 = 1` karena 10 = 3 × 3 + **1**.

> **Urutan `if` penting.** Kalau kamu cek `n > 0` dulu sebelum `n === 0`,
> angka 0 bakal jatuh ke `else` dan di anggap negatif. Selalu cek yang
> **paling spesifik** dulu.

> **Loop `for` itu 3 bagian: `for (awal; kondisi; langkah)`**.
> - `awal`: dijalankan sekali di awal (biasanya deklarasi variabel counter)
> - `kondisi`: dicek tiap iterasi. Kalau `true`, loop jalan
> - `langkah`: dijalankan tiap akhir iterasi (biasanya increment `i++`)

> **Kapan loop berhenti?** Kalau `kondisi` jadi `false`. Misalnya kalau
> `i <= 20` dan `i` jadi 21, loop berhenti.

> **Function yang return harus dipanggil untuk ambil nilainya.** Kalau kamu
> cuma tulis `cekGanjilGenap(17)` tanpa `console.log` atau simpan ke
> variabel, hasilnya **hilang** (di-return tapi tidak dipakai).

> **Math.sqrt() bisa desimal.** `Math.sqrt(17)` = `4.123...`. Karena loop
> butuh bilangan bulat, kamu harus bungkus dengan `Math.floor()` supaya
> loop kamu rapi dari 2 sampai 4 (bukan 4.123).

<!-- markdownlint-enable MD024 MD028 -->

<!-- markdownlint-disable MD024 MD028 -->

# SOAL 07 — Callback & Higher-Order Functions

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Menulis **arrow function** dalam berbagai bentuk: tanpa kurung, single-line implicit return, multi-line explicit return, dan multi-parameter
- Memahami **first-class function**: fungsi diperlakukan seperti nilai lain (bisa disimpan di variabel, dikirim sebagai argumen, dikembalikan dari fungsi lain)
- Membuat dan menggunakan **callback function** (anonymous, inline, named) sebagai argumen fungsi lain
- Menggunakan **array higher-order methods**: `forEach`, `map`, `filter`, `find`, `reduce`, `some`, `every`
- Melakukan **method chaining** untuk memproses data secara berurutan tanpa mengubah array asli
- Memahami konsep **closure**: fungsi dalam yang "mengingat" variabel dari scope fungsi luarnya
- Mengimplementasikan **higher-order function versi sendiri** (`myMap`, `myFilter`, `myReduce`) untuk memahami cara kerja internalnya
- Menerapkan semua konsep di atas untuk **memproses data mahasiswa** (total nilai, IPK tertinggi, group by grade, sort nama)

**Topik:** arrow function, callback, higher-order function, `Array.prototype` methods, method chaining, closure, first-class function

**Referensi utama:**

- [MDN: Arrow function expressions](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN: Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [MDN: Array.prototype.map](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.filter](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.reduce](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [MDN: Closures](https://developer.mozilla.org/id/docs/Web/JavaScript/Closures)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Callback adalah fondasi dari hampir semua **async code** dan **array methods** di JavaScript. Mulai dari `setTimeout`, `fetch`, event listener di browser, sampai `.map()` dan `.filter()` — semuanya bekerja dengan pola "kirim fungsi sebagai argumen, fungsi itu dipanggil di waktu/untuk data tertentu".

Latihan ini mengajak kamu mengolah data **mahasiswa** (array of object berisi `nama`, `nilai`, `jurusan`) menggunakan higher-order functions. Kamu akan belajar menulis arrow function dalam berbagai bentuk, mengirim callback, melakukan chaining, sampai membuat **versi sendiri** dari `map`/`filter`/`reduce` untuk benar-benar paham cara kerjanya di balik layar.

Di akhir latihan, kamu akan bisa baca kode seperti `data.filter(x => x.nilai > 80).map(x => x.nama).join(', ')` tanpa bingung — itu kalimat, bukan mantra.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan & lihat hint snippet** — pahami konsep dan pola yang akan dipakai
2. **Ketik dari 0** — buat file `07-callback-higher-order.js`, ketik sendiri (JANGAN copy-paste). Hint yang ada hanya **potongan kecil**, bukan kode jadi utuh
3. **Verifikasi** — jalankan dengan `node 07-callback-higher-order.js` dan cek semua output sesuai checklist

Kamu **tidak akan diberi kode jadi utuh**. Tujuannya agar kamu terbiasa **berpikir dan menyusun** kode dari potongan-potongan kecil yang kamu pahami. Ini skill inti programmer: bukan mengetik cepat, tapi **membaca kode orang lain lalu memodifikasinya sesuai kebutuhan**.

---

## Konsep Singkat: First-Class Function

Sebelum masuk ke callback dan higher-order function, kamu harus paham dulu konsep ini.

Di JavaScript, **fungsi adalah "warga kelas satu"** (*first-class citizen*). Artinya, fungsi diperlakukan **sama seperti nilai lain** (number, string, array). Kamu bisa:

- **Simpan fungsi di variabel**
- **Kirim fungsi sebagai argumen** ke fungsi lain
- **Kembalikan fungsi dari fungsi lain** (ini yang bikin closure mungkin)
- **Simpan fungsi di dalam array atau object**

```javascript
// 1. Simpan fungsi di variabel
const sapa = function(nama) { return `Halo, ${nama}`; };

// 2. Kirim fungsi sebagai argumen
function jalankan(fn, nilai) { return fn(nilai); }
jalankan(sapa, "Budi"); // "Halo, Budi"

// 3. Kembalikan fungsi dari fungsi lain
function pengali(x) { return (n) => n * x; }
const kali5 = pengali(5);
kali5(3); // 15
```

Karena fungsi bisa "dikirim" dan "dikembalikan", kita bisa bikin **higher-order function**: fungsi yang **menerima fungsi lain** atau **mengembalikan fungsi lain**. Dan "fungsi yang dikirim" itulah yang disebut **callback**.

Istilah "callback" sendiri berasal dari kata "call back" — fungsi itu **dipanggil kembali** oleh fungsi lain pada waktu yang sesuai. Untuk `map`/`filter`/`reduce`, callback dipanggil **tiap kali** ada elemen yang perlu diproses. Untuk `setTimeout`, callback dipanggil **nanti** setelah waktu tertentu.

---

## Bagian A: Arrow Functions

### Penjelasan

**Arrow function** adalah cara **lebih ringkas** menulis function expression. Bentuk lengkapnya:

```javascript
// Function declaration (cara lama)
function tambah(a, b) { return a + b; }

// Function expression (cara lama)
const tambah = function(a, b) { return a + b; };

// Arrow function (cara modern)
const tambah = (a, b) => { return a + b; };

// Arrow function ringkas (implicit return, satu baris)
const tambah = (a, b) => a + b;
```

Aturan ringkas arrow function:

- **1 parameter + 1 return**: bisa hilangkan kurung param dan kurung kurawal body
  `const double = x => x * 2;`
- **0 parameter atau >1 parameter**: WAJIB pakai kurung
  `const halo = () => "halo";` atau `const tambah = (a, b) => a + b;`
- **Multi-line body**: WAJIB pakai `{ ... }` dan `return` eksplisit
  `const proses = (x) => { const y = x * 2; return y + 1; };`
- **Return object literal**: bungkus dengan `()` supaya tidak dianggap block
  `const user = id => ({ id, nama: "Budi" });`

Contoh perbedaan format:

```javascript
// Single param, implicit return
const square = n => n * n;

// Multi param, implicit return
const add = (a, b) => a + b;

// Multi-line, explicit return
const greet = (nama) => {
  const pesan = `Halo, ${nama}!`;
  return pesan;
};

// Tanpa param
const now = () => Date.now();
```

### Wajib Ada di Kode Kamu

- Minimal 3 arrow function dalam format berbeda (single param, multi param, multi-line)
- Setidaknya 1 arrow function yang **implicit return** (tanpa `return` eksplisit)
- Setidaknya 1 arrow function yang **multi-line** dengan `return` eksplisit
- Bandingkan dengan `function` declaration biasa (tulis versi function-nya juga, untuk lihat perbedaannya)

### Cara Mengetik dari 0

1. Buka `07-callback-higher-order.js`
2. Tulis section komentar `// === BAGIAN A: ARROW FUNCTIONS ===`
3. Tulis satu function declaration biasa, misal `function kuadrat(n) { return n * n; }`
4. Di bawahnya, tulis versi arrow-nya: `const kuadratArrow = n => n * n;`
5. Tambah arrow function multi-param: `const tambah = (a, b) => a + b;`
6. Tambah arrow function multi-line dengan `console.log` di dalamnya sebelum `return`
7. Test dengan `console.log` semua varian

### Verifikasi

- [ ] Arrow function `double` jalan: `double(5)` → `10`
- [ ] Arrow function `add` jalan: `add(3, 4)` → `7`
- [ ] Arrow function multi-line jalan: `greet("Budi")` → `"Halo, Budi!"`
- [ ] Arrow function tanpa kurung param jalan: `square(4)` → `16`
- [ ] Tidak ada syntax error saat dijalankan

---

## Bagian B: Callback Fundamentals

### Penjelasan

**Callback** = fungsi yang **dikirim sebagai argumen** ke fungsi lain, lalu **dipanggil** di dalam fungsi itu. Fungsi yang menerima callback disebut **higher-order function**.

Paling sederhana, kita bikin sendiri `prosesData(data, callback)` yang tugasnya: terima data, lalu panggil `callback(data)`. Kita juga bikin `hitung(a, b, operasi)` yang menerima operasi matematika apa saja sebagai callback.

```javascript
// Higher-order function: menerima callback
function prosesData(data, callback) {
  console.log("Memproses data...");
  callback(data);
}

// Memanggil dengan callback
prosesData([1, 2, 3], function(hasil) {
  console.log("Hasil:", hasil);
});
// Output: Memproses data... \n Hasil: [1, 2, 3]

// Callback bisa juga arrow function (lebih ringkas)
prosesData([1, 2, 3], (hasil) => console.log("Hasil:", hasil));
```

Untuk `hitung(a, b, operasi)`, callback-nya adalah **fungsi yang menerima 2 angka dan mengembalikan 1 angka**. Kita bisa kirim operasi apa saja: tambah, kali, bagi, dst.

```javascript
function hitung(a, b, operasi) {
  return operasi(a, b);
}

const tambah = (x, y) => x + y;
const kali = (x, y) => x * y;

hitung(5, 3, tambah); // 8
hitung(5, 3, kali);   // 15
hitung(5, 3, (x, y) => x - y); // 2 (inline arrow)
```

Callback bisa **named** (ada nama, misal `tambah`), **anonymous** (function tanpa nama), atau **inline** (ditulis langsung di tempat pemanggilan).

### Wajib Ada di Kode Kamu

- Fungsi `prosesData(data, callback)` yang memanggil `callback(data)`
- Fungsi `hitung(a, b, operasi)` yang memanggil `operasi(a, b)` dan return hasilnya
- Minimal 3 pemanggilan `hitung()` dengan callback berbeda (named, anonymous, inline)
- Setidaknya 1 pemanggilan `prosesData()` dengan callback yang memformat/memproses data

### Cara Mengetik dari 0

1. Tulis section `// === BAGIAN B: CALLBACK FUNDAMENTALS ===`
2. Tulis `function prosesData(data, callback) { ... }`. Di dalam, tambah `console.log("Memproses...")`, lalu panggil `callback(data)`
3. Panggil `prosesData` dengan data array dan callback yang print
4. Tulis `function hitung(a, b, operasi) { return operasi(a, b); }`
5. Definisikan 2 callback named: `tambah` dan `kali` sebagai arrow function
6. Panggil `hitung(5, 3, tambah)` dan `hitung(5, 3, kali)`
7. Panggil `hitung(5, 3, (x, y) => x ** y)` — inline arrow callback untuk pangkat

### Verifikasi

- [ ] `prosesData([1,2,3], ...)` menampilkan data ke console
- [ ] `hitung(5, 3, tambah)` → `8`
- [ ] `hitung(5, 3, kali)` → `15`
- [ ] `hitung(5, 3, (x, y) => x - y)` → `2` (inline)
- [ ] `hitung(10, 2, (x, y) => x / y)` → `5` (inline bagi)
- [ ] Callback dengan `function` anonymous juga jalan (bukan cuma arrow)

---

## Bagian C: Array Higher-Order Functions

### Penjelasan

Array di JavaScript punya banyak **higher-order method** yang menerima callback. Yang wajib kamu kuasai untuk soal ini: `forEach`, `map`, `filter`, `find`, `reduce`, `some`, `every`.

Data yang akan kita pakai di semua bagian adalah array mahasiswa:

```javascript
const mahasiswas = [
  { nama: "Andi",   nilai: 85, jurusan: "Informatika" },
  { nama: "Budi",   nilai: 92, jurusan: "Informatika" },
  { nama: "Citra",  nilai: 78, jurusan: "Sistem Informasi" },
  { nama: "Dewi",   nilai: 88, jurusan: "Informatika" },
  { nama: "Eko",    nilai: 65, jurusan: "Sistem Informasi" },
  { nama: "Fira",   nilai: 95, jurusan: "Informatika" },
  { nama: "Galih",  nilai: 73, jurusan: "Sistem Informasi" },
  { nama: "Hana",   nilai: 81, jurusan: "Informatika" },
];
```

Ringkasan method yang akan dipakai:

| Method | Return | Kapan Pakai |
| ------ | ------ | ----------- |
| `forEach` | `undefined` | Loop, side-effect (cetak, kumpulkan ke variabel luar) |
| `map` | array baru (panjang sama) | Transformasi tiap elemen jadi nilai baru |
| `filter` | array baru (subset) | Pilih elemen yang lolos kondisi |
| `find` | 1 elemen pertama atau `undefined` | Cari satu elemen yang cocok |
| `reduce` | 1 nilai akumulasi | Hitung total, max, group, dst |
| `some` | boolean | Cek **ada** yang lolos kondisi |
| `every` | boolean | Cek **semua** lolos kondisi |

Semua method ini **tidak mengubah array asli** (kecuali method yang memang untuk mutasi, seperti `push`/`sort`/`splice`). `map` dan `filter` selalu return **array baru**.

Hint kecil untuk `reduce`:

```javascript
// reduce: (akumulator, elemen) => nilaiAkumulatorBaru
// arr.reduce((acc, el) => ..., initialValue)
const totalNilai = mahasiswas.reduce((acc, m) => acc + m.nilai, 0);
```

### Wajib Ada di Kode Kamu

- `forEach`: cetak `"1. Andi - 85"` untuk tiap mahasiswa (nomor urut + nama + nilai)
- `map`: buat array baru `namaMahasiswas` yang berisi string nama saja
- `map`: buat array `nilaiDigenap` dari `nilai * 2` (semua nilai dikalikan 2)
- `filter`: array `mahasiswasLulus` (yang `nilai >= 75`)
- `filter`: array `mahasiswasInformatika` (yang `jurusan === "Informatika"`)
- `find`: cari mahasiswa **pertama** dengan `nilai === 95`
- `reduce`: hitung `totalNilai` dari semua nilai
- `reduce`: hitung `rataRata` (total / jumlah mahasiswa)
- `some`: cek apakah **ada** mahasiswa dengan `nilai === 100`
- `some`: cek apakah **ada** mahasiswa dari `"Sistem Informasi"`
- `every`: cek apakah **semua** mahasiswa nilainya `>= 60` (tidak ada yang remidi)
- `every`: cek apakah **semua** mahasiswa dari `"Informatika"`

### Cara Mengetik dari 0

1. Tulis section `// === BAGIAN C: ARRAY HIGHER-ORDER ===`
2. Definisikan array `mahasiswas` (copy dari briefing atau tulis sendiri)
3. Untuk tiap method, tulis **konsol log dulu** sebagai label (`console.log("--- forEach ---")`), baru panggil method-nya
4. Mulai dari yang paling mudah: `forEach` → cetak tiap elemen dengan template literal dan index (hint: `forEach((m, i) => ...)`)
5. Lanjut `map` → simpan hasil ke variabel, lalu `console.log` variabelnya
6. Lanjut `filter`, `find`, `reduce`, `some`, `every`
7. Untuk `reduce` ke-2 (rata-rata), hitung dulu total lalu bagi dengan `mahasiswas.length`

### Verifikasi

- [ ] `forEach` menampilkan 8 baris dengan nomor urut 1-8
- [ ] `namaMahasiswas` adalah array berisi 8 string nama
- [ ] `nilaiDigenap[0]` → `170` (dari 85 × 2)
- [ ] `mahasiswasLulus.length` → `6` (yang >= 75)
- [ ] `mahasiswasInformatika.length` → `5`
- [ ] `find(... nilai === 95)` mengembalikan **object** `Fira`, bukan array
- [ ] `totalNilai` → `657`
- [ ] `rataRata` → `82.125`
- [ ] `some(... nilai === 100)` → `false`
- [ ] `some(... === "Sistem Informasi")` → `true`
- [ ] `every(... >= 60)` → `true` (semua lulus)
- [ ] `every(... === "Informatika")` → `false` (ada Sistem Informasi)

---

## Bagian D: Method Chaining

### Penjelasan

Karena `map`, `filter`, dan `find` me-return array atau nilai baru, kita bisa **rantai** (*chain*) mereka: hasil method pertama jadi input method kedua. Ini yang bikin kode data processing jadi elegan dan ringkas.

Contoh:

```javascript
// Tanpa chain (5 baris, banyak variabel)
const lulus = mahasiswas.filter(m => m.nilai >= 75);
const namaLulus = lulus.map(m => m.nama);
const stringAkhir = namaLulus.join(', ');
console.log(stringAkhir);

// Dengan chain (1 baris logika)
const hasil = mahasiswas
  .filter(m => m.nilai >= 75)   // → array 6 mahasiswa
  .map(m => m.nama)              // → array 6 string nama
  .join(', ');                   // → string "Andi, Budi, ..."
console.log(hasil);
```

Hasilnya **sama persis**, tapi chain lebih mudah dibaca. Aturan penting:

- **Setiap method di tengah chain WAJIB return array** (atau value yang bisa di-chain lagi, misal string untuk `.join()`)
- `forEach` TIDAK bisa di-chain (return `undefined`)
- `reduce` TIDAK bisa di-chain langsung (return nilai skalar, bukan array)
- `sort()` **MEMUTASI** array asli — pakai `.slice()` dulu atau `.sort()` di chain akhir

Contoh chain dengan `sort` + `slice`:

```javascript
// Ambil 3 nilai tertinggi, urutkan descending, cetak nama
const top3 = [...mahasiswas]              // clone supaya array asli tidak ke-sort
  .sort((a, b) => b.nilai - a.nilai)      // urutkan descending
  .slice(0, 3)                            // ambil 3 pertama
  .map(m => m.nama);
```

### Wajib Ada di Kode Kamu

- Chain `filter().map()` → nama mahasiswa yang lulus (nilai >= 75), dipisah koma
- Chain `filter().map().join(', ')` → versi string di atas (sama, tapi diakhiri `join`)
- Chain `map().filter()` → ambil nama mahasiswa, filter yang panjangnya > 4 karakter
- Chain `slice().sort().map()` → ambil **3 pertama** dari data, urutkan berdasarkan nilai **descending**, ambil nama-nya
- Bukti array asli **tidak berubah**: `console.log(mahasiswas[0])` di akhir masih berupa object mahasiswa urutan awal

### Cara Mengetik dari 0

1. Tulis section `// === BAGIAN D: METHOD CHAINING ===`
2. Mulai dari yang paling simpel: `filter().map().join(', ')`. Tulis per-baris, jangan satu baris panjang
3. Untuk chain `map().filter()`: pertama `map(m => m.nama)`, hasilnya array string. Lalu `.filter(nama => nama.length > 4)`
4. Untuk `sort().slice()`: **perhatikan mutasi**. Pakai `[...mahasiswas]` atau `mahasiswas.slice()` untuk clone
5. Sebelum chain, `console.log(mahasiswas[0].nama)` untuk catat nilai awal. Setelah chain, `console.log` lagi — harus sama

### Verifikasi

- [ ] Chain pertama menampilkan string `"Andi, Budi, Dewi, Fira, Galih, Hana"` (Citra 78, Galih 73, Eko 65 — Galih 73 lolos)
- [ ] Chain `map().filter()` menghasilkan array nama dengan panjang > 4
- [ ] `top3` (chain terakhir) adalah array dengan isi `["Fira", "Budi", "Dewi"]` (nilai 95, 92, 88)
- [ ] Setelah semua chain, `mahasiswas[0].nama` **masih** `"Andi"` (array asli tidak ter-sort)

---

## Bagian E: Closures

### Penjelasan

**Closure** = fungsi yang "mengingat" **variabel dari scope fungsi luarnya**, meskipun fungsi luar itu sudah selesai dijalankan. Ini terjadi saat **fungsi di-return** dari fungsi lain.

Contoh paling klasik: counter.

```javascript
function buatCounter() {
  let count = 0;  // ← variabel ini "ditutup" (closed over) oleh fungsi dalam
  return function() {
    count++;      // akses count dari scope luar
    return count;
  };
}

const counterA = buatCounter();
counterA(); // 1
counterA(); // 2
counterA(); // 3

const counterB = buatCounter(); // counter BARU, count mulai dari 0 lagi
counterB(); // 1
```

Kenapa ini bekerja? Saat `buatCounter()` dipanggil, JavaScript bikin `count = 0`. Lalu function dalamnya di-return. Meskipun `buatCounter()` sudah selesai, function dalam **masih pegang referensi** ke `count`. Setiap kali `counterA()` dipanggil, dia akses dan ubah `count` yang sama.

Contoh kedua: **function factory** yang bikin fungsi pengali khusus.

```javascript
function kaliX(x) {
  return function(n) {
    return n * x;
  };
}

const kali5 = kaliX(5);
const kali10 = kaliX(10);

kali5(3);  // 15
kali10(3); // 30
```

`kali5` dan `kali10` **masing-masing ingat `x` yang berbeda** (5 dan 10). Itulah kekuatan closure: bikin fungsi "spesialis" dari fungsi "generic".

> **Bedanya dengan arrow function:** closure sendiri **bukan fitur arrow** — `function` biasa juga bisa bikin closure. Yang penting adalah **fungsi di-return dari fungsi lain**. Arrow cuma sering dipakai karena lebih ringkas.

### Wajib Ada di Kode Kamu

- `buatCounter()` yang return fungsi counter. Panggil 3× dan cetak hasilnya
- Bukti bahwa **2 counter berbeda independen**: buat `counterA` dan `counterB`, panggil beberapa kali, tunjukkan bahwa mereka punya `count` sendiri
- `kaliX(x)` yang return `(n) => n * x`. Buat `kali5`, `kali10`, `kali100`, dan tunjukkan masing-masing
- Tulis komentar `// Variabel x di sini "tertutup" oleh fungsi dalam` untuk dokumentasi

### Cara Mengetik dari 0

1. Tulis section `// === BAGIAN E: CLOSURES ===`
2. Tulis `function buatCounter() { let count = 0; return function() { ... } }`. Di dalam, tambah `count++` lalu `return count`
3. Buat `const counterA = buatCounter()` lalu panggil 3× dengan `console.log`
4. Buat `const counterB = buatCounter()` lalu panggil 2×, bandingkan dengan counterA (mereka independen)
5. Tulis `function kaliX(x) { return (n) => n * x; }`
6. Buat `const kali5 = kaliX(5)`, `const kali10 = kaliX(10)`, panggil beberapa kali dan cetak
7. Tambah komentar untuk setiap `x` di `kaliX` agar jelas scope-nya

### Verifikasi

- [ ] `counterA()` ke-1 → `1`, ke-2 → `2`, ke-3 → `3`
- [ ] `counterB()` ke-1 → `1` (mulai dari 0, bukan lanjut dari counterA)
- [ ] `counterA()` ke-4 → `4` (mereka benar-benar independen)
- [ ] `kali5(3)` → `15`
- [ ] `kali10(3)` → `30`
- [ ] `kali100(7)` → `700`
- [ ] Tidak ada error: `x is not defined` di luar `kaliX`

---

## Bagian F: Custom Higher-Order Function (myMap, myFilter, myReduce)

### Penjelasan

Untuk benar-benar paham `map`, `filter`, dan `reduce`, kita tulis ulang versinya sendiri. Polanya mirip: **loop manual**, panggil callback tiap iterasi, kumpulkan ke array baru.

Skeleton untuk `myMap`:

```javascript
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
```

Callback di sini menerima **3 argumen**: elemen saat ini, index, dan array asli — sama persis seperti `Array.prototype.map` asli. (Untuk soal ini, kamu cukup pakai 1 atau 2 argumen pertama.)

Skeleton untuk `myFilter`:

```javascript
function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
```

Bedanya dengan `myMap`: `myFilter` **push elemen asli** (kalau callback return `true`), bukan hasil callback. Jadi callback `myFilter` selalu return boolean.

Skeleton untuk `myReduce` (paling kompleks, ada 2 signature: dengan dan tanpa `initialValue`):

```javascript
function myReduce(array, callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  // Kalau nggak ada initialValue, pakai elemen pertama sebagai acc
  if (acc === undefined) {
    acc = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
}
```

> **Tantangan kecil**: cek `=== undefined`, BUKAN `!== undefined`. Bedanya: `myReduce([1,2,3], (a,b) => a+b, 0)` punya `initialValue = 0`, bukan `undefined`, jadi loop mulai dari index 0. Tapi `myReduce([1,2,3], (a,b) => a+b)` tanpa initialValue harus mulai dari index 1.

### Wajib Ada di Kode Kamu

- `myMap(array, callback)` yang berfungsi seperti `Array.prototype.map`
- `myFilter(array, callback)` yang berfungsi seperti `Array.prototype.filter`
- `myReduce(array, callback, initialValue)` yang berfungsi seperti `Array.prototype.reduce` (handle kasus tanpa `initialValue`)
- **Bukti hasil sama**: untuk setiap versi custom, bandingkan output-nya dengan versi built-in pakai `JSON.stringify` atau `console.log` keduanya

Contoh pembuktian:

```javascript
const angka = [1, 2, 3, 4, 5];
const hasilBuiltIn = angka.map(n => n * 2);
const hasilCustom = myMap(angka, n => n * 2);
console.log("Sama?", JSON.stringify(hasilBuiltIn) === JSON.stringify(hasilCustom));
// "Sama? true"
```

### Cara Mengetik dari 0

1. Tulis section `// === BAGIAN F: CUSTOM HIGHER-ORDER ===`
2. Tulis `myMap` lengkap. Coba test: `myMap([1,2,3], n => n * 2)` → `[2,4,6]`
3. Tulis `myFilter`. Test: `myFilter([1,2,3,4], n => n % 2 === 0)` → `[2,4]`
4. Tulis `myReduce` (dengan `initialValue`). Test: `myReduce([1,2,3,4], (a,b) => a + b, 0)` → `10`
5. Tambahin **percabangan untuk handle tanpa `initialValue`**. Test: `myReduce([1,2,3,4], (a,b) => a + b)` → `10`
6. Bandingkan hasil custom vs built-in untuk **array `mahasiswas`** (pakai `myMap` untuk ambil nama, bandingkan dengan `mahasiswas.map(m => m.nama)`)

### Verifikasi

- [ ] `myMap([1,2,3], n => n * 2)` → `[2, 4, 6]`
- [ ] `myFilter([1,2,3,4,5], n => n % 2 === 0)` → `[2, 4]`
- [ ] `myReduce([1,2,3,4], (a,b) => a + b, 0)` → `10`
- [ ] `myReduce([1,2,3,4], (a,b) => a + b)` (tanpa initial) → `10`
- [ ] `myReduce([1,2,3,4], (a,b) => a * b, 1)` → `24` (faktorial)
- [ ] Pembuktian `myMap(mahasiswas, m => m.nama)` menghasilkan **array yang sama** dengan `mahasiswas.map(m => m.nama)`

---

## Bagian G: Latihan Kasus (Studi Data Mahasiswa)

### Penjelasan

Ini bagian **klimaks** — pakai semua yang sudah kamu pelajari untuk memecahkan kasus nyata pengolahan data. Setiap kasus adalah satu masalah klasik.

#### Kasus 1: Hitung Total Nilai

Pakai `reduce` untuk jumlahkan semua nilai. Versi `myReduce` juga boleh.

#### Kasus 2: Cari Mahasiswa dengan IPK/Nilai Tertinggi

Pakai `reduce` dengan logika `acc.nilai < m.nilai ? m : acc`. Atau kombinasi `sort().slice(0,1)` tapi **`sort` memutasai** — lebih aman pakai `reduce`.

#### Kasus 3: Group by Grade (A/B/C/D)

Buat object `groups = { A: [], B: [], C: [], D: [] }`. Iterasi mahasiswas, tentukan grade-nya (A: >=90, B: >=80, C: >=70, D: <70), lalu `push` ke `groups[grade]`.

Hint `reduce` untuk group by:

```javascript
// Skeleton: setiap iterasi, tentukan group key lalu push
const groups = mahasiswas.reduce((acc, m) => {
  // tentukan grade untuk m
  // acc[grade].push(m)
  return acc;
}, { A: [], B: [], C: [], D: [] });
```

#### Kasus 4: Sort Nama Mahasiswa Berdasarkan Abjad

Pakai `.sort((a, b) => a.nama.localeCompare(b.nama))`. **Hati-hati mutasi**: pakai `slice()` atau spread `[...arr]` dulu, atau sort **copy** yang memang akan di-mutasi.

### Wajib Ada di Kode Kamu

- **Kasus 1**: `const totalNilai = ...` pakai `reduce`. Cetak `"Total nilai semua mahasiswa: 657"`
- **Kasus 2**: `const terbaik = ...` (1 object, bukan array). Cetak `"Mahasiswa nilai tertinggi: Fira (95)"`
- **Kasus 3**: `const groupByGrade = ...` (object dengan key A/B/C/D). Cetak tiap grade dan jumlah anggotanya
- **Kasus 4**: `const urutAbjad = ...` (array of nama, diurut A-Z). Cetak `"Urutan abjad: Andi, Budi, Citra, Dewi, Eko, Fira, Galih, Hana"`
- Setelah Kasus 4, **buktikan** `mahasiswas[0].nama` masih `"Andi"` (tidak termutasi)

### Cara Mengetik dari 0

1. Tulis section `// === BAGIAN G: LATIHAN KASUS ===`
2. **Kasus 1**: `mahasiswas.reduce((acc, m) => acc + m.nilai, 0)`. Print dengan template literal
3. **Kasus 2**: `mahasiswas.reduce((terbesar, m) => m.nilai > terbesar.nilai ? m : terbesar)`. Print nama + nilai
4. **Kasus 3**: Tulis fungsi `groupByGrade` (boleh di luar atau inline). Di dalamnya, `reduce` dengan initial value `{ A: [], B: [], C: [], D: [] }`. Logika grade: `>= 90 ? 'A' : >= 80 ? 'B' : >= 70 ? 'C' : 'D'`
5. **Kasus 4**: `[...mahasiswas].sort((a, b) => a.nama.localeCompare(b.nama)).map(m => m.nama)`. Print dengan `.join(", ")`
6. Bukti non-mutasi: `console.log("Array asli utuh:", mahasiswas[0].nama === "Andi")`

### Verifikasi

- [ ] **Kasus 1**: Total = `657`
- [ ] **Kasus 2**: Terbaik = `Fira` dengan nilai `95`
- [ ] **Kasus 3**:
  - `groupByGrade.A.length` → `2` (Budi 92, Fira 95)
  - `groupByGrade.B.length` → `3` (Andi 85, Dewi 88, Hana 81)
  - `groupByGrade.C.length` → `2` (Citra 78, Galih 73)
  - `groupByGrade.D.length` → `1` (Eko 65)
- [ ] **Kasus 4**: `urutAbjad[0]` → `"Andi"`, `urutAbjad[7]` → `"Hana"`
- [ ] Setelah sort, `mahasiswas[0].nama` **masih** `"Andi"` (tidak termutasi)

---

## Ringkasan

**Kapan pakai arrow function vs function declaration:**

| Situasi | Pilihan | Alasan |
| ------- | ------- | ------ |
| Butuh `this` sendiri (method object, constructor) | `function` declaration | Arrow tidak punya `this` |
| Fungsi sebagai callback (sekali pakai) | Arrow function | Lebih ringkas, `this` dari scope luar (kalau perlu) |
| Ingin hoisting (fungsi bisa dipanggil sebelum deklarasi) | `function` declaration | Arrow tidak ter-hoist |
| Multi-line logic, perlu `this` | `function` declaration | Lebih jelas untuk logika panjang |

**Kapan perlu closure:**

- Butuh **state tersembunyi** yang persist antar pemanggilan (counter, accumulator, config)
- Butuh **function factory**: bikin versi khusus dari fungsi generic (`kaliX(5)`, `kaliX(10)`)
- Ingin **data privacy** tanpa bikin class
- Callback yang perlu "mengingat" konteks asalnya

**Cheat Sheet Higher-Order Methods:**

| Method | Kembalikan | Wajib Chain-Safe? |
| ------ | ---------- | ----------------- |
| `forEach` | `undefined` | Tidak (tidak bisa di-chain) |
| `map` | array baru (panjang sama) | Ya |
| `filter` | array baru (subset) | Ya |
| `find` | 1 elemen atau `undefined` | Tidak (skalar) |
| `reduce` | 1 nilai akumulasi | Tidak (skalar) |
| `some` | boolean | Tidak |
| `every` | boolean | Tidak |

**Tanda Bahaya (Mutasi):**

- `sort()`, `reverse()`, `splice()`, `push()`/`pop()` → **mutasi array asli**
- Untuk chain yang aman, **clone dulu**: `[...arr]` atau `arr.slice()`

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 08, cek semua ini:

- [ ] **Bagian A**: minimal 3 arrow function dalam format berbeda, jalan tanpa error
- [ ] **Bagian B**: `prosesData` dan `hitung` jalan, menerima callback named/anonymous/inline
- [ ] **Bagian C**: semua 7 method (`forEach`, `map`, `filter`, `find`, `reduce`, `some`, `every`) jalan dan output sesuai
- [ ] **Bagian C**: `find` mengembalikan **object** (bukan array), `filter`/`map` mengembalikan **array baru**
- [ ] **Bagian D**: minimal 3 chain berjalan, output benar
- [ ] **Bagian D**: **array asli tidak termutasi** setelah chain
- [ ] **Bagian E**: 2 counter independen, 3 versi `kaliX` jalan dengan benar
- [ ] **Bagian E**: tidak ada `ReferenceError: x is not defined` (variabel closure tetap di scope dalam)
- [ ] **Bagian F**: `myMap`, `myFilter`, `myReduce` jalan seperti versi built-in
- [ ] **Bagian F**: `myReduce` jalan baik dengan maupun tanpa `initialValue`
- [ ] **Bagian F**: pembuktian `JSON.stringify(custom) === JSON.stringify(builtIn)` → `true`
- [ ] **Bagian G Kasus 1**: total nilai = 657
- [ ] **Bagian G Kasus 2**: terbaik = Fira (95)
- [ ] **Bagian G Kasus 3**: 4 group (A:2, B:3, C:2, D:1)
- [ ] **Bagian G Kasus 4**: urutan abjad Andi → Hana
- [ ] **Bagian G**: array asli **tidak termutasi** setelah sort
- [ ] `node 07-callback-higher-order.js` jalan tanpa error sama sekali
- [ ] Tidak ada `undefined` nyangkut di output console.log

---

## Cara Submit

1. Simpan file sebagai `07-callback-higher-order.js` di folder `code/`
2. Jalankan dengan `node 07-callback-higher-order.js` di terminal
3. Cek output untuk semua 7 bagian (A sampai G)
4. Bandingkan hasil `myMap`/`myFilter`/`myReduce` dengan built-in — harusnya **identik**
5. Pastikan tidak ada `ReferenceError` atau `TypeError` di terminal
6. Buktikan array asli **tidak termutasi** dengan `console.log(mahasiswas[0].nama)` di akhir (harus `"Andi"`)
7. Kalau semua PASS, lanjut ke `soal/08-...`

---

## Catatan untuk Pemula

> **Jebakan umum #1: `this` pada arrow function.** Arrow function **tidak punya `this` sendiri** — dia pakai `this` dari scope luarnya (lexical `this`). Ini bagus untuk callback, tapi **bahaya untuk method object**:
>
> ```javascript
> const user = {
>   nama: "Budi",
>   halo: () => console.log(this.nama), // undefined! `this` bukan user
>   haloBenar: function() { console.log(this.nama); } // "Budi"
> };
> ```
> Pakai `function` biasa untuk method object yang butuh akses `this`.

> **Jebakan umum #2: `sort()` memutasai array asli.** Kalau kamu pakai `mahasiswas.sort(...)` langsung, data asli kamu **berubah urutan**. Untuk chain yang aman, clone dulu dengan `[...arr]` atau `arr.slice()`. Built-in `map`/`filter`/`reduce` aman, `sort`/`splice`/`reverse` tidak.

> **Jebakan umum #3: `find` return object, `filter` return array.** Sering bingung. `find` selalu return **1 elemen pertama yang cocok** atau `undefined` kalau tidak ada. `filter` return **array** (kosong `[]` kalau tidak ada yang cocok). Kalau kamu mau "cek ada atau tidak", pakai `some` (return boolean).

> **Jebakan umum #4: `reduce` tanpa `initialValue` mulai dari index 1.** Kalau kamu lupa kasih `initialValue`, reduce pakai elemen pertama sebagai `acc` dan mulai loop dari index 1. Ini sering bikin bug off-by-one. **Selalu kasih `initialValue`** kecuali kamu benar-benar paham kasusnya.

> **Jebakan umum #5: closure `count` tidak di-reset antar pemanggilan.** `buatCounter()` membuat `count = 0` **sekali** saat function dipanggil. Pemanggilan `counter()` berikutnya cuma akses `count` yang sama. Untuk bikin counter **baru**, kamu harus panggil `buatCounter()` lagi, bukan panggil `counter()` "reset".

> **Tips urutan kerja**: (1)ahami data `mahasiswas` dulu, (2) kerjakan Bagian A-E berurutan karena ini pondasi, (3) Bagian F (custom HOF) boleh skip dulu lalu balik, (4) Bagian G adalah "exam" — pastikan semua method sudah dikuasai.

<!-- markdownlint-enable MD024 MD028 -->

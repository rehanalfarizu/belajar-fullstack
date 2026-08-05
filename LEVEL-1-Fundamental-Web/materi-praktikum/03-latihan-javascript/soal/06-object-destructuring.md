<!-- markdownlint-disable MD024 MD028 -->

# SOAL 06 — Object & Destructuring

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat **object literal** dengan berbagai tipe nilai (string, number, nested object, array) dan mengakses property-nya dengan **dot notation** dan **bracket notation**
- Mengekstrak nilai dari object menggunakan **destructuring assignment**, lengkap dengan **alias**, **default value**, dan **nested destructuring**
- Menggunakan **array destructuring** untuk mengambil elemen, **skip** elemen yang tidak dibutuhkan, dan **rest pattern** untuk sisanya
- Mengkloning dan menggabungkan object/array secara **shallow** menggunakan **spread operator** (`...`)
- Mengakses property yang mungkin `undefined` dengan aman menggunakan **optional chaining** (`?.`) dan **nullish coalescing** (`??`)
- Mengubah object menjadi array dengan `Object.keys()`, `Object.values()`, dan `Object.entries()` untuk iterasi
- Membuat **computed property names** untuk membentuk key object secara dinamis dari variabel
- Memahami perbedaan kritis antara `==` vs `===`, `??` vs `||`, dan **shallow copy** vs **deep copy** — sumber bug paling umum di JavaScript

**Topik:** object literal, dot/bracket notation, nested access, destructuring (alias, default, nested, function param), array destructuring (skip, rest), spread operator, optional chaining, nullish coalescing, `Object.keys/values/entries`, computed property names

**Referensi utama:**

- [MDN: Working with objects](https://developer.mozilla.org/id/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: Destructuring assignment](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Spread syntax (...)](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Optional chaining (?.)](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN: Nullish coalescing (??)](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [MDN: Object.keys/values/entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Difficulty:** Menengah • **Estimasi:** 60-90 menit

---

## Briefing

Coba bayangkan kamu dapat data JSON dari API kampus yang isinya seperti ini:

```json
{
  "nama": "Andi Wijaya",
  "umur": 21,
  "jurusan": "Informatika",
  "alamat": { "kota": "Jakarta", "provinsi": "DKI Jakarta" },
  "hobi": ["Coding", "Gaming", "Membaca"]
}
```

Sebelum ES6 (2015), untuk mengambil `nama` dan `kota` dari object ini kamu harus
nulis kode yang panjang dan berulang:

```javascript
const nama = mahasiswa.nama;
const kota = mahasiswa.alamat.kota; // crash kalau alamat undefined!
const hobi1 = mahasiswa.hobi[0];
```

**ES6 memperkenalkan destructuring**: cara ringkas untuk "membongkar" nilai dari
object atau array ke variabel-variabel terpisah. Ditambah **spread operator**
untuk clone, **optional chaining** untuk akses aman, dan **nullish coalescing**
untuk default value — semua ini adalah **senjata utama** programmer JavaScript
modern.

Di latihan ini kamu akan mengelola data **mahasiswa** dan **produk**,
membongkar nilainya dengan destructuring, mengkloningnya dengan spread, dan
mengamankan aksesnya dengan `?.` dan `??`. Setelah selesai, kamu akan bisa
baca kode seperti `function getBio({ nama, alamat: { kota } })` tanpa bingung.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan & lihat hint snippet** — pahami konsep dan pola yang akan dipakai
2. **Ketik dari 0** — buat file `06-object-destructuring.js`, ketik sendiri (JANGAN copy-paste). Hint yang ada hanya **potongan kecil**, bukan kode jadi utuh
3. **Verifikasi** — jalankan dengan `node 06-object-destructuring.js` dan cek semua output sesuai checklist

Kamu **tidak akan diberi kode jadi utuh**. Tujuannya agar kamu terbiasa
**berpikir dan menyusun** kode dari potongan-potongan kecil yang kamu pahami.
Ini skill inti programmer: bukan mengetik cepat, tapi **membaca kode orang lain
lalu memodifikasinya sesuai kebutuhan**.

> Tips: kalau stuck di satu bagian, **jangan loncat ke bagian lain**. Pahami
> dulu object literal dan dot notation, jalankan, baru lanjut ke destructuring.
> Membangun intuisi butuh urutan.

---

## Konsep Singkat: Object sebagai "Kamus"

Sebelum masuk ke syntax, pahami dulu **analogi object**.

Bayangkan **object** itu seperti **kamus** (kamus bahasa, bukan kamus data).
Tiap entri punya **kata kunci** (key) dan **arti** (value). Saat kamu mau tahu
arti "kucing", kamu "cari" di kamus: `kamus["kucing"]`. Di JavaScript, proses
"cari" itu disebut **property access**.

```javascript
const kamus = {
  kucing: "hewan berkaki empat yang mengeong",
  anjing: "hewan berkaki empat yang menggonggong"
};

kamus.kucing;   // "hewan berkaki empat yang mengeong"
kamus["kucing"]; // sama, tapi pakai kurung siku
```

Bedanya dengan **array**: kalau array diindeks dengan **angka** (`arr[0]`),
object diindeks dengan **nama** (`obj.nama`). Karena itulah object kadang
disebut **associative array** atau **dictionary** di bahasa lain.

Yang bikin object powerful di JavaScript: **value-nya bisa apa saja** — string,
number, boolean, array, object lain, bahkan fungsi. Object yang punya fungsi
di dalamnya disebut **method** (lihat Soal 09).

---

## Bagian A: Object Literal & Property Access

### Penjelasan

**Object literal** adalah cara membuat object langsung dengan kurung kurawal
`{}`. Tiap entry ditulis sebagai `key: value` dan dipisah koma.

Ada **dua cara** mengakses property:

1. **Dot notation** — `obj.key`: lebih ringkas, lebih umum
2. **Bracket notation** — `obj["key"]`: pakai string, berguna kalau key dinamis

```javascript
const mahasiswa = {
  nama: "Andi Wijaya",
  umur: 21,
  jurusan: "Informatika",
  alamat: { kota: "Jakarta", provinsi: "DKI Jakarta" },
  hobi: ["Coding", "Gaming", "Membaca"]
};

mahasiswa.nama;        // "Andi Wijaya" (dot notation)
mahasiswa["nama"];     // "Andi Wijaya" (bracket notation)
mahasiswa.alamat.kota; // "Jakarta" (nested)
mahasiswa.hobi[0];     // "Coding" (array index)
```

### Wajib Ada di Kode Kamu

- [ ] Object `mahasiswa` dengan minimal 5 property: `nama`, `umur`, `jurusan`,
      `alamat` (object nested minimal 2 property), `hobi` (array minimal 3 item)
- [ ] Akses nama dengan **dot notation** → `console.log`
- [ ] Akses jurusan dengan **bracket notation** → `console.log`
- [ ] Akses `alamat.kota` (nested) → `console.log`
- [ ] Akses `hobi[0]` dan `hobi[2]` → `console.log`

### Cara Mengetik dari 0

1. Buat file `06-object-destructuring.js`
2. Di paling atas, tulis `const mahasiswa = { ... }` dengan 5 property
3. Di bawahnya, tulis 5 `console.log` untuk 5 akses berbeda (dot, bracket,
   nested, array index)
4. Save, jalankan `node 06-object-destructuring.js`, cek output

### Verifikasi

- [ ] Output menampilkan 5 nilai benar
- [ ] Tidak ada `undefined` di output
- [ ] Tidak ada `TypeError: Cannot read property of undefined`

---

## Bagian B: Destructuring Assignment (Object)

### Penjelasan

**Destructuring** adalah cara ringkas mengekstrak property object ke variabel.
Alih-alih:

```javascript
const nama = mahasiswa.nama;
const umur = mahasiswa.umur;
const kota = mahasiswa.alamat.kota;
```

Kamu tulis:

```javascript
const { nama, umur, alamat: { kota } } = mahasiswa;
```

Tiga baris jadi satu. Destructuring juga punya fitur tambahan:

- **Alias** — ganti nama variabel: `{ nama: namaMahasiswa }`
- **Default value** — fallback kalau property undefined: `{ ipk = 0 }`
- **Nested** — destructuring object di dalam object: `{ alamat: { kota } }`
- **Function parameter** — destructuring di parameter fungsi

```javascript
const { nama, umur } = mahasiswa;                  // nama = "Andi"
const { nama: namaMhs } = mahasiswa;               // namaMhs = "Andi"
const { ipk = 0 } = mahasiswa;                     // ipk = 0 (default)
const { alamat: { kota } } = mahasiswa;            // kota = "Jakarta"
function getBio({ nama, umur }) { ... }            // destructuring di param
```

### Wajib Ada di Kode Kamu

- [ ] Destructuring basic: `const { nama, umur } = mahasiswa`
- [ ] Destructuring dengan alias: `const { nama: namaMahasiswa } = mahasiswa`
- [ ] Destructuring dengan default: `const { ipk = 0 } = mahasiswa` (output `0`)
- [ ] Destructuring nested: `const { alamat: { kota, provinsi } } = mahasiswa`
- [ ] Function dengan destructuring parameter: `function getBio(mhs) { ... }`
      yang return string `"Andi, 21 tahun, tinggal di Jakarta"`

### Cara Mengetik dari 0

1. Di bawah object `mahasiswa`, tulis 4 baris destructuring (basic, alias,
   default, nested)
2. Tulis function `getBio(mhs)` yang menerima object, pakai destructuring
   parameter untuk ambil `nama`, `umur`, `alamat.kota`
3. Panggil `console.log(getBio(mahasiswa))` dan cek output

### Verifikasi

- [ ] Output `nama` = "Andi Wijaya", `umur` = 21, `kota` = "Jakarta"
- [ ] Output `namaMahasiswa` = "Andi Wijaya" (alias jalan)
- [ ] Output `ipk` = `0` (default jalan, bukan `undefined`)
- [ ] Function `getBio` return string lengkap, bukan `undefined`

---

## Bagian C: Array Destructuring

### Penjelasan

Sama seperti object, **array** juga bisa di-destructuring. Bedanya: array
diindeks **posisi** (0, 1, 2, ...) bukan nama. Jadi posisi di kiri `=` harus
sesuai dengan posisi di kanan.

Array destructuring juga punya fitur unik:

- **Skip element** — pakai koma kosong: `const [a, , c] = [1, 2, 3]` (skip `2`)
- **Rest pattern** — kumpulkan sisanya: `const [head, ...tail] = [1, 2, 3, 4]`
- **Default value** — sama seperti object: `const [a, b = 99] = [1]`

```javascript
const [a, b, c] = [1, 2, 3];           // a=1, b=2, c=3
const [first, , third] = [1, 2, 3];    // first=1, third=3 (skip 2)
const [head, ...tail] = [1, 2, 3, 4];  // head=1, tail=[2, 3, 4]
const [, , last] = ["Andi", "Budi", "Citra"]; // last="Citra"
```

### Wajib Ada di Kode Kamu

- [ ] Destructuring array sederhana: `const [a, b, c] = [10, 20, 30]`
- [ ] Skip element: `const [first, , third] = [10, 20, 30]` (output `10` dan `30`)
- [ ] Rest pattern: `const [head, ...tail] = [1, 2, 3, 4, 5]` (output `1` dan
      `[2, 3, 4, 5]`)
- [ ] Destructuring `hobi` dari object: `const { hobi: [hobi1, hobi2] } = mahasiswa`
- [ ] Default value: `const [x, y = 99] = [1]` (output `1` dan `99`)

### Cara Mengetik dari 0

1. Di bawah kode sebelumnya, tulis 4 `const [...]` untuk 4 jenis array
   destructuring
2. Tulis `console.log` untuk tiap hasil
3. Save, jalankan, cek output

### Verifikasi

- [ ] `a, b, c` masing-masing 10, 20, 30
- [ ] `first` = 10, `third` = 30 (elemen ke-2 di-skip)
- [ ] `head` = 1, `tail` = `[2, 3, 4, 5]`
- [ ] `hobi1` = "Coding", `hobi2` = "Gaming"

---

## Bagian D: Spread Operator untuk Clone & Merge

### Penjelasan

**Spread operator** (`...`) "membentangkan" isi array atau object ke tempat
lain. Ini sangat berguna untuk **clone** (membuat salinan) dan **merge**
(menggabungkan).

```javascript
const original = { nama: "Andi", umur: 21 };
const clone = { ...original };              // clone (shallow)
const update = { ...original, umur: 22 };   // clone + override umur
const merge = { ...original, ipk: 3.5 };    // clone + tambah property

// Array
const hobi = ["Coding", "Gaming"];
const hobiClone = [...hobi];                // ["Coding", "Gaming"]
const hobiBaru = [...hobi, "Membaca"];      // tambah di akhir
const gabung = [...hobi, ...["Membaca", "Olahraga"]]; // merge 2 array
```

**PENTING**: `{ ...obj }` membuat **shallow copy** — artinya object nested
masih **referensi yang sama** dengan original. Kalau kamu mutate `clone.alamat`,
`original.alamat` juga ikut berubah. Untuk deep copy, butuh `structuredClone()`
atau JSON trick.

### Wajib Ada di Kode Kamu

- [ ] Clone object: `const mhsClone = { ...mahasiswa }` lalu `console.log` keduanya
- [ ] Clone + override: `const mhsBaru = { ...mahasiswa, umur: 22 }`
- [ ] Merge object: tambahkan property `ipk: 3.8` ke object baru
- [ ] Clone array `hobi`: `const hobiClone = [...mahasiswa.hobi]`
- [ ] Spread di function call: `Math.max(...[80, 90, 75, 100])` → output `100`

### Cara Mengetik dari 0

1. Di bawah kode sebelumnya, buat `mhsClone` dengan spread
2. Tambah `mhsBaru` dengan spread + override `umur`
3. Tambah `mhsWithIpk` dengan spread + property baru
4. Clone array `hobi` dengan spread
5. Panggil `Math.max(...[80, 90, 75, 100])` dan `console.log` hasilnya

### Verifikasi

- [ ] `mhsClone` isinya sama dengan `mahasiswa` (tapi beda referensi)
- [ ] `mhsBaru.umur` = 22, tapi `mahasiswa.umur` masih 21 (tidak termutasi)
- [ ] `hobiClone` = `["Coding", "Gaming", "Membaca"]` (sama tapi beda array)
- [ ] `Math.max(...[80, 90, 75, 100])` = `100`
- [ ] `mhsBaru !== mahasiswa` (cek pakai `!==` di console.log)

---

## Bagian E: Optional Chaining & Nullish Coalescing

### Penjelasan

**Optional chaining** (`?.`) mempersingkat "cek dulu apakah undefined, baru
akses". Tanpa `?.`, kode ini:

```javascript
const kota = mahasiswa.alamat && mahasiswa.alamat.kota;
```

Jadi:

```javascript
const kota = mahasiswa.alamat?.kota;  // undefined kalau alamat null/undefined
```

**Nullish coalescing** (`??`) memberikan **default value** hanya kalau nilai
kiri adalah `null` atau `undefined`. Ini **beda** dengan `||`:

- `??` hanya trigger pada `null`/`undefined`
- `||` trigger pada semua **falsy** (`0`, `""`, `false`, `null`, `undefined`, `NaN`)

```javascript
const a = 0 ?? 99;   // 0  (0 bukan nullish)
const b = 0 || 99;   // 99 (0 falsy)
const c = "" ?? "x"; // ""  (string kosong bukan nullish)
const d = "" || "x"; // "x" (string kosong falsy)
```

### Wajib Ada di Kode Kamu

- [ ] `mahasiswa.ipk?.toFixed?.()` → tidak error, output `undefined`
- [ ] `const ipk = mahasiswa.ipk ?? 0` → output `0`
- [ ] `const kota = mahasiswa.alamat?.kota ?? "Tidak diketahui"` → output "Jakarta"
- [ ] Demonstrasi `??` vs `||`: buat variabel `const nilai = 0`, lalu
      `console.log(nilai ?? 99)` dan `console.log(nilai || 99)`, lihat beda output
- [ ] Akses array item yang mungkin tidak ada:
      `const hobiKetiga = mahasiswa.hobi?.[2] ?? "Tidak ada"` → "Membaca"

### Cara Mengetik dari 0

1. Buat object `mahasiswaTanpaIpk` (sama seperti `mahasiswa` tapi tanpa `ipk`)
2. Coba `mahasiswaTanpaIpk.ipk?.toFixed?.()` → tidak error
3. Pakai `??` untuk default value
4. Demonstrasi `??` vs `||` dengan `const nilai = 0`

### Verifikasi

- [ ] `mahasiswa.ipk?.toFixed?.()` tidak throw error
- [ ] `ipk` = `0` (bukan `undefined`)
- [ ] `nilai ?? 99` = `0`, tapi `nilai || 99` = `99` (beda!)
- [ ] `hobiKetiga` = "Membaca" (default tidak kepake)

---

## Bagian F: Object Methods (keys, values, entries)

### Penjelasan

Object punya **method statis** untuk diubah jadi array:

- `Object.keys(obj)` → array berisi **semua key** (string)
- `Object.values(obj)` → array berisi **semua value**
- `Object.entries(obj)` → array berisi **pasangan [key, value]**

Ini berguna untuk **iterasi** dengan `for...of` atau method array lain.

```javascript
const mahasiswa = { nama: "Andi", umur: 21, jurusan: "Informatika" };

Object.keys(mahasiswa);    // ["nama", "umur", "jurusan"]
Object.values(mahasiswa);  // ["Andi", 21, "Informatika"]
Object.entries(mahasiswa); // [["nama","Andi"], ["umur",21], ["jurusan","Informatika"]]

for (const [key, value] of Object.entries(mahasiswa)) {
  console.log(`${key}: ${value}`);
}
// nama: Andi
// umur: 21
// jurusan: Informatika
```

### Wajib Ada di Kode Kamu

- [ ] `console.log(Object.keys(mahasiswa))` → array of keys
- [ ] `console.log(Object.values(mahasiswa))` → array of values
- [ ] `console.log(Object.entries(mahasiswa))` → array of pairs
- [ ] Loop dengan `for...of` + destructuring untuk print `"key: value"`
- [ ] Hitung jumlah property: `Object.keys(mahasiswa).length` → output `5`

### Cara Mengetik dari 0

1. Di bawah object `mahasiswa`, tulis 3 `console.log` untuk `keys`, `values`,
   `entries`
2. Tulis `for...of` loop yang iterasi `Object.entries(mahasiswa)`
3. Di dalam loop, destructuring `[key, value]` lalu `console.log`
4. Print panjang keys dengan `.length`

### Verifikasi

- [ ] Output `keys` = `["nama","umur","jurusan","alamat","hobi"]`
- [ ] Output `values` berisi semua nilai (termasuk object `alamat` dan array
      `hobi` yang tercetak sebagai `[object Object]` dan array)
- [ ] Loop print 5 baris `key: value`
- [ ] `Object.keys(mahasiswa).length` = `5`

---

## Bagian G: Computed Property Names

### Penjelasan

**Computed property names** memungkinkan key object dibuat dari **ekspresi**
(variabel, function call, template literal). Pakai **bracket `[]`** saat
mendefinisikan key.

```javascript
const field = "email";
const user = { [field]: "andi@email.com" };
// { email: "andi@email.com" }

const prefix = "user";
const id = 42;
const obj = { [`${prefix}_${id}`]: "data" };
// { user_42: "data" }
```

Ini berguna untuk **dynamic form handling**, **API response mapping**, atau
saat key baru hanya diketahui di **runtime**.

### Wajib Ada di Kode Kamu

- [ ] Single dynamic key: `const key = "email"; const obj = { [key]: "andi@email.com" }`
- [ ] Multiple dynamic keys: gabungkan beberapa variabel jadi object
- [ ] Computed + template literal: `const id = 1; const obj = { [`user_${id}`]: "Andi" }`
- [ ] Pakai di loop: buat object `nilaiMap` dari array `["Andi", "Budi"]` →
      `{ Andi: 100, Budi: 95 }`

### Cara Mengetik dari 0

1. Buat variabel `const field = "nama";` lalu `const user = { [field]: "Andi" };`
2. Print `user` — harus `{ nama: "Andi" }`
3. Buat `id = 1`, lalu `const userObj = { [\`user_${id}\`]: "data" };`
4. Loop array nama, build object `nilaiMap` dengan computed key

### Verifikasi

- [ ] `user` = `{ nama: "Andi" }` (key jadi "nama", bukan "field")
- [ ] `userObj` = `{ user_1: "data" }`
- [ ] `nilaiMap` = `{ Andi: 100, Budi: 95 }` (key dari array)

---

## Bagian H: Mini Project — Student Report

### Penjelasan

Sekarang gabungkan semua yang sudah dipelajari untuk membuat **laporan
mahasiswa** yang informatif. Data: 4 mahasiswa dengan `nama`, `jurusan`,
`nilai`. Tujuannya:

1. Tampilkan **semua mahasiswa** dengan format rapi (pakai `map` + template
   literal + destructuring)
2. Filter yang **lulus** (nilai >= 70) (pakai `filter` + destructuring parameter)
3. Cari **mahasiswa dengan nilai tertinggi** (pakai `reduce` + spread)
4. Buat **laporan per jurusan** (pakai `reduce` + computed property)

### Wajib Ada di Kode Kamu

- [ ] Array `mahasiswas` dengan **4 object**: masing-masing punya `nama`,
      `jurusan`, `nilai`
- [ ] **List semua** (pakai `map` + destructuring): print
      `"1. Andi (Informatika) - 85"`
- [ ] **Filter yang lulus** (nilai >= 70) — tampilkan array nama saja
- [ ] **Cari nilai tertinggi** (pakai `reduce`) — print
      `"Mahasiswa terbaik: Citra dengan nilai 92"`
- [ ] **Laporan per jurusan** (pakai `reduce` + computed property) — object
      `{ Informatika: 2, SistemInformasi: 1, TeknikElektro: 1 }`

### Cara Mengetik dari 0

1. Di paling bawah file, buat `const mahasiswas = [ ... ]` dengan 4 object
2. Pakai `mahasiswas.map(({ nama, jurusan, nilai }, i) => ...)` untuk list
3. Pakai `mahasiswas.filter(({ nilai }) => nilai >= 70)` lalu map nama
4. Pakai `mahasiswas.reduce((best, curr) => curr.nilai > best.nilai ? curr :
   best)` untuk cari max
5. Pakai `reduce` untuk group by `jurusan`:
   ```javascript
   mahasiswas.reduce((acc, { jurusan }) => {
     acc[jurusan] = (acc[jurusan] || 0) + 1;
     return acc;
   }, {});
   ```

### Verifikasi

- [ ] List menampilkan 4 baris bernomor urut
- [ ] Filter lulus menampilkan nama dengan nilai >= 70
- [ ] Max nilai menampilkan 1 mahasiswa dengan nilai tertinggi
- [ ] Laporan per jurusan: jumlah mahasiswa sesuai data
- [ ] Tidak ada `undefined` di output
- [ ] Object asli `mahasiswas` TIDAK termutasi (cek dengan `console.log`
      sebelum dan sesudah operasi)

---

## Tabel Ringkasan: Kapan Pakai Apa

| Kebutuhan                                  | Sintaks                                    |
| ------------------------------------------ | ------------------------------------------ |
| Akses property ringkas                     | `obj.key`                                  |
| Akses property dengan variabel/dinamis     | `obj["key"]` atau `obj[variabel]`          |
| Ekstrak banyak property                    | `const { a, b } = obj`                     |
| Ganti nama variabel saat ekstrak           | `const { nama: namaMhs } = obj`            |
| Default value saat property hilang         | `const { ipk = 0 } = obj`                  |
| Destructure object nested                  | `const { alamat: { kota } } = obj`         |
| Destructure array                          | `const [a, b] = arr`                       |
| Skip elemen array                          | `const [a, , c] = arr`                     |
| Sisakan sisanya jadi array                 | `const [head, ...tail] = arr`              |
| Clone object (shallow)                     | `{ ...obj }`                               |
| Clone + ubah satu property                 | `{ ...obj, key: newValue }`                |
| Merge 2 array                              | `[...arr1, ...arr2]`                       |
| Akses property yang mungkin `undefined`    | `obj?.prop` atau `obj?.arr?.[0]`           |
| Default kalau `null`/`undefined`           | `value ?? default`                         |
| Ambil semua key                            | `Object.keys(obj)`                         |
| Ambil semua value                          | `Object.values(obj)`                       |
| Ambil pasangan [key, value]                | `Object.entries(obj)`                      |
| Key dinamis dari variabel                  | `{ [variabel]: value }`                    |

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 07, cek semua ini:

- [ ] **File bisa dijalankan**: `node 06-object-destructuring.js` tanpa error
- [ ] **Object literal & access** (Bagian A): 5 `console.log` menampilkan 5
      nilai benar (dot, bracket, nested, array index)
- [ ] **Destructuring object** (Bagian B): alias, default, nested, dan function
      parameter semua jalan
- [ ] **Destructuring array** (Bagian C): skip, rest, dan default jalan
- [ ] **Spread operator** (Bagian D): clone object/array, merge, dan
      `Math.max(...)` jalan benar
- [ ] **Optional chaining & nullish** (Bagian E): tidak ada `TypeError`, dan
      demonstrasi `??` vs `||` menunjukkan beda output
- [ ] **Object methods** (Bagian F): `keys`/`values`/`entries` menghasilkan
      array benar, loop print semua entry
- [ ] **Computed property names** (Bagian G): key dari variabel, template
      literal, dan loop jalan
- [ ] **Mini project** (Bagian H): list, filter, max, group by semua
      menampilkan output benar
- [ ] **Object asli TIDAK termutasi**: `mahasiswa.umur` masih `21` setelah
      `mhsBaru` dibuat dengan override
- [ ] **Tidak ada `undefined` nyangkut** di output yang seharusnya punya nilai

---

## Cara Submit

1. Simpan sebagai `06-object-destructuring.js` di folder `soal/`
2. Jalankan: `node 06-object-destructuring.js`
3. Cek output console — pastikan semua `console.log` menampilkan nilai benar
4. Coba mutate `mahasiswa.umur = 99` lalu print `mhsBaru.umur` — pastikan
   `mhsBaru` TIDAK ikut berubah (karena hasil spread adalah clone)
5. Hapus kode eksperimen, simpan versi final

---

## Catatan untuk Pemula

> **Destructuring HANYA mengekstrak nilai — object asli TIDAK berubah.**
> `const { nama } = mahasiswa` membuat variabel `nama` baru, bukan mengubah
> property `nama` di `mahasiswa`. Kalau kamu mau "mengupdate" object, kamu
> harus **assign kembali** atau pakai **spread** untuk membuat object baru.

> **Spread `{ ...obj }` membuat SHALLOW COPY.** Object nested (seperti
> `mahasiswa.alamat`) masih **referensi yang sama** dengan original. Kalau
> kamu mutate `mhsClone.alamat.kota = "Bandung"`, `mahasiswa.alamat.kota` juga
> ikut berubah. Untuk deep copy yang benar-benar independen, pakai
> `structuredClone(mahasiswa)` (Node.js 17+).

> **`??` vs `||` bukan hal yang sama.** `??` trigger HANYA pada `null` dan
> `undefined`. `||` trigger pada semua **falsy** (termasuk `0`, `""`, `false`,
> `NaN`). Ini penting kalau kamu handle nilai `0` (misalnya nilai mahasiswa
> yang nol) — `nilai || "Tidak ada"` akan menampilkan "Tidak ada", tapi
> `nilai ?? "Tidak ada"` akan menampilkan `0`.

> **Jebakan umum: pakai `obj.const` / `obj.let` sebagai key.** `const` dan
> `let` adalah keyword, bukan identifier biasa. Kalau kamu mau object dengan
> key `const`, kamu **tidak bisa** pakai dot notation: `obj.const` (syntax
> error). Pakai bracket notation: `obj["const"]`. Hal yang sama untuk keyword
> lain seperti `class`, `return`, `if`, dst.

> **Tips urutan kerja**: (1) buat object `mahasiswa` dulu, (2) test akses
> dengan dot/bracket, (3) baru coba destructuring, (4) lanjut ke spread &
> optional chaining, (5) terakhir baru bikin mini project. Pola "bangun
> bertahap + test tiap langkah" berlaku di semua program, bukan cuma latihan
> ini.

<!-- markdownlint-enable MD024 MD028 -->

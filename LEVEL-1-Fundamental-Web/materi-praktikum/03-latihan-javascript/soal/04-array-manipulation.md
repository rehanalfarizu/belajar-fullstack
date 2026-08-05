<!-- markdownlint-disable MD024 MD028 -->

# SOAL 04 — Array Manipulation

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Mengubah data array menggunakan method `push` dan `pop` (CRUD dasar) tanpa memutasi array asli
- Menggunakan `map` untuk transformasi 1-to-1 dari satu array ke array baru
- Menggunakan `filter` untuk menyaring elemen yang memenuhi kondisi tertentu
- Menggunakan `find` untuk mencari elemen pertama yang cocok (atau `undefined`)
- Menggunakan `reduce` untuk mengakumulasikan elemen array menjadi satu nilai
- Menggunakan `some` dan `every` untuk pengecekan boolean (ada / semua)
- Mengurutkan array dengan `sort` TANPA memutasi array asli (pakai spread)
- Menggabungkan beberapa method (chaining) untuk query data yang kompleks

**Topik:** array methods (`push`, `pop`, `map`, `filter`, `find`, `reduce`, `some`, `every`, `sort`)

**Referensi utama:**

- [MDN: Array](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Array.prototype.map()](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [MDN: Array.prototype.sort()](https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

**Difficulty:** Pemula-Menengah • **Estimasi:** 45-60 menit

---

## Briefing

Kamu akan bekerja dengan data **6 mahasiswa**, masing-masing punya `nama` dan
`nilai`. Bayangkan ini data yang biasa kamu temui di sistem akademik: siapa
yang lulus, siapa yang remidi, siapa yang cumlaude, berapa rata-rata kelas,
siapa ranking teratas.

Di JavaScript modern, kamu **jarang** pakai `for` loop manual untuk menjawab
pertanyaan seperti ini. Ada **array methods** yang lebih ringkas dan ekspresif:
`map`, `filter`, `reduce`, `find`, `some`, `every`, `sort`.

Tujuh method ini adalah **senjata utama** programmer JavaScript modern. Hampir
semua interview dan project nyata akan menguji kemampuan kamu menggunakannya.
Sekali kamu paham polanya, kamu bisa baca kode React, Node.js, atau library
lain dengan lebih percaya diri.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca penjelasan** — pahami method-nya dan bedanya dengan method lain
2. **Ketik dari 0** — buka `code/04-array-manipulation.js`, cari `TODO(human)`,
   lalu ketik sendiri (JANGAN copy-paste)
3. **Verifikasi** — cek hasilmu dengan panduan verifikasi

Kamu **tidak akan diberi kode jadi**. Tujuannya agar kamu terbiasa **berpikir
sebelum mengetik** dan **membiasakan diri dengan sintaks JavaScript modern**.
Ini skill yang akan kamu pakai hampir di setiap project JavaScript.

> Tips: kalau stuck di satu method, **jangan loncat ke method lain**. Pahami
> dulu `map`, jalankan, baru lanjut ke `filter`. Membangun intuisi butuh
> urutan.

---

## Bagian A: Data Awal dan `push` / `pop` (CRUD Dasar)

### Penjelasan

Sebelum pakai method-method canggih, kita butuh **data** dulu. Di sini kita
punya array berisi 6 object mahasiswa. Setiap object punya dua property: `nama`
(string) dan `nilai` (number).

Lalu ada dua method paling dasar untuk **mutasi array**: `push` (tambah ke
akhir) dan `pop` (hapus dari akhir).

```javascript
// Tambah ke akhir
const buah = ["apel", "jeruk"];
buah.push("mangga");
console.log(buah); // ["apel", "jeruk", "mangga"]

// Hapus dari akhir
const itemTerakhir = buah.pop();
console.log(itemTerakhir); // "mangga"
console.log(buah); // ["apel", "jeruk"]
```

Penting: `push` dan `pop` **memutasi array asli**. Kalau kamu nggak mau data
aslimu berubah, simpan ke **variabel baru** (jangan langsung `mahasiswa.push(...)`
kalau mau data asli tetap utuh).

### Wajib Ada di Kode Kamu

- Deklarasi `const mahasiswa` berisi array 6 object
- Tiap object punya property `nama` (string) dan `nilai` (number)
- Nilai: 85, 72, 90, 65, 78, 95 (untuk nama: Andi, Budi, Citra, Dewi, Eko, Fira)
- Pemanggilan `push` untuk tambah mahasiswa baru
- Pemanggilan `pop` untuk hapus mahasiswa terakhir
- Simpan hasil push & pop ke variabel baru, BUKAN langsung `mahasiswa.push(...)`

### Cara Mengetik dari 0

1. Buka `code/04-array-manipulation.js` di VS Code
2. Cari komentar `TODO A1: data mahasiswa`
3. Ketik deklarasi array dengan 6 object literal:
   ```javascript
   const mahasiswa = [
     { nama: "Andi",  nilai: 85 },
     { nama: "Budi",  nilai: 72 },
     { nama: "Citra", nilai: 90 },
     { nama: "Dewi",  nilai: 65 },
     { nama: "Eko",   nilai: 78 },
     { nama: "Fira",  nilai: 95 },
   ];
   ```
4. Untuk push, simpan hasil ke variabel: `const tambahMahasiswa = [...mahasiswa, { nama: "Gita", nilai: 88 }];`
   (perhatikan: pakai spread, bukan `push` langsung — ini cara **non-mutasi**)
5. Untuk pop, ambil semua kecuali terakhir: `const kurangMahasiswa = mahasiswa.slice(0, -1);`
6. Save dan jalankan

### Yang Terjadi di Kode

- `mahasiswa` punya panjang 6 dan tetap 6 (kita tidak mutasi array asli)
- `tambahMahasiswa` punya panjang 7 (ada tambahan "Gita")
- `kurangMahasiswa` punya panjang 5 (Fira hilang)

Spread operator (`...`) membuat **copy** array, jadi array asli tidak berubah.
Ini best practice di JavaScript modern: **hindari mutasi langsung** kalau
bisa.

### Verifikasi

- [ ] `mahasiswa.length === 6` setelah semua operasi
- [ ] `tambahMahasiswa.length === 7`
- [ ] `kurangMahasiswa.length === 5`
- [ ] `mahasiswa`[0].nama === "Andi" (data asli tidak berubah)
- [ ] `kurangMahasiswa`[5] adalah "Eko" (Fira yang hilang, bukan yang awal)

---

## Bagian B: `map` — Transformasi 1-to-1

### Penjelasan

`map` adalah method yang **mengubah setiap elemen** array menjadi sesuatu yang
lain. Panjangnya **SAMA** dengan array aslinya (1-to-1 mapping).

```javascript
const angka = [1, 2, 3];
const kaliDua = angka.map(n => n * 2);
// kaliDua = [2, 4, 6]
```

Format umumnya: `array.map((elemen, index) => elemenBaru)`. Callback function
dipanggil sekali untuk setiap elemen.

Untuk data mahasiswa, kita bisa pakai `map` untuk:

- Mengambil semua nama ke array string
- Mengalikan semua nilai dengan 2
- Membuat array object baru dengan struktur berbeda

### Wajib Ada di Kode Kamu

- `map` untuk ambil semua nama → simpan di `namaList`
- `map` untuk kalikan semua nilai dengan 2 → simpan di `nilaiDouble`
- `map` untuk buat array object `{ nama, nilaiDouble }` → simpan di `mahasiswaNilaiDouble`
- `console.log(namaList)` dan seterusnya untuk verifikasi

### Cara Mengetik dari 0

1. Cari komentar `TODO B: map -- Transformasi`
2. Untuk `namaList`, ketik:
   `const namaList = mahasiswa.map(m => m.nama);`
3. Untuk `nilaiDouble`, kamu bisa `map` ke `mahasiswa.map(m => m.nilai * 2)`
   atau kalau mau object utuh: `mahasiswa.map(m => ({ nama: m.nama, nilai: m.nilai * 2 }))`
4. Untuk `mahasiswaNilaiDouble`, pakai pola object di atas
5. Save, jalankan, cek output di terminal

### Yang Terjadi di Kode

Misal `mahasiswa = [{nama: "Andi", nilai: 85}, ...]`:

- `mahasiswa.map(m => m.nama)` → `["Andi", "Budi", "Citra", "Dewi", "Eko", "Fira"]`
- `mahasiswa.map(m => m.nilai * 2)` → `[170, 144, 180, 130, 156, 190]`
- `mahasiswa.map(m => ({nama: m.nama, nilaiDouble: m.nilai * 2}))` → array of object baru

> **Trik sintaks**: kalau callback `map` mengembalikan object, kamu HARUS
> bungkus dengan `({ ... })`. Tanpa `()`, JavaScript mengira itu adalah
> block function biasa, bukan object.

### Verifikasi

- [ ] `namaList` adalah array berisi 6 string nama
- [ ] `nilaiDouble[0] === 170` (85 × 2)
- [ ] `mahasiswaNilaiDouble[0]` adalah `{ nama: "Andi", nilaiDouble: 170 }`
- [ ] Semua array dari `map` punya panjang **6** (sama seperti `mahasiswa`)
- [ ] `mahasiswa` asli TIDAK berubah setelah semua `map` (cek `mahasiswa[0].nilai === 85`)

---

## Bagian C: `filter` — Penyaringan Elemen

### Penjelasan

`filter` memilih elemen yang **memenuhi kondisi**. Berbeda dengan `map`, panjang
array hasil bisa **lebih kecil** (atau sama), tidak pernah lebih besar.

```javascript
const angka = [1, 2, 3, 4, 5];
const genap = angka.filter(n => n % 2 === 0);
// genap = [2, 4]
```

Format: `array.filter((elemen, index) => boolean)`. Kalau callback return
`true`, elemen lolos. Kalau `false`, elemen dibuang.

Untuk mahasiswa, kita bisa filter:

- Lulus (nilai >= 75)
- Remidi (nilai < 60)
- Cumlaude (nilai >= 90)

### Wajib Ada di Kode Kamu

- `filter` lulus → `const lulus = ...` (nilai >= 75)
- `filter` remidi → `const remidi = ...` (nilai < 60)
- `filter` cumlaude → `const cumlaude = ...` (nilai >= 90)
- `console.log` masing-masing untuk verifikasi
- Cek: untuk data ini, `remidi` harus **kosong** karena tidak ada yang < 60

### Cara Mengetik dari 0

1. Cari komentar `TODO C: filter -- Penyaringan`
2. Ketik `const lulus = mahasiswa.filter(m => m.nilai >= 75);`
3. Di bawahnya, `const remidi = mahasiswa.filter(m => m.nilai < 60);`
4. Di bawahnya, `const cumlaude = mahasiswa.filter(m => m.nilai >= 90);`
5. Save, jalankan

### Yang Terjadi di Kode

Untuk data kita (nilai 85, 72, 90, 65, 78, 95):

- `lulus` = `[{nama: "Andi", nilai: 85}, {nama: "Citra", nilai: 90}, {nama: "Eko", nilai: 78}, {nama: "Fira", nilai: 95}]` (4 orang)
- `remidi` = `[]` (kosong, tidak ada yang < 60)
- `cumlaude` = `[{nama: "Citra", nilai: 90}, {nama: "Fira", nilai: 95}]` (2 orang)

> **Detail nilai 65**: Dewi dapat 65, dia tidak remidi (>= 60 = lulus minimal)
> tapi juga tidak lulus bagus (< 75). Dewi masuk kategori "tidak lulus, tidak
> remidi". Untuk soal ini cukup pakai threshold 60 (remidi) dan 75 (lulus).

### Verifikasi

- [ ] `lulus.length === 4` (Andi, Citra, Eko, Fira)
- [ ] `lulus[0].nama === "Andi"`
- [ ] `remidi.length === 0` (data kita tidak ada yang remidi)
- [ ] `cumlaude.length === 2` (Citra, Fira)
- [ ] `mahasiswa` asli TIDAK berubah (cek `mahasiswa.length === 6`)

---

## Bagian D: `find` — Cari Elemen Pertama

### Penjelasan

`find` mencari **satu elemen pertama** yang cocok. Beda dengan `filter` yang
mengembalikan array, `find` mengembalikan **elemen tunggal** (atau `undefined`
kalau tidak ketemu).

```javascript
const angka = [5, 12, 8, 130, 44];
const ditemukan = angka.find(n => n > 10);
// ditemukan = 12 (yang pertama kali ketemu)
```

Format: `array.find((elemen) => boolean)`. Begitu ketemu yang cocok, dia
**langsung berhenti** — tidak lanjut cek yang lain.

### Wajib Ada di Kode Kamu

- `find` mahasiswa bernama "Eko" → simpan di `cariEko`
- `find` mahasiswa pertama dengan nilai > 80 → simpan di `nilaiDiAtas80`
- `find` mahasiswa bernama "Zara" (yang TIDAK ADA) → simpan di `cariZara`
- `console.log` masing-masing untuk lihat hasilnya (termasuk `undefined`)

### Cara Mengetik dari 0

1. Cari komentar `TODO D: find -- Pencarian`
2. Ketik `const cariEko = mahasiswa.find(m => m.nama === "Eko");`
3. Ketik `const nilaiDiAtas80 = mahasiswa.find(m => m.nilai > 80);`
4. Ketik `const cariZara = mahasiswa.find(m => m.nama === "Zara");`
5. Save, jalankan

### Yang Terjadi di Kode

Untuk data kita:

- `cariEko` = `{nama: "Eko", nilai: 78}` (langsung ketemu di indeks 4)
- `nilaiDiAtas80` = `{nama: "Andi", nilai: 85}` (Andi yang pertama, walaupun Citra 90, Fira 95 lebih besar)
- `cariZara` = `undefined` (tidak ada di array)

> **Penting**: kalau yang kamu cari **tidak ada**, `find` return `undefined`.
> Selalu siapin fallback kalau kamu mau pakai hasilnya. Misal:
> `cariZara ? cariZara.nama : "Tidak ditemukan"`.

### Verifikasi

- [ ] `cariEko.nama === "Eko"`
- [ ] `cariEko.nilai === 78`
- [ ] `nilaiDiAtas80.nama === "Andi"` (yang pertama, BUKAN Citra)
- [ ] `cariZara === undefined`
- [ ] `cariZara` TIDAK menyebabkan error (coba `console.log(cariZara.nama)` — harus hati-hati!)

---

## Bagian E: `reduce` — Akumulasi ke Satu Nilai

### Penjelasan

`reduce` adalah method yang paling "aneh" tapi paling powerful. Dia
**mengakumulasikan** seluruh elemen array menjadi **satu nilai tunggal**.

```javascript
const angka = [1, 2, 3, 4];
const total = angka.reduce((acc, n) => acc + n, 0);
// total = 10
```

Format: `array.reduce((akumulator, elemen) => akumulatorBaru, nilaiAwal)`.

- `akumulator` (biasa disingkat `acc`): nilai yang "diteruskan" dari iterasi
  sebelumnya
- `elemen`: elemen array yang sedang diproses
- `nilaiAwal`: nilai `acc` di awal (WAJIB diberikan untuk konsistensi!)

Untuk mahasiswa, kita bisa hitung:

- Total semua nilai
- Rata-rata (total / jumlah)
- Total nilai yang lulus saja

### Wajib Ada di Kode Kamu

- `reduce` total semua nilai → `const totalNilai = ...`
- `reduce` rata-rata → `const rataRata = totalNilai / mahasiswa.length`
- `reduce` total nilai yang lulus saja (nilai >= 75) → `const totalLulus = ...`
- `console.log` semua hasil
- Selalu sertakan `0` sebagai nilai awal (argumen kedua `reduce`)

### Cara Mengetik dari 0

1. Cari komentar `TODO E: reduce -- Akumulasi`
2. Ketik `const totalNilai = mahasiswa.reduce((sum, m) => sum + m.nilai, 0);`
3. Ketik `const rataRata = totalNilai / mahasiswa.length;`
4. Untuk total lulus, ada 2 cara:
   - **Cara 1**: filter dulu, baru reduce:
     `const totalLulus = mahasiswa.filter(m => m.nilai >= 75).reduce((sum, m) => sum + m.nilai, 0);`
   - **Cara 2**: reduce langsung dengan kondisi:
     `const totalLulus = mahasiswa.reduce((sum, m) => m.nilai >= 75 ? sum + m.nilai : sum, 0);`
5. Save, jalankan

### Yang Terjadi di Kode

Untuk data kita (85, 72, 90, 65, 78, 95):

- `totalNilai` = 85 + 72 + 90 + 65 + 78 + 95 = **485**
- `rataRata` = 485 / 6 = **80.833...** (akan jadi `80.83333333333333` di console)
- `totalLulus` = 85 + 90 + 78 + 95 = **348**

> **Kenapa nilai awal `0` itu penting?** Tanpa nilai awal, `reduce` pakai
> elemen pertama sebagai nilai awal. Untuk `sum + m.nilai`, ini TIDAK masalah
> (karena `elemen[0] + 0` = `elemen[0]`). Tapi untuk operasi yang butuh
> nilai awal spesifik (misal `{}` untuk object, `[]` untuk array), SELALU
> berikan nilai awal secara eksplisit. Best practice: selalu tulis.

### Verifikasi

- [ ] `totalNilai === 485`
- [ ] `rataRata` mendekati `80.83` (boleh ada desimal panjang)
- [ ] `totalLulus === 348`
- [ ] Tidak ada error "Reduce of empty array with no initial value"
- [ ] Selalu ada `, 0` di akhir panggilan `reduce`

---

## Bagian F: `some` dan `every` — Pengecekan Boolean

### Penjelasan

Dua method ini sama-sama mengembalikan **boolean** (`true` atau `false`):

- `some`: apakah **ADA** minimal satu elemen yang cocok?
- `every`: apakah **SEMUA** elemen cocok?

```javascript
const angka = [1, 2, 3, 4];
const adaYangGenap = angka.some(n => n % 2 === 0);    // true
const semuaGenap = angka.every(n => n % 2 === 0);     // false
```

Bedanya dengan `filter`/`find`:

- `filter` → return array (bisa kosong, bisa banyak)
- `find` → return elemen pertama atau `undefined`
- `some` → return `true`/`false`
- `every` → return `true`/`false`

### Wajib Ada di Kode Kamu

- `some` untuk cek apakah ada yang remidi (nilai < 60) → `const adaRemidi = ...`
- `some` untuk cek apakah ada yang nilai sempurna (nilai === 100) → `const adaSempurna = ...`
- `every` untuk cek apakah semua lulus (nilai >= 60) → `const semuaLulus = ...`
- `every` untuk cek apakah semua di atas rata-rata → `const semuaDiAtasRata = ...`
- `console.log` semua boolean

### Cara Mengetik dari 0

1. Cari komentar `TODO F: some & every`
2. Ketik `const adaRemidi = mahasiswa.some(m => m.nilai < 60);`
3. Ketik `const adaSempurna = mahasiswa.some(m => m.nilai === 100);`
4. Ketik `const semuaLulus = mahasiswa.every(m => m.nilai >= 60);`
5. Untuk "semua di atas rata-rata", kamu butuh `rataRata` dari Bagian E:
   `const semuaDiAtasRata = mahasiswa.every(m => m.nilai > rataRata);`
6. Save, jalankan

### Yang Terjadi di Kode

Untuk data kita:

- `adaRemidi` = `false` (tidak ada nilai < 60)
- `adaSempurna` = `false` (nilai tertinggi kita 95, bukan 100)
- `semuaLulus` = `true` (semua nilai >= 60, Dewi 65 yang terendah)
- `semuaDiAtasRata` = `false` (Budi 72 dan Dewi 65 di bawah rata-rata 80.83)

> **Detail `every`**: `every` short-circuit — begitu ketemu satu yang `false`,
> dia langsung return `false` tanpa lanjut cek. Ini lebih efisien dari
> `filter().length === mahasiswa.length` untuk data besar.

### Verifikasi

- [ ] `adaRemidi === false`
- [ ] `adaSempurna === false`
- [ ] `semuaLulus === true`
- [ ] `semuaDiAtasRata === false`
- [ ] Semua hasil adalah boolean (cek `typeof adaRemidi === "boolean"`)

---

## Bagian G: `sort` — Pengurutan

### Penjelasan

`sort` mengurutkan array **di tempat** (in-place). Ini penting: `sort`
**memutasi array asli**, beda dengan `map`/`filter` yang return array baru.

```javascript
const angka = [3, 1, 4, 1, 5];
const terurut = [...angka].sort((a, b) => a - b);
// terurut = [1, 1, 3, 4, 5]
// angka = [3, 1, 4, 1, 5] (TIDAK BERUBAH, karena kita sort dari copy)
```

> **Wajib**: sebelum `sort`, selalu clone dengan spread `[...arr]`. Kalau
> kamu sort `mahasiswa` langsung, urutan data aslimu akan kacau dan method
> lain yang kamu panggil sebelumnya akan terpengaruh.

Untuk mahasiswa, kita urutkan:

- Berdasarkan nama (A-Z)
- Berdasarkan nilai (descending — tertinggi di atas)

### Wajib Ada di Kode Kamu

- `sort` berdasarkan nama A-Z → `const urutNama = ...` (pakai `localeCompare` untuk string)
- `sort` berdasarkan nilai descending → `const urutNilai = ...`
- **WAJIB pakai `[...mahasiswa]`** sebelum sort (non-mutasi)
- `console.log` untuk verifikasi

### Cara Mengetik dari 0

1. Cari komentar `TODO G: sort -- Pengurutan`
2. Untuk urut nama, ketik:
   `const urutNama = [...mahasiswa].sort((a, b) => a.nama.localeCompare(b.nama));`
3. Untuk urut nilai descending, ketik:
   `const urutNilai = [...mahasiswa].sort((a, b) => b.nilai - a.nilai);`
4. Save, jalankan
5. **PENTING**: cek `mahasiswa[0].nama` setelah sort — harus tetap "Andi" (artinya array asli tidak berubah)

### Yang Terjadi di Kode

Untuk data kita:

- `urutNama` = `[{Andi, 85}, {Budi, 72}, {Citra, 90}, {Dewi, 65}, {Eko, 78}, {Fira, 95}]` (sudah kebetulan urut)
- `urutNilai` = `[{Fira, 95}, {Citra, 90}, {Andi, 85}, {Eko, 78}, {Budi, 72}, {Dewi, 65}]`

Perhatikan: pakai `b.nilai - a.nilai` untuk **descending** (besar dulu).
Kalau pakai `a.nilai - b.nilai` itu **ascending** (kecil dulu).

> **Trik `localeCompare`**: untuk string nama, jangan pakai `<` atau `>`
> langsung. Pakai `localeCompare` karena dia handle huruf besar/kecil,
> aksen, dan karakter khusus dengan benar. `a.nama < b.nama` bisa bermasalah
> untuk nama dengan aksen atau huruf non-ASCII.

### Verifikasi

- [ ] `mahasiswa[0].nama === "Andi"` setelah semua sort (asli tidak berubah)
- [ ] `urutNama[0].nama === "Andi"` (A duluan)
- [ ] `urutNama[5].nama === "Fira"` (F terakhir)
- [ ] `urutNilai[0].nama === "Fira"` (nilai 95 tertinggi)
- [ ] `urutNilai[5].nama === "Dewi"` (nilai 65 terendah)
- [ ] Selalu pakai `[...mahasiswa]` di depan `.sort(...)`

---

## Bagian H: Chaining — Gabungkan Beberapa Method

### Penjelasan

Kekuatan sesungguhnya dari array methods adalah **chaining** — kamu bisa
gabungkan beberapa method dalam satu ekspresi.

```javascript
// Ambil nama mahasiswa yang lulus, urutkan A-Z
const namaLulus = mahasiswa
  .filter(m => m.nilai >= 75)
  .map(m => m.nama)
  .sort();
```

Yang penting: tiap method (kecuali `sort` murni) return array baru, jadi
bisa langsung dipakai untuk method berikutnya. `sort` dengan spread aman
untuk chaining karena return array baru.

Untuk mahasiswa, kita coba dua chaining:

- Filter lulus → map nama → "siapa saja yang lulus"
- Sort descending → map nama → "3 orang teratas"

### Wajib Ada di Kode Kamu

- Chaining: `filter` lulus → `map` nama → simpan di `namaLulusSorted`
- Chaining: sort descending → ambil 3 teratas → `map` nama → simpan di `top3Nama`
- `console.log` untuk verifikasi
- Format chaining yang rapi (tiap method di baris baru)

### Cara Mengetik dari 0

1. Cari komentar `TODO H: Chaining`
2. Ketik:
   ```javascript
   const namaLulusSorted = mahasiswa
     .filter(m => m.nilai >= 75)
     .map(m => m.nama)
     .sort();
   ```
3. Untuk top 3, kamu bisa pakai `slice(0, 3)` setelah sort:
   ```javascript
   const top3Nama = [...mahasiswa]
     .sort((a, b) => b.nilai - a.nilai)
     .slice(0, 3)
     .map(m => m.nama);
   ```
4. Save, jalankan

### Yang Terjadi di Kode

Untuk data kita:

- `namaLulusSorted` = `["Andi", "Citra", "Eko", "Fira"]` (4 yang lulus, diurutkan A-Z)
- `top3Nama` = `["Fira", "Citra", "Andi"]` (3 nilai tertinggi, Fira 95, Citra 90, Andi 85)

> **Tentang `slice(0, 3)`**: `slice` itu non-mutasi — dia return array baru
> yang merupakan "potongan" dari array asli. `slice(0, 3)` artinya "ambil
> 3 elemen pertama". Ini juga non-mutasi, jadi aman untuk chaining.

> **Format chaining**: tiap method di baris baru (dengan indent 2 spasi) bikin
> kode lebih mudah dibaca. Boleh satu baris, tapi kalau chaining panjang,
> multi-baris lebih jelas.

### Verifikasi

- [ ] `namaLulusSorted` = `["Andi", "Citra", "Eko", "Fira"]`
- [ ] `top3Nama` = `["Fira", "Citra", "Andi"]`
- [ ] `mahasiswa` asli tidak berubah
- [ ] Format chaining mudah dibaca (tiap method di baris baru, indent konsisten)

---

## Ringkasan

**Method Return Value:**

| Method    | Return                              | Mutasi? |
| --------- | ----------------------------------- | ------- |
| `push`    | panjang array baru (number)         | YA      |
| `pop`     | elemen yang dihapus / undefined     | YA      |
| `map`     | array baru (panjang SAMA)           | TIDAK   |
| `filter`  | array baru (panjang <= atau kosong) | TIDAK   |
| `find`    | elemen pertama yang cocok / undefined | TIDAK |
| `reduce`  | nilai akumulasi tunggal             | TIDAK   |
| `some`    | `true` / `false`                    | TIDAK   |
| `every`   | `true` / `false`                    | TIDAK   |
| `sort`    | array terurut (sorted in-place)     | YA      |

**Kapan Pakai Apa:**

| Kebutuhan                                       | Pakai              |
| ----------------------------------------------- | ------------------ |
| Transformasi setiap elemen (panjang sama)       | `map`              |
| Ambil subset yang memenuhi kondisi              | `filter`           |
| Cari satu elemen spesifik                       | `find`             |
| Hitung total / rata-rata / aggregate            | `reduce`           |
| Cek "apakah ada yang...?"                       | `some`             |
| Cek "apakah semua...?"                          | `every`            |
| Urutkan data                                    | `[...arr].sort()`  |

**Pola Wajib:**

- Selalu `[...arr]` sebelum `sort` (non-mutasi)
- Selalu berikan nilai awal ke `reduce` (`, 0` atau `, []` atau `, {}`)
- Pakai `localeCompare` untuk sort string, bukan `<` / `>`
- Return `undefined` dari `find` kalau tidak ketemu — selalu cek sebelum akses property

**Chaining Aman:**

- `map` → `filter` → `map` → `sort` (semua return array baru)
- `filter` → `reduce` (kurangi ke satu nilai di akhir)
- `[...arr]` → `sort` → `slice` → `map` (semua aman, non-mutasi)

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 05, cek semua ini:

- [ ] `node 04-array-manipulation.js` jalan tanpa error syntax
- [ ] **Data awal**: `mahasiswa` punya 6 object dengan property `nama` dan `nilai`
- [ ] **Bagian A (push & pop)**: tidak ada mutasi langsung, selalu simpan ke variabel baru
- [ ] **Bagian B (map)**: `namaList` berisi 6 string, `nilaiDouble[0] === 170`
- [ ] **Bagian C (filter)**: `lulus.length === 4`, `remidi.length === 0`, `cumlaude.length === 2`
- [ ] **Bagian D (find)**: `cariEko.nama === "Eko"`, `nilaiDiAtas80.nama === "Andi"`, `cariZara === undefined`
- [ ] **Bagian E (reduce)**: `totalNilai === 485`, `totalLulus === 348`
- [ ] **Bagian F (some/every)**: `adaRemidi === false`, `semuaLulus === true`, `semuaDiAtasRata === false`
- [ ] **Bagian G (sort)**: `urutNilai[0].nama === "Fira"`, `mahasiswa` asli tidak berubah
- [ ] **Bagian H (chaining)**: `namaLulusSorted = ["Andi", "Citra", "Eko", "Fira"]`, `top3Nama = ["Fira", "Citra", "Andi"]`
- [ ] **Tidak ada mutasi langsung** ke `mahasiswa` (cek pakai `console.log(mahasiswa)` di akhir harus tetap 6 elemen, urutan asli)
- [ ] **Semua variabel** ditampilkan dengan `console.log`
- [ ] **Tidak ada method chain** yang dimulai dengan `mahasiswa.sort(...)` langsung (harus `[...mahasiswa].sort(...)`)

---

## Cara Submit

1. Buka `code/04-array-manipulation.js` di VS Code
2. Isi semua `TODO(human)` (Bagian A sampai H) dengan kodemu sendiri
3. Save (Cmd+S / Ctrl+S)
4. Jalankan: `node 04-array-manipulation.js`
5. Cek semua output di terminal — pastikan tidak ada `undefined` yang tidak
   disengaja atau error
6. Verifikasi dengan checklist di atas
7. Kalau PASS, lanjut ke `soal/05-todo-list-cli.md`

---

## Catatan untuk Pemula

> **Bedanya `find` vs `filter`.** Keduanya cari elemen, tapi `find` return
> **satu elemen pertama** (atau `undefined`), sedangkan `filter` return
> **semua elemen yang cocok** dalam array. Pakai `find` kalau kamu mau satu,
> pakai `filter` kalau kamu mau banyak.

> **`some` vs `every` itu kebalikan satu sama lain (dalam konteks tertentu).**
> `!mahasiswa.some(m => m.nilai < 60)` (tidak ada yang remidi) = `mahasiswa.every(m => m.nilai >= 60)` (semua lulus). Tapi logika `every` lebih jelas dibaca.

> **`sort` MUTASI array asli.** Ini jebakan paling umum. Selalu `[...arr].sort(...)`
> kalau kamu tidak mau data asli berubah. Cek di soal kita: setelah semua
> sort, `mahasiswa[0].nama` HARUS tetap "Andi" — kalau bukan, berarti kamu
> sort array asli langsung.

> **`reduce` butuh nilai awal.** Selalu tulis argumen kedua: `, 0` untuk
> number, `, []` untuk array, `, {}` untuk object. Kalau tidak, `reduce`
> pakai elemen pertama sebagai nilai awal dan ini bisa bikin bug subtle.

> **Map + Filter combo itu senjata utama.** Hampir semua query data berbentuk
> `data.filter(...).map(...)` — saring dulu apa yang kamu mau, baru
> transformasi ke bentuk yang kamu butuh. Latihan 4 bagian terakhir
> (sort + map + slice) adalah pola yang akan kamu pakai SETIAP HARI di
> project JavaScript.

<!-- markdownlint-enable MD024 MD028 -->

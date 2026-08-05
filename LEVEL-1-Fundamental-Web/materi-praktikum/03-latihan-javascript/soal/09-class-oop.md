<!-- markdownlint-disable MD024 MD028 -->

# SOAL 09 — Class & OOP

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Membuat `class` di JavaScript sebagai blueprint untuk objek
- Menggunakan `constructor` untuk inisialisasi property dan `this` untuk menyimpan data di instance
- Menulis `method` di dalam class (instance method)
- Memahami `static` method &mdash; method yang dipanggil dari class, bukan dari instance
- Menggunakan `extends` untuk inheritance dan `super` untuk memanggil constructor / method parent
- Meng-override method parent di subclass (polymorphism sederhana)
- Memikirkan program dalam bentuk "objek" yang punya data + behavior

**Difficulty:** Menengah &bull; **Estimasi:** 60-90 menit

---

## Briefing

Bayangkan kamu membangun **Sistem Akademik mini** &mdash; ada `Person` (orang
umum), `Student` (mahasiswa, turunan dari Person), dan `Course` (mata kuliah
yang punya daftar mahasiswa).

Setiap class adalah **blueprint** (cetakan). Dari satu class `Student`, kamu
bisa bikin banyak objek `Student` (`andi`, `budi`, `citra`, dst) &mdash; tiap
objek punya data sendiri, tapi behavior-nya konsisten.

Tujuannya: kamu mulai berpikir **OOP** &mdash; "objek punya data (property) dan
bisa melakukan sesuatu (method)" &mdash; bukan cuma kumpulan function terpisah.

---

## Cara Kerja Latihan Ini

Untuk setiap bagian di bawah, alurnya:

1. **Baca Penjelasan** &mdash; pahami konsepnya
2. **Lihat Wajib Ada di Kode Kamu** &mdash; tahu persis yang harus muncul
3. **Ketik dari 0** &mdash; buka `code/09-class-oop.js`, cari `TODO(human)`,
   lalu ketik sendiri (JANGAN copy-paste dari contoh)
4. **Jalankan kode** &mdash; `node code/09-class-oop.js` di terminal
5. **Verifikasi** &mdash; cek dengan checklist

Kamu **tidak akan diberi kode jadi di soal**. Contoh di dalam soal cuma
mengilustrasikan konsep &mdash; kode di `code/09-class-oop.js` yang harus kamu
ketik sendiri. Ini skill paling penting: **membaca + memahami + mengetik**.

---

## Konsep Singkat: Kenapa Pakai Class?

Tanpa class, kamu bisa bikin objek pakai object literal:

```javascript
const andi = { nama: "Andi", email: "andi@email.com" };
const budi = { nama: "Budi", email: "budi@email.com" };
```

Tapi bagaimana kalau kamu butuh **1000 mahasiswa** dengan struktur yang sama?
Kamu akan copy-paste 1000 kali &mdash; mimpi buruk maintenance.

**Class** = cetakan. Sekali bikin, bisa cetak banyak objek dengan struktur
konsisten. Tiap objek punya data sendiri, tapi method-nya sama.

---

## Bagian A: Class `Person` (Base Class)

### Penjelasan

Class paling dasar di program ini: `Person`. Class ini cuma punya `nama` dan
`email` &mdash; informasi yang berlaku untuk "orang" secara umum.

Di dalam class ada:

- `constructor(nama, email)` &mdash; method khusus yang **dipanggil otomatis
  saat `new Person(...)`**. Tempat kamu inisialisasi property.
- `this.nama = nama` &mdash; `this` = objek yang sedang dibuat. Jadi
  `this.nama` = property `nama` di objek baru itu.
- `greet()` dan `getInfo()` &mdash; **instance method**: method yang dipanggil
  dari **instance** (objek hasil `new`).

### Wajib Ada di Kode Kamu

- Keyword `class` dan nama class `Person`
- `constructor(nama, email)` yang assign `this.nama` dan `this.email`
- Method `greet()` yang return string `"Halo, saya ${this.nama}"`
- Method `getInfo()` yang return string `"${this.nama} (${this.email})"`
- Tutup class dengan `}`

### Cara Mengetik dari 0

1. Buka `code/09-class-oop.js` di VS Code
2. Cari blok `TODO 1: Class Person (base class)` &mdash; semua baris di sana
   masih komentar (`//`)
3. **Hapus tanda `//`** di awal baris-baris yang akan kamu aktifkan
4. Ketik ulang struktur class-nya di bawah komentar (jangan hapus komentarnya
   dulu sampai kamu yakin kodenya jalan) &mdash; tujuannya agar tanganmu
   hafal polanya
5. Save file
6. Jalankan: `node code/09-class-oop.js` &mdash; tidak akan ada output
   karena belum ada `console.log`, tapi pastikan **tidak ada error syntax**

> **Tips:** Tulis `class Person { }` dulu, baru tambahkan constructor &amp;
> method di dalam. Lebih mudah daripada nulis semuanya sekaligus.

### Yang Terjadi di Memori

Saat kamu `new Person("Andi", "andi@email.com")`:

1. JavaScript bikin objek kosong baru `{}`
2. Panggil `constructor` dengan `this` = objek kosong itu
3. `this.nama = "Andi"` &mdash; objek jadi `{ nama: "Andi", email: "andi@email.com" }`
4. Kembalikan objeknya

### Verifikasi

- [ ] Tidak ada error saat `node code/09-class-oop.js`
- [ ] Kode mengandung `class Person {`
- [ ] `constructor` menerima 2 parameter dan assign ke `this`
- [ ] Ada method `greet()` yang pakai `this.nama`
- [ ] Ada method `getInfo()` yang return nama + email

---

## Bagian B: Class `Student` extends `Person`

### Penjelasan

`Student` adalah **mahasiswa** &mdash; yang juga seorang `Person`, tapi punya
informasi tambahan: `nim` (nomor induk), `jurusan`, dan `nilai` (array
kumpulan nilai).

Karena `Student` punya semua yang `Person` punya, kita pakai **inheritance**:
`class Student extends Person`.

Di constructor subclass:

- Wajib panggil `super(nama, email)` **dulu** &mdash; ini manggil constructor
  parent agar property `nama` dan `email` di-set di parent.
- Baru setelah `super()`, kamu boleh pakai `this`.
- Lalu assign property tambahan: `this.nim`, `this.jurusan`, `this.nilai = []`.

### Wajib Ada di Kode Kamu

- `class Student extends Person {`
- `constructor(nama, email, nim, jurusan)` yang:
  - Panggil `super(nama, email)` di baris pertama
  - Assign `this.nim = nim`
  - Assign `this.jurusan = jurusan`
  - Inisialisasi `this.nilai = []` (array kosong, akan diisi nanti)
- Method `greet()` yang **override** method parent &mdash; return
  `"Halo, saya Andi - NIM: 12345"` (gabungkan hasil `super.greet()` + info NIM)
- Method `tambahNilai(n)` yang `push(n)` ke `this.nilai`
- Method `getRataNilai()` yang hitung rata-rata dari `this.nilai` &mdash; return
  `0` kalau array kosong
- Method `getGrade()` yang return grade string berdasarkan rata-rata:
  - `>= 85` &rarr; `"A"`
  - `>= 75` &rarr; `"B"`
  - `>= 65` &rarr; `"C"`
  - `>= 50` &rarr; `"D"`
  - `< 50` &rarr; `"E"`

### Cara Mengetik dari 0

1. Cari blok `TODO 2: Class Student (extends Person)` di `code/09-class-oop.js`
2. Hapus `//` di tiap baris yang akan kamu aktifkan
3. Ketik class `Student` &mdash; mulai dari `class Student extends Person {`
4. Di constructor, **pastikan `super(nama, email)` di baris pertama** &mdash;
   kalau kamu tulis `this.nim` sebelum `super`, JavaScript akan error
5. Implementasikan `tambahNilai(n)` &mdash; pakai `this.nilai.push(n)`
6. Implementasikan `getRataNilai()` &mdash; pakai `reduce` lalu bagi `length`,
   handle case kosong
7. Implementasikan `getGrade()` &mdash; pakai `if-else if` berurutan dari
   grade tertinggi ke terendah

### Pola Kode: Hitung Rata-rata dengan `reduce`

```javascript
getRataNilai() {
  if (this.nilai.length === 0) return 0;
  const total = this.nilai.reduce((acc, n) => acc + n, 0);
  return total / this.nilai.length;
}
```

- `reduce((acc, n) => acc + n, 0)` &mdash; jumlahkan semua elemen, mulai dari
  `0`
- Bagi dengan `this.nilai.length` &mdash; dapat rata-rata

### Verifikasi

- [ ] `class Student extends Person` tertulis dengan benar
- [ ] `super(nama, email)` dipanggil **sebelum** `this.nim = nim`
- [ ] `this.nilai = []` di constructor (bukan `this.nilai = null`)
- [ ] `greet()` di Student me-return string berbeda dari `greet()` di Person
- [ ] `tambahNilai(85)` benar-benar menambah `85` ke array
- [ ] `getGrade()` return `"A"` untuk rata-rata 90, `"E"` untuk rata-rata 40

---

## Bagian C: Static Methods

### Penjelasan

`static` method adalah method yang **dipanggil langsung dari class**, bukan
dari instance. Gunanya: method yang tidak butuh data spesifik dari satu
instance &mdash; biasanya untuk **factory** (bikin instance baru) atau
**utility** (fungsi pembantu yang berkaitan dengan class).

```javascript
class Student {
  static createRandom() { ... } // panggil: Student.createRandom()
}

const andi = new Student(...);  // bukan: andi.createRandom()
```

### Wajib Ada di Kode Kamu

- `static createRandom()` &mdash; return instance Student baru dengan data
  random (pilih nama random dari array, generate email dari nama, nim dan
  jurusan default)
- `static createBatch(dataArray)` &mdash; terima array of objects (misal:
  `[{nama, email, nim, jurusan}, ...]`), return array of `Student` instances
  hasil `map`

### Cara Mengetik dari 0

1. Cari blok `TODO 3: Static Methods` di `code/09-class-oop.js`
2. Untuk `createRandom()`:
   - Bikin array nama: `["Andi", "Budi", "Citra", "Dewi"]`
   - Pilih random: `nama[Math.floor(Math.random() * nama.length)]`
   - Return `new Student(nama, email, nim, jurusan)` dengan data yang
     sudah di-generate
3. Untuk `createBatch(dataArray)`:
   - Pakai `dataArray.map(d => new Student(d.nama, d.email, d.nim, d.jurusan))`
   - Return hasilnya
4. Hapus `//` di depan baris yang sudah kamu implementasi

### Yang Terjadi

Saat `Student.createRandom()` dipanggil:

- Tidak ada `this` yang merujuk ke instance &mdash; `this` di static method
  merujuk ke **class itu sendiri** (`Student`).
- Return value-nya adalah **objek Student baru** &mdash; jadi kamu bisa
  langsung pakai: `const andi = Student.createRandom();`

### Verifikasi

- [ ] `static` keyword muncul sebelum `createRandom` dan `createBatch`
- [ ] `Student.createRandom()` (tanpa `new`) menghasilkan objek Student
- [ ] `Student.createBatch([{nama: "..."}, ...])` return array berisi instance
- [ ] Tidak ada `this.xxx` untuk akses property instance di static method
      (karena static tidak punya instance)

---

## Bagian D: Class `Course`

### Penjelasan

`Course` merepresentasikan **mata kuliah**. Punya `nama` mata kuliah, `dosen`
pengampu, dan `mahasiswa` (array berisi instance `Student`).

Class ini berdiri sendiri &mdash; **tidak extends apapun**. Tapi ia berelasi
dengan `Student` (satu course punya banyak student = "has-a" relationship,
bukan "is-a" seperti inheritance).

### Wajib Ada di Kode Kamu

- `class Course {` (tidak pakai `extends`)
- `constructor(nama, dosen)` yang:
  - Assign `this.nama = nama`
  - Assign `this.dosen = dosen`
  - Inisialisasi `this.mahasiswa = []`
- Method `tambahMahasiswa(student)` &mdash; `push` student ke `this.mahasiswa`
- Method `hapusMahasiswa(nim)` &mdash; filter `this.mahasiswa` agar
  **tidak** ada yang punya `nim` sesuai parameter
- Method `getRataKelas()` &mdash; hitung rata-rata `getRataNilai()` dari semua
  mahasiswa
- Method `getMahasiswaLulus()` &mdash; return array berisi student yang
  `getRataNilai() >= 60`

### Cara Mengetik dari 0

1. Cari blok `TODO 4: Class Course` di `code/09-class-oop.js`
2. Tulis constructor &mdash; `this.mahasiswa = []` di sini penting, kalau
   lupa nanti `tambahMahasiswa` error
3. Untuk `tambahMahasiswa(student)`: satu baris `this.mahasiswa.push(student)`
4. Untuk `hapusMahasiswa(nim)`: pakai `filter`
   ```javascript
   this.mahasiswa = this.mahasiswa.filter(m => m.nim !== nim);
   ```
5. Untuk `getRataKelas()`:
   - Map dulu `getRataNilai()` tiap mahasiswa
   - Lalu hitung rata-rata dari hasil map (bisa pakai `reduce`)
   - Handle case kosong
6. Untuk `getMahasiswaLulus()`:
   - Filter `this.mahasiswa.filter(m => m.getRataNilai() >= 60)`
   - Return hasilnya

### Pola Kode: Filter Array of Objects

```javascript
// Hapus mahasiswa dengan NIM tertentu
this.mahasiswa = this.mahasiswa.filter(m => m.nim !== nim);

// Ambil yang lulus
return this.mahasiswa.filter(m => m.getRataNilai() >= 60);
```

Filter **return array baru** &mdash; tidak mengubah array asli. Untuk
`hapusMahasiswa`, kamu harus **re-assign** `this.mahasiswa` ke hasil filter.

### Verifikasi

- [ ] `class Course {` (tanpa `extends`)
- [ ] `this.mahasiswa = []` di constructor
- [ ] `tambahMahasiswa(andi)` benar-benar menambah `andi` ke array
- [ ] `hapusMahasiswa("12345")` menghilangkan student dengan NIM itu
- [ ] `getRataKelas()` return number (bukan `NaN`) walaupun kelas kosong
- [ ] `getMahasiswaLulus()` return array (kosong kalau tidak ada yang lulus)

---

## Bagian E: TEST &amp; Jalankan

### Penjelasan

Bagian ini bukan konsep baru &mdash; hanya cara kamu **menjalankan dan
memverifikasi** semua yang sudah kamu ketik. Buka blok `TEST` di
`code/09-class-oop.js`, hapus komentar `//`, lalu jalankan.

### Wajib Ada di Kode Kamu

Di blok TEST, hapus `//` di:

- `const andi = new Student("Andi", "andi@email.com", "12345", "Informatika");`
- `andi.tambahNilai(85);`
- `andi.tambahNilai(90);`
- Ketiga `console.log(andi.getRataNilai())`, `console.log(andi.getGrade())`,
  `console.log(andi.greet())`
- `const randomStudent = Student.createRandom();`
- `const course = new Course("Web Development", "Dr. Smith");`
- `course.tambahMahasiswa(andi);`
- `console.log(course.getRataKelas());`

### Cara Mengetik dari 0

1. Buka terminal di folder `code/`
2. Jalankan: `node 09-class-oop.js`
3. Lihat output di terminal
4. Kalau ada error, baca pesannya &mdash; biasanya menunjukkan nomor baris
5. Fix, save, jalankan lagi

### Verifikasi

- [ ] Output pertama: `87.5` (rata-rata dari 85 dan 90)
- [ ] Output kedua: `A` (karena 87.5 >= 85)
- [ ] Output ketiga: `Halo, saya Andi - NIM: 12345` (format greet Student)
- [ ] Output `course.getRataKelas()` berupa number (bukan `NaN`)
- [ ] Tidak ada error / `undefined` di terminal

---

## Ringkasan Konsep

Berikut konsep penting yang sudah kamu pakai:

- **`class`** &mdash; keyword untuk bikin blueprint objek
- **`constructor`** &mdash; method khusus yang jalan saat `new ClassName(...)`
- **`this`** &mdash; objek yang sedang dibuat (di constructor) atau instance
  yang memanggil method
- **`extends`** &mdash; bikin subclass yang mewarisi parent
- **`super(args)`** &mdash; panggil constructor parent &mdash; **wajib** di
  baris pertama constructor subclass
- **`super.method()`** &mdash; panggil method parent (misal `super.greet()`)
- **`static`** &mdash; method milik class, bukan instance &mdash; dipanggil
  `ClassName.method()`
- **Override** &mdash; subclass bisa tulis ulang method parent dengan versi
  sendiri
- **Array of objects** &mdash; `Course.mahasiswa` berisi banyak instance
  `Student` &mdash; pakai `filter`, `map`, `reduce` untuk proses kolektif

---

## Verifikasi Akhir (Wajib Dicek)

Sebelum lanjut ke soal 10, cek semua ini:

- [ ] `node code/09-class-oop.js` jalan **tanpa error**
- [ ] `class Person`, `class Student extends Person`, dan `class Course`
      semua ada
- [ ] `super(nama, email)` dipanggil di constructor Student
- [ ] Output `getRataNilai()` adalah `87.5` (bukan `175` atau `undefined`)
- [ ] Output `getGrade()` adalah `"A"` (bukan `"a"` atau number)
- [ ] Output `greet()` Student mengandung `"NIM:"` (beda dari greet Person)
- [ ] `Student.createRandom()` bisa dipanggil tanpa `new`
- [ ] `course.tambahMahasiswa(andi)` lalu `course.getRataKelas()` return
      number, bukan `NaN`
- [ ] Semua `console.log` di blok TEST sudah di-uncomment

---

## Cara Submit

1. Buka `code/09-class-oop.js` di VS Code
2. Pastikan semua `TODO(human)` sudah kamu isi (kode di-uncomment / diketik
   ulang)
3. Save (Cmd+S / Ctrl+S)
4. Jalankan: `node code/09-class-oop.js` di terminal
5. Cek output di terminal &mdash; harus sesuai dengan `CONTOH OUTPUT` di
   bawah kode
6. Kalau sudah sesuai, lanjut ke `soal/10-error-handling.md`

---

## Catatan untuk Pemula

> **Class itu cuma "cetakan"**. Dari satu `class Student` kamu bisa bikin
> `new Student(...)` berkali-kali. Tiap hasil `new` adalah **objek/instance**
> yang punya data sendiri.
> **`this` = "objek yang sedang diurus"**. Di constructor, `this` = objek
> baru yang sedang dibuat. Di method, `this` = objek yang memanggil method
> itu. Selama dipanggil dengan `new` atau lewat `objek.method()`, `this`
> otomatis terikat.
> **`super(...)` HARUS di baris pertama** constructor subclass. Kalau kamu
> tulis `this.jurusan` sebelum `super(...)`, JavaScript error:
> `Must call super constructor in derived class before accessing 'this'`.
> **`static` method tidak butuh instance**. Pakai untuk factory
> (`createRandom`) atau utility (`cekLulus`). Panggil dari class, bukan
> dari objek.
> **Inheritance = "is-a" relationship**. `Student` IS A `Person` &mdash; jadi
> pakai `extends`. Tapi `Course` HAS Students &mdash; jadi Course **tidak
> extends** Student, melainkan **punya array** of Student.
> **Override method = tulis ulang dengan nama sama**. JavaScript otomatis
> pakai versi paling spesifik (versi Student, bukan versi Person) saat
> method dipanggil dari instance Student.
> **Kalau error `undefined is not a function`**: biasanya kamu lupa
> `new` saat bikin instance, atau nama method salah ketik. Cek lagi
> constructor-nya.

<!-- markdownlint-enable MD024 MD028 -->

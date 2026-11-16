# Solusi — JANGAN DIBUKA DULU

Buka SETELAH punyamu jalan atau benar-benar buntu. Tulis dulu versimu sendiri, catat apa yang sudah kamu coba, baru bandingkan di sini. Membaca solusi sebelum mencoba tidak melatih apa-apa.

Tiap bagian diberi judul sesuai nama soal dan bagiannya, jadi gampang dicari dari penunjuk di file soal.

## 07 Callback & Higher-Order Functions — Bagian D: Method Chaining

### Blok 1

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

### Blok 2

```javascript
// Ambil 3 nilai tertinggi, urutkan descending, cetak nama
const top3 = [...mahasiswas]              // clone supaya array asli tidak ke-sort
  .sort((a, b) => b.nilai - a.nilai)      // urutkan descending
  .slice(0, 3)                            // ambil 3 pertama
  .map(m => m.nama);
```


## 07 Callback & Higher-Order Functions — Bagian E: Closures

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


## 07 Callback & Higher-Order Functions — Bagian F: Custom Higher-Order Function (myMap, myFilter, myReduce)

### Blok 1

```javascript
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
```

### Blok 2

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

### Blok 3

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


## 09 Class & OOP — Bagian B: Class `Student` extends `Person`

```javascript
getRataNilai() {
  if (this.nilai.length === 0) return 0;
  const total = this.nilai.reduce((acc, n) => acc + n, 0);
  return total / this.nilai.length;
}
```


## 09 Class & OOP — Bagian D: Class `Course`

```javascript
// Hapus mahasiswa dengan NIM tertentu
this.mahasiswa = this.mahasiswa.filter(m => m.nim !== nim);

// Ambil yang lulus
return this.mahasiswa.filter(m => m.getRataNilai() >= 60);
```


## 10 Error Handling — Bagian B: Custom Error Classes

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);            // panggil constructor parent
    this.name = "ValidationError"; // set nama error
  }
}
```


## 10 Error Handling — Bagian D: try / catch / finally

```javascript
try {
  validasiUsia(200);
  console.log("Sukses");
} catch (err) {
  console.error(`Gagal: ${err.name} - ${err.message}`);
} finally {
  console.log("Validasi selesai.");
}
```


## 10 Error Handling — Bagian E: Fungsi `validasiRegistrasi`

```javascript
function validasiRegistrasi(data) {
  const errors = [];
  try { validasiUsia(data.usia); } catch (e) { errors.push(e.message); }
  try { validasiEmail(data.email); } catch (e) { errors.push(e.message); }
  try { validasiPassword(data.password); } catch (e) { errors.push(e.message); }
  if (errors.length > 0) {
    throw new ValidationError(errors.join("; "));
  }
  return true;
}
```


## 10 Error Handling — Bagian F: Async Error Handling — `fetchUser`

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) {
      throw new NotFoundError(`User id ${id}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.error(`404: ${error.message}`);
    } else {
      console.error(`Error umum: ${error.message}`);
    }
    throw error; // re-throw biar caller juga tahu
  }
}
```


## 10 Error Handling — Bagian G: try / catch / finally di Async — `processWithLogging`

```javascript
async function processWithLogging(fn) {
  console.log("Memulai proses...");
  try {
    const result = await fn();
    console.log("Berhasil!");
    return result;
  } catch (error) {
    console.error(`Gagal: ${error.message}`);
  } finally {
    console.log("Proses selesai."); // SELALU jalan
  }
}
```


## 04 Array Manipulation — Bagian A: Data Awal dan `push` / `pop`

```javascript
const mahasiswa = [
  { nama: "Andi",  nilai: 85 },
  { nama: "Budi",  nilai: 72 },
  { nama: "Citra", nilai: 90 },
  { nama: "Dewi",  nilai: 65 },
  { nama: "Eko",   nilai: 78 },
  { nama: "Fira",  nilai: 95 },
];

const tambahMahasiswa = [...mahasiswa, { nama: "Gita", nilai: 88 }];
const kurangMahasiswa = mahasiswa.slice(0, -1);
```


## 04 Array Manipulation — Bagian B: `map` — Transformasi 1-to-1

```javascript
const namaList = mahasiswa.map(m => m.nama);

const nilaiDouble = mahasiswa.map(m => m.nilai * 2);

const mahasiswaNilaiDouble = mahasiswa.map(m => ({ nama: m.nama, nilai: m.nilai * 2 }));
```


## 04 Array Manipulation — Bagian C: `filter` — Penyaringan Elemen

```javascript
const lulus = mahasiswa.filter(m => m.nilai >= 75);
const remidi = mahasiswa.filter(m => m.nilai < 60);
const cumlaude = mahasiswa.filter(m => m.nilai >= 90);
```


## 04 Array Manipulation — Bagian D: `find` — Pencarian

```javascript
const cariEko = mahasiswa.find(m => m.nama === "Eko");
const nilaiDiAtas80 = mahasiswa.find(m => m.nilai > 80);
const cariZara = mahasiswa.find(m => m.nama === "Zara");
```


## 04 Array Manipulation — Bagian E: `reduce` — Akumulasi

```javascript
const totalNilai = mahasiswa.reduce((sum, m) => sum + m.nilai, 0);
const rataRata = totalNilai / mahasiswa.length;

// Cara 1: filter dulu, baru reduce
const totalLulus = mahasiswa.filter(m => m.nilai >= 75).reduce((sum, m) => sum + m.nilai, 0);

// Cara 2: reduce langsung dengan kondisi
const totalLulus2 = mahasiswa.reduce((sum, m) => m.nilai >= 75 ? sum + m.nilai : sum, 0);
```


## 04 Array Manipulation — Bagian F: `some` dan `every`

```javascript
const adaRemidi = mahasiswa.some(m => m.nilai < 60);
const adaSempurna = mahasiswa.some(m => m.nilai === 100);
const semuaLulus = mahasiswa.every(m => m.nilai >= 60);
const semuaDiAtasRata = mahasiswa.every(m => m.nilai > rataRata);
```


## 04 Array Manipulation — Bagian G: `sort` — Pengurutan

```javascript
const urutNama = [...mahasiswa].sort((a, b) => a.nama.localeCompare(b.nama));
const urutNilai = [...mahasiswa].sort((a, b) => b.nilai - a.nilai);
```


## 04 Array Manipulation — Bagian H: Chaining

```javascript
const namaLulusSorted = mahasiswa
  .filter(m => m.nilai >= 75)
  .map(m => m.nama)
  .sort();

const top3Nama = [...mahasiswa]
  .sort((a, b) => b.nilai - a.nilai)
  .slice(0, 3)
  .map(m => m.nama);
```


## 05 Todo List CLI — Bagian A: Konsep `readline` & Setup Awal

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,   // baca dari keyboard
  output: process.stdout  // tulis ke layar
});

const todos = [
  { id: 1, task: 'Belajar JavaScript', done: false },
  { id: 2, task: 'Buat project portfolio', done: true },
  { id: 3, task: 'Latihan coding', done: false }
];
```


## 05 Todo List CLI — Bagian B: Fungsi `tampilkanTodos()`

```javascript
function tampilkanTodos() {
  if (todos.length === 0) {
    console.log("Tidak ada tugas");
    return;
  }
  console.log(`=== ${todos.length} Todo ===`);
  for (let i = 0; i < todos.length; i++) {
    const status = todos[i].done ? '[x]' : '[ ]';
    console.log(`${i + 1}. ${status} ${todos[i].task}`);
  }
  // statistik (total, selesai, belum) setelah loop
}
```


## 05 Todo List CLI — Bagian C: Fungsi `tambahTodos(task)`

```javascript
function tambahTodos(task) {
  if (!task || task.trim() === '') {
    return "Error: Task tidak boleh kosong";
  }
  const newId = todos.length === 0 ? 1 : Math.max(...todos.map(t => t.id)) + 1;
  todos.push({ id: newId, task: task.trim(), done: false });
  return `Tugas '${task.trim()}' ditambahkan (ID: ${newId})`;
}
```


## 05 Todo List CLI — Bagian D: Fungsi `hapusTodos(id)`

```javascript
function hapusTodos(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) { return `Error: ID ${id} tidak ditemukan`; }
  const [deleted] = todos.splice(index, 1);
  return `Tugas '${deleted.task}' dihapus`;
}
```


## 05 Todo List CLI — Bagian E: Fungsi `selesaiTodos(id)`

```javascript
function selesaiTodos(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) { return `Error: ID ${id} tidak ditemukan`; }
  todo.done = true;
  return `Tugas '${todo.task}' ditandai selesai`;
}
```


## 05 Todo List CLI — Bagian F: Fungsi `belumSelesai()` & `jumlahSelesai()`

```javascript
function belumSelesai() {
  const filtered = todos.filter(t => !t.done);
  if (filtered.length === 0) { console.log("Tidak ada tugas yang belum selesai"); return; }
  console.log(`=== ${filtered.length} Belum Selesai ===`);
  // loop dan cetak tiap todo, sama seperti tampilkanTodos
}

function jumlahSelesai() {
  return todos.filter(t => t.done).length;
}
```


## 05 Todo List CLI — Bagian G: Menu Interaktif

```javascript
switch (pilihan) {
  case '1': tampilkanTodos(); tampilkanMenu(); break;
  case '2':
    rl.question('Masukkan tugas: ', (task) => {
      console.log(tambahTodos(task));
      tampilkanMenu();
    });
    return;
  // case '3' dan '4': pola sama dengan case '2', tapi pakai parseInt untuk ID
  case '7': rl.close(); break;
  default: console.log('Pilihan tidak valid'); tampilkanMenu();
}
```


## 06 Object & Destructuring — Bagian A: Object Literal & Property Access

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


## 06 Object & Destructuring — Bagian B: Destructuring Assignment (Object)

```javascript
const { nama, umur } = mahasiswa;                  // nama = "Andi"
const { nama: namaMhs } = mahasiswa;               // namaMhs = "Andi"
const { ipk = 0 } = mahasiswa;                     // ipk = 0 (default)
const { alamat: { kota } } = mahasiswa;            // kota = "Jakarta"
function getBio({ nama, umur }) { ... }            // destructuring di param
```


## 06 Object & Destructuring — Bagian F: Object Methods (keys, values, entries)

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


## 06 Object & Destructuring — Bagian H: Mini Project — Student Report

```javascript
mahasiswas.map(({ nama, jurusan, nilai }, i) => `${i + 1}. ${nama} (${jurusan}) - ${nilai}`);

mahasiswas.filter(({ nilai }) => nilai >= 70).map(({ nama }) => nama);

mahasiswas.reduce((best, curr) => curr.nilai > best.nilai ? curr : best);

mahasiswas.reduce((acc, { jurusan }) => {
  acc[jurusan] = (acc[jurusan] || 0) + 1;
  return acc;
}, {});
```


## 09 Class & OOP — Bagian C: Static Methods

```javascript
static createRandom() {
  const namaList = ["Andi", "Budi", "Citra", "Dewi"];
  const nama = namaList[Math.floor(Math.random() * namaList.length)];
  const email = `${nama.toLowerCase()}@email.com`;
  return new Student(nama, email, "12345", "Informatika");
}

static createBatch(dataArray) {
  return dataArray.map(d => new Student(d.nama, d.email, d.nim, d.jurusan));
}
```


## 10 Error Handling — Bagian C: Fungsi Validasi Tunggal (`validasiUsia`)

```javascript
function validasiUsia(usia) {
  if (typeof usia !== "number" || isNaN(usia)) {
    throw new ValidationError("Usia harus angka");
  }
  if (usia < 0 || usia > 150) {
    throw new ValidationError(`Usia tidak valid: ${usia}`);
  }
  return true;
}
```


## Soal 02 — Bagian A: Fungsi `cekGanjilGenap(n)`

```javascript
function cekGanjilGenap(n) {
  if (n % 2 === 0) {
    return "Genap";
  } else {
    return "Ganjil";
  }
}
```


## Soal 02 — Bagian B: Fungsi `cekPositifNegatif(n)`

```javascript
function cekPositifNegatif(n) {
  if (n === 0) { return "Nol"; }
  else if (n > 0) { return "Positif"; }
  else { return "Negatif"; }
}
```


## Soal 02 — Bagian C: Fungsi `cekPrima(n)`

```javascript
function cekPrima(n) {
  if (n < 2) { return false; }
  const batas = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= batas; i++) {
    if (n % i === 0) { return false; }
  }
  return true;
}
```


## Soal 02 — Bagian E (Bonus): Loop untuk Cek Banyak Angka

```javascript
for (let i = -1; i <= 20; i++) {
  console.log(`${i}: ${cekGanjilGenap(i)} | ${cekPositifNegatif(i)} | Prima: ${cekPrima(i)}`);
}
```


## Soal 03 — Bagian A: Function Declaration & Default Parameter

```javascript
function fizzBuzz(limit = 100) {
}
```


## Soal 03 — Bagian B: Loop `for` dari 1 sampai `limit`

```javascript
function fizzBuzz(limit = 100) {
  for (let i = 1; i <= limit; i++) {
  }
}
```


## Soal 03 — Bagian C: Array Kosong & `array.push()`

```javascript
function fizzBuzz(limit = 100) {
  const hasil = [];
  for (let i = 1; i <= limit; i++) {
    hasil.push(i);
  }
  return hasil;
}
```


## Soal 03 — Bagian G (Bonus): Baca Argument dari Command Line

```javascript
const inputLimit = process.argv[2];
const limit = inputLimit && !isNaN(Number(inputLimit)) ? Number(inputLimit) : 100;
console.log(fizzBuzz(limit));
```


## Soal 07 — Bagian A: Arrow Functions

```javascript
function kuadrat(n) { return n * n; }
const kuadratArrow = n => n * n;
const tambah = (a, b) => a + b;
const kuadratLog = n => {
  console.log("Menghitung kuadrat dari", n);
  return n * n;
};
```


## Soal 07 — Bagian B: Callback Fundamentals

```javascript
function prosesData(data, callback) {
  console.log("Memproses...");
  callback(data);
}
prosesData([1, 2, 3], d => console.log(d));

function hitung(a, b, operasi) { return operasi(a, b); }
const tambah = (a, b) => a + b;
const kali = (a, b) => a * b;
hitung(5, 3, tambah);
hitung(5, 3, kali);
hitung(5, 3, (x, y) => x ** y);
```


## Soal 07 — Bagian D: chain `map` lalu `filter`

```javascript
mahasiswas.map(m => m.nama).filter(nama => nama.length > 4);
```


## Soal 07 — Bagian E: Closures (`buatCounter` dan `kaliX`)

```javascript
function buatCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counterA = buatCounter();
console.log(counterA(), counterA(), counterA()); // 1 2 3
const counterB = buatCounter();
console.log(counterB(), counterB());             // 1 2 (independen)

function kaliX(x) { return (n) => n * x; }
const kali5 = kaliX(5);
const kali10 = kaliX(10);
console.log(kali5(3), kali10(3)); // 15 30
```


## Soal 07 — Bagian G: Latihan Kasus (Studi Data Mahasiswa)

```javascript
// Kasus 1
mahasiswas.reduce((acc, m) => acc + m.nilai, 0);

// Kasus 2
mahasiswas.reduce((terbesar, m) => m.nilai > terbesar.nilai ? m : terbesar);

// Kasus 3 (kerangka; bagian grade ada di logika berikut)
// grade = nilai >= 90 ? 'A' : nilai >= 80 ? 'B' : nilai >= 70 ? 'C' : 'D'
// initial value: { A: [], B: [], C: [], D: [] }

// Kasus 4
[...mahasiswas].sort((a, b) => a.nama.localeCompare(b.nama)).map(m => m.nama).join(", ");

// Bukti non-mutasi
console.log("Array asli utuh:", mahasiswas[0].nama === "Andi");
```


## Soal 08 — Bagian B: Promise.all() untuk Paralel

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}

Promise.all([delay(500), delay(1000), delay(2000)]).then(console.log);
```


## Soal 08 — Bagian C: Fungsi `async` / `await` + `fetch`

```javascript
async function fetchUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return user;
}

fetchUser(1).then(u => console.log(u.name, u.email));
```


## Soal 08 — Bagian E: Async Arrow Function

```javascript
const fetchUsersAsync = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return users;
};

fetchUsersAsync().then(arr => console.log(arr.length));
```


## Soal 08 — Bagian F (Bonus): `processUserData(users)`

```javascript
const aktif = users.filter(u => u.isActive === true);
const ringkas = aktif.map(u => ({ /* field-field yang kamu mau */ }));
ringkas.sort((a, b) => /* comparator */);
if (ringkas.length === 0) throw new Error("...");
return ringkas;
```


## Soal 02 — Bagian D: Panggil Semua Fungsi

```javascript
console.log(`Ganjil/Genap: ${cekGanjilGenap(angka)}`);
// baris Positif/Negatif dan Prima: ganti komentar dengan cekPositifNegatif(angka) dan cekPrima(angka)
```

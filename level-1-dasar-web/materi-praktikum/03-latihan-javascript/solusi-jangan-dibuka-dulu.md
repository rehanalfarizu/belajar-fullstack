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


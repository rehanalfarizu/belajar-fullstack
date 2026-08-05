# 📘 MATERI TEORI 03 — JavaScript Fundamental

## 1. Apa itu JavaScript?

JavaScript = bahasa pemrograman untuk **interaktivitas** halaman web.

```
HTML = Struktur (kerangka)
CSS  = Tampilan (desain)
JS   = Perilaku (interaksi — tombol, animasi, dll)
```

JavaScript berjalan di browser (frontend) dan di server (Node.js).

---

## 2. Variabel (Menyimpan Data)

### 3 Cara Deklarasi Variabel:

```javascript
// var — function-scoped, hoisting ( lama, kurang direkomendasikan)
var name = "Andi";

// let — block-scoped, bisa di-reassign (pakai ini untuk data yang berubah)
let age = 25;
age = 26; // ✅ boleh

// const — block-scoped, TIDAK bisa di-reassign (pakai ini sebagai default)
const PI = 3.14159;
const name = "Andi";
// name = "Budi"; // ❌ Error!

// ⚠️ const tidak bisa reassign, tapi array/object bisa dimodifikasi isinya:
const numbers = [1, 2, 3];
numbers.push(4);    // ✅ boleh — modifikasi isi
// numbers = [1,2,3,4]; // ❌ Error — reassign
```

### Aturan Penamaan Variabel:

```javascript
// ✅ Benar
let fullName = "Andi Wijaya";
let age2 = 30;
let _private = "secret";
const API_KEY = "abc123";

// ❌ Salah
// let 2name = "Andi";
// let full-name = "Andi";
// let nama@email = "andi@mail.com";

// CamelCase (direkomendasikan)
let userFullName = "Andi";
```

### Tipe Data Primitif:

```javascript
// String — teks
let name = "Andi";
let greeting = 'Halo';       // kutip tunggal juga bisa
let template = `Nama: ${name}`; // template literal (backtick)

// Number — angka
let age = 25;
let price = 19.99;
let negative = -10;

// Boolean — true/false
let isActive = true;
let isLoggedIn = false;

// Undefined — belum diisi
let unknown;
console.log(unknown); // undefined

// Null — kosong secara sengaja
let empty = null;

// Symbol & BigInt (lanjutan)
let sym = Symbol("id");
let big = 9007199254740991n;
```

### typeof — Cek Tipe Data:

```javascript
typeof "Andi"    // "string"
typeof 25        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" ⚠️ bug historique
typeof {}       // "object"
typeof []       // "object"
Array.isArray([]) // true — untuk cek array
```

---

## 3. Operator

### Aritmatika:

```javascript
let a = 10, b = 3;

a + b   // 13 — penjumlahan
a - b   // 7  — pengurangan
a * b   // 30 — perkalian
a / b   // 3.333... — pembagian
a % b   // 1  — modulus (sisa bagi)
a ** b  // 1000 — pangkat

// Increment / Decrement
let count = 0;
count++    // 1 (post-increment)
++count    // 2 (pre-increment)
count--    // 1
--count    // 0
```

### Perbandingan:

```javascript
10 == "10"   // true  — loose equality (cek nilai saja)
10 === "10"  // false — strict equality (cek nilai + tipe)
10 != "10"   // false — loose not equal
10 !== "10"  // true  — strict not equal

5 > 3   // true
5 < 3   // false
5 >= 5  // true
5 <= 3  // false
```

### Logika:

```javascript
true && true   // true — AND (keduanya harus true)
true || false  // true — OR (salah satu true)
!true          // false — NOT

// Contoh:
let age = 20;
let hasID = true;

if (age >= 17 && hasID) {
  console.log("Boleh masuk");
}

// Short-circuit evaluation
let name = "" || "Guest";  // "Guest" — karena "" falsy
let user = userData || {};  // fallback ke {} kalau userData undefined
```

---

## 4. Kondisional (If / Switch / Ternary)

### If-Else:

```javascript
let score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("D");
}
```

### Switch:

```javascript
let day = "Senin";

switch (day) {
  case "Senin":
  case "Selasa":
    console.log("Hari kerja");
    break;
  case "Sabtu":
  case "Minggu":
    console.log("Hari libur");
    break;
  default:
    console.log("Hari tidak dikenal");
}
```

### Ternary Operator:

```javascript
// condition ? valueIfTrue : valueIfFalse

let status = age >= 17 ? "Dewasa" : "Anak-anak";
let label = isActive ? "Aktif" : "Nonaktif";
let greeting = name ? `Halo, ${name}!` : "Halo!";

// Ternary nested (hindari terlalu dalam)
let type = score >= 90 ? "A" : score >= 80 ? "B" : "C";
```

---

## 5. Perulangan (Loops)

### For Loop:

```javascript
// for (init; condition; increment)
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// For dengan array
let fruits = ["Apel", "Mangga", "Jeruk"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### While Loop:

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
```

### Do-While (jalan minimal 1x):

```javascript
let input;
do {
  input = prompt("Masukkan angka: ");
} while (isNaN(input));
```

### For...of (untuk iterable):

```javascript
// Iterable: array, string, NodeList, dll
let fruits = ["Apel", "Mangga", "Jeruk"];

for (let fruit of fruits) {
  console.log(fruit);
}

// Dengan index
for (let [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
```

### For...in (untuk object):

```javascript
let user = { name: "Andi", age: 25, city: "Jakarta" };

for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

### Break & Continue:

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;   // berhenti di i=5
  if (i === 3) continue; // skip i=3
  console.log(i);
}
```

---

## 6. Array (Daftar Data)

### Membuat & Mengakses Array:

```javascript
let fruits = ["Apel", "Mangga", "Jeruk"];

fruits[0]     // "Apel" — index pertama
fruits[2]     // "Jeruk"
fruits.length // 3

// Modifikasi
fruits[1] = "Pisang";  // ubah item
fruits.push("Anggur"); // tambah di akhir
fruits.pop();          // hapus dari akhir
fruits.unshift("Melon"); // tambah di awal
fruits.shift();         // hapus dari awal
```

### Array Methods (Paling Penting):

```javascript
let nums = [3, 1, 4, 1, 5, 9, 2, 6];

// forEach — jalankan fungsi untuk setiap item
nums.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// map — buat array baru dari transformasi setiap item
let doubled = nums.map(n => n * 2);  // [6, 2, 8, 2, 10, 18, 4, 12]

// filter — buat array baru dari item yang lulus kondisi
let evens = nums.filter(n => n % 2 === 0);  // [4, 2, 6]

// find — cari item pertama yang cocok
let firstOdd = nums.find(n => n % 2 !== 0); // 3

// findIndex — cari index item pertama yang cocok
let indexOf5 = nums.findIndex(n => n === 5); // 4

// reduce — akumulasikan semua item jadi satu nilai
let sum = nums.reduce((acc, n) => acc + n, 0); // 31

// some — apakah ada yang cocok?
let hasEven = nums.some(n => n % 2 === 0); // true

// every — apakah SEMUA cocok?
let allPositive = nums.every(n => n > 0); // true

// includes — apakah berisi?
nums.includes(5);  // true

// sort — urutkan
nums.sort((a, b) => a - b); // ascending: [1, 1, 2, 3, 4, 5, 6, 9]
nums.sort((a, b) => b - a); // descending: [9, 6, 5, 4, 3, 2, 1, 1]

// flat — ratakan array
[[1, 2], [3, 4]].flat(); // [1, 2, 3, 4]
```

### Destructuring Array:

```javascript
let colors = ["Merah", "Hijau", "Biru"];

const [first, second, third] = colors;
// first = "Merah", second = "Hijau", third = "Biru"

const [a, , c] = colors;
// a = "Merah", c = "Biru" (skip yang tengah)

const [primary, ...rest] = colors;
// primary = "Merah", rest = ["Hijau", "Biru"]
```

---

## 7. Object (Data Terstruktur)

### Membuat Object:

```javascript
let user = {
  name: "Andi Wijaya",
  age: 25,
  email: "andi@email.com",
  isActive: true,

  // Method (fungsi di dalam object)
  greet() {
    return `Halo, saya ${this.name}`;
  }
};

// Mengakses property
user.name        // "Andi Wijaya" — dot notation
user["age"]      // 25 — bracket notation
user.greet()     // "Halo, saya Andi Wijaya"

// Menambah property baru
user.city = "Jakarta";
user["role"] = "admin";

// Menghapus property
delete user.age;
```

### Object Methods:

```javascript
Object.keys(user)    // ["name", "email", "isActive", ...]
Object.values(user)  // ["Andi Wijaya", "andi@email.com", true, ...]
Object.entries(user) // [["name", "Andi Wijaya"], ["email", "andi@email.com"], ...]

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }
```

### Destructuring Object:

```javascript
const { name, age, email } = user;

// Dengan alias
const { name: userName, age: userAge } = user;

// Dengan default value
const { name, role = "user" } = user;

// Nested destructuring
const { address: { city, zip } } = user;
```

---

## 8. Fungsi (Function)

### Function Declaration:

```javascript
function greet(name) {
  return `Halo, ${name}!`;
}
greet("Andi"); // "Halo, Andi!"
```

### Function Expression:

```javascript
const greet = function(name) {
  return `Halo, ${name}!`;
};
```

### Arrow Function (Sintaks Modern):

```javascript
// Single expression — tidak perlu return
const greet = (name) => `Halo, ${name}!`;

// Multi line — perlu return
const calculateArea = (width, height) => {
  const area = width * height;
  return area;
};

// Parameter default
const greet = (name = "Guest") => `Halo, ${name}!`;

// Arrow function di array methods
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
const doubled = numbers.map(n => n * 2);
```

### Parameters:

```javascript
// Rest parameters — terima banyak argumen
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

// Arguments object (hanya di function declaration)
function logAll() {
  console.log(arguments); // bukan array, tapi array-like
}

// Callback function
function processData(data, callback) {
  const result = data * 2;
  callback(result);
}
processData(5, (result) => console.log(result)); // 10
```

---

## 9. Scope & Closures

### Scope:

```javascript
// Global scope
const globalVar = "Aku bisa di mana-mana";

function outer() {
  // Function scope
  const outerVar = "Aku di function outer";

  function inner() {
    // Block scope
    const innerVar = "Aku di function inner";
    console.log(globalVar);   // ✅ bisa akses
    console.log(outerVar);    // ✅ bisa akses
    console.log(innerVar);    // ✅ bisa akses
  }

  inner();
  // console.log(innerVar); // ❌ Error — tidak bisa akses
}

// console.log(outerVar); // ❌ Error
```

### Closures:

```javascript
// Closure = function + lingkungan variabelnya
function createCounter() {
  let count = 0; // variabel private

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
// count = 0 tidak bisa diakses langsung — "encapsulated"
```

### IIFE (Immediately Invoked Function Expression):

```javascript
(function() {
  const privateVar = "Rahasia";
  console.log("Langsung jalan!");
})();

// Arrow version
((name) => {
  console.log(`Halo, ${name}!`);
})("Andi");
```

---

## 10. String Methods

```javascript
let text = "  Hello, World!  ";

// Whitespace
text.trim();         // "Hello, World!" — hapus spasi awal/akhir
text.trimStart();    // "Hello, World!  "
text.trimEnd();      // "  Hello, World!"

// Case
text.toLowerCase();  // "  hello, world!  "
text.toUpperCase();  // "  HELLO, WORLD!  "

// Search
text.includes("World");  // true
text.startsWith("  Hello"); // true
text.endsWith("!  ");     // true
text.indexOf("o");       // 5 — posisi pertama
text.lastIndexOf("o");   // 8 — posisi terakhir

// Replace
text.replace("World", "Andi");  // ganti yang pertama
text.replaceAll("o", "0");       // ganti semua

// Split & Join
"apple,banana,mango".split(","); // ["apple", "banana", "mango"]
["a", "b", "c"].join("-");       // "a-b-c"

// Slice & Substring
text.slice(0, 5);    // "  Hel" — dari index 0 ke 4
text.slice(-6, -1);  // "orld" — dari akhir
text.substring(2, 7); // "Hello"

// Template Literal (paling penting!)
const name = "Andi";
const age = 25;
const bio = `
  Nama: ${name}
  Umur: ${age}
  Status: ${age >= 17 ? "Dewasa" : "Anak-anak"}
  Dalam 5 tahun: ${age + 5} tahun
`;
```

---

## 11. Error Handling

```javascript
// Try-catch
try {
  const data = JSON.parse('{"valid": true}');
  console.log(data);
} catch (error) {
  console.error("Error:", error.message);
}

// Try-catch-finally
try {
  riskyOperation();
} catch (error) {
  console.error("Gagal:", error.message);
} finally {
  console.log("Tetap jalan mau error atau tidak");
}

// Throw custom error
function divide(a, b) {
  if (b === 0) {
    throw new Error("Tidak bisa bagi dengan 0");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // "Tidak bisa bagi dengan 0"
}
```

---

## 12. ES6+ Modules

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { PI, add } from "./math.js";
// atau
import * as math from "./math.js";
math.PI;       // 3.14159
math.add(2, 3); // 5
multiply(3, 4); // 12
```

---

## Ringkasan

```
JavaScript Fundamental
├── Variabel       → let, const (var sudah obsolete)
├── Tipe Data       → string, number, boolean, undefined, null, object, array
├── Operator        → aritmatika, comparison, logical
├── Kondisional     → if/else, switch, ternary
├── Looping         → for, while, do-while, for...of, for...in
├── Array           → push, pop, map, filter, reduce, forEach
├── Object          → key-value, method, destructuring
├── Function        → declaration, expression, arrow, callback, rest
├── Scope           → global, function, block
├── Closure         → function + lexical environment
├── String          → template literal, methods
├── Error Handling  → try/catch/finally, throw
└── Modules         → import, export (ES6)
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-javascript/`
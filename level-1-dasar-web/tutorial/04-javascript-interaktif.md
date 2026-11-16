# Tutorial 04 — JavaScript Interaktif

## Tujuan
Memahami cara menambahkan JavaScript ke HTML, menulis dasar-dasar JS, dan membuat halaman web menjadi interaktif.

---

## Teori Singkat

**JavaScript** = bahasa pemrograman untuk **interaktivitas** halaman web.

```
HTML = Struktur (kerangka rumah)
CSS  = Desain  (cat, lantai)
JS   = Perilaku (listrik, AC, interaksi)
```

JavaScript berjalan di:
- **Browser** (frontend) → DOM manipulation, event handling
- **Server** (Node.js) → API, database, file system

---

## 2 Cara Memasang JavaScript

### Cara 1: Internal (Dalam file HTML)
```html
<body>
  <script>
    console.log("Hello!");
  </script>
</body>
```

### Cara 2: External (File terpisah — lebih baik)
```html
<!-- index.html -->
<body>
  <script src="script.js"></script>
</body>
```

```javascript
// script.js
console.log("Hello!");
```

---

## Syntax Dasar JavaScript

### Variabel:
```javascript
// let — bisa di-reassign
let nama = "Andi";
nama = "Budi"; // ✅

// const — TIDAK bisa di-reassign
const PI = 3.14;
// PI = 3.15; // ❌ Error

// var — lama, kurang direkomendasikan
var age = 25;
```

### Tipe Data:
```javascript
// String — teks
let name = "Andi";
let greeting = 'Halo';
let template = `Nama: ${name}`; // template literal

// Number — angka
let age = 25;
let price = 19.99;

// Boolean — true/false
let isActive = true;

// Array — daftar
let fruits = ["Apel", "Mangga", "Jeruk"];

// Object — data terstruktur
let user = {
  name: "Andi",
  age: 25,
  isStudent: true
};
```

---

## Console (Output ke Developer Console)

```javascript
// Buka DevTools (F12) → tab Console

console.log("Hello!");              // output biasa
console.error("Error terjadi!");     // output error (merah)
console.warn("Peringatan!");         // output warning (kuning)
console.table([{nama: "Andi", age: 25}]); // tabel
```

---

## DOM Manipulation (Mengubah HTML dari JS)

### Pilih elemen:
```javascript
// Pilih elemen pertama yang cocok
const judul = document.querySelector("h1");
const card = document.querySelector(".card");

// Pilih SEMUA elemen yang cocok
const semuaParagraf = document.querySelectorAll("p");
```

### Ubah konten:
```javascript
// Ubah teks
judul.textContent = "Judul Baru!";

// Ubah HTML
card.innerHTML = "<p>Paragraf baru</p>";

// Ubah style
card.style.backgroundColor = "yellow";
card.style.padding = "20px";
```

### Buat elemen baru:
```javascript
// Buat elemen baru
const baris = document.createElement("li");
baris.textContent = "Item baru";

// Tambahkan ke parent
const list = document.querySelector("ul");
list.appendChild(baris);
```

---

## Event (Interaksi Pengguna)

```javascript
// Click event
const tombol = document.querySelector("#btn");

tombol.addEventListener("click", function() {
  alert("Tombol ditekan!");
});

// Input event
const input = document.querySelector("#nama");
input.addEventListener("input", function(e) {
  console.log("Ketikan:", e.target.value);
});
```

---

## Logika Dasar (If / Else)

```javascript
let umur = 17;

if (umur >= 18) {
  console.log("Boleh voting");
} else if (umur >= 17) {
  console.log("Boleh bikin KTP");
} else {
  console.log("Masih di bawah umur");
}
```

---

## Loop (Perulangan)

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log("Nomor: " + i);
}

// forEach (untuk array)
const fruits = ["Apel", "Mangga", "Jeruk"];
fruits.forEach(function(fruit) {
  console.log(fruit);
});

// map (transform array)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

---

## Contoh Lengkap: Counter

### HTML (`index.html`):
```html
<h1 id="count">0</h1>
<button id="btn-plus">+</button>
<button id="btn-minus">−</button>
<script src="script.js"></script>
```

### JavaScript (`script.js`):
```javascript
// Ambil elemen
const display = document.querySelector("#count");
const btnPlus = document.querySelector("#btn-plus");
const btnMinus = document.querySelector("#btn-minus");

// Variabel counter
let count = 0;

// Event listener
btnPlus.addEventListener("click", function() {
  count++;
  display.textContent = count;
});

btnMinus.addEventListener("click", function() {
  count--;
  display.textContent = count;
});
```

---

## Debugging (Mencari Error)

### Cara 1: console.log()
```javascript
console.log("nilai count:", count);
console.log("elemen:", tombol);
```

### Cara 2: Chrome DevTools Breakpoint
1. Buka DevTools (`F12`)
2. Klik tab **Sources**
3. Klik nomor baris untuk set breakpoint
4. Refresh halaman → eksekusi berhenti di breakpoint
5. Gunakan tombol play/step untuk lanjut

### Cara 3: debugger;
```javascript
function hitung() {
  debugger; // browser akan pause di sini
  // ...
}
```

---

## Mini-Challenge

Buat To-Do List sederhana:

- [ ] Form input + tombol "Tambah"
- [ ] List todo yang muncul di bawah
- [ ] Klik todo = toggle selesai (line-through)
- [ ] Tombol hapus untuk setiap todo
- [ ] Simpan ke `localStorage` (tidak hilang saat refresh)

---

## Ringkasan

```
JavaScript Fundamental:
├── 2 cara pasang JS     → internal <script>, external <script src="">
├── Variabel            → let (bisa reassign), const (tidak bisa)
├── Tipe Data           → string, number, boolean, array, object
├── Console             → console.log(), console.error()
├── DOM                 → querySelector(), textContent, innerHTML
├── Event               → addEventListener("click", function(){...})
├── Logic               → if/else, for, while, forEach, map
└── Debug               → console.log, breakpoint, debugger
```

---

**Lanjut ke:** [05-debug-chrome-devtools.md](./05-debug-chrome-devtools.md)
# TUTORIAL 03 — JavaScript untuk Pemula: Interaktif tanpa Ribet

## Tujuan
Kamu akan belajar cara menambahkan JavaScript ke website HTML agar bisa interaktif — tombol yang bisa diklik, form yang bisa divalidasi, dll.

---

## Langkah 1: Buat File HTML

```bash
mkdir -p ~/Documents/js-pertama
cd ~/Documents/js-pertama
touch index.html script.js
code .
```

---

## Langkah 2: HTML dengan Tombol

Ketik di `index.html`:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Interaktif</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
    }
    .card {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 10px 0;
      border-radius: 8px;
    }
    button {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
    }
    button:hover {
      background: #2980b9;
    }
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
    }
    #output {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      min-height: 50px;
    }
  </style>
</head>
<body>

  <h1>Belajar JavaScript Interaktif</h1>

  <!-- Contoh 1: Click Handler -->
  <div class="card">
    <h2>1. Tombol Counter</h2>
    <p>Counter: <span id="counter">0</span></p>
    <button onclick="increase()">+1</button>
    <button onclick="decrease()">-1</button>
    <button onclick="reset()">Reset</button>
  </div>

  <!-- Contoh 2: Input Text -->
  <div class="card">
    <h2>2. Input Nama</h2>
    <input type="text" id="nameInput" placeholder="Masukkan nama...">
    <button onclick="greet()">Sapa!</button>
    <p id="greeting"></p>
  </div>

  <!-- Contoh 3: List -->
  <div class="card">
    <h2>3. Todo List</h2>
    <input type="text" id="todoInput" placeholder="Tugas baru...">
    <button onclick="addTodo()">Tambah</button>
    <ul id="todoList"></ul>
  </div>

  <!-- Contoh 4: Toggle -->
<div class="card">
    <h2>4. Dark Mode Toggle</h2>
    <button onclick="toggleDarkMode()">🌙 Dark Mode</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

---

## Langkah 3: JavaScript Interaktif

Ketik di `script.js`:

### Contoh 1: Counter

```javascript
// Variabel counter
let count = 0;
const counterDisplay = document.getElementById('counter');

function increase() {
  count++;
  counterDisplay.textContent = count;
}

function decrease() {
  count--;
  counterDisplay.textContent = count;
}

function reset() {
  count = 0;
  counterDisplay.textContent = count;
}
```

### Contoh 2: Input & Greeting

```javascript
const nameInput = document.getElementById('nameInput');
const greeting = document.getElementById('greeting');

function greet() {
  const name = nameInput.value.trim();

  if (name === '') {
    greeting.textContent = 'Tolong masukkan nama terlebih dahulu!';
    greeting.style.color = 'red';
    return;
  }

  const hour = new Date().getHours();
  let timeGreeting;

  if (hour < 12) {
    timeGreeting = 'Selamat Pagi';
  } else if (hour < 15) {
    timeGreeting = 'Selamat Siang';
  } else if (hour < 18) {
    timeGreeting = 'Selamat Sore';
  } else {
    timeGreeting = 'Selamat Malam';
  }

  greeting.textContent = `${timeGreeting}, ${name}! 👋`;
  greeting.style.color = 'green';
}
```

### Contoh 3: Todo List

```javascript
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

function addTodo() {
  const text = todoInput.value.trim();

  if (text === '') {
    alert('Tugas tidak boleh kosong!');
    return;
  }

  // Buat elemen list
  const li = document.createElement('li');
  li.textContent = text;

  // Tombol hapus
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Hapus';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.onclick = function() {
    li.remove();
  };

  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  // Clear input
  todoInput.value = '';
  todoInput.focus();
}
```

### Contoh 4: Dark Mode

```javascript
function toggleDarkMode() {
  const body = document.body;
  const currentBg = body.style.backgroundColor;

  if (currentBg === 'black' || currentBg === '#000') {
    // Mode terang
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
  } else {
    // Mode gelap
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
  }
}
```

---

## Hasil Akhir

Buka `index.html` di browser dan coba:
1. Klik tombol +1 / -1 → counter berubah
2. Ketik nama → klik "Sapa!" → muncul sapaan
3. Tambah tugas → lihat list grow
4. Klik Dark Mode → warna berubah

---

## Konsep JavaScript yang Dipelajari

### DOM Manipulation
```javascript
document.getElementById('counter')    // Ambil elemen by ID
element.textContent = 'halo' // Ubah teks
element.value = 'nilai'               // Ubah value input
element.style.backgroundColor         // Ubah CSS
```

### Events
```javascript
onclick="functionName()"              // HTML attribute
element.onclick = function() {} // JavaScript way
```

### Conditional
```javascript
if (text === '') {
  alert('Pesan');
 return;
}
```

### Array& Loop
```javascript
document.createElement('li')         // Buat elemen baru
element.appendChild(child)            // Tambahkan ke parent
element.remove()                     // Hapus elemen
```

---

## Ringkasan

```
JavaScript Interaktif:
├── getElementById → Ambil elemen HTML
├── textContent    → Ubah teks
├── onclick        → Event handler
├── createElement  → Buat elemen baru
├── appendChild    → Tambahkan ke parent
└── remove()       → Hapus elemen
```
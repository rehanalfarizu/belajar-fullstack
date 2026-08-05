# TUTORIAL 01 — Membuat Aplikasi React Pertama

## Tujuan
Kamu akan membuat aplikasi React pertama dari nol menggunakan Vite, memahami struktur folder, dan menulis komponen sederhana.

---

## Apa yang Akan Dibuat

Aplikasi daftar tugas (Todo List) sederhana dengan:
- Menampilkan list tugas
- Menambah tugas baru
- Toggle selesai/belum
- Hapus tugas

---

## Langkah 1: Install Node.js

Pastikan Node.js sudah terinstall:

```bash
node --version  # minimal v18
npm --version
```

Jika belum, lihat **software/01-nodejs-install.md** di Level 2.

---

## Langkah 2: Buat Project React dengan Vite

**Vite** adalah build tool yang lebih cepat dari Create React App.

```bash
# Buat project baru
npm create vite@latest todo-app -- --template react

# Masuk ke folder
cd todo-app

# Install dependencies
npm install

# Install dependencies tambahan
npm install
```

---

## Langkah 3: Lihat Struktur Folder

```
todo-app/
├── index.html              # Entry HTML
├── package.json            # Dependencies & scripts
├── vite.config.js          # Konfigurasi Vite
├── public/                 # File statis
│   └── vite.svg
└── src/
    ├── main.jsx            # Entry point React
    ├── App.jsx             # Komponen utama
    ├── App.css             # Styling App
    ├── index.css           # Global styles
    └── assets/             # Gambar, font, dll
        └── react.svg
```

---

## Langkah 4: Jalankan Development Server

```bash
npm run dev
```

Akan muncul:
```
  VITE v5.x.x  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  �azunan  ➜  press h + enter to show help
```

Buka **http://localhost:5173** di browser!

---

## Langkah 5: Buat Komponen TodoApp

Hapus semua isi `src/App.jsx` dan ganti dengan:

```jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Belajar React', done: false },
    { id: 2, text: 'Buat project portfolio', done: false },
    { id: 3, text: 'Kumpul tugas Praktikum', done: true },
  ]);
  const [input, setInput] = useState('');

  // Tambah todo baru
  function addTodo() {
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  }

  // Toggle selesai/belum
  function toggleTodo(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  // Hapus todo
  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="app">
      <h1>📝 Daftar Tugas</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Tambah tugas baru..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.length === 0 && (
          <li className="empty">Tidak ada tugas. Tambahkan yang baru!</li>
        )}

        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id)} className="todo-text">
              {todo.done ? '✅' : '⬜'} {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {/* Counter */}
      <p className="counter">
        {todos.filter(t => t.done).length} / {todos.length} selesai
      </p>
    </div>
  );
}

export default App;
```

---

## Langkah 6: Styling

Ganti isi `src/App.css`:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.app {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #1e293b;
}

/* Input */
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.input-section input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-section input:focus {
  border-color: #3b82f6;
}

.input-section button {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.input-section button:hover {
  background: #2563eb;
}

/* List */
.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  transition: background 0.2s;
}

.todo-list li:hover {
  background: #f1f5f9;
}

.todo-list li.done .todo-text {
  text-decoration: line-through;
  color: #94a3b8;
}

.todo-text {
  cursor: pointer;
  flex: 1;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 8px;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 24px;
}

/* Counter */
.counter {
  text-align: center;
  margin-top: 20px;
  color: #64748b;
  font-size: 0.9rem;
}
```

---

## Langkah 7: Lihat Hasil

```bash
npm run dev
```

Buka **http://localhost:5173**

---

## Konsep yang Dipelajari

### Komponen
```jsx
function App() {
  return <div>Hello World</div>;
}
export default App;
```

### State dengan useState
```jsx
const [todos, setTodos] = useState([]);
```

### Props
```jsx
// Parent
<Komponen nama="Andi" age={25} />

// Child
function Komponen({ nama, age }) {
  return <p>{nama} - {age}</p>;
}
```

### Render List dengan map
```jsx
{todos.map(todo => (
  <li key={todo.id}>{todo.text}</li>
))}
```

### Event Handler
```jsx
<button onClick={addTodo}>Tambah</button>
<input onChange={e => setInput(e.target.value)} />
<input onKeyDown={e => e.key === 'Enter' && addTodo()} />
```

---

## Tantangan Modifikasi

1. **Tambah filter**: All / Aktif / Selesai
2. **Tambah edit**: Klik dua kali untuk edit teks
3. **Tambah priority**: High, Medium, Low
4. **Simpan ke localStorage**: Data tidak hilang saat refresh
5. **Animasi**: Gunakan library framer-motion

---

## Ringkasan

```
React Steps:
1. npm create vite@latest app -- --template react
2. cd app && npm install
3. npm run dev
4. Tulis komponen di App.jsx
5. Styling di App.css
6. Jalankan dan test
```
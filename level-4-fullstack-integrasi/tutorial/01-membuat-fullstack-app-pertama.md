# TUTORIAL 01 — Membuat Fullstack App: React + Express + PostgreSQL

## Tujuan
Kamu akan membuat aplikasi fullstack lengkap dari nol: frontend React, backend Express, dan database PostgreSQL.

---

## Arsitektur yang Akan Dibuat

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React App     │ ──────→ │   Express API   │ ──────→ │   PostgreSQL    │
│ (Frontend)     │  HTTP   │   (Backend)     │  SQL    │   (Database)    │
│  localhost:5173 │         │  localhost:3000 │         │   port: 5432    │
└─────────────────┘ ←────── └─────────────────┘ ←────── └─────────────────┘
```

---

## Langkah 1: Persiapan Folder

```
fullstack-app/
├── client/          # React Frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── server/          # Express Backend
    ├── src/
    ├── package.json
    └── .env
```

Buat folder-nya:

```bash
mkdir -p fullstack-app/client fullstack-app/server
```

---

## Langkah 2: Setup Database PostgreSQL

### a. Buat Database

```bash
psql -U postgres

# Di dalam psql:
CREATE DATABASE fullstack_app;
\c fullstack_app

# Buat tabel
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Insert sample data
INSERT INTO todos (text, done) VALUES
  ('Belajar React', false),
  ('Setup Express API', false),
  ('Koneksi ke PostgreSQL', true);
```

### b. Buat file .env

Di folder `server/`, buat file `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fullstack_app
DB_USER=postgres
DB_PASSWORD=password-yang-dipasang
```

---

## Langkah 3: Setup Backend (Express)

```bash
cd fullstack-app/server

# Inisialisasi
npm init -y

# Install dependencies
npm install express pg cors dotenv
npm install --save-dev nodemon
```

### a. Entry Point

Buat file `src/index.js`:

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // React dev server
}));
app.use(express.json());

// Routes
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await pool.query(
      'INSERT INTO todos (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    const result = await pool.query(
      'UPDATE todos SET done = $1 WHERE id = $2 RETURNING *',
      [done, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
```

### b. Database Connection

Buat file `src/db.js`:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL!');
});

module.exports = pool;
```

### c. Update package.json Scripts

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

### d. Jalankan Backend

```bash
npm run dev
# Server jalan di http://localhost:3000
```

---

## Langkah 4: Setup Frontend (React)

```bash
cd ../client

# Buat project Vite React
npm create vite@latest . -- --template react

# Install dependencies
npm install
npm install axios
```

### a. Ganti App.jsx

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Fetch todos dari backend
  async function fetchTodos() {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error('Gagal fetch todos:', err);
    }
  }

  // Load todos saat mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Tambah todo
  async function addTodo() {
    if (!input.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/todos`, { text: input });
      setTodos([res.data, ...todos]);
      setInput('');
    } catch (err) {
      console.error('Gagal tambah todo:', err);
    }
  }

  // Toggle done
  async function toggleTodo(todo) {
    try {
      const res = await axios.put(`${API_URL}/todos/${todo.id}`, {
        done: !todo.done
      });
      setTodos(todos.map(t => t.id === todo.id ? res.data : t));
    } catch (err) {
      console.error('Gagal update todo:', err);
    }
  }

  // Hapus todo
  async function deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error('Gagal hapus todo:', err);
    }
  }

  return (
    <div className="app">
      <h1>📝 Fullstack Todo App</h1>

      <div className="input-section">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Tambah tugas..."
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo)}>
              {todo.done ? '✅' : '⬜'} {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### b. Styling (sama seperti tutorial React sebelumnya)

### c. Jalankan Frontend

```bash
npm run dev
# Frontend jalan di http://localhost:5173
```

---

## Langkah 5: Test Aplikasi

1. Buka **http://localhost:5173** (Frontend)
2. Buka **http://localhost:3000/api/todos** (Backend - harusnya muncul JSON)
3. Tambah, toggle, hapus todo di frontend
4. Cek database:

```bash
psql -U postgres -d fullstack_app
SELECT * FROM todos;
```

---

## Konsep Fullstack yang Dipelajari

### CORS (Cross-Origin Resource Sharing)
```javascript
app.use(cors({
  origin: 'http://localhost:5173' // Izinkan request dari frontend
}));
```

### Axios (HTTP Client)
```javascript
axios.get(url)           // GET
axios.post(url, data)     // POST
axios.put(url, data)      // PUT
axios.delete(url)         // DELETE
```

### Async/Await dengan Database
```javascript
async function getTodos(req, res) {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

### Environment Variables
```javascript
require('dotenv').config();
const PORT = process.env.PORT;
```

---

## Ringkasan

```
Fullstack App:
1. Buat database PostgreSQL + tabel todos
2. Setup Express backend (port 3000)
3. Setup React frontend (port 5173)
4. Hubungkan dengan axios
5. Handle CORS di backend
6. Simpan credentials di .env
```
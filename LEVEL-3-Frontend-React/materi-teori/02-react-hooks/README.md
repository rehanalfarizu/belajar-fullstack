# 📘 MATERI TEORI 02 — React Hooks

## 1. Apa itu Hooks?

Hooks = fungsi khusus React yang memungkinkan menggunakan **state** dan **fitur React** di dalam function component.

```
Aturan Hooks:
1. Hanya dipanggil di TOP LEVEL component (bukan di dalam loops, if, nested function)
2. Hanya dipanggil dari Function Components atau Custom Hooks
3. Nama fungsi HARUS prefix "use" (convention)
```

---

## 2. useState — State Lokal

```jsx
import { useState } from "react";

// Basic
const [count, setCount] = useState(0);

// Array
const [items, setItems] = useState([]);

// Object
const [form, setForm] = useState({ name: "", email: "" });

// Boolean toggle
const [isVisible, setIsVisible] = useState(false);

// Lazy initialization (untuk data expensive, hanya jalan saat init)
const [data, setData] = useState(() => {
  const saved = localStorage.getItem("data");
  return saved ? JSON.parse(saved) : [];
});
```

---

## 3. useEffect — Side Effects

useEffect = jalankan kode saat **component mount, update, atau unmount**.

```jsx
import { useState, useEffect } from "react";

// Syntax lengkap:
useEffect(() => {
  // effect function
  return () => {
    // cleanup function (optional)
  };
}, [dependencyArray]);
```

### useEffect dengan Cleanup

```jsx
import { useState, useEffect } from "react";

function UserStatus({ userId }) {
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    // Subscribe ke event (component mount)
    const handler = (newStatus) => setStatus(newStatus);
    subscribe(userId, handler);

    // Cleanup — jalan sebelum component unmount atau dependency berubah
    return () => unsubscribe(userId, handler);
  }, [userId]); // jalan ulang kalau userId berubah

  return <div>Status: {status}</div>;
}
```

### Common Patterns

```jsx
// 1. Run sekali saat mount (empty array)
useEffect(() => {
  document.title = "Halaman Dashboard";
  fetchUserData();
  // [] = hanya jalan saat pertama kali render
}, []);

// 2. Run saat state tertentu berubah
useEffect(() => {
  const filtered = allItems.filter(item => item.name.includes(searchTerm));
  setFilteredItems(filtered);
}, [searchTerm, allItems]); // jalan ulang kalau searchTerm atau allItems berubah

// 3. Run setiap render (tanpa array) — AVOID, gunakan kalau perlu
useEffect(() => {
  console.log("Component dirender ulang!");
  // tanpa array = jalan setiap render
});

// 4. Cleanup pattern (timer, subscription)
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  return () => clearInterval(timer); // bersihkan timer
}, []);
```

### Fetch Data dengan useEffect

```jsx
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // guard untuk handle race condition

    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Gagal fetch");
        const data = await res.json();
        if (!cancelled) {
          setUsers(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();

    return () => { cancelled = true; }; // cleanup race condition
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

---

## 4. useRef — Akses DOM & Simpan Data Mutable

useRef tidak menyebabkan re-render saat nilainya berubah.

```jsx
import { useRef } from "react";

// Akses DOM element
function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus(); // akses DOM langsung
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Fokus ke input</button>
    </div>
  );
}
```

```jsx
// Simpan nilai tanpa re-render
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); // mutable, tidak menyebabkan re-render

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div>
      <p>{seconds} detik</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

```jsx
// previous state dengan ref
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(null);

  useEffect(() => {
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Sekarang: {count}, sebelumnya: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

---

## 5. useContext — Sharing Data Tanpa Props Drilling

Context = cara share data ke **semua component** tanpa props passing manual.

```jsx
// 1. Buat Context
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

```jsx
// 2. Consume di component mana saja
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav style={{ background: theme === "light" ? "#fff" : "#333" }}>
      <button onClick={toggleTheme}>
        Ganti Tema
      </button>
    </nav>
  );
}

// Atau dengan custom hook (lebih clean)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme harus di dalam ThemeProvider");
  return context;
}

function Footer() {
  const { theme } = useTheme(); // custom hook
  return <footer>Tema: {theme}</footer>;
}
```

```jsx
// 3. Wrap di App
function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <p>Halaman utama</p>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
```

### Multiple Contexts

```jsx
// Context terpisah — lebih kecil lebih baik
const AuthContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

// Atau combine dengan useReducer
```

---

## 6. useReducer — State Management Kompleks

useReducer = alternatif useState untuk state dengan **logika kompleks** (banyak sub-values atau state yang saling berhubungan).

```jsx
import { useReducer } from "react";

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ];

    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE":
      return state.filter(todo => todo.id !== action.payload);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch({ type: "ADD", payload: input });
    setInput("");
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Tambah</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "DELETE", payload: todo.id })}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "CLEAR" })}>Clear Semua</button>
    </div>
  );
}
```

### useReducer vs useState

```jsx
// useState — untuk state sederhana/independen
const [count, setCount] = useState(0);
const [name, setName] = useState("");
const [isOpen, setIsOpen] = useState(false);

// useReducer — untuk state kompleks/berelasi
// state = { filter: "", sort: "asc", page: 1, items: [] }
// action = { type: "SET_FILTER", payload: "active" }
```

---

## 7. Custom Hooks — Reusable Logic

Custom Hook = fungsi yang menggunakan hooks React.

```jsx
// useWindowSize — pantau ukuran window
import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// Usage
function App() {
  const { width, height } = useWindowSize();
  return (
    <p>Window: {width}x{height}</p>
  );
}
```

```jsx
// useFetch — generic fetch hook
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data: users, loading, error } = useFetch("/api/users");
```

```jsx
// useLocalStorage — persist state ke localStorage
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Gagal simpan ke localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [name, setName] = useLocalStorage("user-name", "");
```

```jsx
// useDebounce — delay update (untuk search)
import { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery); // hanya jalan 300ms setelah user stop typing
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

---

## 8. useMemo & useCallback — Performance Optimization

```jsx
import { useMemo, useCallback } from "react";

// useMemo — memoize hasil komputasi
function ExpensiveList({ items, filter }) {
  // Hanya recompute kalau items atau filter berubah
  const filteredItems = useMemo(() => {
    console.log("Filtering..."); // untuk demo
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// useCallback — memoize function definition
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Tanpa useCallback — function baru setiap render
  const handleClick = () => console.log("Klik!");

  // ✅ Dengan useCallback — function sama selama deps tidak berubah
  const handleClickMemo = useCallback(() => {
    console.log("Klik!");
  }, []);

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <Child onClick={handleClickMemo} onIncrement={handleIncrement} />;
}
```

---

## Ringkasan

```
React Hooks
├── useState       → state lokal, functional update
├── useEffect      → side effects, cleanup, dependency array
├── useRef         → akses DOM, mutable value tanpa re-render
├── useContext     → global state sharing
├── useReducer     → state kompleks dengan reducer pattern
├── useMemo        → memoize hasil komputasi
├── useCallback    → memoize function definition
└── Custom Hooks    → useWindowSize, useFetch, useLocalStorage, useDebounce
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/02-latihan-hooks/`
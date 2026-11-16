# 📘 MATERI TEORI 01 — React & JSX

## 1. Apa itu React?

React = **library JavaScript** untuk membangun **user interface** (UI) berbasis komponen.

```
Angular  → Framework lengkap (routing, DI, forms, dll)
Vue      → Framework progresif
React    → Library UI (bisa dipadukan dengan tools lain)

React khusus untuk: UI components, state management, rendering
```

### Konsep Inti React:

```
1. Komponen   → UI dipecah jadi komponen kecil yang reusable
2. JSX        → Sintaks yang mirip HTML di dalam JavaScript
3. Virtual DOM → Representasi virtual dari DOM (untuk performa)
4. Unidirectional Data Flow → Data mengalir satu arah: parent → child
5. Declarative → "Ini yang saya mau" bukan "Lakukan langkah ini"
```

---

## 2. JSX — Sintaks untuk UI

JSX = JavaScript XML — cara menulis UI di JavaScript.

```jsx
// JSX: declaratif (ini yang mau saya lihat)
const element = <h1>Halo, Andi!</h1>;

//Plain JS: imperatif (langkah-langkah yang harus dilakukan)
// document.createElement("h1")... dst
```

### JSX vs HTML (Perbedaan Penting)

```jsx
// class → className (class adalah keyword JS)
<div className="card">...</div>

// for → htmlFor (for adalah keyword JS)
<label htmlFor="email">Email:</label>

// style → object (harus object bukan string)
<div style={{ color: "red", fontSize: "16px" }}>
  Teks merah
</div>

// self-closing tag harus ada /
<input type="text" />
<br />
<hr />
<img src="photo.jpg" />
```

### JSX Expression

```jsx
const name = "Andi";
const age = 25;

// Curly braces — masukkan ekspresi JS
const element = (
  <div>
    <h1>Halo, {name}!</h1>
    <p>Umur: {age}</p>
    <p>Dalam 5 tahun: {age + 5}</p>
    <p>10 + 20 = {10 + 20}</p>
    {/* Komentar dalam JSX */}
  </div>
);
```

### Conditional Rendering

```jsx
const isLoggedIn = true;
const user = { name: "Andi" };

// Ternary — yang paling umum
{isLoggedIn ? <h1>Halo, {user.name}</h1> : <h1>Halo, Guest</h1>}

// && — tampilkan kalau true
{isLoggedIn && <button>Logout</button>}

// || — fallback value
{user.name || "Guest"}

// If-else — tidak bisa di JSX, gunakan variabel
let content;
if (isLoggedIn) {
  content = <Dashboard />;
} else {
  content = <LoginPage />;
}
return <div>{content}</div>;
```

### Rendering List

```jsx
const fruits = ["Apel", "Mangga", "Jeruk"];

// Map + key (key harus unik!)
const list = fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
));

return <ul>{list}</ul>;

// Atau inline
return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);
```

---

## 3. Component (Function Component)

Component = fungsi yang return JSX.

```jsx
// Functional component (cara modern)
function Header() {
  return (
    <header>
      <h1>Belajar React</h1>
      <nav>
        <a href="/">Beranda</a>
        <a href="/about">Tentang</a>
      </nav>
    </header>
  );
}

// Arrow function component
const Footer = () => {
  return <footer>&copy; 2026 Fullstack App</footer>;
};

// Component dipanggil seperti HTML tag
// Nama HARUS capitalize!
function App() {
  return (
    <div>
      <Header />
      <main>
        <p>Selamat datang!</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

---

## 4. Props — Data dari Parent ke Child

Props = **parameter** yang diberikan dari parent component ke child.

```jsx
// Child component — menerima props sebagai parameter
function UserCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Email: {props.email}</p>
      <span>Role: {props.role}</span>
    </div>
  );
}

// Parent component — kirim data lewat props
function App() {
  const user = {
    name: "Andi Wijaya",
    email: "andi@email.com",
    role: "admin"
  };

  return (
    <div>
      {/* Kirim data sebagai attribute */}
      <UserCard
        name={user.name}
        email={user.email}
        role={user.role}
      />
    </div>
  );
}
```

### Destructuring Props

```jsx
// Cara 1: Destructure di dalam function parameter
function UserCard({ name, email, role }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
}

// Cara 2: Destructure di dalam function body
function UserCard(props) {
  const { name, email, role } = props;
  return <div>{name}</div>;
}
```

### Default Props

```jsx
// Cara 1: Default parameter
function Button({ label = "Klik", variant = "primary" }) {
  return <button className={`btn btn-${variant}`}>{label}</button>;
}

// Cara 2: defaultProps (deprecated tapi masih jalan)
Button.defaultProps = {
  label: "Klik",
  variant: "primary"
};

// Penggunaan
<Button />                      // label="Klik", variant="primary"
<Button label="Simpan" />       // variant="primary"
<Button label="Hapus" variant="danger" />
```

### children Props

```jsx
// children = konten antara opening & closing tag
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Parent kirim children
function App() {
  return (
    <Card title="Judul Card">
      <p>Ini isi card yang passed sebagai children.</p>
      <button>Tombol di dalam card</button>
    </Card>
  );
}
```

---

## 5. State — Data yang Bisa Berubah

State = data internal component yang **bisa berubah** dan membuat component **re-render**.

```jsx
import { useState } from "react";

function Counter() {
  // useState(initialValue) → [currentValue, setterFunction]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### multiple States

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
```

### Object State

```jsx
function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  // Update satu field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // ...prev = copy semua field lama, [name] = override field yang changed
  };

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="age" value={form.age} onChange={handleChange} />
    </form>
  );
}
```

### Functional Update (untuk state berbasis previous value)

```jsx
const [count, setCount] = useState(0);

// ✅ Benar — gunakan functional update
setCount((prev) => prev + 1);  // selalu benar karena berbasis prev
setCount((prev) => prev * 2);

// ❌ Risk — berdasarkan nilai saat ini (bisa salah di async)
setCount(count + 1);

// Contoh: increment 2x
// Kalau async, count bisa sudah berubah
setCount(count + 1); // 0+1=1
setCount(count + 1); // masih 0+1=1 ❌ (race condition!)

// ✅ Functional update
setCount((prev) => prev + 1); // prev=0 → 1
setCount((prev) => prev + 1); // prev=1 → 2 ✅
```

---

## 6. Rendering Cycle (Alur Render)

```
┌─────────────────────────────────────────┐
│  1. State berubah / Props berubah       │
│         │                               │
│         ▼                               │
│  2. React RE-RENDER component          │
│         │                               │
│         ▼                               │
│  3. Virtual DOM baru dibanding VDOM lama│
│         │                               │
│         ▼                               │
│  4. Yang beda → update DOM real        │
└─────────────────────────────────────────┘
```

```jsx
// Render dipanggil ulang setiap state berubah
function App() {
  const [name, setName] = useState("Andi");

  // Render 1: name="Andi"
  // User ketik "Budi" → setName("Budi") → Render 2
  // User ketik "Citi" → setName("Citi") → Render 3

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

### Controlled vs Uncontrolled Component

```jsx
// Controlled — React yang kontrol value input
// (paling direkomendasikan)
function ControlledInput() {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// Uncontrolled — DOM yang kontrol value (nilai asli saat mounted)
// (kurang direkomendasikan untuk form)
function UncontrolledInput() {
  let inputRef; // ref untuk akses DOM langsung
  return <input ref={(el) => (inputRef = el)} />;
}
```

---

## 7. Event Handling

```jsx
function EventDemo() {
  // Click event
  const handleClick = () => console.log("Klik!");
  const handleClickWithParam = (name) => console.log(`Halo, ${name}!`);

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form submitted!");
  };

  // Input change
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
  };

  // Mouse events
  const handleMouseEnter = () => console.log("Mouse masuk!");
  const handleMouseLeave = () => console.log("Mouse keluar!");

  return (
    <div>
      {/* onClick — arrow function di JSX */}
      <button onClick={handleClick}>Klik saya</button>
      <button onClick={() => handleClickWithParam("Andi")}>Klik dengan param</button>

      <form onSubmit={handleSubmit}>
        <input name="email" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>

      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Hover ke saya
      </div>

      {/* Keyboard */}
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") console.log("Enter ditekan!");
        }}
      />

      {/* Prevent default behavior */}
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Google (prevent default)
      </a>
    </div>
  );
}
```

---

## 8. Component Composition Pattern

```jsx
// Wrapper component dengan children
function Layout({ children }) {
  return (
    <div className="layout">
      <header />
      <main>{children}</main>
      <footer />
    </div>
  );
}

// Usage
<Layout>
  <Dashboard />
  <Sidebar />
</Layout>

// Polymorphic component — tag bisa berubah
function Text({ as: Tag = "p", children }) {
  return <Tag className="text">{children}</Tag>;
}

<Text as="h1">Judul</Text>    // renders <h1>
<Text as="h2">Sub Judul</Text> // renders <h2>
<Text>Paragraf</Text>         // renders <p>
```

---

## 9. StrictMode (Development Only)

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// StrictMode di development:
// - Render component 2x (deteksi side effects)
// - Cek apakah ada deprecated API
// - Aktifkan extra checks untuk Hooks
```

---

## Ringkasan

```
React & JSX
├── JSX        → sintaks UI di JS, className, htmlFor, style={object}
├── Component  → function yang return JSX, nama capitalized
├── Props      → data dari parent, read-only, children
├── State      → useState, re-render saat berubah, functional update
├── Conditional → ternary, &&, ||
├── List       → .map() + key
├── Events     → onClick, onChange, onSubmit, onKeyDown, dll
└── Composition → children, polymorphic
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/01-latihan-react/`
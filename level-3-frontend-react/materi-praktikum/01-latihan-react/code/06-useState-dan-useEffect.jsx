// ============================================================
// SOAL 06 — USESTATE DAN USEEFFECT
// ============================================================
// Setup: npm create vite@latest latihan-react -- --template react
// Jalankan: cd latihan-react && npm start
// ============================================================

import React, { useState, useEffect } from "react";

// ============================================================
// SOAL 6A — InteractiveCounter (useState dengan Updater Function)
// State: count (number, default: 0), step (number, default: 1)
//
// Fitur:
// - Tombol +: setCount(prev => prev + step)
// - Tombol -: setCount(prev => prev - step)
// - Tombol Reset: setCount(0)
// - Step selector: radio/select untuk step (1, 5, 10), default: 1
// - Tampilkan "Genap" / "Ganjil" berdasarkan count % 2
// - Styling: ganjil = biru, genap = hijau, 0 = abu-abu
// - Tombol - disabled hanya saat count === 0 (opsional)
// ============================================================

function InteractiveCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // TODO(human): Implementasikan handleIncrement, handleDecrement, handleReset
  // TODO(human): Gunakan updater function: setCount(prev => prev + step)
  // TODO(human): Tentukan warna berdasarkan genap/ganjil/0
  // TODO(human): Step selector dengan radio button atau select

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      {/* TODO(human): Render counter UI di sini */}
    </div>
  );
}

// ============================================================
// SOAL 6B — PasswordRevealer (Boolean Toggle)
// State:
// - showPassword: boolean (default: false) — toggle input type
// - remember: boolean (default: false) — checkbox independent
//
// Fitur:
// - Input type switchable: "password" ↔ "text"
// - Tombol toggle: "Show" / "Hide"
// - Checkbox "Remember this device" — state terpisah dari password visibility
// - Props: defaultPassword (string), label (string)
//
// Contoh: <PasswordRevealer defaultPassword="Rahasia123!" label="Password Akun" />
// ============================================================

function PasswordRevealer({ defaultPassword = "", label = "Password" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [remember, setRemember] = useState(false);

  // TODO(human): Toggle visibility dengan setIsVisible(prev => !prev)
  // TODO(human): Checkbox remember independent dari visibility

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
      {/* TODO(human): Label + Input + Toggle button */}
      {/* TODO(human): Checkbox "Remember this device" */}
    </div>
  );
}

// ============================================================
// SOAL 6C — TodoList (Multiple State)
// State:
// - todos: array [{ id: number, text: string, completed: boolean }]
// - inputValue: string
// - filter: "all" | "active" | "completed"
//
// Fitur:
// - Add todo: Enter atau tombol "Add" — ID baru: Date.now()
// - Toggle complete: klik checkbox/teks todo
// - Delete todo: tombol "x" per item
// - Filter: 3 tombol (All, Active, Completed)
// - Clear completed: tombol hapus semua yang completed
// - Count: "X items left" — hanya yang belum completed
// - Empty state: "Semua tugas selesai!" jika semua completed
//
// Initial data:
// [
//   { id: 1, text: "Belajar React Hooks", completed: false },
//   { id: 2, text: "Buat project portfolio", completed: false },
//   { id: 3, text: "Baca dokumentasi React Router", completed: true },
// ]
// ============================================================

const initialTodos = [
  { id: 1, text: "Belajar React Hooks", completed: false },
  { id: 2, text: "Buat project portfolio", completed: false },
  { id: 3, text: "Baca dokumentasi React Router", completed: true },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  // TODO(human): handleAddTodo — validasi input, add dengan ID Date.now()
  // TODO(human): handleToggle — toggle completed
  // TODO(human): handleDelete — hapus berdasarkan ID
  // TODO(human): handleClearCompleted — hapus yang completed=true
  // TODO(human): filteredTodos — .filter() berdasarkan filter state
  // TODO(human): activeCount — todos.filter(t => !t.completed).length

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
      <h2>Todo List</h2>

      {/* Add form */}
      <form onSubmit={(e) => { e.preventDefault(); /* TODO(human): handleAdd */ }} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {/* TODO(human): Input + Tombol Add */}
      </form>

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {/* TODO(human): 3 tombol filter */}
      </div>

      {/* Todo list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* TODO(human): Render filteredTodos dengan .map() + key={todo.id} */}
      </ul>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
        {/* TODO(human): activeCount / "Semua tugas selesai!" */}
        {/* TODO(human): Tombol Clear completed (jika ada yang completed) */}
      </div>
    </div>
  );
}

// ============================================================
// SOAL 6D — BMICalculator (Derived State)
// State:
// - weight: number (kg), range: 30-200
// - height: number (cm), range: 100-250
//
// BMI: weight / (height/100)² — dibulatkan 1 desimal
// Kategori:
//   < 18.5 → "Kurus"
//   18.5 - 24.9 → "Normal"
//   25.0 - 29.9 → "Overweight"
//   >= 30 → "Obesitas"
//   Jika belum valid → tampilkan "—"
//
// Fitur:
// - Validasi real-time: error jika input di luar range
// - Tombol Reset: kosongkan semua input
// - BMI gauge visual: bar dengan warna kategori
//
// CATATAN: BMI adalah DERIVED STATE — hitung langsung di JSX, BUKAN useEffect
// ============================================================

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  // TODO(human): Hitung BMI dari weight dan height
  // weight = parseFloat, handle invalid: NaN
  // BMI = weight / (height/100)^2

  // TODO(human): Tentukan kategori berdasarkan BMI
  // < 18.5 → Kurus, 18.5-24.9 → Normal, 25-29.9 → Overweight, >= 30 → Obesitas

  // TODO(human): Validasi: tampilkan error jika weight < 30 atau > 200
  // dan height < 100 atau > 250

  // TODO(human): Reset handler — setWeight(""), setHeight("")

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
      <h2>BMI Calculator</h2>

      {/* Weight input */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Berat (kg)</label>
        <input
          type="text"
          value={weight}
          onChange={(e) => /* TODO(human): parseFloat dan setWeight */ {}}
          placeholder="Contoh: 65"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "1rem", boxSizing: "border-box" }}
        />
        {/* TODO(human): Error message jika weight di luar 30-200 */}
      </div>

      {/* Height input */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Tinggi (cm)</label>
        <input
          type="text"
          value={height}
          onChange={(e) => /* TODO(human): parseFloat dan setHeight */ {}}
          placeholder="Contoh: 170"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "1rem", boxSizing: "border-box" }}
        />
        {/* TODO(human): Error message jika height di luar 100-250 */}
      </div>

      {/* Reset button */}
      <button
        onClick={() => {
          // TODO(human): reset weight dan height
        }}
        style={{ marginBottom: "24px", padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", cursor: "pointer" }}
      >
        Reset
      </button>

      {/* BMI Display */}
      <div style={{ textAlign: "center", padding: "24px", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
        {/* TODO(human): Tampilkan BMI value dan kategori */}
        {/* TODO(human): BMI gauge bar dengan warna kategori */}
        {/* Kategori warna: Kurus=kuning, Normal=hijau, Overweight=oranye, Obesitas=merah */}
      </div>
    </div>
  );
}

// ============================================================
// App.jsx — Main Component
// ============================================================
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Demo: useState dan useEffect</h1>

      {/* SOAL 6A */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 6A — InteractiveCounter</h2>
        <InteractiveCounter />
      </section>

      {/* SOAL 6B */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 6B — PasswordRevealer</h2>
        <PasswordRevealer defaultPassword="Rahasia123!" label="Password Akun" />
      </section>

      {/* SOAL 6C */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 6C — TodoList</h2>
        <TodoList />
      </section>

      {/* SOAL 6D */}
      <section style={{ marginBottom: "32px" }}>
        <h2>Soal 6D — BMICalculator</h2>
        <BMICalculator />
      </section>
    </div>
  );
}

export default App;

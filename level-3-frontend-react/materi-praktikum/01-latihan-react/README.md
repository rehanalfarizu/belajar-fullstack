# Materi Praktikum 01 — React & Component Dasar

## Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu:

1. Memahami konsep dasar JSX (JavaScript XML) dan perbedaannya dengan HTML biasa
2. Mampu membuat functional component React sederhana
3. Memahami konsep props sebagai mekanisme passing data antar component
4. Mampu merender list menggunakan `.map()` dengan key yang tepat
5. Memahami perbedaan between element dan component

---

## Prasyarat

- Sudah memahami dasar-dasar JavaScript (ES6+: arrow function, destructuring, spread operator)
- Sudah memasang Node.js 24 LTS dan npm
- Sudah membuat project React dengan Vite: `npm create vite@latest my-app -- --template react`

---

## Konsep Dasar JSX

JSX adalah syntax extension untuk JavaScript yang memungkinkan kita menulis element React dalam style yang mirip HTML. WSX bukan string HTML maupun HTML biasa — ia dikompilasi menjadi pemanggilan fungsi `React.createElement()`.

### JSX vs HTML: Perbedaan Penting

| Aspek | HTML | JSX |
|---|---|---|
| Attribute | `class`, `for`, `onclick` | `className`, `htmlFor`, `onClick` |
| Penutup tag | `<br>`, `<img>` | `<br />`, `<img />` |
| Ekspresi | Tidak ada | `{}` untuk embed ekspresi JS |
| cased | lowercase | PascalCase untuk component |

### Contoh JSX Dasar

```jsx
// JSX dengan expression
const name = "Rehan";
const greeting = <h1>Halo, {name}!</h1>;

// Ekspresi matematika dalam JSX
const a = 10;
const element = <p>Hasil: {a * 2}</p>;

// Conditional dalam JSX
const isLoggedIn = true;
const user = (
  <div>
    <h1>{isLoggedIn ? "Selamat datang!" : "Silakan login"}</h1>
  </div>
);
```

---

## Functional Component

Component adalah blok kode yang reusable dan berdiri sendiri. Di React modern, functional component adalah fungsi yang mengembalikan JSX.

### Aturan Penamaan Component

- Nama **harus** dimulai dengan huruf kapital (PascalCase)
- Component harus mengembalikan JSX (sebaiknya dibungkus satu root element)

```jsx
// ✅ Benar
function Header() {
  return <header><h1>My App</h1></header>;
}

// ❌ Salah — tidak akan dirender sebagai component
function header() {
  return <header></header>;
}
```

### Component dengan Props

Props adalah argumen yang passed ke component. Props bersifat read-only (immutable).

```jsx
function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>Role: {role}</p>
    </div>
  );
}

// Pemanggilan component dengan props
<UserCard
  name="Rehan"
  role="Frontend Developer"
  avatar="https://i.pravatar.cc/150?img=1"
/>
```

---

## Props dan Children

Props khusus `children` memungkinkan kita melempar content ke dalam component tanpa tahu isinya di awal.

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="Profil">
  <p>Ini adalah content yang di-pass sebagai children.</p>
  <button>Action</button>
</Card>
```

---

## List Rendering dan Key

Ketika merender list di React, setiap element harus memiliki prop `key` yang unik. Key membantu React mengidentifikasi element mana yang berubah/tambah/hapus.

```jsx
const products = [
  { id: 1, name: "Laptop", price: 15000000 },
  { id: 2, name: "Mouse", price: 150000 },
  { id: 3, name: "Keyboard", price: 500000 },
];

function ProductList() {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} — Rp{product.price.toLocaleString("id-ID")}
        </li>
      ))}
    </ul>
  );
}
```

### Aturan Key yang Baik

- Gunakan ID unik dari data sebagai key
- Hindari index array sebagai key (karena berubah saat list di-sort/filter)
- Key harus unik di antara sibling, tapi TIDAK harus globally unique

---

## Studi Kasus: Component Composition

Implementasikan aplikasi daftar tugas sederhana dengan komponen berikut:

```
App
├── Header          ← judul dan info aplikasi
├── TodoForm        ← form input tugas baru
└── TodoList        ← daftar semua tugas
    └── TodoItem    ← satu item tugas (ulangi sesuai jumlah)
```

---

## Checklist Penyelesaian

- [ ] Semua component JSX menggunakan PascalCase
- [ ] List memiliki `key` prop dengan nilai unik
- [ ] Props digunakan untuk passing data antar component
- [ ] Code clean dan mudah dibaca

---

## Referensi Tambahan

- [React Docs: Introducing JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React Docs: Components](https://react.dev/learn/your-first-component)
- [React Docs: List & Key](https://react.dev/learn/rendering-lists)

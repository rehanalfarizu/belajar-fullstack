# Solusi — JANGAN DIBUKA DULU

Kerjakan soal sampai buntu, tulis dulu apa yang sudah kamu coba, baru buka file ini untuk membandingkan.

## 05-conditional-rendering.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 17–26 (sebelum diubah)

```jsx
Simulasi loading: setTimeout 1500ms → setIsLoading(false)
Login: setUser({ name: "Andi Wijaya", email: "andi@email.com", role: "admin" }), setIsLoggedIn(true)
Logout: setUser(null), setIsLoggedIn(false)

Conditional patterns yang harus digunakan:
1. Early return: if (isLoading) return <LoadingSpinner />
2. Ternary: isLoggedIn ? <Dashboard /> : <LoginForm />
3. Logical AND: user.role === "admin" && <AdminPanel />
4. Logical OR: displayName || "Guest User"
============================================================
```

## 08-custom-hooks.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 41–49 (sebelum diubah)

```jsx
const [value, setValue] = useState(() => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
});
============================================================
```

## 09-react-router-dasar.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 21–29 (sebelum diubah)

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>
============================================================
```

### Baris 67–75 (sebelum diubah)

```jsx
<nav style={{ display: "flex", gap: "16px", borderBottom: "1px solid #e2e8f0", padding: "16px" }}>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>

Bonus: NavLink dengan active class
<NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
============================================================
```

## 10-context-api.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 162–176 (sebelum diubah)

```jsx
<ThemeProvider>
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
</ThemeProvider>

Komponen:
- ThemeToggle: tombol toggle theme dengan useTheme()
- Navbar: theme + auth + cart summary
- ProductCatalog: list produk dengan addToCart
- CartDrawer: slide-out cart dengan useCart()
- Dashboard: user info + admin panel (jika role === "admin")
============================================================
```

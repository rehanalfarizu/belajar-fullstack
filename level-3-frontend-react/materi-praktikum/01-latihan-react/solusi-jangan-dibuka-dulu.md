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

## 02-props-dan-state Soal 01 — JSX Layout

```jsx
<div className="layout">
  <header className="layout-header">
    <h1>{title}</h1>
  </header>
  <main className="layout-content">
    {children}
  </main>
  <footer className="layout-footer">
    <p>&copy; 2024 Belajar React</p>
  </footer>
</div>
```

## 02-props-dan-state Soal 01 — JSX Section

```jsx
<div className="section">
  {heading && <h2>{heading}</h2>}
  {children}
</div>
```

## 03-component-patterns Soal 01 — withLoading

```js
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="loading-spinner">Memuat...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}
```

## 03-component-patterns Soal 02 — MouseTracker

```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return render(position);
}
```

## 07-useContext Soal 7A — ThemeContext (implementasi)

```jsx
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

## 08-custom-hooks Soal 8B — useDebounce

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## 09-react-router-dasar Soal 9A — App dan rute dasar

```jsx
// Install: npm install react-router-dom

// Struktur aplikasi:
// / → Home
// /about → About
// /contact → Contact
// /blog → Blog List
// /blog/:slug → Blog Detail

// App.jsx setup:
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 09-react-router-dasar Soal 9C — ProtectedRoute

```jsx
function ProtectedRoute({ children, isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

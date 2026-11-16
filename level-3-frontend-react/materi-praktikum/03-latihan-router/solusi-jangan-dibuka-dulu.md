# Solusi — JANGAN DIBUKA DULU

Kerjakan soal sampai buntu, tulis dulu apa yang sudah kamu coba, baru buka file ini
untuk membandingkan.

## code/04-protected-routes.jsx (implementasi penuh versi lama)

```jsx
import { createContext, useContext, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(credentials) {
    // TODO: ganti simulasi ini dengan API dan HttpOnly session cookie.
    setUser({ id: 1, email: credentials.email, role: "user" });
  }

  async function logout() {
    // TODO: panggil endpoint logout agar session server ikut dihapus.
    setUser(null);
  }

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }
  return context;
}

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

function RequireRole({ role }) {
  const { user } = useAuth();
  if (user?.role !== role) return <Navigate to="/forbidden" replace />;
  return <Outlet />;
}

function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from || "/dashboard";

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await login({ email: data.get("email") });
    navigate(destination, { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default function ProtectedRoutesExample() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route element={<RequireRole role="admin" />}>
            <Route path="/admin" element={<h1>Admin</h1>} />
          </Route>
        </Route>
        <Route path="/forbidden" element={<h1>403 — Forbidden</h1>} />
      </Routes>
    </AuthProvider>
  );
}

// Route guard hanya membantu navigasi/UX. Backend tetap wajib memeriksa
// authentication dan authorization pada setiap request yang dilindungi.
```

## 02-nested-routes.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 13–32 (sebelum diubah)

```jsx
Link: <Link to={`/products/${product.id}`}>Lihat Detail</Link>

function ProductList({ products }) {
  return (
    <div className="product-list">
      <h1>Daftar Produk</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Harga: Rp{product.price.toLocaleString("id-ID")}</p>
            <p>Kategori: {product.category}</p>
            <Link to={`/products/${product.id}`}>Lihat Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
============================================================
```

### Baris 49–66 (sebelum diubah)

```jsx
function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <p>Produk tidak ditemukan</p>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>ID: {product.id}</p>
      <p>Harga: Rp{product.price.toLocaleString("id-ID")}</p>
      <p>Kategori: {product.category}</p>
      <p>{product.description}</p>
      <Link to="/products">Kembali ke Daftar</Link>
    </div>
  );
}
============================================================
```

### Baris 83–113 (sebelum diubah)

```jsx
function UserProfile({ users }) {
  const { id } = useParams();
  const user = users.find(u => u.id === id);

  if (!user) return <p>User tidak ditemukan</p>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <Link to="/users">Kembali ke Daftar</Link>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div className="user-list">
      <h1>Daftar User</h1>
      {users.map(user => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <Link to={`/users/${user.id}`}>Lihat Profil</Link>
        </div>
      ))}
    </div>
  );
}
============================================================
```

### Baris 136–147 (sebelum diubah)

```jsx
function BlogPost() {
  const { year, month, slug } = useParams();

  return (
    <div className="blog-post">
      <p>Year: {year}, Month: {month}</p>
      <h1>Slug: {slug}</h1>
      <p>Artikel dengan slug "{slug}" pada {month}/{year}</p>
    </div>
  );
}
============================================================
```

### Baris 159–189 (sebelum diubah)

```jsx
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const handleLogin = () => {
    // Simulate login
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button onClick={handleLogin}>Login Sekarang</button>
    </div>
  );
}

function DashboardPage() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="dashboard-page">
      {message && <div className="alert">{message}</div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
============================================================
```

### Baris 206–219 (sebelum diubah)

```jsx
function ProtectedRoute({ children, isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;
  return children;
}
============================================================
```

### Baris 235–254 (sebelum diubah)

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductList />} />
      <Route path="products/:id" element={<ProductDetail products={PRODUCTS} />} />
      <Route path="users" element={<UserList />} />
      <Route path="users/:id" element={<UserProfile />} />
      <Route path="blog/:year/:month/:slug" element={<BlogPost />} />
      <Route path="dashboard" element={
        <ProtectedRoute isAuthenticated={false}>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
</BrowserRouter>
============================================================
```

## 03-search-params.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 12–65 (sebelum diubah)

```jsx
function BookCatalog({ books }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse params dari URL
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "title_asc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Helper untuk update params
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value === "all" || !value) next.delete(key);
    else next.set(key, value);
    next.delete("page"); // reset page saat filter berubah
    setSearchParams(next);
  }

  // Filter books
  const filtered = books.filter(book => {
    const matchQuery = book.title.toLowerCase().includes(query.toLowerCase()) ||
                      book.author.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === "all" || book.category === category;
    return matchQuery && matchCategory;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "title_asc": return a.title.localeCompare(b.title);
      case "title_desc": return b.title.localeCompare(a.title);
      case "price_asc": return a.price - b.price;
      case "price_desc": return b.price - a.price;
      case "rating_desc": return b.rating - a.rating;
      default: return 0;
    }
  });

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="book-catalog">
      {/* Search input */}
      {/* Category filter */}
      {/* Sort dropdown */}
      {/* Book list */}
      {/* Pagination */}
    </div>
  );
}
============================================================
```

### Baris 110–141 (sebelum diubah)

```jsx
function TabNavigation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  function setTab(tab) {
    const next = new URLSearchParams(searchParams);
    next.set("tab", tab);
    setSearchParams(next);
  }

  return (
    <div className="tab-navigation">
      <div className="tab-buttons">
        <button onClick={() => setTab("overview")} className={activeTab === "overview" ? "active" : ""}>
          Overview
        </button>
        <button onClick={() => setTab("analytics")} className={activeTab === "analytics" ? "active" : ""}>
          Analytics
        </button>
        <button onClick={() => setTab("settings")} className={activeTab === "settings" ? "active" : ""}>
          Settings
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "overview" && <p>Overview content here...</p>}
        {activeTab === "analytics" && <p>Analytics content here...</p>}
        {activeTab === "settings" && <p>Settings content here...</p>}
      </div>
    </div>
  );
}
============================================================
```

### Baris 162–208 (sebelum diubah)

```jsx
function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const author = searchParams.get("author") || "";
  const year = searchParams.get("year") || "";
  const minRating = parseInt(searchParams.get("rating") || "0", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    next.delete("page");
    setSearchParams(next);
  }

  function clearAll() {
    setSearchParams({});
  }

  // Filter logic
  const filtered = BOOKS.filter(book => {
    if (query && !book.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (author && !book.author.toLowerCase().includes(author.toLowerCase())) return false;
    if (year && book.year.toString() !== year) return false;
    if (book.rating < minRating) return false;
    return true;
  });

  // Active filters display
  const activeFilters = [];
  if (query) activeFilters.push(`Q: ${query}`);
  if (author) activeFilters.push(`Author: ${author}`);
  if (year) activeFilters.push(`Year: ${year}`);
  if (minRating > 0) activeFilters.push(`Rating: ${minRating}+`);

  return (
    <div className="advanced-search">
      {/* Search form */}
      {/* Active filters */}
      {/* Results count */}
      {/* Book list */}
    </div>
  );
}
============================================================
```

### Baris 230–256 (sebelum diubah)

```jsx
function URLStateApp() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Semua state berasal dari URL
  const theme = searchParams.get("theme") || "light";
  const lang = searchParams.get("lang") || "en";
  const view = searchParams.get("view") || "grid";

  // Update URL → component re-render dengan state baru
  function update(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value === "default") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  }

  return (
    <div>
      <p>Theme: {theme} | Language: {lang} | View: {view}</p>
      <button onClick={() => update("theme", theme === "light" ? "dark" : "light")}>Toggle Theme</button>
      <button onClick={() => update("lang", lang === "en" ? "id" : "en")}>Toggle Lang</button>
      <button onClick={() => update("view", view === "grid" ? "list" : "grid")}>Toggle View</button>
      <p>URL: ?{searchParams.toString()}</p>
    </div>
  );
}
============================================================
```

## 01-routing-dasar Soal 01 — App dan daftar rute

```bash
npm install react-router-dom
```

## 01-routing-dasar Soal 01 — NavLink dengan kelas aktif

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* Navigasi dengan Link */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 01-routing-dasar Soal 02 — DashboardLayout

```jsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  About
</NavLink>
```

## 01-routing-dasar Soal 02 — Rute bersarang

```
/dashboard              → DashboardLayout
  ├── /dashboard        → DashboardHome (index)
  ├── /dashboard/users  → UserManagement
  ├── /dashboard/settings → SettingsPage
  └── /dashboard/reports → ReportsPage
```

## 01-routing-dasar Soal 03 — LoginPage dan navigate

```jsx
function DashboardLayout() {
  const location = useLocation();
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/dashboard" end>Overview</NavLink>
          <NavLink to="/dashboard/users">Users</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
          <NavLink to="/dashboard/reports">Reports</NavLink>
        </nav>
      </aside>

      <main className="dashboard-content">
        {/* Child route dirender di Outlet */}
        <Outlet />
      </main>
    </div>
  );
}
```

## 01-routing-dasar Soal 03 — Membaca location state

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="settings" element={<SettingsPage />} />
  <Route path="reports" element={<ReportsPage />} />
</Route>
```

## 01-routing-dasar Soal 03 — ProtectedRoute dengan useEffect

```jsx
function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // validate...
    // jika berhasil:
    navigate("/dashboard", { replace: true });
    // atau dengan state:
    navigate("/dashboard", { state: { from: "/login", message: "Login berhasil!" } });
  };

  return <form>...</form>;
}
```

## 02-nested-routes Soal 01 — DashboardLayout

```jsx
function DashboardLayout() {
  const location = useLocation();
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/dashboard" end>Overview</NavLink>
          <NavLink to="/dashboard/users">Users</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
          <NavLink to="/dashboard/reports">Reports</NavLink>
        </nav>
      </aside>

      <main className="dashboard-content">
        {/* Child route dirender di Outlet */}
        <Outlet />
      </main>
    </div>
  );
}
```

## 02-nested-routes Soal 01 — Rute bersarang

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="settings" element={<SettingsPage />} />
  <Route path="reports" element={<ReportsPage />} />
</Route>
```

## 03-search-params Soal 01 — BookCatalog (filter dan pagination)

```jsx
function BookCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "title_asc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value === "all" || !value) next.delete(key);
    else next.set(key, value);
    next.delete("page"); // reset ke page 1 saat filter berubah
    setSearchParams(next);
  }

  // Filter dan sort
  const filtered = books.filter(b => {
    const matchQuery = b.title.toLowerCase().includes(query.toLowerCase()) ||
                       b.author.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === "all" || b.category === category;
    return matchQuery && matchCategory;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (/* ... */);
}
```

## 04-protected-routes Soal 4A — AuthContext

```jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username, role: "user" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 04-protected-routes Soal 4B — ProtectedRoute

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

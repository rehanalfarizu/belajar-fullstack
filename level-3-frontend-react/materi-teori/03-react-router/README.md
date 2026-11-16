# 📘 MATERI TEORI 03 — React Router

## 1. Apa itu React Router?

React Router = library routing untuk **Single Page Application (SPA)** — navigasi antar "halaman" tanpa reload browser.

```
Traditional (Multi Page):     SPA (React Router):
GET / → server render page     GET / → load app → JS render komponen
GET /about → server render     /about → JS render komponen lain
(navigasi = full page reload)  (navigasi = replace komponen, TIDAK reload)

Benefit SPA:
- Lebih cepat (tidak perlu request ke server setiap navigasi)
- UX lebih smooth (no page flicker)
```

---

## 2. Setup React Router v6

```bash
npm install react-router-dom
```

```jsx
// main.jsx / main.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

```jsx
// App.jsx — definisikan routes
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
```

---

## 3. Navigation (Link & Navigate)

```jsx
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate(); // programmatic navigation

  return (
    <nav>
      {/* Link — navigasi biasa */}
      <Link to="/">Beranda</Link>
      <Link to="/about">Tentang</Link>
      <Link to="/blog">Blog</Link>

      {/* NavLink — aktif styling saat di route yang sama */}
      <NavLink
        to="/contact"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Kontak
      </NavLink>

      {/* Navigate — redirect */}
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate(-1)}>Kembali</button>
    </nav>
  );
}
```

---

## 4. URL Parameters (Dynamic Routes)

```jsx
// Route dengan parameter (:id)
<Route path="/users/:id" element={<UserProfile />} />

// Akses parameter di component
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams(); // dari URL: /users/123 → id = "123"

  return <h1>Profile User #{id}</h1>;
}

// Multi params
<Route path="/users/:userId/posts/:postId" element={<PostDetail />} />

function PostDetail() {
  const { userId, postId } = useParams();
  return <p>User {userId}, Post {postId}</p>;
}
```

### Fetch Data Berdasarkan Params

```jsx
import { useParams } from "react-router-dom";

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [slug]);

  if (!article) return <p>Loading...</p>;

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </article>
  );
}
```

---

## 5. Query Parameters

```jsx
import { useSearchParams } from "react-router-dom";

// URL: /products?category=electronics&sort=price_asc&page=2
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");

  // Update query param tanpa navigate
  const updateFilter = (key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

  return (
    <div>
      <select
        value={category}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        <option value="">Semua</option>
        <option value="electronics">Elektronik</option>
        <option value="clothing">Pakaian</option>
      </select>

      <button onClick={() => updateFilter("sort", "price_asc")}>Termurah</button>
      <button onClick={() => updateFilter("sort", "price_desc")}>Termahal</button>

      <p>Halaman {page}</p>

      {/* Pagination */}
      <button onClick={() => updateFilter("page", String(page - 1))}>Prev</button>
      <button onClick={() => updateFilter("page", String(page + 1))}>Next</button>
    </div>
  );
}
```

---

## 6. Nested Routes

```jsx
// Layout + nested child routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />           {/* / → Home */}
        <Route path="about" element={<About />} />    {/* /about → About */}
        <Route path="blog" element={<BlogLayout />}>  {/* /blog → BlogLayout */}
          <Route index element={<BlogList />} />     {/* /blog → BlogList */}
          <Route path=":slug" element={<BlogPost />} /> {/* /blog/:slug → BlogPost */}
          <Route path="new" element={<NewPost />} />  {/* /blog/new → NewPost */}
        </Route>
        <Route path="*" element={<NotFound />} />    {/* 404 */}
      </Route>
    </Routes>
  );
}

function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Beranda</Link>
          <Link to="/about">Tentang</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </header>

      <main>{children}</main>  {/* Outlet = child routes render di sini */}

      <footer />
    </div>
  );
}
```

### Outlet Component

```jsx
import { Outlet } from "react-router-dom";

function BlogLayout() {
  return (
    <div className="blog-layout">
      <aside>
        <h3>Kategori</h3>
        <ul>
          <li><Link to="/blog">Semua</Link></li>
          <li><Link to="/blog?category=tech">Tech</Link></li>
          <li><Link to="/blog?category=life">Life</Link></li>
        </ul>
      </aside>

      <div className="blog-content">
        <Outlet /> {/* Child routes: BlogList, BlogPost, NewPost render di sini */}
      </div>
    </div>
  );
}
```

---

## 7. Protected Routes (Route Guards)

```jsx
import { Navigate, Outlet } from "react-router-dom";

// Auth check (biasanya dari Context)
function RequireAuth() {
  const isAuthenticated = useAuth(); // custom hook

  if (!isAuthenticated) {
    // Redirect ke login, simpan return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // render child route kalau auth
}

// Atau dengan redirect biasa
function ProtectedPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard />;
}
```

```jsx
// Routes dengan guard
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* Protected routes — harus login */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin only */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole roles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function RequireRole({ roles }) {
  const { user } = useAuth();
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}
```

---

## 8. useLocation & useNavigation

```jsx
import { useLocation, useNavigation } from "react-router-dom";

function LoadingBar() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <div className="loading-bar" />;
  }
  return null;
}

function AnalyticsTracker() {
  const location = useLocation();

  // Track page view setiap route berubah
  useEffect(() => {
    analytics.track("page_view", { path: location.pathname });
  }, [location.pathname]);

  // useNavigate
  const navigate = useNavigate();

  // Navigate + state (data yang dikirim)
  const handleReadMore = (article) => {
    navigate("/article", {
      state: { article }  // kirim data tanpa params
    });
  };

  // Akses state dari route sebelumnya
  const location = useLocation();
  const article = location.state?.article;
}
```

---

## 9. Programmatic Navigation dengan State

```jsx
// Kirim data via state (bukan params)
function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product-detail", {
      state: { product } // kirim object lengkap
    });
  };

  return <button onClick={handleClick}>Lihat Detail</button>;
}

// Baca di destination
function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <Navigate to="/" replace />; // redirect kalau tidak ada state
  }

  return <div>{product.name}</div>;
}
```

---

## Ringkasan

```
React Router
├── BrowserRouter   → wrap seluruh app
├── Routes/Route    → definisikan path dan komponen
├── Link/NavLink    → navigasi (prevent full reload)
├── useParams       → baca URL params (:id)
├── useSearchParams → baca query string (?key=value)
├── useNavigate     → navigasi secara programatik
├── useLocation     → baca lokasi dan state
├── Outlet          → render nested child routes
├── Protected Route → RequireAuth, RequireRole
└── Index Route     → <Route index element={...}>
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-router/`
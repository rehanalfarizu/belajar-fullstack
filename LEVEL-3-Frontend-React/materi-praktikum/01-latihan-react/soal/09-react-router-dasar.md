# SOAL 09 — React Router Dasar

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Menginstal dan setup React Router v6
2. Menggunakan `<BrowserRouter>`, `<Routes>`, `<Route>`
3. Mengimplementasikan navigasi dengan `<Link>` dan `useNavigate`
4. Menggunakan dynamic routing dengan URL parameters
5. Menggunakan hooks: `useParams`, `useNavigate`, `useLocation`

---

## Briefing
React Router adalah library standar untuk routing di React. Dengan React Router, kamu bisa membuat navigasi antar halaman (views) tanpa reload browser.

---

## Deskripsi

### Soal 9A — Basic Routing Setup
Setup dasar React Router:

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

**Fitur:**
1. Navbar dengan navigasi antar halaman
2. Active link styling (highlight menu item aktif)
3. `useNavigate` untuk programmatic navigation
4. `useLocation` untuk detect route changes

### Soal 9B — Blog App dengan Dynamic Routes
Blog app dengan dynamic routing:

```jsx
// Blog List: list semua post dengan preview
// Blog Detail: full content berdasarkan URL slug

// useParams hook:
function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  // ...
}

// Navigation:
<Link to={`/blog/${post.slug}`}>Baca selengkapnya</Link>
```

**Fitur:**
1. 5 sample blog posts dengan data
2. List dengan: thumbnail, title, excerpt, author, date
3. Detail dengan: full content, author info, back button
4. Not Found page jika slug tidak ada

### Soal 9C — Protected Route
Route yang butuh authentication:

```jsx
// ProtectedRoute component:
function ProtectedRoute({ children, isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Fitur:**
1. Login/Logout toggle untuk demo
2. Redirect ke login jika belum authenticated
3. Redirect back ke original page setelah login (using `state.from`)
4. Different between logged-in and guest UI

### Soal 9D — Search Params Filtering
URL search params untuk filter state:

```jsx
// useSearchParams hook:
const [searchParams, setSearchParams] = useSearchParams();
const category = searchParams.get("category");

// URL: /products?category=electronics&sort=price-asc

// Filter buttons:
<button onClick={() => setSearchParams({ category: "all" })}>All</button>
<button onClick={() => setSearchParams({ category: "books" })}>Books</button>

// Sort:
<button onClick={() => {
  const newParams = Object.fromEntries(searchParams);
  newParams.sort = "price-asc";
  setSearchParams(newParams);
}}>Sort by Price</button>
```

**Fitur:**
1. Products list dengan filter dan sort
2. Filter state di URL (browser back/forward berfungsi)
3. Sort options: name, price-low, price-high
4. Clear filters button

---

## Syarat (Checklist)
- [ ] React Router v6 setup dengan BrowserRouter
- [ ] Basic routes: Home, About, Contact
- [ ] Dynamic route: Blog Detail dengan useParams
- [ ] Protected route dengan redirect
- [ ] Search params untuk filtering
- [ ] Active link styling di navbar

---

## Expected Output
- Navigasi antar halaman tanpa reload
- Blog list → blog detail dengan dynamic slug
- Dashboard hanya accessible setelah login
- Filter tersimpan di URL

---

## Cara Submit
1. Simpan sebagai `09-react-router-dasar.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai

---

## Catatan
- Install react-router-dom: `npm install react-router-dom`
- React Router v6 berbeda dari v5 — pastikan pakai v6 syntax
- `Navigate` component vs `useNavigate` hook — pilih yang sesuai
- URL params selalu string — perlu conversion untuk number
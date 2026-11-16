# Latihan 03 — React Router

## Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu:

1. Menginstal dan mengkonfigurasi React Router v6
2. Mendefinisikan route dengan `<Routes>` dan `<Route>`
3. Menggunakan `<Link>` untuk navigasi SPA
4. Menggunakan `useParams`, `useSearchParams`, `useNavigate`
5. Memahami nested routes dan `<Outlet>`

---

## Prasyarat

- Sudah memahami React hooks dasar (`useState`, `useEffect`)
- Sudah membuat project React dengan Vite
- Install React Router: `npm install react-router-dom`

---

## Konsep Routing

### BrowserRouter
Bungkus aplikasi dengan `<BrowserRouter>` agar routing berfungsi.

```jsx
import { BrowserRouter } from "react-router-dom";

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Routes dan Route
Definisikan route dengan `<Routes>` dan `<Route>`.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserDetail />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Link
Navigasi tanpa reload browser.

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

### useParams
Baca parameter dari URL.

```jsx
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

### useNavigate
Programmatic navigation.

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/home");
navigate(-1); // back
```

### Nested Routes dan Outlet
Nested routes dirender di dalam parent route menggunakan `<Outlet>`.

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## Cara Install dan Jalankan

```bash
# Buat project baru
npm create vite@latest latihan-router -- --template react
cd latihan-router
npm install
npm install react-router-dom

# Salin file soal ke src/
# Jalankan
npm run dev
```

---

## Checklist Penyelesaian

- [ ] Navigasi menggunakan `<Link>` (bukan `<a href>`)
- [ ] `useParams` membaca parameter dengan benar
- [ ] Nested routes dirender di dalam parent route dengan `<Outlet>`
- [ ] Protected route redirect ke login saat belum authenticated
- [ ] URL params berubah tanpa reload browser

---

## Referensi Tambahan

- [React Router v6 Docs](https://reactrouter.com/en/main)
- [React Router: Basic Routes](https://reactrouter.com/en/main/start/tutorial)
- [React Router: URL Params](https://reactrouter.com/en/main/learn/reading-url-params)

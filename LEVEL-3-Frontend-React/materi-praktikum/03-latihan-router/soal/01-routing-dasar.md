# Latihan 03 — React Router Dasar

## Soal 01: Router Dasar, Link, dan Navigasi

### Tujuan
Memahami setup React Router v6, perbedaan `<Link>` vs `<a href>`, dan cara mendefinisikan routes.

### Deskripsi
Buat aplikasi `PortfolioSite` — website portfolio sederhana dengan beberapa halaman.

**Setup:**
```bash
npm install react-router-dom
```

**Halaman yang diperlukan:**

1. `/` — Home (Welcome page dengan foto, nama, tagline)
2. `/about` — About (Bio, skills, pengalaman)
3. `/portfolio` — Portfolio (Grid project cards)
4. `/contact` — Contact (Form kontak sederhana)
5. `*` — 404 Not Found page

**App Structure:**
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

**Fitur:**
1. Navigation bar dengan `Link` ke setiap halaman
2. `NavLink` dengan active state styling: link yang aktif mendapat style berbeda
3. Active link detection: gunakan `className` atau `style` berdasarkan `isActive`
4. Navigasi antar halaman TIDAK me-reload browser (SPA behavior)
5. Footer dengan copyright

**NavLink Styling:**
```jsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
>
  About
</NavLink>
```

**Component yang harus dibuat:**
- `Navbar` — navigation links
- `Home` — landing page
- `About` — about page
- `Portfolio` — portfolio grid
- `Contact` — contact form (tanpa submission logic, cukup UI)
- `NotFound` — 404 page
- `Layout` — wrapper dengan Navbar + Footer

### Aturan
- `<BrowserRouter>` harus membungkus seluruh aplikasi
- `<Routes>` sebagai container untuk semua `<Route>`
- Route `path="*"` harus di akhir (Routes match dari atas ke bawah)
- Menggunakan `<Link>` bukan `<a href>` untuk navigasi internal
- `NavLink` otomatis menambahkan class `active` saat URL match

### Pertanyaan Analisis
1. Apa perbedaan utama antara `<Link>` dan `<a href>` dalam konteks SPA?
2. Apakah SPA berarti entire page tidak pernah di-reload? Kapan page reload tetap terjadi?
3. Apa yang terjadi jika `path="*"` tidak diletakkan di akhir route definitions?

---

## Soal 02: Nested Routes dan Outlet

### Tujuan
Memahami nested routes dengan `<Outlet>`, index routes, dan layout reuse.

### Deskripsi
Buat `DashboardApp` dengan nested routes untuk admin panel.

**Route Structure:**
```
/dashboard              → DashboardLayout
  ├── /dashboard        → DashboardHome (index)
  ├── /dashboard/users  → UserManagement
  ├── /dashboard/settings → SettingsPage
  └── /dashboard/reports → ReportsPage
```

**DashboardLayout Component:**
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

**Pages:**
- `DashboardHome` — overview stats (placeholder cards)
- `UserManagement` — list users + add user form
- `SettingsPage` — settings form
- `ReportsPage` — report placeholder

**Fitur:**
1. Sidebar navigation dengan `NavLink` dan `end` prop
2. `end` prop memastikan `/dashboard` active hanya untuk index route
3. Breadcrumb yang menunjukkan lokasi saat ini:
   - `Dashboard > Users` → `/dashboard/users`
   - `Dashboard > Settings` → `/dashboard/settings`
4. `<Outlet>` di DashboardLayout tempat child routes di-render

**Route Configuration:**
```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="settings" element={<SettingsPage />} />
  <Route path="reports" element={<ReportsPage />} />
</Route>
```

### Aturan
- Nested routes harus berada DI DALAM parent route definition
- `path="users"` di dalam parent dengan `path="/dashboard"` menghasilkan `/dashboard/users`
- `index` route adalah default route saat parent path match tanpa suffix tambahan
- `Outlet` WAJIB ada di parent component — jika tidak, child routes tidak akan visible

### Pertanyaan Analisis
1. Apa keuntungan nested routes dibanding flat routes dengan conditional rendering?
2. Kapan `index` route berguna? Berikan use case nyata.
3. Apakah `<Outlet>` harus selalu ada di parent route component? Apa yang terjadi jika tidak ada?

---

## Soal 03: Programmatic Navigation dan Location State

### Tujuan
Memahami `useNavigate` untuk navigasi imperatif, `useLocation` untuk membaca URL info, dan passing data antar routes dengan location state.

### Deskripsi
Lanjutkan aplikasi portfolio dengan fitur navigasi imperatif dan data passing.

**Fitur:**

1. **`LoginPage`** — navigasi ke dashboard setelah login:
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

2. **`DashboardPage`** — baca location state dari halaman sebelumnya:
   ```jsx
   function DashboardPage() {
     const location = useLocation();
     const message = location.state?.message;

     return (
       <div>
         {message && <div className="alert success">{message}</div>}
         {/* dashboard content */}
       </div>
     );
   }
   ```

3. **`ProjectDetail`** — navigasi dari list ke detail:
   - Dari `/portfolio` → `/portfolio/:id`
   - Gunakan `Link` + state: `<Link to={`/portfolio/${id}`} state={{ from: "portfolio" }}>`
   - Di detail page, baca id dari `useParams`, baca origin dari `location.state`

4. **`ProtectedRoute`** — redirect ke login jika belum authenticated:
   ```jsx
   function ProtectedRoute({ children }) {
     const { isAuthenticated } = useAuth();
     const navigate = useNavigate();

     useEffect(() => {
       if (!isAuthenticated) {
         navigate("/login", { state: { from: location.pathname } });
       }
     }, [isAuthenticated, navigate]);

     return children;
   }
   ```

**Navigate Methods:**

| Method | Kode | Use Case |
|---|---|---|
| Navigate after action | `navigate("/success")` | Setelah form submit |
| Replace in history | `navigate("/page", { replace: true })` | Ganti history entry |
| Go back | `navigate(-1)` | Tombol Back |
| Go forward | `navigate(1)` | Tombol Forward |
| With state | `navigate("/page", { state: { id: 1 } })` | Pass data tanpa URL param |

**Fitur Tambahan:**
1. "Back to Portfolio" button di project detail page yang navigasi kembali ke `/portfolio`
2. Global "redirect after login" — jika user coba akses `/dashboard` tanpa login, setelah login redirect ke `/dashboard` (bukan ke `/`)
3. `useLocation` untuk highlight menu item aktif berdasarkan pathname

### Aturan
- `useNavigate` harus dipanggil di dalam component yang dirender dalam `<BrowserRouter>`
- `replace: true` di navigate options menggantikan current history entry, bukan menambahkan baru
- Location state hanya bertahan selama navigasi browser back/forward — jika page di-refresh, state hilang
- Protected route harus menggunakan `<Navigate>` component atau `useNavigate` dengan `useEffect`

### Pertanyaan Analisis
1. Kapan sebaiknya gunakan `navigate(-1)` vs `navigate(PATH)`?
2. Apa kelemahan location state dibandingkan URL params atau query string?
3. Bagaimana cara menyimpan data yang harus tetap ada setelah page refresh?
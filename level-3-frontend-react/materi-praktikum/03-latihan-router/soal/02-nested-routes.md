# Latihan 03 — Nested Routes dan Outlet

## Soal 01: Nested Routes dan Outlet

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
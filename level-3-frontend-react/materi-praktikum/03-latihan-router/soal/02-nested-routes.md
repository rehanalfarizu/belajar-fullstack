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
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "02-nested-routes Soal 01 — DashboardLayout").

Petunjuk: komponen layout ini harus menyediakan satu tempat bagi halaman anak. Komponen bawaan React Router mana yang menandai tempat itu? Kenapa link Overview butuh `end`?

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
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "02-nested-routes Soal 01 — Rute bersarang").

Petunjuk: bagaimana menulis rute anak tanpa mengulang `/dashboard`? Rute mana yang tampil saat alamatnya persis `/dashboard`?

### Aturan
- Nested routes harus berada DI DALAM parent route definition
- `path="users"` di dalam parent dengan `path="/dashboard"` menghasilkan `/dashboard/users`
- `index` route adalah default route saat parent path match tanpa suffix tambahan
- `Outlet` WAJIB ada di parent component — jika tidak, child routes tidak akan visible

### Pertanyaan Analisis
1. Apa keuntungan nested routes dibanding flat routes dengan conditional rendering?
2. Kapan `index` route berguna? Berikan use case nyata.
3. Apakah `<Outlet>` harus selalu ada di parent route component? Apa yang terjadi jika tidak ada?
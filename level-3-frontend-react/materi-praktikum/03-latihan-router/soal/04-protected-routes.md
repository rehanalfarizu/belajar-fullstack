# SOAL 04 — Protected Routes

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Mengimplementasikan authentication-based route protection
2. Menggunakan context untuk global auth state
3. Redirect ke halaman login saat belum authenticated
4. Mengimplementasikan logout functionality

---

## Briefing
Protected routes adalah route yang hanya bisa diakses oleh user yang sudah login. Ini adalah pattern yang sangat umum di aplikasi web modern.

---

## Deskripsi

### Soal 4A — Auth Context
Buat `AuthContext` dengan:
- `user`: object atau null
- `isAuthenticated`: boolean (derived dari user)
- `login(username, password)`: simulate login
- `logout()`: clear user

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-protected-routes Soal 4A — AuthContext").

Petunjuk: nilai apa saja yang perlu dibagikan ke komponen lain, dan state apa yang menjadi sumbernya? `isAuthenticated` perlu jadi state sendiri atau bisa diturunkan dari `user`?

### Soal 4B — Protected Route Component
Buat `ProtectedRoute` component:

Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "04-protected-routes Soal 4B — ProtectedRoute").

Petunjuk: kalau belum login, ke mana pengguna diarahkan, dan bagaimana halaman asalnya diingat supaya bisa kembali setelah login? Komponen bawaan router mana yang mengarahkan tanpa `useEffect`?

Halaman yang diproteksi:
- `/dashboard` — hanya untuk authenticated users
- `/profile` — hanya untuk authenticated users

### Soal 4C — Login Page
`/login` page:
- Username input + password input
- Tombol Login
- Redirect ke `location.state.from` jika ada, else ke `/dashboard`
- State `from` digunakan untuk redirect back setelah login

### Soal 4D — Navigation dengan Auth State
`Navbar`:
- Jika authenticated: tampilkan "Hello, {user.name}" + tombol Logout
- Jika not authenticated: tampilkan link ke `/login`

### Soal 4E — Public Route Guard
`PublicRoute` — jika sudah login dan coba akses `/login`, redirect ke `/dashboard`.

---

## Syarat (Checklist)
- [ ] AuthContext tersedia di seluruh aplikasi
- [ ] ProtectedRoute redirect ke login saat not authenticated
- [ ] Login redirect ke halaman sebelumnya (from state)
- [ ] Logout clear state dan redirect ke login
- [ ] PublicRoute mencegah akses login page saat sudah authenticated
- [ ] Navbar menampilkan state yang berbeda berdasarkan auth

---

## Expected Output
Login page, protected dashboard, auth-aware navbar. Unauthenticated users redirected to login.

---

## Cara Submit
1. Simpan sebagai `04-protected-routes.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai
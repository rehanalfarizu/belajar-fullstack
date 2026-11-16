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

### Soal 4B — Protected Route Component
Buat `ProtectedRoute` component:

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
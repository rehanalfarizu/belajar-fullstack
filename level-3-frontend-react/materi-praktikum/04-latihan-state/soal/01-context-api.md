# Latihan 04 — AuthContext dan Login/Logout

## Soal 01: AuthContext dengan useReducer

### Tujuan
Memahami cara membuat authentication context dengan global state, menggunakan `useReducer` untuk mengelola auth state, dan melindungi routes dengan conditional rendering.

### Deskripsi
Buat `AuthContext` yang menyediakan authentication state ke seluruh aplikasi dan implementasikan login flow yang lengkap.

**State Shape:**
```js
{
  user: null,                // { id, name, email, role, avatar, token }
  isAuthenticated: false,
  isLoading: false,
  error: null,
}
```

**Action Types:**
```js
AUTH_START:     // isLoading = true, error = null
AUTH_SUCCESS:   // user = payload, isAuthenticated = true, isLoading = false
AUTH_ERROR:     // error = payload, isLoading = false
LOGOUT:         // reset to initial state
UPDATE_PROFILE: // user = { ...user, ...payload }
```

**Mock Users untuk Testing:**
```js
const DEMO_USERS = [
  { id: 1, name: "Admin User", email: "admin@demo.com", password: "admin123", role: "admin", avatar: "👨‍💼" },
  { id: 2, name: "Rehan Alfarizu", email: "rehan@demo.com", password: "rehan123", role: "user", avatar: "👨‍💻" },
  { id: 3, name: "Guest User", email: "guest@demo.com", password: "guest123", role: "user", avatar: "👤" },
];
```

**Fitur:**
1. `AuthProvider` membungkus aplikasi
2. `useAuth()` hook untuk consume context di component manapun
3. `login(email, password)` — async function:
 - Dispatch AUTH_START
   - Simulate API delay 1 detik
   - Validasi credentials terhadap DEMO_USERS
   - Jika valid → dispatch AUTH_SUCCESS dengan user data (tanpa password)
   - Jika tidak valid → dispatch AUTH_ERROR
4. `logout()` — dispatch LOGOUT
5. `updateProfile(data)` — dispatch UPDATE_PROFILE
6. Protected route component: redirect ke `/login` jika belum authenticated
7. `AuthGuard` component: render children jika authenticated, atau redirect

**LoginForm Component:**
- Email input + password input
- Submit handler dengan error display
- Loading state pada tombol saat login berlangsung
- Demo credentials di bawah form: "admin@demo.com / admin123"
- Error message yang informatif: "Email atau password salah"

**ProtectedRoute Component:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "01-context-api Soal 01 — ProtectedRoute dengan requiredRole").

Petunjuk: ada tiga keadaan yang harus ditangani berurutan: masih memuat, belum login, dan login tapi peran tidak cocok. Urutan pengeceknya penting, kenapa?

**Route Protection:**
```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### Aturan
- Password TIDAK boleh disimpan di user object yang di-dispatch
- Error state harus di-clear saat user mulai mengetik di field email/password
- `Navigate` dengan `state={{ from: location }}` memungkinkan redirect back setelah login
- `replace: true` di Navigate mencegah back button masuk ke login page

### Pertanyaan Analisis
1. Mengapa password harus dihapus dari user object sebelum dispatch?
2. Apa keuntungan menggunakan `useReducer` dibanding multiple `useState` untuk auth?
3. Bagaimana cara handle session expiration yang simulated?

---

## Soal 02: Simulasi AuthContext dan Persistence UI

### Tujuan
Memahami Context dan persistence untuk **simulasi UI**. Data di `localStorage`
tidak membuktikan sesi valid dan tidak boleh dipakai server untuk authorization.
Pada aplikasi nyata, hydrate user melalui endpoint `/auth/me` dengan cookie
`HttpOnly`; jangan simpan token autentikasi di `localStorage`.

### Deskripsi
Lanjutkan implementasi AuthContext dengan persist middleware.

**Fitur:**
1. Baca auth state dari localStorage saat app mount (lazy initialization)
2. Simpan auth state ke localStorage setiap kali user login/update profile
3. Clear localStorage saat logout
4. Handle case: localStorage corrupt atau invalid JSON → treat as logged out
5. Initial loading state: tampilkan "Memuat..." saat hydrate dari localStorage

**Implementation Pattern:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "01-context-api Soal 02 — AuthProvider dengan persistence").

Petunjuk: kapan state dibaca dari localStorage dan kapan ditulis? Apa yang terjadi kalau isinya JSON rusak? Pastikan `isLoading` dan `error` tidak ikut disimpan.

**Fitur Tambahan:**
1. Token expiration: simulate token expiring setelah 30 menit
2. Auto-logout saat token expired
3. "Remember me" checkbox di login form (default: true)
4. Jika remember me OFF, auth state tidak di-persist

### Aturan
- Jangan persist `isLoading` state ke localStorage
- Jangan persist error state ke localStorage
- Handle SSR-safe: check `typeof window !== "undefined"` sebelum akses localStorage
- Initial render harus menggunakan initial state, baru hydrate setelah mount (mencegah hydration mismatch)

### Pertanyaan Analisis
1. Apa risiko menyimpan auth token di localStorage? Bagaimana cara mengamankannya?
2. Mengapa initial loading state diperlukan? Apa yang terjadi jika tidak ada?
3. Bagaimana cara handle multiple tabs yang login dengan user berbeda?

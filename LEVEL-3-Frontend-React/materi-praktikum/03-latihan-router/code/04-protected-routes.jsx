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

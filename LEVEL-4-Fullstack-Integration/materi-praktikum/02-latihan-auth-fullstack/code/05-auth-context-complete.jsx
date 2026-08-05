// ============================================================
// 05 — AUTH CONTEXT LENGKAP DENGAN HTTPONLY COOKIE
// ============================================================
// Dependency: React 19 dan client dari 01-axios-client.js.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authAPI, normalizeApiError } from "./01-axios-client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const checkSession = useCallback(async () => {
    setStatus("loading");

    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
      setStatus("authenticated");
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
        setStatus("guest");
        return;
      }

      setStatus("error");
      throw error;
    }
  }, []);

  useEffect(() => {
    checkSession().catch(() => {
      // Error detail dapat dikirim ke observability layer.
    });
  }, [checkSession]);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
      setStatus("guest");
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setUser(response.data.user);
      setStatus("authenticated");
      return response.data.user;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }, []);

  const register = useCallback(async (input) => {
    try {
      const response = await authAPI.register(input);
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } finally {
      // Reset local state sekalipun server sedang gagal. Server harus memiliki
      // expiry/revocation sehingga cookie tidak hidup selamanya.
      setUser(null);
      setStatus("guest");
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated",
      checkSession,
      login,
      register,
      logout,
    }),
    [user, status, checkSession, login, register, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }
  return context;
}

export function AuthStatus() {
  const { user, status, logout } = useAuth();

  if (status === "loading") return <p role="status">Memeriksa sesi…</p>;
  if (status === "error") {
    return <p role="alert">Sesi tidak dapat diperiksa. Coba lagi.</p>;
  }
  if (status === "guest") return <a href="/login">Login</a>;

  return (
    <div>
      <span>Halo, {user.name}</span>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

// Backend contract:
// - POST /auth/login mengatur cookie HttpOnly dan return profil user.
// - GET /auth/me membaca cookie dan return profil user.
// - POST /auth/logout mencabut session/refresh token dan menghapus cookie.
// - Cookie auth memerlukan CSRF defense, CORS origin eksplisit, dan HTTPS.

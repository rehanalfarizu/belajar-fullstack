// ============================================================
// 02 — BROWSER AUTH SERVICE
// ============================================================
// Nama file dipertahankan agar urutan praktikum stabil. Implementasi modern
// tidak membaca JWT dari JavaScript. Server menyimpan session/refresh token
// dalam cookie HttpOnly; browser mengirimkannya dengan credentials: "include".

const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export class AuthService {
  constructor(fetchImplementation = fetch) {
    this.fetch = fetchImplementation;
  }

  async request(path, options = {}) {
    const response = await this.fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      const error = new Error(body?.message ?? `HTTP ${response.status}`);
      error.status = response.status;
      error.fields = body?.errors ?? null;
      throw error;
    }

    return body;
  }

  async login(email, password) {
    const body = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Simpan profil user dalam React state. Jangan simpan bearer/refresh token
    // di localStorage. Cookie HttpOnly diatur oleh response server.
    return body.user;
  }

  async register(input) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async getCurrentUser() {
    try {
      const body = await this.request("/auth/me");
      return body.user;
    } catch (error) {
      if (error.status === 401) return null;
      throw error;
    }
  }

  async refreshSession() {
    try {
      await this.request("/auth/refresh", { method: "POST" });
      return true;
    } catch (error) {
      if (error.status === 401) return false;
      throw error;
    }
  }

  async logout() {
    // Server harus menghapus/merotasi session atau refresh token lalu mengirim
    // Set-Cookie dengan Max-Age=0. Reset state client setelah request selesai.
    await this.request("/auth/logout", { method: "POST" });
  }
}

export const authService = new AuthService();

// Security checklist server:
// - HttpOnly, Secure di production, SameSite sesuai topologi.
// - CORS origin eksplisit + credentials true; jangan origin "*".
// - Proteksi CSRF untuk cookie auth.
// - Rotasi/revocation refresh token.
// - Rate limit login/refresh/reset password.
// - Authorization tetap diperiksa pada setiap endpoint.

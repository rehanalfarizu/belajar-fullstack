// ============================================================
// 01 — AXIOS CLIENT UNTUK AUTH BERBASIS HTTPONLY COOKIE
// ============================================================
// Tempatkan file ini di project Vite, misalnya src/lib/api.js.
// Server harus mengatur CORS origin secara eksplisit dan credentials: true.

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Metadata durasi berguna saat development. Jangan log body/header sensitif.
api.interceptors.request.use((config) => {
  config.metadata = { startedAt: performance.now() };
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Router/AuthProvider dapat mendengar event ini dan me-reset user state.
      // Hindari redirect langsung dari networking layer karena sulit dites dan
      // dapat membuat redirect loop pada endpoint login/check-session.
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export const authAPI = {
  register: (input) => api.post("/auth/register", input),
  login: (input) => api.post("/auth/login", input),
  getMe: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
};

export const postsAPI = {
  getAll: (params = {}) => api.get("/posts", { params }),
  getOne: (id) => api.get(`/posts/${encodeURIComponent(id)}`),
  create: (input) => api.post("/posts", input),
  update: (id, input) =>
    api.put(`/posts/${encodeURIComponent(id)}`, input),
  remove: (id) => api.delete(`/posts/${encodeURIComponent(id)}`),
};

export function normalizeApiError(error) {
  if (!axios.isAxiosError(error)) {
    return {
      code: "UNKNOWN",
      message: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }

  if (!error.response) {
    return {
      code: "NETWORK_ERROR",
      message: "Tidak dapat terhubung ke server.",
    };
  }

  const byStatus = {
    400: ["BAD_REQUEST", "Request tidak valid."],
    401: ["UNAUTHORIZED", "Sesi berakhir. Silakan login kembali."],
    403: ["FORBIDDEN", "Kamu tidak memiliki akses."],
    404: ["NOT_FOUND", "Data tidak ditemukan."],
    409: ["CONFLICT", "Data bertentangan dengan state terbaru."],
    422: ["VALIDATION_ERROR", "Periksa kembali input."],
    429: ["RATE_LIMITED", "Terlalu banyak request. Coba lagi nanti."],
    500: ["SERVER_ERROR", "Server mengalami gangguan."],
  };
  const [code, fallbackMessage] = byStatus[error.response.status] ?? [
    "HTTP_ERROR",
    "Request gagal.",
  ];

  return {
    code,
    message: error.response.data?.message ?? fallbackMessage,
    status: error.response.status,
    fields: error.response.data?.errors ?? null,
  };
}

// Latihan:
// 1. Tambahkan AbortController melalui config.signal.
// 2. Cegah beberapa refresh request berjalan bersamaan.
// 3. Tulis test untuk 401, 422, network error, dan timeout.

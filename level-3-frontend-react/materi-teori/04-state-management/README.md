# 📘 MATERI TEORI 04 — State Management

## 1. Kapan Butuh State Management?

```
Props Drilling:
App → Header → Sidebar → UserAvatar → AvatarImage
(repot kalau data perlu dari atas ke bawah berkali-kali)
```

### Level State Management:

```
1. Local State     → useState (component itu sendiri)
2. Shared State    → useState + lift state up (parent hold state)
3. Context         → useContext (app-wide state)
4. Zustand/Redux   → External store (kompleks, cross-cutting)
```

---

## 2. Context API (Bawaan React)

Cocok untuk: tema, auth, bahasa, data sederhana.

```jsx
// ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggle = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Harus di dalam ThemeProvider");
  return ctx;
}

// Usage
function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <nav style={{ background: theme === "dark" ? "#222" : "#fff" }}>
      <button onClick={toggle}>Toggle</button>
    </nav>
  );
}
```

### Split Context (Jangan Satukan Semua!)

```jsx
// ❌ SATU BESAR — setiap Consumer re-render kalau SATU field berubah
const AppContext = createContext();

// ✅ BEBERAPA KECIL — granular, lebih perform
const AuthContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
```

---

## 3. Zustand — State Management Ringan

Zustand = store external yang simple, kecil (1KB), tanpa boilerplate Redux.

```bash
npm install zustand
```

```jsx
// store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Actions
      login: (userData, token) => {
        set({
          user: userData,
          token,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (data) => {
        set(state => ({
          user: { ...state.user, ...data }
        }));
      },

      // Getters (computed)
      isAdmin: () => get().user?.role === "admin"
    }),
    {
      name: "auth-storage", // key di localStorage
      partialize: (state) => ({ token: state.token }) // hanya persist token
    }
  )
);

// Usage di component
import useAuthStore from "./store/useAuthStore";

function Profile() {
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <p>Silakan login</p>;

  return (
    <div>
      <p>Halo, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Zustand Store untuk Todos

```jsx
import { create } from "zustand";

const useTodoStore = create((set, get) => ({
  todos: [],
  filter: "all", // all | active | completed

  // Add todo
  addTodo: (text) => {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    set(state => ({ todos: [todo, ...state.todos] }));
  },

  // Toggle
  toggleTodo: (id) => {
    set(state => ({
      todos: state.todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    }));
  },

  // Delete
  deleteTodo: (id) => {
    set(state => ({ todos: state.todos.filter(t => t.id !== id) }));
  },

  // Set filter
  setFilter: (filter) => set({ filter }),

  // Computed getter
  getFilteredTodos: () => {
    const { todos, filter } = get();
    if (filter === "active") return todos.filter(t => !t.completed);
    if (filter === "completed") return todos.filter(t => t.completed);
    return todos;
  },

  // Clear completed
  clearCompleted: () => {
    set(state => ({ todos: state.todos.filter(t => !t.completed) }));
  }
}));

// Usage
function TodoApp() {
  const {
    todos, filter, addTodo,
    toggleTodo, deleteTodo, setFilter, clearCompleted
  } = useTodoStore();

  const filteredTodos = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div>
      {filteredTodos.map(todo => (
        <div key={todo.id}>
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Redux Toolkit — untuk Aplikasi Kompleks

Redux Toolkit (RTK) = cara modern pakai Redux (dulu Redux core sangat verbose).

```bash
npm install @reduxjs/toolkit react-redux
```

### Store Setup

```jsx
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});

// store/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0, history: [] },
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push({ action: "inc", value: state.value });
    },
    decrement: (state) => { state.value -= 1; },
    incrementBy: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementBy } = counterSlice.actions;
export default counterSlice.reducer;
```

### Provider & Usage

```jsx
// main.jsx
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

createRoot(el).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Component
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/counterSlice";

function Counter() {
  const count = useSelector(state => state.counter.value);
  const history = useSelector(state => state.counter.history);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementBy(5))}>+5</button>
    </div>
  );
}
```

### createAsyncThunk (Async di Redux)

```jsx
// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error("User tidak ditemukan");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, loading: false, error: null },
  reducers: {
    clearUser: (state) => { state.data = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
```

---

## 5. React Query (TanStack Query) — Server State

React Query = khusus untuk **server state** (data dari API) — caching, refetch, sync.

```bash
npm install @tanstack/react-query
```

```jsx
// main.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 menit sebelum refetch
      gcTime: 1000 * 60 * 10,     // 10 menit cache
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

createRoot(el).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

```jsx
// Component
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// GET — useQuery
function UserList() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Gagal fetch users");
      return res.json();
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.map(u => <p key={u.id}>{u.name}</p>)}
    </div>
  );
}

// POST/PUT/DELETE — useMutation
function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("/api/users", newUser),

    onSuccess: () => {
      // Invalidate cache → auto refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      console.error("Gagal:", error.message);
    }
  });

  const handleCreate = () => {
    mutation.mutate({ name: "Andi", email: "andi@email.com" });
  };

  return (
    <div>
      <button onClick={handleCreate} disabled={mutation.isPending}>
        {mutation.isPending ? "Membuat..." : "Buat User"}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </div>
  );
}
```

---

## 6. Zustand vs Redux vs Context — Kapan Pakai Apa?

| Kriteria | Context | Zustand | Redux Toolkit | TanStack Query |
|----------|---------|---------|--------------|---------------|
| Boilerplate | Rendah | Sangat rendah | Sedang | Rendah |
| Performa | Rendah (banyak context = banyak re-render) | Tinggi | Tinggi | N/A (cache) |
| DevTools | Tidak ada | Ada | Ada (sangat lengkap) | Ada |
| Async support | Manual | Manual | Thunk/async built-in | Built-in |
| Untuk | Theme, Auth, Language | Global UI state | App state kompleks | Server data |
| Cocok untuk | App kecil–menengah | App menengah–besar | App besar | Semua (kombinasikan) |

---

## Ringkasan

```
State Management
├── Context API    → useContext, Provider, split per domain
├── Zustand        → create(), store external, persist middleware
├── Redux Toolkit  → configureStore, createSlice, createAsyncThunk
├── TanStack Query → useQuery, useMutation, cache + refetch server data
└── Kapan Pakai    → local (useState) → context → zustand → redux
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/04-latihan-state/`

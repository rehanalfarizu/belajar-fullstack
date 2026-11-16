# Solusi — JANGAN DIBUKA DULU

Kerjakan soal sampai buntu, tulis dulu apa yang sudah kamu coba, baru buka file ini untuk membandingkan.

## 01-context-api.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 21–51 (sebelum diubah)

```jsx
function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };

    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "AUTH_ERROR":
      return { ...state, error: action.payload.error, isLoading: false };

    case "AUTH_END_LOADING":
      return { ...state, isLoading: false };

    case "LOGOUT":
      return { user: null, isAuthenticated: false, isLoading: false, error: null };

    case "UPDATE_PROFILE":
      return { ...state, user: { ...state.user, ...action.payload.updates } };

    default:
      return state;
  }
}
============================================================
```

### Baris 68–103 (sebelum diubah)

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false, isLoading: true, error: null });

  // TODO: login(email, password) — async function
  // function login(email, password) {
  //   return async (dispatch) => {
  //     dispatch({ type: "AUTH_START" });
  //     await new Promise(r => setTimeout(r, 1000)); // simulate delay
  //     const user = DEMO_USERS.find(u => u.email === email && u.password === password);
  //     if (user) {
  //       dispatch({ type: "AUTH_SUCCESS", payload: { user: { ...user, password: undefined } } });
  //     } else {
  //       dispatch({ type: "AUTH_ERROR", payload: { error: "Email atau password salah" } });
  //     }
  //   };
  // }

  // TODO: logout()

  // TODO: updateProfile(updates)

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
============================================================
```

### Baris 117–129 (sebelum diubah)

```jsx
useEffect(() => {
  try {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      const user = JSON.parse(stored);
      dispatch({ type: "AUTH_SUCCESS", payload: { user } });
    } else {
      dispatch({ type: "AUTH_END_LOADING" });
    }
  } catch {
    dispatch({ type: "AUTH_END_LOADING" });
  }
}, []);
```

### Baris 150–171 (sebelum diubah)

```jsx
function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" disabled={isLoading}>{isLoading ? "Memuat..." : "Login"}</button>
      <p>Demo: admin@demo.com / admin123</p>
    </form>
  );
}
============================================================
```

### Baris 191–210 (sebelum diubah)

```jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./01-auth-context";

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="loading">Memuat session...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
============================================================
```

### Baris 229–246 (sebelum diubah)

```jsx
function UserProfile() {
  const { user, updateProfile, logout } = useAuth();

  const handleUpdate = (updates) => {
    updateProfile(updates);
  };

  return (
    <div className="user-profile">
      <h1>Profil</h1>
      <p>Nama: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
============================================================
```

## 02-split-context.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 32–38 (sebelum diubah)

```jsx
- function getInitialTheme() {
    try {
      const stored = localStorage.getItem("app-theme");
      return stored || "light";
    } catch { return "light"; }
  }
const [theme, setTheme] = useState(getInitialTheme);
```

## 03-context-selector.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 26–43 (sebelum diubah)

```jsx
function useContextSelector(context, selector) {
  const state = useContext(context);
  const [selected, setSelected] = useState(() => selector(state));

  useEffect(() => {
    const next = selector(state);
    if (next !== selected) {
      setSelected(next);
    }
  }, [state, selector, selected]);

  return selected;
}

Usage:
  const user = useContextSelector(AppContext, state => state.user);
  const isDark = useContextSelector(AppContext, state => state.theme === "dark");
============================================================
```

### Baris 62–96 (sebelum diubah)

```jsx
export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  const actions = {
    login: (user) => setState(prev => ({ ...prev, user })),
    logout: () => setState(prev => ({ ...prev, user: null })),
    toggleTheme: () => setState(prev => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    })),
    addNotification: (notif) => setState(prev => ({
      ...prev,
      notifications: [{ id: `N${Date.now()}`, ...notif }, ...prev.notifications],
    })),
    markAsRead: (id) => setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    })),
    setLanguage: (lang) => setState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, language: lang },
    })),
    setFontSize: (size) => setState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, fontSize: size },
    })),
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}
============================================================
```

### Baris 177–212 (sebelum diubah)

```jsx
function SelectorDemoApp() {
  return (
    <AppProvider>
      <div>
        <h1>Context Selector Demo</h1>
        <p>Buka console — setiap component hanya re-render saat nilai yang di-subscribe berubah</p>
        <hr />

        <div className="demo-grid">
          <div className="demo-section">
            <h3>User Section</h3>
            <UserName />
            <UserAvatar />
          </div>

          <div className="demo-section">
            <h3>Theme Section</h3>
            <ThemeToggle />
          </div>

          <div className="demo-section">
            <h3>Notifications Section</h3>
            <NotificationBadge />
          </div>

          <div className="demo-section">
            <h3>Preferences Section</h3>
            <LanguageSelector />
            <FontSizeControl />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
============================================================
```

## 04-persist-state.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 9–56 (sebelum diubah)

```jsx
function createPersistMiddleware(storageKey) {
  return (reducer) => (state, action) => {
    const nextState = reducer(state, action);

    // Simpan ke localStorage setelah setiap action
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextState));
    } catch (err) {
      console.warn("Persist failed:", err.message);
    }

    return nextState;
  };
}

function createUndoMiddleware(reducer) {
  let past = [];
  let future = [];

  return (state, action) => {
    switch (action.type) {
      case "UNDO": {
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        past = past.slice(0, -1);
        future = [state, ...future];
        return previous;
      }
      case "REDO": {
        if (future.length === 0) return state;
        const next = future[0];
        future = future.slice(1);
        past = [...past, state];
        return next;
      }
      default: {
        const nextState = reducer(state, action);
        // Jangan simpan jika state tidak berubah
        if (nextState !== state) {
          past = [...past, state].slice(-50); // max 50 entries
          future = []; // Reset future on new action
        }
        return nextState;
      }
    }
  };
}
============================================================
```

### Baris 125–167 (sebelum diubah)

```jsx
  {
    notes: [{ id, title, content, createdAt, tags }],
    filter: "all",
    sortBy: "newest",
  }

Action types:
  ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, SET_FILTER, SET_SORT, HYDRATE

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          { id: `N${Date.now()}`, title: action.payload.title, content: action.payload.content, createdAt: Date.now(), tags: action.payload.tags || [] },
          ...state.notes
        ]
      };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map(n => n.id === action.payload.id ? { ...n, ...action.payload } : n)
      };

    case "DELETE_NOTE":
      return { ...state, notes: state.notes.filter(n => n.id !== action.payload.id) };

    case "SET_FILTER":
      return { ...state, filter: action.payload.filter };

    case "SET_SORT":
      return { ...state, sortBy: action.payload.sortBy };

    case "HYDRATE":
      return action.payload.state;

    default:
      return state;
  }
}
============================================================
```

### Baris 224–290 (sebelum diubah)

```jsx
import { useReducer, useEffect, useCallback } from "react";

export function useNotes() {
  // Lazy initialization: coba load dari localStorage
  const [state, dispatch] = useReducer(rootReducer, null, (initial) => {
    try {
      const stored = localStorage.getItem("notes_state");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Hanya return jika valid state dengan notes array
        if (parsed && Array.isArray(parsed.notes)) return parsed;
      }
    } catch {}
    return initial;
  });

  // Hydrate dari localStorage (untuk handle case di mana middleware tidak jalan)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("notes_state");
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "HYDRATE", payload: { state: parsed } });
      }
    } catch {}
  }, []);

  // Keyboard shortcuts untuk undo/redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        if (e.shiftKey) dispatch({ type: "REDO" });
        else dispatch({ type: "UNDO" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const actions = {
    addNote: useCallback((title, content, tags) => {
      dispatch({ type: "ADD_NOTE", payload: { title, content, tags } });
    }, []),

    updateNote: useCallback((id, updates) => {
      dispatch({ type: "UPDATE_NOTE", payload: { id, ...updates } });
    }, []),

    deleteNote: useCallback((id) => {
      dispatch({ type: "DELETE_NOTE", payload: { id } });
    }, []),

    setFilter: useCallback((filter) => {
      dispatch({ type: "SET_FILTER", payload: { filter } });
    }, []),

    setSort: useCallback((sortBy) => {
      dispatch({ type: "SET_SORT", payload: { sortBy } });
    }, []),

    undo: useCallback(() => dispatch({ type: "UNDO" }), []),
    redo: useCallback(() => dispatch({ type: "REDO" }), []),
  };

  return { state, ...actions };
}
============================================================
```

### Baris 316–394 (sebelum diubah)

```jsx
import { useState } from "react";

export function NotesApp() {
  const { state, addNote, updateNote, deleteNote, setFilter, setSort, undo, redo } = useNotes();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Filtered dan sorted notes
  const filtered = state.notes.filter(note => {
    if (state.filter === "all") return true;
    return note.tags.includes(state.filter);
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (state.sortBy) {
      case "newest": return b.createdAt - a.createdAt;
      case "oldest": return a.createdAt - b.createdAt;
      case "alpha": return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addNote(newTitle, newContent, []);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="notes-app">
      <div className="notes-header">
        <h1>Notes</h1>
        <div className="undo-redo">
          <button onClick={undo}>↶ Undo</button>
          <button onClick={redo}>↷ Redo</button>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="controls">
        <select value={state.filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="important">Important</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>

        <select value={state.sortBy} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className="add-note-form">
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Note title" />
        <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Note content" />
        <button type="submit">Add Note</button>
      </form>

      {/* Notes List */}
      <div className="notes-list">
        {sorted.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString("id-ID")}</small>
            <button onClick={() => deleteNote(note.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}
============================================================
```

## 04-persist-state.jsx — `function createPersistMiddleware` (implementasi yang tadinya ada di starter)

```jsx
function createPersistMiddleware(storageKey) {
  return (reducer) => (state, action) => {
    const nextState = reducer(state, action);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextState));
    } catch (err) {
      console.warn("Persist failed:", err.message);
    }
    return nextState;
  };
}
```

## 04-persist-state.jsx — `function createUndoMiddleware` (implementasi yang tadinya ada di starter)

```jsx
function createUndoMiddleware(reducer) {
  let past = [];
  let future = [];

  return (state, action) => {
    switch (action.type) {
      case "UNDO": {
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        past = past.slice(0, -1);
        future = [state, ...future];
        return previous;
      }
      case "REDO": {
        if (future.length === 0) return state;
        const next = future[0];
        future = future.slice(1);
        past = [...past, state];
        return next;
      }
      default: {
        const nextState = reducer(state, action);
        if (nextState !== state) {
          past = [...past, state].slice(-50);
          future = [];
        }
        return nextState;
      }
    }
  };
}
```

## 04-persist-state.jsx — `function notesReducer` (implementasi yang tadinya ada di starter)

```jsx
function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          { id: `N${Date.now()}`, title: action.payload.title, content: action.payload.content, createdAt: Date.now(), tags: action.payload.tags || [] },
          ...state.notes,
        ],
      };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === action.payload.id ? { ...n, ...action.payload } : n
        ),
      };

    case "DELETE_NOTE":
      return { ...state, notes: state.notes.filter(n => n.id !== action.payload.id) };

    case "SET_FILTER":
      return { ...state, filter: action.payload.filter };

    case "SET_SORT":
      return { ...state, sortBy: action.payload.sortBy };

    case "HYDRATE":
      return action.payload.state;

    default:
      return state;
  }
}
```

## 03-context-selector.jsx — `function useContextSelector` (implementasi yang tadinya ada di starter)

```jsx
function useContextSelector(context, selector) {
  const state = useContext(context);
  const [selected, setSelected] = useState(() => selector(state));

  useEffect(() => {
    const next = selector(state);
    if (next !== selected) {
      setSelected(next);
    }
  }, [state, selector, selected]);

  return selected;
}
```

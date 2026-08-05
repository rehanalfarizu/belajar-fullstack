# Latihan 04 — Persist Middleware

## Soal 01: Persist Middleware untuk useReducer

### Tujuan
Memahami pattern middleware untuk useReducer yang secara otomatis persist state ke localStorage, dan bagaimana mengimplementasikan undo/redo capability.

### Deskripsi
Buat `NotesApp` — aplikasi catatan sederhana dengan persist dan undo/redo functionality.

**Initial State:**
```js
{
  notes: [
    { id: "N001", title: "Belajar React", content: "useState dan useEffect adalah dasar React hooks", createdAt: Date.now(), tags: ["react", "js"] },
    { id: "N002", title: "Meeting Notes", content: "Discuss project timeline dengan tim", createdAt: Date.now(), tags: ["work"] },
  ],
  filter: "all", // "all" | tag name
  sortBy: "newest", // "newest" | "oldest" | "alpha"
}
```

**Middleware Pattern:**
```js
function createPersistMiddleware(key, reducer) {
  return (state, action) => {
    const nextState = reducer(state, action);

    // Simpan ke localStorage setelah setiap action
    try {
      window.localStorage.setItem(key, JSON.stringify(nextState));
    } catch (err) {
      console.warn("Persist failed:", err);
    }

    return nextState;
  };
}
```

**Undo/Redo Middleware:**
```js
function createUndoMiddleware(reducer) {
  let past = [];
  let future = [];

  return (state, action) => {
    if (action.type === "UNDO") {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      past = past.slice(0, -1);
      future = [state, ...future];
      return previous;
    }

    if (action.type === "REDO") {
      if (future.length === 0) return state;
      const next = future[0];
      future = future.slice(1);
      past = [...past, state];
      return next;
    }

    const nextState = reducer(state, action);
    past = [...past, state];
    future = []; // Reset future saat action baru
    return nextState;
  };
}
```

**Composable Middleware:**
```js
function applyMiddleware(reducer, ...middlewares) {
  return middlewares.reduce((acc, mw) => mw(acc), reducer);
}

// Usage:
const rootReducer = applyMiddleware(
  notesReducer,
  (reducer) => createPersistMiddleware("notes_state", reducer),
  createUndoMiddleware
);
```

**Action Types:**
```js
ADD_NOTE: { type: "ADD_NOTE", payload: { title, content, tags } }
UPDATE_NOTE: { type: "UPDATE_NOTE", payload: { id, title, content, tags } }
DELETE_NOTE: { type: "DELETE_NOTE", payload: { id } }
SET_FILTER: { type: "SET_FILTER", payload: { filter } }
SET_SORT: { type: "SET_SORT", payload: { sortBy } }
UNDO: { type: "UNDO" }
REDO: { type: "REDO" }
HYDRATE: { type: "HYDRATE", payload: { state } } // untuk load dari localStorage
```

**Fitur:**
1. CRUD notes: Create, Read, Update, Delete
2. Tag system: notes bisa punya tags, filter berdasarkan tag
3. Sort: newest, oldest, alphabetical
4. Undo/Redo buttons dengan keyboard shortcut (Ctrl+Z / Ctrl+Shift+Z)
5. Auto-save ke localStorage setiap perubahan
6. Load dari localStorage saat app mount
7. Note editor: modal atau inline editing

**Keyboard Shortcuts:**
```js
useEffect(() => {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      if (e.shiftKey) {
        dispatch({ type: "REDO" });
      } else {
        dispatch({ type: "UNDO" });
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```

### Aturan
- Middleware harus composed dalam urutan yang benar: undo → persist
- localStorage read hanya saat mount (HYDRATE action)
- localStorage write setiap action SETELAH reducer memprosesnya
- Undo history dibatasi 50 entries untuk mencegah memory leak
- Reset future (forward stack) setiap kali action baru dilakukan

### Pertanyaan Analisis
1. Apa perbedaan antara middleware pattern dan useEffect untuk persist?
2. Bagaimana urutan middleware mempengaruhi behavior?
3. Kapan undo/redo history harus dibatasi? Bagaimana menentukan limit yang tepat?
4. Apa risiko persist middleware jika state berisi function atau non-serializable data?
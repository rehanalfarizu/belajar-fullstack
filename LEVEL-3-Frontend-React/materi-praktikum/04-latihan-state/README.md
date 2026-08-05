# Latihan 04 — State Management

## Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu:

1. Memahami Context API untuk global state management
2. Menggunakan Zustand untuk state management yang lebih simpel
3. Menggunakan TanStack Query untuk server state management
4. Mengimplementasikan state persistence dengan localStorage

---

## Prasyarat

- Sudah memahami React hooks (`useState`, `useEffect`, `useContext`)
- Sudah membuat project React dengan Vite
- Install dependencies:

```bash
npm install zustand @tanstack/react-query
```

---

## State Management Spectrum

### Local State (useState)
Untuk state yang hanya dibutuhkan oleh satu component.

```jsx
const [count, setCount] = useState(0);
```

### Shared State (Context API)
Untuk state yang dibutuhkan oleh banyak component di tree yang berbeda.

```jsx
const ThemeContext = createContext();
<ThemeContext.Provider value={{ theme, setTheme }}>
 <App />
</ThemeContext.Provider>
```

### Global State (Zustand)
Untuk aplikasi yang lebih besar, dengan API yang lebih simpel daripada Context + useReducer.

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage
const count = useStore((state) => state.count);
```

### Server State (TanStack Query)
Untuk data yang berasal dari server — caching, refetching, loading, error states.

```jsx
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
  });
}
```

### Persisted State (localStorage)
State yang bertahan setelah page refresh.

```jsx
const [theme, setTheme] = useState(() => {
  const stored = localStorage.getItem("theme");
  return stored || "light";
});

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

---

## Cara Install dan Jalankan

```bash
# Buat project baru
npm create vite@latest latihan-state -- --template react
cd latihan-state
npm install
npm install zustand @tanstack/react-query

# Salin file soal ke src/
# Jalankan
npm run dev
```

---

## Checklist Penyelesaian

- [ ] Context API membagi state ke multiple components
- [ ] Zustand store memiliki minimal3 state dan 2 action
- [ ] TanStack Query fetching dengan loading dan error state
- [ ] State bertahan setelah page refresh (localStorage)
- [ ] Tidak ada prop drilling

---

## Referensi Tambahan

- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)

# Latihan 04 — State Management

## Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu:

1. Memahami Context API untuk global state management
2. Memecah context dan memakai pola selector supaya render ulang berkurang
3. Mengimplementasikan state persistence dengan localStorage, termasuk undo/redo
4. (Opsional, setelah semua soal) Mengenal Zustand dan TanStack Query sebagai pembanding

---

## Prasyarat

- Sudah memahami React hooks (`useState`, `useEffect`, `useContext`)
- Sudah membuat project React dengan Vite
- Soal-soal di folder ini hanya butuh React (tanpa library tambahan). Zustand dan
  TanStack Query opsional, dipakai setelah soal selesai untuk membandingkan.

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

### Global State (Zustand) — opsional, tidak dipakai di soal
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

### Server State (TanStack Query) — opsional, tidak dipakai di soal
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
# opsional, setelah soal selesai: npm install zustand @tanstack/react-query

# Salin file soal ke src/
# Jalankan
npm run dev
```

---

## Checklist Penyelesaian

- [ ] Context API membagi state ke multiple components
- [ ] Context dipecah (user, theme, notif) dan render ulang terbukti berkurang
- [ ] Hook `useContextSelector` buatanmu bekerja
- [ ] State bertahan setelah page refresh (localStorage)
- [ ] Tidak ada prop drilling

---

## Referensi Tambahan

- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)

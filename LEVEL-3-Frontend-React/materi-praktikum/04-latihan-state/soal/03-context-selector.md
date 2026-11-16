# Latihan 04 — Context Selector dan Memoization

## Soal 01: Context Selector Pattern

### Tujuan
Memahami advanced pattern untuk memilih subset dari context value, sehingga component tidak re-render untuk bagian context yang tidak digunakan.

### Deskripsi
Implementasikan `useContextSelector` pattern — custom hook yang memungkinkan component subscribe ke bagian spesifik dari context.

**Selector Pattern:**
```jsx
// Context menyimpan state + dispatch
const AppContext = createContext(null);

// useContextSelector memungkinkan memilih subset
function useContextSelector(context, selector) {
  const state = useContext(context);
  return selector(state);
}

// Usage: component hanya re-render saat user berubah
function UserName() {
  const user = useContextSelector(AppContext, (state) => state.user);
  return <span>{user?.name}</span>;
}

// Usage: component hanya re-render saat theme berubah
function ThemeIcon() {
  const isDark = useContextSelector(AppContext, (state) => state.isDark);
  return <span>{isDark ? "🌙" : "☀️"}</span>;
}
```

**Implementasi useContextSelector:**
```jsx
function useContextSelector(context, selector) {
  const fullState = useContext(context);
  const [selected, setSelected] = useState(() => selector(fullState));

  useEffect(() => {
    const next = selector(fullState);
    if (next !== selected) {
      setSelected(next);
    }
  }, [fullState, selector, selected]);

  return selected;
}
```

**Demo Application:**
Buat `DashboardApp` dengan single AppContext yang berisi:
- `user`: user data
- `theme`: "light" | "dark"
- `notifications`: array
- `preferences`: { language, fontSize }

Component consumers:
- `UserName` — subscribe ke `user.name`
- `UserAvatar` — subscribe ke `user.avatar`
- `ThemeToggle` — subscribe ke `theme`
- `NotifBadge` — subscribe ke `notifications.length`
- `LanguageSelector` — subscribe ke `preferences.language`

Setiap component hanya re-render saat nilai yang di-subscribe berubah.

### Aturan
- Selector function harus stabil (useCallback) atau menggunakan useMemo di dalam component
- Shallow comparison default — untuk object, gunakan custom comparison function
- Handle null context (belum ada Provider) dengan graceful error

### Pertanyaan Analisis
1. Apa perbedaan utama antara context selector pattern dan split context?
2. Kapan selector pattern overkill? Kapan sangat bermanfaat?
3. Bagaimana shallow vs deep comparison mempengaruhi performance di context selector?
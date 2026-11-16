# Solusi — JANGAN DIBUKA DULU

Kerjakan soal sampai buntu, tulis dulu apa yang sudah kamu coba, baru buka file ini
untuk membandingkan. Membaca solusi sebelum mencoba tidak melatih apa-apa.

Catatan: soal memakai nama action `ADD_ITEM`, `REMOVE_ITEM`, dan seterusnya, serta
state `discount` dan `shippingCost`. Solusi lama di bawah memakai nama action
berbeda dan belum punya diskon/ongkir. Anggap ini rujukan pola, bukan jawaban soal
yang persis.

## code/03-useContext-useReducer.jsx (versi lama, implementasi penuh)

```jsx
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "item/added": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "item/quantityChanged": {
      const { id, quantity } = action.payload;
      if (!Number.isInteger(quantity) || quantity < 1) return state;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };
    }

    case "item/removed":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "cart/cleared":
      return initialState;

    default:
      throw new Error(`Action tidak dikenal: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => {
    const totalItems = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return { ...state, totalItems, subtotal };
  }, [state]);

  return (
    <CartStateContext value={value}>
      <CartDispatchContext value={dispatch}>
        {children}
      </CartDispatchContext>
    </CartStateContext>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === null) {
    throw new Error("useCartState harus digunakan di dalam CartProvider.");
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === null) {
    throw new Error("useCartDispatch harus digunakan di dalam CartProvider.");
  }
  return context;
}

// Latihan lanjutan:
// 1. Tulis unit test reducer untuk setiap action dan action tidak dikenal.
// 2. Tambahkan batas maksimum quantity.
// 3. Ukur render consumer state dan dispatch menggunakan React DevTools.
```

## 01-useState-useEffect.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 44–62 (sebelum diubah)

```jsx
useEffect(() => {
  if (!isAuto) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    return;
  }

  const durations = { red: 3, green: 3, yellow: 1 };
  intervalRef.current = setInterval(() => {
    setCountdown(prev => {
      if (prev <= 1) {
        // switch light
        return prev; // placeholder
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(intervalRef.current);
}, [isAuto, currentLight]);
```

## 01b-useEffect-github-fetch.jsx, dulu bernama 02-useRef-useCallback.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 26–57 (sebelum diubah)

```jsx
function SearchGitHubUser({ username }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!username) { setUser(null); return; }

    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`, { signal: abortRef.current.signal })
      .then(res => {
        if (!res.ok) throw new Error(res.status === 404 ? "User tidak ditemukan" : "Request gagal");
        return res.json();
      })
      .then(data => { setUser(data); setLoading(false); })
      .catch(err => {
        if (err.name !== "AbortError") { setError(err.message); setLoading(false); }
      });

    return () => abortRef.current?.abort();
  }, [username]);

  return { user, loading, error };
}
// ============================================================
```

### Baris 171–186 (sebelum diubah)

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    handleResize(); // initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
// ============================================================
```

### Baris 217–238 (sebelum diubah)

```jsx
function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error("Fetch failed"); return res.json(); })
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err => {
        if (err.name !== "AbortError") { setError(err.message); setLoading(false); }
      });

    return () => controller.abort();
  }, []);

  return { posts, loading, error };
}
// ============================================================
```

## 04-custom-hooks.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 103–110 (sebelum diubah)

```jsx
useEffect(() => {
  if (!debouncedQuery) { setResults([]); return; }
  setLoading(true);
  fetch(`https://jsonplaceholder.typicode.com/posts?q=${debouncedQuery}&_limit=5`)
    .then(res => res.json())
    .then(data => { setResults(data); setLoading(false); })
    .catch(() => setLoading(false));
}, [debouncedQuery]);
```

## 02-useRef-useCallback Soal 2A — SearchBar auto-focus

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);
```

## 04-custom-hooks Soal 4B — useDebounce

```jsx
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

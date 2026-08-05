# Latihan 02 — React Hooks Lanjutan

## Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu:

1. Memahami `useRef` untuk mereferensikan DOM element dan menyimpan nilai mutable
2. Memahami `useCallback` untuk memoize function agar tidak dibuat ulang setiap render
3. Memahami `useReducer` untuk state management yang lebih terstruktur
4. Mampu membuat custom hooks yang reusable

---

## Prasyarat

- Sudah memahami `useState` dan `useEffect` dasar
- Sudah memasang Node.js 24 LTS dan npm
- Sudah membuat project React dengan Vite: `npm create vite@latest latihan-hooks -- --template react`
- Install dependencies: `npm install`

---

## Hooks yang Dipelajari

### useRef
`useRef` mengembalikan object ref yang bisa di-attach ke DOM element. Nilainya persist antar render tapi tidak trigger re-render saat diubah.

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);

return <input ref={inputRef} />;
```

### useCallback
`useCallback` memoize function sehingga tidak dibuat ulang setiap render. Berguna untuk mencegah child component re-render yang tidak perlu.

```jsx
const handleSubmit = useCallback((data) => {
  console.log("Submit:", data);
}, []); // dependency array

// Jika dependency berubah → function dibuat ulang
```

### useReducer
Alternatif untuk `useState` saat logic state transition kompleks. Menggunakan pattern action-dispatch.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "RESET": return { count: 0 };
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "INCREMENT" });
```

### Custom Hooks
Custom hook adalah fungsi yang menggunakan React hooks. Prefix `use` menandakan fungsi tersebut adalah hook.

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

---

## Cara Install dan Jalankan

```bash
# Buat project baru
npm create vite@latest latihan-hooks -- --template react
cd latihan-hooks
npm install

# Salin file soal ke src/
# Jalankan
npm run dev
```

---

## Checklist Penyelesaian

- [ ] useRef berhasil mereferensikan DOM element dan auto-focus berfungsi
- [ ] useCallback mencegah function dibuat ulang setiap render
- [ ] useReducer menangani semua action types dengan benar
- [ ] Custom hook menggunakan minimal 2 React hooks di dalamnya
- [ ] Cleanup function berjalan dengan benar (clearInterval, abort fetch, dll.)

---

## Referensi Tambahan

- [React Docs: useRef](https://react.dev/reference/react/useRef)
- [React Docs: useCallback](https://react.dev/reference/react/useCallback)
- [React Docs: useReducer](https://react.dev/reference/react/useReducer)
- [React Docs: Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

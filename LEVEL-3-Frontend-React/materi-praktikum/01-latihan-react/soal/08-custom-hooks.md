# SOAL 08 — Custom Hooks

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Membuat custom hooks yang reusable
2. Menggabungkan multiple React hooks dalam satu custom hook
3. Membuat hooks dengan parameter konfigurasi
4. Memahami patterns dalam custom hooks

---

## Briefing
Custom hooks adalah fungsi yang prefixed dengan `use` dan bisa memanggil React hooks. Mereka memungkinkan kamu mengekstrak logic yang reusable dari components.

---

## Deskripsi

### Soal 8A — useLocalStorage
Custom hook `useLocalStorage(key, initialValue)`:
- Init: baca dari localStorage, parse JSON, fallback ke initialValue
- Set: setiap perubahan → simpan ke localStorage (JSON.stringify)
- Return: `[value, setValue]`

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // TODO(human): baca dari localStorage
  });

  useEffect(() => {
    // TODO(human): simpan ke localStorage
  }, [key, value]);

  return [value, setValue];
}
```

### Soal 8B — useDebounce
Custom hook `useDebounce(value, delay)`:
- Mengembalikan debounced value — nilai "terlambat" setelah `delay` ms tidak ada perubahan
- Berguna untuk search input — tidak langsung fetch setiap keystroke

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

### Soal 8C — useFetch
Custom hook `useFetch(url, options)`:
- Return: `{ data, isLoading, error }`
- Auto-fetch saat url berubah
- AbortController untuk cleanup
- Handle loading dan error states

### Soal 8D — useToggle
Custom hook `useToggle(initialValue)`:
- Return: `[value, toggleFunction]`
- Sama seperti useState boolean tapi dengan toggle convenience

### Soal 8E — Combined Demo
`DemoApp` yang menggunakan semua custom hooks:
- `useLocalStorage("theme", "light")` → theme toggle
- `useDebounce(searchQuery, 500)` → debounced search
- `useFetch(debouncedUrl)` → GitHub user search
- `useToggle(false)` → modal visibility

---

## Syarat (Checklist)
- [ ] useLocalStorage membaca dan menulis ke localStorage dengan benar
- [ ] useDebounce menunda update sesuai delay
- [ ] useFetch menangani loading, error, dan cleanup
- [ ] useToggle berfungsi dengan benar
- [ ] Semua hooks menggunakan minimal 1 React hook di dalamnya
- [ ] Demo app berfungsi dengan benar

---

## Expected Output
- Theme bertahan setelah refresh (localStorage)
- Search debounced — fetch tidak dipanggil setiap keystroke
- useFetch auto-fetch saat URL berubah
- Modal toggle berfungsi

---

## Cara Submit
1. Simpan sebagai `08-custom-hooks.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai
# SOAL 04 — Ref Prop, Imperative Handle, dan Legacy Forward Ref

## Tujuan

Memahami cara React 19 meneruskan `ref` sebagai prop, membatasi imperative API
dengan `useImperativeHandle`, dan mengenali `forwardRef` pada codebase React 18.

---

## Deskripsi
Bangun komponen input yang dapat difokuskan oleh parent tanpa mengekspos detail
DOM lebih banyak daripada yang diperlukan.

---

## Syarat (Checklist)

### React 19

- [ ] Terima `ref` sebagai prop.
- [ ] Teruskan ref ke DOM element.
- [ ] Gunakan `useImperativeHandle` untuk mengekspos `focus()` dan `clear()`.
- [ ] Jangan gunakan ref untuk state yang seharusnya deklaratif.

### Legacy Compatibility

- [ ] Dapat membaca pola `React.forwardRef((props, ref) => ...)`.
- [ ] Dapat menjelaskan mengapa pola tersebut diperlukan pada React 18.
- [ ] Jangan menulis ulang codebase lama tanpa kebutuhan dan test.

### Use Cases
- [ ] Auto-focus input
- [ ] Measure element size
- [ ] Integrate dengan library

---

## Contoh Code

```jsx
function FancyButton({ ref, children, ...buttonProps }) {
  return (
    <button ref={ref} type="button" {...buttonProps}>
      {children}
    </button>
  );
}

// Usage
function App() {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return <FancyButton ref={buttonRef}>Click Me</FancyButton>;
}
```

---

## Cara Submit
1. Buat `TextInput.jsx` dengan ref prop React 19.
2. Batasi API dengan `useImperativeHandle`.
3. Buat `App.jsx` yang memakai ref untuk focus.
4. Tambahkan versi legacy `forwardRef` dan jelaskan perbedaannya.

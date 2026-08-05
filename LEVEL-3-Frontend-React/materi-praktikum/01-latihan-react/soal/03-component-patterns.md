# Latihan 01 — Component Patterns

## Soal 01: Higher-Order Component (HOC) Pattern

### Tujuan
Memahami Higher-Order Component pattern untuk menambahkan functionality ke component yang ada tanpa mengubahnya.

### Deskripsi
Buat beberapa HOCs yang umum digunakan dan demonstrate penggunaannya.

**HOCs yang harus dibuat:**

1. **`withLoading(Component)`** — menampilkan spinner saat data sedang loading:
   - Jika `isLoading === true`, render spinner + "Memuat..."
   - Jika `isLoading === false`, render component asli dengan props aslinya
   - Props yang diperlukan: `isLoading`, component yang di-wrap
   ```js
   function withLoading(WrappedComponent) {
     return function WithLoading({ isLoading, ...props }) {
       if (isLoading) {
         return <div className="loading-spinner">Memuat...</div>;
       }
       return <WrappedComponent {...props} />;
     };
   }
   ```

2. **`withErrorBoundary(Component)`** — menangkap errors dari child component:
   - Gunakan `componentDidCatch` via class component (HOC harus class atau gunakan try-catch di functional)
   - Tampilkan "Terjadi kesalahan" + tombol "Coba Lagi" saat error
   - Reset error state saat tombol diklik

3. **`withLogger(Component)`** — console.log setiap render:
   - Log nama component dan props saat render
   - Gunakan displayName yang informatif

4. **`withCounter(Component)`** — menambahkan increment/decrement functionality:
   - Props hasil: `count`, `increment`, `decrement`, `reset`
   - Initial count dari prop `initialCount` (default 0)

**Demo:**
```jsx
const DataListWithLoading = withLoading(DataList);
const CounterWithCounter = withCounter(CounterCard);
const ErrorBoundaryWrapped = withErrorBoundary(UnreliableComponent);

<DataListWithLoading isLoading={loading} data={data} />
<CounterWithCounter initialCount={5} />
```

**Component yang di-wrap:**

- **`UserListWithLoading`** — list user yang bisa loading
- **`CounterCard`** — display counter dengan increment/decrement
- **`UnreliableComponent`** — component yang throw error random

### Aturan
- HOC harus return component baru, bukan memodifikasi component yang sudah ada
- Props harus diteruskan (spread `...props`) ke wrapped component
- Gunakan `displayName` untuk debugging yang lebih mudah di React DevTools
- Pastikan prop name collision ditangani (misal: HOC menambahkan prop `isLoading`, dan component asli juga punya `isLoading`)

### Pertanyaan Analisis
1. Apa perbedaan HOC dengan custom hooks untuk reusable logic?
2. Kapan sebaiknya menggunakan HOC vs render props vs custom hooks?
3. Apa masalah dengan "wrapper hell" (HOC yang di-compose multiple times)?

---

## Soal 02: Render Props Pattern

### Tujuan
Memahami render props pattern sebagai alternatif HOC untuk share logic antar components.

### Deskripsi
Buat `MouseTracker` component yang share cursor position ke components yang membutuhkannya.

**`MouseTracker` component:**
```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return render(position);
}
```

**Usage:**
```jsx
<MouseTracker
  render={(position) => (
    <p>Mouse di posisi: {position.x}, {position.y}</p>
  )}
/>
```

**Tantangan:**

1. Buat `MouseTracker` yang menerima `children` sebagai function (alternatif pattern):
   ```jsx
   <MouseTracker>
     {(position) => <div>...</div>}
   </MouseTracker>
   ```

2. Buat `ResizeTracker` yang share window resize info:
   ```jsx
   <ResizeTracker>
     {(size) => <p>Window: {size.width} x {size.height}</p>}
   </ResizeTracker>
   ```

3. Buat `DataFetcher` render props component:
   ```jsx
   <DataFetcher
     url="https://jsonplaceholder.typicode.com/users/1"
     render={({ data, loading, error }) => {
       if (loading) return <p>Loading...</p>;
       if (error) return <p>Error: {error}</p>;
       return <pre>{JSON.stringify(data, null, 2)}</pre>;
     }}
   />
   ```

**Composition Challenge:**
Gabungkan `MouseTracker` dengan `ResizeTracker` untuk membuat `DeviceInfoPanel`:
- Tampilkan mouse position dan window size
- Panel yang selalu visible di corner layar
- Update secara real-time

### Aturan
- Render props function harus dipanggil dengan data yang diperlukan
- Handle loading dan error states di dalam render prop, bukan di tracker component
- Tracker component tidak tahu apa yang di-render — hanya share data

### Pertanyaan Analisis
1. Apa keuntungan utama render props dibanding HOC dalam hal prop collision?
2. Kapan render props menjadi anti-pattern (performance)?
3. Bagaimana React Hooks mengubah cara kita berpikir tentang render props pattern?

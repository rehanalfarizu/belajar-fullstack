# Latihan 01 — Props dan Children

## Soal 01: Component Composition dengan Children Prop

### Tujuan
Memahami children prop sebagai mechanism untuk component composition dan layout components yang reusable.

### Deskripsi
Buat sistem layout komponen untuk sebuah blog application.

**Components yang harus dibuat:**

1. **`Layout`** — wrapper utama:
   - Terima props: `title` (string)
   - Terima children (bisa berupa element atau array of elements)
   - Struktur:
     ```jsx
     <div className="layout">
       <header className="layout-header">
         <h1>{title}</h1>
       </header>
       <main className="layout-content">
         {children}
       </main>
       <footer className="layout-footer">
         <p>&copy; 2024 Belajar React</p>
       </footer>
     </div>
     ```

2. **`Section`** — section wrapper dengan heading opsional:
   - Terima props: `heading` (string | null, default null), `children`
   - Struktur:
     ```jsx
     <div className="section">
       {heading && <h2>{heading}</h2>}
       {children}
     </div>
     ```

3. **`Button`** — reusable button component:
   - Terima props: `variant` (`"primary"` | `"secondary"` | `"danger"` | `"ghost"`, default `"primary"`), `onClick`, `children`, `disabled`
   - Inline style berdasarkan variant:
     - primary: background biru, text putih
     - secondary: background abu-abu, text hitam
     - danger: background merah, text putih
     - ghost: no background, text biru, border
   - Jangan hardcode style di attribute, gunakan object atau conditional

4. **`Badge`** — inline badge:
   - Terima props: `text` (string), `color` (`"green"` | `"red"` | `"yellow"` | `"blue"`)
   - Inline style: background color sesuai, text putih, padding, border-radius

**Usage Example:**
```jsx
<Layout title="Blog Posts">
  <Section heading="Featured Posts">
    <Article title="Belajar React" />
    <Article title="Component Patterns" />
  </Section>

  <Section heading="Categories">
    <Badge text="Tutorial" color="blue" />
    <Badge text="Tips" color="green" />
    <Badge text="News" color="yellow" />
  </Section>

  <Section>
    <Button variant="primary" onClick={() => console.log("clicked")}>
      Read More
    </Button>
  </Section>
</Layout>
```

### Aturan
- Children bisa berupa: string, number, JSX element, array of elements, atau `null`
- Gunakan conditional rendering: `{heading && <h2>...</h2>}` bukan `{heading ? <h2>...</h2> : null}`
- Style object di JSX menggunakan camelCase: `borderRadius`, `backgroundColor`, bukan `background-color`
- Style sebagai object literal di dalam `{}`: `<div style={{ color: "red" }}>` (double curly braces!)

### Pertanyaan Analisis
1. Apa keuntungan menggunakan children prop dibanding props biasa?
2. Kapan sebaiknya menggunakan children vs props biasa?
3. Apakah children bisa di-pass sebagai props biasa? (Hint: `<Component children={<p>text</p>} />` vs `<Component><p>text</p></Component>`)

---

## Soal 02: Props sebagai Function dan Callback Props

### Tujuan
Memahami props yang bisa berupa function (callback), dan bagaimana parent dan child berkomunikasi melalui props.

### Deskripsi
Buat `ColorPickerApp` — aplikasi untuk memilih dan mengelola warna favorit.

**Components:**

1. **`ColorBox`** — menampilkan satu warna:
   - Props: `color` ({ hex, name, isFavorite }), `onToggleFavorite`, `onDelete`
   - Tampilkan: color swatch (kotak besar dengan background hex), nama warna, heart icon jika favorite
   - Click heart → panggil `onToggleFavorite(color.id)`
   - Click delete → panggil `onDelete(color.id)`

2. **`ColorPalette`** — daftar warna:
   - Props: `colors`, `onToggleFavorite`, `onDelete`, `onAddColor`
   - Render list `ColorBox`
   - Tombol "Add New Color" di atas

3. **`AddColorForm`** — form untuk tambah warna baru:
   - Props: `onAdd`
   - Fields: color name (text), hex color (color picker native)
   - Tombol Add dan Cancel

4. **`App`** — parent component dengan state:
   - State: `colors` (array), berisi `{ id, name, hex, isFavorite }`
   - Functions yang passed sebagai props:
     - `handleAddColor(name, hex)` → push ke array
     - `handleToggleFavorite(id)` → toggle isFavorite
     - `handleDeleteColor(id)` → filter out dari array
   - Hitung dan tampilkan: "X warna, Y favorit"

**Fitur:**
1. Favorit filter: tampilkan hanya favorit atau semua
2. Sort: alphabetical atau newest first
3. Empty state: "Belum ada warna. Tambahkan warna pertama!" jika colors kosong

### Aturan
- Callback props di-pass sebagai function reference, bukan invoked: `onClick={handleClick}` bukan `onClick={handleClick()}`
- Immutable update pattern: `setColors(prev => [...prev, newColor])`, bukan `colors.push(...)`
- ID untuk new color: `Date.now().toString()`

### Pertanyaan Analisis
1. Apa perbedaan props dan state dalam konteks ini?
2. Mengapa `setColors(prev => ...)` lebih aman daripada `setColors([...colors, newColor])`?
3. Bagaimana cara child component berkomunikasi dengan parent? Apakah bisa langsung?
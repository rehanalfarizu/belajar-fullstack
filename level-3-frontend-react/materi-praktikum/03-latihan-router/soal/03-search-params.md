# Latihan 03 — Search Params

## Soal 01: useSearchParams untuk Filtering dan Pagination

### Tujuan
Memahami `useSearchParams` sebagai cara menyimpan state di URL query string, sehingga URL bisa di-share dan di-bookmark.

### Deskripsi
Buat `BookCatalog` — katalog buku dengan filter dan pagination yang seluruh state-nya tersimpan di URL.

**Data buku (hardcoded,20+ items):**
```js
const books = [
  { id: "B001", title: "Clean Code", author: "Robert C. Martin", category: "programming", year: 2008, rating: 4.4, price: 350000 },
  { id: "B002", title: "The Pragmatic Programmer", author: "David Thomas", category: "programming", year: 2019, rating: 4.5, price: 380000 },
  { id: "B003", title: "Design Patterns", author: "Gang of Four", category: "programming", year: 1994, rating: 4.2, price: 290000 },
  { id: "B004", title: "Atomic Habits", author: "James Clear", category: "self-help", year: 2018, rating: 4.7, price: 280000 },
  { id: "B005", title: "Deep Work", author: "Cal Newport", category: "self-help", year: 2016, rating: 4.3, price: 265000 },
  { id: "B006", title: "The Lean Startup", author: "Eric Ries", category: "business", year: 2011, rating: 4.1, price: 245000 },
  { id: "B007", title: "Zero to One", author: "Peter Thiel", category: "business", year: 2014, rating: 4.2, price: 230000 },
  { id: "B008", title: "Sapiens", author: "Yuval Noah Harari", category: "history", year: 2011, rating: 4.6, price: 310000 },
  { id: "B009", title: "Homo Deus", author: "Yuval Noah Harari", category: "history", year: 2015, rating: 4.4, price: 320000 },
  { id: "B010", title: "The Art of War", author: "Sun Tzu", category: "history", year: -500, rating: 4.1, price: 95000 },
  { id: "B011", title: "1984", author: "George Orwell", category: "fiction", year: 1949, rating: 4.3, price: 150000 },
  { id: "B012", title: "Brave New World", author: "Aldous Huxley", category: "fiction", year: 1932, rating: 4.0, price: 145000 },
  { id: "B013", title: "Fahrenheit 451", author: "Ray Bradbury", category: "fiction", year: 1953, rating: 4.1, price: 140000 },
  { id: "B014", title: "Introduction to Algorithms", author: "Cormen et al.", category: "programming", year: 2009, rating: 4.5, price: 450000 },
  { id: "B015", title: "You Don't Know JS", author: "Kyle Simpson", category: "programming", year: 2015, rating: 4.6, price: 220000 },
  { id: "B016", title: "The Mythical Man-Month", author: "Frederick Brooks", category: "programming", year: 1975, rating: 4.1, price: 180000 },
  { id: "B017", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "psychology", year: 2011, rating: 4.5, price: 340000 },
  { id: "B018", title: "Influence", author: "Robert Cialdini", category: "psychology", year: 1984, rating: 4.4, price: 270000 },
  { id: "B019", title: "The Psychology of Selling", author: "Brian Tracy", category: "business", year: 2009, rating: 4.2, price: 195000 },
  { id: "B020", title: "How to Win Friends", author: "Dale Carnegie", category: "self-help", year: 1936, rating: 4.3, price: 160000 },
];
```

**URL State (Search Params):**
| Param | Values | Default |
|---|---|---|
| `q` | string | "" (empty = semua) |
| `category` | all, programming, self-help, business, history, fiction, psychology | all |
| `sort` | title_asc, title_desc, year_asc, year_desc, rating_desc, price_asc, price_desc | title_asc |
| `page` |1, 2, 3, ... | 1 |

**Fitur:**
1. **Search bar**: input untuk search query (`q`), filter realtime berdasarkan title atau author
2. **Category filter**: buttons atau dropdown untuk category
3. **Sort dropdown**: pilihan sorting
4. **Reset button**: clear semua filters ke default
5. **Pagination**:6 items per page, prev/next buttons, page numbers
6. **URL update**: setiap filter berubah, URL di-update: `?q=code&category=programming&sort=rating_desc&page=2`
7. **Shareable URL**: copy URL dan buka di tab baru, state yang sama persist

**Implementation Pattern:**
```jsx
function BookCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "title_asc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value === "all" || !value) next.delete(key);
    else next.set(key, value);
    next.delete("page"); // reset ke page 1 saat filter berubah
    setSearchParams(next);
  }

  // Filter dan sort
  const filtered = books.filter(b => {
    const matchQuery = b.title.toLowerCase().includes(query.toLowerCase()) ||
                       b.author.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === "all" || b.category === category;
    return matchQuery && matchCategory;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (/* ... */);
}
```

### Aturan
- Search params di-parse setiap render — tidak ada local state untuk filter
- `parseInt(searchParams.get("page") || "1", 10)` — selalu ada default dan base 10
- `setSearchParams` menerima `URLSearchParams` object, bukan plain object
- Reset pagination ke page 1 setiap kali filter berubah
- Total pages dihitung ulang setiap kali filtered list berubah

### Pertanyaan Analisis
1. Apa keuntungan menyimpan filter state di URL dibandingkan local state?
2. Kapan search params kurang cocok dibanding URL params?
3. Bagaimana cara handle URL params yang tidak valid (misal: page=999)?
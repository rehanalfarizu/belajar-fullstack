// ============================================================
// FILE: 03-latihan-router/code/03-search-params.jsx
// MATERI: React Router — useSearchParams untuk Filter dan Pagination
// ============================================================
import { useSearchParams } from "react-router-dom";

// ============================================================
// TODO: BookCatalog dengan useSearchParams
// ============================================================
// URL State: ?q=&category=all&sort=title_asc&page=1
//
// function BookCatalog({ books }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//
//   // Parse params dari URL
//   const query = searchParams.get("q") || "";
//   const category = searchParams.get("category") || "all";
//   const sort = searchParams.get("sort") || "title_asc";
//   const page = parseInt(searchParams.get("page") || "1", 10);
//
//   // Helper untuk update params
//   function updateParam(key, value) {
//     const next = new URLSearchParams(searchParams);
//     if (value === "all" || !value) next.delete(key);
//     else next.set(key, value);
//     next.delete("page"); // reset page saat filter berubah
//     setSearchParams(next);
//   }
//
//   // Filter books
//   const filtered = books.filter(book => {
//     const matchQuery = book.title.toLowerCase().includes(query.toLowerCase()) ||
//                       book.author.toLowerCase().includes(query.toLowerCase());
//     const matchCategory = category === "all" || book.category === category;
//     return matchQuery && matchCategory;
//   });
//
//   // Sort
//   const sorted = [...filtered].sort((a, b) => {
//     switch (sort) {
//       case "title_asc": return a.title.localeCompare(b.title);
//       case "title_desc": return b.title.localeCompare(a.title);
//       case "price_asc": return a.price - b.price;
//       case "price_desc": return b.price - a.price;
//       case "rating_desc": return b.rating - a.rating;
//       default: return 0;
//     }
//   });
//
//   // Pagination
//   const ITEMS_PER_PAGE = 6;
//   const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
//   const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
//
//   return (
//     <div className="book-catalog">
//       {/* Search input */}
//       {/* Category filter */}
//       {/* Sort dropdown */}
//       {/* Book list */}
//       {/* Pagination */}
//     </div>
//   );
// }
// ============================================================

const BOOKS = [
  { id: "B001", title: "Clean Code", author: "Robert C. Martin", category: "programming", year: 2008, rating: 4.4, price: 350000 },
  { id: "B002", title: "The Pragmatic Programmer", author: "David Thomas", category: "programming", year: 2019, rating: 4.5, price: 380000 },
  { id: "B003", title: "Design Patterns", author: "Gang of Four", category: "programming", year: 1994, rating: 4.2, price: 290000 },
  { id: "B004", title: "Atomic Habits", author: "James Clear", category: "self-help", year: 2018, rating: 4.7, price: 280000 },
  { id: "B005", title: "Deep Work", author: "Cal Newport", category: "self-help", year: 2016, rating: 4.3, price: 265000 },
  { id: "B006", title: "The Lean Startup", author: "Eric Ries", category: "business", year: 2011, rating: 4.1, price: 245000 },
  { id: "B007", title: "Zero to One", author: "Peter Thiel", category: "business", year: 2014, rating: 4.2, price: 230000 },
  { id: "B008", title: "Sapiens", author: "Yuval Noah Harari", category: "history", year: 2011, rating: 4.6, price: 310000 },
  { id: "B009", title: "Homo Deus", author: "Yuval Noah Harari", category: "history", year: 2015, rating: 4.4, price: 320000 },
  { id: "B010", title: "1984", author: "George Orwell", category: "fiction", year: 1949, rating: 4.3, price: 150000 },
  { id: "B011", title: "Brave New World", author: "Aldous Huxley", category: "fiction", year: 1932, rating: 4.0, price: 145000 },
  { id: "B012", title: "Introduction to Algorithms", author: "Cormen et al.", category: "programming", year: 2009, rating: 4.5, price: 450000 },
  { id: "B013", title: "You Don't Know JS", author: "Kyle Simpson", category: "programming", year: 2015, rating: 4.6, price: 220000 },
  { id: "B014", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "psychology", year: 2011, rating: 4.5, price: 340000 },
  { id: "B015", title: "Influence", author: "Robert Cialdini", category: "psychology", year: 1984, rating: 4.4, price: 270000 },
  { id: "B016", title: "How to Win Friends", author: "Dale Carnegie", category: "self-help", year: 1936, rating: 4.3, price: 160000 },
];

export function BookCatalog() {
  // TODO: useSearchParams
  // TODO: Parse query, category, sort, page
  // TODO: Helper updateParam function
  // TODO: Filter + Sort + Paginate logic
  // TODO: Render search, filters, book list, pagination

  return (
    <div className="book-catalog">
      {/* TODO: Search bar */}
      {/* TODO: Category buttons */}
      {/* TODO: Sort dropdown */}
      {/* TODO: Results count */}
      {/* TODO: Book grid */}
      {/* TODO: Pagination controls */}
    </div>
  );
}

// ============================================================
// TODO: useSearchParams untuk Tab Navigation
// ============================================================
// URL: ?tab=overview | ?tab=analytics | ?tab=settings
//
// function TabNavigation() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const activeTab = searchParams.get("tab") || "overview";
//
//   function setTab(tab) {
//     const next = new URLSearchParams(searchParams);
//     next.set("tab", tab);
//     setSearchParams(next);
//   }
//
//   return (
//     <div className="tab-navigation">
//       <div className="tab-buttons">
//         <button onClick={() => setTab("overview")} className={activeTab === "overview" ? "active" : ""}>
//           Overview
//         </button>
//         <button onClick={() => setTab("analytics")} className={activeTab === "analytics" ? "active" : ""}>
//           Analytics
//         </button>
//         <button onClick={() => setTab("settings")} className={activeTab === "settings" ? "active" : ""}>
//           Settings
//         </button>
//       </div>
//       <div className="tab-content">
//         {activeTab === "overview" && <p>Overview content here...</p>}
//         {activeTab === "analytics" && <p>Analytics content here...</p>}
//         {activeTab === "settings" && <p>Settings content here...</p>}
//       </div>
//     </div>
//   );
// }
// ============================================================

export function TabNavigation() {
  // TODO: useSearchParams
  // TODO: activeTab dari searchParams
  // TODO: setTab function
  // TODO: Render tab buttons + content

  return (
    <div className="tab-navigation">
      {/* TODO: Tab buttons */}
      {/* TODO: Tab content */}
    </div>
  );
}

// ============================================================
// TODO: Advanced Search dengan Multiple Params
// ============================================================
// URL: ?q=react&author=robert&year=2020&rating=4&page=1
//
// function AdvancedSearch() {
//   const [searchParams, setSearchParams] = useSearchParams();
//
//   const query = searchParams.get("q") || "";
//   const author = searchParams.get("author") || "";
//   const year = searchParams.get("year") || "";
//   const minRating = parseInt(searchParams.get("rating") || "0", 10);
//   const page = parseInt(searchParams.get("page") || "1", 10);
//
//   function updateParam(key, value) {
//     const next = new URLSearchParams(searchParams);
//     if (!value) next.delete(key);
//     else next.set(key, value);
//     next.delete("page");
//     setSearchParams(next);
//   }
//
//   function clearAll() {
//     setSearchParams({});
//   }
//
//   // Filter logic
//   const filtered = BOOKS.filter(book => {
//     if (query && !book.title.toLowerCase().includes(query.toLowerCase())) return false;
//     if (author && !book.author.toLowerCase().includes(author.toLowerCase())) return false;
//     if (year && book.year.toString() !== year) return false;
//     if (book.rating < minRating) return false;
//     return true;
//   });
//
//   // Active filters display
//   const activeFilters = [];
//   if (query) activeFilters.push(`Q: ${query}`);
//   if (author) activeFilters.push(`Author: ${author}`);
//   if (year) activeFilters.push(`Year: ${year}`);
//   if (minRating > 0) activeFilters.push(`Rating: ${minRating}+`);
//
//   return (
//     <div className="advanced-search">
//       {/* Search form */}
//       {/* Active filters */}
//       {/* Results count */}
//       {/* Book list */}
//     </div>
//   );
// }
// ============================================================

export function AdvancedSearch() {
  // TODO: useSearchParams untuk semua filter params
  // TODO: Helper untuk update param
  // TODO: Filter logic dengan multiple criteria
  // TODO: Active filters display
  // TODO: Clear all button

  return (
    <div className="advanced-search">
      {/* TODO: Search form */}
      {/* TODO: Filter controls */}
      {/* TODO: Active filters badges */}
      {/* TODO: Results */}
    </div>
  );
}

// ============================================================
// BONUS: URL State Sync — Sync semua state ke URL
// ============================================================
// function URLStateApp() {
//   const [searchParams, setSearchParams] = useSearchParams();
//
//   // Semua state berasal dari URL
//   const theme = searchParams.get("theme") || "light";
//   const lang = searchParams.get("lang") || "en";
//   const view = searchParams.get("view") || "grid";
//
//   // Update URL → component re-render dengan state baru
//   function update(key, value) {
//     const next = new URLSearchParams(searchParams);
//     if (value === "default") next.delete(key);
//     else next.set(key, value);
//     setSearchParams(next);
//   }
//
//   return (
//     <div>
//       <p>Theme: {theme} | Language: {lang} | View: {view}</p>
//       <button onClick={() => update("theme", theme === "light" ? "dark" : "light")}>Toggle Theme</button>
//       <button onClick={() => update("lang", lang === "en" ? "id" : "en")}>Toggle Lang</button>
//       <button onClick={() => update("view", view === "grid" ? "list" : "grid")}>Toggle View</button>
//       <p>URL: ?{searchParams.toString()}</p>
//     </div>
//   );
// }
// ============================================================

export function URLStateApp() {
  // TODO: Semua state dari URL
  // TODO: Toggle buttons yang update URL params
  // TODO: Display URL params
  return <div>URLStateApp</div>;
}
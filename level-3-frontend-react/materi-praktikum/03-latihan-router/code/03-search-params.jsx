// ============================================================
// FILE: 03-latihan-router/code/03-search-params.jsx
// MATERI: React Router — useSearchParams untuk Filter dan Pagination
// ============================================================
import { useSearchParams } from "react-router-dom";

// ============================================================
// TODO: BookCatalog dengan useSearchParams
// ============================================================
// URL State: ?q=&category=all&sort=title_asc&page=1
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

export function URLStateApp() {
  // TODO: Semua state dari URL
  // TODO: Toggle buttons yang update URL params
  // TODO: Display URL params
  return <div>URLStateApp</div>;
}
// ============================================================
// FILE: 02-latihan-hooks/code/05-custom-hook.jsx
// MATERI: Custom Hooks — useLocalStorage, useDebounce, usePrevious
// ============================================================
import { useState, useEffect, useRef, useMemo } from "react";

// ============================================================
// TODO: useLocalStorage
// ============================================================
// function useLocalStorage(key, initialValue) {
//   const [value, setValue] = useState(() => {
//     if (typeof window === "undefined") return initialValue;
//     try {
//       const stored = window.localStorage.getItem(key);
//       return stored !== null ? JSON.parse(stored) : initialValue;
//     } catch { return initialValue; }
//   });
//
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     try {
//       if (value === null || value === undefined) {
//         window.localStorage.removeItem(key);
//       } else {
//         window.localStorage.setItem(key, JSON.stringify(value));
//       }
//     } catch (err) { console.warn("localStorage write failed:", err); }
//   }, [key, value]);
//
//   return [value, setValue];
// }
// ============================================================

function useLocalStorage(key, initialValue) {
  // TODO: Implementasikan useLocalStorage seperti di atas
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}

// ============================================================
// TODO: useDebounce
// ============================================================
// function useDebounce(value, delay = 500) {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//
//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(timer);
//   }, [value, delay]);
//
//   return debouncedValue;
// }
// ============================================================

function useDebounce(value, delay = 500) {
  // TODO: Implementasikan useDebounce seperti di atas
  return value;
}

// ============================================================
// TODO: usePrevious
// ============================================================
// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   }, [value]);
//   return ref.current;
// }
// ============================================================

function usePrevious(value) {
  // TODO: Implementasikan usePrevious seperti di atas
  const ref = useRef();
  ref.current = value;
  return ref.current;
}

// ============================================================
// TODO: useIntersectionObserver
// ============================================================
// function useIntersectionObserver(options = {}) {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const ref = useRef(null);
//
//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsIntersecting(entry.isIntersecting);
//     }, options);
//
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [options.threshold, options.rootMargin]);
//
//   return [ref, isIntersecting];
// }
// ============================================================

function useIntersectionObserver(options = {}) {
  // TODO: Implementasikan useIntersectionObserver
  const ref = useRef(null);
  return [ref, false];
}

// ============================================================
// TODO: useMediaQuery
// ============================================================
// function useMediaQuery(query) {
//   const [matches, setMatches] = useState(
//     () => typeof window !== "undefined" ? window.matchMedia(query).matches : false
//   );
//
//   useEffect(() => {
//     const mediaQuery = window.matchMedia(query);
//     const handler = (event) => setMatches(event.matches);
//
//     mediaQuery.addEventListener("change", handler);
//     return () => mediaQuery.removeEventListener("change", handler);
//   }, [query]);
//
//   return matches;
// }
// ============================================================

function useMediaQuery(query) {
  // TODO: Implementasikan useMediaQuery
  return false;
}

// ============================================================
// TODO: useOnClickOutside
// ============================================================
// function useOnClickOutside(ref, handler) {
//   useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || ref.current.contains(event.target)) return;
//       handler(event);
//     };
//
//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);
//
//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// }
// ============================================================

function useOnClickOutside(ref, handler) {
  // TODO: Implementasikan useOnClickOutside seperti di atas
}

// ============================================================
// DEMO COMPONENTS
// ============================================================

// --- Demo: useLocalStorage (Theme Toggle) ---
export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("app-theme", "light");

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  // TODO: useEffect untuk apply className ke <html>
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  return (
    <div className="theme-toggle">
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// --- Demo: useDebounce (Search with API) ---
export function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: gunakan useDebounce(query, 300)
  // const debouncedQuery = useDebounce(query, 300);

  // TODO: useEffect untuk fetch saat debouncedQuery berubah
  // useEffect(() => {
  //   if (!debouncedQuery) { setResults([]); return; }
  //   setLoading(true);
  //   fetch(`https://jsonplaceholder.typicode.com/posts?q=${debouncedQuery}&_limit=5`)
  //     .then(res => res.json())
  //     .then(data => { setResults(data); setLoading(false); })
  //     .catch(() => setLoading(false));
  // }, [debouncedQuery]);

  return (
    <div className="debounced-search">
      {/* TODO: Search input */}
      {/* TODO: Loading indicator */}
      {/* TODO: Results list */}
    </div>
  );
}

// --- Demo: usePrevious (Value Delta) ---
export function ValueDelta() {
  const [value, setValue] = useState(0);
  const previousValue = usePrevious(value);
  const delta = value - (previousValue ?? 0);

  return (
    <div className="value-delta">
      <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
      <p>Current: {value}</p>
      <p>Previous: {previousValue ?? "N/A"}</p>
      <p>Delta: <span style={{ color: delta >= 0 ? "green" : "red" }}>{delta >= 0 ? "+" : ""}{delta}</span></p>
    </div>
  );
}

// --- Demo: useIntersectionObserver (Lazy reveal) ---
export function LazyReveal() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div className="lazy-reveal">
      <div style={{ height: "200px", background: "#f3f4f6" }}>Scroll down...</div>
      <div
        ref={ref}
        style={{
          height: "200px",
          background: isIntersecting ? "#22c55e" : "#e5e7eb",
          transition: "background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        {isIntersecting ? "I am visible!" : "Scroll to reveal me"}
      </div>
    </div>
  );
}

// --- Demo: useMediaQuery (Responsive) ---
export function ResponsiveLayout() {
  const isLarge = useMediaQuery("(min-width: 768px)");

  return (
    <div className="responsive-layout">
      <p>Viewport: {isLarge ? "Desktop (>= 768px)" : "Mobile (< 768px)"}</p>
      {isLarge ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1, padding: "20px", background: "#e5e7eb" }}>Sidebar</div>
          <div style={{ flex: 2, padding: "20px" }}>Main Content</div>
        </div>
      ) : (
        <div>
          <div style={{ padding: "20px", background: "#e5e7eb", marginBottom: "10px" }}>Main Content (stacked)</div>
          <div style={{ padding: "20px", background: "#e5e7eb" }}>Sidebar (stacked)</div>
        </div>
      )}
    </div>
  );
}

// --- Demo: useOnClickOutside (Dropdown) ---
export function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // TODO: useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="dropdown-demo">
      <button onClick={() => setIsOpen(prev => !prev)}>Toggle Dropdown</button>
      {isOpen && (
        <div ref={dropdownRef} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      )}
      <p>Click outside to close</p>
    </div>
  );
}
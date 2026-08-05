// ============================================================
// FILE: 02-latihan-hooks/code/02-useEffect.jsx
// MATERI: useEffect — Data Fetching, Cleanup, dan AbortController
// ============================================================
import { useState, useEffect, useRef } from "react";

// ============================================================
// TODO: GitHubUserSearch
// ============================================================
// State:
//   - query: string (username yang dicari)
//   - user: object | null
//   - loading: boolean
//   - error: string | null
//
// Fitur:
//   1. Input field untuk username + Search button
//   2. Loading state: "Mencari..." dengan spinner
//   3. Error state: "User tidak ditemukan" / "Network error"
//   4. Success state: GitHub card dengan avatar, name, bio, stats
//   5. WAJIB: AbortController untuk cancel request sebelumnya
//   6. Search baru → cancel request lama
//
// API: https://api.github.com/users/{username}
//
// function SearchGitHubUser({ username }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const abortRef = useRef(null);
//
//   useEffect(() => {
//     if (!username) { setUser(null); return; }
//
//     // Cancel previous request
//     if (abortRef.current) abortRef.current.abort();
//     abortRef.current = new AbortController();
//
//     setLoading(true);
//     setError(null);
//
//     fetch(`https://api.github.com/users/${username}`, { signal: abortRef.current.signal })
//       .then(res => {
//         if (!res.ok) throw new Error(res.status === 404 ? "User tidak ditemukan" : "Request gagal");
//         return res.json();
//       })
//       .then(data => { setUser(data); setLoading(false); })
//       .catch(err => {
//         if (err.name !== "AbortError") { setError(err.message); setLoading(false); }
//       });
//
//     return () => abortRef.current?.abort();
//   }, [username]);
//
//   return { user, loading, error };
// }
// ============================================================

function useGitHubUser(username) {
  // TODO: Implementasikan seperti di atas

  return { user, loading, error };
}

export function GitHubUserSearch() {
  const [query, setQuery] = useState("");
  const { user, loading, error } = useGitHubUser(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Trigger search
  };

  return (
    <div className="github-search">
      {/* TODO: Form dengan input + button */}
      {/* TODO: Loading state */}
      {/* TODO: Error state */}
      {/* TODO: User card */}
    </div>
  );
}

// ============================================================
// TODO: useEffect dengan Cleanup — Timer/Clock
// ============================================================
// State:
//   - seconds: number (total detik)
//   - isRunning: boolean
//
// Fitur:
//   1. Display: HH:MM:SS format
//   2. Start / Pause / Reset buttons
//   3. useEffect dengan cleanup: setInterval di-effect, clearInterval di cleanup
//   4. useEffect dependency array: [isRunning] — hanya update saat isRunning berubah
//
// Format: padStart(2, "0") untuk 0-padding
// function formatTime(totalSeconds) {
//   const h = Math.floor(totalSeconds / 3600);
//   const m = Math.floor((totalSeconds % 3600) / 60);
//   const s = totalSeconds % 60;
//   return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
// }
// ============================================================

export function Stopwatch() {
  // TODO: State untuk seconds, isRunning

  // TODO: useEffect untuk setInterval
  // useEffect(() => {
  //   if (!isRunning) return;
  //   const interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
  //   return () => clearInterval(interval);
  // }, [isRunning]);

  return (
    <div className="stopwatch">
      {/* TODO: Time display */}
      {/* TODO: Start / Pause / Reset buttons */}
    </div>
  );
}

// ============================================================
// TODO: Document Title Updater
// ============================================================
// useEffect untuk update document.title berdasarkan state
//
// State: count (number)
//
// Fitur:
//   1. Counter dengan increment/decrement
//   2. Document title berubah: "Count: X" saat count > 0
//   3. Jika count === 0: title tetap "React App"
//   4. Cleanup: saat unmount, reset title ke default
//
// useEffect(() => {
//   if (count > 0) document.title = `Count: ${count}`;
//   else document.title = "React App";
//
//   return () => { document.title = "React App"; };
// }, [count]);
// ============================================================

export function DocumentTitleUpdater() {
  // TODO: State count

  // TODO: useEffect untuk update document.title

  return (
    <div className="doc-title-updater">
      {/* TODO: Counter */}
    </div>
  );
}

// ============================================================
// TODO: Window Resize Listener
// ============================================================
// useEffect untuk listen window resize dan update state
//
// State:
//   - windowSize: { width, height }
//
// Fitur:
//   1. Tampilkan Ukuran window saat ini
//   2. Update setiap resize
//   3. Cleanup: remove event listener saat unmount
//   4. SSR-safe: initial values
//
// function useWindowSize() {
//   const [size, setSize] = useState({ width: 0, height: 0 });
//
//   useEffect(() => {
//     function handleResize() {
//       setSize({ width: window.innerWidth, height: window.innerHeight });
//     }
//
//     handleResize(); // initial size
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//
//   return size;
// }
// ============================================================

function useWindowSize() {
  // TODO: Implementasikan useWindowSize hook

  return { width: 0, height: 0 };
}

export function WindowSizeDisplay() {
  const { width, height } = useWindowSize();

  return (
    <div className="window-size">
      <p>Window: {width}px × {height}px</p>
      <p>Resize your browser window to see updates.</p>
    </div>
  );
}

// ============================================================
// TODO: Data Fetching dengan Real API
// ============================================================
// useEffect untuk fetch data dari JSONPlaceholder
//
// Fitur:
//   1. Fetch posts dari https://jsonplaceholder.typicode.com/posts
//   2. Loading state saat fetch
//   3. Error state jika fetch gagal
//   4. Display: list 10 post pertama dengan title dan excerpt
//   5. AbortController untuk cleanup
//
// function usePosts() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const controller = new AbortController();
//
//     setLoading(true);
//     fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", { signal: controller.signal })
//       .then(res => { if (!res.ok) throw new Error("Fetch failed"); return res.json(); })
//       .then(data => { setPosts(data); setLoading(false); })
//       .catch(err => {
//         if (err.name !== "AbortError") { setError(err.message); setLoading(false); }
//       });
//
//     return () => controller.abort();
//   }, []);
//
//   return { posts, loading, error };
// }
// ============================================================

function usePosts() {
  // TODO: Implementasikan usePosts hook
  return { posts: [], loading: false, error: null };
}

export function PostsList() {
  const { posts, loading, error } = usePosts();

  return (
    <div className="posts-list">
      {/* TODO: Loading / Error / List display */}
    </div>
  );
}
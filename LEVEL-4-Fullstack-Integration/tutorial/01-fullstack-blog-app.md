# Tutorial 01 — Fullstack Blog App (Frontend + Backend)

## Tujuan
Mengintegrasikan frontend React dengan backend Express, memahami alur data penuh dari database sampai tampilan UI.

---

## Arsitektur

```
Browser (React) ←→ Express API ←→ SQLite Database
   Port 5173         Port 3000      blog.db
```

---

## Langkah 1 — Siapkan Backend

```bash
cd LEVEL-2-Backend-Node-Express/blog-api
node index.js
```

Pastikan API berjalan di `http://localhost:3000`.

---

## Langkah 2 — Buat Frontend

```bash
npm create vite@latest fullstack-blog -- --template react
cd fullstack-blog
npm install
npm install react-router-dom
```

---

## Langkah 3 — Buat API Service

Buat `src/api/blogApi.js` — semua pemanggilan API di satu tempat:

```javascript
const BASE_URL = "http://localhost:3000/api";

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Gagal mengambil posts");
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Post tidak ditemukan");
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Gagal membuat post");
  return res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Gagal mengupdate post");
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus post");
  return res.json();
}

export async function getComments(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Gagal mengambil comments");
  return res.json();
}

export async function createComment(postId, data) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Gagal membuat comment");
  return res.json();
}
```

---

## Langkah 4 — Context untuk State Global

Buat `src/context/BlogContext.jsx` — satu sumber state untuk seluruh app:

```jsx
import { createContext, useContext, useState, useCallback } from "react";
import * as api from "../api/blogApi";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const tambahPost = useCallback(async data => {
    await api.createPost(data);
    await fetchPosts();
  }, [fetchPosts]);

  const hapusPost = useCallback(async id => {
    await api.deletePost(id);
    await fetchPosts();
  }, [fetchPosts]);

  return (
    <BlogContext.Provider value={{ posts, loading, error, fetchPosts, tambahPost, hapusPost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}
```

---

## Langkah 5 — Halaman Home

Buat `src/pages/Home.jsx`:

```jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

function Home() {
  const { posts, loading, error, fetchPosts, hapusPost } = useBlog();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleHapus = async id => {
    if (!confirm("Yakin ingin menghapus?")) return;
    await hapusPost(id);
  };

  if (loading) return <p className="loading">Memuat...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="home">
      <div className="header">
        <h2>Daftar Artikel</h2>
        <Link to="/tambah" className="btn btn-primary">+ Tambah Artikel</Link>
      </div>

      {posts.length === 0 ? (
        <p className="empty">Belum ada artikel. Yuk, tulis yang pertama!</p>
      ) : (
        posts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.judul}</h3>
              <span className="penulis">oleh {post.penulis}</span>
            </div>
            <p className="konten">{post.konten}</p>
            <div className="actions">
              <Link to={`/edit/${post.id}`} className="btn btn-secondary">Edit</Link>
              <button onClick={() => handleHapus(post.id)} className="btn btn-danger">Hapus</button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export default Home;
```

---

## Langkah 6 — Setup App dengan Provider

Ganti `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TambahPost from "./pages/TambahPost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tambah" element={<TambahPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </BlogProvider>
  );
}

export default App;
```

---

## Konsep Kunci

| Konsep | Penjelasan |
|--------|------------|
| `Context API` | Menyimpan state global agar bisa diakses di mana saja |
| `API Service` | Memusatkan semua fetch call di satu file |
| `useCallback` | Menghindari infinite loop di useEffect |
| `Optimistic UI` | Update tampilan dulu, baru sync ke server |

---

## Latihan Tambahan

1. Tambahkan fitur comments di halaman detail
2. Tambahkan pagination (tampilkan 5 post per halaman)
3. Gunakan cookie `HttpOnly` untuk session/refresh token dan uji proteksi CSRF
4. Tambah halaman login/register

---

**Lanjut ke:** [LEVEL-5 — Expert Level](../../LEVEL-5-Expert-Level/)

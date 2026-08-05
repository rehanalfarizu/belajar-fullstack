# Tutorial 02 — React dengan API (Fetching Data)

## Tujuan
Mengambil data dari backend Express API dan menampilkannya di React menggunakan `useEffect` dan `useState`.

---

## Persiapan

Pastikan backend dari LEVEL-2 sudah berjalan:

```bash
cd LEVEL-2-Backend-Node-Express/blog-api
node index.js
```

Server harus berjalan di `http://localhost:3000`.

---

## Langkah 1 — Buat Project Baru

```bash
npm create vite@latest blog-frontend -- --template react
cd blog-frontend
npm install
npm install react-router-dom
```

---

## Langkah 2 — Buat Komponen Navbar

Buat `src/components/Navbar.jsx`:

```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Blog Saya</h1>
      <div className="links">
        <Link to="/">Beranda</Link>
        <Link to="/posts">Posts</Link>
      </div>
    </nav>
  );
}

export default Navbar;
```

---

## Langkah 3 — Halaman Daftar Posts

Buat `src/pages/Home.jsx`:

```jsx
import { useState, useEffect } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home">
      <h2>Daftar Artikel</h2>
      {posts.length === 0 ? (
        <p>Belum ada artikel.</p>
      ) : (
        posts.map(post => (
          <article key={post.id} className="post-card">
            <h3>{post.judul}</h3>
            <p className="penulis">Oleh: {post.penulis}</p>
            <p>{post.konten}</p>
          </article>
        ))
      )}
    </div>
  );
}

export default Home;
```

---

## Langkah 4 — Halaman Form Tambah Post

Buat `src/pages/TambahPost.jsx`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TambahPost() {
  const [form, setForm] = useState({ judul: "", konten: "", penulis: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Gagal menyimpan post");

      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h2>Tambah Artikel Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Judul:</label>
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Penulis:</label>
          <input
            type="text"
            name="penulis"
            value={form.penulis}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Konten:</label>
          <textarea
            name="konten"
            value={form.konten}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default TambahPost;
```

---

## Langkah 5 — Setup Router

Ganti `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TambahPost from "./pages/TambahPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<TambahPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
```

---

## Langkah 6 — Styling

Tambahkan di `src/index.css`:

```css
.navbar {
  background: #2563eb;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 { font-size: 1.2rem; }

.navbar .links a {
  color: white;
  text-decoration: none;
  margin-left: 16px;
}

.container {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 16px;
}

.post-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-card h3 { color: #2563eb; margin-bottom: 8px; }
.penulis { color: #888; font-size: 0.9rem; margin-bottom: 8px; }

.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 4px; font-weight: 500; }
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover { background: #1d4ed8; }
button:disabled { background: #93c5fd; cursor: not-allowed; }
```

---

## Alur Data

```
Frontend (React)          Backend (Express)
┌──────────────┐          ┌──────────────┐
│  useEffect   │──GET────▶│  GET /posts   │
│  useState    │◀─────────│  SQLite DB    │
│              │ JSON   │               │
│ Form submit │──POST───▶│  POST /posts  │
│ │◀─────────│ │
└──────────────┘          └──────────────┘
```

---

## Latihan Tambahan

1. Tambahkan halaman detail post: `/posts/:id`
2. Tambahkan fitur hapus post
3. Tambahkan loading spinner
4. Tangani error dengan menampilkan pesan yang ramah

---

**Lanjut ke:** [LEVEL-4 — Fullstack Integration](../../LEVEL-4-Fullstack-Integration/)

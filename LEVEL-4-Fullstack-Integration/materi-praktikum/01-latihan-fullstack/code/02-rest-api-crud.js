// ============================================================
// SOAL 02 — REST API CRUD Implementation
// ============================================================
// Install: npm install express cors dotenv
// Jalankan backend: node code/02-rest-api-crud.js
// Install frontend: npm create vite@latest client -- --template react
// Jalankan frontend: cd client && npm install && npm run dev
// ============================================================

// ============================================================
// BACKEND: Node.js + Express — Full CRUD Posts API
// ============================================================
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// In-memory database
let posts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Judul Post ${i + 1}`,
  content: `Ini adalah konten untuk post ke-${i + 1}. Menarik dan informatif untuk pembaca.`,
  author: `Author ${(i % 3) + 1}`,
  authorId: (i % 3) + 1,
  status: i % 5 === 0 ? 'draft' : 'published',
  tags: ['tech', 'life', 'tutorial'].slice(i % 3, (i % 3) + 1),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  likes: Math.floor(Math.random() * 50),
}));
let nextId = 21;

// ============================================================
// HELPERS
// ============================================================

// TODO(human): errorResponse(code, message, statusCode)
// ============================================================
// SOLUSI:
function errorResponse(code, message, statusCode = 400) {
  return { error: { code, message }, statusCode };
}
// ============================================================

// TODO(human): successResponse(data, message = null)
// ============================================================
// SOLUSI:
function successResponse(data, message = null) {
  return message ? { data, message } : { data };
}
// ============================================================

// ============================================================
// CRUD ENDPOINTS
// ============================================================

// TODO(human): GET /api/posts — list all posts (paginated)
// Query params: page (default 1), limit (default 10, max 50)
// Query params: status (optional: 'published' | 'draft')
// Return: { data: [...], meta: { page, limit, total, totalPages } }
// ============================================================
// SOLUSI:
// app.get('/api/posts', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = Math.min(parseInt(req.query.limit) || 10, 50);
//   const status = req.query.status;
//
//   let filtered = posts;
//   if (status) filtered = posts.filter(p => p.status === status);
//
//   const total = filtered.length;
//   const totalPages = Math.ceil(total / limit);
//   const start = (page - 1) * limit;
//   const data = filtered.slice(start, start + limit);
//
//   res.json({ data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 } });
// });
// ============================================================

// TODO(human): GET /api/posts/:id — single post detail
// Return 404 if not found
// Return: { data: post }
// ============================================================
// SOLUSI:
// app.get('/api/posts/:id', (req, res) => {
//   const post = posts.find(p => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).json(errorResponse('NOT_FOUND', 'Post tidak ditemukan', 404));
//   res.json(successResponse(post));
// });
// ============================================================

// TODO(human): POST /api/posts — create new post
// Body: { title (required, min 5), content (required, min 20), author (required), tags? }
// Status default: 'draft'
// Return 201 with created post
// ============================================================
// SOLUSI:
// app.post('/api/posts', (req, res) => {
//   const { title, content, author, tags } = req.body;
//   const errors = [];
//   if (!title || title.length < 5) errors.push({ field: 'title', message: 'Title minimal 5 karakter' });
//   if (!content || content.length < 20) errors.push({ field: 'content', message: 'Content minimal 20 karakter' });
//   if (!author) errors.push({ field: 'author', message: 'Author wajib diisi' });
//   if (errors.length > 0) return res.status(400).json(errorResponse('VALIDATION_ERROR', 'Validasi gagal', 400));
//
//   const newPost = { id: nextId++, title, content, author, authorId: 1, tags: tags || [], status: 'draft', createdAt: new Date().toISOString(), likes: 0 };
//   posts.unshift(newPost);
//   res.status(201).json(successResponse(newPost, 'Post berhasil dibuat'));
// });
// ============================================================

// TODO(human): PUT /api/posts/:id — update post (full replace)
// Body: { title?, content?, author?, status?, tags? }
// Return 404 if not found
// Return 200 with updated post
// ============================================================
// SOLUSI:
// app.put('/api/posts/:id', (req, res) => {
//   const idx = posts.findIndex(p => p.id === parseInt(req.params.id));
//   if (idx === -1) return res.status(404).json(errorResponse('NOT_FOUND', 'Post tidak ditemukan', 404));
//   const { title, content, author, status, tags } = req.body;
//   if (title !== undefined && title.length < 5) return res.status(400).json(errorResponse('VALIDATION_ERROR', 'Title minimal 5 karakter'));
//   if (content !== undefined && content.length < 20) return res.status(400).json(errorResponse('VALIDATION_ERROR', 'Content minimal 20 karakter'));
//   if (status && !['draft', 'published'].includes(status)) return res.status(400).json(errorResponse('VALIDATION_ERROR', 'Status harus draft atau published'));
//
//   posts[idx] = { ...posts[idx], ...(title && { title }), ...(content && { content }), ...(author && { author }), ...(status && { status }), ...(tags && { tags }), updatedAt: new Date().toISOString() };
//   res.json(successResponse(posts[idx]));
// });
// ============================================================

// TODO(human): PATCH /api/posts/:id — partial update
// Body: { status } (only allow updating status in this version)
// Return 404 if not found
// Return 200 with updated post
// ============================================================
// SOLUSI:
// app.patch('/api/posts/:id', (req, res) => {
//   const idx = posts.findIndex(p => p.id === parseInt(req.params.id));
//   if (idx === -1) return res.status(404).json(errorResponse('NOT_FOUND', 'Post tidak ditemukan', 404));
//   const { status } = req.body;
//   if (!status || !['draft', 'published'].includes(status)) return res.status(400).json(errorResponse('VALIDATION_ERROR', 'Status harus draft atau published'));
//   posts[idx] = { ...posts[idx], status, updatedAt: new Date().toISOString() };
//   res.json(successResponse(posts[idx]));
// });
// ============================================================

// TODO(human): DELETE /api/posts/:id — delete post
// Return 404 if not found
// Return 200 with { message: 'Post berhasil dihapus' }
// ============================================================
// SOLUSI:
// app.delete('/api/posts/:id', (req, res) => {
//   const idx = posts.findIndex(p => p.id === parseInt(req.params.id));
//   if (idx === -1) return res.status(404).json(errorResponse('NOT_FOUND', 'Post tidak ditemukan', 404));
//   posts.splice(idx, 1);
//   res.json({ message: 'Post berhasil dihapus' });
// });
// ============================================================

// TODO(human): GET /api/posts/search — search posts
// Query: ?q=keyword (search in title)
// Query: ?status=published|draft
// Return: { data: [...], meta: { query, total } }
// ============================================================
// SOLUSI:
// app.get('/api/posts/search', (req, res) => {
//   const q = (req.query.q || '').toLowerCase();
//   const status = req.query.status;
//   let results = posts;
//   if (q) results = results.filter(p => p.title.toLowerCase().includes(q));
//   if (status) results = results.filter(p => p.status === status);
//   res.json({ data: results, meta: { query: { q, status }, total: results.length } });
// });
// ============================================================

app.get('/api/health', (req, res) => res.json({ status: 'ok', totalPosts: posts.length }));

app.listen(PORT, () => {
  console.log(`CRUD API server running at http://localhost:${PORT}`);
  console.log('Endpoints: GET|POST /api/posts, GET|PUT|PATCH|DELETE /api/posts/:id');
  console.log('Query params: ?page=1&limit=10&status=published&q=keyword');
});


// ============================================================
// FRONTEND: React — CRUD Posts UI
// ============================================================

// TODO(human): src/api/postsClient.js — axios client
// ============================================================
// SOLUSI:
// import axios from 'axios';
//
// const http = axios.create({ baseURL: 'http://localhost:3001/api', timeout: 5000 });
//
// http.interceptors.response.use(res => res, err => {
//   const msg = err.response?.data?.error?.message || err.response?.data?.error || err.message;
//   return Promise.reject(new Error(msg));
// });
//
// export const postsClient = {
//   getAll: (params) => http.get('/posts', { params }),
//   getOne: (id) => http.get(`/posts/${id}`),
//   create: (data) => http.post('/posts', data),
//   update: (id, data) => http.put(`/posts/${id}`, data),
//   patchStatus: (id, status) => http.patch(`/posts/${id}`, { status }),
//   delete: (id) => http.delete(`/posts/${id}`),
//   search: (q, status) => http.get('/posts/search', { params: { q, status } }),
// };
// ============================================================

// TODO(human): src/pages/PostsPage.jsx — list posts dengan pagination
// ============================================================
// SOLUSI:
// import { useState, useEffect } from 'react';
// import { postsClient } from '../api/postsClient';
//
// export function PostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//
//   useEffect(() => { fetchPosts(1); }, []);
//
//   async function fetchPosts(page) {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await postsClient.getAll({ page, limit: 6 });
//       setPosts(res.data.data);
//       setMeta(res.data.meta);
//     } catch (e) { setError(e.message); }
//     finally { setLoading(false); }
//   }
//
//   async function handleDelete(id) {
//     if (!confirm('Yakin hapus?')) return;
//     try {
//       await postsClient.delete(id);
//       setPosts(posts.filter(p => p.id !== id));
//     } catch (e) { alert(e.message); }
//   }
//
//   return (
//     <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
//       <h1>Blog Posts ({meta.total})</h1>
//       {error && <div style={{ color: 'red', padding: '0.5rem', background: '#fee', borderRadius: 4 }}>{error}</div>}
//       {loading ? <div>Loading...</div> : posts.map(post => (
//         <div key={post.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '0.75rem', borderRadius: 6 }}>
//           <h2>{post.title}</h2>
//           <p>{post.content.substring(0, 80)}...</p>
//           <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <span>By {post.author}</span>
//             <span style={{ background: post.status === 'published' ? '#d4edda' : '#fff3cd', padding: '2px 8px', borderRadius: 4, fontSize: '0.8rem' }}>{post.status}</span>
//             <span>{post.likes} likes</span>
//             <button onClick={() => handleDelete(post.id)} style={{ marginLeft: 'auto', color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer' }}>Hapus</button>
//           </div>
//         </div>
//       ))}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
//         {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(p => (
//           <button key={p} onClick={() => fetchPosts(p)} style={{ padding: '0.25rem 0.75rem', border: '1px solid #ccc', borderRadius: 4 }}>{p}</button>
//         ))}
//       </div>
//     </div>
//   );
// }
// ============================================================

// TODO(human): src/pages/CreatePostPage.jsx — form create post
// ============================================================
// SOLUSI:
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { postsClient } from '../api/postsClient';
//
// export function CreatePostPage() {
//   const [form, setForm] = useState({ title: '', content: '', author: '' });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//
//   function validate() {
//     const e = {};
//     if (!form.title || form.title.length < 5) e.title = 'Title minimal 5 karakter';
//     if (!form.content || form.content.length < 20) e.content = 'Content minimal 20 karakter';
//     if (!form.author) e.author = 'Author wajib diisi';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }
//
//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       await postsClient.create(form);
//       navigate('/posts');
//     } catch (err) { alert(err.message); }
//     finally { setLoading(false); }
//   }
//
//   return (
//     <div style={{ maxWidth: 600, margin: '1rem auto', padding: '1rem' }}>
//       <h2>Buat Post Baru</h2>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//         <div>
//           <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Judul (min 5 karakter)" style={{ width: '100%', padding: '0.5rem' }} />
//           {errors.title && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.title}</span>}
//         </div>
//         <div>
//           <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Konten (min 20 karakter)" rows={5} style={{ width: '100%', padding: '0.5rem' }} />
//           {errors.content && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.content}</span>}
//         </div>
//         <div>
//           <input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Nama Author" style={{ width: '100%', padding: '0.5rem' }} />
//           {errors.author && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.author}</span>}
//         </div>
//         <button type="submit" disabled={loading} style={{ padding: '0.75rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
//           {loading ? 'Membuat...' : 'Buat Post'}
//         </button>
//       </form>
//     </div>
//   );
// }
// ============================================================
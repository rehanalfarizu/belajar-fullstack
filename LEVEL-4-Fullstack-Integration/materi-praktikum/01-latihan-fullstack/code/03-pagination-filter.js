// ============================================================
// SOAL 03 — Pagination& Filtering
// ============================================================
// Install: npm install express cors dotenv
// Jalankan backend: node code/03-pagination-filter.js
// Install frontend: npm create vite@latest client -- --template react
// Jalankan frontend: cd client && npm install && npm run dev
// ============================================================

// ============================================================
// BACKEND: Node.js + Express — Pagination & Filter
// ============================================================
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// In-memory data: 50 articles
const articles = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Artikel ${i + 1}: ${['React Patterns', 'Express Middleware', 'Database Design', 'API Security', 'State Management'][i % 5]}`,
  content: `Konten lengkap untuk artikel ke-${i + 1}. Ini adalah artikel yang membahas topik penting dalam pengembangan web modern.`,
  author: `Author ${(i % 4) + 1}`,
  authorId: (i % 4) + 1,
  category: ['tech', 'life', 'business', 'science'][i % 4],
  status: i % 6 === 0 ? 'draft' : 'published',
  views: Math.floor(Math.random() * 5000),
  likes: Math.floor(Math.random() * 200),
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  tags: [['react', 'js'], ['node', 'express'], ['db', 'sql'], ['api', 'rest'], ['state', 'redux']][i % 5],
}));

// ============================================================
// PAGINATION HELPER
// ============================================================

// TODO(human): getPagination(page, limit, totalItems)
// Return: { page, limit, totalItems, totalPages, hasNextPage, hasPrevPage }
// ============================================================
// SOLUSI:
function getPagination(page, limit, totalItems) {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
// ============================================================

// ============================================================
// GET /api/articles — Paginated + Filtered list
// ============================================================

// TODO(human): Implement pagination & filtering
// Query params:
//   - page (default 1)
//   - limit (default 10, max 100)
//   - status ('published' | 'draft')
//   - category (exact match)
//   - authorId (exact match)
//   - q (search in title, case-insensitive)
//   - sortBy ('createdAt' | 'views' | 'likes', default: 'createdAt')
//   - order ('asc' | 'desc', default: 'desc')
// Return: { data: [...], meta: { pagination: {...}, filters: {...} } }
// ============================================================
// SOLUSI:
// app.get('/api/articles', (req, res) => {
//   let results = [...articles];
//
//   // Filters
//   if (req.query.status) results = results.filter(a => a.status === req.query.status);
//   if (req.query.category) results = results.filter(a => a.category === req.query.category);
//   if (req.query.authorId) results = results.filter(a => a.authorId === parseInt(req.query.authorId));
//   if (req.query.q) {
//     const q = req.query.q.toLowerCase();
//     results = results.filter(a => a.title.toLowerCase().includes(q));
//   }
//
//   // Sort
//   const sortBy = req.query.sortBy || 'createdAt';
//   const order = req.query.order || 'desc';
//   results.sort((a, b) => {
//     if (order === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1;
//     return a[sortBy] < b[sortBy] ? 1 : -1;
//   });
//
//   // Pagination
//   const page = parseInt(req.query.page) || 1;
//   const limit = Math.min(parseInt(req.query.limit) || 10, 100);
//   const totalItems = results.length;
//   const pagination = getPagination(page, limit, totalItems);
//   const start = (page - 1) * limit;
//   const data = results.slice(start, start + limit);
//
//   res.json({ data, meta: { pagination, filters: { status: req.query.status, category: req.query.category, authorId: req.query.authorId, q: req.query.q, sortBy, order } } });
// });
// ============================================================

// TODO(human): GET /api/articles/:id — single article
// Return 404 if not found
// Include related articles by same author
// ============================================================
// SOLUSI:
// app.get('/api/articles/:id', (req, res) => {
//   const article = articles.find(a => a.id === parseInt(req.params.id));
//   if (!article) return res.status(404).json({ error: 'Artikel tidak ditemukan' });
//   const related = articles.filter(a => a.authorId === article.authorId && a.id !== article.id).slice(0, 3);
//   res.json({ data: { ...article, related } });
// });
// ============================================================

// TODO(human): GET /api/articles/stats — aggregate statistics
// Return: { total, published, draft, byCategory: {...}, byAuthor: {...} }
// ============================================================
// SOLUSI:
// app.get('/api/articles/stats', (req, res) => {
//   const byCategory = {};
//   const byAuthor = {};
//   articles.forEach(a => {
//     byCategory[a.category] = (byCategory[a.category] || 0) + 1;
//     byAuthor[a.author] = (byAuthor[a.author] || 0) + 1;
//   });
//   res.json({
//     total: articles.length,
//     published: articles.filter(a => a.status === 'published').length,
//     draft: articles.filter(a => a.status === 'draft').length,
//     byCategory,
//     byAuthor,
//   });
// });
// ============================================================

app.get('/api/health', (req, res) => res.json({ status: 'ok', total: articles.length }));

app.listen(PORT, () => {
  console.log(`Pagination server running at http://localhost:${PORT}`);
  console.log('Try: GET /api/articles?page=1&limit=10&status=published&category=tech&q=react&sortBy=views&order=desc');
});


// ============================================================
// FRONTEND: React — Pagination & Filter UI
// ============================================================

// TODO(human): src/api/articlesClient.js
// ============================================================
// SOLUSI:
// import axios from 'axios';
// export const articlesAPI = axios.create({ baseURL: 'http://localhost:3001/api', timeout: 5000 });
// ============================================================

// TODO(human): src/pages/ArticlesPage.jsx — article list dengan filter
// Features: search bar, status filter, category filter, pagination
// ============================================================
// SOLUSI:
// import { useState, useEffect } from 'react';
// import { articlesAPI } from '../api/articlesClient';
//
// export function ArticlesPage() {
//   const [articles, setArticles] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [filters, setFilters] = useState({ status: '', category: '', q: '' });
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => { fetchArticles(); }, [page, filters]);
//
//   async function fetchArticles() {
//     setLoading(true);
//     try {
//       const params = { page, limit: 10 };
//       if (filters.status) params.status = filters.status;
//       if (filters.category) params.category = filters.category;
//       if (filters.q) params.q = filters.q;
//       const res = await articlesAPI.get('/articles', { params });
//       setArticles(res.data.data);
//       setPagination(res.data.meta.pagination);
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   }
//
//   return (
//     <div style={{ maxWidth: 900, margin: '0 auto', padding: '1rem' }}>
//       <h1>Articles</h1>
//       {/* Filter Bar */}
//       <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//         <input type="text" placeholder="Cari judul..." value={filters.q} onChange={e => setFilters({ ...filters, q: e.target.value })} style={{ padding: '0.5rem', flex: 1 }} />
//         <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })} style={{ padding: '0.5rem' }}>
//           <option value="">Semua Status</option>
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>
//         <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })} style={{ padding: '0.5rem' }}>
//           <option value="">Semua Kategori</option>
//           <option value="tech">Tech</option>
//           <option value="life">Life</option>
//           <option value="business">Business</option>
//           <option value="science">Science</option>
//         </select>
// <button onClick={() => { setPage(1); fetchArticles(); }} style={{ padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}>Filter</button>
//       </div>
//
//       {loading ? <div>Loading...</div> : (
//         <>
//           <div style={{ display: 'grid', gap: '0.75rem' }}>
//             {articles.map(a => (
//               <div key={a.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: 6 }}>
//                 <h2>{a.title}</h2>
//                 <p style={{ color: '#666', fontSize: '0.9rem' }}>{a.content.substring(0, 80)}...</p>
//                 <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
//                   <span>{a.author}</span>
//                   <span>•</span>
//                   <span>{a.category}</span>
//                   <span>•</span>
//                   <span>{a.views} views</span>
//                   <span>•</span>
//                   <span style={{ background: a.status === 'published' ? '#d4edda' : '#fff3cd', padding: '2px 6px', borderRadius: 3 }}>{a.status}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//
//           {/* Pagination Controls */}
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', alignItems: 'center' }}>
//             <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={!pagination.hasPrevPage} style={{ padding: '0.5rem 1rem' }}>Prev</button>
//             <span>Halaman {pagination.page} dari {pagination.totalPages} ({pagination.totalItems} artikel)</span>
//             <button onClick={() => setPage(p => p + 1)} disabled={!pagination.hasNextPage} style={{ padding: '0.5rem 1rem' }}>Next</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
// ============================================================

// TODO(human): src/pages/ArticleDetail.jsx — single article with related
// ============================================================
// SOLUSI:
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { articlesAPI } from '../api/articlesClient';
//
// export function ArticleDetail() {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     articlesAPI.get(`/articles/${id}`).then(res => setArticle(res.data.data)).catch(() => setArticle(null)).finally(() => setLoading(false));
//   }, [id]);
//
//   if (loading) return <div>Loading...</div>;
//   if (!article) return <div>Artikel tidak ditemukan</div>;
//
//   return (
//     <div style={{ maxWidth: 800, margin: '1rem auto', padding: '1rem' }}>
//       <h1>{article.title}</h1>
//       <div style={{ color: '#666', marginBottom: '1rem' }}>
//         <span>By {article.author}</span> • <span>{article.category}</span> • <span>{article.views} views</span>
//       </div>
//       <p style={{ lineHeight: 1.7 }}>{article.content}</p>
//       {article.related?.length > 0 && (
//         <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f8f8', borderRadius: 8 }}>
//           <h3>Artikel Terkait</h3>
//           {article.related.map(r => <div key={r.id} style={{ marginTop: '0.5rem' }}>• {r.title}</div>)}
//         </div>
//       )}
//     </div>
//   );
// }
// ============================================================

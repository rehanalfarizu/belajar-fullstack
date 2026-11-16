// ============================================================
// 02 — API DESIGN BEST PRACTICES
// Express server with consistent error format, versioning, pagination
// ============================================================
// Install: npm install express cors dotenv
// Run: node code/02-api-design.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory posts data
const posts = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Post Title ${i + 1}`,
  content: `Content for post ${i + 1}. This is sample content for demonstration.`,
  author: `Author ${(i % 3) + 1}`,
  authorId: (i % 3) + 1,
  status: i % 5 === 0 ? 'draft' : 'published',
  tags: ['tech', 'news', 'tutorial'].slice((i % 3), (i % 3) + 1),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

// ============================================================
// PART 1: STANDARDIZED ERROR RESPONSE FORMAT
// ============================================================

// TODO 1: Error response helper function
// Should return: { error: { code: string, message: string, details?: any } }
// Usage: res.status(400).json(errorResponse('VALIDATION_ERROR', 'Email tidak valid'))
function errorResponse(code, message, details = null) {
  // TODO: return standardized error object
}

// TODO 2: Success response helper function
// Should return: { data: any, meta?: { pagination?, timestamp? } }
// Usage: res.status(200).json(successResponse(posts))
function successResponse(data, meta = null) {
  // TODO: return standardized success object with timestamp in meta
}

// TODO 3: Created response helper
// Should return: { data: any, message: string }
// Usage: res.status(201).json(createdResponse(newPost))
function createdResponse(data, message = 'Resource created successfully') {
  // TODO: return object with data and message
}

// ============================================================
// PART 2: PAGINATION IMPLEMENTATION
// ============================================================

// TODO 4: Pagination helper
// Input: page (default 1), limit (default 10), totalItems
// Output: { page, limit, totalItems, totalPages, hasNextPage, hasPrevPage }
function getPagination(page, limit, totalItems) {
  // TODO: calculate totalPages (Math.ceil)
  // TODO: calculate hasNextPage (page < totalPages)
  // TODO: calculate hasPrevPage (page > 1)
  // TODO: return pagination object
}

// ============================================================
// PART 3: VERSIONED ROUTES (v1)
// ============================================================

const BASE_URL = '/api/v1';

// TODO 5: GET /api/v1/posts — list all posts with pagination
app.get(`${BASE_URL}/posts`, (req, res) => {
  // TODO: parse query params: page (default 1), limit (default 10, max 100)
  // TODO: slice posts array: start = (page-1)*limit, end = start+limit
  // TODO: use getPagination to get pagination meta
  // TODO: return: { data: [...], meta: { pagination: {...} } }
});

// TODO 6: GET /api/v1/posts/:id — get single post
app.get(`${BASE_URL}/posts/:id`, (req, res) => {
  // TODO: parse id, find post
  // TODO: if not found → 404 with errorResponse
  // TODO: return successResponse with post data
});

// TODO 7: POST /api/v1/posts — create post
app.post(`${BASE_URL}/posts`, (req, res) => {
  // TODO: validate body: title (required, min 3 chars), content (required, min 10 chars), author (required), tags (optional, array)
  // TODO: validate using your own logic (not Zod — vanilla JS)
  // TODO: if validation fails → 400 with errorResponse including details
  // TODO: create post with: id (auto-increment from length), status: 'draft', createdAt/updatedAt: now
  // TODO: push to posts array
  // TODO: return 201 with createdResponse
});

// TODO 8: PUT /api/v1/posts/:id — update post
app.put(`${BASE_URL}/posts/:id`, (req, res) => {
  // TODO: find post by id
  // TODO: if not found → 404
  // TODO: validate: title (optional, min 3 if provided), content (optional, min 10 if provided), status (optional, must be 'draft' or 'published')
  // TODO: update fields (only provided fields)
  // TODO: update updatedAt
  // TODO: return successResponse with updated post
});

// TODO 9: DELETE /api/v1/posts/:id — delete post
app.delete(`${BASE_URL}/posts/:id`, (req, res) => {
  // TODO: find index by id
  // TODO: if not found → 404
  // TODO: splice from array
  // TODO: return successResponse with { message: 'Post deleted' }
});

// ============================================================
// PART 4: SEARCH & FILTER
// ============================================================

// TODO 10: GET /api/v1/posts/search?q=keyword&status=draft
// - Filter by search query in title (case-insensitive contains)
// - Filter by status if provided
// - Use pagination
// Return: { data: [...], meta: { pagination: {...}, query: {...} } }
app.get(`${BASE_URL}/posts/search`, (req, res) => {
  // TODO: parse q (search query) and status from query params
  // TODO: filter posts array based on:
  //   - title includes q (if q provided)
  //   - status matches (if status provided)
  // TODO: return filtered + paginated results
});

// ============================================================
// PART 5: VERSIONING NOTES
// When to create v2?
// - Breaking changes (change response structure, remove fields, change behavior)
// - Never change v1 endpoints (maintain backward compatibility)
// - v2 should be a separate route group

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => {
  res.json(successResponse({ version: 'v1', status: 'ok' }));
});

// START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Design server running at http://localhost:${PORT}`);
  console.log(`Base URL: ${BASE_URL}`);
});
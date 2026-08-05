// ============================================================
// 01 — REST PRINCIPLES
// Express server demonstrating correct vs incorrect REST API design
// ============================================================
// Install: npm install express cors dotenv
// Run: node code/01-rest-principles.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'user' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
];

const posts = [
  { id: 1, title: 'First Post', content: 'Hello world', authorId: 1 },
  { id: 2, title: 'Second Post', content: 'Express is great', authorId: 2 },
];

// ============================================================
// SECTION A: VIOLATIONS — These endpoints break REST principles
// Identify which ones are wrong and why before reading Section B
// ============================================================

// ❌ VIOLATION 1: Verb in URL + wrong HTTP method
// app.get('/api/getAllUsers', (req, res) => {
//   res.json(users);
// });

// ❌ VIOLATION 2: Verb in URL + wrong HTTP method
// app.post('/api/createUser', (req, res) => { ... });

// ❌ VIOLATION 3: Correct resource but wrong method
// app.get('/api/deleteUser/1', (req, res) => { ... });

// ❌ VIOLATION 4: Verb in URL
// app.put('/api/updateUser/1', (req, res) => { ... });

// ============================================================
// SECTION B: CORRECT REST IMPLEMENTATIONS
// TODO 1: GET /api/users — list all users (paginated)
app.get('/api/users', (req, res) => {
  // TODO: parse ?page= and ?limit= query params (default: page=1, limit=10)
  // TODO: slice the users array for pagination
  // TODO: return { data: [...], pagination: { page, limit, total, totalPages } }
});

// TODO 2: GET /api/users/:id — get single user by ID
app.get('/api/users/:id', (req, res) => {
  // TODO: parse id from req.params
  // TODO: find user by id
  // TODO: if not found, return 404 with { error: "User tidak ditemukan" }
  // TODO: if found, return { data: user }
});

// TODO 3: POST /api/users — create new user
app.post('/api/users', (req, res) => {
  // TODO: validate: name (required), email (required + format), role (optional)
  // TODO: check if email already exists → 409 Conflict
  // TODO: create user object with id (Date.now())
  // TODO: push to users array
  // TODO: return 201 with created user (without password if any)
});

// TODO 4: PUT /api/users/:id — replace/update user
app.put('/api/users/:id', (req, res) => {
  // TODO: parse id from req.params
  // TODO: find user index
  // TODO: if not found → 404
  // TODO: validate body (at least one of: name, email, role)
  // TODO: if email changed, check uniqueness
  // TODO: update user (preserve id)
  // TODO: return 200 with updated user
});

// TODO 5: DELETE /api/users/:id — delete user
app.delete('/api/users/:id', (req, res) => {
  // TODO: parse id from req.params
  // TODO: find user index
  // TODO: if not found → 404
  // TODO: splice from array
  // TODO: return 200 with { message: "User berhasil dihapus" }
});

// ============================================================
// BONUS: Nested resources
// TODO 6: GET /api/users/:id/posts — get all posts by a specific user
// Route: GET /api/users/:userId/posts
// Response: { data: [posts...] } filtered by authorId matching userId
// If user not found → 404

// TODO 7: GET /api/posts/:id — get single post with author info
// Response: { data: { ...post, author: { id, name, email } } }
// If post not found → 404

// ============================================================
// SECTION C: HTTP Status Codes Practice
// TODO 8: For each endpoint above, verify you're using the right codes:
//   200 OK          — successful GET, PUT, DELETE
//   201 Created     — successful POST
//   400 Bad Request  — validation failure
//   404 Not Found   — resource doesn't exist
//   409 Conflict    — email already exists
//   500 Internal Server Error — unexpected errors

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================
// START SERVER
// ============================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`REST Principles server running at http://localhost:${PORT}`);
  console.log(`Test endpoints:`);
  console.log(`  GET    /api/users          → list users`);
  console.log(`  GET    /api/users/:id      → single user`);
  console.log(`  POST   /api/users          → create user`);
  console.log(`  PUT    /api/users/:id      → update user`);
  console.log(`  DELETE /api/users/:id      → delete user`);
});
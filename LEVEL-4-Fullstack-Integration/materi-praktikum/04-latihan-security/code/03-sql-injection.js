// ============================================================
// 03 — SQL INJECTION PREVENTION
// Parameterized queries, LIKE escaping, ORDER BY allowlisting
// ============================================================
// Install: npm install pg
// This file demonstrates safe vs vulnerable query patterns

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/testdb',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ============================================================
// PART 1: VULNERABLE CODE (FOR LEARNING — DO NOT USE)
// ============================================================

// ❌ VULNERABLE — NEVER do this!
const vulnerableExamples = {
  // String concatenation in query — SQL INJECTION RISK
  searchByName: (name) => `
    SELECT * FROM users WHERE name = '${name}'
  `,
  // ID from params — also vulnerable
  getUserById: (id) => `
    SELECT * FROM users WHERE id = ${id}
  `,
  // Login query
  loginQuery: (email, password) => `
    SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}'
  `,
};

// Exploit payloads for the above (what an attacker would input):
const exploitPayloads = {
  // For name field: "'; DROP TABLE users; --"
  // Result: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
  //
  // For id field: "1 OR 1=1"
  // Result: SELECT * FROM users WHERE id = 1 OR 1=1
  //
  // For email: "admin@email.com' --"
  // Result: SELECT * FROM users WHERE email = 'admin@email.com' --' AND ...
};

// ============================================================
// PART 2: SAFE IMPLEMENTATION — Parameterized Queries
// ============================================================

// TODO 1: Safe SELECT with parameterized query
async function getUserByEmail(email) {
  // TODO: const query = 'SELECT * FROM users WHERE email = $1'
  // TODO: const result = await pool.query(query, [email])
  // TODO: return result.rows[0] || null
}

// TODO 2: Safe SELECT with multiple params
async function getUserById(id) {
  // TODO: Type coerce: const userId = parseInt(id, 10)
  // TODO: If NaN: throw new Error('Invalid ID')
  // TODO: Parameterized: pool.query('SELECT * FROM users WHERE id = $1', [userId])
}

// TODO 3: Safe INSERT
async function createUser(name, email, passwordHash) {
  // TODO: Parameterized: INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)
  // TODO: Return created user (without password)
}

// TODO 4: Safe UPDATE
async function updateUserBio(userId, bio) {
  // TODO: UPDATE users SET bio = $1, updated_at = NOW() WHERE id = $2
  // TODO: Return updated user
}

// TODO 5: Safe DELETE
async function deleteUser(userId) {
  // TODO: DELETE FROM users WHERE id = $1
  // TODO: Return success
}

// ============================================================
// PART 3: LIKE CLAUSE — Escaping wildcards
// ============================================================

// TODO 6: Escape LIKE special characters (%, _, \)
// These have special meaning in LIKE and must be escaped
function escapeLikePattern(input) {
  if (typeof input !== 'string') return '';
  // TODO: Replace % → \pct (but actually just escape the backslash)
  // Better approach: escape \ first, then escape % and _
  // Return the escaped string
  return input
    .replace(/\\/g, '\\\\')   // Escape backslashes first
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_');
}

// TODO 7: Safe LIKE search
async function searchPostsByTitle(keyword) {
  // TODO: Escape keyword with escapeLikePattern()
  // TODO: Append % for partial match: escaped + '%'
  // TODO: Query: SELECT * FROM posts WHERE title LIKE $1 (using $1, not $2!)
  // TODO: Note: The % goes in the PARAMETER VALUE, not the query string
}

// ============================================================
// PART 4: ORDER BY — Allowlist approach
// ============================================================

// Allowed columns for ORDER BY (never accept raw user input!)
const ALLOWED_ORDER_COLUMNS = ['id', 'created_at', 'updated_at', 'title', 'name', 'email'];
const ALLOWED_ORDER_DIR = ['ASC', 'DESC'];

// TODO 8: Safe ORDER BY with allowlist
function getSafeOrderBy(userColumn, userDirection) {
  // TODO: Check if userColumn is in ALLOWED_ORDER_COLUMNS
  // TODO: Check if userDirection is in ALLOWED_ORDER_DIR
  // TODO: Default to: 'id ASC' if invalid
  // TODO: Return: { column: safe, direction: safe }
}

// TODO 9: Paginated query with ORDER BY
async function getPostsPaginated(page = 1, limit = 10, sortBy = 'id', sortDir = 'DESC') {
  const { column, direction } = getSafeOrderBy(sortBy, sortDir);
  const offset = (page - 1) * limit;
  // TODO: Query with ORDER BY using safe column/direction
  // TODO: Count total for pagination
}

// ============================================================
// PART 5: INPUT VALIDATION & TYPE COERCION
// ============================================================

// TODO 10: Safe ID parser
function parseId(id) {
  // TODO: parseInt(id, 10)
  // TODO: If NaN or <= 0: throw new Error('Invalid ID format')
  // TODO: Return safe integer
}

// TODO 11: Strip SQL comments (defense-in-depth — NOT primary defense)
function stripSQLComments(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/--/g, '')   // Single-line comment
    .replace(/\/\*/g, '') // Block comment start
    .replace(/\*\//g, ''); // Block comment end
}

// ============================================================
// PART 6: ERROR HANDLING — Don't expose SQL details
// ============================================================

// TODO 12: Database error handler
function handleDatabaseError(err, res) {
  // TODO: Log full error server-side: console.error('[DB ERROR]', err)
  // TODO: Return generic message to client: 'Terjadi kesalahan sistem'
  // TODO: NEVER return: err.message, err.stack, SQL syntax, table names
  // TODO: Optionally: return error code for internal tracking (not exposed to client)
}

// ============================================================
// PART 7: SECURITY CHECKLIST
// ============================================================
const securityChecklist = {
  mandatory: [
    'All queries use parameterized statements ($1, $2)',
    'Numeric IDs are type-coerced (parseInt) and validated',
    'ORDER BY columns are allowlisted, never from user input',
    'LIKE wildcards are escaped before use',
    'Error messages do not expose SQL details',
  ],
  recommended: [
    'Database user has least privilege (not postgres/root)',
    'ORM used with parameterized queries (not raw when possible)',
    'Query logging for anomaly detection',
    'WAF in front of application',
  ],
};

// ============================================================
// WORKING IMPLEMENTATIONS (uncomment to use)
// ============================================================

async function workingGetUserByEmail(email) {
  const result = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

function workingEscapeLikePattern(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
}

async function workingSearchPosts(keyword) {
  const escaped = workingEscapeLikePattern(keyword);
  const result = await pool.query(
    'SELECT * FROM posts WHERE title ILIKE $1 LIMIT 20',
    [`%${escaped}%`]
  );
  return result.rows;
}

function workingGetSafeOrderBy(userColumn, userDirection) {
  const col = ALLOWED_ORDER_COLUMNS.includes(userColumn) ? userColumn : 'id';
  const dir = ALLOWED_ORDER_DIR.includes(userDirection?.toUpperCase()) ? userDirection.toUpperCase() : 'DESC';
  return { column: col, direction: dir };
}

function workingParseId(id) {
  const parsed = parseInt(id, 10);
  if (isNaN(parsed) || parsed <= 0) {
    throw Object.assign(new Error('Invalid ID format'), { status: 400 });
  }
  return parsed;
}

function workingHandleDbError(err, res) {
  console.error('[DB ERROR]', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan sistem' });
}

// ============================================================
// DEMONSTRATION
// ============================================================
async function demo() {
  console.log('SQL Injection Prevention Module');
  console.log('---');
  console.log('Vulnerable patterns (NEVER use):');
  console.log(Object.keys(vulnerableExamples).join(', '));
  console.log('---');
  console.log('Safe patterns: parameterized queries');
  console.log('LIKE escape:', workingEscapeLikePattern('100%_test'));
  console.log('Safe ORDER BY:', workingGetSafeOrderBy('title', 'ASC'));
  console.log('Safe ORDER BY (invalid):', workingGetSafeOrderBy('DROP TABLE', 'hax'));
  console.log('Parse ID:', workingParseId('42'));
}

if (require.main === module) {
  demo().catch(console.error);
}

module.exports = {
  getUserByEmail: workingGetUserByEmail,
  searchPostsByTitle: workingSearchPosts,
  getSafeOrderBy: workingGetSafeOrderBy,
  parseId: workingParseId,
  escapeLikePattern: workingEscapeLikePattern,
  handleDatabaseError: workingHandleDbError,
  securityChecklist,
};
// ============================================================
// 01 — ZOD VALIDATION
// Input validation middleware for Express using Zod
// ============================================================
// Install: npm install zod
// Usage: import { z } from 'zod'; then create schemas below

const { z } = require('zod');

// ============================================================
// TODO 1: User Registration Schema
// ============================================================
const userRegistrationSchema = z.object({
  // TODO: email — must be valid email format
  // TODO: password — min 8 chars, must have uppercase AND number (regex)
  // TODO: name — min 2 chars, max 100 chars, trimmed
});

// ============================================================
// TODO 2: User Login Schema
// ============================================================
const userLoginSchema = z.object({
  // TODO: email — valid email format
  // TODO: password — min 1 char (any non-empty)
});

// ============================================================
// TODO 3: Post Creation Schema
// ============================================================
const postSchema = z.object({
  // TODO: title — min 3 chars, max 255 chars
  // TODO: content — min 10 chars (or allow empty string?)
  // TODO: tags — optional array of strings, each max 50 chars, max 10 tags
  // TODO: status — optional, enum: 'draft' | 'published', default: 'draft'
});

// ============================================================
// TODO 4: Order Schema (nested objects)
// ============================================================
const orderSchema = z.object({
  // TODO: productId — positive integer
  // TODO: quantity — integer between 1 and 99
  // TODO: shippingAddress — object:
  //   - street: min 5 chars
  //   - city: min 2 chars
  //   - postalCode: regex matching 5 digits (e.g., "12345")
});

// ============================================================
// TODO 5: Validation helper function
// ============================================================
function validate(schema, data) {
  // TODO: try schema.safeParse(data)
  // TODO: if success: return { success: true, data: result.data }
  // TODO: if fail: return { success: false, errors: result.error.flatten().fieldErrors }
}

// ============================================================
// TODO 6: Validation middleware factory
// ============================================================
// function validateBody(schema) {
//   return (req, res, next) => {
//     // TODO: validate(req.body) using the helper above
//     // TODO: if !success: return res.status(400).json({ errors })
//     // TODO: if success: req.validatedBody = data, next()
//   };
// }

// ============================================================
// TODO 7: Query param validation (for pagination, etc.)
// ============================================================
function validatePaginationParams(query) {
  // TODO: parse page (default 1, min 1)
  // TODO: parse limit (default 10, min 1, max 100)
  // TODO: return { page, limit } as numbers
}

// ============================================================
// TODO 8: Sanitization — clean input before validation
// ============================================================
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .trim()           // Remove leading/trailing whitespace
    .replace(/\0/g, '') // Remove null bytes
    .slice(0, 10000);  // Max length: 10k chars
}

// ============================================================
// WORKING IMPLEMENTATION (uncomment to use)
// ============================================================

// User registration schema (working)
const workingUserSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
    .regex(/[0-9]/, 'Password harus mengandung angka'),
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100).trim(),
});

// Post schema (working)
const workingPostSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter').max(255),
  content: z.string().min(10, 'Konten minimal 10 karakter'),
  tags: z.array(z.string().max(50)).max(10).optional().default([]),
  status: z.enum(['draft', 'published']).default('draft'),
});

// Order schema (working)
const workingOrderSchema = z.object({
  productId: z.number().int().positive('Product ID harus bilangan bulat positif'),
  quantity: z.number().int().min(1).max(99, 'Quantity maksimal 99'),
  shippingAddress: z.object({
    street: z.string().min(5, 'Alamat minimal 5 karakter'),
    city: z.string().min(2, 'Kota minimal 2 karakter'),
    postalCode: z.string().regex(/^\d{5}$/, 'Kode pos harus 5 digit'),
  }),
});

// Validation function (working)
function workingValidate(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
  };
}

// Validation middleware (working)
function workingValidateBody(schema) {
  return (req, res, next) => {
    const result = workingValidate(schema, req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.errors });
    }
    req.validatedBody = result.data;
    next();
  };
}

// Pagination (working)
function workingValidatePagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10) || 10));
  return { page, limit };
}

// ============================================================
// USAGE IN EXPRESS
// ============================================================
/*
const express = require('express');
const app = express();
app.use(express.json());

// Apply validation to routes
app.post('/api/auth/register',
  workingValidateBody(workingUserSchema),
  (req, res) => {
    // req.validatedBody is guaranteed to be valid here
    const { email, password, name } = req.validatedBody;
    // ... create user
  }
);

app.post('/api/posts',
  workingValidateBody(workingPostSchema),
  (req, res) => {
    const { title, content, tags, status } = req.validatedBody;
    // ... create post
  }
);

app.get('/api/posts',
  (req, res, next) => {
    req.pagination = workingValidatePagination(req.query);
    next();
  },
  (req, res) => {
    const { page, limit } = req.pagination;
    // ... fetch posts
  }
);
*/

module.exports = {
  userRegistrationSchema: workingUserSchema,
  userLoginSchema: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
  postSchema: workingPostSchema,
  orderSchema: workingOrderSchema,
  validate: workingValidate,
  validateBody: workingValidateBody,
  validatePagination: workingValidatePagination,
  sanitizeInput,
};
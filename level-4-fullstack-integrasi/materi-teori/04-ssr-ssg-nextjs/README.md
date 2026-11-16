# 📘 MATERI TEORI 04 — SSR & SSG dengan Next.js

## 1. CSR vs SSR vs SSG

```
CSR (Client-Side Rendering)
─────────────────────────────
User request → Server kirim HTML kosong + JS → Browser download JS → JS render halaman

⚠️ Masalah: SEO buruk, First Contentful Paint lambat, perlu JS untuk melihat konten

SSR (Server-Side Rendering)
──────────────────────────────
User request → Server render HTML lengkap → Server kirim HTML ke Browser → Browser tampilkan langsung

✅ SEO bagus, FCP cepat, Cocok untuk konten dinamis (dashboard, social media)

SSG (Static Site Generation)
───────────────────────────────
Build time → Server generate HTML statis → Serve langsung dari CDN

✅ Sangat cepat, sangat SEO-friendly, Cocok untuk konten statis (blog, docs, landing page)
```

---

## 2. Next.js App Router (Next.js 13+)

```bash
npx create-next-app@latest my-app
# TypeScript: Yes
# App Router: Yes
# Tailwind: (pilih sesuai kebutuhan)
```

### Folder Structure

```
app/
├── layout.tsx          # Root layout (navbar, footer, html/body)
├── page.tsx            # Homepage (/)
├── about/
│   └── page.tsx        # /about
├── blog/
│   ├── page.tsx        # /blog
│   └── [slug]/
│       └── page.tsx    # /blog/:slug
├── dashboard/
│   ├── layout.tsx      # Layout khusus dashboard (sidebar, dll)
│   ├── page.tsx        # /dashboard
│   └── settings/
│       └── page.tsx    # /dashboard/settings
├── api/
│   └── users/
│       └── route.ts    # /api/users (serverless function)
└── not-found.tsx       # 404 page
```

---

## 3. Server Components (Default)

Di App Router, semua component adalah **Server Components** secara default — bisa fetch data langsung di component.

```tsx
// app/blog/page.tsx — Server Component (async, bisa await)
async function BlogPage() {
  // Fetch langsung di server — tidak perlu useEffect
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 }  // ISR: revalidate setiap 60 detik
  });
  const posts = await res.json();

  return (
    <main>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}

export default BlogPage;
```

### Client Components ("use client")

Gunakan `"use client"` kalau component butuh: state, effect, event handlers, browser API.

```tsx
// Tombol interaktif = Client Component
"use client";

import { useState } from "react";

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button onClick={() => setLikes(l => l + 1)}>
      ❤️ {likes} likes
    </button>
  );
}
```

```tsx
// Blog post — Server Component
// LikeButton — Client Component
async function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* LikeButton = Client Component, tapi data sudah di-pass sebagai props */}
      <LikeButton initialLikes={post.likes} />
    </article>
  );
}
```

---

## 4. Data Fetching Patterns

```tsx
// Pattern 1: Direct fetch di Server Component
async function getPosts() {
  const res = await fetch("https://api.example.com/posts", {
    cache: "no-store"  // SSR — tidak di-cache
  });
  return res.json();
}

// Pattern 2: With params
async function getPost(slug: string) {
  const res = await fetch(
    `https://api.example.com/posts/${slug}`,
    { next: { revalidate: 60 } }  // ISR
  );
  return res.json();
}

// Pattern 3: Dynamic Route Params
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) notFound();  // trigger 404

  return <article>{post.content}</article>;
}
```

---

## 5. Static Generation (generateStaticParams)

```tsx
// Generate semua path saat build time
// app/posts/[id]/page.tsx

export async function generateStaticParams() {
  // Fetch semua post ID dari DB/API
  const posts = await fetch("https://api.example.com/posts").then(r => r.json());

  return posts.map(post => ({
    id: post.id.toString()
  }));
}

// Atau dengan range
export async function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1)
  }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  return <article>{post.title}</article>;
}
```

---

## 6. Server Actions

Server Actions = fungsi yang berjalan di **server** tapi dipanggil dari **client** (form action, onClick).

```tsx
// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Validasi
  if (!title || !content) {
    return { error: "Title dan content wajib diisi" };
  }

  // Simpan ke DB
  const post = await db.post.create({ data: { title, content } });

  // Redirect
  redirect(`/blog/${post.slug}`);
}
```

```tsx
// app/new-post/page.tsx — Form yang submit ke Server Action
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Judul" required />
      <textarea name="content" placeholder="Konten" required />
      <button type="submit">Publikasikan</button>
    </form>
  );
}
```

---

## 7. Middleware (Auth Check)

```typescript
// middleware.ts — jalankan di edge sebelum request diproses
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Jika belum login dan akses halaman protected
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login dan akses halaman auth
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
};
```

---

## 8. Metadata (SEO)

```tsx
// app/blog/[slug]/page.tsx
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} | Blog Saya`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail]
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

---

## Ringkasan

```
Next.js SSR/SSG
├── App Router    → app/ folder, layout.tsx, page.tsx
├── Server Comp.  → async component, langsung fetch, default
├── Client Comp.  → "use client", useState/useEffect/event
├── SSG           → generateStaticParams + revalidate
├── ISR           → revalidate: 60 (Incremental Static Regeneration)
├── Server Action → "use server", form action, mutation
├── Middleware    → auth check di edge, sebelum routing
└── Metadata      → generateMetadata untuk SEO
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-fullstack/`
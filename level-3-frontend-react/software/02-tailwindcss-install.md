# SOFTWARE 02 — Install Tailwind CSS

## Apa itu Tailwind CSS?

**Tailwind CSS** adalah utility-first CSS framework. Alih-alih komponen siap pakai (seperti Bootstrap), Tailwind memberikan class utility kecil yang bisa dikombinasikan langsung di HTML.

### Contoh

```html
<!-- Bootstrap -->
<button class="btn btn-primary">Kirim</button>

<!-- Tailwind -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Kirim
</button>
```

---

## Langkah 1: Install Tailwind CSS

```bash
# Install via npm
npm install -D tailwindcss postcss autoprefixer

# Generate config
npx tailwindcss init -p
```

---

## Langkah 2: Konfigurasi

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71'
      }
    },
  },
  plugins: [],
}
```

Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
 .card {
    @apply bg-white shadow-lg rounded-lg p-6;
  }
}
```

---

## Langkah 3: Contoh Component

```jsx
function Card({ title, description, image }) {
  return (
    <div className="card max-w-sm mx-auto">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <button className="btn-primary mt-4 w-full">Baca Selengkapnya</button>
      </div>
    </div>
  );
}
```

---

## Ringkasan

```
Tailwind CSS:
1. npm install -D tailwindcss postcss autoprefixer
2. npx tailwindcss init -p
3. Konfigurasi content di tailwind.config.js
4. @tailwind base/components/utilities di CSS
5. Pakai class utility langsung di JSX
```
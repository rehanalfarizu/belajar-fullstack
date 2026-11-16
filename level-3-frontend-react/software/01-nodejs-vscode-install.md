# SOFTWARE 01 — Install Node.js dan Visual Studio Code

## Apa yang Dibutuhkan?

Untuk membuat aplikasi React, kamu membutuhkan:

1. **Node.js** 24 LTS — Runtime JavaScript
2. **npm** atau **yarn** — Package manager
3. **VS Code** — Text editor
4. **Chrome/Firefox DevTools** — Untuk debug

---

## Bagian 1: Install Node.js (Jika Belum)

### Mac — Menggunakan Homebrew

```bash
# Install Homebrew (jika belum)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js LTS
brew install node@20

# Verifikasi
node --version
npm --version
```

### Mac — Menggunakan nvm (Recommended)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

# Install dan gunakan Node.js LTS
nvm install --lts
nvm use --lts

# Set sebagai default
nvm alias default --lts

# Verifikasi
node --version
npm --version
```

### Windows

1. Download dari https://nodejs.org (pilih LTS)
2. Jalankan installer
3. Klik Next → Accept → Next → Next → Install
4. Verifikasi:
   ```
   node --version
   npm --version
   ```

---

## Bagian 2: Install VS Code (Jika Belum)

1. Buka https://code.visualstudio.com
2. Download versi Mac
3. Drag ke Applications

### Ekstensi Wajib untuk React

Buka VS Code → `Cmd + Shift + X` → Install:

| Ekstensi | Fungsi |
|----------|--------|
| **ES7+ React/Redux/React-Native snippets** | Snippet kode React |
| **Simple React Snippets** | Snippet React sederhana |
| **ESLint** | Deteksi error JS |
| **Prettier** | Format kode otomatis |
| **Auto Rename Tag** | Sinkron tag HTML |
| **ES7+ Snippets** | Snippet modern JS |
| **vscode-styled-components** | Syntax highlighting styled-components |
| **Reactjs code snippets** | Snippet komponen React |

---

## Bagian 3: Install Ekstensi Browser (DevTools)

### React Developer Tools

**Chrome:**
1. Buka https://chrome.google.com/webstore
2. Search: "React Developer Tools"
3. Klik **Add to Chrome**

**Firefox:**
1. Buka https://addons.mozilla.org
2. Search: "React Developer Tools"
3. Klik **Add to Firefox**

### Cara Pakai React DevTools

1. Buka aplikasi React kamu (`npm run dev`)
2. Buka DevTools browser (`F12`)
3. Klik tab **Components** (React DevTools)
4. Di sana kamu bisa:
   - Lihat tree komponen
   - Lihat props dan state
   - Edit state langsung (langsung terlihat di UI)
   - Lihat profil performa

---

## Bagian 4: Install Tailwind CSS

Tailwind CSS adalah utility-first CSS framework yang populer di ekosistem React.

```bash
# Masuk ke project React
cd todo-app

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Inisialisasi Tailwind
npx tailwindcss init -p
```

### Konfigurasi Tailwind

Buka `tailwind.config.js`, ubah isi `content`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Tambahkan directive di `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Sekarang kamu bisa pakai class seperti:
```jsx
<div className="bg-blue-500 p-4 rounded-lg shadow-lg">
  <h1 className="text-white text-2xl font-bold">Hello</h1>
</div>
```

---

## Bagian 5: Install Additional Tools

### React Router

```bash
npm install react-router-dom
```

### Axios (HTTP Client)

```bash
npm install axios
```

### Zustand (State Management Ringan)

```bash
npm install zustand
```

### React Hook Form

```bash
npm install react-hook-form
```

### Zod (Validation)

```bash
npm install zod
npm install @hookform/resolvers
```

---

## Ringkasan

```
Tools yang dibutuhkan:

1. Node.js 24 LTS      → nodejs.org atau version manager
2. npm                 → sudah termasuk di Node.js
3. VS Code             → code.visualstudio.com
4. React DevTools      → Ekstensi Chrome/Firefox
5. (Opsional) Tailwind → npm install -D tailwindcss

Shortcut Penting VS Code:
├── Cmd + Shift + X    → Extensions
├── Cmd + Shift + P    → Command Palette
├── Cmd + P            → Quick Open File
└── Cmd + J            → Toggle Terminal
```

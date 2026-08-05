# Software — LEVEL 3: Frontend React

Folder ini berisi panduan install dan setup **software yang dibutuhkan** untuk belajar frontend development dengan React.

---

## Daftar Software

| # | File | Software | Keterangan |
|---|------|----------|-------------|
| 01 | `01-nodejs-install.md` | Node.js & npm | Wajib — untuk menjalankan React |
| 02 | `02-vscode-extensions.md` | VS Code Extensions | ESLint, Prettier, React snippets |
| 03 | `03-vite-install.md` | Vite | Build tool modern untuk React |
| 04 | `04-react-devtools.md` | React DevTools | Browser extension untuk debug React |

---

## Cara Pakai

1. **Install software** sesuai urutan dari atas ke bawah
2. **Cek versi** setelah install untuk memastikan berhasil
3. **Install VS Code extensions** yang direkomendasikan
4. **Ikuti instruksi** di setiap file dengan teliti

---

## Urutan Install yang Disarankan

```
STEP 1 → Install Node.js (wajib)
STEP 2 → Install VS Code Extensions (sangat direkomendasikan)
STEP 3 → Install Vite untuk setup project React
STEP 4 → Install React DevTools di browser
```

---

## Verifikasi Install

```bash
# Cek Node.js dan npm
node --version
npm --version

# Buat project React dengan Vite
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

---

## VS Code Extensions yang Direkomendasikan

| Extension | Fungsi |
|-----------|--------|
| ES7+ React/Redux/React-Native snippets | Snippet kode React |
| Prettier - Code formatter | Auto-format kode |
| ESLint | Linting dan error detection |
| Auto Rename Tag | Auto-rename tag HTML/JSX |
| Highlight Matching Tag | Sorot tag pembuka/penutup |
| Import Cost | Tampilkan size import |
| Error Lens | Tampilkan error langsung di kode |

---

**Lanjut ke:** [tutorial/](../tutorial/) untuk panduan setup project

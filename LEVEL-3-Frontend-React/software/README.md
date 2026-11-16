# Software — LEVEL 3: Frontend React

Folder ini berisi panduan install dan setup **software yang dibutuhkan** untuk belajar frontend development dengan React.

---

## Daftar Software

| # | File | Software | Keterangan |
|---|------|----------|-------------|
| 01 | [01-nodejs-vscode-install.md](01-nodejs-vscode-install.md) | Node.js, VS Code, DevTools, tools tambahan | Wajib — untuk menjalankan React |
| 01 | [01-react-dan-vite-install.md](01-react-dan-vite-install.md) | React dan Vite | Membuat project React |
| 02 | [02-tailwindcss-install.md](02-tailwindcss-install.md) | Tailwind CSS | Opsional — styling |

---

## Cara Pakai

1. **Install software** sesuai urutan dari atas ke bawah
2. **Cek versi** setelah install untuk memastikan berhasil
3. **Install VS Code extensions** yang direkomendasikan (tabel di bawah)
4. **Ikuti instruksi** di setiap file dengan teliti

---

## Urutan Install yang Disarankan

```
STEP 1 → Install Node.js dan VS Code (01-nodejs-vscode-install.md)
STEP 2 → Buat project React dengan Vite (01-react-dan-vite-install.md)
STEP 3 → Tambah Tailwind CSS kalau perlu (02-tailwindcss-install.md)
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

**Lanjut ke:** [tutorial/](../tutorial/README.md) untuk panduan setup project

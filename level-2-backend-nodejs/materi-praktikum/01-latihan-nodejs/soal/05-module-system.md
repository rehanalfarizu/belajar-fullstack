# SOAL 05 — Module System

## Tujuan
Memahami CommonJS (`require`/`module.exports`) dan ES Modules (`import`/`export`).

---

## Briefing
Buat struktur project dengan banyak module yang saling require.

---

## Syarat (Checklist)

### CommonJS
- [ ] `module.exports = { nama, fungsi }` — single export
- [ ] `module.exports.Fungsi = ...` — named export
- [ ] `const { nama } = require("./module")` — destructure import
- [ ] `require("./module")` — import semua

### Built-in Modules
- [ ] `require("fs")`, `require("path")`, `require("http")`
- [ ] `require("crypto")` — hashing
- [ ] `require("url")` — URL parsing

### Circular Dependencies
- [ ] Pahami mengapa circular dependency berbahaya
- [ ] Selesaikan dengan lazy loading

### ES Modules (Node 14+)
- [ ] `"type": "module"` di package.json
- [ ] `export const nama = ...`
- [ ] `export default function() {}`
- [ ] `import nama, { fungsi } from "./module.mjs"`

---

## Contoh Code

```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
module.exports = { add, subtract };

// index.js
const { add, subtract } = require("./math");
console.log(add(5, 3)); // 8
```

```javascript
// ES Modules
// math.mjs
export const add = (a, b) => a + b;
export default { add };

// index.mjs
import { add } from "./math.mjs";
import math from "./math.mjs";
```

---

## Cara Submit

Starter `code/05-module-system.js` adalah lembar kerja berisi `TODO(human)` dan catatan. Folder `05-modules/` **belum ada di repo**, kamu yang membuatnya sendiri di folder kerjamu.

1. Salin `code/05-module-system.js` ke `latihan-saya/03-backend/minggu-08/05-module-system.js` (nama sama).
2. Di folder yang sama, buat folder `05-modules/` berisi `math.js`, `utils.js`, dan `index.js`.
3. `index.js` me-`require` dua file lainnya.
4. Jalankan dari dalam `05-modules/`: `node index.js`
5. Buat juga versi ES Modules (`math.mjs`, `index.mjs`) dan jalankan `node index.mjs`.
6. Tulis penjelasan circular dependency di bagian "CATATAN SAYA" pada lembar kerjamu.

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
1. Buat folder `05-modules/`
2. Buat `utils.js`, `math.js`, `index.js`
3. `index.js` require yang lain
4. Jalankan: `node index.js`

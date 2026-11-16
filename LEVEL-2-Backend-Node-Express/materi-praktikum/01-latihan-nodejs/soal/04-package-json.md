# SOAL 04 — Package.json & npm

## Tujuan
Memahami package management dengan npm: install, scripts, dependencies.

---

## Briefing
Buat project Node.js dengan package.json yang proper, install dependencies.

---

## Syarat (Checklist)

### package.json
- [ ] `npm init` — generate package.json
- [ ] Isi: name, version, description, main
- [ ] `scripts`: start, dev, test
- [ ] `engines`: node version

### Dependencies
- [ ] `npm install express` — production
- [ ] `npm install --save-dev nodemon` — development
- [ ] `npm install -D jest` — dev dependency
- [ ] `npm install axios@1.2.0` — specific version
- [ ] `npm install lodash` — latest

### npm Commands
- [ ] `npm install` — install dari package-lock.json
- [ ] `npm outdated` — cek outdated packages
- [ ] `npm update` — update packages
- [ ] `npm uninstall package-name` — hapus
- [ ] `npm list` — list installed
- [ ] `npm run <script>`

### Semver
- [ ] `^1.2.3` — caret (minor & patch)
- [ ] `~1.2.3` — tilde (patch only)
- [ ] `1.2.3` — exact

---

## Contoh package.json

```json
{
  "name": "my-backend-app",
  "version": "1.0.0",
  "description": "Backend API with Express",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "engines": {
    "node": ">=22.18.0"
  },
  "dependencies": {
    "express": "^5.2.1",
    "axios": "^1.18.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14",
    "jest": "^30.4.2"
  }
}
```

---

## Cara Submit
Starter `code/04-package-json.js` hanya berisi langkah-langkah dan contoh. Project-nya kamu buat sendiri di folder baru, misalnya `latihan-saya/03-backend/minggu-08/projectku/`.

1. `mkdir projectku && cd projectku`
2. `npm init -y` (jalankan di folder project dulu, supaya dependency tidak masuk ke `package.json` root repo)
3. `npm install express` dan `npm install --save-dev nodemon`
4. Buat folder `src/` dan file `src/index.js`
5. Isi bagian `scripts` di `package.json` (`start` dan `dev`)
6. Jalankan: `npm run dev`

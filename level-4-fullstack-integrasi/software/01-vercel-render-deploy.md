# SOFTWARE 01 — Deploy ke Vercel & Render

## Deploy Frontend ke Vercel

### Langkah 1: Persiapan

Pastikan project sudah ada di GitHub:

```bash
git init
git add .
git commit -m "feat: initial React app"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### Langkah 2: Setup Vercel

1. Buka https://vercel.com
2. Login dengan GitHub
3. Klik **"Add New..."** → **"Project"**
4. Pilih repository
5. Klik **"Import"**
6. Konfigurasi:
   - Framework Preset: **Vite**
   - Root Directory: `.` atau `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Klik **"Deploy"**

### Langkah 3: Environment Variables

Di Vercel dashboard:
1. Pilih project
2. Go to **Settings** → **Environment Variables**
3. Tambahkan:
   - `VITE_API_URL` = `https://api-kamu.onrender.com`

### Langkah 4: Update API URL di Frontend

`src/api/axios.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
```

`withCredentials` mengirim cookie sesi `HttpOnly` yang dibuat backend. Jangan
menyimpan bearer token autentikasi di `localStorage`; JavaScript yang berhasil
masuk melalui XSS dapat membacanya.

---

## Deploy Backend ke Render

### Langkah 1: Persiapan

```bash
# Buat Procfile
echo "web: node src/index.js" > Procfile

# Update package.json
# Pastikan ada: "start": "node src/index.js"
```

### Langkah 2: Setup PostgreSQL di Render

1. Buka https://render.com
2. Login dengan GitHub
3. Klik **"New +"** → **"PostgreSQL"**
4. Isi nama database
5. Copy **Internal Database URL**

### Langkah 3: Deploy Backend

1. Klik **"New +"** → **"Web Service"**
2. Pilih repository
3. Konfigurasi:
   - Name: `blog-api`
   - Region: Singapore
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Environment Variables:
   - `DATABASE_URL` = (paste dari langkah 2)
   - `JWT_SECRET` = hasil `openssl rand -hex 32`
   - `FRONTEND_URL` = URL frontend production
   - `NODE_ENV` = `production`
5. Klik **"Create Web Service"**

---

## Update Frontend API URL

Setelah backend di-deploy, copy URL-nya:

```
https://blog-api.onrender.com
```

Update environment variable di Vercel:

```
VITE_API_URL = https://blog-api.onrender.com
```

---

## Ringkasan

```
Deploy Fullstack:
Frontend (Vercel):
1. Push ke GitHub
2. Import project di vercel.com
3. Set Framework: Vite
4. Add Environment Variables
5. Deploy!

Backend (Render):
1. Buat Procfile
2. Buat PostgreSQL di Render
3. Create Web Service
4. Set DATABASE_URL, JWT_SECRET
5. Deploy!

Cek: Vercel → Settings → Environment Variables
```

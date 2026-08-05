# Tutorial 05 — Debug dengan Chrome DevTools

## Tujuan
Menggunakan Chrome DevTools untuk inspect elemen, membaca console, network, dan menemukan bug di kode web.

---

## Membuka DevTools

| Cara | Shortcut |
|------|----------|
| Klik kanan → Inspect | - |
| Menu → More Tools → Developer Tools | - |
| Keyboard | `Cmd + Option + I` (Mac) / `F12` (Windows) |

**Tab-tab utama DevTools:**
```
Elements  → Inspect & edit HTML/CSS
Console   → Log & debugging JS
Sources   → JS debugging, breakpoint
Network   → Request & response
Application → LocalStorage, SessionStorage
```

---

## Tab Elements (Inspect HTML/CSS)

### Inspect Elemen:
1. Klik icon **pointer** (atas kiri DevTools)
2. Arahkan cursor ke elemen di halaman
3. Klik untuk memilih

### Edit HTML Langsung:
- Double-click elemen → ketik baru
- Klik kanan → **Edit as HTML** → ubah struktur

### Edit CSS:
- Di panel **Styles** (kanan), klik nilai manapun untuk ubah
- Centang/hapus centang properti untuk on/off
- Klik `+` untuk tambah property baru

### Box Model Visual:
- Di panel di bawah Styles, lihat diagram Box Model
- Klik angka margin/padding untuk ubah langsung

### Computed Styles:
- Tab **Computed** → lihat semua CSS final yang applied
- Berguna untuk debug kenapa style tidak jalan

---

## Tab Console (Log & Debugging JS)

### Jenis Output:

```javascript
console.log("Info biasa");        // putih
console.info("Info");             // biru
console.warn("Peringatan");       // kuning
console.error("Error");           // merah
console.table([{a:1}, {a:2}]);   // format tabel
```

### Console API:

```javascript
// Group log
console.group("Langkah 1");
console.log("A");
console.log("B");
console.groupEnd();

// Timing
console.time("loop");
for (let i = 0; i < 1000; i++) {}
console.timeEnd("loop"); // loop: 0.5ms

// Assert
console.assert(1 === 2, "Ini tidak pernahjalan!");

// Clear
console.clear();
```

### Interaktif di Console:
- Ketik kode langsung di console untuk test
- Akses variabel global (`document`, `window`)
- `$_` → hasil evaluasi terakhir
- `$0` → elemen yang sedang dipilih

---

## Tab Sources (JS Debugging)

### Breakpoint — pause eksekusi JS:

**Cara 1: Line Breakpoint**
1. Buka tab **Sources**
2. Buka file JS di panel kiri
3. Klik nomor baris → breakpoint (bola biru)

**Cara 2: Conditional Breakpoint**
1. Klik kanan nomor baris
2. Pilih **Add conditional breakpoint**
3. Ketik kondisi: `count > 10`

**Cara 3: debugger; keyword**
```javascript
function hitung(n) {
  debugger; // browser pause di sini
  return n * 2;
}
```

### Debugger Controls:

| Icon | Fungsi |
|------|--------|
| ▶️ / ⏸️ | Play / Pause |
| ↪️ | Step over (lewat baris ini) |
| ⬇️ | Step into (masuk function) |
| ⬆️ | Step out (keluar function) |
| ⟳ | Resume |

### Watch Panel:
- Klik `+` di panel **Watch**
- Ketik nama variabel (misal `count`)
- Nilai akan selalu terlihat saat paused

### Call Stack:
- Lihat urutan function yang dipanggil
- Berguna untuk trace jalannya program

---

## Tab Network (Monitor Request)

### Cara Pakai:
1. Buka tab **Network**
2. Refresh halaman
3. Lihat semua request yang keluar

### Kolom Penting:

| Kolom | Arti |
|-------|------|
| Name | File/URL yang di-request |
| Status | 200=OK, 404=Not Found, 500=Error |
| Type | html, css, js, xhr, img |
| Time | Waktu response |
| Size | Ukuran file |

### Filter Request:
- `ALL` — semua
- `Fetch/XHR` — AJAX calls (API calls)
- `JS`, `CSS`, `Img` — per jenis file

### Klik Request untuk Detail:
- **Headers** — HTTP headers
- **Payload** — data yang dikirim (POST)
- **Preview/Response** — response body
- **Timing** — breakdown waktu

---

## Tab Application (Storage)

### LocalStorage:
```javascript
// Simpan
localStorage.setItem("nama", "Andi");

// Ambil
const nama = localStorage.getItem("nama");

// Hapus
localStorage.removeItem("nama");
```

Di DevTools → **Application** → **Local Storage** → lihat/ubah/hapus data.

### SessionStorage:
Sama dengan LocalStorage, tapi hilang saat tab ditutup.

---

## Tips Debugging Praktis

### 1. Error tidak muncul?
```javascript
// Selalu bungkus dengan try-catch
try {
  kodeYangBerisiko();
} catch (error) {
  console.error("Error:", error.message);
}
```

### 2. Variabel undefined?
```javascript
console.log("nama variabel:", nama); // selalu log sebelum pakai
```

### 3. Style tidak applied?
- Cek urutan CSS (kaskade)
- Cek specificity (id > class > element)
- Cek computed styles
- Pastikan file CSS di-load

### 4. Request gagal?
- Cek tab **Network**
- Cek status code
- Cek tab **Console** untuk CORS error

---

## Mini-Challenge

Gunakan DevTools untuk debug halaman web favorit kamu:

- [ ] Inspect elemen, ubah warna/teks langsung di DevTools
- [ ] Buka Console, ketik `document.title` untuk lihat judul
- [ ] Buka Network, refresh halaman, lihat request yang keluar
- [ ] Buka Application, lihat LocalStorage dari web tersebut
- [ ] Set breakpoint di Sources untuk pause JS

---

## Ringkasan

```
Chrome DevTools:
├── Elements    → Inspect HTML, edit CSS real-time
├── Console     → Log JS, interaktif REPL
├── Sources     → JS debugging, breakpoint, watch
├── Network     → Monitor request/response
├── Application → LocalStorage, SessionStorage
└── Tips        → Try-catch, console.log, breakpoint
```

---

**Lanjut ke:** [06-project-portfolio.md](./06-project-portfolio.md)
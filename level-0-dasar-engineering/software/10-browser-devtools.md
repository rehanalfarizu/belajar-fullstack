# 📦 Software 10 — Web Browsers & DevTools

## Mengapa Browser Penting untuk Developer?

```
Browser = tempat website "hidup"
┌──────────────────────────────────────────┐
│ browser developer tools (F12)            │
│ ├── Elements  → inspect/edit HTML/CSS    │
│ ├── Console   → debug JavaScript         │
│ ├── Network   → lihat request/response   │
│ ├── Sources   → debug JS dengan breakpoint │
│ ├── Application → cookies, localStorage   │
│ └── Performance → profiling speed        │
└──────────────────────────────────────────┘
```

---

## 1. Browser yang Direkomendasikan

```
1. Chrome / Chromium  → standar industri, DevTools terbaik
2. Firefox           → debugger superior, memory tool
3. Safari            → performance profiling Mac native
4. Edge              → sama dengan Chrome, tapi Windows-native

Untuk development: gunakan Chrome atau Firefox
```

### Install Chrome:

```bash
brew install --cask google-chrome
```

### Install Firefox:

```bash
brew install --cask firefox
```

---

## 2. Chrome DevTools (F12)

### Panel Utama:

```
┌─────────────────────────────────────────────────┐
│ Elements   Console   Sources   Network  │More│  │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Tab yang dipilih — isi panel]                │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 3. Tab Elements — Inspect & Edit HTML/CSS

### Inspect Element:

```
1. Klik kanan → "Inspect Element"
2. Atau: Cmd + Option + I (buka DevTools)
3. Klik ikon cursor (↖️) di kiri atas → arahkan ke elemen di halaman

Shortcut: Cmd + Shift + C (Inspect mode)
```

### Edit HTML:

```
1. Klik element di panel Elements
2. Double-click untuk edit teks langsung
3. Klik kanan → "Edit as HTML" → edit seluruh HTML
4. Copy-paste node
5. Delete node (Tekan Delete/Backspace)
```

### Edit CSS:

```
1. Klik element → panel Styles (kanan)
2. Klik style property → ubah value
3. Centang/uncheck checkbox untuk toggle style
4. Klik + untuk tambah style baru
5. Color picker → klik kotak warna

Live edit → perubahan langsung terlihat di page
(Refresh untuk reset ke original)
```

### Computed Styles:

```
Tab "Computed" → lihat semua CSS yang diterapkan pada elemen
Mulai dari user agent styles → sampai custom CSS
```

### Box Model:

```
1. Di bawah Styles panel ada visual box model
2. Margin / Border / Padding / Content
3. Klik angka untuk ubah value
4. Klik area (margin/padding) untuk toggle arah
```

---

## 4. Tab Console — Debug JavaScript

### Console Basics:

```
console.log("Hello")            // log biasa
console.error("Error!")        // log error (merah)
console.warn("Warning")        // log warning (kuning)
console.info("Info")           // log info (biru)
console.debug("Debug")         // log debug
console.table([{a:1}])         // table view

console.log("Variable:", var)  // log + nilai
console.log("Array:", arr)     // log array
console.log("Object:", obj)    // log object (expandable)
```

### Multi Arguments & Formatting:

```javascript
console.log("Nama:", "Andi", "Umur:", 25)
console.log("User:", { name: "Andi", age: 25 })
console.log("%cStyled Text", "color: red; font-size: 20px;")
console.log("%cSuccess!%c Info", "color: green", "color: blue")
```

### Console API:

```javascript
console.group("User Data")
console.log("Name: Andi")
console.log("Email: andi@email.com")
console.groupEnd()

// Conditional log
console.assert(user.age >= 18, "User under 18!")

// Count
console.count("click")
console.countReset("click")

// Timing
console.time("loop")
for (let i = 0; i < 1000; i++) {}
console.timeEnd("loop")

// Trace (stack trace)
function a() { b() }
function b() { c() }
function c() { console.trace("Here!") }
a()
```

### Clear Console:

```
Cmd + K  (clear)
console.clear()
```

### Filter:

```
Filter box → ketik "error" untuk lihat hanya error
```

---

## 5. Tab Sources — Debugger (Breakpoint)

### Breakpoint Types:

```
1. Line breakpoint     → stop di baris tertentu
2. Conditional breakpoint → stop kalau kondisi true
3. DOM breakpoint       → stop waktu DOM berubah
4. XHR breakpoint        → stop waktu network request
5. Event listener breakpoint → stop waktu event fire
```

### Cara Set Breakpoint:

```
1. Tab Sources → buka file JS
2. Klik nomor baris untuk set/remove breakpoint
3. Contoh: line 15 → program berhenti sebelum line 15
```

### Debugger Controls:

```
┌─────┐
│ ▶️  │  Resume (F8) → lanjut sampai breakpoint berikutnya
│ ⏸️  │  Pause       → pause execution
│ ⏭️  │  Step Over   → next line, skip function calls
│ ⏺️  │  Step Into   → masuk ke function
│ ⏪  │  Step Out    → keluar dari function
└─────┘

Keyboard shortcut:
F8   → Resume
F9   → Step over
F10  → Step into
F11  → Step out
```

### Watch & Scope:

```
Watch panel (kanan atas):
→ Klik + → ketik "variableName"
→ Lihat nilai variable kapan saja

Scope panel (kanan):
→ Local → variabel di function sekarang
→ Closure → variabel dari closure
→ Global → variabel global
```

### Call Stack:

```
Call Stack panel (kanan):
→ Tampilkan urutan function yang dipanggil
→ Klik stack frame untuk lihat code di situ
```

---

## 6. Tab Network — Analisis Request/Response

### Recording:

```
1. Buka tab Network → RECORD aktif (warna merah)
2. Refresh page (Cmd + R)
3. Semua network request tercatat
```

### Columns:

```
Name           → URL/filename
Status         → HTTP status code
Type           → document, script, xhr, fetch, img
Initiator      → apa yang memulai request
Time           → durasi request
```

### Filter:

```
XHR     → XMLHttpRequest (AJAX)
Fetch   → Fetch API requests
Doc     → HTML documents
JS      → JavaScript files
CSS     → CSS files
WS      → WebSocket
```

### Klik Request:

```
Headers      → Request headers, query params
Payload      → Body request (POST/PUT)
Preview      → JSON/image preview
Response     → Full response body
Timing       → Breakdown waktu (DNS, connect, dll)
```

### Preserve Log:

```
☑ Preserve log → tetap simpan request saat refresh/halaman change
```

---

## 7. Tab Application — Storage dan Fitur Lain

### Storage:

```
Cookies           → semua cookies
Local Storage     → key-value, persist
Session Storage   → key-value, hilang saat tab close
IndexedDB         → database di browser
Cache             → cached resources
```

### Service Workers:

```
Service Workers → PWA offline support
```

### Clear Storage:

```
Right-click → Clear storage
```

---

## 8. Tab Performance & Lighthouse

### Performance:

```
1. Klik record (warna merah)
2. Lakukan aksi di page (click, scroll, dll)
3. Klik stop
4. Lihat flame chart → timeline kode execution

Baca flame chart:
→ Baris atas = frame (60fps = bagus, <30fps = lag)
→ Warna = jenis task (blue=script, yellow=render, green=paint)
→ Klik untuk zoom
```

### Lighthouse:

```
1. Cmd + Option + I → tab "Lighthouse"
2. Pilih: Mobile / Desktop
3. Pilih categories: Performance, Accessibility, dll
4. Klik "Analyze page load"
5. Lihat score (0-100) + rekomendasi perbaikan

Target score:
90-100 = hijau (bagus)
50-89  = oranye (perlu improvement)
0-49   = merah (buruk)
```

---

## 9. Useful Browser Extensions

### Developer Essentials:

```
1. React DevTools     → inspect React component tree
2. Vue DevTools       → inspect Vue component tree
3. Redux DevTools     → inspect Redux state
4. JSON Viewer        → pretty print JSON
5. Web Vitals         → ukur Core Web Vitals
6. Responsive Viewer  → test berbagai viewport
7. Lighthouse         → audit performance
```

### Install Extension:

```
Chrome: chrome web store → search nama
Firefox: addons.mozilla.org → search nama
```

---

## 10. Mobile Device Testing

### Responsive Design Mode:

```
1. Cmd + Option + M (toggle device toolbar)
2. Pilih device: iPhone, iPad, Android
3. Pilih resolution
4. Rotate button → landscape mode

DevTools → Toggle device toolbar
```

### Network Throttling:

```
1. Network tab → dropdown "No throttling"
2. Pilih: Slow 3G, Fast 3G, Online
3. Test performa di koneksi lambat
```

### Remote Debugging:

```
iOS Safari:
1. iPhone → Settings → Safari → Advanced → Web Inspector = ON
2. Connect iPhone ke Mac via USB
3. Safari Mac → Develop → [iPhone name] → pilih tab

Android Chrome:
1. Android → Settings → Developer Options → USB debugging = ON
2. Connect ke Mac via USB
3. Chrome Mac → chrome://inspect → Devices
```

---

## Checklist

```
✅ Buka DevTools (F12 / Cmd + Option + I)
✅ Inspect element & edit CSS langsung
✅ Console.log debugging
✅ Set breakpoint di Sources tab
✅ Step through code (F10, F11)
✅ Analyze Network tab
✅ View/Edit Local Storage
✅ Test responsive design (device toolbar)
✅ Run Lighthouse audit
✅ Remote debug iOS/Android device
```

---

**Next:**
- Kembali ke Software 01: Visual Studio Code
- Atau ke Tutorial: Web Development Setup

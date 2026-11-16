# SOAL 02 — Core Web Vitals Deep Dive

> Analisis mendalam terhadap metrik performa yang langsung memengaruhi user experience dan SEO ranking.

---

## Deskripsi Soal

Tim SEO perusahaan mendapatkan laporan bahwa ranking aplikasi terus menurun. Setelah dicek, ternyata **Core Web Vitals** menjadi salah satu faktor ranking yang signifikan. Kamu diminta untuk:

1. Memahami secara mendalam bagaimana setiap metrik CWV dihitung
2. Menganalisis **field data** vs **lab data**
3. Mengimplementasikan perbaikan berdasarkan data yang ada
4. Memasang **Real User Monitoring (RUM)** untuk tracking berkelanjutan

---

## Teori Singkat

### Core Web Vitals (CWV)

Core Web Vitals adalah subset dari Web Vitals yang dikumpulkan dari **Chrome User Experience Report (CrUX)** dan digunakan Google sebagai sinyal ranking. Ada 3 metrik utama:

#### LCP — Largest Contentful Paint
- **Definisi:** Waktu yang dibutuhkan untuk me-render elemen konten terbesar di viewport
- **Ambang:** Good < 2.5s | Needs Improvement 2.5–4s | Poor > 4s
- **LCP candidates:** `<img>`, `<image>` dalam SVG, `<video>`, elemen block dengan background image, elemen teks

#### FID → INP (Interaction to Next Paint)
- **FID:** Waktu dari interaksi pertama hingga browser bisa merespons
- **INP:** Waktu dari interaksi user mana pun hingga paint berikutnya (digantikan FID per Maret 2024)
- **Ambang:** Good < 200ms | NI 200–500ms | Poor > 500ms
- **Catatan:** INP mengukur semua interaksi, FID hanya yang pertama

#### CLS — Cumulative Layout Shift
- **Definisi:** Total semua unexpected layout shift scores
- **Ambang:** Good < 0.1 | NI 0.1–0.25 | Poor > 0.25
- **Layout shift score** = impact fraction × distance fraction

---

## Checklist Pengerjaan

### Bagian A — Lab vs Field Data (20 menit)

**1. Field Data (CrUX)**

Kunjungi [PageSpeed Insights](https://pagespeed.web.dev/) dan analisis URL: `https://web.dev/`

Catat:
- Overall Performance score (field)
- Distribusi: Good / Needs Improvement / Poor untuk setiap metrik
- Percentil ke-75 (p75) dari setiap metrik

**2. Lab Data (Lighthouse)**

Jalankan Lighthouse di mode yang sama (mobile, p75 simulation):

```bash
lighthouse https://web.dev/ \
  --preset mobile \
  --throttling-method=simulate \
  --form-factor=mobile \
  --output json \
  --output-path ./cwv-lab-data.json
```

**3. Perbandingan**

Buat tabel perbandingan dan jawab:
- Mengapa field data dan lab data bisa berbeda signifikan?
- Kapan sebaiknya menggunakan field data? Kapan lab data?
- Apa kelemahan utama dari lab data?

### Bagian B — LCP Deep Analysis (30 menit)

**1. Identifikasi LCP Element**

Tambahkan kode berikut ke aplikasi dan buka DevTools:

```js
// Jalankan di console DevTools
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP element:', lastEntry.element);
  console.log('LCP time:', lastEntry.startTime);
  console.log('LCP size:', lastEntry.size);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

**2. Breakdown LCP**

Untuk LCP yang lambat, breakdown menjadi sub-komponen:

| Komponen | Deskripsi |
|----------|-----------|
| TTFB | Time to First Byte |
| Resource Load Delay | Waktu sebelum browser menemukan LCP resource |
| Resource Load Time | Waktu download LCP resource |
| Element Render Delay | Waktu dari load selesai hingga elemen dirender |

Hitung masing-masing komponen untuk aplikasi kamu.

**3. Optimasi LCP**

Untuk setiap penyebab LCP lambat, tuliskan strategi optimasi yang sesuai:

| Penyebab | Strategi Optimasi |
|----------|-----------------|
| LCP element terlambat ditemukan browser | ... |
| LCP resource lambat di-download | ... |
| Render-blocking resources | ... |
| Server response time lambat (TTFB) | ... |

### Bagian C — INP Deep Analysis (30 menit)

**1. Identifikasi Interaksi Bermasalah**

Gunakan Chrome DevTools untuk merekam interactions:

1. Buka DevTools → Performance tab
2. Aktifkan "Web life debugging" (experimental)
3. Rekam aktivitas user: click, type, scroll, drag
4. Cari long task (> 50ms) yang terjadi setelah interaksi

**2. Kategorisasi Masalah INP**

Untuk setiap interaksi yang menghasilkan INP > 200ms, kategorikan:

| Kategori | Penyebab | Contoh |
|----------|----------|--------|
| Long Animation Frame (LoAF) | JavaScript / rendering > 200ms | Expensive re-render |
| Long Task | JS execution time > 50ms | Unoptimized event handler |
| Input Delay | Waktu sebelum event handler dijalankan | Third-party script blocking |
| Processing Delay | Waktu eksekusi event handler | Synchronous layout read/write |

**3. Solusi untuk Setiap Kategori**

Tulis minimal 3 teknik optimasi untuk masing-masing kategori di atas.

### Bagian D — CLS Deep Analysis (20 menit)

**1. Identifikasi Layout Shift**

Gunakan `Layout Shift Attribution` di Chrome DevTools:

```js
// Untuk melihat detail setiap layout shift
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.sources) continue;
    console.log('Shift value:', entry.value);
    entry.sources.forEach((source) => {
      console.log('  Before:', source.beforeRect);
      console.log('  After:', source.afterRect);
      console.log('  Node:', source.node);
    });
  }
}).observe({ type: 'layout-shift', buffered: true });
```

**2. Penyebab Umum CLS**

Untuk setiap layout shift yang kamu temukan, identifikasi penyebab:

| Penyebab | Tanda Khas | Solusi |
|----------|-----------|--------|
| Gambar tanpa dimensi | `<img>` tanpa width/height | Selalu set aspect-ratio |
| Dynamic content di atas fold | Ads, banners, cookie notices | Reserve space dengan min-height |
| Font FOIT/FOUT | Teks berubah fonts | font-display: optional/swap + size-adjust |
| Late injection CSS | Styling dari JS yang lambat | Preload critical CSS |
| Animasi transform | Perubahan layout dari animasi | Gunakan transform/opacity saja |

### Bagian E — Real User Monitoring (RUM) Setup (20 menit)

**1. Implementasi Custom RUM**

Buat file `src/rum.js` yang mengumpulkan CWV metrics secara real-time:

```js
// TODO: Implementasi ada di code template
// code/01-vite-config.js
```

**2. Payload RUM**

Rancang payload JSON yang dikirim ke analytics endpoint:

```json
{
  "page": "/dashboard",
  "lcp": 2100,
  "inp": 180,
  "cls": 0.05,
  "ttfb": 300,
  "device_memory": 8,
  "connection_type": "4g",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "url": "https://example.com/dashboard"
}
```

**3. Pertanyaan Analisis**

- Bagaimana cara memastikan sample yang representatif (bukan biased)?
- Kapan sebaiknya sampling rate dikurangi/dinaikkan?
- Bagaimana cara deal dengan outliers di data RUM?

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Analisis lab vs field data | 15% |
| Kedalaman LCP analysis | 25% |
| Kedalaman INP analysis | 20% |
| Kedalaman CLS analysis | 15% |
| Desain RUM system | 15% |
| Kualitas written analysis | 10% |

---

## Reference

- [web.dev — CWV](https://web.dev/vitals/)
- [Chrome UX Report Documentation](https://developer.chrome.com/docs/crux)
- [INP Primer](https://web.dev/articles/inp)
- [Layout Instability API](https://developer.chrome.com/docs/web-platform/layout-instability-api)

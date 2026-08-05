# SOAL 01 — Lighthouse Audit

> Menggunakan Google Lighthouse untuk melakukan audit performa aplikasi web secara sistematis.

---

## Deskripsi Soal

Kamu adalah seorang **performance engineer** yang baru bergabung di sebuah startup. Tim product manager meminta kamu untuk melakukan **baseline audit** pada aplikasi e-commerce yang sudah ada. Aplikasi ini memiliki masalah performa yang dilaporkan oleh user, tapi belum ada data konkret.

Tugas kamu adalah melakukan audit lengkap menggunakan Lighthouse, mengidentifikasi masalah, dan membuat **laporan rekomendasi** yang bisa ditindaklanjuti oleh tim developer.

---

## Teori Singkat

**Google Lighthouse** adalah tool open-source dari Google yang mengaudit aplikasi web secara otomatis terhadap 5 kategori:

1. **Performance** — Kecepatan load dan responsivitas
2. **Accessibility** — Seberapa mudah digunakan oleh pengguna disabilitas
3. **Best Practices** — Keamanan dan praktik development yang baik
4. **SEO** — Search engine optimization
5. **PWA** — Progressive Web App compliance

Lighthouse bisa dijalankan melalui:
- Chrome DevTools (tab Lighthouse)
- CLI: `npm install -g lighthouse && lighthouse <url>`
- CI: `@lhci/cli` untuk continuous monitoring

---

## Persiapan

Gunakan aplikasi Vite React default untuk simulasi:

```bash
# Buat project baru (jika belum ada)
npm create vite@latest perf-app -- --template react
cd perf-app
npm install
npm run dev
```

Pastikan aplikasi running di `http://localhost:5173`.

---

## Checklist Pengerjaan

### Bagian A — Persiapan (15 menit)

1. Install Lighthouse CLI:
   ```bash
   npm install -g lighthouse
   ```

2. Install Chrome (atau gunakan yang sudah ada). Pastikan Chrome terinstall di sistem.

3. Jalankan audit pertama (mobile, cold run):
   ```bash
   lighthouse http://localhost:5173 \
     --output html \
     --output-path ./lighthouse-report.html \
     --chrome-flags="--headless" \
     --preset desktop
   ```

4. Buka file `lighthouse-report.html` di browser untuk melihat hasil lengkap.

### Bagian B — Analisis Metrik (30 menit)

Untuk setiap metrik di bawah, jawab pertanyaan analisis:

**1. First Contentful Paint (FCP)**
- Berapa nilai FCP yang tercatat?
- Apakah sudah di bawah ambang batas "Good" (< 1.8 detik)?
- Apa yang mungkin menyebabkan FCP lambat di aplikasi ini?

**2. Largest Contentful Paint (LCP)**
- Berapa nilai LCP yang tercatat?
- Elemen apa yang menjadi LCP candidate?
- Apa perbedaan strategi loading LCP element vs non-LCP elements?

**3. Total Blocking Time (TBT) & Time to Interactive (TTI)**
- Berapa nilai TBT dan TTI?
- Task panjang mana (long task) yang paling berkontribusi?
- Bagaimana cara kita bisa mengurangi TBT?

**4. Cumulative Layout Shift (CLS)**
- Berapa nilai CLS yang tercatat?
- Ada element apa saja yang menyebabkan layout shift?
- Strategi apa yang bisa dipakai untuk menghilangkan CLS?

**5. Speed Index**
- Apa perbedaan Speed Index vs LCP?
- Mengapa Speed Index bisa berbeda signifikan dari LCP?

### Bagian C — Budget & Thresholds (20 menit)

1. Buat file `lighthouse-budget.json` dengan budget berikut:
   - Performance score minimal: **90**
   - FCP maksimal: **1.5 detik**
   - LCP maksimal: **2.5 detik**
   - TBT maksimal: **200 md**
   - CLS maksimal: **0.1**
   - Bundle size JS maksimal: **300 KB** (untuk initial bundle)

2. Jalankan audit dengan budget:
   ```bash
   lighthouse http://localhost:5173 \
     --budget-path ./lighthouse-budget.json \
     --output json \
     --output-path ./lighthouse-budget-result.json
   ```

3. Analisis hasil budget. Sebutkan metrik mana yang **PASS** dan mana yang **FAIL**.

### Bagian D — Laporan Rekomendasi (25 menit)

Buat laporan dalam format Markdown dengan struktur berikut:

```markdown
# Lighthouse Audit Report — [Nama Aplikasi]

## 1. Ringkasan Eksekutif
[1 paragraph ringkasan kondisi performa saat ini]

## 2. Metrik Utama

| Metrik | Nilai Saat Ini | Target | Status |
|--------|---------------|--------|--------|
| FCP    | ... detik     | < 1.8s | ✅/❌  |
| LCP    | ... detik     | < 2.5s | ✅/❌  |
| TBT    | ... md        | < 200ms| ✅/❌  |
| CLS    | ...           | < 0.1  | ✅/❌  |
| Score  | ...           | >= 90  | ✅/❌  |

## 3. Temuan Utama (Top 3)
[3 temuan paling signifikan dengan severity]

## 4. Rekomendasi Prioritas
[Minimal 5 rekomendasi yang bisa langsung ditindaklanjuti]

## 5. Estimated Impact
[Estimasi perbaikan jika semua rekomendasi diimplementasi]
```

---

## Kriteria Penilaian

| Komponen | Bobot |
|----------|-------|
| Kelengkapan audit CLI dan laporan | 20% |
| Kedalaman analisis setiap metrik | 30% |
| Kelengkapan file budget.json | 15% |
| Kualitas laporan rekomendasi | 25% |
| Pemahaman theoretical concepts | 10% |

---

## Reference

- [Lighthouse scoring calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
- [Web.dev — Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Budgets](https://developer.chrome.com/docs/lighthouse/performance/performance-budgets/)

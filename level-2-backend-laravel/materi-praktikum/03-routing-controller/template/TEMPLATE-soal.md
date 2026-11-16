# TEMPLATE SOAL — Standar Repositori Belajar-Fullstack

> **File ini adalah template, BUKAN soal aktif.** Gunakan format ini sebagai standar
> untuk semua file di `soal/[nomor]-[nama].md` di seluruh repositori.
>
> Dibuat berdasarkan audit 10 soal LEVEL 1 / 01-latihan-html (Juni 2026).
> Mengadopsi praktik terbaik dari soal 08 (SEO & A11y) dan menghindari
> masalah konsisten di soal 01, 06, 07, 09, 10.

---

## Cara Pakai Template Ini

1. **Copy** blok di bawah "===== BATAS COPY =====" ke file baru
2. **Ganti** semua placeholder `{...}` dengan konten soal Anda
3. **Hapus** section "Panduan Penulis" di atas (jangan ikut ke-copy)
4. **Validasi** dengan checklist di akhir template

---

## ===== BATAS COPY — MULAI DARI SINI =====

# SOAL {NOMOR} — {JUDUL SOAL}

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:
- {outcome 1 — kata kerja + objek, misal "Membuat form dengan validasi HTML5"}
- {outcome 2}
- {outcome 3}

**Topik:** `{tag1}`, `{tag2}`, `{atribut1}`, `{atribut2}`

**Referensi utama:**
- [MDN: {Nama Tag}](https://developer.mozilla.org/id/docs/Web/HTML/Element/{tag})
- [MDN: {Nama Tag 2}](https://developer.mozilla.org/id/docs/Web/HTML/Element/{tag2})
- [W3C HTML Validator](https://validator.w3.org/) — untuk cek syntax

**Difficulty:** {Pemula / Menengah / Lanjut} • **Estimasi:** {menit}

---

## Briefing

{2-3 kalimat yang menjelaskan KONTEKS soal — apa yang user bangun dan untuk siapa.
Jangan hanya daftar tag, tapi ceritakan skenario realistis.}

**Contoh tone:** "Buat halaman {X} untuk {Y}. Halaman ini akan {Z}."

---

## Deskripsi

{1-2 kalimat yang merangkum deliverables utama. Ini 'TL;DR' untuk user yang sudah baca
briefing dan mau langsung loncat ke kerjaan.}

---

## Syarat (Acceptance Criteria)

> ⚠️ **Penting**: Checklist di bawah harus bisa di-verify iya/tidak.
> Gunakan kata kerja yang terukur: "ada", "mengandung", "minimal N",
> "tepat satu". Hindari: "baik", "tepat", "rapi", "semantik" (subjektif).

### Struktur Boilerplate
- [ ] `<!DOCTYPE html>` di baris pertama
- [ ] `<html lang="id">`
- [ ] `<head>` dengan `<meta charset="UTF-8">` dan `<meta name="viewport" ...>`
- [ ] `<title>` {kriteria: misal "maksimal 60 karakter"}
- [ ] `<body>` untuk semua konten

### {Section 1 — Topik Utama}
- [ ] {kriteria terukur 1}
- [ ] {kriteria terukur 2, sebutkan "minimal N" atau "tepat satu"}
- [ ] {kriteria terukur 3}

### {Section 2 — Topik Sekunder}
- [ ] {kriteria 1}
- [ ] {kriteria 2}

### {Section 3 — Topik Tersier}
- [ ] {kriteria 1}

---

## Expected Output (Setelah CSS Minimal)

> ℹ️ **Catatan penting**: Ilustrasi di bawah menggambarkan **struktur dan
> susunan elemen** yang diharapkan BUKAN pixel-perfect render. Browser tanpa
> CSS hanya akan menampilkan susunan tag dalam **document flow** natural.
>
> Untuk hasil yang lebih rapi, tambahkan CSS minimal (panduan ada di
> section **CSS Minimal (Opsional)** di bawah).

```
{ASCII art atau deskripsi layout — JELASKAN kalau ASCII tidak bisa
dicapai tanpa CSS. Tambahkan disclaimer!}
```

**Yang akan muncul di browser TANPA CSS:**
- {Penjelasan apa yang user lihat — misal "semua heading auto stack vertikal"}
- {Penjelasan margin/padding default browser}

**Yang akan muncul di browser DENGAN CSS minimal:**
- {Penjelasan improvement}

---

## Panduan Teknis

### Cara Kerja {Topik Utama}
{Jelaskan konsep dengan bahasa sendiri, JANGAN cuma copy dokumentasi MDN.
Tambahkan analogi atau contoh konkret.}

```html
<!-- Contoh minimal yang bisa langsung dijalankan -->
<div>{contoh}</div>
```

### {Sub-topik dengan Atribut Penting}
{Jelaskan kapan pakai, kenapa pilih itu.}

**Pola umum yang bisa di-copy:**

```html
<!-- Pola untuk {use case} -->
<{tag} {atribut1}="{value1}" {atribut2}="{value2}">
  {konten}
</{tag}>
```

**Referensi atribut:**
- `{atribut1}` — {penjelasan 1 kalimat, link MDN}
- `{atribut2}` — {penjelasan 1 kalimat, link MDN}

---

## CSS Minimal (Opsional)

> 💡 **Tujuan**: CSS ini BUKAN untuk latihan CSS. Ini cuma supaya expected
> output lebih kelihatan rapi. Letakkan di `<style>` di dalam `<head>`.

```css
/* Layout dasar yang umum dipakai */
{container} {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
}

/* Jarak antar section */
{section} + {section} {
  margin-top: 2rem;
}
```

**Alternatif tanpa nambah CSS**: Terima tampilan default browser.
Yang penting **struktur dan tag** sudah benar.

---

## Verifikasi Hasil (Wajib Dicek User)

Sebelum submit, cek sendiri:

- [ ] File **bisa dibuka** di browser (double-click, tidak error)
- [ ] **W3C Validator PASS** — cek di https://validator.w3.org/ (paste source code)
- [ ] **Inspect Element** (F12) — tag sesuai, atribut sesuai
- [ ] **DevTools → Network** (kalau ada form) — form action benar
- [ ] **Test interaksi** — klik, submit, hover sesuai harapan

---

## Cara Submit

1. Simpan sebagai `{filename}.html`
2. {Langkah verifikasi 1}
3. {Langkah verifikasi 2}
4. {Langkah submit}

---

## Catatan Penting

- ⚠️ **{Peringatan umum yang sering jadi jebaka pemula}**
- 💡 **{Tips praktis}**
- 📚 **{Referensi untuk perdalam}**

---

## ===== BATAS COPY — SELESAI DI SINI =====

---

## Panduan Penulis Soal (Jangan Dihapus dari File Template)

Saat membuat soal baru, pastikan:

### ✅ WAJIB Ada
- [ ] Acceptance criteria **terukur** (bukan subjektif)
- [ ] Minimal 2 link MDN untuk tag/fitur baru
- [ ] Section "Verifikasi Hasil" supaya user bisa self-check
- [ ] Difficulty tag + estimasi waktu
- [ ] Disclaimer di expected output kalau tidak bisa dicapai tanpa CSS

### ❌ HINDARI
- ASCII art yang **gambar layout mustahil tanpa CSS** (2 kolom, sticky, grid)
- "Gunakan semantic HTML yang tepat" tanpa definisi
- Checklist > 20 item tanpa grouping
- Expected output sebagai **satu-satunya** acuan visual

### 📁 Lokasi File
- Soal: `soal/[nomor 2 digit]-[slug].md` (contoh: `01-form-diri.md`)
- Template kode: `code/[nomor 2 digit]-[slug].html` (lihat `TEMPLATE-code.html`)
- Contoh jadi: `contoh/[nomor 2 digit]-[slug].html` (lihat `TEMPLATE-contoh.html`)

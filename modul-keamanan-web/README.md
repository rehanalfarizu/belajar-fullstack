# Modul Keamanan Aplikasi Web

## Kenapa Modul Ini Penting?

Kebanyakan developer junior bisa bikin aplikasi yang "jalan". Tapi sangat sedikit yang 
paham cara bikin aplikasi yang **aman**. Modul ini akan jadi **pembeda portofoliomu**.

Bayangkan kamu interview, lalu bisa bilang:
> "Di proyek ini saya menerapkan validasi input di client dan server, password di-hash 
> dengan bcrypt, session disimpan di cookie HttpOnly, dan saya sudah cek OWASP Top 10."

Itu langsung menunjukkan kamu bukan developer biasa.

---

## OWASP Top 10 dalam Bahasa Sederhana

OWASP (Open Web Application Security Project) adalah organisasi yang membuat daftar 
10 risiko keamanan web paling umum. Ini versi gampang dimengerti:

| No | Risiko | Artinya |
|----|--------|---------|
| 1 | **Broken Access Control** | User biasa bisa akses halaman admin |
| 2 | **Cryptographic Failures** | Password disimpan tanpa di-hash, data sensitif tidak dienkripsi |
| 3 | **Injection** | Input user langsung masuk ke SQL/command tanpa filter |
| 4 | **Insecure Design** | Arsitektur sistem dari awal sudah salah |
| 5 | **Security Misconfiguration** | Setting default tidak diubah, error message terlalu detail |
| 6 | **Vulnerable Components** | Pakai library lama yang ada bug keamanan |
| 7 | **Identification Failures** | Login bisa di-brute force, session tidak expire |
| 8 | **Software/Data Integrity** | Update tanpa verifikasi, CI/CD bisa disusupi |
| 9 | **Logging Failures** | Tidak ada log, atau log bocorkan data sensitif |
| 10 | **SSRF** | Server bisa dipaksa request ke tempat yang tidak seharusnya |

---

## Urutan Belajar

Kerjakan secara berurutan. Setiap topik membangun di atas topik sebelumnya.

| No | Folder | Topik | Estimasi |
|----|--------|-------|----------|
| 1 | `01-kenapa-keamanan-penting/` | Mindset dan OWASP overview | 2 jam |
| 2 | `02-validasi-input/` | Validasi client & server | 3-4 jam |
| 3 | `03-sql-injection/` | Apa, cara kerja, cara cegah | 4-5 jam |
| 4 | `04-autentikasi-dan-password/` | Hash, session, JWT | 4-5 jam |
| 5 | `05-otorisasi-dan-akses/` | Siapa boleh apa | 3-4 jam |
| 6 | `06-xss-dan-csrf/` | Cross-site attacks | 4-5 jam |
| 7 | `07-konfigurasi-aman/` | Env, headers, dependencies | 3 jam |
| 8 | `08-proyek-akhir-audit/` | Audit aplikasi sendiri | 6-8 jam |

---

## Cara Pakai Modul Ini

Setiap folder topik berisi:

1. **README.md** — Penjelasan konsep dengan bahasa sehari-hari
2. **TUGAS.md** — Apa yang harus dikerjakan, langkah per langkah
3. **CHECKLIST.md** — Daftar "aku sudah bisa..." untuk evaluasi diri
4. **kerjakan-di-sini/** — Folder kerja dengan file kerangka

---

## ⚠️ Peringatan Penting

Lab di modul ini **SENGAJA dibuat rentan** (vulnerable) untuk tujuan belajar.

**JANGAN:**
- Deploy lab ini ke internet
- Gunakan teknik ini untuk menyerang sistem orang lain
- Simpan data asli di lab

**BOLEH:**
- Jalankan di localhost untuk belajar
- Eksperimen dengan berbagai cara exploit
- Perbaiki kerentanan sebagai latihan

Semua yang dipelajari di sini untuk **mempertahankan** aplikasi, bukan menyerang.

---

## Setelah Selesai Modul Ini

Kamu akan bisa:
1. Menjelaskan OWASP Top 10 saat interview
2. Mengaudit aplikasi sendiri dengan checklist keamanan
3. Menulis bagian "Keamanan yang Diterapkan" di README portofolio
4. Menunjukkan bahwa kamu bukan developer yang asal jadi

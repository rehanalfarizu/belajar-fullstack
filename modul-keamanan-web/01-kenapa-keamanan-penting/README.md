# 01 — Kenapa Keamanan Penting?

## Apa yang Dipelajari

Sebelum belajar teknik keamanan, kamu perlu paham **kenapa** ini penting. Banyak 
developer skip bagian ini dan langsung ke coding, tapi tanpa mindset yang benar, 
kamu akan terus membuat kesalahan yang sama.

---

## Analogi: Rumah vs Aplikasi Web

Bayangkan aplikasi web seperti rumah:

| Bagian Rumah | Bagian Aplikasi | Risiko Jika Tidak Aman |
|--------------|-----------------|------------------------|
| Pintu depan | Form login | Orang asing masuk |
| Kunci | Password | Bisa ditebak atau dicuri |
| Jendela | Input field | Bisa dimasuki dari samping |
| Brankas | Database | Data sensitif bocor |
| CCTV | Logging | Tidak tahu siapa yang masuk |
| Pagar | Firewall/rate limit | Serangan massal |

Rumah tanpa kunci = Aplikasi tanpa validasi. Sama-sama mengundang masalah.

---

## Kenapa Penting untuk Kerja?

### 1. Ini Skill yang Dicari

Perusahaan butuh developer yang paham keamanan karena:
- Kebocoran data bisa kena denda miliaran (GDPR, UU PDP)
- Reputasi hancur kalau di-hack
- Biaya perbaikan setelah insiden 10x lebih mahal dari pencegahan

### 2. Pembeda dari Developer Lain

Kebanyakan bootcamp/tutorial TIDAK mengajarkan keamanan. Kalau kamu bisa tunjukkan 
di portofolio, kamu langsung di atas rata-rata.

### 3. Tanggung Jawab Moral

Data user adalah amanah. Kalau kamu simpan password mereka, email, alamat — kamu 
bertanggung jawab menjaganya.

---

## Istilah yang Perlu Diketahui

| Istilah | Arti Singkat |
|---------|--------------|
| **Vulnerability** | Kelemahan/celah di sistem |
| **Exploit** | Cara memanfaatkan vulnerability |
| **Attack surface** | Semua tempat yang bisa diserang |
| **Threat model** | Analisis siapa yang mungkin menyerang dan bagaimana |
| **Defense in depth** | Lapisan keamanan berlapis, bukan cuma satu |
| **Principle of least privilege** | Kasih akses seminimal mungkin |
| **OWASP** | Organisasi yang bikin standar keamanan web |

---

## Mindset Keamanan

### 1. "Trust No Input"
Semua data dari luar (user, API, file) adalah tersangka sampai terbukti bersih.

### 2. "Fail Secure"
Kalau ada error, sistem harus gagal ke kondisi aman, bukan terbuka.

### 3. "Defense in Depth"
Jangan andalkan satu lapisan. Validasi di client? Tetap validasi di server.

### 4. "Least Privilege"
User cuma boleh akses yang dia butuhkan. Admin baru boleh akses fitur admin.

---

## OWASP Top 10 — Overview

OWASP Top 10 adalah daftar 10 risiko keamanan web paling umum. Versi terbaru (2021):

1. **Broken Access Control** — Orang biasa bisa akses data/halaman yang bukan haknya
2. **Cryptographic Failures** — Data sensitif tidak dienkripsi dengan benar
3. **Injection** — Input user masuk ke query/command tanpa filter
4. **Insecure Design** — Arsitektur dari awal sudah salah
5. **Security Misconfiguration** — Setting default, error terlalu detail
6. **Vulnerable Components** — Library lama dengan bug keamanan
7. **Identification Failures** — Login lemah, session tidak expire
8. **Software/Data Integrity** — Update tanpa verifikasi
9. **Logging Failures** — Tidak ada log atau log bocorkan data
10. **SSRF** — Server dipaksa request ke tempat terlarang

Kamu akan belajar sebagian besar dari ini di modul-modul berikutnya.

---

## Studi Kasus Nyata

### Kasus 1: Kebocoran Tokopedia (2020)
- 91 juta data user bocor
- Termasuk email, nama, tanggal lahir
- Dijual di dark web

### Kasus 2: Facebook/Meta (2021)
- 533 juta data user dari 106 negara
- Nomor telepon, nama, lokasi bocor
- Penyebab: API scraping yang tidak dibatasi

### Kasus 3: BPJS Kesehatan (2021)
- 279 juta data WNI diduga bocor
- NIK, nama, alamat, bahkan data kesehatan

**Kesimpulan:** Ini bukan masalah perusahaan kecil. Bahkan raksasa teknologi bisa kena.

---

## Selanjutnya

Di topik berikutnya, kamu akan mulai praktek dengan **Validasi Input** — pertahanan 
pertama dan paling fundamental dalam keamanan web.

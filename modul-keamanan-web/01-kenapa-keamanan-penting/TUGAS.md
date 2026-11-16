# TUGAS — Kenapa Keamanan Penting

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu akan punya:
1. Pemahaman tentang OWASP Top 10
2. Contoh threat model sederhana untuk aplikasi yang pernah kamu buat
3. Daftar "attack surface" dari satu aplikasi

---

## Bagian A: Pelajari OWASP Top 10

### Langkah

1. Buka website resmi OWASP: https://owasp.org/Top10/
2. Baca penjelasan untuk **5 risiko teratas** (nomor 1-5)
3. Untuk setiap risiko, tulis di file `kerjakan-di-sini/01-owasp-catatan.md`:
   - Apa risikonya (1 kalimat)
   - Contoh nyata (bayangkan di aplikasi e-commerce)
   - Cara mencegah (1-2 poin)

### Verifikasi
- [ ] File catatan terisi untuk 5 risiko
- [ ] Bisa menjelaskan tanpa buka catatan

---

## Bagian B: Analisis Attack Surface

### Langkah

1. Pilih satu aplikasi yang pernah kamu buat (atau gunakan contoh: "toko online sederhana")
2. Buka file `kerjakan-di-sini/02-attack-surface.md`
3. Identifikasi semua "pintu masuk" ke aplikasi:
   - Form apa saja?
   - API endpoint apa saja?
   - File upload ada?
   - Parameter URL ada?
4. Untuk setiap pintu masuk, tulis:
   - Apa yang bisa dimasukkan user?
   - Apa yang bisa salah kalau input jahat?

### Verifikasi
- [ ] Minimal 5 pintu masuk teridentifikasi
- [ ] Setiap pintu masuk ada analisis risikonya

---

## Bagian C: Threat Model Sederhana

### Langkah

1. Buka file `kerjakan-di-sini/03-threat-model.md`
2. Jawab pertanyaan-pertanyaan ini untuk aplikasi pilihanmu:

**Aset:**
- Data apa yang sensitif? (password, email, alamat, dsb)
- Fitur apa yang paling kritis?

**Aktor:**
- Siapa yang mungkin menyerang? (hacker random, competitor, insider)
- Apa motivasi mereka?

**Ancaman:**
- Serangan apa yang mungkin terjadi?
- Apa dampaknya kalau berhasil?

**Mitigasi:**
- Apa yang sudah dilakukan untuk mencegah?
- Apa yang masih perlu ditambahkan?

### Verifikasi
- [ ] Semua bagian threat model terisi
- [ ] Minimal 3 ancaman teridentifikasi
- [ ] Ada rencana mitigasi untuk tiap ancaman

---

## Petunjuk Kalau Macet

1. **Tidak paham istilah di OWASP?**
   - Baca README.md dulu untuk penjelasan sederhana
   - Google: "[istilah] explained simply"

2. **Bingung apa attack surface?**
   - Bayangkan dirimu sebagai hacker. Dari mana kamu bisa coba masuk?

3. **Threat model terlalu abstrak?**
   - Mulai dari yang konkret: "Kalau password bocor, apa yang terjadi?"

---

## Cara Mengecek Hasil Sendiri

1. Coba jelaskan OWASP Top 5 ke teman (atau ke kamera HP) tanpa buka catatan
2. Threat model kamu masuk akal? Tanya: "Kalau aku jadi hacker, apa yang akan aku coba?"
3. Attack surface lengkap? Cek: "Ada form/API yang belum dianalisis?"

---

## File yang Perlu Diisi

```
kerjakan-di-sini/
├── 01-owasp-catatan.md     ← Catatan OWASP Top 5
├── 02-attack-surface.md    ← Analisis pintu masuk
└── 03-threat-model.md      ← Threat model sederhana
```

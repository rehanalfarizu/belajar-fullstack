# Catatan Harian Belajar

Template ini untuk mencatat apa yang dipelajari setiap hari. Tujuannya:
1. Melatih menjelaskan dengan kata sendiri
2. Melacak masalah yang berhasil dipecahkan sendiri
3. Membangun kebiasaan refleksi

---

## Template Harian

Copy template di bawah untuk setiap sesi belajar:

```markdown
## [Tanggal] — [Topik]

### Apa yang dipelajari
- ...
- ...

### Konsep yang baru dipahami
(Jelaskan dengan kata sendiri, seolah menjelaskan ke teman)

### Masalah yang dipecahkan sendiri
**Masalah:** 
**Penyebab:**
**Solusi:**
**Cara menemukan:**

### Yang masih bingung
- ...

### Waktu belajar
Mulai: ... | Selesai: ... | Total: ... menit

### Mood & Energi
😊 Semangat / 😐 Biasa / 😫 Capek

### Rencana besok
- ...
```

---

## Contoh Catatan

## 2024-01-15 — HTML Form & Validation

### Apa yang dipelajari
- Atribut `required`, `pattern`, `minlength` di form HTML
- Perbedaan validasi client-side vs server-side
- Cara membuat form accessible dengan `label` dan `aria`

### Konsep yang baru dipahami
Validasi di browser (client-side) itu cuma untuk UX, biar user tahu kesalahan lebih cepat. 
Tapi HARUS tetap validasi di server karena orang bisa bypass form pakai DevTools atau Postman.
Ibarat pintu rumah: kunci di luar (client) bisa dibobol, tapi tetap perlu kunci di dalam (server).

### Masalah yang dipecahkan sendiri
**Masalah:** Form submit tapi data kosong masuk ke console.log
**Penyebab:** Lupa pakai `event.preventDefault()` jadi form reload halaman
**Solusi:** Tambah `event.preventDefault()` di awal handler
**Cara menemukan:** Cek Network tab, lihat ada request GET padahal harusnya tidak ada

### Yang masih bingung
- Kapan pakai `formData` vs ambil manual dari `e.target.elements`?
- Apa bedanya `novalidate` di form vs validasi custom?

### Waktu belajar
Mulai: 19:30 | Selesai: 21:45 | Total: 135 menit

### Mood & Energi
😊 Semangat — akhirnya paham kenapa form suka reload sendiri!

### Rencana besok
- Lanjut soal 04-form-pendaftaran.md
- Coba validasi dengan pattern regex

---

## Catatan Harianmu

(Mulai catat di bawah ini)

---


---

## Log Bug (isi setiap kali memecahkan error)

Satu baris per bug. Ini bahan paling jujur untuk wawancara: "pernah menemukan bug
yang sulit? ceritakan."

| Tanggal | Gejala yang terlihat | Dua hipotesis yang kuuji | Penyebab sebenarnya | Cara menemukannya | Kupecahkan sendiri? (ya/dibantu) |
|---|---|---|---|---|---|
| | | | | | |

---

## Ulasan Mingguan (isi setiap Jumat)

```markdown
## Minggu ke-N (tanggal)

- Soal yang selesai TANPA bantuan AI:
- Soal yang selesai DENGAN bantuan (dan bantuan apa):
- Konsep yang masih gagap kujelaskan:
- Hasil uji tertutup Jumat (lulus / ulangi):
- Yang akan kuulangi minggu depan:
```

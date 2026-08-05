# Kualitas Web: Accessibility, Performa, dan Security

Di Level 1, fokusnya adalah kemampuan platform browser. Framework tidak dapat
memperbaiki HTML yang salah, JavaScript yang memblokir main thread, atau output
yang tidak aman.

## 1. Quality baseline

Halaman harus:

- tetap terbaca tanpa CSS dan memiliki struktur heading yang logis;
- dapat dioperasikan dengan keyboard dan focus terlihat;
- memakai label form, pesan error yang terhubung, serta semantic element;
- responsive tanpa horizontal overflow;
- memberi loading/error/empty/success feedback;
- tidak menghasilkan console error atau broken request.

Accessibility bukan aksesori dan sering memperbaiki maintainability serta UX.

## 2. Model performa browser

Alur sederhana:

```text
DNS/TCP/TLS → HTML → CSSOM + DOM → render tree → layout → paint → composite
                                      ↘ JavaScript pada main thread
```

JavaScript panjang, layout berulang, font, dan gambar besar dapat menunda tampilan
atau interaksi. Network request memiliki latency; mengurangi byte saja tidak selalu
mengurangi round trip.

### Praktik dasar

- pilih format dan dimensi gambar sesuai kebutuhan;
- isi `width` dan `height` untuk mengurangi layout shift;
- lazy-load gambar di bawah fold, bukan hero/LCP image;
- gunakan responsive images (`srcset`/`sizes`) bila relevan;
- minimalkan third-party script;
- hindari loop CPU panjang dan pecah pekerjaan besar;
- jangan membaca layout lalu menulis style berulang dalam loop;
- gunakan cache headers pada asset versioned ketika sudah masuk backend/deploy.

### Ukuran yang dipakai

Core Web Vitals saat ini berfokus pada LCP, INP, dan CLS. Ukur data lapangan untuk
pengalaman user; gunakan Lighthouse/DevTools sebagai alat diagnosis. Untuk latihan:

```text
LCP ≤ 2,5 detik pada persentil ke-75
INP ≤ 200 ms pada persentil ke-75
CLS ≤ 0,1 pada persentil ke-75
JavaScript awal sesuai budget proyek
```

Angka lab satu laptop bukan bukti seluruh pengguna memenuhi target.

## 3. Input, output, dan XSS

Semua data eksternal dianggap tidak dipercaya: form, URL, storage, API, file, dan
third-party script. Validasi menjawab apakah data sesuai kontrak; output encoding
memastikan data tetap diperlakukan sebagai data pada konteks HTML/URL/JS/CSS.

```javascript
// Aman untuk teks
element.textContent = userInput;

// Berisiko: input dapat menjadi markup/script
element.innerHTML = userInput;
```

Jangan membangun HTML dengan string dari pengguna. Bila aplikasi memang menerima
rich text, gunakan sanitizer yang terawat dan konfigurasi allowlist.

## 4. URL dan navigasi

Validasi protocol serta tujuan URL. Nilai `javascript:` atau origin yang tidak
diharapkan tidak boleh menjadi link/redirect.

```javascript
function safeHttpUrl(input, base = window.location.origin) {
  const url = new URL(input, base);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Protocol tidak diizinkan");
  }
  return url;
}
```

Tab eksternal dengan `target="_blank"` perlu perilaku `noopener` pada browser
lama/lingkungan tertentu. Jangan memasukkan secret ke query string karena dapat
masuk history, log, analytics, dan referrer.

## 5. Browser storage dan authentication

`localStorage` cocok untuk preferensi non-sensitif seperti tema. JavaScript pada
origin dapat membacanya, sehingga jangan menyimpan token autentikasi browser di
sana. Authorization tidak pernah dipercayakan pada UI; server harus memeriksa
setiap aksi.

## 6. Content Security Policy

CSP membatasi sumber script/style/resource dan membantu mengurangi dampak XSS.
Ia lapisan tambahan, bukan pengganti encoding/sanitization. Mulai dengan
`Content-Security-Policy-Report-Only`, analisis pelanggaran, lalu terapkan policy
nonce/hash tanpa `unsafe-inline` bila arsitektur memungkinkan.

## Checklist review Level 1

- [ ] HTML semantic, label, focus, keyboard, contrast.
- [ ] Tidak ada `innerHTML`, `eval`, atau inline handler tanpa alasan/review.
- [ ] URL eksternal divalidasi dan tidak membawa secret.
- [ ] Dependency/script eksternal minimal dan sumbernya diketahui.
- [ ] Gambar memiliki dimensi dan strategi loading yang tepat.
- [ ] Baseline network, LCP, INP, dan CLS tersimpan.
- [ ] Perubahan optimasi diuji agar tidak merusak accessibility/correctness.
- [ ] Negative test memasukkan markup, URL aneh, data sangat panjang, dan Unicode.

## Referensi resmi

- [Core Web Vitals](https://web.dev/articles/vitals)
- [Workflow pengukuran Web Vitals](https://web.dev/articles/vitals-tools)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP)
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/0x00_2025-Introduction/)

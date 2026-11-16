# Catatan Belajar — XSS dan CSRF

## Bagian A: Eksperimen XSS (`01-xss-lab.html`)

| No | Input yang kamu kirim | Kolom (nama/isi) | Apa yang terjadi? |
|----|-----------------------|------------------|-------------------|
| 1 | `Halo semua!` | isi | <!-- TODO(human) --> |
| 2 | `<b>tebal</b>` | isi | <!-- TODO(human) --> |
| 3 | `<script>alert('xss')</script>` | isi | <!-- TODO(human) --> |
| 4 | `<img src=x onerror="alert('xss')">` | isi | <!-- TODO(human) --> |
| 5 | <!-- TODO(human): percobaanmu sendiri --> | <!-- TODO(human) --> | <!-- TODO(human) --> |

**Kenapa nomor 3 dan nomor 4 hasilnya beda?** (petunjuk: cari "innerHTML script tag not executed" di MDN, bagian Security considerations di halaman `Element.innerHTML`)

<!-- TODO(human): jawabanmu -->

**Kalau payload-nya bukan `alert` tapi kode yang membaca `document.cookie` lalu mengirimnya ke tempat lain, apa akibatnya? Apa hubungannya dengan opsi `httpOnly` di modul 04?**

<!-- TODO(human): jawabanmu -->

**Lab ini termasuk XSS jenis apa (stored, reflected, atau DOM)? Dan `02-xss-fix.js` sebelum diperbaiki termasuk jenis apa?**

<!-- TODO(human): jawabanmu -->

## Bagian B: Perbaikan XSS (`02-xss-fix.js`)

**Hasil `node 02-xss-fix.js --cek`:**

<!-- TODO(human): berapa yang lulus di percobaan pertama? apa yang kamu perbaiki? -->

**Kenapa escape dilakukan saat menampilkan, bukan saat menyimpan ke database?**

<!-- TODO(human): jawabanmu -->

**Kalau komentar ditampilkan lewat JavaScript di browser (seperti `01-xss-lab.html`), cara memperbaikinya apa? Kenapa `textContent` aman sedangkan `innerHTML` tidak?**

<!-- TODO(human): jawabanmu -->

**Eksperimen CSP: header apa yang kamu pasang, dan pesan apa yang muncul di Console DevTools saat payload diblokir?**

<!-- TODO(human): tempel pesan error-nya -->

## Bagian C: Eksperimen CSRF (`03-csrf-server.js`)

Browser yang dipakai: <!-- TODO(human) -->

| Eksperimen | Halaman penyerang dibuka di | Sebelum diperbaiki: saldo berkurang? | Setelah diperbaiki: status? |
|------------|-----------------------------|--------------------------------------|-----------------------------|
| 2 | `http://127.0.0.1:3062` | <!-- TODO(human) --> | <!-- TODO(human) --> |
| 3 | `http://localhost:3062` | <!-- TODO(human) --> | <!-- TODO(human) --> |
| Form asli bank | `http://127.0.0.1:3060` | (harus berhasil) | <!-- TODO(human): harus tetap berhasil --> |

**Lihat log terminal saat transfer. Header `Origin` dari form asli dan dari halaman penyerang isinya apa?**

<!-- TODO(human): jawabanmu -->

**Kenapa eksperimen 2 dan 3 bisa beda hasilnya? Apa arti "same-site" dan kenapa port tidak dihitung?**

<!-- TODO(human): jawabanmu -->

**Setelah memasang `sameSite`, kenapa CSRF token tetap perlu?**

<!-- TODO(human): jawabanmu -->

**Kenapa halaman penyerang tidak bisa membaca CSRF token dari halaman bank?** (petunjuk: cari "Same-origin policy" di MDN)

<!-- TODO(human): jawabanmu -->

## Bug yang Aku Temui

<!-- TODO(human): error apa yang muncul dan bagaimana kamu menemukan penyebabnya -->

## Refleksi

Satu kalimat untuk dirimu di masa depan tentang XSS, dan satu kalimat tentang CSRF.

<!-- TODO(human): tulis refleksimu -->

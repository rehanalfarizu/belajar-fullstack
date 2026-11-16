# Catatan Belajar — Konfigurasi Aman

## Bagian A: Environment Variables

**Cara yang kamu pilih untuk memuat `.env` (`--env-file` atau `process.loadEnvFile()`), dan kenapa:**

<!-- TODO(human): jawabanmu -->

**Hasil `git check-ignore -v .env`:**

```text
TODO(human): tempel output-nya di sini
```

**Apa yang terjadi kalau `.env` kosong atau salah satu variable tidak diisi? Apakah server-mu berhenti dengan pesan jelas?**

<!-- TODO(human): jawabanmu -->

**Misal kamu tidak sengaja sudah commit secret asli ke GitHub, lalu commit lagi untuk menghapusnya. Apakah secret itu sudah aman? Langkah apa yang benar?**

<!-- TODO(human): jawabanmu -->

## Bagian B: Security Headers

Bandingkan output `curl -i http://127.0.0.1:3070/` sebelum dan sesudah memasang helmet.

| Header | Sebelum | Sesudah | Artinya (dari MDN, pakai kata-katamu) |
|--------|---------|---------|---------------------------------------|
| `X-Powered-By` | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |
| <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |
| <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |
| <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |

**Apa yang helmet lakukan dengan `X-XSS-Protection`, dan kenapa?**

<!-- TODO(human): jawabanmu -->

## Bagian C: Dependency Audit

Jalankan `npm audit` di folder `kerjakan-di-sini/` (dan kalau mau, di folder lab modul lain).

**Ringkasan output `npm audit`:**

```text
TODO(human): tempel ringkasannya (jumlah low/moderate/high/critical)
```

| Paket | Tingkat | Masalahnya apa | Bisa di-fix? | Kalau tidak, kenapa? |
|-------|---------|----------------|--------------|----------------------|
| <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> | <!-- TODO(human) --> |

Kalau hasilnya "found 0 vulnerabilities", tulis itu. Lalu jawab: apakah "0 vulnerabilities" berarti aplikasimu aman?

<!-- TODO(human): jawabanmu -->

**Apa beda `npm audit fix` dan `npm audit fix --force`? Kenapa `--force` perlu hati-hati?**

<!-- TODO(human): jawabanmu -->

## Bagian D: Error Handling

**Response `GET /api/produk/1` sebelum diperbaiki:**

```json
TODO(human): tempel di sini, lalu tandai info apa saja yang berguna untuk penyerang
```

**Response sesudah diperbaiki:**

```json
TODO(human): tempel di sini
```

**Log di terminal sesudah diperbaiki (pastikan requestId-nya sama dengan yang di response):**

```text
TODO(human): tempel di sini
```

## Route `/debug/config`

**Kamu pilih (a) hapus atau (b) hanya di development? Alasannya:**

<!-- TODO(human): jawabanmu -->

## Log yang Aman

**Isi log `POST /api/login` sebelum dan sesudah diperbaiki:**

<!-- TODO(human): tempel keduanya -->

**Kamu pakai pendekatan "blocklist" (hapus field terlarang) atau "allowlist" (catat field yang boleh saja)? Kenapa?**

<!-- TODO(human): jawabanmu -->

## Refleksi

Sebelum deploy project berikutnya, cek apa saja yang akan kamu lakukan? Tulis versi checklist-mu sendiri (boleh beda dari README).

<!-- TODO(human): tulis refleksimu -->

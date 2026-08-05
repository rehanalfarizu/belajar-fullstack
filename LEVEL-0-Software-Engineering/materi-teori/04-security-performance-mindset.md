# Mindset Security dan Performa

Di Level 0, targetnya bukan menghafal tool pentest atau micro-optimization.
Targetnya mengenali risiko, membangun hipotesis, dan mengukur sistem dengan aman.

## Security adalah pengelolaan risiko

Tiga tujuan dasar:

- **Confidentiality:** data hanya terlihat oleh pihak yang berhak.
- **Integrity:** data dan kode tidak berubah tanpa izin.
- **Availability:** layanan tersedia ketika dibutuhkan.

Tambahkan privacy, safety, auditability, dan compliance bila domain memerlukannya.
Tidak semua data sama nilainya; klasifikasikan public, internal, confidential,
atau highly sensitive.

## Asset, actor, dan trust boundary

Asset dapat berupa password, source code, data pengguna, saldo, reputasi, atau
ketersediaan layanan. Actor bisa pengguna normal, admin, dependency, insider,
bot, atau attacker.

Trust boundary adalah titik ketika data berpindah ke komponen dengan tingkat
kepercayaan berbeda:

```text
Internet → browser → API → database
                    ↘ third-party service
```

Setiap boundary membutuhkan validasi, authentication bila perlu, authorization,
timeout, serta logging yang aman.

## Secret hygiene

- Secret tidak ditulis di source code, screenshot, chat, issue, atau log.
- `.env` membantu konfigurasi lokal, bukan secret manager production.
- Gunakan nilai berbeda per environment dan least privilege.
- Rencanakan rotation dan revocation sebelum kebocoran terjadi.
- Jika secret ter-commit, menghapus baris tidak cukup: cabut/rotate secret dan
  periksa history serta akses yang terjadi.

## Performa adalah waktu dan resource

Empat resource utama: CPU, memory, disk/storage, dan network. Latency menjawab
“berapa lama satu pekerjaan”; throughput menjawab “berapa banyak pekerjaan per
waktu”. Optimasi satu dapat memperburuk yang lain.

Gunakan Big-O untuk pertumbuhan, lalu benchmark untuk kenyataan. Benchmark harus
memiliki input, environment, warm-up, jumlah percobaan, distribusi, dan baseline.
Jangan membandingkan dua hasil dari kondisi berbeda.

## Failure budget sederhana

Tulis target sebelum optimasi:

```text
Command memproses 100.000 baris < 2 detik
Memory puncak < 200 MB
Tidak mengubah urutan hasil
Input invalid menghasilkan exit code non-zero
```

Correctness adalah constraint. Program salah yang berjalan cepat tetap salah.

## Eksperimen aman

- Gunakan data sintetis; jangan menguji payload berbahaya pada sistem orang lain.
- Buat backup/snapshot dan target eksplisit sebelum eksperimen destruktif.
- Jalankan security lab hanya di aplikasi milik sendiri atau yang memiliki izin.
- Catat perintah, waktu, hasil, dan cara recovery.

## Uji penguasaan

Ambil aplikasi catatan sederhana. Gambar data flow, sebutkan lima asset, lima
failure mode, tiga kemungkinan abuse case, dan metric untuk mendeteksi masing-masing.
Lalu pilih satu bottleneck, buat benchmark, ubah satu hal, dan buktikan hasilnya.

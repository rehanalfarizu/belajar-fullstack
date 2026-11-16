# Praktikum 10 — Deploy dan Hosting

## Ini Tentang Apa?

Aplikasi yang jalan di laptop belum berguna kalau orang lain tidak bisa
membukanya. Topik ini membahas langkah terakhir: membawa toko kamu ke server
dengan aman, tanpa membocorkan rahasia dan tanpa membuat situs mati di tengah
jalan.

Teori lengkapnya: [Materi Teori 10 — Deploy dan Hosting](../../materi-teori/10-deploy-hosting/README.md).

## Analogi

Deploy itu seperti **membuka cabang toko baru**. Barang dan rak (kode) dipindah.
Kunci brankas (`.env`) dibuat baru di tempat itu, bukan difotokopi dari toko
lama. Papan "Tutup Sebentar" dipasang selama penataan (maintenance mode). Dan
pintu belakang yang dipakai tukang (debug) dikunci sebelum toko dibuka.

## Kenapa Penting Buat Kerja?

- Developer yang bisa deploy sendiri lebih cepat dipercaya di tim kecil dan startup.
- Insiden paling umum di dunia nyata: `.env` ikut ke GitHub dan `APP_DEBUG=true` di production.
- Pewawancara sering bertanya: "Apa yang kamu cek sebelum deploy?" Jawabanmu di sini adalah daftar itu.

## Daftar Soal

| # | Soal | Level | Fokus |
|---|---|---|---|
| 01 | [Production Readiness dan Deployment](soal/01-production-readiness.md) | Menengah | checklist `APP_ENV`, `APP_DEBUG`, `APP_KEY`, exit code |
| 02 | [`.env` dan Rahasia](soal/02-env-dan-rahasia.md) | Menengah | `.gitignore`, `git ls-files`, masking, rotasi rahasia |
| 03 | [`APP_DEBUG` dan Script Deploy](soal/03-app-debug-dan-deploy-script.md) | Lanjut | halaman 500, `bash` strict mode, `trap`, `DRY_RUN` |

Langkah kerja ada di [TUGAS.md](TUGAS.md). Ukur pemahamanmu di
[CHECKLIST.md](CHECKLIST.md). Setelah semua selesai, lanjut ke
[tutorial end-to-end](../../tutorial/README.md).

## Hubungan dengan Modul Keamanan

- [Modul 07 — Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md):
  debug mode, rahasia, header, dan konfigurasi production.
- [Modul 08 — Proyek Akhir Audit](../../../modul-keamanan-web/08-proyek-akhir-audit/README.md):
  mengaudit aplikasimu sendiri.

## Glosarium

| Istilah | Arti |
|---|---|
| **Production** | Server yang dipakai pengguna sungguhan |
| **Staging** | Server tiruan production untuk uji coba terakhir |
| **`.env`** | File konfigurasi lokal berisi rahasia; tidak masuk Git |
| **`.env.example`** | Daftar nama variabel tanpa nilai rahasia; masuk Git |
| **`APP_DEBUG`** | Saklar halaman error detail; harus `false` di production |
| **Rotate** | Mengganti rahasia lama dengan yang baru karena sudah bocor |
| **Maintenance mode** | Situs menampilkan 503 sementara selama deploy |
| **`optimize`** | Perintah artisan yang menyimpan cache config, route, view, event |
| **Exit code** | Angka hasil program; `0` sukses, selain itu gagal |
| **`DRY_RUN`** | Mode latihan: hanya mencetak perintah, tidak menjalankannya |
| **Rollback** | Kembali ke versi sebelumnya saat deploy bermasalah |

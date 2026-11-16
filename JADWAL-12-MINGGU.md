# Jadwal 12 Minggu: Putaran 1 (Laravel + Vue)

Mulai **Senin, 16 November 2026**. Berakhir sekitar **7 Februari 2027**, dengan
minggu ke-12 sebagai cadangan. Putaran 2 (Node + React) menyusul sesudahnya.

Jadwal ini dibuat untuk satu masalah utama: kamu sudah pernah membuat halaman
web dengan JavaScript, tapi masih dibantu AI. Jadi tujuannya bukan menambah
pengetahuan, melainkan **bisa mengerjakan sendiri** dan bisa menjelaskannya.

## Dua putaran, bukan empat jalur sekaligus

| Putaran | Stack | Waktu | Tujuan |
|---|---|---|---|
| 1 (dalam) | Laravel + Vue | Nov 2026 – awal Feb 2027 | Paham konsepnya sampai tuntas |
| 2 (penerjemahan) | Node/Express + React | Feb – Apr 2027 | Menerjemahkan konsep yang sama, jauh lebih cepat |

Laravel dan Node mengajarkan konsep yang sama (routing, middleware, validasi,
autentikasi). Vue dan React juga. Di putaran 2 kamu mengisi
[PETA-PADANAN.md](PETA-PADANAN.md) sambil jalan, dan itu yang membuat konsepnya
terpisah dari sintaksnya.

## Aturan pemakaian AI (baca dulu, ini yang paling penting)

Masalahmu bukan kurang materi, tapi terlalu cepat meminta bantuan. Aturannya
tiga lapis:

1. **Saat mengerjakan soal: tidak boleh.** Tulis versimu sendiri dulu, walau
   jelek dan salah. Rasa buntu itu bagian dari belajarnya.
2. **Kalau buntu: boleh bertanya, tapi bukan meminta jawaban.** Syaratnya kamu
   sudah menulis minimal **dua hipotesis** dan menguji keduanya. Minta AI
   mengajukan pertanyaan, memberi satu petunjuk, atau membuat kasus uji. Jangan
   minta kode jadi.
3. **Setelah soal selesai dan jalan: boleh.** Minta review kode, minta dicarikan
   kasus tepi yang terlewat, atau minta dijelaskan perbedaan antara versimu dan
   `contoh/`.

Ukuran jujurnya: di akhir tiap minggu, soal apa yang kamu selesaikan **tanpa**
bantuan? Catat jumlahnya. Angka itu yang harus naik.

## Ritme mingguan (sekitar 25 jam)

| Hari | Isi |
|---|---|
| Senin – Kamis | 2 blok × 2–2,5 jam: teori singkat, lalu soal. Tutup materi sebelum mengerjakan |
| Jumat | Ulangi materi minggu ini **tanpa catatan** + uji tertutup 45 menit |
| Sabtu | Kerjakan proyek (lihat kolom "Proyek" di tabel) |
| Minggu | Libur, atau isi `CATATAN-HARIAN.md` dan log bug |

Tiap awal sesi, 10–15 menit untuk mengulang materi kemarin dan materi 3 hari
lalu dari ingatan. Ini pengulangan berjarak: lebih ampuh daripada membaca ulang.

## Jadwal Putaran 1

Kolom "Materi" menaut ke `TUGAS.md` tiap topik: di sana ada soal, file yang
diedit, dan cara mengeceknya.

| Mgg | Tanggal | Materi | Proyek / hasil |
|---|---|---|---|
| 1 | 16–22 Nov | **Ukur dulu tanpa AI**: placement test di [PANDUAN_BELAJAR.md](PANDUAN_BELAJAR.md). Lalu [Git dasar](level-0-dasar-engineering/materi-git-github/materi-praktikum/01-git-dasar/TUGAS.md), [Git branching](level-0-dasar-engineering/materi-git-github/materi-praktikum/02-git-branching/TUGAS.md), [HTML](level-1-dasar-web/materi-praktikum/01-latihan-html/TUGAS.md) soal 01–05. Baca [kenapa keamanan penting](modul-keamanan-web/01-kenapa-keamanan-penting/README.md) | Hasil placement test ditulis jujur di `CATATAN-HARIAN.md` |
| 2 | 23–29 Nov | HTML soal 06–10, [CSS](level-1-dasar-web/materi-praktikum/02-latihan-css/TUGAS.md) soal 01–05 | Mulai halaman portofolio statis |
| 3 | 30 Nov–6 Des | CSS soal 06–10, [JavaScript](level-1-dasar-web/materi-praktikum/03-latihan-javascript/TUGAS.md) soal 01–05 | Portofolio statis responsif |
| 4 | 7–13 Des | JavaScript soal 06–10 (async, error), [TypeScript dasar](level-1-dasar-web/materi-praktikum/04-latihan-typescript/TUGAS.md), [validasi input](modul-keamanan-web/02-validasi-input/TUGAS.md) | **Portofolio #1 di-deploy** (GitHub Pages). Mulai kirim lamaran magang |
| 5 | 14–20 Des | Laravel: [PHP dasar](level-2-backend-laravel/materi-praktikum/01-php-dasar/TUGAS.md), [setup](level-2-backend-laravel/materi-praktikum/02-setup-laravel/TUGAS.md), [routing + controller](level-2-backend-laravel/materi-praktikum/03-routing-controller/TUGAS.md) | Proyek kembar: mulai API katalog produk |
| 6 | 21–27 Des | Laravel: [Blade](level-2-backend-laravel/materi-praktikum/04-blade-template/TUGAS.md), [migration](level-2-backend-laravel/materi-praktikum/05-database-migration/TUGAS.md), [Eloquent](level-2-backend-laravel/materi-praktikum/06-eloquent-orm/TUGAS.md). Keamanan: [SQL injection](modul-keamanan-web/03-sql-injection/TUGAS.md) | Katalog produk punya database dan model |
| 7 | 28 Des–3 Jan | Laravel: [form + validasi](level-2-backend-laravel/materi-praktikum/07-form-validasi/TUGAS.md), [autentikasi](level-2-backend-laravel/materi-praktikum/08-autentikasi/TUGAS.md). Keamanan: [autentikasi](modul-keamanan-web/04-autentikasi-dan-password/TUGAS.md), [otorisasi](modul-keamanan-web/05-otorisasi-dan-akses/TUGAS.md) | Login dan kepemilikan data yang aman |
| 8 | 4–10 Jan | Laravel: [REST API](level-2-backend-laravel/materi-praktikum/09-rest-api/TUGAS.md), [deploy](level-2-backend-laravel/materi-praktikum/10-deploy-hosting/TUGAS.md). Vue: [teori 01–03](level-3-frontend-vue/materi-teori/README.md) | **API Laravel selesai** |
| 9 | 11–17 Jan | Vue: soal 01–08 di [TUGAS Vue](level-3-frontend-vue/materi-praktikum/TUGAS.md) (reaktivitas, props/emit, lifecycle, composable, router). Keamanan: [XSS dan CSRF](modul-keamanan-web/06-xss-dan-csrf/TUGAS.md) | Mulai UI Vue untuk API-mu |
| 10 | 18–24 Jan | Vue: soal 09–11 (Pinia, HTTP, render aman). Teori [CORS dan cookie](level-4-fullstack-integrasi/materi-teori/02-cors-cookies/README.md), [auth fullstack](level-4-fullstack-integrasi/materi-teori/03-auth-fullstack/README.md) | Vue memanggil API Laravel dengan login |
| 11 | 25–31 Jan | Teori [deployment](level-4-fullstack-integrasi/materi-teori/05-deployment/README.md). Keamanan: [konfigurasi aman](modul-keamanan-web/07-konfigurasi-aman/TUGAS.md), [audit aplikasi sendiri](modul-keamanan-web/08-proyek-akhir-audit/TUGAS.md) | **Portofolio utama di-deploy** + laporan audit + README "Keamanan yang Diterapkan" |
| 12 | 1–7 Feb | **Cadangan.** Revisi jurnal bila ada, ulangi topik yang lemah, uji tertutup besar | Siap lamar dan siap putaran 2 |

Catatan penting soal modul keamanan 02–05: lab-labnya ditulis dengan Node/Express
dan bisa dijalankan apa adanya. Kerjakan lab-nya untuk **melihat serangan dan
perbaikannya**, lalu terapkan konsep yang sama di proyek Laravel-mu. Itu sudah
satu langkah penerjemahan kecil.

Catatan soal Level 4: materi teorinya berlaku untuk Laravel + Vue (cookie
`HttpOnly`, CORS, CSRF), tapi contoh kodenya memakai Node dan React. Pakai sebagai
teori, lalu terapkan sendiri di proyekmu.

## Titik periksa tiap akhir fase

Tiap Jumat jalankan uji tertutup 45 menit: tutup semua materi, kerjakan satu soal
kecil dari topik minggu itu, lalu isi `CHECKLIST.md` dengan jujur.

- Semua item **Pemahaman Konsep** tercentang dan soal uji jalan sendiri:
  lanjut.
- Kurang dari sekitar 70%: ulangi topik itu 2–3 hari sebelum lanjut. Minggu 12
  memang disiapkan untuk menampung ini.

Sesudah minggu 4, 8, dan 11, tulis satu paragraf di `CATATAN-HARIAN.md`:
"Kalau diminta menjelaskan ini ke teman, bagian mana yang gagap?"

## Putaran 2 (Februari – April 2027), garis besar

| Bulan | Isi |
|---|---|
| Februari | [Node + Express](level-2-backend-nodejs/materi-praktikum/01-latihan-nodejs/TUGAS.md), SQL, autentikasi. Bangun ulang **API katalog yang sama** dengan Node |
| Maret | [React](level-3-frontend-react/materi-praktikum/01-latihan-react/TUGAS.md): komponen, hooks, router, state, form. Bangun ulang **UI yang sama** dengan React |
| April | [Level 4](level-4-fullstack-integrasi/README.md) versi Node + React, lalu pilih bagian dari [Level 5](level-5-expert/README.md): Docker, CI/CD, testing |

Isi [PETA-PADANAN.md](PETA-PADANAN.md) selama putaran 2. Semua tugas putaran 2
lebih cepat karena kamu hanya menerjemahkan, bukan belajar dari nol.

## Kalau jadwal meleset

Hampir pasti ada minggu yang meleset. Aturannya:

1. **Potong fitur proyek, bukan modul keamanannya.** Proyek kecil yang aman lebih
   bagus daripada proyek besar yang rapuh.
2. Jangan menambah jam belajar sampai larut. Tidur cukup memengaruhi daya ingat.
3. Pakai minggu 12 untuk menutup selisih, jangan menggeser semuanya.

## Kalau reviewer jurnal membalas

Revisi biasanya diminta cepat. Hentikan sementara jadwal ini, kerjakan revisinya,
lalu lanjutkan dari titik yang sama. Jangan mengejar ketertinggalan dengan
menggandakan jam belajar di hari berikutnya.

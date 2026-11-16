<!-- markdownlint-disable MD024 MD028 -->

# SOAL 08 — Vue Router: Halaman Publik dan Halaman Terlindungi

## Tujuan Pembelajaran

Setelah selesai, kamu akan mampu:

- Mendefinisikan route dengan `createRouter` dan `createWebHistory`
- Memakai `RouterLink` dan `RouterView`
- Memuat halaman secara lazy dengan dynamic import
- Menandai route yang butuh login lewat `meta`
- Menulis navigation guard `beforeEach` yang me-redirect dan mengingat tujuan awal
- Menjelaskan kenapa guard di frontend **bukan** keamanan

**Difficulty:** Menengah • **Estimasi:** 90-120 menit

---

## Briefing

Bayangkan gedung kantor. Ada lobi (Home) yang bebas dimasuki siapa saja, meja
resepsionis (Login), dan ruang kerja (Dashboard) yang butuh kartu akses.
Satpam di lobi (router guard) bertugas mengarahkan tamu: "Mas, belum punya
kartu? Ke resepsionis dulu ya. Nanti saya antar ke ruangan yang tadi mau
dituju."

Tapi ingat: satpam lobi cuma mengarahkan. Kalau ada orang lewat pintu
belakang, yang menjaga ruang kerja adalah **kunci di pintu ruang kerja itu
sendiri** (server). Ini pelajaran paling penting di soal ini.

Target versi: Vue Router 5. Untuk materi ini API-nya sama dengan Vue Router 4.

---

## Cara Kerja Latihan Ini

1. **Baca teori dulu** — [Vue Router](../../materi-teori/05-vue-router/README.md)
   dan sekilas [Pinia dan HTTP](../../materi-teori/06-pinia-dan-http/README.md)
2. **Buka starter** — `level-3-frontend-vue/materi-praktikum/code/08-router.js`
   ([buka file](../code/08-router.js)), cari semua `TODO(human)`
3. **Siapkan project** — ikuti [TUGAS.md](../TUGAS.md). Saat `npm create vue@latest`,
   **pilih Router dan Pinia**. Starter ini menggantikan isi `src/router/index.js`
4. **Ketik sendiri** — termasuk tiga view dan auth store
5. **Verifikasi** — pakai checklist tiap bagian

Kamu **tidak akan diberi kode jadi**.

---

## Bagian A: Tiga View Sederhana

### Penjelasan

View adalah komponen yang mewakili satu halaman. Isinya tidak perlu rumit.
Yang penting kamu punya tiga halaman untuk dicoba.

### Wajib Ada di Kode Kamu

- `src/views/HomeView.vue` — judul + link ke Dashboard
- `src/views/LoginView.vue` — tombol "Masuk (pura-pura)"
- `src/views/DashboardView.vue` — judul + tombol Logout
- Tiap file punya `<script setup>` dan `<template>`

### Cara Mengerjakan

1. Buat ketiga file di `src/views/`
2. Di `App.vue`, taruh navigasi dengan `RouterLink` dan satu `RouterView`

### Verifikasi

- [ ] Tiga file ada dan tidak error saat dibuka
- [ ] `App.vue` punya `RouterView`

---

## Bagian B: Auth Store Mini (Pinia)

### Penjelasan

Guard butuh tahu "user sudah login atau belum". Info itu dipakai banyak
tempat (guard, navbar, dashboard), jadi cocok disimpan di store Pinia.

Ini login **pura-pura**. Tidak ada password, tidak ada server. Tujuannya
hanya melatih alur router. Login sungguhan dibahas di Level 2 dan modul
keamanan.

### Wajib Ada di Kode Kamu

- `src/stores/auth.js` berisi setup store bernama `auth`
- State: status login (boolean) atau data user (null kalau belum login)
- Getter/computed `isAuthenticated`
- Action `login()` dan `logout()`

### Cara Mengerjakan

1. Lihat bentuk setup store di teori Pinia
2. Tulis store dengan satu state, satu computed, dua fungsi
3. Tombol di LoginView memanggil `login()`, tombol di DashboardView memanggil
   `logout()`

### Verifikasi

- [ ] Vue DevTools tab Pinia menampilkan store `auth`
- [ ] Klik login/logout mengubah state di DevTools

---

## Bagian C: Definisi Route + Lazy Loading

### Penjelasan

Route adalah daftar "alamat → halaman". Home dan Login di-import biasa karena
sering dibuka. Dashboard dimuat **lazy**: kodenya baru diunduh saat user
benar-benar ke sana. Analogi: kamu tidak bawa semua buku ke kampus, cuma yang
dipakai hari itu.

`meta` adalah "stiker" yang kamu tempel ke route, misal stiker "butuh login".
Guard nanti membaca stiker ini.

### Wajib Ada di Kode Kamu

- Tiga route: `/`, `/dashboard`, `/login`, masing-masing punya `name`
- Dashboard memakai dynamic import (fungsi yang mengembalikan `import(...)`)
- Dashboard punya `meta` yang menandai butuh login

### Cara Mengerjakan

1. Isi TODO di array `routes`
2. Jangan import DashboardView di atas file
3. Jalankan `npm run build` dan lihat daftar file di folder `dist/assets`

### Verifikasi

- [ ] Navigasi lewat `RouterLink` tidak me-reload halaman (Network tidak memuat
      ulang `index.html`)
- [ ] Di Network, file JS dashboard baru muncul saat pertama kali ke `/dashboard`
- [ ] Hasil build punya file chunk terpisah untuk dashboard

---

## Bagian D: Guard yang Mengingat Tujuan

### Penjelasan

`beforeEach` jalan sebelum setiap perpindahan halaman. Di Vue Router modern,
guard cukup **mengembalikan nilai**:

- `true` (atau tidak return apa-apa) → boleh lanjut
- `false` → batal pindah
- lokasi route (misal object berisi `name` dan `query`) → belok ke sana

Starter saat ini selalu return `true`, jadi semua orang bisa masuk Dashboard.
Tugasmu mengubahnya: kalau route butuh login dan user belum login, arahkan ke
Login sambil membawa alamat asal sebagai query `redirect`. Setelah login,
LoginView membaca query itu dan mengarahkan user kembali.

Hindari pola lama memanggil `next()`. Dokumentasi resmi sekarang menyarankan
pola return value.

### Wajib Ada di Kode Kamu

- Guard membaca status dari auth store (bukan variabel hardcode)
- User belum login yang ke `/dashboard?tab=laporan` diarahkan ke
  `/login?redirect=...` dengan alamat lengkap (termasuk query `tab`)
- Setelah login, LoginView pindah ke alamat di `redirect`, atau ke Home kalau
  tidak ada
- Tidak ada redirect loop

### Cara Mengerjakan

1. Cari di dokumentasi router perbedaan `to.path` dan `to.fullPath`. Mana yang
   membawa query?
2. Di LoginView, pakai `useRoute()` untuk membaca query dan `useRouter()` untuk
   berpindah
3. **Keamanan kecil**: `redirect` datang dari URL, jadi bisa diisi orang lain.
   Pastikan kamu hanya mengikuti redirect yang berupa path internal (diawali
   `/`, bukan `//` atau `http`)

### Verifikasi

- [ ] Ketik `/dashboard` di address bar saat belum login → mendarat di Login,
      URL mengandung `redirect`
- [ ] Klik login → kembali ke `/dashboard` (query asli ikut)
- [ ] Buka `/login?redirect=https://contoh-jahat.test` lalu login → tetap di
      aplikasimu
- [ ] Logout di Dashboard lalu klik Back → tidak bisa masuk lagi

---

## Bagian E: Guard Bukan Authorization

### Penjelasan

Semua kode frontend jalan di **browser milik user**. User bisa buka DevTools,
ubah state Pinia jadi "sudah login", atau langsung memanggil API dengan curl
tanpa membuka halamanmu sama sekali. Jadi guard cuma soal **pengalaman
pengguna**: supaya user yang belum login tidak melihat halaman kosong yang
membingungkan.

Yang benar-benar melindungi data adalah **server**: setiap request ke API
dashboard harus dicek sesi, role, dan kepemilikan datanya di backend. Baca
[modul Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md).

### Wajib Ada di Kode Kamu

- Komentar singkat di atas `beforeEach` (dengan kata-katamu sendiri) yang
  menjelaskan bahwa guard ini hanya UX

### Cara Mengerjakan

1. Coba "bobol" guard-mu sendiri: buka Vue DevTools, ubah state login di store
   `auth` jadi true, lalu navigasi ke Dashboard
2. Tulis di catatanmu apa artinya hasil percobaan itu

### Verifikasi

- [ ] Kamu berhasil masuk Dashboard lewat DevTools (memang bisa, dan itu
      intinya)
- [ ] Kamu bisa menjelaskan di mana pengecekan sebenarnya harus ada

---

## Edge Case yang Harus Kamu Coba

- Refresh di `/dashboard` setelah login pura-pura. State Pinia hilang, jadi
  kamu dilempar ke Login. Wajar? Tulis pendapatmu
- Akses route yang tidak ada (`/asal-asalan`). Apa yang tampil? (bonus: buat
  halaman 404 dengan catch-all route)
- User sudah login membuka `/login`. Perlu diarahkan ke Dashboard?
- Query `redirect` berisi alamat luar

---

## Petunjuk Bertingkat

### Petunjuk 1

Mulai dari yang paling kecil: tiga route tanpa guard, pastikan navigasi jalan.
Baru tambahkan `meta`, lalu guard.

### Petunjuk 2

Pinia store bisa dipanggil di dalam guard karena guard baru jalan setelah
aplikasi (dan Pinia) terpasang. Panggil store **di dalam** fungsi guard, bukan
di level atas file.

### Petunjuk 3

Redirect loop terjadi kalau halaman Login sendiri juga ikut "butuh login". Cek
lagi route mana saja yang kamu tempeli `meta`.

---

## Verifikasi Akhir (Wajib Dicek)

- [ ] Home dan Login bisa diakses tanpa login
- [ ] Dashboard memaksa login dan mengembalikan ke tujuan awal
- [ ] Dashboard di-lazy-load
- [ ] Redirect ke alamat luar ditolak
- [ ] Ada komentar "guard bukan authorization" dengan kata-katamu sendiri
- [ ] Console bersih

---

## Refleksi

1. Kenapa guard di frontend tidak cukup untuk melindungi data?
2. Apa untungnya lazy loading untuk user dengan HP dan kuota terbatas?
3. Apa bahayanya mengikuti `redirect` dari URL tanpa dicek?

---

## Cara Submit / Lanjut

1. Commit router, views, dan auth store
2. Lanjut ke [soal 09 — Pinia Cart Store](09-cart-store.md)

---

## Sudah Jalan? Baru Boleh Bandingkan dengan Contoh

Baca dulu [aturan folder contoh](../contoh/README.md). Perhatikan: contoh
hanya berisi file router. Views dan auth store tetap tanggung jawabmu.

<!-- markdownlint-enable MD024 MD028 -->

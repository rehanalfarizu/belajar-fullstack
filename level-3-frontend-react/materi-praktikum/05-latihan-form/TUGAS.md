# TUGAS — Form Handling

Hampir semua aplikasi kerja isinya form: daftar, login, checkout, isi data. Form
yang baik itu jelas salahnya di mana, tidak bikin user kesal, dan tidak percaya
begitu saja pada input user.

## Hasil Akhir yang Diharapkan

Setelah selesai, kamu punya:

1. `EmployeeForm` dengan controlled input dan field array (tambah/hapus baris).
2. `RegistrationForm` yang menampilkan error **setelah** field disentuh, bukan
   saat halaman baru dibuka, plus password strength meter.
3. `SearchableSignupForm` dengan cek ketersediaan username secara async, fokus
   otomatis ke field pertama yang salah, dan form multi-langkah dengan progress.
4. `CommentSection` dengan optimistic update (dan rollback kalau gagal), plus
   dropdown bertingkat (provinsi → kota).

---

## Daftar Soal dan File Starter

| No | Soal | Starter yang diedit (salinannya) | Estimasi |
| --- | --- | --- | --- |
| 01 | `soal/01-controlled-components.md` | `level-3-frontend-react/materi-praktikum/05-latihan-form/code/01-controlled-components.jsx` | 90 menit |
| 02 | `soal/02-validasi-per-field.md` (isinya: touched state + validasi per field) | `level-3-frontend-react/materi-praktikum/05-latihan-form/code/02-validasi-per-field.jsx` | 120 menit |
| 03 | `soal/03-async-dan-multistep.md` (2 bagian: async validation + multi-step form) | `level-3-frontend-react/materi-praktikum/05-latihan-form/code/03-async-dan-multistep.jsx` + file baru untuk multi-step | 120–150 menit |
| 04 | `soal/04-form-submission.md` (2 bagian: optimistic update + cascading dropdown) | `level-3-frontend-react/materi-praktikum/05-latihan-form/code/04-form-submission.jsx` | 120 menit |

### Catatan

- Semua latihan di sini memakai `useState` biasa, tanpa React Hook Form atau Zod.
  Ini disengaja: kamu paham dulu apa yang dikerjakan library itu di balik layar.
  Nama file lama (`02-react-hook-form`, `03-zod-validation`) sudah diganti supaya
  sesuai isi.
- Starter `03` tidak punya bagian multi-step form (soal bagian 2). Buat file
  sendiri, misalnya `src/03b-multi-step.jsx`.
- Starter `01` punya bonus `ContactForm` dan `SurveyForm`. Starter `02` punya
  bonus `LoginForm` dan `AddressForm`. Starter `04` punya bonus `ShoppingCart`.

---

### Soal buntu?

Blok jawaban yang dulu ada di starter dipindah ke [solusi-jangan-dibuka-dulu.md](solusi-jangan-dibuka-dulu.md). Coba dulu minimal 30 menit dan catat apa yang sudah kamu coba, baru buka untuk membandingkan.

## Cara Menjalankan Starter

Butuh proyek Vite React
([panduan install](../../software/01-react-dan-vite-install.md)).

```bash
npm create vite@latest latihan-form -- --template react
cd latihan-form
npm install
npm run dev
```

1. Salin starter ke `src/`, tambahkan `export` pada komponen yang mau dirender,
   import di `src/App.jsx`.
2. Semua "server" di sini disimulasikan dengan `setTimeout` + Promise di dalam
   starter. Tidak perlu backend.
3. Opsional, setelah semua soal selesai:
   `npm install react-hook-form zod @hookform/resolvers`, lalu tulis ulang
   `RegistrationForm` memakai library itu dan bandingkan jumlah kodenya.

---

## Langkah Pengerjaan

1. **Tulis aturan validasi di tabel dulu.** Kolom: field, aturan, pesan error,
   kapan pesan muncul. Ini spesifikasimu.
2. **Soal 01** — satu field dulu sampai jalan (value + onChange). Lalu buat satu
   `handleChange` untuk semua field. Terakhir field array.
3. **Soal 02** — pisahkan tiga hal: `values`, `errors`, `touched`. Tulis fungsi
   validasi sebagai fungsi biasa (input → pesan error atau kosong). Tes di
   Console.
4. **Soal 03** — async check: pikirkan apa yang terjadi kalau user mengetik
   "andi", lalu cepat ganti ke "andika". Response mana yang boleh dipakai?
5. **Soal 03 multi-step** — gambar alur langkah di kertas. Validasi di tiap
   langkah, data disimpan di satu tempat.
6. **Soal 04** — optimistic update: tulis urutan kejadian di kertas: tampilkan
   dulu → kirim → berhasil (tandai sukses) / gagal (kembalikan + pesan).

Teori: [Form Handling](../../materi-teori/05-form-handling/README.md) dan
[Frontend Performance dan Security](../../materi-teori/06-frontend-performance-security/README.md).

---

## Petunjuk Kalau Macet

### Level 1 — Gejala umum

- Warning "A component is changing an uncontrolled input to be controlled" →
  nilai awal field `undefined`. Beri nilai awal string kosong.
- Halaman reload saat submit → lupa mencegah perilaku default form.
- Input tidak bisa diketik → `value` diisi tapi state tidak diperbarui di
  `onChange`.
- Checkbox tidak berubah → checkbox memakai `checked`, bukan `value`.

### Level 2 — Lihat buktinya

- React DevTools → Components → lihat `values`, `errors`, `touched` berubah saat
  kamu mengetik dan pindah field.
- Tambahkan `<pre>{JSON.stringify(values, null, 2)}</pre>` sementara di bawah
  form supaya state kelihatan langsung.
- Untuk optimistic update: buat API palsu yang gagal 50% (pakai `Math.random`)
  supaya jalur gagal benar-benar teruji.

### Level 3 — Perkecil masalah

- Cross-field validation (konfirmasi password) bingung? Validasi field kedua
  perlu melihat field pertama. Apa yang perlu diberikan ke fungsi validasinya?
- Cascading dropdown bingung? Saat provinsi berubah, kota yang lama masih valid
  atau tidak? Apa yang harus terjadi pada pilihan kota?

### Dokumentasi

- react.dev → Reference → komponen `<input>`, `<select>`, `<form>`.
- MDN → "Client-side form validation" dan atribut `aria-invalid`,
  `aria-describedby`.

---

## Cara Mengecek Hasil Sendiri

- [ ] Buka form, belum ada pesan error. Klik field lalu keluar tanpa mengisi →
      baru muncul error untuk field itu.
- [ ] Submit form kosong → semua error muncul dan fokus pindah ke field pertama
      yang salah.
- [ ] Tombol submit nonaktif selama proses kirim. Klik dobel tidak mengirim dua
      kali.
- [ ] Username check: ketik cepat, hasil yang tampil sesuai teks terakhir.
- [ ] Optimistic update: komentar langsung muncul. Kalau API palsu gagal,
      komentar hilang lagi dan ada pesan error.
- [ ] Ganti provinsi → pilihan kota ikut reset.
- [ ] Ketik `<img src=x onerror=alert(1)>` sebagai komentar. Yang tampil teks
      biasa, **tidak** ada alert.
- [ ] Navigasi hanya pakai keyboard (Tab, Shift+Tab, Enter). Semua field bisa
      dicapai dan pesan error terbaca.
- [ ] `npm run build` sukses.

---

## Setelah Selesai

Isi [CHECKLIST.md](CHECKLIST.md). Ingat: validasi di frontend itu untuk
kenyamanan user. Keamanan tetap di server. Kamu akan membuktikannya sendiri di
[Validasi Input](../../../modul-keamanan-web/02-validasi-input/TUGAS.md).

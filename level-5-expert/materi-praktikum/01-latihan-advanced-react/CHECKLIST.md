# CHECKLIST — Advanced React

Centang dengan jujur. Pola-pola ini gampang "dikira paham" padahal belum.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan masalah apa yang diselesaikan Portal
- [ ] Aku paham event dari dalam Portal tetap naik lewat pohon React
- [ ] Aku bisa menjelaskan code splitting dan kapan ia membantu
- [ ] Aku paham beda `lazy` (komponen) dan `Suspense` (fallback)
- [ ] Aku tahu error apa saja yang **tidak** ditangkap Error Boundary
- [ ] Aku bisa menjelaskan kenapa Error Boundary masih harus class component
- [ ] Aku paham beda `ref` sebagai prop (React 19) dan `forwardRef` (React 18)
- [ ] Aku paham kenapa API imperative sebaiknya dibatasi
- [ ] Aku bisa menjelaskan keuntungan compound components dibanding satu
      komponen dengan banyak props

---

## Kemampuan Praktis

- [ ] Aku bisa membuat modal dengan Portal, Escape, klik backdrop, focus trap,
      dan pengembalian fokus
- [ ] Aku bisa membuat route lazy dengan `Suspense` dan preload saat hover
- [ ] Aku bisa membuktikan hasil code splitting lewat `npm run build` dan tab
      Network
- [ ] Aku bisa membuat Error Boundary dengan tombol reset
- [ ] Aku bisa membuat komponen input dengan `useImperativeHandle`
- [ ] Aku bisa membaca dan menjelaskan kode lama yang memakai `forwardRef`
- [ ] Aku bisa membuat Tabs dengan context bersama

---

## Kebiasaan Baik

- [ ] Modal dan Tabs buatanku bisa dipakai tanpa mouse
- [ ] Aku memberi role/atribut ARIA yang sesuai (`dialog`, `aria-modal`,
      `tablist`, `tab`, `tabpanel`)
- [ ] Fallback error tidak menampilkan stack trace atau detail teknis ke user
      (baca [Konfigurasi Aman](../../../modul-keamanan-web/07-konfigurasi-aman/README.md))
- [ ] Kalau komponenku menerima HTML dari luar (misalnya isi modal dari API), aku
      tidak memasangnya dengan `dangerouslySetInnerHTML` tanpa sanitasi
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Aku mengukur ukuran bundle sebelum dan sesudah splitting, bukan menebak
- [ ] Aku menulis cara **pakai** komponen dulu, baru implementasinya

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[01-latihan-performa](../01-latihan-performa/TUGAS.md).

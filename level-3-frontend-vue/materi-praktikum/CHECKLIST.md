# CHECKLIST — Praktikum Vue 3

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri, bukan untuk
dikumpulkan. "Bisa" artinya bisa **tanpa melihat contoh dan tanpa AI**.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan apa itu reactivity dengan analogi sendiri
- [ ] Aku paham kenapa `ref` diakses pakai `.value` di script tapi tidak di template
- [ ] Aku paham bedanya `computed` dan `watch`, dan kapan pakai yang mana
- [ ] Aku paham kenapa total belanja **tidak boleh** disimpan sebagai state terpisah
- [ ] Aku paham kenapa `v-for` butuh `key` yang stabil, dan kenapa index berbahaya
- [ ] Aku paham bedanya `v-if` dan `v-show`
- [ ] Aku paham arah data: props turun, event naik
- [ ] Aku paham kenapa child tidak boleh mengubah props
- [ ] Aku paham kapan slot lebih cocok daripada props
- [ ] Aku paham kapan `onMounted` dan `onUnmounted` berjalan
- [ ] Aku paham kenapa request harus dibatalkan saat komponen dilepas atau filter berubah
- [ ] Aku paham bedanya composable dan Pinia store
- [ ] Aku paham kenapa router guard **bukan** authorization
- [ ] Aku paham kenapa `v-html` dengan input user berbahaya

---

## Kemampuan Praktis

- [ ] Aku bisa bikin project Vue baru dengan `npm create vue@latest` dan menjalankannya
- [ ] Aku bisa bikin komponen dengan `<script setup>`, `ref`, dan `computed` dari nol
- [ ] Aku bisa merender list dengan filter dan empty state
- [ ] Aku bisa mendefinisikan props dengan tipe, `required`, dan validator
- [ ] Aku bisa mendefinisikan emit dengan validator payload
- [ ] Aku bisa membuat named slot dengan slot props
- [ ] Aku bisa menangani 4 keadaan request: loading, error (dengan retry), kosong, sukses
- [ ] Aku bisa memakai `AbortController` dan membedakan abort dari error sungguhan
- [ ] Aku bisa mengekstrak logic ke composable dan menulis unit test-nya dengan Vitest
- [ ] Aku bisa membuat route biasa, route lazy-load, dan guard dengan redirect kembali
- [ ] Aku bisa membuat Pinia setup store dan memakainya di komponen tanpa kehilangan reactivity
- [ ] Aku bisa menyusun query string dengan `URLSearchParams`
- [ ] Aku bisa memvalidasi URL dari user dengan allowlist protokol

---

## Debugging Mandiri

- [ ] Aku memakai Vue DevTools untuk melihat nilai state, props, dan store
- [ ] Aku memakai tab Network untuk melihat request, status, dan response
- [ ] Aku pernah memakai throttling (Slow 3G) atau mode Offline untuk menguji loading/error
- [ ] Saat error, aku membaca pesannya dulu sebelum mencari di internet
- [ ] Aku bisa mempersempit bug dengan mengomentari kode setengah-setengah

---

## Best Practices

- [ ] Derived state selalu pakai `computed`, bukan disalin ke `ref` lain
- [ ] Setiap timer, listener, dan request punya cleanup
- [ ] Setiap `<input>` punya `<label>`
- [ ] Tombol yang tidak bisa dipakai di-`disabled`, bukan sekadar disembunyikan tanpa alasan
- [ ] Aku tidak memakai `v-html` untuk teks dari user
- [ ] Aku tidak menaruh secret di variabel `VITE_*`
- [ ] Validasi di frontend hanya untuk UX; aku tahu backend tetap wajib memvalidasi

---

## Keamanan (Soal 11)

- [ ] Aku sudah mereproduksi XSS lewat `v-html` dan lewat `:href` sendiri
- [ ] Aku sudah memperbaiki keduanya dan mengujinya dengan semua payload di soal
- [ ] Aku bisa menjelaskan kapan `v-html` boleh dipakai dan syaratnya
- [ ] Aku sudah membaca [modul XSS dan CSRF](../../modul-keamanan-web/06-xss-dan-csrf/README.md)

---

## Siap Lanjut?

Kalau semua item di **Pemahaman Konsep** dan **Kemampuan Praktis** sudah
tercentang:

1. Kerjakan [tutorial Product Explorer](../tutorial/README.md) (gabungan semua soal)
2. Lanjut ke [Self Problem Solving](../SELF_PROBLEM_SOLVING.md)
3. Baca [Vue Performance dan Security](../materi-teori/02-performance-security.md)

Kalau masih ada yang belum, ulangi soal terkait. Kali ini **tanpa membuka
kode lamamu**.

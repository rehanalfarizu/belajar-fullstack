# CHECKLIST — React Dasar

Centang dengan jujur. Ini bukan nilai, ini cermin. Kalau ragu, jangan centang.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan JSX itu apa, dan kenapa pakai `className` bukan `class`
- [ ] Aku bisa menjelaskan beda element dan component
- [ ] Aku paham props itu read-only, dan state itu milik komponen
- [ ] Aku paham kenapa `key` dibutuhkan, dan kenapa index sebagai key bisa bikin bug
- [ ] Aku bisa menjelaskan kapan pakai ternary, `&&`, dan early return
- [ ] Aku paham kapan useEffect jalan, dan apa gunanya array dependency
- [ ] Aku paham masalah apa yang diselesaikan Context (prop drilling)
- [ ] Aku bisa menjelaskan beda HOC, render props, dan custom hook
- [ ] Aku paham React otomatis meng-escape teks di `{}`, jadi input user aman
      ditampilkan sebagai teks

---

## Kemampuan Praktis

- [ ] Aku bisa membuat proyek Vite React dari nol tanpa melihat catatan
- [ ] Aku bisa membuat komponen dengan props yang di-destructure
- [ ] Aku bisa me-render list dengan `.map()` dan `key` yang stabil
- [ ] Aku bisa membuat state, mengubahnya, dan memakai updater function
      (`setCount(c => c + 1)`)
- [ ] Aku bisa membuat useEffect dengan cleanup (timer, event listener)
- [ ] Aku bisa membuat Context + Provider + custom hook `useXxx()`
- [ ] Aku bisa membuat custom hook sendiri (misalnya `useToggle`, `useLocalStorage`)
- [ ] Aku bisa membuat beberapa halaman dengan React Router, termasuk route
      dinamis (`/post/:id`)
- [ ] Aku bisa membaca props dan state komponen di React DevTools

---

## Kebiasaan Baik

- [ ] Aku menebak output dulu sebelum menjalankan kode
- [ ] Aku mengerjakan satu TODO, cek browser, baru lanjut
- [ ] Aku membaca pesan error di Console sampai selesai sebelum mengubah kode
- [ ] Aku tidak memakai `dangerouslySetInnerHTML` untuk teks dari user. Kalau
      terpaksa, aku tahu harus disanitasi dulu
      (baca [XSS dan CSRF](../../../modul-keamanan-web/06-xss-dan-csrf/README.md))
- [ ] Aku tidak menyimpan token login di `localStorage` saat latihan context auth.
      Untuk latihan cukup simpan user di state
- [ ] Aku menulis jawaban Pertanyaan Analisis dengan kalimatku sendiri

---

## Siap Lanjut?

Kalau semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke [02-latihan-hooks](../02-latihan-hooks/TUGAS.md).

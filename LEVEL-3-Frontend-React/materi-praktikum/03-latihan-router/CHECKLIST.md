# CHECKLIST — React Router

Centang dengan jujur. Ini untuk kamu sendiri.

---

## Pemahaman Konsep

- [ ] Aku paham beda client-side routing dan navigasi biasa (reload halaman)
- [ ] Aku bisa menjelaskan fungsi `Routes`, `Route`, `Link`, `NavLink`, `Outlet`
- [ ] Aku paham kapan memakai `useParams` dan kapan `useSearchParams`
- [ ] Aku paham kenapa state filter sebaiknya di URL (bisa di-share, Back jalan)
- [ ] Aku paham nilai dari URL selalu string dan tidak bisa dipercaya
- [ ] Aku paham `replace` pada `Navigate` itu untuk apa
- [ ] Aku paham ProtectedRoute hanya mengatur tampilan. Keamanan data tetap
      harus dicek di server
      (baca [Otorisasi dan Akses](../../../modul-keamanan-web/05-otorisasi-dan-akses/README.md))

---

## Kemampuan Praktis

- [ ] Aku bisa memasang router di proyek Vite baru tanpa melihat catatan
- [ ] Aku bisa membuat nested layout dengan `<Outlet />`
- [ ] Aku bisa membuat halaman detail dari `/:id` dan menangani id yang tidak ada
- [ ] Aku bisa membuat halaman 404
- [ ] Aku bisa menyimpan filter, sort, dan page di query string
- [ ] Aku bisa membuat ProtectedRoute dan PublicRoute
- [ ] Aku bisa redirect kembali ke halaman asal setelah login (`location.state`)

---

## Kebiasaan Baik

- [ ] Aku menggambar peta URL dulu sebelum menulis route
- [ ] Aku memvalidasi nilai query string (angka negatif, teks aneh) sebelum
      dipakai
- [ ] Aku tidak memasukkan data sensitif (token, password) ke URL
- [ ] Aku tidak menyimpan token login di `localStorage` saat latihan AuthContext.
      Di Level 4 kamu akan pakai cookie `HttpOnly`
- [ ] Aku mengetes tombol Back dan refresh, bukan cuma klik link

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[04-latihan-state](../04-latihan-state/TUGAS.md).

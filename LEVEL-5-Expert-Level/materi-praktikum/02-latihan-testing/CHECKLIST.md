# CHECKLIST — Testing

Centang dengan jujur. Test hijau belum tentu test bagus.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan beda unit, integration, dan end-to-end test
- [ ] Aku paham pola Arrange-Act-Assert
- [ ] Aku paham kenapa test sebaiknya mengikuti cara user memakai aplikasi
- [ ] Aku tahu urutan prioritas query Testing Library (role, label, text, test id)
- [ ] Aku paham kenapa mock di level jaringan (MSW) lebih realistis
- [ ] Aku bisa menjelaskan test flaky dan penyebab umumnya
- [ ] Aku paham coverage tinggi tidak menjamin test berkualitas
- [ ] Aku tahu kapan E2E layak dipakai dan kapan terlalu mahal

---

## Kemampuan Praktis

- [ ] Aku bisa menyiapkan Jest (atau Vitest) + Testing Library di proyek Vite
- [ ] Aku bisa menulis unit test dengan kasus normal, kosong, dan tepi
- [ ] Aku bisa menulis test parametrik
- [ ] Aku bisa mengetes komponen dengan `userEvent` dan `getByRole`
- [ ] Aku bisa membuat handler MSW untuk sukses dan error
- [ ] Aku bisa menulis alur E2E login dengan Playwright
- [ ] Aku bisa membaca trace dan laporan test yang gagal

---

## Kebiasaan Baik

- [ ] Aku melihat test gagal dulu sebelum membuatnya lulus
- [ ] Aku melakukan uji mutasi manual untuk memastikan test benar-benar menjaga
      sesuatu
- [ ] Aku menulis test untuk jalur gagal dan input jahat, bukan hanya jalur
      senang (misalnya input berisi `<script>`)
      (baca [Validasi Input](../../../modul-keamanan-web/02-validasi-input/README.md))
- [ ] Test E2E dan test integrasi tidak memakai password atau token asli
      (baca [Autentikasi dan Password](../../../modul-keamanan-web/04-autentikasi-dan-password/README.md))
- [ ] Akun dan data uji dibuat khusus untuk test, terpisah dari data nyata
- [ ] Setiap test berdiri sendiri dan tidak bergantung urutan

---

## Siap Lanjut?

Kalau "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang semua, lanjut ke
[03-latihan-docker](../03-latihan-docker/TUGAS.md).

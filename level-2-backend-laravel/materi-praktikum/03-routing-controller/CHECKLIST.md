# CHECKLIST — Routing dan Controller

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri, bukan untuk dinilai orang lain.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan alur request: route → middleware → controller → response
- [ ] Aku paham beda `routes/web.php` dan `routes/api.php` (session/CSRF vs stateless, prefix `/api`)
- [ ] Aku paham kapan pakai closure route dan kapan pakai controller
- [ ] Aku bisa menjelaskan kenapa named route lebih aman daripada URL yang diketik manual
- [ ] Aku paham constraint parameter menolak request **sebelum** kode controller jalan
- [ ] Aku bisa menggambar urutan "sebelum" dan "sesudah" dari dua middleware
- [ ] Aku tahu beda status `200`, `201`, `301`, `302`, `404`, `419`, `422`, `503`

---

## Kemampuan Praktis

- [ ] Aku bisa membuat controller dengan `php artisan make:controller`
- [ ] Aku bisa membuat route group dengan prefix URL dan prefix nama
- [ ] Aku bisa membuat URL dengan `route('nama', [...])`
- [ ] Aku bisa memberi constraint angka dan regex pada parameter
- [ ] Aku bisa membuat redirect permanen dan fallback route
- [ ] Aku bisa membuat middleware, mendaftarkan alias di `bootstrap/app.php`, dan memasangnya ke group
- [ ] Aku bisa menulis feature test untuk status code dan JSON
- [ ] Aku bisa menguji logika berbasis waktu dengan time travel

---

## Best Practices

- [ ] Controller-ku tipis: terima input, panggil logika, kembalikan response
- [ ] Aku tidak menaruh aturan yang berlaku ke banyak route di setiap controller (pakai middleware)
- [ ] Fallback route selalu paling akhir
- [ ] Aku memakai status code yang tepat, bukan `200` untuk semua hal
- [ ] Aku cek `php artisan route:list` sebelum menebak-nebak kenapa route tidak jalan
- [ ] Test-ku tidak tergantung jam laptop atau urutan data acak

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [04 — Blade Template](../04-blade-template/README.md).

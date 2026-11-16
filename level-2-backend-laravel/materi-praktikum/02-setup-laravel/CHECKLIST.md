# CHECKLIST — 02 Setup Laravel

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan perjalanan request dari `public/index.php` sampai route
- [ ] Aku paham beda `.env`, `.env.example`, dan file di folder `config/`
- [ ] Aku paham kenapa `env()` hanya boleh dipanggil di folder `config/`
- [ ] Aku tahu apa yang dilakukan `config:cache` dan `config:clear`
- [ ] Aku paham fungsi `APP_KEY` dan akibatnya kalau bocor atau diganti sembarangan
- [ ] Aku paham arti exit code `0` dan bukan `0` di terminal

---

## Kemampuan Praktis

- [ ] Aku bisa membuat project Laravel baru dan menjalankannya dengan `php artisan serve`
- [ ] Aku bisa membaca output `php artisan about` dan `php artisan route:list`
- [ ] Aku bisa membuat file config sendiri dan membacanya dengan `config()`
- [ ] Aku bisa membuat Artisan command dengan argumen/opsi dan exit code
- [ ] Aku bisa menulis feature test untuk route dan untuk command
- [ ] Aku bisa mencari error di `storage/logs/laravel.log`

---

## Best Practices

- [ ] `.env` tidak pernah masuk Git; `.env.example` hanya berisi placeholder
- [ ] Aku tidak memanggil `env()` di route, controller, view, atau command
- [ ] Endpoint publik dan output command tidak pernah mencetak secret
- [ ] Test-ku tidak bergantung pada isi `.env` laptopku
- [ ] Aku menjalankan `config:clear` setelah mengubah `.env` kalau config sedang di-cache

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [`03-routing-controller/`](../03-routing-controller/soal/01-product-controller.md).

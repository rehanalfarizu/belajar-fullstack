# CHECKLIST — Eloquent ORM

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan apa itu ORM dan kapan ia membantu atau justru menyusahkan
- [ ] Aku paham beda `hasMany` dan `belongsTo`, dan di tabel mana foreign key-nya berada
- [ ] Aku bisa menjelaskan mass assignment dan contoh serangannya
- [ ] Aku paham beda `$fillable` dan `$guarded`, dan kenapa allowlist lebih aman
- [ ] Aku paham bahwa validasi dan `$fillable` adalah dua lapis yang berbeda
- [ ] Aku bisa menjelaskan N+1 dengan analogi, dan kenapa ia memburuk saat data bertambah
- [ ] Aku tahu bahwa Eloquent aman dari SQL injection **kecuali** saat aku menempel input ke method `...Raw`

---

## Kemampuan Praktis

- [ ] Aku bisa membuat model, relasi, casts, dan scope
- [ ] Aku bisa membuat factory dan seeder untuk data uji yang banyak
- [ ] Aku bisa membuktikan celah mass assignment dengan feature test
- [ ] Aku bisa mengisi kolom milik server (`user_id`) tanpa memasukkannya ke `$fillable`
- [ ] Aku bisa menghitung jumlah query dengan `DB::enableQueryLog()`
- [ ] Aku bisa menghilangkan N+1 dengan `with()` dan memilih kolom secukupnya
- [ ] Aku bisa menulis scope opsional dengan `when()`

---

## Best Practices

- [ ] Aku tidak pernah memakai `$request->all()` untuk `create()`/`update()`
- [ ] Aku tidak memakai `$guarded = []` di model yang menerima input user
- [ ] Aku mengaktifkan `preventLazyLoading` dan `preventSilentlyDiscardingAttributes` di luar production
- [ ] Aku memakai pagination untuk daftar yang bisa tumbuh besar
- [ ] Aku mengukur sebelum dan sesudah optimasi, dan mencatat angkanya

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [`07-form-validasi/`](../07-form-validasi/README.md).

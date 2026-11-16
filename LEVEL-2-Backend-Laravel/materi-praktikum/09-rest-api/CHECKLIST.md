# CHECKLIST — 09 REST API

Centang dengan jujur. Ini untuk mengukur pemahamanmu sendiri.

---

## Pemahaman Konsep

- [ ] Aku bisa menjelaskan resource, method HTTP, dan stateless dengan kata-kataku sendiri
- [ ] Aku tahu beda `200`, `201`, `204`, `401`, `403`, `404`, `422`, `429`
- [ ] Aku bisa menjelaskan kenapa `POST` tidak idempotent
- [ ] Aku paham kenapa `return $model` dari controller berbahaya (excessive data exposure)
- [ ] Aku paham beda allowlist (API Resource) dan blocklist (`$hidden`)
- [ ] Aku tahu kenapa pesan login gagal harus generik (user enumeration)
- [ ] Aku tahu beda ability token dan policy
- [ ] Aku tahu CORS melindungi pengguna browser, bukan server dari curl

---

## Kemampuan Praktis

- [ ] Aku bisa menjalankan `install:api` dan membaca `route:list --path=api`
- [ ] Aku bisa membuat API Resource dengan `when()` dan `whenLoaded()`
- [ ] Aku bisa mengubah format error 404 untuk route `api/*`
- [ ] Aku bisa mendefinisikan rate limiter dengan kunci dan response custom
- [ ] Aku bisa membuat, memakai, dan mencabut token Sanctum
- [ ] Aku bisa mengetes API dengan curl lengkap dengan header `Accept` dan `Authorization`
- [ ] Aku bisa menulis feature test dengan `getJson`, `postJson`, `assertJsonPath`, `assertJsonMissingPath`

---

## Best Practices

- [ ] Aku tidak pernah mengembalikan model mentah dari endpoint publik
- [ ] Aku selalu memberi limit ketat di endpoint login/token
- [ ] Aku memberi token ability sesempit mungkin
- [ ] Aku tetap menjalankan policy walau token sudah punya ability
- [ ] Aku tidak menaruh token di URL, log, atau repo
- [ ] Aku memakai allowlist untuk kolom sort/filter
- [ ] Aku menulis test dari sudut pandang guest, user biasa, dan admin

---

## Siap Lanjut?

Jika semua item di "Pemahaman Konsep" dan "Kemampuan Praktis" sudah tercentang,
lanjut ke topik berikutnya: [10 — Deploy dan Hosting](../10-deploy-hosting/README.md).

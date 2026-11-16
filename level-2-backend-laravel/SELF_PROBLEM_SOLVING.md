# Self Problem Solving — Level 2 Laravel

Kerjakan pada project Laravel lokal dengan database test terpisah. Gunakan feature
test dan query evidence; jangan hanya memeriksa tampilan.

## 1. Route–controller diagnosis

Route model binding menghasilkan 404 yang tidak konsisten dan controller menerima
model tenant lain. Telusuri route list, binding, middleware, scope, dan policy.

## 2. N+1

Index products menampilkan category dan owner tetapi query count tumbuh per item.
Rekam query, perbaiki eager loading/select/pagination, lalu buat regression guard.

## 3. Mass assignment

Payload user menyisipkan `role=admin`, `tenant_id`, dan `price`. Gunakan Form
Request, validated data, fillable/DTO, serta server-derived field. Uji unknown dan
nested fields.

## 4. Policy/IDOR

User A membaca, mengubah, menghapus, dan mengekspor resource user B. Terapkan
Policy dan tenant scope pada web, API, queue job, serta export. Buat matrix test.

## 5. Transaction race

Dua checkout mengurangi stok yang sama. Buat test concurrent/integration,
gunakan transaction/locking/constraint sesuai desain, dan tambahkan idempotency.

## 6. Blade/XSS dan upload

Audit `{!! !!}`, URL, filename, MIME, size, storage path, dan file delivery.
Buktikan output escaped, rich text disanitasi, file tidak executable, serta akses
download diauthorize.

## 7. Cache isolation

Cache dashboard menampilkan data tenant sebelumnya. Redesain cache key/tag/TTL/
invalidation, buat tenant-isolation test, dan definisikan fallback saat cache down.

## 8. Queue reliability

Job email/payment diproses dua kali dan retry tak terbatas. Tambahkan unique/
idempotency semantics, timeout, tries/backoff, failed-job handling, correlation,
dan replay procedure.

## 9. Production misconfiguration

Review `APP_DEBUG`, `APP_ENV`, `APP_KEY`, cookie, trusted proxy/host, CORS, log,
storage permission, config cache, dan secret. Buat pre-deploy checklist otomatis.

## 10. Capstone

Bangun katalog/order API atau Blade app dengan migration, Eloquent relation,
Form Request, Policy, transaction, queue, cache, feature tests, query budget,
security review, deployment, dan rollback.

## Exit criteria

- Policy tests mencakup guest, owner, non-owner, admin, dan tenant lain.
- Query count/latency serta queue lag dapat diukur.
- Migration dan rollback diuji pada data representatif.
- Security config tidak bergantung pada UI/framework default tanpa pembuktian.

# Laravel Performance dan Security

Laravel memberi default yang kuat, tetapi framework tidak dapat memahami aturan
bisnis, ownership, atau batas resource aplikasi. Developer tetap bertanggung jawab
atas desain, konfigurasi, dan pengujian.

## 1. Alur request dan tempat mengukur

```text
Nginx/Apache → PHP-FPM/process → middleware → controller
→ service/domain → Eloquent/query → database/cache/queue
→ resource/view → response
```

Ukur latency per route, query count/time, cache hit ratio, queue lag, error rate,
CPU, memory, dan saturation PHP-FPM/connection pool. Debug toolbar cocok untuk
development; production membutuhkan telemetry yang aman.

## 2. Eloquent dan database

### N+1

```php
// Berpotensi satu query posts + satu query user per post.
$posts = Post::all();

// Eager loading jika relasi memang dipakai.
$posts = Post::with('user')->paginate(20);
```

Gunakan `select`, pagination, eager loading, aggregate query, index, dan query
plan. `chunk`, `chunkById`, `cursor`, atau queue membantu data besar, tetapi pilih
berdasarkan konsistensi dan memory. Jangan memakai `get()` tanpa batas untuk
collection yang dapat tumbuh.

Constraint database dan transaction menjaga invariant. Validasi aplikasi saja
tidak mencegah dua request concurrent menjual stok terakhir.

## 3. Cache dan queue

Cache route/config/view production hanya setelah deployment process benar:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Jangan memanggil `env()` di luar config setelah config cache. Cache data bisnis
memerlukan key yang memuat tenant/user bila relevan, TTL, invalidation, dan
fallback. Queue job harus idempotent, memiliki timeout, retry/backoff, serta
failed-job handling.

## 4. Validation dan mass assignment

Gunakan Form Request untuk validation dan Policy/Gate untuk authorization. Hanya
pakai data yang sudah divalidasi:

```php
$product = Product::create($request->validated());
```

Tetap definisikan `$fillable`/`$guarded` dengan sadar. Jangan menerima `role`,
`tenant_id`, `owner_id`, harga final, atau status administratif dari client tanpa
aturan eksplisit.

## 5. Access control

- Policy memeriksa action pada model, bukan hanya status login.
- Query wajib ter-scope tenant/user.
- Route model binding tidak otomatis memberi authorization.
- Admin UI tersembunyi bukan kontrol keamanan.
- Test user A terhadap resource user B dan lintas tenant.

## 6. Web security Laravel

- Blade `{{ }}` melakukan escaping; `{!! !!}` hanya untuk HTML yang sudah
  disanitasi dan dipercaya.
- Query Builder/Eloquent melakukan parameter binding; raw expression tetap perlu
  review.
- CSRF middleware melindungi web session routes; pahami pengecualian dan API
  architecture.
- Cookie production memakai HTTPS, `Secure`, `HttpOnly`, dan `SameSite` sesuai
  topology.
- Validasi file berdasarkan content/type/size, simpan di lokasi non-executable,
  gunakan nama generated, dan lakukan scanning bila risiko menuntut.
- `APP_DEBUG=false` di production dan `APP_KEY` tidak boleh bocor/seragam.
- Rate limit login, reset password, upload, search mahal, dan endpoint publik.

## 7. Dependency dan deployment

Commit `composer.lock`, jalankan security audit, update dependency terjadwal, dan
review package/script. Deployment harus:

1. build artifact yang dapat diulang;
2. backup bila migration berisiko;
3. memakai expand–migrate–contract untuk perubahan schema;
4. menjalankan migration satu kali;
5. melakukan health/smoke test;
6. mendukung rollback aplikasi tanpa merusak schema/data.

## Checklist bukti

- [ ] Query count dan p95 sebelum/sesudah optimasi.
- [ ] N+1 test atau lazy-loading prevention pada lingkungan pengembangan.
- [ ] Policy tests untuk owner, non-owner, admin, dan tenant lain.
- [ ] Validation/mass-assignment negative tests.
- [ ] Queue retry/idempotency test.
- [ ] Production config, log redaction, HTTPS/cookie review.
- [ ] Migration forward/rollback diuji pada salinan data aman.

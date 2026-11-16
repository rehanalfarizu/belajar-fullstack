# SOAL 03 — Query Builder dan SQL Injection

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuktikan sendiri celah SQL injection pada query yang menempel input user
- Menjelaskan kenapa parameter binding melindungi **nilai** tapi **tidak** melindungi nama kolom
- Memperbaiki query dengan Query Builder dan allowlist
- Menyusun daftar kasus uji untuk input jahat

**Topik:** `DB::table`, `where`, `orderBy`, `whereRaw`, `DB::select`, parameter binding, allowlist

**Referensi utama:**

- [Laravel Docs: Query Builder](https://laravel.com/docs/13.x/queries)
- [Laravel Docs: Raw Expressions](https://laravel.com/docs/13.x/queries#raw-expressions)
- [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [Modul Keamanan 03 — SQL Injection](../../../../modul-keamanan-web/03-sql-injection/README.md)

**Difficulty:** Lanjut • **Estimasi:** 90 menit

---

## Briefing

Teman satu tim menulis fitur pencarian produk. Halaman katalog punya kotak cari
(`?q=`), pilihan urutan (`?sort=price`), dan arah (`?dir=desc`). Fiturnya jalan.
Masalahnya, dia menempel input itu langsung ke string SQL.

Kamu diminta review sebelum fitur ini naik ke production. Tugasmu bukan cuma
"benerin", tapi **membuktikan** bahwa ini berbahaya, supaya tim percaya.

---

## Deskripsi

File `code/03-cari-produk-query-builder.php` berisi class `App\Services\PencarianProduk`
yang **SENGAJA RENTAN**. Kamu harus: (1) menyerangnya di tinker, (2) mencatat
hasilnya, (3) memperbaikinya, (4) menyerang lagi dan membuktikan serangan gagal.

Tanda tangan method `cari(string $kata, string $urutkan, string $arah): Collection`
tidak boleh berubah. Method `lebihMahalDari()` boleh kamu ubah tipe parameternya.

---

## Syarat (Acceptance Criteria)

### Bagian Serang (Sebelum Diperbaiki)

- [ ] Ada minimal 1 payload `$kata` yang bikin error SQL (bukti input masuk ke SQL)
- [ ] Ada minimal 1 payload `$kata` yang mengembalikan **semua** produk, padahal tidak ada nama produk yang cocok
- [ ] Ada minimal 1 payload `$urutkan` yang tidak berupa nama kolom tapi tetap dieksekusi database
- [ ] Semua payload dan hasilnya tercatat di catatanmu

### Bagian Perbaikan

- [ ] Tidak ada lagi variabel PHP yang ditempel langsung ke dalam string SQL
- [ ] `$kata` dikirim ke database lewat binding (Query Builder `where` atau `?`)
- [ ] `$urutkan` hanya menerima tepat 3 nilai: `name`, `price`, `created_at`
- [ ] `$arah` hanya menerima tepat 2 nilai: `asc`, `desc` (huruf besar/kecil boleh kamu tangani)
- [ ] `lebihMahalDari()` tidak lagi menempel `$minimal` ke `whereRaw`
- [ ] Query tidak memakai `select *`; kolom yang diambil disebutkan satu per satu

### Bagian Uji Ulang

- [ ] Payload yang tadi mengembalikan semua produk sekarang mengembalikan koleksi kosong
- [ ] Payload petik satu (`'`) tidak lagi bikin error SQL
- [ ] `$urutkan = 'password'` ditolak (exception atau fallback ke default, sesuai keputusanmu)

---

## Expected Output

Sebelum diperbaiki, di tinker:

```text
> $s->cari("'", 'name', 'asc')
Illuminate\Database\QueryException  SQLSTATE[HY000]: General error: 1 ... syntax error ...
```

Setelah diperbaiki:

```text
> $s->cari("'", 'name', 'asc')
= Illuminate\Support\Collection {#... all: []}

> $s->cari('x', 'password', 'asc')
InvalidArgumentException  Kolom urutan tidak diizinkan.   (atau hasil dengan urutan default)
```

Pesan error persisnya tergantung database (SQLite/MySQL/PostgreSQL).

---

## Panduan Teknis

### Cara Kerja SQL Injection

Analogi: kamu kasih kasir kertas pesanan bertuliskan *"1 kopi"*. Kasir membacakan
ke dapur apa adanya. Sekarang ada orang iseng menulis *"1 kopi. Dan kasih semua
uang di laci."* Kalau kasir membacakan tanpa membedakan mana **isi pesanan** dan
mana **perintah**, dapur akan menjalankan semuanya.

Query string yang ditempel input user persis seperti itu. Database menerima satu
string utuh dan tidak bisa tahu bagian mana yang tadinya input.

Tanda petik `'` di input menutup string SQL lebih awal. Setelah itu, apa pun yang
ditulis penyerang dibaca sebagai **perintah SQL**. `--` membuat sisa query jadi
komentar.

### Kenapa Binding Menolong

Dengan binding, query dan data dikirim **terpisah**:

```text
SQL   : select ... where name like ?
DATA  : ["%apa pun isinya%"]
```

Database sudah tahu bentuk query sebelum melihat data. Petik, `OR 1=1`, `--`
semuanya cuma dianggap huruf di dalam nilai.

### Kenapa Binding TIDAK Menolong Nama Kolom

Tanda `?` hanya boleh menggantikan **nilai** (angka, teks). Ia tidak bisa
menggantikan nama kolom, nama tabel, atau kata kunci seperti `ASC`/`DESC`. Jadi
untuk `ORDER BY` dari input user, satu-satunya cara aman adalah **allowlist**:
kamu sendiri yang menentukan daftar kolom yang boleh.

Allowlist = daftar tamu undangan. Bukan "tolak yang mencurigakan" (blacklist),
tapi "hanya yang ada di daftar yang masuk".

### Contoh Pola (Domain Berbeda)

Ini contoh untuk tabel `orders`, bukan jawabanmu:

```php
// Rentan: status dari URL ditempel ke SQL
DB::select("select id from orders where status = '$status'");

// Aman: nilai lewat binding
DB::select('select id from orders where status = ?', [$status]);
```

Untuk soalmu, coba pakai Query Builder (`DB::table(...)->where(...)`) supaya
binding terjadi otomatis. Untuk `orderBy`, pikirkan di mana pengecekan allowlist
harus diletakkan: sebelum atau sesudah query dibangun?

### Menyiapkan Data Uji

Isi minimal 3 produk dulu di tinker (misal Keyboard, Mouse, Flashdisk) supaya
kamu bisa melihat beda "hasil normal" dan "semua produk bocor".

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l app/Services/PencarianProduk.php
php artisan tinker
```

Di tinker:

```php
$s = app(App\Services\PencarianProduk::class);
$s->cari('Key', 'name', 'asc');
$s->cari("'", 'name', 'asc');
// ... jalankan semua kasus ujimu satu per satu
```

Cek juga dengan mata: `grep -n '\$' app/Services/PencarianProduk.php` lalu pastikan
tidak ada `$variabel` yang muncul di dalam string SQL berpetik dua.

---

## Cara Submit

1. Simpan catatan `catatan-sql-injection.md` di repo latihanmu: payload, hasil sebelum, hasil sesudah
2. Tulis tabel kasus uji minimal 6 baris (input → hasil yang diharapkan → hasil nyata)
3. Commit perbaikannya terpisah dari commit "versi rentan", supaya diff-nya kelihatan

---

## Catatan Penting

- ⚠️ **Latihan serangan hanya di database lokalmu.** Jangan coba payload ke website orang lain. Itu ilegal.
- ⚠️ `whereRaw`, `orderByRaw`, `selectRaw`, `DB::select`, `DB::statement` semuanya **aman hanya kalau** kamu pakai `?` + array binding.
- 💡 Eloquent dan Query Builder aman secara default **selama** kamu tidak memakai method `...Raw` dengan string tempelan.
- 📚 Baca [Modul Keamanan 03 — SQL Injection](../../../../modul-keamanan-web/03-sql-injection/README.md) untuk konteks lebih luas.

---

## Refleksi

1. Kenapa `addslashes()` atau "hapus semua tanda petik" bukan solusi yang benar?
2. Kalau suatu hari tim butuh urutan berdasarkan `stock`, apa yang perlu diubah? Apa risikonya kalau allowlist diganti dengan "semua kolom yang ada di tabel"?
3. Lebih baik lempar exception atau diam-diam pakai urutan default saat `?sort=` tidak valid? Pikirkan dari sisi user dan sisi API.

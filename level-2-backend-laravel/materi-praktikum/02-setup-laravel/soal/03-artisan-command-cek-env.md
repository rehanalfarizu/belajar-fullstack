# SOAL 03 — Artisan Command `toko:cek-env`

## Tujuan Pembelajaran

Setelah menyelesaikan soal ini, kamu akan mampu:

- Membuat Artisan command sendiri dengan signature, opsi, dan exit code.
- Memeriksa konfigurasi wajib tanpa pernah menampilkan nilai secret.
- Memakai exit code (`0` sukses, `1` gagal) supaya command bisa dipakai di script deploy.
- Menulis test untuk command, termasuk test "tidak bocor".

**Topik:** `php artisan make:command`, `$signature`, opsi `--flag`, `$this->table()`, `$this->error()`, `Command::SUCCESS` / `Command::FAILURE`, `blank()`, `app()->isProduction()`, console test

**Referensi utama:**

- [Laravel 13: Artisan Console — Writing Commands](https://laravel.com/docs/13.x/artisan#writing-commands)
- [Laravel 13: Defining Input Expectations](https://laravel.com/docs/13.x/artisan#defining-input-expectations)
- [Laravel 13: Console Tests](https://laravel.com/docs/13.x/console-tests)
- [Modul Keamanan 07 — Konfigurasi Aman](../../../../modul-keamanan-web/07-konfigurasi-aman/README.md)

**Difficulty:** Lanjut • **Estimasi:** 90 menit

---

## Briefing

Minggu lalu server toko error karena `TOKO_KONTAK_EMAIL` lupa diisi. Butuh 2 jam untuk
sadar. Kamu ditugasi membuat command kecil yang dijalankan **sebelum** deploy:

```bash
php artisan toko:cek-env
```

Command ini mengecek variabel penting sudah terisi. Syarat dari senior: **jangan
pernah mencetak nilainya**. Log deploy bisa dibaca banyak orang. Kalau `APP_KEY` sampai
tercetak di log, itu sama dengan bocor.

Tambahan: dengan opsi `--ketat`, command juga harus gagal kalau aplikasi berjalan di
production dengan `APP_DEBUG=true`.

---

## Deskripsi

Lengkapi `CekEnvCommand` (dari `code/03-cek-env-command.php`) dan test-nya (dari
`code/03-cek-env-command-test.php`). Soal ini melanjutkan soal 02, jadi `config/toko.php`
harus sudah ada.

---

## Syarat (Acceptance Criteria)

### Signature

- [ ] `php artisan list toko` menampilkan `toko:cek-env` beserta deskripsinya.
- [ ] Opsi `--ketat` muncul di `php artisan toko:cek-env --help` beserta penjelasannya.

### Perilaku

- [ ] Mengecek 5 kunci: `APP_KEY`, `APP_URL`, `DB_CONNECTION`, `TOKO_NAMA`, `TOKO_KONTAK_EMAIL`.
- [ ] Nilai `null`, string kosong `''`, dan string berisi spasi saja dihitung `KOSONG`.
- [ ] Output berupa tabel dengan 3 kolom: `Variabel`, `Kunci config`, `Status`.
- [ ] Kolom Status hanya berisi `ADA`, `KOSONG`, atau label bahaya. **Tidak ada nilai asli** di output mana pun.
- [ ] Exit code `0` kalau semua aman, `1` kalau ada masalah.
- [ ] Dengan `--ketat`: kalau environment production dan `app.debug` bernilai `true`, exit code `1`.
- [ ] Tanpa `--ketat`, debug tidak ikut dicek.
- [ ] Nilai dibaca lewat `config()`, bukan `env()`.

### Test

- [ ] Ada `tests/Feature/CekEnvCommandTest.php` dengan 4 test (sukses, ada yang kosong, tidak mencetak nilai, mode ketat).
- [ ] Semua test memakai nilai palsu, bukan secret asli dari `.env`.
- [ ] `php artisan test --filter=CekEnvCommandTest` hijau.

---

## Expected Output

Kalau `TOKO_KONTAK_EMAIL` kosong:

```text
$ php artisan toko:cek-env
+-------------------+-------------------+--------+
| Variabel          | Kunci config      | Status |
+-------------------+-------------------+--------+
| APP_KEY           | app.key           | ADA    |
| APP_URL           | app.url           | ADA    |
| DB_CONNECTION     | database.default  | ADA    |
| TOKO_NAMA         | toko.nama         | ADA    |
| TOKO_KONTAK_EMAIL | toko.kontak_email | KOSONG |
+-------------------+-------------------+--------+
Ada 1 masalah konfigurasi. ...

$ echo $?
1
```

Gaya tabel bisa sedikit beda tergantung versi. Yang penting: kolomnya benar, tidak ada
nilai asli, dan exit code-nya benar.

---

## Panduan Teknis

### Artisan command itu apa?

**Analogi:** Tombol pintas di remote TV. Daripada buka menu, pilih, geser, klik, kamu
cukup tekan satu tombol. Artisan command adalah "tombol pintas" untuk tugas yang sering
diulang: cek konfigurasi, kirim laporan, bersihkan data lama.

### Bagian-bagian command

Contoh command lain (menyapa user), bukan jawaban soal:

```php
final class SapaCommand extends Command
{
    // nama {argumen wajib} {--opsi : penjelasan opsi}
    protected $signature = 'demo:sapa {nama} {--teriak : Tulis dengan huruf besar}';

    protected $description = 'Menyapa seseorang';

    public function handle(): int
    {
        $teks = 'Halo, ' . $this->argument('nama');

        if ($this->option('teriak')) {
            $teks = strtoupper($teks);
        }

        $this->info($teks);

        return self::SUCCESS;
    }
}
```

```bash
php artisan demo:sapa Alya --teriak   # HALO, ALYA
```

### Exit code

Setiap program di terminal mengembalikan angka saat selesai. `0` artinya sukses, selain
itu gagal. Script deploy bisa berhenti otomatis kalau ada langkah yang gagal:

```bash
php artisan toko:cek-env && php artisan migrate --force
# migrate hanya jalan kalau cek-env sukses (exit 0)
```

### Kenapa lewat `config()` dan bukan `env()`?

Ingat soal 02. Di server production, config di-cache dan `env()` di luar folder
`config/` jadi `null`. Command yang memakai `env()` akan bilang "KOSONG" padahal
sebenarnya terisi. Itu laporan palsu.

### Menguji command

Cari di dokumentasi Console Tests: method untuk menjalankan command di test, mengecek
exit code, mengecek output **mengandung** teks, dan mengecek output **tidak mengandung**
teks.

---

## Verifikasi Hasil (Wajib Dicek Sendiri)

```bash
php -l app/Console/Commands/CekEnvCommand.php
php artisan list toko
php artisan toko:cek-env --help

php artisan toko:cek-env; echo "exit code: $?"      # semua terisi → 0

# Kosongkan TOKO_KONTAK_EMAIL di .env, lalu:
php artisan config:clear
php artisan toko:cek-env; echo "exit code: $?"      # → 1, status KOSONG

# Pastikan nilai APP_KEY tidak tercetak:
php artisan toko:cek-env | grep -c "base64:"         # harus 0

php artisan test --filter=CekEnvCommandTest
```

Kembalikan isi `TOKO_KONTAK_EMAIL` setelah eksperimen.

---

## Cara Submit

1. Semua perintah di "Verifikasi Hasil" memberi hasil yang diharapkan.
2. `php artisan test --filter=CekEnvCommandTest` hijau.
3. Jawab Refleksi.
4. Bandingkan dengan `contoh/` setelah semuanya hijau.

---

## Catatan Penting

- ⚠️ **Jangan mencetak nilai**, termasuk "sebagian" seperti 4 huruf pertama `APP_KEY`. Potongan kunci tetap membantu penyerang.
- ⚠️ Kalau command tidak muncul di `php artisan list`, cek namespace (`App\Console\Commands`) dan lokasi file.
- 💡 Laravel punya helper `blank()` dan `filled()`. Baca dokumentasi Helpers untuk tahu nilai apa saja yang dianggap kosong.
- 💡 Di test, mengubah `config('app.env')` saja belum tentu membuat `app()->isProduction()` jadi `true`. Baca dari mana `isProduction()` mengambil nilainya.
- 📚 Command ini akan dipakai lagi di topik [10 — Deploy Hosting](../../10-deploy-hosting/soal/01-production-readiness.md).

---

## Refleksi

1. `TOKO_NAMA` punya default di `config/toko.php`. Apakah command-mu bisa mendeteksi kalau `TOKO_NAMA` lupa diisi di `.env`? Kenapa? Apakah itu masalah?
2. Kenapa exit code lebih berguna daripada sekadar mencetak tulisan "GAGAL"?
3. Kalau tim menambah variabel wajib baru (misal `MIDTRANS_SERVER_KEY`), bagian mana yang diubah? Bagaimana memastikan test ikut menjaga?

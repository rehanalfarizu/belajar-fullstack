<?php

declare(strict_types=1);

/**
 * Soal 03 — Artisan command toko:cek-env
 * Salin file ini ke: toko-latihan/app/Console/Commands/CekEnvCommand.php
 * (buat folder Commands kalau belum ada, atau jalankan dulu:
 *  php artisan make:command CekEnvCommand lalu ganti isinya)
 *
 * Laravel 11+ otomatis mendaftarkan command di folder app/Console/Commands.
 */

namespace App\Console\Commands;

use Illuminate\Console\Command;

final class CekEnvCommand extends Command
{
    // TODO(human): isi signature supaya command dipanggil dengan: php artisan toko:cek-env
    //              Tambahkan juga opsi --ketat (tanpa nilai).
    protected $signature = 'TODO';

    protected $description = 'Cek konfigurasi wajib sudah terisi, tanpa menampilkan nilainya';

    /**
     * Peta: nama variabel .env => kunci config yang membacanya.
     * Kenapa dicek lewat config, bukan env()? Jawab di Refleksi soal.
     *
     * @var array<string, string>
     */
    private const WAJIB = [
        'APP_KEY' => 'app.key',
        'APP_URL' => 'app.url',
        'DB_CONNECTION' => 'database.default',
        'TOKO_NAMA' => 'toko.nama',
        'TOKO_KONTAK_EMAIL' => 'toko.kontak_email',
    ];

    public function handle(): int
    {
        // TODO(human): untuk setiap item di WAJIB, tentukan status 'ADA' atau 'KOSONG'.
        //              (string kosong dan null sama-sama dihitung KOSONG)
        // TODO(human): tampilkan tabel 3 kolom: Variabel | Kunci config | Status.
        //              JANGAN pernah menampilkan nilainya.
        // TODO(human): kalau opsi --ketat dipakai DAN app.env = production,
        //              anggap gagal juga bila app.debug bernilai true.
        // TODO(human): return self::FAILURE kalau ada yang gagal, self::SUCCESS kalau aman.
        throw new \LogicException('TODO: implementasikan CekEnvCommand::handle()');
    }
}

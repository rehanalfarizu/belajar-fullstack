<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — app/Console/Commands/CekEnvCommand.php
 */

namespace App\Console\Commands;

use Illuminate\Console\Command;

final class CekEnvCommand extends Command
{
    protected $signature = 'toko:cek-env {--ketat : Gagal juga kalau APP_DEBUG=true di production}';

    protected $description = 'Cek konfigurasi wajib sudah terisi, tanpa menampilkan nilainya';

    /**
     * Dicek lewat config(), bukan env(): setelah `php artisan config:cache`,
     * file .env tidak dibaca lagi dan env() di luar folder config/ mengembalikan null.
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
        $baris = [];
        $jumlahGagal = 0;

        foreach (self::WAJIB as $variabel => $kunci) {
            // blank() menganggap null, '' dan '   ' sebagai kosong.
            $kosong = blank(config($kunci));
            $jumlahGagal += $kosong ? 1 : 0;

            // Sengaja hanya status. Nilai tidak pernah ditampilkan.
            $baris[] = [$variabel, $kunci, $kosong ? 'KOSONG' : 'ADA'];
        }

        if ($this->option('ketat') && app()->isProduction() && config('app.debug') === true) {
            $baris[] = ['APP_DEBUG', 'app.debug', 'BERBAHAYA (true di production)'];
            $jumlahGagal++;
        }

        $this->table(['Variabel', 'Kunci config', 'Status'], $baris);

        if ($jumlahGagal > 0) {
            $this->error("Ada {$jumlahGagal} masalah konfigurasi. Cek .env (status KOSONG/BERBAHAYA di atas).");

            return self::FAILURE;
        }

        $this->info('Semua konfigurasi wajib terisi.');

        return self::SUCCESS;
    }
}

<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — tests/Feature/CekEnvCommandTest.php
 */

namespace Tests\Feature;

use Tests\TestCase;

final class CekEnvCommandTest extends TestCase
{
    /** Nilai palsu supaya test tidak bergantung pada .env di laptop masing-masing. */
    private function isiSemuaConfig(): void
    {
        config([
            'app.key' => 'base64:kunci-palsu-unik-12345',
            'app.url' => 'http://toko.test',
            'database.default' => 'sqlite',
            'toko.nama' => 'Toko Uji',
            'toko.kontak_email' => 'halo@toko.test',
        ]);
    }

    public function test_sukses_kalau_semua_terisi(): void
    {
        $this->isiSemuaConfig();

        $this->artisan('toko:cek-env')->assertExitCode(0);
    }

    public function test_gagal_kalau_ada_yang_kosong(): void
    {
        $this->isiSemuaConfig();
        config(['toko.kontak_email' => '']);

        $this->artisan('toko:cek-env')
            ->expectsOutputToContain('KOSONG')
            ->assertExitCode(1);
    }

    public function test_tidak_pernah_mencetak_nilai(): void
    {
        $this->isiSemuaConfig();

        $this->artisan('toko:cek-env')
            ->doesntExpectOutputToContain('kunci-palsu-unik-12345')
            ->assertExitCode(0);
    }

    public function test_mode_ketat_menolak_debug_di_production(): void
    {
        $this->isiSemuaConfig();
        config(['app.env' => 'production', 'app.debug' => true]);
        $this->app['env'] = 'production';

        $this->artisan('toko:cek-env', ['--ketat' => true])->assertExitCode(1);
    }
}

<?php

declare(strict_types=1);

/**
 * Soal 03 — Feature test untuk toko:cek-env
 * Salin ke: toko-latihan/tests/Feature/CekEnvCommandTest.php
 * Jalankan: php artisan test --filter=CekEnvCommandTest
 */

namespace Tests\Feature;

use Tests\TestCase;

final class CekEnvCommandTest extends TestCase
{
    public function test_sukses_kalau_semua_terisi(): void
    {
        // TODO(human): isi semua config yang dicek dengan nilai palsu (bukan secret asli).
        // TODO(human): jalankan command, assert exit code 0.
        throw new \LogicException('TODO: tulis test sukses');
    }

    public function test_gagal_kalau_ada_yang_kosong(): void
    {
        // TODO(human): kosongkan satu config, jalankan command, assert exit code 1
        //              dan output mengandung kata KOSONG.
        throw new \LogicException('TODO: tulis test gagal');
    }

    public function test_tidak_pernah_mencetak_nilai(): void
    {
        // TODO(human): isi app.key dengan teks unik, jalankan command,
        //              assert output TIDAK mengandung teks itu.
        throw new \LogicException('TODO: tulis test kebocoran nilai');
    }

    public function test_mode_ketat_menolak_debug_di_production(): void
    {
        // TODO(human): set app.env = production dan app.debug = true,
        //              jalankan dengan --ketat, assert exit code 1.
        throw new \LogicException('TODO: tulis test mode ketat');
    }
}

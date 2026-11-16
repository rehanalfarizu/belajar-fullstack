<?php

declare(strict_types=1);

/**
 * Soal 02 — Feature test untuk /tentang-toko
 * Buat file dengan: php artisan make:test TentangTokoTest
 * Lalu ganti isinya dengan file ini: toko-latihan/tests/Feature/TentangTokoTest.php
 * Jalankan: php artisan test --filter=TentangTokoTest
 */

namespace Tests\Feature;

use Tests\TestCase;

final class TentangTokoTest extends TestCase
{
    public function test_tentang_toko_mengembalikan_info_publik(): void
    {
        // TODO(human): ubah config sementara di dalam test (cari: mengubah config saat runtime).
        // TODO(human): panggil GET /tentang-toko sebagai JSON.
        // TODO(human): assert status 200 dan nilai nama + maks_item_keranjang (int).
        throw new \LogicException('TODO: tulis test happy path');
    }

    public function test_tentang_toko_tidak_membocorkan_app_key(): void
    {
        // TODO(human): panggil endpoint, lalu pastikan isi response TIDAK mengandung config('app.key').
        throw new \LogicException('TODO: tulis test kebocoran secret');
    }
}

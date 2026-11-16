<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — tests/Feature/TentangTokoTest.php
 */

namespace Tests\Feature;

use Tests\TestCase;

final class TentangTokoTest extends TestCase
{
    public function test_tentang_toko_mengembalikan_info_publik(): void
    {
        config([
            'toko.nama' => 'Toko Uji',
            'toko.kontak_email' => 'halo@toko.test',
            'toko.maks_item_keranjang' => 15,
        ]);

        $this->getJson('/tentang-toko')
            ->assertOk()
            ->assertExactJson([
                'nama' => 'Toko Uji',
                'kontak_email' => 'halo@toko.test',
                'maks_item_keranjang' => 15,
            ]);
    }

    public function test_tentang_toko_tidak_membocorkan_app_key(): void
    {
        config(['app.key' => 'base64:kunci-palsu-khusus-test']);

        $response = $this->getJson('/tentang-toko')->assertOk();

        $this->assertStringNotContainsString('kunci-palsu-khusus-test', $response->getContent());
    }
}

<?php

declare(strict_types=1);

/*
 * Salin ke: toko-latihan/app/Http/Resources/ProductResource.php
 *
 * Sebelum mulai, lihat dulu masalahnya. Di controller API lama ada kode ini:
 *
 *     public function index()
 *     {
 *         return Product::all();   // SENGAJA BOCOR: harga_modal, catatan_internal, user_id ikut keluar
 *     }
 *
 *     public function show(Product $product)
 *     {
 *         return $product;         // SENGAJA BOCOR juga
 *     }
 *
 * Jalankan dulu versi bocor itu dan lihat output curl-nya. Catat kolom apa saja
 * yang keluar. Baru setelah itu kerjakan file ini.
 */

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Product
 */
final class ProductResource extends JsonResource
{
    /**
     * Bentuk JSON publik untuk satu produk.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // TODO(human): kembalikan HANYA field publik:
        //   id, name, slug, price, price_label, stock_status,
        //   category, created_at, updated_at.
        // TODO(human): price_label pakai format "Rp 350.000" (lihat hargaLabel()).
        // TODO(human): stock_status "habis" / "tersedia" (lihat statusStok()).
        // TODO(human): category hanya muncul kalau relasi sudah di-load,
        //   dan dibungkus CategoryResource.
        // TODO(human): harga_modal hanya muncul kalau user yang login boleh
        //   'update' produk ini. Untuk guest, key-nya harus hilang.
        // TODO(human): tanggal dalam format ISO 8601, aman kalau null.
        // Ingat: catatan_internal dan user_id TIDAK BOLEH ada di sini.
        throw new \LogicException('TODO: implementasikan ProductResource::toArray()');
    }

    private function hargaLabel(int $harga): string
    {
        // TODO(human): ubah 350000 menjadi "Rp 350.000".
        throw new \LogicException('TODO: implementasikan hargaLabel()');
    }

    private function statusStok(int $stok): string
    {
        // TODO(human): 0 => "habis", lebih dari 0 => "tersedia".
        throw new \LogicException('TODO: implementasikan statusStok()');
    }
}

/*
 * TODO(human) di file lain (tidak ada starter, tulis sendiri):
 *
 * 1. Migration tambahan: harga_modal, catatan_internal, user_id di tabel products.
 * 2. app/Models/Product.php: tambahkan $hidden untuk 3 kolom internal.
 * 3. app/Http/Resources/CategoryResource.php: hanya id, name, slug.
 * 4. Controller API: ganti return model mentah dengan Resource.
 *    index() wajib paginate() + with('category').
 * 5. bootstrap/app.php: 404 untuk api/* menjadi
 *    {"message": "Data tidak ditemukan.", "kode": "TIDAK_DITEMUKAN"}.
 * 6. tests/Feature/ProductResourceTest.php: tes guest vs admin.
 */

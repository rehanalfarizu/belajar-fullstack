<?php

declare(strict_types=1);

/*
 * Salin file ini ke:
 *   toko-latihan/app/Services/PencarianProduk.php
 * (buat folder app/Services kalau belum ada)
 *
 * !!! SENGAJA RENTAN !!!
 * Kode di bawah punya celah SQL injection. Jangan pakai di proyek asli.
 * Tugasmu: (1) buktikan celahnya di tinker, (2) jelaskan kenapa bisa,
 * (3) perbaiki tanpa mengubah "kontrak" method cari().
 *
 * Coba di tinker:
 *   php artisan tinker
 *   > app(App\Services\PencarianProduk::class)->cari('Key', 'name', 'asc')
 */

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

final class PencarianProduk
{
    /**
     * Cari produk berdasarkan nama, lalu urutkan.
     *
     * @param string $kata    kata kunci dari kotak pencarian (input user)
     * @param string $urutkan nama kolom dari query string ?sort= (input user)
     * @param string $arah    asc / desc dari query string ?dir= (input user)
     */
    public function cari(string $kata, string $urutkan, string $arah): Collection
    {
        // SENGAJA RENTAN: input user ditempel langsung ke string SQL.
        $sql = "select * from products where name like '%$kata%' order by $urutkan $arah";

        // TODO(human): sebelum memperbaiki, coba panggil method ini di tinker
        //   dengan $kata yang mengandung tanda petik satu ('). Apa errornya?
        //   Lalu coba payload yang membuat SEMUA produk muncul.
        //   Catat payload dan hasilnya di catatanmu.

        // TODO(human): ganti baris di bawah dengan Query Builder
        //   (DB::table('products')->...) yang memakai parameter binding
        //   untuk NILAI ($kata).

        // TODO(human): $urutkan dan $arah adalah NAMA kolom / kata kunci SQL,
        //   bukan nilai. Binding tidak bisa melindunginya.
        //   Batasi dengan allowlist:
        //     $urutkan hanya boleh: name, price, created_at
        //     $arah hanya boleh: asc, desc
        //   Tentukan sendiri: kalau di luar daftar, pakai default atau lempar
        //   exception? Tulis alasanmu.

        return collect(DB::select($sql));
    }

    /**
     * Produk dengan harga di atas $minimal.
     */
    public function lebihMahalDari(string $minimal): Collection
    {
        // SENGAJA RENTAN: $minimal berasal dari ?min= di URL.
        return DB::table('products')
            ->whereRaw("price > $minimal")
            ->orderBy('price')
            ->get();

        // TODO(human): perbaiki whereRaw di atas supaya memakai binding,
        //   ATAU ganti dengan method where biasa.
        // TODO(human): pikirkan juga: apakah tipe parameter string sudah tepat?
    }
}

/*
 * TODO(human): tulis daftar kasus uji di catatanmu (minimal 6), contoh bentuk:
 *   cari('Key', 'name', 'asc')   → ...
 *   cari("'", 'name', 'asc')     → ...
 *   cari('x', 'password', 'asc') → ...
 * Lalu jalankan semuanya di tinker setelah diperbaiki.
 */

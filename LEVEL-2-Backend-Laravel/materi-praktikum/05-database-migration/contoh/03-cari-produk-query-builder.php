<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

final class PencarianProduk
{
    // Allowlist: hanya kolom ini yang boleh dipakai untuk mengurutkan.
    private const KOLOM_URUT = ['name', 'price', 'created_at'];

    private const ARAH_URUT = ['asc', 'desc'];

    public function cari(string $kata, string $urutkan, string $arah): Collection
    {
        // Identifier (nama kolom, arah) TIDAK bisa di-binding, jadi dicek
        // terhadap daftar yang kita tentukan sendiri.
        $arah = strtolower($arah);

        if (! in_array($urutkan, self::KOLOM_URUT, true)) {
            throw new InvalidArgumentException('Kolom urutan tidak diizinkan.');
        }

        if (! in_array($arah, self::ARAH_URUT, true)) {
            throw new InvalidArgumentException('Arah urutan harus asc atau desc.');
        }

        // Nilai ($kata) dikirim sebagai binding (?), bukan ditempel ke SQL.
        // Catatan: % dan _ di dalam $kata tetap jadi wildcard LIKE. Itu bukan
        // SQL injection (tidak bisa keluar dari string), cuma hasil cari jadi
        // lebih luas. Batasi panjang $kata di validasi request kalau perlu.
        return DB::table('products')
            ->select(['id', 'name', 'slug', 'price', 'stock', 'is_active', 'created_at'])
            ->where('name', 'like', '%' . $kata . '%')
            ->orderBy($urutkan, $arah)
            ->get();
    }

    public function lebihMahalDari(int $minimal): Collection
    {
        // Tipe int: PHP menolak "0 OR 1=1" sebelum menyentuh database.
        // Kalau tetap butuh whereRaw, wajib pakai binding:
        //   ->whereRaw('price > ?', [$minimal])
        return DB::table('products')
            ->where('price', '>', $minimal)
            ->orderBy('price')
            ->get();
    }
}

/*
Kasus uji (tinker):

$s = app(App\Services\PencarianProduk::class);
$s->cari('Key', 'name', 'asc');            // hanya produk yang namanya mengandung "Key"
$s->cari("'", 'name', 'asc');              // koleksi kosong, TIDAK error SQL
$s->cari("%' OR 1=1 --", 'name', 'asc');   // koleksi kosong, bukan semua produk
$s->cari('', 'price', 'desc');             // semua produk, termahal dulu
$s->cari('x', 'password', 'asc');          // InvalidArgumentException
$s->cari('x', 'name', 'asc; drop table products'); // InvalidArgumentException
$s->lebihMahalDari(200000);                // produk > 200.000
*/

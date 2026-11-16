<?php

declare(strict_types=1);

/*
 * FILE 1 (kode di bawah) → salin ke:
 *   toko-latihan/app/Models/Product.php
 *   (gabungkan dengan model Product milikmu: $fillable, casts, relasi category)
 *
 * FILE 2 (di komentar paling bawah) → salin ke:
 *   toko-latihan/app/Http/Controllers/KatalogController.php
 *   lalu daftarkan route: Route::get('/katalog', [KatalogController::class, 'index']);
 *
 * !!! SENGAJA RENTAN dan SENGAJA LAMBAT !!!
 *   - scopeSearch menempel input ke whereRaw (SQL injection)
 *   - KatalogController memicu N+1 query
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'is_active',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Cari produk berdasarkan nama. $kata berasal dari ?q= di URL.
     */
    public function scopeSearch(Builder $query, ?string $kata): Builder
    {
        // SENGAJA RENTAN: input user ditempel ke SQL mentah.
        return $query->whereRaw("name LIKE '%{$kata}%'");

        // TODO(human): buktikan dulu celahnya di tinker:
        //   Product::search("x' OR '1'='1")->count()
        //   Bandingkan dengan Product::count(). Catat.
        // TODO(human): perbaiki dengan binding. Boleh tetap whereRaw (pakai ?)
        //   atau ganti ke where biasa. Tulis alasan pilihanmu.
        // TODO(human): kalau $kata null atau string kosong, query TIDAK difilter.
    }

    /**
     * Filter rentang harga. Batas yang null berarti "tidak dibatasi".
     */
    public function scopePriceBetween(Builder $query, ?int $min, ?int $max): Builder
    {
        // TODO(human): kalau $min tidak null → harga >= $min.
        // TODO(human): kalau $max tidak null → harga <= $max.
        // TODO(human): kalau dua-duanya null → kembalikan $query apa adanya.
        // TODO(human): kalau $min > $max, apa yang sebaiknya terjadi? Putuskan.
        throw new \LogicException('TODO: implementasikan scopePriceBetween()');
    }
}

/*
=== FILE 2: app/Http/Controllers/KatalogController.php ===

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class KatalogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // SENGAJA LAMBAT: get() semua baris, lalu akses relasi di dalam loop.
        $products = Product::query()
            ->search($request->query('q'))
            ->get();

        $data = $products->map(fn (Product $p) => [
            'name' => $p->name,
            'price' => $p->price,
            'category' => $p->category?->name, // ← query baru untuk SETIAP produk
        ]);

        return response()->json(['data' => $data]);
    }
}

TODO(human): ukur jumlah query SEBELUM diperbaiki (lihat TUGAS.md, Bagian C).
TODO(human): pakai priceBetween() dengan ?min= dan ?max= dari URL (ubah ke int dulu).
TODO(human): hilangkan N+1 dengan eager loading.
TODO(human): ambil kolom yang dipakai saja (ingat: foreign key perlu ikut diambil
             supaya relasi bisa dicocokkan).
TODO(human): ganti get() dengan pagination 20 per halaman.
TODO(human): ukur lagi jumlah query SESUDAH diperbaiki. Catat angkanya.
TODO(human): aktifkan pengaturan Eloquent yang melempar exception saat lazy loading
             terjadi, hanya di luar production (AppServiceProvider::boot).
*/

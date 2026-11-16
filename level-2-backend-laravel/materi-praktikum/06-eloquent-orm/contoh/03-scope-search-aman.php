<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use InvalidArgumentException;

final class Product extends Model
{
    // Wajib supaya Product::factory() di seeder dan test bisa dipakai.
    use HasFactory;

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

    public function scopeSearch(Builder $query, ?string $kata): Builder
    {
        $kata = trim((string) $kata);

        if ($kata === '') {
            return $query;
        }

        // where biasa = binding otomatis. Tidak perlu whereRaw sama sekali.
        // Kalau terpaksa raw: ->whereRaw('name LIKE ?', ['%' . $kata . '%'])
        return $query->where('name', 'like', '%' . $kata . '%');
    }

    public function scopePriceBetween(Builder $query, ?int $min, ?int $max): Builder
    {
        if ($min !== null && $max !== null && $min > $max) {
            // Pilihan: tolak. Alternatif lain: tukar nilainya diam-diam.
            throw new InvalidArgumentException('Harga minimal tidak boleh lebih besar dari maksimal.');
        }

        return $query
            ->when($min !== null, fn (Builder $q) => $q->where('price', '>=', $min))
            ->when($max !== null, fn (Builder $q) => $q->where('price', '<=', $max));
    }
}

/*
=== app/Http/Controllers/KatalogController.php ===

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

final class KatalogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $input = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'min' => ['nullable', 'integer', 'min:0'],
            'max' => ['nullable', 'integer', 'min:0'],
        ]);

        // min > max dicek di sini supaya user dapat 422, bukan 500 dari scope.
        if (isset($input['min'], $input['max']) && (int) $input['min'] > (int) $input['max']) {
            throw ValidationException::withMessages([
                'max' => 'Harga maksimal harus lebih besar atau sama dengan harga minimal.',
            ]);
        }

        $products = Product::query()
            ->select(['id', 'category_id', 'name', 'slug', 'price'])  // category_id wajib ikut
            ->with('category:id,name')                                // 1 query untuk semua kategori
            ->search($input['q'] ?? null)
            ->priceBetween(
                isset($input['min']) ? (int) $input['min'] : null,
                isset($input['max']) ? (int) $input['max'] : null,
            )
            ->orderBy('name')
            ->paginate(20)
            ->withQueryString();

        $products->through(fn (Product $p) => [
            'name' => $p->name,
            'slug' => $p->slug,
            'price' => $p->price,
            'category' => $p->category?->name,
        ]);

        return response()->json($products);
    }
}

=== app/Providers/AppServiceProvider.php ===

public function boot(): void
{
    Model::preventLazyLoading(! $this->app->isProduction());
}

=== Mengukur query di tinker ===

DB::enableQueryLog();
Product::search('a')->get()->each(fn ($p) => $p->category?->name);
count(DB::getQueryLog());   // 1 + N (contoh: 51 untuk 50 produk)

DB::flushQueryLog();
Product::search('a')->with('category')->get()->each(fn ($p) => $p->category?->name);
count(DB::getQueryLog());   // 2

Catatan: paginate() menambah 1 query count(*), jadi endpoint /produk-cari = 3 query.
*/

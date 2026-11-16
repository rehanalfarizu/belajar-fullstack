<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

// Catatan: ProductController sudah ada dari topik 03. Gabungkan, jangan timpa:
// ganti store() lama dengan versi ini dan tambahkan update().
final class ProductController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // 1) Hanya field yang lolos validasi yang dipakai.
        //    Field lain (is_featured, user_id, role, ...) otomatis dibuang.
        $data = $request->validate($this->aturan());

        // 2) user_id ditentukan server: dibuat lewat relasi user yang login.
        //    Laravel mengisi user_id sendiri, bukan dari input.
        $product = $request->user()->products()->create($data);

        return response()->json(['data' => $product], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        // Cek kepemilikan minimal. Versi rapi pakai Policy (topik 08).
        abort_unless($request->user()->id === $product->user_id, 403);

        $data = $request->validate($this->aturan($product));

        // update() hanya mengisi kolom yang ada di $fillable.
        $product->update($data);

        return response()->json(['data' => $product->fresh()]);
    }

    /**
     * Aturan validasi dipakai bersama store dan update.
     * (Di topik 07 ini dipindah ke Form Request.)
     */
    private function aturan(?Product $product = null): array
    {
        return [
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:120'],
            'slug' => [
                'required', 'string', 'max:140', 'alpha_dash',
                Rule::unique('products', 'slug')->ignore($product?->id),
            ],
            'description' => ['nullable', 'string', 'max:2000'],
            'price' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}

/*
=== app/Models/Product.php ===

final class Product extends Model
{
    // Pakai $fillable (allowlist), bukan $guarded (blocklist).
    // Alasan: kalau besok ada kolom baru yang sensitif (misal harga_modal),
    // $fillable otomatis melindunginya. Dengan $guarded kita harus ingat
    // menambahkannya, dan lupa = celah.
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'is_active',
    ];
    // user_id dan is_featured sengaja TIDAK ada di sini.

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'stock' => 'integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

=== app/Models/User.php (tambahan) ===

public function products(): HasMany
{
    return $this->hasMany(Product::class);
}

=== app/Providers/AppServiceProvider.php ===

public function boot(): void
{
    // Di lokal/testing: lempar exception kalau ada atribut non-fillable diisi,
    // supaya bug ketahuan cepat. Di production: diam-diam dibuang.
    Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());
}

=== Fitur "jadikan unggulan" khusus admin (tantangan) ===

public function jadikanUnggulan(Request $request, Product $product): JsonResponse
{
    abort_unless($request->user()->role === 'admin', 403);

    // Assignment langsung ke properti TIDAK dicek $fillable.
    // Ini cara yang benar untuk kolom yang dikontrol server.
    $product->is_featured = true;
    $product->save();

    return response()->json(['data' => $product]);
}

=== Feature test (potongan) ===

public function test_user_tidak_bisa_menyusupkan_owner_dan_featured(): void
{
    $penjual = User::factory()->create();

    $this->actingAs($penjual)
        ->postJson('/products', [
            'name' => 'Keyboard',
            'slug' => 'keyboard',
            'price' => 350000,
            'stock' => 5,
            'is_featured' => true,
            'user_id' => 999,
        ])
        ->assertCreated();

    $this->assertDatabaseHas('products', [
        'slug' => 'keyboard',
        'user_id' => $penjual->id,
        'is_featured' => false,
    ]);
}
*/

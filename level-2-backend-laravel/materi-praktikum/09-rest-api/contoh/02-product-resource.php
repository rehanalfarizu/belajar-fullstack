<?php

declare(strict_types=1);

/*
 * SOLUSI REFERENSI soal 09-02.
 * File utama: app/Http/Resources/ProductResource.php
 * Potongan file lain ada di komentar paling bawah.
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
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'price_label' => $this->hargaLabel((int) $this->price),
            'stock_status' => $this->statusStok((int) $this->stock),

            // Relasi hanya ikut kalau controller sudah memanggil with('category').
            'category' => new CategoryResource($this->whenLoaded('category')),

            // Hanya untuk user yang boleh mengubah produk ini (admin).
            // Pakai guard 'sanctum' karena GET produk adalah route publik
            // (tanpa middleware auth). Guard ini membaca bearer token kalau ada,
            // dan tetap mengenali user session/actingAs() di test.
            // Closure dipakai supaya nilai tidak disentuh kalau tidak berhak.
            'harga_modal' => $this->when(
                $request->user('sanctum')?->can('update', $this->resource) ?? false,
                fn () => $this->harga_modal,
            ),

            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }

    private function hargaLabel(int $harga): string
    {
        return 'Rp ' . number_format($harga, 0, ',', '.');
    }

    private function statusStok(int $stok): string
    {
        return $stok > 0 ? 'tersedia' : 'habis';
    }
}

/*
--------------------------------------------------------------------------
app/Http/Resources/CategoryResource.php
--------------------------------------------------------------------------
final class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
        ];
    }
}

--------------------------------------------------------------------------
Migration: php artisan make:migration add_internal_columns_to_products_table
--------------------------------------------------------------------------
public function up(): void
{
    Schema::table('products', function (Blueprint $table): void {
        $table->unsignedBigInteger('harga_modal')->default(0);
        $table->text('catatan_internal')->nullable();
        // user_id sudah dibuat di topik 06 (Soal 02). Cek dulu dengan
        // Schema::hasColumn('products', 'user_id'). Kalau belum ada, tambahkan:
        // $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
    });
}

public function down(): void
{
    Schema::table('products', function (Blueprint $table): void {
        $table->dropColumn(['harga_modal', 'catatan_internal']);
    });
}

--------------------------------------------------------------------------
app/Models/Product.php (tambahan)
--------------------------------------------------------------------------
// Lapisan cadangan: kalau ada yang tidak sengaja return model mentah.
protected $hidden = ['harga_modal', 'catatan_internal', 'user_id'];

--------------------------------------------------------------------------
app/Http/Controllers/Api/ProductController.php (index & show)
--------------------------------------------------------------------------
public function index(): AnonymousResourceCollection
{
    $products = Product::query()
        ->with('category')
        ->latest()
        ->paginate(15);

    return ProductResource::collection($products);
}

public function show(Product $product): ProductResource
{
    return new ProductResource($product);
}

--------------------------------------------------------------------------
bootstrap/app.php
--------------------------------------------------------------------------
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->render(function (NotFoundHttpException $e, Request $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'message' => 'Data tidak ditemukan.',
                'kode' => 'TIDAK_DITEMUKAN',
            ], 404);
        }

        return null; // route web tetap pakai halaman 404 bawaan
    });
})

--------------------------------------------------------------------------
tests/Feature/ProductResourceTest.php (Pest)
--------------------------------------------------------------------------
use App\Models\Product;
use App\Models\User;

test('guest tidak melihat kolom internal', function () {
    $product = Product::factory()->create(['harga_modal' => 200000]);

    $this->getJson("/api/products/{$product->id}")
        ->assertOk()
        ->assertJsonMissingPath('data.harga_modal')
        ->assertJsonMissingPath('data.catatan_internal')
        ->assertJsonMissingPath('data.user_id');
});

test('admin melihat harga modal', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $product = Product::factory()->create(['harga_modal' => 200000]);

    $this->actingAs($admin)
        ->getJson("/api/products/{$product->id}")
        ->assertOk()
        ->assertJsonPath('data.harga_modal', 200000)
        ->assertJsonMissingPath('data.catatan_internal');
});

test('404 api konsisten', function () {
    $this->getJson('/api/products/99999')
        ->assertNotFound()
        ->assertExactJson([
            'message' => 'Data tidak ditemukan.',
            'kode' => 'TIDAK_DITEMUKAN',
        ]);
});
*/

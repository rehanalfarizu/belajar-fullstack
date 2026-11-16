<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

final class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        $product = $this->route('product');

        // Versi akhir (butuh ProductPolicy dari topik 08). Sebelum topik 08,
        // pakai `return true;` sementara supaya validasi bisa diuji.

        // Route model binding sudah mengubah {product} jadi model Product.
        if (! $product instanceof Product) {
            return false;
        }

        // Guest: user() = null, jadi hasilnya false (bukan error).
        return $this->user()?->can('update', $product) ?? false;
    }

    protected function prepareForValidation(): void
    {
        $tambahan = [];

        // Slug otomatis dari name kalau slug kosong.
        if ($this->filled('name') && blank($this->input('slug'))) {
            $tambahan['slug'] = Str::slug((string) $this->input('name'));
        }

        // "350.000" atau "350 000" -> "350000". Nilai aneh tetap dibiarkan
        // supaya rule integer yang menolaknya (jangan diam-diam jadi 0).
        if ($this->has('price') && is_string($this->input('price'))) {
            $bersih = str_replace(['.', ' ', ','], '', trim($this->input('price')));
            $tambahan['price'] = $bersih;
        }

        if ($tambahan !== []) {
            $this->merge($tambahan);
        }
    }

    public function rules(): array
    {
        /** @var Product $product */
        $product = $this->route('product');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:120'],
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:140',
                'alpha_dash',
                Rule::unique('products', 'slug')->ignore($product),
            ],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'price' => ['sometimes', 'required', 'integer', 'min:0'],
            'stock' => ['sometimes', 'required', 'integer', 'min:0'],
            'category_id' => ['sometimes', 'required', 'integer', 'exists:categories,id'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }

    /**
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                // Kalau field dasar sudah gagal, jangan tambah error yang membingungkan.
                if ($validator->errors()->hasAny(['stock', 'is_active'])) {
                    return;
                }

                /** @var Product $product */
                $product = $this->route('product');

                // Pakai nilai baru kalau dikirim, kalau tidak pakai nilai di database.
                $stokAkhir = $this->has('stock')
                    ? (int) $this->input('stock')
                    : (int) $product->stock;

                $aktifAkhir = $this->has('is_active')
                    ? $this->boolean('is_active')
                    : (bool) $product->is_active;

                if ($aktifAkhir && $stokAkhir === 0) {
                    $validator->errors()->add(
                        'is_active',
                        'Produk dengan stok 0 tidak boleh diaktifkan.',
                    );
                }
            },
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'nama produk',
            'slug' => 'slug',
            'description' => 'deskripsi',
            'price' => 'harga',
            'stock' => 'stok',
            'category_id' => 'kategori',
            'is_active' => 'status aktif',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.unique' => 'Slug sudah dipakai produk lain.',
            'category_id.exists' => 'Kategori tidak ditemukan.',
        ];
    }
}

/*
Dipakai di controller:

public function update(UpdateProductRequest $request, Product $product): JsonResponse
{
    $product->update($request->validated());

    return response()->json(['data' => $product->fresh()]);
}

Route:
Route::patch('/products/{product}', [ProductController::class, 'update'])->middleware('auth');
*/

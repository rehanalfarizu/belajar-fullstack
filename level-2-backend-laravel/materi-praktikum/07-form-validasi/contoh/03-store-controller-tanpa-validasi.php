<?php

declare(strict_types=1);

// Versi yang sudah diperbaiki: validasi di SERVER, simpan hanya data valid.

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

final class LatihanProductController extends Controller
{
    public function create(): View
    {
        return view('latihan.products.create');
    }

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        // validate() otomatis:
        // - browser: redirect back + $errors + old() (status 302)
        // - JSON   : status 422 + {"message": ..., "errors": {...}}
        $data = $request->validate(
            [
                'name' => ['required', 'string', 'max:120'],
                'slug' => ['required', 'string', 'max:140', 'alpha_dash', 'unique:products,slug'],
                'price' => ['required', 'integer', 'min:0', 'max:1000000000'],
                'stock' => ['required', 'integer', 'min:0'],
                'category_id' => ['required', 'integer', 'exists:categories,id'],
            ],
            [
                'price.min' => 'Harga tidak boleh negatif.',
                'category_id.exists' => 'Kategori tidak ditemukan.',
            ],
            [
                'name' => 'nama produk',
                'price' => 'harga',
                'stock' => 'stok',
                'category_id' => 'kategori',
            ],
        );

        // Hanya field yang lolos validasi yang masuk. Field liar (is_admin, dll) tertinggal.
        $product = Product::create($data);

        if ($request->expectsJson()) {
            return response()->json(['data' => $product], 201);
        }

        return redirect()
            ->route('latihan.products.create')
            ->with('success', 'Produk tersimpan.');
    }
}

/*
--- resources/views/latihan/products/create.blade.php (bagian penting) ---

@if (session('success'))
    <p role="status">{{ session('success') }}</p>
@endif

<form method="POST" action="{{ route('latihan.products.store') }}">
    @csrf

    <label for="name">Nama produk</label>
    <input id="name" name="name" value="{{ old('name') }}" required maxlength="120">
    @error('name')
        <p role="alert">{{ $message }}</p>
    @enderror

    <label for="price">Harga</label>
    <input id="price" name="price" type="number" min="0" value="{{ old('price') }}" required>
    @error('price')
        <p role="alert">{{ $message }}</p>
    @enderror

    ... (slug, stock, category_id dengan pola yang sama)

    <button type="submit">Simpan</button>
</form>

--- tests/Feature/LatihanProductValidationTest.php (Pest) ---

use App\Models\Category;

beforeEach(function () {
    $this->category = Category::create(['name' => 'Aksesoris']);
});

function payloadValid(array $ubah = []): array
{
    return array_merge([
        'name' => 'Keyboard',
        'slug' => 'keyboard',
        'price' => 350000,
        'stock' => 5,
        'category_id' => test()->category->id,
    ], $ubah);
}

test('payload valid tersimpan', function () {
    $this->postJson('/api/latihan/products', payloadValid())->assertCreated();
});

test('harga negatif ditolak', function () {
    $this->postJson('/api/latihan/products', payloadValid(['price' => -1]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['price']);
});

test('nama terlalu panjang ditolak', function () {
    $this->postJson('/api/latihan/products', payloadValid(['name' => str_repeat('a', 10000)]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name']);
});

test('kategori yang tidak ada ditolak', function () {
    $this->postJson('/api/latihan/products', payloadValid(['category_id' => 999]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['category_id']);
});

test('form web redirect balik dengan error', function () {
    $this->from('/latihan/products/create')
        ->post('/latihan/products', payloadValid(['price' => -1]))
        ->assertRedirect('/latihan/products/create')
        ->assertSessionHasErrors(['price']);
});
*/

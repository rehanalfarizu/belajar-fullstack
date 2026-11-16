<?php

declare(strict_types=1);

/*
| Solusi referensi Soal 03-02 — Route Group dan Named Route.
| Ditempel di bagian bawah routes/web.php.
*/

use Illuminate\Support\Facades\Route;

$katalogProduk = [
    'keyboard-mekanik' => ['nama' => 'Keyboard Mekanik', 'harga' => 350000, 'kategori_id' => 1],
    'mouse-wireless' => ['nama' => 'Mouse Wireless', 'harga' => 175000, 'kategori_id' => 1],
    'buku-tulis-a5' => ['nama' => 'Buku Tulis A5', 'harga' => 12000, 'kategori_id' => 2],
];

$katalogKategori = [
    1 => 'Elektronik',
    2 => 'Alat Tulis',
];

// Satu group: prefix URL "katalog" dan prefix nama "katalog."
Route::prefix('katalog')->name('katalog.')->group(function () use ($katalogProduk, $katalogKategori): void {
    // GET /katalog → katalog.index
    Route::get('/', function () use ($katalogProduk) {
        $data = [];

        foreach ($katalogProduk as $slug => $produk) {
            $data[] = [
                'slug' => $slug,
                'nama' => $produk['nama'],
                'harga' => $produk['harga'],
                // URL dibuat dari NAMA route, jadi aman kalau URL berubah.
                'url' => route('katalog.produk.show', ['slug' => $slug]),
            ];
        }

        return response()->json(['data' => $data]);
    })->name('index');

    // GET /katalog/produk/{slug} → katalog.produk.show
    Route::get('/produk/{slug}', function (string $slug) use ($katalogProduk) {
        abort_unless(isset($katalogProduk[$slug]), 404, 'Produk tidak ditemukan.');

        return response()->json([
            'data' => ['slug' => $slug, ...$katalogProduk[$slug]],
        ]);
    })->where('slug', '[a-z0-9-]+')->name('produk.show');

    // GET /katalog/kategori/{id} → katalog.kategori.show
    Route::get('/kategori/{id}', function (int $id) use ($katalogProduk, $katalogKategori) {
        abort_unless(isset($katalogKategori[$id]), 404, 'Kategori tidak ditemukan.');

        $produk = array_filter(
            $katalogProduk,
            fn (array $item): bool => $item['kategori_id'] === $id,
        );

        return response()->json([
            'data' => [
                'id' => $id,
                'nama' => $katalogKategori[$id],
                'produk' => array_keys($produk),
            ],
        ]);
    })->whereNumber('id')->name('kategori.show');
});

// URL lama pindah permanen (301).
Route::permanentRedirect('/produk', '/katalog');

// Fallback WAJIB paling akhir.
Route::fallback(function () {
    return response()->json(['message' => 'Halaman tidak ditemukan.'], 404);
});

/*
Catatan: abort(404, 'pesan') pada request yang minta JSON (header
Accept: application/json) otomatis jadi {"message": "..."} status 404.
Tanpa header itu Laravel merender halaman error HTML.

Feature test singkat (tests/Feature/KatalogRouteTest.php, Pest):

test('index berisi url dari named route', function () {
    $this->getJson('/katalog')
        ->assertOk()
        ->assertJsonPath('data.0.url', route('katalog.produk.show', ['slug' => 'keyboard-mekanik']));
});

test('slug huruf besar ditolak router', function () {
    $this->getJson('/katalog/produk/Keyboard_Mekanik')->assertNotFound();
});

test('kategori bukan angka 404', function () {
    $this->getJson('/katalog/kategori/abc')->assertNotFound();
});

test('url lama redirect permanen', function () {
    $this->get('/produk')->assertStatus(301)->assertRedirect('/katalog');
});
*/

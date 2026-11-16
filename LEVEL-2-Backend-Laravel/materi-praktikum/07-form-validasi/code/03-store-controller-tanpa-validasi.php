<?php

declare(strict_types=1);

// =====================================================================
//  SENGAJA RENTAN — HANYA UNTUK LATIHAN DI LAPTOP SENDIRI
// =====================================================================
// Salin file ini ke: toko-latihan/app/Http/Controllers/LatihanProductController.php
//
// Daftarkan route-nya (lihat TUGAS.md bagian B):
//   routes/web.php : GET  /latihan/products/create  -> create
//                    POST /latihan/products         -> store
//   routes/api.php : POST /api/latihan/products     -> store   (untuk uji curl)
//
// Controller ini PERCAYA BEGITU SAJA pada input dari form.
// Form HTML-nya punya required, min="0", maxlength — tapi itu cuma di browser.
// Tugasmu: buktikan itu bisa dilewati, lalu perbaiki di SERVER.

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
        // View form ada di soal 03 (resources/views/latihan/products/create.blade.php).
        return view('latihan.products.create');
    }

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        // MASALAH: semua nilai diambil mentah. Harga negatif? Lolos.
        // Nama 10.000 karakter? Lolos (atau malah bikin error database).
        // category_id yang tidak ada? Lolos sampai database protes.
        //
        // TODO(human): validasi input di sini SEBELUM menyentuh database.
        //              Pilih: $request->validate([...]) atau Form Request.
        // TODO(human): setelah validasi, pakai HANYA data yang lolos validasi,
        //              bukan $request->input() / $request->all().
        $product = Product::create([
            'name' => $request->input('name'),
            'slug' => $request->input('slug'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'category_id' => $request->input('category_id'),
        ]);

        // TODO(human): pastikan saat gagal validasi:
        //   - request dari browser  -> redirect balik + pesan error + old input
        //   - request JSON (Accept: application/json) -> status 422 + JSON errors
        // Pikirkan: apakah kamu perlu menulis if/else sendiri untuk ini?

        if ($request->expectsJson()) {
            return response()->json(['data' => $product], 201);
        }

        return redirect()
            ->route('latihan.products.create')
            ->with('success', 'Produk tersimpan.');
    }
}

// TODO(human): buat tests/Feature/LatihanProductValidationTest.php
//   - payload valid -> 201
//   - price negatif -> 422 + error di field price
//   - name 10.000 karakter -> 422 + error di field name
//   - category_id tidak ada -> 422 + error di field category_id
